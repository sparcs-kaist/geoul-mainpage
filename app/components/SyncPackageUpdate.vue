<template>
    <div class="SyncPackageUpdate" :class="`SyncPackageUpdate--${type}`">
        <div class="SyncPackageUpdate__key">
            {{ $t(type) }}
        </div>

        <div class="SyncPackageUpdate__value">
            <template v-if="update.count">
                {{ $t('updates-count', { updates: update.count, ago: dateago }) }}
            </template>
            <template v-else>
                {{ dateago }}
            </template>

            <a class="SyncPackageUpdate__link" :href="update.href" target="_blank" v-if="update.href">
                {{ $t('log') }}
            </a>
        </div>
    </div>
</template>

<i18n lang="yaml">
    en:
        failed: 'FAILED'
        progress: 'PROGRESS'
        success: 'SUCCESS'
        last-successful: 'Last Successful'
        invalid-date: 'Invalid Date'
        updates-count: '{updates} Updates ({ago})'
        log: 'Log'

    ko:
        failed: '실패'
        progress: '동기화 중'
        success: '성공'
        last-successful: '마지막 성공'
        invalid-date: '잘못된 일시'
        updates-count: '{updates}개 업데이트 ({ago})'
        log: '로그'
</i18n>

<style scoped>
    .SyncPackageUpdate {
        display: table-row;

        &--success {
            color: var(--status-active);
        }

        &--progress {
            color: var(--status-syncing);
        }

        &--failed {
            color: var(--status-error);
        }

        &__key {
            display: table-cell;
            font-weight: 600;
        }

        &__link {
            display: block;
        }

        &__value {
            display: table-cell;
        }
    }
</style>

<script>
    import dateLocale from "@/assets/js/dateLocale";
    import { formatDistanceToNow } from "date-fns";

    export default {
        props: {
            update: {
                type: Object
            },

            type: {
                type: String
            }
        },

        computed: {
            dateago() {
                return this.update.timestamp ?
                    formatDistanceToNow(
                        new Date(this.update.timestamp),
                        {
                            addSuffix: true,
                            ...dateLocale(this.$i18n.locale)
                        }
                    ) :
                    this.$t('invalid-date');
            }
        }
    };
</script>
