<template>
    <section class="SyncPackageDialog">
        <div class="SyncPackageDialog__header">
            <component class="SyncPackageDialog__icon" :is="packageStatus" />
            <h1 class="SyncPackageDialog__title">
                {{ package.name }}
            </h1>
            <span class="SyncPackageDialog__last" v-if="lastUpdate">
                {{ lastUpdate }}
            </span>
        </div>

        <div class="SyncPackageDialog__desc">
            <template v-if="source">
                <div class="SyncPackageDialog__key"> {{ $t('source') }} </div>
                <div class="SyncPackageDialog__value"> {{ source }} </div>
            </template>

            <template v-if="interval">
                <div class="SyncPackageDialog__key"> {{ $t('interval') }} </div>
                <div class="SyncPackageDialog__value"> {{ interval }} </div>
            </template>
        </div>

        <div v-if="hasUpdate">
            <h2 class="SyncPackageDialog__subtitle"> {{ $t('updates') }} </h2>
            <div class="SyncPackageDialog__updates">
                <SyncPackageUpdate :update="updates.updated" type="success" v-if="success" />

                <template v-else>
                    <SyncPackageUpdate :update="updates.updating" type="progress" v-if="updates.updating" />
                    <SyncPackageUpdate :update="updates.failed" type="failed" v-if="updates.failed" />
                    <SyncPackageUpdate :update="updates.updated" type="last-successful" v-if="updates.updated" />
                </template>
            </div>
        </div>
    </section>
</template>

<i18n lang="yaml">
    ko:
        source: '소스'
        interval: '간격'
        updates: '업데이트'

    en:
        source: 'Source'
        interval: 'Interval'
        updates: 'Updates'
</i18n>

<style scoped>
    .SyncPackageDialog {
        display: flex;
        flex-direction: column;
        background: var(--background);
        padding: 30px 30px;
        box-shadow: 0 4px 15px 0 rgba(0, 0, 0, .15);
        width: 400px;
        max-width: 60vw;
        z-index: 2;

        &__header {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
        }

        &__last {
            white-space: nowrap;
            margin-left: 10px;
            font-size: .9rem;
        }

        &__title {
            font-family: var(--title-font);
            font-size: 1.5rem;
            margin: 0;
        }

        &__icon {
            margin-right: 10px;
            width: 1.5rem;
            height: 1.5rem;
            margin-right: 15px;
        }

        &__desc {
            display: grid;
            grid-template-columns: auto 1fr;
            grid-row-gap: 5px;
            font-size: 1rem;
            font-weight: 600;
        }

        &__key {
            padding-right: 10px;
        }

        &__value {
            color: var(--link);
            font-family: var(--code-font);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;

            &:hover {
                white-space: inherit;
                word-wrap: break-word;
            }
        }

        &__updates {
            display: table;
            border-spacing: 10px;
            margin-left: 5px;
        }

        &__subtitle {
            margin-top: 20px;
            margin-bottom: 0;
            font-size: 1.3rem;
        }
    }
</style>

<script>
    import IconActive from "@/assets/images/IconActive.svg?inline";
    import IconFailed from "@/assets/images/IconFailed.svg?inline";
    import IconSyncing from "@/assets/images/IconSyncing.svg?inline";
    import IconUnknown from "@/assets/images/IconUnknown.svg?inline";
    import SyncPackageUpdate from "@/components/SyncPackageUpdate";

    import dateLocale from "@/assets/js/dateLocale";
    import { formatDistanceToNow, formatDuration } from "date-fns";
    import { parse } from "iso8601-duration";

    export default {
        name: 'SyncPackageDialog',

        props: {
            package: {
                type: Object,
                required: true
            }
        },

        computed: {
            packageStatus() {
                const status = this.package.status;

                if(!status)
                    return 'IconUnknown';

                if(status.updating)
                    return 'IconSyncing';

                if(status.failed)
                    return 'IconFailed';

                if(status.updated)
                    return 'IconActive';

                return 'IconUnknown';
            },

            lastUpdate() {
                const status = this.package.status;
                if(!status || !status.updated || !status.updated.timestamp)
                    return null;

                return formatDistanceToNow(
                    new Date(status.updated.timestamp),
                    {
                        addSuffix: true,
                        ...dateLocale(this.$i18n.locale)
                    }
                );
            },

            source() {
                const sync = this.package.sync;
                if(!sync || !sync.source)
                    return null;

                return sync.source;
            },

            interval() {
                const sync = this.package.sync;
                if(!sync || !sync.frequency)
                    return null;

                const duration = parse(sync.frequency);
                return formatDuration(
                    duration,
                    dateLocale(this.$i18n.locale)
                );
            },

            updates() {
                return this.package.status || {};
            },

            hasUpdate() {
                return this.updates.updated || this.updates.updating || this.updates.failed;
            },

            success() {
                return this.updates.updated && !this.updates.updating && !this.updates.failed;
            }
        },

        components: {
            IconActive,
            IconFailed,
            IconSyncing,
            IconUnknown,
            SyncPackageUpdate
        }
    };
</script>
