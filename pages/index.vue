<template>
    <div class="Index">
        <TheTopbar />
        <main class="Index__main">
            <div class="Index__column">
                <TheOptOut />
                <TheDescriptions />
                <ThePackages />
            </div>

            <aside class="Index__column Index__column--side">
                <TheLinks />
                <TheNotifications />
                <TheSpeedTest />
                <TheFeeds />
                <TheUsage />
                <TheSpec />
                <TheContact />
            </aside>
        </main>

        <TheFooter />
    </div>
</template>

<style scoped>
    .Index {
        &__main {
            display: flex;
            max-width: 1200px;
            margin: 0 auto;
            margin-top: 20px;
            padding: 0 10px;
        }

        &__column {
            width: 0;
            flex: 8;

            &--side {
                padding-left: 20px;
                width: 0;
                flex: 4;
            }
        }

        & >>> .Section {
            padding: 50px;
            margin: 20px 0;
            background: var(--background-lighten-1);
            border-radius: 5px;
            box-shadow: 0 4px 15px 0 rgba(0, 0, 0, .15);

            &--small {
                padding: 20px 30px;
            }

            &__title {
                padding-top: 2.5rem;
                padding-bottom: .8rem;
                margin: 0;
                font-family: var(--title-font);
                font-size: 1.6rem;
                font-weight: 700;

                &:first-child {
                    padding-top: 0;
                }
            }
        }
    }

    @media(--under-md) {
        .Index {
            &__main {
                flex-direction: column;
            }

            &__column {
                width: 100%;
                flex: initial;

                &--side {
                    padding-left: 0;
                    margin-top: -20px;
                }
            }
        }
    }
</style>

<script>
    import TheContact from "@/components/TheContact";
    import TheDescriptions from "@/components/TheDescriptions";
    import TheFeeds from "@/components/TheFeeds";
    import TheFooter from "@/components/TheFooter";
    import TheLinks from "@/components/TheLinks";
    import TheNotifications from "@/components/TheNotifications";
    import TheOptOut from "@/components/TheOptOut";
    import ThePackages from "@/components/ThePackages";
    import TheSpec from "@/components/TheSpec";
    import TheSpeedTest from "@/components/TheSpeedTest";
    import TheTopbar from "@/components/TheTopbar";
    import TheUsage from "@/components/TheUsage";

    export default {
        components: {
            TheContact,
            TheDescriptions,
            TheFeeds,
            TheFooter,
            TheLinks,
            TheNotifications,
            TheOptOut,
            ThePackages,
            TheSpec,
            TheSpeedTest,
            TheTopbar,
            TheUsage
        }
    };
</script>
