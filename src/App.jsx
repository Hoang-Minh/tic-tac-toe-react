import { useState } from "react";
import GameBoard from "./components/Gameboard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combination.js";
import GameOver from "./components/GameOver.jsx";

const INIT_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function derviedWinner(gameBoard, players) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    console.info(combination);
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

function derivedGameBoard(gameTurns) {
  let gameBoard = [...INIT_GAME_BOARD.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);

  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = derivedGameBoard(gameTurns);

  const winner = derviedWinner(gameBoard, players);

  const hasDraw = gameTurns.length === 9 && !winner;

  const handlePlayerNameChange = (symbol, newName) => {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  };

  const handleSelectSquare = (rowIndex, colIndex) => {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  };

  function handleRestart() {
    setGameTurns([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initalName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          ></Player>
          <Player
            initalName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          ></Player>
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart}></GameOver>
        )}
        <GameBoard
          onselectSquare={handleSelectSquare}
          board={gameBoard}
        ></GameBoard>
      </div>
      <Log turns={gameTurns}></Log>
    </main>
  );
}

export default App;
