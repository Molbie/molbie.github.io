class HousingUnits {
    constructor(data) {
        this.total = null;

        if (data.housingUnits != null) {
            if (data.housingUnits.total != null) {
                this.total = parseInt(data.housingUnits.total, 10);
            }
        }
    }
}
class Vehicle {
    constructor(data) {
        this.none = null;
        this.one = null;
        this.two = null;
        this.three = null;
        this.four = null;
        this.fiveOrMore = null;
        this.total = null;

        if (data.vehicle != null) {
            if (data.vehicle.none != null) {
                this.none = parseInt(data.vehicle.none, 10);
            }
            if (data.vehicle.one != null) {
                this.one = parseInt(data.vehicle.one, 10);
            }
            if (data.vehicle.two != null) {
                this.two = parseInt(data.vehicle.two, 10);
            }
            if (data.vehicle.three != null) {
                this.three = parseInt(data.vehicle.three, 10);
            }
            if (data.vehicle.four != null) {
                this.four = parseInt(data.vehicle.four, 10);
            }
            if (data.vehicle.fiveOrMore != null) {
                this.fiveOrMore = parseInt(data.vehicle.fiveOrMore, 10);
            }
            if (data.vehicle.total != null) {
                this.total = parseInt(data.vehicle.total, 10);
            }
        }
    }
}
class Employment {
    constructor(data) {
        this.total = null;
        this.inLaborForce = null;
        this.notInLaborForce = null;
        this.armedForces = null;
        this.civilians = null;
        this.employed = null;
        this.unemployed = null;

        if (data.employment != null) {
            if (data.employment.total != null) {
                this.total = parseInt(data.employment.total, 10);
            }
            if (data.employment.inLaborForce != null) {
                this.inLaborForce = parseInt(data.employment.inLaborForce, 10);
            }
            if (data.employment.notInLaborForce != null) {
                this.notInLaborForce = parseInt(data.employment.notInLaborForce, 10);
            }
            if (data.employment.armedForces != null) {
                this.armedForces = parseInt(data.employment.armedForces, 10);
            }
            if (data.employment.civilians != null) {
                this.civilians = parseInt(data.employment.civilians, 10);
            }
            if (data.employment.employed != null) {
                this.employed = parseInt(data.employment.employed, 10);
            }
            if (data.employment.unemployed != null) {
                this.unemployed = parseInt(data.employment.unemployed, 10);
            }
        }
    }
}
class Population {
    constructor(data) {
        this.total = null;

        if (data.population != null) {
            if (data.population.total != null) {
                this.total = parseInt(data.population.total, 10);
            }
        }
    }
}
class Age {
    constructor(data) {
        this.median = null;
        this.male = null;
        this.female = null;

        if (data.age != null) {
            if (data.age.median != null) {
                this.median = parseFloat(data.age.median);
            }
            if (data.age.male != null) {
                this.male = parseFloat(data.age.male);
            }
            if (data.age.female != null) {
                this.female = parseFloat(data.age.female);
            }
        }
    }
}
class Poverty {
    constructor(data) {
        this.total = null;
        this.above = null;
        this.below = null;

        if (data.poverty != null) {
            if (data.poverty.total != null) {
                this.total = parseInt(data.poverty.total, 10);
            }
            if (data.poverty.above != null) {
                this.above = parseInt(data.poverty.above, 10);
            }
            if (data.poverty.below != null) {
                this.below = parseInt(data.poverty.below, 10);
            }
        }
    }
}
class Household {
    constructor(data) {
        this.total = null;

        if (data.household != null) {
            if (data.household.total != null) {
                this.total = parseInt(data.household.total, 10);
            }
        }
    }
}
class Vacancy {
    constructor(data) {
        this.total = null;
        this.forSale = null;
        this.soldNotOccupied = null;
        this.forRent = null;
        this.rentedNotOccupied = null;
        this.seasonal = null;
        this.migrantWorkers = null;
        this.other = null;

        if (data.vacancy != null) {
            if (data.vacancy.total != null) {
                this.total = parseInt(data.vacancy.total, 10);
            }
            if (data.vacancy.forSale != null) {
                this.forSale = parseInt(data.vacancy.forSale, 10);
            }
            if (data.vacancy.soldNotOccupied != null) {
                this.soldNotOccupied = parseInt(data.vacancy.soldNotOccupied, 10);
            }
            if (data.vacancy.forRent != null) {
                this.forRent = parseInt(data.vacancy.forRent, 10);
            }
            if (data.vacancy.rentedNotOccupied != null) {
                this.rentedNotOccupied = parseInt(data.vacancy.rentedNotOccupied, 10);
            }
            if (data.vacancy.seasonal != null) {
                this.seasonal = parseInt(data.vacancy.seasonal, 10);
            }
            if (data.vacancy.migrantWorkers != null) {
                this.migrantWorkers = parseInt(data.vacancy.migrantWorkers, 10);
            }
            if (data.vacancy.other != null) {
                this.other = parseInt(data.vacancy.other, 10);
            }
        }
    }
}
class Income {
    constructor(data) {
        this.household = null;
        this.family = null;
        this.perCapita = null;

        if (data.income != null) {
            if (data.income.household != null) {
                this.household = parseInt(data.income.household, 10);
            }
            if (data.income.family != null) {
                this.family = parseInt(data.income.family, 10);
            }
            if (data.income.perCapita != null) {
                this.perCapita = parseInt(data.income.perCapita, 10);
            }
        }
    }
}
class HouseValue {
    constructor(data) {
        this.median = null;
        this.average = null;
        this.upperQuartile = null;
        this.lowerQuartile = null;

        if (data.houseValue != null) {
            if (data.houseValue.median != null) {
                this.median = parseInt(data.houseValue.median, 10);
            }
            if (data.houseValue.average != null) {
                this.average = parseInt(data.houseValue.average, 10);
            }
            if (data.houseValue.upperQuartile != null) {
                this.upperQuartile = parseInt(data.houseValue.upperQuartile, 10);
            }
            if (data.houseValue.lowerQuartile != null) {
                this.lowerQuartile = parseInt(data.houseValue.lowerQuartile, 10);
            }
        }
    }
}
class Occupancy {
    constructor(data) {
        this.total = null;
        this.occupied = null;
        this.vacant = null;

        if (data.occupancy != null) {
            if (data.occupancy.total != null) {
                this.total = parseInt(data.occupancy.total, 10);
            }
            if (data.occupancy.occupied != null) {
                this.occupied = parseInt(data.occupancy.occupied, 10);
            }
            if (data.occupancy.vacant != null) {
                this.vacant = parseInt(data.occupancy.vacant, 10);
            }
        }
    }
}
class GeoMeta {
    constructor(data) {
        this.geoId = null;
        this.year = null;
        this.geoType = null;
        this.name = null;
        this.nationId = null;
        this.regionId = null;
        this.divisionId = null;
        this.stateId = null;
        this.statisticalAreaId = null;
        this.placeId = null;
        this.countyId = null;
        this.tractId = null;
        this.landArea = null;
        this.waterArea = null;

        if (data.meta != null) {
            if (data.meta.geoId != null) {
                this.geoId = data.meta.geoId + "";
            }
            if (data.meta.year != null) {
                this.year = parseInt(data.meta.year, 10);
            }
            if (data.meta.geoType != null) {
                this.geoType = data.meta.geoType;
            }
            if (data.meta.name != null) {
                this.name = data.meta.name;
            }
            if (data.meta.nationId != null) {
                this.nationId = data.meta.nationId;
            }
            if (data.meta.regionId != null) {
                this.regionId = data.meta.regionId;
            }
            if (data.meta.divisionId != null) {
                this.divisionId = data.meta.divisionId;
            }
            if (data.meta.stateId != null) {
                this.stateId = data.meta.stateId;
            }
            if (data.meta.statisticalAreaId != null) {
                this.statisticalAreaId = data.meta.statisticalAreaId;
            }
            if (data.meta.placeId != null) {
                this.placeId = data.meta.placeId;
            }
            if (data.meta.countyId != null) {
                this.countyId = data.meta.countyId;
            }
            if (data.meta.tractId != null) {
                this.tractId = data.meta.tractId;
            }
            if (data.meta.landArea != null) {
                this.landArea = parseFloat(data.meta.landArea);
            }
            if (data.meta.waterArea != null) {
                this.waterArea = parseFloat(data.meta.waterArea);
            }
        }
    }
}

