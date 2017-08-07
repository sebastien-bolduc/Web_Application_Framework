var includeJSXnaMatrixFlag = (typeof includeJSXnaMatrixFlag == "undefined") ? false : includeJSXnaMatrixFlag;

/**
 * Defines a matrix.
 *
 * @author Sébastien Bolduc <sebastien.bolduc@gmail.com>
 * @version 0.1
 */

JSXna.Utils.include['HTML']('/JSXna/Framework/Vector4.js');

/**
 * My namespace for matrix.
 * (We take the time to check if all namespaces are already created)
 * @namespace
 */
if (typeof JSXna == "undefined") {
    var JSXna = {};
}
if (typeof JSXna.Framework == "undefined") {
    JSXna.Framework = {};
}

/**
 * Defines a matrix.
 */
JSXna.Framework.Matrix = class {
    /**
     * Initializes a new instance of Matrix.
     *
     * @param {Array} m - Value to initialize matrix to.
     */
    constructor(m = []) {
        this.matrix = m;
    }

    /**
     * Returns an instance of the identity matrix.
     * 
     * @returns {Matrix} The identity matrix.
     */
    static identity() {
        var identity = {};

        // First row
        var row1 = new JSXna.Framework.Vector4();
        row1.X = 1;
        // Second row
        var row2 = new JSXna.Framework.Vector4();
        row2.Y = 1;
        // Third row
        var row3 = new JSXna.Framework.Vector4();
        row3.Z = 1;
        // Fourth row
        var row4 = new JSXna.Framework.Vector4();
        row4.W = 1;

        identity = new JSXna.Framework.Matrix(row1.vector.concat(row2.vector.concat(row3.vector.concat(row4.vector))));

        return identity;
    }

    /**
     * Creates a translation Matrix.
     *
     * @param {number} x - Value to translate by on the x-axis.
     * @param {number} y - Value to translate by on the y-axis.
     * @param {number} z - Value to translate by on the z-axis.
     * @returns {Matrix} The created translation Matrix.
     */
    static createTranslation(x, y, z) {
        var translation = JSXna.Framework.Matrix.identity();

        // The way matrix are specifies in Real World...
        /*translation.matrix[3] = x;
        translation.matrix[7] = y;
        translation.matrix[11] = z;*/
        
        // The way matrix are specifies in OpenGL...
        translation.matrix[12] = x;
        translation.matrix[13] = y;
        translation.matrix[14] = z;

        return translation;
    }

    /**
     * Returns a matrix that can be used to rotate a set of vertices 
     * around the x-axis.
     *
     * @param {number} radians - The amount, in radians, in which to rotate around the x-axis.
     * @returns {Matrix} The rotation matrix.
     */
    static createRotationX(radians) {
        var rotation = JSXna.Framework.Matrix.identity();

        rotation.matrix[5] = Math.cos(radians);
        rotation.matrix[6] = -Math.sin(radians);
        rotation.matrix[9] = Math.sin(radians);
        rotation.matrix[10] = Math.cos(radians);

        return rotation;
    }

    /**
     * Returns a matrix that can be used to rotate a set of vertices 
     * around the y-axis.
     *
     * @param {number} radians - The amount, in radians, in which to rotate around the y-axis.
     * @returns {Matrix} The rotation matrix.
     */
    static createRotationY(radians) {
        var rotation = JSXna.Framework.Matrix.identity();

        rotation.matrix[0] = Math.cos(radians);
        rotation.matrix[2] = Math.sin(radians);
        rotation.matrix[8] = -Math.sin(radians);
        rotation.matrix[10] = Math.cos(radians);

        return rotation;
    }

    /**
     * Returns a matrix that can be used to rotate a set of vertices 
     * around the z-axis.
     *
     * @param {number} radians - The amount, in radians, in which to rotate around the z-axis.
     * @returns {Matrix} The rotation matrix.
     */
    static createRotationZ(radians) {
        var rotation = JSXna.Framework.Matrix.identity();

        rotation.matrix[0] = Math.cos(radians);
        rotation.matrix[1] = -Math.sin(radians);
        rotation.matrix[4] = Math.sin(radians);
        rotation.matrix[5] = Math.cos(radians);

        return rotation;
    }

    /**
     * Creates a scaling Matrix.
     *
     * @param {number} x - Value to scale by on the x-axis.
     * @param {number} y - Value to scale by on the y-axis.
     * @param {number} z - Value to scale by on the z-axis.
     * @returns {Matrix} The created scaling Matrix.
     */
    static createScale(x, y, z) {
        var scale = JSXna.Framework.Matrix.identity();

        scale.matrix[0] = x;
        scale.matrix[5] = y;
        scale.matrix[10] = z;

        return scale;
    }

    /**
     * Builds a perspective projection matrix based on a field of view
     * and returns by value.
     *
     * @param {number} fieldOfView - Field of view in the y direction, in radians.
     * @param {number} aspectRatio - Aspect ratio, defined as view space width divided by height.
     * @param {number} nearPlaneDistance - Distance to the near view plane.
     * @param {number} farPlaneDistance - Distance to the far view plane.
     * @returns {Matrix} The perspective projection matrix.
     */
    static createPerspectiveFieldOfView(fieldOfView, aspectRatio, nearPlaneDistance, farPlaneDistance) {
        var perspective = JSXna.Framework.Matrix.identity();
        var f = 1.0 / Math.tan(fieldOfView / 2);
        var rangeInv = 1 / (nearPlaneDistance - farPlaneDistance);

        // Flipping of the z axis...
        perspective.matrix[0] = f / aspectRatio;
        perspective.matrix[5] = f;
        perspective.matrix[10] = (nearPlaneDistance + farPlaneDistance) * rangeInv;
        perspective.matrix[11] = -1;
        perspective.matrix[14] = nearPlaneDistance * farPlaneDistance * rangeInv * 2;
        perspective.matrix[15] = 0;

        return perspective;
    }

    /**
     * Calculates the inverse of a matrix.
     *
     * @param {Matrix} matrix - Source matrix.
     * @returns {Matrix} The inverse of the matrix.
     *
     * @todo This is a really unoptimize way of doing this, needs work...
     */
    static invert(matrix) {
        var inv = [];
        var invOut = [];
        var det = 0;
        var m = matrix.matrix;

        inv[0] = m[5] * m[10] * m[15] -
            m[5] * m[11] * m[14] -
            m[9] * m[6] * m[15] +
            m[9] * m[7] * m[14] +
            m[13] * m[6] * m[11] -
            m[13] * m[7] * m[10];

        inv[4] = -m[4] * m[10] * m[15] +
            m[4] * m[11] * m[14] +
            m[8] * m[6] * m[15] -
            m[8] * m[7] * m[14] -
            m[12] * m[6] * m[11] +
            m[12] * m[7] * m[10];

        inv[8] = m[4] * m[9] * m[15] -
            m[4] * m[11] * m[13] -
            m[8] * m[5] * m[15] +
            m[8] * m[7] * m[13] +
            m[12] * m[5] * m[11] -
            m[12] * m[7] * m[9];

        inv[12] = -m[4] * m[9] * m[14] +
            m[4] * m[10] * m[13] +
            m[8] * m[5] * m[14] -
            m[8] * m[6] * m[13] -
            m[12] * m[5] * m[10] +
            m[12] * m[6] * m[9];

        inv[1] = -m[1] * m[10] * m[15] +
            m[1] * m[11] * m[14] +
            m[9] * m[2] * m[15] -
            m[9] * m[3] * m[14] -
            m[13] * m[2] * m[11] +
            m[13] * m[3] * m[10];

        inv[5] = m[0] * m[10] * m[15] -
            m[0] * m[11] * m[14] -
            m[8] * m[2] * m[15] +
            m[8] * m[3] * m[14] +
            m[12] * m[2] * m[11] -
            m[12] * m[3] * m[10];

        inv[9] = -m[0] * m[9] * m[15] +
            m[0] * m[11] * m[13] +
            m[8] * m[1] * m[15] -
            m[8] * m[3] * m[13] -
            m[12] * m[1] * m[11] +
            m[12] * m[3] * m[9];

        inv[13] = m[0] * m[9] * m[14] -
            m[0] * m[10] * m[13] -
            m[8] * m[1] * m[14] +
            m[8] * m[2] * m[13] +
            m[12] * m[1] * m[10] -
            m[12] * m[2] * m[9];

        inv[2] = m[1] * m[6] * m[15] -
            m[1] * m[7] * m[14] -
            m[5] * m[2] * m[15] +
            m[5] * m[3] * m[14] +
            m[13] * m[2] * m[7] -
            m[13] * m[3] * m[6];

        inv[6] = -m[0] * m[6] * m[15] +
            m[0] * m[7] * m[14] +
            m[4] * m[2] * m[15] -
            m[4] * m[3] * m[14] -
            m[12] * m[2] * m[7] +
            m[12] * m[3] * m[6];

        inv[10] = m[0] * m[5] * m[15] -
            m[0] * m[7] * m[13] -
            m[4] * m[1] * m[15] +
            m[4] * m[3] * m[13] +
            m[12] * m[1] * m[7] -
            m[12] * m[3] * m[5];

        inv[14] = -m[0] * m[5] * m[14] +
            m[0] * m[6] * m[13] +
            m[4] * m[1] * m[14] -
            m[4] * m[2] * m[13] -
            m[12] * m[1] * m[6] +
            m[12] * m[2] * m[5];

        inv[3] = -m[1] * m[6] * m[11] +
            m[1] * m[7] * m[10] +
            m[5] * m[2] * m[11] -
            m[5] * m[3] * m[10] -
            m[9] * m[2] * m[7] +
            m[9] * m[3] * m[6];

        inv[7] = m[0] * m[6] * m[11] -
            m[0] * m[7] * m[10] -
            m[4] * m[2] * m[11] +
            m[4] * m[3] * m[10] +
            m[8] * m[2] * m[7] -
            m[8] * m[3] * m[6];

        inv[11] = -m[0] * m[5] * m[11] +
            m[0] * m[7] * m[9] +
            m[4] * m[1] * m[11] -
            m[4] * m[3] * m[9] -
            m[8] * m[1] * m[7] +
            m[8] * m[3] * m[5];

        inv[15] = m[0] * m[5] * m[10] -
            m[0] * m[6] * m[9] -
            m[4] * m[1] * m[10] +
            m[4] * m[2] * m[9] +
            m[8] * m[1] * m[6] -
            m[8] * m[2] * m[5];

        det = m[0] * inv[0] + m[1] * inv[4] + m[2] * inv[8] + m[3] * inv[12];

        det = 1.0 / det;

        for (var i = 0; i < 16; i++) {
            invOut[i] = inv[i] * det;
        }

        return new JSXna.Framework.Matrix(invOut);
    }

    /**
     * Multiplies a matrix by another matrix.
     * (4 X 4 ONLY!!!)
     *
     * @param {Matrix} m1 - Source matrix.
     * @param {Matrix} m2 - Source matrix.
     * @returns {Matrix} Result of the multiplication.
     */
    static multiply(m1, m2) {
        var matrix = [];
        var slice = [];

        // First row
        slice = m1.matrix.slice(0, 4);
        matrix = matrix.concat(JSXna.Framework.Matrix.op_Multiply(slice, m2));
        // Second row
        slice = m1.matrix.slice(4, 8);
        matrix = matrix.concat(JSXna.Framework.Matrix.op_Multiply(slice, m2));
        // Third row
        slice = m1.matrix.slice(8, 12);
        matrix = matrix.concat(JSXna.Framework.Matrix.op_Multiply(slice, m2));
        // Fourth row
        slice = m1.matrix.slice(12, 16);
        matrix = matrix.concat(JSXna.Framework.Matrix.op_Multiply(slice, m2));

        return new JSXna.Framework.Matrix(matrix);
    }

    /**
     * Multiplies a vector(array) by a matrix.
     * (1 X 4 ONLY!!!)
     * 
     * @param {Array} slice - Source vector(array).
     * @param {Matrix} m2 - Source matrix.
     * @returns {Array} Result of the multiplication.
     */
    static op_Multiply(slice, m2) {
        var row = [];
        var value = 0;

        for (var c = 0; c < 4; c++) {
            for (var i = 0; i < 4; i++) {
                value += slice[i] * m2.matrix[(i * 4) + c];
            }
            row.push(value);
            value = 0;
        }

        return row;
    }
};

// Check if we already included this file...
if (!includeJSXnaMatrixFlag) {
    JSXnaLoadingStatus += 1;
    includeJSXnaMatrixFlag = true;
}