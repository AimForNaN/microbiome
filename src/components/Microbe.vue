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
    const percentile = computed(() => {
        var row = unref(data);
        return row.Percentile;
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
    <div class="flex">
        <span class="percent">{{abundance}}%</span>
        <span class="font-bold">{{name}}</span>
        <div class="categorization">
            <span v-for="item in categorization">{{item}}</span>
        </div>
    </div>
</template>
