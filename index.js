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

/**
 * Prototype pattern
 * it's a pattern based on prototypical inheritance whereby objects created act as a
 * prototype for other object, that is prototypes
 * act as a blueprint for each object constructor created.
 */

// example 1
//===================================================================================

function Welcome(name) {
  this.name = name;
}

// welcome prototype
Welcome.prototype.sayHello = function () {
  console.log("Hi " + this.name + "!");
};

function RoomService(name, order) {
  // this.name will be set and made available on scope of this function
  Welcome.call(this, name);
  this.order = order;
}

// inherit 'sayHello()' from Welcome prototype
RoomService.prototype = Object.create(Welcome.prototype);

// by default prototype object has constructor property
// but as we created new object withouut this property we need to set it manually
// otherwise 'constructor' property of 'RoomService' will point to 'Welcome' constructor function
RoomService.prototype.constructor = RoomService;

// 'RoomService' methods that will be available to it's instances
RoomService.prototype.announceDelivery = function () {
  console.log("Your " + this.order + " has arrived!");
};

RoomService.prototype.deliverOrder = function () {
  console.log(this.sayHello() + " " + this.announceDelivery());
};

const delivery = new RoomService("Max", "Pizza");

delivery.sayHello();

delivery.deliverOrder();

delivery.announceDelivery();

// example 2
//===================================================================================

const personPrototype = {
  sayHi: function () {
    console.log(
      "Hello my name is " + this.name + " and my age is " + this.age + "."
    );
  },
  sayBye: function () {
    console.log("Bye Bye.");
  },
};

// Person class
function Person(name, age) {
  name = name || "John Doe";
  age = age || 30;

  // constructor function
  function constructorFunction(name, age) {
    this.name = name;
    this.age = age;
  }

  constructorFunction.prototype = personPrototype;

  // every time we call Person function new instance is created
  const instance = new constructorFunction(name, age);

  return instance;
}

const person1 = Person("Max", 33);
const person2 = Person("Kaleb", 30);

person1.sayHi();
person2.sayHi();
person2.sayBye();

/**
 * Revealing Prototype pattern
 * prototype is an object and we can prefix it with an
 * function to reveal only thing we want user to see
 */

function personPrototype1() {
  function sayHi() {
    console.log("Hi my name is " + this.firstName);
  }

  return {
    hello: sayHi,
  };
}

function Person(firstName) {
  firstName = firstName || "Boby";

  function ConstructorFunction(firstName) {
    this.firstName = firstName;
  }

  ConstructorFunction.prototype = personPrototype1();

  const instance = new ConstructorFunction(firstName);

  return instance;
}

const person3 = Person("Charlie Brown");
person3.hello();

//===================================================================================
//===================================================================================
//===================================================================================

/**
 * Singleton pattern
 * is used when we only need to have one instance of object
 */

// singleton with module pattern and IIFE
const MyPerson = (function () {
  // single instance of person
  let instance;

  // person function constructor
  function Person(name, age) {
    this.name = name;
    this.age = age;
  }

  Person.prototype.sayHi = function () {
    console.log(
      "Hi my name is " + this.name + " and I am " + this.age + " years old."
    );
  };

  //
  function createInstance(name, age) {
    let person = new Person(name, age);

    return person;
  }

  return {
    getInstance: function (name, age) {
      if (!instance) {
        instance = createInstance(name, age);
      }
      return instance;
    },
  };
})();

const person11 = MyPerson.getInstance("Dave", 31);
const person12 = MyPerson.getInstance("Max", 27);
person11.sayHi();
person12.sayHi();

//===================================================================================
//===================================================================================
//===================================================================================

/**
 * Factory pattern
 *
 */

// example 1
//===================================================================================

// behaviour factory
function makeSound(state) {
  const sound = state.sound || "Grunt";

  return {
    speak: function () {
      console.log(state.name + " says " + sound + ".");
    },
  };
}

function moving(state) {
  return {
    move: function () {
      console.log(state.name + " is walking.");
    },
    hop: function () {
      console.log(state.name + " is hopping.");
    },
  };
}

// object factory
const person = function (name, age) {
  const state = {
    name: name,
    age: age,
    sound: "Hello",
  };

  return Object.assign({}, makeSound(state), moving(state));
};

const rabbit = function (name) {
  const state = {
    name: name,
  };

  return Object.assign({}, moving(state));
};

const max = person("Max", 32);
max.speak();
max.move();

const joeTheRabbit = rabbit("Joe", 5);
joeTheRabbit.hop();

// example 2
// abstract factory pattern
//===================================================================================
function Car() {
  (this.name = "Car"), (this.wheels = 4);
}
function Truck() {
  (this.name = "Truck"), (this.wheels = 6);
}
function Bike() {
  (this.name = "Bike"), (this.wheels = 2);
}

const vehicleFactory = {
  createVehicle: function (type) {
    switch (type) {
      case "car":
        return new Car();
      case "truck":
        return new Truck();
      case "bike":
        return new Bike();

      default:
        return null;
    }
  },
};

const car = vehicleFactory.createVehicle("car");
const bike = vehicleFactory.createVehicle("bike");
const truck = vehicleFactory.createVehicle("truck");
console.log(car, bike, truck);

//===================================================================================
//===================================================================================
//===================================================================================
/**
 * Observer pattern
 * we have some 'News Site' that is our 'subject', and it
 * has some kind of observer list to which we attach our observers,
 * and observers would be users of that site, those users have some kind of notification function
 * that is called by 'New site' every time some new event happens, and with that it notifies our observer(user) about that event
 *
 * subject = new Subject()
 * user = new User()
 * user.notify = function(){...} => function that will be called by subject when event happens and it will notify user, send email...
 *
 * subject.user = user
 * subject user.notify()  // notifies user
 */

// object we are observing
const Subject = function () {
  const observers = [];

  function subscribeObserver(observer) {
    observers.push(observer);
  }
  function unsubscribeObserver(observer) {
    let index = observers.indexOf(observer);
    if (index > -1) {
      observers.splice(index, 1);
    }
  }
  function notifyObserver(observer) {
    let index = observers.indexOf(observer);
    if (index > -1) {
      observers[index].notify(index);
    }
  }
  function notifyAllObservers() {
    for (let i = 0; i < observers.length; i++) {
      observers[i].notify(i);
    }
  }

  return {
    subscribeObserver,
    unsubscribeObserver,
    notifyObserver,
    notifyAllObservers,
  };
};

const Observer = function () {
  return {
    notify: function (index) {
      console.log("Observer " + index + " has been notified.");
    },
  };
};

// subject observers are watching
const subject1 = new Subject();

// observers
const observer0 = new Observer();
const observer1 = new Observer();
const observer2 = new Observer();
const observer3 = new Observer();

subject1.subscribeObserver(observer0);
subject1.subscribeObserver(observer1);
subject1.subscribeObserver(observer2);
subject1.subscribeObserver(observer3);

subject1.notifyObserver(observer2);

subject1.notifyAllObservers();

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

/*
function recursion(number) {
  if (number < 1) return 0;
  else return number + recursion(number - 1);
}

const fact = recursion(25);
console.log(fact);
*/
