<script setup>
    import { computed, unref } from 'vue';

    const props = defineProps({
        data: Object,
    });

    const data = computed(() => {
        return props.data;
    });
    const abundance = computed(() => {
        var row = unref(data);
        return row.Abundance;
    });
    const categorization = computed(() => {
        var row = unref(data);
        return row.Categorization.reduce((ret, item, idx) => {
            if (idx) {
                ret.push('/');
            }
            ret.push(item);
            return ret;
        }, []);
    });
    const cls = computed(() => {
        var row = unref(data);
        return row.Cls;
    });
    const comparison = computed(() => {
        var row = unref(data);
        return row.Comparison;
    });
    const family = computed(() => {
        var row = unref(data);
        return row.Family;
    });
    const genus = computed(() => {
        var row = unref(data);
        return row.Genus;
    });
    const order = computed(() => {
        var row = unref(data);
        return row.Order;
    });
    const phylum = computed(() => {
        var row = unref(data);
        return row.Phylum;
    });
    const species = computed(() => {
        var row = unref(data);
        return row.Species;
    });
    const strain = computed(() => {
        var row = unref(data);
        return row.Strain;
    });
    const name = computed(() => {
        var row = unref(data);
        return row.Name;
    });
</script>

<template>
    <div class="microbe">
        <span class="percent">{{abundance}}%</span>
        <span class="name">{{name}}</span>
        <span class="percent">
            <template v-if="comparison">{{comparison}}%</template>
        </span>
        <div class="categorization">
            <span v-for="item in categorization">{{item}}</span>
        </div>
    </div>
</template>

<style lang="less">
    .microbe {
        @apply grid items-baseline min-h-0 min-w-0 p-2 space-x-4;
        grid-template-columns: 100px 1fr;

        .percent {
            @apply flex justify-end;
        }

        .categorization {
            @apply flex flex-wrap text-gray-400 text-sm truncate min-w-0;

            > * {
                @apply pr-1;
            }
        }

        .name {
            @apply min-w-0 text-xl truncate;
        }
    }
</style>
