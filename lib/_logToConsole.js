//  Dependancy
var Logs =  require('pretty-easy-logs');


//  Instantiate the methods
var errLog =    new Logs(0),
    infoLog =   new Logs({mode: 1, includeTime: true}),
    scsLog  =   new Logs({mode: 2, includeTime: true}),
    warnLog =   new Logs({mode: 3, includeTime: true});



/*
*   Logger object
*       -   returns an Object with methods
*       -   each method accepts 1 parameter (message<array||string||Object>)
*       -   the methods log out the message to the console (and optionally print to the *Logs.txt file)
*
*/
module.exports.error =  errLog;
module.exports.info  =  infoLog;
module.exports.scs   =  scsLog;
module.exports.warn  =  warnLog;
