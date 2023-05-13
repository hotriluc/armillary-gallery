uniform float uTime;
uniform vec3 uColorBase;
uniform vec3 uColorMix;

varying vec2 vUv;

void main() {
    float strength =  (1.0 - distance(gl_PointCoord, vec2(0.5))) ;
    strength = pow(strength, 6.);

    vec3 color = mix(uColorBase, uColorMix, strength);

    
    gl_FragColor = vec4(vec3(color), strength);
}