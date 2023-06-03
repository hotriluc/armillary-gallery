uniform sampler2D uImage;
uniform sampler2D uNoise;

uniform float uProgress;

varying vec2 vUv;

void main() {
    // move uv cooardintaes to the center
    vec2 st = vUv;
    st -= 0.5;
    
    vec3 imgTexture = .95 * texture2D(uImage, st + 0.5).rgb ;
    float noiseTexture = texture2D(uNoise, st * 2.0 + .5).r;

    // from 0 - 2
    float power = abs(st.x) ;

    // from 0 to 1
    float progress = uProgress;
    // progress = progress * 1.2  ;
	progress = step(progress  - .5, power);

    // Add noise to image to see noise outlines
    vec3 res = imgTexture - vec3(progress);


    
    gl_FragColor = vec4(res, max(0.0, 0.5 - progress) );

    // gl_FragColor = vec4(vec3(progress), 1.);
}