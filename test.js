function Vehicle(type) {
  this.type = type || "default";
  this.model = "default model";
}

// normal instance of the class
const car = new Vehicle("car");
console.log(car);

const truck = new Vehicle("truck");
/**
 * we define methods on this instance that are only applicable only to this instance
 */
truck.setModel = function (model) {
  this.model = model;
};

truck.setColor = function (color) {
  this.color = color;
};
truck.setModel("MAN");
truck.setColor("blue");

console.log(truck);
