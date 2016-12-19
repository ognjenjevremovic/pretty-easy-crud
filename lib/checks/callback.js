/*
*   Check callback function (module)
*   Function accepts up to two parameters
*   and checks if one of the parameters is a function
*   that represents the callback (passed to the module)
*   by the user (supplied to the CRUD method)
*
*   Returns an Object<callbackFunction || errorObject>
*
*/
function checkCallback(param_one, param_two) {
    'use strict';


    //  init
    var callback;


    //  No params passed (no callback supplied)
    if (!param_one && !param_two) {
        ////////
        return _returnErr();
    }

    //  One parameter passed, check it's type (collection || function)
    else if (param_one && !param_two) {
        if (typeof param_one === 'function') {
            ////////
            return param_one;
        }
        else {
            return _returnErr();
        }
    }

    //  Two parameters passed (check the value of the second)
    else {
        if (typeof param_two === 'function') {
            ////////
            return param_two;
        }
        else {
            ////////
            return _returnErr();
        }
    }
}

/*
*   Return error function
*   internal use only
*   constructs and error Object
*
*   Returns an Object<errorObject>
*
*/
function _returnErr() {
    var _errObj =   {};
    errObj._error = true;

    ////////
    return errObj;
}



/*
*   Callback module
*       -   accepts 2 parameters and checks their type
*       -   returns callback function || error object
*
*   Error Object includes custom '_error' property
*/
module.exports =    messagesFn;
