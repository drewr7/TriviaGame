function move() {
  var elem = document.getElementById("progressbar");   
  var width = 0;
  var id = setInterval(frame, 200);
  function frame() {
    if (width >= 100) {
      clearInterval(id);
      alert("You're out of time!");
      showResults();
    } else {
      width++; 
      elem.style.width = width + '%'; 
    }
  }
}
    
    (function() {
  function buildQuiz() {

    const output = [];

    myQuestions.forEach((currentQuestion, questionNumber) => {

      const answers = [];

      for (letter in currentQuestion.answers) {

        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>`
      );
    });

    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    
    const answerContainers = quizContainer.querySelectorAll(".answers");

    
    let numCorrect = 0;

  
    myQuestions.forEach((currentQuestion, questionNumber) => {

      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    
      if (userAnswer === currentQuestion.correctAnswer) {
      
        numCorrect++;

        answerContainers[questionNumber].style.color = "lightgreen";
      } else {

        answerContainers[questionNumber].style.color = "red";
      }
    });

    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");
  const myQuestions = [
    {
      question: "What year did the Astros win the World Series?",
      answers: {
        a: "2005",
        b: "2017",
        c: "1999",
        d: "2018"
      },
      correctAnswer: "b"
    },
    {
      question: "What Astros player has the most hits all time?",
      answers: {
        a: "Jose Altuve",
        b: "Jeff Bagwell",
        c: "Lance Berkman",
        d: "Craig Biggio"
      },
      correctAnswer: "d"
    },
    {
      question: "What was the Astros team name when it joined the MLB in 1962?",
      answers: {
        a: "Buffaloes",
        b: "Astros",
        c: "Colt .45s",
        d: "Oilers"
      },
      correctAnswer: "c"
    }
  ];


  buildQuiz();


  submitButton.addEventListener("click", showResults);


})();