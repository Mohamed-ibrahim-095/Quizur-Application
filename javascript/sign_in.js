import {
  togglepage,
  preventDefault,
  getDataFromLocalStorage,
  locationTarget,
  chickDataInLocalStorage,
} from "./functions.js";

const home = document.querySelector(".app-name-link");
// Redirect the user to the home page (index.html)
togglepage(home, "../index.html");

// Local Storage Data Base
const dataBase = getDataFromLocalStorage("user-data");

// Collect input elements from the page
const inputs = {
  userEmail: document.getElementById("user-email"),
  userPassword: document.getElementById("user-password"),
};

// Choose to show password
const showPassword = document.getElementById("show-password");
showPassword.addEventListener("click", () => {
  inputs.userPassword.classList.toggle("show-pass");
  if (inputs.userPassword.classList.contains("show-pass")) {
    inputs.userPassword.type = "text";
  } else {
    inputs.userPassword.type = "password";
  }
});

const signinBtn = document.querySelector(".signin");
preventDefault(signinBtn);

function checkInputsAndRedirect() {
  // An object to keep track of the validation status of email and password
  const validationStatus = {
    email: false,
    password: false,
  };

  // Iterate over all input elements
  Object.values(inputs).forEach((input) => {
    if (chickDataInLocalStorage("user-data")) {
      // Iterate over all records in the database
      dataBase.forEach((targetKey) => {
        // Iterate over the keys of each record
        Object.keys(targetKey).forEach((key) => {
          // Check if the input type matches the current key
          if (input.type === key) {
            // Check if the input value matches the value in the database and is not empty
            if (input.value === targetKey[key] && input.value !== "") {
              // Mark the validation status for this key as true
              validationStatus[key] = true;
              // If all validations are true, redirect to the welcome page
              if (
                Object.values(validationStatus).every((inp) => inp === true)
              ) {
                locationTarget("../pages/intro.html");
              }
            } else {
              // If validation fails, add the 'no-valid' class to the input
              input.classList.add("no-valid");
            }
          }
        });
      });
    } else {
      input.classList.add("no-valid");
    }

    // Remove 'no-valid' class if the input is clicked
    input.addEventListener("click", () => {
      if (input.classList.contains("no-valid")) {
        input.classList.remove("no-valid");
      }
    });
  });
}

signinBtn.addEventListener("click", () => {
  checkInputsAndRedirect();
});

const signInPage = document.querySelector(".sign-in .form-footer-box .link");
preventDefault(signInPage);
togglepage(signInPage, "../pages/signup.html");
