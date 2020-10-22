var myMap = L.map("map", {
    center: [27.876714,-52.285434],
    zoom: 3
});

// Adding the tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// read in data
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


// Grab the data with d3
d3.json(link, function(response) {
    console.log(response)

    // Conditionals for the depth of the quake
    function setColor(feature) {
        
        switch (true) {
            case feature >= 90: return "#008000";
            case feature >=70: return "#FF4500";
            case feature >= 50 : return "#FFA500";
            case feature >= 30: return "#ffff00";
            case feature >= 10: return "#b4cd32";
            default: return "#73cd32" 
        };
    }
    function getRadius(feature) {
        return feature * 5
    }

    // Add circles to map
    L.geoJson(response, {
        pointToLayer: function(feature, coordinates) {
            return L.circleMarker(coordinates)
        },
        style: function(feature) {
            return {
                opacity: 1,
                color: "white",
                fillColor: setColor(feature.geometry.coordinates[2]),
                radius: getRadius(feature.properties.mag),
                fillOpacity: 0.75
            }
        },
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h1>Magnitude: " + feature.properties.mag + "</h1> <hr> <h3>Location: " + feature.properties.place + "</h3>")
        }
    }).addTo(myMap)

    // // Set up legend
    // var legend = L.control({ position: "bottomright"});
    // legend.onAdd = function() {
    //     var div = L.DomUtil.create("div", "info legend");
    //     var limits = geojson.options.limits;
    //     var colors = geojson.options.colors;
    //     var labels = [];
    //     //Populate the legend
    //     var legendInfo = "<h1>-10-10</h1>" + 
    //         "div class=\"labels\">" +
    //         "div class=\""
    //     limits.forEach(function(limit, index) {
    //         labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    //     });

    //     div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    //     return div;
    // };
    
    // Create legend
    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function (map) {
        var div = L.DomUtil.create("div", "info legend");
        var depths = ["-10-10", "10-30", "30-50", "50-70", "70-90"," 90+"];
        var labels = [];

        // Populate the legend
        for (var i = 0; i ,depths.length; i++) {
            div.innerHTML +=
            '<i style="background:' + getColor(depths[i] + 1) + '"></i> ' +
            depths[i] + (grades[i + 1] ? '&ndash;' + depths[i + 1] + '<br>' : '+');
        }
        return div;
    };

    

    // Add legend to map
    legend.addTo(myMap);

});


    