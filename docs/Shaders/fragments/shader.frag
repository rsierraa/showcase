#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform sampler2D iChannel0;

const float SqrSize = 0.01;
const float SqrBorderSize = 0.002;
const float Zoom = 1.5;

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 uv = fragCoord / iResolution.xy;
  vec2 mUv = iMouse.xy / iResolution.xy;

  if (mUv == vec2(0.0)) {
    mUv = vec2(0.45) + vec2(sin(iTime), cos(iTime)) * 0.05;
  }

  vec2 dis = mUv - uv;
  vec2 dist = dis;
  dis.y *= iResolution.y / iResolution.x;

  float sqrMagitude = dot(dis, dis);

  float magnifierFlag = step(sqrMagitude, SqrSize);

  uv += (1.0 - 1.0 / Zoom) * dist * magnifierFlag;

  float border = smoothstep(SqrBorderSize, 0.0, abs(sqrMagitude - SqrSize));

  fragColor = max(texture(iChannel0, uv), border);
}

void main() {
  vec2 fragCoord = gl_FragCoord.xy;
  vec4 fragColor;
  mainImage(fragColor, fragCoord);
  gl_FragColor = fragColor;
}