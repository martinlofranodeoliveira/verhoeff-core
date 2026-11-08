# Design — verhoeff-core

Dihedral-group multiplication walks the reversed digits with a
position-dependent permutation; validity is checksum zero. Generation
shifts positions by one (as if appending) and inverts — the tables make
exactly one digit validate, pinned by a uniqueness sweep in review.

Oracle: textbook 236→3, transposition traps, long-number round-trips,
plus a column-uniqueness audit that caught two mistyped rows during
development (fixed against the canonical tables). Luhn-detectable
errors are a subset; twin/jump errors mostly caught, not guaranteed.
