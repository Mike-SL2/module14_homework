const requestString = "https://jsonplaceholder.typicode.com/photos?_limit=";

const pictureBlock = document.querySelector(".pictureBlock");
const buttonRequest = document.querySelector(".buttonRequest");
const formField = document.querySelector(".formField");
const warning = document.querySelector(".warning");
const allowedKeyCodes = new Set([
  8, 37, 38, 39, 40, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 16, 17, 18, 46, 35,
]);
const onlyDigits = "Вводите только цифры";
function showWarning(message) {
  let escToContinue = ', для продолжения нажмите "Esc".';
  if (message) {
    warning.style.display = "inline-block";
    searchExpression = /[\.!]/;
    if (message.match(searchExpression)) {
      escToContinue = "";
    }
    warning.innerHTML = message + escToContinue;
  } else {
    warning.style.display = "none";
  }
}
warning.addEventListener("click", function () {
  showWarning();
});

function makeRequest(requestData) {
  let obj = {};
  let parsedResponse = "";
  let pictures = "";
  let x = formField.value;

  if (x === "") {
    showWarning(onlyDigits);
  } else {
    x++;
    x--;
    if (x < 1 || x > 10) {
      showWarning("Число вне диапазона от 1 до 10");
    } else {
      let xhR = new XMLHttpRequest();
      xhR.open("get", `${requestData}${x}`);
      xhR.onload = function () {
        if (xhR.status === 200) {
          parsedResponse = JSON.parse(xhR.response);
          for (let i = 0; i < x; i++) {
            obj = parsedResponse[i];
            pictures =
              pictures + `<img src="${obj["url"]}" class="receivedPicture">`;
          }
          pictureBlock.innerHTML = pictures;
          showWarning();
        }
      };
      xhR.onerror = function () {
        showWarning(`Ошибка! Cтатус запроса: ${xhR.status}`);
      };
      showWarning("Выполняется запрос...");
      xhR.send();
    }
  }
}
buttonRequest.addEventListener("click", function () {
  makeRequest(requestString);
});

document.addEventListener("keydown", function (event) {
  if (event.keyCode===27) {
	showWarning();
  }
});

formField.addEventListener("keydown", function (event) {
  if (event.keyCode===13) {
makeRequest(requestString);
}
  else{
      if (!allowedKeyCodes.has(event.keyCode)) {
        showWarning(onlyDigits);
      }
  }
});
