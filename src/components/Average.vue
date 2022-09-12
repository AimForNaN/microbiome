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
        <div class="amount">
            {{average}}%
        </div>
        <slot></slot>
    </div>
</template>

<style lang="less">
    .average {
        @apply border flex flex-col items-center justify-center p-4 rounded;

        .amount {
            @apply p-6 text-3xl;
        }
    }
</style>
