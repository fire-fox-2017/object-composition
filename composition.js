class Ingredients {
    constructor(option) {
        this.name = option.name
        this.amount = option.amount
        this.has_sugar = option.has_sugar
    }
}

class Cookie {
    constructor(name, ingredients) {
        this.name = name
        this.status = "mentah"
        this.ingredients = ingredients
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
        this.other_count = 300
    }
}

class CookieFactory {
    static create(options) {
        let splitJudul, cookie, splitIngre, resultCookie = []
        options.pop()
        for (let i = 0; i < options.length; i++) { // options data dari txt tanpa string kosong di line trakhir
            splitJudul = options[i].split(' = ') // setiap data ada indeks nama judul dan resepnya
            splitIngre = splitJudul[1].split(', ') // nampung indeks kesatu yg isinya resep trus di split lagi

            let tempIngre = [] // penampung harus diinisialisasi di dlm loop agar ga berulang
            for (let j = 0; j < splitIngre.length; j++) { // misahin nama resep dgn jlhnya
                tempIngre.push(splitIngre[j].split(' : '))
            }

            let tempArrIngre = []
            for (let a = 0; a < tempIngre.length; a++) {
                let ingredients = new Ingredients({
                    name: tempIngre[a][1],
                    amount: tempIngre[a][0],
                    has_sugar: false
                }) //masukin setiap resep k'dlm obj
                tempArrIngre.push(ingredients)
            }

            if (splitJudul[0] === "peanut butter") {
                cookie = new PeanutButter("peanut butter", tempArrIngre)
            } else if (splitJudul[0] === "chocolate chip") {
                cookie = new ChocolateChip("chocolate chip", tempArrIngre)
            } else {
                cookie = new OtherCookie(splitJudul[0], tempArrIngre)
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

// let sugarFreeFoods = CookieFactory.cookieRecommendation("tuesday", batch_of_cookies);
// console.log("sugar free cakes are :");
// for (let i = 0; i < sugarFreeFoods.length; i++) {
//   console.log(sugarFreeFoods[i].name);
// }
