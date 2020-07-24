<template>
    <component class="SyncPackage__icon" :is="packageStatus" />
</template>

<script>
    import IconActive from "@/assets/images/IconActive.svg?inline";
    import IconFailed from "@/assets/images/IconFailed.svg?inline";
    import IconSyncing from "@/assets/images/IconSyncing.svg?inline";
    import IconUnknown from "@/assets/images/IconUnknown.svg?inline";

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
            IconUnknown
        }
    };
</script>