class GeoTimePeriod {
    constructor(geoId, year, data) {
        this.geoId = geoId + "";                    // TODO: remove this in favor of the meta object
        this.year = parseInt(year, 10);             // TODO: remove this in favor of the meta object
        this.meta = new GeoMeta(data);
        this.housingUnits = new HousingUnits(data);
        this.vehicle = new Vehicle(data);
        this.employment = new Employment(data);
        this.population = new Population(data);
        this.age = new Age(data);
        this.poverty = new Poverty(data);
        this.household = new Household(data);
        this.vacancy = new Vacancy(data);
        this.income = new Income(data);
        this.houseValue = new HouseValue(data);
        this.occupancy = new Occupancy(data);
    }
}
class GeoData {
    static years() { 
        return [2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2000];
    }

    constructor(geoId) {
        this.geoId = geoId;
        this.data = {};

        for (const year in GeoData.years()) {
            this.data["Y" + year] = new GeoTimePeriod(geoId, year, {});
        }
    }

    add(timeperiod) {
        this.data["Y" + timeperiod.year] = timeperiod;
    }

    getData(year) {
        if (this.data["Y" + year] != null) {
            return this.data["Y" + year];
        } else {
            return new GeoTimePeriod(null, null, {});
        }
    }

    getName(year) {
        var result = null;
        
        if (year != null) {
            var timePeriod = this.getData(year);
            result = timePeriod.meta.name;
        } else {
            for (const year of GeoData.years()) {
                var timePeriod = this.getData(year);
                
                if (timePeriod.meta.name != null) {
                    result = timePeriod.meta.name;
                }
                
                if (result != null) {
                    break;
                }
            }
        }

        return result;
    }

