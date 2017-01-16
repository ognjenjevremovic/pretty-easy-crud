//  Dependancy
var validate    =   require('../validation'),
    messages    =   require('../messages'),
    log         =   require('../logger');


/*
*   Function accepts single parameter
*   (documentObject<Object||string||number>)
*
*   Returns an Object<document||warning||error>
*
*   Must be bind to the call (method on the CRUD instance)!
*   construct.query.bind(this)
*
*/
function setQuery(query) {
    'use strict';


    /* jshint validthis : true*/
    var constructorInstance =   this;


    //  init
    var queryValidation, messageToLog, queryDocument;


    //  check document
    queryValidation =    validate.document(query);

    //  invalid document
    if (queryValidation.valid === false) {
        queryDocument =  null;
        messageToLog =  messages('document.error.constructingQuery' + [queryValidation.reason], [queryValidation.moreInfo]);
        //  error messages are always logged
        log.error(messageToLog.message);
    }
    //  valid document
    else {
        queryDocument =  queryValidation;
    }


    ////////
    return queryDocument;
}



//  Export the module
module.exports =    setQuery;
