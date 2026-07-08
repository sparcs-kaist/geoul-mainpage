export default defineNuxtPlugin(() => {
    // Set by scripts/postgenerate.mjs as <meta name="static-error-code"> in
    // static/403.html and static/404.html. These files are served by the
    // web server as generic HTTP error documents (same URL, no redirect -
    // see nginx `error_page` config), so there is no Nuxt route/payload to
    // tell the client which code applies. This meta tag is the only
    // per-file signal available once the app boots. A meta tag is used
    // instead of an inline script because it isn't subject to the CSP
    // script-src hash allowlist (see postgenerate.mjs).
    const code = Number(document.querySelector('meta[name="static-error-code"]')?.getAttribute('content'));

    if (!code) {
        return;
    }

    const route = useRoute();

    // The real requested URL never matches an app route (that's exactly why
    // the host fell back to a static error document for it), so Nuxt's
    // router already raised a generic 404 by this point. Replace it with
    // the code the served document actually represents, without touching
    // the URL.
    if (route.matched.length > 0) {
        return;
    }

    clearError();
    showError(createError({ statusCode: code, fatal: false }));
});
