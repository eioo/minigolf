import React from "react";
import { Route } from "wouter";
import "./styles/styles.scss";
import Game from "./views/Game";
import Home from "./views/Home";
import Lobby from "./views/Lobby";

function App() {
  return (
    <div className="App-container">
      <div id="game">
        <Route path="/" component={Home} />
        <Route path="/lobby/:gameMode" component={Lobby} />
        <Route path="/game/:gameId" component={Game} />
      </div>
    </div>
  );
}

export default App;
