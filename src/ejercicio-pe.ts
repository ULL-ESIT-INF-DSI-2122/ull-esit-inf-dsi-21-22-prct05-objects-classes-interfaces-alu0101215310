/**
 * @class Hexadecimal: Representa un objeto númerico
 * @method toString : Pasa el valor númerico del invocante a hexadecimal
 * @method valueOf : Devuelve el valor númerico del invocante
 * @method add : Suma el valor del invocante con el pasado como argumento
 * @method parse : Pasa el valor en hexadecimal del argumento a entero
 */
export class Hexadecimal {
  constructor(private num: number) {};

  toStringH() {
    return this.num.toString(16);
  }
  valueOf() {
    return this.num;
  }
  add(obj : Hexadecimal) {
    const sum = new Hexadecimal(this.num + obj.num);
    return sum;
  }
  substrac(obj : Hexadecimal) {
    const res = new Hexadecimal(this.num - obj.num);
    return res;
  }
  parse(int : string) {
    return parseInt(int, 16);
  }
}

const myFirstHexValue = new Hexadecimal(23);
console.log(myFirstHexValue);
console.log(myFirstHexValue.valueOf());
console.log(myFirstHexValue.toStringH());
const mySecondHexValue = new Hexadecimal(15);
console.log(mySecondHexValue);
console.log(mySecondHexValue.valueOf());
console.log(mySecondHexValue.toStringH());
const suma = myFirstHexValue.add(mySecondHexValue);
console.log(suma);
console.log(suma.valueOf());
console.log(suma.toStringH());
const resta = myFirstHexValue.substrac(mySecondHexValue);
console.log(resta);
console.log(resta.valueOf());
console.log(resta.toStringH());
const hex = myFirstHexValue.parse('0x26');
console.log(hex);

