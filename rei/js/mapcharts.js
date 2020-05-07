class MapLineChart {
    chart;

    constructor(domId, title, datasets, labels) {
        var configuation = MapLineChart.makeConfiguration(title, datasets, labels);
        var context = document.getElementById(domId).getContext('2d');
        context.canvas.width = 738;
        context.canvas.height = 300;
        
        this.chart = new Chart(context, configuation);
    }

    update(datasets) {
        var self = this;
        datasets.forEach(function(item, index) {
            var dataset = self.chart.config.data.datasets[index];
            dataset.data = item;
        });
        this.chart.update();
    }

    static makeConfiguration(title, datasets, labels) {
        var chartDatasets = [];
        datasets.forEach(function(item, index){
            chartDatasets.push({
                label: item.title,
                backgroundColor: Chart.helpers.color(item.color).alpha(0.5).rgbString(),
                borderColor: item.color,
                data: item.data
            });
        });
        
        var result = {
            type: 'line',
            data: {
                labels: labels,
                datasets: chartDatasets
            },
            options: {
                title: {
                    text: title
                },
                tooltips: {
                    callbacks: {
                        label: function(item, data) {
                            var label = data.datasets[item.datasetIndex].label || '';
                            
                            if (label) {
                                label += ': ';
                            }
                            label += item.yLabel.toLocaleString()
                            
                            return label;
                        }
                    }
                }
            }
        }
        return result;
    }
}
class MapCharts {
    showValues;
    population;
    households;
    income;
    houseValue;
    housingUnits;
    vacancy;
    poverty;
    unemployment;
    medianAge;
    chartName;

    constructor() {
        Chart.defaults.global.maintainAspectRatio = false;
        Chart.defaults.global.animation.duration = 0;
        Chart.defaults.global.responsiveAnimationDuration = 0;
        Chart.defaults.global.responsive = true;
        Chart.defaults.global.elements.line.tension = 0;
        Chart.defaults.global.elements.line.fill = false;
        Chart.defaults.global.elements.point.pointStyle = 'circle';
        Chart.defaults.global.elements.point.radius = 10;
        Chart.defaults.global.elements.point.hoverRadius = 15;
        Chart.defaults.global.title.display = true;
        Chart.defaults.global.title.fontSize = 16;
        Chart.defaults.global.title.position = 'left';
        Chart.defaults.global.tooltips.mode = 'index';
        Chart.defaults.global.tooltips.intersect = true;
        Chart.defaults.global.tooltips.titleAlign = 'center';
        Chart.defaults.global.hover.mode = 'nearest';
        Chart.defaults.global.hover.intersect = true;
        Chart.defaults.line.spanGaps = true;
        Chart.defaults.global.legend.position = 'bottom';

        this.showValues = true;
        this.population = new MapLineChart('populationChart', 'Population', [{title: 'Total', color: '#37C0F0', data: MapCharts.emptyDataset()}], MapCharts.years());
        this.households = new MapLineChart('householdsChart', 'Households', [{title: 'Total', color: '#FA720D', data: MapCharts.emptyDataset()}], MapCharts.years());
        this.income = new MapLineChart('incomeChart', 'Income', [{title: 'Median Household', color: '#3CDC4E', data: MapCharts.emptyDataset()}, {title: 'Median Family', color: '#305EAB', data: MapCharts.emptyDataset()}, {title: 'Per Capita', color: '#FF1D25', data: MapCharts.emptyDataset()}], MapCharts.years());
        this.houseValue = new MapLineChart('houseValueChart', 'House Value', [{title: 'Median', color: '#FA720D', data: MapCharts.emptyDataset()}, {title: 'Upper Quartile', color: '#305EAB', data: MapCharts.emptyDataset()}, {title: 'Lower Quartile', color: '#37C0F0', data: MapCharts.emptyDataset()}], MapCharts.years());
        this.housingUnits = new MapLineChart('housingUnitsChart', 'Housing Units', [{title: 'Total', color: '#FF1D25', data: MapCharts.emptyDataset()}], MapCharts.years());
        this.vacancy = new MapLineChart('vacancyChart', 'Vacancy', [{title: 'Rate', color: '#FA720D', data: MapCharts.emptyDataset()}], MapCharts.years());
        this.poverty = new MapLineChart('povertyChart', 'Poverty', [{title: 'Rate', color: '#3CDC4E', data: MapCharts.emptyDataset()}], MapCharts.years());
        this.unemployment = new MapLineChart('unemploymentChart', 'Unemployment', [{title: 'Rate', color: '#37C0F0', data: MapCharts.emptyDataset()}], MapCharts.years());
        this.medianAge = new MapLineChart('medianAgeChart', 'Age', [{title: 'Median', color: '#305EAB', data: MapCharts.emptyDataset()}], MapCharts.years());
        this.chartName = document.getElementById('chartName');
    }

