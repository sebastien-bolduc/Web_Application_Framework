var includeJSXnaDisplayModeFlag = (typeof includeJSXnaDisplayModeFlag == "undefined") ? false : includeJSXnaDisplayModeFlag;

/**
 * Describes the display mode.
 *
 * @author Sébastien Bolduc <sebastien.bolduc@gmail.com>
 * @version 0.3
 */

/**
 * My namespace for display mode.
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
 * Describes the display mode.
 */
JSXna.Framework.Graphics.DisplayMode = class {
    /**
     * Creates an instance of this object.
     */
    constructor(canvas) {
        this._canvas = canvas;
    }
    
    /**
     * Gets the aspect ratio used by the graphics device.
     * 
     * @returns {number} Aspect ratio of the viewport.
     */
    get AspectRatio() {
        return this.Width / this.Height;
    }
    
    /**
     * Gets a value indicating the screen width, in pixels.
     * 
     * @returns {number} Screen width, in pixels.
     */
    get Width() {
        return this._canvas.width;
    }
    
    /**
     * Gets a value indicating the screen height, in pixels.
     * 
     * @returns {number} Screen height, in pixels.
     */
    get Height() {
        return this._canvas.height;
    }
}

// Check if we already included this file...
if (!includeJSXnaDisplayModeFlag) {
    JSXnaLoadingStatus += 1;
    includeJSXnaDisplayModeFlag = true;
}