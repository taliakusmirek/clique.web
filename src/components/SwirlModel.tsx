import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';

export function SwirlModel() {
  const groupRef = useRef<THREE.Group>(null);
  const [model, setModel] = useState<THREE.Group | null>(null);

  useEffect(() => {
    const loader = new GLTFLoader();
    const modelPath = import.meta.env.BASE_URL + 'models/spiral.glb';

    loader.load(
      modelPath,
      (gltf) => {
        const loadedModel = gltf.scene;
        loadedModel.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material = new THREE.MeshStandardMaterial({
              color: '#f9ff81',
              metalness: 0.5,
              roughness: 0.2,
              emissive: '#f9ff81',
              emissiveIntensity: 0.2,
            });
          }
        });
        setModel(loadedModel);
      },
      (progress) => {
        console.log((progress.loaded / progress.total * 100) + '% loaded');
      },
      (error) => {
        console.error('Error loading model:', error);
      }
    );
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
      groupRef.current.rotation.z += delta * 0.3;
    }
  });

  if (!model) {
    return null;
  }

  return (
    <group ref={groupRef}>
      <primitive 
        object={model} 
        scale={2}
        position={[0, 0, 0]}
      />
      <ambientLight intensity={1.5} />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={2}
        castShadow
      />
      <directionalLight 
        position={[-5, -5, -5]} 
        intensity={1}
      />
      <pointLight 
        position={[10, 10, 10]} 
        intensity={2}
      />
      <pointLight 
        position={[-10, -10, -10]} 
        intensity={1}
      />
      <spotLight
        position={[0, 5, 0]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        castShadow
      />
    </group>
  );
} 