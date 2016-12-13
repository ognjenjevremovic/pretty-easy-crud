//  Dependancies
var messages =  require('../_messages'),
    log      =  require('../_logToConsole'),
    check    =  require('../checks'),
    checkCollection =   check.collection;


//  Check collections
function setCollection(constructorCollection, methodCollection, method, settings) {
    'use strict';


    //  init
    var collection, errMessage, warnMessage, infoMessage, moreInfo, errorCollection;

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
            collection =    methodCollection.collection;
            if (settings.includeLogs.indexOf('info')) {
                infoMessage =   messages(collection.name).collection.validCollection;
                log.info(infoMessage);
            }
        }
        //  Invalid method collection (and no collection on the constructor instance) - error
        else {
            errMessage =    messages(method).collection.invalidCollection_method;
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
            if (constructorCollection.dbName !== methodCollection.collection.dbName && constructorCollection.name !== methodCollection.collection.name) {
                //  warn the user
                if (settings.includeLogs.indexOf('warn')) {
                    warnMessage =   messages(method).collection.multipleCollections;
                    log.warn(warnMessage);
                }
            }
            //  Method collection overwrites the constructor collection
            collection =    methodCollection.collection;
        }
        //  4. Use constructor collection (method collection invalid)
        if (methodCollection._error) {
            warnMessage =    messages(method).collection.invalidCollection_method;
            warnMessage.push('The collection set on constructor instance will be used instead');
            log.warn(warnMessage);
            collection =    constructorCollection;
            warnMessage.pop();
        }
    }

    //  5. no collection passed (define error)
    else {
        errMessage =    messages(method).collection.noCollectionSupplied_method;
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


//  Throw error
function _returnErr() {
    var errObj      =   {};
    errObj._error    =   true;

    ////////
    return errObj;
}



/*
*   Set Collection function
*       -   returns an Object<collection||errorObject>
*           *   errorObj has the '_error' propertie
*           *   collection does NOT include '_error' property
*
*/
module.exports =    setCollection;
