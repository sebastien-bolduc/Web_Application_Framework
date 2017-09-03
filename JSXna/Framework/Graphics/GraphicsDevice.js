var includeJSXnaGraphicsDeviceFlag = (typeof includeJSXnaGraphicsDeviceFlag == "undefined") ? false : includeJSXnaGraphicsDeviceFlag;

/**
 * Performs primitive-based rendering, creates resources, handles system-level 
 * variables, adjusts gamma ramp levels, and creates shaders.
 *
 * @author Sébastien Bolduc <sebastien.bolduc@gmail.com>
 * @version 0.1
 */

JSXna.Utils.include['HTML']('/JSXna/Framework/Color.js');
JSXna.Utils.include['HTML']('/JSXna/Framework/Graphics/DisplayMode.js');
JSXna.Utils.include['HTML']('/JSXna/Framework/Graphics/GraphicsAdapter.js');

/**
 * My namespace for graphic device.
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
 * Performs primitive-based rendering, creates resources, handles system-level 
 * variables, adjusts gamma ramp levels, and creates shaders.
 */
JSXna.Framework.Graphics.GraphicsDevice = class {
    /**
     * Creates an instance of this object.
     */
    constructor() {
        this._adapter = new JSXna.Framework.Graphics.GraphicsAdapter();
    }

    /**
     * Gets the graphics adapter.
     * 
     * @returns {GrahpicsAdapter} The graphicas adapter (WebGL context).
     */
    get Adapter() {
        return this._adapter;
    }
    
    /**
     * Gets a viewport identifying the portion of the render target to receive draw calls.
     * 
     * @returns {DisplayMode} The viewport to get.
     */
    get Viewport() {
        return new JSXna.Framework.Graphics.DisplayMode(document.getElementById("JSXnaGLcanvas"));
    }

    /**
     * Clears resource buffers.
     * 
     * @param {Color} color - Set this color value in all buffers.
     */
    clear(color) {
        var gl = this.Adapter.DefaultAdapter;

        // Check if WebGL is available and running.
        if (gl) {
            gl.clearColor(color.R, color.G, color.B, color.A);
            gl.enable(gl.DEPTH_TEST);
            gl.depthFunc(gl.LEQUAL);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        }
    }
};

// Check if we already included this file...
if (!includeJSXnaGraphicsDeviceFlag) {
    JSXnaLoadingStatus += 1;
    includeJSXnaGraphicsDeviceFlag = true;
}