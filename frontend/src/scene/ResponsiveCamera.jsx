import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

export default function ResponsiveCamera() {
  const { camera, size } = useThree();

  useEffect(() => {
    if (size.width < 600) {
      camera.position.set(0, 0, 8);
    } else {
      camera.position.set(0, 0, 6);
    }
  }, [size, camera]);

  return null;
}
