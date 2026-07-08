import { existsSync } from 'node:fs';
import { mkdir, readdir, readFile, rename, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const publicDir = join(process.cwd(), '.output', 'public');
const staticDir = join(publicDir, 'static');

// Text shown to browsers that serve the static error document without
// running JS (the Nuxt app itself supplies the localized version once it
// hydrates - see app/plugins/static-error-code.client.ts).
const ERROR_DESCRIPTIONS = {
    403: 'You cannot access to this file!',
    404: 'The requested file could not be found!'
};

async function moveFile(from, to) {
    if (!existsSync(from)) {
        throw new Error(`postgenerate: expected file not found: ${from}`);
    }
    await mkdir(join(to, '..'), { recursive: true });
    await rename(from, to);
}

async function markStaticErrorPage(file, code) {
    let html = await readFile(file, 'utf8');

    // /_error/403 and /_error/404 are rendered via nitro's noSSR "SPA shell"
    // renderer (see routeRules in nuxt.config.ts), so both files come out
    // byte-identical with no route-specific content or hydration payload.
    // Stamp each one with the status code it represents so
    // app/plugins/static-error-code.client.ts can show the right error after
    // the app boots, and add a no-JS fallback message for crawlers/browsers
    // that never run the script.
    //
    // A <meta> tag is used instead of an inline <script> because the CSP
    // nuxt-security bakes into these files as a <meta http-equiv> tag is
    // always enforcing (see nuxt.config.ts) and only whitelists the hashes
    // of scripts that existed at prerender time - a script added afterwards
    // here would be silently blocked.
    const marker = `<meta name="static-error-code" content="${code}">`;
    const headCloseIndex = html.indexOf('</head>');
    if (headCloseIndex === -1) {
        throw new Error(`postgenerate: could not find </head> in ${file}`);
    }
    html = html.slice(0, headCloseIndex) + marker + html.slice(headCloseIndex);

    const description = ERROR_DESCRIPTIONS[code];
    const fallback = `<noscript><h1>${code}</h1><p>${description}</p></noscript>`;
    const nuxtRootMarker = '<div id="__nuxt"></div>';
    if (!html.includes(nuxtRootMarker)) {
        throw new Error(`postgenerate: could not find #__nuxt root in ${file}`);
    }
    html = html.replace(nuxtRootMarker, nuxtRootMarker + fallback);

    await writeFile(file, html);
}

async function relocateErrorPages() {
    const errorPage403 = join(staticDir, '403.html');
    const errorPage404 = join(staticDir, '404.html');

    await moveFile(join(publicDir, '_error', '403', 'index.html'), errorPage403);
    await moveFile(join(publicDir, '_error', '404', 'index.html'), errorPage404);
    await rm(join(publicDir, '_error'), { recursive: true, force: true });

    await markStaticErrorPage(errorPage403, 403);
    await markStaticErrorPage(errorPage404, 404);
}

async function relocateSpaFallback() {
    await moveFile(join(publicDir, '200.html'), join(staticDir, '200.html'));
}

async function removeStragglers() {
    // Nitro's own auto-generated 404.html at the public root (a bare noSSR
    // shell, no distinct content) is superseded by our code-aware
    // static/404.html relocated above, so drop it here.
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
