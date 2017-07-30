var includeJSXnaGameFlag = (typeof includeJSXnaGameFlag == "undefined") ? false : includeJSXnaGameFlag;

/**
 * Provides basic graphics device initialization, game logic, and rendering 
 * code.
 *
 * @author Sébastien Bolduc <sebastien.bolduc@gmail.com>
 * @version 0.4
 */

JSXna.Utils.include['HTML']('/JSXna/Framework/Content/ContentManager.js');
JSXna.Utils.include['HTML']('/JSXna/Framework/GameTime.js');

/**
 * My namespace for game logic.
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
 * Initializes a new instance of this class, which provides basic graphics 
 * device initialization, game logic, rendering code, and a game loop.
 */
JSXna.Framework.Game = class {
    /**
     * Provides basic graphics device initialization, game logic, and rendering 
     * code.
     */
    constructor() {
        this._content = undefined;
        this.Content = new JSXna.Framework.Content.ContentManager();
        
        this._updateGameTime = undefined;
        this._drawGameTime = undefined;
    }
    
    /**
     * Sets the current ContentManager.
     * 
     * @param {ContentManager} contentManager - The current content manager.
     */
    set Content(contentManager) {
        this._content = contentManager;
    }
    
    /**
     * Gets the current ContentManager.
     * 
     * @return {ContentManager} The current content manager.
     */
    get Content() {
        return this._content;
    }

    /**
     * Called after the Game and GraphicsDevice are created, but before 
     * LoadContent.
     */
    // Must be overridden. https://www.sitepoint.com/object-oriented-javascript-deep-dive-es6-classes/
    initialize() {
        this.resetElapsedTime();
    }

    /**
     * Called when graphics resources need to be loaded.
     */
    // Must be overridden. https://www.sitepoint.com/object-oriented-javascript-deep-dive-es6-classes/
    //loadContent() {
    //    console.log("You must overrride this function.");
    //}

    /**
     * Called when graphics resources need to be unloaded. Override this method to
     * unload any game-specific graphics resources.
     */
    // Must be overridden. https://www.sitepoint.com/object-oriented-javascript-deep-dive-es6-classes/
    //unloadContent() {
    //    console.log("You must overrride this function.");
    //}
    
    /**
     * Called when the game has determined that game logic needs to be processed.
     */
    // Must be overridden. https://www.sitepoint.com/object-oriented-javascript-deep-dive-es6-classes/
    update(gameTime) {
        gameTime.ElapsedGameTime = gameTime;
    }
    
    /**
     * Called when the game determines it is time to draw a frame.
     */
    // Must be overridden. https://www.sitepoint.com/object-oriented-javascript-deep-dive-es6-classes/
    draw(gameTime) {
        gameTime.ElapsedGameTime = gameTime;
    }
    
    /**
     * Resets the elapsed time counter.
     */
    resetElapsedTime() {
        this._updateGameTime = new JSXna.Framework.GameTime();
        this._drawGameTime = new JSXna.Framework.GameTime();
    }

    /**
     * Call this method to initialize the game, begin running the game loop, and 
     * start processing events for the game.
     */
    run() {
        this.initialize();
        this.loadContent();
        
        this.tick();
    }

    /**
     * Updates the game's clock and calls Update and Draw.
     */
    tick() {
        this.update(this._updateGameTime);
        this.draw(this._drawGameTime);
        
        var that = this;
        window.requestAnimationFrame(function(){that.tick()});
    }
};

if (!includeJSXnaGameFlag) {
    JSXnaLoadingStatus += 1;   
    includeJSXnaGameFlag = true;
} 

var eventJSXnaGameLoaded = new CustomEvent("JSXnaGameLoaded", {detail: { file: "Game.js" }, bubbles: true, cancelable: true });
document.dispatchEvent(eventJSXnaGameLoaded);