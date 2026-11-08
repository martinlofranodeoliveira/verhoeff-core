#!/usr/bin/env node
// Demo: textbook example, asserts exact output. --assert exits non-zero on mismatch.
import { computeCheckDigit, validate } from '../src/verhoeff.mjs';

let failed = 0;
const cd = computeCheckDigit('236');
const pass = cd === '3' && validate('236' + cd) === '2363';
console.log(`${pass ? 'PASS' : 'FAIL'} 236 -> check ${cd}`);
if (!pass) failed++;
if (process.argv.includes('--assert') && failed > 0) process.exit(1);
if (failed > 0) process.exitCode = 1;
console.log(failed === 0 ? 'demo: all cases as expected' : `demo: ${failed} mismatch(es)`);
