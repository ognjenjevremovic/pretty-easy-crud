//  Dependancies
var constructDoc   =    require('./documentConstructor'),
    logToConsole   =    require('./logToConsole'),
    getMessage     =    require('./getMessage'),
    setParams      =    require('./setParams');


/*
*   helpers module
*       - internal use only (by the module itself)
*       - not exposed to the user
*
*/
module.exports.DocumentObject = DocumentObject;
module.exports.log            = logToConsole;
module.exports.getMessage     = getMessage;
module.exports.setParams      = setParams;
