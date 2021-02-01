import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Game from "./views/Game";
import Lobby from "./views/Lobby";

import "./styles/styles.scss";

function App() {
  return (
    <div className="App-container">
      <div id="game">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="lobby/*" element={<Lobby />} />
            <Route path="game/*" element={<Game />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
