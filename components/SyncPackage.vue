<template>
    <div class="SyncPackage">
        <a :href="packageLink" class="SyncPackage__row">
            <component class="SyncPackage__icon" :is="packageStatus" />
            <span class="SyncPackage__name"> {{ packageName }} </span>

            <SyncPackageDialog class="SyncPackage__dialog" :package="package" />
        </a>
    </div>
</template>

<style scoped>
    .SyncPackage {
        display: flex;
        flex-direction: column;
        flex: 0 0 50%;
        padding: 0 5px;
        box-sizing: border-box;
        position: relative;

        &__row {
            display: flex;
            align-items: center;

            background: var(--background-darken-1);
            padding: 15px 20px;
            border-radius: 5px;
            margin: 5px 0;

            color: var(--text);
            font-family: var(--content-font);
            text-decoration: none;
        }

        &__icon {
            width: 1.3rem;
            height: 1.3rem;
            margin-right: 15px;
        }

        &__name {
            font-size: 1.3rem;
            font-weight: 300;
        }

        &__dialog {
            visibility: hidden;
            position: absolute;
            top: 0;
            left: 20vw;
        }

        &:hover &__dialog {
            visibility: visible;
        }
    }

    @media (--under-xs) {
        .SyncPackage {
            flex: 1 0 100%;
        }
    }
</style>

<script>
    import formatDistanceToNow from "date-fns/formatDistanceToNow";

    import IconActive from "@/assets/images/IconActive.svg?inline";
    import IconFailed from "@/assets/images/IconFailed.svg?inline";
    import IconSyncing from "@/assets/images/IconSyncing.svg?inline";
    import IconUnknown from "@/assets/images/IconUnknown.svg?inline";
    import SyncPackageDialog from "@/components/SyncPackageDialog";

    export default {
        name: 'SyncPackage',

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
            }
        },

        components: {
            IconActive,
            IconFailed,
            IconSyncing,
            IconUnknown,
            SyncPackageDialog
        }
    };
</script>
