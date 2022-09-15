export default class Modal {
  constructor() {
    this.modalContainer = document.querySelector('.modal__container')
    this.modal = document.querySelector('.modal')
    this.events()
  }

  events() {
    document.querySelector('.modal__container-close').addEventListener('click', this.toggleModal)
  }

  toggleModal() {
    this.modal = document.querySelector('.modal')
    this.modal.classList.toggle('open')
  }
}