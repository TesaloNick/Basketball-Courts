import facebook from '../images/social/facebook.svg'
import twitter from '../images/social/twitter.svg'
import google from '../images/social/google.svg'
import vk from '../images/social/vk.svg'
import accountMain from '../images/account.svg'
import accountExit from '../images/exit.svg'
import closeButton from '../images/close_white.png'
import Modal from './modal'

export default class Sign extends Modal {
  constructor() {
    super()
    this.signUpButton = null
    this.signInButton = null
    this.exitAccountButton = null
    this.formSignUp = null
    this.BASE_URL = 'http://localhost:3001'
    this.formSignIn = null
    this.renderAccount()
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

  async getAccountInformation() {
    const response = await fetch(`${this.BASE_URL}/account`);
    const data = await response.json();
    return data
  }

  async enterAccount(nickname) {
    await fetch(`${this.BASE_URL}/account`, {
      method: 'POST',
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        "condition": true,
        "nickname": nickname
      })
    })
    await this.renderAccount()

  }

  async exitAccount() {
    await fetch(`${this.BASE_URL}/account`, {
      method: 'POST',
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        "condition": false,
        "nickname": ''
      })
    })
    await this.renderAccount()
  }

  async renderAccount() {
    const { condition, nickname } = await this.getAccountInformation()

    if (condition) {
      document.querySelector('.header__right').innerHTML = `
      <div class="header__account">
        <img src=${accountMain}  class="header__account_image">
        <p class="header__account_name">${nickname}</p>
        <img src=${accountExit} class="header__account_exit">
      </div>
      `
      this.exitAccountButton = document.querySelector('.header__account_exit')
      this.exitAccountButton.addEventListener('click', this.exitAccount.bind(this))
    } else {
      document.querySelector('.header__right').innerHTML = `
      <div class="header__sign">
        <a href="#" class="header__sign_in">Sign-In</a>
        <a href="#" class="header__sign_up">Sign-Up</a>
      </div>
      `
      this.signUpButton = document.querySelector('.header__sign_up')
      this.signInButton = document.querySelector('.header__sign_in')
      this.signUpButton.addEventListener('click', this.renderSignUp.bind(this))
      this.signInButton.addEventListener('click', this.renderSignIn.bind(this))
    }
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
      const user = users.find(item => item.email === signEmail.value)
      this.enterAccount(user.nickname)
      this.toggleModal()
    }
  }

  renderSignUp() {
    this.modalContainer.innerHTML = `
      <div class="modal__close-button"><img src=${closeButton} alt=""></div>
      <div class="modal__wrapper-sign">
        <form action="" class="sign sign-up">
          <p class='sign__title'>WELCOME to the world of baskettball courts in Minsk</p>
          <h2>FREE Registration</h2>
          <input type="text" name='email' placeholder="email" class="sign__email" value='sddddf@sdf.by' required>
          <input type="text" name='nickname' placeholder="nickname" class="sign__nickname" value='sddddf' required>
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

    this.formSignUp = document.querySelector('.sign-up')
    this.formSignUp.addEventListener('submit', this.checkSignUp.bind(this))
    document.querySelector('.sign__exist').addEventListener('click', this.renderSignIn.bind(this))
    document.querySelector('.modal__close-button').addEventListener('click', this.toggleModal)
    if (!this.modal.classList.contains('open')) this.toggleModal()
  }

  renderSignIn() {
    this.modalContainer.innerHTML = `
      <div class="modal__close-button"><img src=${closeButton} alt=""></div>
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

    this.formSignIn = document.querySelector('.sign-in')
    this.formSignIn.addEventListener('submit', this.checkSignIn.bind(this))
    document.querySelector('.sign__exist-not').addEventListener('click', this.renderSignUp.bind(this))
    document.querySelector('.modal__close-button').addEventListener('click', this.toggleModal)
    if (!this.modal.classList.contains('open')) this.toggleModal()
  }
}