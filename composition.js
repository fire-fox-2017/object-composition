"use strict"

const fs = require('fs');

// console.log(options[0].split(', '))



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
  constructor(name) {
    super(name);
    this.peanut_count = 100;
    this.ingredient = new Ingredient();
  }
} 

class ChocolateChip extends Cookie {
  constructor(name) {
    super(name)
    this.choc_chip_count = 200;
    this.ingredient = new Ingredient();
  }
}

class OtherCookie extends Cookie {
  constructor(name) {
    super(name)
    this.other_count = 150;
    this.ingredient = new Ingredient();
  }
}

class CookieFactory {
  constructor() {
    this.cookiesIngredientData = fs.readFileSync('cookies.txt').toString().split('\n');
    this.rawIngredientContainer = [];
    this.newIngredients = [];
    this.cookieNameContainer = [];
    this.cookieContainer = [];
    this.ingredientAmountContainer = [];
  }

  create() {
    let cookiesIngredientData = this.cookiesIngredientData;
    this.changeEqualSign();
    this.checkCookieName();
    // this.extractIngredient();

    for(let i = 0; i < this.cookieNameContainer.length; i++) {
      switch(this.cookieNameContainer[i]) {
        case 'peanut butter':
          this.cookieContainer.push(new PeanutButter({'name': `${this.cookieNameContainer[i]}`}));
          break;
        case 'chocolate chip':
          this.cookieContainer.push(new ChocolateChip({'name': `${this.cookieNameContainer[i]}`}));
          break;
        default:
          this.cookieContainer.push(new OtherCookie({'name': `${this.cookieNameContainer[i]}`}));
      }
    }

    for(let i = 0; i < this.rawIngredientContainer.length; i++) {
      let newArr = this.rawIngredientContainer[i].split(', ');
      // newArr.splice(0, 1);
      this.newIngredients.push(newArr)
    }
    
    for(let i = 0; i < this.newIngredients.length; i++) {
      for(let j = 0; j < this.newIngredients[i].length; j++) {
        let regexForAmount = /\d \w+/;
        this.ingredientAmountContainer = regexForAmount.exec(this.newIngredients[i][j]);
      }
    }

  }



  changeEqualSign() {
    let regex = /\ =/g;
    for(let i = 0; i < this.cookiesIngredientData.length; i++) {
      let test = this.cookiesIngredientData[i].replace(regex, ',');
      this.rawIngredientContainer.push(test);
    }
  }
  
  checkCookieName() {
    for(let i = 0; i < this.rawIngredientContainer.length; i++) {
      let arrayOfCookies = this.rawIngredientContainer[i].split(', ');
      this.cookieNameContainer.push(arrayOfCookies[0]);
    }
  }

  extractIngredient() {
    let regex = /(\: )(\w+)/g;
    for(let i = 0; i < this.newIngredients.length; i++) {
      for(let j = 0; j < this.newIngredients[i].length; j++) {
        // hilangkan : dan spasi
        //extract string
      }
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


// console.log(this.cookieNameContainer)
// console.log(this.rawIngredientContainer[0].split(', '))
// console.log(this.rawIngredientContainer)

// console.log(this.cookieContainer)

// peanut butter, 1 cup : flour, 2 cups (gluten) : sugar, 2 cups : peanut butter, 1 cup : cinnamon, 2 tsp : butter

let pabrikKue = new CookieFactory();
pabrikKue.create();

// console.log(pabrikKue.rawIngredientContainer[0].split(','))

console.log(pabrikKue.newIngredients)
console.log(pabrikKue.ingredientAmountContainer)
// console.log(pabrikKue.cookieNameContainer)
// console.log(pabrikKue.cookieContainer)

// console.log(pabrikKue)
// console.log(this.cookieContainer)
// console.log(this.rawIngredientContainer[0].split(', ').shift())
