//  Dependancy
var check       =   require('./index'),
    MongoClient =   require('mongodb').MongoClient,
    log         =   require('../logger');



MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
    'use strict';

    if (err) {
        console.log(err);
    }

    //  init
    var collection, callback, configuration, checkResults;

    collection    = db.collection('users');
    callback      = function() {};
    configuration = {};
    configuration.num = 5;
    configuration.str = 'all';
    configuration.obj = {includeTime: true};

    checkResults = {};
    checkResults.configuration     =    {};
    checkResults.document          =    {};

    checkResults.collection        =    check.collection(callback);
    checkResults.callback          =    check.callback(collection);
    //  configuration alternations
    checkResults.configuration.str =    check.configuration(collection);
    checkResults.configuration.num =    check.configuration(collection);
    checkResults.configuration.obj =    check.configuration(collection);
    //  document alternations
    checkResults.document.str      =    check.document('ognjen');
    checkResults.document.num      =    check.document(1);
    checkResults.document.obj      =    check.document({name: 'ognjen'});
    checkResults.document.arr      =    check.document(['o', 'g', 'nj', 'e', 'n']);

    log.info(checkResults.document.arr);
});
