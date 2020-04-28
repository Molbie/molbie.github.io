function makeMapData(urlPrefix, geoId, geoType, centerPoint) {
    var mapdata = {
        id: geoId,
        polygonUrl: urlPrefix + geoType + "/polygons/" + geoId + "_2018.json",
        dataUrl: urlPrefix + geoType + "/data/",
        centerPoint: centerPoint, // starting position as [longitude, latitude]
        accessToken: "pk.eyJ1IjoicHJvZ3JhbW1lci1icmlhbiIsImEiOiJjajF5YmNleHQwMGNhMnFxa3dvaHZmaDZjIn0.NQfth9E2BbhzMBSkQMv0JA",
        years: [2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2000],
        geodata: {},
        
        fetch: function(url) {
            var json = null;
            $.ajax({ 'async': false,
                     'global': false,
                     'url': url,
                     'dataType': "json",
                     'success': function (data) {
                         json = data;
                     }
            });
            return json;
        },
        load: function() {
            for (const year of this.years) {
                this.geodata["Y" + year] = this.fetch(this.dataUrl + this.id + "_" + year + ".json")
            }
        },
        getGeodata: function(year, geoId) {
            var yearData = this.geodata["Y" + year]
            if (yearData != null && yearData[geoId] != null) {
                return yearData[geoId]
            } else {
                return {};
            }
        },
        populationTotal: function(geoId) {
            var result = null;
            
            for (const year of this.years) {
                var data = this.getGeodata(year, geoId)
                
                if (data.population != null && data.population.total != null) {
                    result = data.population.total;
                }
                
                if (result != null) {
                    break
                }
            }
            
            return result
        },
        householdTotal: function(geoId) {
            var result = null;
            
            for (const year of this.years) {
                var data = this.getGeodata(year, geoId)
                
                if (data.household != null && data.household.total != null) {
                    result = data.household.total;
                }
                
                if (result != null) {
                    break
                }
            }
            
            return result
        },
        medianAge: function(geoId) {
            var result = null;
            
            for (const year of this.years) {
                var data = this.getGeodata(year, geoId)
                
                if (data.age != null && data.age.median != null) {
                    result = data.age.median;
                }
                
                if (result != null) {
                    break
                }
            }
            
            return result
        },
        familyIncome: function(geoId) {
            var result = null;
            
            for (const year of this.years) {
                var data = this.getGeodata(year, geoId)
                
                if (data.income != null && data.income.family != null) {
                    result = data.income.family;
                }
                
                if (result != null) {
                    break
                }
            }
            
            return result
        },
        householdIncome: function(geoId) {
            var result = null;
            
            for (const year of this.years) {
                var data = this.getGeodata(year, geoId)
                
                if (data.income != null && data.income.household != null) {
                    result = data.income.household;
                }
                
                if (result != null) {
                    break
                }
            }
            
            return result
        },
        perCapitaIncome: function(geoId) {
            var result = null;
            
            for (const year of this.years) {
                var data = this.getGeodata(year, geoId)
                
                if (data.income != null && data.income.perCapita != null) {
                    result = data.income.perCapita;
                }
                
                if (result != null) {
                    break
                }
            }
            
            return result
        },
        housingUnitsTotal: function(geoId) {
            var result = null;
            
            for (const year of this.years) {
                var data = this.getGeodata(year, geoId)
                
                if (data.housingUnits != null && data.housingUnits.total != null) {
                    result = data.housingUnits.total;
                }
                
                if (result != null) {
                    break
                }
            }
            
            return result
        },
        medianHouseValue: function(geoId) {
            var result = null;
            
            for (const year of this.years) {
                var data = this.getGeodata(year, geoId)
                
                if (data.houseValue != null && data.houseValue.median != null) {
                    result = data.houseValue.median;
                }
                
                if (result != null) {
                    break
                }
            }
            
            return result
        },
        upperQuartileHouseValue: function(geoId) {
            var result = null;
            
            for (const year of this.years) {
                var data = this.getGeodata(year, geoId)
                
                if (data.houseValue != null && data.houseValue.upperQuartile != null) {
                    result = data.houseValue.upperQuartile;
                }
                
                if (result != null) {
                    break
                }
            }
            
            return result
        },
        lowerQuartileHouseValue: function(geoId) {
            var result = null;
            
            for (const year of this.years) {
                var data = this.getGeodata(year, geoId)
                
                if (data.houseValue != null && data.houseValue.lowerQuartile != null) {
                    result = data.houseValue.lowerQuartile;
                }
                
                if (result != null) {
                    break
                }
            }
            
            return result
        },
        vacancyRate: function(geoId) {
            var count = null;
            var total = null;
            
            for (const year of this.years) {
                var data = this.getGeodata(year, geoId)
                if (count == null && data.occupancy != null && data.occupancy.vacant != null) {
                    count = data.occupancy.vacant;
                }
                if (total == null && data.occupancy != null && data.occupancy.total != null) {
                    total = data.occupancy.total;
                }
                
                if (count != null && total != null) {
                    break
                }
            }
            
            if (count != null && total != null) {
                return (count / total * 100).toFixed(2)
            } else {
                return null
            }
        },
        povertyRate: function(geoId) {
            var count = null;
            var total = null;
            
            for (const year of this.years) {
                var data = this.getGeodata(year, geoId)
                if (count == null && data.poverty != null && data.poverty.below != null) {
                    count = data.poverty.below;
                }
                if (total == null && data.poverty != null && data.poverty.total != null) {
                    total = data.poverty.total;
                }
                
                if (count != null && total != null) {
                    break
                }
            }
            
            if (count != null && total != null) {
                return (count / total * 100).toFixed(2)
            } else {
                return null
            }
        },
        unemploymentRate: function(geoId) {
            var count = null;
            var total = null;
            
            for (const year of this.years) {
                var data = this.getGeodata(year, geoId)
                if (count == null && data.employment != null && data.employment.unemployed != null) {
                    count = data.employment.unemployed;
                }
                if (total == null && data.employment != null && data.employment.inLaborForce != null) {
                    total = data.employment.inLaborForce;
                }
                
                if (count != null && total != null) {
                    break
                }
            }
            
            if (count != null && total != null) {
                return (count / total * 100).toFixed(2)
            } else {
                return null
            }
        },
        chartYears: function() {
            var result = [];
            var year = Math.min(...this.years);
            var maxYear = Math.max(...this.years);
            
            while (year <= maxYear) {
                result.push(year);
                year++;
            }
            
            return result;
        },
        chartEmptyDataset: function() {
            var result = [];
            
            this.chartYears().forEach(function(item, index) {
                result.push({t: item, y: null});
            });
            
            return result;
        },
        chartPopulationData: function(geoId, showValues) {
            var result = this.chartEmptyDataset();
            
            var self = this;
            result.forEach(function(item, index) {
                var yearData = self.getGeodata(item.t, geoId);
                
                if (yearData.population != null && yearData.population.total != null) {
                    if (showValues) {
                        result[index].y = yearData.population.total;
                    } else {
                        // TODO: implement YoY
                    }
                }
            });
            
            return result;
        },
        chartHouseholdsData: function(geoId, showValues) {
            var result = this.chartEmptyDataset();
            
            var self = this;
            result.forEach(function(item, index) {
                var yearData = self.getGeodata(item.t, geoId);
                
                if (yearData.household != null && yearData.household.total != null) {
                    if (showValues) {
                        result[index].y = yearData.household.total;
                    } else {
                        // TODO: implement YoY
                    }
                }
            });
            
            return result;
        },
        chartHouseholdIncomeData: function(geoId, showValues) {
            var result = this.chartEmptyDataset();
            
            var self = this;
            result.forEach(function(item, index) {
                var yearData = self.getGeodata(item.t, geoId);
                
                if (yearData.income != null && yearData.income.household != null) {
                    if (showValues) {
                        result[index].y = yearData.income.household;
                    } else {
                        // TODO: implement YoY
                    }
                }
            });
            
            return result;
        },
        chartFamilyIncomeData: function(geoId, showValues) {
            var result = this.chartEmptyDataset();
            
            var self = this;
            result.forEach(function(item, index) {
                var yearData = self.getGeodata(item.t, geoId);
                
                if (yearData.income != null && yearData.income.family != null) {
                    if (showValues) {
                        result[index].y = yearData.income.family;
                    } else {
                        // TODO: implement YoY
                    }
                }
            });
            
            return result;
        },
        chartPerCapitaIncomeData: function(geoId, showValues) {
            var result = this.chartEmptyDataset();
            
            var self = this;
            result.forEach(function(item, index) {
                var yearData = self.getGeodata(item.t, geoId);
                
                if (yearData.income != null && yearData.income.perCapita != null) {
                    if (showValues) {
                        result[index].y = yearData.income.perCapita;
                    } else {
                        // TODO: implement YoY
                    }
                }
            });
            
            return result;
        },
        chartHouseValueData: function(geoId, showValues) {
            var result = this.chartEmptyDataset();
            
            var self = this;
            result.forEach(function(item, index) {
                var yearData = self.getGeodata(item.t, geoId);
                
                if (yearData.houseValue != null && yearData.houseValue.median != null) {
                    if (showValues) {
                        result[index].y = yearData.houseValue.median;
                    } else {
                        // TODO: implement YoY
                    }
                }
            });
            
            return result;
        },
        chartUpperHouseValueData: function(geoId, showValues) {
            var result = this.chartEmptyDataset();
            
            var self = this;
            result.forEach(function(item, index) {
                var yearData = self.getGeodata(item.t, geoId);
                
                if (yearData.houseValue != null && yearData.houseValue.upperQuartile != null) {
                    if (showValues) {
                        result[index].y = yearData.houseValue.upperQuartile;
                    } else {
                        // TODO: implement YoY
                    }
                }
            });
            
            return result;
        },
        chartLowerHouseValueData: function(geoId, showValues) {
            var result = this.chartEmptyDataset();
            
            var self = this;
            result.forEach(function(item, index) {
                var yearData = self.getGeodata(item.t, geoId);
                
                if (yearData.houseValue != null && yearData.houseValue.lowerQuartile != null) {
                    if (showValues) {
                        result[index].y = yearData.houseValue.lowerQuartile;
                    } else {
                        // TODO: implement YoY
                    }
                }
            });
            
            return result;
        },
        chartHousingUnitsData: function(geoId, showValues) {
            var result = this.chartEmptyDataset();
            
            var self = this;
            result.forEach(function(item, index) {
                var yearData = self.getGeodata(item.t, geoId);
                
                if (yearData.housingUnits != null && yearData.housingUnits.total != null) {
                    if (showValues) {
                        result[index].y = yearData.housingUnits.total;
                    } else {
                        // TODO: implement YoY
                    }
                }
            });
            
            return result;
        },
        chartVacancyData: function(geoId, showValues) {
            var result = this.chartEmptyDataset();
            
            var self = this;
            result.forEach(function(item, index) {
                var yearData = self.getGeodata(item.t, geoId);
                
                if (yearData.occupancy != null && yearData.occupancy.vacant != null && yearData.occupancy.total != null) {
                    if (showValues) {
                        result[index].y = (yearData.occupancy.vacant / yearData.occupancy.total * 100).toFixed(2);
                    } else {
                        // TODO: implement YoY
                    }
                }
            });
            
            return result;
        },
        chartPovertyData: function(geoId, showValues) {
            var result = this.chartEmptyDataset();
            
            var self = this;
            result.forEach(function(item, index) {
                var yearData = self.getGeodata(item.t, geoId);
                
                if (yearData.poverty != null && yearData.poverty.below != null && yearData.poverty.total != null) {
                    if (showValues) {
                        result[index].y = (yearData.poverty.below / yearData.poverty.total * 100).toFixed(2);
                    } else {
                        // TODO: implement YoY
                    }
                }
            });
            
            return result;
        },
        chartUnemploymentData: function(geoId, showValues) {
            var result = this.chartEmptyDataset();
            
            var self = this;
            result.forEach(function(item, index) {
                var yearData = self.getGeodata(item.t, geoId);
                
                if (yearData.poverty != null && yearData.employment.unemployed != null && yearData.employment.inLaborForce != null) {
                    if (showValues) {
                        result[index].y = (yearData.employment.unemployed / yearData.employment.inLaborForce * 100).toFixed(2);
                    } else {
                        // TODO: implement YoY
                    }
                }
            });
            
            return result;
        },
        chartMedianAgeData: function(geoId, showValues) {
            var result = this.chartEmptyDataset();
            
            var self = this;
            result.forEach(function(item, index) {
                var yearData = self.getGeodata(item.t, geoId);
                
                if (yearData.age != null && yearData.age.median != null) {
                    if (showValues) {
                        result[index].y = yearData.age.median;
                    } else {
                        // TODO: implement YoY
                    }
                }
            });
            
            return result;
        },
    }
    
    return mapdata
}
