const fs = require('fs')
let options = fs.readFileSync('cookies.txt').toString().split("\n");
options.pop();

class Ingredients {
  constructor(obj) {
    this._content = obj.content;
    this._amount = obj.amount;
  }
}
class Cookie {
  constructor(name,ingredients){
    this._name = name;
    this._ingredients = ingredients;
    this._status = 'Mentah';
    this._hasSugar = true;
  }
  bake(){
    this._status = 'Selesai dimasak';
  }
}

class PeanutButter extends Cookie{
  constructor(name,ingredients){
    super(name,ingredients);
    this._peanutCount = 100;
  }
}

class ChocolateChip extends Cookie{
  constructor(name,ingredients){
    super(name,ingredients);
    this._chocoChipCount = 200;
  }
}

class ChocolateCheese extends Cookie{
  constructor(name,ingredients){
    super(name,ingredients);
    this._chocoChese = 150;
  }
}
class ChocolateButter extends Cookie{
  constructor(name,ingredients){
    super(name,ingredients);
    this._chocoButter = 100;
    this._hasSugar = false;
  }
}

class CookieFactory {
    static create(options) {
      let kue, bahan, cookie, resultCookie = [];
      for (let i = 0; i < options.length; i++) {
          kue = options[i].split(' = ');
          bahan = kue[1].split(', ');
          let temp = [];
          for (let j = 0; j < bahan.length; j++) {
              temp.push(bahan[j].split(' : '))
          }
          let temp2 = [];
          for (let k = 0; k < temp.length; k++) {
            let ingredients = new Ingredients({
                content: temp[k][1],
                amount: temp[k][0],
            })
            temp2.push(ingredients);
          }
          if (kue[0] === "peanut butter") {
              cookie = new PeanutButter(kue[0], temp2);
          } else if (kue[0] === "chocolate chip") {
              cookie = new ChocolateChip(kue[0], temp2);
          } else if (kue[0] === "chocolate cheese") {
              cookie = new ChocolateCheese(kue[0], temp2);
          } else if (kue[0] === "chocolate butter") {
              cookie = new ChocolateButter(kue[0], temp2);
          }
          resultCookie.push(cookie);
      }
      return resultCookie;
  }
  static cookieRecommendation(str, arr) {
    let temp = []
    if (str === 'selasa') {
      for (let i = 0; i < arr.length; i++) {
        if (!arr[i]._hasSugar) {
          temp.push(arr[i]._name);
        }
      }
    } else {
      for (let i = 0; i < arr.length; i++) {
        temp.push(arr[i]._name);
      }
    }
    console.log(temp);
  }
}
let kueku = CookieFactory.create(options);
console.log(kueku);
console.log('============================================================================================');
kueku[0].bake();
console.log(kueku);
console.log('============================================================================================');
CookieFactory.cookieRecommendation('rabu', kueku);
//console.log(options);
