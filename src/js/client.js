import * as THREE from 'https://cdn.skypack.dev/three';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js';

let socket = io()


const panel1 = document.getElementById('panel1');

const fullHeight = 750;
const fullWidth = 750;

const cameraX = 0;
const cameraY = 0;
const cameraZ = 5;

const fov = 30;


//renderer


const renderer1 = new THREE.WebGLRenderer({ canvas: panel1});
renderer1.setSize(panel1.clientHeight,panel1.clientWidth);

//scene


const scene = new THREE.Scene();
scene.background = new THREE.Color('#282828');


//light


const light = new THREE.AmbientLight( 0x404040, 4 ); // soft white light
scene.add( light );


//camera


const camera1 = new THREE.PerspectiveCamera(
    fov,
    panel1.clientHeight/panel1.clientWidth,
    0.1,
    1000
);
camera1.position.set(cameraX,cameraY,cameraZ)


//controls


const control1 = new OrbitControls( camera1, renderer1.domElement);
control1.enableDamping = true;
control1.enablePan = false;
control1.addEventListener('change', () => {
    setInterval(socket.emit('serverUpdate', {
        pos1: camera1.position,
        rot1: camera1.rotation,
    }),5000)
})

socket.on('clientUpdate', (message) => {
    camera1.position.copy(message.generalPosition)
    camera1.rotation.copy(message.generalRotation)
})

//functions


//geometries
/* palette: #0C0032 #190061 #240090 #3500D3 #282828 */
const texturer = new THREE.TextureLoader();
const sNormalColor = texturer.load("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPX6DfAsj9ln5yS3gpgzyw6RdvreTTM4QVqetQ1EP7R0oSu-XzcZq7QFPZvieZy1br5l0&usqp=CAU");

const sGeomnetry = new THREE.BoxGeometry(1,1,1)
const sMaterial = new THREE.MeshStandardMaterial({
    map: sNormalColor,
})
const sphere = new THREE.Mesh(sGeomnetry,sMaterial);
scene.add(sphere);




//animate loop


function animate() {

    control1.update();
    renderer1.render(scene, camera1);
    requestAnimationFrame(animate);
}

renderer1.setAnimationLoop(animate); 