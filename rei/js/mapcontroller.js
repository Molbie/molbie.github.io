class Map {
    constructor(accessToken, centerPoint) {
        mapboxgl.accessToken = accessToken;

        this.centerPoint = centerPoint;
        this.navigationControl = new mapboxgl.NavigationControl();
        this.geocoder = new MapboxGeocoder({accessToken: mapboxgl.accessToken, zoom: 14, marker: {color: '#37C0F0'}, mapboxgl: mapboxgl});
        this.map = new mapboxgl.Map({container: 'map', style: 'mapbox://styles/mapbox/light-v10', center: centerPoint, zoom: 6});
        
        var self = this;
        this.map.on('load', function() { 
            self.map.addControl(self.navigationControl);
            document.getElementById('geocoder').appendChild(self.geocoder.onAdd(self.map));

            self.map.resize();
            self.map.scrollZoom.disable();
        });
    }

    addPolygons(sourceId, dataOrUrl) {
        if (this.map.getSource(sourceId)) {
            this.map.removeSource(sourceId);
        }
        this.map.addSource(sourceId, {'type': 'geojson', 'data': dataOrUrl});
    }

    removePolygons(sourceId) {
        this.map.removeSource(sourceId);
    }

    addDensityLayer(id, sourceId, numerator, denominator, minValue, maxValue, startColor, endColor, isVisible) {
        this.map.addLayer({
            'id': id,
            'type': 'fill',
            'source': sourceId,
            'layout': {'visibility': (isVisible ? 'visible' : 'none')},
            'paint': {
                'fill-color': [
                    'let',
                    'density',
                    ['case',
                        ['boolean', ['has', numerator], false],
                        ['case',
                            ['boolean', ['has', denominator], false],
                            ['/', ["number", ['get', numerator], 0], ["number", ['get', denominator], 0.00000000001]],
                            0
                        ],
                        0
                    ],
                    [
                        'interpolate',
                        ['linear'],
                        ['var', 'density'],
                        minValue,
                        ['to-color', startColor],
                        maxValue,
                        ['to-color', endColor]
                    ]
                ],
                'fill-opacity': 0.7
                }
        });
    }

    addChoroplethLayer(id, sourceId, property, maxValue, color1, color2, color3, color4, color5, color6, color7) {
        var value = maxValue;
        if (value == null || isNaN(value)) {
            value = 1;
        }

        this.map.addLayer({
            'id': id,
            'type': 'fill',
            'source': sourceId,
            'layout': {},
            'paint': {
                'fill-color': [
                    'let',
                    'density',
                    ['case',
                        ['boolean', ['has', property], false],
                        ["get", property],
                        0
                    ],
                    ["step", 
                        ['var', 'density'],
                        // Median:
                        // color1, value / 4 * 1,
                        // color2, value / 4 * 2,
                        // color3, value / 4 * 3,
                        // color4, value / 4 * 4,
                        // color5, value / 4 * 5,
                        // color6, value / 4 * 6,
                        // color7
                        //
                        // Max:
                        color1, value / 7 * 1,
                        color2, value / 7 * 2,
                        color3, value / 7 * 3,
                        color4, value / 7 * 4,
                        color5, value / 7 * 5,
                        color6, value / 7 * 6,
                        color7
                    ]
                ],
                'fill-opacity': 0.7
            }
        });
    }

    addFillLayer(id, sourceId, color, isVisible) {
        this.map.addLayer({
            'id': id,
            'type': 'fill',
            'source': sourceId,
            'layout': {'visibility': (isVisible ? 'visible' : 'none')},
            'paint': {
                'fill-color': color,
                'fill-opacity': 0.2
                }
        });
    }

    addHoverLayer(id, sourceId, color, isVisible) {
        this.map.addLayer({
            'id': id,
            'type': 'fill',
            'source': sourceId,
            'layout': {'visibility': (isVisible ? 'visible' : 'none')},
            'paint': {
                'fill-color': color,
                'fill-opacity': ['case',
                                 ['boolean', ['feature-state', 'hover'], false],
                                 0.6,
                                 0
                                ]
                }
        });
    }

    addSelectedLayer(id, sourceId, color, isVisible) {
        this.map.addLayer({
            'id': id,
            'type': 'fill',
            'source': sourceId,
            'layout': {'visibility': (isVisible ? 'visible' : 'none')},
            'paint': {
                'fill-color': color,
                'fill-opacity': ['case',
                                 ['boolean', ['feature-state', 'selected'], false],
                                 0.8,
                                 0
                                ]
                }
        });
    }

    addBorderLayer(id, sourceId, color, isVisible) {
        this.map.addLayer({
            'id': id,
            'type': 'line',
            'source': sourceId,
            'layout': {'visibility': (isVisible ? 'visible' : 'none')},
            'paint': {
                'line-color': color,
                'line-opacity': 0.2,
                'line-width': 1
            }
        });
    }

    removeLayer(id) {
        if (this.map.getLayer(id)) {
            this.map.removeLayer(id);
        }
    }

    setLayerVisibility(layerId, visible) {
        this.map.setLayoutProperty(layerId, 'visibility', visible ? 'visible' : 'none');
    }

    addMouseMoveHandler(layerId, handler) {
        this.map.on('mousemove', layerId, function(e) { handler(e); });
    }

    removeMouseMoveHandler(layerId, handler) {
        this.map.on('mousemove', layerId, function(e) { handler(e); });
    }

    addMouseEnterHandler(layerId, handler) {
        this.map.on('mouseenter', layerId, function(e) { handler(e); });
    }

    addMouseLeaveHandler(layerId, handler) {
        this.map.on('mouseleave', layerId, function(e) { handler(e); });
    }

    addMouseClickHandler(layerId, handler) {
        this.map.on('click', layerId, function(e) { handler(e); });
    }

    setHoverEnabled(sourceId, hoverId, enabled) {
        this.map.setFeatureState({ source: sourceId, id: hoverId }, { hover: enabled });
    }

    setSelectedEnabled(sourceId, selectedId, enabled) {
        this.map.setFeatureState({ source: sourceId, id: selectedId }, { selected: enabled });
    }

    setMousePointerEnabled(enabled) {
        this.map.getCanvas().style.cursor = enabled ? 'pointer' : '';
    }
}
class MapOverlay {
    constructor() {
        this.formatter = new Intl.NumberFormat();
        this.statsYear = document.getElementById('statsYear');
        this.geoId = document.getElementById('geoId');
        this.geoName = document.getElementById('geoName');
        this.landArea = document.getElementById('landArea');
        this.waterArea = document.getElementById('waterArea');
        this.populationDensity = document.getElementById('populationDensity');
        this.population = document.getElementById('population');
        this.households = document.getElementById('households');
        this.medianAge = document.getElementById('medianAge');
        this.familyIncome = document.getElementById('familyIncome');
        this.householdIncome = document.getElementById('householdIncome');
        this.perCapitaIncome = document.getElementById('perCapitaIncome');
        this.housingUnits = document.getElementById('housingUnits');
        this.houseValue = document.getElementById('houseValue');
        this.upperHouseValue = document.getElementById('upperHouseValue');
        this.lowerHouseValue = document.getElementById('lowerHouseValue');
        this.vacancyRate = document.getElementById('vacancyRate');
        this.povertyRate = document.getElementById('povertyRate');
        this.unemploymentRate = document.getElementById('unemploymentRate');
        this.totalJobsQ1 = document.getElementById('totalJobsQ1');
        this.totalJobsQ2 = document.getElementById('totalJobsQ2');
        this.totalJobsQ3 = document.getElementById('totalJobsQ3');
        this.totalJobsQ4 = document.getElementById('totalJobsQ4');
        this.totalHiresQ1 = document.getElementById('totalHiresQ1');
        this.totalHiresQ2 = document.getElementById('totalHiresQ2');
        this.totalHiresQ3 = document.getElementById('totalHiresQ3');
        this.totalHiresQ4 = document.getElementById('totalHiresQ4');
        this.newHiresQ1 = document.getElementById('newHiresQ1');
        this.newHiresQ2 = document.getElementById('newHiresQ2');
        this.newHiresQ3 = document.getElementById('newHiresQ3');
        this.newHiresQ4 = document.getElementById('newHiresQ4');
        this.separationsQ1 = document.getElementById('separationsQ1');
        this.separationsQ2 = document.getElementById('separationsQ2');
        this.separationsQ3 = document.getElementById('separationsQ3');
        this.separationsQ4 = document.getElementById('separationsQ4');
        this.jobsGainQ1 = document.getElementById('jobsGainQ1');
        this.jobsGainQ2 = document.getElementById('jobsGainQ2');
        this.jobsGainQ3 = document.getElementById('jobsGainQ3');
        this.jobsGainQ4 = document.getElementById('jobsGainQ4');
        this.jobsLossQ1 = document.getElementById('jobsLossQ1');
        this.jobsLossQ2 = document.getElementById('jobsLossQ2');
        this.jobsLossQ3 = document.getElementById('jobsLossQ3');
        this.jobsLossQ4 = document.getElementById('jobsLossQ4');
        this.netJobsQ1 = document.getElementById('netJobsQ1');
        this.netJobsQ2 = document.getElementById('netJobsQ2');
        this.netJobsQ3 = document.getElementById('netJobsQ3');
        this.netJobsQ4 = document.getElementById('netJobsQ4');
        this.payrollQ1 = document.getElementById('payrollQ1');
        this.payrollQ2 = document.getElementById('payrollQ2');
        this.payrollQ3 = document.getElementById('payrollQ3');
        this.payrollQ4 = document.getElementById('payrollQ4');
    }

