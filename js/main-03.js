// quizBuilder ...

// debugger;


var testObj_01 = {

    quizName : 'Тест по программированию',
    questionVec : [
        // Question 01
        {
            qHeader : 'Вопрос №1',
            qList : [
                'Вариант ответа 01',
                'Вариант ответа 02',
                'Вариант ответа 03',
            ]
        },
        // Question 02
        {
            qHeader : 'Вопрос №2',
            qList : [
                'Вариант ответа 01',
                'Вариант ответа 02',
                'Вариант ответа 03',
            ]
        },
        // Question 02
        {
            qHeader : 'Вопрос №3',
            qList : [
                'Вариант ответа 01',
                'Вариант ответа 02',
                'Вариант ответа 03',
            ]
        }
    ],   // eof questionVec
};

/* the Constructor "QuizBuilder"

    ==> It provides the possibility to create multiple object instances
 */
function QuizBuilder(quizObj) {
    // var intQuizObj = quizObj;

    var quizA = 'A';
    var quizNum = 9;

    oLogger.log('Start of constructor<QuizBuilder>');

    function privateFunction01() {
        oLogger.log("quizA = {" + quizA + "} quizNum = {" + quizNum + "}");
    }

    this.publicFunction01 = function() {
        oLogger.log('Start of <publicFunction01>');
        privateFunction01();
    };

    oLogger.log('End of constructor<QuizBuilder>');
}

debugger;
var testBuilder = new QuizBuilder();
testBuilder.publicFunction01();



testBuilder.createQuizTree = function() {
    oLogger.log('Start of <createQuizTree>');

};

testBuilder.mount2Dom = function() {
    oLogger.log('Start of <mount2Dom>');
};


oLogger.log("testBuilder" + testBuilder);

testBuilder.createQuizTree();
testBuilder.mount2Dom();
