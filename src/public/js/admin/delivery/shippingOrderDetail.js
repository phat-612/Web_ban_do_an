let map = L.map("map").setView(locationStart, 13);
let marker = L.marker([10.7769, 106.7009]).addTo(map);
let currentRoute,
  previousLocation = null,
  routeLatLngs = [],
  routeNotFound = false;

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const moveMarker = (lat, lng) => {
  marker.setLatLng([lat, lng]);
  map.setView([lat, lng], map.getZoom());
};

map.on("locationfound", (e) => moveMarker(e.latlng.lat, e.latlng.lng));
map.on("locationerror", (e) => alert(e.message));
map.locate({ setView: true, maxZoom: 16 });

const findRoute = (start, end) => {
  fetch(
    `https://graphhopper.com/api/1/route?vehicle=car&locale=en&key=LijBPDQGfu7Iiq80w3HzwB4RUDJbMbhs6BU0dEnn&elevation=false&instructions=true&turn_costs=true&point=${start[0]},${start[1]}&point=${end[0]},${end[1]}`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.paths?.length) {
        routeLatLngs = polyline.decode(data.paths[0].points);
        if (currentRoute) map.removeLayer(currentRoute);
        currentRoute = L.polyline(routeLatLngs, {
          color: "blue",
          weight: 5,
        }).addTo(map);
      } else {
        routeNotFound = true;
        console.log("Không tìm thấy đường đi");
      }
    })
    .catch((error) => console.error("Lỗi lấy dữ liệu tuyến đường:", error));
};

const haversineDistance = (coord1, coord2) => {
  const R = 6371e3,
    rad = Math.PI / 180;
  const dLat = (coord2[0] - coord1[0]) * rad,
    dLon = (coord2[1] - coord1[1]) * rad;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(coord1[0] * rad) *
      Math.cos(coord2[0] * rad) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const isOffRoute = (currentLocation) =>
  routeLatLngs.every(
    (point) => haversineDistance(currentLocation, point) >= 15
  );

setInterval(() => {
  if (routeNotFound) return;
  navigator.geolocation?.getCurrentPosition(
    ({ coords }) => {
      let latlng = [coords.latitude, coords.longitude];
      moveMarker(...latlng);
      if (isOffRoute(latlng)) findRoute(latlng, locationEnd);
      previousLocation = latlng;
    },
    () => console.log("Trình duyệt không hỗ trợ Geolocation!")
  );
}, 1000);
