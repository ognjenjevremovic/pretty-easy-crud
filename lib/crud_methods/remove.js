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
*   Must be bind to the call (CRUD instance 'remove' method)!
*   remove.bind(this)
*
*/
function removeDocuments(query, callbackPassed) {
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
    //  Document valid - remove entry
    else {
        _deleteDocuments(queryDocument, collection, configuration, callbackPassed, constructorInstance);
        return constructorInstance;
    }
}


//  Query the collection
function _deleteDocuments(queryDocument, collection, configuration, callbackPassed, constructorInstance) {
    'use strict';


    //  init
    var messageToLog;


    //  Return a Promise
    return new Promise(promise_cb);

    //  Promise callback
    function promise_cb(resolve, reject) {

        //  Remove operation options
        var options = {
            w: 1,
            j: true
        };

        //  Remove document(s)
        return collection
                    .deleteMany(queryDocument, options)
                    .then(deleteDocuments_cb)
                    .catch(exception);


        //  Remove document(s) callback
        function deleteDocuments_cb(deleted, deletedCount) {
            console.log(deleted.deletedCount);

            //  Number of documents removed
            switch (deleted.deletedCount) {
                case 0:
                    messageToLog =  messages('document.info.documentsRemoved.none');
                    break;
                case 1:
                    messageToLog =  messages('document.info.documentsRemoved.single', collection.s.name);
                    break;
                default:
                    messageToLog =  messages('document.info.documentsRemoved.many', deleted.deleletedCount);
            }

            //  Log if specified
            if (configuration.includeLogs.indexOf(messageToLog.type) > -1) {
                log.info(messageToLog.message);
            }

            //  Run callback if supplied
            if (callbackPassed && validate.callback(callbackPassed)) {
                callbackPassed(null, deleted);
            }
        }

        //  Exception
        function exception(errorDeletingDocuments) {

            //  Log the error (errors are always logged)
            messageToLog =  messages('document.error.deletingDocuments');
            log.error(messageToLog.message);

            //  Callback supplied
            if (callbackPassed && validate.callback(callbackPassed)) {
                callbackPassed(messageToLog.message, null);
            }
        }
    }

}



//  Export the module
module.exports  =   removeDocuments;