    update(geoId, year, geoData, landArea, population, populationDensity) {
        this.setYear(year);
        this.setGeoId(geoId);
        this.setGeoName(geoData.getName(year));
        this.setLandArea(landArea);
        this.setWaterArea(geoData.getWaterArea(year));
        this.setPopulationDensity(populationDensity);
        this.setPopulation(population);
        this.setHouseholds(geoData.getHouseholdTotal(year));
        this.setMedianAge(geoData.getMedianAge(year));
        this.setFamilyIncome(geoData.getFamilyIncome(year));
        this.setHouseholdIncome(geoData.getHouseholdIncome(year));
        this.setPerCapitaIncome(geoData.getPerCapitaIncome(year));
        this.setHousingUnits(geoData.getHousingUnitsTotal(year));
        this.setHouseValue(geoData.getMedianHouseValue(year));
        this.setUpperHouseValue(geoData.getUpperQuartileHouseValue(year));
        this.setLowerHouseValue(geoData.getLowerQuartileHouseValue(year));
        this.setVacancyRate(geoData.getVacancyRate(year));
        this.setPovertyRate(geoData.getPovertyRate(year));
        this.setUnemploymentRate(geoData.getUnemploymentRate(year));
        this.setTotalJobs(geoData.getTotalJobsQ1(year), geoData.getTotalJobsQ2(year), geoData.getTotalJobsQ3(year), geoData.getTotalJobsQ4(year));
        this.setTotalHires(geoData.getTotalHiresQ1(year), geoData.getTotalHiresQ2(year), geoData.getTotalHiresQ3(year), geoData.getTotalHiresQ4(year));
        this.setNewHires(geoData.getNewHiresQ1(year), geoData.getNewHiresQ2(year), geoData.getNewHiresQ3(year), geoData.getNewHiresQ4(year));
        this.setSeparations(geoData.getSeparationsQ1(year), geoData.getSeparationsQ2(year), geoData.getSeparationsQ3(year), geoData.getSeparationsQ4(year));
        this.setJobGains(geoData.getJobGainsQ1(year), geoData.getJobGainsQ2(year), geoData.getJobGainsQ3(year), geoData.getJobGainsQ4(year));
        this.setJobLosses(geoData.getJobLossesQ1(year), geoData.getJobLossesQ2(year), geoData.getJobLossesQ3(year), geoData.getJobLossesQ4(year));
        this.setNetJobs(geoData.getNetJobsQ1(year), geoData.getNetJobsQ2(year), geoData.getNetJobsQ3(year), geoData.getNetJobsQ4(year));
        this.setPayroll(geoData.getPayrollQ1(year), geoData.getPayrollQ2(year), geoData.getPayrollQ3(year), geoData.getPayrollQ4(year));
    }

