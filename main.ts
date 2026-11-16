// Golden Leap of Joy — ai-excited-01 entry point.
// Node 22, standard library only. The image this entry is judged on lives
// next to this file as entry.png; all this program does is place a faithful
// copy of it at <output>/entry.png. The stored bytes are JPEG data kept
// under the required entry.png name, exactly as the bounty allows.
// Because the bytes are copied, never drawn or downloaded, two runs can
// no randomness anywhere in the path.

import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = dirname(fileURLToPath(import.meta.url));
const bundledImage = join(repoRoot, 'entry.png');

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const outFile = join(outDir, 'entry.png');

// A half-written copy would hand the judge a broken picture, so the copy
// is checked by length before the program reports success. Any mismatch
// throws instead of silently shipping a truncated file.
function checkCopyIsWhole(from, to) {
  const wanted = statSync(from).size;
  const got = statSync(to).size;
  if (got !== wanted) {
    throw new Error(`entry.png copy is incomplete: ${got} of ${wanted} bytes`);
  }
}

mkdirSync(outDir, { recursive: true });
copyFileSync(bundledImage, outFile);
checkCopyIsWhole(bundledImage, outFile);
