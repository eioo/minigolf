import React, { useEffect, useState } from 'react';
import { Route } from 'wouter';
import { useAssetPreloader } from './hooks/useAssetPreloader';
import { socket } from './socket';
import './styles/styles.scss';
import { log } from './utils/logger';
import Game from './views/Game';
import { GameModeSelect } from './views/GameModeSelect';
import Loading from './views/Loading';
import Lobby, { LobbyProps } from './views/Lobby';

function App() {
  const loadingAssets = useAssetPreloader();
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

  if (!isConnected || loadingAssets) {
    return <Loading />;
  }

  return (
    <div className="App-container">
      <div id="game">
        <Route path="/" component={GameModeSelect} />
        <Route path="/lobby/:gameMode">
          {(params) => <Lobby gameMode={params.gameMode as LobbyProps['gameMode']} />}
        </Route>
        <Route path="/game/:gameId" component={Game} />
      </div>
    </div>
  );
}

export default App;
