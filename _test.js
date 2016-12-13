//  Dependancies
var CRUD        =   require('./index'),
    Logger      =   require('pretty-easy-logs'),
    MongoClient =   require('mongodb').MongoClient;


var errLog  =   new Logger(0),
    infoLog =   new Logger({mode: 'info'});

//  Connect to the database
MongoClient.connect('mongodb://localhost:27017/test', connection);

function connection(err, db) {
    'use strict';


    //  init
    var collection;

    //  Error connecting to database
    if (err) {
        errLog(err);
        return;
    }
    infoLog('Successfuly connected to ' + db.s.databaseName + ' database.');

    //  Set collection
    collection =    db.collection('testCol');

    //  Crud instance
    var testCollection =    new CRUD(collection, 'info');
}
