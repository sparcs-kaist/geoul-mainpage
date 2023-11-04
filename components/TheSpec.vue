<template>
    <section class="Spec Section">
        <h1 class="Section__title"> {{ $t('specification') }} </h1>

        <div class="Spec__table">
            <div class="Spec__row" v-for="item in items">
                <div class="Spec__category">
                    {{ $t(item.category) }}
                </div>
                <div class="Spec__value">
                    {{ item.value }}
                </div>
            </div>
        </div>
    </section>
</template>

<i18n lang="yaml">
    ko:
        specification: '서버 상세'
        spec-cpu: 'Processor'
        spec-ram: 'Memory'
        spec-stor: 'Storage'
        spec-net: 'Network'
        spec-loc: 'Location'

    en:
        specification: 'Specification'
        spec-cpu: 'Processor'
        spec-ram: 'Memory'
        spec-stor: 'Storage'
        spec-net: 'Network'
        spec-loc: 'Location'
</i18n>

<style scoped>
    .Spec {
        &__table {
            display: flex;
            flex-direction: column;
            margin-top: 10px;
            max-width: 300px;
        }

        &__row {
            display: flex;
        }

        &__category {
            flex: 1;
            width: 0;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            background: var(--background);
            padding: 10px;
        }

        &__value {
            flex: 2;
            padding: 10px;
        }
    }
</style>

<script>
    export default {
        name: 'TheSpec',

        data() {
            return {
                items: [
                    { category: 'spec-cpu', value: 'Xeon E5-2620' },
                    { category: 'spec-ram', value: '64 GiB' },
                    { category: 'spec-stor', value: '72TiB RAID-6' },
                    { category: 'spec-net', value: '10Gbps' },
                    { category: 'spec-loc', value: 'Daejeon, South Korea' }
                ]
            };
        }
    }
</script>
