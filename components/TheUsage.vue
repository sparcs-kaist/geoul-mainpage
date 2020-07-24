<template>
    <section class="Usage Section">
        <h1 class="Section__title"> {{ $t('usage') }} </h1>

        <div class="Usage__content">
            <i18n class="Usage__desc" path="usage-desc" tag="p" />
            <i18n class="Usage__desc" path="usage-desc-login" tag="p">
                <template #username>
                    <code class="Usage__field">{{ username }}</code>
                </template>

                <template #password>
                    <code class="Usage__field">{{ password }}</code>
                </template>
            </i18n>

            <div class="Usage__links">
                <a href="http://ftp.kaist.ac.kr/geoul/usage/reports/webalizer/" target="_blank"> {{ $t('all') }} </a>
                <a :href="getUrl(target)" v-for="target in targets" :key="target"> {{ target }} </a>
            </div>
        </div>
    </section>
</template>

<i18n lang="yaml">
    ko:
        all: '전체'
        usage: '네트워크 사용량'
        usage-desc: >
            하단의 링크를 통해 거울의 네트워크 사용량을 조회하실 수 있습니다.

        usage-desc-login: >
            스패머를 막기 위해 유저이름은 {username}, 비밀번호는 {password}로 로그인하셔야 열람이 가능합니다.

    en:
        all: 'All'
        usage: 'Network Usage'
        usage-desc: >
            You can see the network usage of Geoul via the links below.

        usage-desc-login: >
            To prevent spammers, you should login with username {username} and password {password}.
</i18n>

<style scoped>
    .Usage {
        &__title {
            padding-bottom: 0;
        }

        &__desc {
            margin-top: 0;
        }

        &__field {
            font-family: var(--code-font);
            color: var(--highlight);
        }

        &__links {
            display: flex;
            margin: 0 -5px;

            a {
                margin: 5px;
            }
        }
    }
</style>

<script>
    export default {
        name: 'TheUsage',

        data() {
            return {
                currentYear: (new Date()).getFullYear(),
                targets: ['http', 'ftp', 'rsync'],
                username: '',
                password: ''
            };
        },

        methods: {
            getUrl(target) {
                return `http://ftp.kaist.ac.kr/geoul/usage/reports/webalizer/${target}/${this.currentYear}/`;
            }
        },

        mounted() {
            this.username = 'go' + 'odm' + 'an';
            this.password = 'i-a' + 'm-no' + 't-a-' + 'spa' + 'mmer';
        }
    };
</script>
