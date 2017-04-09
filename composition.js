"use strict"

const fs = require('fs');
let options = fs.readFileSync('cookies.txt').toString().split('\n');
// console.log(options[0].split(', '))

let rawIngredientContainer = [];
let newIngredients = [];
let cookieNameContainer = [];
let cookieContainer = [];

class Cookie {
  constructor(components) {
    this.name = components.name;
    this.status = "mentah";
  }

  bake() {
    this.status = "selesai dimasak";
  }
}

class PeanutButter extends Cookie {
  constructor(name, ingredient) {
    super(name);
    this.peanut_count = 100;
    this.ingredient = ingredient
  }
} 

class ChocolateChip extends Cookie {
  constructor(name, ingredient) {
    super(name)
    this.choc_chip_count = 200;
    this.ingredient = ingredient
  }
}

class OtherCookie extends Cookie {
  constructor(name, ingredient) {
    super(name)
    this.other_count = 150;
    this.ingredient = ingredient
  }
}

class CookieFactory {

  static create(options) {
    for(let i = 0; i < cookieNameContainer.length; i++) {
      switch(cookieNameContainer[i]) {
        case 'peanut butter':
          cookieContainer.push(new PeanutButter({'name': `${cookieNameContainer[i]}`}));
          break;
        case 'chocolate chip':
          cookieContainer.push(new ChocolateChip({'name': `${cookieNameContainer[i]}`}));
          break;
        default:
          cookieContainer.push(new OtherCookie({'name': `${cookieNameContainer[i]}`}));
      }
    }

    for(let i = 0; i < rawIngredientContainer.length; i++) {
      let newArr = rawIngredientContainer[i].split(', ');
      newArr.splice(0, 1);
      newIngredients.push(newArr)
    }
  }
}

class Ingredient {
  constructor(options) {
    this.name = options.name
    this.amount = options.amount
    this.has_sugar = options.sugar
  }
}

function changeEqualSign() {
  let regex = /\ =/g;
  for(let i = 0; i < options.length; i++) {
    let test = options[i].replace(regex, ',');
    rawIngredientContainer.push(test);
  }
}

function checkCookieName() {
  for(let i = 0; i < rawIngredientContainer.length; i++) {
    let arrayOfCookies = rawIngredientContainer[i].split(', ');
    cookieNameContainer.push(arrayOfCookies[0]);
  }
  
}

function extractIngredient() {
  let regex = /(\: )(\w+)/g;
  for(let i = 0; i < newIngredients.length; i++) {
    for(let j = 0; j < newIngredients[i].length; j++) {
      // hilangkan : dan spasi
      //extract string
    }
  }
}

changeEqualSign();
checkCookieName();
// console.log(cookieNameContainer)
// console.log(rawIngredientContainer[0].split(', '))
// console.log(rawIngredientContainer)

// console.log(cookieContainer)

// peanut butter, 1 cup : flour, 2 cups (gluten) : sugar, 2 cups : peanut butter, 1 cup : cinnamon, 2 tsp : butter

let pabrikKue = CookieFactory.create(options)

console.log(newIngredients)
// console.log(pabrikKue)
// console.log(cookieContainer)
// console.log(rawIngredientContainer[0].split(', ').shift())