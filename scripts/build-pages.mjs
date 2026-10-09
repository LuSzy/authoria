import { copyFile, mkdir, readFile, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';

const root = new URL('../', import.meta.url);
const files = ['index.html', 'style.css', 'app.js', 'writing.js', 'collaboration.js'];
const html = await readFile(new URL('dist/index.html', root), 'utf8');

// Relative URLs support both / and /repository-name/ without rewriting the UI.
for (const [, reference] of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
  if (reference.startsWith('#')) continue;
  assert(files.includes(reference), `Unexpected asset reference: ${reference}`);
  const resolved = new URL(reference, 'https://example.github.io/authoria-prototype/');
  assert(resolved.pathname.startsWith('/authoria-prototype/'));
}
for (const file of files.filter(file => file.endsWith('.js'))) {
  const result = spawnSync(process.execPath, ['--check', fileURLToPath(new URL(`dist/${file}`, root))], { stdio: 'inherit' });
  assert.equal(result.status, 0, `JavaScript syntax check failed: ${file}`);
}

// Explicit allowlist keeps repository metadata and unrelated files out of Pages.
await rm(new URL('_site/', root), { recursive: true, force: true });
await mkdir(new URL('_site/', root));
for (const file of files) {
  const source = new URL(`dist/${file}`, root);
  const target = new URL(`_site/${file}`, root);
  await copyFile(source, target);
  assert((await readFile(source)).equals(await readFile(target)));
}
console.log('Pages build passed: 5 unchanged static files; relative asset paths verified.');
