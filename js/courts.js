import renderMap from './map'

export default class Court {
  constructor() {
    this.courts = document.querySelector('.courts')
    this.modal = null
    this.modalWrapper = document.querySelector('.modal__wrapper')
    this.BASE_URL = 'http://localhost:3001'
    this.renderAll()
  }

  async getCourts() {
    const response = await fetch(`${this.BASE_URL}/courts`)
    const data = await response.json()
    return data
  }

  toggleModal() {
    if (this.modal) {
      this.modal.classList.toggle('open')
    } else {
      this.modal = document.querySelector('.modal')
      this.modal.classList.toggle('open')
    }
  }

  async renderCourt(item) {
    const court = document.createElement('div')
    court.classList.add('courts__item')
    court.innerHTML = `<img id='court-${item.id}' src=${item.photos[0]} />`
    this.courts.append(court)

    const myCurrentPosition = await this.findCurrentCoordinates()

    const courtsAPI = await this.getCourts()
    court.addEventListener('click', (e) => {
      courtsAPI.map(item => {
        if (`court-${item.id}` === e.target.id) {
          this.modalWrapper.innerHTML = `
            <div class="modal__img"><img src="${item.photos[0]}" alt=""></div>
            <div class='modal__content'>
              <h2 class="modal__name">${item.name}</h2>
              <p class="modal__address">${item.address}</p>
              <ul class="modal__schedule">
                <p>РАСПИСАНИЕ:</p>
                ${item.schedule.map(li => `
                  <li>${li.day}: ${li.time}</li>
                `).join('')}
              </ul>
              <button class="modal__button">Проложить маршрут</button>
            </div>
            <div id="map"></div>
            `

          const lon = item.coordinates.lon;
          const lat = item.coordinates.lat;
          console.log(lon);
          renderMap(lat, lon)
          document.querySelector('.mapbox-directions-origin .mapboxgl-ctrl-geocoder > input').value = `${myCurrentPosition.lon.toFixed(5)},${myCurrentPosition.lat.toFixed(5)}`
          document.querySelector('.mapbox-directions-destination .mapboxgl-ctrl-geocoder > input').value = `${lon.toFixed(5)},${lat.toFixed(5)}`
        }
      })
      this.toggleModal()
      document.querySelector('.modal__close').addEventListener('click', this.toggleModal)
    })
    document.querySelector('.modal__wrapper-close').addEventListener('click', this.toggleModal)
  }

  findCurrentCoordinates() {
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

  async renderAll() {
    const courtsAPI = await this.getCourts()
    courtsAPI.map(item => this.renderCourt(item)).join('')
  }
}