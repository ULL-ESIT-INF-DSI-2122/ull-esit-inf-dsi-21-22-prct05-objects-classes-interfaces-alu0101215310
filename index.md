# Práctica 5 - Objetos, clases e interfaces

## Ejercicio 1 - Pokedex

Para la realización de este ejercicio se llevará a cabo la implementación de una serie
de clases que permitan la representación de un Pokemon, con todas sus características,
una Pokedex, encargada de almacenar dichos Pokemons con sus respectivos datos, y un
simulador de combate entre dos Pokemons cualesquiera. Este último será capaz de mostrar
la evolución del combate, es decir, la vida restante de cada uno de los combatientes, los
turnos de batalla, quien ataca en cada momento, y por supuesto quien gana la pelea.

### Clase Pokemon

Esta primera clase, como se indicaba previamente, representará un Pokemon con todas sus
características, es decir, el nombre del mismo, su tipo principal y secundario si posee, su altura y peso, y todas sus estadísticas de combate.

#### Constructor y propiedades

```typescript
  private pokemonType : string;
  private pokemonSecondType : string;
  private pokemonHeight : number;
  private pokemonWeight : number;
  private pokemonStats : Stats[];

  constructor(private name : string) {};
```
Al crear un nuevo Pokemon solo se requerirá del nombre, ya que será el único dato que no 
se podrá cambiar y que servirá de identificador del Pokemon a la hora de buscarlo en la
Pokedex que lo almacenará. Por esto, la clase contará con una serie de propiedades
privadas sin asignar, las cuales representan todas las características, y otra propiedad
también privada que representa el nombre y que se asigna e el constructor. A destacaar
que la propiedad pokemonStats es un tipo de dato creado formado por un string y un number.
```typescript
export type Stats = [string, number];
```

#### Seters y Geters

```typescript
  getName() {
    return this.name;
  }

  setType(type : number) {
    this.pokemonType = Types[type];
  }
  getType() {
    return this.pokemonType;
  }

  setSecondType(type : number) {
    this.pokemonSecondType = Types[type];
  }
  getSecondType() {
    return this.pokemonSecondType;
  }

  setHeight(height : number) {
    this.pokemonHeight = height;
  }
  getHeight() {
    return this.pokemonHeight;
  }

  setWeight(weight : number) {
    this.pokemonWeight = weight;
  }
  getWeight() {
    return this.pokemonWeight;
  }

  setStats(stats : number[]) {
    this.pokemonStats = [[TypeStats[0], stats[0]], [TypeStats[1], stats[1]],
      [TypeStats[2], stats[2]], [TypeStats[3], stats[3]],
      [TypeStats[4], stats[4]], [TypeStats[5], stats[5]]];
  }
  getStats() {
    return this.pokemonStats;
  }
```
Como primeras funciones de la clase nos encontramos con una lista de seters y geters que 
permitirán actualizar y obtener el valor de las diferentes propiedades. Como dato a 
destacar, en la función setStats(), se hace uso de un enumerado para asignar los 
diferentes valores del vector númerico que se le pasa con su respectiva característica
dentro del tipo de dato especificado previamente.
```typescript
export enum TypeStats {
  puntosDeSalud = 0,
  ataque = 1,
  defensa = 2,
  ataqueEspecial = 3,
  defensaEspecial = 4,
  velocidad = 5
}
```
A continuación una serie de tests realizados para comprobar su correcto funcionamiento:
```typescript
const poke1 = new Pokemon('Pikachu');
poke1.setType(Types.eléctrico);
poke1.setHeight(40);
poke1.setWeight(6);
poke1.setStats([274, 209, 179, 199, 199, 279]);

const poke2 = new Pokemon('Charizard');
poke2.setType(Types.fuego);
poke2.setSecondType(Types.volador);
poke2.setHeight(170);
poke2.setWeight(90.5);
poke2.setStats([360, 267, 255, 317, 269, 299]);

describe('Pokemon class test', () => {
  it('typeOf and result getName()', () => {
    assert.typeOf(poke1.getName(), 'string');
    assert.equal(poke1.getName(), 'Pikachu');
    assert.typeOf(poke2.getName(), 'string');
    assert.equal(poke2.getName(), 'Charizard');
  });
  it('typeOf and result getType()', () => {
    assert.typeOf(poke1.getType(), 'string');
    assert.equal(poke1.getType(), 'eléctrico');
    assert.typeOf(poke2.getType(), 'string');
    assert.equal(poke2.getType(), 'fuego');
  });
  it('typeOf and result getSecondType()', () => {
    assert.typeOf(poke2.getSecondType(), 'string');
    assert.equal(poke2.getSecondType(), 'volador');
  });
  it('typeOf and result getHeight()', () => {
    assert.typeOf(poke1.getHeight(), 'number');
    assert.equal(poke1.getHeight(), 40);
    assert.typeOf(poke2.getHeight(), 'number');
    assert.equal(poke2.getHeight(), 170);
  });
  it('typeOf and result getWeight()', () => {
    assert.typeOf(poke1.getWeight(), 'number');
    assert.equal(poke1.getWeight(), 6);
    assert.typeOf(poke2.getWeight(), 'number');
    assert.equal(poke2.getWeight(), 90.5);
  });
});
```

