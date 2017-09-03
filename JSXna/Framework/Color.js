var includeJSXnaColorFlag = (typeof includeJSXnaColorFlag == "undefined") ? false : includeJSXnaColorFlag;

/**
 * Represents a four-component color using red, green, blue, and alpha data.
 *
 * @author Sébastien Bolduc <sebastien.bolduc@gmail.com>
 * @version 0.0
 */

JSXna.Utils.include['HTML']('/JSXna/Framework/Vector4.js');

/**
 * My namespace for color.
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
 * Represents a four-component color using red, green, blue, and alpha data.
 */
JSXna.Framework.Color = class {
    /**
     * Creates a new instance of the class.
     * 
     * @param {Vector4} vector - A four-component color.
     */
    constructor(vector) {
        this._color = vector;
    }
    
    /**
     * Sets the alpha component value.
     * 
     * @param {Vector4} alpha - The alpha component value of this Color.
     */
    set A(alpha) {
        this._color.W = alpha;
    } 
    
    /**
     * Gets the alpha component value.
     * 
     * @returns {Vector4} The alpha component value of this Color.
     */
    get A() {
        return this._color.W;
    }
    
    /**
     * Sets the blue component value.
     * 
     * @param {Vector4} blue - The blue component value of this Color.
     */
    set B(blue) {
        this._color.Z = blue;
    } 
    
    /**
     * Gets the blue component value.
     * 
     * @returns {Vector4} The blue component value of this Color.
     */
    get B() {
        return this._color.Z;
    }
    
    /**
     * Sets the green component value.
     * 
     * @param {Vector4} green - The green component value of this Color.
     */
    set G(green) {
        this._color.Y = green;
    } 
    
    /**
     * Gets the green component value.
     * 
     * @returns {Vector4} The green component value of this Color.
     */
    get G() {
        return this._color.Y;
    }
    
    /**
     * Sets the Red component value.
     * 
     * @param {Vector4} red - The red component value of this Color.
     */
    set R(red) {
        this._color.X = red;
    } 
    
    /**
     * Gets the red component value.
     * 
     * @returns {Vector4} The red component value of this Color.
     */
    get R() {
        return this._color.X;
    }
    
    /**
     * Gets the current color as a packed value.
     * 
     * @returns {Array} The current color.
     */
    get PackedValue() {
        return [this.R, this.G, this.B, this.A];
    }
    
    /**
     * Gets a system-defined color with the value R:0 G:0 B:0 A:255.
     * 
     * @returns {Color} A system-defined color with the value R:0 G:0 B:0 A:255.
     */
    static get Black() {
        return new JSXna.Framework.Color(new JSXna.Framework.Vector4(0.0, 0.0, 0.0, 1.0));
    }
    
    /**
     * Gets a system-defined color with the value R:0 G:0 B:255 A:255.
     * 
     * @returns {Color} A system-defined color with the value R:0 G:0 B:255 A:255.
     */
    static get Blue() {
        return new JSXna.Framework.Color(new JSXna.Framework.Vector4(0.3,  0.3,  1.0,  1.0));
    }
    
    /**
     * Gets a system-defined color with the value R:0 G:255 B:255 A:255.
     * 
     * @returns {Color} A system-defined color with the value R:0 G:255 B:255 A:255.
     */
    static get Cyan() {
        return new JSXna.Framework.Color(new JSXna.Framework.Vector4(0.3,  1.0,  1.0,  1.0));
    }
    
    /**
     * Gets a system-defined color with the value R:0 G:128 B:0 A:255.
     * 
     * @returns {Color} A system-defined color with the value R:0 G:128 B:0 A:255.
     */
    static get Green() {
        return new JSXna.Framework.Color(new JSXna.Framework.Vector4(0.3,  1.0,  0.3,  1.0));
    }
    
    /**
     * Gets a system-defined color with the value R:128 G:0 B:128 A:255.
     * 
     * @returns {Color} A system-defined color with the value R:128 G:0 B:128 A:255.
     */
    static get Purple() {
        return new JSXna.Framework.Color(new JSXna.Framework.Vector4(1.0,  0.3,  1.0,  1.0));
    }
    
    /**
     * Gets a system-defined color with the value R:255 G:0 B:0 A:255.
     * 
     * @returns {Color} A system-defined color with the value R:255 G:0 B:0 A:255.
     */
    static get Red() {
        return new JSXna.Framework.Color(new JSXna.Framework.Vector4(1.0,  0.3,  0.3,  1.0));
    }
    
    /**
     * Gets a system-defined color with the value R:255 G:255 B:255 A:255.
     * 
     * @returns {Color} A system-defined color with the value R:255 G:255 B:255 A:255.
     */
    static get White() {
        return new JSXna.Framework.Color(new JSXna.Framework.Vector4(1.0,  1.0,  1.0,  1.0));
    }
    
    /**
     * Gets a system-defined color with the value R:255 G:255 B:0 A:255.
     * 
     * @returns {Color} A system-defined color with the value R:255 G:255 B:0 A:255.
     */
    static get Yellow() {
        return new JSXna.Framework.Color(new JSXna.Framework.Vector4(1.0,  1.0,  0.3,  1.0));
    }
};
 
// Check if we already included this file...
if (!includeJSXnaColorFlag) {
    JSXnaLoadingStatus += 1;
    includeJSXnaColorFlag = true;
}