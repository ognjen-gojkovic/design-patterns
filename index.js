/**
 * Constructor pattern
 *
 * below are some posible ways of defineing an objects and it's properties
 * but most popular way is using constructor function and putting all object methods into function prototype
 * otherwise with each intance of the object all methods would be redifined
 */

// common ways of creating an object
const myobject1 = {};
const myobject2 = Object.create(Object.prototype);
const myobject3 = new Object();

// adding properties to na object
// dot notation
myobject1.key1 = "Hello";
// square brackets notation
myobject1["key2"] = "World";
// since ES5, Object.defineProperty() method for single Property
Object.defineProperty(myobject1, "name", {
  value: "Ognjen",
  writable: true,
  enumerable: true,
  configurable: true,
});

// since ES5, Object.defineProperty() method for multiple Properties
Object.defineProperties(myobject1, {
  age: {
    value: 33,
    writable: true,
  },
  job: {
    value: "Web Developer",
    writable: false,
  },
});

//===================================================================================

// constructor function
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
}

Person.prototype.sayHi = function () {
  console.log(
    `My name is ${this.name}, I am ${this.age} years old\nand my job is ${this.job}.\nI'm lovin it.`
  );
};

const person1 = new Person("Ognjen", 33, "Web Developer");

person1.sayHi();

/**
 * Modul pattern
 */
