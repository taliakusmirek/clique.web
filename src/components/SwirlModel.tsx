import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';

export function SwirlModel() {
  const groupRef = useRef<THREE.Group>(null);
  const [model, setModel] = useState<THREE.Group | null>(null);

  useEffect(() => {
    const loader = new GLTFLoader();
    // Construct path relative to the base URL
    const modelPath = import.meta.env.DEV 
      ? '/models/spiral.glb'  // Development path
      : `${import.meta.env.BASE_URL}models/spiral.glb`; // Production path
    
    console.log('Attempting to load model from:', new URL(modelPath, window.location.origin).href);

    loader.load(
      modelPath,
      (gltf) => {
        console.log('Model loaded successfully:', gltf);
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
        const percentComplete = (progress.loaded / progress.total) * 100;
        console.log(`Loading progress: ${percentComplete.toFixed(2)}%`);
      },
      (err: unknown) => {
        // More detailed error logging
        const error = err as Error;
        console.error('Error loading model:', {
          message: error.message,
          stack: error.stack,
          modelPath,
          fullUrl: new URL(modelPath, window.location.origin).href
        });
        
        // Try to fetch the URL directly to see what response we get
        fetch(modelPath)
          .then(response => {
            console.log('Fetch response:', {
              status: response.status,
              statusText: response.statusText,
              headers: Object.fromEntries(response.headers.entries()),
              url: response.url
            });
            return response.text();
          })
          .then(text => {
            if (text.startsWith('<!DOCTYPE')) {
              console.error('Received HTML instead of GLB file. First 100 chars:', text.substring(0, 100));
            } else {
              console.log('Response content type:', text.slice(0, 20));
            }
          })
          .catch(fetchError => {
            console.error('Fetch error:', fetchError);
          });
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