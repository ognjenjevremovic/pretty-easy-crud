/*
*   Function accepts single parameter
*   (collectionObjectSuplied<Collection>)
*
*   Returns boolean (true === 'valid collection')
*
*/
function isValidCollection(collectionObjectSuplied) {
    'use strict';


    //  init
    var valid;

    valid = typeof collectionObjectSuplied === 'object';
    valid = valid && _isCollection(collectionObjectSuplied.s);


    ////////
    return valid;
}


/*
*   used internaly, to check collection properties
*
*   Function accepts single parameter
*   (collectionObject_sPropertie<Colletion.s>)
*
*   Returns boolean (true === 'valid collection object')
*
*/
function _isCollection(collectionObject_sPropertie) {

    //  init
    var valid, validProperties, collection_sProperties;

    //  Check if configuration object
    valid = typeof collectionObject_sPropertie === 'object';
    collection_sProperties =    ['db', 'topology', 'dbName', 'options', 'namespace', 'serializeFunctions', 'name', 'promiseLibrary', 'readConcern'];

    validProperties =   true;
    if (collectionObject_sPropertie) {
        collection_sProperties.forEach(function(_prop) {
            validProperties =   validProperties && collectionObject_sPropertie.hasOwnProperty(_prop);
        });
    }

    valid = valid && validProperties;


    ////////
    return valid;
}



//  Export the module
module.exports =    isValidCollection;
