import 'mocha';
import {assert} from 'chai';
import {Types} from '../src/ejercicio-1';
import {Pokemon} from '../src/ejercicio-1';
import {Pokedex} from '../src/ejercicio-1';
import {Combat} from '../src/ejercicio-1';

const pokedex = new Pokedex();
const combate = new Combat();

const poke1 = new Pokemon('Pikachu');
poke1.setType(Types.eléctrico);
poke1.setHeight(40);
poke1.setWeight(6);
poke1.setStats([274, 209, 179, 199, 199, 279]);
pokedex.addPokemon(poke1);

const poke2 = new Pokemon('Charizard');
poke2.setType(Types.fuego);
poke2.setSecondType(Types.volador);
poke2.setHeight(170);
poke2.setWeight(90.5);
poke2.setStats([360, 267, 255, 317, 269, 299]);
pokedex.addPokemon(poke2);

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

describe('Pokedex class test', () => {
  it('typeOf and result selectPoke()', () => {
    assert.typeOf(pokedex.selectPoke(1).getName(), 'string');
    assert.equal(pokedex.selectPoke(1).getName(), 'Pikachu');
    assert.typeOf(pokedex.selectPoke(2).getName(), 'string');
    assert.equal(pokedex.selectPoke(2).getName(), 'Charizard');
  });
});

describe('Combat class test', () => {
  it('typeOf and result damageCalculator()', () => {
    assert.typeOf(combate.damageCalculator(poke1, poke2)[0], 'number');
    assert.equal(combate.damageCalculator(poke1, poke2)[0], 74.58100558659217);
    assert.typeOf(combate.damageCalculator(poke1, poke2)[1], 'number');
    assert.equal(combate.damageCalculator(poke1, poke2)[1], 81.96078431372548);
  });
  it('typeOf and result physicalOrEspecial()', () => {
    assert.typeOf(combate.physicalOrEspecial(poke1), 'boolean');
    assert.equal(combate.physicalOrEspecial(poke1), true);
    assert.typeOf(combate.physicalOrEspecial(poke2), 'boolean');
    assert.equal(combate.physicalOrEspecial(poke2), false);
  });
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
});
