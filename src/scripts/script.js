import '../style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
import typefaceFont from 'three/examples/fonts/helvetiker_regular.typeface.json';
import * as dat from 'dat.gui';

// Import Shaders
import VertexShader from '../shaders/Home/vertex.glsl';
import FragmentShader from '../shaders/Home/fragment.glsl';

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

 // Sizes
const  sizes = {};
sizes.width =  window.innerWidth;
sizes.height = window.innerHeight;

 //Renderer
const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
});


// Renderer

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));  //Pixel Ratio
 
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


/**
 * 3D Text
 */

const matcapTexture = textureLoader.load('/textures/matcaps/3.png');
const material = new THREE.MeshMatcapMaterial({matcap: matcapTexture});
const textGroup = new THREE.Group();

const fontLoader = new THREE.FontLoader();

fontLoader.load(
    '/fonts/optimer_bold.typeface.json',
    (font) => {
        const textGeometry = new THREE.TextGeometry(
             "I Like to Solve",
            {
                font: font,
                size: 1.3,
                height: 0.4,
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
    }
);

fontLoader.load(
    '/fonts/optimer_bold.typeface.json',
    (font) => {
        const textGeometry = new THREE.TextBufferGeometry(
             "PROBLEMS",
            {
                font: font,
                size: 1.3,
                height: 0.5,
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
       text.position.y = - 2;
       textGroup.add(text);

    }
);

textGroup.position.y = 9
scene.add(textGroup);

/**
 * Particles
 */

 //Textures
const particleTextures = [];
for (let i = 0; i < 13; i++) {
    particleTextures[i] = textureLoader.load(`/textures/particles/${i + 1}.png`)
}

// Geometry and Material

const count = 9000;

// Cube
const cube = new THREE.BoxGeometry(15, 15, 15, 32, 32, 32);
const torus = new THREE.TorusGeometry( 10, 3, 16, 100 );
// const cartesianCubeVertex = new Float32Array(count * 3);
// cartesianCubeVertex.forEach((value, i) => cartesianCubeVertex[i] = (Math.random() - .5) * 10.5);

// cube.setAttribute('position', new THREE.BufferAttribute(cartesianCubeVertex, 3));

// Particles
const particlesGeometry = new THREE.BufferGeometry();
const positionsParticles = new Float32Array(count * 3);
const colors = new Float32Array(count * 3);
const scales = new Float32Array(count);
const randoms = new Float32Array(count);


const paraboloidShape = (x, z) => {
    return  Math.pow((x / 2), 2) - Math.pow((z / 2), 2)
}

const sphereShape = (x, z) => { 
    return Math.sqrt(100 - Math.pow(x, 2) - Math.pow(z, 2))
}


const radius = 13;
const a = 0.005;

for (let i = 0; i < count; i++) {
    
    let i3 = i * 3
    const phi = Math.random() * Math.PI * 2
    const theta = Math.random() * Math.PI;

    positionsParticles[i3 + 0] = radius * Math.sin(theta) * Math.cos(phi);
    positionsParticles[i3 + 1] = radius * Math.cos(theta);
    positionsParticles[i3 + 2] = radius * Math.sin(theta) * Math.sin(phi);

    scales[i] = Math.random();
    randoms[i] = Math.random();

    // let x = (Math.random() - .5) * 40;
    // let z = (Math.random() - .5) * 40;
    // positionsParticles[i3 + 0] = x;
    // positionsParticles[i3 + 1] = sphereShape(x, z);
    // positionsParticles[i3 + 2] = z;



    // positionsParticles[i3 + 0] = (Math.random() - 0.5) * 10;
    // positionsParticles[i3 + 1] = (Math.random() - 0.5) * 10;
    // positionsParticles[i3 + 2] = (Math.random() - 0.5) * 10;

    //Helix

    // positionsParticles[i3 + 0] = radius * Math.cos(i)
    // positionsParticles[i3 + 1] =  0.005 * i;
    // positionsParticles[i3 + 2] = radius * Math.sin(i)

    // Spherical spiral

    // positionsParticles[i3 + 0] = (radius * Math.cos(i)) / (Math.sqrt(Math.pow(a, 2)*Math.pow(i, 2) + 1));
    // positionsParticles[i3 + 1] = - (radius * a * i) / (Math.sqrt(Math.pow(a, 2)*Math.pow(i, 2) + 1));
    // positionsParticles[i3 + 2] = (radius * Math.sin(i)) / (Math.sqrt(Math.pow(a, 2)*Math.pow(i, 2) + 1));

    // Möbius surface

    // positionsParticles[i3 + 0] = radius * Math.sin(theta) * Math.cos(phi);
    // positionsParticles[i3 + 1] = radius * Math.cos(theta);
    // positionsParticles[i3 + 2] = radius * Math.sin(theta) * Math.sin(phi);

}

// const sphere = new THREE.SphereGeometry(10, 55, 55);
/**
 * Postion attribute of a Geometry is the array holding the
 * positions of all vertices composing the geometry
 */
// particlesGeometry.attributes.position = sphere.attributes.position;
// particlesGeometry.attributes.uv = sphere.attributes.uv;

// const torus = new THREE.TorusGeometry( 10, 3, 16, 100 );
// particlesGeometry.attributes.position = torus.attributes.position;
// particlesGeometry.attributes.uv = torus.attributes.uv;


particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positionsParticles, 3));
particlesGeometry.setAttribute('aCube', new THREE.BufferAttribute(cube.attributes.position.array, 3));
particlesGeometry.setAttribute('aTorus', new THREE.BufferAttribute(torus.attributes.position.array, 3));
particlesGeometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
particlesGeometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1));
// particlesGeometry.setAttribute('aCubeUv', new THREE.BufferAttribute(cube.attributes.uv.array, 2));

// Change to ShaderMaterial

const particlesMaterial = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: false,
    vertexShader: VertexShader,
    fragmentShader: FragmentShader,

    uniforms:
    {
        uSize: { value: 40 * renderer.getPixelRatio()},
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(sizes.height, sizes.width) },
        uColor: { value: new THREE.Color('#ffdf51') },
        uButton: { value: false },
        uTexture: { value: particleTextures[3] }
    }

 });


//Points

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
particles.position.y = - 2;
scene.add(particles);

// Mouse
const mouse = new THREE.Vector2();
window.addEventListener('mousemove', (e) =>{
    mouse.x = (e.clientX / sizes.width) * 2 - 1;
    mouse.y = - (e.clientY / sizes.height) * 2 + 1;
}, false)


// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height,  0.1, 100);
camera.position.z = 24;
camera.position.y = -4;
scene.add(camera);

//Controls

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true;
// controls.enableZoom = false;
controls.dampingFactor = 0.02
controls.enablePan = false;
controls.minDistance = 8;
controls.maxDistance = 24;
// controls.minPolarAngle = 1.5;
// controls.maxPolarAngle = 1.5;



//Clock
const clock = new THREE.Clock()

const animate = () => {

    const elapsed = clock.getElapsedTime();

    particlesMaterial.uniforms.uTime.value = elapsed;

    //Update Controls
    controls.update();

    //Render
    renderer.render(scene, camera)

    requestAnimationFrame(animate);

}

animate();



