const restartButton = document.getElementById("play-again-btn");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementsByClassName("answer");
const nrQuestions = document.getElementById("nrQuestions");
const nextButton = document.getElementById("next-btn");
const backButton = document.getElementById("back-btn");
const rightWrongH1 = document.getElementsByClassName("CW-h1")[0];
let currentQuestionIndex;


// Initialize our game. 
if(nextButton){
    startGame();
}


nextButton.addEventListener("click", () => {
    if(quiz.nrCorrectsInQuestion == 0){
        currentQuestionIndex++;
        setNextQuestion();
    }
});

// Starting our quiz game and calling our first question. 
function startGame(){
    currentQuestionIndex = 0;
    setNextQuestion();
}

// Setting our next question after resetting our previous question form. 
function setNextQuestion() {
    resetState();
    questionNumber = currentQuestionIndex + 1;
    document.getElementById("nrOfQuestions").innerHTML = "Question " + questionNumber + " of " + quiz.numberOfQuestions;
    document.getElementById("category-h1").innerHTML = quiz.thisGameQuestions[0].category;
    showQuestion(quiz.thisGameQuestions[currentQuestionIndex]);
}

// Displaying our question form and also adding our font awesome icons to the questions. 
function showQuestion(question) { 
    questionElement.innerText = question.question;
    // Depending on whether the answer is right/wrong, we give it an equivalent dataset value. Which we later can use to check
    // if the question are right or wrong when the user click on a answer. 
    for (let x = 0; x < 4; x++) {
        if (question.answers[x].correct) {
            answerButtons[x].innerHTML =  "<i class='fas fa-check-circle'></i>" +  "<span>" + question.answers[x].text + "</span>";
            answerButtons[x].dataset.correct = question.answers[x].correct;
            quiz.nrCorrectsInQuestion += 1;
        }else{
            answerButtons[x].innerHTML =  "<i class='fas fa-times-circle'></i>" + "<span>" + question.answers[x].text + "</span>";
        }
        answerButtons[x].addEventListener('click', selectAnswer);
    }
    document.getElementById("nrOfAnswers").innerHTML = "Pick " + quiz.nrCorrectsInQuestion + " answer";
}

// Resetting all our question states. 
function resetState() {
    for (let x = 0; x < 4; x++) {
        answerButtons[x].removeAttribute("data-correct");
        answerButtons[x].classList.remove("correct");
        answerButtons[x].classList.remove("wrong");
        answerButtons[x].disabled = false;
    }
    rightWrongH1.style.visibility = "hidden";
    quiz.nrCorrectsInQuestion = 0;
}

// Collecting information about which answer button the user picked.  
function selectAnswer(e) {
    let selectedButton = e.target;
    let correct = selectedButton.dataset.correct;
    // Sending the information to our correct method in our class Quiz.
    quiz.checkAnswer(selectedButton,correct); 
    // If we have more questions then we just keep going.
    if (quiz.numberOfQuestions > currentQuestionIndex + 1) { 
    }
    // If we have no more questions then we showing the result button.
    else if(quiz.numberOfQuestions <= currentQuestionIndex + 1 && quiz.nrCorrectsInQuestion == 0) {
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


// Showing our information on the result page
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

