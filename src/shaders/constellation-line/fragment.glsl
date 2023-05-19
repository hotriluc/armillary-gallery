uniform float uTime;
uniform vec3 uColorBase;

varying vec2 vUv;

void main() {
    gl_FragColor = vec4(vec3( uColorBase), 1.0);
}