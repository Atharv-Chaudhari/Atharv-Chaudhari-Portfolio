'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

function Fireflies() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const a = new Float32Array(180 * 3);
    for (let i = 0; i < 180; i++) {
      a[i * 3] = (Math.random() - .5) * 18;
      a[i * 3 + 1] = (Math.random() - .5) * 9;
      a[i * 3 + 2] = (Math.random() - .5) * 8;
    }
    return a;
  }, []);
  useFrame(({ clock, pointer }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * .012 + pointer.x * .03;
    ref.current.rotation.x = Math.sin(clock.elapsedTime * .15) * .02 + pointer.y * .015;
    const mat = ref.current.material as THREE.PointsMaterial;
    mat.opacity = .35 + Math.sin(clock.elapsedTime * 1.4) * .12;
  });
  return <points ref={ref} position={[0, .8, -1]}><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} count={positions.length / 3} array={positions} itemSize={3} /></bufferGeometry><pointsMaterial size={.045} color="#ffe8a8" transparent opacity={.4} depthWrite={false} /></points>;
}

export default function Ambient3D() {
  return <Canvas className="ambient-3d" dpr={[1, 1.5]} camera={{ position: [0, 0, 8], fov: 55 }} gl={{ alpha: true, antialias: true }}><Fireflies /></Canvas>;
}
