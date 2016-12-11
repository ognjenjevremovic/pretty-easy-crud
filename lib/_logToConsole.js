//  Dependancy
var Logs =  require('pretty-easy-logs');


//  Instantiate the methods
var errLog =    new Logs(0),
    infoLog =   new Logs(1),
    scsLog  =   new Logs(2),
    warnLog =   new Logs(3);



//  Export the module
module.exports.error =  errLog;
module.exports.info  =  infoLog;
module.exports.scs   =  scsLog;
module.exports.warn  =  warnLog;
