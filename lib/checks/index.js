//  Dependancies
var collectionCheck    =    require('./collection'),
    configurationCheck =    require('./configuration'),
    documentCheck      =    require('./document');



/*
*   Check object
*       -   Object has methods on it for checking certain types of values
*       -   the methods return object (errorObj||warnObj||successObj<collection||configuration||document>)
*
*/
module.exports.collection    =  collectionCheck;
module.exports.configuration =  configurationCheck;
module.exports.document      =  documentCheck;
