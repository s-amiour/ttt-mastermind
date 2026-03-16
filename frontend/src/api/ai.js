const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

export async function getComputerMove(board, { signal } = {}) {
  const response = await fetch(`${API_URL}/ai/move`, {
    method: "POST",
    signal,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      board,
    }),
  });

  if (!response.ok) {
    throw new Error(`AI request failed with status ${response.status}`);
  }

  const data = await response.json();
  const { move } = data;

  if (!Number.isInteger(move) || move < 0 || move > 8) {
    throw new Error("AI returned an invalid move.");
  }

  if (board[move] !== null) {
    throw new Error("AI selected an occupied cell.");
  }

  return move;
}
