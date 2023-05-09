import React from 'react';
import { Route } from 'wouter';
import { GameModeSelector } from './components/GameModeSelector';
import { useAssetPreloader } from './hooks/useAssetPreloader';
import './styles/styles.scss';
import Game from './views/Game';
import Loading from './views/Loading';
import Lobby, { LobbyProps } from './views/Lobby';

function App() {
  const loadingAssets = useAssetPreloader();

  if (loadingAssets) {
    return <Loading />;
  }

  return (
    <div className="App-container">
      <div id="game">
        <Route path="/" component={GameModeSelector} />
        <Route path="/lobby/:gameMode">
          {(params) => <Lobby gameMode={params.gameMode as LobbyProps['gameMode']} />}
        </Route>
        <Route path="/game/:gameId" component={Game} />
      </div>
    </div>
  );
}

export default App;
