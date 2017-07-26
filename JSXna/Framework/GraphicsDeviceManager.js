/**
 * Handles the configuration and management of the graphics device.
 *
 * @author Sébastien Bolduc <sebastien.bolduc@gmail.com>
 * @version 0.1
 */

JSXna.Utils.include['AJAX']('/JSXna/Framework/Graphics/GraphicsDevice.js');

/**
 * My namespace for graphic device manager.
 * (We take the time to check if all namespaces are already created)
 * @namespace JSXna.Framework
 */
if (typeof JSXna == "undefined") {
    var JSXna = {};
}
if (typeof JSXna.Framework == "undefined") {
    JSXna.Framework = {};
}

/**
 * Creates a new GraphicsDeviceManager and registers it to handle the 
 * configuration and management of the graphics device for the specified Game.
 */
JSXna.Framework.GraphicsDeviceManager = class {
    /**
     * handle the configuration and management of the graphics device for the 
     * specified Game.
     */
    constructor() {
        this._graphicsDevice = new JSXna.Framework.Graphics.GraphicsDevice();
    }
    
    /**
     * Gets the GraphicsDevice associated with the GraphicsDeviceManager.
     * 
     * @returns {GraphicsDevice} The GraphicsDevice associated with the GraphicsDeviceManager.
     */
    get GraphicsDevice() {
        return this._graphicsDevice;
    }
};