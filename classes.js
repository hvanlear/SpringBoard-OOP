//****************************************** */
//*************** OBJ REVIEW **************** */
//****************************************** */

const color = "teal";

const obj = {};

obj.color = "#3723FF";
obj[color] = "#3723FF";
// object Keys
let objKeys = Object.keys(obj);
//object values
let objValues = Object.values(obj);
// obj Entries will give us an array where each element is a pair
let objEntries = Object.entries(obj);
// 0: (2) ["color", "#3723FF"]
// 1: (2) ["teal", "#3723FF"]

// we can loop over the entires array which will give us two more
//arrays each with the key, value
for (let ent of objEntries) {
  console.log(ent);
}
//  ["color", "#3723FF"]
//  ["teal", "#3723FF"]
// we can destructure further to capture the individual key and value

for (let [k, v] of objEntries) {
  console.log(k, v);
}
// color #3723FF
// teal #3723FF

//****************************************** */
//*************** OBJ METHODS **************** */
//****************************************** */

const add = (x, y) => x + y;
const mult = (x, y) => x * y;
const square = (x) => x * x;

// const myMath = {};

// myMath.add = add;
// myMath.mult = mult;

const myMath = { add, mult, square };

const myMath2 = {
  add(x, y) {
    return x + y;
  },
  square(x) {
    return x * x;
  },
};

//****************************************** */
//*************** THIS AND METHODS **************** */
//****************************************** */

function getHypotenuse(a, b) {
  return Math.sqrt(a ** 2 + b ** 2);
}

function getArea(a, b) {
  return (a * b) / 2;
}

// problem is this isnt reusable

const rightTriangle = {
  a: 9,
  b: 12,
  printThis: function () {
    console.log(this);
  },
  getArea() {
    return (this.a * this.b) / 2;
  },
  getHypotenuse() {
    this.printThis();
    return Math.sqrt(this.a ** 2 + this.b ** 2);
  },
};

//****************************************** */
//*********** CONSTRUCTOR FUNCS AND NEW  */
//****************************************** */

// constructor funcs are capatalized
function Triangle(a, b) {
  this.a = a;
  this.b = b;
  this.getArea = function () {
    return (this.a * this.b) / 2;
  };
  this.getHypotenuse = function () {
    return Math.sqrt(this.a ** 2 + this.b ** 2);
  };
}

// as it stands everytime we are creating a new Triangle
// we are creating  new funcitons to add to that triangle
// even though they do the exact same thing. We can fix
// that with prototypes

// to use this constructor function we use the new keyword

const t1 = new Triangle(3, 4);
const t2 = new Triangle(9, 12);
t1.getHypotenuse();
//5
t2.getHypotenuse();
//15

//****************************************** */
//*********** INTRO TO PROTOTYPES  ***********/
//****************************************** */

// porotypes are inherent methods contained in the prototype object
Array.prototype;
Set.prototype;

// [].__proto__ === Array.prototype
// true

function Triangle2(a, b) {
  this.a = a;
  this.b = b;
}

Triangle2.prototype.getArea = function () {
  return (this.a * this.b) / 2;
};

Triangle2.prototype.getHypotenuse = function () {
  return Math.sqrt(this.a ** 2 + this.b ** 2);
};

const tri3 = new Triangle2(3, 4);
tri3.getArea(3, 4);
//6

/// using a class we can group our methods together with our values
// we get the same outcome

//****************************************** */
//*********** CLASSES ***********************/
//****************************************** */

// a blueprint for functionality. these methods are added
// to the triangle prototype instead of creating new functions
// for each instance

class Triangle3 {
  greet() {
    console.log("hello from Triangle 3");
  }
  display() {
    console.log(`Triangle with the sides of ${this.a} and ${this.b}`);
  }
}

const firstTri = new Triangle3(3, 5, 6);
firstTri.a = 3;
firstTri.b = 4;

// we can instead pass those a and b values in when we instansiate
// a new triangle

