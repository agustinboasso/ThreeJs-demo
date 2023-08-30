import * as THREE from "three";


// Cube declaration
export const cubeGeometry = new THREE.BoxGeometry(1, 1, 1); //geometria. Alto, ancho y profundidad
export const cubeMaterial = new THREE.MeshNormalMaterial({ color: 0x00ff00, wireframe: false }); //Material (piel, color, textura, etc)
export const createCubeMesh = () => new THREE.Mesh(cubeGeometry, cubeMaterial);
