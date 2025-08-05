"use client";
import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Chat Message Component
const ChatMessage = ({ position, text, isUser = false, visible = false }) => {
  const meshRef = useRef<THREE.Group>(null);
  
  useEffect(() => {
    if (meshRef.current) {
      gsap.to(meshRef.current.scale, {
        x: visible ? 1 : 0,
        y: visible ? 1 : 0,
        z: visible ? 1 : 0,
        duration: 0.5,
        ease: "back.out(1.7)"
      });
    }
  }, [visible]);

  return (
    <group ref={meshRef} position={position}>
      <RoundedBox args={[1.4, 0.4, 0.2]} radius={0.05} smoothness={4}>
        <meshStandardMaterial 
          color={isUser ? "#3B82F6" : "#475569"} 
          emissive={isUser ? "#1D4ED8" : "#334155"}
          emissiveIntensity={0.3}
        />
      </RoundedBox>
      <Text
        position={[0, 0, 0.12]}
        fontSize={0.06}
        color="#FFF"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        {text}
      </Text>
    </group>
  );
};

// Agent Component
const Agent = React.forwardRef<THREE.Group, { position: [number, number, number], visible?: boolean, color?: string }>(({ position, visible = false, color = "#FF69B4" }, ref) => {
  const meshRef = useRef<THREE.Group>(null);
  const groupRef = ref || meshRef;
  
  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, {
        x: visible ? 1 : 0,
        y: visible ? 1 : 0,
        z: visible ? 1 : 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)"
      });
      
      // Add a floating animation when visible
      if (visible) {
        gsap.to(groupRef.current.position, {
          y: position[1] + 0.1,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }
    }
  }, [visible, position]);

  return (
    <group ref={groupRef} position={position}>
      <RoundedBox args={[1, 1, 0.15]} radius={0.1} smoothness={4}>
        <meshStandardMaterial 
          color="#3B82F6" 
          emissive="#1D4ED8"
          emissiveIntensity={0.4}
        />
      </RoundedBox>
      <Text
        position={[0, 0, 0.1]}
        fontSize={0.07}
        color="#FFF"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        🤖
      </Text>
      <Text
        position={[0, -0.15, 0.1]}
        fontSize={0.04}
        color="#FFF"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        AGENT
      </Text>
    </group>
  );
});

// WebSocket Connection Line
const WebSocketConnection = ({ start, end, visible = false }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useEffect(() => {
    if (materialRef.current) {
      gsap.to(materialRef.current, {
        opacity: visible ? 1 : 0,
        duration: 0.5
      });
    }
  }, [visible]);

  // Calculate distance and create cylinder geometry
  const startVec = new THREE.Vector3(...start);
  const endVec = new THREE.Vector3(...end);
  const distance = startVec.distanceTo(endVec);
  const midpoint = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5);
  
  // Calculate rotation to align cylinder with line
  const direction = new THREE.Vector3().subVectors(endVec, startVec).normalize();
  const up = new THREE.Vector3(0, 1, 0);
  const quaternion = new THREE.Quaternion().setFromUnitVectors(up, direction);

  return (
    <mesh ref={meshRef} position={midpoint.toArray()} quaternion={quaternion.toArray()}>
      <cylinderGeometry args={[0.02, 0.02, distance, 8]} />
      <meshStandardMaterial ref={materialRef} color="#475569" transparent opacity={0} emissive="#334155" emissiveIntensity={0.3} />
    </mesh>
  );
};

// Flow Animation Line
const FlowLine = ({ start, end, active = false }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  
  useEffect(() => {
    if (materialRef.current) {
      gsap.to(materialRef.current, {
        opacity: active ? 0.7 : 0,
        duration: 0.5
      });
    }
  }, [active]);

  // Calculate distance and create cylinder geometry
  const startVec = new THREE.Vector3(...start);
  const endVec = new THREE.Vector3(...end);
  const distance = startVec.distanceTo(endVec);
  const midpoint = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5);
  
  // Calculate rotation to align cylinder with line
  const direction = new THREE.Vector3().subVectors(endVec, startVec).normalize();
  const up = new THREE.Vector3(0, 1, 0);
  const quaternion = new THREE.Quaternion().setFromUnitVectors(up, direction);

  return (
    <mesh ref={meshRef} position={midpoint.toArray()} quaternion={quaternion.toArray()}>
      <cylinderGeometry args={[0.03, 0.03, distance, 8]} />
      <meshStandardMaterial ref={materialRef} color="#3B82F6" transparent opacity={0} emissive="#1D4ED8" emissiveIntensity={0.4} />
    </mesh>
  );
};

