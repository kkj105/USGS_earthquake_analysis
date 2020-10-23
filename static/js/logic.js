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
            layer.bindPopup("<h1>Magnitude: " + feature.properties.mag + "</h1> <hr> <h3>Location: " + feature.properties.place + "</h3>" + "<h3>Quake Depth: " + feature.geometry.coordinates[2] + "</h3>")
        }
    }).addTo(myMap)
    
    // Create legend
    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function (feature) {
        console.log("legendFunction")
        var div = L.DomUtil.create("div", "info legend");
        var depths = ["-10-10", "10-30", "30-50", "50-70", "70-90", "90+"];
        var color = ["#008000", "#73cd32", "#b4cd32", "#ffff00", "#FFA500", "#FF4500"];
        // div.innerHTML = "hello"
        // function getColor(depths) {
        //     return depths >= 90 ? "#008000":
        //         depths >=70 ? "#FF4500":
        //         depths >= 50 ? "#FFA500":
        //         depths >= 30 ? "#ffff00":
        //         depths >= 10 ? "#b4cd32":
        //                      "#73cd32";
        // }
        // Populate the legend
        for (var i = 0; i < depths.length; i++) {
            div.innerHTML +=
            '<i style="background:' + color[i] + '"></i> ' +
            depths[i] + '<br>';
        }
        return div;
    };
    // Add legend to map
    legend.addTo(myMap);

});


    