import { defineStore } from 'pinia';
import * as Papa from 'papaparse';
import round from './../lib/round.js';

export const useMicrobiomeStore = defineStore('microbiome', {
    state: () => ({
        csv: [],
        filter: '',
    }),
    actions: {
        getCategorized(tab) {
            var categories = ['Phylum', 'Class', 'Order', 'Family', 'Genus', 'Species', 'Strain'];
            var idx = categories.indexOf(tab.Value);
            var cat = categories[idx];
            if (cat == 'Class') {
                cat = 'Cls';
            }
            var reduced = this.Filtered.reduce((ret, item) => {
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
                a = a.Name;
                b = b.Name;
                return a.localeCompare(b);
            });
        },
        parseCsv(input) {
            this.csv = [];
            Papa.parse(input, {
                dynamicTyping: true,
                header: true,
                worker: true,
                step: (row) => {
                    row = row.data;
                    var Abundance = row['Abundance (%)'];
                    var Cls = row['CLASS'];
                    var Comparison = row['Your percentile (compared to other adults) *'];
                    var Family = row['FAMILY'];
                    var Genus = row['GENUS'];
                    var Order = row['ORDER'];
                    var Phylum = row['PHYLUM'];
                    var Species = row['SPECIES'];
                    var Subspecies = row['SUBSPECIES'];
                    var Strain = row['STRAIN'];

                    if (Species || Strain) {
                        this.csv.push({
                            Abundance,
                            Categorization: [
                                Phylum,
                                Cls,
                                Order,
                                Family,
                                Genus,
                                Species,
                                Subspecies,
                                Strain,
                            ].filter(x => x),
                            Cls,
                            Comparison,
                            Family,
                            Genus,
                            Name: Strain || Subspecies || Species,
                            Order,
                            Phylum,
                            Species,
                            Strain,
                        });
                    }
                },
            });
        },
    },
    getters: {
        Bifidobacterium(state) {
            var {csv} = state;
            return csv.filter((row) => {
                return row.Genus == 'Bifidobacterium';
            });
        },
        Filtered(state) {
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
        },
        Lactobacillus(state) {
            var {csv} = state;
            return csv.filter((row) => {
                return row.Genus == 'Lactobacillus';
            });
        },
    },
});
