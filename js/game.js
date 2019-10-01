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


startGame();

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    setNextQuestion();
});

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
            answerButtons[x].innerHTML =  "<i class='fas fa-times-circle'></i>" + "<span>" + question.answers[x].text + "</span>";
        }
        answerButtons[x].addEventListener('click', selectAnswer);
    }
    document.getElementById("nrOfAnswers").innerHTML = "Choose " + nrCorrectsInQuestion + " answer";
}

function selectAnswer(e) {
    let selectedButton = e.target;
    let correct = selectedButton.dataset.correct;
    if(nrCorrectsInQuestion != 0){
        selectedButton.disabled = true;
        quiz.maxScore += 1;
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
    }
    else if(quiz.numberOfQuestions <= currentQuestionIndex + 1 && nrCorrectsInQuestion == 0) {
        // Om vi har slut på frågor så visar vi Show result knappen. 
        nextButton.id = "show-btn";
        const showButton = document.getElementById('show-btn');
        showButton.innerHTML = "Show result";
        showButton.addEventListener('click', () => {
        document.styleSheets[1].disabled = true;
        document.styleSheets[2].disabled = false;
        document.getElementById("wrapper-game").style.display = "none";
        document.getElementById("wrapper-result").style.display = "flex";
        showResult();
        });
    }
}

function resetState() {
    for (let x = 0; x < 4; x++) {
        answerButtons[x].removeAttribute("data-correct");
        answerButtons[x].classList.remove("correct");
        answerButtons[x].classList.remove("wrong");
        answerButtons[x].disabled = false;
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
function showResult(){
    let titles = ["Master","Champion","Average","Bad"]; 
    let nrOfCorrects = document.getElementById("nrOfCorrectAnswers");
    let showTitle = document.getElementById("title");
    let username = document.getElementById("username");
    nrOfCorrects.innerHTML = "You scored " + "<span>" + quiz.correctAnswers + "</span>" + " of" + " <span>" + quiz.maxScore + "</span>" + " points right!";
    username.innerHTML = quiz.username;
    if(quiz.correctAnswers == quiz.maxScore){
        showTitle.innerHTML = titles[0];
    }
    else if(quiz.correctAnswers > 3){
        showTitle.innerHTML = titles[1];
    }
    else if(quiz.correctAnswers >= 2){
        showTitle.innerHTML = titles[2];
    }
    else if(quiz.correctAnswers < 2){
        showTitle.innerHTML = titles[3];
    }
}

