#define PI 3.1415926535897932384626433832795

uniform float uSize;
uniform float uTime;
uniform bool uButton;
uniform vec2 uResolution;

attribute float aScale;
attribute float aRandom;
attribute vec3 aCube;
attribute vec3 aTorus;

varying float vRandom;
varying vec2 vUv;

// varying float vRandom;



void main() {
  
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    
    vec3 sphere = modelPosition.xyz;
    vec3 cube = aCube;
    vec3 torus = aTorus;

    cube.y -= 1.8;

    float radius = length(modelPosition) * (1.5 + sin(uTime * 2.0 * PI * 0.2));
    // float radius = length(modelPosition);
    float tetha = atan(length(modelPosition.xz) / modelPosition.y);
    float phi = atan(modelPosition.z / modelPosition.x);

    float transition = (1.0 - cos(2.0 * PI * uTime * 0.1)) / 2.0;
    // float transition = smoothstep(0.2, 1.0, cos(2.0 * PI * uTime * 0.1));
    
    /*
     Change polarOffset to phasePolar in order to have
     a complete sphere from the beginning.
    */

    float polarOffset = tetha * uTime * 0.2;
    float azimuthOffset = phi * uTime * 0.01;
    float omega = PI / 2.0;
    float phasePolar = (uTime * 0.01 + 20.0 * tetha);
    float phaseAzimuth = (uTime * 0.01 + 20.0 * phi);

    // vec3 _sphere = smoothstep(radius * 0.2, radius, sh);

    vec3 cubeSphere = mix(cube, sphere, transition);

    modelPosition.xyz = cubeSphere;

    if (uButton) {
      modelPosition.x =  radius * sin(phasePolar) * cos(phaseAzimuth);
      modelPosition.y =  radius * cos(phasePolar); 
      modelPosition.z =  radius * sin(phasePolar) * sin(phaseAzimuth);
    } 

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    vUv = uv;
    vRandom = aRandom;

    /*
    * Size
    */

    gl_PointSize = uSize * aScale * (pow(sin(2.0 * PI * uTime * 0.2), 2.0) + 0.8);

    // Size Attenuation
    gl_PointSize *= (1.0 / - viewPosition.z);
}