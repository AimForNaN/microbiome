import { defineStore } from 'pinia';
import * as Papa from 'papaparse';
import Row from './../lib/Row.js';
import round from './../lib/round.js';

export const useMicrobiomeStore = defineStore('microbiome', {
    state: () => ({
        Category: 'Species',
        Filter: '',
        csv: [],
    }),
    actions: {
        getCategorized(category) {
            var ret = this.Filtered.filter((item) => {
                return item.Category == category;
            });
            ret.sort((a,b) => {
                a = a.Name;
                b = b.Name;
                return a.localeCompare(b);
            });
            return ret;
        },
        parseCsv(input) {
            this.csv = [];
            Papa.parse(input, {
                dynamicTyping: true,
                header: true,
                worker: true,
                step: (row) => {
                    this.csv.push(new Row(row.data));
                },
            });
        },
    },
    getters: {
        ...{
            Akkermansia(state) {
                var {Genus} = state;
                return Genus.filter((row) => {
                    return row.Genus == 'Akkermansia';
                });
            },
            Alistipes(state) {
                var {Genus} = state;
                return Genus.filter((row) => {
                    return row.Genus == 'Alistipes';
                });
            },
            Bifidobacterium(state) {
                var {Genus} = state;
                return Genus.filter((row) => {
                    return row.Genus == 'Bifidobacterium';
                });
            },
            Enterococcus(state) {
                var {Genus} = state;
                return Genus.filter((row) => {
                    return row.Genus == 'Enterococcus';
                });
            },
            Escherichia(state) {
                var {Genus} = state;
                return Genus.filter((row) => {
                    return row.Genus == 'Escherichia';
                });
            },
            Faecalibacterium(state) {
                var {Genus} = state;
                return Genus.filter((row) => {
                    return row.Genus == 'Faecalibacterium';
                });
            },
            Klebsiella(state) {
                var {Genus} = state;
                return Genus.filter((row) => {
                    return row.Genus == 'Klebsiella';
                });
            },
            Lactobacillus(state) {
                var {Genus} = state;
                return Genus.filter((row) => {
                    return row.Genus == 'Lactobacillus';
                });
            },
            Methanobacteria(state) {
                var {Cls} = state;
                return Cls.filter((row) => {
                    return row.Cls == 'Methanobacteria';
                });
            },
            Parabacteroides(state) {
                var {Genus} = state;
                return Genus.filter((row) => {
                    return row.Genus == 'Parabacteroides';
                });
            },
            Prevotella(state) {
                var {Genus} = state;
                return Genus.filter((row) => {
                    return row.Genus == 'Prevotella';
                });
            },
            Staphylococcus(state) {
                var {Genus} = state;
                return Genus.filter((row) => {
                    return row.Genus == 'Staphylococcus';
                });
            },
            Fungi(state) {
                var {Kingdom} = state;
                return Kingdom.filter((row) => {
                    return row.Kingdom == 'Fungi';
                });
            },
        },
        ...{
            Domain(state) {
                return state.csv.filter((item) => {
                    return item.Category == 'Domain';
                });
            },
            Kingdom(state) {
                return state.csv.filter((item) => {
                    return item.Category == 'Kingdom';
                });
            },
            Phylum(state) {
                return state.csv.filter((item) => {
                    return item.Category == 'Phylum';
                });
            },
            Cls(state) {
                return state.csv.filter((item) => {
                    return item.Category == 'Class';
                });
            },
            Order(state) {
                return state.csv.filter((item) => {
                    return item.Category == 'Order';
                });
            },
            Family(state) {
                return state.csv.filter((item) => {
                    return item.Category == 'Family';
                });
            },
            Genus(state) {
                return state.csv.filter((item) => {
                    return item.Category == 'Genus';
                });
            },
            Species(state) {
                return state.csv.filter((item) => {
                    return item.Category == 'Species';
                });
            },
            Strain(state) {
                return state.csv.filter((item) => {
                    return item.Category == 'Strain';
                });
            },
        },
        Filtered(state) {
            return state.csv.filter((row) => {
                if (state.Filter.length) {
                    let data = row.Categorization.map((item) => {
                        return String(item).toLowerCase();
                    });
                    return data.find((item) => {
                        return item.includes(state.Filter.toLowerCase());
                    });
                }
                return true;
            });
        },
    },
});