    getLandArea(year) {
        var result = null;
        
        if (year != null) {
            var timePeriod = this.getData(year);
            if (!isNaN(timePeriod.meta.landArea)) {
                result = timePeriod.meta.landArea;
            }
        } else {
            for (const year of GeoData.years()) {
                var timePeriod = this.getData(year);
                
                if (timePeriod.meta.landArea != null && !isNaN(timePeriod.meta.landArea)) {
                    result = timePeriod.meta.landArea;
                }
                
                if (result != null) {
                    break;
                }
            }
        }

        return result;
    }

    getWaterArea(year) {
        var result = null;
        
        if (year != null) {
            var timePeriod = this.getData(year);
            if (!isNaN(timePeriod.meta.waterArea)) {
                result = timePeriod.meta.waterArea;
            }
        } else {
            for (const year of GeoData.years()) {
                var timePeriod = this.getData(year);
                
                if (timePeriod.meta.waterArea != null && !isNaN(timePeriod.meta.waterArea)) {
                    result = timePeriod.meta.waterArea;
                }
                
                if (result != null) {
                    break;
                }
            }
        }

        return result;
    }

    getPopulationTotal(year) {
        var result = null;
        
        if (year != null) {
            var timePeriod = this.getData(year);
            if (!isNaN(timePeriod.population.total)) {
                result = timePeriod.population.total;
            }
        } else {
            for (const year of GeoData.years()) {
                var timePeriod = this.getData(year);
                
                if (timePeriod.population.total != null && !isNaN(timePeriod.population.total)) {
                    result = timePeriod.population.total;
                }
                
                if (result != null) {
                    break;
                }
            }
        }

        return result;
    }

    getHouseholdTotal(year) {
        var result = null;
        
        if (year != null) {
            var timePeriod = this.getData(year);
            if (!isNaN(timePeriod.household.total)) {
                result = timePeriod.household.total;
            }
        } else {
            for (const year of GeoData.years()) {
                var timePeriod = this.getData(year);
                
                if (timePeriod.household.total != null && !isNaN(timePeriod.household.total)) {
                    result = timePeriod.household.total;
                }
                
                if (result != null) {
                    break;
                }
            }
        }
        
        return result;
    }

