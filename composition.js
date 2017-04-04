"use strict"

const fs = require('fs');

class Inggredient{
	constructor(container){
		this.amount = container.amount;
		this.name = container.name;
	}

}

class CookieFactory{
	 static create(options){
		let listCookie = options.split('\n');
		// let cookies;
		let pisahResep;
		let data;
		let arrCookie = []
		let inggredient = []
		for(let i=0;i<listCookie.length;i++){
			let cookies = listCookie[i].split(' = ')
			//console.log(cookies[1])
			pisahResep = cookies[1].split(', ')
			let resep = [];
			//BANYAKNYA RESEP DALAM 1 MAKANAN
			for(let j=0;j<pisahResep.length;j++){
				//MEMISAH DATA, MENJADI ARRAY 2 DIMENSI.
				resep.push(pisahResep[j].split(' : '))
			}

			let arrInggredient = []

			for(let k=0;k<resep.length;k++){
				arrInggredient.push(new Inggredient({amount:resep[k][0], name:resep[k][1]}))
			}

			if(cookies[0] == 'peanut butter'){
				data = new PeanutButter('peanut Butter', arrInggredient)
			}
			else if(cookies[0] == 'chocolate chip'){
				data = new ChocholateChip('chocolate chip', arrInggredient)
			}
			else{
				data = new OtherCookie(cookies[0], arrInggredient)
			}

			arrCookie.push(data);

			//return cookies;
		}
		return arrCookie;
	}


	static noSugar(batch_of_cookies){
		let arrCookieTanpaGula=[]
		let sugar = true;
		for(let i=0;i<batch_of_cookies.length;i++){
			sugar=true;
			for(let j=0;j<batch_of_cookies[i].ingredients.length;j++){
				if(batch_of_cookies[i].ingredients[j].name.toLowerCase() == 'sugar')
				{
					sugar = false;
				}
			}
			if(sugar == true){
				arrCookieTanpaGula.push(batch_of_cookies[i])
			}
		}
		return arrCookieTanpaGula;
	}
}


class Cookie{
	constructor(name, inggredient){
		this.name = name;
		this.status = "mentah"
		this.ingredients=inggredient;
	}

	bake(){
		this.status = "selesai dimasak";
	}
}

class PeanutButter extends Cookie{
	constructor(name, inggredient){
		super(name, inggredient)
		this.peanut_count = 100;
	}
}

class ChocholateChip extends Cookie{
	constructor(name, inggredient){
		super(name, inggredient)
		this.choc_chip_count = 200;
	}
}

class OtherCookie extends Cookie{
	constructor(name, inggredient){
		super(name, inggredient)
		this.choc_chip_count = 200;
	}
}


let options = fs.readFileSync('cookies.txt', 'utf8');
// versi 1
// let cookie = new CookieFactory()
// let batch_of_cookies = cookie.create(options);

let batch_of_cookies = CookieFactory.create(options);
console.log(batch_of_cookies[0]);

console.log('\nCOOKIE TANPA GULA');
console.log(CookieFactory.noSugar(batch_of_cookies));
