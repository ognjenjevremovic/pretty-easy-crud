//  Dependancies
var constructQuery =    require('../construct').query,
    validate       =    require('../validation'),
    log            =    require('../logger'),
    messages       =    require('../messages');


/*
*   Function accepts 2 parameters
*   (query<Object> && ?callbackPassed<function>)
*
*   Returns CRUD instance
*
*   Must be bind to the call (CRUD instance 'find' method)!
*   find.bind(this)
*
*/
function findDocuments(query, callbackPassed) {
    'use strict';


    /* jshint validthis : true*/
    var constructorInstance =   this;


    //  init
    var collection, configuration, queryDocument;


    //  Populate variables
    collection      = constructorInstance.collection;
    configuration   = constructorInstance.configuration;


    //  Define the query
    queryDocument = constructQuery.call(this, query);


    //  Document invalid - return CRUD instance
    if (!queryDocument) {
        return constructorInstance;
    }
    //  Document valid - Insert document
    else {
        _queryCollection(queryDocument, collection, configuration, callbackPassed, constructorInstance);
        return constructorInstance;
    }
}


//  Query the collection
function _queryCollection(queryDocument, collection, configuration, callbackPassed, constructorInstance) {
    'use strict';


    //  init
    var messageToLog;


    //  Return a Promise
    return new Promise(promise_cb);

    //  Promise callback
    function promise_cb(resolve, reject) {

        //  Query the collection
        return collection
                    .find(queryDocument)
                    .toArray()
                    .then(queryCollection_cb)
                    .catch(exception);


        //  Query document callback
        function queryCollection_cb(documentsFound) {

            //  Log if specified
            messageToLog =  messages('document.info.documentsFound', documentsFound.length);
            if (configuration.includeLogs.indexOf(messageToLog.type) > -1) {
                log.info(messageToLog.message);
            }

            //  Run callback if supplied
            if (callbackPassed && validate.callback(callbackPassed)) {
                callbackPassed(null, documentsFound);
            }
        }

        //  Exception
        function exception(errorQueryingCollection) {

            //  Log the error (errors are always logged)
            messageToLog =  messages('collection.error.queryingCollection');
            log.error(messageToLog.message);

            //  Callback supplied
            if (callbackPassed && validate.callback(callbackPassed)) {
                callbackPassed(messageToLog.message, null);
            }
        }
    }

}



//  Export the module
module.exports  =   findDocuments;
