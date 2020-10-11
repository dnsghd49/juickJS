//Dom Elements 
const question = document.querySelector('#question');
const choices = Array.from(document.querySelector('.choice-text'));
const progressText = document.querySelector('#progressText');
const score = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');


let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: 'what is 1+1',
        choice1: '1',
        choice2: '2',
        choice3: '3',
        choice4: '4',
        answer: 2,
    },
    {
        question: 'what is my name',
        choice1: '1',
        choice2: '2',
        choice3: '3',
        choice4: '4',
        answer: 2,
    },
    {
        question: 'what is my name 3',
        choice1: '1',
        choice2: '2',
        choice3: '3',
        choice4: '4',
        answer: 2,
    },
    {
        question: 'what is 1+1',
        choice1: '1',
        choice2: '2',
        choice3: '3',
        choice4: '4',
        answer: 2,
    },
    
];

//Fixed 
const SCORE_POINTS = 100;
const MAX_QUESTIONS = 7;

//Getting questions values  
startQuiz = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}


//Functions 
getNewQuestion = () => {

//Tracking the score
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score);

        return window.location.assign('/end.html');
    }

//keeping on track of the questions
    questionCounter++
    progressText.innerText = `question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;

//Asking on track question 
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

//Takes the choice that user picked
    choices.forEach(choice => {
        const number = choice.dataset ['number'];
        choice.innerText = currentQuestion['choice' + number];
    })

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', e=> {
    })
})