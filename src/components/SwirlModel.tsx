import { useRef, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'; // Note the .js extension
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js'; // Note the .js extension
import * as THREE from 'three';


export function SwirlModel() {
  const groupRef = useRef<THREE.Group>(null);

  try {
    // Load the MTL first
    const materials = useLoader(MTLLoader, '/spiral.mtl');
    // Then load the OBJ with the materials
    const obj = useLoader(OBJLoader, '/spiral.obj', (loader) => {
      materials.preload();
      loader.setMaterials(materials);
    });

    // Clone the object to avoid mutations
    const model = obj.clone();

    // Add proper type for child
    model.traverse((child: THREE.Object3D) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: '#f9ff81', // Your brand color
          metalness: 0.5,
          roughness: 0.2,
          emissive: '#f9ff81',
          emissiveIntensity: 0.2,
        });
      }
    });

    // Remove unused state parameter
    useFrame((_, delta) => {
      if (groupRef.current) {
        groupRef.current.rotation.y += delta * 0.5;
        groupRef.current.rotation.z += delta * 0.3;
      }
    });

    return (
      <group ref={groupRef}>
        <primitive 
          object={model} 
          scale={2}
          position={[0, 0, 0]}
        />
        {/* Enhanced lighting setup for better visibility */}
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
  } catch (error) {
    console.error('Error loading 3D model:', error);
    // Return a fallback or null
    return null;
  }
} 