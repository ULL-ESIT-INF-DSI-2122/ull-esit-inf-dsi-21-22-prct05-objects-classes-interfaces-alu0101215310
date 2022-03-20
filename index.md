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
const pokedex = new Pokedex();
pokedex.addPokemon(poke1);
pokedex.addPokemon(poke2);

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
const combate = new Combat();

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

## Ejercicio 2 - Conecta 4

Para este segundo ejercicio deberemos desarrollar una serie de clases necesarias para
poder implementar el típico juego conecta 4. Dicho juego se llevará a cabo por turnos
entre dos jugadores, los cuales tenddrán que ir introduciendo por consola la posición
en la que van a querer jugar sus fichas, pudiendo ver en todo momento como se encuentra
el tablero de juego. El objetivo de cada jugador, como su nombre indica, es conseguir concatenar 4 fichas en cualquiera de las direcciones.

### Clase Ficha

Para lograr el objetivo anterior, empezaremos creando una clase que sea capaz de 
representar las fichas que se usan en el juego. Dicho objeto deberá ser capaz de 
mostrar si esta en juego o no, y a quien pertenece.

#### Constructor y propiedades

```typescript
  private owner : boolean;

  constructor(private fill : boolean) {}
```
A la hora de crear un objet ficha deberemos especificar si queremos que la ficha
forme parte del juego, es decir, que tenga contenido, o no, por ello cuando se hace una
llamada constructor se le pasa un boolean, el cual se asignará a su propiedad privada
fill que determinará lo mencionado previamente. Además la ficha también cuenta con 
otra propiedad privada de tipo boolean que determinará que jugador pertenece, siendo
true una ficha del jugador 1, y false del jugador 2.

#### Seters y Geters

```typescript
  setFill(state : boolean) {
    this.fill = state;
  }
  getFill() {
    return this.fill;
  }

  setOwner(player : boolean) {
    this.owner = player;
  }
  getOwner() {
    return this.owner;
  }
```
Como únicas funciones de la cllase cnos encontramos con una serie de seters y geters que
permitirán definir u obtener el valor de las propiedades de la clase.A continuación una serie de tests realizados para comprobar su correcto funcionamiento:
```typescript
const ficha = new Ficha(true);
ficha.setOwner(true);

describe('Ficha class test', () => {
  it('typeOf and result getFill()', () => {
    assert.typeOf(ficha.getFill(), 'boolean');
    assert.equal(ficha.getFill(), true);
  });
  it('typeOf and result getOwner()', () => {
    assert.typeOf(ficha.getOwner(), 'boolean');
    assert.equal(ficha.getOwner(), true);
  });
});
```

### Clase Tablero

Como segunda clase nos encontramos con una capaz de crear un objeto que representa
un tablero de dimensiones 6x7 donde se llevará a cabo el juego. Es necesario que 
el tablero esté formado de objetos tipo Ficha y que los usuarios puedan interactuar
con él durante la partida, añadiendo sus fichas en turnos alternos y recibiendo
en todo momento la información necesaria para el juego, así como la resolución
de la partida una vez haya confirmado que ha finalizado.

#### Constructor y propiedades
```typescript
  private tab : wallet[] = [];
  private winner : boolean;

  constructor() {
    for (let i = 0; i < 6; i++) {
      const col : Ficha[] = [];
      for (let j = 0; j < 7; j++) col.push(new Ficha(false));
      this.tab.push(col);
    }
  }
```
El obejeto creado que represente el tablero de juego deberá tener una dimensión de 
6x7, por ello a la hora de llamar al constructor,mediante el uso de unas variables 
auxiliares, inicializará su propiedad privada tab para que cumpla con este requisito. 
Hay que destacar que la propiedad tab es un vector de un tipo de dato creado, el cual 
representa un vector de Ficha, por lo que estaríamos hablando de un vector de vectores
de tipo Ficha.
```typescript
export type wallet = Ficha[]
```
Como se explicaba previamente, el juego se lleva a cabo entre dos jugadores, los cuales
están reresentado con un true y un false. Teniendo esto en cuenta vemos que el objeto
Tablero también cuenta con una propiedad privada llamada winner, la cual es de tipo 
boolean y representará quien es el ganador de la partida.

#### Función print()