    getMedianAge(year) {
        var result = null;
        
        if (year != null) {
            var timePeriod = this.getData(year);
            if (!isNaN(timePeriod.age.median)) {
                result = timePeriod.age.median;
            }
        } else {
            for (const year of GeoData.years()) {
                var timePeriod = this.getData(year);
                
                if (timePeriod.age.median != null && !isNaN(timePeriod.age.median)) {
                    result = timePeriod.age.median;
                }
                
                if (result != null) {
                    break;
                }
            }
        }
        
        return result;
    }

    getFamilyIncome(year) {
        var result = null;
        
        if (year != null) {
            var timePeriod = this.getData(year);
            if (!isNaN(timePeriod.income.family)) {
                result = timePeriod.income.family;
            }
        } else {
            for (const year of GeoData.years()) {
                var timePeriod = this.getData(year);
                
                if (timePeriod.income.family != null && !isNaN(timePeriod.income.family)) {
                    result = timePeriod.income.family;
                }
                
                if (result != null) {
                    break;
                }
            }
        }
        
        return result;
    }

    getHouseholdIncome(year) {
        var result = null;
        
        if (year != null) {
            var timePeriod = this.getData(year);
            if (!isNaN(timePeriod.income.household)) {
                result = timePeriod.income.household;
            }
        } else {
            for (const year of GeoData.years()) {
                var timePeriod = this.getData(year);
                
                if (timePeriod.income.household != null && !isNaN(timePeriod.income.household)) {
                    result = timePeriod.income.household;
                }
                
                if (result != null) {
                    break;
                }
            }
        }
        
        return result;
    }

    getPerCapitaIncome(year) {
        var result = null;
        
        if (year != null) {
            var timePeriod = this.getData(year);
            if (!isNaN(timePeriod.income.perCapita)) {
                result = timePeriod.income.perCapita;
            }
        } else {
            for (const year of GeoData.years()) {
                var timePeriod = this.getData(year);
                
                if (timePeriod.income.perCapita != null && !isNaN(timePeriod.income.perCapita)) {
                    result = timePeriod.income.perCapita;
                }
                
                if (result != null) {
                    break;
                }
            }
        }
        
        return result;
    }

    getHousingUnitsTotal(year) {
        var result = null;
        
        if (year != null) {
            var timePeriod = this.getData(year);
            if (!isNaN(timePeriod.housingUnits.total)) {
                result = timePeriod.housingUnits.total;
            }
        } else {
            for (const year of GeoData.years()) {
                var timePeriod = this.getData(year);
                
                if (timePeriod.housingUnits.total != null && !isNaN(timePeriod.housingUnits.total)) {
                    result = timePeriod.housingUnits.total;
                }
                
                if (result != null) {
                    break;
                }
            }
        }
        
        return result;
    }

    getMedianHouseValue(year) {
        var result = null;
        
        if (year != null) {
            var timePeriod = this.getData(year);
            if (!isNaN(timePeriod.houseValue.median)) {
                result = timePeriod.houseValue.median;
            }
        } else {
            for (const year of GeoData.years()) {
                var timePeriod = this.getData(year);
                
                if (timePeriod.houseValue.median != null && !isNaN(timePeriod.houseValue.median)) {
                    result = timePeriod.houseValue.median;
                }
                
                if (result != null) {
                    break;
                }
            }
        }
        
        return result;
    }

    getUpperQuartileHouseValue(year) {
        var result = null;
        
        if (year != null) {
            var timePeriod = this.getData(year);
            if (!isNaN(timePeriod.houseValue.upperQuartile)) {
                result = timePeriod.houseValue.upperQuartile;
            }
        } else {
            for (const year of GeoData.years()) {
                var timePeriod = this.getData(year);
                
                if (timePeriod.houseValue.upperQuartile != null && !isNaN(timePeriod.houseValue.upperQuartile)) {
                    result = timePeriod.houseValue.upperQuartile;
                }
                
                if (result != null) {
                    break;
                }
            }
        }
        
        return result;
    }

