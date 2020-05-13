function createMapPickers() {
    var geographyData = [
        {"val": "nation", "label": "Nation"}, 
        {"val": "region", "label": "Region"}, 
        {"val": "division", "label": "Division"}, 
        {"val": "state", "label": "State"}, 
        {"val": "statisticalArea", "label": "Statistical Area"}, 
        {"val": "place", "label": "Place"}, 
        {"val": "county", "label": "County"}, 
        {"val": "tract", "label": "Tract"}
    ];
    var overlayData = [
        {"val": "standard", "label": "Standard"}, 
        {"val": "populationDensity", "label": "Population Density"}, 
        {"val": "householdIncome", "label": "Household Income"}, 
        {"val": "familyIncome", "label": "Family Income"}, 
        {"val": "houseValue", "label": "House Value"}, 
        {"val": "housingUnits", "label": "Housing Units"}, 
        {"val": "vacancyRate", "label": "Vacancy"}, 
        {"val": "age", "label": "Age"}, 
        {"val": "poverty", "label": "Poverty"},
        {"val": "unemployment", "label": "Unemployment"},
    ];
    var yearData = [
        {"val": "2000", "label": "2000"},
        {"val": "2001", "label": "2001"},
        {"val": "2002", "label": "2002"},
        {"val": "2003", "label": "2003"},
        {"val": "2004", "label": "2004"},
        {"val": "2005", "label": "2005"}, 
        {"val": "2006", "label": "2006"}, 
        {"val": "2007", "label": "2007"}, 
        {"val": "2008", "label": "2008"}, 
        {"val": "2009", "label": "2009"}, 
        {"val": "2010", "label": "2010"}, 
        {"val": "2011", "label": "2011"}, 
        {"val": "2012", "label": "2012"},
        {"val": "2013", "label": "2013"},
        {"val": "2014", "label": "2014"},
        {"val": "2015", "label": "2015"},
        {"val": "2016", "label": "2016"},
        {"val": "2017", "label": "2017"},
        {"val": "2018", "label": "2018"},
        {"val": "2019", "label": "2019"},
        {"val": "recent", "label": "Recent"},
    ];
    
    $("#geography-picker").AnyPicker({
        "mode": "select",
        "actionMode": "both",
        "headerTitle": {"markup": ""},
        "showComponentLabel": true,
        "components": [{
            "component": 0,
            "name": "geography-picker",
            "label": "Geography",
            "width": "30%",
            "textAlign": "center"
        }],
        "dataSource": [{
            "component": 0,
            "data": geographyData
        }],
        "theme": "iOS",
        "setOutput": function(output, selected) {
            $("#geography-picker").val(output);
            $("#geography-picker").attr("data-val", selected.values[0].val);
            $("#geography-picker").change();
        },
    });
    $("#overlay-picker").AnyPicker({
        "mode": "select",
        "actionMode": "both",
        "headerTitle": "markup",
        "showComponentLabel": true,
        "components": [{
            "component": 0,
            "name": "overlay-picker",
            "label": "Overlay",
            "width": "30%",
            "textAlign": "center"
        }],
        "dataSource": [{
            "component": 0,
            "data": overlayData
        }],
        "theme": "iOS",
        "setOutput": function(output, selected) {
            $("#overlay-picker").val(output);
            $("#overlay-picker").attr("data-val", selected.values[0].val);
            $("#overlay-picker").change();
        },
    });
    $("#year-picker").AnyPicker({
        "mode": "select",
        "actionMode": "both",
        "headerTitle": "markup",
        "showComponentLabel": true,
        "components": [{
            "component": 0,
            "name": "year-picker",
            "label": "Year",
            "width": "30%",
            "textAlign": "center"
        }],
        "dataSource": [{
            "component": 0,
            "data": yearData
        }],
        "theme": "iOS",
        "setOutput": function(output, selected) {
            $("#year-picker").val(output);
            $("#year-picker").attr("data-val", selected.values[0].val);
            $("#year-picker").change();
        },
    });
}