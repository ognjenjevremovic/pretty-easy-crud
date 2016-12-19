//  Dependancies
var checks =    require('../checks'),

    //  Checks
    checkConfiguration      =   checks.configuration,
    checkCollection         =   checks.collection;


/*
*   Set parameters function (module)
*   Function accepts 3 parameters
*   and defines an Object with configuration && collection
*   properties and sets the return Object on the constructor instance
*
*   Returns an Object<collection && configuration>
*
*/
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
*   Perform configuration validation
*   internal use only
*   checks if the parameter is configuration Object
*
*   Returns an boolean
*
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



/*
*   Set instance of Constructor parameters module
*       -   accepts 3 parameters
*       -   returns Object and sets it as the Constructor instance value
*/
module.exports =    setParams;
