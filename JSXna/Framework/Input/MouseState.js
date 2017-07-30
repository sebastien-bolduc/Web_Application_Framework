var includeJSXnaMouseStateFlag = (typeof includeJSXnaMouseStateFlag == "undefined") ? false : includeJSXnaMouseStateFlag;

/**
 * Represents the state of a mouse input device, including mouse cursor position 
 * and buttons pressed.
 *
 * @author Sébastien Bolduc <sebastien.bolduc@gmail.com>
 * @version 0.4
 */

/**
 * My namespace for mouse state.
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
 * Represents the state of a mouse input device, including mouse cursor position 
 * and buttons pressed.
 */
JSXna.Framework.Input.MouseState = class {
    /**
     * Initialize a new Instance of the MouseState class.
     * @param {string} elementId - Element on which we want to monitor the mouse event.
     * @param {number} x - Horizontal mouse position.
     * @param {number} y - Vertical mouse position.
     */
    constructor(elementId = "JSXnaGLcanvas", x = 0, y = 0) {
        /**
         * @typedef {enum} ButtonState
         * @property {boolean} Pressed - Indicates that a button has been pressed.
         * @property {boolean} Released - Indicates that a button has been released.
         * @todo This is a naive enum pattern for JavaScript...
         */
        this.ButtonState = {
            Pressed: true,
            Released: false,
        };

        this._elementId = elementId;
        this._x = x;
        this._y = y;
        this._leftButton = this.ButtonState.Released;
        this._rightButton = this.ButtonState.Released;

        /**
         * @todo Get a better understanding on how this part work...
         * 'that' is being used to maintain a reference to the original 'this' even as the context is changing.
         * We are using anonymous function so we don't have to name it for the event handler.
         */
        var that = this;
        (document.getElementById(this._elementId)).addEventListener("mousemove", function(e) {
            that.setMouseMove(e);
        }, false);
        (document.getElementById(this._elementId)).addEventListener("mousedown", function(e) {
            that.setMouseDown(e);
        }, false);
        (document.getElementById(this._elementId)).addEventListener("mouseup", function(e) {
            that.setMouseUp(e);
        }, false);
    }

    /**
     * Set the position of the mouse cursor.
     * @param {event} event - The mouse event from which we are getting the data.
     */
    setMouseMove(event) {
        this._x = event.clientX - document.getElementById(this._elementId).offsetLeft;
        this._y = event.clientY - document.getElementById(this._elementId).offsetTop;
    }

    /**
     * Set the state of the mouse button on a press.
     * @param {event} event - The mouse event from which we are getting the data.
     */
    setMouseDown(event) {
        if (event.button < 1) {
            this._leftButton = this.ButtonState.Pressed;
        }
        else if (event.button > 1) {
            this._rightButton = this.ButtonState.Pressed;
        }
    }

    /**
     * Set the state of the mouse button on a release.
     * @param {event} event - The mouse event from which we are getting the data.
     */
    setMouseUp(event) {
        if (event.button < 1) {
            this._leftButton = this.ButtonState.Released;
        }
        else if (event.button > 1) {
            this._rightButton = this.ButtonState.Released;
        }
    }

    /**
     * Specifies the horizontal position of the mouse cursor.
     * @return {number} The horizontal position of the mouse cursor.
     */
    get X() {
        return this._x;
    }

    /**
     * Specifies the vertical position of the mouse cursor.
     * @return {number} The vertical position of the mouse cursor.
     */
    get Y() {
        return this._y;
    }

    /**
     * Returns the state of the left mouse button.
     * @return {boolean} The state of the mouse left button.
     */
    get LeftButton() {
        return this._leftButton;
    }

    /**
     * Returns the state of the right mouse button.
     * @return {boolean} The state of the mouse right button.
     */
    get RightButton() {
        return this._rightButton;
    }
};

if (!includeJSXnaMouseStateFlag) {
    JSXnaLoadingStatus += 1;   
    includeJSXnaMouseStateFlag = true;
}