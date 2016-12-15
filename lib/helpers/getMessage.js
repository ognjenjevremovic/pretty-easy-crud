//  Dependancies
var messages =  require('../_partials').messages;


//  Get the appropriate message
function getMsg(parameter, moreInfo) {
    //  init
    var _message =  messages(moreInfo);


    //  Get appropriate message
    for (var _index = 0; _index < parameter.length; _index++) {
        _message =  _message[parameter[_index]];
    }

    ////////
    return _message;
}


//  Export the module
module.exports =    getMsg;
