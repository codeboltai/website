"use client";
import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Agent = ({ position, color }) => (
  <mesh position={position}>
    <sphereGeometry args={[0.3, 32, 32]} />
    <meshStandardMaterial color={color} wireframe />
  </mesh>
);

const WebSocketConnection = ({ start, end }) => {
  const lineRef = useRef<THREE.Line>(null);
  const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);

  return (
    <line ref={lineRef} geometry={geometry}>
      <lineBasicMaterial color="#FFD700" linewidth={2} />
    </line>
  );
};

const CodeEditor3D = () => {
  const groupRef = useRef<THREE.Group>(null);
  const agentsRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (groupRef.current && agentsRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".scroll-container",
          start: "top top",
          end: "+=2000",
          scrub: true,
          pin: true,
          markers: true,
        },
      });

      tl.to(groupRef.current.rotation, { y: Math.PI / 4, duration: 1 });
      tl.to(groupRef.current.position, { z: -2, duration: 1 }, 0);

      // Animate agents appearing
      agentsRef.current.children.forEach((agent, index) => {
        tl.fromTo(agent.scale, { x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1, duration: 0.5 }, index * 0.2 + 1);
      });
    }
  }, []);

  return (
    <group ref={groupRef}>
      {/* Code Editor Main Window */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[6, 4, 0.2]} />
        <meshStandardMaterial color="#2D2D2D" />
      </mesh>
      <Text position={[0, 1.8, 0.15]} fontSize={0.2} color="white">
        Code Editor
      </Text>

      {/* Chat Interface */}
      <mesh position={[-2, 0, 0.1]}>
        <boxGeometry args={[1.8, 3.6, 0.2]} />
        <meshStandardMaterial color="#1E1E1E" />
      </mesh>
      <Text position={[-2, 1.6, 0.25]} fontSize={0.15} color="white">
        Chat Threads
      </Text>
      {[...Array(3)].map((_, i) => (
        <mesh key={i} position={[-2, 1 - i * 1.2, 0.2]}>
          <boxGeometry args={[1.6, 1, 0.1]} />
          <meshStandardMaterial color="#3E3E3E" />
        </mesh>
      ))}

      {/* Agents and Connections */}
      <group ref={agentsRef}>
        {[...Array(3)].map((_, i) => (
          <React.Fragment key={i}>
            <Agent position={[2, 1 - i * 1.2, 1]} color="royalblue" />
            <WebSocketConnection start={new THREE.Vector3(-1.2, 1 - i * 1.2, 0.2)} end={new THREE.Vector3(2, 1 - i * 1.2, 1)} />
          </React.Fragment>
        ))}
      </group>
    </group>
  );
};

const HowItWorksPage = () => {
  return (
    <div className="h-[300vh] w-full scroll-container bg-black">
      <div className="sticky top-0 h-screen w-full">
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <CodeEditor3D />
          <OrbitControls enableZoom={false} enableRotate={false} />
        </Canvas>
      </div>
    </div>
  );
};

export default HowItWorksPage;