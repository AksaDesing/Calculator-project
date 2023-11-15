const containerTitle = document.querySelector("h1");
const buttons = document.querySelectorAll("button");
const resetButton = document.getElementById("resetButton");

let initialValue = 0;
let operatorValue = "";
let isWaiting = false;

function addDesimal() {
  if (!containerTitle.textContent.includes(".")) {
    containerTitle.textContent = `${containerTitle.textContent}.`;
  }
}

function sendNumberValue(number) {
  //   console.log(number);
  //   containerTitle.textContent = number;

  if (isWaiting) {
    containerTitle.textContent = number;
    isWaiting = false;
  } else {
    const displayValue = containerTitle.textContent;
    containerTitle.textContent =
      displayValue === "0" ? number : displayValue + number;
  }
}
function useOperator(operator) {
  const currentValue = Number(containerTitle.textContent);

  if (operatorValue && isWaiting) {
    operatorValue = operator;
    return;
  }

  if (!initialValue) {
    initialValue = currentValue;
  } else {
    const calculation = calc[operatorValue](initialValue, currentValue);
    containerTitle.textContent = calculation;
    initialValue = calculation;
  }
  isWaiting = true;
  operatorValue = operator;
}

const calc = {
  "/": (firstNumber, secondNumber) => firstNumber / secondNumber,
  "*": (firstNumber, secondNumber) => firstNumber * secondNumber,
  "+": (firstNumber, secondNumber) => firstNumber + secondNumber,
  "-": (firstNumber, secondNumber) => firstNumber - secondNumber,
  "=": (firstNumber, secondNumber) => secondNumber,
};

buttons.forEach((button) => {
  if (button.classList.length == 0) {
    button.addEventListener("click", () => sendNumberValue(button.value));
  } else if (button.classList.contains("operator")) {
    button.addEventListener("click", () => useOperator(button.value));
  } else if (button.classList.contains("decimal")) {
    button.addEventListener("click", () => addDesimal());
  }
});

function resetAll() {
  containerTitle.textContent = "0";
  initialValue = 0;
  operatorValue = "";
  isWaiting = false;
}

resetButton.addEventListener("click", resetAll);
