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


var snack = {
    id: "0001",
    name: "Cake",
    batters:
        {
            batter:
                [
                    { id: "1001", type: "Regular" },
                    { id: "1002", type: "Chocolate" },
                    { id: "1003", type: "Blueberry" },
                ]
        }
};
 
console.log(getNested(snack, 'batters.batter').length)                 // --> 3 
console.log(getNested(snack, 'batters.batter.2.id'))                 // --> "1003"
console.log(getNested(snack, 'batters.batter[1].id') )                 // --> "1002"
console.log(getNested(snack, 'batters.batter[99].id') || 0    )        // --> 0
console.log(getNested(snack, 'batters.batter.nutrition') || 'none'  )  // --> 'none'
console.log(getNested(snack, 'batters/batter/0/id', '/')        )     // --> "1001"

cookieRecommendation(day, batch_of_cookies){
  //    let freeSugar = []
  //    let sugar = []
  //    Object.keys(data).forEach(function(prop) {
        //   // `prop` is the property name
        //   // `data[prop]` is the property value
        // });
  //    // outer_loop: 
  //    // for (let i = 0; i < batch_of_cookies.length; i++) {
  //    //  inner_loop: 
  //    //  for (let j = 0; j < batch_of_cookies[i].ingredients.length; j++) {
  //    //      if(batch_of_cookies[i].ingredients[j].name === 'sugar'){
  //    //          sugar.push(JSON.stringify(batch_of_cookies[i].name))
                    
  //    //      }else{
  //    //          freeSugar.push(JSON.stringify(batch_of_cookies[i]))
  //    //      }
  //    //  }
  //    //  //console.log(batch_of_cookies[i].ingredients[0].name)
  //    // }
  //    console.log(freeSugar)
  //   }
  //   // convertToClassName(name) {
  //   //     let split = name.split(' ')
  //   //     let result = ''
  //   //     for (let i = 0; i < split.length; i++) {
  //   //         let word = split[i].split('') 
  //   //         word[0] = word[0].toUpperCase()
  //   //         result += word.join('')
  //   //     }
  //   //     return result
  //   // }

