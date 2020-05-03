class Map {
    centerPoint;
    navigationControl;
    geocoder;
    map;

    constructor(accessToken, centerPoint, onMapLoaded) {
        mapboxgl.accessToken = accessToken;

        this.centerPoint = centerPoint;
        this.navigationControl = new mapboxgl.NavigationControl();
        this.geocoder = new MapboxGeocoder({accessToken: mapboxgl.accessToken, zoom: 14, marker: {color: '#37C0F0'}, mapboxgl: mapboxgl});
        this.map = new mapboxgl.Map({container: 'map', style: 'mapbox://styles/mapbox/light-v10', center: centerPoint, zoom: 6});
        
        this.map.addControl(this.navigationControl);
        document.getElementById('geocoder').appendChild(this.geocoder.onAdd(this.map));
        
        var self = this;
        this.map.on('load', function() { 
            onMapLoaded();
            self.map.resize();
            self.map.scrollZoom.disable();
        });
    }

    addPolygons(sourceId, url) {
        this.map.addSource(sourceId, {'type': 'geojson', 'data': url});
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
class MapController {
    polygonUrl;
    hoverId;
    selectedId;
    update;
    updateOverlay;
    clearOverlay;
    map;

    constructor(accessToken, polygonUrl, centerPoint, onUpdate, onUpdateOverlay, onClearOverlay) {
        this.polygonUrl = polygonUrl;
        this.hoverId = null;
        this.selectedId = null;
        this.update = function(geoId, geoName, landArea, waterArea) { onUpdate(geoId, geoName, landArea, waterArea); };
        this.updateOverlay = function(geoId, geoName, landArea, waterArea) { onUpdateOverlay(geoId, geoName, landArea, waterArea); };
        this.clearOverlay = function() { onClearOverlay(); };
        var self = this;
        this.map = new Map(accessToken, centerPoint, function() { self.onMapLoaded(); });
    }

    onMapLoaded() {
        this.map.addPolygons('polygons', this.polygonUrl);
        
        this.map.addHoverLayer('hover-layer', 'polygons', '#337AB7');
        this.map.addSelectedLayer('selected-layer', 'polygons', '#337AB7');
        this.map.addBorderLayer('border-layer', 'polygons', '#000000');

        var self = this;
        this.map.addMouseMoveHandler('hover-layer', function(e) { self.onMouseMove(e); });
        this.map.addMouseEnterHandler('hover-layer', function(e) { self.onMouseEnter(e); });
        this.map.addMouseLeaveHandler('hover-layer', function(e) { self.onMouseLeave(e); });
        this.map.addMouseClickHandler('hover-layer', function(e) { self.onMouseClick(e); });
    }

    onMouseMove(e) {
        if (e.features.length > 0) {
            var newHoverId = e.features[0].id;
            var geoId = e.features[0].properties.GEOID;
            var geoName = e.features[0].properties.NAME
            var landArea = e.features[0].properties.ALAND
            var waterArea = e.features[0].properties.AWATER
            
            this.updateHover(newHoverId, geoId, geoName, landArea, waterArea)
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
            this.map.setHoverEnabled('polygons', this.hoverId, false);
        }
        this.hoverId = null;
    }

    onMouseClick(e) {
        if (e.features.length > 0) {
            var geoId = e.features[0].properties.GEOID;
            var geoName = e.features[0].properties.NAME
            var landArea = e.features[0].properties.ALAND
            var waterArea = e.features[0].properties.AWATER
            var selectedId = e.features[0].id;
            
            if (selectedId != this.selectedId) {
                if (this.selectedId) {
                    this.map.setSelectedEnabled('polygons', this.selectedId, false);
                }
                if (selectedId == this.hoverId) {
                    this.updateHover(null, geoId, geoName, landArea, waterArea);
                }
                this.selectedId = selectedId
                this.map.setSelectedEnabled('polygons', this.selectedId, true);
            } else {
                this.map.setSelectedEnabled('polygons', this.selectedId, false);
                this.selectedId = null;
                this.updateHover(selectedId, geoId, geoName, landArea, waterArea);
            }
            
            // this.log(geoId, geoName, landArea, waterArea);
            this.update(geoId, geoName, landArea, waterArea);
        }
    }

    updateHover(hoverId, geoId, geoName, landArea, waterArea) {
        if (this.hoverId) {
            this.map.setHoverEnabled('polygons', this.hoverId, false);
        }
        this.hoverId = hoverId
        if (this.hoverId != this.selectedId) {
            this.map.setHoverEnabled('polygons', this.hoverId, true);
        }
        
        if (this.selectedId == null) {
            this.updateOverlay(geoId, geoName, landArea, waterArea)
        }
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
        this.geoName.innerHTML = value == null ? "-" : value;
    }

    setLandArea(value) {
        this.landArea.innerHTML = value == null ? "-" : (value / 2589988.1103).toFixed(2);
    }

    setWaterArea(value) {
        this.waterArea.innerHTML = value == null ? "-" : (value / 2589988.1103).toFixed(2);
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