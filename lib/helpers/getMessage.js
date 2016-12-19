//  Dependancies
var messages =  require('../_partials').messages;


/*
*   Get message function (module)
*   Function accepts two parameters
*   and returns a message to be output to console
*   based on arguments
*
*   Returns an Message<string>
*
*/
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


/*
*   Get messages module
*       -   accepts 2 parameters and gets the appropriate message
*       -   returns string (to be output to the console)
*/
module.exports =    getMsg;
