//  Dependancies
var helpers =   require('../helpers'),
    log            =    require('../_logToConsole'),
    DocumentObject =    require('./_documentConstructor'),
    check          =    require('../checks'),

    //  Checks
    checkDocument  =    check.checkDocument,
    //  Helpers
    getMessage     =    helpers.getMessage,
    log            =    helpers.log,
    DocumentObject =    helpers.DocumentObject;


//  Check collections
function setDocument(dbDocument, settings) {
    'use strict';


    //  init
    var invalidDocument, errMessage, warnMessage, infoMessage;


    //  Document(value) passed
    if (dbDocument !== undefined) {
        //  Check document(value) if valid
        dbDocument =    checkDocument(dbDocument);

        //  1/2 Unallowed document value || type
        if (dbDocument.error) {
            //  Unallowed type
            if (dbDocument.unallowedType) {
                errMessage =    getMessage(['setDocument', 'unallowedType'], typeof dbDocument);
            }
            //  Unallowed value
            else {
                var _moreInfo;
                //  Empty string
                if (dbDocument === '') {
                    _moreInfo = 'empty string';
                }
                //  undefined, null, false, true
                else if (db.unallowedValue) {
                    _moreInfo = typeof db.unallowedValue;
                }
                else if (dbDocument.emptyObject) {
                    _moreInfo = 'empty object';
                }
                else if (dbDocument.emptyArray) {
                    _moreInfo = 'empty array';
                }

                //  Set the error message
                errMessage =    getMessage(['setDocument', 'unallowedValue'], _moreInfo);
            }

            //  Log
            log.error(errMessage);
            //  Set error to be returned
            invalidDocument =   _returnErr();
        }

        //  3. Invalid document value (construct document)
        if (dbDocument._invalidDocType) {
            dbDocument =    new DocumentObject(dbDocument, settings.includeTime);
            if (settings.includeLogs.indexOf('info') >= 0) {
                infoMessage =   getMessage(['setDocument', 'docConstructed']);
                log.info(infoMessage);
            }
        }


        if (invalidDocument) {
            ////////
            return invalidDocument;
        }
        else {
            ////////
            return dbDocument;
        }
    }
    //  Document not passed
    else {
        ////////
        return _returnErr();
    }
}


//  Throw error
function _returnErr() {
    var errObj      =   {};
    errObj._error    =   true;

    ////////
    return errObj;
}



/*
*   Set Document function
*       -   returns an Object<objectDocument||errorObject>
*           *   errorObj has the '_error' propertie
*           *   collection does NOT include '_error' property
*
*/
module.exports =    setDocument;
