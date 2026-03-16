export default function OMark({ color }) {
  return (
    <mesh>
      <torusGeometry args={[0.6, 0.22, 32, 100]} />

      <meshPhysicalMaterial
        color={color}
        transmission={1}
        roughness={0}
        thickness={0.6}
        ior={1.5}
        metalness={0}
        transparent
        opacity={1}
      />
    </mesh>
  );
}
