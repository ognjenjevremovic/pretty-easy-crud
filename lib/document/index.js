//  Dependancy
var IncludeDate =   require('./IncludeDate'),
    validate    =   require('../validation'),
    messages    =   require('../messages'),
    log         =   require('../logger');


/*
*   Function accepts two parameters
*   (documentObject<Object||string||number>)
*
*   Returns an Object<document||warning||error>
*
*   Must be bind to the call (method on the CRUD instance)!
*   makeDocument.call(this, documentObject<Object||string||number>)
*
*/
function makeDocument(documentObject) {
    'use strict';


    /* jshint validthis : true*/
    var constructorInstance =   this;


    //  init
    var toReturn, documentValidation, messageToLog, documentToInsert, configuration, _date;

    //  Inherit configuration from the CRUD instance
    configuration = constructorInstance.configuration;


    //  check document
    documentValidation =    validate.document(documentObject);

    //  invalid document
    if (documentValidation.valid === false) {
        documentToInsert =  null;
        messageToLog =  messages('document.error.constructingDocument' + [documentValidation.reason], [documentValidation.moreInfo]);
        //  error messages are always logged
        log.error(messageToLog.message);
    }
    //  valid document
    else {
        documentToInsert =  documentValidation;
        if (configuration.includeTime) {
            Object.assign(documentToInsert, new IncludeDate());
        }

        toReturn =  documentToInsert;
    }


    ////////
    return toReturn;
}



//  Export the module
module.exports =    makeDocument;