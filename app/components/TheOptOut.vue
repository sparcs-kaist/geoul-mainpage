<template>
    <section class="OptOut Section Section--small">
        <div class="OptOut__description">
            {{ $t('optout-description') }}
        </div>

        <a class="OptOut__link" href="/.self/legacy/">
            {{ $t('optout') }}
        </a>
    </section>
</template>

<i18n lang="yaml">
    ko:
        optout: '돌아가기'
        optout-description: >
            현재 새 버전의 미러 메인페이지를 사용중입니다.
            이전 버전으로 돌아가시려면 하단의 링크를 눌러주세요.

    en:
        optout: 'Opt Out'
        optout-description: >
            You're using the new version of mirror main page.
            To opt out, please click the link below.
</i18n>

<style scoped>
    .OptOut {
        .Index .Section--small& {
            background: var(--highlight);
            color: var(--highlight-text);
        }

        &__description {
            margin-bottom: 10px;
        }

        &__link {
            color: var(--highlight-text);
        }
    }
</style>

<script>
    export default {
        name: 'TheOptOut'
    };
</script>
