import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function OMark({ color }) {
  const meshRef = useRef(null);

  useFrame(() => {
    if (!meshRef.current) return;

    const nextScale = Math.min(meshRef.current.scale.x + 0.12, 1);
    meshRef.current.scale.setScalar(nextScale);
  });

  return (
    <mesh ref={meshRef} scale={0.2}>
      <torusGeometry args={[0.6, 0.22, 32, 100]} />

      <meshPhysicalMaterial
        color={color}
        transmission={1}
        roughness={0}
        thickness={0.6}
        ior={1.5}
        metalness={0}
        emissive={color}
        emissiveIntensity={0.65}
        clearcoat={1}
        clearcoatRoughness={0.06}
        transparent
        opacity={1}
      />
    </mesh>
  );
}