#### Función print()

Para finalizar con esta clase, se añade un método print() que mostrará por pantalla
la ficha del Pokemon indicado, mostrando todos sus datos de forma clara y ordenada,
incluyendo sus estadísticas.
```typescript
  print() {
    console.log(`- Pokemon: ${this.getName()}`);
    console.log(`- Tipo principal: ${this.getType()}`);
    if (this.getSecondType() != undefined) {
      console.log(`- Tipo secundario: ${this.getSecondType()}`);
    }
    console.log(`- Altura: ${this.getHeight()} cm`);
    console.log(`- Peso: ${this.getWeight()} kg`);
    console.log(`- Estadísticas:`);
    this.getStats().forEach((stat) => {
      console.log(`\t·${stat[0]} = ${stat[1]}`);
    });
  }
```

### Clase Pokedex

Para esta segunda clase deberemos representa una Pokedex capaz de almacenar todos
los objetos de tipo Pokemon que se vayan creando de forma ordenada y accesible.

#### Constructor y propiedades

```typescript
  private list : pokedexPos[];

  constructor() {
    this.list = [];
  };
```
A la hora de crear la Pokedex, no hará falta pasarle ninún tipo de argumento, ya que
de forma automática la única propiedad que tiene, que representa la lista de los 
Pokemons, se inicializará quedando vacía para poder añadir nuevos datos. Este tipo de
dato que formará esta lista también es creado, y se trata de una tupla de number y 
Pokemon, de forma que a cada Pokemon que se añada a la Pokedex se le asignará un 
valor númerico que permitirá buscarlo con mayor facilidad.
```typescript
export type pokedexPos = [number, Pokemon];
```

#### Función addPokemon()

```typescript
  addPokemon(poke : Pokemon) {
    this.list.push([this.list.length + 1, poke]);
  }
```
Esta función se hará cargo de meter en la lista de la Pokedex mediante el método push(),
un pokedexPos (dato explicado previamente), formado por un número igual al tamaño de la 
lista más 1, de forma que siempre se le asignará un número mayor que al último, y el
Pokemon que se quiere añadir, el cual se pasa como argumento.

#### Función selectPoke()

```typescript
  selectPoke(pos : number) {
    return this.list[pos-1][1];
  }
```
Esta función simplemente buscará el número indicado entre las tuplas de la Pokedex
y devolverá el Pokemon al que se le asocia. A continuación una serie de tests realizados para comprobar su correcto funcionamiento:
```typescript
describe('Pokedex class test', () => {
  it('typeOf and result selectPoke()', () => {
    assert.typeOf(pokedex.selectPoke(1).getName(), 'string');
    assert.equal(pokedex.selectPoke(1).getName(), 'Pikachu');
    assert.typeOf(pokedex.selectPoke(2).getName(), 'string');
    assert.equal(pokedex.selectPoke(2).getName(), 'Charizard');
  });
});
```

