//  Dependancy
var setParams = require('./index'),
    MongoClient =   require('mongodb').MongoClient;



MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
    if (err) {
        console.log(err);
    }

    var collection, configuration,
        collectionObj, configurationObj, _helper;


    collection    = db.collection('users');
    configuration = true;

    _helper =   setParams(configuration, collection);
    configurationObject =   _helper.configuration;
    collectionObj       =   _helper.collection;


    console.log(configurationObject);
    console.log('collection object : ' + collectionObj);

});
