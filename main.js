//initialising all the variables

const getRangeInput = document.getElementById("length-number"),
  getLengthValue = document.getElementById("length-value"),
  getCheckboxes = document.getElementsByClassName("checkboxes"),
  upperCaseCheckbox = document.getElementById("uppercase"),
  lowerCaseCheckbox = document.getElementById("lowercase"),
  numbersCheckbox = document.getElementById("numbers"),
  symbolsCheckbox = document.getElementById("symbols"),
  generateButton = document.getElementById("generate"),
  passwordInput = document.getElementsByClassName("password-input")[0],
  getTooWeak = document.getElementById("too-weak"),
  getWeak = document.getElementById("weak"),
  getMedium = document.getElementById("medium"),
  getStrong = document.getElementById("strong"),
  emptyCopy = document.getElementsByClassName("img-empty")[0],
  greenCopy = document.getElementsByClassName("img-green")[0],
  checkedText = document.getElementsByClassName("copied-text")[0],
  customText = document.getElementById("customText");
console.log(customText);
const allLetters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const allNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const allSymbols = ["!", "£", "$", "%", "^", "&", "*", "(", ")", "@", "/"];

let addedText;
//event listeners
getRangeInput.addEventListener("change", (e) => {
  getLengthValue.innerHTML = e.target.value;
  password.length = getLengthValue.innerHTML;
});
emptyCopy.addEventListener("mouseover", () => {
  emptyCopy.style.display = "none";
  greenCopy.style.display = "block";
});
greenCopy.addEventListener("mouseover", () => {
  emptyCopy.style.display = "none";
});
greenCopy.addEventListener("mouseout", () => {
  greenCopy.style.display = "none";
  checkedText.style.display = "none";
  emptyCopy.style.display = "block";
});
greenCopy.addEventListener("click", async () => {
  checkedText.style.display = "block";
  console.log(navigator.clipboard);
  await navigator.clipboard.writeText(passwordInput.innerHTML);
});

customText.addEventListener("keyup", (e) => {
  addedText = e.target.value;
});
//using forEach for all checkboxes to change control false > true

const checkBoxes = [
  upperCaseCheckbox,
  lowerCaseCheckbox,
  numbersCheckbox,
  symbolsCheckbox,
];
checkBoxes.forEach((checkbox, index) =>
  checkbox.addEventListener("click", () => {
    const getKeyName = Object.keys(checkboxControl)[index];
    checkboxControl[getKeyName] = checkbox.checked;
  })
);

//storage for which boxes are checked
const checkboxControl = {
  uppercase: false,
  lowercase: false,
  numbers: false,
  symbols: false,
};

// check user has ticked one box
const checkBoxTicks = () => {
  const getValues = Object.values(checkboxControl);
  const checkTrue = getValues.filter((truthvalue) => truthvalue === true);

  if (checkTrue.length) {
    return true;
  } else {
    passwordInput.innerHTML = "You need to check one of the boxes!";
    return false;
  }
};

/*Generating the password
1) run through array of selected checkboxes once, for each member of array, randomly select a number between
0 and array length - 1, and place one example of that member in array[random number]
2) for remaining blanks, roll dice ( 1/ array length) and assign new values to complete the password


*/
const filterTrueKeys = () => {
  const getKeys = Object.keys(checkboxControl);
  const filteredKeys = getKeys.filter((key) => checkboxControl[key] === true);

  return filteredKeys;
};

const generateRandomNumber = (max) => {
  if (typeof max == "string") {
    max = max * 1;
  }

  const range = Math.random() * max;
  const roundedRange = Math.round(range);
  return roundedRange;
};
let password = [];

