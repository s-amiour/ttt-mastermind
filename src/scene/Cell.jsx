import { useState } from "react";
import XMark from "./XMark";
import OMark from "./OMark";

export default function Cell({ index, value, onClick, theme }) {
  const [hovered, setHovered] = useState(false);

  const spacing = 2;

  const col = index % 3;
  const row = Math.floor(index / 3);

  const x = (col - 1) * spacing;
  const y = (1 - row) * spacing;

  return (
    <group position={[x, y, 0]}>
      {/* Hover highlight */}
      {hovered && value === null && (
        <mesh position={[0, 0, -0.05]}>
          <planeGeometry args={[1.9, 1.9]} />
          <meshBasicMaterial color={theme.xColor} transparent opacity={0.2} />
        </mesh>
      )}

      {/* Clickable area */}
      <mesh
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onClick={(e) => {
          e.stopPropagation();
          onClick(index);
        }}
      >
        <planeGeometry args={[1.8, 1.8]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {value === "X" && <XMark color={theme.xColor} />}
      {value === "O" && <OMark color={theme.oColor} />}
    </group>
  );
}