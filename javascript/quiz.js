import {
  togglepage,
  setDataToLocalStorage,
  setDataFromJSONToStorage,
  getDataFromLocalStorage,
  getUserName,
  getUserImage,
} from "./functions.js";

const home = document.querySelector(".app-name-link");
// Redirect the user to the home page (index.html)
togglepage(home, "../index.html");

(function userInfo() {
  const user = {
    userName: document.querySelector(".intro-user-name .user-name"),
    userImage: document.querySelector(".intro-user-image .image img"),
  };
  getUserName("user-data", user);
  getUserImage("user-image", user);
})();

/*========= QUiz Start ==========*/

// Initialize an empty array in local storage for storing correct answers

// Initialize validityQuestionsr array
let validityQuestionsr = [];

// Check if validityQuestionsr exists in localStorage and parse it
if (window.localStorage.getItem("validityQuestionsr")) {
  validityQuestionsr = JSON.parse(
    window.localStorage.getItem("validityQuestionsr")
  );
}

// Initialize result variable
let result;

// Function to fetch questions from JSON file using a Promise
function fetchQuestions() {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open("GET", "../json/questions.json");
    request.send();
    request.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          resolve(JSON.parse(this.responseText));
        } else {
          reject(new Error("Failed to load questions"));
        }
      }
    };
  });
}

// Initialize questionNumber variable
let questionNumber = 0;

// Check if question-number exists in localStorage and set it
if (!getDataFromLocalStorage("question-number")) {
  setDataToLocalStorage("question-number", 0);
} else if (window.localStorage.getItem("question-number")) {
  questionNumber = window.localStorage.getItem("question-number");
} else {
  questionNumber = 0;
}

// Get skillType from localStorage
let skillType = getDataFromLocalStorage("skill-Type");

// Declare theQuestions, targetSkillQuestions, and availableQuestions variables
let theQuestions;
let targetSkillQuestions;
let availableQuestions;

// Fetch questions from JSON file and process data
fetchQuestions()
  .then((data) => {
    result = data;

    // Check if questions exist in localStorage and parse them, otherwise use fetched data
    if (window.localStorage.getItem("questions")) {
      theQuestions = JSON.parse(window.localStorage.getItem("questions"));
    } else {
      theQuestions = result;
    }

    // Filter questions based on skillType
    targetSkillQuestions = theQuestions.filter((skill) => skill[skillType])[0][
      skillType
    ];

    // Get the length of available questions
    availableQuestions = targetSkillQuestions.length;

    // Store fetched data to localStorage
    setDataFromJSONToStorage("questions", JSON.stringify(result));
    // Call viewQuestion function
    viewQuestion();
    // Call questionsList function
    questionsList();
  })
  .catch((error) => {
    console.error(error);
  });

function viewQuestion() {
  // Collect references to the DOM elements where we will insert the quiz title and questions
  const collect = {
    quizTitle: document.querySelector(".quiz-title .title"),
    questionsList: document.querySelector(".questions-list"),
  };

  // Clear the previous content of the quiz title and questions list
  collect.quizTitle.innerHTML = "";
  collect.questionsList.innerHTML = "";

  // Create a text node for the question title from the first question's text
  const qTitle = document.createTextNode(
    targetSkillQuestions[questionNumber].question
  );

  // Append the question title to the quiz title element in the DOM
  collect.quizTitle.appendChild(qTitle);

  // Get the keys of the answers for the current question
  const getAnswersCount = Object.keys(
    targetSkillQuestions[questionNumber].answers
  );

  // Loop over each answer key to create and append the corresponding answer elements
  getAnswersCount.forEach((answer, index, array) => {
    // Create a list item element for the question
    const createQuestionDiv = document.createElement("li");
    createQuestionDiv.className = "question";

    // Create a div element for the question number
    const craeteQuestionNumber = document.createElement("div");
    craeteQuestionNumber.className = "question-number";

    // Create a span element for the number text
    const createNumSpan = document.createElement("span");
    createNumSpan.className = "num";
    const createNumSpanValue = document.createTextNode(
      array.indexOf(answer) + 1
    );
    createNumSpan.appendChild(createNumSpanValue);
    craeteQuestionNumber.appendChild(createNumSpan);

    // Create a div element for the question content
    const craeteQuestionContent = document.createElement("div");
    craeteQuestionContent.className = "question-content";

    // Create a span element for the answer text
    const createQuesSpan = document.createElement("span");
    createQuesSpan.className = "ques";
    const createQuesSpanValue = document.createTextNode(
      targetSkillQuestions[questionNumber]["answers"][answer]
    );
    createQuesSpan.appendChild(createQuesSpanValue);

    // Create a span element for displaying a check mark
    const createCheckMarkSpan = document.createElement("span");
    createCheckMarkSpan.className = "main-check-mark";
    createCheckMarkSpan.innerHTML = `<i class="fa-solid fa-check"></i>`;
    craeteQuestionContent.appendChild(createQuesSpan);
    craeteQuestionContent.appendChild(createCheckMarkSpan);

    // Append the number and content divs to the list item element
    createQuestionDiv.appendChild(craeteQuestionNumber);
    createQuestionDiv.appendChild(craeteQuestionContent);

    // Append the list item element to the questions list element in the DOM
    collect.questionsList.appendChild(createQuestionDiv);
  });

  // questions List Box
  const questionsListBox = Array.from(document.querySelectorAll(".question"));

  // Adds a click event to each question to toggle the "active" class, highlighting the clicked question.
  // Iterate over each question in the questions list
  questionsListBox.forEach((question) => {
    // Add a click event listener to each question
    question.addEventListener("click", () => {
      // Remove the "active" class from all questions
      questionsListBox.forEach((question) => {
        question.classList.remove("active");
      });
      // Add the "active" class to the clicked question
      question.classList.add("active");
    });
  });

  questionsList();
}

