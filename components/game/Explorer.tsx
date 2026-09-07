 "use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, PerspectiveCamera } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function ExplorerModel() {
  const group = useRef<THREE.Group>(null);
  const leftLeg = useRef<THREE.Mesh>(null);
  const rightLeg = useRef<THREE.Mesh>(null);
  const leftArm = useRef<THREE.Mesh>(null);
  const rightArm = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!group.current) return;
    group.current.position.y = -1.12 + Math.sin(t * 4) * 0.018;
    const run = Math.sin(t * 6.2) * 0.55;
    if (leftLeg.current) leftLeg.current.rotation.x = run;
    if (rightLeg.current) rightLeg.current.rotation.x = -run;
    if (leftArm.current) leftArm.current.rotation.x = -run * 0.8;
    if (rightArm.current) rightArm.current.rotation.x = run * 0.8;
  });

  return (
    <group ref={group} scale={0.92} rotation={[0, 0.15, 0]}>
      <mesh position={[0, 0.95, 0]}>
        <sphereGeometry args={[0.32, 12, 10]} />
        <meshStandardMaterial color="#5c3924" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[0.58, 0.95, 0.32]} />
        <meshStandardMaterial color="#24352f" roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.38, -0.22]}>
        <boxGeometry args={[0.68, 0.9, 0.16]} />
        <meshStandardMaterial color="#5b3b25" roughness={1} />
      </mesh>
      <mesh ref={leftArm} position={[-0.43, 0.28, 0]}>
        <boxGeometry args={[0.16, 0.78, 0.16]} />
        <meshStandardMaterial color="#b87342" roughness={0.95} />
      </mesh>
      <mesh ref={rightArm} position={[0.43, 0.28, 0]}>
        <boxGeometry args={[0.16, 0.78, 0.16]} />
        <meshStandardMaterial color="#b87342" roughness={0.95} />
      </mesh>
      <mesh ref={leftLeg} position={[-0.18, -0.48, 0]}>
        <boxGeometry args={[0.2, 0.9, 0.2]} />
        <meshStandardMaterial color="#202b28" roughness={0.9} />
      </mesh>
      <mesh ref={rightLeg} position={[0.18, -0.48, 0]}>
        <boxGeometry args={[0.2, 0.9, 0.2]} />
        <meshStandardMaterial color="#202b28" roughness={0.9} />
      </mesh>
      <mesh position={[0, 1.22, 0]}>
        <boxGeometry args={[0.55, 0.12, 0.38]} />
        <meshStandardMaterial color="#2e251d" roughness={1} />
      </mesh>
    </group>
  );
}

export default function Explorer({ moving }: { moving: boolean }) {
  return (
    <div className={`explorer-3d ${moving ? "moving" : ""}`} aria-hidden="true">
      <Canvas dpr={[1, 1.4]} gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0.15, 5.2]} fov={25} />
        <ambientLight intensity={1.7} />
        <directionalLight position={[2, 4, 4]} intensity={2.4} />
        <Float speed={1.3} rotationIntensity={0.04} floatIntensity={0.12}>
          <ExplorerModel />
        </Float>
        <Environment preset="park" />
      </Canvas>
    </div>
  );
}
