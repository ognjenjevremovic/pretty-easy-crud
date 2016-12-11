//  Check configuration
function checkConfiguration(configuration, settings) {
    'use strict';


    //  Settings
    switch (typeof configuration) {
        case 'number':
            settings.includeLogs =  _setLogs_num(configuration);
            break;
        case 'string':
            settings.includeLogs =  _setLogs_str(configuration);
            break;
        case 'boolean':
            settings.includeTime =  true;
            break;
        case 'object':
            switch (typeof settings.includeLogs) {
                case 'boolean':
                    settings.includeLogs =  _setLogs_num(7);
                    break;
                case 'number':
                    settings.includeLogs =  _setLogs_num(configuration);
                    break;
                case 'string':
                    settings.includeLogs =  _setLogs_str(configuration);
                    break;
                case 'object':
                    settings.includeLogs =  _setLogs_obj(configuration);
                    break;
                default:
                    //  defaults already set
            }
            settings.includeTime =  configuration.includeTime;
            break;
        default:
            //  default values already set
    }

    ////////
    return settings;
}

//  Set logs (number)
function _setLogs_num(configuration) {
    var _logs = ['error'];

    switch (configuration) {
        case 1:
            _logs.push('info');
            break;
        case 2:
            _logs.push('scs');
            break;
        case 3:
            _logs.push('info', 'scs');
            break;
        case 4:
            _logs.push('warn');
            break;
        case 5:
            _logs.push('info', 'warn');
            break;
        case 6:
            _logs.push('scs', 'warn');
            break;
        case 7:
            _logs.push('info', 'scs', 'warn');
            break;
        default:
            //  defaults already set
    }

    ////////
    return _logs;
}

//  Set logs (string)
function _setLogs_str(configuration) {
    var _logs = ['error'];

    switch (configuration) {
        case 'scs':
        case 'success':
            _logs.push('scs');
            break;
        case 'warn':
        case 'wrn':
        case 'warning':
            _logs.push('warn');
            break;
        case 'info':
        case 'information':
            _logs.push('info');
            break;
        case 'all':
            _logs.push('scs', 'warn', 'info');
            break;
        default:
            //  defaults already set ('error')
    }

    ////////
    return _logs;
}

//  Set logs (object)
function _setLogs_obj(configuration) {
    var _logs = ['error'],

    //  possible properties
    _logsProps =    ['info', 'information', 'warn', 'wrn', 'warning', 'scs', 'success'],
    //  valid values
    _logsMode  =    ['info', 'warn', 'scs'];

    //  Itterate over configuration object
    for (var _mode in configuration) {
        //  Check if the propertie is valid
        if (_logsProps.indexOf(_mode) >= 0) {
            //  Check if propertie is 'true' (mode included)
            if (configuration[_mode]) {
                //  Check if the propertie was not already set (double propertie value)
                if (_logs.indexOf(_mode) < 0) {
                    //  Include it
                    _logs = _setLogs_str(_mode);
                }
            }
        }
    }

    ////////
    return _logs;
}


//  Export the module
module.exports =    checkConfiguration;