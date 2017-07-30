var includeJSXnaContentManagerFlag = (typeof includeJSXnaContentManagerFlag == "undefined") ? false : includeJSXnaContentManagerFlag;

/**
 * The ContentManager is the run-time component which loads managed objects from 
 * the binary files produced by the design time content pipeline. It also manages 
 * the lifespan of the loaded objects, disposing the content manager will also 
 * dispose any assets which are themselves IDisposable.
 * 
 * @author Sébastien Bolduc <sebastien.bolduc@gmail.com>
 * @version 0.2
 */

JSXna.Utils.include['HTML']('/JSXna/Framework/Graphics/Shader/Shader.js');
JSXna.Utils.include['HTML']('/JSXna/Framework/Graphics/Shader/ShaderProgram.js');

/**
 * My namespace for content manager.
 * (We take the time to check if all namespaces are already created)
 * @namespace JSXna.Framework.Content
 */
if (typeof JSXna == "undefined") {
    var JSXna = {};
}
if (typeof JSXna.Framework == "undefined") {
    JSXna.Framework = {};
}
if (typeof JSXna.Framework.Content == "undefined") {
    JSXna.Framework.Content = {};
}

/**
 * Loads managed objects from the binary files produced by the design time 
 * content pipeline. It also manages the lifespan of the loaded objects.
 */
JSXna.Framework.Content.ContentManager = class {
    /**
     * Initializes a new instance of ContentManager.
     */
    constructor() { 
        this._rootDirectory = undefined;
    }
    
    /**
     * Sets the root directory associated with this ContentManager.
     * 
     * @param {string} rootDirectory - The root directory for content.
     */
    set RootDirectory(rootDirectory) {
        this._rootDirectory = rootDirectory;
    }
    
    /**
     * Gets the root directory associated with this ContentManager.
     * 
     * @returns {string} The root directory for content.
     */
    get RootDirectory() {
        return this._rootDirectory;
    }
    
    /**
     * Get a file from the url address.
     * 
     * @param {string} url - Path to file.
     * 
     * @returns {string} File's content.
     */
    static getFile(url) {
        var ajax = new XMLHttpRequest();
        var file = undefined;
        ajax.open( 'GET', url, false ); // <-- the 'false' makes it synchronous
        ajax.onreadystatechange = function () {
            file = ajax.response || ajax.responseText;
            if (ajax.readyState === 4) {
                switch( ajax.status) {
                    case 200:
                        console.log("file loaded: ", url);
                        break;
                    default:
                        console.log("ERROR: file not loaded: ", url);
                }
            }
        };
        ajax.send(null);
        
        return file;
    }
};


/**
 * Loads an asset that has been processed by the Content Pipeline.
 * 
 * @param {string} url - Path to the asset to load.
 * @example
 * // load '/js/asset.fx'
 * JSXna.Framework.Content.ContentManager.load['Effect']('/js/asset.fx');
 */
JSXna.Framework.Content.ContentManager.prototype.load = {

    /**
     * Load the shaders.
     * 
     * @param {WebGL context} gl - The WebGL context to work with.
     * @param {string} fragmentShaderUrl - Path to fragment shader file.
     * @param {string} vertexShaderUrl - Path to vertex shader file.
     * 
     * @todo Check if we can make the operator 'this' work in that function.
     */
    ['Effect'](gl, fragmentShaderUrl, vertexShaderUrl) {
        var fragmentShader = new JSXna.Framework.Graphics.Shader.Shader(gl, gl.FRAGMENT_SHADER, JSXna.Framework.Content.ContentManager.getFile(fragmentShaderUrl));
        var fShaderHandle = fragmentShader.ShaderHandle;
        var vertexShader = new JSXna.Framework.Graphics.Shader.Shader(gl, gl.VERTEX_SHADER, JSXna.Framework.Content.ContentManager.getFile(vertexShaderUrl));
        var vShaderHandle = vertexShader.ShaderHandle;
        
        var program = new JSXna.Framework.Graphics.Shader.ShaderProgram(gl);
        program.linkProgram(fShaderHandle, vShaderHandle);
        return program.ProgramHandle;
    }
        
};

if (!includeJSXnaContentManagerFlag) {
    JSXnaLoadingStatus += 1;   
    includeJSXnaContentManagerFlag = true;
}