// quiz.js — self-check quiz logic
// Beginner-friendly: plain var, for loops, no ES6 classes/modules/arrow fns

var quizData = [
  {
    question: "You ask an AI tool to write a full essay paragraph and submit it unchanged. What's the main problem?",
    options: [
      "It's slower than writing it yourself",
      "You haven't engaged with or verified the content, and likely haven't disclosed AI use",
      "AI essays are always too short",
      "There's no problem if the grammar is correct"
    ],
    correctIndex: 1
  },
  {
    question: "Your course policy says AI is 'permitted with disclosure.' What does that mean?",
    options: [
      "You can use AI for everything, no need to mention it",
      "You can't use AI at all",
      "You can use AI but must state how you used it, usually in a statement or footnote",
      "Only your teacher can use AI"
    ],
    correctIndex: 2
  },
  {
    question: "Which of these is the most effective way to use AI for exam revision?",
    options: [
      "Ask it to summarise the whole textbook and read it once",
      "Ask it to quiz you with questions and explain what you got wrong",
      "Ask it to write your exam answers in advance",
      "Avoid AI entirely, even for understanding tricky concepts"
    ],
    correctIndex: 1
  },
  {
    question: "True or false: a tool that claims to 'humanise' AI text to avoid detection is a good academic strategy.",
    options: [
      "True — it solves the plagiarism problem",
      "False — it hides the underlying issue instead of solving it",
      "True, but only for take-home assignments",
      "False, but only because it's against the law"
    ],
    correctIndex: 1
  },
  {
    question: "You used AI to debug a coding error by asking it to explain the bug, then fixed it yourself. Is this ethical?",
    options: [
      "No — any AI involvement in code is plagiarism",
      "Yes — you used AI to understand the problem, not to do the work for you",
      "Only if you don't tell your teacher",
      "No, unless the AI wrote the final code"
    ],
    correctIndex: 1
  },
  {
    question: "Why does academic integrity matter beyond just 'not getting caught'?",
    options: [
      "It doesn't really matter once you have the qualification",
      "It ensures your qualification reflects skills you actually have",
      "It only matters for postgraduate study",
      "It's only a concern for plagiarism-detection software companies"
    ],
    correctIndex: 1
  }
];

var userAnswers = [];

function renderQuiz() {
  var container = document.getElementById("quizContainer");
  var html = "";

  for (var i = 0; i < quizData.length; i++) {
    var q = quizData[i];
    html += '<div class="card mb-3" data-question-index="' + i + '">';
    html += '<p class="quiz-question-num font-mono">Question ' + (i + 1) + ' of ' + quizData.length + '</p>';
    html += '<p class="font-display mb-2" style="font-size:1.05rem;">' + q.question + '</p>';
    html += '<div>';

    for (var j = 0; j < q.options.length; j++) {
      html += '<button type="button" class="quiz-option" data-q="' + i + '" data-opt="' + j + '">' + q.options[j] + '</button>';
    }

    html += '</div></div>';
  }

  html += '<button id="submitQuizBtn" class="btn">Check my answers</button>';

  container.innerHTML = html;
  attachQuizEvents();
}

function attachQuizEvents() {
  var optionButtons = document.querySelectorAll(".quiz-option");

  for (var i = 0; i < optionButtons.length; i++) {
    optionButtons[i].addEventListener("click", function () {
      var qIndex = parseInt(this.getAttribute("data-q"), 10);
      var optIndex = parseInt(this.getAttribute("data-opt"), 10);

      var siblingButtons = document.querySelectorAll('.quiz-option[data-q="' + qIndex + '"]');
      for (var k = 0; k < siblingButtons.length; k++) {
        siblingButtons[k].classList.remove("selected");
      }
      this.classList.add("selected");

      userAnswers[qIndex] = optIndex;
    });
  }

  var submitBtn = document.getElementById("submitQuizBtn");
  submitBtn.addEventListener("click", checkAnswers);
}

function checkAnswers() {
  var correctCount = 0;

  for (var i = 0; i < quizData.length; i++) {
    var q = quizData[i];
    var userChoice = userAnswers[i];
    var optionButtons = document.querySelectorAll('.quiz-option[data-q="' + i + '"]');

    for (var j = 0; j < optionButtons.length; j++) {
      optionButtons[j].setAttribute("disabled", "true");

      if (j === q.correctIndex) {
        optionButtons[j].classList.add("correct");
      } else if (j === userChoice && userChoice !== q.correctIndex) {
        optionButtons[j].classList.add("incorrect");
      }
    }

    if (userChoice === q.correctIndex) {
      correctCount = correctCount + 1;
    }
  }

  var submitBtn = document.getElementById("submitQuizBtn");
  if (submitBtn) {
    submitBtn.style.display = "none";
  }

  showResult(correctCount);

  // Mark quiz as attempted in the progress tracker, if available
  if (typeof saveProgressItem === "function") {
    saveProgressItem("quiz");
  }
}

function showResult(correctCount) {
  var resultBox = document.getElementById("quizResult");
  var resultText = document.getElementById("resultText");

  var message = "";
  if (correctCount === quizData.length) {
    message = "You got " + correctCount + " out of " + quizData.length + " correct. Solid grasp of the core ideas.";
  } else if (correctCount >= quizData.length / 2) {
    message = "You got " + correctCount + " out of " + quizData.length + " correct. Worth reviewing the modules you missed — check the highlighted answers above.";
  } else {
    message = "You got " + correctCount + " out of " + quizData.length + " correct. Head back to the Modules page and work through them again before moving on.";
  }

  resultText.textContent = message;
  resultBox.classList.remove("hidden");
  resultBox.scrollIntoView({ behavior: "smooth", block: "center" });
}

function resetQuiz() {
  userAnswers = [];
  document.getElementById("quizResult").classList.add("hidden");
  renderQuiz();
}

document.addEventListener("DOMContentLoaded", function () {
  renderQuiz();
  var retryBtn = document.getElementById("retryBtn");
  retryBtn.addEventListener("click", resetQuiz);
});