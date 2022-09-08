export default class SignUp {
  constructor() {
    this.signInButton = document.querySelector('.header__sign-up')
    this.modalContainer = document.querySelector('.modal__container')
    this.modal = null
    this.BASE_URL = 'http://localhost:3001'
    this.renderAll()
  }

  toggleModal() {
    if (this.modal) {
      this.modal.classList.toggle('open')
    } else {
      this.modal = document.querySelector('.modal')
      this.modal.classList.toggle('open')
    }
  }

  renderForm() {
    this.signInButton.addEventListener('click', () => {
      this.modalContainer.innerHTML = `
      <div class="modal__wrapper-sign-in">
        <form action="" class="form sign-in">
          <input type="text" placeholder="login" class="sign-in__login">
          <input type="text" placeholder="password" class="sign-in__password">
          <button class="sign-in__button">Sign-Up</button>
        </form>
      </div>
      `
      this.toggleModal()
    })
  }

  async renderAll() {
    this.renderForm()
  }
}