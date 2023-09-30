import Row from '../row';

export default class Thorne extends Row {
    get Abundance() {
        return this.row['Abundance (%)'];
    }

    get Class() {
        return this.row['CLASS'];
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
            this.Subspecies,
            this.Strain,
        ].filter(x => x);
        return ret.pop();
    }

    get Order() {
        return this.row['ORDER'];
    }

    get Percentile() {
        return this.row['Your percentile (compared to other adults) *'];
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
