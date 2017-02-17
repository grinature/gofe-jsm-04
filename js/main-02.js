// quizBuilder ...

// debugger;


var testBuilder = {

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

testBuilder.createQuizTree = function() {
    oLogger.log('Start of <createQuizTree>');

};

testBuilder.mount2Dom = function() {
    oLogger.log('Start of <mount2Dom>');
};


oLogger.log("testBuilder" + testBuilder);

testBuilder.createQuizTree();
testBuilder.mount2Dom();
