import 'mocha';
import {assert} from 'chai';
import {Hexadecimal} from '../src/ejercicio-pe';

const myFirst = new Hexadecimal(23);
const mySecond = new Hexadecimal(15);

describe('Hexadecimal function test', () => {
  it('typeOf and result valueOf()', () => {
    assert.typeOf(myFirst.valueOf(), 'number');
    assert.equal(myFirst.valueOf(), 23);
    assert.typeOf(mySecond.valueOf(), 'number');
    assert.equal(mySecond.valueOf(), 15);
  });
  it('typeOf and result toStringH()', () => {
    assert.typeOf(myFirst.toStringH(), 'string');
    assert.equal(myFirst.toStringH(), '17');
    assert.typeOf(mySecond.toStringH(), 'string');
    assert.equal(mySecond.toStringH(), 'f');
  });
  it('typeOf y result myFirst.add(mySecond)', () => {
    assert.typeOf(myFirst.toStringH(), 'string');
    assert.equal(myFirst.toStringH(), '17');
    assert.typeOf(mySecond.toStringH(), 'string');
    assert.equal(mySecond.toStringH(), 'f');
  });
  it('typeOf y result myFirst.add(mySecond)', () => {
    assert.typeOf(myFirst.add(mySecond).toStringH(), 'string');
    assert.equal(myFirst.add(mySecond).toStringH(), '26');
    assert.typeOf(myFirst.add(mySecond).valueOf(), 'number');
    assert.equal(myFirst.add(mySecond).valueOf(), 38);
  });
  it('typeOf y result myFirst.substrac(mySecond)', () => {
    assert.typeOf(myFirst.substrac(mySecond).toStringH(), 'string');
    assert.equal(myFirst.substrac(mySecond).toStringH(), '8');
    assert.typeOf(myFirst.substrac(mySecond).valueOf(), 'number');
    assert.equal(myFirst.substrac(mySecond).valueOf(), 8);
  });
  it('typeOf y result myFirst.parse(0x26)', () => {
    assert.typeOf(myFirst.parse('0x26'), 'number');
    assert.equal(myFirst.parse('0x26'), 38);
  });
});
