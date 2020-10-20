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

var geojson;

d3.json(link, function(data) {
    console.log(data)

    //create a choropleth layer
    geojson = L.choropleth(data, {

    })

    for (var i = 0; i < response.length; i++) {
        var location = response[i].location;

        if (location) {
            quakeArray.push([location.features.geometry.coordinates[1], location.features.geometry.coordinates[0]]).addTo(myMap)
        }
    }

})