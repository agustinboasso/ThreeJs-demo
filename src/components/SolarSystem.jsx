import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const SolarSystemScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);

    // Sun
    const sunGeometry = new THREE.SphereGeometry(0.2, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);

    // Planets
    const planets = [];
    const planetDistances = [0.5, 0.8, 1.2, 1.6, 2.0]; // Distances from the sun
    const planetSpeeds = [0.005, 0.004, 0.003, 0.002, 0.001]; // Orbital speeds

    for (let i = 0; i < 5; i++) {
      const planetGeometry = new THREE.SphereGeometry(0.05, 32, 32);
      const planetMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
      const planet = new THREE.Mesh(planetGeometry, planetMaterial);
      planets.push(planet);
      scene.add(planet);
    }

    // Directional Light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Animation loop
    const animate = (time) => {
      controls.update();
      const elapsedTime = time * 0.001;

      planets.forEach((planet, index) => {
        const angle = elapsedTime * planetSpeeds[index];
        const x = planetDistances[index] * Math.cos(angle);
        const z = planetDistances[index] * Math.sin(angle);
        planet.position.set(x, 0, z);
      });

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Cleanup function
    return () => {
      currentMount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      className="SolarSystemScene"
      ref={mountRef}
      style={{ width: "100%", height: "100vh" }}
    ></div>
  );
};

export default SolarSystemScene;
