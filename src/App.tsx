import React from 'react';
import { Route } from 'wouter';
import LanguageSelect from './components/LanguageSelect';
import { useAssetPreloader } from './hooks/useAssetPreloader';
import { useLocalStorageLocale } from './hooks/useLocalStorageLocale';
import { useSocketState } from './hooks/useSocketState';
import './styles/styles.scss';
import { LobbyType } from './types';
import Game from './views/Game';
import LoadingScreen from './views/LoadingScreen';
import Lobby from './views/Lobby';
import { LobbySelect } from './views/LobbySelect';

function App() {
  const { loadingAssets } = useAssetPreloader();
  const { isConnected } = useSocketState();

  useLocalStorageLocale();

  if (!isConnected || loadingAssets) {
    return <LoadingScreen />;
  }

  return (
    <>
      <LanguageSelect />
      <div className="app-container">
        <div id="game">
          <Route path="/" component={LobbySelect} />
          <Route path="/lobby/:lobbyType">{(params) => <Lobby lobbyType={params.lobbyType as LobbyType} />}</Route>
          <Route path="/game/:gameId" component={Game} />
        </div>
      </div>
    </>
  );
}

export default App;
