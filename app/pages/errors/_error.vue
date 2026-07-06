<template>
    <div class="Error">
        <TheTopbar />
        <main class="Error__main">
            <h1 class="Error__code">
                {{ code }}
            </h1>
            <p class="Error__description">
                {{ description }}
            </p>

            <div class="Error__buttons">
                <button class="Error__button Error__button--highlight" @click="$router.go(-1)">
                    {{ $t('back') }}
                </button>

                <nuxt-link class="Error__button Button" to="/">
                    {{ $t('home') }}
                </nuxt-link>
            </div>
        </main>
    </div>
</template>

<style scoped>
    .Error {
        display: flex;
        flex-direction: column;
        min-height: 100vh;

        &__main {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            margin-top: 20px;
            margin-bottom: 100px;
            box-sizing: border-box;
            padding: 0 30px;
        }

        &__code {
            font-family: var(--code-font);
            font-weight: 300;
            font-size: 7rem;
            margin-top: 0;
            margin-bottom: 30px;
        }

        &__description {
            margin-top: 0;
            font-size: 1.5rem;
            font-weight: 300;
        }

        &__buttons {
            display: flex;
        }

        &__button {
            background: var(--background-darken-1);
            color: var(--text);
            text-decoration: none;
            transition: opacity .4s ease;
            margin: 0 5px;

            &:hover {
                opacity: .9;
            }

            &--highlight {
                background: var(--text);
                color: var(--background);
            }
        }
    }
</style>

<i18n lang="yaml">
    ko:
        code-403: '403'
        code-404: '404'
        code-50x: '50x'
        code-unknown: '???'
        description-403: '이 파일에는 접근하실 수 없습니다!'
        description-404: '해당 파일을 서버에서 찾을 수 없습니다!'
        description-50x: '서버에 문제가 있어 내용을 표시할 수 없습니다.'
        description-unknown: '알 수 없는 오류가 발생했습니다.'
        back: '돌아가기'
        home: '메인으로'

    en:
        code-403: '403'
        code-404: '404'
        code-50x: '50x'
        code-unknown: '???'
        description-403: 'You cannot access to this file!'
        description-404: "The requested file could not be found!"
        description-50x: 'There is a problem with the server.'
        description-unknown: 'An unknown error has been occurred.'
        back: 'Back'
        home: 'Go to home'
</i18n>

<script>
    import TheFooter from "@/components/TheFooter";
    import TheTopbar from "@/components/TheTopbar";

    export default {
        asyncData({ params, nuxtState }) {
            const error = params.error;

            if (!error) {
                if (!nuxtState || !nuxtState.routePath) {
                    return {};
                }

                const [, code ] = nuxtState.routePath.match(/\/errors\/([^\/]+)/);
                return { originalError: code };
            } else {
                return { originalError: error };
            }
        },

        computed: {
            error() {
                return this.originalError || 'unknown';
            },

            code() {
                return this.$t(`code-${this.error}`);
            },

            description() {
                return this.$t(`description-${this.error}`);
            }
        },

        components: {
            TheFooter,
            TheTopbar
        }
    };
</script>
