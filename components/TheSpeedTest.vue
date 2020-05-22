<template>
    <div class="SpeedTest Section">
        <h1 class="Section__title"> {{ $t('speedtest') }} </h1>
        <p class="SpeedTest__desc">
            {{ $t('description') }}
        </p>

        <transition name="Fade" mode="out-in">
            <button class="SpeedTest__button" v-if="!runningTest && !finished" @click="startTest">
                {{ $t('download') }}
            </button>
            <div class="SpeedTest__progress Progress" v-else-if="runningTest">
                <div class="Progress__fill" :style="{ width: `${progress}%` }"></div>
            </div>
            <div class="SpeedTest__end" v-else-if="!error">
                {{ $t('finished') }}
                <i18n path="elapsed" tag="div">
                    <template #elapsed>
                        {{ elapsed }}
                    </template>
                </i18n>
            </div>
            <div class="SpeedTest__error" v-else>
            </div>
        </transition>
    </div>
</template>

<i18n lang="yaml">
    ko:
        speedtest: '속도 체크'
        description: '30MiB 파일을 내려받는데 걸리는 속도를 테스트합니다.'
        download: '다운로드'

    en:
        speedtest: 'Speed Test'
        description: 'Test how much time takes to download a 30MiB file.'
        download: 'Download'
</i18n>

<script>
    import randomBlob from "@/assets/blobs/random";

    export default {
        data() {
            return {
                runningTest: false,
                finished: false,
                error: null,
                elapsed: null,
                progress: 0
            };
        },

        methods: {
            startTest() {
                this.runningTest = true;
                const total = 30 * 1024 * 1024;

                const start = Date.now();
                const xhr = new XMLHttpRequest();
                xhr.open('GET', `${randomBlob}?_=${Date.now()}`, true);
                xhr.onprogress = evt => {
                    this.progress = evt.loaded / total;
                };

                xhr.onreadystatechange = () => {
                    if(xhr.readyState === 4) {
                        const end = Date.now();
                        this.elapsed = end - start;
                        this.finished = true;
                    }
                };

                xhr.onerror = () => {
                    this.error = true;
                    this.finished = true;
                };

                xhr.send();
            }
        }
    };
</script>
