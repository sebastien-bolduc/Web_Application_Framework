/**
 * Defines a rectangle.
 *
 * @author Sébastien Bolduc <sebastien.bolduc@gmail.com>
 * @version 0.3
 */

/**
 * My namespace for rectangle.
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
 * Defines a rectangle.
 */
JSXna.Framework.Rectangle = class {
    /**
     * Initializes a new instance of Rectangle.
     * 
     * @param {number} x - The x-coordinate of the rectangle.
     * @param {number} y - The y-coordinate of the rectangle.
     * @param {number} width - Width of the rectangle.
     * @param {number} height - Height of the rectangle.
     */
    constructor(x, y, width, height) {
        this.X = x;
        this.Y = y;
        this.Width = width;
        this.Height = height;
    }
    
    /**
     * Returns the x-coordinate of the left side of the rectangle.
     * 
     * @returns {number} The x-coordinate of the left side.
     */
    get Left() {
        return this.X;
    }
    
    /**
     * Returns the x-coordinate of the right side of the rectangle.
     * 
     * @returns {number} The x-coordinate of the right side.
     */
    get Right() {
        return this.X + this.Width;
    }
    
    /**
     * Returns the y-coordinate of the top of the rectangle.
     * 
     * @return {number} The y-coordinate of the top.
     */
    get Top() {
        return this.Y;
    }
    
    /**
     * Returns the y-coordinate of the bottom of the rectangle.
     * 
     * @return {number} The y-coordinate of the bottom.
     */
    get Bottom() {
        return this.Y + this.Height;
    }
    
    /**
     * Determines whether a specified Rectangle intersects with this Rectangle.
     * 
     * @returns {boolean} true if the specified Rectangle intersects with this one; false otherwise.
     */
    intersects(rectangle) {
        if (this.Left < rectangle.Right &&
            this.Right > rectangle.Left &&
            this.Top < rectangle.Bottom &&
            this.Bottom > rectangle.Top) {
                return true;
            }
        
        return false;
    }
};