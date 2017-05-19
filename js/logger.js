/* jshint esversion: 6 */
/* exported oLogger */

'use strict';


// debugger;

let oLogger = {
    isSysLog : true, // TRUE, by default
    sysLogPrefix : 'SysLog ',
    logLevel : 'INFO',  // INFO (* default), SYSTEM, ERROR

    log : function(message) {
        if(this.isSysLog) {
            console.log(this.sysLogPrefix + '{' + this.logLevel + '} :: ' + message);
            return true;
        }
        return false;
    },

    logOff : function () {
        return (this.isSysLog = false);
    },
    logOn : function () {
        return (this.isSysLog = true);
    }
};
