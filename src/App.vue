<script setup>
    import {
        computed,
        reactive,
        unref,
    } from 'vue';

    import { useMicrobiomeStore } from './stores/microbiome.js';
    import Microbe from './components/Microbe.vue';

    const store = useMicrobiomeStore();
    const state = reactive({
        tabs: [
            {
                Active: false,
                Value: 'Summary',
            },
            {
                Active: true,
                Value: 'Phylum',
            },
            {
                Active: false,
                Value: 'Class',
            },
            {
                Active: false,
                Value: 'Order',
            },
            {
                Active: false,
                Value: 'Family',
            },
            {
                Active: false,
                Value: 'Genus',
            },
            {
                Active: false,
                Value: 'Species',
            },
            {
                Active: false,
                Value: 'Strain',
            },
        ],
    });

    const tab = computed(() => {
        return state.tabs.find((tab) => {
            return tab.Active;
        });
    });
    const categorized = computed(() => {
        return store.getCategorized(unref(tab));
    });

    function onFileChange(e) {
        var input = e.target;
        store.parseCsv(input.files[0]);
    }
    function setActiveTab(newTab) {
        unref(tab).Active = false;
        newTab.Active = true;
    }
</script>

<template>
    <header>
        <button :class="{ active: tab.Active }" type="button" v-for="tab in state.tabs" @click="setActiveTab(tab)">{{tab.Value}}</button>
        <input class="filter" placeholder="Filter" type="text" v-model="store.filter">
        <span class="flex-1"></span>
        <input class="file" type="file" @change="onFileChange">
    </header>
    <div class="summary" v-if="tab.Value == 'Summary'">
        <div class="bifidobacterium results">
            <header class="col-span-3">Bifidobacterium</header>
            <Microbe class="result" :data="row" v-for="row in store.Bifidobacterium" :key="row.Name"></Microbe>
        </div>
        <div class="lactobacillus results">
            <header class="col-span-3">Lactobacillus</header>
            <Microbe class="result" :data="row" v-for="row in store.Lactobacillus" :key="row.Name"></Microbe>
        </div>
    </div>
    <div class="results" v-else>
        <Microbe class="result" :data="row" v-for="row in categorized" :key="row.Name"></Microbe>
    </div>
</template>

<style lang="less">
#app {
    @apply flex flex-col min-h-0 min-w-0;

    > header {
        @apply bg-white border-b flex items-center p-2 space-x-2 sticky top-0 z-10;

        button {
            @apply duration-500 px-3 py-2 rounded transition hover:bg-gray-50;

            &.active {
                @apply bg-gray-100;
            }
        }
    }

    .filter {
        @apply border px-2 py-1 rounded focus:outline-none focus:ring-2;
    }

    .results {
        @apply grid grid-cols-1 min-w-0 lg:grid-cols-2 2xl:grid-cols-3;

        header {
            @apply bg-white border-b px-5 py-3 sticky top-14;
        }

        .result {
            @apply cursor-default duration-500 m-4 overflow-hidden p-2 rounded transition hover:ring-1;
        }
    }

    .summary {
        @apply divide-y;
    }
}
</style>
