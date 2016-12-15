/*
*   Check configuration Object passed to constructor
*   and define the log outputs and date
*
*   Returns a settings object
*/
function checkConfiguration(config, settings) {
    'use strict';


    //  Settings
    switch (typeof config) {
        case 'number':
            settings.includeLogs =  _setLogs_num(config);
            break;
        case 'string':
            settings.includeLogs =  _setLogs_str(config);
            break;
        case 'boolean':
            if (config) {
                settings.includeTime =  true;
            }
            break;
        case 'object':
            switch (typeof config.includeLogs) {
                case 'boolean':
                    if (config.includeLogs) {
                        settings.includeLogs =  _setLogs_num(7);
                    }
                    break;
                case 'number':
                    settings.includeLogs =  _setLogs_num(config);
                    break;
                case 'string':
                    settings.includeLogs =  _setLogs_str(config);
                    break;
                case 'object':
                    settings.includeLogs =  _setLogs_obj(config);
                    break;
                default:
                    //  defaults already set
            }
            settings.includeTime =  config.includeTime;
            break;
        default:
            //  default values already set
    }

    ////////
    return settings;
}


/*
*   Set logs array (with log types to include)
*   based on the number passed
*
*   Returns the array of log types
*/
function _setLogs_num(configuration) {
    var _logs = ['error'];

    //  Check
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

/*
*   Set logs array (with log types to include)
*   based on the string (keyword) passed
*
*   Returns the array of log types
*/
function _setLogs_str(configuration) {
    var _logs = ['error'];

    //  Check
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

/*
*   Set logs array (with log types to include)
*   based on the object passed
*
*   Returns the array of log types
*/
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
                    //  Get the logs array
                    var getLogs =   _setLogs_str(_mode);
                    //  Insert logs returned to the _logs array, if they don't already exist
                    for (var _index = 0; _index < getLogs.length; _index++) {
                        if (_logs.indexOf(getLogs[_index]) <= 0) {
                            _logs.push(getLogs[_index]);
                        }
                    }
                }
            }
        }
    }

    ////////
    return _logs;
}



/*
*   Check configuration function
*       -   returns an Object<configuration>
*           *   includes properties :
*                   includeLogs, includeTime
*
*/
module.exports =    checkConfiguration;
