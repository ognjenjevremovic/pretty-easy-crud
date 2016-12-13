//  Dependancies
var helpers =   require('../_helpers'),
    setCollection = helpers.setCollection;


//  Add method
function addDocument(documentToInsert, collectionSupplied) {
    'use strict';


    /* jshint validthis : true*/
    var constructorInstance =   this;

    //  init
    var collection,

        constructorCollection = constructorInstance.collection,
        methodCollection      = collectionSupplied,
        method                = 'add';
        settings              = constructorInstance.settings;

    //  Set the collection on which to perform the action
    collection =    setCollection(constructorCollection, methodCollection, method, settings);
    if (collection._error) {
        //  exit
        return;
    }

    //  Define the document to insert
    documentToInsert =  setDocument(documentToInsert, settings);
    if (documentToInsert._error) {
        //  exit
        return;
    }

    //  Insert the document into collection
    return _insertDocument(documentToInsert, settings, ConstructorInstance);

}


//  Add document to collection
function _insertDocument(documentToInsert, settings, ConstructorInstance) {

    //  Return a Promise
    return new Promise(function(resolve, reject) {

        //  init
        var warnMessage, errMessage, infoMessage;

        //  Insert the document into database
        collection.insertOne(documentToInsert)
                    .then(insertDocument_cb);

        //  Insert document callback
        function insertDocument_cb(notInserted, inserted) {
            if(notInserted) {
                switch (notInserted.code) {
                    case 11000:
                        //  [Warning] - Duplicate key message
                        warnMessage =   messages().insertDocument.duplicateKey;
                        if (settings.includeLogs.indexOf('warning')) {
                            log.warn(warnMessage);
                        }
                        //  Return the instance of Constructor (method chain)
                        return resolve(ConstructorInstance);
                    //  [Error]
                    default:
                        //  Error inserting the document (mongodb native)
                        errMessage =    messages().insertDocument.nativeError;
                        //  Log it if specified
                        log.error(errMessage);
                        //  Return the instance of Constructor (method chain)
                        return reject(ConstructorInstance);
                }
            }
            //  Document inserted
            if(!notInserted && (inserted.result.ok === 1)) {
                infoMessage =   messages().insertDocument.documentInserted;
                //  Log it if specified
                log.info(infoMessage);
                //  3. Resolve the promise with a document inserted
                return resolve(ConstructorInstance);
            }
        }
    });
}



/*
*   Add function
*       -   no return value!
*       -   insert the document into database
*           *   includes properties :
*                   includeLogs, includeTime
*
*/
module.exports  =   addDocument;
