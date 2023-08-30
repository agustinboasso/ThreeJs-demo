import { useEffect, useRef } from "react";
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
// import{createSphereHDRI} from "./Geometries/SphereHDRI"
// import {cubeMeshStandardMaterial} from './Geometries/CubeMeshStandard'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'

const SceneAmong = () => {
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

    controls.target = new THREE.Vector3(2, 2, 0)//punto ancla, de referencia la esfera.
   
    controls.enableDamping = true; //Genera sensacion de movimiento luego de dejar de presionar el boton del raton

    //CARGAR MODELOS 3D IMPORTADOS

    const gltfLoader = new GLTFLoader()
    gltfLoader.load(
        './ImportModels/potted_plant_01_4k.gltf',
        (gltf)=>{
            gltf.scene.scale.set(0.1, 0.1, 0.1); // Ajusta la escala según tus necesidades
            gltf.scene.position.set(0, 0, 0); // Ajusta la posición según tus necesidades

            scene.add(gltf.scene)
         }, //load
         (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
        },
        (error) => {
            console.error('An error happened', error);
        }
    )
    

    // //Cubo standard material

    // const cubeStandardMaterial = cubeMeshStandardMaterial()
    // cubeStandardMaterial.position.set (2,2,0)
    // scene.add(cubeStandardMaterial)

   

   //luz ambiental, es una luz que llega por TODOS los lados. La geometria permanece totalmente iluminada.

    const AO = new THREE.AmbientLight(
        0xffffff,//se puede cambiar el color de la luz
        1// esto es la intensidad de la luz.
        )
    scene.add(AO)


    //point light. Bombilla y lo que ilumine su as de luz.

     const pointLight = new THREE.PointLight(
        0xfffff,
        1.3
     )  
     
     pointLight.position.y = 1
     //scene.add(pointLight)


    // Directional light, siempre la luz toma solo una direccion. Tiene un target
    const directionalLight = new THREE.DirectionalLight(
        0xffffff,
        1.3, //intesidad
    )
    directionalLight.position.set(5,5,5)
    //scene.add(directionalLight)    

     //Enviroment map, luz natural con reflejo del entorno
     
    const enviromentMap = new THREE.CubeTextureLoader()
    const envMap = enviromentMap.load([
        './textures/HDRI/px.png',
        './textures/HDRI/nx.png',
        './textures/HDRI/py.png',
        './textures/HDRI/ny.png',
        './textures/HDRI/pz.png',
        './textures/HDRI/nz.png'
    ])
    scene.environment = envMap
    scene.background = envMap



    // Render loop function
    const animate = () => {
      controls.update();
      requestAnimationFrame(animate);
      

      
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

export default SceneAmong;