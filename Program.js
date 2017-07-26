/**
 * This will start the application.
 *
 * @author Sébastien Bolduc <sebastien.bolduc@gmail.com>
 * @version 1.0
 */

JSXna.Utils.include['AJAX']('/Game1.js');

/**
 * My namespace for the application.
 * (We take the time to check if all namespaces are already created)
 * @namespace MyFirstApplication
 */
if (typeof MyFirstApplication == "undefined") {
    var MyFirstApplication = {};
}

/**
 * This is the class that will be call to start the application.
 */
MyFirstApplication.Program = class {
    /**
     * We intitialize our application handler.
     */
    constructor() {
        this.application = {};
    }

    /**
     * The main entry point for our application.
     */
    main() {
        this.application = new MyFirstApplication.Game1();

        this.application.run();
    }
};