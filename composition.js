// Read file containing cookies list
const fs = require("fs");
let cookiesList = fs.readFileSync("cookies.txt").toString().toLowerCase().match(/\w+\s?\w+/ig);
let ingredientsList = fs.readFileSync("ingredients.txt").toString().toLowerCase().split("\n");

let ingredientsObj = [];
for (let i = 0; i < ingredientsList.length; i++) {
  if (ingredientsList[i].length > 0) {
    let obj = {};
    let name = (/(\w+\s?\w+)\s?=/i).exec(ingredientsList[i]);
    obj.name = name[1];
    let ingredAmount = ingredientsList[i].match(/\d\s\w+/ig);
    let ingred = ingredientsList[i].match(/\w+(\s\w+)?(\s\w+)?,/ig);
    ingred.push(ingredientsList[i].match(/\w+(\s\w+)?$/i)[0]);
    let corrIngred = [];
    for (let j = 0; j < ingred.length; j++) {
      if (/,/.test(ingred[j])) {
        let str = ingred[j].split("");
        str.pop();
        corrIngred.push(str.join(""));
      } else {
        corrIngred.push(ingred[j]);
      }
    }
    for (let i = 0; i < corrIngred.length; i ++) {
      obj[String(corrIngred[i])] = ingredAmount[i];
    }
    ingredientsObj.push(obj);
  }
}

// List of ingredients
let peanuteButterIngredient = [];
let chocolateChipIngredient = [];
let chocolateButterIngredient = [];
let chocolateCheeseIngredient = [];
for (let i = 0; i < ingredientsObj.length; i++) {
  if (ingredientsObj[i].name === "peanut butter") {
    let keys = Object.keys(ingredientsObj[i]);
    for (let j = 1; j < keys.length; j++) {
      let sugarFree;
      if (/sugar/.test(keys[j])) {
        sugarFree = true;
      } else {
        sugarFree = false;
      }
      peanuteButterIngredient.push({name: keys[j],
                                    amount: ingredientsObj[i][keys[j]],
                                    hasSugar: sugarFree});
    }
  } else if (ingredientsObj[i].name === "chocolate chip") {
    let keys = Object.keys(ingredientsObj[i]);
    for (let j = 1; j < keys.length; j++) {
      let sugarFree;
      if (/sugar/.test(keys[j])) {
        sugarFree = true;
      } else {
        sugarFree = false;
      }
      chocolateChipIngredient.push({name: keys[j],
                                    amount: ingredientsObj[i][keys[j]],
                                    hasSugar: sugarFree});
    }
  } else if (ingredientsObj[i].name === "chocolate butter") {
    let keys = Object.keys(ingredientsObj[i]);
    for (let j = 1; j < keys.length; j++) {
      let sugarFree;
      if (/sugar/.test(keys[j])) {
        sugarFree = true;
      } else {
        sugarFree = false;
      }
      chocolateButterIngredient.push({name: keys[j],
                                    amount: ingredientsObj[i][keys[j]],
                                    hasSugar: sugarFree});
    }
  } else if (ingredientsObj[i].name === "chocolate cheese") {
    let keys = Object.keys(ingredientsObj[i]);
    for (let j = 1; j < keys.length; j++) {
      let sugarFree;
      if (/sugar/.test(keys[j])) {
        sugarFree = true;
      } else {
        sugarFree = false;
      }
      chocolateCheeseIngredient.push({name: keys[j],
                                    amount: ingredientsObj[i][keys[j]],
                                    hasSugar: sugarFree});
    }
  }
}

// Create class for the ingredients
class Ingredient {
  constructor(options) {
    this.name = options["name"];
    this.amount = options["amount"];
    this.hasSugar = option["hasSugar"];
  }
}






// Create classes for the cookies
class Cookie {
  constructor(ingredients) {
    this.status = "raw";
    this.ingredients = ingredients;
  }

  bake() {
    this.status = "baked";
  }
}

class PeanutButter extends Cookie {
  constructor(ingredients) {
    super();
    this.name = "peanut butter";
    this.peanutCount = 100;
    this.ingredients = new Ingredients(ingredients);
  }
}

class ChocolateChip extends Cookie {
  constructor() {
    super();
    this.name = "chocolate chip";
    this.chocChipCount = 200;
  }
}

class ChocolateCheese extends Cookie {
  constructor() {
    super();
    this.name = "chocolate cheese";
    this.chocCheeseCount = 120;
  }
}

class ChocolateButter extends Cookie {
  constructor() {
    super();
    this.name = "chocolate butter";
    this.chocButterCount = 150;
  }
}

// Create cookie factory class
class CookieFactory {
  static create(options) {
    let createdCookies = [];
    for (let i = 0; i < options.length; i++) {
      if (/peanut\s?butter/i.test(options[i])) {
        let peanutButter = new PeanutButter();
        createdCookies.push(peanutButter);
      } else if (/chocolate\s?chips?/i.test(options[i])) {
        let chocolateChip = new ChocolateChip();
        createdCookies.push(chocolateChip);
      } else if (/chocolate\s?cheese/i.test(options[i])) {
        let chocolateCheese = new ChocolateCheese();
        createdCookies.push(chocolateCheese);
      } else if (/chocolate\s?butter/i.test(options[i])) {
        let chocolateButter = new ChocolateButter();
        createdCookies.push(chocolateButter);
      } else {
        console.log(`The cookie is not available in the factory database.`);
      }
    }
    return createdCookies;
  }
}

// let batchOfCookies = CookieFactory.create(cookiesList);
// console.log(batchOfCookies);
