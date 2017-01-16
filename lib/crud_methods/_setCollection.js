//  Dependancy
var validate =  require('../validation');


/*
*   Function accepts 3 parameters,
*   (constructorCollection<Collection||undefined> && methodCollection<Collection||undefined> && configuration<Object>)
*
*   Returns an Object<Collection>
*
*/
function setCollection(constructorCollection, methodCollection, configuration) {
    'use strict';


    //  init
    var collection, messageToLog;


    //  Check if the method collection is supplied and validate it
    if (methodCollection) {
        methodCollection =  checkCollection(methodCollection);
    }


    //  1. Use constructor collection
    if (constructorCollection && !methodCollection) {
        collection =    constructorCollection;
        //  info messages already printed (index.js [58])
    }

    //  2. Use method collection (if valid, else define error)
    else if (!constructorCollection && methodCollection) {
        //  Use method collection
        if (!methodCollection._error) {
            collection =    methodCollection;
            if (settings.includeLogs.indexOf('info')) {
                infoMessage =   getMessage(['collection', 'validCollection'], collection.s.name);
                log.info(infoMessage);
            }
        }
        //  Invalid method collection (and no collection on the constructor instance) - error
        else {
            errMessage =    getMessage(['collection', 'invalidCollection_method'], method);
            errMessage.push('No valid collection passed, CRUD opeartion could not be permited');
            log.error(errMessage);
            errMessage.pop();
            errorCollection =   _returnErr();
        }
    }

    //  3/4. Use method collection (if valid, else use constructor collection)
    else if (constructorCollection && methodCollection) {
        //  Both collections valid (use method collection)
        if (!methodCollection._error) {
            //  Different collections
            if (constructorCollection.s.dbName !== methodCollection.s.dbName && constructorCollection.s.name !== methodCollection.s.name) {
                //  warn the user
                if (settings.includeLogs.indexOf('warn')) {
                    warnMessage =   getMessage(['collection', 'multipleCollections'], method);
                    log.warn(warnMessage);
                }
            }
            //  Method collection overwrites the constructor collection
            collection =    methodCollection.collection;
        }
        //  4. Use constructor collection (method collection invalid)
        if (methodCollection._error) {
            warnMessage =   getMessage(['collection', 'invalidCollection_method'], method);
            warnMessage.push('The collection set on constructor instance will be used instead');
            log.warn(warnMessage);
            warnMessage.pop();
            collection =    constructorCollection;
        }
    }

    //  5. no collection passed (define error)
    else {
        errMessage =    getMessage(['collection', 'noCollectionSupplied_method'], method);
        log.error(errMessage);
        errorCollection =   _returnErr();
    }


    if (errorCollection) {
        ////////
        return errorCollection;
    }
    else {
        ////////
        return collection;
    }
}


/*
*   Return error function
*   internal use only
*   constructs and error Object
*
*   Returns an Object<errorObject>
*
*/
function _returnErr() {
    var errObj      =   {};
    errObj._error    =   true;

    ////////
    return errObj;
}



/*
*   Set collection module
*       -   accepts 4 parameters
*       -   returns Object <collection || error Object>
*
*   Error Object includes custom '_error' property
*
*/
module.exports =    setCollection;
