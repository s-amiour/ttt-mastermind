export default function XMark({ color }) {
  const thickness = 0.35;
  const length = 1.2;

  const glassMaterial = {
    color: color,
    transmission: 1,
    roughness: 0,
    thickness: 0.6,
    ior: 1.5,
    metalness: 0,
    transparent: true,
    opacity: 1,
  };

  return (
    <group>
      <mesh rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[length, thickness, thickness]} />
        <meshPhysicalMaterial {...glassMaterial} />
      </mesh>

      <mesh rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={[length, thickness, thickness]} />
        <meshPhysicalMaterial {...glassMaterial} />
      </mesh>
    </group>
  );
}
