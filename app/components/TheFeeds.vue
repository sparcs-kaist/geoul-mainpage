<template>
    <section class="Feeds Section">
        <h1 class="Section__title"> {{ $t('feeds') }} </h1>
        <LinkItems :items="items" />
    </section>
</template>

<i18n lang="yaml">
    ko:
        feeds: 'API 및 피드'
        json-status: 'JSON (상태)'
        xml-status: 'XML (상태)'
        rss-sync: 'RSS (동기화)'
        rss-failed: 'RSS (실패한 동기화)'

    en:
        feeds: 'API / Feeds'
        json-status: 'JSON (Status)'
        xml-status: 'XML (Status)'
        rss-sync: 'RSS (Sync)'
        rss-failed: 'RSS (Failed Sync)'
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

    export default {
        name: 'TheFeeds',

        data() {
            return {
                items: [
                    {
                        name: this.$t('json-status'),
                        url: '/geoul/status.json'
                    },

                    {
                        name: this.$t('xml-status'),
                        url: '/geoul/status.xml'
                    },

                    {
                        name: this.$t('rss-sync'),
                        url: '/geoul/pkgs/news.feed'
                    },

                    {
                        name: this.$t('rss-failed'),
                        url: '/geoul/pkgs/problems.feed'
                    }
                ]
            };
        },

        components: {
            LinkItems
        }
    };
</script>
