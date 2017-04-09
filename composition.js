'use strict'
const fs = require('fs');

//release 0
class Cookie {
  constructor(name) {
    this.name = name
    this.status = "mentah"
  }

  bake(){
    this.status = "selesai dimasak"
  }
}

class PeanutButter extends Cookie{
  constructor(name, ingredients) {
    super(name)
    this.ingredients = ingredients
    this.peanut_count = 100
  }
}

class ChocolateChip extends Cookie{
  constructor(name, ingredients) {
    super(name)
    this.ingredients = ingredients
    this.choc_chip_count = 200
  }
}

class OtherCookies extends Cookie{
  constructor(name, ingredients) {
    super(name)
    this.ingredients = ingredients
    this.other_count = 150
  }
}

class CookieFactory {
  static create(options){
    let ing = fs.readFileSync('ingredients.txt', 'utf-8')
                .split('\n')
                .map((element)=>{return element.split('=')})

    let nameCook = []
    let ingredCook = []
    for(let i=0; i<ing.length; i++){
      nameCook.push(ing[i][0])
      ingredCook.push(ing[i][1])
    }
    let arringred = ingredCook.map((element)=>{return element.split(',')})
    // console.log(arringred);
    let arring = arringred.map((elem)=>{return elem.map((ingred)=>{return ingred.split(':')})})
    // console.log('=====');
    // console.log(arring);

    let objIngred = []
    for(let i=0; i<arring.length; i++){
      let tmp = []
      for(let j=0; j<arring[i].length; j++){
        tmp.push(new Ingredients(arring[i][j][1],arring[i][j][0]))
      }
      objIngred.push(tmp)
    }
    // console.log(objIngred);
    //options isinya array from cookies
    let arr = []
    for(let i=0; i<options.length; i++){
      if(options[i] == 'peanut butter'){
        arr.push(new PeanutButter('peanut butter', objIngred[i]))
      } else if (options[i] ==  'chocolate chip'){
        arr.push(new ChocolateChip('chocolate chip', objIngred[i]))
      } else if (i==2 || i==3){
        arr.push(new OtherCookies(options[i], objIngred[i]))
      }
    }
    return arr
  }

  static cookieRecommendation(day, batchCookies){
    // let data = batchCookies
    let cookies_with_no_sugar = []
    if(day != "tuesday"){
      console.log(JSON.stringify(batch_of_cookies, null, 2))
    } else {
      for(let i=0; i<batchCookies.length; i++){
        for(let j=0; j<batchCookies[i].ingredients.length; j++){
          // console.log('------ing:', batchCookies[i].ingredients[j].name);
          if(batchCookies[i].ingredients[j].name != " sugar"){
            cookies_with_no_sugar.push(batchCookies[i])
            // console.log("masuk sini aja", j);
          } else {
            cookies_with_no_sugar = [];
            // console.log("------masuk sini");
            j = batchCookies[i].ingredients.length;
          }
        }
      }
      console.log(JSON.stringify(cookies_with_no_sugar[0],null,2));
    }
  }
}

class Ingredients {
  constructor(name, amount) {
    this.name = name
    this.amount = amount
  }
}

// let cookieFactory = new CookieFactory()
let options = fs.readFileSync('cookies.txt', 'utf-8').split('\n')


let batch_of_cookies = CookieFactory.create(options)
console.log(JSON.stringify(batch_of_cookies, null, 2));

// let sugarFreeFoods = CookieFactory.cookieRecommendation("sunday", batch_of_cookies)
console.log("========sugar free cakes are=======");
CookieFactory.cookieRecommendation("tuesday", batch_of_cookies)
// console.log(sugarFreeFoods);
