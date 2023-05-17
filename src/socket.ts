import { Socket, io } from 'socket.io-client';
import { ClientToServerEvents, ServerToClientEvents } from './server';

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io('ws://localhost:5000');
