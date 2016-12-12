//  Dependancies
var messages       =    require('../_messages'),
    log            =    require('../_logToConsole'),
    DocumentObject =    require('./_documentConstructor'),
    check          =    require('../checks'),
    checkDocument  =    check.checkDocument;


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
            if (dbDocument.unallowedType) {
                errMessage =    messages(typeof dbDocument).setDocument.unallowedType;
            }
            else if (dbDocument.unallowedValue) {
                var _value =    (dbDocument === '') ? 'empty string' : dbDocument;
                errMessage =    messages(_value).setDocument.unallowedValue;
            }
            else if (dbDocument.emptyObject) {
                errMessage =    messages('empty object').setDocument.unallowedValue;
            }
            else if (dbDocument.emptyArray) {
                errMessage =    messages('empty array').setDocument.unallowedValue;
            }

            log.error(errMessage);
            invalidDocument =   _returnErr();
        }

        //  3. Invalid document value (construct document)
        if (dbDocument._invalidDocType) {
            dbDocument =    new DocumentObject(dbDocument, settings.includeTime);
            if (settings.includeLogs.indexOf('info') >= 0) {
                infoMessage =   messages().setDocument.docConstructed;
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
