import {
  togglepage,
  preventDefault,
  chickDataInLocalStorage,
  setDataToLocalStorage,
  getUserName,
  getUserImage,
} from "./functions.js";

const home = document.querySelector(".app-name-link");
// Redirect the user to the home page (index.html)
togglepage(home, "../index.html");

// Start Quiz Button
const stratBtn = document.querySelector(".intro-footer .main-sign");

// Prevent default action for upload and start buttons
preventDefault(stratBtn);

// Redirect the user to the Quiz page (quiz.html)
togglepage(stratBtn, "../pages/quiz.html");

// User
(function theUser() {
  const user = {
    userName: document.querySelector(".intro-user-name .user-name"),
    uploadBtn: document.getElementById("upload-btn"),
    uploadInput: document.querySelector(".inputfile"),
    imageBox: document.querySelector(".intro-user-image .image"),
    userImage: document.querySelector(".intro-user-image .image img"),
  };

  // Add username From Data base
  getUserName("user-data", user);

  // Add event listener for file input change
  user.uploadInput.addEventListener("change", () => {
    // Check if at least one file is uploaded
    if (user.uploadInput.files.length > 0) {
      const file = user.uploadInput.files[0]; // Get the uploaded file
      const reader = new FileReader(); // Create a new FileReader object

      reader.readAsDataURL(file); // Read the file as a data URL
      reader.onload = function (e) {
        const target = e.target.result; // Get the result from the FileReader
        user.userImage.src = target; // Set the user image source to the file data

        // Save the image data to local storage
        setDataToLocalStorage("user-image", target);
      };
      user.uploadBtn.style.display = "none"; // Hide the upload button
      user.imageBox.style.display = "block"; // Show the image box
    }
  });

  // Check if user image data exists in local storage
  if (chickDataInLocalStorage("user-image")) {
    user.uploadBtn.style.display = "none"; // Hide the upload button
    user.imageBox.style.display = "block"; // Show the image box
    // user.userImage.src = getDataFromLocalStorage("user-image"); // Set the user image source from local storage
  }
  // Set the user image source from local storage
  getUserImage("user-image", user);
})();
