'use strict';
const fs = require ('fs');

class Ingredient {
  constructor(obj) {
    this.name = obj.name;
    this.amount = obj.amount;
    this.cekGula = this.cekIsiGula();
  }

  cekIsiGula() {
    if(this.name == 'sugar'){
      return true;
    } else {
      return false;
    }
  }
}


class Cookie {
  constructor(ingredients, name) {
    this.status = 'mentah';
    this.ingredients = ingredients;
    this.name = name;
  }
}


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

class ChocolateCheese extends Cookie {
  constructor(status,ingredients,name){
    super(status,ingredients,name);
    this.name = 'chocolate cheese';
    this.chocCheeseCount = 100;
  }
}

class ChocolateButter extends Cookie {
  constructor(status,ingredients,name){
    super(status,ingredients,name);
    this.name = 'chocolate butter';
    this.chocButterCount = 150;
  }
}


class CookieFactory {
  static create() {
    let options = fs.readFileSync('cookies.txt', 'utf-8').split('\n');

    let kue = [];
    let namaKue = [];
    let kumpulanKue = [];
    let arrBahan = [];
    let arrObjBahan = [];
    var objKue;

    options.pop();

    for(var i = 0; i < options.length; i++){
      kue.push(options[i].split(' = ')); //split file cookies.txt, tiap baris, sehingga dapat nama kue dan ingredient

      namaKue.push(kue[i][0]);

      arrBahan.push(kue[i][1]);
    }



    for(var j = 0; j < arrBahan.length; j++){
      arrBahan[j] = arrBahan[j].split(', ');
      arrObjBahan[j] = [];

      for(var k = 0; k < arrBahan[j].length; k++){
        arrBahan[j][k] = arrBahan[j][k].split(' : ')

        var bahan = {'amount':arrBahan[j][k][0], 'name': arrBahan[j][k][1]};
        arrObjBahan[j][k] = new Ingredient(bahan);
      }
    }

    for(var l = 0; l < namaKue.length; l++){
      if(namaKue[l] == 'peanut butter'){
        var objKue = new PeanutButter(arrObjBahan[l]);
        kumpulanKue.push(objKue);
      } else if (namaKue[l] == 'chocolate chip') {
        var objKue = new ChocolateChip(arrObjBahan[l]);
        kumpulanKue.push(objKue);
      } else if (namaKue[l] == 'chocolate cheese') {
        var objKue = new ChocolateCheese(arrObjBahan[l]);
        kumpulanKue.push(objKue);
      } else if (namaKue[l] == 'chocolate butter') {
        var objKue = new ChocolateButter(arrObjBahan[l]);
        kumpulanKue.push(objKue);
      }
    }

    return kumpulanKue;
  }

//   static cookieRecommendation(hari,produksi) {
//     var kueTanpaGula = [];
//     var hasil = '';
//
//     for(var i = 0; i < produksi.length; i++){
//       var jumlahKueGula = 0;
//       for(var j = 0; j < produksi[j].ingredients.length; j++){
//         if(produksi[i].ingredients[j].cekGula){
//           jumlahKueGula++;
//         }
//       }
//       if(jumlahKueGula == 0){
//         kueTanpaGula.push(produksi[i].name);
//       }
//     }
//     hasil = `Kue yang tidak mengandung gula adalah : ${kueTanpaGula}`;
//     return hasil;
//   }
// }


let produksiKue = CookieFactory.create();

console.log(CookieFactory.create());
// console.log(CookieFactory.cookieRecommendation('Selasa', produksiKue));
