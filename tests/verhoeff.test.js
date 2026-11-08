import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { validate, check, computeCheckDigit, VerhoeffError } from '../src/verhoeff.mjs';

describe('textbook', () => {
  it('236 takes check digit 3', () => {
    assert.equal(computeCheckDigit('236'), '3');
    assert.equal(validate('2363'), '2363');
  });
  it('catches single-digit errors and adjacent transpositions', () => {
    assert.equal(check('2364').code, 'BAD_CHECK');
    assert.equal(check('2633').code, 'BAD_CHECK'); // transposed 36->63
    assert.equal(check(' 2363 ').ok, true); // spaces tolerated
  });
});

describe('bounds', () => {
  it('rejects bad input', () => {
    assert.equal(check('12a4').code, 'BAD_CHARS');
    assert.equal(check('').code, 'EMPTY');
    assert.equal(check('1'.repeat(65)).code, 'TOO_LONG');
    assert.throws(() => computeCheckDigit('12a'), (e) => e.code === 'BAD_BASE');
    assert.ok(new VerhoeffError('X') instanceof Error);
  });
  it('round-trips generated numbers', () => {
    for (const base of ['0', '1', '847364', '12345678901234567890']) {
      assert.equal(validate(base + computeCheckDigit(base)), base + computeCheckDigit(base));
    }
  });
});
