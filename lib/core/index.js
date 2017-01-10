//  Dependancies
var setConfiguration =  require('./setConfiguration'),
    messages         =  require('../messages');


/*
*   Function accepts 3 parameters
*   (param_one<Collection||configuration> && param_two<Collection> && defaultConfiguration<Object>)
*
*   Returns an collection and configuration<Object>
*
*/
function setParams(param_one, param_two) {
    'use strict';


    //  init
    var returnValue, collection, configuration, defaultConfiguration;

    //  defaults
    defaultConfiguration =  {};
    defaultConfiguration.includeLogs =  ['error'];
    defaultConfiguration.includeTime =  true;


    //  One parameter passed (collection || configuration)
    if ((param_one || param_one === false) && !param_two) {
        //  Configuration
        if (_isValidConfiguration(param_one)) {
            configuration   =    setConfiguration(param_one, defaultConfiguration);
        }
        //  Collection
        else if (_isValidCollection(param_one)) {
            collection =    param_one;
        }
        //  invalid parameter
        else {
            configuration   =   defaultConfiguration;
        }

        //  Check what's passed
        if (configuration) {
            messages('collection.warn.noCollection.constructor');
        }
    }


    //  Two parameters supplied (collection && configuration)
    if ((param_one || param_one === false) && param_two) {
        //  Configuration
        if (_isValidConfiguration(param_one)) {
            configuration = setConfiguration(param_one, defaultConfiguration);
        }
        else {
            configuration = defaultConfiguration;
        }
        //  Collection
        if (_isValidCollection(param_two)) {
            collection =    param_two;
        }
        else {
            messages('collection.error.invalidCollection.constructor');
        }
    }


    //  Set the return object
    returnValue =   {
        configuration : configuration,
        collection    : collection
    };


    ////////
    return returnValue;
}


/*
*   used internaly, to check configuration validity
*
*   Function accepts single parameter
*   (configurationValueSupplied<string||number||Object>)
*
*   Returns boolean (true === 'valid configuration')
*
*/
function _isValidConfiguration(configurationValueSupplied) {
    'use strict';


    //  init
    var valid, check;

    valid = typeof configurationValueSupplied === 'string';
    valid = valid || typeof configurationValueSupplied === 'number';
    valid = valid || typeof configurationValueSupplied === 'boolean';
    valid = valid || __isObject(configurationValueSupplied);


    /*
    *   used internaly, to check configuration properties
    *
    *   Function accepts single parameter
    *   (configurationObject<Object>)
    *
    *   Returns boolean (true === 'valid configuration object')
    *
    */
    function __isObject(configurationObject) {

        //  init
        var valid, validProperties, configurationProperties;

        //  Check if configuration object
        valid = typeof configurationObject === 'object';
        configurationProperties =   ['info', 'information', 'warn', 'warning', 'scs', 'success', 'includeLogs', 'includeTime'];

        validProperties =   false;
        configurationProperties.forEach(function(_prop) {
            validProperties =   validProperties || configurationObject.hasOwnProperty(_prop);
        });

        valid = valid && validProperties;


        ////////
        return valid;
    }


    ////////
    return valid;
}

/*
*   used internaly, to check collection validity
*
*   Function accepts single parameter
*   (collectionObjectSuplied<Collection>)
*
*   Returns boolean (true === 'valid collection')
*
*/
function _isValidCollection(collectionObjectSuplied) {
    'use strict';


    //  init
    var valid;

    valid = typeof collectionObjectSuplied === 'object';
    valid = valid && __isCollection(collectionObjectSuplied.s);

    /*
    *   used internaly, to check collection properties
    *
    *   Function accepts single parameter
    *   (collectionObject_sPropertie<Colletion.s>)
    *
    *   Returns boolean (true === 'valid collection object')
    *
    */
    function __isCollection(collectionObject_sPropertie) {

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


    ////////
    return valid;
}



//  Export the module
module.exports =    setParams;
