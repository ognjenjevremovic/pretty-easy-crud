//  Dependancies
var getMessage =    require('./getmessage'),
    setParams  =    require('./setParams');



/*
*   _partials module
*       - internal use only (by the module itself)
*       - not exposed to the user
*
*/
module.exports.getMessage = getMessage;
module.exports.setParams  = setParams;
