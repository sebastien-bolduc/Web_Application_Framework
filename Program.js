/**
 * This will start the application.
 *
 * @author Sébastien Bolduc <sebastien.bolduc@gmail.com>
 * @version 1.0
 */

var JSXnaLoadingInterval = undefined;
var JSXnaLoadingStatus = 0;
var JSXnaLoadingStatus_OK = 18;

JSXna.Utils.include['HTML']('/Game1.js');

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
        var that = this;

        JSXnaLoadingInterval = setInterval(function() {
            document.getElementById("status").innerHTML = "Loading...  " + Math.round(JSXnaLoadingStatus / JSXnaLoadingStatus_OK * 100) + "%";
            if (JSXnaLoadingStatus >= JSXnaLoadingStatus_OK) {
                document.getElementById("status").style.display = "none";
                that.application = new MyFirstApplication.Game1();
                that.application.run();
                console.log("file included:  " + JSXnaLoadingStatus);
                clearInterval(JSXnaLoadingInterval);
            }
        }, 200);
    }
};