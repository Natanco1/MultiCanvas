import * as THREE from 'https://cdn.skypack.dev/three';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js';

const panel3 = document.getElementById('panel3')

const fullHeight = 750
const fullWidth = 750

const cameraX = 0
const cameraY = 0
const cameraZ = 5

const fov = 30


//renderer


const renderer3 = new THREE.WebGLRenderer({ canvas: panel3});
renderer3.setSize(panel3.clientWidth,panel3.clientHeight);


//scene


const scene = new THREE.Scene();
scene.background = new THREE.Color('#282828');


//light


const light = new THREE.AmbientLight( 0x404040, 4 ); // soft white light
scene.add( light );


//camera


const camera3 = new THREE.PerspectiveCamera(
    fov,
    panel3.clientHeight/panel3.clientWidth,
    0.1,
    1000
);

camera3.setViewOffset(fullWidth,fullHeight,250,0,panel3.clientWidth,panel3.clientHeight);
camera3.position.set( cameraX, cameraY, cameraZ );


//controls


const control3 = new OrbitControls( camera3, renderer3.domElement);
control3.enableDamping = true;
control3.enablePan = false;


//functions


//geometries
/* palette: #0C0032 #190061 #240090 #3500D3 #282828 */
const texturer = new THREE.TextureLoader();
const sNormalColor = texturer.load("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPX6DfAsj9ln5yS3gpgzyw6RdvreTTM4QVqetQ1EP7R0oSu-XzcZq7QFPZvieZy1br5l0&usqp=CAU")

const sGeomnetry = new THREE.BoxGeometry(1,1,1)
const sMaterial = new THREE.MeshStandardMaterial({
    map: sNormalColor,
})
const sphere = new THREE.Mesh(sGeomnetry,sMaterial)
scene.add(sphere)


//animate loop


function animate() {

    control3.update();
    renderer3.render(scene, camera3)
    requestAnimationFrame(animate);
}

renderer3.setAnimationLoop(animate); 