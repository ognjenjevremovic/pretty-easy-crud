/*
*   Check document function (module)
*   Function accepts two parameters document<Object || string || number>
*   and configuration (include time property) <boolean || string>
*   and defines the document to be inserted into database
*   or returns a warning || error with more information
*
*   Returns an Object<document || warning Object || error Object>
*
*/
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
                //  empty array - invalid
                if (documentObject.length === 0) {
                    return _returnErr('emptyArray');
                }
                //  array - construct document
                else {
                    return _invalidDocType();
                }
                break;
            //  document object
            default:
                //  empty object - invalid
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


/*
*   Return error function
*   internal use only
*   constructs and error Object
*
*   Returns an Object<errorObject>
*
*/
function _returnErr(reason) {
    var errObj      =   {};
    errObj._error    =   true;
    if (reason) {
        errObj[reason]  =   true;
    }

    ////////
    return errObj;
}

/*
*   Invalid document type function
*   internal use only
*   constructs a warning Object with more information
*   on the cause
*
*   Returns an Object<warningObject>
*
*/
function _invalidDocType() {
    var warnObj            =   {};
    warnObj._invalidDocType =    true;

    ////////
    return warnObj;
}



/*
*   Check document module
*       -   accepts 2 parameters
*       -   returns Object <document || warning Object || error Object>
*
*   Error Object includes custom '_error' property
*   Warning Object includes custom '_invalidDocType' property
*
*/
module.exports =    checkDocument;