#### Función print()

```typescript
  print() {
    console.log('POKEDEX');
    this.list.forEach((poke) => {
      console.log(`${poke[0]} - ${poke[1].getName()}`);
    });
  }
```
Como en la clase anterior, se implementa un méto print(), que es este caso, recorrerá
toda la lista de la Pokedex, mostrando el nombre de cada Pokemon con la posición que
ocupa en la Pokedex.

### Clase Combate

Esta última clase representará el simulador de combate entre dos Pokemons, el cual
llevará acabo una batalla entre ambos siguiendo las normas del juego original, primero
va el más rápido, diferencia entre físico y especial, efectividad de unos tipos sobre
otros y conteo de la vida restante tras cada ataque. Todo esto mostrado por consola para
poder hacer un seguimiento del combate.

#### Constructor y propiedades

```typescript
constructor() {}
```
En este caso el objeto combate que sea creado no contará con ninguna propiedad y por 
lo tanto el constructor estará vacio, ya que todas las funciones de la clase trabajarán
con datos de otras clases o serán meramente de visualización.

#### Función efectividad()

En este caso comenzará la explicación de las funciones por la última, ya que las demás
harán uso de otras como esta que previamente han de ser explicadas.
```typescript
  efectividad(firstPokeType : string, secondPokeType : string) {
    let multiplicador = 1;
    switch (firstPokeType) {
      case Types[0]:
        if (secondPokeType === Types[0] || secondPokeType === Types[1] ||
          secondPokeType === Types[4] || secondPokeType === Types[6]) {
          multiplicador = 1/2;
        } else if (secondPokeType === Types[7] || secondPokeType === Types[8] ||
          secondPokeType === Types[13]) multiplicador = 2;
        break;

      case Types[1]:
        if (secondPokeType === Types[1] || secondPokeType === Types[3] ||
          secondPokeType === Types[11]) multiplicador = 1/2;
        else if (secondPokeType === Types[6] || secondPokeType === Types[13] ||
          secondPokeType === Types[15]) multiplicador = 2;
        break;

      case Types[2]:
        if (secondPokeType === Types[0] || secondPokeType === Types[5] ||
          secondPokeType === Types[6] || secondPokeType === Types[7] ||
          secondPokeType === Types[9] || secondPokeType === Types[16] ||
          secondPokeType === Types[17]) multiplicador = 1/2;
        else if (secondPokeType === Types[11] || secondPokeType === Types[12] ||
          secondPokeType === Types[14]) multiplicador = 2;
        break;

      case Types[3]:
        if (secondPokeType === Types[0]) multiplicador = 1/2;
        else if (secondPokeType === Types[3]) multiplicador = 2;
        else if (secondPokeType === Types[7]) multiplicador = 0;
        break;

      case Types[4]:
        if (secondPokeType === Types[3] || secondPokeType === Types[4] ||
          secondPokeType === Types[11]) multiplicador = 1/2;
        else if (secondPokeType === Types[1] || secondPokeType === Types[17]) {
          multiplicador = 2;
        } else if (secondPokeType === Types[15]) multiplicador = 0;
        break;

      case Types[5]:
        if (secondPokeType === Types[14]) multiplicador = 1/2;
        else if (secondPokeType === Types[5] || secondPokeType === Types[12]) {
          multiplicador = 2;
        } else if (secondPokeType === Types[10]) multiplicador = 0;
        break;

      case Types[6]:
        if (secondPokeType === Types[1] || secondPokeType === Types[3] ||
          secondPokeType === Types[6] || secondPokeType === Types[13]) {
          multiplicador = 1/2;
        } else if (secondPokeType === Types[0] || secondPokeType === Types[2] ||
          secondPokeType === Types[8] || secondPokeType === Types[11]) {
          multiplicador = 2;
        }
        break;

      case Types[7]:
        if (secondPokeType === Types[0] || secondPokeType === Types[6] ||
          secondPokeType === Types[16]) multiplicador = 1/2;
        else if (secondPokeType === Types[3] || secondPokeType === Types[9] ||
          secondPokeType === Types[14]) multiplicador = 2;
        break;

      case Types[8]:
        if (secondPokeType === Types[0] || secondPokeType === Types[1] ||
          secondPokeType === Types[6] || secondPokeType === Types[8]) {
          multiplicador = 1/2;
        } else if (secondPokeType === Types[3] || secondPokeType ===Types[11] ||
          secondPokeType === Types[15] || secondPokeType === Types[17]) {
          multiplicador = 2;
        }
        break;

      case Types[9]:
        if (secondPokeType === Types[2] || secondPokeType === Types[7] ||
          secondPokeType === Types[12] || secondPokeType === Types[16] ||
          secondPokeType === Types[17]) multiplicador = 1/2;
        else if (secondPokeType === Types[0] || secondPokeType === Types[8] ||
          secondPokeType === Types[10] || secondPokeType === Types[13] ||
          secondPokeType === Types[14]) multiplicador = 2;
        else if (secondPokeType === Types[5]) multiplicador = 0;
        break;

      case Types[10]:
        if (secondPokeType === Types[0] || secondPokeType === Types[13]) {
          multiplicador = 1/2;
        } else if (secondPokeType === Types[5]) multiplicador = 0;
        break;

      case Types[11]:
        if (secondPokeType === Types[0] || secondPokeType === Types[2] ||
          secondPokeType === Types[3] || secondPokeType === Types[6] ||
          secondPokeType === Types[11] || secondPokeType === Types[16] ||
          secondPokeType === Types[17]) multiplicador = 1/2;
        else if (secondPokeType === Types[1] || secondPokeType === Types[13] ||
          secondPokeType === Types[15]) multiplicador = 2;
        break;

      case Types[12]:
        if (secondPokeType === Types[0] || secondPokeType === Types[12]) {
          multiplicador = 1/2;
        } else if (secondPokeType === Types[9] || secondPokeType ===Types[16]) {
          multiplicador = 2;
        } else if (secondPokeType === Types[14]) multiplicador = 0;
        break;

      case Types[13]:
        if (secondPokeType === Types[0] || secondPokeType === Types[9] ||
          secondPokeType === Types[15]) multiplicador = 1/2;
        else if (secondPokeType === Types[2] || secondPokeType === Types[6] ||
          secondPokeType === Types[8] || secondPokeType === Types[17]) {
          multiplicador = 2;
        }
        break;

      case Types[14]:
        if (secondPokeType === Types[7] || secondPokeType === Types[9] ||
          secondPokeType === Types[14]) multiplicador = 1/2;
        else if (secondPokeType === Types[5] || secondPokeType === Types[12]) {
          multiplicador = 2;
        }
        break;

      case Types[15]:
        if (secondPokeType === Types[2] || secondPokeType === Types[11]) {
          multiplicador = 1/2;
        } else if (secondPokeType === Types[0] || secondPokeType === Types[4] ||
          secondPokeType === Types[6] || secondPokeType === Types[13] ||
          secondPokeType === Types[16]) multiplicador = 2;
        else if (secondPokeType === Types[17]) multiplicador = 0;
        break;

      case Types[16]:
        if (secondPokeType === Types[5] || secondPokeType === Types[13] ||
          secondPokeType === Types[15] || secondPokeType === Types[16]) {
          multiplicador = 1/2;
        } else if (secondPokeType === Types[7] || secondPokeType ===Types[11]) {
          multiplicador = 2;
        } else if (secondPokeType === Types[0]) multiplicador = 0;
        break;

      case Types[17]:
        if (secondPokeType === Types[0] || secondPokeType === Types[4] ||
          secondPokeType === Types[13]) multiplicador = 1/2;
        else if (secondPokeType === Types[2] || secondPokeType === Types[9] ||
          secondPokeType === Types[11]) multiplicador = 2;
        break;
    }
    return multiplicador;
  }
```
La función de este método, a pesar de su longitud, es tan simple como calcular cual
será el multiplicador de efectividad teniendo en cuenta los tipos de los Pokemon,
dicho de otra forma, representa la famosa tabla de tipos. 

