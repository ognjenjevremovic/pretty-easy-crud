//  Dependancies
var CRUD        =   require('./index'),
    Logger      =   require('pretty-easy-logs'),
    MongoClient =   require('mongodb').MongoClient;


var errLog  =   new Logger(0),
    infoLog =   new Logger({mode: 'info', includeTime : true});

//  Connect to the database
MongoClient.connect('mongodb://localhost:27017/test', connection);

function connection(err, db) {
    'use strict';


    //  init
    var collection,
        _crudSettings = {
            info : true,
            warn : true,
            scs  : true
        };


    //  Error connecting to database
    if (err) {
        errLog(err);
        return;
    }

    //  Set collection
    collection =    db.collection('testCol');

    //  Crud instance
    var testCollection =    new CRUD(collection, {includeLogs : true});
}
