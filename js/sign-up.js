export default class SignUp {
  constructor() {
    this.signInButton = document.querySelector('.header__sign-up')
    this.modalContainer = document.querySelector('.modal__container')
    this.closeButton = document.querySelector('.modal__close-button')
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
      <div class="modal__wrapper-sign">
        <form action="" class="form sign">
          <p>WELCOME to the world of baskettball courts in Minsk</p>
          <h2>FREE Registration</h2>
          <input type="text" placeholder="login" class="sign__login">
          <input type="text" placeholder="password" class="sign__password">
          <input type="text" placeholder="confirm password" class="sign__password confirm">
          <button class="sign__button">Sign-Up</button>
          <div class='sign__social'>
            <div><img src="./images/social/facebook.svg" alt=""></div>
            <div><img src="./images/social/twitter.svg" alt=""></div>
            <div><img src="./images/social/google.svg" alt=""></div>
            <div><img src="./images/social/vk.svg" alt=""></div>
          </div>
        </form>
      </div>
      `
      this.closeButton.style.top = 'calc(25vh - 45px)'
      this.closeButton.style.right = 'calc(30vw - 45px)'
      this.closeButton.addEventListener('click', this.toggleModal)
      this.toggleModal()
    })
  }

  async renderAll() {
    this.renderForm()
  }
}