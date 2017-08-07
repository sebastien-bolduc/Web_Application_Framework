var includeJSXnaGameTimeFlag = (typeof includeJSXnaGameTimeFlag == "undefined") ? false : includeJSXnaGameTimeFlag;

/**
 * Snapshot of the game timing state expressed in values that can be used by 
 * variable-step (real time) or fixed-step (game time) games.
 *
 * @author Sébastien Bolduc <sebastien.bolduc@gmail.com>
 * @version 0.2
 */

/**
 * My namespace for game time.
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
 * Snapshot of the game timing state.
 */
JSXna.Framework.GameTime = class {
    /**
     * Creates a new instance of GameTime.
     */
    constructor() {
        this.timeSpan = undefined;
        this.elapsedGameTime = {};
        this.elapsedGameTime.totalMilliseconds = 0;
        this.elapsedGameTime.totalSeconds = 0;
    }

    /**
     * The amount of elapsed game time since the last update.
     * 
     * @param {GameTime} gameTime - Reference to a GameTime object. 
     */
    set ElapsedGameTime(gameTime) {
        if (typeof gameTime.timeSpan == "undefined") {
            gameTime.timeSpan = new Date().getTime();
        }
        else {
            gameTime.elapsedGameTime.totalMilliseconds = (new Date().getTime()) - gameTime.timeSpan;
            gameTime.elapsedGameTime.totalSeconds = gameTime.elapsedGameTime.totalMilliseconds / 1000;
            gameTime.timeSpan = new Date().getTime();
        }
    }

    /**
     * The amount of elapsed game time since the last update.
     * 
     * @returns {number} Amount of game time passed.
     */
    get ElapsedGameTime() {
        return this.elapsedGameTime;
    }
};

// Check if we already included this file...
if (!includeJSXnaGameTimeFlag) {
    JSXnaLoadingStatus += 1;
    includeJSXnaGameTimeFlag = true;
}