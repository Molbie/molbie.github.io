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
    mapData;
    map;

    constructor(mapData, accessToken, polygonUrl, centerPoint, onUpdate) {
        this.polygonUrl = polygonUrl;
        this.hoverId = null;
        this.selectedId = null;
        this.update = function(geoId, geoName, landArea, waterArea) { onUpdate(geoId, geoName, landArea, waterArea); };
        this.mapData = mapData;
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

    updateOverlay(geoId, geoName, landArea, waterArea) {
        document.getElementById('geoId').innerHTML = geoId;
        document.getElementById('geoName').innerHTML = geoName == null ? "-" : geoName;
        document.getElementById('landArea').innerHTML = landArea == null ? "-" : (landArea  / 2589988.1103).toFixed(2);
        document.getElementById('waterArea').innerHTML = waterArea == null ? "-" : (waterArea  / 2589988.1103).toFixed(2);
        var population = this.mapData.getPopulationTotal(geoId);
        document.getElementById('population').innerHTML = population == null ? "-" : population;
        var households = this.mapData.getHouseholdTotal(geoId);
        document.getElementById('households').innerHTML = households == null ? "-" : households;
        var medianAge = this.mapData.getMedianAge(geoId);
        document.getElementById('medianAge').innerHTML = medianAge == null ? "-" : medianAge;
        var familyIncome = this.mapData.getFamilyIncome(geoId);
        document.getElementById('familyIncome').innerHTML = familyIncome == null ? "-" : familyIncome;
        var householdIncome = this.mapData.getHouseholdIncome(geoId);
        document.getElementById('householdIncome').innerHTML = householdIncome == null ? "-" : householdIncome;
        var perCapitaIncome = this.mapData.getPerCapitaIncome(geoId);
        document.getElementById('perCapitaIncome').innerHTML = perCapitaIncome == null ? "-" : perCapitaIncome;
        var housingUnits = this.mapData.getHousingUnitsTotal(geoId);
        document.getElementById('housingUnits').innerHTML = housingUnits == null ? "-" : housingUnits;
        var houseValue = this.mapData.getMedianHouseValue(geoId);
        document.getElementById('houseValue').innerHTML = houseValue == null ? "-" : houseValue;
        var upperHouseValue = this.mapData.getUpperQuartileHouseValue(geoId);
        document.getElementById('upperHouseValue').innerHTML = upperHouseValue == null ? "-" : upperHouseValue;
        var lowerHouseValue = this.mapData.getLowerQuartileHouseValue(geoId);
        document.getElementById('lowerHouseValue').innerHTML = lowerHouseValue == null ? "-" : lowerHouseValue;
        var vacancyRate = this.mapData.getVacancyRate(geoId);
        document.getElementById('vacancyRate').innerHTML = vacancyRate == null ? "-" : vacancyRate + "%";
        var povertyRate = this.mapData.getPovertyRate(geoId);
        document.getElementById('povertyRate').innerHTML = povertyRate == null ? "-" : povertyRate + "%";
        var unemploymentRate = this.mapData.getUnemploymentRate(geoId);
        document.getElementById('unemploymentRate').innerHTML = unemploymentRate == null ? "-" : unemploymentRate + "%";
    }

    clearOverlay() {
        document.getElementById('geoId').innerHTML = "-";
        document.getElementById('geoName').innerHTML = "-";
        document.getElementById('landArea').innerHTML = "-";
        document.getElementById('waterArea').innerHTML = "-";
        document.getElementById('population').innerHTML = "-";
        document.getElementById('households').innerHTML = "-";
        document.getElementById('medianAge').innerHTML = "-";
        document.getElementById('familyIncome').innerHTML = "-";
        document.getElementById('householdIncome').innerHTML = "-";
        document.getElementById('perCapitaIncome').innerHTML = "-";
        document.getElementById('housingUnits').innerHTML = "-";
        document.getElementById('houseValue').innerHTML = "-";
        document.getElementById('upperHouseValue').innerHTML = "-";
        document.getElementById('lowerHouseValue').innerHTML = "-";
        document.getElementById('vacancyRate').innerHTML = "-";
        document.getElementById('povertyRate').innerHTML = "-";
        document.getElementById('unemploymentRate').innerHTML = "-";
    }

    log(geoId, geoName, landArea, waterArea) {
        console.log('GEOID: ' + geoId)
        console.log('CENSUS TRACT: ' + geoName)
        console.log('LAND SQ MILES: ' + (landArea / 2589988.1103))
        console.log('WATER SQ MILES: ' + (waterArea / 2589988.1103))
        console.log("POPULATION: " + this.mapData.getPopulationTotal(geoId))
        console.log("HOUSEHOLDS: " + this.mapData.getHouseholdTotal(geoId))
        console.log("MEDIAN AGE: " + this.mapData.getMedianAge(geoId))
        console.log("FAMILY INCOME: " + this.mapData.getFamilyIncome(geoId))
        console.log("HOUSEHOLD INCOME: " + this.mapData.getHouseholdIncome(geoId))
        console.log("PER CAPITA INCOME: " + this.mapData.getPerCapitaIncome(geoId))
        console.log("HOUSING UNITS: " + this.mapData.getHousingUnitsTotal(geoId))
        console.log("MEDIAN HOUSE VALUE: " + this.mapData.getMedianHouseValue(geoId))
        console.log("UPPER QUARTILE HOUSE VALUE: " + this.mapData.getUpperQuartileHouseValue(geoId))
        console.log("LOWER QUARTILE HOUSE VALUE: " + this.mapData.getLowerQuartileHouseValue(geoId))
        console.log("VACANCY RATE: " + this.mapData.getVacancyRate(geoId))
        console.log("POVERTY RATE: " + this.mapData.getPovertyRate(geoId))
        console.log("UNEMPLOYMENT RATE: " + this.mapData.getUnemploymentRate(geoId))
    }
}
