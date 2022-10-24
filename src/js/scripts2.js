import * as THREE from 'https://cdn.skypack.dev/three';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js';

const panel2 = document.getElementById('panel2')

const fullHeight = 750
const fullWidth = 750

const cameraX = 0
const cameraY = 0
const cameraZ = 5

const fov = 30


//renderer


const renderer2 = new THREE.WebGLRenderer({ canvas: panel2});
renderer2.setSize(panel2.clientWidth,panel2.clientHeight);


//scene


const scene = new THREE.Scene();
scene.background = new THREE.Color('#282828');


//light


const light = new THREE.AmbientLight( 0x404040, 4 ); // soft white light
scene.add( light );


//camera


const camera2 = new THREE.PerspectiveCamera(
    fov,
    panel2.clientWidth/panel2.clientHeight,
    0.1,
    1000
);

camera2.setViewOffset(fullWidth,fullHeight,250,250,panel2.clientWidth,panel2.clientHeight);
camera2.position.set( cameraX, cameraY, cameraZ );


//controls


const control2 = new OrbitControls( camera2, renderer2.domElement);
control2.enableDamping = true;
control2.enablePan = false;


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

    control2.update();
    renderer2.render(scene, camera2)
    requestAnimationFrame(animate);
}

renderer2.setAnimationLoop(animate); 