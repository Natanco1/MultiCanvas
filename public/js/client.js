
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";
let socket = io()



const cameraX = 0;
const cameraY = 0;
const cameraZ = 50;
let group = [];
let canvases = [];
const fov = 30;
const fullWidth = window.innerWidth;
const fullHeight = window.innerHeight;

//page creation
socket.on('clientConnection',(message)=>{
    window.history.replaceState('', '', 'http://localhost:4000'+`?${socket.id}`);
    let choice = message.uChoice
    let x = message.totX
    let y = message.totY
    let w = message.totW
    let h = message.totH
    group = message.totGroup
    let i = 0
    
    //scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#282828');
    
    //bounding box
    const bb = new THREE.Box3()

    //objects
    
    const gltf = new GLTFLoader();
    if(choice == 1){
        gltf.load('../assets/brain/scene.gltf', (gltfScene) => {
            scene.add(gltfScene.scene);
            console.log(gltfScene.scene.position)
            bb.setFromObject(gltfScene.scene)
        });
    } else if (choice == 2){
        gltf.load('../assets/skeleton/scene.gltf', (gltfScene) => {
            scene.add(gltfScene.scene);
            bb.setFromObject(gltfScene.scene)
        });
    } else if (choice == 3){
        gltf.load('../assets/face/scene.gltf', (gltfScene) => {
            scene.add(gltfScene.scene);
            bb.setFromObject(gltfScene.scene)
        });
    }
    
     



    //light
    const light = new THREE.AmbientLight( 0x404040, 6 );
    scene.add( light );
    

    group.forEach((groupElement)=>{
        let objectInGroupLeft = groupElement.left + x + w/2
        let objectInGroupTop = groupElement.top + y + h/2
        const container = document.createElement('div')
        container.setAttribute('class','container')
        const panel = document.createElement('canvas')
        panel.setAttribute('class','panel')
        panel.setAttribute('id',`panel${i}`)
        document.body.appendChild(container)
        panel.style.width = `${groupElement.width*groupElement.scaleX}px`   
        panel.style.height = `${groupElement.height*groupElement.scaleY}px` 
        panel.style.left = `${objectInGroupLeft}px` 
        panel.style.top = `${objectInGroupTop}px` 
        //panel.style.transform = `rotate(${groupElement.angle}deg)`
        container.appendChild(panel)
        canvases.push(panel)
        i++
    })



    canvases.forEach((canvasElement)=>{
        const sX = canvasElement.getBoundingClientRect().left - x
        const sY = canvasElement.getBoundingClientRect().top - y
        //renderer
        const renderer1 = new THREE.WebGLRenderer({ canvas: canvasElement});
        renderer1.setSize(canvasElement.clientWidth,canvasElement.clientHeight);

        //camera

        const camera1 = new THREE.PerspectiveCamera(
            fov,
            canvasElement.clientWidth/canvasElement.clientHeight,
            0.1,
            10000
        );
        camera1.position.set(cameraX,cameraY,cameraZ);
        camera1.lookAt(scene.position)
        camera1.setViewOffset(w,h,sX,sY,canvasElement.clientWidth,canvasElement.clientHeight)

        //controls

        const control1 = new OrbitControls( camera1, renderer1.domElement);
        control1.enableDamping = true;
        control1.enablePan = true;
        control1.addEventListener('change', () => {
            socket.emit('serverUpdate', {
                panning: control1.target,
                position: camera1.position,
                rotation: camera1.rotation,
            })
        })
        bb.getCenter(control1.target)

        socket.on('clientUpdate', (message) => {
            control1.target.copy(message.newPan)
            camera1.position.copy(message.newPosition)
            camera1.rotation.copy(message.newRotation)
        })

        //animate loop

        function animate() {
            control1.update();
            renderer1.render(scene, camera1);
        }

        renderer1.setAnimationLoop(animate);  
    })
})