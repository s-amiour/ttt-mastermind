import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function XMark({ color }) {
  const groupRef = useRef(null);
  const thickness = 0.35;
  const length = 1.2;

  const glassMaterial = {
    color: color,
    transmission: 1,
    roughness: 0,
    thickness: 0.6,
    ior: 1.5,
    metalness: 0,
    emissive: color,
    emissiveIntensity: 0.65,
    clearcoat: 1,
    clearcoatRoughness: 0.06,
    transparent: true,
    opacity: 1,
  };

  useFrame(() => {
    if (!groupRef.current) return;

    const nextScale = Math.min(groupRef.current.scale.x + 0.12, 1);
    groupRef.current.scale.setScalar(nextScale);
  });

  return (
    <group ref={groupRef} scale={0.2}>
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