La función recibirá los dos tipos a comparar, siendo el primero el atacante, e irá
comprobando cual será el multiplicador que devolverá, 0 si no afecta, 1/2 si es poco 
eficaz, 1 si es neutro y 2 si es eficaz. Para ellos se usará un enumerado con todos
los tipos, lo cual facilitará las comparaciones.
```typescript
export enum Types {
  acero = 0,
  agua = 1,
  bicho = 2,
  dragón = 3,
  eléctrico = 4,
  fantasma = 5,
  fuego = 6,
  hada = 7,
  hielo = 8,
  lucha = 9,
  normal = 10,
  planta = 11,
  psíquico = 12,
  roca = 13,
  siniestro = 14,
  tierra = 15,
  veneno = 16,
  volador = 17
};
```
A continuación una serie de tests realizados para comprobar su correcto funcionamiento
teniendo en cuenta los Pokemons creados previamente:
```typescript
  it('typeOf and result efectividad()', () => {
    assert.typeOf(combate.efectividad(poke1.getType(),
        poke2.getSecondType()), 'number');
    assert.equal(combate.efectividad(poke1.getType(),
        poke2.getSecondType()), 2);
    assert.typeOf(combate.efectividad(poke1.getType(),
        poke2.getSecondType()), 'number');
    assert.equal(combate.efectividad(poke2.getType(),
        poke1.getType()), 1);
  });
```

