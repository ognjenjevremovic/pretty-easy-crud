//  Dependancies
var setConfiguration =  require('./setConfiguration'),
    validate         =  require('../validation'),
    messages         =  require('../messages'),
    log              =  require('../logger');


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
    var returnValue, collection, configuration, defaultConfiguration, messageToLog;

    //  defaults
    defaultConfiguration =  {};
    defaultConfiguration.includeLogs =  ['error'];
    defaultConfiguration.includeTime =  true;


    //  No parameters passed
    if (param_one === undefined && param_two === undefined) {
        //  use defaults
        configuration = defaultConfiguration;
        messageToLog  = messages('collection.warn.noCollection.constructor');
    }

    //  One parameter passed (collection || configuration)
    if ((param_one || param_one === false) && !param_two) {
        //  Configuration
        if (validate.configuration(param_one)) {
            configuration   =    setConfiguration(param_one, defaultConfiguration);
        }
        //  Collection
        else if (validate.collection(param_one)) {
            collection =    param_one;
        }
        //  invalid parameter
        else {
            configuration   =   defaultConfiguration;
        }

        //  Check what's passed
        if (configuration) {
            messageToLog =  messages('collection.warn.noCollection.constructor');
        }
    }

    //  Two parameters supplied (collection && configuration)
    if ((param_one || param_one === false) && param_two) {
        //  Configuration
        if (validate.configuration(param_one)) {
            configuration = setConfiguration(param_one, defaultConfiguration);
        }
        else {
            configuration = defaultConfiguration;
        }
        //  Collection
        if (validate.collection(param_two)) {
            collection =    param_two;
        }
        else {
            messageToLog =  messages('collection.error.invalidCollection.constructor');
        }
    }


    //  Output the message to the console (if specified)
    if (messageToLog && (configuration.includeLogs.indexOf(messageToLog.type) > -1)) {
        log[messageToLog.type](messageToLog.message);
    }


    //  Set the return object
    returnValue =   {
        configuration : configuration,
        collection    : collection
    };


    ////////
    return returnValue;
}



//  Export the module
module.exports =    setParams;
