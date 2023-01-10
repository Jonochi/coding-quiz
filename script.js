var timeLeft;
var currentQuestion;
var score;
var startButton = document.getElementById("startButton");
var timerEl = document.getElementById("timeLeft");
var questionEl = document.getElementById("question");
var option1El = document.getElementById("option1");
var option2El = document.getElementById("option2");
var scoreEl = document.getElementById("score");
var saveScoreEl = document.getElementById("saveScore");
var highscoreEl = document.getElementById("highscore");
var storedHighscore = 0;
var answerMessageEl = document.getElementById("answerMessage");


var questions = [
    {
        question: "The answer is Option 1",
        option1: "Option 1",
        option2: "Option 2",
        correct: "option1"
    },

    {
        question: "Pick 3",
        option1: "2",
        option2: "3",
        correct: "option2"
    },

    {
        question: "This time pick cat",
        option1: "dog",
        option2: "cat",
        correct: "option2"
    },
];

option1El.style.visibility = 'hidden';
option2El.style.visibility = 'hidden';


function startTimer() {

    option1El.style.visibility = 'visible';
    option2El.style.visibility = 'visible';
    var timerInterval = setInterval(function () {
        timeLeft--;
        timerEl.textContent = "Time remaining: " + timeLeft + " seconds";
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            startButton.style.visibility = 'visible';
            endOfQuiz();
        }
    }, 1000);
};

function renderQuestions() {
    questionEl.innerHTML = "<h3>" + questions[currentQuestion].question + "</h3>";
    option1El.innerHTML = "<p>" + questions[currentQuestion].option1 + "</p>";
    option2El.innerHTML = "<p>" + questions[currentQuestion].option2 + "</p>";
};

function isCorrect(answer) {
    if (answer == questions[currentQuestion].correct) {
        score++;
    }
    else {
        timeLeft = timeLeft - 10;
    }
    console.log("Score: " + score);
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        renderQuestions();
    } else {
        endOfQuiz();
    }
};

function endOfQuiz() {
    timeLeft = 0;
    timerEl.textContent = "Time's up!";
    questionEl.textContent = "";
    option1El.style.visibility = 'hidden';
    option2El.style.visibility = 'hidden';
    scoreEl.textContent = "The quiz is over! You got " + score + "/" + questions.length + " points!"
    setHighscore();

};

function setHighscore() {
    if (score >= storedHighscore) {
        localStorage.setItem("highscore", score);
        storedHighscore = localStorage.getItem("highscore");
        // saveScoreEl.innerHTML = // Here I want to ask user for initials. Haven't got that far yet.
    }    
    highscoreEl.textContent = "High scrore: " + storedHighscore;
}

startButton.addEventListener("click", function startQuiz() {
    currentQuestion = 0;
    score = 0;
    timeLeft = 60;
    startButton.style.visibility = 'hidden';
    scoreEl.textContent = "";
    startTimer();
    renderQuestions();
    ;
});