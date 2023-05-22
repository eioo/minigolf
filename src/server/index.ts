import { Server } from 'socket.io';
import { LobbyType, User } from '../types';
import { log } from '../utils/logger';

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

const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(5000, {
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
    socket.broadcast.emit('userLeft', username);
    log.info(`"${username}" disconnected. ${getConnectionsText()}`);
  });

  socket.on('joinLobby', async (gameMode) => {
    socket.data.lobby = gameMode;
    await socket.join(gameMode);
    const roomSockets = await io.in(gameMode).fetchSockets();
    socket.emit(
      'users',
      roomSockets.map((s) => ({
        name: s.data.name,
      })),
    );
    socket.to(gameMode).emit('userJoined', username);
  });

  socket.on('leaveLobby', () => {
    if (socket.data.lobby) {
      socket.leave(socket.data.lobby);
      socket.to(socket.data.lobby).emit('userLeft', username);
      socket.data.lobby = undefined;
    }
  });
});

// Close server before reload (Vite-node)
const hot = (import.meta as any).hot;

if (hot) {
  hot.on('vite:beforeFullReload', () => {
    io.close();
  });
}

log.info('Server started');
