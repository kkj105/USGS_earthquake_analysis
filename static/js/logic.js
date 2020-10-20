var myMap = L.map("map", {
    center: [35.37, -119.02],
    zoom: 7
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
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

d3.json(link, function(response) {
    console.log(response)

    function fillColor(feature) {
        var quakeDepth = feature.geometry.coordinates[2]
        switch (true) {
            case quakeDepth <= 10: return "#008000";
            case quakeDepth <=30: return "#00F00";
            case quakeDepth <=50 : return "#FFFF00";
            case quakeDepth <=70: return "#FFB347";
            case quakeDepth <90: return "#CC5500";
            case quakeDepth >=90: return "#FF0000" 
        };
    }

    // function radius(feature) {
    //     var quakeRadius = feature.properties.mag
    //     switch (true) {
    //         case quakeRadius 
    //     }
    //}

    L.geoJSON(link, {
        style: function(feature) {
            return {
                 opacity: 1,
                fillColor: fillColor(feature)
            }

        }
    })
})


    // // Set up legend
    // var legend = L.control({ position: "topright"});
    // legend.onAdd = function() {
    //     var div = L.DomUtil.create("div", "info legend");
    //     var limits = geojson.options.limits;
    //     var colors = geojson.options.colors;
    //     var labels = [];
        
    //     limits.forEach(function(limit, index) {
    //         labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    //     });

    //     div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    //     return div;
    // };

    // // Add legend to map
    // legend.addTo(myMap);