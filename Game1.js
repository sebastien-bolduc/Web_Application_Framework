var includeJSXnaGame1Flag = (typeof includeJSXnaGame1Flag == "undefined") ? false : includeJSXnaGame1Flag;

/**
 * This will be our game application.
 *
 * @author Sébastien Bolduc <sebastien.bolduc@gmail.com>
 * @version 0.1
 */

document.addEventListener("JSXnaGameLoaded", classJSXnaGame1, false);

JSXna.Utils.include['HTML']('/JSXna/Framework/Game.js');
JSXna.Utils.include['HTML']('/JSXna/Framework/GraphicsDeviceManager.js');
JSXna.Utils.include['HTML']('/JSXna/Framework/Input/Mouse.js');
JSXna.Utils.include['HTML']('/JSXna/Framework/Rectangle.js');

/**
 * My namespace for the application.
 * (We take the time to check if all namespaces are already created)
 * @namespace MyFirstApplication
 */
if (typeof MyFirstApplication == "undefined") {
    var MyFirstApplication = {};
}


function classJSXnaGame1(e) {
    document.removeEventListener("JSXnaGameLoaded", classJSXnaGame1, false);
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

            this.x1 = -0.5;
            this.x2 = 0.5;
            this.y1 = -0.5;
            this.y2 = 0.5;
            this.xSpeed = 0.5;
            this.ySpeed = 0.15;

            this.mouseInput = undefined;
            this.rectangle = undefined;
            this.mousePointer = undefined;
            this.intersectsFlag = false;
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
            this.mouseInput = new JSXna.Framework.Input.Mouse();

            // Create our 2D bounding box...
            this.rectangle = new JSXna.Framework.Rectangle(this.x1, this.y1, 1, 1);
            this.mousePointer = new JSXna.Framework.Rectangle(0, 0, 0.001, 0.001);

            super.initialize(); //This is the function we override in the parent.
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

            // .. and update our 2D bounding box.
            this.rectangle.X = this.x1;
            this.rectangle.Y = this.y1;
            this.mousePointer.X = (this.mouseInput.GetState.X / 320) - 1;
            this.mousePointer.Y = -((this.mouseInput.GetState.Y / 240) - 1);

            if (this.mouseInput.GetState.LeftButton || this.mouseInput.GetState.RightButton) {
                // Check to see if we click the rectangle and update is position according to the mouse pointer.
                if (this.mousePointer.intersects(this.rectangle) || this.intersectsFlag) {
                    this.x1 = this.mousePointer.Left - 0.5;
                    this.x2 = (this.x1 + 1);
                    this.y2 = this.mousePointer.Top + 0.5;
                    this.y1 = this.y2 - 1;
                    this.intersectsFlag = true;
                }
            }
            else {
                this.intersectsFlag = false;
                // ---------------------------------------------------------------------
                var elapsedGameTime = gameTime.ElapsedGameTime.totalSeconds;
                this.x1 += this.xSpeed * elapsedGameTime;
                this.x2 += this.xSpeed * elapsedGameTime;
                this.y1 += this.ySpeed * elapsedGameTime;
                this.y2 += this.ySpeed * elapsedGameTime;

                if (this.x2 > 1) {
                    this.xSpeed *= -1;
                    this.x1 = 0;
                    this.x2 = 1;
                }
                else if (this.x1 < -1) {
                    this.xSpeed *= -1;
                    this.x1 = -1;
                    this.x2 = 0;
                }

                if (this.y2 > 1) {
                    this.ySpeed *= -1;
                    this.y1 = 0;
                    this.y2 = 1;
                }
                else if (this.y1 < -1) {
                    this.ySpeed *= -1;
                    this.y1 = -1;
                    this.y2 = 0;
                }
                // ---------------------------------------------------------------------
            }

            var vertices = [this.x1, this.y2,
                this.x1, this.y1,
                this.x2, this.y2,
                this.x2, this.y2,
                this.x1, this.y1,
                this.x2, this.y1
            ];

            gl.enableVertexAttribArray(this.positionLocation);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

            super.update(gameTime); //This is the function we override in the parent.
        }

        /**
         * Called when the game determines it is time to draw a frame.
         */
        draw(gameTime) {
            var gl = this.graphics.GraphicsDevice.Adapter.DefaultAdapter;

            this.graphics.GraphicsDevice.clear();

            gl.vertexAttribPointer(this.positionLocation, 2, gl.FLOAT, false, 0, 0);
            gl.drawArrays(gl.TRIANGLES, 0, 6);

            super.draw(gameTime); //This is the function we override in the parent.
        }
    };
    
    if (!includeJSXnaGame1Flag) {
        JSXnaLoadingStatus += 1;
        includeJSXnaGame1Flag = true;  
    }
}