    clear(year) {
        this.setYear(year);
        this.setGeoId(null);
        this.setGeoName(null);
        this.setLandArea(null);
        this.setWaterArea(null);
        this.setPopulationDensity(null);
        this.setPopulation(null);
        this.setHouseholds(null);
        this.setMedianAge(null);
        this.setFamilyIncome(null);
        this.setHouseholdIncome(null);
        this.setPerCapitaIncome(null);
        this.setHousingUnits(null);
        this.setHouseValue(null);
        this.setUpperHouseValue(null);
        this.setLowerHouseValue(null);
        this.setVacancyRate(null);
        this.setPovertyRate(null);
        this.setUnemploymentRate(null);
        this.setTotalJobs(null, null, null, null);
        this.setTotalHires(null, null, null, null);
        this.setNewHires(null, null, null, null);
        this.setSeparations(null, null, null, null);
        this.setJobGains(null, null, null, null);
        this.setJobLosses(null, null, null, null);
        this.setNetJobs(null, null, null, null);
        this.setPayroll(null, null, null, null);
    }

    setYear(value) {
        this.statsYear.innerHTML = value == null ? "Recent" : value;
    }

    setGeoId(value) {
        this.geoId.innerHTML = value == null ? "-" : value;
    }

    setGeoName(value) {
        this.geoName.innerHTML = value == null ? "&nbsp;" : value;
    }

