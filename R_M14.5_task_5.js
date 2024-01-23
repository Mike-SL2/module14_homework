const baseURL = "https://jsonplaceholder.typicode.com/photos";
let outputObject;
const warning = document.querySelector(".warning");
const inputPageNumber = document.getElementById("inputPageNumber");
const requestButton = document.getElementById("requestButton");
const inputLimit = document.getElementById("inputLimit");
const pictureBlock = document.querySelector(".pictureBlock");
const warningPhrase_1 = "Номер страницы";
const warningPhrase_2 = "Лимит";
const warningPhrase_3 = " и лимит";
const warningPhrase_4 = " вне диапазона от 1 до 10";

function showWarning(x) {
  if (x) {
    warning.innerHTML = x;
    warning.style.display = "inline-block";
  } else {
    warning.style.display = "none";
  }
}
warning.addEventListener("click", function () {
  showWarning();
});
document.addEventListener("keydown", function (event) {
  if (event.keyCode === 27) {
    showWarning();
  }
});

const makeRequest = function (page, limit) {
  let requestURL = `${baseURL}?_page=${page}&_limit=${limit}`;
  showWarning(`Запрашиваем ${requestURL}...`);
  return fetch(requestURL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch(() => {
      showWarning("Ошибка при выполнении запроса");
      return false;
    });
};
function showPics(numberOfPictures, objectX) {
  let pictures = "";
  let obj;
  for (let i = 0; i < numberOfPictures; i++) {
    obj = objectX[i];
    pictures =
      pictures +
      `<img src="${obj["url"]}" class="receivedPicture" alt="${obj["title"]}" title="${obj["title"]}">`;
  }
  pictureBlock.innerHTML = pictures;
  showWarning();
}

requestButton.addEventListener("click", async function () {
  let warningMessage = "";
  showWarning();
  localStorage.clear();
  let inputPageNumberValue = inputPageNumber.value;
  let inputLimitValue = inputLimit.value;
  let errorNumber = 0;
  if (inputPageNumberValue < 1 || inputPageNumberValue > 10) {
    errorNumber++;
		   //Номер страницы вне диапазона от 1 до 10
    warningMessage = warningPhrase_1 + warningPhrase_4;
  } 
  if (inputLimitValue < 1 || inputLimitValue > 10) {
    errorNumber++;
		   //Лимит вне диапазона от 1 до 10
    warningMessage = warningPhrase_2 + warningPhrase_4;
  } 
  if (errorNumber > 1 || isNaN(inputPageNumberValue) || isNaN(inputLimitValue)) {
		   //Номер страницы и лимит вне диапазона от 1 до 10
    warningMessage = warningPhrase_1 + warningPhrase_3 + warningPhrase_4;
  } 

  if (warningMessage) {
    showWarning(warningMessage);
  } else {
    const requestResult = await makeRequest(inputPageNumberValue, inputLimitValue);
    if (requestResult) {
      localStorage.setItem("outputObject", JSON.stringify(requestResult));
      localStorage.setItem("pictureNumber", inputLimitValue);
      showPics(inputLimitValue, requestResult);
    }
  }
});
outputObject = JSON.parse(localStorage.getItem("outputObject"));
if (outputObject) {
  showPics(localStorage.getItem("pictureNumber"), outputObject);
}
