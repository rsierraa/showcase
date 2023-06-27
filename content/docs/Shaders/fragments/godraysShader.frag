#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D image;
uniform vec2 resolution;
uniform float godraysIntensity;

varying vec2 vTexCoord;

void main() {
  vec2 uv = vTexCoord.xy;
  vec2 screenPos = uv * resolution;
  vec2 delta = 1.0 / resolution;

  float weight = 1.0;
  vec4 sum = vec4(0.0);
  vec4 currentColor = texture2D(image, uv);

  for (int i = 0; i < 50; i++) {
    screenPos -= delta * 0.1;
    vec4 sample = texture2D(image, screenPos);
    sample *= weight;
    sum += sample;
    weight *= godraysIntensity;
  }

  vec4 godrayColor = sum * 0.05;
  vec4 finalColor = mix(currentColor, godrayColor, godraysIntensity);

  gl_FragColor = finalColor;
}
