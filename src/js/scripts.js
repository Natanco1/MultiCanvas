import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const panel1 = document.getElementById('panel1')
const panel2 = document.getElementById('panel2')
const panel3 = document.getElementById('panel3')


//renderer

/* renderer 1 */

const renderer1 = new THREE.WebGLRenderer({ canvas: panel1});
renderer1.setSize(panel1.clientHeight,panel1.clientWidth);


/* renderer 2 */

const renderer2 = new THREE.WebGLRenderer({ canvas: panel2});
renderer2.setSize(panel2.clientWidth,panel2.clientHeight);


/* renderer 3 */

const renderer3 = new THREE.WebGLRenderer({ canvas: panel3});
renderer3.setSize(panel3.clientWidth,panel3.clientHeight);


//scene


const scene = new THREE.Scene();
scene.background = new THREE.Color('#282828');


//light


const light = new THREE.AmbientLight( 0x404040, 3 ); // soft white light
scene.add( light );


//camera

/* camera 1 */
const camera1 = new THREE.PerspectiveCamera(
    30,
    panel1.clientHeight/panel1.clientWidth,
    0.1,
    1000
);

camera1.setViewOffset(750,750,0,0,panel1.clientHeight,panel1.clientWidth);
camera1.position.set( -0.02, 0, 10  );



/* camera 2 */

const camera2 = new THREE.PerspectiveCamera(
    30,
    panel2.clientWidth/panel2.clientHeight,
    0.1,
    1000
);
camera2.setViewOffset(750,750,250,250,panel2.clientWidth,panel2.clientHeight);
camera2.position.set( -0.02, 0, 10 );


/* camera 3 */

const camera3 = new THREE.PerspectiveCamera(
    30,
    panel3.clientHeight/panel3.clientWidth,
    0.1,
    1000
);
camera3.setViewOffset(750,750,250,0,panel3.clientWidth,panel3.clientHeight);
camera3.position.set( -0.02, 0, 10 );


//controls

/* control 1 */
const control1 = new OrbitControls( camera1, renderer1.domElement);

control1.addEventListener('change', () => {
    console.log(camera1.rotation)
    
    camera2.position.copy(camera1.position);
    camera3.position.copy(camera1.position);
    camera2.rotation.copy(camera1.rotation);
    camera3.rotation.copy(camera1.rotation);
})

/* control 2 */
const control2 = new OrbitControls( camera2, renderer2.domElement);
control2.enableDamping = true;

control2.addEventListener('change', () => {
    console.log(camera1.rotation)
    
    camera1.position.copy(camera2.position);
    camera3.position.copy(camera2.position);
    camera1.rotation.copy(camera2.rotation);
    camera3.rotation.copy(camera2.rotation);
})

/* control 3 */

const control3 = new OrbitControls( camera3, renderer3.domElement);
control3.enableDamping = true;

control3.addEventListener('change', () => {
    console.log(camera1.rotation)
    
    camera2.position.copy(camera3.position);
    camera1.position.copy(camera3.position);
    camera2.rotation.copy(camera3.rotation);
    camera1.rotation.copy(camera3.rotation);
})

//functions


//geometries
/* palette: #0C0032 #190061 #240090 #3500D3 #282828 */

const texturer = new THREE.TextureLoader();
const sNormalColor = texturer.load("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPX6DfAsj9ln5yS3gpgzyw6RdvreTTM4QVqetQ1EP7R0oSu-XzcZq7QFPZvieZy1br5l0&usqp=CAU")

const sGeomnetry = new THREE.BoxGeometry(3,3,3)
const sMaterial = new THREE.MeshStandardMaterial({
    map: sNormalColor,
})
const sphere = new THREE.Mesh(sGeomnetry,sMaterial)
scene.add(sphere)


//animate loop


function animate() {

    control1.update();
    control2.update();
    control3.update();
    renderer1.render(scene, camera1);
    renderer2.render(scene, camera2)
    renderer3.render(scene, camera3)
    requestAnimationFrame(animate);
}

renderer1.setAnimationLoop(animate);