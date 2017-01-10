//  Dependancies
var getMessageObj = require('./getMessageObj'),
    defineOutput  = require('./defineOutput');


/*
*   Function accepts two parameters
*   (messageObjectPropertie<Array||string> && ?moreInfo<string>)
*
*   Returns the message array, to be output to the console
*
*/
function messagesModule(messageObjectPropertie, moreInfo) {
    'use strict';


    //  init
    var messageObject, messageOutput;

    //  Get message object
    messageObject = getMessageObj(messageObjectPropertie);
    //  Define output message
    messageOutput = defineOutput(messageObject, moreInfo);


    ////////
    return messageOutput;
}



//  Export the module
module.exports =    messagesModule;
