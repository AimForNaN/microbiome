<script setup>
    import {
        computed,
        ref,
        unref,
    } from 'vue';

    import { useMicrobiomeStore } from './stores/microbiome.js';
    import Average from './components/Average.vue';
    import Microbe from './components/Microbe.vue';

    const averages = [
        { Name: 'Akkermansia', Goal: '> 66%' },
        { Name: 'Alistipes', Goal: '< 66%' },
        { Name: 'Bifidobacterium', Goal: '> 66%' },
        { Name: 'Escherichia', Goal: '< 33%' },
        { Name: 'Faecalibacterium', Goal: '> 66%' },
        { Name: 'Lactobacillus', Goal: '33-66%' },
        { Name: 'Methanobacteria', Goal: '< 33%' },
        { Name: 'Prevotella', Goal: '> 66%' },
    ];
    const store = useMicrobiomeStore();
    const tab = ref('Summary');
    const tabs = [
        'Summary',
        'Phylum',
        'Class',
        'Order',
        'Family',
        'Genus',
        'Species',
        'Strain',
    ];

    const categorized = computed(() => {
        return store.getCategorized(unref(tab));
    });

    function onFileChange(e) {
        var input = e.target;
        store.parseCsv(input.files[0]);
    }
</script>

<template>
    <header>
        <select v-model="tab">
            <option :value="t" v-for="t in tabs">{{t}}</option>
        </select>
        <input class="filter" placeholder="Filter" type="text" v-model="store.filter">
    </header>
    <div class="no-data" v-if="!store.csv.length">
        <label class="file">
            <span>Load full microbiome community file.</span>
            <i class="mdi mdi-file-plus"></i>
            <input type="file" @change="onFileChange">
        </label>
    </div>
    <template v-else-if="tab == 'Summary'">
        <div class="averages results">
            <header>Your average compared to other people.</header>
            <Average class="result" :data="store[avg.Name]" :key="avg.Name" v-slot="{ average }" v-for="avg in averages">
                <span class="amount">{{average}}%</span>
                <span>{{avg.Name}}</span>
                <span class="goal">Goal: {{avg.Goal}}</span>
            </Average>
        </div>
        <div class="bifidobacterium results">
            <header>Bifidobacterium</header>
            <Microbe class="result" :data="row" v-for="row in store.Bifidobacterium" :key="row.Name"></Microbe>
        </div>
        <div class="lactobacillus results">
            <header>Lactobacillus</header>
            <Microbe class="result" :data="row" v-for="row in store.Lactobacillus" :key="row.Name"></Microbe>
        </div>
    </template>
    <div class="results" v-else>
        <Microbe class="result" :data="row" v-for="row in categorized" :key="row.Name"></Microbe>
    </div>
</template>

<style lang="less">
    #app {
        @apply flex flex-col min-h-0 min-w-0;

        > header {
            @apply bg-white border-b flex flex-wrap h-14 items-center px-2 space-x-2 sticky top-0 z-10;

            button {
                @apply duration-500 px-3 py-2 rounded transition hover:bg-gray-50;

                &.active {
                    @apply bg-gray-100;
                }
            }
        }

        .file {
            @apply border border-gray-300 cursor-pointer px-3 py-2 rounded space-x-2 transition hover:ring-2;

            input {
                @apply hidden;
            }
        }

        .filter {
            @apply border flex-1 px-2 py-1 rounded focus:outline-none focus:ring-2;
        }

        .no-data {
            @apply absolute flex flex-1 inset-0 items-center justify-center;
        }

        .results {
            @apply min-w-0 lg:grid lg:grid-cols-2 2xl:grid-cols-4;

            > header {
                @apply bg-white border-y font-medium px-5 py-4 shadow sticky text-xl top-14 lg:col-span-2 2xl:col-span-4;
            }

            .result {
                @apply cursor-default duration-500 m-4 overflow-hidden rounded transition hover:ring-1;
            }
        }
    }
</style>
