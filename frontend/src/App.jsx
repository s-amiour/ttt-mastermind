import { useState, useEffect, useRef } from "react";
import GameScene from "./scene/GameScene";
import { getComputerMove } from "./api/ai";
import { getGameState } from "./game/checkWinner";
import { themes } from "./styles/theme";

import "./styles/ui.css";

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState("player");
  const [theme, setTheme] = useState("dark");
  const [focusCell, setFocusCell] = useState(null);
  const [aiError, setAiError] = useState(null);
  const pendingTimeoutRef = useRef(null);
  const requestIdRef = useRef(0);

  const { winner, isDraw } = getGameState(board);
  const gameOver = winner !== null || isDraw;
  const isComputerTurn = turn === "computer" && !gameOver && !aiError;

  let statusText;
  let statusClassName = "statusPanel";

  if (aiError) {
    statusText = aiError;
    statusClassName = "statusPanel statusError";
  } else if (winner === "X") {
    statusText = "You win!";
  } else if (winner === "O") {
    statusText = "Computer wins!";
  } else if (isDraw) {
    statusText = "Draw game";
  } else if (turn === "player") {
    statusText = "Your turn";
  } else {
    statusText = "Computer thinking...";
    statusClassName = "statusPanel statusLoading";
  }

  function handlePlayerMove(index) {
    if (board[index] !== null) return;
    if (turn !== "player") return;
    if (gameOver) return;

    const newBoard = [...board];
    newBoard[index] = "X";

    setAiError(null);
    setBoard(newBoard);
    setTurn("computer");
  }

  useEffect(() => {
    const controller = new AbortController();

    async function computerTurn() {
      if (turn === "computer" && !gameOver) {
        try {
          const requestId = requestIdRef.current + 1;
          requestIdRef.current = requestId;
          const move = await getComputerMove(board, {
            signal: controller.signal,
          });

          const newBoard = [...board];
          newBoard[move] = "O";

          pendingTimeoutRef.current = setTimeout(() => {
            if (requestIdRef.current !== requestId) return;
            setBoard(newBoard);
            setTurn("player");
            pendingTimeoutRef.current = null;
          }, 500);
        } catch (error) {
          if (error.name === "AbortError") return;

          setAiError(error.message);
          setTurn("player");
        }
      }
    }

    computerTurn();

    return () => {
      controller.abort();

      if (pendingTimeoutRef.current) {
        clearTimeout(pendingTimeoutRef.current);
        pendingTimeoutRef.current = null;
      }
    };
  }, [board, gameOver, turn]);

  function resetGame() {
    requestIdRef.current += 1;

    if (pendingTimeoutRef.current) {
      clearTimeout(pendingTimeoutRef.current);
      pendingTimeoutRef.current = null;
    }

    setBoard(Array(9).fill(null));
    setTurn("player");
    setAiError(null);
  }

  const activeTheme = themes[theme];

  return (
    <div
      className="appShell"
      style={{
        height: "100vh",
        background: activeTheme.background,
        color: activeTheme.text,
        "--surface": activeTheme.surface,
        "--surface-strong": activeTheme.surfaceStrong,
        "--surface-border": activeTheme.surfaceBorder,
        "--text-color": activeTheme.text,
        "--text-muted": activeTheme.textMuted,
        "--glow-color": activeTheme.glow,
        "--glow-alt": activeTheme.glowAlt,
        "--accent-x": activeTheme.xColor,
        "--accent-o": activeTheme.oColor,
      }}
      data-theme={theme}
    >
      <div className="backgroundGlow backgroundGlowPrimary" />
      <div className="backgroundGlow backgroundGlowSecondary" />

      <header className="topBar">
        <div className="brandBlock">
          <p className="eyebrow">3D strategy playground</p>
          <h1>Tic-Tac-Toe Mastermind</h1>
          <p className="subtitle">Play the board, read the rhythm, outsmart the machine.</p>
        </div>

        <div className="controlGroup">
          <button className="uiButton resetButton" onClick={resetGame}>
            New Game
          </button>

          <button
            className="uiButton themeButton"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            disabled={isComputerTurn}
          >
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </header>

      <section className="sceneFrame">
        <div className="sceneHalo" />

        <div className="statusWrap">
          <div className={statusClassName} aria-live="polite">
            {statusText}
          </div>
        </div>

        <div className="sceneViewport">
          <GameScene
            board={board}
            onMove={handlePlayerMove}
            theme={activeTheme}
            focus={focusCell}
            setFocus={setFocusCell}
          />
        </div>

        <div className="legend">
          <span className="legendItem">
            <span className="legendDot legendDotX" />
            You
          </span>
          <span className="legendItem">
            <span className="legendDot legendDotO" />
            Computer
          </span>
        </div>
      </section>
    </div>
  );
}
