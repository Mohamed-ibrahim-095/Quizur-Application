import {
  togglepage,
  preventDefault,
  setDataToLocalStorage,
} from "./functions.js";

// Home App
const appName = document.querySelector(".app-name");
togglepage(appName, "../index.html");

// Select all elements with the class "skill-box"
const skillBoxs = document.querySelectorAll(".skill-box");

// Add a click event listener to each skill-box element
skillBoxs.forEach((box) => {
  box.addEventListener("click", () => {
    // Remove the "active" class from all skill-box elements
    skillBoxs.forEach((box) => {
      box.classList.remove("active");
    });
    // Add the "active" class to the clicked skill-box element
    box.classList.add("active");
  });
});

const nextPageBtn = document.querySelector(".next-button");

// Stop Behavior The default behavior for sending data
preventDefault(nextPageBtn);

// Go to the Sign up page
togglepage(nextPageBtn, "../pages/signup.html");

// test
nextPageBtn.addEventListener("click", () => {
  skillBoxs.forEach((box) => {
    if (box.classList.contains("active")) {
      setDataToLocalStorage("skill-Type", box.getAttribute("skilltype"));
    }
  });
});

const home = document.querySelector(".app-name-link");
togglepage(home, "../index.html");
