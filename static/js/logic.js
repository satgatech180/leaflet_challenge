
var myMap = L.map("map", {
    center: [10, -40],
    zoom: 3
  });
  
  // Adding a tile layer (the background map image) to our map
  // We use the addTo method to add objects to our map
  //tileLayer is teh skin for the map. id defines the skin you want to use.
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.satellite",
    accessToken: API_KEY
  }).addTo(myMap);

  var jsonData;
  
  d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson', data => {
        jsonData = data;

        data.features.forEach( obj => {
            var lat = obj.geometry.coordinates[1];
            var lng = obj.geometry.coordinates[0];
            var mag = parseFloat(obj.properties.mag) * 15000
            
            L.circle([lat, lng], {
                color: getColor(mag),
                fillColor: getColor(mag),
                fillOpacity: 0.75,
                radius: mag
              }).addTo(myMap);
            
            
        });

        function getColor(magnitude) {
            switch (true) {
                case magnitude > 5:
                    return '#ea2c2c';
                case magnitude > 4:
                    return '#ea822c';
                case magnitude > 3:
                    return '#eee9c00';
                case magnitude > 2:
                    return '#eecc00';
                case magnitude > 1:
                    return '#d4ee00';
                                
                default:
                    return "#98ee00";
            }
        }

  });