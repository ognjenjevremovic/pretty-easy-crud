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

    //  1.  Add documents
        //  1.1 Adding document with callback
    /*
    database
        .add('Ognjen',  CRUD_cb)
        .add('Uros',    CRUD_cb)
        .add('Jasmina', CRUD_cb);
    */
        //  1.2 Adding document without callback
    /*
    database
        .add('Ognjen')
        .add('Uros')
        .add('Jasmina');
    */

    //  2.  Query the collection
        //  2.1 Query the collection with callback

    database
        .find({"dateCreated.human.date" : '16.1.2017'}, CRUD_cb);

        //  2.2 Query the collection without callback
    /*
    database
        .find({"dateCreated.human.date" : '16.1.2017'});
    */

    database
        .remove('Ognjen', CRUD_cb);

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
