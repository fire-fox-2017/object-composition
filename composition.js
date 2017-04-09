"use strict"

class Ingredients {
    constructor(option) {
        this.Name = option.Name
        this.amount = option.amount
        this.has_sugar = option.has_sugar
    }
}

class Cookie {
    constructor(Name, Ingredients) {
        this.Name = Name
        this.status = "mentah"
        this.Ingredients = Ingredients
    }
}

class PeanutButter extends Cookie {
    constructor(Name, Ingredients) {
        super(Name, Ingredients)
        this.peanut_count = 100
    }

}

class ChocolateChip extends Cookie {
    constructor(Name, Ingredients) {
        super(Name, Ingredients)
        this.choco_chip_count = 200
    }

}

class OtherCookie extends Cookie {
    constructor(Name, Ingredients) {
        super(Name, Ingredients)
        this.other_count = 300
    }
}

class CookieFactory {
    static create(options) {
        let splitTitle, cookie, splitIngre, resultCookie = []
        options.pop()
        for (let i = 0; i < options.length; i++) {
            splitTitle = options[i].split(' = ')
            splitIngre = splitTitle[1].split(', ')

            let Ing = []
            for (let j = 0; j < splitIngre.length; j++) {
                Ing.push(splitIngre[j].split(' : '))
            }

            let tempArrIngre = []
            for (let a = 0; a < Ing.length; a++) {
                let ingredients = new Ingredients({
                    Name: Ing[a][1],
                    amount: Ing[a][0],
                    has_sugar: false
                })
                tempArrIngre.push(ingredients)
            }

            if (splitTitle[0] === "peanut butter") {
                cookie = new PeanutButter("peanut butter", tempArrIngre)
            } else if (splitTitle[0] === "chocolate chip") {
                cookie = new ChocolateChip("chocolate chip", tempArrIngre)
            } else {
                cookie = new OtherCookie(splitTitle[0], tempArrIngre)
            }
            resultCookie.push(cookie)
        }
        return resultCookie
    }
}

let fs = require('fs')
let options = fs.readFileSync('cookies.txt').toString().split("\n")

let batch_of_cookies = CookieFactory.create(options)
console.log(batch_of_cookies);
