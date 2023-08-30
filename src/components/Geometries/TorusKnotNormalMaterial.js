import * as THREE from "three";

export const geometry = new THREE.TorusKnotGeometry( 0.5, 0.18, 50, 8 ); 
export const material = new THREE.MeshNormalMaterial( { 
flatShading:true, //muestra los poligonos que componen la geometria
wireframe: false, 
fog:true, 
transparent: true, 
 } ); 
export const torusKnotNormalMaterialMesh = () =>new THREE.Mesh( geometry, material ); 