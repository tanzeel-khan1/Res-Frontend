import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function RotatingRing() {
  const ringRef = useRef();

  useFrame(() => {
    if (ringRef.current) {
      ringRef.current.rotation.x += 0.002;
      ringRef.current.rotation.y += 0.004;
    }
  });

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[2.5, 0.08, 32, 100]} />
      <meshStandardMaterial
        color="#fbbf24"
        emissive="#f59e0b"
        emissiveIntensity={2}
      />
    </mesh>
  );
}

function Particles() {
  const points = useRef();

  const particles = useMemo(() => {
    const positions = new Float32Array(1500);

    for (let i = 0; i < 1500; i++) {
      positions[i] = (Math.random() - 0.5) * 15;
    }

    return positions;
  }, []);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.05;
      points.current.rotation.x = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.03}
        color="#fbbf24"
        sizeAttenuation
      />
    </points>
  );
}

function FloatingLight() {
  const lightRef = useRef();

  useFrame((state) => {
    lightRef.current.position.x =
      Math.sin(state.clock.elapsedTime) * 4;

    lightRef.current.position.z =
      Math.cos(state.clock.elapsedTime) * 4;
  });

  return (
    <pointLight
      ref={lightRef}
      intensity={30}
      color="#fbbf24"
    />
  );
}

export default function SignupBackground() {
  return (
    <Canvas camera={{ position: [0, 0, 6] }}>
      <color attach="background" args={["#181C14"]} />

      <ambientLight intensity={0.5} />

      <FloatingLight />

      <RotatingRing />

      <Particles />

      <Stars
        radius={100}
        depth={50}
        count={4000}
        factor={4}
        fade
      />
    </Canvas>
  );
}