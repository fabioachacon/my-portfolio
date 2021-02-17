import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as dat from 'dat.gui';


/**
 * Base
 */

// Sizes
const sizes = {};
sizes.width =  window.innerWidth;
sizes.height = window.innerHeight;

// Scene
const scene = new THREE.Scene();
const helper = new THREE.AxesHelper(50);
scene.add(helper);

// Canvas
const aboutCanvas = document.querySelector('.js-canvas-about');

// Renderer
const renderer = new THREE.WebGLRenderer({
    aboutCanvas,
    antialias: true,
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height,  0.1, 100);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, aboutCanvas);





//Clock
const clock = new THREE.Clock()

const animate = () => {

    const elapsedTime = clock.getElapsedTime();

    //Update Controls
    controls.update();

    //Render
    renderer.render(scene, camera)

    requestAnimationFrame(animate);

}

animate();