// we accomplish this by adding constructors to our classes

//****************************************** */
//*********** ADDING CONSTRUCTORS **************/
//****************************************** */

class Triangle5 {
  constructor(a, b, c) {
    //data validation
    // if a is NOT a valid number or less than or equal 0
    for (let side of [a, b, c]) {
      if (!Number.isFinite(side) || side <= 0) {
        throw new Error("SIDES MUST BE POSITVE NUMBERS");
      }
    }

    //assigning properties
    this.a = a;
    this.b = b;
    this.c = c;
  }
  greet() {
    console.log("hello from Triangle 3");
  }
  display() {
    console.log(
      `Triangle with the sides of ${this.a} and ${this.b} and${this.c}`
    );
  }
}

const secondTri = new Triangle5(5, 6, 7);
// secondTri.display()
// Triangle with the sides of 5 and 6

//so what can we do with a constroctor
// validate data
// assign properties, like we see above

//****************************************** */
//*********** ADDING METHODS**************/
//****************************************** */

class Triangle6 {
  constructor(a, b, c) {
    //data validation
    // if a is NOT a valid number or less than or equal 0
    for (let side of [a, b, c]) {
      if (!Number.isFinite(side) || side <= 0) {
        throw new Error("SIDES MUST BE POSITVE NUMBERS");
      }
    }
    //assigning properties
    this.a = a;
    this.b = b;
    this.c = c;
  }
  greet() {
    console.log("hello from Triangle 3");
  }
  display() {
    console.log(
      `Triangle with the sides of ${this.a} and ${this.b} and${this.c}`
    );
  }
  getArea() {
    // -- DESTRUCUTING so we dont need to keep using this.a this.b this.c
    const { a, b, c } = this;
    const s = (a + b + c) / 2;
    return Math.sqrt(s * (s - a) * (s - b) * (s - c));
  }
  //calling a method with another function
  isBig() {
    return this.getArea() > 50;
  }
}

const thirdTri = new Triangle6(3, 4, 5);
const fourthTri = new Triangle6(7, 10, 11);

//****************************************** */
//*********** EXTENDS**************/
//****************************************** */

/// we can get rid of all those duplicated methods by using the keyword
// extends, so every RightTriangle1 should have access to all the methods of Triangle6

class RightTriangle1 extends Triangle6 {
  constructor(a, b, c) {
    //data validation
    // if a is NOT a valid number or less than or equal 0
    for (let side of [a, b, c]) {
      if (!Number.isFinite(side) || side <= 0) {
        throw new Error("SIDES MUST BE POSITVE NUMBERS");
      }
    }
    if (a * a + b * b !== c * c) {
      throw newError("invalid C Side");
    }
    //assigning properties
    this.a = a;
    this.b = b;
    this.c = c;
  }
  //   greet() {
  //     console.log("hello from Triangle 3");
  //   }
  //   display() {
  //     console.log(
  //       `Triangle with the sides of ${this.a} and ${this.b} and${this.c}`
  //     );
  //   }
  //   getArea() {
  //     // -- DESTRUCUTING so we dont need to keep using this.a this.b this.c
  //     const { a, b, c } = this;
  //     const s = (a + b + c) / 2;
  //     return Math.sqrt(s * (s - a) * (s - b) * (s - c));
  //   }
  //   //calling a method with another function
  //   isBig() {
  //     return this.getArea() > 50;
  //   }
}

// we can further narrow down the code by using the super() method on the constroctor method

class RightTriangle2 extends Triangle6 {
  constructor(a, b, c) {
    if (a * a + b * b !== c * c) {
      throw new Error("invalid C Side");
    }
    super(a, b, c);
    //assigning properties
    //   this.a = a;
    //   this.b = b;
    //   this.c = c;
  }
  isRightTri() {
    return true;
  }
  display() {
    return "right " + super.display();
  }
}

const superTri = new RightTriangle2(3, 4, 5);
