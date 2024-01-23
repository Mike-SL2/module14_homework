const valueInput = document.querySelectorAll("input");
const buttonRequest = document.querySelector(".buttonRequest");

const warning = document.querySelector(".warning");
function showWarning(x) {
  if (x) {
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

const pictureBlock = document.querySelector(".pictureBlock");

function makeFetchRequest(width, height) {
  pictureBlock.innerHTML = "Выполняется запрос...";
  let address = `https://dummyimage.com/${width}x${height}/`;
  return fetch(address)
    .then((response) => {
      return response;
    })
    .catch(() => {
      return "Ошибка при выполнении запроса";
    });
}
buttonRequest.addEventListener("click", async function () {
 showWarning();
 pictureBlock.innerHTML = "";
  let requestResult;
  let requestResultURL;
  let flag = true;
  showWarning();
  valueInput.forEach((x) => {
    let value = x.value * 1;
    if (value < 100 || value > 300 || isNaN(value)) {
      flag = false;
    }
  });
  if (flag) {
    requestResult = await makeFetchRequest(
      valueInput[0].value,
      valueInput[1].value,
    );
    requestResultURL = requestResult["url"];
    if (requestResultURL) {
      pictureBlock.innerHTML = `<img src="${requestResultURL}">`;
    } else {
      pictureBlock.innerHTML = requestResult;
    }
  } else {
    showWarning(1);
  }
});