/* Craete Question Count In Side bar */
function questionsList() {
  // Get the element that contains the list of questions
  const parentQuestionsTotal = document.querySelector(
    ".quiz-questions-list .list-contnet .list"
  );

  parentQuestionsTotal.innerHTML = "";

  // Loop through the target skill questions to create list items
  for (let i = 0; i < availableQuestions; i++) {
    // Create a new <li> element for each question
    const createQuestionLine = document.createElement("li");
    createQuestionLine.className = "line";

    // Define the question text value
    const questionTextValue = `question ${i + 1}`;

    // Create a <span> element for the question text
    const textSpan = document.createElement("span");
    textSpan.className = "text";
    const createQuestionText = document.createTextNode(questionTextValue);
    textSpan.appendChild(createQuestionText);

    // Create a <span> element for the check mark
    const checkMarkSpan = document.createElement("span");
    checkMarkSpan.className = "main-check-mark";
    checkMarkSpan.innerHTML = `<i class="fa-solid fa-check"></i>`;

    // Append the text and check mark spans to the <li> element
    createQuestionLine.appendChild(textSpan);
    createQuestionLine.appendChild(checkMarkSpan);

    // Append the <li> element to the parent questions list
    parentQuestionsTotal.appendChild(createQuestionLine);
  }

  // Collect all question line elements into an array
  const questionsCollect = Array.from(document.querySelectorAll(".line"));
  // Activate the first question
  // activateFirstQuestion(questionsCollect);

  for (let i = 0; i <= getDataFromLocalStorage("question-number"); i++) {
    questionsCollect[i].classList.add("active");
  }
}

// Function to check the answer
function checkAnswer() {
  // Select all the question elements
  const exactQuestion = document.querySelectorAll(".questions-list .question");
  let chickActiveHear = false;
  // Loop through each question
  exactQuestion.forEach((question) => {
    // Check if the question has the "active" class
    if (question.classList.contains("active")) {
      chickActiveHear = true;
      // Get the text content of the active question
      const exactQuestionActive = document.querySelector(
        ".questions-list .question.active .ques"
      ).textContent;

      // Check if the active question's answer matches the correct answer
      if (
        exactQuestionActive === targetSkillQuestions[questionNumber].rightAnswer
      ) {
        // If the array of valid questions is less than the available questions
        if (validityQuestionsr.length < availableQuestions) {
          // Add true to the array indicating a correct answer
          validityQuestionsr.push(true);
          // Save the updated array to Local Storage
          setDataToLocalStorage("validityQuestionsr", validityQuestionsr);
        }
      } else {
        // If the answer is incorrect and the array is less than the available questions
        if (validityQuestionsr.length < availableQuestions) {
          // Add false to the array indicating an incorrect answer
          validityQuestionsr.push(false);
          // Save the updated array to Local Storage
          setDataToLocalStorage("validityQuestionsr", validityQuestionsr);
        }
      }

      // Increment the question number
      if (validityQuestionsr.length < availableQuestions) {
        ++questionNumber;
      }
    }
  });

  // Check if chickActiveHear is false
  if (chickActiveHear === false) {
    // Check if the number of validityQuestionsr is less than availableQuestions
    if (validityQuestionsr.length < availableQuestions) {
      // Add a new question status (false) to validityQuestionsr array
      validityQuestionsr.push(false);
      // Save the updated validityQuestionsr array to localStorage
      setDataToLocalStorage("validityQuestionsr", validityQuestionsr);
      // Increment the question number
      ++questionNumber;
    }
  }
}

// Function to run the quiz application
const snedAnswerBTN = document.querySelector(".main-sign");

// Add a click event listener to the "Send Answer" button
snedAnswerBTN.addEventListener("click", function () {
  // Check the answer
  checkAnswer();

  // If there are more questions to show
  if (questionNumber < availableQuestions) {
    // Display the next question
    viewQuestion();
    // Save the current question number to Local Storage
    setDataToLocalStorage("question-number", questionNumber);
  }

  // Update the questions list in the side bar
  questionsList();
});

export {
  validityQuestionsr,
  snedAnswerBTN,
  checkAnswer,
  questionNumber,
  viewQuestion,
  questionsList,
  availableQuestions,
};
