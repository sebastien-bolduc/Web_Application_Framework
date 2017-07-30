var includeJSXnaMouseFlag = (typeof includeJSXnaMouseFlag == "undefined") ? false : includeJSXnaMouseFlag;

/**
 * Allows retrieval of position and button clicks from a mouse input device.
 *
 * @author Sébastien Bolduc <sebastien.bolduc@gmail.com>
 * @version 0.3
 */

JSXna.Utils.include['HTML']('/JSXna/Framework/Input/MouseState.js');

/**
 * My namespace for mouse input.
 * (We take the time to check if all namespaces are already created)
 * @namespace JSXna.Framework.Input
 */
if (typeof JSXna == "undefined") {
    var JSXna = {};
}
if (typeof JSXna.Framework == "undefined") {
    JSXna.Framework = {};
}
if (typeof JSXna.Framework.Input == "undefined") {
    JSXna.Framework.Input = {};
}

/** 
 * Allows retrieval of position and button clicks from mouse input device. 
 */
JSXna.Framework.Input.Mouse = class {
    /**
     * Create a mouse type.
     * @param {string} elementId - Element on which we want to monitor the mouse event.
     * @param {number} x - The horizontal position of the mouse cursor.
     * @param {number} y - The vertical position of the mouse cursor.
     */
    constructor(elementId, x, y) {
        this._mouseState = new JSXna.Framework.Input.MouseState(elementId, x, y);
    }

    /**
     * Gets the current state of the mouse, including mouse position and buttons 
     * pressed.
     * @return {MouseState} The mouse state.
     */
    get GetState() {
        return this._mouseState;
    }
};

if (!includeJSXnaMouseFlag) {
    JSXnaLoadingStatus += 1;   
    includeJSXnaMouseFlag = true;
}