    getLowerQuartileHouseValue(year) {
        var result = null;
        
        if (year != null) {
            var timePeriod = this.getData(year);
            if (!isNaN(timePeriod.houseValue.lowerQuartile)) {
                result = timePeriod.houseValue.lowerQuartile;
            }
        } else {
            for (const year of GeoData.years()) {
                var timePeriod = this.getData(year);
                
                if (timePeriod.houseValue.lowerQuartile != null && !isNaN(timePeriod.houseValue.lowerQuartile)) {
                    result = timePeriod.houseValue.lowerQuartile;
                }
                
                if (result != null) {
                    break;
                }
            }
        }
        
        return result;
    }

    getVacancyRate(year) {
        var count = null;
        var total = null;
        
        if (year != null) {
            var timePeriod = this.getData(year);
            if (!isNaN(timePeriod.occupancy.vacant)) {
                count = timePeriod.occupancy.vacant;
            }
            if (!isNaN(timePeriod.occupancy.total)) {
                total = timePeriod.occupancy.total;
            }
        } else {
            for (const year of GeoData.years()) {
                var timePeriod = this.getData(year);

                if (count == null && timePeriod.occupancy.vacant != null && !isNaN(timePeriod.occupancy.vacant)) {
                    count = timePeriod.occupancy.vacant;
                }
                if (total == null && timePeriod.occupancy.total != null && !isNaN(timePeriod.occupancy.total)) {
                    total = timePeriod.occupancy.total;
                }
                
                if (count != null && total != null) {
                    break;
                }
            }
        }
        
        if (count != null && total != null) {
            return (count / total * 100).toFixed(2);
        } else {
            return null;
        }
    }

    getPovertyRate(year) {
        var count = null;
        var total = null;
        
        if (year != null) {
            var timePeriod = this.getData(year);
            if (!isNaN(timePeriod.poverty.below)) {
                count = timePeriod.poverty.below;
            }
            if (!isNaN(timePeriod.poverty.total)) {
                total = timePeriod.poverty.total;
            }
        } else {
            for (const year of GeoData.years()) {
                var timePeriod = this.getData(year);

                if (count == null && timePeriod.poverty.below != null && !isNaN(timePeriod.poverty.below)) {
                    count = timePeriod.poverty.below;
                }
                if (total == null && timePeriod.poverty.total != null && !isNaN(timePeriod.poverty.total)) {
                    total = timePeriod.poverty.total;
                }
                
                if (count != null && total != null) {
                    break;
                }
            }
        }

        if (count != null && total != null) {
            return (count / total * 100).toFixed(2);
        } else {
            return null;
        }
    }

    getUnemploymentRate(year) {
        var count = null;
        var total = null;
        
        if (year != null) {
            var timePeriod = this.getData(year);
            if (!isNaN(timePeriod.employment.unemployed)) {
                count = timePeriod.employment.unemployed;
            }
            if (!isNaN(timePeriod.employment.inLaborForce)) {
                total = timePeriod.employment.inLaborForce;
            }
        } else {
            for (const year of GeoData.years()) {
                var timePeriod = this.getData(year);

                if (count == null && timePeriod.employment.unemployed != null && !isNaN(timePeriod.employment.unemployed)) {
                    count = timePeriod.employment.unemployed;
                }
                if (total == null && timePeriod.employment.inLaborForce != null && !isNaN(timePeriod.employment.inLaborForce)) {
                    total = timePeriod.employment.inLaborForce;
                }
                
                if (count != null && total != null) {
                    break;
                }
            }
        }
        
        if (count != null && total != null) {
            return (count / total * 100).toFixed(2);
        } else {
            return null;
        }
    }
}
class MapData {
    constructor(geography, geoId, urlPrefix, onLoaded) {
        this.geography = geography;
        this.id = geoId;
        this.dataUrl = urlPrefix + geography + "/data/";
        this.data = {};
        this.load(function() { onLoaded(); });
    }

    fetch(url, onSuccess) {
        $.ajax({ 'async': true,
                 'global': false,
                 'url': url,
                 'dataType': "json",
                 'success': function(data) {
                     onSuccess(data);
                 },
                 'error': function() {
                    onSuccess({});
                 }
        });
    }

