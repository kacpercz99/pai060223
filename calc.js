let historyList;
function gen() {
  const main = document.getElementById("main");
  const output = document.createElement("div");
  const buttons = [
    "AC",
    "←",
    "÷",
    7,
    8,
    9,
    "*",
    4,
    5,
    6,
    "+",
    1,
    2,
    3,
    "-",
    ".",
    0,
    "=",
  ];
  const center = document.createElement("div");
  let previous = 0;
  center.id = "centerAl";
  output.innerText = "0";
  output.id = "output";
  center.appendChild(output);
  main.appendChild(center);
  createButtons(main, buttons);
  createListeners(output, previous);
}

function createButtons(main, buttons) {
  historyList = document.createElement("ul");
  historyList.id = "historyList";
  historyList.innerText = "History";
  main.appendChild(historyList);
  let history = document.createElement("div");
  history.id = "history";
  history.onmouseover = function () {
    historyList.style.visibility = "visible";
    history.style.opacity = 0;
  };

  history.onmouseout = function () {
    historyList.style.visibility = "hidden";
    history.style.opacity = 0.2;
  };

  main.appendChild(history);
  for (let i = 0; i < buttons.length; i++) {
    let button = document.createElement("button");
    button.innerText = buttons[i];
    button.id = buttons[i];
    main.appendChild(button);
  }
}
function createListeners(output, previous) {
  let selectedOperation = "none";
  for (let i = 0; i < 10; i++) {
    let button = document.getElementById(i);
    button.onclick = function () {
      if (selectedOperation == "ZERO") {
        output.innerText = 0;
        previous = 0;
        selectedOperation = "none";
      }
      if (output.innerText.length >= 12) {
        return;
      }
      if (output.innerText == "0") {
        output.innerText = button.innerText;
      } else {
        output.innerText += button.innerText;
      }
    };
  }

  document.getElementById("←").onclick = function () {
    if (selectedOperation == "ZERO") {
      output.innerText = 0;
      selectedOperation = "none";
    }
    if (output.innerText.length > 1) {
      output.innerText = output.innerText.slice(0, -1);
    } else if (output.innerText.length == 1) {
      output.innerText = 0;
    }
  };

  document.getElementById("AC").onclick = function () {
    if (selectedOperation == "ZERO") {
      output.innerText = 0;
      selectedOperation = "none";
    }
    output.innerText = 0;
    previous = 0;
    selectedOperation = "none";
    while (historyList.firstChild) {
      historyList.removeChild(historyList.lastChild);
    }
  };

  document.getElementById(".").onclick = function () {
    if (selectedOperation == "ZERO") {
      output.innerText = 0;
      selectedOperation = "none";
    }
    if (output.innerText.indexOf(".") == -1) {
      output.innerText += ".";
    }
  };

  document.getElementById("*").onclick = function () {
    if (selectedOperation == "ZERO") {
      output.innerText = 0;
      selectedOperation = "none";
    }
    if (output.innerText != 0) {
      previous = output.innerText;
      output.innerText = 0;
      selectedOperation = "*";
    }
  };

  document.getElementById("+").onclick = function () {
    if (selectedOperation == "ZERO") {
      output.innerText = 0;
      selectedOperation = "none";
    }
    previous = output.innerText;
    output.innerText = 0;
    selectedOperation = "+";
  };

  document.getElementById("-").onclick = function () {
    if (selectedOperation == "ZERO") {
      output.innerText = 0;
      selectedOperation = "none";
    }
    previous = output.innerText;
    output.innerText = 0;
    selectedOperation = "-";
  };

  document.getElementById("÷").onclick = function () {
    if (selectedOperation == "ZERO") {
      output.innerText = 0;
      selectedOperation = "none";
    }
    previous = output.innerText;
    output.innerText = 0;
    selectedOperation = "÷";
  };

  document.getElementById("=").onclick = function () {
    let historyValue =
      previous + " " + selectedOperation + " " + output.innerText + " = ";
    let result;
    switch (selectedOperation) {
      case "*":
        result = output.innerText *= previous;
        break;
      case "+":
        result = output.innerText = +output.innerText + +previous;
        break;
      case "-":
        if (output.innerText == 0) {
          result = output.innerText = -previous;
        } else {
          result = output.innerText = previous - output.innerText;
        }
        break;
      case "÷":
        if (output.innerText == 0) {
          result = output.innerText = "Division by 0 :(";
          previous = 0;
          selectedOperation = "ZERO";
        } else {
          result = output.innerText =
            parseFloat(previous) / parseFloat(output.innerText);
        }
        break;
    }
    if (output.innerText.length >= 12 && selectedOperation != "ZERO") {
      result = result.toFixed(8);
      output.innerText = parseFloat(output.innerText).toFixed(8);
    }
    historyValue += result;
    let element = historyList.appendChild(document.createElement("li"));
    element.innerText = historyValue;

    if (historyList.childElementCount >= 15)
      historyList.removeChild(historyList.firstChild);

    historyList.appendChild(element);
  };
}
