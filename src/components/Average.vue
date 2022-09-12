<script setup>
    import { computed } from 'vue';
    import round from './../lib/round.js';

    const props = defineProps({
        data: Array,
    });

    const average = computed(() => {
        var {data} = props;
        var sum = data.reduce((ret, row) => {
            ret += row.Comparison;
            return ret;
        }, 0);
        return round(sum / data.length, 2);
    });
</script>

<template>
    <div class="average">
        <slot :average="average">
            <div class="amount">
                {{average}}%
            </div>
        </slot>
    </div>
</template>

<style lang="less">
    .average {
        @apply flex flex-col items-center justify-center p-12 rounded space-y-2 text-lg;

        .amount {
            @apply text-4xl;
        }

        .goal {
            @apply text-gray-500 text-sm;
        }
    }
</style>