    load(onLoaded) {
        var self = this;
        var loadedCount = 0;

        for (const year of GeoData.years()) {
            this.fetch(this.dataUrl + this.id + "_" + year + ".json", function(rawData) {
                for (const geoId in rawData) {
                    if (self.data[geoId] == null) {
                        self.data[geoId] = new GeoData(geoId);
                    }
                    self.data[geoId].add(new GeoTimePeriod(geoId, year, rawData[geoId]));
                }

                loadedCount++;
                if (loadedCount == GeoData.years().length) {
                    onLoaded();
                }
            });
        }
    }

    getGeoData(geoId) {
        var geoData = this.data[geoId];
        return geoData ?? new GeoData(null);
    }

    getName(geoId) {
        var geoData = this.getGeoData(geoId);
        return geoData.getName(null);
    }

    getLandArea(geoId, year) {
        var geoData = this.getGeoData(geoId);
        return geoData.getLandArea(year);
    }

    getLandAreaStats(year) {
        var values = [];
        
        for (const geoId in this.data) {
            var geoData = this.data[geoId];
            var value = geoData.getLandArea(year);
            
            if (value != null && !isNaN(value)) {
                values.push(value);
            }
        }

        return new NumberStats(values);
    }

    getWaterArea(geoId, year) {
        var geoData = this.getGeoData(geoId);
        return geoData.getWaterArea(year);
    }

    getWaterAreaStats(year) {
        var values = [];
        
        for (const geoId in this.data) {
            var geoData = this.data[geoId];
            var value = geoData.getWaterArea(year);
            
            if (value != null && !isNaN(value)) {
                values.push(value);
            }
        }

        return new NumberStats(values);
    }

    getPopulationTotal(geoId, year) {
        var geoData = this.getGeoData(geoId);
        return geoData.getPopulationTotal(year);
    }

    getPopulationTotalStats(year) {
        var values = [];
        
        for (const geoId in this.data) {
            var geoData = this.data[geoId];
            var value = geoData.getPopulationTotal(year);
            
            if (value != null && !isNaN(value)) {
                values.push(value);
            }
        }

        return new NumberStats(values);
    }

    getPopulationDensity(geoId, year) {
        var population = this.getPopulationTotal(geoId, year);
        var landArea = this.getLandArea(geoId, year);
        var density = population / landArea;

        return isNaN(density) ? null : density;
    }

    getPopulationDensityStats(year) {
        var values = [];
        
        for (const geoId in this.data) {
            var population = this.getPopulationTotal(geoId, year);
            var landArea = this.getLandArea(geoId, year);
            var density = population / landArea;
            
            if (density != null && !isNaN(density)) {
                values.push(density);
            }
        }

        return new NumberStats(values);
    }

    getHouseholdTotal(geoId, year) {
        var geoData = this.getGeoData(geoId);
        return geoData.getHouseholdTotal(year);
    }

    getHouseholdTotalStats(year) {
        var values = [];
        
        for (const geoId in this.data) {
            var geoData = this.data[geoId];
            var value = geoData.getHouseholdTotal(year);

            if (value != null && !isNaN(value)) {
                values.push(value);
            }
        }

        return new NumberStats(values);
    }

    getMedianAge(geoId, year) {
        var geoData = this.getGeoData(geoId);
        return geoData.getMedianAge(year);
    }
    
    getMedianAgeStats(year) {
        var values = [];
        
        for (const geoId in this.data) {
            var geoData = this.data[geoId];
            var value = geoData.getMedianAge(year);

            if (value != null && !isNaN(value)) {
                values.push(value);
            }
        }

        return new NumberStats(values);
    }

    getFamilyIncome(geoId, year) {
        var geoData = this.getGeoData(geoId);
        return geoData.getFamilyIncome(year);
    }

    getFamilyIncomeStats(year) {
        var values = [];
        
        for (const geoId in this.data) {
            var geoData = this.data[geoId];
            var value = geoData.getFamilyIncome(year);

            if (value != null && !isNaN(value)) {
                values.push(value);
            }
        }

        return new NumberStats(values);
    }

