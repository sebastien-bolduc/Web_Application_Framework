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
JSXna.Utils.include['HTML']('/JSXna/Framework/Game.js');
JSXna.Utils.include['HTML']('/JSXna/Framework/GraphicsDeviceManager.js');
JSXna.Utils.include['HTML']('/JSXna/Framework/Matrix.js');
JSXna.Utils.include['HTML']('/JSXna/Framework/Input/Mouse.js');
JSXna.Utils.include['HTML']('/JSXna/Framework/Input/Keyboard.js');
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
            this.positionsBuffer = undefined;
            this.colorsBuffer = undefined;
            this.elementsBuffer = undefined;
            
            this.cubeModel = undefined;
            
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
            this.playerBoundingBox = undefined;
            this.cubeBoundingBox = undefined;
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
            
            this.positionsBuffer = gl.createBuffer();
            this.colorsBuffer = gl.createBuffer();
            this.elementsBuffer = gl.createBuffer();
            
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
            //this.cubeBoundingBox = new JSXna.Framework.BoundingBox(new JSXna.Framework.Vector4(-5, -5, -5, 0), new JSXna.Framework.Vector4(5, 5, 5, 0));
            this.cubeBoundingBox = JSXna.Framework.BoundingBox.createFromPoints(
                [new JSXna.Framework.Vector4(-5, -5, -5, 0),
                new JSXna.Framework.Vector4(1, 1, 1, 0),
                new JSXna.Framework.Vector4(-2, -1, -4, 0),
                new JSXna.Framework.Vector4(10, 0, 0, 0),
                new JSXna.Framework.Vector4(5, 5, 5, 0)]);
            
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
            
            // Cube model.
            this.cubeModel = new MyFirstApplication.Cube();
            this.cubeModel.createBuffer(this);
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
            
            // Check for collision...
            this.playerBoundingBox.Min = new JSXna.Framework.Vector4(this.player.X - 2, this.player.Y - 2, this.player.Z - 2, 0);
            this.playerBoundingBox.Max = new JSXna.Framework.Vector4(this.player.X + 2, this.player.Y + 2, this.player.Z + 2, 0);
            if (this.playerBoundingBox.intersects(this.cubeBoundingBox)) {
                this.player.X += forwardVector.X * this.player.speed;
                this.player.Z -= forwardVector.Z * this.player.speed;
            }
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
            
            // Check for collision...
            this.playerBoundingBox.Min = new JSXna.Framework.Vector4(this.player.X - 2, this.player.Y - 2, this.player.Z - 2, 0);
            this.playerBoundingBox.Max = new JSXna.Framework.Vector4(this.player.X + 2, this.player.Y + 2, this.player.Z + 2, 0);
            if (this.playerBoundingBox.intersects(this.cubeBoundingBox)) {
                this.player.X -= forwardVector.X * this.player.speed;
                this.player.Z += forwardVector.Z * this.player.speed;
            }
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
            
            // Check for collision...
            this.playerBoundingBox.Min = new JSXna.Framework.Vector4(this.player.X - 2, this.player.Y - 2, this.player.Z - 2, 0);
            this.playerBoundingBox.Max = new JSXna.Framework.Vector4(this.player.X + 2, this.player.Y + 2, this.player.Z + 2, 0);
            if (this.playerBoundingBox.intersects(this.cubeBoundingBox)) {
                this.player.X += strafeVector.X * this.player.speed;
                this.player.Z -= strafeVector.Z * this.player.speed;
            }
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
            
            // Check for collision...
            this.playerBoundingBox.Min = new JSXna.Framework.Vector4(this.player.X - 2, this.player.Y - 2, this.player.Z - 2, 0);
            this.playerBoundingBox.Max = new JSXna.Framework.Vector4(this.player.X + 2, this.player.Y + 2, this.player.Z + 2, 0);
            if (this.playerBoundingBox.intersects(this.cubeBoundingBox)) {
                this.player.X -= strafeVector.X * this.player.speed;
                this.player.Z += strafeVector.Z * this.player.speed;
            }
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
            var model = this.cubeModel.modelMatrix(Math.PI / 4);
            this.basicEffect.createView(new JSXna.Framework.Vector4(this.player.X, this.player.Y, this.player.Z, 0), this.player.yaw, this.player.pitch, this.player.roll);
            this.cubeModel.updateAttributesAndUniforms(this, model, this.basicEffect.View, this.basicEffect.Projection);

            super.update(gameTime); //This is the function we override in the parent.
        }

        /**
         * Called when the game determines it is time to draw a frame.
         */
        draw(gameTime) {
            this.graphics.GraphicsDevice.clear();
            
            this.cubeModel.draw(this);

            super.draw(gameTime); //This is the function we override in the parent.
        }
    };

    // Check if we already included this file...
    if (!includeJSXnaGame1Flag) {
        JSXnaLoadingStatus += 1;
        includeJSXnaGame1Flag = true;
    }
}

