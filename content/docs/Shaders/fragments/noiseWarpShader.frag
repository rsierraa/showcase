#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D image;
uniform vec2 resolution;
uniform float noiseScale;
uniform float noiseStrength;

varying vec2 vTexCoord;

// 2D Random
float random(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec2 uv = vTexCoord.xy;
  vec2 p = uv * resolution.xy / noiseScale;

  float distortion = noiseStrength * (random(p) - 0.5);
  vec2 distortedUV = uv + vec2(distortion);

  vec4 color = texture2D(image, distortedUV);
  gl_FragColor = color;
}
