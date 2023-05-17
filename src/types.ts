export type GameMode = 'Single player' | 'Dual player' | 'Multiplayer';
export type GameModePath = 'single' | 'dual' | 'multi';

export interface PlayersMessage {
  type: 'players';
  players: Player[];
}

export interface JoinedMessage {
  type: 'joined';
  username: string;
}

export interface LeaveMessage {
  type: 'leave';
  username: string;
}

export interface ClientMessage {
  type: 'client message';
  text: string;
}

export interface ServerMessage {
  type: 'server message';
  text: string;
  from: string;
}

export interface Player {
  username: string;
}

export type Message = PlayersMessage | JoinedMessage | LeaveMessage | ClientMessage | ServerMessage;
