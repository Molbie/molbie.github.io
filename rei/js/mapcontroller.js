function makeMapController(mapdata) {
    mapboxgl.accessToken = mapdata.accessToken;
    
    var mapController = {
        hoverId: null,
        selectedId: null,
        map: new mapboxgl.Map({ container: 'map',
           style: 'mapbox://styles/mapbox/streets-v9',
           center: mapdata.centerPoint,
           zoom: 6
        }),
        navigationControl: new mapboxgl.NavigationControl(),
        geocoder: new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            zoom: 14,
            marker: {
                color: '#37C0F0'
            },
            mapboxgl: mapboxgl
        }),
        addSources: function() {
            this.map.addSource('geolist', {'type': 'geojson', 'data': mapdata.polygonUrl});
        },
        addLayers: function() {
            this.map.addLayer({
                'id': 'geolist-fills',
                'type': 'fill',
                'source': 'geolist',
                'layout': {},
                'paint': {
                    'fill-color': '#337AB7',
                    'fill-opacity': ['case',
                                     ['boolean', ['feature-state', 'hover'], false],
                                     0.6,
                                     0.1
                                    ]
                    }
            });
            this.map.addLayer({
                'id': 'geolist-selection',
                'type': 'fill',
                'source': 'geolist',
                'layout': {},
                'paint': {
                    'fill-color': '#337AB7',
                    'fill-opacity': ['case',
                                     ['boolean', ['feature-state', 'selected'], false],
                                     0.8,
                                     0
                                    ]
                    }
            });
            this.map.addLayer({
                'id': 'geolist-borders',
                'type': 'line',
                'source': 'geolist',
                'layout': {},
                'paint': {
                    'line-color': '#337AB7',
                    'line-width': 2
                }
            });
        },
        setOverlayData: function(geoId, geoName, landArea, waterArea) {
            document.getElementById('geoId').innerHTML = geoId;
            document.getElementById('geoName').innerHTML = geoName == null ? "-" : geoName;
            document.getElementById('landArea').innerHTML = landArea == null ? "-" : (landArea  / 2589988.1103).toFixed(2);
            document.getElementById('waterArea').innerHTML = waterArea == null ? "-" : (waterArea  / 2589988.1103).toFixed(2);
            var population = mapdata.populationTotal(geoId);
            document.getElementById('population').innerHTML = population == null ? "-" : population;
            var households = mapdata.householdTotal(geoId);
            document.getElementById('households').innerHTML = households == null ? "-" : households;
            var medianAge = mapdata.medianAge(geoId);
            document.getElementById('medianAge').innerHTML = medianAge == null ? "-" : medianAge;
            var familyIncome = mapdata.familyIncome(geoId);
            document.getElementById('familyIncome').innerHTML = familyIncome == null ? "-" : familyIncome;
            var householdIncome = mapdata.householdIncome(geoId);
            document.getElementById('householdIncome').innerHTML = householdIncome == null ? "-" : householdIncome;
            var perCapitaIncome = mapdata.perCapitaIncome(geoId);
            document.getElementById('perCapitaIncome').innerHTML = perCapitaIncome == null ? "-" : perCapitaIncome;
            var housingUnits = mapdata.housingUnitsTotal(geoId);
            document.getElementById('housingUnits').innerHTML = housingUnits == null ? "-" : housingUnits;
            var houseValue = mapdata.medianHouseValue(geoId);
            document.getElementById('houseValue').innerHTML = houseValue == null ? "-" : houseValue;
            var upperHouseValue = mapdata.upperQuartileHouseValue(geoId);
            document.getElementById('upperHouseValue').innerHTML = upperHouseValue == null ? "-" : upperHouseValue;
            var lowerHouseValue = mapdata.lowerQuartileHouseValue(geoId);
            document.getElementById('lowerHouseValue').innerHTML = lowerHouseValue == null ? "-" : lowerHouseValue;
            var vacancyRate = mapdata.vacancyRate(geoId);
            document.getElementById('vacancyRate').innerHTML = vacancyRate == null ? "-" : vacancyRate + "%";
            var povertyRate = mapdata.povertyRate(geoId);
            document.getElementById('povertyRate').innerHTML = povertyRate == null ? "-" : povertyRate + "%";
            var unemploymentRate = mapdata.unemploymentRate(geoId);
            document.getElementById('unemploymentRate').innerHTML = unemploymentRate == null ? "-" : unemploymentRate + "%";
        },
        resetOverlayData: function() {
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
        },
        logData: function(geoId, geoName, landArea, waterArea) {
            console.log('GEOID: ' + geoId)
            console.log('CENSUS TRACT: ' + geoName)
            console.log('LAND SQ MILES: ' + (landArea / 2589988.1103))
            console.log('WATER SQ MILES: ' + (waterArea / 2589988.1103))
            console.log("POPULATION: " + mapdata.populationTotal(geoId))
            console.log("HOUSEHOLDS: " + mapdata.householdTotal(geoId))
            console.log("MEDIAN AGE: " + mapdata.medianAge(geoId))
            console.log("FAMILY INCOME: " + mapdata.familyIncome(geoId))
            console.log("HOUSEHOLD INCOME: " + mapdata.householdIncome(geoId))
            console.log("PER CAPITA INCOME: " + mapdata.perCapitaIncome(geoId))
            console.log("HOUSING UNITS: " + mapdata.housingUnitsTotal(geoId))
            console.log("MEDIAN HOUSE VALUE: " + mapdata.medianHouseValue(geoId))
            console.log("UPPER QUARTILE HOUSE VALUE: " + mapdata.upperQuartileHouseValue(geoId))
            console.log("LOWER QUARTILE HOUSE VALUE: " + mapdata.lowerQuartileHouseValue(geoId))
            console.log("VACANCY RATE: " + mapdata.vacancyRate(geoId))
            console.log("POVERTY RATE: " + mapdata.povertyRate(geoId))
            console.log("UNEMPLOYMENT RATE: " + mapdata.unemploymentRate(geoId))
        },
        updateHover: function(hoverId, geoId, geoName, landArea, waterArea) {
            if (this.hoverId) {
                this.map.setFeatureState({ source: 'geolist', id: this.hoverId }, { hover: false });
            }
            this.hoverId = hoverId
            if (this.hoverId != this.selectedId) {
                this.map.setFeatureState({ source: 'geolist', id: this.hoverId }, { hover: true });
            }
            
            if (this.selectedId == null) {
                this.setOverlayData(geoId, geoName, landArea, waterArea)
            }
        },
        onMouseMove: function(e) {
            if (e.features.length > 0) {
                var newHoverId = e.features[0].id;
                var geoId = e.features[0].properties.GEOID;
                var geoName = e.features[0].properties.NAME
                var landArea = e.features[0].properties.ALAND
                var waterArea = e.features[0].properties.AWATER
                
                this.updateHover(newHoverId, geoId, geoName, landArea, waterArea)
            } else {
                this.resetOverlayData()
            }
        },
        onMouseEnter: function(e) {
            this.map.getCanvas().style.cursor = 'pointer';
        },
        onMouseLeave: function(e) {
            this.map.getCanvas().style.cursor = '';
            
            if (this.hoverId) {
                this.map.setFeatureState({ source: 'geolist', id: this.hoverId }, { hover: false });
            }
            this.hoverId = null;
        },
        onMouseClick: function(e) {
            var geoId = e.features[0].properties.GEOID;
            var geoName = e.features[0].properties.NAME
            var landArea = e.features[0].properties.ALAND
            var waterArea = e.features[0].properties.AWATER
            var selectedId = e.features[0].id;
            
            if (selectedId != this.selectedId) {
                if (this.selectedId) {
                    this.map.setFeatureState({ source: 'geolist', id: this.selectedId }, { selected: false });
                }
                if (selectedId == this.hoverId) {
                    this.updateHover(null, geoId, geoName, landArea, waterArea);
                }
                this.selectedId = selectedId
                this.map.setFeatureState({ source: 'geolist', id: this.selectedId }, { selected: true });
            } else {
                this.map.setFeatureState({ source: 'geolist', id: this.selectedId }, { selected: false });
                this.selectedId = null;
                this.updateHover(selectedId, geoId, geoName, landArea, waterArea);
            }
            
            // this.logData(geoId, geoName, landArea, waterArea)
            this.reloadUI(geoId, geoName, landArea, waterArea)
        },
        reloadUI: function(geoId, geoName, landArea, waterArea) {
            
        },
        load: function() {
            this.map.addControl(this.navigationControl);
            document.getElementById('geocoder').appendChild(this.geocoder.onAdd(this.map));
            
            var self = this;
            this.map.on('load', function() {
                self.addSources()
                self.addLayers()
                
                self.map.on('mousemove', 'geolist-fills', function(e) { self.onMouseMove(e) });
                self.map.on('mouseenter', 'geolist-fills', function(e) { self.onMouseEnter(e) });
                self.map.on('mouseleave', 'geolist-fills', function(e) { self.onMouseLeave(e) });
                self.map.on('click', 'geolist-fills', function(e) { self.onMouseClick(e) });
                
                self.map.resize();
                self.map.scrollZoom.disable();
            });
        }
    }

    return mapController
}
