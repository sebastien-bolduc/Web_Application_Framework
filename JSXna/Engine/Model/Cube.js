var includeJSXnaCubeFlag = (typeof includeJSXnaCubeFlag == "undefined") ? false : includeJSXnaCubeFlag;

/**
 * Basic model of a cube.
 *
 * @author Sébastien Bolduc <sebastien.bolduc@gmail.com>
 * @version 0.0
 */

JSXna.Utils.include['HTML']('/JSXna/Framework/Color.js');
JSXna.Utils.include['HTML']('/JSXna/Framework/Graphics/Texture.js');
 
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
        var vertices = [
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
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        
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
  
        var textureCoordinates = [
            // Front
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
            // Back
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
            // Top
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
            // Bottom
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
            // Right
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
            // Left
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0
        ];

        // Now send the texture coordinates array to GL (setting up the buffer).
        this.cubeVerticesTextureCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.cubeVerticesTextureCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);
        
        // This array defines each face as two triangles, using the
        // indices into the vertex array to specify each triangle's
        // position.
        
        var cubeVertexIndices = [
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
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(cubeVertexIndices), gl.STATIC_DRAW);
        
        // Create a default white texture for when no texture is applied.
        this.cubeTexture = JSXna.Framework.Graphics.Texture.createWhiteTexture(gl);
        this.TEXTURE_FLAG = false;
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
     * Set a texture to be applied to the cube.
     * 
     * @param {Texture} texture - A texture for the cube.
     */
    setTexture(texture = undefined) {
        if (typeof texture != "undefined") {
            this.cubeTexture = texture;
        }
        
        this.TEXTURE_FLAG = true;
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
        
        // Set the position attribute.
        gl.enableVertexAttribArray(context.positionLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.cubeVerticesBuffer);
        gl.vertexAttribPointer(context.positionLocation, 3, gl.FLOAT, false, 0, 0);
      
        // Set the colors attribute.
        gl.enableVertexAttribArray(context.colorLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.cubeVerticesColorBuffer);
        gl.vertexAttribPointer(context.colorLocation, 4, gl.FLOAT, false, 0, 0);
        
        // Set the texture attribute.
        gl.enableVertexAttribArray(context.textureLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.cubeVerticesTextureCoordBuffer);
        gl.vertexAttribPointer(context.textureLocation, 2, gl.FLOAT, false, 0, 0);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.cubeTexture.Format);
        gl.uniform1i(gl.getUniformLocation(context.myShader, "uSampler"), 0);
    }
    
    /**
     * Set the attributes and uniforms for this model (with texture).
     * 
     * @param {context} context - the current context we're in.
     * @param {Matrix} model - The transformation matrix for the model.
     * @param {Matrix} view - The view matrix.
     * @param {Matrix} projection - The projection matrix.
     */
    setAttributesAndUniformsWithTexture(context, model, view, projection) {
        var gl = context.graphics.GraphicsDevice.Adapter.DefaultAdapter;
        
        gl.uniformMatrix4fv(context.modelLocation, false, new Float32Array(model.matrix));
        gl.uniformMatrix4fv(context.viewLocation, false, new Float32Array(view.matrix));
        gl.uniformMatrix4fv(context.projectionLocation, false, new Float32Array(projection.matrix));
        
        /* A hidden part of gl.vertexAttribPointer is that it binds the current 
           ARRAY_BUFFER to the attribute. In other words now this attribute is 
           bound to positionBuffer. That means we're free to bind something else 
           to the ARRAY_BUFFER bind point. The attribute will continue to use 
           positionBuffer. */
        
        // Set the position attribute.
        gl.enableVertexAttribArray(context.positionLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.cubeVerticesBuffer);
        gl.vertexAttribPointer(context.positionLocation, 3, gl.FLOAT, false, 0, 0);
      
        // Set the colors attribute.
        gl.disableVertexAttribArray(context.colorLocation);
        gl.vertexAttrib4f(context.colorLocation, 1, 1, 1, 1);
        
        // Set the texture attribute.
        gl.enableVertexAttribArray(context.textureLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.cubeVerticesTextureCoordBuffer);
        gl.vertexAttribPointer(context.textureLocation, 2, gl.FLOAT, false, 0, 0);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.cubeTexture.Format);
        gl.uniform1i(gl.getUniformLocation(context.myShader, "uSampler"), 0);
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
        
        if (this.TEXTURE_FLAG) {
            this.setAttributesAndUniformsWithTexture(context, model, view, projection);
        } else {
            this.setAttributesAndUniforms(context, model, view, projection);
        }
        
        // Perform the actual draw.
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.cubeVerticesIndexBuffer);
        gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
    }
};

// Check if we already included this file...
if (!includeJSXnaCubeFlag) {
    JSXnaLoadingStatus += 1;
    includeJSXnaCubeFlag = true;
}