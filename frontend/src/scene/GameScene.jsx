import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Board from "./Board";
import { Environment } from "@react-three/drei";
import CameraController from "./CameraController";
import ResponsiveCamera from "./ResponsiveCamera";
import { isTouchDevice } from "../utils/device";

export default function GameScene({ board, onMove, theme, focus, setFocus }) {
  const touchDevice = isTouchDevice();

  return (
    <Canvas
      camera={{ position: [0, 0, 20], fov: 70 }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.45} />

      <directionalLight position={[5, 5, 5]} intensity={1.8} />
      <pointLight position={[-4, 3, 4]} intensity={12} color={theme.xColor} distance={18} />
      <pointLight position={[4, -2, 4]} intensity={10} color={theme.oColor} distance={18} />

      <Environment preset="city" />

      {!touchDevice && <CameraController focus={focus} />}

      <Board board={board} onMove={onMove} theme={theme} setFocus={setFocus} />

      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      <ResponsiveCamera />
    </Canvas>
  );
}