    setLandArea(value) {
        this.landArea.innerHTML = value == null ? "-" : this.formatter.format(value.toFixed(2));
    }

    setWaterArea(value) {
        this.waterArea.innerHTML = value == null ? "-" : this.formatter.format(value.toFixed(2));
    }

    setPopulationDensity(value) {
        this.populationDensity.innerHTML = value == null ? "-" : this.formatter.format(value.toFixed(2));
    }

    setPopulation(value) {
        this.population.innerHTML = value == null ? "-" : this.formatter.format(value);
    }

    setHouseholds(value) {
        this.households.innerHTML = value == null ? "-" : this.formatter.format(value);
    }

    setMedianAge(value) {
        this.medianAge.innerHTML = value == null ? "-" : this.formatter.format(value);
    }

    setFamilyIncome(value) {
        this.familyIncome.innerHTML = value == null ? "-" : this.formatter.format(value);
    }

    setHouseholdIncome(value) {
        this.householdIncome.innerHTML = value == null ? "-" : this.formatter.format(value);
    }

    setPerCapitaIncome(value) {
        this.perCapitaIncome.innerHTML = value == null ? "-" : this.formatter.format(value);
    }

    setHousingUnits(value) {
        this.housingUnits.innerHTML = value == null ? "-" : this.formatter.format(value);
    }

    setHouseValue(value) {
        this.houseValue.innerHTML = value == null ? "-" : this.formatter.format(value);
    }

    setUpperHouseValue(value) {
        this.upperHouseValue.innerHTML = value == null ? "-" : this.formatter.format(value);
    }

    setLowerHouseValue(value) {
        this.lowerHouseValue.innerHTML = value == null ? "-" : this.formatter.format(value);
    }

    setVacancyRate(value) {
        this.vacancyRate.innerHTML = value == null ? "-" : this.formatter.format(value) + "%";
    }

    setPovertyRate(value) {
        this.povertyRate.innerHTML = value == null ? "-" : this.formatter.format(value) + "%";
    }

    setUnemploymentRate(value) {
        this.unemploymentRate.innerHTML = value == null ? "-" : this.formatter.format(value) + "%";
    }

    setTotalJobs(q1Value, q2Value, q3Value, q4Value) {
        this.totalJobsQ1.innerHTML = q1Value == null ? "-" : this.formatter.format(q1Value);
        this.totalJobsQ2.innerHTML = q2Value == null ? "-" : this.formatter.format(q2Value);
        this.totalJobsQ3.innerHTML = q3Value == null ? "-" : this.formatter.format(q3Value);
        this.totalJobsQ4.innerHTML = q4Value == null ? "-" : this.formatter.format(q4Value);
    }

    setTotalHires(q1Value, q2Value, q3Value, q4Value) {
        this.totalHiresQ1.innerHTML = q1Value == null ? "-" : this.formatter.format(q1Value);
        this.totalHiresQ2.innerHTML = q2Value == null ? "-" : this.formatter.format(q2Value);
        this.totalHiresQ3.innerHTML = q3Value == null ? "-" : this.formatter.format(q3Value);
        this.totalHiresQ4.innerHTML = q4Value == null ? "-" : this.formatter.format(q4Value);
    }

    setNewHires(q1Value, q2Value, q3Value, q4Value) {
        this.newHiresQ1.innerHTML = q1Value == null ? "-" : this.formatter.format(q1Value);
        this.newHiresQ2.innerHTML = q2Value == null ? "-" : this.formatter.format(q2Value);
        this.newHiresQ3.innerHTML = q3Value == null ? "-" : this.formatter.format(q3Value);
        this.newHiresQ4.innerHTML = q4Value == null ? "-" : this.formatter.format(q4Value);
    }
    
    setSeparations(q1Value, q2Value, q3Value, q4Value) {
        this.separationsQ1.innerHTML = q1Value == null ? "-" : this.formatter.format(q1Value);
        this.separationsQ2.innerHTML = q2Value == null ? "-" : this.formatter.format(q2Value);
        this.separationsQ3.innerHTML = q3Value == null ? "-" : this.formatter.format(q3Value);
        this.separationsQ4.innerHTML = q4Value == null ? "-" : this.formatter.format(q4Value);
    }
    
