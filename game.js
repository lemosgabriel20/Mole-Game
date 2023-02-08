import { play } from "./play.js";

const easy = document.querySelector('#easy_button')
const medium = document.querySelector('#medium_button')
const hard = document.querySelector('#hard_button')
const playButton = document.querySelector('#play')
const menu = document.querySelector('#menu')
const menuReturn = document.querySelector('#menu_return')
const overlay = document.querySelector('#overlay')

easy.addEventListener('click', () => {
  overlay.style.display = 'none'
  start(1500)
})

medium.addEventListener('click', () => {
  overlay.style.display = 'none'
  start(1100)
})

hard.addEventListener('click', () => {
  overlay.style.display = 'none'
  start(900)
})

const start = (difficulty) => {
  playButton.addEventListener('click', () => {
    playButton.style.display = 'none'
    play(difficulty)
  })
}

menuReturn.addEventListener('click', () => {
  overlay.style.display = 'flex'
  playButton.style.display = 'flex'
})