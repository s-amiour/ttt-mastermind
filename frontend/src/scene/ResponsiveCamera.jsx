import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

export default function ResponsiveCamera() {
  const { camera, size } = useThree();

  useEffect(() => {
    const aspectRatio = size.width / size.height;
    let distance = 6;

    if (size.width < 420) {
      distance = 9.1;
    } else if (size.width < 640) {
      distance = 8.2;
    } else if (size.width < 900) {
      distance = 7.5;
    }

    if (size.height < 760) {
      distance += 0.45;
    }

    if (aspectRatio < 0.7) {
      distance += 0.35;
    }

    camera.position.set(0, 0, distance);
  }, [size, camera]);

  return null;
}
