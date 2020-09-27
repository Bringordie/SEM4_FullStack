// Exercise: JavaScript Exercises (Day-1)
// link: https://docs.google.com/document/d/1ad-D5zPpobOUAG5cdcFt1YU3yCAqilN2KOGzrjvWnq8/edit#

// The magic of callbacks:

// #1 - Implement user defined functions that take callbacks as an argument

// a) Implement a function: myFilter(array, callback)that takes an array
// as the first argument, and a callback as the second and returns a new (filtered)
// array according to the code provided in the callback (that is with the same behaviour as the original filter method).

var ages = [32, 33, 16, 40];

function checkAdult(age) {
  return age >= 18;
}

function myFilter(array, callback) {
  return array.filter(callback);
}

console.log("a) myFilter exercise: " + myFilter(ages, checkAdult));
//Test the method with the same array and callback as in the example with the original filter method.
console.log("a) without myFilter: " + ages.filter(checkAdult));

// b) Implement a function: myMap(array, callback) that, provided an array and a callback, provides the same functionality
// as calling the existing map method on an array.

var numbers = [4, 9, 16, 25];

function findSquareRoot(number) {
  return Math.sqrt(number);
}

function myMap(array, callback) {
  return array.map(callback);
}

console.log(" b) myMap exercise: " + myMap(numbers, findSquareRoot));
//Test the method with the same array and callback as in the example with the original map method.
console.log(" b) without myMap: " + numbers.map(findSquareRoot));

// #2 - Using the Prototype property to add new functionality to existing objects

// a) Create a new version of the two functions (without the array argument) which you should add to the Array prototype property so they can be called on any array as sketched below:

var ages = [32, 33, 16, 40];

Array.prototype.myFilter = function (callback) {
  let result = [];
  this.forEach((element) => {
    if (callback(element)) result.push(element);
  });
  return result;
};

Array.prototype.myMap = function (callback) {
  let result = [];
  this.forEach((element) => {
    result.push(callback(element));
  });
  return result;
};

function findSquareRoot(number) {
  return Math.sqrt(number);
}

function checkAdult(age) {
  return age >= 18;
}

console.log("Prototype my filter " + ages.myFilter(checkAdult));
console.log("Prototype my map " + ages.myMap(findSquareRoot));

// The reduce-method:

var all = ["Lars", "Peter", "Jan", "Bo"];

// a) Use join to create a single string from all, with names: comma-, space. and  # - separated.

console.log(all.join(","));
console.log(all.join(" "));
console.log(all.join("#"));

// b) Given this array: var numbers = [2, 3, 67, 33]; Create a reducer function that will return the sum (105) of all values in numbers

var numbers = [2, 3, 67, 33];
const reducer = (accumulator, currentValue) => accumulator + currentValue;

console.log("Array of numbers multiplied gave: " + numbers.reduce(reducer));

// c) Given this array. Create a reducer function that will return the average age of all members:

let members = [
  { name: "Peter", age: 18 },
  { name: "Jan", age: 35 },
  { name: "Janne", age: 25 },
  { name: "Martin", age: 22 },
];

var reducerMembers1 = (accumulator, currentValue, index, arr) => {
  var averageAge;
  if (index == 1) {
    averageAge = currentValue.age + accumulator.age;
  } else {
    averageAge = accumulator + currentValue.age;
  }

  if (index == arr.length - 1) {
    averageAge = averageAge / arr.length;
  }
  return averageAge;
};

console.log("Avearge age of all members: " + members.reduce(reducerMembers1));

// Hoisting

// Team up with another member in the class and implement at least two examples to illustrate that:
// - Function declarations are completely hoisted
// - var declarations are also hoisted, but not assignments made with them

function hoisting1() {
  console.log("Value of myCoolObject: " + myCoolObject);

  if (!myCoolObject) {
    var myCoolObject = { value: "Wau, I'm cool" };
    console.log(myCoolObject.value);
  }
}
hoisting1();

function hoisting2() {
  f1();
  //f2(); -> Will not work as hoisting loads the var first but not the function inside

  function f1() {
    console.log("I'm f1");
  }
  var f2 = function () {
    console.log("Yes, but I'm f2");
  };
}
hoisting2();

// #Explain to each other (as if it was the exam):
// - What hoisting is:
// Hoisting means that a value is "hoisted" up when a function is read you can see in line 128 the var is initialized "first" so that the console.log can read it's property
// Hoisting only works for variables so as you can see on line 136 "f2();" will give an error as the function is not read on the variable in this order.
// This is how hoisting1 is seen

function hoisting1() {
  var myCoolObject = { value: "Wau, I'm cool" };
  console.log("Value of myCoolObject: " + myCoolObject);

  if (!myCoolObject) {
    console.log(myCoolObject.value);
  }
}
hoisting1();

// - A design rule we could follow when using var, now we know about hoisting:
// Variables should always try to be on the top of the function.
// If it's not possible it should obviously be used as a var and should not have a function attached to it. Same with function calls that are called.

// #this in JavaScript
// - How this in JavaScript differ from this in Java
/*https://www.codementor.io/@dariogarciamoya/understanding--this--in-javascript-du1084lyn?icn=post-8i1jca6jp&ici=post-du1084lyn
    This is different is JS than java, because the this keyword refers to an object, that witch is executing the current bit of JavaScript code.
    In other words, every javascript function while executing, has a reference to its current execution context, called this.
    Execution context means here is how the function is called.
*/

// - Why we (because we did not explain about this) followed a pattern in our third semester controller and stored a reference to this (var self = this)

// - The purpose of the methods call(), apply() and bind()
// -- Bind - Binds itself to values so that it can be used inside a async function without arrow function
// -- Call - With call(), an object can use a method belonging to another object. The call() method takes arguments separately.
// -- Apply - The apply() method is very handy if you want to use an array instead of an argument list. The apply() method takes arguments as an array.

// Reusable Modules with Closures
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures

// 1) Implement and test the Closure Counter Example from today's lecture

// 2) Implement a reusable function using the closure feature, that should encapsulate information about a person (name, and age) and returns an object with the following methods:

// setAge

// setName

// getInfo (should return a string like Peter, 45)

// 3) Implement an ES6 class with a similar functionality as requested in part 2. Don't use getXX or  setXX but use ES6 properties.