#### Función physicalOrEspecial()

```typescript
  physicalOrEspecial(Poke : Pokemon) {
    if (Poke.getStats()[1][1] >= Poke.getStats()[3][1]) {
      return true;
    } else return false;
  }
```
Esta función se encargará de comprbar si el Pokémon que se le pasa como argumento es 
atacante físico o especial, devolviendo true y false respectivamente. A continuación 
una serie de tests realizados para comprobar su correcto funcionamiento teniendo en
cuenta los Pokemons creados previamente:
```typescript
  it('typeOf and result physicalOrEspecial()', () => {
    assert.typeOf(combate.physicalOrEspecial(poke1), 'boolean');
    assert.equal(combate.physicalOrEspecial(poke1), true);
    assert.typeOf(combate.physicalOrEspecial(poke2), 'boolean');
    assert.equal(combate.physicalOrEspecial(poke2), false);
  });
```

#### Función damageCalculator()

```typescript
  damageCalculator(firstPoke : Pokemon, secondPoke : Pokemon) {
    const vecDamage = [0, 0];
    const poeFirstPoke = this.physicalOrEspecial(firstPoke);
    const poeSecondtPoke = this.physicalOrEspecial(firstPoke);
    if (poeFirstPoke === true) {
      let damage = 50 * (firstPoke.getStats()[1][1] /
            secondPoke.getStats()[2][1]) * this.efectividad(firstPoke.getType(),
          secondPoke.getType());
      if (secondPoke.getSecondType() != undefined) {
        damage = damage * this.efectividad(firstPoke.getType(),
            secondPoke.getSecondType());
      }
      vecDamage[1] = damage;
    } else {
      let damage = 50 * (firstPoke.getStats()[3][1] /
            secondPoke.getStats()[4][1]) * this.efectividad(firstPoke.getType(),
          secondPoke.getType());
      if (secondPoke.getSecondType() != undefined) {
        damage = damage * this.efectividad(firstPoke.getType(),
            secondPoke.getSecondType());
      }
      vecDamage[1] = damage;
    }
    if (poeSecondtPoke === true) {
      let damage = 50 * (secondPoke.getStats()[1][1] /
            firstPoke.getStats()[2][1]) * this.efectividad(secondPoke.getType(),
          firstPoke.getType());
      if (firstPoke.getSecondType() != undefined) {
        damage = damage * this.efectividad(secondPoke.getType(),
            firstPoke.getSecondType());
      }
      vecDamage[0] = damage;
    } else {
      let damage = 50 * (secondPoke.getStats()[3][1] /
            firstPoke.getStats()[4][1]) * this.efectividad(secondPoke.getType(),
          firstPoke.getType());
      if (firstPoke.getSecondType() != undefined) {
        damage = damage * this.efectividad(secondPoke.getType(),
            firstPoke.getSecondType());
      }
      vecDamage[0] = damage;
    }
    return vecDamage;
  }
```
Esta función será la encargada de calcular el daño inflingido por ambos Pokemons en
un turno, devolviéndolo en un vector de dos posiciones donde la primera corresponderá
con el primer Pokemon del argumento, es decir el que ataca primero, y la segunda al 
otro Pokemon.

