// SPDX-License-Identifier: MIT
// Verhoeff check digits: catches all single-digit errors and adjacent
// transpositions via dihedral-group multiplication. Digits only.
// No network, no I/O.

export const MAX_LENGTH = 64;

const D = Object.freeze([
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
  [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
  [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
  [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
  [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
  [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
  [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
  [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
  [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
]);

const P = Object.freeze([
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
  [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
  [8, 9, 1, 6, 0, 4, 3, 7, 2, 5],
  [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
  [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
  [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
  [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
]);

const INV = Object.freeze([0, 4, 3, 2, 1, 5, 6, 7, 8, 9]);

export class VerhoeffError extends Error {
  constructor(code, detail = '') {
    super(detail ? `${code}: ${detail}` : code);
    this.name = 'VerhoeffError';
    this.code = code;
  }
}

function digitsOf(input) {
  if (typeof input !== 'string') throw new VerhoeffError('NOT_STRING');
  const t = input.replace(/[\s-]+/g, '');
  if (t.length === 0) throw new VerhoeffError('EMPTY');
  if (!/^[0-9]+$/.test(t)) throw new VerhoeffError('BAD_CHARS');
  if (t.length > MAX_LENGTH) throw new VerhoeffError('TOO_LONG');
  return t;
}

function checksum(digits) {
  let c = 0;
  const ds = [...digits].reverse().map(Number);
  for (let i = 0; i < ds.length; i++) c = D[c][P[i % 8][ds[i]]];
  return c;
}

/** Validate a full number (check digit included). Returns normalized digits. */
export function validate(input) {
  const d = digitsOf(input);
  if (checksum(d) !== 0) throw new VerhoeffError('BAD_CHECK');
  return d;
}

/** Non-throwing: { ok:true, digits } or { ok:false, code }. */
export function check(input) {
  try {
    return { ok: true, digits: validate(input) };
  } catch (err) {
    if (err instanceof VerhoeffError) return { ok: false, code: err.code };
    throw err;
  }
}

/** Compute the check digit for a base (without it). */
export function computeCheckDigit(base) {
  if (typeof base !== 'string' || !/^[0-9]+$/.test(base.replace(/[\s-]+/g, ''))) {
    throw new VerhoeffError('BAD_BASE');
  }
  const d = base.replace(/[\s-]+/g, '');
  if (d.length === 0 || d.length + 1 > MAX_LENGTH) throw new VerhoeffError('BAD_BASE');
  // Generation uses position-shifted permutation (appended zero placeholder).
  let c = 0;
  const ds = [...d].reverse().map(Number);
  for (let i = 0; i < ds.length; i++) c = D[c][P[(i + 1) % 8][ds[i]]];
  return String(INV[c]);
}