// Pulsing Light Component
const PulsingLight = ({ start, end, active = false, speed = 2 }) => {
  const lightRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (lightRef.current && active) {
      const time = state.clock.getElapsedTime() * speed;
      const progress = (time % 1); // 0 to 1, then reset
      
      const startVec = new THREE.Vector3(...start);
      const endVec = new THREE.Vector3(...end);
      const currentPos = new THREE.Vector3().lerpVectors(startVec, endVec, progress);
      
      lightRef.current.position.copy(currentPos);
      
      // Fade in/out effect - brightest in middle of journey, fade at start/end
      const fadeProgress = 1 - Math.abs(0.5 - progress) * 2; // 0 at start/end, 1 in middle
      lightRef.current.material.opacity = active ? (0.3 + 0.7 * fadeProgress) : 0;
    }
  });

  return (
    <mesh ref={lightRef}>
      <sphereGeometry args={[0.08, 8, 8]} />
      <meshStandardMaterial 
        color="#3B82F6"
        emissive="#1D4ED8"
        emissiveIntensity={1.5}
        transparent
        opacity={0}
      />
    </mesh>
  );
};

const CodeEditor3D = () => {
  const [animationStep, setAnimationStep] = useState(0);
  const frontendRef = useRef<THREE.Group>(null);
  const backendRef = useRef<THREE.Group>(null);
  const agentRef = useRef<THREE.Group>(null);
  const chatWindowRef = useRef<THREE.Group>(null);
  const apiBlockRef = useRef<THREE.Group>(null);
  const processManagerRef = useRef<THREE.Group>(null);
  const codeEditorRef = useRef<THREE.Group>(null);
  
  // Camera control for focusing
  const { camera } = useThree();

  useEffect(() => {
    // Step 1 - User Interaction
    ScrollTrigger.create({
      trigger: ".step-1",
      start: "top center",
      end: "bottom center",
      onEnter: () => setAnimationStep(1),
      onLeave: () => setAnimationStep(0),
      onEnterBack: () => setAnimationStep(1),
      onLeaveBack: () => setAnimationStep(0),
    });

    // Step 2 - Backend Processing
    ScrollTrigger.create({
      trigger: ".step-2",
      start: "top center",
      end: "bottom center",
      onEnter: () => setAnimationStep(2),
      onLeave: () => setAnimationStep(1),
      onEnterBack: () => setAnimationStep(2),
      onLeaveBack: () => setAnimationStep(1),
    });

    // Step 3 - Agent Creation
    ScrollTrigger.create({
      trigger: ".step-3",
      start: "top center",
      end: "bottom center",
      onEnter: () => setAnimationStep(3),
      onLeave: () => setAnimationStep(2),
      onEnterBack: () => setAnimationStep(3),
      onLeaveBack: () => setAnimationStep(2),
    });

    // Step 4 - Independent Agent
    ScrollTrigger.create({
      trigger: ".step-4",
      start: "top center",
      end: "bottom center",
      onEnter: () => setAnimationStep(4),
      onLeave: () => setAnimationStep(3),
      onEnterBack: () => setAnimationStep(4),
      onLeaveBack: () => setAnimationStep(3),
    });

    // Step 5 - Agent connects and receives user message
    ScrollTrigger.create({
      trigger: ".step-5",
      start: "top center",
      end: "bottom center",
      onEnter: () => setAnimationStep(5),
      onLeave: () => setAnimationStep(4),
      onEnterBack: () => setAnimationStep(5),
      onLeaveBack: () => setAnimationStep(4),
    });

    // Step 6 - Agent asks Process to call LLM
    ScrollTrigger.create({
      trigger: ".step-6",
      start: "top center",
      end: "bottom center",
      onEnter: () => setAnimationStep(6),
      onLeave: () => setAnimationStep(5),
      onEnterBack: () => setAnimationStep(6),
      onLeaveBack: () => setAnimationStep(5),
    });

    // Step 7 - Process calls LLM
    ScrollTrigger.create({
      trigger: ".step-7",
      start: "top center",
      end: "bottom center",
      onEnter: () => setAnimationStep(7),
      onLeave: () => setAnimationStep(6),
      onEnterBack: () => setAnimationStep(7),
      onLeaveBack: () => setAnimationStep(6),
    });

    // Step 8 - Process receives LLM response
    ScrollTrigger.create({
      trigger: ".step-8",
      start: "top center",
      end: "bottom center",
      onEnter: () => setAnimationStep(8),
      onLeave: () => setAnimationStep(7),
      onEnterBack: () => setAnimationStep(8),
      onLeaveBack: () => setAnimationStep(7),
    });

    // Step 9 - Agent calls fileRead tool
    ScrollTrigger.create({
      trigger: ".step-9",
      start: "top center",
      end: "bottom center",
      onEnter: () => setAnimationStep(9),
      onLeave: () => setAnimationStep(8),
      onEnterBack: () => setAnimationStep(9),
      onLeaveBack: () => setAnimationStep(8),
    });

    // Step 10 - Process reads file and sends data
    ScrollTrigger.create({
      trigger: ".step-10",
      start: "top center",
      end: "bottom center",
      onEnter: () => setAnimationStep(10),
      onLeave: () => setAnimationStep(9),
      onEnterBack: () => setAnimationStep(10),
      onLeaveBack: () => setAnimationStep(9),
    });

    // Step 11 - Agent sends response to user
    ScrollTrigger.create({
      trigger: ".step-11",
      start: "top center",
      end: "bottom center",
      onEnter: () => setAnimationStep(11),
      onLeave: () => setAnimationStep(10),
      onEnterBack: () => setAnimationStep(11),
      onLeaveBack: () => setAnimationStep(10),
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Zoom animations and camera movements based on animation step
  useEffect(() => {
    const duration = 1;
    const ease = "power2.inOut";

    // Always reset all components to their original positions first
    if (chatWindowRef.current) {
      gsap.to(chatWindowRef.current.position, { z: animationStep === 1 ? 3 : 0.35, duration, ease });
      gsap.to(chatWindowRef.current.scale, { x: animationStep === 1 ? 1.4 : 1, y: animationStep === 1 ? 1.4 : 1, z: animationStep === 1 ? 1.4 : 1, duration, ease });
    }
    
    if (apiBlockRef.current) {
      gsap.to(apiBlockRef.current.position, { z: animationStep === 2 ? 3 : 0.35, duration, ease });
      gsap.to(apiBlockRef.current.scale, { x: animationStep === 2 ? 1.4 : 1, y: animationStep === 2 ? 1.4 : 1, z: animationStep === 2 ? 1.4 : 1, duration, ease });
    }
    
    if (processManagerRef.current) {
      gsap.to(processManagerRef.current.position, { z: animationStep === 3 ? 3 : 0.35, duration, ease });
      gsap.to(processManagerRef.current.scale, { x: animationStep === 3 ? 1.4 : 1, y: animationStep === 3 ? 1.4 : 1, z: animationStep === 3 ? 1.4 : 1, duration, ease });
    }
    
    if (agentRef.current) {
      // Move agent from inside Process Manager to independent position
      gsap.to(agentRef.current.position, { 
        x: animationStep >= 4 ? 3.3 : 0, // Move from Process Manager (x: 0) to independent position (x: 3.3)
        y: animationStep >= 4 ? -0.5 : -0.5, // Keep same y position relative to Process Manager
        z: animationStep >= 4 ? 0.7 : 0.35, // Move slightly forward when independent
        duration, 
        ease 
      });
      // Remove zoom for now - will add in later steps
      gsap.to(agentRef.current.scale, { 
        x: 1, 
        y: 1, 
        z: 1, 
        duration, 
        ease 
      });
    }

    // Camera movements based on active step
    if (camera) {
      camera.updateProjectionMatrix();
      
      if (animationStep === 1) {
        // Step 1: Focus on Chat Window
        gsap.to(camera.position, { x: -1.2, y: 1.5, z: 8, duration, ease, onUpdate: () => camera.updateProjectionMatrix() });
        
      } else if (animationStep === 2) {
        // Step 2: Focus on API Block
        gsap.to(camera.position, { x: -1.2, y: -1.5, z: 8, duration, ease, onUpdate: () => camera.updateProjectionMatrix() });
        
      } else if (animationStep === 3) {
        // Step 3: Focus on Process Manager
        gsap.to(camera.position, { x: 1.2, y: -1.5, z: 8, duration, ease, onUpdate: () => camera.updateProjectionMatrix() });
        
      } else if (animationStep === 4) {
        // Step 4: Focus on Independent Agent
        gsap.to(camera.position, { x: 4.5, y: -1.5, z: 8, duration, ease, onUpdate: () => camera.updateProjectionMatrix() });
        
      } else if (animationStep === 5) {
        // Step 5: Focus on Agent receiving message
        gsap.to(camera.position, { x: 4.5, y: -1.5, z: 8, duration, ease, onUpdate: () => camera.updateProjectionMatrix() });
        
      } else if (animationStep === 6) {
        // Step 6: Focus on Agent to Process communication
        gsap.to(camera.position, { x: 3.2, y: -1.5, z: 8, duration, ease, onUpdate: () => camera.updateProjectionMatrix() });
        
      } else if (animationStep === 7) {
        // Step 7: Focus on Process to LLM
        gsap.to(camera.position, { x: 0.5, y: -2.5, z: 8, duration, ease, onUpdate: () => camera.updateProjectionMatrix() });
        
      } else if (animationStep === 8) {
        // Step 8: Focus on LLM to Process response
        gsap.to(camera.position, { x: 0.5, y: -2.5, z: 8, duration, ease, onUpdate: () => camera.updateProjectionMatrix() });
        
      } else if (animationStep === 9) {
        // Step 9: Focus on Agent to Process file request
        gsap.to(camera.position, { x: 3.2, y: -1.5, z: 8, duration, ease, onUpdate: () => camera.updateProjectionMatrix() });
        
      } else if (animationStep === 10) {
        // Step 10: Focus on Process file operations
        gsap.to(camera.position, { x: 1.2, y: -1.5, z: 8, duration, ease, onUpdate: () => camera.updateProjectionMatrix() });
        
      } else if (animationStep === 11) {
        // Step 11: Focus on full response flow
        gsap.to(camera.position, { x: 0, y: 0, z: 8, duration, ease, onUpdate: () => camera.updateProjectionMatrix() });
        
      } else {
        // Reset camera to overview position
        gsap.to(camera.position, { x: 0, y: 0, z: 8, duration, ease, onUpdate: () => camera.updateProjectionMatrix() });
      }
    }
  }, [animationStep, camera]);

  return (
    <group>
      {/* FRONTEND SECTION */}
      <group ref={frontendRef} position={[0, 1.25, 0]}>
        {/* Frontend Container - Background */}
        <RoundedBox args={[5.5, 2.2, 0.5]} radius={0.2} smoothness={4}>
          <meshStandardMaterial 
            color="#374151" 
            emissive="#1F2937"
            emissiveIntensity={0.4}
          />
        </RoundedBox>
        <Text position={[0, 1, 0.35]} fontSize={0.15} color="#FFF" fontWeight="bold">
          FRONTEND
        </Text>

        {/* Chat Window Block */}
        <group ref={chatWindowRef} position={[-1.2, 0, 0.35]}>
          <RoundedBox args={[1.8, 1.8, 0.35]} radius={0.15} smoothness={4}>
            <meshStandardMaterial 
              color={animationStep >= 1 ? "#3B82F6" : "#475569"} 
              emissive={animationStep >= 1 ? "#1D4ED8" : "#334155"}
              emissiveIntensity={0.4}
            />
          </RoundedBox>
          <Text position={[0, 0.7, 0.25]} fontSize={0.08} color="#FFF" fontWeight="bold">
            💬 Chat
          </Text>

          {/* Hi Message Block */}
          <ChatMessage 
            position={[0, 0.1, 0.3]} 
            text="Hi" 
            isUser={true} 
            visible={animationStep >= 1} 
          />

          {/* Bot Response Block */}
          <ChatMessage 
            position={[0, -0.3, 0.3]} 
            text="Hello!" 
            isUser={false} 
            visible={animationStep >= 11} 
          />
        </group>

        {/* Code Editor Block */}
        <RoundedBox position={[1.2, 0, 0.35]} args={[1.8, 1.8, 0.35]} radius={0.15} smoothness={4}>
          <meshStandardMaterial 
            color="#475569" 
            emissive="#334155"
            emissiveIntensity={0.4}
          />
        </RoundedBox>
        <Text position={[1.6, 0.7, 0.6]} fontSize={0.08} color="#FFF" fontWeight="bold">
          📝 Editor
        </Text>
        <Text position={[1.6, 0.2, 0.6]} fontSize={0.05} color="#FFF">
          function() {'{'}
        </Text>
        <Text position={[1.6, 0, 0.6]} fontSize={0.05} color="#FFF">
          {'  '}code here
        </Text>
        <Text position={[1.6, -0.2, 0.6]} fontSize={0.05} color="#FFF">
          {'}'}
        </Text>
      </group>

      {/* BACKEND SECTION */}
      <group ref={backendRef} position={[0, -1.25, 0]}>
        {/* Backend Container - Background */}
        <RoundedBox args={[5.5, 2.2, 0.5]} radius={0.2} smoothness={4}>
          <meshStandardMaterial 
            color="#374151" 
            emissive="#1F2937"
            emissiveIntensity={0.4}
          />
        </RoundedBox>
        <Text position={[0, 1, 0.35]} fontSize={0.15} color="#FFF" fontWeight="bold">
          BACKEND
        </Text>

        {/* API Endpoints Block */}
        <group ref={apiBlockRef} position={[-1.2, 0, 0.35]}>
          <RoundedBox args={[1.8, 1.8, 0.35]} radius={0.15} smoothness={4}>
            <meshStandardMaterial 
              color={animationStep >= 2 ? "#3B82F6" : "#475569"} 
              emissive={animationStep >= 2 ? "#1D4ED8" : "#334155"}
              emissiveIntensity={0.4}
            />
          </RoundedBox>
          <Text position={[0, 0.7, 0.25]} fontSize={0.08} color="#FFF" fontWeight="bold">
            🌐 API
          </Text>
          <Text position={[0, 0.3, 0.25]} fontSize={0.05} color="#FFF">
            /chat {animationStep >= 2 ? "✅" : ""}
          </Text>
          <Text position={[0, 0.1, 0.25]} fontSize={0.05} color="#FFF">
            /files
          </Text>
          <Text position={[0, -0.1, 0.25]} fontSize={0.05} color="#FFF">
            /terminal
          </Text>
        </group>

        {/* Process Manager Block */}
        <group ref={processManagerRef} position={[1.2, 0, 0.35]}>
          <RoundedBox args={[1.8, 1.8, 0.35]} radius={0.15} smoothness={4}>
            <meshStandardMaterial 
              color={animationStep >= 3 ? "#3B82F6" : "#475569"}
              emissive={animationStep >= 3 ? "#1D4ED8" : "#334155"}
              emissiveIntensity={0.4}
            />
          </RoundedBox>
          <Text position={[0, 0.7, 0.25]} fontSize={0.08} color="#FFF" fontWeight="bold">
            ⚙️ Process
          </Text>
          <Text position={[0, 0.1, 0.25]} fontSize={0.05} color="#FFF">
            {animationStep >= 3 ? "🚀 Spawned!" : "Ready..."}
          </Text>

          {/* Agent inside backend (Step 3) - moves to independent position in Step 4 */}
          <Agent 
            ref={agentRef}
            position={[0, -0.5, 0.35]} 
            visible={animationStep >= 3} 
          />
        </group>
      </group>

      {/* Agent moves to independent position in Step 4 - no separate component needed */}

      {/* LLM NODE (Bottom) */}
      <group position={[0, -4, 0]}>
        <RoundedBox args={[2.5, 1.5, 0.5]} radius={0.2} smoothness={4}>
          <meshStandardMaterial 
            color={animationStep >= 7 ? "#3B82F6" : "#475569"}
            emissive={animationStep >= 7 ? "#1D4ED8" : "#334155"}
            emissiveIntensity={0.4}
          />
        </RoundedBox>
        <Text position={[0, 0, 0.35]} fontSize={0.12} color="#FFF" fontWeight="bold">
          🧠 LLM
        </Text>
        <Text position={[0, -0.3, 0.35]} fontSize={0.06} color="#FFF">
          {animationStep >= 7 ? "Processing..." : "Ready"}
        </Text>
      </group>

      {/* FLOW LINES - Brighter Colors */}
      {/* Frontend to Backend flow */}
      <FlowLine 
        start={[-1.2, 0.35, 0.6]} 
        end={[-1.2, -0.35, 0.6]} 
        active={animationStep >= 2} 
      />
      
      {/* Pulsing Light on Frontend to Backend flow */}
      <PulsingLight 
        start={[-1.2, 0.35, 0.6]} 
        end={[-1.2, -0.35, 0.6]} 
        active={animationStep >= 2} 
        speed={2}
      />

      {/* WebSocket Connections */}
      <WebSocketConnection 
        start={[-0.3, -1.25, 0.6]} 
        end={[0.3, -1.25, 0.6]} 
        visible={animationStep >= 2} 
      />
      
      {/* Pulsing Light on API to Process connection */}
      <PulsingLight 
        start={[-0.3, -1.25, 0.6]} 
        end={[0.3, -1.25, 0.6]} 
        active={animationStep >= 2} 
        speed={1.5}
      />

      <WebSocketConnection 
        start={[2.1, -1.25, 0.7]} 
        end={[4.5, -1.75, 1]} 
        visible={animationStep >= 4}
      />
      
      {/* Pulsing Light on Process to Agent connection */}
      <PulsingLight 
        start={[2.1, -1.25, 0.7]} 
        end={[4.5, -1.75, 1]} 
        active={animationStep >= 4} 
        speed={1.2}
      />

      {/* NEW CONNECTIONS FOR EXTENDED STEPS */}
      
      {/* Step 5: User message flow to Agent */}
      <PulsingLight 
        start={[-1.2, 0.35, 0.6]} 
        end={[4.5, -1.75, 1]} 
        active={animationStep === 5} 
        speed={1.8}
      />

      {/* Step 6: Agent to Process (LLM request) */}
      <WebSocketConnection 
        start={[4.2, -1.75, 0.7]} 
        end={[2.1, -1.25, 0.7]} 
        visible={animationStep >= 6}
      />
      <PulsingLight 
        start={[4.2, -1.75, 0.7]} 
        end={[2.1, -1.25, 0.7]} 
        active={animationStep === 6 || animationStep === 9} 
        speed={1.5}
      />

      {/* Step 7: Process to LLM */}
      <WebSocketConnection 
        start={[1.2, -2.15, 0.7]} 
        end={[0, -3.25, 0.7]} 
        visible={animationStep >= 7}
      />
      <PulsingLight 
        start={[1.2, -2.15, 0.7]} 
        end={[0, -3.25, 0.7]} 
        active={animationStep === 7} 
        speed={1.3}
      />

      {/* Step 8: LLM to Process (response) */}
      <PulsingLight 
        start={[0, -3.25, 0.7]} 
        end={[1.2, -2.15, 0.7]} 
        active={animationStep === 8} 
        speed={1.4}
      />

      {/* Step 10: Process to Agent (file data) */}
      <PulsingLight 
        start={[2.1, -1.25, 0.7]} 
        end={[4.2, -1.75, 0.7]} 
        active={animationStep === 8 || animationStep === 10} 
        speed={1.6}
      />

      {/* Step 11: Agent response back to user */}
      <PulsingLight 
        start={[4.5, -1.75, 1]} 
        end={[-1.2, 0.35, 0.6]} 
        active={animationStep === 11} 
        speed={2.0}
      />
    </group>
  );
};

const HowItWorksPage = () => {
  return (
    <div className="bg-black">
      
      {/* FULL WIDTH - Hero Section */}
      <section className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-gray-900 to-black">
        <div className="text-center max-w-4xl">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
            How Our Code Editor Works
          </h1>
          <p className="text-2xl text-gray-300">
            Discover the architecture behind our intelligent code editor with AI-powered agents
          </p>
          <div className="mt-8 text-gray-400">
            <p className="text-lg">Scroll down to explore each step →</p>
          </div>
        </div>
      </section>

      {/* SPLIT LAYOUT - Steps with 3D Animation */}
      <div className="flex">
        
        {/* LEFT SIDE - Content Sections */}
        <div className="w-1/2">
          {/* Step 1 */}
          <section className="step-1 min-h-screen flex items-center p-8 bg-gradient-to-br from-blue-900/20 to-black">
            <div className="max-w-lg">
              <div className="text-blue-400 text-sm font-semibold mb-2">STEP 1</div>
              <h2 className="text-4xl font-bold text-white mb-6">User Interaction</h2>
              <p className="text-xl text-gray-300 mb-6">
                When you type "Hi" in the chat window, the message is prepared for processing by our intelligent system.
              </p>
              <div className="space-y-4 text-gray-400">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>User types message in chat interface</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Message is captured by the frontend</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Chat window highlights to show activity</span>
                </div>
              </div>
            </div>
          </section>

          {/* Step 2 */}
          <section className="step-2 min-h-screen flex items-center p-8 bg-gradient-to-br from-green-900/20 to-black">
            <div className="max-w-lg">
              <div className="text-green-400 text-sm font-semibold mb-2">STEP 2</div>
              <h2 className="text-4xl font-bold text-white mb-6">Backend Processing</h2>
              <p className="text-xl text-gray-300 mb-6">
                Your message flows through WebSocket connections to our backend server, where it's processed by our API endpoints.
              </p>
              <div className="space-y-4 text-gray-400">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>WebSocket connection established</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Message routed to /chat/message endpoint</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Backend validates and processes request</span>
                </div>
              </div>
            </div>
          </section>

          {/* Step 3 */}
          <section className="step-3 min-h-screen flex items-center p-8 bg-gradient-to-br from-purple-900/20 to-black">
            <div className="max-w-lg">
              <div className="text-purple-400 text-sm font-semibold mb-2">STEP 3</div>
              <h2 className="text-4xl font-bold text-white mb-6">Agent Creation</h2>
              <p className="text-xl text-gray-300 mb-6">
                The backend spawns a dedicated AI agent as a child process, specifically for your conversation thread.
              </p>
              <div className="space-y-4 text-gray-400">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>Process Manager receives spawn request</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>New child process created for AI agent</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>Agent initializes within backend environment</span>
                </div>
              </div>
            </div>
          </section>

          {/* Step 4 */}
          <section className="step-4 min-h-screen flex items-center p-8 bg-gradient-to-br from-cyan-900/20 to-black">
            <div className="max-w-lg">
              <div className="text-cyan-400 text-sm font-semibold mb-2">STEP 4</div>
              <h2 className="text-4xl font-bold text-white mb-6">Independent Agent</h2>
              <p className="text-xl text-gray-300 mb-6">
                The AI agent operates independently, connected to the backend via WebSocket, ready to help with your coding tasks in real-time.
              </p>
              <div className="space-y-4 text-gray-400">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span>Agent establishes independent WebSocket connection</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span>Real-time bidirectional communication enabled</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span>Agent ready to process coding requests</span>
                </div>
              </div>
            </div>
          </section>

          {/* Step 5 */}
          <section className="step-5 min-h-screen flex items-center p-8 bg-gradient-to-br from-orange-900/20 to-black">
            <div className="max-w-lg">
              <div className="text-orange-400 text-sm font-semibold mb-2">STEP 5</div>
              <h2 className="text-4xl font-bold text-white mb-6">Agent Receives Message</h2>
              <p className="text-xl text-gray-300 mb-6">
                The independent agent establishes communication with the Process Manager and receives the user's message for processing.
              </p>
              <div className="space-y-4 text-gray-400">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span>Agent connects to Process Manager via WebSocket</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span>User message flows from Chat through API to Agent</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span>Agent begins processing the request</span>
                </div>
              </div>
            </div>
          </section>

          {/* Step 6 */}
          <section className="step-6 min-h-screen flex items-center p-8 bg-gradient-to-br from-pink-900/20 to-black">
            <div className="max-w-lg">
              <div className="text-pink-400 text-sm font-semibold mb-2">STEP 6</div>
              <h2 className="text-4xl font-bold text-white mb-6">LLM Request</h2>
              <p className="text-xl text-gray-300 mb-6">
                The agent analyzes the user's request and determines it needs AI assistance, sending a request to the Process Manager to call the LLM.
              </p>
              <div className="space-y-4 text-gray-400">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                  <span>Agent analyzes user request</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                  <span>Determines LLM assistance is needed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                  <span>Sends LLM request to Process Manager</span>
                </div>
              </div>
            </div>
          </section>

          {/* Step 7 */}
          <section className="step-7 min-h-screen flex items-center p-8 bg-gradient-to-br from-red-900/20 to-black">
            <div className="max-w-lg">
              <div className="text-red-400 text-sm font-semibold mb-2">STEP 7</div>
              <h2 className="text-4xl font-bold text-white mb-6">LLM Processing</h2>
              <p className="text-xl text-gray-300 mb-6">
                The Process Manager forwards the request to the Large Language Model, which processes the query and generates an intelligent response.
              </p>
              <div className="space-y-4 text-gray-400">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span>Process Manager calls LLM API</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span>LLM processes the user query</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span>AI generates intelligent response</span>
                </div>
              </div>
            </div>
          </section>

          {/* Step 8 */}
          <section className="step-8 min-h-screen flex items-center p-8 bg-gradient-to-br from-yellow-900/20 to-black">
            <div className="max-w-lg">
              <div className="text-yellow-400 text-sm font-semibold mb-2">STEP 8</div>
              <h2 className="text-4xl font-bold text-white mb-6">LLM Response</h2>
              <p className="text-xl text-gray-300 mb-6">
                The LLM sends its response back to the Process Manager, which then forwards it to the Agent for further processing.
              </p>
              <div className="space-y-4 text-gray-400">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span>LLM completes processing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span>Response sent back to Process Manager</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span>Process Manager forwards response to Agent</span>
                </div>
              </div>
            </div>
          </section>

          {/* Step 9 */}
          <section className="step-9 min-h-screen flex items-center p-8 bg-gradient-to-br from-indigo-900/20 to-black">
            <div className="max-w-lg">
              <div className="text-indigo-400 text-sm font-semibold mb-2">STEP 9</div>
              <h2 className="text-4xl font-bold text-white mb-6">File Access Request</h2>
              <p className="text-xl text-gray-300 mb-6">
                The agent determines it needs to access files to complete the task and sends a fileRead request to the Process Manager.
              </p>
              <div className="space-y-4 text-gray-400">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                  <span>Agent analyzes LLM response</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                  <span>Determines file access is needed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                  <span>Calls fileRead tool via Process Manager</span>
                </div>
              </div>
            </div>
          </section>

          {/* Step 10 */}
          <section className="step-10 min-h-screen flex items-center p-8 bg-gradient-to-br from-teal-900/20 to-black">
            <div className="max-w-lg">
              <div className="text-teal-400 text-sm font-semibold mb-2">STEP 10</div>
              <h2 className="text-4xl font-bold text-white mb-6">File Data Retrieval</h2>
              <p className="text-xl text-gray-300 mb-6">
                The Process Manager accesses the backend file system, reads the requested files, and sends the data back to the Agent.
              </p>
              <div className="space-y-4 text-gray-400">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                  <span>Process Manager accesses file system</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                  <span>Files are read from backend storage</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                  <span>File data sent back to Agent</span>
                </div>
              </div>
            </div>
          </section>

          {/* Step 11 */}
          <section className="step-11 min-h-screen flex items-center p-8 bg-gradient-to-br from-emerald-900/20 to-black">
            <div className="max-w-lg">
              <div className="text-emerald-400 text-sm font-semibold mb-2">STEP 11</div>
              <h2 className="text-4xl font-bold text-white mb-6">Complete Response</h2>
              <p className="text-xl text-gray-300 mb-6">
                The Agent combines the LLM response with file data to create a complete answer, sending it back to the user through the Process Manager, API, and Chat interface.
              </p>
              <div className="space-y-4 text-gray-400">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span>Agent processes all collected data</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span>Complete response flows back through system</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span>User receives comprehensive answer</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT SIDE - Sticky 3D Canvas */}
        <div className="w-1/2 h-screen sticky top-0">
          <Canvas 
            camera={{ position: [0, 0, 12], fov: 75 }}
            className="bg-gradient-to-b from-gray-900 to-black"
          >
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={0.8} color="#3B82F6" />
            <pointLight position={[-10, -10, 5]} intensity={0.6} color="#10B981" />
            <spotLight 
              position={[0, 5, 10]} 
              intensity={1} 
              angle={0.3} 
              penumbra={0.5} 
              color="#8B5CF6" 
            />
            
            <CodeEditor3D />
            
            <OrbitControls 
              enableZoom={false} 
              enableRotate={false}
              enablePan={false}
              enabled={false}
            />
          </Canvas>
        </div>
      </div>

      {/* FULL WIDTH - Final Section */}
      <section className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-gray-900 to-black">
        <div className="text-center max-w-4xl">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Experience the Future of Coding
          </h2>
          <p className="text-2xl text-gray-300 mb-8">
            Our architecture ensures each conversation gets a dedicated, intelligent agent that understands your context and provides personalized assistance.
          </p>
          <button className="px-12 py-6 bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold rounded-lg transition-colors">
            Try It Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage;