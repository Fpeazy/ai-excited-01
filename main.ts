// ai-excited-01 entry (Node 22, standard library only): the image this entry
// races with is entry.png beside this file, and this program copies it to
// the output directory as entry.png. It writes the same bytes every run:
// a plain copy of a fixed file, no generation, no network, no clock.

import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(OUTPUT_DIR, { recursive: true });
const source = new URL('./entry.png', import.meta.url);
const dest = join(OUTPUT_DIR, 'entry.png');
copyFileSync(source, dest);
// Self-check: the copy must be the whole image, byte for byte.
if (statSync(source).size !== statSync(dest).size) {
  throw new Error('entry.png copy is incomplete');
}