De forma similar al ejercicio anterior, se empezarán explicando los métodos de abajo
hacia arriba con el fin de entender las llamadas a dichas funciones por parte de las
que ocupan las primeras posiciones.
```typescript
  print() {
    const x:string[] = [];
    this.tab.forEach((row) => {
      let y = '';
      row.forEach((col) => {
        if (col.getFill() === false) y += ' - ';
        else if (col.getOwner() === false) y += ' ○ ';
        else y += ' ● ';
      });
      x.push(y);
    });
    x.reverse();
    console.log(x);
  }
```
La clase cuenta con una función print(), la cual se encargará de recorrer las diferentes
posiciones del tablero, y mediante unas variables auxiliares ir gruardando el estado
de la ficha. En caso de que la ficha este vacía, se almacenará un guión medio, en caso 
opuesto se consultará a quien pertenece, diferenciando círculos rellenos para el 
primer jugador y círculos vacíos para el segundo. Por último se muestra por pantalla
tras darle la vuelta para que obtenga la forma deseada.

#### Función win()

```typescript
  win(x : number, y : number, counter : number, dir : string) {
    if (dir === direction[0] && x != 5) {
      if (this.tab[x + 1][y].getOwner() === this.tab[x][y].getOwner()) {
        counter += this.win(x + 1, y, counter, direction[0]);
      }
    }
    if (dir === direction[1] && x != 5 && y != 6) {
      if (this.tab[x + 1][y + 1].getOwner() === this.tab[x][y].getOwner()) {
        counter += this.win(x + 1, y + 1, counter, direction[1]);
      }
    }
    if (dir === direction[2] && x != 5 && y != 0) {
      if (this.tab[x + 1][y - 1].getOwner() === this.tab[x][y].getOwner()) {
        counter += this.win(x + 1, y - 1, counter, direction[2]);
      }
    }
    if (dir === direction[3] && y != 6) {
      if (this.tab[x][y + 1].getOwner() === this.tab[x][y].getOwner()) {
        counter += this.win(x, y + 1, counter, direction[3]);
      }
    }
    if (dir === direction[4] && y != 0) {
      if (this.tab[x][y - 1].getOwner() === this.tab[x][y].getOwner()) {
        counter += this.win(x, y - 1, counter, direction[4]);
      }
    }
    if (dir === direction[5] && x != 0) {
      if (this.tab[x - 1][y].getOwner() === this.tab[x][y].getOwner()) {
        counter += this.win(x - 1, y, counter, direction[5]);
      }
    }
    if (dir === direction[6] && x != 0 && y != 6) {
      if (this.tab[x - 1][y + 1].getOwner() === this.tab[x][y].getOwner()) {
        counter += this.win(x - 1, y + 1, counter, direction[6]);
      }
    }
    if (dir === direction[7] && x != 0 && y != 0) {
      if (this.tab[x - 1][y - 1].getOwner() === this.tab[x][y].getOwner()) {
        counter += this.win(x - 1, y - 1, counter, direction[7]);
      }
    }
    return counter;
  }
```
La función win() se trata de una función recursiva que llevará el conteo de cuantas
fichas de forma consecutiva, pretenecientes al mismo jugador, hay en el tablero.

Para ello recibirá la posición a analizar, un contador y una dirección, esta última 
definida mediante un enumerado. 
```typescript
export enum direction {
  n = 0,
  ne = 1,
  no = 2,
  e = 3,
  o = 4,
  s = 5,
  se = 6,
  so = 7
}
```
El contador en primer lugar siempre será 1, ya que esta función es invocada por una 
primera ficha, y la dirección será la misma que se comprobó para ser invocada (se 
explica mejor en la función check). El método tendrá que comprobar si la ficha que 
sigue la dirección que se le dio es del mismo propietario, y si es así llamar a la 
función de nuevo. Este proceso se repetirá hasata que esta condicion no se cumpla, 
evolviendo de esta forma la suma de todas las veces que se ha invocado esta función 
más el contaor inicial.

A continuación una serie de tests realizados para comprobar su correcto funcionamiento:
```typescript
  const tab = new Tablero();

  it('typeOf and result win()', () => {
    assert.typeOf(tab.win(1, 4, 1, 's'), 'number');
    assert.equal(tab.win(1, 4, 1, 's'), 2);
  });
```

#### Función check()

