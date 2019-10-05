// Structure class for our question. 
class Question {
    constructor(category, question, answers) {
        this.category = category;                             // Question category.
        this.question = question;                             // Question.
        this.answers = answers;                               // Question answers which include text and right/wrong boolean. 
                                                    
    }        
}

// A class which creating our questions using the class Question.
class AddQuestion{
    constructor(){
        this.extractJSON(contentJSON);
    }

    // Getting our questions from our JSON file and sorting on number of questions/category. 
    extractJSON(contentJSON){
        for(let questionJSON of contentJSON.questions){
            let answersArray = []; 
            let index = 0;
            if(quiz.pickedCategory == questionJSON.category){
                for(let x = 0; x < 4; x++ ){
                    answersArray.push(questionJSON.answers[x]);
                }
                index += 1;
                let question = new Question(questionJSON.category,questionJSON.question,answersArray);
                quiz.thisGameQuestions.push(question);
                if(quiz.numberOfQuestions == index){
                    return
                }
              
            }
        }
    }
}



// Reading in our JSON file with our getJSON function from readjson.js
let contentJSON = getJSON("http://www.mocky.io/v2/5d98b84f340000d316f48aa6");
let addQuestion = new AddQuestion(contentJSON);
