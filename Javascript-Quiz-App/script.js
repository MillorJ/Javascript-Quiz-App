const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Berlin", "Madrid", "Paris", "Lisbon"],
    answer: 2
  },
  {
    question: "Which language runs in a web browser?",
    choices: ["Java", "C", "Python", "JavaScript"],
    answer: 3
  },
  {
    question: "What does CSS stand for?",
    choices: ["Central Style Sheets", "Cascading Style Sheets", "Cascading Simple Sheets", "Cars SUVs Sailboats"],
    answer: 1
  },
  {
    question: "What does HTML stand for?",
    choices: ["Hypertext Markup Language", "Hypertext Markdown Language", "Hyperloop Machine Language", "Helicopters Terminals Motorboats Lamborginis"],
    answer: 0
  }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLimit = 10; // 10 seconds per question

const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const progressBarFill = document.getElementById("progressFill");
const scoreElement = document.getElementById("score");

function startQuiz() {
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;

  currentQuestion.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.innerText = choice;
    button.classList.add("btn-choice");
    button.addEventListener("click", () => selectAnswer(index));
    choicesElement.appendChild(button);
  });

  progressBarFill.style.width = "100%";
  startTimer();
}

function resetState() {
  nextButton.style.display = "none";
  choicesElement.innerHTML = "";
  progressBarFill.style.width = "100%";
  clearInterval(timer);
}

function selectAnswer(selectedIndex) {
  const currentQuestion = questions[currentQuestionIndex];
  if (selectedIndex === currentQuestion.answer) {
    score++;
  }

  Array.from(choicesElement.children).forEach((button, index) => {
    button.disabled = true;
    button.classList.add(index === currentQuestion.answer ? "correct" : "incorrect");
  });

  nextButton.style.display = "block";
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  questionElement.style.display = "none";
  choicesElement.style.display = "none";
  nextButton.style.display = "none";
  resultContainer.style.display = "block";
  scoreElement.innerText = `${score} / ${questions.length}`;
}

function startTimer() {
  let timeLeft = timeLimit;
  timer = setInterval(() => {
    timeLeft--;
    const progress = (timeLeft / timeLimit) * 100;
    progressBarFill.style.width = `${progress}%`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      selectAnswer(-1); // Automatically move to next question if time runs out
    }
  }, 1000);
}

nextButton.addEventListener("click", nextQuestion);

startQuiz();
