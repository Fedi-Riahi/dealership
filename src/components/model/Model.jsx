"use client";
import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import SL from "../../../public/Sl";
import * as THREE from "three";

import FloatingGrid from "./FloatingGrid";
import GroundComponent  from "./Ground";

const MyModel = () => {
  const [cameraUpAndDown, setCameraUpAndDown] = useState(false);

  return (
    <div className="w-full md:h-full h-1/2  rounded-xl px-4">
      <Canvas>
        <ambientLight intensity={1.5} />
        <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} autoRotate />
        <spotLight
          color={[255, 255, 255]}
          intensity={1}
          angle={0.6}
          penumbra={0.5}
          position={[5, 5, 0]}
        />
        <spotLight
          color={[255, 255, 255]}
          intensity={1}
          angle={0.6}
          penumbra={0.5}
          position={[-5, 5, 0]}
        />
        <color args={[0.5, 0.5, 0.5]} attach="background" />

        <Suspense fallback={null}>
          <Car cameraUpAndDown={cameraUpAndDown} />
        </Suspense>
        <Environment preset="sunset" />
      </Canvas>
    </div>
  );
};

const Car = ({ cameraUpAndDown }) => {
  const carRef = useRef();
  const { camera } = useThree();

  return (
    <group ref={carRef} scale={[1.4, 1.4, 1.4]}>
      <SL />
      {cameraUpAndDown && <CameraUpAndDownAnimation />}
      <GroundComponent /> {/* Add ground under the car */}
      <FloatingGrid /> {/* Add floating grid around the car */}
    </group>
  );
};

const ClickablePoint = ({ position }) => {
  const { scene, camera } = useThree();
  const pointRef = useRef();

  const handlePointClick = () => {
    const targetPosition = new THREE.Vector3(
      position[0],
      position[1],
      position[2]
    );
    smoothMoveCamera(camera, targetPosition);
  };

  return (
    <mesh ref={pointRef} position={position} onClick={handlePointClick}>
      <sphereGeometry args={[0.1, 10, 10]} />
      <meshBasicMaterial color="black" />
    </mesh>
  );
};

const Ground = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="lightgray" />
    </mesh>
  );
};

const CameraUpAndDownAnimation = () => {
  const { camera } = useThree();
  const carPosition = useRef();
  const initialCameraPosition = camera.position.clone();
  const radius = 10;
  const speed = 1;

  useFrame(() => {
    camera.position.x =
      carPosition.current.x + Math.cos(speed * Date.now() * 0.5) * radius;
    camera.position.z =
      carPosition.current.z + Math.sin(speed * Date.now() * 0.5) * radius;
    camera.lookAt(carPosition.current);
  });

  return null;
};

const smoothMoveCamera = (camera, targetPosition, duration = 1000) => {
  const startPosition = camera.position.clone();
  let startTime = null;

  const updateCameraPosition = (time) => {
    if (!startTime) startTime = time;
    const progress = Math.min((time - startTime) / duration, 1); // Limit progress to 1
    camera.position.lerpVectors(startPosition, targetPosition, progress);
    if (progress < 1) {
      requestAnimationFrame(updateCameraPosition);
    }
  };

  requestAnimationFrame(updateCameraPosition);
};

export default MyModel;
