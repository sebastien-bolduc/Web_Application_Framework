var includeJSXnaCubeFlag = (typeof includeJSXnaCubeFlag == "undefined") ? false : includeJSXnaCubeFlag;

/**
 * Basic model of a cube.
 *
 * @author Sébastien Bolduc <sebastien.bolduc@gmail.com>
 * @version 0.0
 */

JSXna.Utils.include['HTML']('/JSXna/Framework/Color.js');
 
/**
 * My namespace for cube.
 * (We take the time to check if all namespaces are already created)
 * @namespace JSXna.Engine.Model
 */
if (typeof JSXna == "undefined") {
    var JSXna = {};
}
if (typeof JSXna.Engine == "undefined") {
    JSXna.Engine = {};
}
if (typeof JSXna.Engine.Model == "undefined") {
    JSXna.Engine.Model = {};
}

/**
 * Basic model of a cube.
 */
JSXna.Engine.Model.Cube = class {
    /**
     * Creates a new instance of the class.
     * 
     * @param {WebGL context} gl - The WebGL context the cube model will be added to.
     */
    constructor(gl) {
        this.vertices = [
            // Front face
            -1.0, -1.0,  1.0,
            1.0, -1.0,  1.0,
            1.0,  1.0,  1.0,
            -1.0,  1.0,  1.0,
            
            // Back face
            -1.0, -1.0, -1.0,
            -1.0,  1.0, -1.0,
            1.0,  1.0, -1.0,
            1.0, -1.0, -1.0,
            
            // Top face
            -1.0,  1.0, -1.0,
            -1.0,  1.0,  1.0,
            1.0,  1.0,  1.0,
            1.0,  1.0, -1.0,
            
            // Bottom face
            -1.0, -1.0, -1.0,
            1.0, -1.0, -1.0,
            1.0, -1.0,  1.0,
            -1.0, -1.0,  1.0,
            
            // Right face
            1.0, -1.0, -1.0,
            1.0,  1.0, -1.0,
            1.0,  1.0,  1.0,
            1.0, -1.0,  1.0,
            
            // Left face
            -1.0, -1.0, -1.0,
            -1.0, -1.0,  1.0,
            -1.0,  1.0,  1.0,
            -1.0,  1.0, -1.0
        ];
        
        // Now send the vertices array to GL (setting up the buffer).
        this.cubeVerticesBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.cubeVerticesBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
        
        var colorsOfFaces = [
            JSXna.Framework.Color.Cyan.PackedValue,     // Front face: cyan
            JSXna.Framework.Color.Red.PackedValue,      // Back face: red
            JSXna.Framework.Color.Green.PackedValue,    // Top face: green
            JSXna.Framework.Color.Blue.PackedValue,     // Bottom face: blue
            JSXna.Framework.Color.Yellow.PackedValue,   // Right face: yellow
            JSXna.Framework.Color.Purple.PackedValue    // Left face: purple
        ];
        
        this.generatedColors = [];

        for (var j = 0; j < 6; j++) {
            var polygonColor = colorsOfFaces[j];
    
            for (var i=0; i<4; i++) {
                this.generatedColors = this.generatedColors.concat(polygonColor);
            }
        }
        
        // Now send the colors array to GL (setting up the buffer).
        this.cubeVerticesColorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.cubeVerticesColorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.generatedColors), gl.STATIC_DRAW);
        
        // This array defines each face as two triangles, using the
        // indices into the vertex array to specify each triangle's
        // position.
        
        this.cubeVertexIndices = [
            0,  1,  2,      0,  2,  3,    // front
            4,  5,  6,      4,  6,  7,    // back
            8,  9,  10,     8,  10, 11,   // top
            12, 13, 14,     12, 14, 15,   // bottom
            16, 17, 18,     16, 18, 19,   // right
            20, 21, 22,     20, 22, 23    // left
        ];
        
        // Now send the elements array to GL (setting up the buffer).
        this.cubeVerticesIndexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.cubeVerticesIndexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(this.cubeVertexIndices), gl.STATIC_DRAW);
    }
    
    /**
     * Create a cube model.
     * 
     * @param {WebGL context} gl - The WebGL context the cube model will be added to.
     */
    static createCubeModel(gl) {
        return new JSXna.Engine.Model.Cube(gl);   
    }
    
    /**
     * Set the attributes and uniforms for this model.
     * 
     * @param {context} context - the current context we're in.
     * @param {Matrix} model - The transformation matrix for the model.
     * @param {Matrix} view - The view matrix.
     * @param {Matrix} projection - The projection matrix.
     */
    setAttributesAndUniforms(context, model, view, projection) {
        var gl = context.graphics.GraphicsDevice.Adapter.DefaultAdapter;
        
        gl.uniformMatrix4fv(context.modelLocation, false, new Float32Array(model.matrix));
        gl.uniformMatrix4fv(context.viewLocation, false, new Float32Array(view.matrix));
        gl.uniformMatrix4fv(context.projectionLocation, false, new Float32Array(projection.matrix));
        
        /* A hidden part of gl.vertexAttribPointer is that it binds the current 
           ARRAY_BUFFER to the attribute. In other words now this attribute is 
           bound to positionBuffer. That means we're free to bind something else 
           to the ARRAY_BUFFER bind point. The attribute will continue to use 
           positionBuffer. */
        
        // Set the position attribute
        gl.enableVertexAttribArray(context.positionLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.cubeVerticesBuffer);
        gl.vertexAttribPointer(context.positionLocation, 3, gl.FLOAT, false, 0, 0);
      
        // Set the colors attribute
        gl.enableVertexAttribArray(context.colorLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.cubeVerticesColorBuffer);
        gl.vertexAttribPointer(context.colorLocation, 4, gl.FLOAT, false, 0, 0);
    }
    
    /**
     * Draw the cube model.
     * 
     * @param {context} context - the current context we're in.
     * @param {Matrix} model - The transformation matrix for the model.
     * @param {Matrix} view - The view matrix.
     * @param {Matrix} projection - The projection matrix.
     */
    draw(context, model, view, projection) {
        var gl = context.graphics.GraphicsDevice.Adapter.DefaultAdapter;
        
        this.setAttributesAndUniforms(context, model, view, projection);
        
        // Perform the actual draw
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.cubeVerticesIndexBuffer);
        gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
    }
};

// Check if we already included this file...
if (!includeJSXnaCubeFlag) {
    JSXnaLoadingStatus += 1;
    includeJSXnaCubeFlag = true;
}