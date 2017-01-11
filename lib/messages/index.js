//  Dependancies
var getMessageObj = require('./getMessageObj'),
    defineOutput  = require('./defineOutput'),
    log           = require('../logger');


/*
*   Function accepts two parameters
*   (messageObjectPropertie<Array||string> && ?moreInfo<string>)
*
*   Returns the Object, containing the message to output to the console
*
*/
function messagesModule(messageObjectPropertie, moreInfo) {
    'use strict';


    //  init
    var messageObject, output;

    //  Get message object
    messageObject = getMessageObj(messageObjectPropertie);
    //  Define output message
    output        = defineOutput(messageObject, moreInfo);


    ////////
    return output;
}



//  Export the module
module.exports =    messagesModule;
