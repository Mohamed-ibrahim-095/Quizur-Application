// This function toggles the page navigation when the specified button is clicked.
function togglepage(button, targetPage) {
  return button.addEventListener("click", () => {
    // Redirect the user to the target page when the button is clicked
    return (window.location = targetPage);
  });
}

// Adds an event listener to a button to prevent the default action when clicked
function preventDefault(button) {
  button.addEventListener("click", function (e) {
    e.preventDefault();
  });
}

// Set Data To Local Storage
function setDataToLocalStorage(key, value) {
  const valueToString = JSON.stringify(value);
  return window.localStorage.setItem(key, valueToString);
}

// Function Set Dat From JSON Object To Local Storage
function setDataFromJSONToStorage(key, value) {
  return window.localStorage.setItem(key, value);
}

// Get Data From Local Storage
function getDataFromLocalStorage(key) {
  let targetItem = window.localStorage.getItem(key);
  let resultValue;
  if (targetItem) {
    resultValue = JSON.parse(targetItem);
  }
  return resultValue;
}

// Chick Data In Local Storage
function chickDataInLocalStorage(key) {
  if (window.localStorage.getItem(key)) {
    return true;
  } else {
    return false;
  }
}

// change Window Location
function locationTarget(location) {
  return (window.location = location);
}

// Add 'no-valid' class to all elements that do not have 'valid' class
function addNoValid(targetArray) {
  targetArray.forEach((divTarget) => {
    if (!divTarget.classList.contains("valid")) {
      divTarget.classList.add("no-valid");
    }
  });
}

// Get User Name From Data Base
function getUserName(dataName, target) {
  if (chickDataInLocalStorage(dataName)) {
    getDataFromLocalStorage(dataName).forEach(
      (item) => (target.userName.textContent = item.name)
    );
  }
}

// Get User Image From Data Base
function getUserImage(dataName, target) {
  if (chickDataInLocalStorage(dataName)) {
    target.userImage.src = getDataFromLocalStorage(dataName);
  }
}

// Activates the first question element by adding the "active" class to it.
function activateFirstQuestion(allQuestions) {
  const questionsListBox = allQuestions;
  questionsListBox
    .filter((question, index, array) => array.indexOf(question) === 0)
    .forEach((div) => div.classList.add("active"));
}

// Function
function dataStorageState(targetItem, targetValue) {
  if (window.localStorage.getItem(targetItem)) {
    setDataToLocalStorage(
      targetItem,
      JSON.parse(window.localStorage.getItem(targetItem))
    );
  } else {
    setDataToLocalStorage(targetItem, targetValue);
  }
}

export {
  togglepage,
  preventDefault,
  setDataToLocalStorage,
  setDataFromJSONToStorage,
  getDataFromLocalStorage,
  chickDataInLocalStorage,
  locationTarget,
  addNoValid,
  getUserName,
  getUserImage,
  activateFirstQuestion,
  dataStorageState,
};
