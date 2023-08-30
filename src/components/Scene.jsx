import { useEffect, useRef } from "react";
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import { createSphereMesh } from "./Geometries/Sphere"
import {createCubeMesh} from "./Geometries/Cube"
import {torusKnotMesh} from "./Geometries/TorusKnot"
import { torusKnotNormalMaterialMesh } from "./Geometries/TorusKnotNormalMaterial";
import {cubeMeshStandardMaterial} from './Geometries/CubeMeshStandard'

const Scene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      25, //fov
      currentMount.clientWidth / currentMount.clientHeight, //aspect camera
      0.1, //near
      1000 // far
    );
    camera.position.z = 18;
    scene.add(camera);

    // Renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    //Controls

    const controls = new OrbitControls(camera,renderer.domElement) //control mouse

    //controls.target = new THREE.Vector3(1, 0, -10)//punto ancla, de referencia la esfera.
   
    controls.enableDamping = true; //Genera sensacion de movimiento luego de dejar de presionar el boton del raton


    // Agregar cubo a escena
    
    const cube = createCubeMesh();
    cube.position.set(-1, 0, 0); 
    scene.add(cube);

    //Cubo standard material

    // const cubeStandardMaterial = cubeMeshStandardMaterial()
    // cubeStandardMaterial.position.set (2,2,0)
    // scene.add(cubeStandardMaterial)

    //Agregar esfera a escena
  
    const sphere = createSphereMesh();
    sphere.position.set(1.5, 0, 0);
    scene.add( sphere );

    //Agregar torusKnot

    const torusKnot = torusKnotMesh();
    torusKnot.position.set(4,-1,0)
    //torusKnot.scale.set(2,2,0)  
    // torusKnot.scale.x += 2
    // torusKnot.scale.y += 2
    scene.add(torusKnot)
    
    //TorusKnot Normal material
  
    const torusKnotNormal = torusKnotNormalMaterialMesh()
    torusKnotNormal.position.set(0,-3,0)
    scene.add(torusKnotNormal)

   //luz ambiental, es una luz que llega por TODOS los lados. La geometria permanece totalmente iluminada.

    const AO = new THREE.AmbientLight(0xffffff,1)
    scene.add(AO)

    // Render loop function
    const animate = () => {
      controls.update();
      requestAnimationFrame(animate);
      //Rotacion Torus

      torusKnot.rotation.x += 0.01;
      torusKnot.rotation.y += 0.01;
      
      //Rotacion de esfera
      sphere.rotation.x += 0.01;
      sphere.rotation.y += 0.01;
      
      //Rotacion de cubo
      cube.rotation.x += 0.00;
      cube.rotation.y += 0.01;

      
      renderer.render(scene, camera);
    };
    // Start render loop
    animate();

    // Cleanup function
    return () => {
        // Remove renderer element from the DOM
        currentMount.removeChild(renderer.domElement);
      };
  }, []);

  return (
    <div
      className="Contenedor3D"
      ref={mountRef}
      style={{ width: "100%", height: "100vh" }}
    ></div>
  );
};

export default Scene;