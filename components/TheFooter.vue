<template>
    <footer class="Footer">
        <div class="Footer__content">
            <SparcsLogo class="Footer__logo" />
            <div class="Footer__location">
                <span class="Footer__location-text"> {{ $t('location-1') }} </span>
                <span class="Footer__location-text"> {{ $t('location-2') }} </span>
            </div>

            <a class="Footer__email" :href="emailLink">
                {{ email }}
            </a>
        </div>
    </footer>
</template>

<i18n lang="yaml">
    ko:
        location-1: '대전광역시 유성구 대학로 291 한국과학기술원'
        location-2: '교양분관(N10) 1층 SPARCS'

    en:
        location-1: 'KAIST, 291 Daehak-ro, Yuseong-gu, Daejeon, Republic of Korea'
        location-2: 'Undergraduate Branch (N10) 1F SPARCS'
</i18n>

<style scoped>
    .Footer {
        font-family: var(--content-font);
        margin-top: 50px;
        border-top: 30px solid var(--background-darken-1);
        background: var(--background);
        padding: 50px 30px;

        &__content {
            display: flex;
            flex-direction: column;

            max-width: 900px;
            margin: 0 auto;
        }

        &__logo {
            margin-bottom: 20px;

            path {
                fill: var(--text);
            }
        }

        &__location {
            color: var(--background-darken-2);
            font-weight: 400;
            max-width: 600px;
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 10px;

            &-text {
                margin-right: 5px;

                &:last-child {
                    margin-right: 0;
                }
            }
        }

        &__email {
            color: var(--background-darken-2);
            font-family: var(--code-font);
            text-decoration: none;
        }
    }
</style>

<script>
    import SparcsLogo from "@/assets/images/SparcsLogo.svg?inline";

    import { addr, prefix } from "@/assets/js/mail";

    export default {
        data() {
            return {
                email: '',
                emailLink: ''
            };
        },

        mounted() {
            this.email = addr();
            this.emailLink = prefix() + addr();
        },

        components: {
            SparcsLogo
        }
    };
</script>
