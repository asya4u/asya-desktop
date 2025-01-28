import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
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
	const gltf = useGLTF("/belle.glb");
	const mixer = useRef<THREE.AnimationMixer | null>(null);
	const armBones = useRef<THREE.Object3D[]>([]);

	useEffect(() => {
		if (gltf.scene) {
			const armBoneNames = [
				"arm_right_shoulder_1_0189",
				"arm_right_shoulder_2_0190",
				"arm_right_shoulder_2_ctr_0191",
				"arm_right_elbow_0192",
				"arm_right_wrist_ctr_0193",
				"arm_right_wrist_0174",
			];

			armBoneNames.forEach((boneName) => {
				const bone = gltf.scene.getObjectByName(boneName);
				if (bone) {
					armBones.current.push(bone);
				}
			});

			mixer.current = new THREE.AnimationMixer(gltf.scene);

			const action = mixer.current.clipAction(
				new THREE.AnimationClip("arm_wave", -1, [
					new THREE.KeyframeTrack(
						`${armBones.current[0].name}.rotation[y]`,
						[0, 1, 2],
						[0, Math.PI / 4, 0]
					),
				])
			);
			action.loop = THREE.LoopRepeat;
			action.play();
		}
	}, [gltf]);

	useFrame((state, delta) => {
		state; // ахаххаххаххаххахххахахахх
		if (mixer.current) mixer.current.update(delta);
	});

	return <primitive object={gltf.scene} />;
};

const ThreeScene = () => {
	return (
		<Canvas
			style={{ width: "100%", height: "100%" }}
			camera={{
				position: [0, 5, 5],
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
				maxDistance={1000}
			/>
		</Canvas>
	);
};

export default ThreeScene;
