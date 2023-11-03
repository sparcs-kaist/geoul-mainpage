require('dotenv').config();

module.exports = {
    head: {
        title: 'KAIST Mirror',
        meta: [
            { charset: 'utf-8' },

            { name: 'viewport', content: 'width=device-width, initial-scale=1' },

            {
                hid: 'description',
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
            { name: 'twitter:image', content: '/.self/static/twitter.png' },

            { name: 'mobile-web-app-capable', content: 'yes' },
            { name: 'apple-mobile-web-app-capable', content: 'yes' },

            { name: 'msapplication-TileColor', content: '#2b5797' },
            { name: 'msapplication-config', content: '/.self/static/browserconfig.xml' },

            { name: 'apple-mobile-web-app-title', content: 'KAIST Mirror' },
            { name: 'application-name', content: 'KAIST Mirror' },

            { name: 'theme-color', content: '#47759f' }
        ],

        link: [
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Ubuntu:700&display=swap' },
            { rel: 'apple-touch-icon', sizes: '180x180',  href: '/.self/static/apple-touch-icon.png' },
            { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/.self/static/favicon-32x32.png' },
            { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/.self/static/favicon-16x16.png' },
            { rel: 'manifest', href: '/.self/static/site.webmanifest' },
            { rel: 'mask-icon', href: '/.self/static/safari-pinned-tab.svg', color: '#47759f' },
            { rel: 'shortcut icon', href: '/.self/static/favicon.ico' }
        ]
    },

    loading: {
        color: '#47759f'
    },

    css: [
        '@/assets/css/index.css'
    ],

    build: {
        postcss: {
            postcssOptions: {
                plugins: [
                    require('postcss-nested'),
                    require('postcss-preset-env')({
                        importFrom: "./assets/css/index.css",
                        stage: 0
                    })
                ]
            }
        },

        extend(config) {
            config.module.rules.push({
                test: /\.blob$/,
                loader: 'file-loader',
                options: {
                    name: 'obj/[name].[ext]'
                }
            });
        },

        publicPath: '/.self/static/'
    },

    router: {
        extendRoutes (routes, resolve) {
            routes.push({
                name: 'NotFound',
                path: '*',
                component: resolve(__dirname, 'pages/errors/_error.vue')
            })
        }
    },

    renderer: {
        csp: {
            polycies: {
                'script-src': 'self'
            }
        }
    },

    modules: [
        '@nuxtjs/proxy',
        '@nuxtjs/axios',
        '@nuxtjs/svg',
        [
            'nuxt-i18n',
            {
                strategy: 'no_prefix',
                locales: ['en', 'ko'],
                defaultLocale: 'en',
                vueI18n: {
                    fallbackLocale: 'en'
                },
                vueI18nLoader: true
            }
        ]
    ],

    axios: {
        proxy: true
    },

    proxy: [
        'http://ftp.kaist.ac.kr/geoul'
    ],

    export: {
        crawler: false,
        subFolders: false,
        fallback: false,
        routes: [
            '/',
            '/errors/403', '/errors/404', '/errors/50x'
        ]
    },

    target: 'static'
};
