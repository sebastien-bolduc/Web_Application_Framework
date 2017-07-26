/**
 * This will be our game application.
 *
 * @author Sébastien Bolduc <sebastien.bolduc@gmail.com>
 * @version 0.1
 */

JSXna.Utils.include['AJAX']('/JSXna/Framework/Game.js');
JSXna.Utils.include['AJAX']('/JSXna/Framework/GraphicsDeviceManager.js');

/**
 * My namespace for the application.
 * (We take the time to check if all namespaces are already created)
 * @namespace MyFirstApplication
 */
if (typeof MyFirstApplication == "undefined") {
    var MyFirstApplication = {};
}

/**
 * This is the main type for your game.
 */
MyFirstApplication.Game1 = class extends JSXna.Framework.Game {
    constructor() {
        super();
        
        this.graphics = new JSXna.Framework.GraphicsDeviceManager();
        this.Content.RootDirectory = "/Content/";
        
        this.myShader;
        this.positionLocation = undefined;
        this.positionBuffer = undefined;
        
        this.x1 = -0.5; this.x2 = 0.5;
        this.y1 = -0.5; this.y2 = 0.5;
        this.xSpeed = 0.5; this.ySpeed = 0.15;
    }
    
    /**
     * Allows the game to perform any initialization it needs to before starting to run.
     * This is where it can query for any required services and load any non-graphic
     * related content.  Calling base.Initialize will enumerate through any components
     * and initialize them as well.
     */
    initialize() {
        // TODO: Add your initialization logic here
        var gl = this.graphics.GraphicsDevice.Adapter.DefaultAdapter;
        this.positionBuffer = gl.createBuffer();
        
        super.initialize();  //This is the function we override in the parent.
    }
    
    /**
     * Called when graphics resources need to be loaded.
     */
    loadContent() {
        var gl = this.graphics.GraphicsDevice.Adapter.DefaultAdapter;
        
        // Load our default shader...
        this.myShader = this.Content.load['Effect'](gl, this.Content.RootDirectory + "FragmentShader.fx", this.Content.RootDirectory + "VertexShader.fx");
        
        // ...and set the attributes.
        this.positionLocation = gl.getAttribLocation(this.myShader, "a_position");
    }
    
    /**
     * UnloadContent will be called once per game and is the place to unload
     * all content.
     */
    unloadContent() {
        // TODO: Unload any non ContentManager content here
    }
    
    /**
     * Called when the game has determined that game logic needs to be processed.
     */
    update(gameTime) {
        var gl = this.graphics.GraphicsDevice.Adapter.DefaultAdapter;
        
        // ---------------------------------------------------------------------
        var elapsedGameTime = gameTime.ElapsedGameTime.totalSeconds;
        this.x1 += this.xSpeed * elapsedGameTime; this.x2 += this.xSpeed * elapsedGameTime;
        this.y1 += this.ySpeed * elapsedGameTime; this.y2 += this.ySpeed * elapsedGameTime;
        
        if (this.x2 > 1) {
            this.xSpeed *= -1;
            this.x1 = 0; this.x2 = 1;
        } else if (this.x1 < -1) {
            this.xSpeed *= -1;
            this.x1 = -1; this.x2 = 0;
        }
        
        if (this.y2 > 1) {
            this.ySpeed *= -1;
            this.y1 = 0; this.y2 = 1;
        } else if (this.y1 < -1) {
            this.ySpeed *= -1;
            this.y1 = -1; this.y2 = 0;
        }
        
        var vertices = [this.x1, this.y2,
                        this.x1, this.y1,
                        this.x2, this.y2,
                        this.x2, this.y2,
                        this.x1, this.y1,
                        this.x2, this.y1];
        // ---------------------------------------------------------------------
        
        gl.enableVertexAttribArray(this.positionLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        
        super.update(gameTime);  //This is the function we override in the parent.
    }
    
    /**
     * Called when the game determines it is time to draw a frame.
     */
    draw(gameTime) {
        var gl = this.graphics.GraphicsDevice.Adapter.DefaultAdapter;
        
        this.graphics.GraphicsDevice.clear();
        
        gl.vertexAttribPointer(this.positionLocation, 2, gl.FLOAT, false, 0, 0);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        
        super.draw(gameTime);  //This is the function we override in the parent.
    }
};