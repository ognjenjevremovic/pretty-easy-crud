/*
*   Function accepts two parameters
*   (messageObject<Object> && moreInfo<string>)
*
*   Returns the message array, to be output to the console
*
*/
function defineOutput(messageObject, moreInfo) {
    'use strict';


    //  init
    var output, message, splitter;

    output   =  {};
    splitter =  '      - - - - -';


    //  Set additional info (if provided)
    if (messageObject.requiresParam) {

        //  Add additional info to the last message
        message =   messageObject.moreInfo[messageObject.moreInfo.length - 1];
        message +=  moreInfo;

        //  Replace the message in the array
        messageObject.moreInfo.pop();
        messageObject.moreInfo.push(message);

        //  Remove the unnecessary property
        delete messageObject.requiresParam;
    }

    //  Define the output message
    output.message =    [];
    output.message.push(messageObject.head);
    output.message.push(splitter);
    messageObject.moreInfo.forEach(function(_msg) {
        output.message.push(_msg);
    });

    output.type =   messageObject.type;


    ////////
    return output;
}



//  Export the module
module.exports =    defineOutput;
