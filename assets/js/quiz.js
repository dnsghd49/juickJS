//Dom Elements 
const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

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
        question: 'What is the rarest M&M color?',
        choice1: 'Red',
        choice2: 'Green',
        choice3: 'Purple',
        choice4: 'Brown',
        answer: 4,
    },
    {
        question: 'In a website browser address bar, what does “www” stand for?',
        choice1: 'No meaning',
        choice2: 'Where What Why?',
        choice3: 'World Wide Web',
        choice4: 'A security path',
        answer: 3,
    },
    {
        question: 'x + 1 * 22 * 0 = 7, x = ?',
        choice1: '240',
        choice2: '120',
        choice3: '24',
        choice4: '7',
        answer: 4,
    },
    {
        question: 'Which two U.S. states don’t observe Daylight Saving Time?',
        choice1: 'Arizona and Hawaii',
        choice2: 'California, Hawaii',
        choice3: 'Florida, Arizona',
        choice4: 'Texas, Hawaii',
        answer: 1,
    },
    {
        question: '1 + 99 = ?',
        choice1: '199',
        choice2: '99',
        choice3: '100',
        choice4: '101',
        answer: 3,
    },
    {
        question: 'What is the tallest breed of dog in the world?',
        choice1: 'idk',
        choice2: 'The Great Dane',
        choice3: 'Azawakh',
        choice4: 'Otterhound',
        answer: 2,
    },
    
];

//Fixed 
const SCORE_POINTS = 100
const MAX_QUESTIONS = 7

//Getting questions values  
startQuiz = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}


//Tracking the score
getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('result.html')
    }

//keeping on track of the questions
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

//Asking on track question 
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

//Takes the choice that user picked
    choices.forEach(choice => {
        const number = choice.dataset ['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

//Function for answer Choices 
choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'
    //If the answer is correct +100 points
        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

//Score counter
incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startQuiz()