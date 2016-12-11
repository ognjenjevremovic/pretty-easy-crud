//  Wrapper
function messages(moreInfo) {

    //  init
    var messages =  {};
    messages.collection     =   {};
    messages.insertDocument =   {};
    messages.setDocument    =   {};
    //  vars
    var collectionMessages =    messages.collection,
        insertDocument     =    messages.insertDocument,
        setDocument        =    messages.setDocument,
        ////////
        splitter =   '\n      - - - - -      \n';

    //  Collection messages
    collectionMessages.invalidCollection_constructor =  ['Invalid collection supplied', splitter, 'Collection supplied is not not a valid MongoDB collection'];
    collectionMessages.invalidCollection_method =   ['Invalid collection supplied', splitter, 'Collection supplied to the ' + moreInfo + ' is not not a valid MongoDB collection'];
    collectionMessages.noCollectionSupplied_constructor =   ['Collection not provided to a constructor', splitter, 'You must include the collection in the method (performed on the instance) instead', 'in order to succesfuly perform a CRUD action'];
    collectionMessages.noCollectionSupplied_method =   ['Collection not supplied', splitter, 'The collection object was not set on the constructor, nor it was passed to the ' + moreInfo + ' method', 'the action can not be performed'];
    collectionMessages.multipleCollections  =   ['Multiple collections supplied', splitter, 'You\'ve already set the collection on the constructor instance', 'The constructor instance collection, will be overwritten with the one you\'ve supplied to the' + moreInfo + 'method'];
    collectionMessages.validCollection      =   ['Connection established', splitter, 'Successfuly connected to the ' + moreInfo + ' collection.'];

    //  Insert document messages
    insertDocument.duplicateKey     =   ['Document was NOT inserted', splitter, 'Document with the same unique field value, already exist in the collection'];
    insertDocument.nativeError      =   ['Document was NOT inserted', splitter, 'There was an error inserting the document into collection, caused by the MongoDB driver', 'This is a native MongoDB driver error and is not caused by the module.'];
    insertDocument.documentInserted     =   ['Document inserted successfuly', splitter, 'Document successfuly inserted into ' + moreInfo + ' collection.'];
    insertDocument.noCollectionSupplied =   ['No collection supplied', splitter, 'You must supply collection to a constructor', 'or pass the collection as a parameter of a method, on an instance of a constructor'];

    //  Document types and values messages
    setDocument.unallowedType  =    ['Invalid document type', splitter, 'Document can NOT be in a type of ' + moreInfo];
    setDocument.unallowedValue =    ['Invalid document value', splitter, 'Document can NOT be the of value - ' + moreInfo + '.'];
    setDocument.docConstructed =    ['Document constructed', splitter, 'The value that you passed is set on the \'value\' key on the document'];



    ////////
    return messages;
}



//  Export the module
module.exports =    messages;
