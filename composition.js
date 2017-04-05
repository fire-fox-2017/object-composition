// Read file containing cookies list
const fs = require("fs");
let cookiesList = fs.readFileSync("cookies.txt").toString().toLowerCase().split("\n");
cookiesList.pop();
let ingredientsList = fs.readFileSync("ingredients.txt").toString().toLowerCase().split("\n");

// Object containing ingredients for all types of cookie
let ingredientsObj = [];
let ingredAmountAll = [];
for (let i = 0; i < ingredientsList.length; i++) {
  if (ingredientsList[i].length > 0) {
    let obj = {};
    let name = (/(\w+\s?\w+)\s?=/i).exec(ingredientsList[i]);
    obj.name = name[1];
    let ingredAmount = ingredientsList[i].match(/\d\s\w+/ig);
    ingredAmountAll.push(ingredAmount);
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

// console.log(ingredAmountAll);

// List of ingredients for each cookie type, reformated
let peanuteButterIngredient;
let chocolateChipIngredient;
let chocolateButterIngredient;
let chocolateCheeseIngredient;
for (let i = 0; i < ingredientsObj.length; i++) {
  if (ingredientsObj[i].name === "peanut butter") {
    let keys = Object.keys(ingredientsObj[i]);
    keys.shift();
    let sugarFree;
    let sugarCount = 0;
    for (let j = 0; j < keys.length; j++) {
      if (/sugar/.test(keys[j])) {
        sugarCount ++;
      }
    }
    if (sugarCount > 0) {
      sugarFree = true;
    } else {
      sugarFree = false;
    }
    peanuteButterIngredient = {name: keys, amount: ingredAmountAll[i], hasSugar: sugarFree};
  } else if (ingredientsObj[i].name === "chocolate chip") {
    let keys = Object.keys(ingredientsObj[i]);
    keys.shift();
    let sugarFree;
    let sugarCount = 0;
    for (let j = 0; j < keys.length; j++) {
      if (/sugar/.test(keys[j])) {
        sugarCount ++;
      }
    }
    if (sugarCount > 0) {
      sugarFree = true;
    } else {
      sugarFree = false;
    }
    chocolateChipIngredient = {name: keys, amount: ingredAmountAll[i], hasSugar: sugarFree};
  } else if (ingredientsObj[i].name === "chocolate butter") {
    let keys = Object.keys(ingredientsObj[i]);
    keys.shift();
    let sugarFree;
    let sugarCount = 0;
    for (let j = 0; j < keys.length; j++) {
      if (/sugar/.test(keys[j])) {
        sugarCount ++;
      }
    }
    if (sugarCount > 0) {
      sugarFree = true;
    } else {
      sugarFree = false;
    }
    chocolateButterIngredient = {name: keys, amount: ingredAmountAll[i], hasSugar: sugarFree};
  } else if (ingredientsObj[i].name === "chocolate cheese") {
    let keys = Object.keys(ingredientsObj[i]);
    keys.shift();
    let sugarFree;
    let sugarCount = 0;
    for (let j = 0; j < keys.length; j++) {
      if (/sugar/.test(keys[j])) {
        sugarCount ++;
      }
    }
    if (sugarCount > 0) {
      sugarFree = true;
    } else {
      sugarFree = false;
    }
    chocolateCheeseIngredient = {name: keys, amount: ingredAmountAll[i], hasSugar: sugarFree};
  }
}

// Create class for the ingredients
class Ingredient {
  constructor(options) {
    this.name = options.name;
    this.amount = options.amount;
    this.hasSugar = options.hasSugar;
  }
}

// Create classes for the cookies
class Cookie {
  constructor(ingredients) {
    this.status = "raw";
    this.ingredients = new Ingredient(ingredients);
  }

  bake() {
    this.status = "baked";
  }
}

class PeanutButter extends Cookie {
  constructor(ingredients) {
    super(ingredients);
    this.name = "peanut butter";
    this.peanutCount = 100;
  }

  crumbled() {
    this.name = "peanut butter crumbled";
    this.peanutCount = 200;
  }
}

class ChocolateChip extends Cookie {
  constructor(ingredients) {
    super(ingredients);
    this.name = "chocolate chip";
    this.chocChipCount = 200;
  }

  crumbled() {
    this.name = "chocolate chip crumbled";
    this.chocChipCount = 400;
  }
}

class ChocolateCheese extends Cookie {
  constructor(ingredients) {
    super(ingredients);
    this.name = "chocolate cheese";
    this.chocCheeseCount = 120;
  }
}

class ChocolateButter extends Cookie {
  constructor(ingredients) {
    super(ingredients);
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
        let peanutButter = new PeanutButter(peanuteButterIngredient);
        if (/crumbled/.test(options[i])) {
          peanutButter.crumbled();
        }
        createdCookies.push(peanutButter);
      } else if (/chocolate\s?chips?/i.test(options[i])) {
        let chocolateChip = new ChocolateChip(chocolateChipIngredient);
        if (/crumbled/.test(options[i])) {
          chocolateChip.crumbled();
        }
        createdCookies.push(chocolateChip);
      } else if (/chocolate\s?chips?\s?\crumbled/i.test(options[i])) {
        let chocolateChip = new ChocolateChipCrumbled(chocolateChipIngredient);
        createdCookies.push(chocolateChip);
      } else if (/chocolate\s?cheese/i.test(options[i])) {
        let chocolateCheese = new ChocolateCheese(chocolateCheeseIngredient);
        createdCookies.push(chocolateCheese);
      } else if (/chocolate\s?butter/i.test(options[i])) {
        let chocolateButter = new ChocolateButter(chocolateButterIngredient);
        createdCookies.push(chocolateButter);
      } else {
        console.log(`The cookie is not available in the factory database.`);
      }
    }
    return createdCookies;
  }

  static cookieRecommendation(day, cookieBatch) {
    let recommended = [];
    if (day === "tuesday") {
      for (let i = 0; i< cookieBatch.length; i++) {
        if (!cookieBatch[i].ingredients.hasSugar) {
          recommended.push(cookieBatch[i]);
        }
      }
    } else {
      for (let i = 0; i< cookieBatch.length; i++) {
        recommended.push(cookieBatch[i]);
      }
    }
    return recommended
    }

}


// Driver Code
let batchOfCookies = CookieFactory.create(cookiesList);
console.log(batchOfCookies);
let sugarFreeCookies = CookieFactory.cookieRecommendation("tuesday", batchOfCookies);
console.log("\nSugar free cookies are: ");
for (let i = 0; i < sugarFreeCookies.length; i++) {
  console.log(sugarFreeCookies[i].name);
}











// Backup, in case needed
// else if (ingredientsObj[i].name === "chocolate cheese") {
//   let keys = Object.keys(ingredientsObj[i]);
//   for (let j = 1; j < keys.length; j++) {
//     let sugarFree;
//     if (/sugar/.test(keys[j])) {
//       sugarFree = true;
//     } else {
//       sugarFree = false;
//     }
//     chocolateCheeseIngredient.push({name: keys[j],
//                                   amount: ingredientsObj[i][keys[j]],
//                                   hasSugar: sugarFree});
//   }
// }
