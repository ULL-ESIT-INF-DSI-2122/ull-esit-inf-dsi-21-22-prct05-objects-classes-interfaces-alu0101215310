/* eslint-disable no-unused-vars */
enum Types {
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

enum TypeStats {
  puntosDeSalud = 0,
  ataque = 1,
  defensa = 2,
  ataqueEspecial = 3,
  defensaEspecial = 4,
  velocidad = 5
}

type Stats = [string, number];
type pokedexPos = [number, Pokemon];

class Pokemon {
  private pokemonType : string;
  private pokemonSecondType : string;
  private pokemonHeight : number;
  private pokemonWeight : number;
  private pokemonStats : Stats[];

  constructor(private name : string) {};

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
};

class Pokedex {
  private list : pokedexPos[];

  constructor() {
    this.list = [];
  };

  addPokemon(poke : Pokemon) {
    this.list.push([this.list.length + 1, poke]);
  }

  selectPoke(pos : number) {
    return this.list[pos-1][1];
  }

  print() {
    console.log('POKEDEX');
    this.list.forEach((poke) => {
      console.log(`${poke[0]} - ${poke[1].getName()}`);
    });
  }
};

class Combat {
  constructor() {}

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

  physicalOrEspecial(Poke : Pokemon) {
    if (Poke.getStats()[1][1] >= Poke.getStats()[3][1]) {
      return true;
    } else return false;
  }

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
};

const pokedex = new Pokedex();
const combate = new Combat();

let poke = new Pokemon('Pikachu');
poke.setType(Types.eléctrico);
poke.setHeight(40);
poke.setWeight(6);
poke.setStats([274, 209, 179, 199, 199, 279]);
// poke.print();
pokedex.addPokemon(poke);

poke = new Pokemon('Charizard');
poke.setType(Types.fuego);
poke.setSecondType(Types.volador);
poke.setHeight(170);
poke.setWeight(90.5);
poke.setStats([360, 267, 255, 317, 269, 299]);
// poke.print();
pokedex.addPokemon(poke);

poke = new Pokemon('Venusaur');
poke.setType(Types.planta);
poke.setSecondType(Types.veneno);
poke.setHeight(200);
poke.setWeight(100);
poke.setStats([364, 263, 265, 299, 299, 259]);
// poke.print();
pokedex.addPokemon(poke);

poke = new Pokemon('Blastoise');
poke.setType(Types.agua);
poke.setHeight(160);
poke.setWeight(85.5);
poke.setStats([362, 265, 299, 269, 309, 255]);
// poke.print();
pokedex.addPokemon(poke);

poke = new Pokemon('Snorlax');
poke.setType(Types.normal);
poke.setHeight(210);
poke.setWeight(460);
poke.setStats([524, 319, 229, 229, 319, 159]);
// poke.print();
pokedex.addPokemon(poke);

poke = new Pokemon('Machamp');
poke.setType(Types.lucha);
poke.setHeight(160);
poke.setWeight(130);
poke.setStats([384, 359, 259, 229, 269, 209]);
// poke.print();
pokedex.addPokemon(poke);

poke = new Pokemon('Alakazam');
poke.setType(Types.psíquico);
poke.setHeight(150);
poke.setWeight(48);
poke.setStats([314, 199, 189, 369, 289, 339]);
// poke.print();
pokedex.addPokemon(poke);

poke = new Pokemon('Golem');
poke.setType(Types.roca);
poke.setSecondType(Types.tierra);
poke.setHeight(140);
poke.setWeight(300);
poke.setStats([364, 339, 359, 209, 229, 189]);
// poke.print();
pokedex.addPokemon(poke);

poke = new Pokemon('Gengar');
poke.setType(Types.fantasma);
poke.setSecondType(Types.veneno);
poke.setHeight(150);
poke.setWeight(40.5);
poke.setStats([324, 229, 219, 359, 249, 319]);
// poke.print();
pokedex.addPokemon(poke);

poke = new Pokemon('Dragonite');
poke.setType(Types.dragón);
poke.setSecondType(Types.volador);
poke.setHeight(220);
poke.setWeight(210);
poke.setStats([386, 367, 289, 299, 299, 259]);
// poke.print();
pokedex.addPokemon(poke);

// pokedex.print();

combate.start(pokedex.selectPoke(1), pokedex.selectPoke(4));
combate.start(pokedex.selectPoke(2), pokedex.selectPoke(6));
combate.start(pokedex.selectPoke(5), pokedex.selectPoke(9));
combate.start(pokedex.selectPoke(10), pokedex.selectPoke(8));
combate.start(pokedex.selectPoke(3), pokedex.selectPoke(7));
