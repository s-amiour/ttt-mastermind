export default function Grid() {
  const thickness = 0.12;
  const size = 6;

  return (
    <group>
      {/* Vertical lines */}

      <mesh position={[-1, 0, -0.1]}>
        <boxGeometry args={[thickness, size, thickness]} />
        <meshStandardMaterial color="#888" />
      </mesh>

      <mesh position={[1, 0, -0.1]}>
        <boxGeometry args={[thickness, size, thickness]} />
        <meshStandardMaterial color="#888" />
      </mesh>

      {/* Horizontal lines */}

      <mesh position={[0, 1, -0.1]}>
        <boxGeometry args={[size, thickness, thickness]} />
        <meshStandardMaterial color="#888" />
      </mesh>

      <mesh position={[0, -1, -0.1]}>
        <boxGeometry args={[size, thickness, thickness]} />
        <meshStandardMaterial color="#888" />
      </mesh>
    </group>
  );
}
