import { Server } from 'socket.io';
import { LobbyType, User } from '~/types';
import { log } from '~/utils/logger';
import { WS_PORT } from './env';

export interface ServerToClientEvents {
  userJoined: (username: string) => void;
  userLeft: (username: string) => void;
  message: (text: string, from: string, isPrivate?: boolean) => void;
  users: (users: User[]) => void;
}

export interface ClientToServerEvents {
  setPrivateMessageUser: (username: string | undefined) => void;
  joinLobby: (gameMode: LobbyType) => void;
  leaveLobby: () => void;
  sendMessage: (text: string) => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
  lobbyType: LobbyType;
}

const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(WS_PORT, {
  cors: {
    origin: '*',
  },
});

function getConnectionsText() {
  const { clientsCount } = io.engine;
  return `(Connections: ${clientsCount})`;
}

const ignoredPlayersByUsername = new Map<string, Set<string>>();

io.on('connection', (socket) => {
  const username = `User-${socket.id.substring(0, 3)}`;
  let privateMessageUser: string | undefined;

  log.info(`"${username}" connected. ${getConnectionsText()}`);
  socket.data.name = username;
  socket.join(username);

  socket.on('sendMessage', (text) => {
    if (privateMessageUser) {
      io.to(privateMessageUser).emit('message', text, username, true);
    } else {
      socket.broadcast.emit('message', text, username);
    }
  });

  socket.on('disconnect', () => {
    if (socket.data.lobbyType) {
      // Broadcast leave message to all users in the current lobby
      socket.broadcast.emit('userLeft', username);
    }
    log.info(`"${username}" disconnected. ${getConnectionsText()}`);
  });

  socket.on('joinLobby', async (lobbyType) => {
    log.info(`"${socket.data.name}" joined "${lobbyType}" lobby`);
    socket.data.lobbyType = lobbyType;
    await socket.join(lobbyType);
    const roomSockets = await io.in(lobbyType).fetchSockets();
    socket.emit(
      'users',
      roomSockets.map((s) => ({
        name: s.data.name,
      })),
    );
    // Broadcast join message to all users in the current lobby
    socket.to(lobbyType).emit('userJoined', username);
  });

  socket.on('leaveLobby', () => {
    if (socket.data.lobbyType) {
      log.info(`"${socket.data.name}" left "${socket.data.lobbyType}" lobby`);
      socket.leave(socket.data.lobbyType);
      socket.to(socket.data.lobbyType).emit('userLeft', username);
      socket.data.lobbyType = undefined;
    }
  });

  socket.on('setPrivateMessageUser', (username) => {
    privateMessageUser = username;
  });
});

// Close server before reload (Vite-node)
const { hot } = import.meta;

if (hot) {
  hot.on('vite:beforeFullReload', () => {
    io.close();
  });
}

log.info(`Socket.IO server started on port ${WS_PORT}`);
