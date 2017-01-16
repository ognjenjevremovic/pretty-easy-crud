//  Dependancies
var setParams    =  require('./core'),
    CRUD_methods =  require('./crud_methods');


/*
*   CRUD constructor (module entry point)
*
*   Constructor accepts two parameters
*   (param_one<Collection||Object>, param_two<Collection>)
*
*   Returns an Object<CRUD module>
*
*/
function DatabaseCRUD(param_one, param_two) {
    'use strict';


    //  Must be called as a constructor
    if (!(this instanceof DatabaseCRUD)) {
        return new DatabaseCRUD(param_one, param_two);
    }


    //  init
    var params, collection, configuration;


    //  Set collection/configuration objects
    params          =   setParams(param_one, param_two);
    collection      =   params.collection;
    configuration   =   params.configuration;


    //  Set properties on the instance of constructor
    this.collection     =   collection;
    this.configuration  =   configuration;
}


/*
*   Add (insert) new document into collection
*/
DatabaseCRUD.prototype.add =    DatabaseCRUD.prototype.insert = function(documentToAdd, callback) {
    //  implement the method for adding docs
    return CRUD_methods.add.call(this, documentToAdd, callback);
};
/*
*   Query the collection
*/
DatabaseCRUD.prototype.find =   function(query, collection, callback) {
    //  implement the method for finding records
    //  return find.call(this, query, collection, callback);
};
/*
*   Remove the document from the collection
*/

DatabaseCRUD.prototype.remove = function(query, collection, callback) {
    //  implement the method for removing records
    //  return remove.call(this, query, collection, callback);
};
/*
*   Update the document in the collection
*/
DatabaseCRUD.prototype.update = function(query, propertiesToAdd, collection, callback) {
    //  implement the method for updating records
    //  return update.call(this, query, propertiesToAdd, collection, callback);
};
/*
*   Replace the whole document in the collection with a new one
*/
DatabaseCRUD.prototype.replace =    function(query, newRecord, collection, callback) {
    //  implement the method for replacing records
    //  return replace.call(this, query, newRecord, collection, callback);
};



//  Export the module
module.exports =    DatabaseCRUD;
