//  Dependancy
var validType  =    require('./_type'),
    validValue =    require('./_value');


/*
*   Function accepts single parameters
*   (documentObject<Object||string||number>)
*
*   Returns an Object<info||error>
*
*/
function checkDocument(documentObject) {
    'use strict';


    //  init
    var type, value,
        toReturn;


    type  = validType(documentObject);
    value = validValue(documentObject);

    //  valid document type
    if (type.valid) {
        //  valid document value
        if (value.valid) {
            //  Check the type of the doc
            switch (typeof documentObject) {
                //  construct the document
                case 'string':
                case 'number':
                    toReturn =  {};
                    toReturn.value =    documentObject;
                    break;
                case 'object':
                    //  construct the document
                    if (documentObject instanceof Array) {
                        toReturn =  {};
                        toReturn.value =    documentObject;
                    }
                    //  document ready
                    else {
                        toReturn =  documentObject;
                    }
                    break;
                default:
                    //  no remaining values
            }
        }
        //  invalid document value
        else {
            toReturn =  value;
        }
    }
    //  invalid document type
    else {
        toReturn =  type;
    }


    ////////
    return toReturn;
}



//  Export the module
module.exports =    checkDocument;
