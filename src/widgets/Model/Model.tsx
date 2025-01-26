import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, useProgress, Html } from "@react-three/drei";

const LoadingScreen = () => {
    const { progress, active } = useProgress();

    if (!active) return null;

    return (
        <Html center>
            <div
                style={{
                    color: "white",
                    backgroundColor: "rgba(0,0,0,0.8)",
                    padding: "20px",
                    borderRadius: "8px",
                    textAlign: "center",
                }}
            >
                Загрузка: {progress.toFixed(0)}%
            </div>
        </Html>
    );
};

const Model = () => {
    const gltf = useGLTF("/blue_archive_miyako.glb");

    // что мне сделать епта
    if (gltf.scene) {
        const shoulder = gltf.scene.getObjectByName("DEF-shoulderR_0357");
        const upperArm = gltf.scene.getObjectByName("DEF-upper_armR_0368");
        const forearm = gltf.scene.getObjectByName("DEF-forearmR_0370");
        const hand = gltf.scene.getObjectByName("DEF-handR_0372");

        if (shoulder && upperArm && forearm && hand) {
            shoulder.rotation.set(0, 0, 1);
            upperArm.rotation.set(0, 0, 1);
            forearm.rotation.set(0, 0, 1);
            hand.rotation.set(0, 0, 1);

            shoulder.rotation.z = Math.PI / 32;
            upperArm.rotation.z = Math.PI / 16;
            forearm.rotation.x = Math.PI / 32;
            hand.rotation.x = 0;
        }
    }

    // console.log(gltf.scene.traverse((obj) => console.log(obj.name)));

    return <primitive object={gltf.scene} />;
};

const ThreeScene = () => {
    return (
        <Canvas
            style={{ width: "100%", height: "100%" }}
            camera={{
                position: [0, 0.03, 0.07],
                fov: 30,
                near: 0.01,
                far: 1000,
            }}
        >
            <LoadingScreen />

            {/* Освещение */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />

            {/* Модель */}
            <Model />

            {/* Управление камерой */}
            <OrbitControls
                enableDamping={true}
                minDistance={0.01}
                maxDistance={1}
            />
        </Canvas>
    );
};

export default ThreeScene;
