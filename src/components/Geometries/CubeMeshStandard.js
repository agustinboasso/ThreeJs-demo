import * as THREE from "three";


// Cube declaration

//Texturas
const textureLoader = new THREE.TextureLoader()
const map = textureLoader.load('./textures/ground_0032_1k_z2MZzG/ground_0032_color_1k.jpg') //base color
const aoMap = textureLoader.load('./textures/ground_0032_1k_z2MZzG/ground_0032_ao_1k.jpg')
const roughnessMap = textureLoader.load('./textures/ground_0032_1k_z2MZzG/ground_0032_roughness_1k.jpg')
const normalMap = textureLoader.load('./textures/ground_0032_1k_z2MZzG/ground_0032_normal_opengl_1k.png')
const heightMap = textureLoader.load('./textures/ground_0032_1k_z2MZzG/ground_0032_height_1k.png')


export const cubeGeometry = new THREE.BoxGeometry(1, 1, 1,
    250,250,250
    ); //geometria. Alto, ancho y profundidad
export const cubeMaterial = new THREE.MeshStandardMaterial({ 
    //color: 0x00ff00, 
    wireframe: true,
    map: map,
    aoMap: aoMap, //ambiental oclusion
    roughnessMap: roughnessMap,
    normalMap: normalMap,
    displacementMap: heightMap,
    displacementScale:0.04, //resuelve el mapa de desplazamiento
    



}); //Material (piel, color, textura, etc)
export const cubeMeshStandardMaterial = () => new THREE.Mesh(cubeGeometry, cubeMaterial);
