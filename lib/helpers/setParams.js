//  Dependancies
var checks =    require('../checks'),

    //  Checks
    checkConfiguration      =   checks.configuration,
    checkCollection         =   checks.collection;


//  Set collection/checkConfiguration//  One parameter supplied
function setParams(param_one, param_two, defaultSettings) {
    'use strict';


    //  init
    var returnValue,
        _collection, _settings;


    //  One parameter passed (collection || configuration)
    if (param_one && !param_two) {

        //  Configuration supplied
        var _settingsSupplied = typeof param_one === 'string';
        _settingsSupplied     = _settingsSupplied || typeof param_one === 'number';
        _settingsSupplied     = _settingsSupplied || (typeof param_one === 'object' && _checkConfigrationObjectProps(param_one));

        //  Collection supplied
        var _collectionSupplied    =    typeof param_one === 'object';
        _collectionSupplied        =    _collectionSupplied && param_one.s;

        //  Configuration
        if (_settingsSupplied) {
            _settings   =    checkConfiguration(param_one, defaultSettings);
        }
        //  Collection
        else if (_collectionSupplied) {
            _collection =    checkCollection(param_one);
        }
        //  No parameters passed || invalid configuration object
        else {
            _settings   =   defaultSettings;
        }
    }


    //  Two parameters supplied (collection && configuration)
    if (param_one && param_two) {
        _settings   =    checkConfiguration(param_two, defaultSettings);
        _collection =    checkCollection(param_one);
    }


    //  Set the return object
    returnValue =   {
        settings   :    _settings,
        collection :    _collection
    };

    ////////
    return returnValue;
}

/*
*   Determine if the object passed is
*   configuration(settings) object
*
*   Returns a settings boolean value, based on the check
*/
function _checkConfigrationObjectProps(configuration) {
    //  init
    var check              =    false,
        configurationProps =    ['info', 'information', 'warn', 'warning', 'scs', 'success', 'includeLogs', 'includeTime'];

    for (var _index = 0; _index < configurationProps.length; _index++) {
        check = check || configuration.hasOwnProperty(configurationProps[_index]);
    }

    ////////
    return  check;
}



//  Export the module
module.exports =    setParams;
