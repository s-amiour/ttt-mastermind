import Cell from "./Cell";
import Grid from "./Grid";

export default function Board({ board, onMove, theme }) {
  return (
    <group>
      <Grid />
      {board.map((value, i) => (
        <Cell key={i} index={i} value={value} onClick={onMove} theme={theme} />
      ))}
    </group>
  );
}
