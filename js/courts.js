export default class Court {
  constructor() {
    this.courts = document.querySelector('.courts')
    this.modal = document.querySelector('.modal')
    this.modalWrapper = document.querySelector('.modal__wrapper')
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
          this.modalWrapper.innerHTML = `
            <div class="modal__close"><img src="images/close.svg" alt=""></div>
            <div class="modal__img"><img src="${item.photos[0]}" alt=""></div>
            <div class='modal__content'>
              <h2 class="modal__name">${item.name}</h2>
              <p class="modal__address">${item.address}</p>
              <ul class="modal__schedule">
                <p>SCHEDULE:</p>
                ${item.schedule.map(li => `
                  <li>${li.day}: ${li.time}</li>
                `).join('')}
              </ul>
            </div>
          `
        }
      })
      this.modal.classList.toggle('open')
      document.querySelector('.modal__close').addEventListener('click', () => this.modal.classList.toggle('open'))
    })
    document.querySelector('.modal__wrapper-close').addEventListener('click', () => this.modal.classList.toggle('open'))
  }

  async renderAll() {
    const courtsAPI = await this.getCourts()
    courtsAPI.map(item => this.renderCourt(item)).join('')
  }
}