<template>
    <div class="Topbar">
        <div class="Topbar__branding">
            <GeoulLogo class="Topbar__logo" />
        </div>

        <div class="Topbar__links">
            <nuxt-link class="Topbar__link" :to="switchLocalePath(alternativeLang)">
                {{ $t('toggle-lang') }}
            </nuxt-link>
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
    import GeoulLogo from "@/assets/images/GeoulLogo.svg?inline";

    export default {
        name: 'TheTopbar',

        computed: {
            alternativeLang() {
                const locales = this.$root.$i18n.locales;
                const currentLocale = this.$root.$i18n.locale;

                return locales.find(locale => locale !== currentLocale);
            }
        },

        components: {
            GeoulLogo
        }
    };
</script>
