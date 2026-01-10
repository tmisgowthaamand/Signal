
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, PerspectiveCamera, ContactShadows, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

// "The Monoliths" - Solid, grounded, structured
function StructuralBlock({ position, rotation, scale, type }: any) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        // VERY slow drift - almost static/monumental
        const t = state.clock.getElapsedTime();
        meshRef.current.rotation.y = rotation[1] + Math.sin(t * 0.05) * 0.05;
    });

    const material = type === 'stone' ? (
        <meshStandardMaterial
            color="#E7E5E4"
            roughness={0.9} // Concrete/Stone look
            metalness={0.0}
        />
    ) : (
        <meshStandardMaterial
            color="#D4AF37" // Gold/Brass
            roughness={0.2}
            metalness={1.0}
        />
    );

    return (
        <Float
            speed={0.5}
            rotationIntensity={0.1}
            floatIntensity={0.5}
            position={position}
        >
            <RoundedBox args={[1, 1, 1]} radius={0.05} smoothness={4} scale={scale} ref={meshRef} rotation={rotation}>
                {material}
            </RoundedBox>
        </Float>
    );
}

function WorkScene() {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={35} />
            <Environment files="/assets/lebombo_1k.hdr" /> {/* Warm interior light */}

            <ambientLight intensity={0.5} color="#fff7ed" /> {/* Orange/Warm Tint */}
            <spotLight position={[5, 10, 5]} angle={0.4} penumbra={1} intensity={0.8} color="#FFEDD5" castShadow />

            <group position={[4, -1, 0]}>
                {/* Main Structure - The "Work" */}
                <StructuralBlock position={[3, 1, -1]} rotation={[0, 0.4, 0]} scale={[1.5, 4, 1.5]} type="stone" />

                {/* Accent Block - The "Value/Gold" */}
                <StructuralBlock position={[3.5, -1, 0.5]} rotation={[0.2, 0.1, 0.2]} scale={[0.8, 0.8, 0.8]} type="gold" />

                {/* Background Elements */}
                <StructuralBlock position={[0, -2, -6]} rotation={[0, -0.2, 0.1]} scale={[3, 3, 0.5]} type="stone" />
                <StructuralBlock position={[1, 3, -4]} rotation={[0.4, 0.4, 0]} scale={[1, 1, 1]} type="gold" />
            </group>

            <ContactShadows position={[0, -6, 0]} opacity={0.4} scale={40} blur={3} far={8} color="#78716C" resolution={256} frames={1} />
        </>
    );
}

export function Work3DBackground() {
    return (
        <div className="absolute inset-0 z-[-1] select-none overflow-hidden bg-[#FBF9F6] dark:bg-[#0c0a09]">
            <Canvas dpr={[1, 1.5]} gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1, powerPreference: "high-performance" }}>
                <WorkScene />
            </Canvas>
            {/* Warm grain overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIi8+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNjY2MiLz4KPC9zdmc+')] opacity-5 mix-blend-multiply dark:mix-blend-overlay pointer-events-none" />
        </div>
    );
}
