import { useState, useEffect } from "react";
import GameScene from "./scene/GameScene";
import { getComputerMove } from "./api/ai";
import { checkWinner } from "./game/checkWinner";
import { themes } from "./styles/theme";

import "./styles/ui.css";

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState("player");
  const [theme, setTheme] = useState("dark");

  const winner = checkWinner(board);

  let statusText;

  if (winner === "X") statusText = "You win!";
  else if (winner === "O") statusText = "Computer wins!";
  else if (turn === "player") statusText = "Your turn";
  else statusText = "Computer thinking...";

  function handlePlayerMove(index) {
    if (board[index] !== null) return;
    if (turn !== "player") return;
    if (winner) return;

    const newBoard = [...board];
    newBoard[index] = "X";

    setBoard(newBoard);
    setTurn("computer");
  }

  useEffect(() => {
    async function computerTurn() {
      if (turn === "computer" && !winner) {
        const move = await getComputerMove(board);

        const newBoard = [...board];
        newBoard[move] = "O";

        setTimeout(() => {
          setBoard(newBoard);
          setTurn("player");
        }, 500);
      }
    }

    computerTurn();
  }, [turn]);

  function resetGame() {
    setBoard(Array(9).fill(null));
    setTurn("player");
  }

  const activeTheme = themes[theme];

  return (
    <div
      style={{
        height: "100vh",
        background: activeTheme.background,
      }}
    >
      <GameScene board={board} onMove={handlePlayerMove} theme={activeTheme} />

      <div className="statusPanel">{statusText}</div>
      
      <button className="uiButton resetButton" onClick={resetGame}>
        Reset
      </button>

      <button
        className="uiButton themeButton"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        Theme
      </button>
    </div>
  );
}
