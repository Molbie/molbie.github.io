class MapLineChart {
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
        this.population = new MapLineChart('populationChart', 'Population', [{title: 'Total', color: '#005824', data: MapCharts.emptyDataset()}], MapCharts.years());
        this.households = new MapLineChart('householdsChart', 'Households', [{title: 'Total', color: '#8C2D04', data: MapCharts.emptyDataset()}], MapCharts.years());
        this.income = new MapLineChart('incomeChart', 'Income', [{title: 'Median Household', color: '#005824', data: MapCharts.emptyDataset()}, {title: 'Median Family', color: '#6E016B', data: MapCharts.emptyDataset()}, {title: 'Per Capita', color: '#08589E', data: MapCharts.emptyDataset()}], MapCharts.years());
        this.houseValue = new MapLineChart('houseValueChart', 'House Value', [{title: 'Median', color: '#8C2D04', data: MapCharts.emptyDataset()}, {title: 'Upper Quartile', color: '#034E7B', data: MapCharts.emptyDataset()}, {title: 'Lower Quartile', color: '#7A0177', data: MapCharts.emptyDataset()}], MapCharts.years());
        this.housingUnits = new MapLineChart('housingUnitsChart', 'Housing Units', [{title: 'Total', color: '#005824', data: MapCharts.emptyDataset()}], MapCharts.years());
        this.vacancy = new MapLineChart('vacancyChart', 'Vacancy', [{title: 'Rate', color: '#7A0177', data: MapCharts.emptyDataset()}], MapCharts.years());
        this.poverty = new MapLineChart('povertyChart', 'Poverty', [{title: 'Rate', color: '#8C2D04', data: MapCharts.emptyDataset()}], MapCharts.years());
        this.unemployment = new MapLineChart('unemploymentChart', 'Unemployment', [{title: 'Rate', color: '#005A32', data: MapCharts.emptyDataset()}], MapCharts.years());
        this.medianAge = new MapLineChart('medianAgeChart', 'Age', [{title: 'Median', color: '#034E7B', data: MapCharts.emptyDataset()}], MapCharts.years());
        this.totalJobs = new MapLineChart('totalJobsChart', 'QWI: Total Jobs', [{title: 'Total', color: '#66C2A4', data: MapCharts.emptyQuarterlyDataset()}], MapCharts.quarters());
        this.hiring = new MapLineChart('hiringChart', 'QWI: Hiring Flow', [{title: 'All', color: '#8C96C6', data: MapCharts.emptyQuarterlyDataset()}, {title: 'New', color: '#7BCCC4', data: MapCharts.emptyQuarterlyDataset()}, {title: 'Separations', color: '#F768A1', data: MapCharts.emptyQuarterlyDataset()}], MapCharts.quarters());
        this.jobs = new MapLineChart('jobsChart', 'QWI: Job Flow', [{title: 'Gains', color: '#78C679', data: MapCharts.emptyQuarterlyDataset()}, {title: 'Losses', color: '#74A9CF', data: MapCharts.emptyQuarterlyDataset()}, {title: 'Net', color: '#FCC5C0', data: MapCharts.emptyQuarterlyDataset()}], MapCharts.quarters());
        this.hiredEarnings = new MapLineChart('hiredEarningsChart', 'QWI: Hired Monthly Earnings', [{title: 'Average', color: '#005824', data: MapCharts.emptyQuarterlyDataset()}], MapCharts.quarters());
        this.payroll = new MapLineChart('payrollChart', 'QWI: Payroll', [{title: 'Total', color: '#66C2A4', data: MapCharts.emptyQuarterlyDataset()}], MapCharts.quarters());
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
        this.totalJobs.update([this.totalJobsData(geoData)]);
        this.hiring.update([this.totalHiresData(geoData), this.totalNewHiresData(geoData), this.totalSeparationsData(geoData)]);
        this.jobs.update([this.totalJobGainsData(geoData), this.totalJobLossesData(geoData), this.totalNetJobsData(geoData)]);
        this.hiredEarnings.update([this.totalHiredEarningsData(geoData)]);
        this.payroll.update([this.totalPayrollData(geoData)]);

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

    totalJobsData(geoData) {
        var result = MapCharts.quarters();
        var self = this;
        
        result.forEach(function(item, index) {
            if (self.showValues) {
                var values = item.split("_");

                switch (values[0]) {
                    case "Q1":
                        result[index] = geoData.getTotalJobsQ1(values[1]);
                        break;
                    case "Q2":
                        result[index] = geoData.getTotalJobsQ2(values[1]);
                        break;
                    case "Q3":
                        result[index] = geoData.getTotalJobsQ3(values[1]);
                        break;
                    case "Q4":
                        result[index] = geoData.getTotalJobsQ4(values[1]);
                        break;
                    default:
                        break;
                }
            } else {
                // TODO: implement QoQ
            }
        });
        
        return result;
    }

    totalHiresData(geoData) {
        var result = MapCharts.quarters();
        var self = this;
        
        result.forEach(function(item, index) {
            if (self.showValues) {
                var values = item.split("_");

                switch (values[0]) {
                    case "Q1":
                        result[index] = geoData.getTotalHiresQ1(values[1]);
                        break;
                    case "Q2":
                        result[index] = geoData.getTotalHiresQ2(values[1]);
                        break;
                    case "Q3":
                        result[index] = geoData.getTotalHiresQ3(values[1]);
                        break;
                    case "Q4":
                        result[index] = geoData.getTotalHiresQ4(values[1]);
                        break;
                    default:
                        break;
                }
            } else {
                // TODO: implement QoQ
            }
        });
        
        return result;
    }

    totalNewHiresData(geoData) {
        var result = MapCharts.quarters();
        var self = this;
        
        result.forEach(function(item, index) {
            if (self.showValues) {
                var values = item.split("_");

                switch (values[0]) {
                    case "Q1":
                        result[index] = geoData.getNewHiresQ1(values[1]);
                        break;
                    case "Q2":
                        result[index] = geoData.getNewHiresQ2(values[1]);
                        break;
                    case "Q3":
                        result[index] = geoData.getNewHiresQ3(values[1]);
                        break;
                    case "Q4":
                        result[index] = geoData.getNewHiresQ4(values[1]);
                        break;
                    default:
                        break;
                }
            } else {
                // TODO: implement QoQ
            }
        });
        
        return result;
    }

    totalSeparationsData(geoData) {
        var result = MapCharts.quarters();
        var self = this;
        
        result.forEach(function(item, index) {
            if (self.showValues) {
                var values = item.split("_");

                switch (values[0]) {
                    case "Q1":
                        result[index] = geoData.getSeparationsQ1(values[1]);
                        break;
                    case "Q2":
                        result[index] = geoData.getSeparationsQ2(values[1]);
                        break;
                    case "Q3":
                        result[index] = geoData.getSeparationsQ3(values[1]);
                        break;
                    case "Q4":
                        result[index] = geoData.getSeparationsQ4(values[1]);
                        break;
                    default:
                        break;
                }
            } else {
                // TODO: implement QoQ
            }
        });
        
        return result;
    }

    totalJobGainsData(geoData) {
        var result = MapCharts.quarters();
        var self = this;
        
        result.forEach(function(item, index) {
            if (self.showValues) {
                var values = item.split("_");

                switch (values[0]) {
                    case "Q1":
                        result[index] = geoData.getJobGainsQ1(values[1]);
                        break;
                    case "Q2":
                        result[index] = geoData.getJobGainsQ2(values[1]);
                        break;
                    case "Q3":
                        result[index] = geoData.getJobGainsQ3(values[1]);
                        break;
                    case "Q4":
                        result[index] = geoData.getJobGainsQ4(values[1]);
                        break;
                    default:
                        break;
                }
            } else {
                // TODO: implement QoQ
            }
        });
        
        return result;
    }
    
    totalJobLossesData(geoData) {
        var result = MapCharts.quarters();
        var self = this;
        
        result.forEach(function(item, index) {
            if (self.showValues) {
                var values = item.split("_");

                switch (values[0]) {
                    case "Q1":
                        result[index] = geoData.getJobLossesQ1(values[1]);
                        break;
                    case "Q2":
                        result[index] = geoData.getJobLossesQ2(values[1]);
                        break;
                    case "Q3":
                        result[index] = geoData.getJobLossesQ3(values[1]);
                        break;
                    case "Q4":
                        result[index] = geoData.getJobLossesQ4(values[1]);
                        break;
                    default:
                        break;
                }
            } else {
                // TODO: implement QoQ
            }
        });
        
        return result;
    }

    totalNetJobsData(geoData) {
        var result = MapCharts.quarters();
        var self = this;
        
        result.forEach(function(item, index) {
            if (self.showValues) {
                var values = item.split("_");

                switch (values[0]) {
                    case "Q1":
                        result[index] = geoData.getNetJobsQ1(values[1]);
                        break;
                    case "Q2":
                        result[index] = geoData.getNetJobsQ2(values[1]);
                        break;
                    case "Q3":
                        result[index] = geoData.getNetJobsQ3(values[1]);
                        break;
                    case "Q4":
                        result[index] = geoData.getNetJobsQ4(values[1]);
                        break;
                    default:
                        break;
                }
            } else {
                // TODO: implement QoQ
            }
        });
        
        return result;
    }
    
    totalHiredEarningsData(geoData) {
        var result = MapCharts.quarters();
        var self = this;
        
        result.forEach(function(item, index) {
            if (self.showValues) {
                var values = item.split("_");

                switch (values[0]) {
                    case "Q1":
                        result[index] = geoData.getHiredMonthlyEarningsQ1(values[1]);
                        break;
                    case "Q2":
                        result[index] = geoData.getHiredMonthlyEarningsQ2(values[1]);
                        break;
                    case "Q3":
                        result[index] = geoData.getHiredMonthlyEarningsQ3(values[1]);
                        break;
                    case "Q4":
                        result[index] = geoData.getHiredMonthlyEarningsQ4(values[1]);
                        break;
                    default:
                        break;
                }
            } else {
                // TODO: implement QoQ
            }
        });
        
        return result;
    }

    totalPayrollData(geoData) {
        var result = MapCharts.quarters();
        var self = this;
        
        result.forEach(function(item, index) {
            if (self.showValues) {
                var values = item.split("_");

                switch (values[0]) {
                    case "Q1":
                        result[index] = geoData.getPayrollQ1(values[1]);
                        break;
                    case "Q2":
                        result[index] = geoData.getPayrollQ2(values[1]);
                        break;
                    case "Q3":
                        result[index] = geoData.getPayrollQ3(values[1]);
                        break;
                    case "Q4":
                        result[index] = geoData.getPayrollQ4(values[1]);
                        break;
                    default:
                        break;
                }
            } else {
                // TODO: implement QoQ
            }
        });
        
        return result;
    }

    static years() {
        var result = [];
        var year = Math.min(...GeoData.years());
        var maxYear = Math.max(...GeoData.years());
        
        while (year <= maxYear) {
            result.push(year);
            year++;
        }
        
        return result;
    }

    static quarters() {
        var result = [];
        var years = MapCharts.years().reverse();

        years.forEach(function(item, index) {
            if (result.length >= years.length) {
                return
            }
            result.push("Q4_" + item);
            result.push("Q3_" + item);
            result.push("Q2_" + item);
            result.push("Q1_" + item);
        });
        
        return result.reverse();
    }

    static emptyDataset() {
        var result = [];
        
        MapCharts.years().forEach(function(item, index) {
            result.push({t: item, y: null});
        });
        
        return result;
    }

    static emptyQuarterlyDataset() {
        var result = [];

        MapCharts.quarters().forEach(function(item, index) {
            result.push(null);
        });
        
        return result;
    }
}