```typescript
check(x : number, y : number) {
    let counter: number = 1;
    if (x != 5) {
      if (this.tab[x + 1][y].getOwner() === this.tab[x][y].getOwner()) {
        if (counter <= this.win(x + 1, y, 1, direction[0])) {
          counter = this.win(x + 1, y, 1, direction[0]) + 1;
        }
      }
    }
    if (x != 5 && y != 6) {
      if (this.tab[x + 1][y + 1].getOwner() === this.tab[x][y].getOwner()) {
        if (counter <= this.win(x + 1, y + 1, 1, direction[1])) {
          counter = this.win(x + 1, y + 1, 1, direction[1]) + 1;
        }
      }
    }
    if (x != 5 && y != 0) {
      if (this.tab[x + 1][y - 1].getOwner() === this.tab[x][y].getOwner()) {
        if (counter <= this.win(x + 1, y - 1, 1, direction[2])) {
          counter = this.win(x + 1, y - 1, 1, direction[2]) + 1;
        }
      }
    }
    if (y != 6) {
      if (this.tab[x][y + 1].getOwner() === this.tab[x][y].getOwner()) {
        if (counter <= this.win(x, y + 1, 1, direction[3])) {
          counter = this.win(x, y + 1, 1, direction[3]) + 1;
        }
      }
    }
    if (y != 0) {
      if (this.tab[x][y - 1].getOwner() === this.tab[x][y].getOwner()) {
        if (counter <= this.win(x, y - 1, 1, direction[4])) {
          counter = this.win(x, y - 1, 1, direction[4]) + 1;
        }
      }
    }
    if (x != 0) {
      if (this.tab[x - 1][y].getOwner() === this.tab[x][y].getOwner()) {
        if (counter <= this.win(x - 1, y, 1, direction[5])) {
          counter = this.win(x - 1, y, 1, direction[5]) + 1;
        }
      }
    }
    if (x != 0 && y != 6) {
      if (this.tab[x - 1][y + 1].getOwner() === this.tab[x][y].getOwner()) {
        if (counter <= this.win(x - 1, y + 1, 1, direction[6])) {
          counter = this.win(x - 1, y + 1, 1, direction[6]) + 1;
        }
      }
    }
    if (x != 0 && y != 0) {
      if (this.tab[x - 1][y - 1].getOwner() === this.tab[x][y].getOwner()) {
        if (counter <= this.win(x - 1, y - 1, 1, direction[7])) {
          counter = this.win(x - 1, y - 1, 1, direction[7]) + 1;
        }
      }
    }
    return (counter === 4) ? true : false;
  }
```
Esta función será la encargada de comprobar si algún jugador ha ganado. Para ello, a
partide la posición de una de las fichas deberá analizar todas las adyacentes y 
comprobar si pertenecen al mismo jugador.

Hay que tener en cuenta que no puedes visitar una posición que se encuentra fuera del
tablero, por lo que contando con ello, el método llamaría a la función win() a la que
le envíaría la posición que peretence al mismo propietario, con el fin de que el
resultado sea 4, o en su defecto mayor que en cualquier otra dirección.

Una ve ha analizado todas las posiciones comprobará si el contador de fichas consecutivas
es igual a 4, en cuyo caso devolverá true, habiendo encontrado un resultado ganador. En 
defecto devolverá false. A continuación una serie de tests realizados para comprobar su 
correcto funcionamiento:
```typescript
  it('typeOf and result check()', () => {
    assert.typeOf(tab.check(1, 4), 'boolean');
    assert.equal(tab.check(1, 4), false);
  });
``` 

#### Función insert()

```typescript
  insert(pos : number, prop : boolean) {
    let confirm : boolean = false;
    let row : number;
    for (let i = 0; i < 6; i++) {
      if (this.tab[i][pos - 1].getFill() === false && confirm === false) {
        this.tab[i][pos - 1].setOwner(prop);
        this.tab[i][pos - 1].setFill(true);
        confirm = true;
        row = i;
        const posib = this.check(i, pos - 1);
        if (posib === true) this.winner = prop;
      }
    }
    return confirm;
  }
```
Esta función será la encargada de insertar las fichas en tablero. Para ello recibirá 
un número que indicará la columna en la que se debe insertar, y un boolean que 
coresponde al propietario de la ficha a insertar.
 
El método comprobará si la posición más baja de la columna esta vacía, si es así la 
llenará con la ficha del jugador que la haya puesto, confirmará la jugada y 
posteriormente invocará a la función check para comprobar si se ha completado el 4
en raya. De ser así se asignaría la true o false a la propiedad del table winner, 
representando así al ganador. 
  
En caso de que la posición más baja de la coumna esté ocupada, irá suiendo fila a 
fila buscando hueco hasta encontrarlo y realizar todo lo anterior. La función 
devolverá true o false dependiendo de si la ficha se insertó o no (por ejemplo si
está la columna llena no se podrá guardar ahí). A continuación una serie de tests 
realizados para comprobar su correcto funcionamiento:
```typescript
  it('typeOf and result insert()', () => {
    assert.typeOf(tab.insert(4, true), 'boolean');
    assert.equal(tab.insert(4, true), true);
  });
```

