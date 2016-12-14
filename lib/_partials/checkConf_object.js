//  Validate configuration
function checkConfigrationObject(configuration) {
    //  init
    var check = false,
        configurationProps =    ['info', 'information', 'warn', 'warning', 'scs', 'success', 'includeLogs', 'includeTime'];

    for (var _index = 0; _index < configurationProps.length; _index++) {
        check = check || configuration.hasOwnProperty(configurationProps[_index]);
    }

    ////////
    return  check;
}



//  Export the module
module.exports =    checkConfigrationObject;
