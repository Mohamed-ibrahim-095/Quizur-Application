import {
  getDataFromLocalStorage,
  togglepage,
  getUserName,
  getUserImage,
} from "./functions.js";

// Home App
const appName = document.querySelector(".app-name");
togglepage(appName, "../index.html");

(function userInfo() {
  const user = {
    userName: document.querySelector(".intro-user-name .user-name"),
    userImage: document.querySelector(".intro-user-image .image img"),
  };
  getUserName("user-data", user);
  getUserImage("user-image", user);
})();

// Define the result box elements for degree and full mark
const resultBox = {
  degree: document.querySelector(".degree"),
  fullMark: document.querySelector(".full-mark"),
};

// Get the number of true answers from local storage and count them
const degreeNumber = getDataFromLocalStorage("validityQuestionsr").filter(
  (answer) => answer === true
).length;

// Get the total number of questions from local storage
const fullMarkNumber = getDataFromLocalStorage("validityQuestionsr").length;

// Display the degree number and full mark number in the result box
resultBox.degree.textContent = degreeNumber;
resultBox.fullMark.textContent = fullMarkNumber;

// Calculate half mark and three-quarter mark
const halfMark = fullMarkNumber / 2;
const threeQuarterMark = fullMarkNumber * 0.75;

// Change the color of the degree based on the score
if (degreeNumber < halfMark) {
  // If the degree number is less than half of the full mark, set color to red
  resultBox.degree.style.color = "red";
} else if (degreeNumber >= halfMark && degreeNumber < threeQuarterMark) {
  // If the degree number is equal to or greater than half but less than three quarters of the full mark, set color to orange
  resultBox.degree.style.color = "orange";
} else if (degreeNumber >= threeQuarterMark) {
  // If the degree number is equal to or greater than three quarters of the full mark, set color to green
  resultBox.degree.style.color = "green";
}

// Function Empty local storage to answer the questions again
const retestAgain = document.querySelector(".retest-again");
retestAgain.addEventListener("click", () => {
  const data = [
    "questions",
    "skill-Type",
    "question-number",
    "quizAreaClass",
    "count-run",
    "duration",
    "mainCount",
    "degStart",
    "validityQuestionsr",
  ];

  data.forEach((iteme) => {
    if (window.localStorage.getItem(iteme)) {
      window.localStorage.removeItem(iteme);
    }
  });

  window.location = "../index.html";
});
