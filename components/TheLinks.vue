<template>
    <section class="Links Section">
        <h1 class="Section__title"> {{ $t('links') }} </h1>
        <div class="Links__links">
            <code class="Links__link" v-for="link in links">{{ link }}</code>
        </div>
        <h2 class="Links__subtitle"> {{ $t('aliases') }} </h2>
        <div class="Links__links">
            <code class="Links__link" v-for="link in aliases"> {{ link }}</code>
        </div>
    </section>
</template>

<i18n lang="yaml">
    ko:
        links: '서버 주소'
        aliases: '별칭'

    en:
        links: 'Available w/'
        aliases: 'Aliases'
</i18n>

<style scoped>
    .Links {
        &__links {
            display: flex;
            flex-direction: column;
            padding: 20px;
            background: var(--background-darken-1);
            border-radius: 5px;
        }

        &__link {
            font-family: var(--code-font);
            margin: 5px 0;
        }

        &__subtitle {
            font-family: var(--title-font);
            margin-top: 2rem;
            margin-bottom: 1rem;
        }
    }
</style>

<script>
    export default {
        name: 'TheLinks',

        data() {
            return {
                aliases: [
                    'ftp.kr.debian.org',
                    'ftp2.kr.freebsd.org',
                    'ftp2.kr.vim.org'
                ],

                links: [
                    'http://ftp.kaist.ac.kr',
                    'ftp://ftp.kaist.ac.kr',
                    'rsync://ftp.kaist.ac.kr'
                ]
            };
        }
    }
</script>
