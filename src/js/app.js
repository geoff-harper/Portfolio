
/*
|----------------------------
| Event Listeners
|----------------------------
*/
/** Attach link scrolling animation to nav buttons */
document.querySelectorAll('.nav__link').forEach(nav => {
  const destination = nav.href.split('#')

  nav.addEventListener('click', (e) => {
    scrollIt(
      document.getElementById(destination[1]),
      600,
      'easeInOutCubic'
    )
  })
})

document.querySelector('.hamburger').addEventListener('click', e => {
  e.target.classList.toggle('active')
})

/*
|----------------------------
| Functions
|----------------------------
*/

/**
 * Anchor link scrolling animation
 * @param {element} destination
 * @param {number} duration
 * @param {string} easing
 * @param {func} callback
 */
function scrollIt(destination, duration = 200, easing = 'linear', callback) {
  /** https://pawelgrzybek.com/page-scroll-in-vanilla-javascript/ */
  const easings = {
    easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
    }
  }

  const start = window.pageYOffset
  const startTime = 'now' in window.performance ? performance.now() : new Date().getTime()

  const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight)
  const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight
  const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop
  const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset)

  if ('requestAnimationFrame' in window === false) {
    window.scroll(0, destinationOffsetToScroll)
    if (callback) {
      callback()
    }
    return
  }

  function scroll() {
    const now = 'now' in window.performance ? performance.now() : new Date().getTime()
    const time = Math.min(1, ((now - startTime) / duration))
    const timeFunction = easings[easing](time)
    window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start))

    if (window.pageYOffset === destinationOffsetToScroll) {
      if (callback) {
        callback()
      }
      return
    }

    requestAnimationFrame(scroll)
  }

  scroll()
}
