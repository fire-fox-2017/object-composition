"use strict"

class Ingredient {
  constructor(options) {
    if (options && options.hasOwnProperty('name')) {
      this.name =options['name']
    }
    if (options && options.hasOwnProperty('amount')) {
      this.amount =options['amount']
    }

    if (options && options.hasOwnProperty('has_sugar')) {
      this.has_sugar =options['has_sugar']
    }

  }
}

class Cookie{
  constructor(ingredients) {
    this.status = 'mentah';
    this.ingredients = [];
    for(let i=0;i<ingredients.length;i++){

      this.ingredients.push(new Ingredient(ingredients[i]));
    }
    console.log(this.ingredients)


  }



  bake(){
    this.status = 'selesai dimasak'
  }


}

class PeanutButter extends Cookie {
  constructor(name,ingredients) {
    super(ingredients);
    this.name=name;
    this.peanu_count = 100;

  }
}

class ChocolateChip extends Cookie{
  constructor(name,ingredients){
    super(ingredients);
    this.name=name;
    this.choc_chip_count = 200;

  }
}

class OtherCookie extends Cookie{
  constructor(name,ingredients) {
    super(ingredients);
    this.name=name;
    this.other_cookie_count = 150;

  }
}

class CookieFactory {
  static create(options){
    this.cookies=[];
    let namaKue=[];
    for(let i=0;i<options.length-1;i++){
      let kumpBahan =[];
      namaKue.push(options[i].slice(0,options[i].indexOf('=')-1));
      // console.log(namaKue[i]);

      kumpBahan = options[i].slice(options[i].indexOf('=')+1,options[i].length).split(",");
      let dataIngredient=[];
      for(let j=0;j<kumpBahan.length;j++){
      dataIngredient.push({name:kumpBahan[j].slice(kumpBahan[j].indexOf(':')+2,kumpBahan[j].length),amount: kumpBahan[j].slice(1,kumpBahan[j].indexOf(':')-1),has_sugar:/sugar/.test(options[i])});


        // console.log(dataIngredient[j]);

      }

      if(namaKue[i]=='peanut butter'){
        let peanutButter = new PeanutButter(namaKue[i],dataIngredient);
        this.cookies.push(peanutButter);
      }if(namaKue[i]=='chocolate chip'){
        let chocolateChip = new ChocolateChip(namaKue[i],dataIngredient);
        this.cookies.push(chocolateChip);
      }else{
        let otherCookie = new OtherCookie(namaKue[i],dataIngredient);
        this.cookies.push(otherCookie);
      }
    }

    return this.cookies;
  }


    static cookieRecommendation(str,cookies){
      let temp=[];

      for(let i=0;i<cookies.length;i++){
        if(cookies[i].ingredients[0].has_sugar===false){
          temp.push(cookies[i].name);
        }
      }
      if( temp.length!=0){
        return temp;

      }else{
        console.log('tidak ada yang fee sugar');
      }



    }

  getCookies(){
    return this.cookies
  }
}
const fs =require('fs');

let listData = fs.readFileSync('cookies2.txt').toString().split("\n");
// console.log(listData);

let batch_of_cookies = CookieFactory.create(listData);
console.log(batch_of_cookies);

let sugarFreeFoods = CookieFactory.cookieRecommendation("tuesday", batch_of_cookies);
console.log("sugar free cakes are :");
for(let i=0;i<sugarFreeFoods.length;i++){
  console.log(sugarFreeFoods[i]);
}
