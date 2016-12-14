//  Dependancies
var checks =    require('../checks'),
    checkConfigrationObjectProps =  require('./checkConf_object'),
    //  Checks
    checkConfiguration      =   checks.configuration,
    checkCollection         =   checks.collection;

//  Set collection/checkConfiguration//  One parameter supplied
function setParams(param_one, param_two) {
    //  init
    var returnValue,
        _collection, _settings;

    //  One parameter passed (collection || configuration)
    if (param_one && !param_two) {

        //  Configuration supplied
        var _settingsSupplied = typeof param_one === 'string';
        _settingsSupplied     = _settingsSupplied || typeof param_one === 'number';
        _settingsSupplied     = _settingsSupplied || (typeof param_one === 'object' && checkConfigrationObjectProps(param_one));
        //  Collection supplied
        var _collectionSupplied    =    typeof param_one === 'object';
        _collectionSupplied        =    _collectionSupplied && param_one.s;

        //  Configuration
        if (_settingsSupplied) {
            _settings   =    checkConfiguration(param_one, settings);
        }
        //  Collection
        else if (_collectionSupplied) {
            _collection =    checkCollection(param_one);
        }
    }

    //  Two parameters supplied (collection && configuration)
    if (param_one && param_two) {
        _settings   =    checkConfiguration(param_two, settings);
        _collection =    checkCollection(param_one);
    }

    //  Set values
    returnValue =   {
        settings   :    _configuration,
        collection :    _collection
    };

    ////////
    return returnValue;
}



//  Export the module
module.exports =    setParams;
