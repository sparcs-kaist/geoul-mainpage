<template>
    <div class="LinkItems">
        <div class="LinkItems__item LinkItem" v-for="item in items">
            <h2 class="LinkItem__title">
                {{ item.name }}
            </h2>

            <a class="LinkItem__link" :href="item.url">
                {{ item.content || item.url }}
            </a>
        </div>
    </div>
</template>

<style scoped>
    .LinkItem {
        margin: 25px 0;

        &__title {
            font-family: var(--title-font);
            font-size: 1.35rem;
            font-weight: 700;
            margin-top: 0;
            margin-bottom: .5rem;
        }

        &__link {
            font-family: var(--code-font);
            margin: 5px 0;
        }

        &:first-child {
            margin-top: 10px;
        }

        &:last-child {
            margin-bottom: 0;
        }
    }
</style>

<script>
    export default {
        name: 'LinkItems',

        props: {
            items: {
                type: Array,
                required: true
            }
        }
    };
</script>
