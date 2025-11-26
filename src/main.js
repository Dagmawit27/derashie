import './style.css'
import { initRouter } from './router.js'
import './app.js';

document.addEventListener('DOMContentLoaded', () => {
  initRouter()

  window.addEventListener('scroll', () => {
    const header = document.querySelector('.header')
    if (window.scrollY > 50) {
      header.classList.add('scrolled')
    } else {
      header.classList.remove('scrolled')
    }
  })
})

