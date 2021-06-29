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

// example 1
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

//===================================================================================
//===================================================================================
//===================================================================================

/**
 * Modul pattern
 * because javascript doesn't support native classes and access modifiers,
 * programmers came up with idea with module pattern
 * with javascript concept of closure function and variables we won't show publically
 * we keep em private and give those of them we want restricted public access
 * also in process of creating an module we use one more concept called IIFE
 * module in general terms is separated self contained piece of code that helps
 * us to keep our code structure clean and organized
 */

// example 1
//===================================================================================
const counter = (function () {
  // private variable / member
  let counter = 0;

  // public functions / members
  return {
    increment: () => {
      return ++counter;
    },

    decrement: () => {
      if (counter < 1) {
        return;
      } else return --counter;
    },

    resetCounter: () => {
      counter = 0;
    },

    getCounter: () => {
      console.log("counter: ", counter);
    },
  };
})();

counter.getCounter();
counter.increment();
counter.getCounter();
counter.increment();
counter.getCounter();
counter.decrement();
counter.getCounter();
counter.resetCounter();
counter.getCounter();

//===================================================================================
//===================================================================================
//===================================================================================

/**
 * Revealing module pattern
 * this pattern is improvment of above example by simply moving
 * all logic of the module in private scope,
 * and revealing only parts of module we want user to have access to
 * we can alse rename private members when mapping private members
 * to thein coresponding public members
 */

// example 1
//===================================================================================

// without IIFE
function containerOfThings() {
  // private members
  const container = [];

  function getAllItems() {
    return console.log("container: ", container);
  }

  function addItem(item) {
    container.push(item);
  }

  function removeItem(item) {
    let index = container.indexOf(item);

    if (index < 1) throw new Error("Item is not found in container");

    container.splice(index, 1);
  }

  // public members
  return {
    get: getAllItems,
    add: addItem,
    delete: removeItem,
  };
}

const animalContainer = containerOfThings();

animalContainer.add("Dog");
animalContainer.add("Cat");
animalContainer.add("Horse");
animalContainer.add("Fish");
animalContainer.get();

//===================================================================================
//===================================================================================
//===================================================================================

//===================================================================================
//===================================================================================
//===================================================================================
//===================================================================================
//===================================================================================
//===================================================================================
//===================================================================================
//===================================================================================
//===================================================================================
//===================================================================================
//===================================================================================
//===================================================================================
