<template>
    <ErrorView :code="error?.statusCode" />
</template>

<script setup>
    import ErrorView from "@/components/ErrorView.vue";

    const props = defineProps({
        error: {
            type: Object,
            default: () => ({})
        }
    });
</script>
