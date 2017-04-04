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
    this.name = "Unknown";
    if(param && param.hasOwnProperty('name'))
      this.name = param['name'];

    this.status = "mentah";

    this.ingredients = [];
    if(param && param.hasOwnProperty('ingredients'))
      this.ingredients = param['ingredients'];

  }

  bake() {
    this.status = "selesai dimasak";
  }
}

class PeanutButter extends Cookie {
  constructor (args) {
    super({name: args['name'], ingredients: args['ingredients']});
    this.peanut_count = 100;
  }
}


class ChocolateChip extends Cookie {
  constructor (args) {
    super({name: args['name'], ingredients: args['ingredients']});
    this.choc_chip_count = 200;
  }
}

class OtherCookie extends Cookie {
  constructor (args) {
    super({name: args['name'], ingredients: args['ingredients']});
    this.other_count = 150;
  }
}



var fs = require('fs');
let filename = 'cookie_with_ing.txt';
let options = fs.readFileSync(filename)
.toString()
.split("\r\n");
// split using \r and \n because of windows filesystem

options.pop();
// console.log(options);

class CookieFactory {
  static create(options) {
    // accepts a lit of cookie types and returns those cookies
    let batch = [];


    for (let i = 0 ; i < options.length ; i++) {
      // disect the options
      let temp = options[i].split(" = ")
      // console.log(temp);

      let type = temp[0];
      let ing = temp[1].split(', ');

      // get the ingredients
      // console.log(ing)
      // let ing_obj =;
      // let name = "";
      // let amount = "";
      // let has_sugar = false;
      let ingredients_arr = [];

      for (let j = 0 ; j < ing.length ; j++) {
        let ing_split = ing[j].split(' : ');
        let name = ing_split[1];
        let amount = ing_split[0];
        let has_sugar = (name == 'sugar') ? true : false;
        // console.log(`name= ${name} | amount = ${amount} | has_sugar= ${has_sugar}`);
        let ing_obj = new Ingredients({name: name, amount: amount, has_sugar: has_sugar})
        ingredients_arr.push(ing_obj);
      }

      // console.log(ingredients_arr);

      if(type == "chocolate chip") {
        let c = new ChocolateChip({name: type, ingredients: ingredients_arr});
        batch.push(c);
      } else if (type == "peanut butter") {
        let c = new PeanutButter({name: type, ingredients: ingredients_arr});
        batch.push(c);
      } else if (type.length > 0 ) {
        let c = new OtherCookie({name: type, ingredients: ingredients_arr});
        batch.push(c);
      }

    }

    return batch;
  }

  // other methods
  static cookieRecommendation(day, cookies_arr) {
    if(day == 'tuesday') {
      // find sugar free cookie
      let no_sugar_arr = [];
      for (let i = 0 ; i < cookies_arr.length ; i++) {
        let has_sugar = false;

        // let cookie = cookies_arr[i]
        // let contain_sugar = []
        // cookie.ingredients.filter( ing => if(ing.has_sugar){ contain_sugar.push(ing)} )
        

        for (let j = 0 ; j < cookies_arr[i].ingredients.length ; j++) {
          if (cookies_arr[i].ingredients[j].has_sugar == true) {
            // console.log(`${cookies_arr[i].ingredients[j].name}`)
            has_sugar = true;
          }
        }
        if (!has_sugar)
          no_sugar_arr.push(cookies_arr[i]);

      }

      return no_sugar_arr;
    }


  }
}


let batch_of_cookies = CookieFactory.create(options);
console.log(batch_of_cookies);

let sugarFreeFoods = CookieFactory.cookieRecommendation('tuesday', batch_of_cookies);
console.log("sugar free cookies are :");

for (let i = 0 ; i < sugarFreeFoods.length ; i++) {
  console.log(sugarFreeFoods[i].name);
}
