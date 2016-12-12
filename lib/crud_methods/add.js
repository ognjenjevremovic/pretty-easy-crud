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
                        //  Return the warning
                        return ConstructorInstance;     //  ????
                    //  [Error]
                    default:
                        //  Error inserting the document (mongodb native)
                        var databaseInsertError =   {
                            message :   'Document NOT inserted!',
                            trace   :   'There was an error inserting the document into collection, caused by the MongoDB driver.\n This is a native MongoDB driver error and is not caused by the module.'
                        };
                        //  Log it if specified
                        helpers.logger(databaseInsertError, 'error', ConstructorInstance);
                        //  3. Reject the promise
                        return reject(databaseInsertError);
                }
            }
            //  Document inserted
            if(!notInserted && (inserted.result.ok === 1)) {
                var documentInserted    =   {
                    message :   'Document inserted',
                    trace   :   'Document successfuly inserted into ' + collection.collectionName + ' collection.'
                };
                //  Log it if specified
                helpers.logger(documentInserted, 'info', ConstructorInstance);
                //  3. Resolve the promise with a document inserted
                return resolve({
                    warning :   null,
                    doc     :   inserted.ops[0]
                });
            }
        }
    });


}

//  Insert document into database
function insertDocument(collection, documentToInsert, ConstructorInstance) {

    //  Insert document callback
    function insertDocument_cb(notInserted, inserted) {
        if(notInserted) {
            switch (notInserted.code) {
                //  [Warning]
                case 11000:
                    //  Duplicate key
                    var duplicateKeyWarning =   {
                        message :   'Document NOT inserted!',
                        trace   :   'Document with the same unique field value already exist (same value for the \'_id\' field provided)'
                    };
                    //  Log it if specified
                    helpers.logger(duplicateKeyWarning, 'warning', ConstructorInstance);
                    //  3. Resolve the promise with a warning
                    return resolve({
                        warning :   duplicateKeyWarning,
                        doc     :   null
                    });
                //  [Error]
                default:
                    //  Error inserting the document (mongodb native)
                    var databaseInsertError =   {
                        message :   'Document NOT inserted!',
                        trace   :   'There was an error inserting the document into collection, caused by the MongoDB driver.\n This is a native MongoDB driver error and is not caused by the module.'
                    };
                    //  Log it if specified
                    helpers.logger(databaseInsertError, 'error', ConstructorInstance);
                    //  3. Reject the promise
                    return reject(databaseInsertError);
            }
        }
        //  Document inserted
        if(!notInserted && (inserted.result.ok === 1)) {
            var documentInserted    =   {
                message :   'Document inserted',
                trace   :   'Document successfuly inserted into ' + collection.collectionName + ' collection.'
            };
            //  Log it if specified
            helpers.logger(documentInserted, 'info', ConstructorInstance);
            //  3. Resolve the promise with a document inserted
            return resolve({
                warning :   null,
                doc     :   inserted.ops[0]
            });
        }
    }

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
