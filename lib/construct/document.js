//  Dependancy
var IncludeDate =   require('./_includeDate'),
    validate    =   require('../validation'),
    messages    =   require('../messages'),
    log         =   require('../logger');


/*
*   Function accepts single parameter
*   (documentObject<Object||string||number>)
*
*   Returns an Object<document||warning||error>
*
*   Must be bind to the call (method on the CRUD instance)!
*   construct.document.bind(this)
*
*/
function setDocument(documentObject) {
    'use strict';


    /* jshint validthis : true*/
    var constructorInstance =   this;


    //  init
    var documentValidation, messageToLog, documentToInsert, configuration, _date;

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
    }


    ////////
    return documentToInsert;
}



//  Export the module
module.exports =    setDocument;
