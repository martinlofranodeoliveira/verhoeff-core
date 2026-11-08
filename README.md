# verhoeff-core

Verhoeff check digits: catches all single-digit errors and adjacent
transpositions. Zero runtime dependencies, Node >= 22.

Part of the LOFRANO TECNOLOGIA open-source lab. MIT.

```js
import { validate, computeCheckDigit } from './src/verhoeff.mjs';
computeCheckDigit('236'); // '3'
```

```sh
npm test          # 4 tests, node:test, no dependencies
npm run demo
```

At most 64 digits. MIT — see `LICENSE`.
[Versão em português](README.pt-BR.md).
