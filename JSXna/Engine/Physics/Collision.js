var includeJSXnaCollisionFlag = (typeof includeJSXnaCollisionFlag == "undefined") ? false : includeJSXnaCollisionFlag;

/**
 * Simple collision physic detection and resolution.
 *
 * @author Sébastien Bolduc <sebastien.bolduc@gmail.com>
 * @version 0.0
 */

JSXna.Utils.include['HTML']('/JSXna/Framework/BoundingBox.js');

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
    constructor(boundingBox) {
        this.referenceBB = boundingBox;
        this.referenceTestBB = undefined;
        this.listOfBB = [];
    }
    
    /**
     * Update the reference bounding box position.
     * 
     * @param {Boundingbox} boundingBox - The reference bounding box.
     */
    update() {
        this.referenceBB = new JSXna.Framework.BoundingBox(this.referenceTestBB.Min, this.referenceTestBB.Max);
    }
    
    testUpdate(boundingBox) {
        this.referenceTestBB = boundingBox;
    }
    
    /**
     * Add a bounding box to the list for the reference to check for.
     * 
     * @param {BoundingBox} boundingBox - A bounding box to compare to.
     */
    add(boundingBox) {
        this.listOfBB.push(boundingBox);
    }
    
    /**
     * Test for a collision.
     * 
     * @returns {Array} The list of element the reference collide with.
     */
    test() {
        var listOfCollision = [];
        
        this.listOfBB.forEach(function(element) {
            if (this.referenceTestBB.intersects(element)) {
                listOfCollision.push(element);
            }
        }, this);
        
        return listOfCollision;
    }
    
    /**
     * Try to resolve any collision by knowing the direction of the movement (vector)
     * and testing on every axis to find the new position.
     * 
     * @param {Array} list - The list of element the reference collide with.
     */
    resolution(list) {
        // vector...
        var referenceX = this.referenceTestBB.Max.X - this.referenceBB.Max.X;
        var referenceY = 0;
        var referenceZ = this.referenceTestBB.Max.Z - this.referenceBB.Max.Z;
        
        list.forEach(function(element) {
            var minX, maxX;
            var minZ, maxZ;
            
            var boundingBoxOnXaxis = new JSXna.Framework.BoundingBox(new JSXna.Framework.Vector4(this.referenceBB.Min.X + referenceX, this.referenceBB.Min.Y, this.referenceBB.Min.Z, 0),
                new JSXna.Framework.Vector4(this.referenceBB.Max.X + referenceX, this.referenceBB.Max.Y, this.referenceBB.Max.Z, 0));
            if (boundingBoxOnXaxis.intersects(element)) {
                if (referenceX < 0) {
                    minX = element.Max.X;
                    maxX = this.referenceTestBB.Max.X + (element.Max.X - this.referenceTestBB.Min.X); 
                } else if (referenceX > 0) {
                    minX = this.referenceTestBB.Min.X - (this.referenceTestBB.Max.X - element.Min.X);
                    maxX = element.Min.X;
                }
            } else {
                minX = this.referenceTestBB.Min.X;
                maxX = this.referenceTestBB.Max.X;
            }
            
            var boundingBoxOnZaxis = new JSXna.Framework.BoundingBox(new JSXna.Framework.Vector4(this.referenceBB.Min.X, this.referenceBB.Min.Y, this.referenceBB.Min.Z + referenceZ, 0),
                new JSXna.Framework.Vector4(this.referenceBB.Max.X, this.referenceBB.Max.Y, this.referenceBB.Max.Z + referenceZ, 0));
            if (boundingBoxOnZaxis.intersects(element)) {
                if (referenceZ < 0) {
                    minZ = element.Max.Z;
                    maxZ = this.referenceTestBB.Max.Z + (element.Max.Z - this.referenceTestBB.Min.Z); 
                } else if (referenceZ > 0) {
                    minZ = this.referenceTestBB.Min.Z - (this.referenceTestBB.Max.Z - element.Min.Z);
                    maxZ = element.Min.Z;
                }
            } else {
                minZ = this.referenceTestBB.Min.Z;
                maxZ = this.referenceTestBB.Max.Z;
            }
            
            this.referenceTestBB.Min = new JSXna.Framework.Vector4(minX, this.referenceTestBB.Min.Y, minZ, 0);
            this.referenceTestBB.Max = new JSXna.Framework.Vector4(maxX, this.referenceTestBB.Max.Y, maxZ, 0);
                
            referenceX = this.referenceTestBB.Max.X - this.referenceBB.Max.X;
            referenceY = 0;
            referenceZ = this.referenceTestBB.Max.Z - this.referenceBB.Max.Z;
        }, this);
    }
};

// Check if we already included this file...
if (!includeJSXnaCollisionFlag) {
    JSXnaLoadingStatus += 1;
    includeJSXnaCollisionFlag = true;
}