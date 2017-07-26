/**
 * Provides some utilities functions for the JSXna Framework.
 *
 * @author Sébastien Bolduc <sebastien.bolduc@gmail.com>
 * @version 0.1
 */

/**
 * My namespace for utilities functions.
 * (We take the time to check if all namespaces are already created)
 * @namespace JSXna.Utils
 */
if (typeof JSXna == "undefined") {
    var JSXna = {};
}
if (typeof JSXna.Utils == "undefined") {
    JSXna.Utils = {};
}

/**
 * Include a javascript file within another javascript file using one to the two
 * methods.
 * @param {string} url - Path to the file to include.
 * @example
 * // inlcude '/js/file.js'
 * JSXna.Utils.include['HTML']('/js/file.js');
 * 
 * @see {@link https://codeem.co/how-do-i-include-a-javascript-file-in-another-javascript-file/}
 * @see {@link https://stackoverflow.com/questions/39162449/using-a-javascript-file-in-another-js-file}
 */
JSXna.Utils.include = {
    
    ['HTML'](url) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.src = url;
        script.type = 'text/javascript';
        head.appendChild(script);
    },
    
    ['AJAX'](url) {
        var ajax = new XMLHttpRequest();
        ajax.open( 'GET', url, false ); // <-- the 'false' makes it synchronous
        ajax.onreadystatechange = function () {
            var script = ajax.response || ajax.responseText;
            if (ajax.readyState === 4) {
                switch( ajax.status) {
                    case 200:
                        eval.apply( window, [script] );
                        console.log("script loaded: ", url);
                        break;
                    default:
                        console.log("ERROR: script not loaded: ", url);
                }
            }
        };
        ajax.send(null);
    }
    
};