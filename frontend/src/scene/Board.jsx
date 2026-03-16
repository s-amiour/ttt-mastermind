import { useThree } from "@react-three/fiber";
import Cell from "./Cell";
import Grid from "./Grid";

export default function Board({ board, onMove, theme, setFocus }) {
  const { size } = useThree();

  let scale = 1;

  if (size.width < 420) {
    scale = 0.74;
  } else if (size.width < 640) {
    scale = 0.86;
  } else if (size.width < 900) {
    scale = 0.9;
  }

  if (size.height < 760) {
    scale *= 0.96;
  }

  return (
    <group scale={scale}>
      <Grid theme={theme} />
      {board.map((value, i) => (
        <Cell
          key={i}
          index={i}
          value={value}
          onClick={onMove}
          theme={theme}
          setFocus={setFocus}
        />
      ))}
    </group>
  );
}
