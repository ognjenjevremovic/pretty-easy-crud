/*
*   Function accepts one parameter
*   (documentObject<any>)
*
*   Returns boolean (true === 'valid type')
*
*/
function checkIfAllowedType(documentObject) {
    'use strict';


    //  init
    var unallowedTypes,
        valid = {};

    //  Define unallowed types
    unallowedTypes =    ['function', 'boolean', 'undefined'];


    //  unallowed type
    if (unallowedTypes.indexOf(typeof documentObject) > -1) {
        valid.valid    =    false;
        valid.moreInfo =    typeof documentObject;
        valid.reason   =    'unallowedType';
    }
    //  allowed type
    else {
        valid.valid =   true;
    }


    ////////
    return valid;
}



//  Export the module
module.exports =    checkIfAllowedType;
