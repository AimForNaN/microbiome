<script setup>
    import {
        computed,
        reactive,
        unref,
    } from 'vue';

    import {parse} from './lib/parser.js';
    import Microbe from './components/Microbe.vue';

    const state = reactive({
        csv: [],
        filter: '',
        tabs: [
            {
                Active: false,
                Value: 'Genus',
            },
            {
                Active: true,
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
    const filtered = computed(() => {
        var {csv} = state;
        return csv.filter((row) => {
            if (state.filter.length) {
                let data = [
                    row.Genus,
                    row.Order,
                    row.Species,
                    row.Strain,
                ].map((item) => {
                    return String(item).toLowerCase();
                });
                return data.find((item) => {
                    return item.includes(state.filter.toLowerCase());
                });
            }
            return true;
        });
    });

    function onFileChange(e) {
        state.csv = [];
        var input = e.target;
        parse(input.files[0]).then((data) => {
            state.csv = data;
        });
    }
    function setActiveTab(newTab) {
        unref(tab).Active = false;
        newTab.Active = true;
    }
</script>

<template>
    <header>
        <button :class="{ active: tab.Active }" type="button" v-for="tab in state.tabs" @click="setActiveTab(tab)">{{tab.Value}}</button>
        <input class="filter" type="text" v-model="state.filter">
        <input class="file" type="file" @change="onFileChange">
    </header>
    <div class="results">
        <Microbe class="result" :data="row" :type="tab.Value" v-for="(row, idx) in filtered" :key="idx"></Microbe>
    </div>
</template>

<style lang="less">
#app {
    @apply flex flex-col min-h-0 min-w-0;

    header {
        @apply bg-white border-b flex items-center p-2 space-x-2 sticky top-0;

        button {
            @apply px-3 py-2 rounded;

            &.active {
                @apply bg-gray-100;
            }
        }
    }

    .filter {
        @apply border px-2 py-1 rounded focus:outline-none focus:ring-2;
    }

    .results {
        @apply grid grid-cols-1 min-w-0 p-8 lg:grid-cols-2 2xl:grid-cols-3;

        .result {
            @apply cursor-default duration-500 m-4 overflow-hidden p-4 rounded transition hover:ring-1;
        }
    }
}
</style>
