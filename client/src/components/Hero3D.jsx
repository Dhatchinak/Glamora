import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

/* ── Floating cosmetic objects ── */
function Lipstick({ position, rotation }) {
  const ref = useRef();
  useFrame((state) => {
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4 + rotation) * 0.3;
    ref.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.3 + rotation) * 0.15;
  });
  return (
    <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.6}>
      <group ref={ref} position={position} scale={0.38}>
        {/* tube body */}
        <mesh position={[0, -0.6, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 1.6, 16]} />
          <meshStandardMaterial color="#c9a84c" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* cap */}
        <mesh position={[0, 0.55, 0]}>
          <cylinderGeometry args={[0.24, 0.24, 0.5, 16]} />
          <meshStandardMaterial color="#b8942f" metalness={0.95} roughness={0.05} />
        </mesh>
        {/* bullet */}
        <mesh position={[0, 0.95, 0]}>
          <cylinderGeometry args={[0.13, 0.18, 0.5, 16]} />
          <meshStandardMaterial color="#d28c82" metalness={0.2} roughness={0.4} />
        </mesh>
        <mesh position={[0, 1.18, 0]}>
          <sphereGeometry args={[0.13, 12, 12]} />
          <meshStandardMaterial color="#c87878" metalness={0.2} roughness={0.4} />
        </mesh>
      </group>
    </Float>
  );
}

function Scissors({ position, rotation }) {
  const ref = useRef();
  useFrame((state) => {
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5 + rotation) * 0.2;
  });
  const goldMat = new THREE.MeshStandardMaterial({ color: '#c9a84c', metalness: 0.95, roughness: 0.05 });
  return (
    <Float speed={1.1} rotationIntensity={0.4} floatIntensity={0.5}>
      <group ref={ref} position={position} scale={0.3} rotation={[0.3, rotation, 0.4]}>
        <mesh material={goldMat} position={[-0.15, 0.4, 0]} rotation={[0, 0, 0.25]}>
          <boxGeometry args={[0.08, 1.5, 0.06]} />
        </mesh>
        <mesh material={goldMat} position={[0.15, 0.4, 0]} rotation={[0, 0, -0.25]}>
          <boxGeometry args={[0.08, 1.5, 0.06]} />
        </mesh>
        <mesh material={goldMat} position={[0, -0.25, 0]}>
          <torusGeometry args={[0.18, 0.05, 8, 20, Math.PI]} />
        </mesh>
        <mesh material={goldMat} position={[0.32, -0.25, 0]}>
          <torusGeometry args={[0.18, 0.05, 8, 20, Math.PI]} />
        </mesh>
      </group>
    </Float>
  );
}

function HairDryer({ position, rotation }) {
  const ref = useRef();
  useFrame((state) => {
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.35 + rotation) * 0.15;
    ref.current.rotation.y += 0.004;
  });
  return (
    <Float speed={0.9} rotationIntensity={0.25} floatIntensity={0.55}>
      <group ref={ref} position={position} scale={0.32} rotation={[0.2, rotation, -0.3]}>
        {/* body */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.28, 0.22, 1.4, 16]} />
          <meshStandardMaterial color="#2c2820" metalness={0.5} roughness={0.3} />
        </mesh>
        {/* nozzle */}
        <mesh position={[0, 0.85, 0]} rotation={[0.4, 0, 0]}>
          <cylinderGeometry args={[0.16, 0.25, 0.6, 12]} />
          <meshStandardMaterial color="#1a1510" metalness={0.6} roughness={0.2} />
        </mesh>
        {/* gold ring accents */}
        <mesh position={[0, 0.2, 0]}>
          <torusGeometry args={[0.29, 0.025, 8, 32]} />
          <meshStandardMaterial color="#c9a84c" metalness={0.95} roughness={0.05} />
        </mesh>
        {/* handle */}
        <mesh position={[0, -0.7, 0.25]} rotation={[0.5, 0, 0]}>
          <cylinderGeometry args={[0.14, 0.12, 0.9, 12]} />
          <meshStandardMaterial color="#211e16" metalness={0.4} roughness={0.4} />
        </mesh>
      </group>
    </Float>
  );
}

function PerfumeBottle({ position }) {
  const ref = useRef();
  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.25;
  });
  return (
    <Float speed={1.6} rotationIntensity={0.2} floatIntensity={0.8}>
      <group ref={ref} position={position} scale={0.35}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.7, 1.1, 0.35]} />
          <MeshDistortMaterial color="#f8c8dc" metalness={0.1} roughness={0.05} transparent opacity={0.75} distort={0.08} speed={2} />
        </mesh>
        <mesh position={[0, 0.7, 0]}>
          <cylinderGeometry args={[0.09, 0.09, 0.35, 12]} />
          <meshStandardMaterial color="#c9a84c" metalness={0.95} roughness={0.05} />
        </mesh>
        <mesh position={[0, 0.92, 0]}>
          <sphereGeometry args={[0.14, 12, 12]} />
          <meshStandardMaterial color="#b8942f" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
    </Float>
  );
}

function GlowOrb({ position, color, scale = 1 }) {
  const ref = useRef();
  useFrame((state) => {
    ref.current.scale.setScalar(scale * (1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.06));
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.65, 32, 32]} />
      <MeshDistortMaterial color={color} metalness={0} roughness={0.1} transparent opacity={0.12} distort={0.35} speed={1.5} />
    </mesh>
  );
}

export default function Hero3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} color="#e8c97a" />
      <directionalLight position={[-4, -3, -5]} intensity={0.5} color="#f8c8dc" />
      <pointLight position={[2, 2, 3]} intensity={0.8} color="#c9a84c" />
      <pointLight position={[-3, 1, 2]} intensity={0.6} color="#d28c82" />

      {/* Sparkles */}
      <Sparkles count={120} scale={10} size={1.2} speed={0.3} color="#c9a84c" opacity={0.6} />
      <Sparkles count={60} scale={8} size={0.8} speed={0.5} color="#f8c8dc" opacity={0.4} />

      {/* Floating cosmetics */}
      <Lipstick position={[3.2, 1.2, -1]}  rotation={0} />
      <Lipstick position={[-3.5, -0.8, -2]} rotation={2.1} />
      <Scissors position={[2.8, -1.5, 0.5]} rotation={1.2} />
      <Scissors position={[-2.2, 1.8, -1.5]} rotation={3.5} />
      <HairDryer position={[-3.8, 0.5, -0.5]} rotation={0.8} />
      <HairDryer position={[3.5, -0.3, -2]} rotation={2.5} />
      <PerfumeBottle position={[1.5, 2.2, 0.5]} />
      <PerfumeBottle position={[-1.2, -2.2, -1]} />

      {/* Ambient glow orbs */}
      <GlowOrb position={[0, 0, -2]} color="#c9a84c" scale={2.5} />
      <GlowOrb position={[3, -2, -4]} color="#f8c8dc" scale={2} />
      <GlowOrb position={[-4, 2, -5]} color="#e8d5f0" scale={1.8} />
    </Canvas>
  );
}
