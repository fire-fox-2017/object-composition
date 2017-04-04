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
  }

  bake() {
    this.status = "selesai dimasak";
  }
}

class PeanutButter extends Cookie {
  constructor (args) {
    super({name: args['name']});
    this.peanut_count = 100;
  }
}


class ChocolateChip extends Cookie {
  constructor (args) {
    super({name: args['name']});
    this.choc_chip_count = 200;
  }
}

class OtherCookie extends Cookie {
  constructor (args) {
    super({name: args['name']});
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
console.log(options);

class CookieFactory {
  static create(options) {
    // accepts a lit of cookie types and returns those cookies
    let batch = [];


    for (let i = 0 ; i < options.length ; i++) {
      // disect the options
      let temp = options[i].split(" = ")
      console.log(temp);

      let type = temp[0];
      let ing = temp[1].split(', ');

      // get the ingredients
      console.log(ing)
      // let ing_obj =;
      let name = "";
      let amount = "";
      let has_sugar = false;

      for (let j = 0 ; j < ing.length ; j++) {
        let ing_split = ing[j].split(' : ');
        name = ing_split[1];
        amount = ing_split[0];
        has_sugar = (name == 'sugar') ? true : false;
        console.log(`name= ${name} | amount = ${amount} | has_sugar= ${has_sugar}`);
      }

      if(type == "chocolate chip") {


        let c = new ChocolateChip({name: type});
        batch.push(c);
      } else if (type == "peanut butter") {
        let c = new PeanutButter({name: type});
        batch.push(c);
      } else if (type.length > 0 ) {
        let c = new OtherCookie({name: type});
        batch.push(c);
      }

    }

    return batch;
  }

  // other methods
}


let batch_of_cookies = CookieFactory.create(options);
console.log(batch_of_cookies);
