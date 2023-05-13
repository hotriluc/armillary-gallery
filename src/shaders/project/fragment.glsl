uniform sampler2D uImage;
uniform sampler2D uNoise;

uniform float uProgress;

varying vec2 vUv;

void main() {
    // move uv cooardintaes to the center
    vec2 st = vUv;
    st -= 0.5;
    
    vec3 imgTexture =  texture2D(uImage, st + 0.5).rgb ;
    float noiseTexture = texture2D(uNoise, st * 2.0 + .5).r;

    // scale noise from the center
    float progress = uProgress;
    float lengthToCenter = length(st) ;
    progress += (noiseTexture * 2.0 - 1.0) * 0.15  ;
	progress = smoothstep(progress - 0.01, progress, lengthToCenter);

    // Add noise to image to see noise outlines
    vec3 res = imgTexture + vec3(progress);

    
    gl_FragColor = vec4(res, 0.8 - progress );
}