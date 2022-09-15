export default function renderMap(lat, lon) {
  mapboxgl.accessToken = 'pk.eyJ1IjoidGVzYWxvbmljayIsImEiOiJjbDdodmdheHIwaWIyM3VtbTJjaXNreGt2In0.Er4yPKDyLrAYKJn5rRpXoQ';

  const urlBase = 'https://api.mapbox.com/isochrone/v1/mapbox/';
  let profile = 'walking';
  let minutes = 1;

  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [lon, lat],
    zoom: 12
  });

  async function getIso(lat, lon) {
    const query = await fetch(
      `${urlBase}${profile}/${lon},${lat}?contours_minutes=${minutes}&polygons=true&access_token=${mapboxgl.accessToken}`,
      { method: 'GET' }
    );
    const data = await query.json();
    // console.log(data);
    await map.getSource('iso').setData(data);
  }

  const marker = new mapboxgl.Marker({
    color: '#314ccd'
  });

  const lngLat = {
    lon: lon,
    lat: lat
  };

  marker.setLngLat(lngLat).addTo(map);


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

    getIso(lat, lon);

    //_______________________

    map.addLayer({
      id: 'clearances',
      type: 'fill',
      source: {
        type: 'geojson',
        data: obstacle
      },
      layout: {},
      paint: {
        'fill-color': '#f03b20',
        'fill-opacity': 0.5,
        'fill-outline-color': '#f03b20'
      }
    });

    map.addSource('theRoute', {
      type: 'geojson',
      data: {
        type: 'Feature'
      }
    });

    map.addLayer({
      id: 'theRoute',
      type: 'line',
      source: 'theRoute',
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#cccccc',
        'line-opacity': 0.5,
        'line-width': 13,
        'line-blur': 0.5
      }
    });

    // Source and layer for the bounding box
    map.addSource('theBox', {
      type: 'geojson',
      data: {
        type: 'Feature'
      }
    });

    map.addLayer({
      id: 'theBox',
      type: 'fill',
      source: 'theBox',
      layout: {},
      paint: {
        'fill-color': '#FFC300',
        'fill-opacity': 0.5,
        'fill-outline-color': '#FFC300'
      }
    });
  });

  //________________________________________________________________________________________________

  const directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken,
    unit: 'metric',
    profile: 'mapbox/driving',
    alternatives: false,
    geometries: 'geojson',
    controls: { instructions: false },
    flyTo: false
  });

  // map.addControl(directions, 'top-left');
  map.scrollZoom.enable();

  const clearances = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-84.47426, 38.06673]
        },
        properties: {
          clearance: "13' 2"
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-84.47208, 38.06694]
        },
        properties: {
          clearance: "13' 7"
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-84.60485, 38.12184]
        },
        properties: {
          clearance: "13' 7"
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-84.61905, 37.87504]
        },
        properties: {
          clearance: "12' 0"
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-84.55946, 38.30213]
        },
        properties: {
          clearance: "13' 6"
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-84.27235, 38.04954]
        },
        properties: {
          clearance: "13' 6"
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-84.27264, 37.82917]
        },
        properties: {
          clearance: "11' 6"
        }
      }
    ]
  };

  const obstacle = turf.buffer(clearances, 0.25, { units: 'kilometers' });
  let bbox = [0, 0, 0, 0];
  let polygon = turf.bboxPolygon(bbox);

  let counter = 0;
  const maxAttempts = 50;
  let emoji = '';
  let collision = '';
  let detail = '';
  const reports = document.getElementById('reports');

  function noRoutes(element) {
    const card = document.createElement('div');
    card.className = 'card';
    // Add the response to the individual report created above
    const heading = document.createElement('div');
    heading.className = 'card-header no-route';
    emoji = '🛑';
    heading.innerHTML = `${emoji} Ending search.`;

    // Add details to the individual report
    const details = document.createElement('div');
    details.className = 'card-details';
    details.innerHTML = `No clear route found in ${counter} tries.`;

    card.appendChild(heading);
    card.appendChild(details);
    element.insertBefore(card, element.firstChild);
  }

  directions.on('clear', () => {
    map.setLayoutProperty('theRoute', 'visibility', 'none');
    map.setLayoutProperty('theBox', 'visibility', 'none');

    counter = 0;
    reports.innerHTML = '';
  });

  function findCurrentCoordinates() {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          })
        }
      );
    })
  }

  directions.on('route', async (event) => {
    map.setLayoutProperty('theRoute', 'visibility', 'none');
    map.setLayoutProperty('theBox', 'visibility', 'none');
    console.log(event);
    if (counter >= maxAttempts) {
      noRoutes(reports);
    } else {
      for (const route of event.route) {
        map.setLayoutProperty('theRoute', 'visibility', 'visible');
        map.setLayoutProperty('theBox', 'visibility', 'visible');

        const routeLine = polyline.toGeoJSON(route.geometry);

        bbox = turf.bbox(routeLine);
        polygon = turf.bboxPolygon(bbox);

        map.getSource('theRoute').setData(routeLine);

        map.getSource('theBox').setData(polygon);

        const clear = turf.booleanDisjoint(obstacle, routeLine);

        // Определение расстояния и времени на дорогу
        document.querySelector('.modal__duration').innerHTML = `Расстояние: ${(route.distance / 1000).toFixed(1)} км`
        document.querySelector('.modal__distance').innerHTML = `Время в пути: ${(route.duration / 60).toFixed(0)} минут`

        if (clear === true) {
          collision = 'does not intersect any obstacles!';
          detail = `takes ${(route.duration / 60).toFixed(0)} minutes and avoids`;
          emoji = '✔️';
          map.setPaintProperty('theRoute', 'line-color', '#74c476');
          map.setLayoutProperty('theBox', 'visibility', 'none');
          counter = 0;
        } else {
          counter = counter + 1;
          polygon = turf.transformScale(polygon, counter * 0.01);
          bbox = turf.bbox(polygon);
          collision = 'is bad.';
          detail = `takes ${(route.duration / 60).toFixed(0)} minutes and hits`;
          emoji = '⚠️';
          map.setPaintProperty('theRoute', 'line-color', '#de2d26');

          const randomWaypoint = turf.randomPoint(1, { bbox: bbox });
          directions.setWaypoint(
            0,
            randomWaypoint['features'][0].geometry.coordinates
          );
        }
      }
    }
  });
}