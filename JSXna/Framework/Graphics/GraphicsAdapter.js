var includeJSXnaGraphicsAdapterFlag = (typeof includeJSXnaGraphicsAdapterFlag == "undefined") ? false : includeJSXnaGraphicsAdapterFlag;

/**
 * Provides methods to retrieve and manipulate graphics adapters.
 *
 * @author Sébastien Bolduc <sebastien.bolduc@gmail.com>
 * @version 0.1
 */

/**
 * My namespace for graphic adapter.
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
 * Provides methods to retrieve and manipulate graphics adapters.
 */
JSXna.Framework.Graphics.GraphicsAdapter = class {
    /**
     * Creates an instance of this object.
     */
    constructor() {
        this._WebGLcontext = null;
        this.DefaultAdapter = document.getElementById("JSXnaGLcanvas");
    }

    /**
     * Sets the default adapter.
     * 
     * @param {string} cancas - Hmtl canvas to be link with WebGL.
     */
    set DefaultAdapter(canvas) {
        try {
            // Try to get the standard context.  If it fail, try the experimental call.
            this._WebGLcontext = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        }
        catch (e) {
            alert("error");
        }

        // If there is no context, alert the user.
        if (!this._WebGLcontext) {
            alert("Could not initiate a WebGL context.");
        }
    }

    /**
     * Gets the default adapter.
     * 
     * @returns {WebGL context} The default WebGL context.
     */
    get DefaultAdapter() {
        return this._WebGLcontext;
    }
};

if (!includeJSXnaGraphicsAdapterFlag) {
    JSXnaLoadingStatus += 1;   
    includeJSXnaGraphicsAdapterFlag = true;
}