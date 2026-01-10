
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, PerspectiveCamera, ContactShadows, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';
import cityHdr from '../../assets/potsdamer_platz_1k.hdr';

// "Fluid Thought" - A distorted organic shape
function FluidThought({ position, rotation, color }: any) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const t = state.clock.getElapsedTime();
        // Organic rotation
        meshRef.current.rotation.x = Math.sin(t * 0.1) * 0.2;
        meshRef.current.rotation.y = t * 0.08;
    });

    return (
        <Float
            speed={1}
            rotationIntensity={0.2}
            floatIntensity={1}
            position={position}
        >
            <group rotation={rotation}>
                {/* Main Organic Blob using TorusKnot with thick tube */}
                <mesh ref={meshRef}>
                    <torusKnotGeometry args={[1, 0.4, 128, 32]} />
                    <MeshTransmissionMaterial
                        backside
                        samples={6} // Reduced from 16 for performance
                        resolution={256} // Reduced from 512
                        thickness={2}
                        roughness={0.2}
                        anisotropy={1}
                        chromaticAberration={0.2}
                        color={color}
                    />
                </mesh>

                {/* Inner Floating Pearl */}
                <mesh position={[0.5, 0, 0]}>
                    <sphereGeometry args={[0.3, 32, 32]} />
                    <meshStandardMaterial
                        color="#F3E8FF"
                        roughness={0.1}
                        metalness={0.8}
                    />
                </mesh>
            </group>
        </Float>
    );
}

function PhilosophyScene() {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={40} />
            <Environment files={cityHdr} />

            <ambientLight intensity={0.6} color="#fafafa" />
            <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={1} color="#E8D5C4" /> {/* Warm/Paper tone */}

            <group position={[4, 0, 0]}>
                {/* Central Thought Object */}
                <FluidThought position={[3, 0, -2]} rotation={[0, 0, 0]} color="#e0f2fe" /> {/* Soft Sky Blue tint */}

                {/* Secondary Object - different angle */}
                <FluidThought position={[0, 2, -5]} rotation={[1, 1, 0]} color="#f3e8ff" /> {/* Soft Purple tint */}
            </group>

            <ContactShadows position={[0, -5, 0]} opacity={0.3} scale={30} blur={4} far={6} color="#525252" />
        </>
    );
}

export function Philosophy3DBackground() {
    return (
        <div className="absolute inset-0 z-[-1] select-none overflow-hidden bg-gradient-to-b from-[#F9F9F9] to-[#F1F1F1] dark:from-[#0a0a0a] dark:to-[#1a1a1a]">
            <Canvas dpr={[1, 1.5]} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
                <PhilosophyScene />
            </Canvas>
            <div className="absolute inset-0 bg-white/40 dark:bg-black/40 pointer-events-none mix-blend-overlay" />
        </div>
    );
}