    setJobGains(q1Value, q2Value, q3Value, q4Value) {
        this.jobsGainQ1.innerHTML = q1Value == null ? "-" : this.formatter.format(q1Value);
        this.jobsGainQ2.innerHTML = q2Value == null ? "-" : this.formatter.format(q2Value);
        this.jobsGainQ3.innerHTML = q3Value == null ? "-" : this.formatter.format(q3Value);
        this.jobsGainQ4.innerHTML = q4Value == null ? "-" : this.formatter.format(q4Value);
    }

    setJobLosses(q1Value, q2Value, q3Value, q4Value) {
        this.jobsLossQ1.innerHTML = q1Value == null ? "-" : this.formatter.format(q1Value);
        this.jobsLossQ2.innerHTML = q2Value == null ? "-" : this.formatter.format(q2Value);
        this.jobsLossQ3.innerHTML = q3Value == null ? "-" : this.formatter.format(q3Value);
        this.jobsLossQ4.innerHTML = q4Value == null ? "-" : this.formatter.format(q4Value);
    }
    
    setNetJobs(q1Value, q2Value, q3Value, q4Value) {
        this.netJobsQ1.innerHTML = q1Value == null ? "-" : this.formatter.format(q1Value);
        this.netJobsQ2.innerHTML = q2Value == null ? "-" : this.formatter.format(q2Value);
        this.netJobsQ3.innerHTML = q3Value == null ? "-" : this.formatter.format(q3Value);
        this.netJobsQ4.innerHTML = q4Value == null ? "-" : this.formatter.format(q4Value);
    }
    
    setPayroll(q1Value, q2Value, q3Value, q4Value) {
        this.payrollQ1.innerHTML = q1Value == null ? "-" : this.formatter.format(q1Value);
        this.payrollQ2.innerHTML = q2Value == null ? "-" : this.formatter.format(q2Value);
        this.payrollQ3.innerHTML = q3Value == null ? "-" : this.formatter.format(q3Value);
        this.payrollQ4.innerHTML = q4Value == null ? "-" : this.formatter.format(q4Value);
    }
}
class MapController {
    constructor(accessToken, geoId, urlPrefix, centerPoint) {
        var self = this;

        this.urlPrefix = urlPrefix;
        this.hoverId = {};
        this.selectedId = {};
        this.overlay = new MapOverlay();
        this.map = new Map(accessToken, centerPoint);
        this.mapCharts = new MapCharts();
        this.reportCard = new ReportCard(RuleGradingSystem.letters());
        this.ruleEngine = new RuleEngine(); 
        this.ruleEngine.addPopulationGrowthRules();
        this.ruleEngine.addHouseholdMedianIncomeGrowthRules();
        this.ruleEngine.addHouseValueGrowthRules();
        this.rawData = {};
        this.rawData.loaded = 0;
        this.rawData.hasMapLayers = false;
        this.rawData.isReloading = false;
        this.mapData = {};
        this.mapData[CensusGeography.nation()] = new MapData(CensusGeography.nation(), "all", urlPrefix, function() { self.loadMap(CensusGeography.nation(), "all"); });
        this.mapData[CensusGeography.region()] = new MapData(CensusGeography.region(), "all", urlPrefix, function() { self.loadMap(CensusGeography.region(), "all"); });
        this.mapData[CensusGeography.division()] = new MapData(CensusGeography.division(), "all", urlPrefix, function() { self.loadMap(CensusGeography.division(), "all"); });
        this.mapData[CensusGeography.state()] = new MapData(CensusGeography.state(), "all", urlPrefix, function() { self.loadMap(CensusGeography.state(), "all"); });
        this.mapData[CensusGeography.statisticalArea()] = new MapData(CensusGeography.statisticalArea(), "all", urlPrefix, function() { self.loadMap(CensusGeography.statisticalArea(), "all"); });
        this.mapData[CensusGeography.place()] = new MapData(CensusGeography.place(), geoId, urlPrefix, function() { self.loadMap(CensusGeography.place(), geoId); });
        this.mapData[CensusGeography.county()] = new MapData(CensusGeography.county(), geoId, urlPrefix, function() { self.loadMap(CensusGeography.county(), geoId); });
        this.mapData[CensusGeography.tract()] = new MapData(CensusGeography.tract(), geoId, urlPrefix, function() { self.loadMap(CensusGeography.tract(), geoId); });
        this.updateOverlayId = null;

        $('#geography-picker').change(function() {
            self.reloadMapLayers();
        });
        $('#overlay-picker').change(function() {
            self.reloadMapLayers();
        });
        $('#year-picker').change(function() {
            self.reloadMapLayers();
        });
    }

    getSelectedGeography() {
        return $("#geography-picker").attr("data-val");
    }

