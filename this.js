//******************************* */
//************THIS************ */
//******************************* */

const cat = {
  name: "blue",
  breed: "scottish fold",
  dance(dance) {
    console.log(this);
    console.log(`I am ${this.breed} and i like to ${dance}`); //changes from this.name
  },
};
/// this behaves differently. this is set to the window object
const bluesDance = cat.dance; //I am  and i like to salsa
// there is an emppty space there because:
window.name = "";

//if we were to change it to this.breed:
// /I am undefined and i like to undefined

//******************************* */
//************THIS & Window OBJ**** */
//******************************* */

// in a sense javascript does not have funcitons. Everything is a method,
//called on something

//here, when you call an function on nothing you are actually calling
// it on the Global Objects
function whatIsThis() {
  console.log("this = ", this);
}

// a good rule of thumb is that this will be set to whatever you have
// to the left of the dot

const myObj = {
  func: whatIsThis,
};

//here the func() will be called on myObj - to the left of the dot
// so this is referring to the myObj object
myObj.func();
// here when we just call whatIsThis alone, it is the same as calling:
// this is now referring to the window object
window.whatIsThis();

//******************************* */
//*********STRICT MODE ********** */
//******************************* */

///classes uses strict mode. making the value of this behave differently
// it wont be set to the window

//******************************* */
//*********CALL **************** */
//******************************* */

//help change the value of this

const cat2 = {
  name: "blue",
  breed: "scottish fold",
  dance(dance) {
    console.log(this);
    console.log(`I am ${this.breed} and i like to ${dance}`); //changes from this.name
  },
};
// this is se to the window
let redDance = cat2.dance;
/// but if we use call, we pass in two different argurments
//1. for what the value of this should be
redDance.call(cat2, "jitterbug");

const dog = {
  breed: "black lab",
  name: "elton",
};

/// we can use call to reassign to another obj
redDance.call(dog, "dog walk");

//******************************* */
//*********BIND**************** */
//******************************* */

// you can perma bind a function to a context
// it creates a copy of the funciton with this rebound

const cat3 = {
  name: "blue",
  breed: "scottish fold",
  dance(dance) {
    console.log(this);
    console.log(`I am ${this.breed} and i like to ${dance}`); //changes from this.name
  },
};

const bDance = cat3.dance;
//this will not exectue the funciton unlike call
// this value of this is now set to cat3 object
const boundDance = bDance.bind(cat3);

const rocket = {
  name: "rocket",
  breed: "Himalayean",
};

const rocketDance = cat3.dance.bind(rocket);

//******************************* */
//*********BINDING ARGUMENTS***** */
//******************************* */

// we can also bind arguments to funcitons that will bake them into the funciton

const cat4 = {
  name: "blue",
  breed: "scottish fold",
  dance(dance, freq) {
    console.log(this);
    console.log(`I am ${this.breed} and i like to ${dance}, ${freq}`); //changes from this.name
  },
};
// we can permentaly bind arguments like below, we have bound Dance
// to disco
const catDisco = cat4.dance.bind(cat4, "disco", "alot");

//we can also bind arugments to functions. that will bake them into the function
function applySalesTax(taxRate, price) {
  return price + price * taxRate;
}

// 'null' for 'this' means it doesnt matter what 'this' is
// after the null then the arguments are placed in order of the
// bound function (applySalesTax)
// so we are leaving out the price arugment which can be placed later
const applyNCTax = applySalesTax.bind(null, 0.0725);

applyNCTax(19.99); //21.439275

const bobsMembership = {
  name: "bob",
  total: 250,
};

const jillsMembership = {
  name: "jill",
  total: 800,
};

function collectFee(fee) {
  const remaining = this.total - fee;
  this.total = remaining;
  return this.name + " remaining balance", +remaining;
}

const collectBobsFee = collectFee.bind(bobsMembership, 5);
const collectJillsFee = collectFee.bind(jillsMembership, 35);

//******************************* */
//*********BINDING CALLBACKS***** */
//******************************* */

// use cases for bind  -
// when we are passing an object method as a call back

const cat5 = {
  name: "blue",
  breed: "scottish fold",
  dance(dance, freq) {
    console.log(this);
    console.log(`I am ${this.breed} and i like to ${dance}, ${freq}`); //changes from this.name
  },
  greet() {
    alert(`${this.name} says hello`);
  },
};

// we want the greet mthod to run when we click the button
//this will not work, we dont have access the name property
document.querySelector("#button1").addEventListener("click", cat5.greet);
// so we need to bind
document
  .querySelector("#button2")
  .addEventListener("click", cat5.greet.bind(cat5));
///////////////////////////////////////////
const btnA = document.querySelector("#btnA");
const btnB = document.querySelector("#btnB");
const btnC = document.querySelector("#btnC");

function popUp(msg) {
  alert("MEssage is " + msg);
}

// btnA.addEventListener("click", function () {
//   popUp("BUTTON A SAYS HI");
// });
// btnB.addEventListener("click", function () {
//   popUp("BUTTON B SAYS HI");
// });
// btnC.addEventListener("click", function () {
//   popUp("BUTTON C SAYS HI");
// });
//VS
btnA.addEventListener("click", popUp.bind(null, "Button A says Hi"));
btnB.addEventListener("click", popUp.bind(null, "Button B says Hi"));
btnC.addEventListener("click", popUp.bind(null, "Button C says Hi"));

//******************************* */
//*********ARROW FUNCS AND THIS***** */
//******************************* */

//arrow functions do not make their own this

const greeter = {
  msg: "ilike chickenz",
  sayHi: () => {
    console.log(this); // window object
    console.log(this.msg); // undefined
  },
  waitAndGreet: function (delay) {
    console.log("waitnGreet : ", this); // so this references the greeter object
    setTimeout(function () {
      //set timeout is a Window Method
      console.log(this); // window object beacuase we are creating a brand new funciton that is not being called on our object with a new this
      console.log(this.msg); /// this woulds also be undefined
    }, delay);
  },
};

greeter.waitAndGreet(2000);
// we can use arrow functions to address the issue of not wanting a new value of this
const greeter2 = {
  msg: "ilike chickenz",
  sayHi: () => {
    console.log(this);
    console.log(this.msg);
  },
  waitAndGreet: function (delay) {
    setTimeout(() => {
      console.log(this.msg);
    }, delay);
  },
};
