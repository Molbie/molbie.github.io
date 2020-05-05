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
            console.log("map loaded: " + self.map.loaded());
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
        this.update = function(geoId) { onUpdate(geoId); };
        this.updateOverlay = function(geoId) { onUpdateOverlay(geoId); };
        this.clearOverlay = function() { onClearOverlay(); };
        var self = this;
        this.map = new Map(accessToken, centerPoint, function() { self.onMapLoaded(); });
    }

    onMapLoaded() {
        var self = this;

// Create a month property value based on time
// used to filter against.
//
        // data.features = data.features.map(function(d) {
        //     d.properties.month = new Date(d.properties.time).getMonth();
        //     return d;
        // });
            
        // map.addSource('earthquakes', {
        //     'type': 'geojson',
        //     data: data
        // });
// https://docs.mapbox.com/mapbox-gl-js/example/timeline-animation/


// Save off the data and update it in real time
//
// data.features[0].geometry.coordinates.push(
//     coordinates[i]
// );
// map.getSource('trace').setData(data);

        $.ajax({ 'async': true,
                 'global': false,
                 'url': this.polygonUrl,
                 'dataType': "json",
                 'success': function (data) {
                    self.map.addPolygons('polygons', data);
        
                    self.map.addHoverLayer('hover-layer', 'polygons', '#337AB7');
                    self.map.addSelectedLayer('selected-layer', 'polygons', '#337AB7');
                    self.map.addBorderLayer('border-layer', 'polygons', '#000000');
            
                    self.map.addMouseMoveHandler('hover-layer', function(e) { self.onMouseMove(e); });
                    self.map.addMouseEnterHandler('hover-layer', function(e) { self.onMouseEnter(e); });
                    self.map.addMouseLeaveHandler('hover-layer', function(e) { self.onMouseLeave(e); });
                    self.map.addMouseClickHandler('hover-layer', function(e) { self.onMouseClick(e); });
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
            this.map.setHoverEnabled('polygons', this.hoverId, false);
        }
        this.hoverId = null;
    }

    onMouseClick(e) {
        if (e.features.length > 0) {
            var geoId = e.features[0].properties.GEOID;
            var selectedId = e.features[0].id;
            
            if (selectedId != this.selectedId) {
                if (this.selectedId) {
                    this.map.setSelectedEnabled('polygons', this.selectedId, false);
                }
                if (selectedId == this.hoverId) {
                    this.updateHover(null, geoId);
                }
                this.selectedId = selectedId
                this.map.setSelectedEnabled('polygons', this.selectedId, true);
            } else {
                this.map.setSelectedEnabled('polygons', this.selectedId, false);
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
            this.map.setHoverEnabled('polygons', this.hoverId, false);
        }
        this.hoverId = hoverId
        if (this.hoverId != this.selectedId) {
            this.map.setHoverEnabled('polygons', this.hoverId, true);
        }
        
        if (this.selectedId == null) {
            this.updateOverlay(geoId)
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