import * as Papa from 'papaparse';

export function parse(input) {
    return new Promise((resolve, reject) => {
        var ret = [];
        Papa.parse(input, {
            dynamicTyping: true,
            header: true,
            worker: true,
            step(row) {
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
                    ret.push({
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
            complete() {
                resolve(ret);
            },
        });
    });
}
