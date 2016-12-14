//  Dependancies
var helpers   = require('./helpers'),
    checks    = require('./checks'),
    partials  = require('./_partials'),

    //  Helpers
    log      =  helpers.log,
    messages =  helpers.messages,
    //  Checks
    checkCallback      =    checks.callback,
    checkCollection    =    checks.collection,
    checkConfiguration =    checks.configuration,
    checkDocument      =    checks.document,
    //  Partials
    getMessage         =    partials.getMessage,
    setParams          =    partials.setParams;


//  Constructor
function DatabaseCRUD(param_one, param_two) {
    'use strict';


    //  Must be called as a constructor
    if (!(this instanceof DatabaseCRUD)) {
        return new DatabaseCRUD(param_one, param_two);
    }


    //  init
    var params, collection, settings, moreInfo, message,

    //  defaults
    defaults =  {};
    defaults.includeLogs =  ['error', 'warn'];
    defaults.includeTime =  false;

    //  set defaults
    settings =  defaults;


    //  Set collection/settings
    params     =    setParams(param_one, param_two);
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
        throw new Error('\n = > Invalid collection supplied!\n');
    }
    //  Collection supplied && valid
    if (collection && !collection._error && collection.collection && _includeLogs(settings.includeLogs, 'info')) {
        message =   getMessage(['collection', 'validCollection'], collection.collection.s.name);
        log.info(message);
        //  store the collection
        this.collection =   collection.collection;
    }


    ////////
    this.settings   =   settings;
}


//  Methods
DatabaseCRUD.prototype.add =    DatabaseCRUD.prototype.create = function(documentToAdd, collection, callback) {
    //  init
    return _makeReturn(documentToAdd, collection, callback, addDoc);
};
DatabaseCRUD.prototype.find =   function(query, collection) {
    //  implement the method for finding records
    //  return find.call(this);
};
DatabaseCRUD.prototype.remove = function(query, collection) {
    //  implement the method for removing records
    //  return remove.call(this);
};
DatabaseCRUD.prototype.update = function(query, propertiesToAdd, collection) {
    //  implement the method for updating records
    //  return update.call(this);
};
DatabaseCRUD.prototype.replace =    function(query, newRecord, collection) {
    //  implement the method for replacing records
    //  return replace.call(this);
};


//  Check log type to include
function _includeLogs(logs, logToCheck) {
    return (logs.indexOf(logToCheck) > -1) ? true :  false;
}

//  Return value based on callback
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
