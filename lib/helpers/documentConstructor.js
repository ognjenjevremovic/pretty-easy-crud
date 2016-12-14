//  Dependancies
var dates = require('pretty-easy-dates');


//  Construct new Object
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
*   Document object Constructor
*       -   returns a new instance of Document object<objectDocument||errorObject>
*           
*/
module.exports =    DocumentConstructor;
