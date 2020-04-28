function makeMapCharts(mapdata) {
    var mapCharts = {
        load: function() {
            Chart.defaults.global.animation.duration = 1000;
            Chart.defaults.global.responsive = true;
            Chart.defaults.global.elements.line.tension = 0;
            Chart.defaults.global.elements.line.fill = false;
            Chart.defaults.global.elements.point.pointStyle = 'circle';
            Chart.defaults.global.elements.point.radius = 10;
            Chart.defaults.global.elements.point.hoverRadius = 15;
            Chart.defaults.global.title.display = true;
            Chart.defaults.global.title.fontSize = 16;
            Chart.defaults.global.tooltips.mode = 'index';
            Chart.defaults.global.tooltips.intersect = true;
            Chart.defaults.global.tooltips.titleAlign = 'center';
            Chart.defaults.global.hover.mode = 'nearest';
            Chart.defaults.global.hover.intersect = true;
            Chart.defaults.line.spanGaps = true;
        },
        makeLineChartConfiguration: function(title, datasets, labels) {
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
        },
        makePopulationChart: function() {
            var configuation = this.makeLineChartConfiguration('Population', [{title: 'Total', color: '#37C0F0', data: mapdata.chartEmptyDataset()}], mapdata.chartYears());
            var context = document.getElementById('populationChart').getContext('2d');
            context.canvas.width = 500;
            context.canvas.height = 100;
            
            return new Chart(context, configuation);
        },
        makeHouseholdsChart: function() {
            var configuation = this.makeLineChartConfiguration('Households', [{title: 'Total', color: '#FA720D', data: mapdata.chartEmptyDataset()}], mapdata.chartYears());
            var context = document.getElementById('householdsChart').getContext('2d');
            context.canvas.width = 500;
            context.canvas.height = 100;
            
            return new Chart(context, configuation);
        },
        makeIncomeChart: function() {
            var configuation = this.makeLineChartConfiguration('Income', [{title: 'Median Household', color: '#3CDC4E', data: mapdata.chartEmptyDataset()}, {title: 'Median Family', color: '#305EAB', data: mapdata.chartEmptyDataset()}, {title: 'Per Capita', color: '#FF1D25', data: mapdata.chartEmptyDataset()}], mapdata.chartYears());
            var context = document.getElementById('incomeChart').getContext('2d');
            context.canvas.width = 500;
            context.canvas.height = 100;
            
            return new Chart(context, configuation);
        },
        makeHouseValueChart: function() {
            var configuation = this.makeLineChartConfiguration('House Value', [{title: 'Median', color: '#FA720D', data: mapdata.chartEmptyDataset()}, {title: 'Upper Quartile', color: '#305EAB', data: mapdata.chartEmptyDataset()}, {title: 'Lower Quartile', color: '#37C0F0', data: mapdata.chartEmptyDataset()}], mapdata.chartYears());
            var context = document.getElementById('houseValueChart').getContext('2d');
            context.canvas.width = 500;
            context.canvas.height = 100;
            
            return new Chart(context, configuation);
        },
        makeHousingUnitsChart: function() {
            var configuation = this.makeLineChartConfiguration('Housing Units', [{title: 'Total', color: '#FF1D25', data: mapdata.chartEmptyDataset()}], mapdata.chartYears());
            var context = document.getElementById('housingUnitsChart').getContext('2d');
            context.canvas.width = 500;
            context.canvas.height = 100;
            
            return new Chart(context, configuation);
        },
        makeVacancyChart: function() {
            var configuation = this.makeLineChartConfiguration('Vacancy', [{title: 'Rate', color: '#FA720D', data: mapdata.chartEmptyDataset()}], mapdata.chartYears());
            var context = document.getElementById('vacancyChart').getContext('2d');
            context.canvas.width = 500;
            context.canvas.height = 100;
            
            return new Chart(context, configuation);
        },
        makePovertyChart: function() {
            var configuation = this.makeLineChartConfiguration('Poverty', [{title: 'Rate', color: '#3CDC4E', data: mapdata.chartEmptyDataset()}], mapdata.chartYears());
            var context = document.getElementById('povertyChart').getContext('2d');
            context.canvas.width = 500;
            context.canvas.height = 100;
            
            return new Chart(context, configuation);
        },
        makeUnemploymentChart: function() {
            var configuation = this.makeLineChartConfiguration('Unemployment', [{title: 'Rate', color: '#37C0F0', data: mapdata.chartEmptyDataset()}], mapdata.chartYears());
            var context = document.getElementById('unemploymentChart').getContext('2d');
            context.canvas.width = 500;
            context.canvas.height = 100;
            
            return new Chart(context, configuation);
        },
        makeMedianAgeChart: function() {
            var configuation = this.makeLineChartConfiguration('Age', [{title: 'Median', color: '#305EAB', data: mapdata.chartEmptyDataset()}], mapdata.chartYears());
            var context = document.getElementById('medianAgeChart').getContext('2d');
            context.canvas.width = 500;
            context.canvas.height = 100;
            
            return new Chart(context, configuation);
        },
    };
    
    return mapCharts;
}
