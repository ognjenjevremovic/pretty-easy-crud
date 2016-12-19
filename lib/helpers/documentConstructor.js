//  Dependancies
var dates = require('pretty-easy-dates');


/*
*   Construct Document Constructor (module)
*   Function accepts two parameters
*   and constructs a new document<Object> with properties
*   based on the supplied arguments/values
*
*   Returns an Object<document>
*
*/
function DocumentConstructor(value, includeTime) {
    this.value =    value;

    if (includeTime) {
        var dateCreated =   {};
        dateCreated.timestamp  =    dates().timestamp;
        dateCreated.dateObject =    dates().dateObj;
        dateCreated.human      =    {
            date :  dates().date,
            time :  dates().time
        };

        this.dateCreated =  dateCreated;
    }
}



/*
*   Document Constructor module
*       -   accepts 2 parameters and construct a document based on passed values
*       -   returns document Object (to be stored in the MongoDB collection)
*/
module.exports =    DocumentConstructor;
