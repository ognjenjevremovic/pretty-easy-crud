/*
*   Function accepts single parameter
*   (configurationValueSupplied<string||number||Object>)
*
*   Returns boolean (true === 'valid configuration')
*
*/
function isValidConfiguration(configurationValueSupplied) {
    'use strict';


    //  init
    var valid, check;

    valid = typeof configurationValueSupplied === 'string';
    valid = valid || typeof configurationValueSupplied === 'number';
    valid = valid || typeof configurationValueSupplied === 'boolean';
    valid = valid || _isObject(configurationValueSupplied);


    ////////
    return valid;
}


/*
*   used internaly, to check configuration properties
*
*   Function accepts single parameter
*   (configurationObject<Object>)
*
*   Returns boolean (true === 'valid configuration object')
*
*/
function _isObject(configurationObject) {

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



//  Export the module
module.exports =    isValidConfiguration;
