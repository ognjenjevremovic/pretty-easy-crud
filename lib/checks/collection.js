//  Check collection
function checkCollection(collection) {
    'use strict';


    //  Check for properties on the collection
    var collectionProps =   ['db', 'dbName', 'namespace', 'name'];

    //  Check the collection
    if (collection) {
        switch (typeof collection) {
            case 'object':
                if (collection && !(collection instanceof Array) && !(collection instanceof Date)) {
                    //  valid collection!
                    if (_collectionValidity(collection, arrOfProps)) {
                        ////////
                        return {
                            collection :    collection
                        };
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
    errObj.error    =   true;

    ////////
    return errObj;
}

//  Validate collection
function _collectionValidity(collection, arrOfProps) {
    var check = true;
    for (var _index = 0; _index < arrOfProps.length; _index++) {
        check = check && collection.hasOwnProperty(arrOfProps[_index]);
    }

    ////////
    return  check;
}



//  Export the module
module.exports =    checkCollection;
