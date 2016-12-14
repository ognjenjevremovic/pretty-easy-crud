//  Dependancies
var constructDoc   =    require('./documentConstructor'),
    logToConsole   =    require('./logToConsole'),
    messageOutputs =    require('./messages');


//  Export the module
module.exports.constructDoc =   setCollection;
module.exports.log          =   setDocument;
module.exports.messages     =   messageOutputs;
