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

            { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' }
        ],

        link: [
            { rel: 'icon', href: '/public/favicon.ico' },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Oxygen:300,400,700&display=swap' }
        ]
    },

    loading: {
        color: '#202020'
    },

    css: [
        '@/assets/css/index.css'
    ],

    build: {
        postcss: {
            plugins: [
                require('postcss-nested'),
                require('postcss-preset-env')({
                    importFrom: "./assets/css/index.css",
                    stage: 0
                })
            ]
        },

        extend(config) {
            config.module.rules.push({
                test: /\.blob$/,
                loader: 'file-loader',
                options: {
                    name: 'obj/[name].[ext]'
                }
            });
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
        '@nuxtjs/axios',
        '@nuxtjs/svg',
        [
            'nuxt-i18n',
            {
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
         baseURL: process.env.GEOUL_URL
    }
};
