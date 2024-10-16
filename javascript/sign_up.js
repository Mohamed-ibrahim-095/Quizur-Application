import {
  togglepage,
  preventDefault,
  setDataToLocalStorage,
  getDataFromLocalStorage,
  chickDataInLocalStorage,
  locationTarget,
} from "./functions.js";

const home = document.querySelector(".app-name-link");
// Redirect the user to the home page (index.html)
togglepage(home, "../index.html");

// User Data
let userFullData;

// Collect input elements from the page
const inputs = {
  userName: document.getElementById("user-name"),
  userEmail: document.getElementById("user-email"),
  userPassword: document.getElementById("user-password"),
};

// Collect validation elements from the page
const validations = {
  validName: document.querySelector(".valid-name"),
  validEmail: document.querySelector(".valid-email"),
  validPassLower: document.querySelector(".valid-pass-lower"),
  validPassUpper: document.querySelector(".valid-pass-upper"),
  validPassNumber: document.querySelector(".valid-pass-number"),
  validPassSpecial: document.querySelector(".valid-pass-special"),
  validPassLong: document.querySelector(".valid-pass-long"),
};

// Define validation rules for input fields and their corresponding validation elements
const validationRules = [
  {
    input: inputs.userName,
    regEx: /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/,
    valid: validations.validName,
  },
  {
    input: inputs.userEmail,
    regEx: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    valid: validations.validEmail,
  },
  {
    input: inputs.userPassword,
    regEx: /(?=.*[a-z])/,
    valid: validations.validPassLower,
  },
  {
    input: inputs.userPassword,
    regEx: /(?=.*[A-Z])/,
    valid: validations.validPassUpper,
  },
  {
    input: inputs.userPassword,
    regEx: /(?=.*[0-9])/,
    valid: validations.validPassNumber,
  },
  {
    input: inputs.userPassword,
    regEx: /(?=.*[!@#$%^&*(),.?":{}|<>])/,
    valid: validations.validPassSpecial,
  },
  {
    input: inputs.userPassword,
    regEx: /^.{8,}$/,
    valid: validations.validPassLong,
  },
];

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

// Sign Up Button
const signupBtn = document.querySelector(".signup");
preventDefault(signupBtn);

// Go To Sign In Page
const signinBtn = document.querySelector(".form-footer-box .link");
preventDefault(signinBtn);
togglepage(signinBtn, "../pages/signin.html"); // Go to the login page if you already have an account

// Filter list items that have the 'placeholder' attribute
const filteredListItems = Array.from(
  document.getElementsByTagName("li")
).filter((li) => li.getAttribute("placeholder"));

function fullValidations() {
  validationRules.forEach((rules) => {
    // Check if the input value is not empty and matches the regular expression
    if (rules.input.value !== "" && rules.regEx.test(rules.input.value)) {
      // Add 'valid' class to the corresponding validation element
      rules.valid.classList.add("valid");

      // If the input type is 'password', perform additional checks
      if (rules.input.type === "password") {
        // If all list items have the 'valid' class, add 'valid' class to the input
        if (filteredListItems.every((li) => li.classList.contains("valid"))) {
          rules.input.classList.add("valid");
        } else {
          // Otherwise, remove 'valid' class from the input
          rules.input.classList.remove("valid");
        }
      } else {
        // If the input type is not 'password', add 'valid' class to the input
        rules.input.classList.add("valid");
      }
    } else {
      // If the input value is empty or doesn't match the regular expression, remove 'valid' class
      rules.valid.classList.remove("valid");
      rules.input.classList.remove("valid");
    }

    // Check all elements in collectAllList and remove 'no-valid' class from those that have 'valid' class
    collectAllList.forEach((divTarget) => {
      if (divTarget.classList.contains("valid")) {
        divTarget.classList.remove("no-valid");
      }
    });
  });
}

// Add event listeners to input fields for validation on keyup
validationRules.forEach((rules) => {
  // Add an event listener for 'keyup' event on each input field
  rules.input.addEventListener("keyup", fullValidations);
});

// Toggle the 'select' class on the chick icon when approval elements are clicked
const approval = {
  chickBox: document.querySelector(".chick-box"),
  textBox: document.querySelector(".text-box"),
};

// Collect all relevant elements including inputs, validation elements, and approval elements into one list
const collectAllList = [
  ...Object.values(inputs),
  ...Object.values(validations),
  approval.chickBox,
  approval.textBox,
];

// Add click event listeners to all approval elements
Object.values(approval).forEach((box) => {
  box.addEventListener("click", () => {
    // Remove 'no-valid' class from chickBox and textBox
    approval.chickBox.classList.remove("no-valid");
    approval.textBox.classList.remove("no-valid");

    // Toggle 'valid' class on chickBox
    approval.chickBox.classList.toggle("valid");
  });
});

// Add 'no-valid' class to all elements in collectAllList that do not have 'valid' class
function initializeValidation() {
  collectAllList.forEach((div) => {
    if (!div.classList.contains("valid")) {
      div.classList.add("no-valid");
    }
    if (approval.chickBox.classList.contains("valid")) {
      approval.textBox.classList.remove("no-valid");
    }
  });
}

// validation Status
const allStatus = {
  valid: false,
};

function validationStatus() {
  const collectList = [...collectAllList].filter(
    (item) => !item.classList.contains("text-box")
  );
  if (collectList.every((div) => div.classList.contains("valid"))) {
    allStatus.valid = true;
  }
}

// Collects validated user input data and stores it in userFullData array.
function dataCollection() {
  // If validation Status = true
  if (allStatus.valid === true) {
    const theUser = [
      {
        name: inputs.userName.value,
        email: inputs.userEmail.value,
        password: inputs.userPassword.value,
      },
    ];

    userFullData = theUser;
  }
}

// Function to send user data to the database
function SendDataToDatabase() {
  // Check if userFullData is not empty
  if (userFullData.length !== 0) {
    let isEmailExist = false; // Initialize a flag to check if the email already exists

    // Check if "user-data" exists in local storage
    if (chickDataInLocalStorage("user-data")) {
      // Iterate through each item in the local storage data
      getDataFromLocalStorage("user-data").forEach((item) => {
        // Check if the input email matches an existing email in local storage
        if (inputs.userEmail.value === item.email) {
          isEmailExist = true; // Set the flag to true if email exists

          inputs.userEmail.classList.remove("valid"); // Remove valid class from email input
          inputs.userEmail.classList.add("no-valid"); // Add no-valid class to email input
        } else {
          // Update the email of the item to the input email
          item.email = inputs.userEmail.value;

          // Save the updated user data to local storage
          setDataToLocalStorage("user-data", userFullData);

          // Redirect to the signin page after completing the data sending process
          locationTarget("../pages/signin.html");
        }
      });
    } else {
      // If "user-data" does not exist in local storage, save the user data to local storage
      setDataToLocalStorage("user-data", userFullData);

      // Redirect to the signin page after completing the data sending process
      locationTarget("../pages/signin.html");
    }
  }
}

// When the signup button is clicked, the following sequence of functions is triggered:
signupBtn.addEventListener("click", () => {
  // Call the fullValidations function to validate all input fields
  fullValidations();

  // Call the initializeValidation function to add 'no-valid' class to invalid elements
  initializeValidation();

  // Call the validationStatus function to check if all data is valid
  validationStatus();

  // Call the dataCollection function to collect the input data if it is valid
  dataCollection();

  // Call the SendDataToDatabase function to send data to local storage and redirect the user based on the result
  SendDataToDatabase();
});
