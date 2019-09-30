// En klass som skapar strukturen för våra frågor.
class Question {
    constructor(category, question, answers,correct) {
        this.category = category;                             // Frågekategori.
        this.question = question;                             // Frågan.
        this.answers = answers;                               // Svarsalternativ som även innehåller rätt- respektive fel svar. 
        // this.correct = correct;                               // Fel respektive rätt svarsalternativ. 
    }        
}

// En klass som skapar våra frågor genom klassen Question.
class AddQuestion{
    constructor(){
        this.extractJSON(contentJSON);
    }

    // Vi hämtar våra frågor från JSON och sorterar på antal/kategori som användaren angett. 
    extractJSON(contentJSON){
        for(let questionJSON of contentJSON.questions){
            let answersArray = []; 
            // let correctArray = [];
            let index = 0;
            if(quiz.pickedCategory == questionJSON.category){
                for(let x = 0; x < 4; x++ ){
                    answersArray.push(questionJSON.answers[x]);
                    // correctArray.push(questionJSON.answers[x].correct);
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
let contentJSON = getJSON("http://www.mocky.io/v2/5d90d7543000005200cacfee");
let addQuestion = new AddQuestion(contentJSON);
