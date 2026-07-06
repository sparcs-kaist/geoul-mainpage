<template>
    <div class="Topbar">
        <NuxtLink to="/" class="Topbar__branding">
            <GeoulLogo class="Topbar__logo" />
        </NuxtLink>

        <div class="Topbar__links">
            <button class="Topbar__link" @click="changeLocale(alternativeLang)">
                {{ $t('toggle-lang') }}
            </button>
        </div>
    </div>
</template>

<i18n lang="yaml">
    ko:
        toggle-lang: "English"

    en:
        toggle-lang: "한국어"
</i18n>

<style scoped>
    .Topbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 30px;

        &__branding {
            padding: 15px 0;
        }

        &__logo {
            width: 220px;
            height: 48px;
            fill: var(--text);
        }

        &__links {
            display: flex;
            align-items: stretch;
            align-self: stretch;
        }

        &__link {
            display: inline-flex;
            align-items: center;
            padding: 15px 20px;

            font-size: 1rem;
            background: transparent;
            color: var(--link);
            font-family: var(--content-font);
            font-weight: 600;
            text-decoration: none;

            transition: all .4s ease;

            &:hover {
                background: var(--background-darken-1);
            }
        }
    }
</style>

<script>
    import GeoulLogo from "@/assets/images/GeoulLogo.svg?component";

    export default {
        name: 'TheTopbar',

        computed: {
            alternativeLang() {
                const locales = this.$i18n.locales;
                const currentLocale = this.$i18n.locale;

                return locales.find(locale => locale !== currentLocale);
            }
        },

        methods: {
            changeLocale() {
                this.$i18n.setLocale(this.alternativeLang);
            }
        },

        components: {
            GeoulLogo
        }
    };
</script>