    getSelectedOverlay() {
        return $("#overlay-picker").attr("data-val");
    }

    getSelectedYear() {
        return $("#year-picker").attr("data-val");
    }

    reloadMapLayers() {
        var self = this;

        if (self.rawData.isReloading || self.rawData.loaded != CensusGeography.all().length) { 
            return 
        }
        self.rawData.isReloading = true;
        
        var selectedGeography = self.getSelectedGeography();
        var selectedOverlay = self.getSelectedOverlay();
        var selectedYear = self.getSelectedYear();
        if (selectedYear == 'recent') {
            selectedYear = null;
        }

        // remove existing layers
        if (self.rawData.hasMapLayers) {
            self.map.removeLayer('fill-layer');
            self.map.removeLayer('population-density-layer');
            self.map.removeLayer('household-income-layer');
            self.map.removeLayer('family-income-layer');
            self.map.removeLayer('house-value-layer');
            self.map.removeLayer('housing-units-layer');
            self.map.removeLayer('vacancy-rate-layer');
            self.map.removeLayer('age-layer');
            self.map.removeLayer('poverty-layer');
            self.map.removeLayer('unemployment-layer');
            self.map.removeLayer('hover-layer');
            self.map.removeLayer('selected-layer');
            self.map.removeLayer('border-layer');
        // add click handlers only on the first pass
        } else {
            self.map.addMouseMoveHandler('hover-layer', function(e) { self.onMouseMove(e); });
            self.map.addMouseEnterHandler('hover-layer', function(e) { self.onMouseEnter(e); });
            self.map.addMouseLeaveHandler('hover-layer', function(e) { self.onMouseLeave(e); });
            self.map.addMouseClickHandler('hover-layer', function(e) { self.onMouseClick(e); });
        }

        // add layers
        var data = self.rawData[selectedGeography];
        var geoData = self.mapData[selectedGeography];

        var populationDensityStats = geoData.getPopulationDensityStats(selectedYear);
        var populationStats = geoData.getPopulationTotalStats(selectedYear);
        var landAreaStats = geoData.getLandAreaStats(selectedYear);
        var householdIncomeStats = geoData.getHouseholdIncomeStats(selectedYear);
        var familyIncomeStats = geoData.getFamilyIncomeStats(selectedYear);
        var houseValueStats = geoData.getMedianHouseValueStats(selectedYear);
        var housingUnitsStats = geoData.getHousingUnitsTotalStats(selectedYear);
        var vacancyRateStats = geoData.getVacancyRateStats(selectedYear);
        var ageStats = geoData.getMedianAgeStats(selectedYear);
        var povertyStats = geoData.getPovertyRateStats(selectedYear);
        var unemploymentStats = geoData.getUnemploymentRateStats(selectedYear);

        data.features = data.features.map(function(d) {
            var geoId = d.properties.GEOID;
            if (geoId == "US") {
                geoId = "";
            }
            var population = geoData.getPopulationTotal(geoId, selectedYear) / populationStats.sum();
            if (population == null || isNaN(population)) {
                population = 0;
            }
            var landArea = geoData.getLandArea(geoId, selectedYear) / landAreaStats.sum();
            if (landArea == null || landArea == 0 || isNaN(landArea)) {
                landArea = 1;
            }
            var householdIncome = geoData.getHouseholdIncome(geoId, selectedYear);
            if (householdIncome == null || isNaN(householdIncome)) {
                householdIncome = 0;
            }
            var familyIncome = geoData.getFamilyIncome(geoId, selectedYear);
            if (familyIncome == null || isNaN(familyIncome)) {
                familyIncome = 0;
            }
            var houseValue = geoData.getMedianHouseValue(geoId, selectedYear);
            if (houseValue == null || isNaN(houseValue)) {
                houseValue = 0;
            }
            var housingUnits = geoData.getHousingUnitsTotal(geoId, selectedYear);
            if (housingUnits == null || isNaN(housingUnits)) {
                housingUnits = 0;
            }
            var vacancyRate = geoData.getVacancyRate(geoId, selectedYear);
            if (vacancyRate == null || isNaN(vacancyRate)) {
                vacancyRate = 0;
            }
            var age = geoData.getMedianAge(geoId, selectedYear);
            if (age == null || isNaN(age)) {
                age = 0;
            }
            var poverty = geoData.getPovertyRate(geoId, selectedYear);
            if (poverty == null || isNaN(poverty)) {
                poverty = 0;
            }
            var unemployment = geoData.getUnemploymentRate(geoId, selectedYear);
            if (unemployment == null || isNaN(unemployment)) {
                unemployment = 0;
            }

            d.properties.populationDensity = parseFloat(population / landArea);
            if (isNaN(d.properties.populationDensity)) { d.properties.populationDensity = 0; }

            d.properties.householdIncome = parseFloat(householdIncome);
            if (isNaN(d.properties.householdIncome)) { d.properties.householdIncome = 0; }

            d.properties.familyIncome = parseFloat(familyIncome);
            if (isNaN(d.properties.familyIncome)) { d.properties.familyIncome = 0; }

            d.properties.houseValue = parseFloat(houseValue);
            if (isNaN(d.properties.houseValue)) { d.properties.houseValue = 0; }
            
            d.properties.housingUnits = parseFloat(housingUnits);
            if (isNaN(d.properties.housingUnits)) { d.properties.housingUnits = 0; }
            
            d.properties.vacancyRate = parseFloat(vacancyRate);
            if (isNaN(d.properties.vacancyRate)) { d.properties.vacancyRate = 0; }
            
            d.properties.age = parseFloat(age);
            if (isNaN(d.properties.age)) { d.properties.age = 0; }
            
            d.properties.poverty = parseFloat(poverty);
            if (isNaN(d.properties.poverty)) { d.properties.poverty = 0; }
            
            d.properties.unemployment = parseFloat(unemployment);
            if (isNaN(d.properties.unemployment)) { d.properties.unemployment = 0; }

            return d;
        });

        self.map.addPolygons('polygons', data);

        switch (selectedOverlay) {
            case 'populationDensity':
                self.map.addChoroplethLayer('population-density-layer', 'polygons', 'populationDensity', 1, "#edf8fb", "#ccece6", "#99d8c9", "#66c2a4", "#41ae76", "#238b45", "#005824")
                break
            case 'householdIncome':
                self.map.addChoroplethLayer('household-income-layer', 'polygons', 'householdIncome', householdIncomeStats.max(), "#edf8fb", "#bfd3e6", "#9ebcda", "#8c96c6", "#8c6bb1", "#88419d", "#6e016b")
                break
            case 'familyIncome':
                self.map.addChoroplethLayer('family-income-layer', 'polygons', 'familyIncome', familyIncomeStats.max(), "#edf8fb", "#bfd3e6", "#9ebcda", "#8c96c6", "#8c6bb1", "#88419d", "#6e016b")
                break
            case 'houseValue':
                self.map.addChoroplethLayer('house-value-layer', 'polygons', 'houseValue', houseValueStats.max(), "#f0f9e8", "#ccebc5", "#a8ddb5", "#7bccc4", "#4eb3d3", "#2b8cbe", "#08589e")
                break
            case 'housingUnits':
                self.map.addChoroplethLayer('housing-units-layer', 'polygons', 'housingUnits', housingUnitsStats.max(), "#fef0d9", "#fdd49e", "#fdbb84", "#fc8d59", "#ef6548", "#d7301f", "#990000")
                break
            case 'vacancyRate':
                self.map.addChoroplethLayer('vacancy-rate-layer', 'polygons', 'vacancyRate', vacancyRateStats.max(), "#feebe2", "#fcc5c0", "#fa9fb5", "#f768a1", "#dd3497", "#ae017e", "#7a0177")
                break
            case 'age':
                self.map.addChoroplethLayer('age-layer', 'polygons', 'age', ageStats.max(), "#f1eef6", "#d0d1e6", "#a6bddb", "#74a9cf", "#3690c0", "#0570b0", "#034e7b")
                break
            case 'poverty':
                self.map.addChoroplethLayer('poverty-layer', 'polygons', 'poverty', povertyStats.max(), "#ffffd4", "#fee391", "#fec44f", "#fe9929", "#ec7014", "#cc4c02", "#8c2d04")
                break
            case 'unemployment':
                self.map.addChoroplethLayer('unemployment-layer', 'polygons', 'unemployment', unemploymentStats.max(), "#ffffcc", "#d9f0a3", "#addd8e", "#78c679", "#41ab5d", "#238443", "#005a32")
                break
            default:
                self.map.addFillLayer('fill-layer', 'polygons', "#9e9ac8", true);
                break
        }
        self.map.addHoverLayer('hover-layer', 'polygons', '#bdbdbd', true);
        self.map.addSelectedLayer('selected-layer', 'polygons', '#bdbdbd', true);
        self.map.addBorderLayer('border-layer', 'polygons', '#252525', true);

        self.clearOverlay();
        self.updateQWIVisibility(selectedGeography);
        self.rawData.hasMapLayers = true;
        self.rawData.isReloading = false;
    }