    getHouseholdIncome(geoId, year) {
        var geoData = this.getGeoData(geoId);
        return geoData.getHouseholdIncome(year);
    }

    getHouseholdIncomeStats(year) {
        var values = [];
        
        for (const geoId in this.data) {
            var geoData = this.data[geoId];
            var value = geoData.getHouseholdIncome(year);

            if (value != null && !isNaN(value)) {
                values.push(value);
            }
        }

        return new NumberStats(values);
    }

    getPerCapitaIncome(geoId, year) {
        var geoData = this.getGeoData(geoId);
        return geoData.getPerCapitaIncome(year);
    }

    getPerCapitaIncomeStats(year) {
        var values = [];
        
        for (const geoId in this.data) {
            var geoData = this.data[geoId];
            var value = geoData.getPerCapitaIncome(year);

            if (value != null && !isNaN(value)) {
                values.push(value);
            }
        }

        return new NumberStats(values);
    }

    getHousingUnitsTotal(geoId, year) {
        var geoData = this.getGeoData(geoId);
        return geoData.getHousingUnitsTotal(year);
    }

    getHousingUnitsTotalStats(year) {
        var values = [];

        for (const geoId in this.data) {
            var geoData = this.data[geoId];
            var value = geoData.getHousingUnitsTotal(year);

            if (value != null && !isNaN(value)) {
                values.push(value);
            }
        }

        return new NumberStats(values);
    }

    getMedianHouseValue(geoId, year) {
        var geoData = this.getGeoData(geoId);
        return geoData.getMedianHouseValue(year);
    }

    getMedianHouseValueStats(year) {
        var values = [];

        for (const geoId in this.data) {
            var geoData = this.data[geoId];
            var value = geoData.getMedianHouseValue(year);

            if (value != null && !isNaN(value)) {
                values.push(value);
            }
        }

        return new NumberStats(values);
    }

    getUpperQuartileHouseValue(geoId, year) {
        var geoData = this.getGeoData(geoId);
        return geoData.getUpperQuartileHouseValue(year);
    }

    getUpperQuartileHouseValueStats(year) {
        var values = [];

        for (const geoId in this.data) {
            var geoData = this.data[geoId];
            var value = geoData.getUpperQuartileHouseValue(year);

            if (value != null && !isNaN(value)) {
                values.push(value);
            }
        }

        return new NumberStats(values);
    }

    getLowerQuartileHouseValue(geoId, year) {
        var geoData = this.getGeoData(geoId);
        return geoData.getLowerQuartileHouseValue(year);
    }

    getLowerQuartileHouseValueStats(year) {
        var values = [];

        for (const geoId in this.data) {
            var geoData = this.data[geoId];
            var value = geoData.getLowerQuartileHouseValue(year);

            if (value != null && !isNaN(value)) {
                values.push(value);
            }
        }

        return new NumberStats(values);
    }

    getVacancyRate(geoId, year) {
        var geoData = this.getGeoData(geoId);
        return geoData.getVacancyRate(year);
    }

    getVacancyRateStats(year) {
        var values = [];

        for (const geoId in this.data) {
            var geoData = this.data[geoId];
            var value = geoData.getVacancyRate(year);

            if (value != null && !isNaN(value)) {
                values.push(value);
            }
        }

        return new NumberStats(values);
    }

    getPovertyRate(geoId, year) {
        var geoData = this.getGeoData(geoId);
        return geoData.getPovertyRate(year);
    }

    getPovertyRateStats(year) {
        var values = [];

        for (const geoId in this.data) {
            var geoData = this.data[geoId];
            var value = geoData.getPovertyRate(year);

            if (value != null && !isNaN(value)) {
                values.push(value);
            }
        }

        return new NumberStats(values);
    }

    getUnemploymentRate(geoId, year) {
        var geoData = this.getGeoData(geoId);
        return geoData.getUnemploymentRate(year);
    }

    getUnemploymentRateStats(year) {
        var values = [];

        for (const geoId in this.data) {
            var geoData = this.data[geoId];
            var value = geoData.getUnemploymentRate(year);

            if (value != null && !isNaN(value)) {
                values.push(value);
            }
        }

        return new NumberStats(values);
    }
}
