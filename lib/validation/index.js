//  Dependancies
var collectionCheck    =    require('./collection'),
    configurationCheck =    require('./configuration'),
    callbackCheck      =    require('./callback'),
    documentCheck      =    require('../document/check');



//  Export the module
module.exports.collection    =  collectionCheck;
module.exports.configuration =  configurationCheck;
module.exports.callback      =  callbackCheck;
module.exports.document      =  documentCheck;
