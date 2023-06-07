uniform sampler2D uImage;

uniform float uProgress;

varying vec2 vUv;

void main() {
    // move uv cooardintaes to the center
    vec2 st = vUv;
    st -= 0.5;
    
    vec3 imgTexture = .8 * texture2D(uImage, st + 0.5).rgb ;

    // Interpolation
    float power = abs(st.x) ;

    // Progress from 0 to 1
    float progress = uProgress;
	progress = step(progress  - .5, power);

    // Reveal image
    vec3 res = imgTexture - vec3(progress);
    
    gl_FragColor = vec4(res, max(0.0, 0.5 - progress) );

    #include <tonemapping_fragment>
    #include <encodings_fragment>
}