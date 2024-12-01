// Hamburger menu toggle
const hamMenuBtn = document.querySelector('.header__main-ham-menu-cont')
const smallMenu = document.querySelector('.header__sm-menu')
const headerHamMenuBtn = document.querySelector('.header__main-ham-menu')
const headerHamMenuCloseBtn = document.querySelector('.header__main-ham-menu-close')
const headerSmallMenuLinks = document.querySelectorAll('.header__sm-menu-link')
const audio = document.getElementById("myAudio"); 
let isPlaying = false; 

// Toggle mobile menu visibility

function playAudio() {
  isPlaying ? audio.pause() : audio.play(); 
  isPlaying = !isPlaying; 
}
const toggleMenu = () => {
  smallMenu.classList.toggle('header__sm-menu--active')
}

// Toggle hamburger button state
const toggleButton = () => {
  headerHamMenuBtn.classList.toggle('d-none')
  headerHamMenuCloseBtn.classList.toggle('d-none')
}

hamMenuBtn.addEventListener('click', () => {
  toggleMenu()
  toggleButton()
})

// Close mobile menu when any link is clicked
headerSmallMenuLinks.forEach(link => {
  link.addEventListener('click', () => {
    smallMenu.classList.remove('header__sm-menu--active')
    headerHamMenuBtn.classList.remove('d-none')
    headerHamMenuCloseBtn.classList.add('d-none')
  })
})

// Redirect to homepage when the logo is clicked
const headerLogoContainer = document.querySelector('.header__logo-container')

headerLogoContainer.addEventListener('click', () => {
  location.href = '/'
})

// Theme toggle functionality
const storageKey = 'theme-preference'

const onClick = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  setPreference()
}

const getColorPreference = () => {
  const storedTheme = localStorage.getItem(storageKey)
  if (storedTheme) return storedTheme
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const setPreference = () => {
  localStorage.setItem(storageKey, theme.value)
  reflectPreference()
}

const reflectPreference = () => {
  document.documentElement.setAttribute('data-theme', theme.value)
  document.querySelector('#theme-toggle')?.setAttribute('aria-label', theme.value)
}

const theme = {
  value: getColorPreference(),
}

// Set initial theme
reflectPreference()

window.onload = () => {
  reflectPreference()
  document.querySelector('#theme-toggle')?.addEventListener('click', onClick)
}

// Sync with system color scheme
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({ matches: isDark }) => {
  theme.value = isDark ? 'dark' : 'light'
  setPreference()
})