#### Función wallets()

```typescript
  wallets() {
    const fichasPlayer : wallet[] = [];
    const firstPlayer : Ficha[] = [];
    const secondPlayer : Ficha[] = [];
    for (let i = 0; i < 21; i++) {
      const ficha = new Ficha(true);
      ficha.setOwner(true);
      firstPlayer.push(ficha);
    }
    for (let i = 0; i < 21; i++) {
      const ficha = new Ficha(true);
      ficha.setOwner(false);
      secondPlayer.push(ficha);
    }
    fichasPlayer.push(firstPlayer);
    fichasPlayer.push(secondPlayer);
    return fichasPlayer;
  }
```
Esta función se encargará de generar y devolver un vector de Wallet (tipo de dato 
creado) de dos posiciones que representará las fichas de cada jugador. En cada uno
de los dos vectores de Fichas se almacenarán 21 de ellas, teniendo en cuenta que en
la primera posición el propietario será true, y en la segunda será false.

#### Función game()

```typescript
game() {
    const scanf = require('scanf');
    const firstPlayerWin : boolean = false;
    const secondPlayerWin : boolean = false;
    const fichasJuego = this.wallets();
    let confirm : boolean = false;
    let counter : number = 1;
    while (firstPlayerWin === false && secondPlayerWin === false &&
      fichasJuego[0].length != 0 && fichasJuego[1].length != 0 &&
        this.winner === undefined) {
      console.log(`\nTurno ${counter}\n`);
      this.print();
      let firstPlay : number = 0;
      while (firstPlay < 1 || firstPlay > 7) {
        console.log('Jugador 1, selecciona una columna de la 1 a la 7: ');
        firstPlay = scanf('%d');
      }
      confirm = this.insert(firstPlay, true);
      while (confirm != true) {
        console.log('Esa columna está llena, selecciona otra: ');
        firstPlay = scanf('%d');
        while (firstPlay < 1 || firstPlay > 7) {
          console.log('Selecciona una columna de la 1 a la 7: ');
          firstPlay = scanf('%d');
        }
        confirm = this.insert(firstPlay, true);
      }
      fichasJuego[0].pop();
      counter++;
      if (this.winner === undefined) {
        console.log(`\nTurno ${counter}\n`);
        this.print();
        let secondPlay : number = 0;
        while (secondPlay < 1 || secondPlay > 7) {
          console.log('Jugador 2, selecciona una columna de la 1 a la 7: ');
          secondPlay = scanf('%d');
        }
        confirm = this.insert(secondPlay, false);
        while (confirm != true) {
          console.log('Esa columna está llena, selecciona otra: ');
          secondPlay = scanf('%d');
          while (secondPlay < 1 || secondPlay > 7) {
            console.log('Selecciona una columna de la 1 a la 7: ');
            secondPlay = scanf('%d');
          }
          confirm = this.insert(secondPlay, false);
        }
        fichasJuego[1].pop();
      }
      counter++;
    }
    this.print();
    if (fichasJuego[0].length != 0 && fichasJuego[1].length != 0) {
      return (this.winner === true) ?
        console.log(`\nGanó el jugador 1\n`) :
        console.log(`\nGanó el jugador 2\n`);
    } else return console.log(`\nHa habido un empate\n`);
  }
```
Esta función será la encargada de llevar el desarrollo del juego. Comienza con la 
declaración de una serie de variables auxiliares que servirán para controlar el 
juego, además de la creación de las carteras de fichas de ambos jugadores.

El resto del código consta de un bucle que se repetirá hasta que haya un ganador o
hasta que los jugadores se queden sin fichas. El bucle se puede dividir en dos grande
bloques, un primero en que juega el primer jugador, y otro en el que juega el segundo.

Al principio del turno de cada jugador se le mostrará el estado del tablero mediante
el uso de la función print(), y seguidamente se le pedirá que introduza por teclado 
la columna en la que querrá jugar su ficha mediante el métdo scanf(). Hay que tener en
cuenta que la columna debe tener un valor entre 1 y 7, y que en caso contrario se 
repetirá la petición hasta que el valor sea válido. Una vez se reciba el valor, este
se pasará a la función insert la cual devolverá true si se ha efectuado correctamente, 
y false si la columna estaba llena, pidiendo una nueva columna al jugador.

El turno de cada jugador finalizará eliminando una ficha de su monedero y comprobando 
si se ha establecido un gandor (en tal caso se acaba el juego sin que juegue nadie más).
Finalmente se muestra por pantalla el tablero final y se señala al vencedor, o en su
defecto, que la partida ha acabado en empate.