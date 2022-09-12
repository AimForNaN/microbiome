export default class Row {
    #row;

    constructor(row) {
        this.row = row;
    }

    get Abundance() {
        return this.row['Abundance (%)'];
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

    get Category() {
        var {Categories} = this.constructor;
        Categories.reverse();
        for (var i = 0; i < Categories.length; i++) {
            let cat = Categories[i];
            if (cat == 'Class') {
                cat = 'Cls';
            }
            if (this[cat]) {
                if (cat == 'Cls') {
                    cat = 'Class';
                }
                return cat;
            }
        }
    }

    get Categorization() {
        return [
            this.Domain,
            this.Kingdom,
            this.Phylum,
            this.Cls,
            this.Order,
            this.Family,
            this.Genus,
            this.Species,
            this.Subspecies,
            this.Strain,
        ].filter(x => x);
    }

    get Cls() {
        return this.row['CLASS'];
    }

    get Comparison() {
        return this.row['Your percentile (compared to other adults) *'];
    }

    get Domain() {
        return this.row['DOMAIN'];
    }

    get Family() {
        return this.row['FAMILY'];
    }

    get Genus() {
        return this.row['GENUS'];
    }

    get Kingdom() {
        return this.row['KINGDOM'];
    }

    get Name() {
        var ret = [
            this.Phylum,
            this.Class,
            this.Order,
            this.Family,
            this.Genus,
            this.Species,
            this.Strain,
        ].filter(x => x);
        return ret.pop();
    }

    get Order() {
        return this.row['ORDER'];
    }

    get Phylum() {
        return this.row['PHYLUM'];
    }

    get Species() {
        return this.row['SPECIES'];
    }

    get Subspecies() {
        return this.row['SUBSPECIES'];
    }

    get Strain() {
        return this.row['STRAIN'];
    }
}
