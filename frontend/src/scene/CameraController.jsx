import { useThree, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function CameraController({ focus }) {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3(0, 0, 6));

  useFrame(() => {
    if (focus) {
      target.current.set(focus[0] * 0.4, focus[1] * 0.4 + 0.5, 6);
    } else {
      target.current.set(0, 0, 6);
    }

    camera.position.lerp(target.current, 0.08);
    camera.lookAt(0, 0, 0);
  });

  return null;
}
