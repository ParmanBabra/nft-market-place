import React, { Suspense, useEffect, useRef } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Canvas } from "@react-three/fiber";

import {
  OrbitControls,
  Stage,
  useAnimations,
  useGLTF,
} from "@react-three/drei";
import { getChibi, getNormal } from "./MintSlice";
import { GLTFResult } from "./models/GLTFModel";
import { useAppSelector } from "../../app/hooks";

function Stand() {
  const group = useRef();
  const { nodes, materials } = useGLTF("/assets/models/Stand.glb") as any;

  return (
    <React.Fragment>
      <group ref={group} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Stand.geometry}
          material={materials.Material}
          position={[0, 0, 0]}
        />
      </group>
    </React.Fragment>
  );
}

type SimpleModelProps = {
  url: string;
};

function SimpleModel({ url }: SimpleModelProps) {
  const group = useRef();
  const { scene, animations } = useGLTF(url) as GLTFResult;
  const { mixer, clips } = useAnimations(animations, group);

  const idle = mixer.clipAction(clips[0], scene);

  useEffect(() => {
    idle.play();
  });

  return (
    <React.Fragment>
      <primitive key={scene.uuid} object={scene} />
    </React.Fragment>
  );
}

export default function Character3DView() {
  const [viewType, setViewType] = React.useState("normal");
  const ref = useRef() as any;

  const normal = useAppSelector(getNormal);
  const chibi = useAppSelector(getChibi);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setViewType(newValue);
  };

  return (
    <React.Fragment>
      <Tabs value={viewType} onChange={handleChange}>
        <Tab value="normal" label="Normal" />
        <Tab value="chibi" label="Chibi" />
      </Tabs>

      <Canvas shadows dpr={[1, 2]} camera={{ fov: 70 }}>
        <Suspense fallback={null}>
          <Stage
            controls={ref}
            preset="rembrandt"
            intensity={0.5}
            environment="city"
          >
            <Stand />
            {viewType === "normal"
              ? normal && <SimpleModel url={normal} />
              : chibi && <SimpleModel url={chibi} />}
          </Stage>
        </Suspense>
        <OrbitControls ref={ref} regress />
      </Canvas>
    </React.Fragment>
  );
}
