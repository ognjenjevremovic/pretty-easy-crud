//  Dependancy
var setLogs =   require('./_setLogs');


/*
*   Function accepts two parameters
*   (configuration<Object> && defaultConfiguration<Object>)
*
*   Returns configuration object
*
*/
function setConfiguration(configurationValuePassed, defaultConfiguration) {
    'use strict';


    //  init
    var configurationObject;
    configurationObject =   defaultConfiguration;


    //  check the configuration object type
    switch (typeof configurationValuePassed) {
        case 'number':
            configurationObject.includeLogs =   setLogs.num(configurationValuePassed);
            break;
        case 'string':
            configurationObject.includeLogs =   setLogs.str(configurationValuePassed);
            break;
        case 'boolean':
            if (configurationValuePassed) {
                configurationObject.includeTime =   true;
            }
            else {
                configurationObject.includeTime =   false;
            }
            break;
        case 'object':
            //  includeLogs
            switch (typeof configurationValuePassed.includeLogs) {
                case 'number':
                    configurationObject.includeLogs =   setLogs.num(configurationValuePassed.includeLogs);
                    break;
                case 'string':
                    configurationObject.includeLogs =   setLogs.str(configurationValuePassed.includeLogs);
                    break;
                case 'boolean':
                    if (configurationValuePassed.includeLogs) {
                        configurationObject.includeLogs =  setLogs.num(7);
                    }
                    break;
                case 'object':
                    configurationObject.includeLogs =   setLogs.obj(configurationValuePassed.includeLogs);
                    break;
                default:
                    //  defaults already set
            }
            //  includeTime
            if (configurationValuePassed.includeTime === true) {
                configurationObject.includeTime =   true;
            }
            else {
                configurationObject.includeTime =   false;
            }
            break;
        default:
            //  default values already set
    }


    ////////
    return configurationObject;
}



//  Export the module
module.exports =    setConfiguration;
