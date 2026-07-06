import { existsSync } from 'node:fs';
import { mkdir, readdir, rename, rm } from 'node:fs/promises';
import { join } from 'node:path';

const publicDir = join(process.cwd(), '.output', 'public');
const staticDir = join(publicDir, 'static');

async function moveFile(from, to) {
    if (!existsSync(from)) {
        throw new Error(`postgenerate: expected file not found: ${from}`);
    }
    await mkdir(join(to, '..'), { recursive: true });
    await rename(from, to);
}

async function relocateErrorPages() {
    await moveFile(join(publicDir, '_gen', '403', 'index.html'), join(staticDir, '403.html'));
    await moveFile(join(publicDir, '_gen', '404', 'index.html'), join(staticDir, '404.html'));
    await rm(join(publicDir, '_gen'), { recursive: true, force: true });
}

async function relocateSpaFallback() {
    await moveFile(join(publicDir, '200.html'), join(staticDir, '200.html'));
}

async function removeStragglers() {
    // nitro's own error.vue-rendered 404.html at root is superseded by the
    // 403/404-code-aware pages relocated from _gen/, so drop it here.
    await rm(join(publicDir, '404.html'), { force: true });
    await rm(join(publicDir, '_payload.json'), { force: true });

    const entries = await readdir(publicDir);
    for (const entry of entries) {
        if (entry === 'index.html' || entry === 'static') {
            continue;
        }
        await rm(join(publicDir, entry), { recursive: true, force: true });
    }
}

async function main() {
    await relocateErrorPages();
    await relocateSpaFallback();
    await removeStragglers();
}

await main();
