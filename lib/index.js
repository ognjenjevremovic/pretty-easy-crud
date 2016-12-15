//  Dependancies
var helpers   = require('./helpers'),
    checks    = require('./checks'),

    //  Helpers
    log                =  helpers.log,
    getMessage         =    partials.getMessage,
    setParams          =    helpers.setParams,
    //  Checks
    checkCallback      =    checks.callback,
    checkCollection    =    checks.collection,
    checkConfiguration =    checks.configuration,
    checkDocument      =    checks.document;


/*
*   Module constructor (module entry point)
*   Constructs a new instance module with CRUD methods to
*   operate on the collection supplied
*
*   Returns a CRUD instance with methods
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

        //  set defaults
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
        throw new Error('\n = > Invalid collection supplied to the constructor!\n');
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
    //  init
    return _makeReturn(documentToAdd, collection, callback, addDoc);
};
/*
*   Query the collection stored on the instance
*   or on the collection supplied as an argument to the method
*
*/
DatabaseCRUD.prototype.find =   function(query, collection) {
    //  implement the method for finding records
    //  return find.call(this);
};
/*
*   Remove the document from the collection stored on the instance
*   or from the collection supplied as an argument to the method
*
*/

DatabaseCRUD.prototype.remove = function(query, collection) {
    //  implement the method for removing records
    //  return remove.call(this);
};
/*
*   Update the document in the collection stored on the instance
*   or in the collection supplied as an argument to the method
*
*/
DatabaseCRUD.prototype.update = function(query, propertiesToAdd, collection) {
    //  implement the method for updating records
    //  return update.call(this);
};
/*
*   Replace the whole document in the collection stored on the instance
*   or on the collection supplied as an argument to the method
*
*/
DatabaseCRUD.prototype.replace =    function(query, newRecord, collection) {
    //  implement the method for replacing records
    //  return replace.call(this);
};


/*
*   Return boolean (true || false)
*   based on the input parameters.
*
*   Check if the certain types of messages shoould be logged
*
*/
function _includeLogs(logs, logToCheck) {
    return (logs.indexOf(logToCheck) > -1) ? true :  false;
}

/*
*   Method return value
*   based on the parameters passed.
*
*   Retruns Promise || instance of CRUD
*
*/
function _makeReturn(collection, callback, method, doc_one, doc_two) {
    //  init
    var _callbackCheck, _callbackPassed, _noCallback;


    //  Check if callback is passed
    _callbackCheck =    checkCallback(collection, callback);
    if (typeof _callbackCheck === 'function') {
        _callbackPassed =   _callbackCheck;
    }
    else {
        _noCallback     =   _callbackCheck;
    }

    //  Return instance of CRUD (callback not supplied)
    if (_callbackPassed && !_noCallback) {
        new Promise(function(resolve, reject) {
            return resolve(method.call(this, documentToAdd, collection));
        }).then(function(resolve, reject) {
            ////////
            return resolve(this);
        });
    }
    //  Return Promise (callback supplied)
    else if (_noCallback && !_callbackPassed) {
        ////////
        return new Promise(function(resolve, reject) {
            return resolve(method.call(this, documentToAdd, collection));
        });
    }
}



/*
*   Entry point constructor
*       -   returns a new instance of CRUD object
*           *   Object returned has methods :
*                   add/create, find, remove, update, replace
*           *   Each method accepts a few parameters
*       -   Constructor accepts 1 || 2 parameters
*           *   1 param passed (collection || configuration)
*           *   2 params passed (first_param<collection>, second_param<configuration>)
*
*/
module.exports =    DatabaseCRUD;
