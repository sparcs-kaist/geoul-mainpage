<template>
    <div class="SpeedTest Section">
        <transition name="Fade" mode="out-in">
            <h1 class="Section__title" :key="sectionName"> {{ $t('speedtest') }} </h1>
        </transition>

        <transition name="Fade" mode="out-in">
            <div class="SpeedTest__before" key="before" v-if="sectionName === 'before'">
                <p class="SpeedTest__desc">
                    {{ $t('description') }}
                </p>

                <button class="SpeedTest__button" @click="startTest">
                    {{ $t('download') }}
                </button>
            </div>

            <div class="SpeedTest__progress Progress" key="progress" v-else-if="sectionName === 'progress'">
                <div class="Progress__fill" :style="{ width: `${progress}%` }"></div>
            </div>

            <div class="SpeedTest__end" key="result" v-else-if="sectionName === 'result'">
                <p class="SpeedTest__desc">
                    <i18n path="filesize" tag="div">
                        <template #filesize>
                            <span class="SpeedTest__value">
                                30
                                {{ $t('mib') }}
                            </span>
                        </template>
                    </i18n>

                    <i18n path="elapsed" tag="div">
                        <template #elapsed>
                            <span class="SpeedTest__value">
                                {{ elapsed }}
                                {{ $t('seconds') }}
                            </span>
                        </template>
                    </i18n>

                    <i18n path="speed" tag="div">
                        <template #speed>
                            <span class="SpeedTest__value">
                                {{ speed }}
                                {{ $t('mibps') }}
                            </span>
                        </template>
                    </i18n>
                </p>

                <button class="SpeedTest__button" @click="startTest">
                    {{ $t('rerun') }}
                </button>
            </div>

            <div class="SpeedTest__error" key="error" v-else>
                <p class="SpeedTest__desc">
                    {{ $t('error') }}
                </p>

                <button class="SpeedTest__button" @click="startTest">
                    {{ $t('rerun') }}
                </button>
            </div>
        </transition>
    </div>
</template>

<i18n lang="yaml">
    ko:
        speedtest: '속도 체크'
        description: '30MiB 파일을 내려받는데 걸리는 속도를 테스트합니다.'
        download: '다운로드'
        seconds: '초'
        mib: 'MiB'
        mibps: 'MiB/s'
        filesize: '파일 크기: {filesize}'
        elapsed: '결린 시간: {elapsed}'
        speed: '평균 속도: {speed}'
        rerun: '다시 시도'
        error: '파일을 다운로드 중에 오류가 발생했습니다 :('

    en:
        speedtest: 'Speed Test'
        description: 'Test how much time takes to download a 30MiB file.'
        download: 'Download'
        seconds: 's'
        mib: 'MiB'
        mibps: 'MiB/s'
        filesize: 'File Size: {filesize}'
        elapsed: 'Elapsed Time: {elapsed}'
        speed: 'Avg Speed: {speed}'
        rerun: 'Rerun'
        error: 'Error while downloading file :('
</i18n>

<style scoped>
    .SpeedTest {
        display: flex;
        flex-direction: column;
        justify-content: center;
        box-sizing: border-box;
        min-height: 265px;

        &__desc {
            margin-top: 0;
        }

        &__value {
            color: var(--highlight);
            font-weight: 800;
        }

        &__error {
            color: var(--status-error);
            font-weight: 800;
            text-align: center;

            button {
                background: var(--status-error);
            }
        }
    }

    .Progress {
        position: relative;
        background: var(--background-darken-1);
        height: 10px;

        &__fill {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            background: var(--highlight);
        }
    }
</style>

<script>
    import randomBlob from "@/assets/blobs/random.blob";

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
                this.finished = false;
                this.progress = 0;
                this.runningTest = true;
                const total = 30 * 1024 * 1024;

                let start;
                const xhr = new XMLHttpRequest();
                xhr.open('GET', `${randomBlob}?_=${Date.now()}`, true);
                xhr.onprogress = evt => {
                    this.progress = (evt.loaded / total) * 100;
                };

                xhr.onreadystatechange = () => {
                    if(xhr.readyState === 2) {
                        start = Date.now();
                    }

                    if(xhr.readyState === 4) {
                        const end = Date.now();
                        this.elapsed = (end - start) / 1000;
                        this.finished = true;
                    }
                };

                xhr.onerror = () => {
                    this.error = true;
                    this.finished = true;
                };

                setTimeout(() => xhr.send(), 1000);
            }
        },

        computed: {
            speed() {
                return Number.parseFloat(30 / this.elapsed).toFixed(2);
            },

            sectionName() {
                if(!this.runningTest && !this.finished)
                    return 'before';

                if(!this.finished)
                    return 'progress';

                if(!this.error)
                    return 'result';

                return 'error';
            }
        }
    };
</script>
