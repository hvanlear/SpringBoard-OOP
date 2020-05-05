class Vehicle {
  constructor(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
  }
  honk() {
    return "Beep";
  }
  toString() {
    return `The vehicle is a ${this.make} ${this.model} from ${this.year}`;
  }
}

let myFirstVehic = new Vehicle("Honda", "Monster Truck", 1999);

class Car extends Vehicle {
  constructor(make, model, year) {
    super(make, model, year);
  }
  numWheels() {
    return 4;
  }
}

let myFirstCar = new Car("Toyota", "Corolla", "2005");

class Motorcycle extends Vehicle {
  constructor(make, model, year) {
    super(make, model, year);
  }
  numWheels() {
    return 2;
  }
  revEngine() {
    return "Vroom";
  }
}

class Garage {
  constructor(size) {
    this.size = size;
    this.inventory = [];
  }
  add(vehicle) {
    if (!vehicle instanceof Vehicle) {
      return "only Vehicles are allowed";
    }
    if (this.inventory.length >= this.size) {
      return " Garage full";
    }
    this.inventory.push(vehicle);
    return "vehicle added";
  }
}

let garage = new Garage(2);
garage.add(new Car("Toyota", "Corolla", "2005"));
garage.add(new Vehicle("Honda", "Monster Truck", 1999));
