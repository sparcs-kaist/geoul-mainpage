<template>
    <div class="SyncPackage" :class="statusClass">
        <div class="SyncPackage__row">
            <a :href="packageLink" class="SyncPackage__body SyncPackage__body--full">
                <SyncPackageIcon class="SyncPackage__icon" :package="package" />
                <span class="SyncPackage__name"> {{ packageName }} </span>
            </a>

            <div class="SyncPackage__body SyncPackage__info"
                @mouseenter="openDialog(1)"
                @mouseleave="closeDialog(1)"
            >
                <button class="SyncPackage__info__button"> <!-- @click="toggleDialog(2)"> -->
                    <IconInformation class="SyncPackage__info__icon" />
                </button>

                <transition name="DialogFade">
                    <SyncPackageDialog class="SyncPackage__dialog"
                        :class="`SyncPackage__dialog--${dialog}`"
                        :package="package"
                        v-if="dialog"
                    />
                </transition>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .SyncPackage {
        display: flex;
        flex-direction: column;
        flex: 0 0 50%;
        padding: 0 5px;
        box-sizing: border-box;

        &__row {
            display: flex;
            align-items: stretch;
            margin: 5px 0;
            border-left: 5px solid var(--background-darken-2);
            border-radius: 5px;
        }

        &__body {
            display: flex;
            align-items: center;
            justify-content: center;

            border-radius: 0;
            padding: 15px 20px;

            color: var(--text);
            font-family: var(--content-font);
            text-decoration: none;

            background: var(--background-darken-1);
            transition: background .4s ease;

            &--full {
                justify-content: flex-start;
                flex: 1;
            }

            &:hover {
                background: var(--background);
            }

            &:first-child {
                border-top-left-radius: 5px;
                border-bottom-left-radius: 5px;
            }

            &:last-child {
                border-top-right-radius: 5px;
                border-bottom-right-radius: 5px;
            }
        }

        &__icon {
            width: 1.3rem;
            height: 1.3rem;
            margin-right: 15px;
        }

        &__name {
            font-size: 1.3rem;
            font-weight: 300;
            flex: 1;
            width: 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        &__info {
            position: relative;
            padding: 0;

            /* &:hover > .SyncPackage__dialog {
                visibility: visible;
                opacity: 1;
                pointer-events: all;
            } */

            &__icon {
                fill: var(--background-darken-2);
            }

            &__button {
                background: transparent;
                padding: 15px 20px;
            }
        }

        &__dialog {
            /* visibility: hidden;
            opacity: 0;
            pointer-events: none; */
            position: absolute;
            top: 0;
            left: 40px;
            transition: opacity .4s ease, visibility .4s ease;
        }

        &--active &__row {
            border-color: var(--status-active);
        }

        &--failed &__row {
            border-color: var(--status-error);
        }

        &--syncing &__row {
            border-color: var(--status-syncing);
        }
    }

    .DialogFade {
        &-enter, &-leave-to {
            opacity: 0;
        }

        &-leave-to {
            pointer-events: none;
        }

        &-enter-active, &-leave-active {
            transition: opacity .4s ease;
        }
    }

    @media(--under-lg) {
        .SyncPackage .SyncPackage__dialog {
            left: 0;
            max-width: 35vw;
        }
    }

    @media(--under-md) {
        .SyncPackage .SyncPackage__dialog {
            max-width: 40vw;
        }

        .SyncPackage:nth-child(2n) .SyncPackage__dialog {
            left: inherit;
            right: 40px;
        }
    }

    @media (--under-xs) {
        .SyncPackage {
            flex: 1 0 100%;
        }

        .SyncPackage .SyncPackage__dialog {
            left: inherit;
            right: 0 !important;
            max-width: 60vw;
        }
    }
</style>

<script>
    import formatDistanceToNow from "date-fns/formatDistanceToNow";

    import IconInformation from "@/assets/images/IconInformation.svg?inline";
    import SyncPackageDialog from "@/components/SyncPackageDialog";
    import SyncPackageIcon from "@/components/SyncPackageIcon";

    export default {
        name: 'SyncPackage',

        data() {
            return {
                dialog: false
            };
        },

        props: {
            packageName: {
                type: String,
                required: true
            },

            package: {
                type: Object,
                default() {
                    return {};
                }
            }
        },

        computed: {
            packageLink() {
                return `/${encodeURIComponent(this.packageName)}`;
            },

            statusClass() {
                const status = this.package.status;

                if(!status)
                    return 'SyncPackage--unknown';

                if(status.updating)
                    return 'SyncPackage--syncing';

                if(status.failed)
                    return 'SyncPackage--failed';

                if(status.updated)
                    return 'SyncPackage--active';

                return 'SyncPackage--unknown';
            }
        },

        methods: {
            openDialog(mode) {
                this.dialog = Math.max(this.dialog, mode);
            },

            closeDialog(mode) {
                if(this.dialog <= mode)
                    this.dialog = 0;
            },

            toggleDialog(mode) {
                if(this.dialog < mode)
                    this.openDialog(mode);

                else
                    this.closeDialog(mode);
            }
        },

        components: {
            IconInformation,
            SyncPackageDialog,
            SyncPackageIcon
        }
    };
</script>
