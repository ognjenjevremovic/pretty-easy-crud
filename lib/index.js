//  Dependancies
var helpers   = require('./helpers'),
    checks    = require('./checks'),
    messages  = requier('./messages'),

    //  Helpers
    log                =    helpers.log,                //  log to console
    setParams          =    helpers.setParams,          //

    //  Checks
    checkCallback      =    checks.callback,            //  check if the parameter supplied is callback fn
    checkCollection    =    checks.collection,          //  check if the parameter is valid db collection
    checkConfiguration =    checks.configuration,       //  check if the parameter is valid configuration
    checkDocument      =    checks.document;            //  check if the parameter is valid document object


/*
*   Module Constructor (module entry point)
*   Constructs a new instance module with CRUD methods to
*   operate on the collection supplied
*
*   Returns an Object<CRUD module>
*
*/
function DatabaseCRUD(param_one, param_two) {
    'use strict';


    //  Must be called as a constructor
    if (!(this instanceof DatabaseCRUD)) {
        return new DatabaseCRUD(param_one, param_two);
    }


    //  init
    var params, collection,
        settings, moreInfo, message,
        //  defaults
        defaults =  {};
        defaults.includeLogs =  ['error', 'warn'];
        defaults.includeTime =  false;


    //  Define defaults
    settings =  defaults;

    //  Set collection/settings
    params     =    setParams(param_one, param_two, defaults);
    collection =    params.collection;
    settings   =    params.settings;


    //  No collection supplied => 'warn' the user
    if (!collection && _includeLogs(settings.includeLogs, 'warn')) {
        message =   getMessage(['collection', 'noCollectionSupplied_constructor']);
        log.warn(message);
    }
    //  Invalid collection supplied => 'err' out
    if (collection && collection._error) {
        message =   getMessage(['collection', 'invalidCollection_constructor']);
        log.error(message);
        //  exit
        // ?? throw new Error('\n = > Invalid collection supplied to the constructor!\n');
    }
    //  Collection supplied && valid
    if (collection && !collection._error && _includeLogs(settings.includeLogs, 'info')) {
        message =   getMessage(['collection', 'validCollection'], collection.s.name);
        log.info(message);
        //  store the collection
        this.collection =   collection;
    }


    ////////
    this.settings   =   settings;
}


/*
*   Add (insert) new document into collection stored on the instance
*   or on the collection supplied as an argument to the method
*
*/
DatabaseCRUD.prototype.add =    DatabaseCRUD.prototype.insert = function(documentToAdd, collection, callback) {
    //  implement the method for adding docs
    //  return add.call(this, documentToAdd, collection, callback);
};
/*
*   Query the collection stored on the instance
*   or on the collection supplied as an argument to the method
*
*/
DatabaseCRUD.prototype.find =   function(query, collection, callback) {
    //  implement the method for finding records
    //  return find.call(this, query, collection, callback);
};
/*
*   Remove the document from the collection stored on the instance
*   or from the collection supplied as an argument to the method
*
*/

DatabaseCRUD.prototype.remove = function(query, collection, callback) {
    //  implement the method for removing records
    //  return remove.call(this, query, collection, callback);
};
/*
*   Update the document in the collection stored on the instance
*   or in the collection supplied as an argument to the method
*
*/
DatabaseCRUD.prototype.update = function(query, propertiesToAdd, collection, callback) {
    //  implement the method for updating records
    //  return update.call(this, query, propertiesToAdd, collection, callback);
};
/*
*   Replace the whole document in the collection stored on the instance
*   or on the collection supplied as an argument to the method
*
*/
DatabaseCRUD.prototype.replace =    function(query, newRecord, collection, callback) {
    //  implement the method for replacing records
    //  return replace.call(this, query, newRecord, collection, callback);
};


/*
*   Perform the log validation
*   internal use only
*   Check if the certain types of messages shoould be logged
*
*   Returns an boolean
*
*/
function _includeLogs(logs, logToCheck) {
    return (logs.indexOf(logToCheck) > -1) ? true :  false;
}



/*
*   Entry point module Constructor
*       -   accepts up to 2 parameters (can be constructed with no parameters)
*           - if collection is not passed to the Constructor, it must be passed on the method (performed on the instance of Constructor)
*           - if configuration is not passed to the Constructor, defaults will be set
*       -   returns Object <CRUD module>
*
*/
module.exports =    DatabaseCRUD;
