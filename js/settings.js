class Quiz {
    constructor() {
        this.username = "";                 // Spelarens användarnamn
        this.numberOfQuestions = 1;         // Antal frågor som spelaren vill ha. 
        this.thisGameQuestions = [];        // Vilka frågor som ingår i spelomgången.
        this.correctAnswers = 0;           // Antal svar som är rätt av användaren.
        this.wrongAnswers = 0;   
        this.prevQuestion = [];          // Antal svar som är fel av användaren.
    }

    addQuestion(){
        if(this.numberOfQuestions  < 4){
            this.numberOfQuestions  += 1;
            nrQuestions.innerText = this.numberOfQuestions;
        }
    }

    subtractQuestion(){
        if(this.numberOfQuestions  > 1){
            this.numberOfQuestions  -= 1;
            nrQuestions.innerText = this.numberOfQuestions;
        }
    }

    saveUsername(){
        this.username = document.getElementById("userinput").value;
    }

    saveCategory(){
        this.pickedCategory = document.getElementById("category").value;
    }

    checkAnswer(){

    }

}

const startButton = document.getElementById("start-btn");
const addButton = document.getElementById("add");
const removeButton = document.getElementById("remove");

addButton.addEventListener("click", () => {
    quiz.addQuestion();
});

removeButton.addEventListener("click", () => {
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

let quiz = new Quiz();
document.styleSheets[1].disabled = true;
document.getElementById("wrapper-game").style.display = "none";