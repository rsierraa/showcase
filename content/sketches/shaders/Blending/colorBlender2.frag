precision mediump float;

uniform vec3 color1;
uniform vec3 color2;

uniform float brightness;

uniform bool mult;
uniform bool sum;
uniform bool sub;
uniform bool overlay;
uniform bool screen;
uniform bool darken;
uniform bool lighten;


void main() {

    float r1 = color1.r;
    float g1 = color1.g;
    float b1 = color1.b;

    float r2 = color2.r;
    float g2 = color2.g;
    float b2 = color2.b;

    vec3 result = vec3(0.0);

    if(mult){
        result = (color1*color2);
    }else if(sum){
        result = (color1+color2);
    }else if(sub){
        result = (color1-color2);
    }else if(overlay){
        result = r1<=0.5 ? result+vec3(2.0*r1+r2, 0.0, 0.0) : result+vec3(1.0-2.0*(1.0-r1)*(1.0-r2), 0.0, 0.0);
        result = g1<=0.5 ? result+vec3(0.0, 2.0*g1+g2, 0.0) : result+vec3(0.0, 1.0-2.0*(1.0-g1)*(1.0-g2), 0.0);
        result = b1<=0.5 ? result+vec3(0.0, 0.0, 2.0*b1+b2) : result+vec3(0.0, 0.0, 1.0-2.0*(1.0-b1)*(1.0-b2));
    }else if(screen){
        result = vec3(1.0-(1.0-r1)*(1.0-r2), 1.0-(1.0-g1)*(1.0-g2), 1.0-(1.0-b1)*(1.0-b2));
    }else if(darken){
        result = vec3(min(r1, r2), min(g1, g2), min(b1, b2));
    }else if(lighten){
        result = vec3(max(r1, r2), max(g1, g2), max(b1, b2));
    }

    gl_FragColor = vec4(brightness*result, 1.0);
}