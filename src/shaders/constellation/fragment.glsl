uniform float uTime;
uniform vec3 uColorBase;
uniform vec3 uColorMix;

varying vec2 vUv;

void main() {
    float strength = (1.0 - distance(gl_PointCoord, vec2(0.5)))  ;
    strength = pow( strength, 8.0);

    vec3 color = mix(uColorBase, uColorMix, strength);

    gl_FragColor = vec4(clamp(color, 0.0 , 1.0), max(0.0, strength));
}