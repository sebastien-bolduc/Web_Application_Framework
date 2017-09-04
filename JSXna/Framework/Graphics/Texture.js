var includeJSXnaTextureFlag = (typeof includeJSXnaTextureFlag == "undefined") ? false : includeJSXnaTextureFlag;

/**
 * Represents a texture resource.
 *
 * @author Sébastien Bolduc <sebastien.bolduc@gmail.com>
 * @version 0.0
 */

/**
 * My namespace for texture.
 * (We take the time to check if all namespaces are already created)
 * @namespace JSXna.Framework.Graphics
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

/**
 * Represents a texture resource.
 */
JSXna.Framework.Graphics.Texture = class {
    /**
     * Creates an instance of this object.
     * 
     * @param {TextureData} data - The texture this object handle.
     */
    constructor(data) {
        this._texture = data; 
    }
    
    /**
     * Get the texture.
     * 
     * @returns {TextureData} The texture this object handle.
     */
    get Format() {
        return this._texture;
    }
    
    /**
     * Create a default white texture (use when no texture is applied).
     * 
     * @param {WebGL context} gl - The WebGL context to work with.
     * @returns {Object} The texture object created.
     */
    static createWhiteTexture(gl) {
        var texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,new Uint8Array([255, 255, 255, 255]));
        gl.bindTexture(gl.TEXTURE_2D, null);
        
        return new JSXna.Framework.Graphics.Texture(texture);
    }
    
    /**
     * Create a texture object.
     * 
     * @param {WebGL context} gl - The WebGL context to work with.
     * @param {string} sourceImageUrl - The source image for the texture.
     * @returns {Object} The texture object created.
     */
    static createTexture(gl, sourceImageUrl) {
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        
        // Because images have to be download over the internet
        // they might take a moment until they are ready.
        // Until then put a single pixel in the texture so we can
        // use it immediately. When the image has finished downloading
        // we'll update the texture with the contents of the image.
        const level = 0;
        const internalFormat = gl.RGBA;
        const width = 1;
        const height = 1;
        const border = 0;
        const srcFormat = gl.RGBA;
        const srcType = gl.UNSIGNED_BYTE;
        const pixel = new Uint8Array([0, 0, 255, 255]);  // opaque blue
        gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border, srcFormat, srcType, pixel);
                
        const textureImage = new Image();
        textureImage.onload = function() {
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, textureImage);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        };
        textureImage.src = sourceImageUrl;
        
        return new JSXna.Framework.Graphics.Texture(texture); 
    }
};

// Check if we already included this file...
if (!includeJSXnaTextureFlag) {
    JSXnaLoadingStatus += 1;
    includeJSXnaTextureFlag = true;
}