import {
  setDataToLocalStorage,
  chickDataInLocalStorage,
  dataStorageState,
} from "./functions.js";

import {
  viewQuestion,
  checkAnswer,
  questionsList,
  snedAnswerBTN,
  questionNumber,
  availableQuestions,
} from "./quiz.js";

// Define an object to hold references to the quiz area and blur elements
const quizArea = {
  area: document.querySelector(".quiz-area-box"), // Select the quiz area box element
  blur: document.querySelector(".blur-box .play"), // Select the blur box play button element
};

// Add a click event listener to the blur button
quizArea.blur.addEventListener("click", () => {
  // Change the class name of the quiz area to "quiz-area-box"
  quizArea.area.className = "quiz-area-box";
  // Store the class name in localStorage
  window.localStorage.setItem("quizAreaClass", "quiz-area-box");
  ////////////////////////////
  window.localStorage.setItem("count-run", "count-run");
  stratCountDown();
});

// Check if the class name for the quiz area is stored in localStorage
if (chickDataInLocalStorage("quizAreaClass")) {
  // Set the class name of the quiz area to the stored value from localStorage
  quizArea.area.className = window.localStorage.getItem("quizAreaClass");
}

function stratCountDown() {
  // Select elements for displaying countdown and time taken
  const timeBox = {
    conicGradient: document.querySelector(".quiz-count-down .count-box .count"),
    timeTaken: document.querySelector(".quiz-count-down .count-box .time"),
  };

  const FixedTime = 60; // Set the fixed duration for countdown
  let mainCount = 0; // Initialize mainCount to 0

  // Save the fixed duration in local storage
  dataStorageState("duration", FixedTime);

  // Retrieve the duration from local storage
  let duration = JSON.parse(window.localStorage.getItem("duration"));
  timeBox.timeTaken.textContent = `00:${duration}`; // Display the initial duration

  // Retrieve mainCount from local storage if it exists, otherwise save the initial mainCount
  if (window.localStorage.getItem("mainCount")) {
    mainCount = JSON.parse(window.localStorage.getItem("mainCount"));
  } else {
    setDataToLocalStorage("mainCount", mainCount);
  }

  // Start the countdown interval
  const stratTime = setInterval(() => {
    duration--; // Decrease the duration by 1 second

    // Display the remaining duration with formatting
    if (duration < 10) {
      timeBox.timeTaken.textContent = `00:0${duration}`;
    } else {
      timeBox.timeTaken.textContent = `00:${duration}`;
    }

    // If duration reaches 0, reset the duration and increase mainCount
    if (duration === 0) {
      duration = FixedTime;
      mainCount++;

      // If there are more questions, save the current state and load the next question
      if (questionNumber < availableQuestions - 1) {
        setDataToLocalStorage("mainCount", mainCount);
        checkAnswer();
        viewQuestion();
        setDataToLocalStorage("question-number", questionNumber);
        questionsList();
      }
    }

    setDataToLocalStorage("duration", duration); // Save the updated duration to local storage

    // If all questions are answered, stop the countdown and redirect to results page
    if (mainCount === availableQuestions) {
      clearInterval(stratTime);
      window.location = "../pages/result.html";
      setDataToLocalStorage("mainCount", mainCount);
      checkAnswer();
      viewQuestion();
      setDataToLocalStorage("question-number", questionNumber);
      questionsList();
    }
  }, 1000);

  // Initialize or retrieve the starting degree for the conic gradient
  if (window.localStorage.getItem("degStart")) {
    setDataToLocalStorage(
      "degStart",
      JSON.parse(window.localStorage.getItem("degStart"))
    );
  } else {
    setDataToLocalStorage("degStart", 360);
  }

  let degStart = JSON.parse(window.localStorage.getItem("degStart"));
  const totalTimeInSeconds = 60;
  const totalMilliseconds = totalTimeInSeconds * 1000;
  const increment = 360 / (totalMilliseconds / 1000); // Calculate the increment for the conic gradient

  // Set the initial background for the conic gradient
  timeBox.conicGradient.style.background = `conic-gradient(var(--main-color) ${degStart}deg, var(--color-17) 0, var(--color-17) 0)`;

  // Start the interval for the conic gradient animation
  const conicTimer = setInterval(() => {
    degStart -= increment;
    setDataToLocalStorage("degStart", degStart);

    // Update the background for the conic gradient
    timeBox.conicGradient.style.background = `conic-gradient(var(--main-color) ${degStart}deg, var(--color-17) 0, var(--color-17) 0)`;

    // Reset the degree if it reaches 0
    if (degStart <= 0) {
      degStart = 360;
    }
    // Reset the degree when the answer button is clicked
    snedAnswerBTN.addEventListener("click", () => {
      degStart = 360;
    });
    // Stop the conic gradient animation if all questions are answered
    if (mainCount === availableQuestions) {
      clearInterval(conicTimer);
    }
  }, 1000);

  // Reset duration and increment mainCount when the answer button is clicked
  snedAnswerBTN.addEventListener("click", () => {
    duration = FixedTime;
    setDataToLocalStorage("duration", duration);

    if (mainCount <= availableQuestions) {
      mainCount++;
    }

    setDataToLocalStorage("mainCount", mainCount);
  });
}

// Start the countdown if "count-run" is found in local storage
if (chickDataInLocalStorage("count-run")) {
  stratCountDown();
}
