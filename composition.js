"use strict"

class Ingredients {
  constructor (param) {
    this.name = param['name'];
    this.amount = param['amount'];
    this.has_sugar = param['has_sugar'];
  }

}

class Cookie {
  constructor (param) {
    this.name = param['name'];
    this.ingredients = param['ingredients'];
  }
}

class PeanutButter extends Cookie {
  constructor (input) {
    super({name: input['name'], ingredients: input['ingredients']});
    this.peanut_count = 100;
  }
}


class ChocolateChip extends Cookie {
  constructor (input) {
    super({name: input['name'], ingredients: input['ingredients']});
    this.choc_chip_count = 200;
  }
}

class OtherCookie extends Cookie {
  constructor (input) {
    super({name: input['name'], ingredients: input['ingredients']});
    this.other_count = 150;
  }
}

class CookieFactory {
  static create() {
    let batch = [];
    var fs = require('fs');
    let arrCookies = fs.readFileSync('cookies.txt', 'utf8').toString().split("\n");
    arrCookies.pop();
    for (let i = 0 ; i < arrCookies.length ; i++) {
      let arrSplit = arrCookies[i].split(" = ")
      let namaCookie = arrSplit[0];
      let ingredients = arrSplit[1].split(', ');
      let arrIngredients = [];

      for (let j = 0 ; j < ingredients.length ; j++) {
        let arrSplit = ingredients[j].split(' : ');
        let name = arrSplit[1];
        let amount = arrSplit[0];
        let has_sugar = (name === 'sugar') ? true : false;
        let objIngredients = new Ingredients({name: name, amount: amount, has_sugar: has_sugar})
        arrIngredients.push(objIngredients);
      }

;

      if(namaCookie == "chocolate chip") {
        let c = new ChocolateChip({name: namaCookie, ingredients: arrIngredients});
        batch.push(c);
      } else if (namaCookie == "peanut butter") {
        let c = new PeanutButter({name: namaCookie, ingredients: arrIngredients});
        batch.push(c);
      } else if (namaCookie.length > 0 ) {
        let c = new OtherCookie({name: namaCookie, ingredients: arrIngredients});
        batch.push(c);
      }

    }

    return batch;
  }


  static cookieRecommendation(day, arrCookies) {
    if(day == 'tuesday') {
      let arrFreeSugar = [];
      for (let i = 0 ; i < arrCookies.length ; i++) {
        let has_sugar = false;

        for (let j = 0 ; j < arrCookies[i].ingredients.length ; j++) {
          if (arrCookies[i].ingredients[j].has_sugar == true) {
            has_sugar = true;
          }
        }
        if (!has_sugar)
        arrFreeSugar.push(arrCookies[i]);
      }
      return arrFreeSugar;
    }
  }
}


let batch_of_cookies = CookieFactory.create();
console.log(batch_of_cookies);

let freeSugar = CookieFactory.cookieRecommendation('tuesday', batch_of_cookies);
console.log("\n")
for (let i = 0 ; i < freeSugar.length ; i++) {
  console.log(`${i+1.} ${freeSugar[i].name}`);
}
console.log("\n")
