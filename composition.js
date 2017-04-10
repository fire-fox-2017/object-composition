'use strict'
const fs = require('fs');

//release 0
class Cookie {
  constructor(name) {
    this.name = name;
    this.status = "mentah";
  }

  bake(){
    this.status = "selesai dimasak";
  }
}

class PeanutButter extends Cookie{
  constructor(name, ingredients) {
    super(name);
    this.ingredients = ingredients;
    this.peanut_count = 100;
  }
}

class ChocolateChip extends Cookie{
  constructor(name, ingredients) {
    super(name);
    this.ingredients = ingredients;
    this.choc_chip_count = 200;
  }
}

class OtherCookies extends Cookie{
  constructor(name, ingredients) {
    super(name);
    this.ingredients = ingredients;
    this.other_count = 150;
  }
}

class CookieFactory {
  static create(options){
    let ingredientsData = fs.readFileSync('cookies.txt', 'utf-8')
                .split('\n')
                .map((element)=>{return element.split(' =')});

    let cookieNames = [];
    let cookieIngredients = [];
    for(let i=0; i<ingredientsData.length; i++){
      cookieNames.push(ingredientsData[i][0]);
      cookieIngredients.push(ingredientsData[i][1]);
    }
    let cookieIngredientsContainer = cookieIngredients.map((element)=>{return element.split(',')}); // 2d array of ingredient for each cookie

    let arring = cookieIngredientsContainer.map((elem)=>{return elem.map((ingred)=>{return ingred.split(' : ')})});

    let objIngred = [];
    for(let i=0; i<arring.length; i++){
      let tmp = [];
      for(let j=0; j<arring[i].length; j++){
        tmp.push(new Ingredients(arring[i][j][1],arring[i][j][0]));
      }
      objIngred.push(tmp);
    }

    let cookiesWithIngredient = []; // berisi arr of obj dengan property 'ingredient' berbentuk arr berisi obj class Ingredients
    for(let i=0; i<cookieNames.length; i++){
      if(cookieNames[i] == 'peanut butter'){
        cookiesWithIngredient.push(new PeanutButter('peanut butter', objIngred[i]));
      } else if (cookieNames[i] ==  'chocolate chip'){
        cookiesWithIngredient.push(new ChocolateChip('chocolate chip', objIngred[i]));
      } else if (i==2 || i==3){
        cookiesWithIngredient.push(new OtherCookies(cookieNames[i], objIngred[i]));
      }
    }
    return cookiesWithIngredient;

  }

  static cookieRecommendation(day, cookiesWithIngredient){
    let cookiesData = this.create();
    let freeSugarCookies = [];
    if(day !== 'tuesday'){
      console.log(JSON.stringify(pabrikKue, null, 2)); // stringify supaya enak diliat di terminal
    } else {
      for(let i = 0; i < cookiesData.length; i++){
        for(let j = 0; j <cookiesData[i].ingredients.length; j++){
          // console.log('------ing:', cookiesData[i].ingredients[j].name);
          if(cookiesData[i].ingredients[j].name !== 'sugar'){
            freeSugarCookies.push(cookiesData[i]);
          } else {
            freeSugarCookies = [];
            j = cookiesData[i].ingredients.length;
          }
        }
      }
      console.log(JSON.stringify(freeSugarCookies[0],null,2));
    }
  }
}

class Ingredients {
  constructor(name, amount) {
    this.name = name;
    this.amount = amount;
  }
}

let options = fs.readFileSync('cookies.txt', 'utf-8').split('\n');


let pabrikKue = CookieFactory.create(options);
console.log('ini return nya cookiefactory create method:');
console.log(JSON.stringify(pabrikKue, null, 2));

// let sugarFreeFoods = CookieFactory.cookieRecommendation("sunday", pabrikKue)
console.log("========sugar free cakes are=======");
CookieFactory.cookieRecommendation("tuesday", pabrikKue);
// console.log(sugarFreeFoods);