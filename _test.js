//  Dependancies
var Mongo_CRUD  =   require('./index'),
    MongoClient =   require('mongodb').MongoClient;

//
// var errLog  =   new Logger(0),
//     infoLog =   new Logger({mode: 'info', includeTime : true});

//  Connect to the database
MongoClient.connect('mongodb://localhost:27017/test', connection);


function connection(err, db) {
    'use strict';


    //  Error connecting to database
    if (err) {
        console.log(err);
        throw new Error('\n => Error connecting to database \n'.red);
    }


    //  init
    var collection, configuration;

    collection    = db.collection('testCol');
    configuration = 'all';

    //  Crud instance
    var database =  Mongo_CRUD(configuration, collection);

    //  1.  Add document
    database
        .add('Ognjen',      CRUD_cb)
        .find('Ognjen',     CRUD_cb)
        .remove('Ognjen',   CRUD_cb);

    //  CRUD method callback
    function CRUD_cb(err, value) {
        if (err) {
            console.log('Error occured!');
            console.log(err);
        }
        else {
            console.log('Success!');
            console.log(value);
        }
    }
}
