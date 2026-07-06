<template>
    <img class="SyncPackageIcon" :class="packageClass" :src="packageIcon" />
</template>

<style scoped>
    .SyncPackageIcon {
        &--syncing {
            animation-name: PackageSync;
            animation-duration: 2s;
            animation-iteration-count: infinite;
            animation-timing-function: linear;
        }
    }

    @keyframes PackageSync {
        from {
            transform: rotate(0deg);
        }

        to {
            transform: rotate(360deg);
        }
    }
</style>

<script>
    import IconActive from "@/assets/images/IconActive.svg";
    import IconFailed from "@/assets/images/IconFailed.svg";
    import IconSyncing from "@/assets/images/IconSyncing.svg";
    import IconUnknown from "@/assets/images/IconUnknown.svg";

    const icons = {
        IconActive, IconFailed, IconSyncing, IconUnknown
    };

    export default {
        name: 'SyncPackageIcon',

        props: {
            package: {
                required: true
            }
        },

        computed: {
            packageStatus() {
                const status = this.package.status;

                if(!status)
                    return 'Unknown';

                if(status.updating)
                    return 'Syncing';

                if(status.failed)
                    return 'Failed';

                if(status.updated)
                    return 'Active';

                return 'Unknown';
            },

            packageIcon() {
                return icons[`Icon${this.packageStatus}`] || IconUnknown;
            },

            packageClass() {
                return `SyncPackageIcon--${this.packageStatus.toLowerCase()}`;
            }
        }
    };
</script>
