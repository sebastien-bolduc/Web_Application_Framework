var includeJSXnaBasicEffectFlag = (typeof includeJSXnaBasicEffectFlag == "undefined") ? false : includeJSXnaBasicEffectFlag;

/**
 * Contains a basic rendering effect.
 *
 * @author Sébastien Bolduc <sebastien.bolduc@gmail.com>
 * @version 0.0
 */

JSXna.Utils.include['HTML']('/JSXna/Framework/Matrix.js');
JSXna.Utils.include['HTML']('/JSXna/Framework/Vector4.js');

/**
 * My namespace for basic effect.
 * (We take the time to check if all namespaces are already created)
 * @namespace JSXna.Engine
 */
if (typeof JSXna == "undefined") {
    var JSXna = {};
}
if (typeof JSXna.Engine == "undefined") {
    JSXna.Engine = {};
}

/**
 * Contains a basic rendering effect.
 */
JSXna.Engine.BasicEffect = class {
    /**
     * Creates an instance of this object.
     */
    constructor() {
        this._projection = undefined;
        this._view = undefined;
        this._world = undefined;
    }
    
    /**
     * Gets the projection matrix. Use this matrix to change how a 3D image is 
     * converted to a 2D image that is rendered to the computer screen.
     */
    get Projection() {
        return this._projection;
    }
    
    /**
     * Gets the view matrix. Use this matrix to change the position and 
     * direction of the camera.
     */
    get View() {
        return this._view;
    }
    
    /**
     * Create a projection matrix.
     * 
     * @param {number} fieldOfViewInRadians - Field of view in the y direction, in radians.
     * @param {number} aspectRatio - Aspect ratio, defined as view space width divided by height.
     * @param {number} nearClippingPlaneDistance - Distance to the near view plane.
     * @param {number} farClippingPlaneDistance - Distance to the far view plane.
     */
    createProjection(fieldOfViewInRadians, aspectRatio, nearClippingPlaneDistance, farClippingPlaneDistance) {
        this._projection = JSXna.Framework.Matrix.createPerspectiveFieldOfView(fieldOfViewInRadians, aspectRatio, nearClippingPlaneDistance, farClippingPlaneDistance);
    }
     
    /**
     * Create a view matrix (fps style).
     * 
     * @param {Vector4} cameraVector - Position of the camera in the world.
     * @param {number} yaw - Angle of rotation, in radians, around the y-axis.
     * @param {number} pitch - Angle of rotation, in radians, around the x-axis.
     * @param {number} roll - Angle of rotation, in radians, around the z-axis.
     */
    createView(cameraVector, yaw, pitch, roll) {
        // Position of the eye.
        var position = JSXna.Framework.Matrix.createTranslation(cameraVector.X, cameraVector.Y, cameraVector.Z);
         
        // Rotate to where we are looking.
        var rotation = JSXna.Framework.Matrix.createFromYawPitchRoll(yaw, pitch, roll);
         
        // Multiply together, make sure and read them in opposite order
        var view = JSXna.Framework.Matrix.multiply(rotation, position);
        
        // Inverse the operation for camera movements, because we are actually
        // moving geometry in the scene, not the camera itself.
        this._view = JSXna.Framework.Matrix.invert(view);
    }
};

// Check if we already included this file...
if (!includeJSXnaBasicEffectFlag) {
    JSXnaLoadingStatus += 1;
    includeJSXnaBasicEffectFlag = true;
}