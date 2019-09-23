class Quiz {
    constructor(username, questions, correctQuantity, wrongQuantity) {
        this.username = username;                       // Spelarens användarnamn
        this.questions = questions;                     // Vilka frågor som ingår i spelomgången.
        this.correctQuantity = correctQuantity;         // Antal svar som är rätt av användaren.
        this.wrongQuantity = wrongQuantity;             // Antal svar som är fel av användaren.
    }
}

class Question {
    constructor(category,question,answers,correct) {
        this.category = category;                       // Frågekategori.
        this.question = question;                       // Frågan.
        this.answers = answers;                         // Svarsalternativ.
        this.correct = correct;                         // Fel respektive rätt svarsalternativ. 
    }
}


let shuffledQuestions, currentQuestionIndex;
const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const nrOfQuestions = document.getElementById("nrOfQuestions");
const questionElement = document.getElementById("question");
let answerButtons = document.getElementsByClassName("answer");
let questionNumber = 0;


const questions = [
    {
        question: 'What is 2 +2',
        answers: [
            { text: "4", correct: true },
            { text: "3", correct: false },
            { text: "5", correct: false },
            { text: "1", correct: false }
        ]
    },
    {
        question: 'What is 2 + 4',
        answers: [
            { text: "15", correct: false },
            { text: "16", correct: false },
            { text: "17", correct: false },
            { text: "19", correct: true }
        ]
    },
    {
        question: 'What is 2 + 6',
        answers: [
            { text: "100", correct: false },
            { text: "3", correct: true },
            { text: "101", correct: false },
            { text: "105", correct: false }
        ]
    },
    {
        question: 'What is 2 + 3',
        answers: [
            { text: "25", correct: false },
            { text: "50", correct: false },
            { text: "75", correct: true },
            { text: "74", correct: false }
        ]
    }
]


// function startGame(){

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    setNextQuestion();
});


shuffledQuestions = questions.sort(() => Math.random() - .5);
currentQuestionIndex = 0;
setNextQuestion();


function setNextQuestion() {
    resetState();
    questionNumber = currentQuestionIndex + 1;
    document.getElementById("nrOfQuestions").innerHTML = "question " + questionNumber + " of 4"
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    for (let x = 0; x < 4; x++) {
        answerButtons[x].innerText = question.answers[x].text;

        if (question.answers[x].correct) {
            answerButtons[x].dataset.correct = question.answers[x].correct;
        }
        answerButtons[x].addEventListener('click', selectAnswer);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    for (let x = 0; x < 4; x++) {
        setStatusClass(answerButtons[x], answerButtons[x].dataset.correct)
    }
    if(correct){
        document.getElementsByClassName("CW-container")[0].style.visibility = "visible";
        document.getElementsByClassName("CW-container")[0].style.color = "#20A220";
        document.getElementsByClassName("CW-h1")[0].innerHTML = "CORRECT!";
    }else{
        document.getElementsByClassName("CW-container")[0].style.visibility = "visible";
        document.getElementsByClassName("CW-container")[0].style.color = "#FF0000";
        document.getElementsByClassName("CW-h1")[0].innerHTML = "WRONG!";
    }

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        // Om vi inte har slut på frågor
        console.log("kör på");
    } else {
        // Om vi har slut på frågor 
        console.log("slut på frågor");
        document.getElementById('next-btn').id = "show-btn";
        document.getElementById('show-btn').innerHTML = "Show result";
        document.getElementById('show-btn').addEventListener('click',showResult());
        
    }
}

function resetState() {
    for (let x = 0; x < 4; x++) {
        answerButtons[x].removeAttribute("data-correct");
        answerButtons[x].classList.remove("correct");
        answerButtons[x].classList.remove("wrong");
    }
    document.getElementsByClassName("CW-container")[0].style.visibility = "hidden";
    document.getElementsByClassName("CW-h1")[0].innerHTML = "";
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
}


function showResult(){
    document.getElementById('show-btn').href = "result.html";
}