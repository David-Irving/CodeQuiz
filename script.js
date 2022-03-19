var quizBody = document.getElementById("quiz");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var gameoverDiv = document.getElementById("gameover");
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var startQuizButton = document.getElementById("startbtn");
var startQuizDiv = document.getElementById("starter");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreDiv = document.getElementById("high-scorePage");
var highscoreInputName = document.getElementById("name");
var highscoreDisplayName = document.getElementById("highscore-name");
var endGameBtns = document.getElementById("endGameBtns");
var submitScoreBtn = document.getElementById("submitScore");
var highscoreDisplayScore = document.getElementById("highscore-score");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");


var quizQuestions = [{
    question: "HTML is considered as ______",
    choiceA: "Programming language",
    choiceB: "OOP Language",
    choiceC: "High level language",
    choiceD: "Markup language",
    correctAnswer: "d"},
{
    question: "HTML was first proposed in what year?",
    choiceA: "1980",
    choiceB: "1985",
    choiceC: "1990",
    choiceD: "1995",
    correctAnswer: "c"},
{
    question: "A stricter type of HTML document is known as ______?",
    choiceA: "DHTML",
    choiceB: "XHTML",
    choiceC: "XML",
    choiceD: "HTML",
    correctAnswer: "b"},
    {
    question: "What does CSS stand for?",
    choiceA: "Colorful Style Sheets",
    choiceB: "Cascading Style Sheets",
    choiceC: "Computer Style Sheets",
    choiceD: "Creatibve Style Sheets",
    correctAnswer: "b"},
    {
    question: "What is the default value of the position property",
    choiceA: "static",
    choiceB: "absolute",
    choiceC: "relative",
    choiceD: "fixed",
    correctAnswer: "a"},  
    {
    question: "How do you write an IF statement in JavaScript?",
    choiceA: "if i == 5 then",
    choiceB: "if i = 5 then",
    choiceC: "if i = 5",
    choiceD: "if(1 === 5)",
    correctAnswer: "d"},
    {
    question: "What is the correct way to write a JavaScript array?",
    choiceA: "var colors = (1:'red',2'green',3'blue')",
    choiceB: "var colors = 1 = ('red'),2 = ('green'),3 = ('blue')",
    choiceC: "var colors = ['red','green','blue']",
    choiceD: "var colors = 'red','green','blue'",
    correctAnswer: "c"},
    {
    question: "How do you find the number with the highest value of x and y?",
    choiceA: "top(x,y)",
    choiceB: "Math.ceil(x,y)",
    choiceC: "Math.max(x,y)",
    choiceD: "ceil(x,y)",
    correctAnswer: "c"},    
    {
    question: "This quiz was the most awesomest queiz you have ever taken?",
    choiceA: "Of course!",
    choiceB: "No because I do not like fun :(",
    choiceC: "I have seen better",
    choiceD: "I do not like quizzes",
    correctAnswer: "a"},
    {
    question: "That last question made you laugh.",
    choiceA: "No",
    choiceB: "Kind of",
    choiceC: "It absolutely did",
    choiceD: "Just a chuckle",
    correctAnswer: "c"},
];

var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 99;
var timerInterval;
var score = 0;
var correct;

function generateQuizQuestion(){
    gameoverDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    } 
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};

function startQuiz(){
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;
        if(timeLeft === 0) {
        clearInterval(timerInterval);
        showScore();
        }
    }, 
    1000);
    quizBody.style.display = "block";
}

function showScore(){
    quizBody.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}

submitScoreBtn.addEventListener("click", function highscore(){
    if(highscoreInputName.value === "") {
    alert("Please put something");
    return false;
    }
    else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };

        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();
    }
});

function generateHighscores(){
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}

function showHighscore(){
    startQuizDiv.style.display = "none"
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";
    generateHighscores();
}

function clearScore(){
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}

function replayQuiz(){
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 99;
    score = 0;
    currentQuestionIndex = 0;
}

function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;
    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        alert("That Is Correct!");
        currentQuestionIndex++;
        generateQuizQuestion();
    }
    else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        alert("That Is Incorrect.")
        currentQuestionIndex++;
        generateQuizQuestion();
    }
    else{
        showScore();
    }
}

startQuizButton.addEventListener("click",startQuiz);