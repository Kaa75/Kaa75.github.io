'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Stars, Edges } from '@react-three/drei';
import * as THREE from 'three';

/** Shared mouse position — updated outside React render to avoid state churn */
const mouse = { x: 0, y: 0 };
if (typeof window !== 'undefined') {
  window.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
  });
}

function HeroMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const color = useMemo(() => new THREE.Color('#3b82f6'), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.sin(t * 0.12) * 0.12 + mouse.y * 0.08;
    meshRef.current.rotation.y = t * 0.07 + mouse.x * 0.06;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={1.5}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color={color}
          roughness={0.08}
          metalness={0.92}
          distort={0.22}
          speed={1.3}
          transparent
          opacity={0.92}
        />
        {/* Wire-edge highlight for depth */}
        <Edges scale={1.01} threshold={15} color="#93c5fd" />
      </mesh>
    </Float>
  );
}

function OrbitRings() {
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring3 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ring1.current) {
      ring1.current.rotation.x = t * 0.28 + mouse.y * 0.3;
      ring1.current.rotation.y = t * 0.18 + mouse.x * 0.3;
    }
    if (ring2.current) {
      ring2.current.rotation.x = -t * 0.2 + mouse.y * 0.2;
      ring2.current.rotation.z = t * 0.24;
    }
    if (ring3.current) {
      ring3.current.rotation.y = -t * 0.15;
      ring3.current.rotation.z = t * 0.12 + mouse.x * 0.15;
    }
  });

  return (
    <>
      <mesh ref={ring1}>
        <torusGeometry args={[2.1, 0.009, 8, 120]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.55} />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI / 3, 0.4, 0]}>
        <torusGeometry args={[2.6, 0.006, 8, 120]} />
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.35} />
      </mesh>
      <mesh ref={ring3} rotation={[0.3, 0, Math.PI / 5]}>
        <torusGeometry args={[3.2, 0.004, 8, 120]} />
        <meshBasicMaterial color="#2563eb" transparent opacity={0.22} />
      </mesh>
    </>
  );
}

function Particles() {
  const count = 180;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
      dummy.position.set(
        positions[i * 3]     + Math.sin(t * 0.25 + i * 0.4) * 0.2,
        positions[i * 3 + 1] + Math.cos(t * 0.18 + i * 0.4) * 0.2,
        positions[i * 3 + 2]
      );
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.018, 6, 6]} />
      <meshBasicMaterial color="#93c5fd" transparent opacity={0.4} />
    </instancedMesh>
  );
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      aria-hidden="true"
    >
      {/* Ambient + directional + colored fill */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 5]} intensity={1.4} />
      <pointLight position={[2, 1, 3]}  intensity={2.5} color="#3b82f6" />
      <pointLight position={[-3, -2, 2]} intensity={1.2} color="#2563eb" />
      <pointLight position={[0, 4, -2]} intensity={0.8} color="#60a5fa" />

      {/* Background starfield */}
      <Stars radius={80} depth={40} count={2500} factor={3} saturation={0} fade speed={0.8} />

      {/* Main scene group — offset right on desktop */}
      <group position={[1.6, 0, 0]}>
        <HeroMesh />
        <OrbitRings />
      </group>

      {/* Particles across full canvas */}
      <Particles />
    </Canvas>
  );
}
