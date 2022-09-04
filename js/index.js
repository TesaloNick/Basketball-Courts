mapboxgl.accessToken = 'pk.eyJ1IjoidGVzYWxvbmljayIsImEiOiJjbDdodmdheHIwaWIyM3VtbTJjaXNreGt2In0.Er4yPKDyLrAYKJn5rRpXoQ';

const urlBase = 'https://api.mapbox.com/isochrone/v1/mapbox/';
const lon = 27.55689040736249;
const lat = 53.89733609094718;
let profile = 'cycling';
let minutes = 5;
let coordinates = ''

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [lon, lat],
  zoom: 10
});

// const params = document.getElementById('params');

// const marker = new mapboxgl.Marker({
//   'color': 'red'
// })
// .setLngLat([lon, lat]) // Marker [lng, lat] coordinates
// .addTo(map); // Add the marker to the map;

// const lngLat = {
//   lon: lon,
//   lat: lat
// };

async function getIso(lat, lon) {
  const query = await fetch(
    `${urlBase}${profile}/${lon},${lat}?contours_minutes=${minutes}&polygons=true&access_token=${mapboxgl.accessToken}`,
    { method: 'GET' }
  );
  const data = await query.json();
  // console.log(data.features[0].geometry.coordinates[0]);
  // console.log(data);
  await map.getSource('iso').setData(data);
}

// params.addEventListener('change', (event) => {
//   if (event.target.name === 'profile') {
//     profile = event.target.value;
//   } else if (event.target.name === 'duration') {
//     minutes = event.target.value;
//   }
//   getIso();
// });
let from = document.querySelector('.from')
let inputs = document.querySelector('.inputs')

const geocoderFrom = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl,
  marker: true,
  placeholder: 'From',
});

const geocoderWhere = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl,
  marker: true,
  placeholder: 'Where',
});

console.log(geocoderWhere, from);
map.addControl(geocoderFrom);
map.addControl(geocoderWhere);

map.on('load', () => {
  map.addSource('iso', {
    type: 'geojson',
    data: {
      'type': 'FeatureCollection',
      'features': []
    }
  });

  map.addLayer(
    {
      'id': 'isoLayer',
      'type': 'fill',
      'source': 'iso',
      'layout': {},
      'paint': {
        'fill-color': '#5a3fc0',
        'fill-opacity': 0.3
      }
    },
    'poi-label'
  );

  map.addSource('single-point', {
    'type': 'geojson',
    'data': {
      'type': 'FeatureCollection',
      'features': []
    }
  });

  map.addLayer({
    id: 'point',
    source: 'single-point',
    type: 'circle',
    paint: {
      'circle-radius': 10,
      'circle-color': '#448ee4'
    }
  })


  // marker.setLngLat(lngLat).addTo(map);

  geocoderFrom.on('result', (event) => {
    // await map.getSource('single-point').setData(event.result.geometry)
    coordinates = event.result.geometry.coordinates
    getIso(coordinates[1], coordinates[0]);
  });

  getIso(lat, lon);
});
