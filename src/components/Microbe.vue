<script setup>
    import { computed, unref } from 'vue';

    const props = defineProps({
        data: Object,
        noStrain: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            default: 'Species',
        },
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
        return row.Categorization.slice(0, -2).reduce((ret, item, idx) => {
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
    const type = computed(() => {
        var row = unref(data);
        return row[props.type];
    });
</script>

<template>
    <div class="microbe">
        <span class="abundance">
            {{abundance}}%
        </span>
        <div class="summary">
            <div class="name">{{type}}</div>
            <div class="strain" v-if="strain && !noStrain">({{strain}})</div>
            <div class="categorization">
                <span v-for="item in categorization">{{item}}</span>
            </div>
        </div>
    </div>
</template>

<style lang="less">
    .microbe {
        @apply flex items-center min-h-0 min-w-0 space-x-4;

        .abundance {
            @apply flex;
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

        .strain {
            @apply min-w-0 text-sm truncate;
        }

        .summary {
            @apply flex flex-col space-y-1;
        }
    }
</style>
