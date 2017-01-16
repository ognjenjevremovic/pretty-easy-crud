/*
*   Module used to construct :
*       - database ready documents (valid documents)
*           valid for insertion,
*       - query documents (valid documents)
*           valid for querying the database
*/

//  Dependancy
var setDocument =   require('./document'),
    setQuery    =   require('./query');



//  Export the module
module.exports.document =   setDocument;
module.exports.query    =   setQuery;