El código de la función está dividio en dos grandes bloques, un primero donde ataca 
el primer Pokemon, y otro segundo donde ataca el otro. Estos dos bloques a su vez 
tienen otra división, una en la cual el atacante es físico, por lo que se hacen los
cálculos con su ataque físico y la defensa física del defensor, y otra en la que el 
atacante es especial y se hacen los cálculos con su ataque especial y la defensa 
especial del defensor.

Como dato añadido, y teniendo en cuenta que a la hora de calcular el daño se hace una
llamada a la función efectividad() explicada previamente, pasándole los tipos principales
de cada Pokemon, hay que tener en cuenta que en caso de que el Pokemon defensor tenga
un segundo tipo, se hará una segunda llamada a la función efectividad() pero cambiando
el segundo argumento por el segundo tipo del defensor, provocando así situciones de
ataques muy efectivos (x4), muy poco efectivos (x1/4), o casos en que es muy efectivo
con el tipo principal pero al segundo no le afecta.

A continuación una serie de tests realizados para comprobar su correcto funcionamiento
teniendo en cuenta los Pokemons creados previamente:
```typescript
  it('typeOf and result damageCalculator()', () => {
    assert.typeOf(combate.damageCalculator(poke1, poke2)[0], 'number');
    assert.equal(combate.damageCalculator(poke1, poke2)[0], 74.58100558659217);
    assert.typeOf(combate.damageCalculator(poke1, poke2)[1], 'number');
    assert.equal(combate.damageCalculator(poke1, poke2)[1], 81.96078431372548);
  });
```

#### Función start()

