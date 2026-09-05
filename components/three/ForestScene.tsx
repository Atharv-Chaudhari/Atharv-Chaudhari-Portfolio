 "use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, OrbitControls, Sparkles, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useRef } from "react";

function Waterfall({ dark }: { dark: boolean }) {
  const drops = useMemo(() => Array.from({ length: 650 }, () => ({
    x: (Math.random() - .5) * 3.3,
    y: Math.random() * 3.8,
    z: (Math.random() - .5) * .45,
    s: .008 + Math.random() * .024
  })), []);
  return <group>
    <mesh position={[0, 0, -.2]}>
      <planeGeometry args={[3.5, 4.3, 32, 32]} />
      <meshPhysicalMaterial transparent opacity={dark ? .42 : .28} roughness={.04}
        transmission={.25} color={dark ? "#83ddff" : "#4b9fc3"} />
    </mesh>
    {drops.map((d, i) => <mesh key={i} position={[d.x, d.y - 1.8, d.z]} scale={[d.s, d.s * 7, d.s]}>
      <sphereGeometry args={[1, 5, 5]} />
      <meshBasicMaterial transparent opacity={dark ? .62 : .35} color={dark ? "#d5f7ff" : "#55a8c5"} />
    </mesh>)}
  </group>;
}

function Trees({ dark }: { dark: boolean }) {
  const trees = useMemo(() => Array.from({ length: 72 }, () => ({
    x: (Math.random() - .5) * 14,
    z: -Math.random() * 8 - .8,
    h: 1.7 + Math.random() * 4.5,
    r: .11 + Math.random() * .24
  })), []);
  return <group>
    {trees.map((t, i) => <group key={i} position={[t.x, -2, t.z]}>
      <mesh position={[0, t.h / 2, 0]}>
        <cylinderGeometry args={[t.r, t.r * 1.55, t.h, 7]} />
        <meshStandardMaterial color={dark ? "#30271f" : "#5c432e"} roughness={.95} />
      </mesh>
      <mesh position={[0, t.h * .98, 0]} scale={[1.15, 1.35, 1.15]}>
        <icosahedronGeometry args={[.78 + Math.random() * .7, 1]} />
        <meshStandardMaterial color={dark ? "#173d32" : "#4e7a57"} roughness={1} />
      </mesh>
    </group>)}
  </group>;
}

function Rocks() {
  const rocks = useMemo(() => Array.from({ length: 26 }, () => ({
    x: (Math.random() - .5) * 4.4,
    y: -1.94 + Math.random() * .08,
    z: Math.random() * 3 - 1.3,
    s: .2 + Math.random() * .55,
    ry: Math.random() * 3
  })), []);
  return <group>{rocks.map((r, i) => <mesh key={i} position={[r.x, r.y, r.z]}
    scale={[r.s * 1.3, r.s * .55, r.s]} rotation={[0, r.ry, 0]}>
    <dodecahedronGeometry args={[1, 0]} />
    <meshStandardMaterial color="#65716c" roughness={1} />
  </mesh>)}</group>;
}

function RobotCore({ dark }: { dark: boolean }) {
  const core = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);
  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    if (core.current) {
      core.current.position.y = .48 + Math.sin(t * 1.25) * .10;
      core.current.rotation.y += dt * .18;
    }
    if (ring.current) ring.current.rotation.z -= dt * .65;
  });
  const glow = dark ? "#8be7ff" : "#6f74dc";
  return <group ref={core}>
    <mesh>
      <icosahedronGeometry args={[.52, 2]} />
      <MeshTransmissionMaterial thickness={.6} roughness={.1} transmission={1}
        ior={1.35} chromaticAberration={.12} color={glow} />
    </mesh>
    <mesh ref={ring} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[.78, .018, 10, 96]} />
      <meshBasicMaterial color={glow} transparent opacity={.85} />
    </mesh>
    <mesh rotation={[0, Math.PI / 2, Math.PI / 5]}>
      <torusGeometry args={[.65, .012, 10, 96]} />
      <meshBasicMaterial color={dark ? "#d7fbff" : "#8c7df0"} transparent opacity={.65} />
    </mesh>
    <pointLight color={glow} intensity={dark ? 5 : 2.2} distance={5} />
  </group>;
}

function TechParticles({ dark }: { dark: boolean }) {
  return <>
    <Sparkles count={dark ? 220 : 110} scale={[12, 6, 9]} size={dark ? 2.4 : 1.45}
      speed={.32} opacity={dark ? .62 : .28} color={dark ? "#c8f5ff" : "#657d9b"} />
    <Sparkles count={dark ? 90 : 35} scale={[7, 4, 6]} size={dark ? 3.2 : 1.8}
      speed={.7} opacity={dark ? .38 : .18} color={dark ? "#a5ffd2" : "#6d9b78"} />
  </>;
}

function Scene({ dark }: { dark: boolean }) {
  const water = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (water.current) {
      const t = state.clock.elapsedTime;
      water.current.position.y = -2.15 + Math.sin(t * .8) * .015;
      water.current.rotation.z = Math.sin(t * .15) * .004;
    }
  });

  return <>
    <color attach="background" args={[dark ? "#050b13" : "#e5f0eb"]} />
    <fog attach="fog" args={[dark ? "#050b13" : "#e5f0eb", 6, 18]} />
    <ambientLight intensity={dark ? .38 : .8} />
    <directionalLight position={[-4, 7, 3]} intensity={dark ? 2.3 : 3} color={dark ? "#d6f5ff" : "#fff0d4"} castShadow />
    <pointLight position={[2, 1, 2]} intensity={dark ? 5.5 : 2} distance={8} color={dark ? "#8edfff" : "#ffd39a"} />
    <Trees dark={dark} />
    <Rocks />
    <Waterfall dark={dark} />

    <mesh ref={water} position={[0, -2.15, 1.7]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[8, 8, 50, 50]} />
      <meshPhysicalMaterial color={dark ? "#0d303c" : "#75aaa9"} roughness={.07}
        metalness={.12} transmission={.2} transparent opacity={.9} />
    </mesh>

    <Float speed={1.4} rotationIntensity={.15} floatIntensity={.2}>
      <RobotCore dark={dark} />
    </Float>

    <TechParticles dark={dark} />
    <Environment preset={dark ? "forest" : "park"} />
    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={.22}
      minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 1.9} />
  </>;
}

export default function ForestScene({ dark }: { dark: boolean }) {
  return <div className="scene">
    <Canvas camera={{ position: [0, 1.05, 8], fov: 43 }} dpr={[1, 1.7]} gl={{ antialias: true, alpha: true }}>
      <Scene dark={dark} />
    </Canvas>
  </div>;
}
