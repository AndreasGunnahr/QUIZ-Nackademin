class Quiz {
    constructor(username, questions) {
        this.username = username;           // Spelarens användarnamn
        this.questions = questions;         // Vilka frågor som ingår i spelomgången.
        this.correctQuantity = 0;           // Antal svar som är rätt av användaren.
        this.wrongQuantity = 0;             // Antal svar som är fel av användaren.
    }
    // previousQuestion(){}
}


// class Question {
//     constructor(category,question,answers,correct) {
//         this.category = category;                       // Frågekategori.
//         this.question = question;                       // Frågan.
//         this.answers = answers;                         // Svarsalternativ.
//         this.correct = correct;                         // Fel respektive rätt svarsalternativ. 
//     }
// }

let shuffledQuestions, currentQuestionIndex;
const restartButton = document.getElementById("play-again-btn");
const startButton = document.getElementById("start-btn");
const questionElement = document.getElementById("question");
let answerButtons = document.getElementsByClassName("answer");
const nrQuestions = document.getElementById("nrQuestions");
const nextButton = document.getElementById("next-btn");
const addButton = document.getElementById("add");
const removeButton = document.getElementById("remove");
var playerName; 
var totalNrQuestions;
let arrQuestions = [];
let nrOfCorrects = 0;



const questions = [
    {
        category: 'Sport',
        question: 'Vilken fotbollsspelare har spelat allra flest landskamper i svenska fotbollslandslaget?',
        answers: [
            { text: "Henrik Larsson", correct: false },
            { text: "Andreas Isaksson", correct: false },
            { text: "Anders Svensson", correct: true  },
            { text: "Carl Hörjström", correct: false }
        ]
    },
    {
        category: 'Food',
        question: 'What is 2 + 4?',
        answers: [
            { text: "15", correct: false },
            { text: "16", correct: false },
            { text: "17", correct: false },
            { text: "19", correct: true }
        ]
    },
    {   
        category: 'Sport',
        question: 'Vad är en ”Birdie” inom golf?',
        answers: [
            { text: "När man slår i bollen på ett enda slag", correct: false },
            { text: "När man slår i bollen 1 slag över par", correct: false },
            { text: "När man slår i bollen 1 slag under par", correct: true },
            { text: "När man slår i bollen i ett vattenhål", correct: false }
        ]
    },
    {
        category: 'Food',
        question: 'What is 21d + 4?',
        answers: [
            { text: "15", correct: false },
            { text: "16", correct: false },
            { text: "17", correct: false },
            { text: "19", correct: true }
        ]
    },
    {
        category: 'Programming',
        question: 'What is 2 + 3',
        answers: [
            { text: "25", correct: false },
            { text: "50", correct: false },
            { text: "75", correct: true },
            { text: "74", correct: false }
        ]
    },
    {
        category: 'Food',
        question: 'What is 2907 + 4?',
        answers: [
            { text: "15", correct: false },
            { text: "16", correct: false },
            { text: "17", correct: false },
            { text: "19", correct: true }
        ]
    },
    {   
        category: 'Sport',
        question: 'Vilken idrott i Sverige har nästflest utövare i Sverige efter fotboll?',
        answers: [
            { text: "Ishockey", correct: false },
            { text: "Handboll", correct: false },
            { text: "Innebandy", correct: true },
            { text: "Simning", correct: false }
        ]
    },
    {
        category: 'Programming',
        question: 'What is 299 + 3',
        answers: [
            { text: "25", correct: false },
            { text: "50", correct: false },
            { text: "75", correct: true },
            { text: "74", correct: false }
        ]
    },
    {
        category: 'Food',
        question: 'What is 2 + 4123?',
        answers: [
            { text: "15", correct: false },
            { text: "16", correct: false },
            { text: "17", correct: false },
            { text: "19", correct: true }
        ]
    },
    {   
        category: 'Sport',
        question: 'Vilka två sporter ingår i en nordisk komination?',
        answers: [
            { text: "Skidskytte & slalom", correct: false },
            { text: "Backhoppning & längdskidåkning", correct: true },
            { text: "Super G & konståkning", correct: false },
            { text: "Ishockey & bandy", correct: false }
        ]
    },
    {
        category: 'Programming',
        question: 'What is 23 + 3',
        answers: [
            { text: "25", correct: false },
            { text: "50", correct: false },
            { text: "75", correct: true },
            { text: "74", correct: false }
        ]
    },
    {
        category: 'Programming',
        question: 'What is 210 + 3',
        answers: [
            { text: "25", correct: false },
            { text: "50", correct: false },
            { text: "75", correct: true },
            { text: "74", correct: false }
        ]
    },
]

