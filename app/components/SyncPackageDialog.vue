<template>
    <section class="SyncPackageDialog">
        <!--
            <span class="SyncPackageDialog__pin">
                {{ $t('click-to-pin') }}
            </span>
        -->

        <div class="SyncPackageDialog__header">
            <SyncPackageIcon class="SyncPackageDialog__icon" :package="package" />
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

            <template v-if="links && links.length > 0">
                <div class="SyncPackageDialog__key"> {{ $t('link') }} </div>
                <div class="SyncPackageDialog__value SyncPackageDialog__value--links">
                    <a v-for="link in links" :href="link.href" :key="link.rel">
                        {{ link.rel }}
                    </a>
                </div>
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

        <div class="SyncPackageDialog__usage" :class="{ 'SyncPackageDialog__usage--show': image }">
            <div class="SyncPackageDialog__img-wrapper">
                <img :src="diskUsage" @load="showImage" />
            </div>
        </div>
    </section>
</template>

<i18n lang="yaml">
    ko:
        source: '소스'
        interval: '간격'
        updates: '업데이트'
        link: '링크'
        click-to-pin: '메뉴버튼을 클릭해서 고정하실 수 있습니다.'

    en:
        source: 'Source'
        interval: 'Interval'
        updates: 'Updates'
        link: 'Links'
        click-to-pin: 'Click the menu button to pin.'
</i18n>

<style scoped>
    .SyncPackageDialog {
        display: flex;
        flex-direction: column;
        background: var(--background);
        padding: 30px 30px;
        box-shadow: 0 4px 15px 0 rgba(0, 0, 0, .15);
        width: 400px;
        max-width: 40vw;
        z-index: 2;

        &__pin {
            margin-bottom: 10px;
        }

        &__header {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
        }

        &__last {
            white-space: nowrap;
            margin-left: 10px;
            font-size: .9rem;
            flex-shrink: 0;
        }

        &__title {
            font-family: var(--title-font);
            font-size: 1.5rem;
            font-weight: 700;
            margin: 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            flex-shrink: 1;

            &:hover {
                white-space: inherit;
                word-break: break-all;
            }
        }

        &__icon {
            margin-right: 10px;
            width: 1.5rem;
            height: 1.5rem;
            margin-right: 15px;
            flex-shrink: 0;
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

            &--links {
                display: flex;
                flex-wrap: wrap;
                margin: 0 -5px;

                &:hover {
                    white-space: nowrap;
                    word-wrap: normal;
                }

                & > a {
                    margin: 0 5px;
                }
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

        &__img-wrapper {
            display: flex;
            overflow: hidden;

            height: 0;

            & > img {
                width: calc(100% + 6px);
                object-fit: contain;

                margin-top: -3px;
                margin-left: -3px;
                margin-bottom: -3px;
            }
        }

        &__usage--show &__img-wrapper {
            height: auto;
            margin-top: 10px;
        }
    }
</style>

<script>
    import SyncPackageUpdate from "@/components/SyncPackageUpdate";
    import SyncPackageIcon from "@/components/SyncPackageIcon";

    import dateLocale from "@/assets/js/dateLocale";
    import { formatDistanceToNow, formatDuration } from "date-fns";
    import { parse } from "iso8601-duration";

    export default {
        name: 'SyncPackageDialog',

        data() {
            return {
                image: false
            };
        },

        props: {
            package: {
                type: Object,
                required: true
            }
        },

        computed: {
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

            links() {
                return this.package.link;
            },

            updates() {
                return this.package.status || {};
            },

            hasUpdate() {
                return this.updates.updated || this.updates.updating || this.updates.failed;
            },

            success() {
                return this.updates.updated && !this.updates.updating && !this.updates.failed;
            },

            diskUsage() {
                return `/geoul/pkgs/${this.package.id}/du.png`;
            }
        },

        methods: {
            showImage() {
                this.image = true;
            }
        },

        components: {
            SyncPackageIcon,
            SyncPackageUpdate
        }
    };
</script>
