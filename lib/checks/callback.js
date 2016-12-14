//  Check callback passed
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

//  Return error
function _returnErr() {
    var _errObj =   {};
    errObj._error = true;

    ////////
    return errObj;
}