// Kontroll av settings.
if(startButton){
    totalNrQuestions = 1;
    addButton.addEventListener("click", () =>{
        if(totalNrQuestions < 4){
            nrQuestions.innerText = totalNrQuestions+1;
            totalNrQuestions ++;
        }
    });
    removeButton.addEventListener("click", () =>{
        if(totalNrQuestions > 1 ){
            nrQuestions.innerHTML = totalNrQuestions-1;
            totalNrQuestions --;
        }
    });
    startButton.addEventListener("click", () => {
        var playername = document.getElementById("userinput").value;
        var category = document.getElementById("category").value;
        window.localStorage.setItem("saveCategory",category);
        window.localStorage.setItem("savePlayername",playername);
        window.localStorage.setItem("SaveNrOfQuestions",totalNrQuestions);
    });
}


// Kontroll av spel.
if(nextButton){
    startGame();
    nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    setNextQuestion();
    });
}

if(restartButton){
    ResultPage();
}

function startGame(){
    // playername = window.localStorage.getItem("savePlayername");
    category = window.localStorage.getItem("saveCategory");
    totalNrQuestions = window.localStorage.getItem("SaveNrOfQuestions");
    // Sparar alla frågor som är av rätt kategori i en separat array. 
    for(let x = 0; x < questions.length; x++){
        if(questions[x].category == category){
            arrQuestions.push(questions[x]);
       }
    }
    console.log(arrQuestions);
    shuffledQuestions = arrQuestions.sort(() => Math.random() - .5);
    console.log(shuffledQuestions);
    currentQuestionIndex = 0;
    setNextQuestion();
}


function setNextQuestion() {
    resetState();
    questionNumber = currentQuestionIndex + 1;
    document.getElementById("nrOfQuestions").innerHTML = "question " + questionNumber + " of " + totalNrQuestions;
    document.getElementById("category").innerHTML = category;
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
        questionElement.innerText = question.question;
        for (let x = 0; x < 4; x++) {
            if (question.answers[x].correct) {
                console.log( answerButtons[x].innerHTML);
                answerButtons[x].innerHTML =  "<i class='fas fa-check-circle'></i>" + question.answers[x].text ;
                answerButtons[x].dataset.correct = question.answers[x].correct;
            }else{
                answerButtons[x].innerHTML =  "<i class='fas fa-times-circle'></i>" + "<span>" + question.answers[x].text + "</span>";
            }
            answerButtons[x].addEventListener('click', selectAnswer);
        }
    }

function selectAnswer(e) {
    const selectedButton = e.target;
    console.log(selectedButton);
    const correct = selectedButton.dataset.correct;
    for (let x = 0; x < 4; x++) {
        setStatusClass(answerButtons[x], answerButtons[x].dataset.correct)
    }
    if(correct){
        document.getElementsByClassName("CW-container")[0].style.visibility = "visible";
        document.getElementsByClassName("CW-container")[0].style.color = "#20A220";
        document.getElementsByClassName("CW-h1")[0].innerHTML = "CORRECT!";
        nrOfCorrects += 1; 

    }else{
        document.getElementsByClassName("CW-container")[0].style.visibility = "visible";
        document.getElementsByClassName("CW-container")[0].style.color = "#FF0000";
        document.getElementsByClassName("CW-h1")[0].innerHTML = "WRONG!";
    }
  
    if (totalNrQuestions > currentQuestionIndex + 1) {   
        // Om vi inte har slut på frågor
    } else {
        console.log("SLUT");
        // Om vi har slut på frågor 
        console.log(nrOfCorrects);
        window.localStorage.setItem("nrOfCorrects",nrOfCorrects);
        document.getElementById('next-btn').id = "show-btn";
        document.getElementById('show-btn').innerHTML = "Show result";
        document.getElementById('show-btn').addEventListener('click', () => {
            document.getElementById('show-btn').href = "result.html";
        });
    }
    showIcons(); 
}

function showIcons(){
    let len = document.getElementsByClassName("fa-times-circle").length;
    for(let x = 0; x < len; x++){
        document.getElementsByClassName("fa-times-circle")[x].style.visibility = "visible";
    }
    document.getElementsByClassName("fa-check-circle")[0].style.visibility = "visible";
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
function ResultPage(){
    let titles = ["Master","Champion","Looser"]; 
    totalNrQuestions = window.localStorage.getItem("SaveNrOfQuestions");
    nrOfCorrects = window.localStorage.getItem("nrOfCorrects");
    document.getElementById("nrOfCorrectAnswers").innerHTML = "You got " + "<span>" + nrOfCorrects + "</span>" + " of" + " <span>" + totalNrQuestions + "</span>" + " questions right!";
}

