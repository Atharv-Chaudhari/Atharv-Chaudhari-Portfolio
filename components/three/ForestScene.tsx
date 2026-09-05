"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useRef } from "react";

function Tree({ position, scale = 1, dark }: { position: [number, number, number]; scale?: number; dark: boolean }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 2.1, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.34, 4.2, 8]} />
        <meshStandardMaterial color={dark ? "#3a4638" : "#684a2d"} roughness={1} />
      </mesh>
      <mesh position={[-0.45, 3.3, 0]} rotation={[0, 0, -0.22]} castShadow>
        <cylinderGeometry args={[0.055, 0.12, 2.1, 7]} />
        <meshStandardMaterial color={dark ? "#394638" : "#63452a"} roughness={1} />
      </mesh>
      {[[-.2,4.2,0],[.35,3.95,.05],[0,4.65,-.1],[-.5,3.9,.15]].map((p,i)=>
        <mesh key={i} position={p as [number,number,number]} scale={.95 + i*.09} castShadow>
          <icosahedronGeometry args={[.9,1]} />
          <meshStandardMaterial color={dark ? ["#244b35","#2c5b3e","#315f40","#244f38"][i] : ["#3f7048","#4f814e","#5f8d54","#46794a"][i]} roughness={1} />
        </mesh>
      )}
    </group>
  );
}

function Jungle({ dark }: { dark: boolean }) {
  const trees = useMemo(() => Array.from({length: 60}, (_,i) => {
    const side = i % 2 === 0 ? -1 : 1;
    return [
      side * (3.3 + Math.random()*5.5),
      -2.1,
      -7.5 + Math.random()*13
    ] as [number,number,number];
  }), []);
  return <group>{trees.map((p,i)=><Tree key={i} position={p} scale={.72+Math.random()*.75} dark={dark}/>)}</group>;
}

function Vines({ dark }: { dark: boolean }) {
  const vines = useMemo(() => Array.from({length: 20}, (_,i) => ({
    x:(i%2?-1:1)*(2.8+Math.random()*4.5), z:-8+Math.random()*11, h:2+Math.random()*3
  })), []);
  return <group>{vines.map((v,i)=><mesh key={i} position={[v.x, .5, v.z]} rotation={[0,0,(v.x>0?.28:-.28)]}>
    <cylinderGeometry args={[.018,.035,v.h,6]} />
    <meshStandardMaterial color={dark ? "#54765a" : "#6f915b"} />
  </mesh>)}</group>;
}

function Waterfall({ dark }: { dark: boolean }) {
  const drops = useMemo(() => Array.from({length: 700}, () => ({
    x:(Math.random()-.5)*2.1, y:Math.random()*5.1, z:(Math.random()-.5)*.3,
    s:.008+Math.random()*.025
  })), []);
  return <group position={[0, .15, -7]}>
    <mesh position={[0,.25,0]}>
      <planeGeometry args={[2.7,5.5,8,24]} />
      <meshPhysicalMaterial color={dark ? "#5b999c" : "#8ed4d4"} transparent opacity={.55} roughness={.05} transmission={.25} />
    </mesh>
    {drops.map((d,i)=><mesh key={i} position={[d.x,d.y-2.05,d.z]} scale={[d.s,d.s*7,d.s]}>
      <sphereGeometry args={[1,5,5]}/>
      <meshBasicMaterial color={dark ? "#d4efeb" : "#f4ffff"} transparent opacity={.5}/>
    </mesh>)}
    <mesh position={[0,-2.02,.15]} scale={[1.7,.3,1]}>
      <sphereGeometry args={[1,32,16]}/>
      <meshStandardMaterial color={dark ? "#3d6968" : "#72aaa2"} roughness={.16}/>
    </mesh>
  </group>;
}

function River({ dark }: { dark: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.z = Math.sin(state.clock.elapsedTime*.23)*.006;
  });
  return <mesh ref={ref} position={[0,-2.25,1.8]} rotation={[-Math.PI/2,0,0]}>
    <planeGeometry args={[5.1,8,40,40]}/>
    <meshPhysicalMaterial color={dark ? "#27565a" : "#78b9b0"} roughness={.08} metalness={.08} transmission={.12} transparent opacity={.94}/>
  </mesh>;
}

