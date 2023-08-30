import * as THREE from "three";

//Sphere declaration
//tecture loader, permite cargar texturas
const textureLoader = new THREE.TextureLoader()
const matcap = textureLoader.load('./textures/matcap1.png')

export const sphereGeometry = new THREE.SphereGeometry(0.8, 32, 16);
export const sphereMaterial = new THREE.MeshMatcapMaterial({ 
//color: 0xffff00, 
wireframe: true,
matcap: matcap, });
export const createSphereHDRI = () => new THREE.Mesh(sphereGeometry, sphereMaterial);
