var includeJSXnaCubeFlag = (typeof includeJSXnaCubeFlag == "undefined") ? false : includeJSXnaCubeFlag;

/**
 * Basic model of a cube.
 *
 * @author Sébastien Bolduc <sebastien.bolduc@gmail.com>
 * @version 0.0
 */
 
/**
 * My namespace for cube.
 * (We take the time to check if all namespaces are already created)
 * @namespace JSXna.Engine.Model
 */
if (typeof JSXna == "undefined") {
    var JSXna = {};
}
if (typeof JSXna.Engine == "undefined") {
    JSXna.Engine = {};
}
if (typeof JSXna.Engine.Model == "undefined") {
    JSXna.Engine.Model = {};
}

/**
 * Basic model of a cube.
 */
JSXna.Engine.Model.Cube = class {
    /**
     * Creates a new instance of the class.
     */
    constructor() {
        
    }
};

// Check if we already included this file...
if (!includeJSXnaCubeFlag) {
    JSXnaLoadingStatus += 1;
    includeJSXnaCubeFlag = true;
}