import { Server } from 'socket.io';
import { LobbyType, User } from '../types';
import { log } from '../utils/logger';
import { WS_PORT } from './env';

export interface ServerToClientEvents {
  userJoined: (username: string) => void;
  userLeft: (username: string) => void;
  newMessage: (text: string, from: string) => void;
  users: (users: User[]) => void;
}

export interface ClientToServerEvents {
  joinLobby: (gameMode: LobbyType) => void;
  leaveLobby: () => void;
  sendMessage: (text: string) => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
  lobby: LobbyType;
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

io.on('connection', (socket) => {
  const username = `User-${socket.id.substring(0, 3)}`;
  log.info(`"${username}" connected. ${getConnectionsText()}`);
  socket.data.name = username;

  socket.on('sendMessage', (text) => {
    socket.broadcast.emit('newMessage', text, username);
  });

  socket.on('disconnect', () => {
    if (socket.data.lobby) {
      // Broadcast leave message to all users in the current lobby
      socket.broadcast.emit('userLeft', username);
    }
    log.info(`"${username}" disconnected. ${getConnectionsText()}`);
  });

  socket.on('joinLobby', async (lobbyType) => {
    log.info(`"${socket.data.name}" joined "${lobbyType}" lobby`);
    socket.data.lobby = lobbyType;
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
    if (socket.data.lobby) {
      log.info(`"${socket.data.name}" left "${socket.data.lobby}" lobby`);
      socket.leave(socket.data.lobby);
      socket.to(socket.data.lobby).emit('userLeft', username);
      socket.data.lobby = undefined;
    }
  });
});

// Close server before reload (Vite-node)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const hot = (import.meta as any).hot;

if (hot) {
  hot.on('vite:beforeFullReload', () => {
    io.close();
  });
}

log.info(`Socket.IO server started on port ${WS_PORT}`);