    loadMap(geography, geoId) {
        var self = this;

        var polygonUrl = self.urlPrefix + geography + "/polygons/" + geoId + ".json";
        $.ajax({ 'async': true,
                 'global': false,
                 'url': polygonUrl,
                 'dataType': "json",
                 'success': function (data) {
                    self.rawData[geography] = data;
                    self.rawData.loaded += 1;
                    self.reloadMapLayers();
                 }
        });
    }

    onMouseMove(e) {
        var selectedGeography = this.getSelectedGeography();
        var selectedYear = this.getSelectedYear();
        if (selectedYear == 'recent') {
            selectedYear = null;
        }

        if (e.features.length > 0) {
            var newHoverId = e.features[0].id;
            var geoId = e.features[0].properties.GEOID;
            if (geoId == "US") {
                geoId = "";
            }
            
            this.updateHover(newHoverId, geoId, selectedGeography, selectedYear);
        } else {
            this.clearOverlay();
        }
    }

    onMouseEnter(e) {
        this.map.setMousePointerEnabled(true);
    }

    onMouseLeave(e) {
        var selectedGeography = this.getSelectedGeography();

        this.map.setMousePointerEnabled(false);
        
        if (this.hoverId[selectedGeography]) {
            this.map.setHoverEnabled('polygons', this.hoverId[selectedGeography], false);
        }
        this.hoverId[selectedGeography] = null;
    }

