const goTopBar = document.querySelector('.top-button-div')

// when the page scroll down, 'go back top' botton will show up 
window.addEventListener('scroll', event => {
  if (document.documentElement.scrollTop > 200) {
    goTopBar.classList.remove('hidden')
  }
  else {
    goTopBar.classList.add('hidden')
  }
}
)