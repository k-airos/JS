class Samurai {
    constructor(name) {
        this.name = name;
    }
    hello() {alert(this.name)}
}

let shogun = new Samurai("dimych");
console.log(shogun);
console.log('sdfdsf'.__proto__);
console.log(Samurai.__proto__);
console.log(shogun.__proto__);
console.log(shogun.__proto__.constructor.__proto__.__proto__);


// function logPerson(){
//     console.log(`Person: ${this.name}, ${this.age}, ${this.job}`);
// }
// function bind(conext,fn){
//     return function(...args){
//         fn.apply(context,args);
//     };
// }