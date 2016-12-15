//  Check collection
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

//  Throw error
function _returnErr() {
    var errObj      =   {};
    errObj._error    =   true;

    ////////
    return errObj;
}

//  Validate collection
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
*   Check collection function
*       -   returns an Object<collection||errorObj>
*           *   errorObj has the '_error' propertie
*           *   collection does NOT include '_error' property
*/
module.exports =    checkCollection;
