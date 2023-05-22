import { useEffect, useState } from 'react';
import { socket } from '../socket';
import { log } from '../utils/logger';

export function useSocketState() {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      log.debug('Socket connected');
      setIsConnected(true);
    }

    function onDisconnect() {
      log.debug('Socket disconnected');
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  return { isConnected };
}
