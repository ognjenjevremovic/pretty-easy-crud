//  Dependancies
var getMessageObj = require('./getMessageObj'),
    defineOutput  = require('./defineOutput'),
    log           = require('../logger');


/*
*   Function accepts two parameters
*   (messageObjectPropertie<Array||string> && ?moreInfo<string>)
*
*   Logs the appropriate message to the console
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


    //  Log the message to the console
    log[output.type](output.message);
}



//  Export the module
module.exports =    messagesModule;
