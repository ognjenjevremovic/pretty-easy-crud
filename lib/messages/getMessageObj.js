//  Dependancies
var collectionMessages =    require('./messages.collection'),
    documentMessages   =    require('./messages.documents');


/*
*   Function accepts single parameter
*   (parameter<Array||string>)
*
*   Returns a message object<Object>
*
*/
function getMessageObject(parameter) {
    'use strict';


    //  init
    var messages, propertiesArray, messageObject;

    //  Get messages
    messages =  {};
    messages.collection =   collectionMessages;
    messages.document   =   documentMessages;


    //  Get appropriate message object
    switch (typeof parameter) {
        case "string":
            propertiesArray =   parameter.split('.');
            messageObject   =   _findMessageObject(propertiesArray, messages);
            break;
        case "object":
            propertiesArray =   parameter;
            messageObject   =   _findMessageObject(propertiesArray, messages);
            break;
        default:
            //  module used internaly only (don't handle these exceptions)
    }


    ////////
    return messageObject;
}


/*
*   used internaly, to find appropriate message
*
*   Function accepts two parameters
*   (propertiesArray<Array> && messages<Object>)
*
*   Returns a message object<Object>
*
*/
function _findMessageObject(propertiesArray, messages) {
    'use strict';


    //  init
    var messageObject;
    messageObject = messages;

    //  loop through the array of properties
    for (var _index = 0; _index < propertiesArray.length; _index++) {
        messageObject = messageObject[propertiesArray[_index]];
    }


    ////////
    return messageObject;
}



//  Export the module
module.exports =    getMessageObject;
