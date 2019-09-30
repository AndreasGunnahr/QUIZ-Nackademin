let shuffledQuestions, currentQuestionIndex;
const restartButton = document.getElementById("play-again-btn");
const questionElement = document.getElementById("question");
let answerButtons = document.getElementsByClassName("answer");
const nrQuestions = document.getElementById("nrQuestions");
const nextButton = document.getElementById("next-btn");
const rightWrongH1 = document.getElementsByClassName("CW-h1")[0];
const rightWrongContainer = document.getElementsByClassName("CW-container")[0];
let nrCorrectsInQuestion = 0;

// ?DONE: Kom på ett bra sätt att använda klassen Quiz respektive Question.
// ?DONE: Kolla hur man läser in en json file till en array då denna tar mycket plats i JS filen. 
//! TODO: Tillbaka knapp till varje fråga respektive kunna hålla reda på vilken fråga/svar användaren angav. 
// ?DONE: Fixa så användaren inte kan klicka flera gånger på ett svar. 
// *HALF: Fixa till layouten i knapparna (svaren). 
// TODO: Fundera på vart vi kan använda oss av spelarens nman. 
// ?DONE: Kunna välja flera svar som är rätt


startGame();

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    setNextQuestion();
});

backButton.addEventListener("click", () => {
    currentQuestionIndex--;
    showLastQuestion(); 
});

// Kontroll om vi har kommit till resultat sidan. 
// if(restartButton){
//     resultPage();
// }

function startGame(){
    currentQuestionIndex = 0;
    setNextQuestion();
}


function setNextQuestion() {
    resetState();
    questionNumber = currentQuestionIndex + 1;
    document.getElementById("nrOfQuestions").innerHTML = "Question " + questionNumber + " of " + quiz.numberOfQuestions;
    document.getElementById("category-h1").innerHTML = quiz.thisGameQuestions[0].category;
    showQuestion(quiz.thisGameQuestions[currentQuestionIndex]);
}

function showQuestion(question) { 
    questionElement.innerText = question.question;
    for (let x = 0; x < 4; x++) {
        if (question.answers[x].correct) {
            answerButtons[x].innerHTML =  "<i class='fas fa-check-circle'></i>" +  "<span>" + question.answers[x].text + "</span>";
            answerButtons[x].dataset.correct = question.answers[x].correct;
            nrCorrectsInQuestion += 1;
        }else{
            answerButtons[x].innerHTML =  "<i class='fas fea-times-circle'></i>" + "<span>" + question.answers[x].text + "</span>";
        }
        answerButtons[x].addEventListener('click', selectAnswer);
    }
    document.getElementById("nrOfAnswers").innerHTML = "Choose " + nrCorrectsInQuestion + " answer"
}


function selectAnswer(e) {
    rightWrongH1.style.visibility = "hidden";
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    if(rightWrongH1.style.visibility != "visible"){
        for (let x = 0; x < 4; x++) {
            if(nrCorrectsInQuestion > 1){
                setStatusClass(e.target, e.target.dataset.correct);
                nrCorrectsInQuestion = nrCorrectsInQuestion-1;
                break;
            }else{
                setStatusClass(answerButtons[x], answerButtons[x].dataset.correct);

            }
        }
        if(correct){
            rightWrongH1.style.visibility = "visible";
            rightWrongH1.style.color = "#20A220";
            rightWrongH1.innerHTML = "CORRECT!";
            quiz.correctAnswers += 1; 
        }else{
            rightWrongH1.style.visibility = "visible";
            rightWrongH1.style.color = "#FF0000";
            rightWrongH1.innerHTML = "WRONG!";
            quiz.wrongAnswers += 1;
        }
    }

    if (quiz.numberOfQuestions > currentQuestionIndex + 1) {   
        // Om vi inte har slut på frågor så fortsätter vi bara. 
    } else {
        // Om vi har slut på frågor så visar vi Show result knappen. 
        nextButton.id = "show-btn";
        const showButton = document.getElementById('show-btn');
        showButton.innerHTML = "Show result";
        showButton.addEventListener('click', () => {
        showButton.href = "result.html";
        });
    }
    showIcons(); 
}

function showIcons(){
    for(let x = 0; x < 4; x++){
        document.getElementsByTagName("i")[x].style.visibility = "visible";
    }
}

function resetState() {
    for (let x = 0; x < 4; x++) {
        answerButtons[x].removeAttribute("data-correct");
        answerButtons[x].classList.remove("correct");
        answerButtons[x].classList.remove("wrong");
    }
    rightWrongH1.style.visibility = "hidden";
    nrCorrectsInQuestion = 0;
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
// function resultPage(){
//     let titles = ["Master","Champion","Looser"]; 
//     document.getElementById("nrOfCorrectAnswers").innerHTML = "You got " + "<span>" + quiz.correctAnswers + "</span>" + " of" + " <span>" + quiz.numberOfQuestions + "</span>" + " questions right!";
// }