MyFirstApplication.Cube = class {
  constructor() {
      this.positions = [
      // Front face
      -1.0, -1.0,  1.0,
       1.0, -1.0,  1.0,
       1.0,  1.0,  1.0,
      -1.0,  1.0,  1.0,

      // Back face
      -1.0, -1.0, -1.0,
      -1.0,  1.0, -1.0,
       1.0,  1.0, -1.0,
       1.0, -1.0, -1.0,

      // Top face
      -1.0,  1.0, -1.0,
      -1.0,  1.0,  1.0,
       1.0,  1.0,  1.0,
       1.0,  1.0, -1.0,

      // Bottom face
      -1.0, -1.0, -1.0,
       1.0, -1.0, -1.0,
       1.0, -1.0,  1.0,
      -1.0, -1.0,  1.0,

      // Right face
       1.0, -1.0, -1.0,
       1.0,  1.0, -1.0,
       1.0,  1.0,  1.0,
       1.0, -1.0,  1.0,

      // Left face
      -1.0, -1.0, -1.0,
      -1.0, -1.0,  1.0,
      -1.0,  1.0,  1.0,
      -1.0,  1.0, -1.0
    ];
  
    var colorsOfFaces = [
      [0.3,  1.0,  1.0,  1.0],    // Front face: cyan
      [1.0,  0.3,  0.3,  1.0],    // Back face: red
      [0.3,  1.0,  0.3,  1.0],    // Top face: green
      [0.3,  0.3,  1.0,  1.0],    // Bottom face: blue
      [1.0,  1.0,  0.3,  1.0],    // Right face: yellow
      [1.0,  0.3,  1.0,  1.0]     // Left face: purple
    ];
  
    this.colors = [];

    for (var j=0; j<6; j++) {
      var polygonColor = colorsOfFaces[j];
    
      for (var i=0; i<4; i++) {
        this.colors = this.colors.concat( polygonColor );
      }
    }
  
    this.elements = [
      0,  1,  2,      0,  2,  3,    // front
      4,  5,  6,      4,  6,  7,    // back
      8,  9,  10,     8,  10, 11,   // top
      12, 13, 14,     12, 14, 15,   // bottom
      16, 17, 18,     16, 18, 19,   // right
      20, 21, 22,     20, 22, 23    // left
    ];
  }
  
  createBuffer(context) {
      var gl = context.graphics.GraphicsDevice.Adapter.DefaultAdapter;
      
      gl.bindBuffer(gl.ARRAY_BUFFER, context.positionsBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions), gl.STATIC_DRAW);
      
      gl.bindBuffer(gl.ARRAY_BUFFER, context.colorsBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.colors), gl.STATIC_DRAW);
      
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, context.elementsBuffer);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.elements), gl.STATIC_DRAW);
  }
  
  modelMatrix(now) {
      // Scale down by 50%
      var scale = JSXna.Framework.Matrix.createScale(5, 5, 5);
      
      // Rotate a slight tilt
      var rotateX = JSXna.Framework.Matrix.createRotationX(now * 0.0003);
      
      // Rotate according to time
      var rotateY = JSXna.Framework.Matrix.createRotationY(now * 0.0005);
      
      // Move slightly down
      var position = JSXna.Framework.Matrix.createTranslation(0, 0, 0);
      
      // Multiply together, make sure and read them in opposite order
      var model = JSXna.Framework.Matrix.multiply(rotateY, position);
      model = JSXna.Framework.Matrix.multiply(rotateX, model);
      model = JSXna.Framework.Matrix.multiply(scale, model);
      
      return model;
  }
  
  updateAttributesAndUniforms(context, model, view, projection) {
      var gl = context.graphics.GraphicsDevice.Adapter.DefaultAdapter;
      
      // Setup the color uniform that will be shared across all triangles
      gl.uniformMatrix4fv(context.modelLocation, false, new Float32Array(model.matrix));
      gl.uniformMatrix4fv(context.viewLocation, false, new Float32Array(view.matrix));
      gl.uniformMatrix4fv(context.projectionLocation, false, new Float32Array(projection.matrix));
      
      // Set the position attribute
      gl.enableVertexAttribArray(context.positionLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, context.positionsBuffer);
      gl.vertexAttribPointer(context.positionLocation, 3, gl.FLOAT, false, 0, 0);
      
      // Set the colors attribute
      gl.enableVertexAttribArray(context.colorLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, context.colorsBuffer);
      gl.vertexAttribPointer(context.colorLocation, 4, gl.FLOAT, false, 0, 0);
      
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, context.elementsBuffer);
  }
  
  draw(context) {
      var gl = context.graphics.GraphicsDevice.Adapter.DefaultAdapter;
      
      // Perform the actual draw
      gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
  }
};