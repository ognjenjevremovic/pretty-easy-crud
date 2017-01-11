/*
*   Function accepts a single parameters
*   (callbackFunction<function>)
*
*   Returns an Object<callback>
*
*/
function isValidCallback(callbackFunctionSupplied) {
    'use strict';


    //  init
    var toReturn;


    //  callback valid
    if (callbackFunctionSupplied && typeof callbackFunctionSupplied === 'function') {
        toReturn =  true;
    }
    //  callback invalid
    else {
        toReturn =  false;
    }


    ////////
    return toReturn;
}



//  Export the module
module.exports =    isValidCallback;
