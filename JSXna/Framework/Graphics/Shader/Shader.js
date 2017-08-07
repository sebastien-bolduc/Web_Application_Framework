var includeJSXnaShaderFlag = (typeof includeJSXnaShaderFlag == "undefined") ? false : includeJSXnaShaderFlag;

/**
 * Take care of everything that is shader related.
 *
 * @author Sébastien Bolduc <sebastien.bolduc@gmail.com>
 * @version 0.1
 */

/**
 * My namespace for shader class.
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
 * Handle basic operation for setting up a shader.
 */
JSXna.Framework.Graphics.Shader.Shader = class {
    /**
     * Creates an instance of this object.
     * 
     * @param {WebGL context} gl -  The WebGL context.
     * @param {WebGL shader type} type - Which shader are we defining.
     * @param {string} source - Source code for the shader.
     */
    constructor(gl, type, source) {
        this._gl = gl;
        this._type = type;
        this._source = source;
        this._shaderHandle = undefined;
    }

    /**
     * Get an handle for the shader
     * 
     * @returns {shader handle} An handle to the shader.
     */
    get ShaderHandle() {
        // If the shader has already been created then return it.
        if (typeof this._shaderHandle != "undefined") {
            return this._shaderHandle;
        }

        this._shaderHandle = this._gl.createShader(this._type);
        this._gl.shaderSource(this._shaderHandle, this._source);
        this._gl.compileShader(this._shaderHandle);
        if (!this._gl.getShaderParameter(this._shaderHandle, this._gl.COMPILE_STATUS)) {
            alert("An error occured at compile time: " + this._gl.getShaderInfoLog(this._shaderHandle));
            return null;
        }
        else {
            console.log("shader compile successfully!");
        }

        return this._shaderHandle;
    }
};

// Check if we already included this file...
if (!includeJSXnaShaderFlag) {
    JSXnaLoadingStatus += 1;
    includeJSXnaShaderFlag = true;
}