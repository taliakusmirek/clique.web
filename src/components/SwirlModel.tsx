import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';

export function SwirlModel() {
  const groupRef = useRef<THREE.Group>(null);
  const [error, setError] = useState<string | null>(null);
  const [model, setModel] = useState<THREE.Group | null>(null);

  useEffect(() => {
    async function loadModel() {
      try {
        console.log('Starting model load...');
        
        // Load GLB
        const gltfLoader = new GLTFLoader();
        
        const gltf = await new Promise<THREE.Group>((resolve, reject) => {
          gltfLoader.load(
            `${window.location.origin}/models/spiral.glb`,
            (gltf) => resolve(gltf.scene),
            (progress) => console.log('Loading progress:', progress),
            (error) => {
              console.error('GLTF loading error:', error);
              reject(error);
            }
          );
        });

        console.log('GLB loaded successfully');
        
        // Clone and setup the model
        const loadedModel = gltf.clone();
        loadedModel.traverse((child: THREE.Object3D) => {
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
      } catch (err) {
        console.error('Detailed loading error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error loading model');
      }
    }

    loadModel();
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
      groupRef.current.rotation.z += delta * 0.3;
    }
  });

  if (error) {
    console.error('Model loading error:', error);
    return null;
  }

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