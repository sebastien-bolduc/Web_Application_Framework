var includeJSXnaGame1Flag = (typeof includeJSXnaGame1Flag == "undefined") ? false : includeJSXnaGame1Flag;

/**
 * This will be our game application.
 *
 * @author Sébastien Bolduc <sebastien.bolduc@gmail.com>
 * @version 0.1
 */

// This is a special case.  Since we are using the keyword 'extends' for the
// 'child' class, we have to make sure that the 'parent' class was created.  So 
// we are waiting for the signal from the parent class to initialize the child 
// class.
document.addEventListener("JSXnaGameLoaded", classJSXnaGame1, false);

JSXna.Utils.include['HTML']('/JSXna/Engine/BasicEffect.js');
JSXna.Utils.include['HTML']('/JSXna/Framework/BoundingBox.js');
JSXna.Utils.include['HTML']('/JSXna/Engine/Physics/Collision.js');
JSXna.Utils.include['HTML']('/JSXna/Framework/Color.js');
JSXna.Utils.include['HTML']('/JSXna/Engine/Model/Cube.js');
JSXna.Utils.include['HTML']('/JSXna/Framework/Game.js');
JSXna.Utils.include['HTML']('/JSXna/Framework/GraphicsDeviceManager.js');
JSXna.Utils.include['HTML']('/JSXna/Framework/Matrix.js');
JSXna.Utils.include['HTML']('/JSXna/Framework/Input/Mouse.js');
JSXna.Utils.include['HTML']('/JSXna/Framework/Input/Keyboard.js');
JSXna.Utils.include['HTML']('/JSXna/Engine/Physics/Particle.js');
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
            console.log(this.graphics.GraphicsDevice.Viewport.Width + " , " + this.graphics.GraphicsDevice.Viewport.Height);
            this.Content.RootDirectory = "/Content/";

            this.myShader = undefined;
            this.modelLocation = undefined;
            this.viewLocation = undefined;
            this.projectionLocation = undefined;
            this.positionLocation = undefined;
            this.colorLocation = undefined;
            this.textureLocation = undefined;
            
            this.cubeTexture_1 = undefined;
            this.cubeTexture_3 = undefined;
            this.cubeModel_1 = undefined;
            this.cubeModel_2 = undefined;
            this.cubeModel_3 = undefined;
            
            this.physicModel_2 = undefined;
            
            this.keyboardInput = undefined;
            this.mouseInput = undefined;
            
            // Player's attributes...
            this.player = {
                X: undefined,
                Y: undefined,
                Z: undefined,
                mouseX: undefined,
                mouseY: undefined,
                yaw: undefined,
                pitch: undefined,
                roll: undefined,
                speed: undefined,
                mouseSpeed: undefined
            };
            
            // Basic effects for rendering...
            this.basicEffect = undefined;
            
            // Bounding box for collision detection...
            this.playerCollision = undefined;
            this.playerBoundingBox = undefined;
            this.cubeBoundingBox = undefined;
            this.invisibleCubeBoundingBox_1 = undefined;
            this.invisibleCubeBoundingBox_2 = undefined;
            this.invisibleCubeBoundingBox_3 = undefined;
        }

        /**
         * Allows the game to perform any initialization it needs to before starting to run.
         * This is where it can query for any required services and load any non-graphic
         * related content.  Calling base.Initialize will enumerate through any components
         * and initialize them as well.
         */
        initialize() {
            // TODO: Add your initialization logic here
            
            this.keyboardInput = new JSXna.Framework.Input.Keyboard();
            this.mouseInput = new JSXna.Framework.Input.Mouse();
            
            // Initialize player's attributes...
            this.player.X = 0;
            this.player.Y = 0;
            this.player.Z = 20;
            this.player.mouseX = this.mouseInput.GetState.X;
            this.player.mouseY = this.mouseInput.GetState.Y;
            this.player.yaw = 0;
            this.player.pitch = 0;
            this.player.roll = 0;
            this.player.speed = 0.2;
            this.player.mouseSpeed = 0.002;
            
            // Initialize our basic effects...
            this.basicEffect = new JSXna.Engine.BasicEffect();
            this.basicEffect.createProjection(Math.PI * 0.5, this.graphics.GraphicsDevice.Viewport.AspectRatio, 1, 50);
            this.basicEffect.createView(new JSXna.Framework.Vector4(this.player.X, this.player.Y, this.player.Z, 0), this.player.yaw, this.player.pitch, this.player.roll);
            
            // Initialize our bounding box...
            this.playerBoundingBox = new JSXna.Framework.BoundingBox(
                new JSXna.Framework.Vector4(this.player.X - 2, this.player.Y - 2, this.player.Z - 2, 0), 
                new JSXna.Framework.Vector4(this.player.X + 2, this.player.Y + 2, this.player.Z + 2, 0));
            
            this.cubeBoundingBox = JSXna.Framework.BoundingBox.createFromPoints(
                [new JSXna.Framework.Vector4(-5, -5, -5, 0),
                new JSXna.Framework.Vector4(1, 1, 1, 0),
                new JSXna.Framework.Vector4(-2, -1, -4, 0),
                new JSXna.Framework.Vector4(5, 5, 5, 0)]);
            this.invisibleCubeBoundingBox_1 = new JSXna.Framework.BoundingBox(new JSXna.Framework.Vector4(-15, -5, -5, 0), new JSXna.Framework.Vector4(-5, 5, 5, 0));
            this.invisibleCubeBoundingBox_2 = new JSXna.Framework.BoundingBox(new JSXna.Framework.Vector4(5, -5, 5, 0), new JSXna.Framework.Vector4(15, 5, 15, 0));
            this.invisibleCubeBoundingBox_3 = new JSXna.Framework.BoundingBox(new JSXna.Framework.Vector4(5, -5, -5, 0), new JSXna.Framework.Vector4(15, 5, 5, 0));
            this.playerCollision = new JSXna.Engine.Physics.Collision(this.playerBoundingBox);
            this.playerCollision.add(this.cubeBoundingBox);
            this.playerCollision.add(this.invisibleCubeBoundingBox_1);
            this.playerCollision.add(this.invisibleCubeBoundingBox_2);
            this.playerCollision.add(this.invisibleCubeBoundingBox_3);
            
                
            // Initialize physic model...
            this.physicModel_2 = new JSXna.Engine.Physics.Particle();
            this.physicModel_2.initializeParticle(new JSXna.Framework.Vector4(-10, 0, 0, 0), new JSXna.Framework.Vector4(), 1);
            
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
            this.modelLocation = gl.getUniformLocation(this.myShader, 'model');
            this.viewLocation = gl.getUniformLocation(this.myShader, 'view');
            this.projectionLocation = gl.getUniformLocation(this.myShader, 'projection');
            this.positionLocation = gl.getAttribLocation(this.myShader, "position");
            this.colorLocation = gl.getAttribLocation(this.myShader, 'color');
            this.textureLocation = gl.getAttribLocation(this.myShader, 'aTextureCoord');
            
            // Load our cube texture.
            this.cubeTexture_1 = this.Content.load['Texture'](gl, this.Content.RootDirectory + "box-texture.png");
            this.cubeTexture_3 = this.Content.load['Texture'](gl, this.Content.RootDirectory + "Tall_Grass.png");
            
            // Cubes model...
            this.cubeModel_1 = JSXna.Engine.Model.Cube.createCubeModel(gl);
            this.cubeModel_1.setTexture(this.cubeTexture_1);
            this.cubeModel_2 = JSXna.Engine.Model.Cube.createCubeModel(gl);
            this.cubeModel_3 = JSXna.Engine.Model.Cube.createCubeModel(gl);
            this.cubeModel_3.setTexture(this.cubeTexture_3);
            
            // ... and transformation.
            this.model_1 = JSXna.Framework.Matrix.multiply(JSXna.Framework.Matrix.createScale(5, 5, 5), JSXna.Framework.Matrix.createRotationY(Math.PI));
            this.model_2 = JSXna.Framework.Matrix.multiply(JSXna.Framework.Matrix.createRotationX(Math.PI/4), JSXna.Framework.Matrix.createTranslation(-10, 0, 0));
            this.model_3 = JSXna.Framework.Matrix.createTranslation(10, 0, 0);
        }

        /**
         * UnloadContent will be called once per game and is the place to unload
         * all content.
         */
        unloadContent() {
            // TODO: Unload any non ContentManager content here
        }

        /**
         * Move Backward.
         */
        moveBackward() {
            var view = this.basicEffect.View;
            
            var forwardVector = new JSXna.Framework.Vector4(view.matrix[8], view.matrix[9], view.matrix[10], 0);
            forwardVector = JSXna.Framework.Vector4.normalize(forwardVector);
            
            this.player.X -= forwardVector.X * this.player.speed;
            this.player.Z += forwardVector.Z * this.player.speed;
            
            this.checkForCollision();
        }
        
        /**
         * Move forward.
         */
        moveForward() {
            var view = this.basicEffect.View;
            
            var forwardVector = new JSXna.Framework.Vector4(view.matrix[8], view.matrix[9], view.matrix[10], 0);
            forwardVector = JSXna.Framework.Vector4.normalize(forwardVector);
            
            this.player.X += forwardVector.X * this.player.speed;
            this.player.Z -= forwardVector.Z * this.player.speed;
            
            this.checkForCollision();
        }
        
        /**
         * Strafe to the left.
         */
        moveLeft() {
            var view = this.basicEffect.View;
            
            var strafeVector = new JSXna.Framework.Vector4(view.matrix[0], view.matrix[1], view.matrix[2], 0);
            strafeVector = JSXna.Framework.Vector4.normalize(strafeVector);
            
            this.player.X -= strafeVector.X * this.player.speed;
            this.player.Z += strafeVector.Z * this.player.speed;
            
            this.checkForCollision();
        }
        
        /**
         * Stafe to the right.
         */
        moveRight() {
            var view = this.basicEffect.View;
            
            var strafeVector = new JSXna.Framework.Vector4(view.matrix[0], view.matrix[1], view.matrix[2], 0);
            strafeVector = JSXna.Framework.Vector4.normalize(strafeVector);
            
            this.player.X += strafeVector.X * this.player.speed;
            this.player.Z -= strafeVector.Z * this.player.speed;
            
            this.checkForCollision();
        }
        
        /**
         * Check for collision. 
         */
        checkForCollision() {
            this.playerBoundingBox.Min = new JSXna.Framework.Vector4(this.player.X - 2, this.player.Y - 2, this.player.Z - 2, 0);
            this.playerBoundingBox.Max = new JSXna.Framework.Vector4(this.player.X + 2, this.player.Y + 2, this.player.Z + 2, 0);
            
            var listOfCollision = this.playerCollision.test(this.playerBoundingBox);
            if (listOfCollision.length != 0) {
                this.playerCollision.update(this.playerCollision.resolution(this.playerCollision.BoundingBox, this.playerBoundingBox, listOfCollision));
            } else {
                this.playerCollision.update(this.playerBoundingBox);
            }
            
            // Adjust player position...
            this.player.X = this.playerCollision.BoundingBox.Min.X + ((this.playerCollision.BoundingBox.Max.X - this.playerCollision.BoundingBox.Min.X) / 2);
            this.player.Z = this.playerCollision.BoundingBox.Min.Z + ((this.playerCollision.BoundingBox.Max.Z - this.playerCollision.BoundingBox.Min.Z) / 2);
        }
         
        /**
         * Called when the game has determined that game logic needs to be processed.
         */
        update(gameTime) {
            // This part handle the keyboard inputs...
            var keyboardState = this.keyboardInput.GetState;
            if (keyboardState.isKeyDown(keyboardState.Keys.A)) {
                this.moveLeft();
            }
            if (keyboardState.isKeyDown(keyboardState.Keys.D)) {
                this.moveRight();
            }
            if (keyboardState.isKeyDown(keyboardState.Keys.S)) {
                this.moveBackward();
            }
            if (keyboardState.isKeyDown(keyboardState.Keys.W)) {
                this.moveForward();
            }
            if (keyboardState.isKeyDown(keyboardState.Keys.SPACE)) {
                if (this.physicModel_2.Position.Y == 0) {
                    this.physicModel_2.applyForce("gravity", 15 * this.physicModel_2.Mass * 9.8, new JSXna.Framework.Vector4(0, -1, 0, 0));
                    this.physicModel_2.applyForce("truster", 2000, new JSXna.Framework.Vector4(0, 1, 0, 0));
                }
            }

            // This part handle the mouse inputs...
            if (this.mouseInput.GetState.LeftButton || this.mouseInput.GetState.RightButton) {
                this.player.pitch += (this.mouseInput.GetState.Y - this.player.mouseY) * this.player.mouseSpeed;
                this.player.yaw += (this.mouseInput.GetState.X - this.player.mouseX) * this.player.mouseSpeed;
                
                // Check limit for angle on the X axis.
                this.player.pitch = (this.player.pitch > (2 * Math.PI)) ? this.player.pitch - (Math.PI * 2) : this.player.pitch;
                this.player.pitch = (this.player.pitch < 0) ? (Math.PI * 2) + this.player.pitch : this.player.pitch;
                
                // Check limit for angle on the Y axis.
                this.player.yaw = (this.player.yaw > (2 * Math.PI)) ? this.player.yaw - (Math.PI * 2) : this.player.yaw;
                this.player.yaw = (this.player.yaw < 0) ? (Math.PI * 2) + this.player.yaw : this.player.yaw;
            }
            this.player.mouseX = this.mouseInput.GetState.X;
            this.player.mouseY = this.mouseInput.GetState.Y;

            // We create and set the transformation matrix for rendering...
            this.basicEffect.createView(new JSXna.Framework.Vector4(this.player.X, this.player.Y, this.player.Z, 0), this.player.yaw, this.player.pitch, this.player.roll);

            // We run the physic simulation...
            this.physicModel_2.runSimulation(gameTime);
            this.model_2 = JSXna.Framework.Matrix.multiply(JSXna.Framework.Matrix.createRotationX(Math.PI/4)
                , JSXna.Framework.Matrix.createTranslation(this.physicModel_2.Position.X, this.physicModel_2.Position.Y, this.physicModel_2.Position.Z) );
            if (this.physicModel_2.Position.Y > 1) {
                this.physicModel_2.removeForce("truster");
            } else if (this.physicModel_2.Position.Y < 0){
                this.physicModel_2.removeForce("gravity");
                this.physicModel_2.resetSimulation();
                this.physicModel_2.Position.Y = 0;
            } 

            super.update(gameTime); //This is the function we override in the parent.
        }

        /**
         * Called when the game determines it is time to draw a frame.
         */
        draw(gameTime) {
            this.graphics.GraphicsDevice.clear(JSXna.Framework.Color.Black);
            
            this.cubeModel_1.draw(this, this.model_1, this.basicEffect.View, this.basicEffect.Projection);
            this.cubeModel_2.draw(this, this.model_2, this.basicEffect.View, this.basicEffect.Projection);
            this.cubeModel_3.draw(this, this.model_3, this.basicEffect.View, this.basicEffect.Projection);

            super.draw(gameTime); //This is the function we override in the parent.
        }
    };

    // Check if we already included this file...
    if (!includeJSXnaGame1Flag) {
        JSXnaLoadingStatus += 1;
        includeJSXnaGame1Flag = true;
    }
}