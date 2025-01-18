import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import testModel from "public/test.glb"

const Model = () => {
	const gltf = useGLTF("/public/test.glb"); // Укажи путь к модели
	return <primitive object={gltf.scene} />;
};

const ThreeScene = () => {
	return (
		<Canvas
			style={{ width: "100%", height: "100%" }}
			camera={{ position: [0, 1, 3] }}
		>
			{/* Освещение */}
			<ambientLight intensity={0.5} />
			<directionalLight position={[5, 5, 5]} intensity={1} />

			{/* Модель */}
			<Model />

			{/* Управление камерой */}
			<OrbitControls enableDamping={true} />
		</Canvas>
	);
};

export default ThreeScene;
