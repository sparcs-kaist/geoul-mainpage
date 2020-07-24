<template>
    <img class="SyncPackage__icon" :src="packageStatus" />
</template>

<script>
    import IconActive from "@/assets/images/IconActive.svg";
    import IconFailed from "@/assets/images/IconFailed.svg";
    import IconSyncing from "@/assets/images/IconSyncing.svg";
    import IconUnknown from "@/assets/images/IconUnknown.svg";

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
                    return IconUnknown;

                if(status.updating)
                    return IconSyncing;

                if(status.failed)
                    return IconFailed;

                if(status.updated)
                    return IconActive;

                return IconUnknown;
            }
        }
    };
</script>
