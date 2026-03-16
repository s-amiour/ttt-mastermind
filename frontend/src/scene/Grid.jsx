export default function Grid({ theme }) {
  const thickness = 0.12;
  const size = 6;

  return (
    <group>
      <mesh position={[0, 0, -0.42]} receiveShadow>
        <boxGeometry args={[7.5, 7.5, 0.45]} />
        <meshPhysicalMaterial
          color={theme.baseColor}
          roughness={0.18}
          metalness={0.3}
          clearcoat={1}
          clearcoatRoughness={0.12}
        />
      </mesh>

      <mesh position={[0, 0, -0.15]}>
        <planeGeometry args={[7.15, 7.15]} />
        <meshBasicMaterial color={theme.baseEdge} transparent opacity={0.18} />
      </mesh>

      <mesh position={[-1, 0, -0.1]}>
        <boxGeometry args={[thickness, size, thickness]} />
        <meshStandardMaterial
          color={theme.gridColor}
          emissive={theme.gridEmissive}
          emissiveIntensity={0.4}
          roughness={0.22}
          metalness={0.72}
        />
      </mesh>

      <mesh position={[1, 0, -0.1]}>
        <boxGeometry args={[thickness, size, thickness]} />
        <meshStandardMaterial
          color={theme.gridColor}
          emissive={theme.gridEmissive}
          emissiveIntensity={0.4}
          roughness={0.22}
          metalness={0.72}
        />
      </mesh>

      <mesh position={[0, 1, -0.1]}>
        <boxGeometry args={[size, thickness, thickness]} />
        <meshStandardMaterial
          color={theme.gridColor}
          emissive={theme.gridEmissive}
          emissiveIntensity={0.4}
          roughness={0.22}
          metalness={0.72}
        />
      </mesh>

      <mesh position={[0, -1, -0.1]}>
        <boxGeometry args={[size, thickness, thickness]} />
        <meshStandardMaterial
          color={theme.gridColor}
          emissive={theme.gridEmissive}
          emissiveIntensity={0.4}
          roughness={0.22}
          metalness={0.72}
        />
      </mesh>

      <mesh position={[0, 0, -0.47]}>
        <ringGeometry args={[3.4, 3.9, 64]} />
        <meshBasicMaterial color={theme.xColor} transparent opacity={0.1} />
      </mesh>
    </group>
  );
}
