//  Dependancies
var constructDoc   =    require('./documentConstructor'),
    logToConsole   =    require('./logToConsole'),
    getMessage     =    require('./getMessage');


//  Export the module
module.exports.DocumentObject = DocumentObject;
module.exports.log            = logToConsole;
module.exports.getMessage     = getMessage;
