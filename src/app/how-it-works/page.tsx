"use client";
import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Html, RoundedBox } from '@react-three/drei';
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
          color={isUser ? "#FF1493" : "#00FF7F"} 
          emissive={isUser ? "#FF69B4" : "#32CD32"}
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
const Agent = ({ position, visible = false, color = "#FF69B4" }) => {
  const meshRef = useRef<THREE.Group>(null);
  
  useEffect(() => {
    if (meshRef.current) {
      gsap.to(meshRef.current.scale, {
        x: visible ? 1 : 0,
        y: visible ? 1 : 0,
        z: visible ? 1 : 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)"
      });
      
      // Add a floating animation when visible
      if (visible) {
        gsap.to(meshRef.current.position, {
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
    <group ref={meshRef} position={position}>
      <RoundedBox args={[1, 1, 0.8]} radius={0.1} smoothness={4}>
        <meshStandardMaterial 
          color="#FF0080" 
          emissive="#FF69B4"
          emissiveIntensity={0.4}
        />
      </RoundedBox>
      <Text
        position={[0, 0, 0.45]}
        fontSize={0.07}
        color="#FFF"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        🤖
      </Text>
      <Text
        position={[0, -0.15, 0.45]}
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
};

// WebSocket Connection Line
const WebSocketConnection = ({ start, end, visible = false }) => {
  const lineRef = useRef<THREE.Line>(null);
  const materialRef = useRef<THREE.LineBasicMaterial>(null);

  useEffect(() => {
    if (materialRef.current) {
      gsap.to(materialRef.current, {
        opacity: visible ? 1 : 0,
        duration: 0.5
      });
    }
  }, [visible]);

  const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)];
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <line ref={lineRef} geometry={geometry}>
      <lineBasicMaterial ref={materialRef} color="#00CED1" transparent opacity={0} linewidth={3} />
    </line>
  );
};

// Flow Animation Line
const FlowLine = ({ start, end, active = false }) => {
  const lineRef = useRef<THREE.Line>(null);
  
  useFrame((state) => {
    if (lineRef.current && active) {
      const time = state.clock.getElapsedTime();
      lineRef.current.material.opacity = 0.5 + 0.5 * Math.sin(time * 3);
    }
  });

  const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)];
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <line ref={lineRef} geometry={geometry}>
      <lineBasicMaterial color="#FFD700" transparent opacity={active ? 0.9 : 0} linewidth={4} />
    </line>
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
      gsap.to(agentRef.current.position, { z: animationStep === 4 ? 4 : 1, duration, ease });
      gsap.to(agentRef.current.scale, { x: animationStep === 4 ? 1.8 : 1, y: animationStep === 4 ? 1.8 : 1, z: animationStep === 4 ? 1.8 : 1, duration, ease });
    }

    // Camera movements based on active step
    if (camera) {
      camera.updateProjectionMatrix();
      
      if (animationStep === 1) {
        // Step 1: Focus on Chat Window
        gsap.to(camera.position, { x: -1.8, y: 1.5, z: 12, duration, ease, onUpdate: () => camera.updateProjectionMatrix() });
        
      } else if (animationStep === 2) {
        // Step 2: Focus on API Block
        gsap.to(camera.position, { x: -1.8, y: -1.5, z: 12, duration, ease, onUpdate: () => camera.updateProjectionMatrix() });
        
      } else if (animationStep === 3) {
        // Step 3: Focus on Process Manager
        gsap.to(camera.position, { x: 1.8, y: -1.5, z: 12, duration, ease, onUpdate: () => camera.updateProjectionMatrix() });
        
      } else if (animationStep === 4) {
        // Step 4: Focus on Independent Agent
        gsap.to(camera.position, { x: 3.5, y: -0.8, z: 12, duration, ease, onUpdate: () => camera.updateProjectionMatrix() });
        
      } else {
        // Reset camera to overview position
        gsap.to(camera.position, { x: 0, y: 0, z: 12, duration, ease, onUpdate: () => camera.updateProjectionMatrix() });
      }
    }
  }, [animationStep, camera]);

  return (
    <group>
      {/* FRONTEND SECTION */}
      <group ref={frontendRef} position={[0, 2, 0]}>
        {/* Frontend Container - Bright */}
        <RoundedBox args={[5.5, 2.2, 0.5]} radius={0.2} smoothness={4}>
          <meshStandardMaterial 
            color="#FF69B4" 
            emissive="#FF1493"
            emissiveIntensity={0.3}
          />
        </RoundedBox>
        <Text position={[0, 1, 0.35]} fontSize={0.15} color="#FFF" fontWeight="bold">
          FRONTEND
        </Text>

        {/* Chat Window Block */}
        <group ref={chatWindowRef} position={[-1.8, 0, 0.35]}>
          <RoundedBox args={[1.8, 1.8, 0.35]} radius={0.15} smoothness={4}>
            <meshStandardMaterial 
              color={animationStep >= 1 ? "#00BFFF" : "#9370DB"} 
              emissive={animationStep >= 1 ? "#1E90FF" : "#8A2BE2"}
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
            visible={animationStep >= 4} 
          />
        </group>

        {/* Code Editor Block */}
        <RoundedBox position={[1.8, 0, 0.35]} args={[1.8, 1.8, 0.35]} radius={0.15} smoothness={4}>
          <meshStandardMaterial 
            color="#00FF32" 
            emissive="#32CD32"
            emissiveIntensity={0.4}
          />
        </RoundedBox>
        <Text position={[2.2, 0.7, 0.6]} fontSize={0.08} color="#FFF" fontWeight="bold">
          📝 Editor
        </Text>
        <Text position={[2.2, 0.2, 0.6]} fontSize={0.05} color="#FFF">
          function() {'{'}
        </Text>
        <Text position={[2.2, 0, 0.6]} fontSize={0.05} color="#FFF">
          {'  '}code here
        </Text>
        <Text position={[2.2, -0.2, 0.6]} fontSize={0.05} color="#FFF">
          {'}'}
        </Text>
      </group>

      {/* BACKEND SECTION */}
      <group ref={backendRef} position={[0, -2, 0]}>
        {/* Backend Container - Bright */}
        <RoundedBox args={[5.5, 2.2, 0.5]} radius={0.2} smoothness={4}>
          <meshStandardMaterial 
            color="#FFD700" 
            emissive="#FFA500"
            emissiveIntensity={0.3}
          />
        </RoundedBox>
        <Text position={[0, 1, 0.35]} fontSize={0.15} color="#000" fontWeight="bold">
          BACKEND
        </Text>

        {/* API Endpoints Block */}
        <group ref={apiBlockRef} position={[-1.8, 0, 0.35]}>
          <RoundedBox args={[1.8, 1.8, 0.35]} radius={0.15} smoothness={4}>
            <meshStandardMaterial 
              color={animationStep >= 2 ? "#FFFF00" : "#FF8C00"} 
              emissive={animationStep >= 2 ? "#FFD700" : "#FF4500"}
              emissiveIntensity={0.4}
            />
          </RoundedBox>
          <Text position={[0, 0.7, 0.25]} fontSize={0.08} color="#000" fontWeight="bold">
            🌐 API
          </Text>
          <Text position={[0, 0.3, 0.25]} fontSize={0.05} color="#000">
            /chat {animationStep >= 2 ? "✅" : ""}
          </Text>
          <Text position={[0, 0.1, 0.25]} fontSize={0.05} color="#000">
            /files
          </Text>
          <Text position={[0, -0.1, 0.25]} fontSize={0.05} color="#000">
            /terminal
          </Text>
        </group>

        {/* Process Manager Block */}
        <group ref={processManagerRef} position={[1.8, 0, 0.35]}>
          <RoundedBox args={[1.8, 1.8, 0.35]} radius={0.15} smoothness={4}>
            <meshStandardMaterial 
              color={animationStep >= 3 ? "#FF00FF" : "#FF8C00"}
              emissive={animationStep >= 3 ? "#FF69B4" : "#FF4500"}
              emissiveIntensity={0.4}
            />
          </RoundedBox>
          <Text position={[0, 0.7, 0.25]} fontSize={0.08} color="#FFF" fontWeight="bold">
            ⚙️ Process
          </Text>
          <Text position={[0, 0.1, 0.25]} fontSize={0.05} color="#FFF">
            {animationStep >= 3 ? "🚀 Spawned!" : "Ready..."}
          </Text>

          {/* Agent inside backend (Step 3) */}
          {animationStep === 3 && (
            <Agent position={[0, -0.5, 0.35]} visible={true} />
          )}
        </group>
      </group>

      {/* INDEPENDENT AGENT (Step 4) */}
      <Agent 
        ref={agentRef}
        position={[4.5, -1, 1]} 
        visible={animationStep >= 4} 
      />

      {/* FLOW LINES - Brighter Colors */}
      {/* Frontend to Backend flow */}
      <FlowLine 
        start={[-2.2, 0.8, 0.6]} 
        end={[-2.2, -0.8, 0.6]} 
        active={animationStep >= 2} 
      />

      {/* WebSocket Connections */}
      <WebSocketConnection 
        start={[-2.2, -0.8, 0.6]} 
        end={[2.2, -0.8, 0.6]} 
        visible={animationStep >= 2} 
      />

      <WebSocketConnection 
        start={[2.2, -1.5, 0.7]} 
        end={[4.5, -1, 1]} 
        visible={animationStep >= 4} 
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