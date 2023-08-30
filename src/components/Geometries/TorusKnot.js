import * as THREE from "three";

export const geometry = new THREE.TorusKnotGeometry( 0.5, 0.18, 50, 8 ); 
export const material = new THREE.MeshBasicMaterial( { 
color: 0xffff00, wireframe: false, 
fog:true, 
transparent: true, 
opacity:0.3, } ); 
export const torusKnotMesh = () =>new THREE.Mesh( geometry, material ); 