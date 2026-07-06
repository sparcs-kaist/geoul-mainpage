<template>
    <section class="Descriptions Section">
        <h1 class="Section__title"> {{ $t('abstract') }} </h1>
        <p class="Descriptions__paragraph" v-for="(text, index) in getI18nArray('abstract-content')">
            {{ text }}
        </p>
        <i18n class="Descriptions__paragraph" path="abstract-content-contact" tag="p">
            <template #email>
                <a :href="mail.link" target="_blank">
                    {{ mail.mail }}
                </a>
            </template>
        </i18n>

        <h1 class="Section__title"> {{ $t('desclaimer') }} </h1>
        <p class="Descriptions__paragraph" v-for="(text, index) in getI18nArray('desclaimer-content')">
            {{ text }}
        </p>
    </section>
</template>

<i18n lang="yaml">
    ko:
        abstract: '개요'
        abstract-content:
            - 카이스트 미러에 오신 것을 환영합니다!
            - >
                카이스트 미러에서는 Debian, *BSD, Mozilla, Apache 등 오픈 소스 소프트웨어 미러링
                및 여러 파일과 소프트웨어의 미러링 서비스를 제공하며, FTP, HTTP, rsync로 접근하실 수 있습니다.
                시스템의 운영 체제는 Ubuntu GNU/Linux이며, lighttpd, rsync, vsftpd 등의 자유 소프트웨어를 사용하고 있습니다.

        abstract-content-contact: >
            문제가 발생하였거나 제안 사항이 있으면 {email}로 연락해 주십시오.

        desclaimer: '면책 조항'
        desclaimer-content:
            - >
                KAIST 파일 서비스 운영자는 서비스에 대한 가능한 모든 법적 책임을 지지 않습니다.
                모든 서비스는 사용자 본인 책임 하에 사용됩니다.

            - >
                KAIST 파일 서비스 운영자는 이 서비스로 인하여 발생될 가능성이 있는 문제에 대하여 책임을 지지 않습니다.

            - >
                서비스 사용 기록은 자동으로 수집되며, 서비스의 품질 개선 및 통계 분석 목적으로 사용될 수 있습니다.

            - >
                서비스 개선을 위하여 이용에 제한이 가해질 수도 있습니다.

    en:
        abstract: 'Abstract'
        abstract-content:
            - Welcome to KAIST Mirror!
            - >
                KAIST Mirror is an mirroring service,
                which mirrors Debian, *BSD, Mozilla, Apache and other open source softwares.
                You can access it by ftp, http, https and rsync.
                We run our services using robust, free or open source software,
                including but not limited to lighttpd, rsync, and vsftpd on the Ubuntu GNU/Linux operating system.

        abstract-content-contact: >
            If you have any problems or suggestions, please contact us by {email}.
            Thank you.

        desclaimer: 'Disclaimer'
        desclaimer-content:
            - >
                Use entirely at your own risk -- no warranty is expressed or implied.

            - >
                None of the service providers in any way whatsoever can be responsible
                for any problems that might be caused by this service.

            - >
                Every access to this service is recorded and can be used and published
                for the purpose of improving the quality of the service.

            - >
                We may limit any accesses without forewarning that may prevent operators
                from maintaining reasonable quality of the service.
</i18n>

<style scoped>
    .Descriptions {
        &__paragraph {
            margin: .5em 0;
        }
    }
</style>

<script>
    import { addr, prefix } from "@/assets/js/mail";

    export default {
        name: 'TheDescriptions',

        data() {
            return {
                mail: {}
            };
        },

        methods: {
            getI18nArray(key) {
                return Object.keys(this.$i18n.messages[this.$i18n.locale][key])
                    .map(index => this.$t(`${key}[${index}]`));
            }
        },

        mounted() {
            this.mail = {
                mail: addr(),
                link: prefix() + addr()
            };
        }
    };
</script>
