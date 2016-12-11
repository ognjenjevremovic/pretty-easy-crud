//  Check document
function checkDocument(documentObject, includeTime) {
    'use strict';


    //  Unallowed document types and values
    var unallowed_types  =  ['function', 'boolean', 'undefined'],
        unallowed_values =  [null, undefined, false, true, ''];

    //  (typeof function || typeof boolean || typeof undefined)
    if (unallowed_types.indexOf(typeof documentObject) > -1) {
        ////////
        return _returnErr('unallowedType');
    }
    //  (null || undefiend || false || true || '')
    else if (unallowed_values.indexOf(documentObject) > -1) {
        ////////
        return _returnErr('unallowedValue');
    }
    //  allowed values
    else if ((unallowed_types.indexOf(documentObject) < 0) && unallowed_values.indexOf(documentObject) < 0) {
        switch (typeof documentObject) {
            //  construct document
            case 'string':
            case 'number':
                return _invalidDocType();
            case 'array':
                if (documentObject.length === 0) {
                    return _returnErr('emptyArray');
                }
                break;
            //  document object
            default:
                if (Object.keys(documentObject).length === 0) {
                    return _returnErr('emptyObject');
                }
                //  should be object - OK!
                return documentObject;
        }

        ////////
        return documentObject;
    }
}


//  Throw error
function _returnErr(reason) {
    var errObj      =   {};
    errObj.error    =   true;
    if (reason) {
        errObj[reason]  =   true;
    }

    ////////
    return errObj;
}

//  Invalid type
function _invalidDocType() {
    var warnObj            =   {};
    warnObj.invalidDocType =    true;

    ////////
    return warnObj;
}


//  Export the module
module.exports =    checkDocument;