    onMouseClick(e) {
        var selectedGeography = this.getSelectedGeography();
        var selectedYear = this.getSelectedYear();
        if (selectedYear == 'recent') {
            selectedYear = null;
        }
        
        if (e.features.length > 0) {
            var geoId = e.features[0].properties.GEOID;
            if (geoId == "US") {
                geoId = "";
            }
            var selectedId = e.features[0].id;
            
            if (selectedId != this.selectedId[selectedGeography]) {
                if (this.selectedId[selectedGeography]) {
                    this.map.setSelectedEnabled('polygons', this.selectedId[selectedGeography], false);
                }
                if (selectedId == this.hoverId[selectedGeography]) {
                    this.updateHover(null, geoId, selectedGeography, selectedYear);
                }
                this.selectedId[selectedGeography] = selectedId
                this.map.setSelectedEnabled('polygons', this.selectedId[selectedGeography], true);
            } else {
                this.map.setSelectedEnabled('polygons', this.selectedId[selectedGeography], false);
                this.selectedId[selectedGeography] = null;
                this.updateHover(selectedId, geoId, selectedGeography, selectedYear);
            }
            
            if (this.selectedId[selectedGeography] != null) {
                this.updateOverlay(geoId, selectedGeography, selectedYear);
            }

            this.update(geoId, selectedGeography, selectedYear);
        }
    }

    updateHover(hoverId, geoId, geography, year) {
        if (this.hoverId[geography]) {
            this.map.setHoverEnabled('polygons', this.hoverId[geography], false);
        }
        this.hoverId[geography] = hoverId
        if (this.hoverId[geography] != this.selectedId[geography]) {
            this.map.setHoverEnabled('polygons', this.hoverId[geography], true);
        }
        
        if (this.selectedId[geography] == null) {
            this.updateOverlay(geoId, geography, year);
        }
    }

    update(geoId, geography, year) {
        var geoData = this.mapData[geography].getGeoData(geoId);
        this.mapCharts.update(geoData);
    }

    updateOverlay(geoId, geography, year) {
        var self = this;
        window.clearTimeout(self.updateOverlayId);
        
        self.updateOverlayId = window.setTimeout(function() {
            var geoData = self.mapData[geography].getGeoData(geoId);

            var landArea = geoData.getLandArea(year);
            var population = geoData.getPopulationTotal(year);
            var populationDensity = null;
            if (landArea != null && population != null) {
                populationDensity = population / landArea;
            }

            self.overlay.update(geoId, year, geoData, landArea, population, populationDensity);
            var grades = self.ruleEngine.evaluate(geography, geoData);
            self.reportCard.applyGrades(grades);
        }, 10);
    }

    clearOverlay() {
        var selectedYear = this.getSelectedYear();
        if (selectedYear == 'recent') {
            selectedYear = null;
        }

        this.overlay.clear(selectedYear);
        this.reportCard.clearGrades();
    }

    updateQWIVisibility(geography) {
        switch (geography) {
            case CensusGeography.state():
            case CensusGeography.statisticalArea():
            case CensusGeography.county():
                $(".qwi").show();
                break;
            default:
                $(".qwi").hide();
                break;
        }
    }
}