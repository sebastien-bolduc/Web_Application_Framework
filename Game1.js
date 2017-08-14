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

JSXna.Utils.include['HTML']('/JSXna/Framework/Game.js');
JSXna.Utils.include['HTML']('/JSXna/Framework/GraphicsDeviceManager.js');
JSXna.Utils.include['HTML']('/JSXna/Framework/Input/Mouse.js');
JSXna.Utils.include['HTML']('/JSXna/Framework/Rectangle.js');
JSXna.Utils.include['HTML']('/JSXna/Framework/Matrix.js');

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

            this.myShader;
            this.modelLocation = undefined;
            this.viewLocation = undefined;
            this.projectionLocation = undefined;
            this.positionLocation = undefined;
            this.colorLocation = undefined;
            this.positionsBuffer = undefined;
            this.colorsBuffer = undefined;
            this.elementsBuffer = undefined;
            
            this.boxRed = undefined;
            this.cubeModel = undefined;
            
            this.mouseInput = undefined;
            this.currentX = undefined;
            this.currentY = undefined;
            this.angleXaxis = undefined;
            this.angleYaxis = undefined;
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
            
            this.mouseInput = new JSXna.Framework.Input.Mouse();
            this.currentX = this.mouseInput.GetState.X;
            this.currentY = this.mouseInput.GetState.Y;
            this.angleXaxis = 0;
            this.angleYaxis = 0;
            
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
            this.projectionLocation = gl.getUniformLocation(this.myShader, 'projection')
            this.positionLocation = gl.getAttribLocation(this.myShader, "position");
            this.colorLocation = gl.getAttribLocation(this.myShader, 'color');
            
            // Box model.
            /*this.boxRed = new MyFirstApplication.Box({
                top : 0.5,
                bottom: -0.5,
                left: -0.5,
                right: 0.5,
                
                depth: 0,
                w: 0.7,
                color: [1, 0.4, 0.4, 1]
            });
            this.boxGreen = new MyFirstApplication.Box({
                top : 0.9,
                bottom: -0,
                left: -0.9,
                right: 0.9,
                
                depth: 0.5,
                w: 1.1,
                color: [0.4, 1, 0.4, 1]
            });
            this.boxBlue = new MyFirstApplication.Box({
                top : 1,
                bottom: -1,
                left: -1,
                right: 1,
                
                depth: -1.5,
                w: 1.5,
                color: [0.4, 0.4, 1, 1]
            });*/
            
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
         * Called when the game has determined that game logic needs to be processed.
         */
        update(gameTime) {
            var gl = this.graphics.GraphicsDevice.Adapter.DefaultAdapter;

            if (this.mouseInput.GetState.LeftButton || this.mouseInput.GetState.RightButton) {
                this.angleXaxis += (this.mouseInput.GetState.Y - this.currentY) * 0.002;
                this.angleYaxis += (this.mouseInput.GetState.X - this.currentX) * 0.002;
                
                // Check limit for angle on the X axis.
                this.angleXaxis = (this.angleXaxis > (2 * Math.PI)) ? this.angleXaxis - (Math.PI * 2) : this.angleXaxis;
                this.angleXaxis = (this.angleXaxis < 0) ? (Math.PI * 2) + this.angleXaxis : this.angleXaxis;
                
                // Check limit for angle on the Y axis.
                this.angleYaxis = (this.angleYaxis > (2 * Math.PI)) ? this.angleYaxis - (Math.PI * 2) : this.angleYaxis;
                this.angleYaxis = (this.angleYaxis < 0) ? (Math.PI * 2) + this.angleYaxis : this.angleYaxis;
            }
            this.currentX = this.mouseInput.GetState.X;
            this.currentY = this.mouseInput.GetState.Y;

            var model = this.cubeModel.modelMatrix(Date.now());
            //var projection = this.cubeModel.simpleProjectionMatrix(0.5);
            var projection = this.cubeModel.perspectiveProjectionMatrix(this.graphics.GraphicsDevice.Viewport.AspectRatio);
            var view = this.cubeModel.viewMatrix(Date.now(), this.angleXaxis, this.angleYaxis);
            this.cubeModel.updateAttributesAndUniforms(this, model, view, projection);

            super.update(gameTime); //This is the function we override in the parent.
        }

        /**
         * Called when the game determines it is time to draw a frame.
         */
        draw(gameTime) {
            var gl = this.graphics.GraphicsDevice.Adapter.DefaultAdapter;

            this.graphics.GraphicsDevice.clear();

            /*this.boxRed.draw(this);
            this.boxGreen.draw(this);
            this.boxBlue.draw(this);*/
            
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

MyFirstApplication.Box = class {
    constructor(settings) {
        this.top = settings.top;        // x
        this.bottom = settings.bottom;  // x
        this.left = settings.left;      // y
        this.right = settings.right;    // y
        
        this.depth = settings.depth;    // z
        this.w = settings.w;            // w
        this.color = settings.color;
    }
    
    draw(context) {
        // Create some attribute data; these are the triangle that will end being
        // drawn to the screen.  There are two that form a square.
        
        var data = new Float32Array([
            
            // Triangle 1
            this.left, this.bottom, this.depth, this.w,
            this.right, this.bottom, this.depth, this.w,
            this.left, this.top, this.depth, this.w,
            
            // Triangle 2
            this.left, this.top, this.depth, this.w,
            this.right, this.bottom, this.depth, this.w,
            this.right, this.top, this.depth, this.w
        ]);
            
        // Use WebGL to draw this onto the screen.
        var gl = context.graphics.GraphicsDevice.Adapter.DefaultAdapter;
        gl.bindBuffer(gl.ARRAY_BUFFER, context.positionBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
        
        // Setup the pointer to our attribute data (the triangles)
        gl.enableVertexAttribArray(context.positionLocation);
        gl.vertexAttribPointer(context.positionLocation, 4, gl.FLOAT, false, 0, 0);
        
        // Setup the color uniform that will be shared across all triangles
        gl.uniform4fv(context.colorLocation, this.color);
        
        // Draw the triangles to the screen
        gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
};

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
  
  viewMatrix(now, angleXaxis, angleYaxis) {
      //var moveInAndOut = 20 * Math.sin(now * 0.002);
      var moveLeftAndRight = 5 * Math.sin(now * 0.0017);
      var zoomInAndOut = 5 * Math.sin(now * 0.002);
      
      // Move slightly down
      //var position = JSXna.Framework.Matrix.createTranslation(moveLeftAndRight, 0, 20 + zoomInAndOut);
      var position = JSXna.Framework.Matrix.createTranslation(0, 0, 20);
      
      // Move the camera around
      //var position = JSXna.Framework.Matrix.createTranslation(moveLeftAndRight, 0, 35 + moveInAndOut);
      
      // Rotate according to angle
      var rotateX = JSXna.Framework.Matrix.createRotationX(angleXaxis);
      var rotateY = JSXna.Framework.Matrix.createRotationY(angleYaxis);
      
      // Multiply together, make sure and read them in opposite order
      var view = JSXna.Framework.Matrix.multiply(rotateX, position);
      view = JSXna.Framework.Matrix.multiply(rotateY, view);
      
      // Inverse the operation for camera movements, because we are actually
      // moving geometry in the scene, not the camera itself.
      return JSXna.Framework.Matrix.invert(view);
  }
  
  simpleProjectionMatrix(scaleFactor) {
      var projection = JSXna.Framework.Matrix.identity();
      
      projection.matrix[11] = scaleFactor;
      projection.matrix[15] = scaleFactor;
      
      return projection;
  }
  
  perspectiveProjectionMatrix(ar) {
      var fieldOfViewInRadians = Math.PI * 0.5;
      var aspectRatio = ar;
      var nearClippingPlaneDistance = 1;
      var farClippingPlaneDistance = 50;
      
      return JSXna.Framework.Matrix.createPerspectiveFieldOfView(fieldOfViewInRadians, aspectRatio, nearClippingPlaneDistance, farClippingPlaneDistance);
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