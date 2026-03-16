import { useThree, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function CameraController({ focus }) {
  const { camera, size } = useThree();
  const target = useRef(new THREE.Vector3(0, 0, 6));

  useFrame(() => {
    const aspectRatio = size.width / size.height;
    let baseZ = 6;
    let focusYOffset = 0.5;

    if (size.width < 420) {
      baseZ = 9.1;
      focusYOffset = 0.22;
    } else if (size.width < 640) {
      baseZ = 8.2;
      focusYOffset = 0.28;
    } else if (size.width < 900) {
      baseZ = 7.5;
      focusYOffset = 0.34;
    }

    if (size.height < 760) {
      baseZ += 0.45;
      focusYOffset *= 0.88;
    }

    if (aspectRatio < 0.7) {
      baseZ += 0.35;
      focusYOffset *= 0.9;
    }

    if (focus) {
      target.current.set(focus[0] * 0.34, focus[1] * 0.34 + focusYOffset, baseZ);
    } else {
      target.current.set(0, 0, baseZ);
    }

    camera.position.lerp(target.current, 0.08);
    camera.lookAt(0, 0, 0);
  });

  return null;
}