```typescript
  start(firstPoke : Pokemon, secondPoke : Pokemon) {
    let firstPokeHP = firstPoke.getStats()[0][1];
    let secondPokeHP = secondPoke.getStats()[0][1];
    let turnCounter = 1;
    console.log(`\n${firstPoke.getName()} vs ${secondPoke.getName()}\n`);
    while (firstPokeHP > 0 && secondPokeHP > 0) {
      console.log(`- Turno ${turnCounter}`);
      if (firstPoke.getStats()[5][1] >= secondPoke.getStats()[5][1]) {
        const damage = this.damageCalculator(firstPoke, secondPoke);
        secondPokeHP = secondPokeHP - damage[1];
        if (secondPokeHP <= 0) {
          console.log(`${firstPoke.getName()} ataca causando
            ${damage[1]} puntos de daño, a ${secondPoke.getName()}
            no le quedan puntos de vida, se ha debilitado.`);
          break;
        }
        firstPokeHP = firstPokeHP - damage[0];
        if (firstPokeHP <= 0) {
          console.log(`${firstPoke.getName()} ataca causando
            ${damage[1]} puntos de daño, a ${secondPoke.getName()} 
            le quedan ${secondPokeHP} puntos de vida.`);
          console.log(`${secondPoke.getName()} ataca causando
            ${damage[0]} puntos de daño, a ${firstPoke.getName()}
            no le quedan puntos de vida, se ha debilitado.`);
          break;
        }
        if (damage[0] === 0 && damage[1] === 0) {
          console.log(`No se puede combatir ya que los tipos de
            ataque de ambos pokemon no afectan al rival`);
          break;
        }
        if (damage[1] === 0) {
          console.log(`${firstPoke.getName()} ataca, pero no
            le afecta a ${secondPoke.getName()}`);
        } else {
          console.log(`${firstPoke.getName()} ataca causando
          ${damage[1]} puntos de daño, a ${secondPoke.getName()} 
          le quedan ${secondPokeHP} puntos de vida.`);
        }
        if (damage[0] === 0) {
          console.log(`${secondPoke.getName()} ataca, pero no
            le afecta a ${firstPoke.getName()}`);
        } else {
          console.log(`${secondPoke.getName()} ataca causando
          ${damage[0]} puntos de daño, a ${firstPoke.getName()} 
          le quedan ${firstPokeHP} puntos de vida.`);
        }
      } else {
        const damage = this.damageCalculator(secondPoke, firstPoke);
        firstPokeHP = firstPokeHP - damage[1];
        if (firstPokeHP <= 0) {
          console.log(`${secondPoke.getName()} ataca causando
            ${damage[1]} puntos de daño, a ${firstPoke.getName()}
            no le quedan puntos de vida, se ha debilitado.`);
          break;
        }
        secondPokeHP = secondPokeHP - damage[0];
        if (secondPokeHP <= 0) {
          console.log(`${secondPoke.getName()} ataca causando
            ${damage[1]} puntos de daño, a ${firstPoke.getName()} 
            le quedan ${secondPokeHP} puntos de vida.`);
          console.log(`${firstPoke.getName()} ataca causando
            ${damage[0]} puntos de daño, a ${secondPoke.getName()}
            no le quedan puntos de vida, se ha debilitado.`);
          break;
        }
        if (damage[0] === 0 && damage[1] === 0) {
          console.log(`No se puede combatir ya que los tipos de
            ataque de ambos pokemon no afectan al rival`);
          break;
        }
        if (damage[1] === 0) {
          console.log(`${secondPoke.getName()} ataca, pero no
            le afecta a ${firstPoke.getName()}`);
        } else {
          console.log(`${secondPoke.getName()} ataca causando
          ${damage[1]} puntos de daño, a ${firstPoke.getName()} 
          le quedan ${firstPokeHP} puntos de vida.`);
        }
        if (damage[0] === 0) {
          console.log(`${firstPoke.getName()} ataca, pero no
            le afecta a ${secondPoke.getName()}`);
        } else {
          console.log(`${firstPoke.getName()} ataca causando
          ${damage[0]} puntos de daño, a ${secondPoke.getName()} 
          le quedan ${secondPokeHP} puntos de vida.`);
        }
      }
      turnCounter++;
    }
  }
```
Por último, esta función será la encargada de dirigir todo el combate, así como de 
informar al usuario del estado del mismo. En primer lugar, se crearán dos variables 
auxiliares que será iguales a la vida de cada Pokemon, y servirá para ir calculando
la vida restante durante el combate.

El código de esta función, al igual que la anterior, también est dividido en dos
grandes bloques, un primero en el que el primer Pokemon pasado como argumento es 
el más rapido, y por lo tanto ataca primero, y un segundo en el que pasa lo opuesto.

Al principio de cada bloque se creará una variable auxiliar daño, la cual almacenará
el valor devuelto por la función damageCalculator(), y que se usrá para calcular la 
vida restante de los Pokemons tras cada unos de los ataques, mostrando dicha
inteacción por consola.

De esta forma ya estría funcional el combate entre dos Pokemons, pero para que no
haya errores, hay que contemplar diferentes escenarios, como por ejemplo en el que
uno de los Pokemon no afecta al otro, por lo que causará 0 de daño y se deberá 
informar al usuario, o incluso que ninguno afecte al otro, por lo que se deberá 
finalizar el combate ya que se haría infinito. 

Hay que tener en cuetna también cuando uno de los dos Pokemons se debilita, ya que
no solo acabará el combate, sino que el mensaje al usuario será diferente. En este 
último caso hay que resaltar que si en el mismo turno ambos Pokemon se debilitarían,
solo se le restaŕa el daño al más lento, ya que no le dará tiempo a atacar, finalizando
así con el combate.

Todo este proceso se repetirá tantos turnos como hagan falta hata que uno de los 
combatientes se debilite.