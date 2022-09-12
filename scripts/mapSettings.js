const map = L.map("map").setView(
  [/*up or down*/ -24.657, /*left or right*/ 25.907],
  /*zoom*/ 11.5
);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© Kevin's map",
}).addTo(map);

L.marker([-24.629, 25.8854])
  .addTo(map)
  .bindPopup(
    "Citynest-HQ is somewhere around here.<br>But what if we are everywhere!?"
  )
  .openPopup();

var circle = L.circle([-24.629, 25.8854], {
  color: "red",
  fillColor: "#f03",
  fillOpacity: 0.5,
  radius: 500,
}).addTo(map);

var popup = L.popup();

function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent("Destination selected " + e.latlng.toString())
    .openOn(map);
}

map.on("click", onMapClick);
