import { useEffect, useRef } from "react";
import * as THREE from "three";

const Scene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      25,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 8;
    scene.add(camera);

    // Renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    // Cube
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff0, wireframe:false});
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    scene.add(cube);

    //sphere
    const sphereGeometry = new THREE.SphereGeometry( 0.8, 32, 16 ); 
    const sphereMaterial = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); 
    const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial ); 
    scene.add( sphere );
   

    // Render loop function
    const render = () => {
      requestAnimationFrame(render);
      cube.rotation.x += 0.00;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    // Start render loop
    render();

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