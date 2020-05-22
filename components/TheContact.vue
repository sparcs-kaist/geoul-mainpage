<template>
    <section class="Contact Section">
        <h1 class="Section__title"> {{ $t('contact') }} </h1>
        <LinkItems :items="items" />
    </section>
</template>

<i18n lang="yaml">
    ko:
        contact: '연락처'
        email: '이메일'
        twitter: '트위터'

    en:
        contact: 'Contact'
        email: 'Email'
        twitter: 'Twitter'
</i18n>

<style scoped>
    .Section {
        &__title {
            margin-bottom: 1rem;
        }
    }
</style>

<script>
    import LinkItems from "@/components/LinkItems";

    import { addr, prefix } from "@/assets/js/mail";

    export default {
        name: 'TheContact',

        data() {
            return {
                items: [
                    {
                        name: this.$t('twitter'),
                        url: 'https://twitter.com/kaist_ftp',
                        content: '@kaist_ftp',
                    }
                ]
            };
        },

        mounted() {
            this.items.push(
                {
                    name: this.$t('email'),
                    url: prefix() + addr(),
                    content: addr()
                }
            );
        },

        components: {
            LinkItems
        }
    }
</script>
