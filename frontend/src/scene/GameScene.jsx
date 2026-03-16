import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Board from "./Board";
import { Environment } from "@react-three/drei";
import CameraController from "./CameraController";

export default function GameScene({ board, onMove, theme, focus, setFocus }) {
  return (
    <Canvas camera={{ position: [0, 0, 20], fov: 70 }}>
      <ambientLight intensity={0.3} />

      <directionalLight position={[5, 5, 5]} intensity={1.5} />

      <Environment preset="city" />

      <CameraController focus={focus} />

      <Board board={board} onMove={onMove} theme={theme} setFocus={setFocus} />

      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}
