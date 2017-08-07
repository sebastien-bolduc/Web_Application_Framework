var includeJSXnaShaderProgramFlag = (typeof includeJSXnaShaderProgramFlag == "undefined") ? false : includeJSXnaShaderProgramFlag;

/**
 * Link and use the programe for the current WebGL context.
 *
 * @author Sébastien Bolduc <sebastien.bolduc@gmail.com>
 * @version 0.1
 */

/**
 * My namespace for shader program class.
 * (We take the time to check if all namespaces are already created)
 * @namespace JSXna.Framework.Graphics.Shader
 */
if (typeof JSXna == "undefined") {
    var JSXna = {};
}
if (typeof JSXna.Framework == "undefined") {
    JSXna.Framework = {};
}
if (typeof JSXna.Framework.Graphics == "undefined") {
    JSXna.Framework.Graphics = {};
}
if (typeof JSXna.Framework.Graphics.Shader == "undefined") {
    JSXna.Framework.Graphics.Shader = {};
}

/**
 * This class is used to Cache the links between Vertex/Pixel Shaders and 
 * Constant Buffers. It will be responsible for linking the programs under 
 * OpenGL if they have not been linked before. If an existing link exists it 
 * will be resused.
 */
JSXna.Framework.Graphics.Shader.ShaderProgram = class {
    /**
     * Creates an instance of this object.
     * 
     * @param {WebGL context} gl -  The WebGL context.
     */
    constructor(gl) {
        this._gl = gl;
        this._programHandle = undefined;
    }

    /**
     * Linking the shaders as one program.
     * 
     * @param {shader handle} fragmentShader - Handle for the fragment shader.
     * @param {shader handle} vertexShader - Handle for the vertex shader.
     */
    linkProgram(fragmentShader, vertexShader) {
        if (typeof this._programHandle != "undefined") {
            return this._programHandle;
        }

        this._programHandle = this._gl.createProgram();
        this._gl.attachShader(this._programHandle, fragmentShader);
        this._gl.attachShader(this._programHandle, vertexShader);
        this._gl.linkProgram(this._programHandle);
        if (!this._gl.getProgramParameter(this._programHandle, this._gl.LINK_STATUS)) {
            alert("Not able to initialize shader: " + this._gl.getProgramInfoLog(this._programHandle));
        }
        this._gl.useProgram(this._programHandle);
    }

    /**
     * Return the current program handle.
     * 
     * @returns {program handle} An handle to the shader program.
     */
    get ProgramHandle() {
        return this._programHandle;
    }
};

// Check if we already included this file...
if (!includeJSXnaShaderProgramFlag) {
    JSXnaLoadingStatus += 1;
    includeJSXnaShaderProgramFlag = true;
}