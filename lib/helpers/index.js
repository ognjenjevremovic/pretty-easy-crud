//  Dependancies
var DocumentConstructor =   require('./documentConstructor'),
    logToConsole        =   require('./logToConsole'),
    setParams           =   require('./setParams');


/*
*   helpers module
*       - internal use only (by the module itself)
*       - not exposed to the user
*
*/
module.exports.DocumentObject = DocumentConstructor;
module.exports.log            = logToConsole;
module.exports.setParams      = setParams;
