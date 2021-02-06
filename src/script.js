import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import typefaceFont from 'three/examples/fonts/helvetiker_regular.typeface.json';
import * as dat from 'dat.gui';

//Debug UI
// const gui = new dat.GUI();


/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();


// Scene
const scene = new THREE.Scene();
const helper = new THREE.AxesHelper(50);
// scene.add(helper);

 // Canvas
 const canvas = document.querySelector('.js-canvas');

 // Container
 const jsCanvas = document.querySelector('.js-experience');


window.addEventListener('load', () => {
    
    //Sizes
    let sizes = {};
    sizes.width =  window.innerWidth;
    sizes.height = window.innerHeight;

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;                                                                                                                                                                                                                                                                                                                                                                          

    // Update camera
    camera.aspect = sizes.width / sizes.height 
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Objects
 */

 //Floor
// const floor = new THREE.Mesh(
//     new THREE.BoxGeometry(2, 0.1, 2),
//     new THREE.MeshBasicMaterial({color: 'white'})
// )
// floor.position.y = - 0.75;
// floor.receiveShadow = true;
// scene.add(floor)

/**
 * 3D Text
 */

const matcapTexture = textureLoader.load('/textures/matcaps/3.png');
const material = new THREE.MeshMatcapMaterial({matcap: matcapTexture});
const textGroup = new THREE.Group();

const fontLoader = new THREE.FontLoader();
let textPosition = null;
fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) => {
        const textGeometry = new THREE.TextBufferGeometry(
             "Fabio Chacon",
            {
                font: font,
                size: 0.5,
                height: 0.1,
                curveSegments:100,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4
            }
       )


       textGeometry.center();
       const text = new THREE.Mesh(textGeometry, material);
       textGroup.add(text);
    //    scene.add(text)
    }
);

fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) => {
        const textGeometry = new THREE.TextBufferGeometry(
             "I SOLVE PROBLEMS",
            {
                font: font,
                size: 0.4,
                height: 0.2,
                curveSegments:100,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4
            }
       )


       textGeometry.center();
       const text = new THREE.Mesh(textGeometry, material);
       text.position.y = - 0.9;
       textGroup.add(text);
    //    scene.add(text)
    }
);

textGroup.position.y = 0.3
scene.add(textGroup);
/**
 * Particles
 */

 //Textures
 const particleTextures = [];
for (let i = 0; i < 13; i++){
    particleTextures[i] = textureLoader.load(`/textures/particles/${i + 1}.png`)
}

// Geometry and Material
const particlesGeometry = new THREE.BufferGeometry();
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.1,
    sizeAttenuation: true,
    transparent: true,
    alphaMap: particleTextures[3],
    color: "#eceba5"

 });

particlesMaterial.depthWrite = false;
particlesMaterial.blending = THREE.AdditiveBlending;
particlesMaterial.vertexColors = false;

const count = 6000;

const positionsParticles = new Float32Array(count * 3);
const positionsRings = new Float32Array(count * 3);
const colors = new Float32Array(count * 3);

const radius = 10;
const a = 0.005;
for (let i = 0; i < count; i++){
    let i3 = i * 3
    const phi = Math.random() * Math.PI * 2
    const theta = Math.random() * Math.PI;
    positionsParticles[i3 + 0] = radius * Math.sin(theta) * Math.cos(phi);
    positionsParticles[i3 + 1] = radius * Math.cos(theta);
    positionsParticles[i3 + 2] = radius * Math.sin(theta) * Math.sin(phi);

    //Helix

    // positionsParticles[i3 + 0] = radius * Math.cos(i)
    // positionsParticles[i3 + 1] =  0.005 * i;
    // positionsParticles[i3 + 2] = radius * Math.sin(i)

    // Spherical spiral
    // positionsParticles[i3 + 0] = (radius * Math.cos(i)) / (Math.sqrt(Math.pow(a, 2)*Math.pow(i, 2) + 1));
    // positionsParticles[i3 + 1] = - (radius * a * i) / (Math.sqrt(Math.pow(a, 2)*Math.pow(i, 2) + 1));
    // positionsParticles[i3 + 2] = (radius * Math.sin(i)) / (Math.sqrt(Math.pow(a, 2)*Math.pow(i, 2) + 1));

    //Mebius surface
    // positionsParticles[i3 + 0] = radius * Math.sin(theta) * Math.cos(phi);
    // positionsParticles[i3 + 1] = radius * Math.cos(theta);
    // positionsParticles[i3 + 2] = radius * Math.sin(theta) * Math.sin(phi);

}

particlesGeometry.setAttribute(
    'position',
     new THREE.BufferAttribute(positionsParticles, 3)
);



//Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles);

/**
 * Models
 */
// const gltfLoader = new GLTFLoader();
// let gltfModel = null;
// gltfLoader.load( 
//     '/models/planet/scene.gltf',
//     (gltf) => 
//     {
//        //  while(gltf.scene.children.length){
//        //      scene.add(gltf.scene.children[0])
//        //  }
//        // const children = [...gltf.scene.children];
//        // for (const child of children){
//        //     scene.add(child)
//        // }

//     //    gltf.scene.children[0].material.map = colorTexture;
//        gltf.scene.scale.set(1, 1, 1);
//        gltf.scene.position.set(- .1, - 0.3, 0);
//        gltf.scene.rotation.set(0, 0.4, 0.02);
//        gltfModel = gltf.scene;
//     //    gui.add(gltf.scene.position, 'x').min(-50).max(50).step(0.01)
//     //    gui.add(gltf.scene.position, 'y').min(-50).max(50).step(0.01)
//     //    gui.add(gltf.scene.position, 'z').min(-50).max(50).step(0.01)
//     //    scene.add(gltf.scene)
//        console.log(gltf);
//     }
// )

//Mouse

const mouse = new THREE.Vector2();
window.addEventListener('mousemove', (e) =>{
    mouse.x = (e.clientX / sizes.width) * 2 - 1;
    mouse.y = - (e.clientY / sizes.height) * 2 + 1;
}, false)

/**
 * Lights
 */

const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)

const pointLight = new THREE.PointLight('#fffff', 0.9, 10, 2);
pointLight.position.set(0, 3, - 3);
scene.add(pointLight);


//Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height,  0.1, 100);
camera.position.z = 5;
scene.add(camera);

//Controls

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true;
// controls.enableZoom = false;
controls.dampingFactor = 0.02
controls.enablePan = false;
controls.maxDistance = 28;
// controls.minPolarAngle = 1.5;
// controls.maxPolarAngle = 1.5;


//Renderer
const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));  //Pixel Ratio
renderer.physicallyCorrectLights = true;


//Clock
const clock = new THREE.Clock()

const animate = () => {

    const elapsed = clock.getElapsedTime()

    //Update Controls
    controls.update();
    // camera.position.x = 5 * Math.sin(mouse.x * Math.PI / 5);
    // camera.position.y = mouse.y;
    // camera.position.z = 5 * Math.cos(mouse.x * Math.PI / 5)
    camera.lookAt(textGroup.position);

    particles.rotation.y = 0.005 * elapsed * Math.PI * 2

    //Render
    renderer.render(scene, camera)

   
    requestAnimationFrame(animate);

}

animate();

})

