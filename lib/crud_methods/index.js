/*
*   Module used to set
*   CRUD methods
*   (add, find, replace, remove, update)
*   on the constructor instance
*/

//  Dependancies
var addDocument     =   require('./add'),
    findDocument    =   require('./find');
    // removeDocument  =   require('./remove'),
    // replaceDocument =   require('./replace'),
    // updateDocument  =   require('./update');



//  Export the module
module.exports.add     =    addDocument;
module.exports.find    =    findDocument;
// module.exports.remove  =    removeDocument;
// module.exports.replace =    replaceDocument;
// module.exports.update  =    updateDocument;
