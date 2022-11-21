
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";
let socket = io()



const cameraX = 0;
const cameraY = 0;
const cameraZ = 5;
let x;
let y;
let w;
let h;
let group = [];
const fov = 30;
const fullWidth = window.innerWidth;
const fullHeight = window.innerHeight;
const container = document.createElement('div')
container.setAttribute('class','container')
const panel = document.createElement('canvas')
panel.setAttribute('id','panel1')
document.body.appendChild(container)
container.appendChild(panel)
//page creation
socket.on('clientConnection',(message)=>{
    window.history.replaceState('', '', 'http://localhost:4000'+`?${socket.id}`);
    x = message.totX
    y = message.totY
    w = message.totW
    h = message.totH
    group = message.totGroup
    console.log(group)
    group.forEach((groupElement)=>{
        let objectInGroupLeft = groupElement.left + x + w/2
        let objectInGroupTop = groupElement.top + y + h/2
        console.log(objectInGroupLeft)
        console.log(objectInGroupTop)
        console.log(groupElement.width)
        console.log(groupElement.height)


    })
    panel.style.width = `${w}px`   
    panel.style.height = `${h}px` 
    panel.style.left = `${x}px` 
    panel.style.top = `${y}px` 
})

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
camera1.position.set(cameraX,cameraY,cameraZ);


//controls


const control1 = new OrbitControls( camera1, renderer1.domElement);
control1.enableDamping = true;
control1.enablePan = false;
control1.addEventListener('change', () => {
    socket.emit('serverUpdate', {
        position: camera1.position,
        rotation: camera1.rotation,
    })
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
}

renderer1.setAnimationLoop(animate); 