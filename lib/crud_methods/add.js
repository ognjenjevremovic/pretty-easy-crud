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
    if (collection.error) {
        //  exit
        return;
    }

    //  Define the document to insert
    documentToInsert =  setDocument(documentToInsert, settings.includeTime);
    if (documentToInsert.error) {
        //  exit
        return;
    }


    //  Insert the document into database
}

function _checkDocType(documentToInsert) {
    switch (typeof documentToInsert) {
        case 'number':
        case 'string':
        case 'boolean':
            //  construct document object
            break;
        case 'object':
            //  null - invalid document value
            if (!documentToInsert) {
                //  error!
            }
            //  empty object - invalid document value
            if (Object.keys(documentToInsert).length === 0) {
                //  error!
            }
            //  empty array - invalid document value
            if (documentToInsert instanceof Array && documentToInsert.length === 0) {
                //  error!
            }
            //  array - valid document value
            if (documentToInsert instanceof Array && documentToInsert.length >= 1) {
                //  construct document object
                //  return constructed document object
            }
            //  object - value document value
            if (Object.keys(documentToInsert).length >= 1) {
                //  return object
            }
            break;
        default:
            //  invalid document value
    }
}


//  Insert document into database
function insertDocument(collection, documentToInsert, ConstructorInstance) {

    return new Promise(function(resolve, reject) {

        //  Document || collection error
        if (collection.error || documentToInsert.error) {
            //  Collection error
            if (collection.error) {
                return reject(collection.error);
            }
            //  Document error
            if (documentToInsert.error) {
                return reject(documentToInsert.error);
            }
        }

        //  Insert the document
        collection.insertOne(documentToInsert)
            .then(insertDocument_cb);

    });

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


//  Export the module
module.exports  =   addDocument;
