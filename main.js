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
  getStrong = document.getElementById("strong");

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

//event listeners
getRangeInput.addEventListener("change", (e) => {
  getLengthValue.innerHTML = e.target.value;
  password.length = getLengthValue.innerHTML;
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
  console.log("fired");
  if (checkTrue.length) {
    console.log("true");
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

console.log(password.length);

checkUniqueSpace = (array, caseName) => {
  const generateArrayNumber = generateRandomNumber(
    getLengthValue.innerHTML - 1
  );
  console.log(generateArrayNumber);

  if (password[generateArrayNumber]) {
    checkUniqueSpace(array, caseName);
  } else if (caseName === "uppercase") {
    password[generateArrayNumber] =
      array[generateRandomNumber(array.length - 1)].toUpperCase();
  } else {
    console.log(array);
    password[generateArrayNumber] =
      array[generateRandomNumber(array.length - 1)];
  }
};
const stepOne = () => {
  filterTrueKeys().forEach((member) => {
    switch (member) {
      case "uppercase":
        checkUniqueSpace(allLetters, "uppercase");
        console.log("uppercase");
        break;
      case "lowercase":
        checkUniqueSpace(allLetters, "lowercase");
        console.log("lowercase");
        break;
      case "numbers":
        checkUniqueSpace(allNumbers, "numbers");
        console.log("num");
        break;
      case "symbols":
        checkUniqueSpace(allSymbols, "symbols");
        console.log("symbo");
        break;
    }
  });
};
const stepTwo = (password) => {
  console.log(password);
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
  console.log(password);
  passwordInput.innerHTML = password.join("");
  return "completed";
};

//Strength Meter

const strengths = [getTooWeak, getWeak, getMedium, getStrong];

//generate button is pressed

generateButton.addEventListener("click", () => {
  console.log("password", password.length);
  if (checkBoxTicks()) {
    password = [];
    password.length = getLengthValue.innerHTML;

    stepOne();

    stepTwo(password);
  }
});
