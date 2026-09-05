"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, Sparkles, Float } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useRef } from "three";
import { useRef as useReactRef } from "react";

function Trees({ dark }: { dark: boolean }) {
  const trees = useMemo(() => Array.from({ length: 95 }, (_, i) => {
    const side = i % 2 ? 1 : -1;
    return {
      x: side * (2.7 + Math.random() * 5.7),
      z: -1.5 - Math.random() * 11,
      h: 2.8 + Math.random() * 5.4,
      s: .65 + Math.random() * .75
    };
  }), []);
  return <group>
    {trees.map((t, i) => <group key={i} position={[t.x, -2.1, t.z]} scale={t.s}>
      <mesh position={[0, t.h/2, 0]}>
        <cylinderGeometry args={[.12, .27, t.h, 7]} />
        <meshStandardMaterial color={dark ? "#263d2e" : "#60452d"} roughness={1} />
      </mesh>
      <mesh position={[0, t.h*.86, 0]}>
        <dodecahedronGeometry args={[1.05, 1]} />
        <meshStandardMaterial color={dark ? "#234d39" : "#3f7147"} roughness={1} />
      </mesh>
      <mesh position={[.28, t.h*1.08, .08]} scale={.68}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color={dark ? "#2d5a40" : "#5d8b55"} roughness={1} />
      </mesh>
    </group>)}
  </group>;
}

function Cliff({ position, scale, dark }: any) {
  return <mesh position={position} scale={scale}>
    <dodecahedronGeometry args={[1, 1]} />
    <meshStandardMaterial color={dark ? "#37433b" : "#72786c"} roughness={1} />
  </mesh>;
}

function Waterfall({ dark }: { dark: boolean }) {
  const drops = useMemo(() => Array.from({ length: 480 }, () => ({
    x: (Math.random()-.5)*2.3,
    y: Math.random()*4.7,
    z: (Math.random()-.5)*.35
  })), []);
  return <group position={[0, .05, -6.2]}>
    <mesh position={[0, .4, 0]}>
      <planeGeometry args={[2.8, 5.2]} />
      <meshPhysicalMaterial color={dark ? "#6fa9ad" : "#8ccbd0"} transparent opacity={.54} roughness={.08} transmission={.18} />
    </mesh>
    {drops.map((d,i)=><mesh key={i} position={[d.x,d.y-2,d.z]} scale={[.012,.045,.012]}>
      <sphereGeometry args={[1,5,5]} />
      <meshBasicMaterial color={dark ? "#c9eff1" : "#eefcff"} transparent opacity={.65} />
    </mesh>)}
    <mesh position={[0,-2.12,.2]} scale={[1.8,.28,1]}>
      <sphereGeometry args={[1,24,12]} />
      <meshStandardMaterial color={dark ? "#345e62" : "#73aeb0"} roughness={.2} />
    </mesh>
  </group>;
}

function River({ dark }: { dark: boolean }) {
  const ref = useReactRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.z = 1.2 + Math.sin(state.clock.elapsedTime*.28)*.035;
  });
  return <mesh ref={ref} rotation={[-Math.PI/2,0,0]} position={[0,-2.22,1.8]} scale={[1.8,5.8,1]}>
    <planeGeometry args={[4.4,7.5,48,48]} />
    <meshPhysicalMaterial color={dark ? "#214e58" : "#76b5b5"} roughness={.12} metalness={.04} transmission={.15} transparent opacity={.9} />
  </mesh>;
}

function Fireflies({ dark }: { dark: boolean }) {
  return <Sparkles count={dark ? 75 : 30} scale={[10,5,10]} size={dark ? 1.5 : 1.1}
    speed={.22} opacity={dark ? .32 : .14} color={dark ? "#d7f5c9" : "#fff4bc"} />;
}

function HiddenTech({ dark }: { dark: boolean }) {
  const group = useReactRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (group.current) group.current.rotation.y += dt*.12;
  });
  const c = dark ? "#b7e5db" : "#6e8e82";
  return <group ref={group} position={[0,-.75,-3.7]} scale={.72}>
    <mesh>
      <octahedronGeometry args={[.55,1]} />
      <meshStandardMaterial color="#756b54" roughness={.9} />
    </mesh>
    <mesh rotation={[Math.PI/2,0,0]}>
      <torusGeometry args={[.82,.012,8,64]} />
      <meshBasicMaterial color={c} transparent opacity={.55} />
    </mesh>
    <mesh rotation={[0,Math.PI/2,.4]}>
      <torusGeometry args={[.58,.01,8,64]} />
      <meshBasicMaterial color={c} transparent opacity={.38} />
    </mesh>
  </group>;
}

function Scene({ dark }: { dark: boolean }) {
  return <>
    <color attach="background" args={[dark ? "#13211b" : "#dcebdc"]} />
    <fog attach="fog" args={[dark ? "#13211b" : "#dcebdc", 5, 19]} />
    <ambientLight intensity={dark ? .72 : 1.15} />
    <directionalLight position={[-5,9,4]} intensity={dark ? 1.7 : 3.4} color={dark ? "#d7eadc" : "#fff0c8"} castShadow />
    <directionalLight position={[5,4,-4]} intensity={dark ? .45 : 1.1} color={dark ? "#a8c6b8" : "#c8e7ff"} />
    <Trees dark={dark} />
    <Cliff position={[-2.3,-1.4,-5.4]} scale={[2.2,2.8,1.5]} dark={dark} />
    <Cliff position={[2.3,-1.2,-5.6]} scale={[2.1,2.5,1.4]} dark={dark} />
    <Waterfall dark={dark} />
    <River dark={dark} />
    <HiddenTech dark={dark} />
    <Fireflies dark={dark} />
    <Environment preset={dark ? "forest" : "park"} />
    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={.12}
      minPolarAngle={Math.PI/2.65} maxPolarAngle={Math.PI/1.82} />
  </>;
}

export default function ForestScene({ dark }: { dark: boolean }) {
  return <div className="scene"><Canvas camera={{ position:[0,1.15,9], fov:44 }} dpr={[1,1.6]}>
    <Scene dark={dark} />
  </Canvas></div>;
}
