import { defineStore } from 'pinia';
import { computed, shallowRef, triggerRef } from "vue";
import * as Papa from 'papaparse';
import round from "../lib/round";
import Thorne from '../lib/vendor/thorne';

/**
 * @type Microbiome
 * @property {string} Name
 * @property {string} Phylum
 * @property {string} Class
 * @property {string} Order
 * @property {string} Family
 * @property {string} Genus
 * @property {string} Species
 * @property {string} Subspecies
 * @property {string} Strain
 * @property {number} Average
 * @property {number} Value
 */


export const useMicrobiomeStore = defineStore('microbiome', () => {
	const Filter = shallowRef('');
	const csv = shallowRef([]);

	function computeCategory(list, key1, key2) {
		return computed(() => {
			var ret = list.value.filter((row) => {
				return row[key1] && row[key1] == row[key2];
			});
            ret.sort((a,b) => {
                a = a.Name;
                b = b.Name;
                return a.localeCompare(b);
            });
			return ret;
		});
	}
	function computeFilteredItems(list, key, val) {
		return computed(() => {
			var ret = list.value.filter((row) => {
				return row[key] && row[key] == val;
			});
            ret.sort((a,b) => {
                a = a.Name;
                b = b.Name;
                return a.localeCompare(b);
            });
			return ret;
		});
	}
	function computeFindItem(list, key, val) {
		return computed(() => {
			return list.value.find((row) => {
				return row[key] && row[key] == val;
			});
		});
	}

	const Domain = computeCategory(csv, 'Name', 'Domain');
	const Kingdom = computeCategory(csv, 'Name', 'Kingdom');
	const Phylum = computeCategory(csv, 'Name', 'Phylum');
	const Class = computeCategory(csv, 'Name', 'Class');
	const Order = computeCategory(csv, 'Name', 'Order');
	const Family = computeCategory(csv, 'Name', 'Family');
	const Genus = computeCategory(csv, 'Name', 'Genus');
	const Species = computeCategory(csv, 'Name', 'Species');
	const Subspecies = computeCategory(csv, 'Name', 'Subspecies');
	const Strain = computeCategory(csv, 'Strain');

	const Actinobacteria = computeFindItem(Phylum, 'Name', 'Actinobacteria');
	const ActinobacteriaGenus = computeFilteredItems(Genus, 'Phylum', 'Actinobacteria');

	const Bacteroidetes = computeFindItem(Phylum, 'Name', 'Bacteroidetes');
	const BacteroidetesGenus = computeFilteredItems(Genus, 'Phylum', 'Bacteroidetes');

	const Firmicutes = computeFindItem(Phylum, 'Name', 'Firmicutes');
	const FirmicutesGenus = computeFilteredItems(Genus, 'Phylum', 'Firmicutes');
	const FirmicutesSpecies = computeFilteredItems(Species, 'Phylum', 'Firmicutes');
	const FirmicutesSummarized = computed(() => {
		var summary = new Map();
		Firmicutes.value.forEach((row) => {
			var { Name } = row;
			if (Name) {
				Name = Name.replace(/[\[\]]+/g, '');
				Name = Name.split(/\s+/);
				var [first] = Name;

				if (first) {
					if (!summary.has(first)) {
						summary.set(first, {
							Name: first,
							Abundance: 0,
						});
					}

					let ref = summary.get(first);
					ref.Abundance = round(ref.Abundance + row.Abundance, 5);
				}
			}
		});
		let ret = Array.from(summary.values());
		ret.sort((a,b) => {
			a = a.Name;
			b = b.Name;
			return a.localeCompare(b);
		});
		return ret;
	});

	return {
		clear() {
			csv.value = [];
		},
		Filter,
        Filtered: computed(() => {
            return csv.value.filter((row) => {
                if (Filter.value.length) {
                    let data = row.Categorization.map((item) => {
                        return String(item).toLowerCase();
                    });
                    return data.find((item) => {
                        return item.includes(state.Filter.toLowerCase());
                    });
                }
                return true;
            });
        }),
        getCategorized(category) {
            var ret = Filtered.value.filter((item) => {
                return item.Category == category;
            });
            ret.sort((a,b) => {
                a = a.Name;
                b = b.Name;
                return a.localeCompare(b);
            });
            return ret;
        },
		length: computed(() => {
			return csv.value.length;
		}),
        parseCsv(input, vendor) {
			return new Promise((resolve, reject) => {
				csv.value = [];
				Papa.parse(input, {
					dynamicTyping: true,
					header: true,
					worker: true,
					step: (row) => {
						switch (vendor) {
							case 'thorne': {
								csv.value.push(new Thorne(row.data));
								break;
							}
						}
					},
					complete() {
						triggerRef(csv);
						resolve();
					},
				});
			});
        },
		// ---
		Akkermansia: computeFindItem(Genus, 'Genus', 'Akkermansia'),
		Alistipes: computeFindItem(Genus, 'Genus', 'Alistipes'),
		Bifidobacterium: computeFindItem(Genus, 'Genus', 'Bifidobacterium'),
		Enterococcus: computeFindItem(Genus, 'Genus', 'Enterococcus'),
		Escherichia: computeFindItem(Genus, 'Genus', 'Escherichia'),
		Faecalibacterium: computeFindItem(Genus, 'Genus', 'Faecalibacterium'),
		Klebsiella: computeFindItem(Genus, 'Genus', 'Klebsiella'),
		Lactobacillus: computeFindItem(Genus, 'Genus', 'Lactobacillus'),
		Methanobacteria: computeFindItem(Class, 'Class', 'Methanobacteria'),
		Parabacteroides: computeFindItem(Genus, 'Genus', 'Parabacteroides'),
		Prevotella: computeFindItem(Genus, 'Genus', 'Prevotella'),
		Staphylococcus: computeFindItem(Genus, 'Genus', 'Staphylococcus'),
		Fungi: computeFindItem(Kingdom, 'Kingdom', 'Fungi'),
		// ---
		Actinobacteria,
		ActinobacteriaGenus,
		Bacteroidetes,
		BacteroidetesGenus,
		Firmicutes,
		FirmicutesGenus,
		FirmicutesSpecies,
		FirmicutesSummarized,
		// ---
		Domain,
		Kingdom,
		Phylum,
		Class,
		Order,
		Family,
		Genus,
		Species,
		Subspecies,
		Strain,
	};
});
