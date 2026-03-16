import { useState, useEffect } from "react";
import GameScene from "./scene/GameScene";
import { themes } from "./styles/theme";

import "./styles/ui.css";

// ==========================================
// 1. MINIMAX & GAME LOGIC (Adapted for 1D Array)
// ==========================================

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

function checkWinner(board, player) {
  return winPatterns.some(pattern => 
    pattern.every(index => board[index] === player)
  );
}

function isDraw(board) {
  return board.every(cell => cell !== null);
}

// Alpha-Beta Pruning Minimax
function minimax(board, depth, alpha, beta, isMaximizing, aiMark, humanMark) {
  if (checkWinner(board, aiMark)) return { score: 10 - depth }; // AI wins
  if (checkWinner(board, humanMark)) return { score: depth - 10 }; // Human wins
  if (isDraw(board)) return { score: 0 }; // Draw

  let bestMove = -1;

  if (isMaximizing) {
    let maxEval = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = aiMark;
        let evalResult = minimax(board, depth + 1, alpha, beta, false, aiMark, humanMark).score;
        board[i] = null; // Undo move
        
        if (evalResult > maxEval) {
          maxEval = evalResult;
          bestMove = i;
        }
        alpha = Math.max(alpha, evalResult);
        if (beta <= alpha) break; // Prune
      }
    }
    return { score: maxEval, index: bestMove };
  } else {
    let minEval = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = humanMark;
        let evalResult = minimax(board, depth + 1, alpha, beta, true, aiMark, humanMark).score;
        board[i] = null; // Undo move
        
        if (evalResult < minEval) {
          minEval = evalResult;
          bestMove = i;
        }
        beta = Math.min(beta, evalResult);
        if (beta <= alpha) break; // Prune
      }
    }
    return { score: minEval, index: bestMove };
  }
}


// ==========================================
// 2. MAIN APP COMPONENT
// ==========================================


export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [firstMove, setFirstMove] = useState("HUMAN");
  const [turn, setTurn] = useState("HUMAN");
  const [theme, setTheme] = useState("dark");

  // Determine who is X and who is O based on who started
  const humanMark = firstMove === "HUMAN" ? "X" : "O";
  const aiMark = firstMove === "AI" ? "X" : "O";

  // const winner = checkWinner(board);

  // let statusText;

  // if (winner === "X") statusText = "You win!";
  // else if (winner === "O") statusText = "Computer wins!";
  // else if (turn === "player") statusText = "Your turn";
  // else statusText = "Computer thinking...";

  // Check Game Status synchronously during render
  let gameResult = null;
  if (checkWinner(board, humanMark)) gameResult = "win";
  else if (checkWinner(board, aiMark)) gameResult = "loss";
  else if (isDraw(board)) gameResult = "draw";

  // AI Turn Effect
  useEffect(() => {
    if (turn === "AI" && !gameResult) {
      // Small delay so the AI doesn't feel instantly robotic
      const timer = setTimeout(() => {
        const boardCopy = [...board]; // Copy board so we don't mutate state directly
        const move = minimax(boardCopy, 0, -Infinity, Infinity, true, aiMark, humanMark);

        if (move.index !== -1) {
          const newBoard = [...board];
          newBoard[move.index] = aiMark;
          setBoard(newBoard);
          setTurn("HUMAN");
        }
      }, 1); 
      return () => clearTimeout(timer);
    }
  }, [turn, board, gameResult, aiMark, humanMark]);

  function handlePlayerMove(index) {
    // Prevent move if cell is taken, it's not player's turn, or game is over
    if (board[index] !== null || turn !== "HUMAN" || gameResult) return;

    const newBoard = [...board];
    newBoard[index] = humanMark;
    setBoard(newBoard);
    setTurn("AI");
  }

  function resetGame() {
    // Swap who starts the next game
    const nextFirst = firstMove === "AI" ? "HUMAN" : "AI";
    setFirstMove(nextFirst);
    setTurn(nextFirst); 
    setBoard(Array(9).fill(null));
  }

  const activeTheme = themes[theme];

  // Modal styling mapping matching your vanilla logic
  const modalUI = {
    win: { bg: "#198754", text: "You Win!" },
    loss: { bg: "#dc3545", text: "You Lose!" },
    draw: { bg: "#fd7e14", text: "Draw!" }
  };

  return (
    <div
      style={{
        height: "100vh",
        background: activeTheme.background,
        position: "relative"
      }}
    >
      {/* <h1 class="title">Tic-Tac-Toe</h1> */}

      <GameScene board={board} onMove={handlePlayerMove} theme={activeTheme} />

      {/* <div className="statusPanel">{statusText}</div> */}
      
      <button className="uiButton resetButton" onClick={resetGame}>
        Reset
      </button>

      <button
        className="uiButton themeButton"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        Theme
      </button>

      {/* React-driven Modal replacing window.onclick and querySelectors */}
      {gameResult && (
        <div 
          className="modal" onClick={resetGame}>
          <div className="modal-content" style={{ backgroundColor: modalUI[gameResult].bg }}>
            {modalUI[gameResult].text}
          </div>
        </div>
      )}
    </div>
  );
}