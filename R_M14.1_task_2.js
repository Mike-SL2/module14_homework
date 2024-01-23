const JSON_dataBlock = `{"list": [{"name": "Petr","age": "20","prof": "mechanic"},
  			        {"name": "Vova","age": "60","prof": "pilot"   }]}`;
console.log("исходная строка -> ", JSON_dataBlock);

console.log("js object -> ", JSON.parse(JSON_dataBlock));
