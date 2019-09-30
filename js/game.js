let shuffledQuestions, currentQuestionIndex;
const restartButton = document.getElementById("play-again-btn");
const questionElement = document.getElementById("question");
let answerButtons = document.getElementsByClassName("answer");
const nrQuestions = document.getElementById("nrQuestions");
let nextButton = document.getElementById("next-btn");
const backButton = document.getElementById("back-btn");
const rightWrongH1 = document.getElementsByClassName("CW-h1")[0];
const rightWrongContainer = document.getElementsByClassName("CW-container")[0];
let nrCorrectsInQuestion = 0;
let array = [];
let testArray = [];
let newArray = [];
let secondArray = [];
let loop = 0;

// ?DONE: Kom på ett bra sätt att använda klassen Quiz respektive Question.
// ?DONE: Kolla hur man läser in en json file till en array då denna tar mycket plats i JS filen. 
//! TODO: Tillbaka knapp till varje fråga respektive kunna hålla reda på vilken fråga/svar användaren angav. 
// ?DONE: Fixa så användaren inte kan klicka flera gånger på ett svar. 
// *HALF: Fixa till layouten i knapparna (svaren). 
// TODO: Fundera på vart vi kan använda oss av spelarens nman. 
// ?DONE: Kunna välja flera svar som är rätt


startGame();

nextButton.addEventListener("click", () => {
    if(testArray.length != 0){
        array.push(testArray);
        // secondArray.push(newArray);
    }
    // console.log(secondArray);
    // showPrevQuestion(); 
    
    currentQuestionIndex++;
    // console.log(array[currentQuestionIndex]);
    if(array[currentQuestionIndex] != undefined){
        showPrevQuestion();
    }
    setNextQuestion();
});

backButton.addEventListener("click", () => {
    if(testArray.length != 0){
        array.push(testArray);
        // secondArray.push(newArray);
    }
    // console.log(secondArray);
    // const showButton = document.getElementById('show-btn');
    // console.log(nextButton);
    // showButton.id = "next-btn";
    showPrevQuestion(); 
});

// Kontroll om vi har kommit till resultat sidan. 
// if(restartButton){
//     resultPage();
// }

function startGame(){
    currentQuestionIndex = 0;
    setNextQuestion();
}

function showPrevQuestion(){
    if(loop == 1){
        nextButton = document.getElementById('show-btn');
        nextButton.id = "next-btn";
        nextButton.innerHTML = "Next question";
        nextButton.addEventListener('click', () => {
        nextButton.href = "#"
        });
        loop = 0;
    }
    currentQuestionIndex -= 1;
    questionNumber -= 1;
    setNextQuestion();
    for (let x = 0; x < 4; x++) {
        let correct = array[currentQuestionIndex][x].dataset.correct;
        setStatusClass(array[currentQuestionIndex][x], correct);
    }
    // nextButton.id = "next-btn";
    // document.getElementById('next-btn').innerHTML = "Next question";
    // document.getElementById('next-btn').removeEventListener("click",() => {
    //     document.getElementById('next-btn').href = "result.html";
    // });


}

function storePrevQuestion(){
    // array.push([answerButtons[0],answerButtons[1],answerButtons[2],answerButtons[3]]);
}

function setNextQuestion() {
    if(currentQuestionIndex != 0){
        backButton.style.visibility = "visible";
        // backButton.innerHTML =  "Previous question";
        // console.log(backButton);
    }else if(currentQuestionIndex == 0){
        backButton.style.visibility = "hidden";
    }
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
            answerButtons[x].innerHTML =  "<i class='fas fa-times-circle'></i>" + "<span>" + question.answers[x].text + "</span>";
        }
        answerButtons[x].addEventListener('click', selectAnswer);
    }
    document.getElementById("nrOfAnswers").innerHTML = "Choose " + nrCorrectsInQuestion + " answer";
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    // newArray.push(correct);
    if(nrCorrectsInQuestion != 0){
        for (let x = 0; x < 4; x++) {
            if(nrCorrectsInQuestion > 1){
                setStatusClass(e.target, selectedButton.dataset.correct);
                nrCorrectsInQuestion = nrCorrectsInQuestion-1;
                break;
            }else if(nrCorrectsInQuestion == 1){
                setStatusClass(e.target, selectedButton.dataset.correct); // Om vi vill få ut alla - answerButtons[x], answerButtons[x].dataset.correct
                nrCorrectsInQuestion = 0; 

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
        loop = 1; 
        // Om vi har slut på frågor så visar vi Show result knappen. 
        nextButton.id = "show-btn";
        const showButton = document.getElementById('show-btn');
        showButton.innerHTML = "Show result";
        showButton.addEventListener('click', () => {
        showButton.href = "result.html";
        });
    }
}

function resetState() {
    testArray = [];
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
        testArray.push(element);
    } else {
        element.classList.add("wrong");
        testArray.push(element);
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

