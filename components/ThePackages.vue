<template>
    <section class="Packages Section">
        <h1 class="Section__title"> {{ $t('packages') }} </h1>

        <div class="Packages__figures" v-if="loaded">
            <figure class="Figure">
                <code class="Figure__number"> {{ counts.active }} </code>
                <figcaption class="Figure__caption">
                    <IconActive class="Figure__caption__icon" />
                    <span class="Figure__caption__text"> {{ $t('active') }} </span>
                </figcaption>
            </figure>

            <figure class="Figure">
                <code class="Figure__number"> {{ counts.syncing }} </code>
                <figcaption class="Figure__caption">
                    <IconSyncing class="Figure__caption__icon" />
                    <span class="Figure__caption__text"> {{ $t('syncing') }} </span>
                </figcaption>
            </figure>

            <figure class="Figure">
                <code class="Figure__number"> {{ counts.failed }} </code>
                <figcaption class="Figure__caption">
                    <IconFailed class="Figure__caption__icon" />
                    <span class="Figure__caption__text"> {{ $t('failed') }} </span>
                </figcaption>
            </figure>
        </div>

        <div class="Packages__categories">
            <div
                class="Packages__category"
                v-for="(packageNameList, packageCategory) in packageNamesSorted"
            >
                <h2 class="Packages__category-title">
                    {{ packageCategory.toUpperCase() }}
                </h2>

                <div class="Packages__packages">
                    <SyncPackage
                        v-for="packageName in packageNameList"
                        :key="packageName"
                        :package="packages[packageName]"
                        :package-name="packageName"
                    />
                </div>
            </div>
        </div>
    </section>
</template>

<i18n lang="yaml">
    ko:
        packages: '패키지'
        active: 'Active'
        syncing: 'Syncing'
        failed: 'Failed'
        etc: '기타'

    en:
        packages: 'Packages'
        active: 'Active'
        syncing: 'Syncing'
        failed: 'Failed'
        etc: 'Others'
</i18n>

<style scoped>
    .Figure {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin: 0;

        font-family: var(--code-font);
        font-weight: 300;

        &__number {
            font-family: var(--code-font);
            font-size: 4.5rem;
            margin: 0;
        }

        &__caption {
            font-size: 1.5rem;
            text-transform: uppercase;

            &__icon {
                width: 1.5rem;
                height: 1.5rem;
                vertical-align: middle;
            }

            &__text {
                vertical-align: middle;
            }
        }
    }

    .Packages {
        &__category-title {
            font-family: var(--title-font);
            font-weight: 700;
            margin-left: 10px;
        }

        &__figures {
            display: flex;
            justify-content: space-between;
            margin: 0 20px;
            margin-bottom: 20px;
        }

        &__packages {
            display: flex;
            flex-wrap: wrap;
        }
    }

    @media (--under-xs) {
        .Figure {
            &__number {
                font-size: 3rem;
            }

            &__caption {
                font-size: 1rem;

                &__icon {
                    width: 1rem;
                    height: 1rem;
                }
            }
        }
    }

    @media (--over-lg) {
        .Figure {
            margin: 1rem 3rem;
        }
    }
</style>

<script>
    import IconActive from "@/assets/images/IconActive.svg?inline";
    import IconFailed from "@/assets/images/IconFailed.svg?inline";
    import IconSyncing from "@/assets/images/IconSyncing.svg?inline";
    import SyncPackage from "@/components/SyncPackage";

    export default {
        name: 'ThePackages',

        data() {
            return {
                packages: {}
            };
        },

        computed: {
            counts() {
                return Object.keys(this.packages).reduce((counts, packageName) => {
                    const packageStatus = this.packages[packageName].status;
                    if(!packageStatus)
                        return counts;

                    if(packageStatus.updating) {
                        counts.syncing++;
                    } else if (packageStatus.failed) {
                        counts.failed++;
                    } else if (packageStatus.updated) {
                        counts.active++;
                    }

                    return counts;
                }, { active: 0, syncing: 0, failed: 0});
            },

            loaded() {
                return Object.keys(this.packages).length > 0;
            },

            packageNamesSorted() {
                const names = Object.keys(this.packages)
                    .sort((pkg1, pkg2) => pkg1.localeCompare(pkg2));

                const etc = [];
                const namePerFirst = names.reduce((namePerFirst, name) => {
                    const firstChar = name[0].toLowerCase();

                    if(/[a-z]/.test(firstChar)) {
                        if(!namePerFirst[firstChar])
                            namePerFirst[firstChar] = [];

                        namePerFirst[firstChar].push(name);
                    } else {
                        etc.push(name);
                    }

                    return namePerFirst;
                }, {});

                if(etc.length > 0)
                    namePerFirst[this.$t('etc')] = etc;

                return namePerFirst;
            }
        },

        async mounted() {
            const { package: packages } = await this.$axios.$get('/geoul/status.json');
            this.packages = packages;
        },

        components: {
            IconActive,
            IconFailed,
            IconSyncing,
            SyncPackage
        }
    };
</script>
