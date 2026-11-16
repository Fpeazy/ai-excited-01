// ai-excited-01 entry. Node 22, standard library only.
// The entry's image lives in this repository as entry.png; this program
// places an exact copy of it at <output>/entry.png. Copying a fixed file
// means every run writes identical bytes: nothing is generated, nothing is
// fetched over the network, and the clock is never consulted.

import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const imagePath = join(here, 'entry.png');

const targetDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const targetPath = join(targetDir, 'entry.png');

// Guard: a truncated copy would hand the judge a broken image. The check
// compares the two files by size and fails loudly instead of shipping a
// half-written entry.
function assertCompleteCopy(sourcePath, destPath) {
  const originalBytes = statSync(sourcePath).size;
  const copiedBytes = statSync(destPath).size;
  if (copiedBytes !== originalBytes) {
    throw new Error(
      `entry.png copy is incomplete (${copiedBytes} of ${originalBytes} bytes)`,
    );
  }
}

mkdirSync(targetDir, { recursive: true });
copyFileSync(imagePath, targetPath);
assertCompleteCopy(imagePath, targetPath);
