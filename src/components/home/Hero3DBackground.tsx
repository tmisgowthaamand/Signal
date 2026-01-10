
import { useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, PerspectiveCamera, ContactShadows, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import studioHdr from '../../assets/studio_small_03_1k.hdr';

// deeply faceted "Diamond/Signal" object
function PrismSignal({ position, scale }: any) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const t = state.clock.getElapsedTime();
        meshRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
        meshRef.current.rotation.y = t * 0.1;
        meshRef.current.rotation.z = Math.cos(t * 0.15) * 0.1;
    });

    return (
        <Float
            speed={1.5}
            rotationIntensity={0.2}
            floatIntensity={0.5}
            position={position}
        >
            <mesh ref={meshRef} scale={scale}>
                {/* Icosahedron with high detail for facets */}
                <icosahedronGeometry args={[1, 0]} />
                <meshPhysicalMaterial
                    color="#ffffff"
                    roughness={0}
                    metalness={0.1}
                    transmission={1}
                    thickness={3} // Thick glass
                    ior={2.4} // Diamond IOR
                    dispersion={0.8} // Chromatic aberration for "Prism" effect
                    clearcoat={1}
                    attenuationDistance={1}
                    attenuationColor="#ffffff"
                />
            </mesh>

            {/* Internal "Core" to catch light */}
            <mesh scale={scale * 0.6} position={position}>
                <dodecahedronGeometry args={[1, 0]} />
                <meshStandardMaterial
                    color="#E2E8F0"
                    emissive="#ffffff"
                    emissiveIntensity={0.5}
                    roughness={0.2}
                    metalness={1}
                />
            </mesh>
        </Float>
    );
}

// Geometric "Satellite" shards
function Shards() {
    return (
        <group>
            {[...Array(6)].map((_, i) => (
                <Float key={i} speed={0.8} rotationIntensity={1} floatIntensity={1}
                    position={[
                        (Math.random() - 0.5) * 10,
                        (Math.random() - 0.5) * 8,
                        (Math.random() - 0.5) * 6
                    ]}
                >
                    <mesh scale={Math.random() * 0.3 + 0.1}>
                        <octahedronGeometry args={[1, 0]} />
                        <meshPhysicalMaterial
                            color="#F1F5F9"
                            roughness={0.1}
                            metalness={0.8}
                        />
                    </mesh>
                </Float>
            ))}
        </group>
    )
}

function HeroScene() {
    const { viewport } = useThree();
    // Responsive logic: Check if width is constrained (mobile/tablet portrait)
    // At z=8 roughly, desktop width is ~12-14, mobile is ~3-4.
    const isMobile = viewport.width < 8;

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
            <Environment files={studioHdr} />

            {/* Clean, Bright "Daylight" */}
            <ambientLight intensity={0.4} />
            <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={1} color="#ffffff" castShadow />
            <pointLight position={[-10, 0, -5]} intensity={0.5} color="blue" />

            {/* Responsive Group Positioning */}
            <group
                position={isMobile ? [0, 2, 0] : [5, 0, 0]}
                scale={isMobile ? 0.6 : 1}
            >
                <PrismSignal position={[0, 0, 0]} scale={2.2} />
                <Shards />
            </group>

            {/* Subtle background sparkles for "Magic/Tech" feel */}
            <Sparkles count={50} scale={10} size={2} speed={0.4} opacity={0.5} color="#cbd5e1" />

            <ContactShadows position={[0, -4, 0]} opacity={0.4} scale={20} blur={2.5} far={4} color="#94a3b8" />
        </>
    );
}

export function Hero3DBackground() {
    return (
        <div className="absolute inset-0 z-[-1] select-none overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-black will-change-transform">
            <Canvas
                dpr={[1, 1.5]}
                gl={{
                    antialias: true, // Keep AA for sharp edges, relying on dpr cap 
                    alpha: true,
                    powerPreference: "high-performance",
                    stencil: false, // Disable stencil if not needed
                    depth: true
                }}
                frameloop="always" // Keep always for smoothness, but could use 'demand' if interaction based
            >
                <Suspense fallback={null}>
                    <HeroScene />
                </Suspense>
            </Canvas>
            <div className="absolute inset-0 bg-white/30 dark:bg-black/30 pointer-events-none" />
        </div >
    );
}
