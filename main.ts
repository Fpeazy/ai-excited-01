// ai-excited-01 entry (Node 22, standard library only): the image this entry
// races with is entry.png beside this file, and this program copies it to
// the output directory as entry.png. It writes the same bytes every run:
// a plain copy of a fixed file, no generation, no network, no clock.

import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(OUTPUT_DIR, { recursive: true });
copyFileSync(
  new URL('./entry.png', import.meta.url),
  join(OUTPUT_DIR, 'entry.png'),
);
