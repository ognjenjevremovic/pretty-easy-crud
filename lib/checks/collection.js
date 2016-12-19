/*
*   Check collection function (module)
*   Function accepts single parameter
*   and checks if it matches a MongoDB collection Object
*   on which CRUD methods will be performed
*
*   Returns an Object<collection || errorObject>
*
*/
function checkCollection(collection) {
    'use strict';


    //  Check the collection
    if (collection) {
        switch (typeof collection) {
            case 'object':
                if (collection.s && !(collection instanceof Array) && !(collection instanceof Date)) {
                    //  valid collection!
                    if (_collectionValidity(collection.s)) {
                        ////////
                        return collection;
                    }
                    //  invalid collection
                    else {
                        ////////
                        return _returnErr();
                    }
                }
                //  invalid collection
                else {
                    ////////
                    return _returnErr();
                }
                break;
            default:
                ////////
                return _returnErr();
        }
    }
    //  invalid collection
    else {
        ////////
        return _returnErr();
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
    var errObj      =   {};
    errObj._error    =   true;

    ////////
    return errObj;
}

/*
*   Perform collection validation
*   internal use only
*   checks if the parameter is collection
*
*   Returns an boolean
*
*/
function _collectionValidity(collection) {
    //  init
    var check = true,
        collectionProps =   ['db', 'dbName', 'namespace', 'name'];

    for (var _index = 0; _index < collectionProps.length; _index++) {
        check = check && collection.hasOwnProperty(collectionProps[_index]);
    }

    ////////
    return  check;
}



/*
*   Check collection module
*       -   accepts 1 parameter
*       -   returns collection Object (on which to perform the CRUD) || error object
*
*   Error Object includes custom '_error' property
*/
module.exports =    checkCollection;
