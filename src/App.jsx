import { useState } from "react";
import GameBoard from "./components/Gameboard";
import Player from "./components/Player";

function App() {

  const [activePlayer, setActivePlayer] = useState("X");

  const handleSelectSquare = () => setActivePlayer((currentActivePlayer) => currentActivePlayer === "X" ? "O" : "X");

  

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initalName="Player 1" symbol="X" isActive={activePlayer === "X"}></Player>
          <Player initalName="Player 2" symbol="O" isActive={activePlayer === "O"}></Player>
        </ol>
        <GameBoard onselectSquare={handleSelectSquare} activePlayerSymbol={activePlayer}></GameBoard>
      </div>
      LOG
    </main>
  );
}

export default App;
