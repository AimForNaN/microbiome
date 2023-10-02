export default class Row {
    row = {};

    constructor(row) {
        this.row = row;
    }

    get Abundance() {
		throw new Error('Trying to access abstract property!');
    }

    static get Categories() {
        return [
            'Domain',
            'Kingdom',
            'Phylum',
            'Class',
            'Order',
            'Family',
            'Genus',
            'Species',
            'Subspecies',
            'Strain',
        ];
    }

    get Categorization() {
        return [
            this.Domain,
            this.Kingdom,
            this.Phylum,
            this.Class,
            this.Order,
            this.Family,
            this.Genus,
            this.Species,
            this.Subspecies,
            this.Strain,
        ].filter(x => x);
    }

    get Class() {
		throw new Error('Trying to access abstract property!');
    }

    get Domain() {
		throw new Error('Trying to access abstract property!');
    }

    get Family() {
		throw new Error('Trying to access abstract property!');
    }

    get Genus() {
		throw new Error('Trying to access abstract property!');
    }

    get Kingdom() {
		throw new Error('Trying to access abstract property!');
    }

    get Name() {
		throw new Error('Trying to access abstract property!');
    }

    get Order() {
		throw new Error('Trying to access abstract property!');
    }

    get Percentile() {
		throw new Error('Trying to access abstract property!');
    }

    get Phylum() {
		throw new Error('Trying to access abstract property!');
    }

    get Species() {
		throw new Error('Trying to access abstract property!');
    }

    get Subspecies() {
		throw new Error('Trying to access abstract property!');
    }

    get Strain() {
		throw new Error('Trying to access abstract property!');
    }
}
