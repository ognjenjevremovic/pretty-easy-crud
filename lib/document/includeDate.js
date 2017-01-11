//  Dependancies
var dates = require('pretty-easy-dates');


/*
*   Function is a Constructor and does not accept any parameters
*
*   Returns an Object<document>
*   (instance of Constructor)
*
*/
function IncludeDate() {
    'use strict';


    //  Must be called as a constructor
    if (!(this instanceof IncludeDate)) {
        return new IncludeDate();
    }

    //  Date created
    var dateCreated =   {};
    dateCreated.timestamp  =    dates().timestamp;
    dateCreated.dateObject =    dates().dateObj;
    dateCreated.human      =    {
        date :  dates().date,
        time :  dates().time
    };

    //  Bind the date to the instance of Constructor
    this.dateCreated =  dateCreated;
}



//  Export the module
module.exports =    DocumentConstructor;
