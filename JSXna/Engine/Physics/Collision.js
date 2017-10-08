var includeJSXnaCollisionFlag = (typeof includeJSXnaCollisionFlag == "undefined") ? false : includeJSXnaCollisionFlag;

/**
 * Simple collision physic detection and resolution.
 *
 * @author Sébastien Bolduc <sebastien.bolduc@gmail.com>
 * @version 0.0
 */

JSXna.Utils.include['HTML']('/JSXna/Framework/BoundingBox.js');
JSXna.Utils.include['HTML']('/JSXna/Framework/Vector4.js');

/**
 * My namespace for collision.
 * (We take the time to check if all namespaces are already created)
 * @namespace JSXna.Engine.Physics
 */
if (typeof JSXna == "undefined") {
    var JSXna = {};
}
if (typeof JSXna.Engine == "undefined") {
    JSXna.Engine = {};
}
if (typeof JSXna.Engine.Physics == "undefined") {
    JSXna.Engine.Physics = {};
}

/**
 * Simple collision physic detection and resolution. 
 */
JSXna.Engine.Physics.Collision = class {
    /**
     * Creates a new instance of the class.
     * 
     * @param {Boundingbox} boundingBox - The reference bounding box.
     */
    constructor(boundingBox = undefined) {
        if (boundingBox != "undefined") {
            this.boundingBox = new JSXna.Framework.BoundingBox(boundingBox.Min, boundingBox.Max);
        } else {
            this.boundingBox = undefined;
        }
        this.listOfBoundingBox = [];
    }
    
    /**
     * The bounding box this collision object is dealing with.
     * 
     * @returns {BoundingBox} The bounding box for this object.
     */
    get BoundingBox() {
        return this.boundingBox;
    }
    
    /**
     * Update the reference bounding box position.
     * 
     * @param {Boundingbox} newBoundingBox - The new bounding box.
     */
    update(newBoundingBox) {
        this.boundingBox.Min = newBoundingBox.Min;
        this.boundingBox.Max = newBoundingBox.Max;
    }
    
    /**
     * Add a bounding box to the list to check for.
     * 
     * @param {BoundingBox} boundingBox - A bounding box to compare to.
     */
    add(boundingBox) {
        this.listOfBoundingBox.push(boundingBox);
    }
    
    /**
     * Test for a collision.
     * 
     * @param {BoundingBox} newBoundingBox - The new bounding box position to test collision for.
     * @returns {Array} The list of element we might collide with.
     */
    test(newBoundingBox) {
        var listOfCollision = [];
        
        this.listOfBoundingBox.forEach(function(element) {
            if (newBoundingBox.intersects(element)) {
                listOfCollision.push(element);
            }
        });
        
        return listOfCollision;
    }
    
    /**
     * Try to resolve any collision by knowing the direction of the movement (vector)
     * and testing on every axis to find the new position.
     * 
     * @param {BoundingBox} oldBoundingBox - The last position of the bounding box we're checking.
     * @param {BoundingBox} newBoundingBox - The new position of the bounding box we're checking.
     * @param {Array} listOfCollision - The list of element the new bounding box collide with.
     * @returns {BoundingBox} The current non colliding bouding box.
     */
    resolution(oldBoundingBox, newBoundingBox, listOfCollision) {
        // Get the orientation vector...
        var axis_X = newBoundingBox.Max.X - oldBoundingBox.Max.X;
        var axis_Y = newBoundingBox.Max.Y - oldBoundingBox.Max.Y;
        var axis_Z = newBoundingBox.Max.Z - oldBoundingBox.Max.Z;
        
        // Create a current bounding box that will be update by the loop...
        var currentBoundingBox = new JSXna.Framework.BoundingBox(newBoundingBox.Min, newBoundingBox.Max);
        
        // This loop resolve every collision in the list...
        listOfCollision.forEach(function(element) {
            var min_X, max_X;
            var min_Y, max_Y;
            var min_Z, max_Z;
            
            // Resolve the collision on the X axis if needed...
            // (this is costly)
            var boundingBoxOnXaxis = new JSXna.Framework.BoundingBox(new JSXna.Framework.Vector4(oldBoundingBox.Min.X + axis_X,
                oldBoundingBox.Min.Y, oldBoundingBox.Min.Z),
                new JSXna.Framework.Vector4(oldBoundingBox.Max.X + axis_X, oldBoundingBox.Max.Y, oldBoundingBox.Max.Z));
            
            // If this bounding box intersect, then adjust it depending on the orientation vector...
            if (boundingBoxOnXaxis.intersects(element)) {
                if (axis_X < 0) {
                    min_X = element.Max.X;
                    max_X = currentBoundingBox.Max.X + (element.Max.X - currentBoundingBox.Min.X); 
                } else if (axis_X > 0) {
                    min_X = currentBoundingBox.Min.X - (currentBoundingBox.Max.X - element.Min.X);
                    max_X = element.Min.X;
                }
            } else {
                min_X = currentBoundingBox.Min.X;
                max_X = currentBoundingBox.Max.X;
            }
            
            // Resolve the collision on the Y axis if needed...
            // (this is costly)
            var boundingBoxOnYaxis = new JSXna.Framework.BoundingBox(new JSXna.Framework.Vector4(oldBoundingBox.Min.X,
                oldBoundingBox.Min.Y + axis_Y, oldBoundingBox.Min.Z),
                new JSXna.Framework.Vector4(oldBoundingBox.Max.X, oldBoundingBox.Max.Y + axis_Y, oldBoundingBox.Max.Z));
            
            // If this bounding box intersect, then adjust it depending on the orientation vector...
            if (boundingBoxOnYaxis.intersects(element)) {
                if (axis_Y < 0) {
                    min_Y = element.Max.Y;
                    max_Y = currentBoundingBox.Max.Y + (element.Max.Y - currentBoundingBox.Min.Y); 
                } else if (axis_Y > 0) {
                    min_Y = currentBoundingBox.Min.Y - (currentBoundingBox.Max.Y - element.Min.Y);
                    max_Y = element.Min.Y;
                }
            } else {
                min_Y = currentBoundingBox.Min.Y;
                max_Y = currentBoundingBox.Max.Y;
            }
            
            // Resolve the collision on the Z axis if needed...
            // (this is costly)
            var boundingBoxOnZaxis = new JSXna.Framework.BoundingBox(new JSXna.Framework.Vector4(oldBoundingBox.Min.X,
                oldBoundingBox.Min.Y, oldBoundingBox.Min.Z  + axis_Z),
                new JSXna.Framework.Vector4(oldBoundingBox.Max.X, oldBoundingBox.Max.Y, oldBoundingBox.Max.Z + axis_Z));
            
            // If this bounding box intersect, then adjust it depending on the orientation vector...
            if (boundingBoxOnZaxis.intersects(element)) {
                if (axis_Z < 0) {
                    min_Z = element.Max.Z;
                    max_Z = currentBoundingBox.Max.Z + (element.Max.Z - currentBoundingBox.Min.Z); 
                } else if (axis_Z > 0) {
                    min_Z = currentBoundingBox.Min.Z - (currentBoundingBox.Max.Z - element.Min.Z);
                    max_Z = element.Min.Z;
                }
            } else {
                min_Z = currentBoundingBox.Min.Z;
                max_Z = currentBoundingBox.Max.Z;
            }
            
            // Update the current bounding box to reflect the change...
            currentBoundingBox.Min = new JSXna.Framework.Vector4(min_X, min_Y, min_Z, 0);
            currentBoundingBox.Max = new JSXna.Framework.Vector4(max_X, max_Y, max_Z, 0);
            
            // Update the orientation vector for the next pass...    
            axis_X = currentBoundingBox.Max.X - oldBoundingBox.Max.X;
            axis_Y = currentBoundingBox.Max.Y - oldBoundingBox.Max.Y;
            axis_Z = currentBoundingBox.Max.Z - oldBoundingBox.Max.Z;
        }, this);
        
        return currentBoundingBox;
    }
};

// Check if we already included this file...
if (!includeJSXnaCollisionFlag) {
    JSXnaLoadingStatus += 1;
    includeJSXnaCollisionFlag = true;
}