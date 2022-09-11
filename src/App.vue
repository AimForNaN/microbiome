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
                Value: 'Summary',
            },
            {
                Active: true,
                Value: 'Phylum',
            },
            {
                Active: false,
                Value: 'Genus',
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
                Value: 'Species',
            },
            {
                Active: false,
                Value: 'Strain',
            },
        ],
    });

    const filtered = computed(() => {
        var {csv} = state;
        return csv.filter((row) => {
            if (state.filter.length) {
                let data = [
                    row.Phylum,
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
    const tab = computed(() => {
        return state.tabs.find((tab) => {
            return tab.Active;
        });
    });
    const categorized = computed(() => {
        var categories = ['Phylum', 'Genus', 'Order', 'Family', 'Species', 'Strain'];
        var idx = categories.indexOf(unref(tab).Value);
        var cat = categories[idx];
        var reduced = unref(filtered).reduce((ret, item) => {
            var name = item[cat];
            if (name && !ret.has(name)) {
                ret.set(name, {
                    Abundance: 0,
                    Categorization: item.Categorization.filter((item, i) => {
                        return i <= idx;
                    }),
                    Comparison: ['Species', 'Strain'].includes(cat) && item.Comparison,
                    Name: name,
                });
            }
            if (name && ret.has(name)) {
                let data = ret.get(name);
                data.Abundance = round(data.Abundance + item.Abundance, 5);
            }
            return ret;
        }, new Map());
        return Array.from(reduced.values()).sort((a,b) => {
            a = a.Abundance;
            b = b.Abundance;
            return b - a;
        });
    });

    function onFileChange(e) {
        state.csv = [];
        var input = e.target;
        parse(input.files[0]).then((data) => {
            state.csv = data;
        });
    }
    function round(value, precision) {
        var multiplier = Math.pow(10, precision || 0);
        return Math.round(value * multiplier) / multiplier;
    }
    function setActiveTab(newTab) {
        unref(tab).Active = false;
        newTab.Active = true;
    }
</script>

<template>
    <header>
        <button :class="{ active: tab.Active }" type="button" v-for="tab in state.tabs" @click="setActiveTab(tab)">{{tab.Value}}</button>
        <input class="filter" placeholder="Filter" type="text" v-model="state.filter">
        <span class="flex-1"></span>
        <input class="file" type="file" @change="onFileChange">
    </header>
    <div class="summary" v-if="tab.Value == 'Summary'">
    </div>
    <div class="results" v-else>
        <Microbe class="result" :data="row" v-for="(row, idx) in categorized" :key="idx"></Microbe>
    </div>
</template>

<style lang="less">
#app {
    @apply flex flex-col min-h-0 min-w-0;

    header {
        @apply bg-white border-b flex items-center p-2 space-x-2 sticky top-0;

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
        @apply grid grid-cols-1 min-w-0 p-8 lg:grid-cols-2 2xl:grid-cols-3;

        .result {
            @apply cursor-default duration-500 m-4 overflow-hidden p-4 rounded transition hover:ring-1;
        }
    }
}
</style>