    update(geoData) {
        this.population.update([this.populationData(geoData)]);
        this.households.update([this.householdsData(geoData)]);
        this.income.update([this.householdIncomeData(geoData), this.familyIncomeData(geoData), this.perCapitaIncomeData(geoData)]);
        this.houseValue.update([this.houseValueData(geoData), this.upperHouseValueData(geoData), this.lowerHouseValueData(geoData)]);
        this.housingUnits.update([this.housingUnitsData(geoData)]);
        this.vacancy.update([this.vacancyData(geoData)]);
        this.poverty.update([this.povertyData(geoData)]);
        this.unemployment.update([this.unemploymentData(geoData)]);
        this.medianAge.update([this.medianAgeData(geoData)]);

        var name = geoData.getName();
        this.chartName.innerHTML = name == null ? "click on a geographic area to load the data" : name;
    }

    populationData(geoData) {
        var result = MapCharts.emptyDataset();
        var self = this;

        result.forEach(function(item, index) {
            if (self.showValues) {
                result[index].y = geoData.getPopulationTotal(item.t);
            } else {
                // TODO: implement YoY
            }
        });
        
        return result;
    }

    householdsData(geoData) {
        var result = MapCharts.emptyDataset();
        var self = this;
        
        result.forEach(function(item, index) {
            if (self.showValues) {
                result[index].y = geoData.getHouseholdTotal(item.t);
            } else {
                // TODO: implement YoY
            }
        });
        
        return result;
    }

    householdIncomeData(geoData) {
        var result = MapCharts.emptyDataset();
        var self = this;
        
        result.forEach(function(item, index) {
            if (self.showValues) {
                result[index].y = geoData.getHouseholdIncome(item.t);
            } else {
                // TODO: implement YoY
            }
        });
        
        return result;
    }

    familyIncomeData(geoData) {
        var result = MapCharts.emptyDataset();
        var self = this;
        
        result.forEach(function(item, index) {
            if (self.showValues) {
                result[index].y = geoData.getFamilyIncome(item.t);
            } else {
                // TODO: implement YoY
            }
        });
        
        return result;
    }

    perCapitaIncomeData(geoData) {
        var result = MapCharts.emptyDataset();
        var self = this;
        
        result.forEach(function(item, index) {
            if (self.showValues) {
                result[index].y = geoData.getPerCapitaIncome(item.t);
            } else {
                // TODO: implement YoY
            }
        });
        
        return result;
    }

    houseValueData(geoData) {
        var result = MapCharts.emptyDataset();
        var self = this;
        
        result.forEach(function(item, index) {
            if (self.showValues) {
                result[index].y = geoData.getMedianHouseValue(item.t);
            } else {
                // TODO: implement YoY
            }
        });
        
        return result;
    }

    upperHouseValueData(geoData) {
        var result = MapCharts.emptyDataset();
        var self = this;
        
        result.forEach(function(item, index) {
            if (self.showValues) {
                result[index].y = geoData.getUpperQuartileHouseValue(item.t);
            } else {
                // TODO: implement YoY
            }
        });
        
        return result;
    }

    lowerHouseValueData(geoData) {
        var result = MapCharts.emptyDataset();
        var self = this;
        
        result.forEach(function(item, index) {
            if (self.showValues) {
                result[index].y = geoData.getLowerQuartileHouseValue(item.t);
            } else {
                // TODO: implement YoY
            }
        });
        
        return result;
    }

    housingUnitsData(geoData) {
        var result = MapCharts.emptyDataset();
        var self = this;
        
        result.forEach(function(item, index) {
            if (self.showValues) {
                result[index].y = geoData.getHousingUnitsTotal(item.t);
            } else {
                // TODO: implement YoY
            }
        });
        
        return result;
    }

    vacancyData(geoData) {
        var result = MapCharts.emptyDataset();
        var self = this;
        
        result.forEach(function(item, index) {
            if (self.showValues) {
                result[index].y = geoData.getVacancyRate(item.t);
            } else {
                // TODO: implement YoY
            }
        });
        
        return result;
    }

    povertyData(geoData) {
        var result = MapCharts.emptyDataset();
        var self = this;
        
        result.forEach(function(item, index) {
            if (self.showValues) {
                result[index].y = geoData.getPovertyRate(item.t);
            } else {
                // TODO: implement YoY
            }
        });
        
        return result;
    }

    unemploymentData(geoData) {
        var result = MapCharts.emptyDataset();
        var self = this;
        
        result.forEach(function(item, index) {
            if (self.showValues) {
                result[index].y = geoData.getUnemploymentRate(item.t);
            } else {
                // TODO: implement YoY
            }
        });
        
        return result;
    }

    medianAgeData(geoData) {
        var result = MapCharts.emptyDataset();
        var self = this;
        
        result.forEach(function(item, index) {
            if (self.showValues) {
                result[index].y = geoData.getMedianAge(item.t);
            } else {
                // TODO: implement YoY
            }
        });
        
        return result;
    }

    static years() {
        var result = [];
        var year = Math.min(...GeoData.years);
        var maxYear = Math.max(...GeoData.years);
        
        while (year <= maxYear) {
            result.push(year);
            year++;
        }
        
        return result;
    }

    static emptyDataset() {
        var result = [];
        
        MapCharts.years().forEach(function(item, index) {
            result.push({t: item, y: null});
        });
        
        return result;
    }
}
