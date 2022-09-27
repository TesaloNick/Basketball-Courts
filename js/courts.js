import renderMap from './map'
import Modal from './modal'
import closeButton from '../images/close_white.png'

export default class Court extends Modal {
  constructor() {
    super()
    this.courts = document.querySelector('.courts')
    this.BASE_URL = 'http://localhost:3001'
    this.renderAll()
  }

  async getCourts() {
    const response = await fetch(`${this.BASE_URL}/courts`)
    const data = await response.json()
    return data
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
            <div class="modal__close-button"><img src=${closeButton} alt=""></div>
            <div class="modal__wrapper-courts court">
              <div class="court__img"><img src="${item.photos[0]}" alt=""></div>
              <div class='court__content'>
                <h2 class="court__name">${item.name}</h2>
                <p class="court__address"><span>Адресс:</span> ${item.address}</p>
                <ul class="court__schedule">
                  <p>Часы работы:</p>
                  ${item.schedule.map(li => `
                    <li>${li.day}: ${li.time}</li>
                  `).join('')}
                </ul>
              </div>
              <div id="map"></div>
            </div>
            `

          const lon = item.coordinates.lon;
          const lat = item.coordinates.lat;
          setTimeout(() => renderMap(lat, lon), 1000)
        }
      })
      this.toggleModal()
      document.querySelector('.modal__close-button').addEventListener('click', this.toggleModal)
    })
  }

  async renderAll() {
    const courtsAPI = await this.getCourts()
    courtsAPI.map(item => this.renderCourt(item)).join('')
  }
}