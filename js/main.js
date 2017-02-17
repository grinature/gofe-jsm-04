/*
    e.g. quiz-
*/
function IDRecord(prefix, root, startIndex = 1, multiple = false) {
    var bIsSafeId = false;

    this.isIdSFree = function() {
        if(!document.getElementById('id'))
            bIsSafeId = true;

        return bIsSafeId;
    };
}


// quizBuilder ...

// debugger;


var testObj_01 = {

    formDelivery : {
        method : 'post',
        action : '#'
    },
    quizSubmitMessage : 'Проверить мои результаты',
    quizName : 'Тест по программированию',
    questionVec : [
        // Question 01
        {
            //qType : 'single' || 'multiple' # either over RadioButton || Checkbox controls
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
function QuizBuilder(quizObj = null) {
    // Private section ...

    // the resulting Tree of the Quiz Module to be bound with DOM-hierachy of the web-page ('document')
    var finalTree = null;

    // var intQuizObj = quizObj;

    oLogger.log('Start of constructor<QuizBuilder>');

    /*  Method: Add(Bind) a node with its subtree to another one located either on the DOM-hierachy of the document or a new building tree
        Argument(s) :
            <node2Add>  - a node to be added
            <where2AddTo> - a node of a tree (or the DOM-hierachy) where to bind a node to
            <wayOfBinding> - ['append', 0, undefined, null] || ['first'] || ['before'] || [ 'after' ]
                where
                    { 'append', and alternatives } => means AppendChild-mode, i.e. to become the last element of the <where2AddTo>
                    { 'first' } => means Insert as the first child of <where2AddTo>
                    { 'before' } => means InsertBefore-mode
                    { 'after' } => means InsertBefore-mode with respect to nextSibling-element

    */

    function addElement(node2Add, where2AddTo, wayOfBinding = 'append') {
        oLogger.log('Start of <addElement> method');

        let htmlElement = null;
        let parentNode = where2AddTo.parentNode;

        switch (wayOfBinding) {
            case 'append':
            case (0 || undefined || null):
                htmlElement = where2AddTo.appendChild(node2Add);
                break;
            case 'first':
                htmlElement = parentNode.insertBefore(node2Add, parentNode.firstChild);
                break;
            case 'before':
                htmlElement = parentNode.insertBefore(node2Add, where2AddTo);
                break;
            case 'after':
                htmlElement = parentNode.insertBefore(node2Add, where2AddTo.nextSibling);
                break;
        }

        oLogger.log('End of <addElement> method');
        return htmlElement;
    }

    function newElement(tagName = null, id = null, className = null, text = null) {
        oLogger.log('Start of <newElement> method');

        let htmlEl = null;

        // Ideally, I have to parse thr string 'tagName'
        //  N.B. !!! I could create a method to parse the phrase with preliminary convertion an argument to String
        //if(tagName.trim().split(/\s+/,1)) {
        if(tagName) {
            htmlEl = document.createElement(tagName);

            if(id) {
                htmlEl.id = id;
            }

            if(className) {
                htmlEl.classList.add(className);
            }

            if(text) {
                let textNode = document.createTextNode(text);
                htmlEl.appendChild(textNode);
            }
        } else {
            oLogger.log('A <tagName> argument is <empty> !!!');
        }

        oLogger.log('End of <newElement> method');
        return htmlEl;
    }

    function newForm(method, action, id = null, className = null) {
        oLogger.log('Start of <newForm> method');
        let elNewForm = null;

        elNewForm = newElement('form', id, className);
        if(elNewForm) {
            elNewForm.method = method;
            elNewForm.action = action;

            oLogger.log('the form ID<', id, '> class<', className, '> has been created');
        }

        oLogger.log('End of <newForm> method');
        return elNewForm;
    }

    function createQuizForm() {
        oLogger.log('Start of <createQuizForm> method');
        let elQuizForm = null;

        // newForm(method, action, id, class)
        elQuizForm = newForm( quizObj.formDelivery.method, quizObj.formDelivery.action, 'quiz-form', null );

        let elOrderedList = newElement('ol');

        // We are moving cross Quiz Questions
        for(let cntrLI = 0; cntrLI < quizObj.questionVec.length; cntrLI++) {
            let elLI = newElement('li', null, 'quiz__question-item');

            let elFldSet = newElement('fieldset', null, 'question');

            let elQuestionHeader = newElement('h2', null, 'question__header', quizObj.questionVec[cntrLI].qHeader);

            let elQuestionAnswerList = newQuestionAnswerList( cntrLI );

            addElement( elFldSet, elLI );
            addElement( elQuestionHeader, elFldSet );
            addElement( elQuestionAnswerList, elFldSet );

            addElement( elLI, elOrderedList);
        }

        addElement( elOrderedList, elQuizForm );

        let elQuizCheckInput = newElement( 'input' );
        elQuizCheckInput.type = 'submit';
        elQuizCheckInput.name = 'quiz-check';
        elQuizCheckInput.value = quizObj.quizSubmitMessage;

        addElement( elQuizCheckInput, elQuizForm );

        oLogger.log('End of <createQuizForm> method');
        return elQuizForm;
    }

    // int22DigitString
    function doubleDigitIntString(intValue) {
        let outputStringNumber = null;

        outputStringNumber = intValue.toString().replace(/^\s*(\d)\s*$/, '0$1');

        return outputStringNumber;
    }

    function newQuestionAnswerList(questionNumber ) {
        oLogger.log('Start of <newQuestionAnswerList> method');

        let idPrefix = 'q-',
            idRoot = 'answer-';
        let namePrefix = 'question-';
        let valuePrefix = 'answer-';

        let elQAList = newElement( 'ul', null, 'question__answer-list' );

        for( let cntrQA = 0, qList = quizObj.questionVec[questionNumber].qList; cntrQA < qList.length; cntrQA++) {
            let elQAListItem = newElement('li', null, 'question__answer');

            let idName = idPrefix + doubleDigitIntString( questionNumber + 1 ) +
                        idRoot + doubleDigitIntString( cntrQA + 1 );

            let elInput = newElement( 'input', idName );
            elInput.name = namePrefix + doubleDigitIntString( questionNumber + 1 );
            elInput.value = valuePrefix + doubleDigitIntString( cntrQA + 1 );
            elInput.type = 'checkbox';

            let elQALabel = newElement( 'label', null, null, qList[cntrQA] );
            elQALabel.htmlFor = idName;


            addElement( elInput, elQAListItem );
            addElement( elQALabel, elQAListItem );

            addElement( elQAListItem, elQAList );
        }

        oLogger.log('End of <newQuestionAnswerList> method');
        return elQAList;
    }

//  Public section ...


/*  Method: Bind a quizTree to the DOM-hierachy of the document
    Argument(s) :
        <htmlBoundPoint> - an element of the DOM-hierachy where to bind the quizTree to
        <wayOfBinding> - ['append', 0, undefined, null] || ['before'] || [ 'after' ]
            where
                { 'append', and alternatives } => means AppendChild-mode, i.e. to become the last element of the <htmlBoundPoint>
                { 'first' } => means Insert as the first child of <htmlBoundPoint>
                { 'before' } => means InsertBefore-mode
                { 'after' } => means InsertBefore-mode with respect to nextSibling-element

*/
    this.mount2Dom = function(htmlBoundPoint = null, wayOfBinding = 'append') {
        let htmlElement = null;

        oLogger.log('Start of <mount2Dom>');

        if(htmlBoundPoint) {
            if(finalTree !== null) {
                htmlElement = addElement( finalTree, htmlBoundPoint, wayOfBinding );
            } else {
                oLogger.log('There is no a built \'quizTree\' to bound to the DOM !!!');
            }
        } else {
            oLogger.log('An element to bind the quizTree to is not defined !!!');
        }

        oLogger.log('End of <mount2Dom>');
        return htmlElement;
    };


    this.createQuizTree = function() {
        oLogger.log('Start of <createQuizTree>');

        var elWrapperQuiz = newElement('div', null, 'wrapper-quiz');
        var elQuizName = newElement('h1', null, 'quiz__name', quizObj.quizName);

        var elQuizForm = createQuizForm();

        addElement( elQuizName, elWrapperQuiz );
        addElement( elQuizForm, elWrapperQuiz );

        finalTree = elWrapperQuiz;
        oLogger.log('The quizTree has been created');

        oLogger.log('End of <createQuizTree>');
        return finalTree;
    };

    // this.prototype.toString = function () {
    //     return 'quizBuilder module <' + quizObj.quizName + '>';
    // };

    QuizBuilder.prototype.toString = function () {
        return ' :: quizBuilder module <' + quizObj.quizName + '>';
    };


// eof publicFunction01

    oLogger.log('End of constructor<QuizBuilder>');
}

// debugger;
var testBuilder = new QuizBuilder( testObj_01 );

/*  !!!!!!!!

  Add the method 'toString()''

*/
oLogger.log("testBuilder" + testBuilder);

testBuilder.createQuizTree();


let htmlContainer = document.createElement('main');
htmlContainer.classList.add("wrapper-main");
document.body.appendChild(htmlContainer);

testBuilder.mount2Dom(htmlContainer);
