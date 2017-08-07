// The individual position vertex
attribute vec3 position;
attribute vec4 color;

// The transformation matrix
uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;

// Pass color attribute down to the frament shader
varying vec4 vColor;

void main() {

    // Pass the color down to the fragment shader
    vColor = color;

    // The gl_Position is the final position in clip space after the vertex shader modifies it
    //gl_Position = model * vec4(position, 1.0);
    
    // First transform the point
    //vec4 transformedPosition = model * vec4(position, 1.0);
    
    // How much effect does the perspective have?
    //float scaleFactor = 0.5;
    
    // Set w by taking the z vlaue which is typically ranged -1 to 1, than scale
    // it to be from 0 to some number, in this case 0-1.
    //float w = (1.0 + transformedPosition.z) * scaleFactor;
    
    // Save the new gl_Position with the custom w component
    //gl_Position = vec4(transformedPosition.xyz, w);
    
    // Read the multiplication in reverse order, the original point is moved
    // into clip space, and then projected into a perspective view by filling
    // in the W component
    //gl_Position = projection * model * vec4(position, 1.0);
    
    // Read the multiplication in reverse order, the point is taken from
    // the original model space and moved into world space. It is then
    // projected into clip space as a homogeneous point. Generally the
    // W value will be something other than 1 at the end of it.
    gl_Position = projection * view * model * vec4(position, 1.0); 
}