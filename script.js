const questions =[
    {
            question: "Which one of the following also known as Conditional Expression:",
            answers: [
                {text: "Alternative to if-else", correct: false},
                {text: "Switch statement", correct: false},
                {text: "If-then-else statement", correct: false},
                {text: "immediate if", correct: true},
            ]
    },
    {
        question: "In JavaScript, what is a block of statement?",
            answers: [
                {text: "Conditional block", correct: false},
                {text: "block that combines a number of statements into a single compound statement", correct: true},
                {text: "both conditional block and a single statement", correct: false},
                {text: "block that contains a single statement", correct: false},
            ]
    },
    {
        question: "When interpreter encounters an empty statements, what it will do:",
        answers: [
            {text: "Shows a warning", correct: false},
            {text: "Prompts to complete the statement", correct: false},
            {text: "Throws an error", correct: false},
            {text: "Ignores the statements", correct: true},
        ]
    },
    {
        question: "JavaScript ignores?",
        answers: [
            {text: "newlines", correct: false},
            {text: "tabs", correct: false},
            {text: "spaces", correct: false},
            {text: "all of the above", correct: true},
        ]
    },
    {
        question: "which property is used to define the html contest to an html element with a specific id?",
        answers: [
            {text: "innerHtml", correct: true},
            {text: "innerContent", correct: false},
            {text: "elementText", correct: false},
            {text: "innerText", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButtoon = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz()
{
    currentQuestionIndex=0;
    score=0;
    nextButtoon.innerHTML="Next";
    showQuestion();
}

function showQuestion()
{
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex + 1;
    questionElement.innerHTML=questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>
        {
            const button = document.createElement("button");
            button.innerHTML=answer.text;
            button.classList.add("btn");
            answerButtons.appendChild(button);
            if(answer.correct)
            {
                button.dataset.correct=answer.correct;
            }
            button.addEventListener("click",selectAnswer);
        });
    
}

function resetState()
{
    nextButtoon.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }

}

function selectAnswer(e)
{
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct ==="true")
        {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButtoon.style.display="block";
}

function showScore()
{
    resetState();
    questionElement.innerHTML=`your score is ${score} out of ${questions.length}!`;
    nextButtoon.innerHTML = "Start Over";
    nextButtoon.style.display="block";
}

function handleNextButton()
{
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButtoon.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

startQuiz();