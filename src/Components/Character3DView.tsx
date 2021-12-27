import React, { Suspense, useRef } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Canvas } from "@react-three/fiber";

import { OrbitControls, Stage, useGLTF } from "@react-three/drei";

function Stand() {
  const group = useRef();
  const { nodes, materials } = useGLTF("/assets/models/Stand.glb") as any;

  console.log(materials);

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

function SimpleModel() {
  const group = useRef();
  const { nodes, materials } = useGLTF("/assets/models/SimpleModel.glb") as any;

  console.log(materials);

  return (
    <React.Fragment>
      <group ref={group} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Suzanne.geometry}
          material={materials.Suzanne}
          position={[0, 0, 0]}
        />
      </group>
    </React.Fragment>
  );
}

export default function Character3DView() {
  const [value, setValue] = React.useState("normal");
  const ref = useRef() as any;

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <Tabs value={value} onChange={handleChange}>
        <Tab value="normal" label="Normal" />
        <Tab value="chibi" label="Chibi" />
      </Tabs>

      <Canvas shadows dpr={[1, 2]} camera={{ fov: 50 }}>
        <Suspense fallback={null}>
          <Stage
           
            controls={ref}
            preset="rembrandt"
            intensity={0.5}
            environment="city"
          >
            <Stand />
            <SimpleModel />
          </Stage>
        </Suspense>
        <OrbitControls ref={ref} autoRotate />
      </Canvas>
    </React.Fragment>
  );
}
