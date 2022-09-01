mapboxgl.accessToken = 'pk.eyJ1IjoidGVzYWxvbmljayIsImEiOiJjbDdodmdheHIwaWIyM3VtbTJjaXNreGt2In0.Er4yPKDyLrAYKJn5rRpXoQ';

const urlBase = 'https://api.mapbox.com/isochrone/v1/mapbox/';
const lon = 27.55689040736249;
const lat = 53.89733609094718;
let profile = 'walking';
let minutes = 10;
let coordinates = ''

const map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/mapbox/streets-v11', // stylesheet
  center: [lon, lat], // starting position [lng, lat]
  zoom: 11.5 // starting zoom
});

// const params = document.getElementById('params');

const marker = new mapboxgl.Marker({
  'color': '#314ccd'
})
  .setLngLat([lon, lat]) // Marker [lng, lat] coordinates
  .addTo(map); // Add the marker to the map;

const lngLat = {
  lon: lon,
  lat: lat
};

async function getIso(lat, lon) {
  const query = await fetch(
    `${urlBase}${profile}/${lon},${lat}?contours_minutes=${minutes}&polygons=true&access_token=${mapboxgl.accessToken}`,
    { method: 'GET' }
  );
  const data = await query.json();
  console.log(data);
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

const geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken, // Set the access token
  mapboxgl: mapboxgl, // Set the mapbox-gl instance
  marker: true, // Do not use the default marker style
  placeholder: 'Search your place', // Placeholder text for the search bar
  // bbox: [-122.30937, 37.84214, -122.23715, 37.89838], // Boundary for Berkeley
  proximity: {
    // longitude: 27.55689040736249,
    // latitude: 53.89733609094718
  }
});

map.addControl(geocoder);

map.on('load', async () => {
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


  marker.setLngLat(lngLat).addTo(map);

  await geocoder.on('result', async (event) => {
    await map.getSource('single-point').setData(event.result.geometry)
    coordinates = await event.result.geometry.coordinates
    await getIso(coordinates[1], coordinates[0]);
  });

  await getIso(lat, lon);
});

// async function getCoordinates() {
//   let url = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates[0]},${coordinates[1]}.json?proximity=ip&types=place%2Cpostcode%2Caddress&access_token=${mapboxgl.accessToken}`)
//     .then(res => res.json())
//     .then(res => console.log(res))
//   // .then(res => res.features.map(item => console.log(item.geometry.coordinates)))
//   // console.log(url);

//   // let coordinates = await fetch(url)
//   //   .then(res => res)
//   //   .then(res => console.log(res))

// }
// getCoordinates()