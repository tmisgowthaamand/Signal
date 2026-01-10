
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, PerspectiveCamera, ContactShadows, Stars, Torus, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import veniceHdr from '../../assets/venice_sunset_1k.hdr';

// High-end Rose Gold Metal Ring
function RoseRing({ position, rotation, scale, delay }: any) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const t = state.clock.getElapsedTime();
        // Elegant slow spin
        meshRef.current.rotation.x = Math.sin(t * 0.1 + delay) * 0.2;
        meshRef.current.rotation.y = t * 0.15 + delay;
    });

    return (
        <Float
            speed={1.5}
            rotationIntensity={0.2}
            floatIntensity={1}
            position={position}
        >
            <Torus args={[1.5, 0.15, 64, 100]} ref={meshRef} rotation={rotation} scale={scale}>
                <meshPhysicalMaterial
                    color="#E11D48" // Rose base
                    emissive="#E11D48"
                    emissiveIntensity={0.2}
                    roughness={0.1}
                    metalness={1.0} // Pure metal
                    clearcoat={1.0}
                    clearcoatRoughness={0.1}
                    reflectivity={1}
                    iridescence={1}
                    iridescenceIOR={1.3}
                    iridescenceThicknessRange={[100, 400]}
                />
            </Torus>
        </Float>
    );
}

// Emissive Core Sphere (like a "Heart/Pulse")
function CoreSphere({ position, scale }: any) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const t = state.clock.getElapsedTime();
        // Pulse effect
        const scalePulse = 1 + Math.sin(t * 2) * 0.05;
        meshRef.current.scale.setScalar(scale * scalePulse);
    });

    return (
        <Float speed={2} floatIntensity={2} position={position}>
            <Sphere args={[1, 64, 64]} ref={meshRef}>
                <meshPhysicalMaterial
                    color="#FDA4AF" // Soft pink
                    roughness={0.4}
                    metalness={0.2}
                    transmission={0.8}
                    thickness={3}
                    clearcoat={1}
                />
            </Sphere>
            {/* Inner Glow */}
            <Sphere args={[0.6, 32, 32]} position={position}>
                <meshBasicMaterial color="#BE123C" />
            </Sphere>
        </Float>
    )
}

// Floating Particles (Sparks of ideas)
function ParticleStream() {
    const particles = useMemo(() => {
        const p = [];
        for (let i = 0; i < 40; i++) {
            p.push({
                pos: [(Math.random() * 6) - 1, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 5],
                scale: Math.random() * 0.08 + 0.02
            })
        }
        return p;
    }, []);

    const groupRef = useRef<THREE.Group>(null);
    useFrame((state) => {
        if (!groupRef.current) return;
        groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    });

    return (
        <group ref={groupRef}>
            {particles.map((data, i) => (
                <Float key={i} position={data.pos as any} speed={0.5} floatIntensity={1}>
                    <mesh>
                        <sphereGeometry args={[data.scale, 8, 8]} />
                        <meshBasicMaterial color="#FB7185" />
                    </mesh>
                </Float>
            ))}
        </group>
    )
}

function ProposalScene() {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={45} />
            <Environment files={veniceHdr} /> {/* Warm, romantic/proposal lighting */}

            {/* Warm Ambient */}
            <ambientLight intensity={0.5} color="#881337" />

            {/* Key Lights for Rose Gold shine */}
            <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={1.5} color="#FECDD3" />
            <pointLight position={[-10, 0, -5]} intensity={0.8} color="#F43F5E" />
            <pointLight position={[0, -10, 5]} intensity={0.5} color="#fff" />

            <group position={[4, 0, 0]}>
                {/* Central Metaphor: Rings circling a Core (Partnership) */}
                <CoreSphere position={[0, 0, 0]} scale={1.5} />

                <RoseRing position={[0, 0, 0]} rotation={[1.5, 0, 0]} scale={1.8} delay={0} />
                <RoseRing position={[0, 0, 0]} rotation={[0, 1.5, 0]} scale={2.5} delay={1} />
                <RoseRing position={[0, 0, 0]} rotation={[0.5, 0.5, 0.5]} scale={3.2} delay={2} />

                <ParticleStream />
            </group>

            {/* Stars for that "Universe" feeling */}
            <Stars radius={30} depth={50} count={400} factor={3} saturation={0} fade speed={0.5} />

            <ContactShadows position={[0, -5, 0]} opacity={0.4} scale={30} blur={3} far={6} color="#4C0519" resolution={256} frames={1} />
        </>
    );
}

export function Proposal3DBackground() {
    return (
        <div className="absolute inset-0 z-[-1] select-none overflow-hidden bg-gradient-to-b from-rose-50/50 to-white dark:from-rose-950/30 dark:to-black">
            <Canvas dpr={[1, 1.5]} gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1, powerPreference: "high-performance" }}>
                <ProposalScene />
            </Canvas>

            {/* Soft overlay to blend */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-white/90 dark:to-black/90 pointer-events-none" />
        </div>
    );
}
