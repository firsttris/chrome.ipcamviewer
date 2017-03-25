let cameras = require('./cameras.json');
const fs = require('fs');

let newArray = {};
for(let camera of cameras) {
  let cameraCopy = Object.assign({}, camera);
  let newObject = {};
  newObject[cameraCopy.type] = cameraCopy.url;

  if(newArray[camera.name]) {
    newArray[camera.name] = Object.assign(newArray[camera.name], newObject);
  } else {
    newArray[camera.name] = Object.assign({}, newObject);
  }
}
console.log("Array: " + JSON.stringify(newArray, null, 4));
//fs.writeFile('new.json', JSON.stringify(newArray, null, 4), (err) => {
//  if (err) throw err;
//  console.log('It\'s saved!');
//});