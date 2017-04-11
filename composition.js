'use strict'

const fs = require('fs') 

class Ingredient {
    constructor(ingredients) {
       this.name       = ingredients.name 
       this.amount     = ingredients.amount
       this.has_gluten = ingredients.has_gluten
    }
}

class Cookie {
    constructor(name, ingredients) {
        this.name        = name
        this.status      = 'mentah' 
        this.ingredients = ingredients
    }

    bake(ingre) {
        this.status = 'selesai dimasak'
            
    }
}

class PeanutButter extends Cookie {
    constructor(name, ingredients) {
        super(name, ingredients)
        this.peanut_count = 100
    }
}

class ChocolateChip extends Cookie {
    constructor(name, ingredients) {
       super(name, ingredients)
       this.choc_chip_count = 200 
    }
}

class OtherCookie extends Cookie {
    constructor(name, ingredients) {
        super(name, ingredients)
        this.other_count = 150
    }
}

class CookieFactory {
    constructor () {
        this.cookiesList
    }

    create(options) {
        let list = []
        let cookies = fs.readFileSync(options).toString().split('\n') 
        for (let i = 0; i < cookies.length; i++) {
            let cookiesData     = cookies[i].toString().split(' = ')
            let product         = cookiesData[0]
            let ingredientsData = cookiesData[1].split(', ')
            let ingredients     = []
            for (let j = 0; j < ingredientsData.length; j++) {
                let ingredient            = ingredientsData[j].split(' : ')
                let name                  = ingredient[1] 
                let amount                = ingredient[0]
                let hasGluten             = /gluten/g.test(ingredient[1])
                let ingData = {name: name, amount: amount, has_gluten: hasGluten}
                ingredients.push(new Ingredient(ingData))
            }

            switch (product) {
                case 'peanut butter':
                    list.push(new PeanutButter(product, ingredients))
                    break;
                case 'chocolate chip':
                    list.push(new ChocolateChip(product, ingredients)) 
                    break;
                // case 'chocolate cheese':
                //     list.push(new ChocolateChip(product, ingredients)) 
                //     break;
                // case 'chocolate butter':
                //     list.push(new ChocolateChip(product, ingredients)) 
                //     break;
                default:
                    list.push(new OtherCookie(product, ingredients))
            }
        }
        this.cookiesList = list
        console.log(this.cookiesList);
    }

    checkGluten() {
        let cookies = this.cookiesList;
        let cookies_with_sugar = []
        cookies.forEach(function(cookie){
            let has_sugar = []
            cookie.ingredients.some( (ing) => {has_sugar.push(ing.name.toLowerCase() == "sugar")} )
            console.log(`-----------------------${cookie.name} : `, has_sugar)
            if(has_sugar.includes(true)){
                cookies_with_sugar.push(cookie)
            }
        })
        return cookies_with_sugar
        // return /gluten/g.test(ingredient)
    }

  //   
}

function getNested (theObject, path, separator) {
    try {
        separator = separator || '.';
    
        return path.
                replace('[', separator).replace(']','').
                split(separator).
                reduce(
                    function (obj, property) { 
                        return obj[property];
                    }, theObject
                );
                    
    } catch (err) {
        return undefined;
    }   
}

let batch_of_cookies = new CookieFactory()
batch_of_cookies.create('cookies.txt')


console.log('\n\n------------------\n',batch_of_cookies.checkGluten())
