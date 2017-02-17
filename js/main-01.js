// quizBuilder ...

// debugger;


// the Quiz Wrapper
// var quizVar = (function() {
// ;
var quizVar = (function() {
    var quizIntVar = "someVar";

    function quizBuilder() {
        // this.quizBuilderVar = "Hello from quizBuilder";

        debugger;
        oLogger.log("quizBuilder has started ...");

        // function getQuizBuilderVar() {
        debugger;
        quizBuilder.getQuizBuilderVar = function() {
        // this.getQuizBuilderVar() {
            oLogger.log("insideOf getQuizBuilderVar " + this.quizBuilderVar);
            oLogger.log("insideOf getQuizBuilderVar : var quizIntVar ==  " + quizIntVar);
            return true;
        };

    }

    // debugger;
    quizBuilder.quizBuilderVar = "Hello from quizBuilder";
    quizBuilder.varNum02 = "1234";

    window.quizModule = quizBuilder;


        return "funReturn";
})();

debugger;
oLogger.log('quizVar = ' + quizVar);
quizModule();

oLogger.log(quizModule.getQuizBuilderVar());
oLogger.log("ok");
