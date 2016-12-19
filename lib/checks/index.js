//  Dependancies
var collectionCheck    =    require('./collection'),
    configurationCheck =    require('./configuration'),
    documentCheck      =    require('./document'),
    callbackCheck      =    require('./callback');



/*
*   checks module
*       - internal use only (by the module itself)
*       - not exposed to the user
*
*/
module.exports.collection    =  collectionCheck;
module.exports.configuration =  configurationCheck;
module.exports.document      =  documentCheck;
module.exports.callback      =  callbackCheck;
