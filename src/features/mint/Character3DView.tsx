import React, { Suspense, useRef } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Canvas } from "@react-three/fiber";

import { OrbitControls, Stage, useGLTF } from "@react-three/drei";
import { GLTFResult } from "./models/GLTFModel";
import { Group, Material, Mesh, Object3D, Side } from "three";
import PropTypes from "prop-types";

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

interface RecursiveModelProps {
  obj: Object3D;
}

function RecursiveModel({ obj }: RecursiveModelProps): JSX.Element {
  const ref = useRef();

  if (obj.type === "Group") {
    const group = obj as Group;
    const children = group.children.map((x) => {
      return <RecursiveModel obj={x} />;
    });
    return (
      <group key={obj.uuid} ref={ref}>
        {children}
      </group>
    );
  } else if (obj.type === "Mesh") {
    const mesh = obj as Mesh;
    const mat = mesh.material as Material;
    mat.side = 2;
    console.log(mesh.material);
    return (
      <mesh
        key={obj.uuid}
        ref={ref}
        castShadow
        receiveShadow
        geometry={mesh.geometry}
        material={mat}
        position={[0, 0, 0]}
      ></mesh>
    );
  } else {
    console.log("Unknow Type ");
    return <React.Fragment></React.Fragment>;
  }
}

function SimpleModel() {
  const group = useRef();
  const { scene } = useGLTF("/assets/models/Jean.glb") as GLTFResult;

  console.log(scene);

  return (
    <React.Fragment>
      <RecursiveModel obj={scene} />
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
