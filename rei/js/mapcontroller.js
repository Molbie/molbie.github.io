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
        
        this.map.addControl(this.navigationControl);
        document.getElementById('geocoder').appendChild(this.geocoder.onAdd(this.map));

        var self = this;
        this.map.on('load', function() { 
            self.map.resize();
            self.map.scrollZoom.disable();
        });
    }

    addPolygons(sourceId, url) {
        this.map.addSource(sourceId, {'type': 'geojson', 'data': url});
    }
    
    addDensityLayer(id, sourceId, numerator, denominator, minValue, maxValue, startColor, endColor) {
        this.map.addLayer({
            'id': id,
            'type': 'fill',
            'source': sourceId,
            'layout': {},
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

    addHoverLayer(id, sourceId, color) {
        this.map.addLayer({
            'id': id,
            'type': 'fill',
            'source': sourceId,
            'layout': {},
            'paint': {
                'fill-color': color,
                'fill-opacity': ['case',
                                 ['boolean', ['feature-state', 'hover'], false],
                                 0.6,
                                 0.1
                                ]
                }
        });
    }

    addSelectedLayer(id, sourceId, color) {
        this.map.addLayer({
            'id': id,
            'type': 'fill',
            'source': sourceId,
            'layout': {},
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

    addBorderLayer(id, sourceId, color) {
        this.map.addLayer({
            'id': id,
            'type': 'line',
            'source': sourceId,
            'layout': {},
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
        this.geoName.innerHTML = value == null ? "NAME" : value.toUpperCase();
    }

    setLandArea(value) {
        this.landArea.innerHTML = value == null ? "-" : value.toFixed(2);
    }

    setWaterArea(value) {
        this.waterArea.innerHTML = value == null ? "-" : value.toFixed(2);
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
    geography;
    polygonUrl;
    hoverId;
    selectedId;
    overlay;
    map;
    mapCharts;
    reportCard;
    ruleEngine;
    mapData;

    constructor(accessToken, geography, geoId, urlPrefix, centerPoint) {
        var self = this;
        
        this.geography = geography;
        this.polygonUrl = urlPrefix + geography + "/polygons/" + geoId + ".json";
        this.hoverId = null;
        this.selectedId = null;
        this.overlay = new MapOverlay();
        this.map = new Map(accessToken, centerPoint);
        this.mapCharts = new MapCharts();
        this.reportCard = new ReportCard(RuleGradingSystem.letters);
        this.ruleEngine = new RuleEngine(); 
        this.ruleEngine.addPopulationGrowthRules();
        this.ruleEngine.addHouseholdMedianIncomeGrowthRules();
        this.ruleEngine.addHouseValueGrowthRules();
        this.mapData = new MapData(geography, geoId, urlPrefix, function(geography) { self.loadMap(geography); });
    }

    loadMap(geography) {
        var self = this;
        
        $.ajax({ 'async': true,
                 'global': false,
                 'url': this.polygonUrl,
                 'dataType': "json",
                 'success': function (data) {
                    var totalPopulation = self.mapData.getAllPopulation();
                    var totalLandArea = self.mapData.getAllLandArea();

                    data.features = data.features.map(function(d) {
                        var geoId = d.properties.GEOID;
                        var population = self.mapData.getPopulationTotal(geoId);
                        var landArea = self.mapData.getLandArea(geoId);
                        
                        d.properties.population = population / totalPopulation;
                        d.properties.landArea = landArea / totalLandArea;
                        return d;
                    });

                    self.map.addPolygons(geography + '-polygons', data);
                    
                    self.map.addDensityLayer(geography + 'population-density-layer', geography + '-polygons', 'population', 'landArea', 0, 1, "#EDF8FB", "#006D2C");
                    self.map.addHoverLayer(geography + '-hover-layer', geography + '-polygons', '#888888');
                    self.map.addSelectedLayer(geography + '-selected-layer', geography + '-polygons', '#888888');
                    self.map.addBorderLayer(geography + '-border-layer', geography + '-polygons', '#000000');

                    self.map.addMouseMoveHandler(geography + '-hover-layer', function(e) { self.onMouseMove(e); });
                    self.map.addMouseEnterHandler(geography + '-hover-layer', function(e) { self.onMouseEnter(e); });
                    self.map.addMouseLeaveHandler(geography + '-hover-layer', function(e) { self.onMouseLeave(e); });
                    self.map.addMouseClickHandler(geography + '-hover-layer', function(e) { self.onMouseClick(e); });
                 }
        });
    }

    onMouseMove(e) {
        if (e.features.length > 0) {
            var newHoverId = e.features[0].id;
            var geoId = e.features[0].properties.GEOID;
            
            this.updateHover(newHoverId, geoId)
        } else {
            this.clearOverlay()
        }
    }

    onMouseEnter(e) {
        this.map.setMousePointerEnabled(true);
    }

    onMouseLeave(e) {
        this.map.setMousePointerEnabled(false);
        
        if (this.hoverId) {
            this.map.setHoverEnabled(this.geography + '-polygons', this.hoverId, false);
        }
        this.hoverId = null;
    }

    onMouseClick(e) {
        if (e.features.length > 0) {
            var geoId = e.features[0].properties.GEOID;
            var selectedId = e.features[0].id;
            
            if (selectedId != this.selectedId) {
                if (this.selectedId) {
                    this.map.setSelectedEnabled(this.geography + '-polygons', this.selectedId, false);
                }
                if (selectedId == this.hoverId) {
                    this.updateHover(null, geoId);
                }
                this.selectedId = selectedId
                this.map.setSelectedEnabled(this.geography + '-polygons', this.selectedId, true);
            } else {
                this.map.setSelectedEnabled(this.geography + '-polygons', this.selectedId, false);
                this.selectedId = null;
                this.updateHover(selectedId, geoId);
            }
            
            if (this.selectedId != null) {
                this.updateOverlay(geoId)
            }

            // this.log(geoId);
            this.update(geoId);
        }
    }

    updateHover(hoverId, geoId) {
        if (this.hoverId) {
            this.map.setHoverEnabled(this.geography + '-polygons', this.hoverId, false);
        }
        this.hoverId = hoverId
        if (this.hoverId != this.selectedId) {
            this.map.setHoverEnabled(this.geography + '-polygons', this.hoverId, true);
        }
        
        if (this.selectedId == null) {
            this.updateOverlay(geoId)
        }
    }

    update(geoId) {
        var geoData = this.mapData.getGeoData(geoId);
        this.mapCharts.update(geoData);
    }

    updateOverlay(geoId) {
        this.overlay.setGeoId(geoId);
        this.overlay.setGeoName(this.mapData.getName(geoId));
        this.overlay.setLandArea(this.mapData.getLandArea(geoId));
        this.overlay.setWaterArea(this.mapData.getWaterArea(geoId));
        this.overlay.setPopulation(this.mapData.getPopulationTotal(geoId));
        this.overlay.setHouseholds(this.mapData.getHouseholdTotal(geoId));
        this.overlay.setMedianAge(this.mapData.getMedianAge(geoId));
        this.overlay.setFamilyIncome(this.mapData.getFamilyIncome(geoId));
        this.overlay.setHouseholdIncome(this.mapData.getHouseholdIncome(geoId));
        this.overlay.setPerCapitaIncome(this.mapData.getPerCapitaIncome(geoId));
        this.overlay.setHousingUnits(this.mapData.getHousingUnitsTotal(geoId));
        this.overlay.setHouseValue(this.mapData.getMedianHouseValue(geoId));
        this.overlay.setUpperHouseValue(this.mapData.getUpperQuartileHouseValue(geoId));
        this.overlay.setLowerHouseValue(this.mapData.getLowerQuartileHouseValue(geoId));
        this.overlay.setVacancyRate(this.mapData.getVacancyRate(geoId));
        this.overlay.setPovertyRate(this.mapData.getPovertyRate(geoId));
        this.overlay.setUnemploymentRate(this.mapData.getUnemploymentRate(geoId));

        var geoData = this.mapData.getGeoData(geoId);
        var grades = this.ruleEngine.evaluate(this.geography, geoData);
        this.reportCard.applyGrades(grades);
    }

    clearOverlay() {
        this.overlay.setGeoId(null);
        this.overlay.setGeoName(null);
        this.overlay.setLandArea(null);
        this.overlay.setWaterArea(null);
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