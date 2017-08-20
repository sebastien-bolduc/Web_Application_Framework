var includeJSXnaKeyboardFlag = (typeof includeJSXnaKeyboardFlag == "undefined") ? false : includeJSXnaKeyboardFlag;

/**
 * Allows retrieval of keystrokes from a keyboard input device.
 *
 * @author Sébastien Bolduc <sebastien.bolduc@gmail.com>
 * @version 0.0
 */

JSXna.Utils.include['HTML']('/JSXna/Framework/Input/KeyboardState.js');

/**
 * My namespace for keyboard input.
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
 * Allows retrieval of keystrokes from a keyboard input device.
 */
JSXna.Framework.Input.Keyboard = class {
    /**
     * Create a keyboard type.
     */
    constructor() {
        this._keyboardState = new JSXna.Framework.Input.KeyboardState();
    }
    
    /**
     * Returns the current keyboard state.
     * 
     * @returns {KeyboardState} Current keyboard state.
     */
    get GetState() {
        return this._keyboardState;
    }
};

// Check if we already included this file...
if (!includeJSXnaKeyboardFlag) {
    JSXnaLoadingStatus += 1;
    includeJSXnaKeyboardFlag = true;
}