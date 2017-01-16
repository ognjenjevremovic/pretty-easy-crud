/*
*   Function accepts one parameter
*   (documentObject<any>)
*
*   Returns boolean (true === 'valid value')
*
*/
function checkIfAllowedValue(documentObject) {
    'use strict';


    //  init
    var unallowedValues,
        valid = {};

    //  Define unallowed values
    unallowedValues =   [null, undefined, false, true, ''];


    //  unallowed value
    if (unallowedValues.indexOf(documentObject) > -1) {
        valid.valid    =    false;
        valid.moreInfo =    documentObject === '' ? 'empty string' : documentObject;
        valid.reason   =    'unallowedValue';
    }
    //  allowed value
    else {
        if (typeof documentObject === 'object') {
            valid = _checkIfValidObject(documentObject);
            valid.reason =  'unallowedValue';
        }
        else {
            valid.valid =   true;
        }
    }


    ////////
    return valid;
}


/*
*   used internaly, to check Object validity
*
*   Function accepts one parameter
*   (documentObject<Object>)
*
*   Returns boolean (true === 'valid object')
*
*/
function _checkIfValidObject(documentObject) {
    'use strict';


    //  init
    var valid, moreInfo,
        toReturn =  {};


    //  Array
    if (documentObject instanceof Array) {
        //  empty -> invalid
        if (documentObject.length === 0) {
            valid    =  false;
            moreInfo =  'empty array';
        }
        //  valid
        else {
            valid = true;
        }
    }
    //  Object
    else {
        //  empty -> invalid
        if (Object.keys(documentObject).length === 0) {
            valid    =  false;
            moreInfo =  'Object with no key/value pair(s)';
        }
        //  valid
        else {
            valid = true;
        }
    }

    toReturn.valid    = valid;
    toReturn.moreInfo = moreInfo;


    ////////
    return toReturn;
}



//  Export the module
module.exports =    checkIfAllowedValue;
