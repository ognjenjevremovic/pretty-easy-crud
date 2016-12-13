//  Get messages
function messagesFn(moreInfo) {
    'use strict';


    //  init
    var messages =  {};

    //  vars
    var collectionMessages =    {},
        insertDocument     =    {},
        setDocument        =    {},
        ////////
        splitter =   '      - - - - -';

    //  Collection messages
    collectionMessages.noCollectionSupplied_constructor =   ['Collection not provided to a constructor', splitter, 'You must include the collection in the method (performed on the instance) instead', 'in order to succesfuly perform a CRUD action'];
    collectionMessages.invalidCollection_constructor =  ['Invalid collection supplied to the constructor', splitter, 'Collection supplied is not not a valid MongoDB collection'];
    collectionMessages.validCollection      =   ['Connection established', splitter, 'Successfuly connected to the ' + moreInfo + ' collection.'];
    collectionMessages.invalidCollection_method =   ['Invalid collection supplied', splitter, 'Collection supplied to the ' + moreInfo + ' method, is not not a valid MongoDB collection'];
    collectionMessages.noCollectionSupplied_method =   ['Collection not supplied', splitter, 'The collection object was not set on the constructor, nor it was passed to the ' + moreInfo + ' method', 'the action can not be performed'];
    collectionMessages.multipleCollections  =   ['Multiple collections supplied', splitter, 'You\'ve already set the collection on the constructor instance', 'The constructor instance collection, will be overwritten with the one you\'ve supplied to the' + moreInfo + 'method'];


    //  Insert document messages
    insertDocument.duplicateKey     =   ['Error inserting the document', splitter, 'Document was NOT inserted', 'Document with the same unique field value, already exist in the collection', 'Possible \'_id\' field value conflict'];
    insertDocument.nativeError      =   ['Document was NOT inserted', splitter, 'There was an error inserting the document into collection, caused by the MongoDB driver', 'This is a native MongoDB driver error and is not caused by the module.'];
    insertDocument.documentInserted     =   ['Document inserted successfuly', splitter, 'Document successfuly inserted into ' + moreInfo + ' collection.'];
    insertDocument.noCollectionSupplied =   ['No collection supplied', splitter, 'You must supply collection to a constructor', 'or pass the collection as a parameter of a method, on an instance of a constructor'];

    //  Document types and values messages
    setDocument.unallowedType  =    ['Invalid document type', splitter, 'Document can NOT be in a type of ' + moreInfo];
    setDocument.unallowedValue =    ['Invalid document value', splitter, 'Document can NOT be the of value - ' + moreInfo + '.'];
    setDocument.docConstructed =    ['Document constructed', splitter, 'The value that you passed is set on the \'value\' key on the document'];

    messages.collection = collectionMessages;
    messages.insertDocument = insertDocument;
    messages.setDocument = setDocument;


    ////////
    return messages;
}



/*
*   Messages function
*       -   returns Object (with key/value pairs)
*               *   each key has an array associated value that represents the 'message'
*       -   accepts 1 parameter<object||string>
*
*/
module.exports =    messagesFn;
