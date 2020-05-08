class CensusGeography {
    static nation() { 
        return "nation";
    }
    static region() { 
        return "region";
    }
    static division() { 
        return "division";
    }
    static state() { 
        return "state";
    }
    static statisticalArea() { 
        return "statisticalArea";
    }
    static place() { 
        return "place";
    }
    static county() { 
        return "county";
    }
    static tract() { 
        return "tract";
    }

    static all() {
        return [CensusGeography.nation(), CensusGeography.region(), CensusGeography.division(), CensusGeography.state(), CensusGeography.statisticalArea(), CensusGeography.place(), CensusGeography.county(), CensusGeography.tract()];
    }

    static isValid(value) {
        var result = false;

        switch (value) {
            case CensusGeography.nation():
            case CensusGeography.region():
            case CensusGeography.division():
            case CensusGeography.state():
            case CensusGeography.statisticalArea():
            case CensusGeography.place():
            case CensusGeography.county():
            case CensusGeography.tract():
                result = true;
                break;
            default:
                break;
        }

        return result;
    }
}
