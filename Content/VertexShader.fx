// The individual position vertex
attribute vec3 position;
attribute vec4 color;
attribute vec2 aTextureCoord;

// The transformation matrix
uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;

// Pass color attribute down to the fragment shader
varying vec4 vColor;

// Pass texture attribute down to the fragment shader
varying highp vec2 vTextureCoord;

void main() {

    // Pass the color down to the fragment shader
    vColor = color;
    
    // Pass the texture down to the frament shader
    vTextureCoord = aTextureCoord;
    
    // Read the multiplication in reverse order, the point is taken from
    // the original model space and moved into world space. It is then
    // projected into clip space as a homogeneous point. Generally the
    // W value will be something other than 1 at the end of it.
    gl_Position = projection * view * model * vec4(position, 1.0); 
}