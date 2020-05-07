class Map {
    centerPoint;
    navigationControl;
    geocoder;
    map;

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

    addPolygons(sourceId, url) {
        this.map.addSource(sourceId, {'type': 'geojson', 'data': url});
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
                    ['/', ['get', numerator], ['get', denominator]],
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

    setLayerVisibility(layerId, visible) {
        this.map.setLayoutProperty(layerId, 'visibility', visible ? 'visible' : 'none');
    }

    addMouseMoveHandler(layerId, handler) {
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
    geoId;
    geoName;
    landArea;
    waterArea;
    populationDensity;
    population;
    households;
    medianAge;
    familyIncome;
    householdIncome;
    perCapitaIncome;
    housingUnits;
    houseValue;
    upperHouseValue;
    lowerHouseValue;
    vacancyRate;
    povertyRate;
    unemploymentRate;

    constructor() {
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
    }

    setGeoId(value) {
        this.geoId.innerHTML = value == null ? "-" : value;
    }

    setGeoName(value) {
        this.geoName.innerHTML = value == null ? "&nbsp;" : value;
    }

    setLandArea(value) {
        this.landArea.innerHTML = value == null ? "-" : value.toFixed(2);
    }

    setWaterArea(value) {
        this.waterArea.innerHTML = value == null ? "-" : value.toFixed(2);
    }

    setPopulationDensity(value) {
        this.populationDensity.innerHTML = value == null ? "-" : value.toFixed(2);
    }

    setPopulation(value) {
        this.population.innerHTML = value == null ? "-" : value;
    }

    setHouseholds(value) {
        this.households.innerHTML = value == null ? "-" : value;
    }

    setMedianAge(value) {
        this.medianAge.innerHTML = value == null ? "-" : value;
    }

    setFamilyIncome(value) {
        this.familyIncome.innerHTML = value == null ? "-" : value;
    }

    setHouseholdIncome(value) {
        this.householdIncome.innerHTML = value == null ? "-" : value;
    }

    setPerCapitaIncome(value) {
        this.perCapitaIncome.innerHTML = value == null ? "-" : value;
    }

    setHousingUnits(value) {
        this.housingUnits.innerHTML = value == null ? "-" : value;
    }

    setHouseValue(value) {
        this.houseValue.innerHTML = value == null ? "-" : value;
    }

    setUpperHouseValue(value) {
        this.upperHouseValue.innerHTML = value == null ? "-" : value;
    }

    setLowerHouseValue(value) {
        this.lowerHouseValue.innerHTML = value == null ? "-" : value;
    }

    setVacancyRate(value) {
        this.vacancyRate.innerHTML = value == null ? "-" : value + "%";
    }

    setPovertyRate(value) {
        this.povertyRate.innerHTML = value == null ? "-" : value + "%";
    }

    setUnemploymentRate(value) {
        this.unemploymentRate.innerHTML = value == null ? "-" : value + "%";
    }
}
class MapController {
    urlPrefix;
    hoverId;
    selectedId;
    overlay;
    map;
    mapCharts;
    reportCard;
    ruleEngine;
    mapData;

    constructor(accessToken, geoId, urlPrefix, centerPoint) {
        var self = this;
        
        this.urlPrefix = urlPrefix;
        this.hoverId = {};
        this.selectedId = {};
        this.overlay = new MapOverlay();
        this.map = new Map(accessToken, centerPoint);
        this.mapCharts = new MapCharts();
        this.reportCard = new ReportCard(RuleGradingSystem.letters);
        this.ruleEngine = new RuleEngine(); 
        this.ruleEngine.addPopulationGrowthRules();
        this.ruleEngine.addHouseholdMedianIncomeGrowthRules();
        this.ruleEngine.addHouseValueGrowthRules();
        
        var selectedGeography = $('input[type=radio][name=geography-selection]:checked').val();
        var selectedOverlay = $('input[type=radio][name=overlay-selection]:checked').val();
        this.mapData = {};
        this.mapData[CensusGeography.nation] = new MapData(CensusGeography.nation, "all", urlPrefix, function() { self.loadMap(CensusGeography.nation, "all", CensusGeography.nation == selectedGeography, selectedOverlay); });
        this.mapData[CensusGeography.region] = new MapData(CensusGeography.region, "all", urlPrefix, function() { self.loadMap(CensusGeography.region, "all", CensusGeography.region == selectedGeography, selectedOverlay); });
        this.mapData[CensusGeography.division] = new MapData(CensusGeography.division, "all", urlPrefix, function() { self.loadMap(CensusGeography.division, "all", CensusGeography.division == selectedGeography, selectedOverlay); });
        this.mapData[CensusGeography.state] = new MapData(CensusGeography.state, "all", urlPrefix, function() { self.loadMap(CensusGeography.state, "all", CensusGeography.state == selectedGeography, selectedOverlay); });
        this.mapData[CensusGeography.statisticalArea] = new MapData(CensusGeography.statisticalArea, "all", urlPrefix, function() { self.loadMap(CensusGeography.statisticalArea, "all", CensusGeography.statisticalArea == selectedGeography, selectedOverlay); });
        this.mapData[CensusGeography.place] = new MapData(CensusGeography.place, geoId, urlPrefix, function() { self.loadMap(CensusGeography.place, geoId, CensusGeography.place == selectedGeography, selectedOverlay); });
        this.mapData[CensusGeography.county] = new MapData(CensusGeography.county, geoId, urlPrefix, function() { self.loadMap(CensusGeography.county, geoId, CensusGeography.county == selectedGeography, selectedOverlay); });
        this.mapData[CensusGeography.tract] = new MapData(CensusGeography.tract, geoId, urlPrefix, function() { self.loadMap(CensusGeography.tract, geoId, CensusGeography.tract == selectedGeography, selectedOverlay); });

        $('input[type=radio][name=geography-selection]').change(function() {
            var selectedOverlay = $('input[type=radio][name=overlay-selection]:checked').val();
            self.setVisibleGeography(this.value, selectedOverlay);
        });
        $('input[type=radio][name=overlay-selection]').change(function() {
            var selectedGeography = $('input[type=radio][name=geography-selection]:checked').val();
            self.setVisibleGeography(selectedGeography, this.value);
        });
    }

    loadMap(geography, geoId, isVisible, overlayType) {
        var self = this;

        var polygonUrl = self.urlPrefix + geography + "/polygons/" + geoId + ".json";
        $.ajax({ 'async': true,
                 'global': false,
                 'url': polygonUrl,
                 'dataType': "json",
                 'success': function (data) {
                    var totalPopulation = self.mapData[geography].getAllPopulation();
                    var totalLandArea = self.mapData[geography].getAllLandArea();

                    data.features = data.features.map(function(d) {
                        var propertyId = d.properties.GEOID;
                        if (propertyId == "US") {
                            propertyId = "";
                        }
                        var population = self.mapData[geography].getPopulationTotal(propertyId);
                        var landArea = self.mapData[geography].getLandArea(propertyId);
                        if (geography == CensusGeography.nation) {
                            if (totalLandArea == 0) {
                                totalLandArea = 1;
                            }
                            if (landArea == null) {
                                landArea = 1;
                            }
                        }
                        
                        d.properties.population = population / totalPopulation;
                        d.properties.landArea = landArea / totalLandArea;
                        return d;
                    });

                    self.map.addPolygons(geography + '-polygons', data);

                    self.map.addFillLayer(geography + '-fill-layer', geography + '-polygons', "#006D2C", isVisible && overlayType == 'standard');
                    self.map.addDensityLayer(geography + '-population-density-layer', geography + '-polygons', 'population', 'landArea', 0, 1, "#EDF8FB", "#006D2C", isVisible && overlayType == 'populationDensity');
                    self.map.addHoverLayer(geography + '-hover-layer', geography + '-polygons', '#888888', isVisible);
                    self.map.addSelectedLayer(geography + '-selected-layer', geography + '-polygons', '#888888', isVisible);
                    self.map.addBorderLayer(geography + '-border-layer', geography + '-polygons', '#000000', isVisible);

                    self.map.addMouseMoveHandler(geography + '-hover-layer', function(e) { self.onMouseMove(e, geography); });
                    self.map.addMouseEnterHandler(geography + '-hover-layer', function(e) { self.onMouseEnter(e, geography); });
                    self.map.addMouseLeaveHandler(geography + '-hover-layer', function(e) { self.onMouseLeave(e, geography); });
                    self.map.addMouseClickHandler(geography + '-hover-layer', function(e) { self.onMouseClick(e, geography); });
                 }
        });
    }

    setVisibleGeography(geography, selectedOverlay) {
        var self = this;

        CensusGeography.all().forEach(function(value, index) {
            var isVisible = value == geography;

            self.map.setLayerVisibility(value + '-fill-layer', isVisible && selectedOverlay == 'standard');
            self.map.setLayerVisibility(value + '-population-density-layer', isVisible && selectedOverlay == 'populationDensity');
            self.map.setLayerVisibility(value + '-hover-layer', isVisible);
            self.map.setLayerVisibility(value + '-selected-layer', isVisible);
            self.map.setLayerVisibility(value + '-border-layer', isVisible);
        });
    }

    onMouseMove(e, geography) {
        if (e.features.length > 0) {
            var newHoverId = e.features[0].id;
            var geoId = e.features[0].properties.GEOID;
            if (geoId == "US") {
                geoId = "";
            }
            
            this.updateHover(newHoverId, geoId, geography)
        } else {
            this.clearOverlay()
        }
    }

    onMouseEnter(e, geography) {
        this.map.setMousePointerEnabled(true);
    }

    onMouseLeave(e, geography) {
        this.map.setMousePointerEnabled(false);
        
        if (this.hoverId[geography]) {
            this.map.setHoverEnabled(geography + '-polygons', this.hoverId[geography], false);
        }
        this.hoverId[geography] = null;
    }

    onMouseClick(e, geography) {
        if (e.features.length > 0) {
            var geoId = e.features[0].properties.GEOID;
            if (geoId == "US") {
                geoId = "";
            }
            var selectedId = e.features[0].id;
            
            if (selectedId != this.selectedId[geography]) {
                if (this.selectedId[geography]) {
                    this.map.setSelectedEnabled(geography + '-polygons', this.selectedId[geography], false);
                }
                if (selectedId == this.hoverId[geography]) {
                    this.updateHover(null, geoId, geography);
                }
                this.selectedId[geography] = selectedId
                this.map.setSelectedEnabled(geography + '-polygons', this.selectedId[geography], true);
            } else {
                this.map.setSelectedEnabled(geography + '-polygons', this.selectedId[geography], false);
                this.selectedId[geography] = null;
                this.updateHover(selectedId, geoId, geography);
            }
            
            if (this.selectedId[geography] != null) {
                this.updateOverlay(geoId, geography);
            }

            this.update(geoId, geography);
        }
    }

    updateHover(hoverId, geoId, geography) {
        if (this.hoverId[geography]) {
            this.map.setHoverEnabled(geography + '-polygons', this.hoverId[geography], false);
        }
        this.hoverId[geography] = hoverId
        if (this.hoverId[geography] != this.selectedId[geography]) {
            this.map.setHoverEnabled(geography + '-polygons', this.hoverId[geography], true);
        }
        
        if (this.selectedId[geography] == null) {
            this.updateOverlay(geoId, geography);
        }
    }

    update(geoId, geography) {
        var geoData = this.mapData[geography].getGeoData(geoId);
        this.mapCharts.update(geoData);
    }

    updateOverlay(geoId, geography) {
        var landArea = this.mapData[geography].getLandArea(geoId);
        var population = this.mapData[geography].getPopulationTotal(geoId);
        var populationDensity = null;
        if (landArea != null && population != null) {
            populationDensity = population / landArea;
        }

        this.overlay.setGeoId(geoId);
        this.overlay.setGeoName(this.mapData[geography].getName(geoId));
        this.overlay.setLandArea(landArea);
        this.overlay.setWaterArea(this.mapData[geography].getWaterArea(geoId));
        this.overlay.setPopulationDensity(populationDensity);
        this.overlay.setPopulation(population);
        this.overlay.setHouseholds(this.mapData[geography].getHouseholdTotal(geoId));
        this.overlay.setMedianAge(this.mapData[geography].getMedianAge(geoId));
        this.overlay.setFamilyIncome(this.mapData[geography].getFamilyIncome(geoId));
        this.overlay.setHouseholdIncome(this.mapData[geography].getHouseholdIncome(geoId));
        this.overlay.setPerCapitaIncome(this.mapData[geography].getPerCapitaIncome(geoId));
        this.overlay.setHousingUnits(this.mapData[geography].getHousingUnitsTotal(geoId));
        this.overlay.setHouseValue(this.mapData[geography].getMedianHouseValue(geoId));
        this.overlay.setUpperHouseValue(this.mapData[geography].getUpperQuartileHouseValue(geoId));
        this.overlay.setLowerHouseValue(this.mapData[geography].getLowerQuartileHouseValue(geoId));
        this.overlay.setVacancyRate(this.mapData[geography].getVacancyRate(geoId));
        this.overlay.setPovertyRate(this.mapData[geography].getPovertyRate(geoId));
        this.overlay.setUnemploymentRate(this.mapData[geography].getUnemploymentRate(geoId));

        var geoData = this.mapData[geography].getGeoData(geoId);
        var grades = this.ruleEngine.evaluate(geography, geoData);
        this.reportCard.applyGrades(grades);
    }

    clearOverlay() {
        this.overlay.setGeoId(null);
        this.overlay.setGeoName(null);
        this.overlay.setLandArea(null);
        this.overlay.setWaterArea(null);
        this.overlay.setPopulationDensity(null);
        this.overlay.setPopulation(null);
        this.overlay.setHouseholds(null);
        this.overlay.setMedianAge(null);
        this.overlay.setFamilyIncome(null);
        this.overlay.setHouseholdIncome(null);
        this.overlay.setPerCapitaIncome(null);
        this.overlay.setHousingUnits(null);
        this.overlay.setHouseValue(null);
        this.overlay.setUpperHouseValue(null);
        this.overlay.setLowerHouseValue(null);
        this.overlay.setVacancyRate(null);
        this.overlay.setPovertyRate(null);
        this.overlay.setUnemploymentRate(null);
    }
}