import facebook from '../images/social/facebook.svg'
import twitter from '../images/social/twitter.svg'
import google from '../images/social/google.svg'
import vk from '../images/social/vk.svg'

export default class Sign {
  constructor() {
    this.signUpButton = document.querySelector('.header__sign_up')
    this.signInButton = document.querySelector('.header__sign_in')
    this.modalContainer = document.querySelector('.modal__container')
    this.closeButton = document.querySelector('.modal__close-button')
    this.formSignUp = null
    this.modal = null
    this.BASE_URL = 'http://localhost:3001'
    this.formSignIn = null
    this.events()
  }

  events() {
    this.signUpButton.addEventListener('click', this.renderSignUp.bind(this))
    this.signInButton.addEventListener('click', this.renderSignIn.bind(this))
  }

  toggleModal() {
    if (this.modal) {
      this.modal.classList.toggle('open')
    } else {
      this.modal = document.querySelector('.modal')
      this.modal.classList.toggle('open')
    }
  }

  async setUser(user) {
    await fetch(`${this.BASE_URL}/users`, {
      method: 'POST',
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(user)
    })
  }

  async getUsers() {
    const response = await fetch(`${this.BASE_URL}/users`);
    const data = await response.json();
    return data // добавил
  }

  async checkSignUp(e) {
    e.preventDefault()
    const signEmail = document.querySelector('.sign__email')
    const signPassword = document.querySelector('.sign__password')
    const signConfirmPassword = document.querySelector('.sign__password.confirm')
    const signWrong = document.querySelector('.sign__wrong')

    const users = await this.getUsers()

    if (!/^\S+@\S+\.\S+$/gm.test(signEmail.value)) {
      signWrong.classList.add('active')
      signWrong.innerHTML = 'WRONG FORMAT OF YOUR EMAIL'
      setTimeout(() => signWrong.classList.remove('active'), 2000)
    } else if (signPassword.value.length < 8) {
      signWrong.classList.add('active')
      signWrong.innerHTML = 'LENGTH OF YOUR PASSWORD MUST BE 8 SYMBOLS OR MORE'
      setTimeout(() => signWrong.classList.remove('active'), 2000)
    } else if (signPassword.value !== signConfirmPassword.value) {
      signWrong.classList.add('active')
      signWrong.innerHTML = 'YOUR CONFIRMATION PASSWORD IS WRONG'
      setTimeout(() => signWrong.classList.remove('active'), 2000)
    } else if (users.some(item => item.email === signEmail.value)) {
      signWrong.classList.add('active')
      signWrong.innerHTML = 'YOUR EMAIL ALREADY BEEN REGISTERED'
      setTimeout(() => signWrong.classList.remove('active'), 2000)
    } else {
      const user = {}
      const formData = new FormData(this.formSignUp)
      for (let [name, value] of formData) {
        user[name] = value
      }
      this.setUser(user)
      this.toggleModal()
    }
  }

  async checkSignIn(e) {
    e.preventDefault()
    const signEmail = document.querySelector('.sign__email')
    const signPassword = document.querySelector('.sign__password')
    const signWrong = document.querySelector('.sign__wrong')

    const users = await this.getUsers()

    if (!users.some(item => item.email === signEmail.value && item.password === signPassword.value)) {
      signWrong.classList.add('active')
      signWrong.innerHTML = 'WRONG EMAIL OR PASSWORD'
      setTimeout(() => signWrong.classList.remove('active'), 2000)
    } else {
      console.log('YOU RIGHT');
    }
  }

  renderSignUp() {
    this.modalContainer.innerHTML = `
      <div class="modal__wrapper-sign">
        <form action="" class="sign sign-up">
          <p class='sign__title'>WELCOME to the world of baskettball courts in Minsk</p>
          <h2>FREE Registration</h2>
          <input type="text" name='email' placeholder="email" class="sign__email" value='sddddf@sdf.by' required>
          <input type="text" name='password' placeholder="password" class="sign__password" value='asdasdasd' required>
          <input type="text" placeholder="confirm password" class="sign__password confirm" value='asdasdasd' required>
          <p class='sign__wrong sign__title'>WRONG</p>
          <button class="sign__button">Sign-Up</button>
          <div class='sign__social'>
            <div><img src=${facebook} alt=""></div>
            <div><img src=${twitter} alt=""/></div>
            <div><img src=${google} alt=""></div>
            <div><img src=${vk} alt=""></div>
          </div>
          <a href="#" class='sign__exist sign__button'>I'M ALREADY HAVE ACCOUNT</a>
        </form>
      </div>
      `

    document.querySelector('.sign__exist').addEventListener('click', this.renderSignIn.bind(this))
    this.formSignUp = document.querySelector('.sign-up')
    this.formSignUp.addEventListener('submit', this.checkSignUp.bind(this))
    this.makeUpModal()
  }

  renderSignIn() {
    this.modalContainer.innerHTML = `
      <div class="modal__wrapper-sign">
        <form action="" class="sign sign-in">
          <p class='sign__title'>WELCOME to the world of baskettball courts in Minsk</p>
          <h2>Enter in your account</h2>
          <input type="text" name='email' placeholder="email" class="sign__email" value='sddddf@sdf.by' required>
          <input type="text" name='password' placeholder="password" class="sign__password" value='asdasdasd' required>
          <p class='sign__wrong sign__title'>WRONG</p>
          <button class="sign__button">Sign-In</button>
          <div class='sign__social'>
            <div><img src=${facebook} alt=""></div>
            <div><img src=${twitter} alt=""/></div>
            <div><img src=${google} alt=""></div>
            <div><img src=${vk} alt=""></div>
          </div>
          <a href="#" class='sign__exist-not sign__button'>I DON'T HAVE ACCOUNT YET</a>
        </form>
      </div>
      `

    document.querySelector('.sign__exist-not').addEventListener('click', this.renderSignUp.bind(this))
    this.formSignIn = document.querySelector('.sign-in')
    this.formSignIn.addEventListener('submit', this.checkSignIn.bind(this))
    this.makeUpModal()
  }

  makeUpModal() {
    this.closeButton.style.top = `calc((100vh - ${document.querySelector('.modal__wrapper-sign').offsetHeight}px) / 2 - 45px)`
    this.closeButton.style.right = `calc((100vw - ${document.querySelector('.modal__wrapper-sign').offsetWidth}px) / 2 - 50px)`
    this.closeButton.addEventListener('click', this.toggleModal)
    this.modal = document.querySelector('.modal')
    this.modal.classList.add('open')
  }
}