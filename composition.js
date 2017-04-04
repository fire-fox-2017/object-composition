"use strict"

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
let filename = 'cookies.txt';
let options = fs.readFileSync(filename)
.toString()
.split("\r\n");
// split using \r and \n because of windows filesystem


console.log(options);

class CookieFactory {
  static create(options) {
    // accepts a lit of cookie types and returns those cookies
    let batch = [];

    for (let i = 0 ; i < options.length ; i++) {
      if(options[i] == "chocolate chip") {
        let c = new ChocolateChip({name: options[i]});
        batch.push(c);
      } else if (options[i] == "peanut butter") {
        let c = new PeanutButter({name: options[i]});
        batch.push(c);
      } else {
        let c = new OtherCookie({name: options[i]});
        batch.push(c);
      }

    }

    return batch;
  }

  // other methods
}


let batch_of_cookies = CookieFactory.create(options);
console.log(batch_of_cookies);
