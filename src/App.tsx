import React from 'react';
import { Route } from 'wouter';
import LanguageSelect from './components/LanguageSelect';
import { useAssetPreloader } from './hooks/useAssetPreloader';
import { useLocalStorageLocale } from './hooks/useLocalStorageLocale';
import { useSocketState } from './hooks/useSocketState';
import './styles/styles.scss';
import Game from './views/Game';
import LoadingScreen from './views/LoadingScreen';
import Lobby, { LobbyProps } from './views/Lobby';
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
      <div className="App-container">
        <div id="game">
          <Route path="/" component={LobbySelect} />
          <Route path="/lobby/:gameMode">
            {(params) => <Lobby lobbyType={params.gameMode as LobbyProps['lobbyType']} />}
          </Route>
          <Route path="/game/:gameId" component={Game} />
        </div>
      </div>
    </>
  );
}

export default App;
