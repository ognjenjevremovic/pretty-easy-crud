//  init
var includeLogs;

//  default
includeLogs =   ['error'];


/*
*   Function accepts a single parameter
*   (configurationValue_num<number>)
*
*   Returns the array of log types<string>
*
*/
function setLogs_num(configurationValue_num) {
    'use strict';


    //  Check
    switch (configurationValue_num) {
        case 1:
            includeLogs.push('info');
            break;
        case 2:
            includeLogs.push('scs');
            break;
        case 3:
            includeLogs.push('info', 'scs');
            break;
        case 4:
            includeLogs.push('warn');
            break;
        case 5:
            includeLogs.push('info', 'warn');
            break;
        case 6:
            includeLogs.push('scs', 'warn');
            break;
        case 7:
            includeLogs.push('info', 'scs', 'warn');
            break;
        default:
            //  defaults already set ['error']
    }


    ////////
    return includeLogs;
}


/*
*   Function accepts a single parameter
*   (configurationValue_num<string>)
*
*   Returns the array of log types<string>
*
*/
function setLogs_str(configurationValue_str) {
    'use strict';


    //  Check
    switch (configurationValue_str) {
        case 'scs':
        case 'success':
            includeLogs.push('scs');
            break;
        case 'warn':
        case 'wrn':
        case 'warning':
            includeLogs.push('warn');
            break;
        case 'info':
        case 'information':
            includeLogs.push('info');
            break;
        case 'all':
            includeLogs.push('scs', 'warn', 'info');
            break;
        default:
            //  defaults already set ['error']
    }


    ////////
    return includeLogs;
}


/*
*   Function accepts a single parameter
*   (configurationValue_obj<Objcet>)
*
*   Returns the array of log types<string>
*
*/
function setLogs_obj(configurationValue_obj) {
    'use strict';


    //  init
    var possibleKeywords, logModes, _logToInclude;


    //  possible properties
    possibleKeywords =  ['info', 'information', 'warn', 'wrn', 'warning', 'scs', 'success'];
    //  valid values
    logModes         =  ['info', 'warn', 'scs'];


    //  Itterate over object
    for (var _mode in configurationValue_obj) {
        //  is property a valid keyword
        if (possibleKeywords.indexOf(_mode) > -1) {
            //  is mode included
            if (configurationValue_obj[_mode] === true) {
                //  property already set
                if (includeLogs.indexOf(_mode) < 0) {
                    //  Get the logs array
                    _logToInclude = _setLogs_str(_mode);

                    //  Add the mode to the array (if it does NOT exist already)
                    for (var _index = 0; _index < _logToInclude.length; _index++) {
                        if (includeLogs.indexOf(_logToInclude[_index]) < 0) {
                            includeLogs.push(_logToInclude[_index]);
                        }
                    }
                }
            }
        }
    }


    ////////
    return includeLogs;
}



//  Export the module
module.exports.num =    setLogs_num;
module.exports.str =    setLogs_str;
module.exports.obj =    setLogs_obj;
