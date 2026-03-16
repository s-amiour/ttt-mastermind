import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Board from "./Board";
import { Environment } from "@react-three/drei";

export default function GameScene({ board, onMove, theme }) {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
      <ambientLight intensity={0.3} />

      <directionalLight position={[5, 5, 5]} intensity={1.5} />

      <Environment preset="city" />

      <Board board={board} onMove={onMove} theme={theme} />

      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}
