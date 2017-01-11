//  Dependancy
var check = require('./index');


//  init
var toLog;


toLog = check(function() {});
console.log(toLog);

toLog = check(true);
console.log(toLog);

toLog = check();
console.log(toLog);

toLog = check(null);
console.log(toLog);

toLog = check('');
console.log(toLog);

toLog = check(0);
console.log(toLog);

toLog = check({});
console.log(toLog);

toLog = check([]);
console.log(toLog);
