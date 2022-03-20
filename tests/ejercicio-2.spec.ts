import 'mocha';
import {assert} from 'chai';
import {Ficha} from '../src/ejercicio-2';
import {Tablero} from '../src/ejercicio-2';

const ficha = new Ficha(true);
ficha.setOwner(true);

const tab = new Tablero();

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

describe('Tablero class test', () => {
  it('typeOf and result insert()', () => {
    assert.typeOf(tab.insert(4, true), 'boolean');
    assert.equal(tab.insert(4, true), true);
  });
  it('typeOf and result check()', () => {
    assert.typeOf(tab.check(1, 4), 'boolean');
    assert.equal(tab.check(1, 4), false);
  });
  it('typeOf and result win()', () => {
    assert.typeOf(tab.win(1, 4, 1, 's'), 'number');
    assert.equal(tab.win(1, 4, 1, 's'), 2);
  });
});