function Ruin({ dark }: { dark: boolean }) {
  const glow = dark ? "#b8d8b9" : "#667e64";
  const group = useRef<THREE.Group>(null);
  useFrame((_,dt)=>{ if(group.current) group.current.rotation.y += dt*.07; });
  return <group ref={group} position={[0,-.9,-4.2]} scale={.82}>
    <mesh position={[0,0,0]}>
      <boxGeometry args={[1.65,.25,1.05]}/>
      <meshStandardMaterial color={dark ? "#51594b" : "#84775b"} roughness={.95}/>
    </mesh>
    {[-.62,.62].map(x=><mesh key={x} position={[x,.7,0]}>
      <boxGeometry args={[.22,1.4,.55]}/>
      <meshStandardMaterial color={dark ? "#565c4d" : "#8a7d61"} roughness={1}/>
    </mesh>)}
    <mesh position={[0,1.42,0]}>
      <boxGeometry args={[1.48,.22,.58]}/>
      <meshStandardMaterial color={dark ? "#4b5145" : "#786c55"} roughness={1}/>
    </mesh>
    <mesh position={[0,.68,.32]} rotation={[Math.PI/2,0,0]}>
      <torusGeometry args={[.26,.012,8,48]}/>
      <meshBasicMaterial color={glow} transparent opacity={.5}/>
    </mesh>
    <pointLight color={glow} intensity={dark ? 1.5 : .35} distance={3}/>
  </group>;
}

function Bridge({ dark }: { dark: boolean }) {
  return <group position={[0,-1.45,.25]} rotation={[0,0,0]}>
    {Array.from({length:9},(_,i)=><mesh key={i} position={[(i-4)*.43,0,0]} rotation={[0,0,(i%2?-.06:.06)]}>
      <boxGeometry args={[.38,.18,.85]}/>
      <meshStandardMaterial color={dark ? "#594d3d" : "#806b4e"} roughness={1}/>
    </mesh>)}
  </group>;
}

function Leaves({ dark }: { dark: boolean }) {
  const group = useRef<THREE.Group>(null);
  const leaves = useMemo(()=>Array.from({length:70},()=>({
    x:(Math.random()-.5)*9,y:-.2+Math.random()*5,z:-1+Math.random()*5,
    r:.025+Math.random()*.055, speed:.2+Math.random()*.6
  })),[]);
  useFrame((state)=>{
    if(!group.current)return;
    group.current.children.forEach((m,i)=>{
      const d=leaves[i];
      m.position.y += Math.sin(state.clock.elapsedTime*d.speed+i)*.0008;
      m.rotation.z += .002;
    });
  });
  return <group ref={group}>{leaves.map((d,i)=><mesh key={i} position={[d.x,d.y,d.z]} rotation={[.2,i,.5]}>
    <planeGeometry args={[d.r*2,d.r*1.2]}/>
    <meshBasicMaterial color={dark ? "#628364" : "#7fa363"} transparent opacity={.55} side={THREE.DoubleSide}/>
  </mesh>)}</group>;
}

function Birds() {
  const birds = useRef<THREE.Group>(null);
  useFrame((state)=>{
    if(!birds.current)return;
    birds.current.position.x = Math.sin(state.clock.elapsedTime*.12)*2.2;
    birds.current.position.z = -2 + Math.cos(state.clock.elapsedTime*.1)*2;
  });
  return <group ref={birds} position={[0,3.9,-4]}>
    {[-.28,.28].map(x=><mesh key={x} position={[x,0,0]} rotation={[0,0,x>0?.28:-.28]}>
      <planeGeometry args={[.48,.08]}/>
      <meshBasicMaterial color="#27372d" side={THREE.DoubleSide}/>
    </mesh>)}
  </group>;
}

function Scene({ dark }: { dark: boolean }) {
  return <>
    <color attach="background" args={[dark ? "#1b2b20" : "#dcebd4"]}/>
    <fog attach="fog" args={[dark ? "#1b2b20" : "#dcebd4",5,18]}/>
    <ambientLight intensity={dark?.65:1.15}/>
    <directionalLight position={[-5,10,4]} intensity={dark?1.4:3.8} color={dark?"#d9e8d2":"#fff0c2"} castShadow/>
    <directionalLight position={[5,5,-2]} intensity={dark?.3:.9} color={dark?"#b5d4c2":"#c9e5ff"}/>
    <Jungle dark={dark}/>
    <Vines dark={dark}/>
    <Waterfall dark={dark}/>
    <River dark={dark}/>
    <Bridge dark={dark}/>
    <Ruin dark={dark}/>
    <Leaves dark={dark}/>
    <Birds/>
    <Sparkles count={dark?55:18} scale={[10,4,10]} size={dark?1.1:.7} speed={.12} opacity={dark?.22:.08} color={dark?"#e0efc5":"#fff4c8"}/>
    <Environment preset={dark?"forest":"park"}/>
    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={.08}
      minPolarAngle={Math.PI/2.7} maxPolarAngle={Math.PI/1.85}/>
  </>;
}

export default function ForestScene({ dark }: { dark: boolean }) {
  return <div className="scene"><Canvas shadows camera={{position:[0,1.1,9],fov:44}} dpr={[1,1.5]}>
    <Scene dark={dark}/>
  </Canvas></div>;
}
