	//начало блока исходных данных
const XMLMessage = `<list><student><name lang="en"><first>Ivan</first><second>Ivanov</second></name>
    			   <age>35</age><prof>teacher</prof></student>
  		  <student><name lang="ru"><first>Петр</first><second>Петров</second></name>
    			   <age>58</age><prof>driver</prof> </student>
</list>`;//конец блока исходных данных

		//Функция преобразования из XML в объект с массивом объектов
makeObjectFromXMLMessage = (inputXMLMessage) => {
  	//получение экземпляра из класса DOMParser (в константу XML_Parser)
  	//и объектной модели (константа XML_DOM) из входной строки с помощью метода parseFromString
  let expressionToFindTheKey = /<.+?>/;
  let auxKeyName = inputXMLMessage.match(expressionToFindTheKey)[0];
  let keyName = auxKeyName.slice(1, auxKeyName.length - 1);
  const XML_Parser = new DOMParser();
  const XML_DOM = XML_Parser.parseFromString(inputXMLMessage, "text/xml");
  	//формирование массивов с селекцией по тэгам из объектной модели XML_DOM
  const studentFirstNamesArray = XML_DOM.querySelectorAll("first");
  const studentAgesArray = XML_DOM.querySelectorAll("age");
  const studentSecondNamesArray = XML_DOM.querySelectorAll("second");
  const studentOccupationsArray = XML_DOM.querySelectorAll("prof");
  const studentNamesArray = XML_DOM.querySelectorAll("name");
	//определение длины массивов при условии валидности
  	//входных данных (определяется длина только одного
  	//массива studentNamesArray, длины остальных массивов
  	//полученных из XML_DOM считаем равными этой)
  let inputXMLMessageLength = studentNamesArray.length; 
	
  let studentsList = [];
  	//заполнение массива studentsList
  for (let i = 0; i < inputXMLMessageLength; i++) {
    let studentName =
      studentFirstNamesArray[i].textContent +
      " " +
      studentSecondNamesArray[i].textContent;
    	//формирование очередного элемента массива studentsList - объекта ListItem
    let ListItem = {
      name: studentName,
      age: studentAgesArray[i].textContent,
      prof: studentOccupationsArray[i].textContent,
      lang: studentNamesArray[i].getAttribute("lang"),
    };
    	//внесение объекта ListItem в массив studentsList
    studentsList.push(ListItem);
  } //конец цикла for i
  	//возврат результата работы функции - объекта с массивом объектов
  let outputObject = {};
  outputObject[keyName] = studentsList;
  return outputObject;
}; //конец функций makeObjectFromXMLMessage

//Отображение исходных данных
	console.log(XMLMessage);
//Вызов функции с данными из XMLMessage и отображение результата преобразования из XML в объект с массивом объектов
	console.log(makeObjectFromXMLMessage(XMLMessage));
