import { Socket, io } from 'socket.io-client';
import { ClientToServerEvents, ServerToClientEvents } from './server';

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  `ws://${import.meta.env.VITE_WS_HOST || 'localhost'}:${import.meta.env.VITE_WS_PORT || 8081}`,
);

/**
 * @todo Temporary until user can properly set this.
 */
export function getCurrentUsername() {
  return `User-${socket.id.substring(0, 3)}`;
}
