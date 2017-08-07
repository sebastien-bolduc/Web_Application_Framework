var includeJSXnaVector4Flag = (typeof includeJSXnaVector4Flag == "undefined") ? false : includeJSXnaVector4Flag;

/**
 * Defines a vector with four components.
 *
 * @author Sébastien Bolduc <sebastien.bolduc@gmail.com>
 * @version 0.2
 */

/**
 * My namespace for vector 4.
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
 * Defines a vector with four components.
 */
JSXna.Framework.Vector4 = class {
    /**
     * Initializes a new instance of Vector4.
     */
    constructor(x = 0, y = 0, z = 0, w = 0) {
        this.vector = [x, y, z, w];
    }

    /**
     * Sets the x-component of the vector.
     *
     * @param {number} x - The x-component of the vector.
     */
    set X(x) {
        this.vector[0] = x;
    }

    /**
     * Gets the x-component of the vector.
     *
     * @returns {number} The x-component of the vector.
     */
    get X() {
        return this.vector[0];
    }

    /**
     * Sets the y-component of the vector.
     *
     * @param {number} y - The y-component of the vector.
     */
    set Y(y) {
        this.vector[1] = y;
    }

    /**
     * Gets the y-component of the vector.
     *
     * @returns {number} The y-component of the vector.
     */
    get Y() {
        return this.vector[1];
    }

    /**
     * Sets the z-component of the vector.
     *
     * @param {number} z = The z-component of the vector.
     */
    set Z(z) {
        this.vector[2] = z;
    }

    /**
     * Gets the z-component of the vector.
     *
     * @returns {number} The z-component of the vector.
     */
    get Z() {
        return this.vector[2];
    }

    /**
     * Sets the w-component of the vector.
     *
     * @param {number} w - The w-component of the vector.
     */
    set W(w) {
        this.vector[3] = w;
    }

    /**
     * Gets the w-component of the vector.
     *
     * @returns {number} The w-component of the vector.
     */
    get W() {
        return this.vector[3];
    }

    /**
     * Adds two vectors.
     *
     * @param {Vector4} v1 - Source vector.
     * @param {Vector4} v2 - Source vector.
     * @returns {Vector4} Sum of the two vectors.
     */
    static add(v1, v2) {
        var sum = v1.vector.map(JSXna.Framework.Vector4.op_Addition, v2);
        return new JSXna.Framework.Vector4(sum[0], sum[1], sum[2], sum[3]);
    }

    /**
     * Adds two vectors.
     *
     * @param {number} item - The current value in the vector.
     * @param {number} index - The current index in the vector.
     * @returns {number} Sum of the two value.
     */
    static op_Addition(item, index) {
        return item + this.vector[index];
    }

    /**
     * Calculates the dot product of two vectors.
     *
     * @param {Vector4} v1 - Source vector.
     * @param {Vector4} v2 - Source vector.
     * @returns {Number} The dot product of the two vectors.
     */
    static dot(v1, v2) {
        var product = v1.vector.map(JSXna.Framework.Vector4.op_Multiply, v2);
        return (product[0] + product[1] + product[2] + product[3]);
    }

    /**
     * Calculates the dot product of two vectors.
     *
     * @param {number} item - The current value in the vector.
     * @param {number} index - The current index in the vector.
     * @returns {number} Product of the two value.
     */
    static op_Multiply(item, index) {
        return item * this.vector[index];
    }
};

// Check if we already included this file...
if (!includeJSXnaVector4Flag) {
    JSXnaLoadingStatus += 1;
    includeJSXnaVector4Flag = true;
}