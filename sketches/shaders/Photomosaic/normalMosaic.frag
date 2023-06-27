precision mediump float;

// palette is sent by the sketch and comprises the video
const int maxNum = 29;
uniform int n;
uniform sampler2D original;
uniform sampler2D pics;
// target horizontal & vertical resolution
uniform float resolution;
// uv visualization
uniform bool uv;

// texture space normalized interpolated texture coordinates
// should have same name and type as in vertex shader
varying vec2 texcoords2; // (defined in [0..1] ∈ R)

float luma(vec4 texel) {
  // alpha channel (texel.a) is just discarded
  return 0.299 * texel.r + 0.587 * texel.g + 0.114 * texel.b;
}

float getCloser(vec4 texel, vec2 coord){
  
  float distancia = 999999.9;
  float lumaOriginal = luma(texel);
  vec4 temp;
  float lumaTemp;
  
  float closest = 0.0;
  
  for(int i=0; i<maxNum; i++){
    if(i<n){
      temp = texture2D(pics, coord + float(i)*vec2(0.5/(float(n)/2.0), 0.0));
      lumaTemp = luma(temp);
      if(abs(lumaOriginal-lumaTemp) < distancia){
        distancia = abs(lumaOriginal-lumaTemp);
        closest = float(i);
      }
    }
  }
  
  return closest;
}

float rand(vec2 co){
  return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  
  vec2 symbolCoord = texcoords2 * resolution;
  vec2 stepCoord = floor(symbolCoord);
  symbolCoord = symbolCoord - stepCoord;
  
  vec4 texel = texture2D(original, stepCoord/vec2(resolution));
  
  vec2 adjustedCoords = symbolCoord * vec2(0.5/(float(n)/2.0), 1.0);
  
  float closest = getCloser(texel, vec2(0.5/(float(n)/2.0), 1.0));
  
  adjustedCoords = adjustedCoords + closest*vec2(0.5/(float(n)/2.0), 0.0);
  
  vec4 result = texture2D(pics, adjustedCoords);
  
  gl_FragColor = uv ? vec4(adjustedCoords.st, 0.0, 1.0) : result;
}