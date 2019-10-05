class Quiz {
    constructor() {
        this.username = "";                 // Players username
        this.numberOfQuestions = 1;         // Number of questions a player choose.
        this.thisGameQuestions = [];        // Questions thats included in the current game session. 
        this.correctAnswers = 0;            // Number of correct answers from the player. 
        this.wrongAnswers = 0;              // Number of wrong answers from the player. 
        this.maxScore = 0;                  // Maximum score user can get from answering all questions correct. 
        this.nrCorrectsInQuestion = 0;
    }

    // If user choose to increase the number of questions. 
    addQuestion(){
        if(this.numberOfQuestions  < 4){
            this.numberOfQuestions  += 1;
            nrQuestions.innerText = this.numberOfQuestions;
        }
    }

    // If user choose to decrease the number of questions. 
    subtractQuestion(){
        if(this.numberOfQuestions  > 1){
            this.numberOfQuestions  -= 1;
            nrQuestions.innerText = this.numberOfQuestions;
        }
    }

    // Saving the players username in our class Quiz.  
    saveUsername(){
        this.username = document.getElementById("userinput").value;
    }

    // Saving the chosen category for later using. 
    saveCategory(){
        this.pickedCategory = document.getElementById("category").value;
    }

    // Receiving the pressed user button and if the dataset of the class is correct or not (a boolean). 
    checkAnswer(selectedButton,correct){
        if(this.nrCorrectsInQuestion != 0){
            selectedButton.disabled = true;
            this.maxScore += 1;
            for (let x = 0; x < 4; x++) {
                if(this.nrCorrectsInQuestion > 1){
                    this.setStatusClass(selectedButton, correct);
                    this.nrCorrectsInQuestion -= 1;
                    break;
                }else if(this.nrCorrectsInQuestion == 1){
                    this.setStatusClass(selectedButton, correct);
                    this.nrCorrectsInQuestion = 0; 
    
                }
            }
            if(correct){
                rightWrongH1.style.visibility = "visible";
                rightWrongH1.style.color = "#20A220";
                rightWrongH1.innerHTML = "CORRECT!";
                this.correctAnswers += 1; 
            }else{
                rightWrongH1.style.visibility = "visible";
                rightWrongH1.style.color = "#FF0000";
                rightWrongH1.innerHTML = "WRONG!";
                this.wrongAnswers += 1;
            }
        }
    }

    // Adding a new status to our class. This is either a correct/wrong class, that way we can achieve our requested color. 
    setStatusClass(element, correct) {
        this.clearStatusClass(element);
        if (correct) {
            element.classList.add("correct");
        } else {
            element.classList.add("wrong");
        }
    }

    // Resetting our answer buttons classes to eliminate our color settings. 
    clearStatusClass(element) {
        element.classList.remove("correct");
        element.classList.remove("wrong");
    }
}

const startButton = document.getElementById("start-btn");
const addButton = document.getElementById("add");
const subtractButton = document.getElementById("remove");

addButton.addEventListener("click", () => {
    quiz.addQuestion();
});

subtractButton.addEventListener("click", () => {
    quiz.subtractQuestion();
});

startButton.addEventListener("click", () => {
    quiz.saveUsername();
    quiz.saveCategory();

    // Adding our game.js file to our game.html to avoid reading in this to early. 
    // Also enable our game.css file instead of settings.css
    var secondScript = document.createElement("script");
    secondScript.type = "text/javascript";
    secondScript.src = "js/questions.js"; 
    document.getElementsByTagName("body")[0].appendChild(secondScript);
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "js/game.js"; 
    document.getElementsByTagName("body")[0].appendChild(script);
    document.getElementById("wrapper-game").style.display = "flex";
    document.getElementById("wrapper-settings").style.display = "none";
    document.styleSheets[1].disabled = false;
    document.styleSheets[0].disabled = true;
});


// Initialize our Quiz object and disabling our unused stylesheets. 
let quiz = new Quiz();
document.styleSheets[1].disabled = true;
document.styleSheets[2].disabled = true;
document.getElementById("wrapper-game").style.display = "none";
document.getElementById("wrapper-result").style.display = "none";