checkUniqueSpace = (array, caseName) => {
  const generateArrayNumber = generateRandomNumber(
    getLengthValue.innerHTML - 1
  );

  if (password[generateArrayNumber]) {
    checkUniqueSpace(array, caseName);
  } else if (caseName === "uppercase") {
    password[generateArrayNumber] =
      array[generateRandomNumber(array.length - 1)].toUpperCase();
  } else {
    password[generateArrayNumber] =
      array[generateRandomNumber(array.length - 1)];
  }
};
const stepOne = () => {
  filterTrueKeys().forEach((member) => {
    switch (member) {
      case "uppercase":
        checkUniqueSpace(allLetters, "uppercase");
        break;
      case "lowercase":
        checkUniqueSpace(allLetters, "lowercase");
        break;
      case "numbers":
        checkUniqueSpace(allNumbers, "numbers");
        break;
      case "symbols":
        checkUniqueSpace(allSymbols, "symbols");
        break;
    }
  });
};
const stepTwo = (password) => {
  const arrayHasValue = (arrayValue) => {
    if (arrayValue) {
      return true;
    } else {
      return false;
    }
  };

  const rollDice = () => {
    return generateRandomNumber(filterTrueKeys().length - 1);
  };
  const outputChosenKey = () => {
    return filterTrueKeys()[rollDice()];
  };
  const outputValueFromChosenKey = (key) => {
    switch (key) {
      case "uppercase":
        return allLetters[
          generateRandomNumber(allLetters.length - 1)
        ].toUpperCase();

      case "lowercase":
        return allLetters[generateRandomNumber(allLetters.length - 1)];

      case "numbers":
        return allNumbers[generateRandomNumber(allNumbers.length - 1)];

      case "symbols":
        return allSymbols[generateRandomNumber(allSymbols.length - 1)];
    }
  };
  for (let i = 0; i < password.length; i++) {
    if (!arrayHasValue(password[i])) {
      password[i] = outputValueFromChosenKey(outputChosenKey());
    } else {
      password[i] = password[i];
    }
  }

  passwordInput.innerHTML = addedText + password.join("");
  return "completed";
};

//Strength Meter

const strengths = [getTooWeak, getWeak, getMedium, getStrong];

const strengthHandler = () => {
  //1 box checked

  if (filterTrueKeys().length === 1) {
    strengths.forEach((strength) => (strength.style.display = "none"));

    getTooWeak.style.display = "flex";
  }

  //2 boxes checked

  if (filterTrueKeys().length === 2) {
    if (password.length < 8) {
      strengths.forEach((strength) => (strength.style.display = "none"));

      getTooWeak.style.display = "flex";
    } else if (8 <= password.length && password.length <= 10) {
      strengths.forEach((strength) => (strength.style.display = "none"));

      getWeak.style.display = "flex";
    } else {
      strengths.forEach((strength) => (strength.style.display = "none"));

      getMedium.style.display = "flex";
    }
  }

  //3 boxes checked
  if (filterTrueKeys().length === 3) {
    if (password.length === 4) {
      strengths.forEach((strength) => (strength.style.display = "none"));

      getTooWeak.style.display = "flex";
    } else if (5 <= password.length && password.length <= 8) {
      strengths.forEach((strength) => (strength.style.display = "none"));

      getWeak.style.display = "flex";
    } else if (8 <= password.length && password.length <= 14) {
      strengths.forEach((strength) => (strength.style.display = "none"));

      getMedium.style.display = "flex";
    } else {
      strengths.forEach((strength) => (strength.style.display = "none"));

      getStrong.style.display = "flex";
    }
  }

  //4 boxes checked

  if (filterTrueKeys().length === 4) {
    if (password.length === 4) {
      strengths.forEach((strength) => (strength.style.display = "none"));

      getTooWeak.style.display = "flex";
    } else if (5 <= password.length && password.length <= 6) {
      strengths.forEach((strength) => (strength.style.display = "none"));

      getWeak.style.display = "flex";
    } else if (6 <= password.length && password.length <= 10) {
      strengths.forEach((strength) => (strength.style.display = "none"));

      getMedium.style.display = "flex";
    } else {
      strengths.forEach((strength) => (strength.style.display = "none"));

      getStrong.style.display = "flex";
    }
  }
};
//generate button is pressed

generateButton.addEventListener("click", () => {
  if (checkBoxTicks()) {
    password = [];
    password.length = getLengthValue.innerHTML;

    stepOne();

    stepTwo(password);
  }
  strengthHandler();
});
