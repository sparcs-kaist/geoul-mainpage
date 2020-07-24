<template>
    <section class="Notifications Section">
        <h1 class="Section__title"> {{ $t('notifications') }} </h1>
        <div class="Notifications__twitter">
            <a
                class="twitter-timeline"
                data-dnt="true"
                data-chrome="noheader, noborders"
                data-height="300"
                href="https://twitter.com/kaist_ftp?ref_src=twsrc%5Etfw"
            >
                Tweets by kaist_ftp
            </a>

            <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
        </div>
    </section>
</template>

<i18n lang="yaml">
    ko:
        notifications: '공지사항'

    en:
        notifications: 'Notifications'
</i18n>

<style scoped>
    .Notifications {
        &__twitter {
            margin: 0 -8px;
            margin-top: 10px;
        }
    }
</style>

<script>
    export default {
        name: 'TheNotifications'
    };
</script>
