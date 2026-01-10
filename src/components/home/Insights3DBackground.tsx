
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, PerspectiveCamera, ContactShadows, Stars, Instance, Instances } from '@react-three/drei';
import * as THREE from 'three';
import warehouseHdr from '../../assets/empty_warehouse_01_1k.hdr';

// High-end "Intellect" Crystal
function UltraCrystal({ position, rotation, scale, color }: any) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const t = state.clock.getElapsedTime();

        // Complex organic rotation
        meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.5;
        meshRef.current.rotation.y = Math.cos(t * 0.3) * 0.5;

        // Breathing scale
        const breathe = Math.sin(t * 0.5) * 0.05 + 1;
        meshRef.current.scale.setScalar(scale * breathe);
    });

    return (
        <Float
            speed={2}
            rotationIntensity={0.5}
            floatIntensity={1}
            position={position}
        >
            <mesh ref={meshRef}>
                <octahedronGeometry args={[1, 0]} />
                {/* Premium "Ultra" Glass Material */}
                <meshPhysicalMaterial
                    color={color}
                    roughness={0.05} // Ultra smooth
                    metalness={0.1}
                    transmission={1.0} // Fully transparent glass
                    thickness={2.5} // Thick, substantive glass
                    ior={1.6} // Diamond-like refraction
                    clearcoat={1.0}
                    clearcoatRoughness={0.1}
                    attenuationDistance={0.5}
                    attenuationColor={color}
                />
            </mesh>
        </Float>
    );
}

// Interconnected Data Nodes
function DataConstellation() {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!groupRef.current) return;
        groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    });

    // Create a random cloud of points
    const points = useMemo(() => {
        const p = [];
        for (let i = 0; i < 30; i++) {
            p.push({
                position: [
                    (Math.random() - 0.5) * 10,
                    (Math.random() - 0.5) * 6,
                    (Math.random() - 0.5) * 8
                ],
                scale: Math.random() * 0.15 + 0.05
            })
        }
        return p;
    }, []);

    return (
        <group ref={groupRef}>
            {points.map((pt, i) => (
                <Float key={i} speed={1} rotationIntensity={1} floatIntensity={1} position={pt.position as any}>
                    <mesh scale={[pt.scale, pt.scale, pt.scale]}>
                        <sphereGeometry args={[1, 16, 16]} />
                        <meshStandardMaterial
                            color="#10B981" // Emerald signal
                            emissive="#059669"
                            emissiveIntensity={2}
                            toneMapped={false}
                        />
                    </mesh>
                </Float>
            ))}

            {/* Abstract Connections/Lines could go here, but let's keep it clean "constellation" style for performance */}
        </group>
    )
}

function UltraScene() {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={45} />
            <Environment files={warehouseHdr} /> {/* High contrast industrial lighting */}

            {/* Dramatic Lighting */}
            <ambientLight intensity={0.2} color="#064E3B" /> {/* Deep Emerald Ambient */}
            <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={2} color="#D1FAE5" castShadow />
            <pointLight position={[-10, -5, -5]} intensity={1} color="#34D399" />
            <pointLight position={[0, 0, 5]} intensity={0.5} color="#fff" />

            <group position={[4, 0, 0]}>
                {/* Central Intellect Cluster */}
                <UltraCrystal position={[0, 0, 0]} scale={2.0} color="#ffffff" />
                <UltraCrystal position={[0, 1.5, -2]} scale={1.2} color="#A7F3D0" />
                <UltraCrystal position={[2.5, -1, -1]} scale={1.5} color="#6EE7B7" />

                {/* Background Data Cloud */}
                <DataConstellation />
            </group>

            {/* Background Starfield for "Depth" */}
            <Stars radius={20} depth={50} count={500} factor={4} saturation={0} fade speed={1} />

            {/* High Quality Shadow Floor - Optimized */}
            <ContactShadows position={[0, -4, 0]} opacity={0.4} scale={30} blur={2.5} far={5} color="#065F46" resolution={128} frames={1} />
        </>
    );
}

export function Insights3DBackground() {
    return (
        <div className="absolute inset-0 z-[-1] select-none overflow-hidden bg-gradient-to-b from-slate-50 to-emerald-50/30 dark:from-slate-950 dark:to-emerald-950/30">
            {/* We use a specific background color to blend with the glass */}
            <Canvas dpr={[1, 1.5]} gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2, powerPreference: "high-performance" }}>
                <UltraScene />
                {/* Post-processing Bloom could be creating "Ultra" feel, but standard three materials with high emissive values work well too */}
            </Canvas>

            {/* Vignette Overlay */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-white/80 pointer-events-none" />
        </div>
    );
}
