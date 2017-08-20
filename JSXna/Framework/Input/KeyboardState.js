var includeJSXnaKeyboardStateFlag = (typeof includeJSXnaKeyboardStateFlag == "undefined") ? false : includeJSXnaKeyboardStateFlag;

/**
 * Represents a state of keystrokes recorded by a keyboard input device.
 *
 * @author Sébastien Bolduc <sebastien.bolduc@gmail.com>
 * @version 0.0
 */

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
 * Represents a state of keystrokes recorded by a keyboard input device.
 */
JSXna.Framework.Input.KeyboardState = class {
    /**
     * Initializes a new instance of the KeyboardState class.
     */
    constructor() {
        /**
         * @typedef {enum} Keys
         * @property {number} Key - Key code.
         * @todo This is a naive enum pattern for JavaScript...
         */
        this.Keys = {
            A: 65,
            D: 68,
            S: 83,
            W: 87
        };
        
        /**
         * @typedef {enum} KeyState
         * @property {boolean} Down - Key is pressed.
         * @property {boolean} Up - Key is released.
         * @todo This is a naive enum pattern for JavaScript...
         */
        this.KeyState = {
            Down: true,
            Up: false
        };
        
        /**
         * Returns the state of a particular key.
         */
        var _buffer = Array.apply(null, Array(256));
        this.Item = _buffer.map(function(currentValue) { return this.KeyState.Up; }, this);
        
        /**
         * @todo Get a better understanding on how this part work...
         * 'that' is being used to maintain a reference to the original 'this' even as the context is changing.
         * We are using anonymous function so we don't have to name it for the event handler.
         */
        var that = this;
        document.addEventListener("keydown", function(e) {
            that.setKeyDown(e);
        }, false);
        document.addEventListener("keyup", function(e) {
            that.setKeyUp(e);
        }, false);
    }
    
    /**
     * Set the state of the key(s) currently down.
     * 
     * @param {event} event - The keyboard event from which we are getting the data.
     */
    setKeyDown(event) {
        this.Item[event.keyCode] = this.KeyState.Down;
    }
    
    /**
     * Set the state of the key(s) currently up.
     * 
     * @param {event} event - The keyboard event from which we are getting the data.
     */
    setKeyUp(event) {
        this.Item[event.keyCode] = this.KeyState.Up;
    }
    
    /**
     * Returns whether a specified key is currently being pressed.
     * 
     * @param {Keys} key - Enumerated value that specifies the key to query.
     * @returns {boolean} True if the key specified by key is being held down; false otherwise.
     */
    isKeyDown(key) {
        return this.Item[key];
    }
    
    /**
     * Returns whether a specified key is currently not pressed.
     * 
     * @param {Keys} key - Enumerated value that specifies the key to query.
     * @returns {boolean} True if the key specified by key is not pressed; false otherwise.
     */
    isKeyUp(key) {
        return !this.Item[key];
    }
};

// Check if we already included this file...
if (!includeJSXnaKeyboardStateFlag) {
    JSXnaLoadingStatus += 1;
    includeJSXnaKeyboardStateFlag = true;
}