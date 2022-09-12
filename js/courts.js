import renderMap from './map'

export default class Court {
  constructor() {
    this.courts = document.querySelector('.courts')
    this.modal = null
    this.modalContainer = document.querySelector('.modal__container')
    this.closeButton = document.querySelector('.modal__close-button')
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

    const courtsAPI = await this.getCourts()
    court.addEventListener('click', (e) => {
      courtsAPI.map(item => {
        if (`court-${item.id}` === e.target.id) {
          this.modalContainer.innerHTML = `
            <div class="modal__wrapper-courts">
              <div class="modal__img"><img src="${item.photos[0]}" alt=""></div>
              <div class='modal__content'>
                <h2 class="modal__name">${item.name}</h2>
                <p class="modal__address">Адресс: ${item.address}</p>
                <ul class="modal__schedule">
                  <p>РАСПИСАНИЕ:</p>
                  ${item.schedule.map(li => `
                    <li>${li.day}: ${li.time}</li>
                  `).join('')}
                </ul>
              </div>
              <div id="map"></div>
            </div>
            `

          this.closeButton.style.top = `calc((100vh - ${document.querySelector('.modal__wrapper-courts').offsetHeight}px) / 2 - 45px)`
          this.closeButton.style.right = `calc((100vw - ${document.querySelector('.modal__wrapper-courts').offsetWidth}px) / 2 - 45px)`

          const lon = item.coordinates.lon;
          const lat = item.coordinates.lat;
          renderMap(lat, lon)
          // document.querySelector('.mapbox-directions-origin .mapboxgl-ctrl-geocoder > input').value = `${myCurrentPosition.lon.toFixed(5)},${myCurrentPosition.lat.toFixed(5)}`
          // document.querySelector('.mapbox-directions-destination .mapboxgl-ctrl-geocoder > input').value = `${lon.toFixed(5)},${lat.toFixed(5)}`
        }
      })
      this.toggleModal()
      this.closeButton.addEventListener('click', this.toggleModal)
    })
    document.querySelector('.modal__container-close').addEventListener('click', this.toggleModal)
  }

  async renderAll() {
    const courtsAPI = await this.getCourts()
    courtsAPI.map(item => this.renderCourt(item)).join('')
  }
}