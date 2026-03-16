export async function getComputerMove(board) {
  const response = await fetch(
    "http://localhost:3001/ai/move",

    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        board,
      }),
    },
  );

  const data = await response.json();

  return data.move;
}
