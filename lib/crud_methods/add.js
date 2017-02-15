//  Dependancies
var makeDocument =  require('../document'),
    validate     =  require('../validation'),
    log          =  require('../logger'),
    messages     =  require('../messages');


/*
*   Function accepts 2 parameters
*   (documentPassed<Object> && ?callbackFunction<function>)
*
*   Returns Promise || CRUD instance
*
*   Must be bind to the call (CRUD instance 'add' method)!
*   add.call(this, documentObject<Object||string||number>)
*
*/
function addDocument(documentPassed, callbackFunction) {
    'use strict';


    /* jshint validthis : true*/
    var constructorInstance =   this;


    //  init
    var collection, configuration, callbackPassed, documentToInsert;


    //  Populate variables
    collection      = constructorInstance.collection;
    configuration   = constructorInstance.configuration;


    //  Define the document to insert
    documentToInsert =  makeDocument.call(this, documentPassed);

    //  Document invalid - return CRUD instance
    if (!documentToInsert) {
        return constructorInstance;
    }
    //  Document valid - Insert document
    else {
        return _insertDocument(documentToInsert, collection, configuration, callbackFunction, constructorInstance);
    }
}


//  Add document to collection
function _insertDocument(documentToInsert, collection, configuration, callbackFunction, constructorInstance) {
    'use strict';


    //  Return a Promise
    return new Promise(promise_cb);

    //  Promise callback
    function promise_cb(resolve, reject) {

        //  init
        var messageToLog, toReturn;


        //  Insert the document into database
        collection.insertOne(documentToInsert)
                    .then(insertDocument_cb)
                    .then(function(value) {
                        return value;
                    })
                    .catch(exception);


        //  Insert document callback
        function insertDocument_cb(documentInserted) {

            //  Log if specified
            if (configuration.includeLogs.indexOf(messageToLog.type) > -1) {
                messageToLog =  messages('document.info.documentInserted', collection.name);
                log.info(messageToLog);
            }

            //  Callback supplied
            if (callbackPassed && validate.callback(callbackPassed)) {
                toReturn =  callbackPassed(null, documentInserted.ops[0]);
            }
            //  Invalid callback or not provided
            else {
                toReturn =  constructorInstance;
            }


            ////////
            return resolve(toReturn);
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
                    toReturn =  callbackPassed(messageToLog.message, null);
            }
            //  Invalid callback or not provided
            else {
                toReturn =  constructorInstance;
            }


            ////////
            return reject(toReturn);
        }

    }

}



//  Export the module
module.exports  =   addDocument;
