class CensusGeography {
    static nation = "nation"
    static region = "region"
    static division = "division"
    static state = "state"
    static statisticalArea = "statisticalArea"
    static place = "place"
    static county = "county"
    static tract = "tract"

    static all() {
        return [CensusGeography.nation, CensusGeography.region, CensusGeography.division, CensusGeography.state, CensusGeography.statisticalArea, CensusGeography.place, CensusGeography.county, CensusGeography.tract];
    }

    static isValid(value) {
        var result = false;

        switch (value) {
            case CensusGeography.nation:
            case CensusGeography.region:
            case CensusGeography.division:
            case CensusGeography.state:
            case CensusGeography.statisticalArea:
            case CensusGeography.place:
            case CensusGeography.county:
            case CensusGeography.tract:
                result = true;
                break;
            default:
                break;
        }

        return result;
    }
}
