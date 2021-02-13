#define PI 3.1415926535897932384626433832795

varying vec3 vColor;
// varying float vRandom;
uniform vec3 uColor;
uniform float uTime;
uniform vec2 uResolution;

void main() {
    
    vec2 p = gl_PointCoord / uResolution.xy;

    float f = p.y;

    // Disc
    // float strength = distance(gl_PointCoord, vec2(0.5));
    // strength = 1.0 - step(0.5, strength);

    // Diffuse Point
    float strength = distance(gl_PointCoord, vec2(0.5));
    strength *= 2.0;
    strength = 1.0 - strength;

    // Light Point Pattern
    // float strength = distance(gl_PointCoord, vec2(0.5));
    // strength = 1.0 - strength;
    // strength = pow(strength, 10.0);

    /*
    * Final Color
    */

    vec3 color = mix(vec3(0.0), uColor, strength);

    gl_FragColor = vec4(color, 1.0);

  
}

