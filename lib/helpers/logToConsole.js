//  Dependancy
var Logs =  require('pretty-easy-logs');


//  Instantiate the methods
var errLog =    new Logs(0),
    infoLog =   new Logs({mode : 1, includeTime : true}),
    scsLog  =   new Logs({mode : 2, includeTime : true}),
    warnLog =   new Logs({mode : 3, includeTime : true});



/*
*   Logger module
*       -   returns Object with methods to log the message to the console in an appropriate manner/style
*/
module.exports.error =  errLog;
module.exports.info  =  infoLog;
module.exports.scs   =  scsLog;
module.exports.warn  =  warnLog;
