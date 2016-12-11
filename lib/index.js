//  Dependancies
var log      =  require('./_logToConsole'),
    check    =  require('./checks'),
    messages =  require('./_messages');


//  Constructor
function DatabaseCRUD(param_one, param_two) {
    'use strict';


    //  defaults
    var defaults =  {};
    defaults.includeLogs =  ['error'];
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
        _isCollection  =    check.collection(param_one);
        if (!_isCollection.error) {
            collection =    _isCollection;
        } else if (typeof param_one === 'string' || typeof param_one === 'number' || param_one.hasOwnProperty('includeLogs') || param_one.hasOwnProperty('includeTime')) {
            settings   =    check.configuration(param_one, settings);
        } else {
            //  defaults already set!
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
    if (collection && collection.error) {
        log.error(messages().collection.invalidCollection_constructor);
        //  exit
        return;
    }
    //  Valid collection (info.collection.validCollection)
    if (collection && !collection.error && _includeLogs(settings.includeLogs, 'info')) {
        moreInfo =  collection.name;
        log.info(messages(moreInfo).collection.validCollection);
    }

    ////////
    this.settings   =   settings;
    this.collection =   collection.collection;
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
    // return find.call(this);
};
DatabaseCRUD.prototype.remove = function(query, collection) {
    //  implement the method for removing records
    // return remove.call(this);
};
DatabaseCRUD.prototype.update = function(query, propertiesToAdd, collection) {
    //  implement the method for updating records
    // return update.call(this);
};
DatabaseCRUD.prototype.replace =    function(query, newRecord, collection) {
    //  implement the method for replacing records
    // return replace.call(this);
};

//  Include logs
function _includeLogs(includeLogs, settingslogType) {
    return (includeLogs.indexOf(settingslogType) > -1) ? true :  false;
}



//  Export the module
module.exports =    DatabaseCRUD;
