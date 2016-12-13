//  Dependancies
var log      =  require('./_logToConsole'),
    check    =  require('./checks'),
    messages =  require('./_messages');


//  Constructor
function DatabaseCRUD(param_one, param_two) {
    'use strict';


    //  defaults
    var defaults =  {};
    defaults.includeLogs =  ['error', 'warn'];
    defaults.includeTime =  false;

    //  init
    var settings, collection, moreInfo,
        _isCollection, _isSettings;
    settings =  defaults;


    //  Must be called as a constructor
    if (!(this instanceof DatabaseCRUD)) {
        return new DatabaseCRUD(param_one, param_two);
    }


    //  One parameter passed (collection || configuration)
    if (param_one && !param_two) {
        //  Configuration
        if (typeof param_one === 'string' || typeof param_one === 'number' ||
                (typeof param_one === 'object' && (param_one.hasOwnProperty('includeLogs') || param_one.hasOwnProperty('includeTime'))
            )
        ) {
            settings   =    check.configuration(param_one, settings);
        }
        //  Collection
        else if (typeof param_one === 'object' && param_one.s) {
            collection =    check.collection(param_one);
        }
        else {
            //  nothin'!
        }
    }

    //  Two parameters passed (collection && configuration)
    if (param_one && param_two) {
        collection =    check.collection(param_one);
        settings   =    check.configuration(param_two, settings);
    }


    //  Collection not passed (warn.collection.noCollectionSupplied_constructor)
    if (!collection && _includeLogs(settings.includeLogs, 'warn')) {
        log.warn(messages().collection.noCollectionSupplied_constructor);
    }
    //  Invalid collection (err.collection.invalidCollection_constructor)
    if (collection && collection._error) {
        //  exit
        log.error(messages().collection.invalidCollection_constructor);
        throw new Error(' = > Invalid collection!\n');
    }
    //  Valid collection (info.collection.validCollection)
    if (collection && !collection._error && collection.collection && _includeLogs(settings.includeLogs, 'info')) {
        log.info(messages(collection.collection.name).collection.validCollection);
        this.collection =   collection.collection;
    }


    ////////
    this.settings   =   settings;
}

//  Methods
DatabaseCRUD.prototype.add =    DatabaseCRUD.prototype.create = function(documentToAdd, collection) {
    //  implement the method for adding records
    if (!this.collection && collection) {
        this.collection =   collection;
    }

    ////////
    // return add.call(this);
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
function _includeLogs(includeLogs, settingsLogType) {
    return (includeLogs.indexOf(settingsLogType) > -1) ? true :  false;
}

//  Validate configuration
function _configurationValidity(configuration) {
    //  init
    var check = true,
        configurationProps =    ['info', 'information', 'warn', 'warning', 'scs', 'success', 'includeLogs', 'includeTime'];

    for (var _index = 0; _index < arrOfProps.length; _index++) {
        check = check && configuration.hasOwnProperty(arrOfProps[_index]);
    }

    ////////
    return  check;
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
