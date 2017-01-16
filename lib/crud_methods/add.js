//  Dependancies
var constructDocument = require('../construct').document,
    validate          = require('../validation'),
    log               = require('../logger'),
    messages          = require('../messages');


/*
*   Function accepts 2 parameters
*   (queryObject<Object> && ?callbackPassed<function>)
*
*   Returns CRUD instance
*
*   Must be bind to the call (CRUD instance 'add' method)!
*   add.bind(this)
*
*/
function addDocument(documentPassed, callbackPassed) {
    'use strict';


    /* jshint validthis : true*/
    var constructorInstance =   this;


    //  init
    var collection, configuration, documentToInsert;


    //  Populate variables
    collection      = constructorInstance.collection;
    configuration   = constructorInstance.configuration;


    //  Define the document to insert
    documentToInsert =  constructDocument.call(this, documentPassed);

    //  Document invalid - return CRUD instance
    if (!documentToInsert) {
        return constructorInstance;
    }
    //  Document valid - Insert document
    else {
        _insertDocument(documentToInsert, collection, configuration, callbackPassed, constructorInstance);
        return constructorInstance;
    }
}


//  Add document to collection
function _insertDocument(documentToInsert, collection, configuration, callbackPassed, constructorInstance) {
    'use strict';


    //  init
    var messageToLog;


    //  Return a Promise
    return new Promise(promise_cb);

    //  Promise callback
    function promise_cb(resolve, reject) {

        //  Insert the document into database
        return collection
                    .insertOne(documentToInsert)
                    .then(insertDocument_cb)
                    .catch(exception);


        //  Insert document callback
        function insertDocument_cb(documentInserted) {

            //  Log if specified
            messageToLog =  messages('document.info.documentInserted', collection.s.name);
            if (configuration.includeLogs.indexOf(messageToLog.type) > -1) {
                log.info(messageToLog.message);
            }

            //  Run callback if supplied
            if (callbackPassed && validate.callback(callbackPassed)) {
                callbackPassed(null, documentInserted.ops[0]);
            }
        }

        //  Exception
        function exception(errorInsertingDocument) {
            switch (errorInsertingDocument.code) {
                //  Duplicate key
                case 11000:
                    messageToLog =  messages('document.error.insertingDocument.duplicateKey');
                    break;
                //  Native error
                default:
                    messageToLog =  messages('document.error.insertingDocument.native');
            }

            //  Log the error (errors are always logged)
            log.error(messageToLog.message);

            //  Callback supplied
            if (callbackPassed && validate.callback(callbackPassed)) {
                callbackPassed(messageToLog.message, null);
            }
        }
    }

}



//  Export the module
module.exports  =   addDocument;
