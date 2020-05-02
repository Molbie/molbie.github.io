class HousingUnits {
    total;

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
    none;
    one;
    two;
    three;
    four;
    fiveOrMore;
    total;

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
    total;
    inLaborForce;
    notInLaborForce;
    armedForces;
    civilians;
    employed;
    unemployed;

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
    total;

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
    median;
    male;
    female;

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
    total;
    above;
    below;

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
    total;

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
    total;
    forSale;
    soldNotOccupied;
    forRent;
    rentedNotOccupied;
    seasonal;
    migrantWorkers;
    other;

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
    household;
    family;
    perCapita;

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
    median;
    average;
    upperQuartile;
    lowerQuartile;

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
    total;
    occupied;
    vacant;

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
class GeoTimePeriod {
    geoId;
    year;
    housingUnits;
    vehicle;
    employment;
    population;
    age;
    poverty;
    household;
    vacancy;
    income;
    houseValue;
    occupancy;

    constructor(geoId, year, data) {
        this.geoId = geoId + "";
        this.year = parseInt(year, 10);
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

        if (data.meta != null) {
            if (data.meta.geoId != null) {
                this.geoId = data.meta.geoId + "";
            }
            if (data.meta.year != null) {
                this.year = parseInt(data.meta.year, 10);
            }
        }
    }
}
class GeoData {
    static years = [2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2000];

    geoId;
    data;

    constructor(geoId) {
        this.geoId = geoId;
        this.data = {};

        for (const year in GeoData.years) {
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

    getPopulationTotal(year) {
        var result = null;
        
        if (year != null) {
            var timePeriod = this.getData(year);
            result = timePeriod.population.total;
        } else {
            for (const year of GeoData.years) {
                var timePeriod = this.getData(year);
                
                if (timePeriod.population.total != null) {
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
            result = timePeriod.household.total;
        } else {
            for (const year of GeoData.years) {
                var timePeriod = this.getData(year);
                
                if (timePeriod.household.total != null) {
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
            result = timePeriod.age.median;
        } else {
            for (const year of GeoData.years) {
                var timePeriod = this.getData(year);
                
                if (timePeriod.age.median != null) {
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
            result = timePeriod.income.family;
        } else {
            for (const year of GeoData.years) {
                var timePeriod = this.getData(year);
                
                if (timePeriod.income.family != null) {
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
            result = timePeriod.income.household;
        } else {
            for (const year of GeoData.years) {
                var timePeriod = this.getData(year);
                
                if (timePeriod.income.household != null) {
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
            result = timePeriod.income.perCapita;
        } else {
            for (const year of GeoData.years) {
                var timePeriod = this.getData(year);
                
                if (timePeriod.income.perCapita != null) {
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
            result = timePeriod.housingUnits.total;
        } else {
            for (const year of GeoData.years) {
                var timePeriod = this.getData(year);
                
                if (timePeriod.housingUnits.total != null) {
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
            result = timePeriod.houseValue.median;
        } else {
            for (const year of GeoData.years) {
                var timePeriod = this.getData(year);
                
                if (timePeriod.houseValue.median != null) {
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
            result = timePeriod.houseValue.upperQuartile;
        } else {
            for (const year of GeoData.years) {
                var timePeriod = this.getData(year);
                
                if (timePeriod.houseValue.upperQuartile != null) {
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
            result = timePeriod.houseValue.lowerQuartile;
        } else {
            for (const year of GeoData.years) {
                var timePeriod = this.getData(year);
                
                if (timePeriod.houseValue.lowerQuartile != null) {
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
            count = timePeriod.occupancy.vacant;
            total = timePeriod.occupancy.total;
        } else {
            for (const year of GeoData.years) {
                var timePeriod = this.getData(year);

                if (count == null && timePeriod.occupancy.vacant != null) {
                    count = timePeriod.occupancy.vacant;
                }
                if (total == null && timePeriod.occupancy.total != null) {
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
            count = timePeriod.poverty.below;
            total = timePeriod.poverty.total;
        } else {
            for (const year of GeoData.years) {
                var timePeriod = this.getData(year);

                if (count == null && timePeriod.poverty.below != null) {
                    count = timePeriod.poverty.below;
                }
                if (total == null && timePeriod.poverty.total != null) {
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
            count = timePeriod.employment.unemployed;
            total = timePeriod.employment.inLaborForce;
        } else {
            for (const year of GeoData.years) {
                var timePeriod = this.getData(year);

                if (count == null && timePeriod.employment.unemployed != null) {
                    count = timePeriod.employment.unemployed;
                }
                if (total == null && timePeriod.employment.inLaborForce != null) {
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
    id;
    dataUrl;
    data;

    constructor(geoId, dataUrl) {
        this.id = geoId;
        this.dataUrl = dataUrl;
        this.data = {};
        this.load();
    }

    fetch(url, onSuccess) {
        $.ajax({ 'async': false,
                 'global': false,
                 'url': url,
                 'dataType': "json",
                 'success': function (data) {
                     onSuccess(data)
                 }
        });
    }

    load() {
        var self = this;
        for (const year of GeoData.years) {
            this.fetch(this.dataUrl + this.id + "_" + year + ".json", function(rawData) {
                for (const geoId in rawData) {
                    if (self.data[geoId] == null) {
                        self.data[geoId] = new GeoData(geoId);
                    }
                    self.data[geoId].add(new GeoTimePeriod(geoId, year, rawData[geoId]));
                }
            });
        }
    }

    getGeoData(geoId) {
        var geoData = this.data[geoId];
        return geoData ?? new GeoData(null);
    }

    getPopulationTotal(geoId) {
        var geoData = this.getGeoData(geoId);
        return geoData.getPopulationTotal(null);
    }

    getHouseholdTotal(geoId) {
        var geoData = this.getGeoData(geoId);
        return geoData.getHouseholdTotal(null);
    }

    getMedianAge(geoId) {
        var geoData = this.getGeoData(geoId);
        return geoData.getMedianAge(null);
    }
    
    getFamilyIncome(geoId) {
        var geoData = this.getGeoData(geoId);
        return geoData.getFamilyIncome(null);
    }

    getHouseholdIncome(geoId) {
        var geoData = this.getGeoData(geoId);
        return geoData.getHouseholdIncome(null);
    }

    getPerCapitaIncome(geoId) {
        var geoData = this.getGeoData(geoId);
        return geoData.getPerCapitaIncome(null);
    }

    getHousingUnitsTotal(geoId) {
        var geoData = this.getGeoData(geoId);
        return geoData.getHousingUnitsTotal(null);
    }

    getMedianHouseValue(geoId) {
        var geoData = this.getGeoData(geoId);
        return geoData.getMedianHouseValue(null);
    }

    getUpperQuartileHouseValue(geoId) {
        var geoData = this.getGeoData(geoId);
        return geoData.getUpperQuartileHouseValue(null);
    }

    getLowerQuartileHouseValue(geoId) {
        var geoData = this.getGeoData(geoId);
        return geoData.getLowerQuartileHouseValue(null);
    }

    getVacancyRate(geoId) {
        var geoData = this.getGeoData(geoId);
        return geoData.getVacancyRate(null);
    }

    getPovertyRate(geoId) {
        var geoData = this.getGeoData(geoId);
        return geoData.getPovertyRate(null);
    }

    getUnemploymentRate(geoId) {
        var geoData = this.getGeoData(geoId);
        return geoData.getUnemploymentRate(null);
    }

    chartYears() {
        var result = [];
        var year = Math.min(...GeoData.years);
        var maxYear = Math.max(...GeoData.years);
        
        while (year <= maxYear) {
            result.push(year);
            year++;
        }
        
        return result;
    }

    chartEmptyDataset() {
        var result = [];
        
        this.chartYears().forEach(function(item, index) {
            result.push({t: item, y: null});
        });
        
        return result;
    }

    chartPopulationData(geoId, showValues) {
        var result = this.chartEmptyDataset();
        var geoData = this.getGeoData(geoId);

        result.forEach(function(item, index) {
            if (showValues) {
                result[index].y = geoData.getPopulationTotal(item.t);
            } else {
                // TODO: implement YoY
            }
        });
        
        return result;
    }

    chartHouseholdsData(geoId, showValues) {
        var result = this.chartEmptyDataset();
        var geoData = this.getGeoData(geoId);
        
        result.forEach(function(item, index) {
            if (showValues) {
                result[index].y = geoData.getHouseholdTotal(item.t);
            } else {
                // TODO: implement YoY
            }
        });
        
        return result;
    }

    chartHouseholdIncomeData(geoId, showValues) {
        var result = this.chartEmptyDataset();
        var geoData = this.getGeoData(geoId);
        
        result.forEach(function(item, index) {
            if (showValues) {
                result[index].y = geoData.getHouseholdIncome(item.t);
            } else {
                // TODO: implement YoY
            }
        });
        
        return result;
    }

    chartFamilyIncomeData(geoId, showValues) {
        var result = this.chartEmptyDataset();
        var geoData = this.getGeoData(geoId);
        
        result.forEach(function(item, index) {
            if (showValues) {
                result[index].y = geoData.getFamilyIncome(item.t);
            } else {
                // TODO: implement YoY
            }
        });
        
        return result;
    }

    chartPerCapitaIncomeData(geoId, showValues) {
        var result = this.chartEmptyDataset();
        var geoData = this.getGeoData(geoId);
        
        result.forEach(function(item, index) {
            if (showValues) {
                result[index].y = geoData.getPerCapitaIncome(item.t);
            } else {
                // TODO: implement YoY
            }
        });
        
        return result;
    }

    chartHouseValueData(geoId, showValues) {
        var result = this.chartEmptyDataset();
        var geoData = this.getGeoData(geoId);
        
        result.forEach(function(item, index) {
            if (showValues) {
                result[index].y = geoData.getMedianHouseValue(item.t);
            } else {
                // TODO: implement YoY
            }
        });
        
        return result;
    }

    chartUpperHouseValueData(geoId, showValues) {
        var result = this.chartEmptyDataset();
        var geoData = this.getGeoData(geoId);
        
        result.forEach(function(item, index) {
            if (showValues) {
                result[index].y = geoData.getUpperQuartileHouseValue(item.t);
            } else {
                // TODO: implement YoY
            }
        });
        
        return result;
    }

    chartLowerHouseValueData(geoId, showValues) {
        var result = this.chartEmptyDataset();
        var geoData = this.getGeoData(geoId);
        
        result.forEach(function(item, index) {
            if (showValues) {
                result[index].y = geoData.getLowerQuartileHouseValue(item.t);
            } else {
                // TODO: implement YoY
            }
        });
        
        return result;
    }

    chartHousingUnitsData(geoId, showValues) {
        var result = this.chartEmptyDataset();
        var geoData = this.getGeoData(geoId);
        
        result.forEach(function(item, index) {
            if (showValues) {
                result[index].y = geoData.getHousingUnitsTotal(item.t);
            } else {
                // TODO: implement YoY
            }
        });
        
        return result;
    }

    chartVacancyData(geoId, showValues) {
        var result = this.chartEmptyDataset();
        var geoData = this.getGeoData(geoId);
        
        result.forEach(function(item, index) {
            if (showValues) {
                result[index].y = geoData.getVacancyRate(item.t);
            } else {
                // TODO: implement YoY
            }
        });
        
        return result;
    }

    chartPovertyData(geoId, showValues) {
        var result = this.chartEmptyDataset();
        var geoData = this.getGeoData(geoId);
        
        result.forEach(function(item, index) {
            if (showValues) {
                result[index].y = geoData.getPovertyRate(item.t);
            } else {
                // TODO: implement YoY
            }
        });
        
        return result;
    }

    chartUnemploymentData(geoId, showValues) {
        var result = this.chartEmptyDataset();
        var geoData = this.getGeoData(geoId);
        
        result.forEach(function(item, index) {
            if (showValues) {
                result[index].y = geoData.getUnemploymentRate(item.t);
            } else {
                // TODO: implement YoY
            }
        });
        
        return result;
    }

    chartMedianAgeData(geoId, showValues) {
        var result = this.chartEmptyDataset();
        var geoData = this.getGeoData(geoId);
        
        result.forEach(function(item, index) {
            if (showValues) {
                result[index].y = geoData.getMedianAge(item.t);
            } else {
                // TODO: implement YoY
            }
        });
        
        return result;
    }
}




/*
For each year and geography, the data points below should be available. Unfortunately, there are gaps in the data and so not all geographies have all data for a given year.

YEARS: 
2000
2005-2018
2019 (population estimates only for select geographies)

GEOGRAPHIES: 
National
Statisical Areas (Metro and Micro)
Regions
Divisions
States
Places
Counties 
Tracts

DATA POINTS:
Land Area
Water Area
Total Population
Total Households
Total Housing Units
Total Workers With Available Vehicles:
    - None
    - One
    - Two
    - Three
    - Four
    - Five Or More
Employment
    - Total
    - Not In Labor Force
    - In Labor Force Count
    - Armed Forces Count
    - Civilians Count
    - Civilians Employed Count
    - Civilians Unemployed Count
Age
    - Median
    - Median Of Males
    - Median Of Females
Poverty
    - Total
    - Below Poverty Count
    - At Or Above Poverty Count
Income In Dollars
    - Median Household
    - Median Family
    - Per Capita
House Value In Dollars
    - Median
    - Average
    - Upper Quartile
    - Lower Quartile
Occupancy
    - Total
    - Occupied Count
    - Vacant Count
Vacancy Reasons
    - Total
    - For Sale Count
    - Sold, Not Occupied Count
    - For Rent Count
    - Rented, Not Occupied Count
    - Seasonal Count
    - Migrant Workers Count
    - Other Count

*/
