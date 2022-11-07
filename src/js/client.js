import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";

let socket = io()


const panel1 = document.getElementById('panel1');
const cameraX = 0;
const cameraY = 0;
const cameraZ = 5;
let screenNumber = 2;

const fov = 30;
const page = document.title;
const fullWidth = window.innerWidth;
const fullHeight = window.innerHeight;
const subWidth = fullWidth/screenNumber;
const subHeight = fullHeight/screenNumber;


//multipage creation
/* socket.on('clientConnection',()=>{
    window.history.replaceState('', '', 'http://localhost:4000'+`?${socket.id}`);
    screenNumber+=1;
}) */


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
    panel1.clientWidth/panel1.clientHeight,
    0.1,
    1000
);
camera1.position.set(cameraX,cameraY,cameraZ)
if (page == 1) {
    camera1.setViewOffset(fullWidth,fullHeight,subWidth*0,subHeight/screenNumber,subWidth,subHeight)
} else if (page == 2) {
    camera1.setViewOffset(fullWidth,fullHeight,subWidth*1,subHeight/screenNumber,subWidth,subHeight)
} else if (page == 3) {
    camera1.setViewOffset(fullWidth,fullHeight,subWidth*2,subHeight/screenNumber,subWidth,subHeight)
}


//controls


const control1 = new OrbitControls( camera1, renderer1.domElement);
control1.enableDamping = true;
control1.enablePan = false;
control1.addEventListener('change', () => {
    setTimeout(()=> {
        socket.emit('serverUpdate', {
            position: camera1.position,
            rotation: camera1.rotation,
        })
    },50)
})

socket.on('clientUpdate', (message) => {
    camera1.position.copy(message.newPosition)
    camera1.rotation.copy(message.newRotation)
})


//objects
const gltf = new GLTFLoader();
gltf.load('../assets/scene.gltf', (gltfScene) => {
    
    scene.add(gltfScene.scene);
});

//geometries
/* palette: #0C0032 #190061 #240090 #3500D3 #282828 */
/* const texturer = new THREE.TextureLoader();
const sNormalColor = texturer.load("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPX6DfAsj9ln5yS3gpgzyw6RdvreTTM4QVqetQ1EP7R0oSu-XzcZq7QFPZvieZy1br5l0&usqp=CAU");

const sGeomnetry = new THREE.BoxGeometry(1,1,1)
const sMaterial = new THREE.MeshStandardMaterial({
    map: sNormalColor,
})
const sphere = new THREE.Mesh(sGeomnetry,sMaterial);
scene.add(sphere);
 */


//animate loop


function animate() {

    control1.update();
    renderer1.render(scene, camera1);
    requestAnimationFrame(animate);
}

renderer1.setAnimationLoop(animate); 