import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Text3D } from "@react-three/drei";
import { TextureLoader, ShaderMaterial, Vector2 } from "three";
import { Canvas } from "@react-three/fiber";

const FireText = () => {
  const textRef = useRef(null);
  const fireTexture = useLoader(TextureLoader, "/images/Balrog02.jpg");

  const fireShader = useRef(
    new ShaderMaterial({
      uniforms: {
        fireTexture: { value: fireTexture },
        time: { value: 0 },
        resolution: {
          value: new Vector2(window.innerWidth, window.innerHeight),
        },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D fireTexture;
        uniform float time;
        uniform vec2 resolution;
        varying vec2 vUv;

        void main() {
          vec2 uv = vUv;
          uv.y += sin(uv.x * 10.0 + time * 2.0) * 0.05;
          uv.x += cos(uv.y * 10.0 + time * 1.5) * 0.05;
          vec4 texColor = texture2D(fireTexture, uv);
          gl_FragColor = texColor;
        }
      `,
      transparent: true,
    })
  ).current;

  // Animate time
  useFrame(() => {
    fireShader.uniforms.time.value += 0.02;
  });

  return (
    <Text3D
      ref={textRef}
      font="/fonts/helvetiker_regular.typeface.json"
      size={1}
      height={0.2}
      curveSegments={12}
      bevelEnabled={true}
      bevelThickness={0.05}
      bevelSize={0.05}
      bevelSegments={3}
      position={[0, 0, 0]}
    >
      Fire Text
      <primitive object={fireShader} attach="material" />
    </Text3D>
  );
};

export default function Text3d() {
  return (
    <div className="h-screen w-full">
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <FireText />
      </Canvas>
    </div>
  );
}
