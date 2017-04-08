"use strict"
let fs = require('fs');
let listKue = fs.readFileSync('cookies.txt').toString().toLowerCase().split("\n");
class Ingredients {
    constructor(name, amount) {
        this.name = name;
        this.amount = amount;
    }
    getIngredient() {
        let temp = {};
        temp.name = this.name;
        temp.amount = this.amount;
        return temp;
    }
}
class Cookie {
    constructor() {
        this.status = "mentah";
        this.ingredients = [];
        this.has_sugar = false;
    }
    addIngredients(str) {
        this.has_sugar = str.includes("sugar");
        let arrTemp = str.split(",")
        for (let j = 0; j < arrTemp.length; j++) {
            let temp = arrTemp[j].toString().indexOf(":");
            let myIngredients = new Ingredients(arrTemp[j].slice(temp + 1, arrTemp[j].length), arrTemp[j].slice(0, temp));
            this.ingredients.push(myIngredients.getIngredient());
        }
    }
    bake() {
        this.status = "selesai dimasak"
    }
}

class PeanutButter extends Cookie {
    constructor() {
        super();
        this.peanutCount = 100;
    }
}

class ChocholateChip extends Cookie {
    constructor() {
        super();
        this.chocChipCount = 200;
    }
}

class OtherCookie extends Cookie {
    constructor() {
        super();
        this.otherCount = 150;
    }
}

class CookieFactory {
    static create(option) {
        let arrCokie = [];
        for (let i = 0; i < option.length - 1; i++) {
            let temp = {};
            let str1 = option[i];
            let ind = str1.indexOf("=");
            temp.name = str1.slice(0, ind - 1);
            let str2 = str1.slice(ind + 2, str1.length);
            if (option[i].includes("peanut butter")) {
                let myPeanutButter = new PeanutButter();
                temp.status = myPeanutButter.status;
                myPeanutButter.addIngredients(str2);
                temp.ingredients = myPeanutButter.ingredients;
                temp.peanutCount = myPeanutButter.peanutCount;
                temp.sugar = myPeanutButter.has_sugar;
            } else if (option[i].includes("choolate chip")) {
                let myChocholateChip = new ChocholateChip();
                temp.status = myChocholateChip.status;
                myChocholateChip.addIngredients(str2);
                temp.ingredients = myChocholateChip.ingredients;
                temp.chocChipCount = myChocholateChip.chocChipCount;
                temp.sugar = myChocholateChip.has_sugar;
            } else {
                let myOtherCookie = new OtherCookie();
                temp.status = myOtherCookie.status;
                myOtherCookie.addIngredients(str2);
                temp.ingredients = myOtherCookie.ingredients;
                temp.otherCount = myOtherCookie.otherCount;
                temp.sugar = myOtherCookie.has_sugar;
            }
            arrCokie.push(temp);
        }
        return arrCokie;
    }

    static cookieRecommendation(str, arr) {
        if (str === 'tuesday') {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].sugar) {} else {
                    console.log(arr[i].name);
                }
            }
        } else {
            for (let i = 0; i < arr.length; i++) {
                console.log(arr[i].name);
            }
        }
    }
}

let myFactory = CookieFactory.create(listKue);
console.log(myFactory);
console.log(myFactory[0].ingredients[0]);
console.log("Sugar free cake are :");
CookieFactory.cookieRecommendation('tuesday', myFactory);
