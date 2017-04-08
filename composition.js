'use strict';

class Cookie {
  constructor(ingredients, name) {
    this.status = 'mentah';
    this.ingredients = ingredients;
    this.name = name;
  }
  bake() {
    this.status = 'selesai dimasak';
    return this.status;
  }
}

class Ingredient {
  constructor(obj) {
    this.name = obj.name;
    this.amount = obj.amount;
    this.HasSugar = this.isSugar();
  }

  isSugar() {
    if(this.name == 'sugar'){
      return true;
    } else {
      return false;
    }
  }
}

////////////////////////////////////////////////////////////////

class PeanutButter extends Cookie{
  constructor(status, ingredient, name) {
    super(status, ingredient, name)
    this.name = 'peanut butter';
    this.peanutCount = 100;
  }
}

class ChocolateChip extends Cookie{
  constructor(status, ingredient, name) {
    super(status, ingredient, name)
    this.name = 'chocolate chip';
    this.chocChipCount = 200;
  }
}

class OtherCookies extends Cookie{
  constructor(status, ingredient, name) {
    super(status, ingredient, name)
    this.cookieCount = 250;
  }
}
///////////////////////////////////////////////////////////

class CookieFactory {
  static create() {
    const fs = require('fs');
    let cookieTxt = fs.readFileSync('cookies.txt', 'utf-8').split('\n'),
        cookieProducts = [],
        cookieNames = [],
        list = [],
        arrIngredient = [],
        arrObjIngredient = [];
    // remove last array in cookieTxt
    cookieTxt.pop();

    // iterate to split cookie name and ingredient
    for(let i = 0; i < cookieTxt.length; i++){
      cookieProducts.push(cookieTxt[i].split(' = '));
      // Cookie name goes into exclusive array
      cookieNames.push(cookieProducts[i][0]);
      // Ingredient goes into exclusive array
      arrIngredient.push(cookieProducts[i][1]);
    }
    // console.log(cookieProducts);

    // split each type of ingredient
    for(let i = 0; i < arrIngredient.length; i++){
      arrIngredient[i] = arrIngredient[i].split(', ');
      arrObjIngredient[i] = [];
      // Iterate every ingredient to split between amount and name
      for(let x = 0; x < arrIngredient[i].length; x++){
        arrIngredient[i][x] = arrIngredient[i][x].split(' : ')
        // get each value of ingredient and assign to array of obj ingredient
        arrObjIngredient[i][x] = new Ingredient({'amount': arrIngredient[i][x][0], 'name': arrIngredient[i][x][1]});
      }
    }
    // iterate to get cookie name
    for(let i = 0; i < cookieNames.length; i++){
      if(cookieNames[i] == 'peanut butter'){
        list.push(new PeanutButter(arrObjIngredient[i]));
      } else if (cookieNames[i] == 'chocolate chip') {
        list.push(new ChocolateChip(arrObjIngredient[i]));
      } else if (cookieNames[i] == 'chocolate cheese') {
        list.push(new OtherCookies(arrObjIngredient[i], 'chocolate cheese'));
      } else if (cookieNames[i] == 'chocolate butter') {
        list.push(new OtherCookies(arrObjIngredient[i], 'chocolate butter'));
      }
    }

    return list;
  }

  static cookieRecommendation(day,batch) {
    let noSugarBatch = [];
    // Iterate batch length
    for(let i = 0; i < batch.length; i++){
      let countSugar = 0;
      // Iterate ingredient length
      for(let x = 0; x < batch[i].ingredients.length; x++){
        // check if ingredient has sugar in it
        if(batch[i].ingredients[x].HasSugar){
          countSugar++;
        }
      }
      if(countSugar == 0){
        noSugarBatch.push(`${batch[i].name}\n`);
      }
    }
    return `Sugar free cookies :\n ${noSugarBatch.join('')}`;
  }
}

let firstBatch = CookieFactory.create();

console.log(CookieFactory.create());
console.log('--------------------------------------------------------');
console.log(CookieFactory.cookieRecommendation('Tuesday', firstBatch));
