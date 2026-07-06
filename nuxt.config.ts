import svgLoader from 'vite-svg-loader';

export default defineNuxtConfig({
    app: {
        baseURL: '/',
        buildAssetsDir: '/static/',

        head: {
            title: 'KAIST Mirror',
            meta: [
                { charset: 'utf-8' },

                { name: 'viewport', content: 'width=device-width, initial-scale=1' },

                {
                    name: 'description',
                    content: 'KAIST Mirror: Mirror of open source softwares'
                },

                { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },

                { property: 'og:site_name', content: 'KAIST Mirror' },
                { property: 'og:type', content: 'website' },
                { property: 'og:title', content: 'KAIST Mirror' },
                { property: 'og:description', content: 'KAIST Mirror: Mirror of open source softwares' },
                { property: 'og:url', content: 'http://ftp.kaist.ac.kr' },

                { name: 'twitter:card', content: 'summary' },
                { name: 'twitter:title', content: 'KAIST Mirror' },
                { name: 'twitter:description', content: 'KAIST Mirror: Mirror of open source softwares' },
                { name: 'twitter:url', content: 'http://ftp.kaist.ac.kr' },

                { name: 'mobile-web-app-capable', content: 'yes' },
                { name: 'apple-mobile-web-app-capable', content: 'yes' },

                { name: 'msapplication-TileColor', content: '#2b5797' },
                { name: 'msapplication-config', content: '/static/assets/browserconfig.xml' },

                { name: 'apple-mobile-web-app-title', content: 'KAIST Mirror' },
                { name: 'application-name', content: 'KAIST Mirror' },

                { name: 'theme-color', content: '#47759f' }
            ],

            link: [
                { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Ubuntu:700&display=swap' },
                { rel: 'apple-touch-icon', sizes: '180x180', href: '/static/assets/apple-touch-icon.png' },
                { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/static/assets/favicon-32x32.png' },
                { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/static/assets/favicon-16x16.png' },
                { rel: 'manifest', href: '/static/assets/site.webmanifest' },
                { rel: 'mask-icon', href: '/static/assets/safari-pinned-tab.svg', color: '#47759f' },
                { rel: 'shortcut icon', href: '/static/assets/favicon.ico' }
            ]
        }
    },

    css: ['~/assets/css/index.css'],

    postcss: {
        plugins: {
            '@csstools/postcss-global-data': { files: ['app/assets/css/index.css'] },
            'postcss-nested': {},
            'postcss-preset-env': { stage: 0 }
        }
    },

    modules: ['@nuxtjs/i18n', 'nuxt-security'],

    hooks: {
        // buildAssetsDir ('/static/') is registered as a non-top-level Nitro
        // public asset, which defaults to fallthrough: false. That makes
        // Nitro's prerenderer skip ANY route under /static/** outright
        // (see publicAssetBases check in nitropack's prerender()), which
        // silently drops the @nuxtjs/i18n messages.json routes once
        // serverRoutePrefix is moved under /static/_i18n. Allow fallthrough
        // so unmatched /static/** requests reach the dynamic i18n route
        // during the (local, build-time only) prerender pass.
        'nitro:config': (nitroConfig) => {
            const buildAssetsEntry = nitroConfig.publicAssets?.find(
                (asset) => asset.baseURL === '/static/'
            );
            if (buildAssetsEntry) {
                buildAssetsEntry.fallthrough = true;
            }
        }
    },

    experimental: {
        payloadExtraction: false,
        appManifest: false
    },

    i18n: {
        strategy: 'no_prefix',
        locales: ['en', 'ko'],
        defaultLocale: 'en',
        bundle: {
            compositionOnly: false
        },
        vueI18n: './i18n.config.ts',
        serverRoutePrefix: '/static/_i18n'
    },

    vite: {
        plugins: [
            svgLoader({
                svgoConfig: {
                    plugins: [
                        { name: 'preset-default', params: { overrides: { removeViewBox: false } } },
                        'removeDimensions'
                    ]
                }
            })
        ],
        assetsInclude: ['**/*.blob'],

        build: {
            rollupOptions: {
                output: {
                    entryFileNames: 'static/js/[name].[hash].js',
                    chunkFileNames: 'static/js/[name].[hash].js',
                    assetFileNames: (assetInfo) => {
                        if (assetInfo.name?.endsWith('.css')) {
                            return 'static/css/[name].[hash][extname]';
                        }
                        return 'static/assets/[name].[hash][extname]';
                    }
                }
            }
        }
    },

    nitro: {
        devProxy: {
            '/geoul': {
                target: 'http://ftp.kaist.ac.kr/geoul',
                changeOrigin: true
            }
        },

        prerender: {
            crawlLinks: false,
            // '/_error/403' and '/_error/404' are not Nuxt pages - they don't
            // match any route. They exist purely so the routeRules below can
            // force nitro's noSSR (SPA-shell) renderer to run for them during
            // `nuxt generate`. That renderer never touches Vue Router/page
            // matching and never bakes a route-specific hydration payload
            // (see routeRules comment), which is what previously caused the
            // browser to be redirected to /_gen/404 on unknown URLs. The
            // resulting shells are relocated to static/403.html and
            // static/404.html by scripts/postgenerate.mjs and are never
            // shipped as live client routes.
            routes: ['/', '/_error/403', '/_error/404']
        }
    },

    routeRules: {
        '/geoul/**': { proxy: 'http://ftp.kaist.ac.kr/geoul/**' },

        // Force the same noSSR "SPA shell" renderer nitro already uses for
        // /200.html and /404.html (see PRERENDER_NO_SSR_ROUTES in
        // @nuxt/nitro-server). That renderer skips Vue Router matching
        // entirely, so the emitted HTML carries no baked route/path in its
        // hydration payload. Without this, hydrating the static error
        // document on an unrelated URL would make Nuxt trust the baked path
        // over the real browser URL and force-navigate to it.
        '/_error/403': { ssr: false },
        '/_error/404': { ssr: false }
    },

    security: {
        headers: {
            contentSecurityPolicy: {
                'base-uri': ["'self'"],
                'object-src': ["'none'"],
                'script-src': ["'self'", 'https://platform.twitter.com'],
                'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
                'font-src': ["'self'", 'https://fonts.gstatic.com'],
                'img-src': ["'self'", 'data:', 'https://pbs.twimg.com', 'https://syndication.twitter.com'],
                'frame-src': ['https://platform.twitter.com', 'https://syndication.twitter.com'],
                'connect-src': ["'self'", 'https://syndication.twitter.com', 'https://cdn.syndication.twimg.com']
            },
            crossOriginEmbedderPolicy: 'unsafe-none'
        },

        // Roll out enforcement gradually: header is emitted as
        // Content-Security-Policy-Report-Only so nothing is blocked yet.
        // Note: the <meta http-equiv> tag emitted for static hosting is
        // always enforcing (browsers do not support report-only via meta),
        // so this only relaxes delivery through the HTTP header.
        contentSecurityPolicyReportOnly: true,

        // nuxt generate is SSG: nonces are SSR-only, so rely on hashing
        // the inline scripts Nuxt injects at prerender time instead.
        ssg: {
            hashScripts: true,
            hashStyles: false,
            meta: true
        }
    }
});
