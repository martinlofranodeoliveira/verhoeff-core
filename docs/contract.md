# Contract — verhoeff-core

Pure ESM in `src/verhoeff.mjs`, zero runtime dependencies, Node >= 22.
Canonical D5 tables (d/p/inv per Wikipedia/Verhoeff 1969); column
uniqueness verified in tests so every base has exactly one check digit.

| Export | Result |
| --- | --- |
| `MAX_LENGTH` (64 digits) | Hard bound. |
| `validate(input)` | Normalized digits or throws. Spaces/hyphens tolerated. |
| `check(input)` | `{ ok:true, digits }` or `{ ok:false, code }`. |
| `computeCheckDigit(base)` | Single digit via shifted permutation + inverse table. |

Detects all single-digit errors and adjacent transpositions by
construction. Errors: `NOT_STRING` · `EMPTY` · `BAD_CHARS` ·
`TOO_LONG` · `BAD_CHECK` · `BAD_BASE`.
