var includeJSXnaBoundingBoxFlag = (typeof includeJSXnaBoundingBoxFlag == "undefined") ? false : includeJSXnaBoundingBoxFlag;

/**
 * Defines an axis-aligned box-shaped 3D volume (AABB).
 *
 * @author Sébastien Bolduc <sebastien.bolduc@gmail.com>
 * @version 0.0
 */
 
JSXna.Utils.include['HTML']('/JSXna/Framework/Vector4.js');
 
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
 * Defines an axis-aligned box-shaped 3D volume (AABB).
 */
JSXna.Framework.BoundingBox = class {
    /**
     * Creates an instance of BoundingBox.
     * 
     * @param {Vector4} min - The minimum point the BoundingBox includes.
     * @param {Vector4} max - The maximum point the BoundingBox includes.
     */
    constructor(min, max) {
        this._min = min;
        this._max = max;
    }
    
    /**
     * The maximum point the BoundingBox contains.
     * 
     * @param {Vector4} max - The maximum point the BoundingBox includes.
     */
    set Max(max) {
        this._max = max;
    }
    
    /**
     * The maximum point the BoundingBox contains.
     * 
     * @returns {Vector4} The maximum point (upper-right corner of the front face 
     * of the BoundingBox when looking at it from the positive z direction).
     */
    get Max() {
        return this._max;
    }
    
    /**
     * The minimum point the BoundingBox contains.
     * 
     * @param {Vector4} min - The minimum point the BoundingBox includes.
     */
    set Min(min) {
        this._min = min;
    }
    
    /**
     * The minimum point the BoundingBox contains.
     * 
     * @returns {Vector4} The minimum point (lower-left corner of the back face 
     * of the BoundingBox when looking at it from the positive z direction).
     */
    get Min() {
        return this._min;
    }
    
    /**
     * Creates the smallest BoundingBox that will contain a group of points.
     * 
     * @param {Vector4} points - A list of points the BoundingBox should contain.
     * @return {BoundingBox} The created BoundingBox.
     */
    static createFromPoints(points = undefined) {
        var min, max;
        
        try {
            if (!Array.isArray(points)) {
                points = [new JSXna.Framework.Vector4()];
                throw "There are no points in points.";
            }
        }
        catch(err) {
            console.log("Error: " + err);
        }
        finally {
            min = new JSXna.Framework.Vector4(points[0].X, points[0].Y, points[0].Z, 0);
            max = new JSXna.Framework.Vector4(points[0].X, points[0].Y, points[0].Z, 0);
        
            for (var i = 0; i < points.length; i++) {
                if (points[i].X < min.X) min.X = points[i].X;
                if (points[i].Y < min.Y) min.Y = points[i].Y;
                if (points[i].Z < min.Z) min.Z = points[i].Z;
            
                if (points[i].X > max.X) max.X = points[i].X;
                if (points[i].Y > max.Y) max.Y = points[i].Y;
                if (points[i].Z > max.Z) max.Z = points[i].Z;
            }
        
            return new JSXna.Framework.BoundingBox(min, max);
        }
    }
    
    /**
     * Checks whether the current BoundingBox intersects another BoundingBox.
     * 
     * @param {BoundingBox} box - The BoundingBox to check for intersection with.
     * @returns {boolean} True if the BoundingBoxs intersect; false otherwise.
     */
    intersects(box) {
        return (this.Min.X <= box.Max.X && this.Max.X >= box.Min.X) &&
               (this.Min.Y <= box.Max.Y && this.Max.Y >= box.Min.Y) &&
               (this.Min.Z <= box.Max.Z && this.Max.Z >= box.Min.Z);
    }
};

// Check if we already included this file...
if (!includeJSXnaBoundingBoxFlag) {
    JSXnaLoadingStatus += 1;
    includeJSXnaBoundingBoxFlag = true;
}