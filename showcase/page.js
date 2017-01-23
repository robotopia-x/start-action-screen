const html = require('choo/html')
const namespace = 'overlay'
const overlayView = require('../index')(namespace).view

let initialized = false

module.exports = (state, prev, send) => {
  const overlayHtml = overlayView(state, prev, send)

  if (!initialized) {
    initialized = true
    send( namespace + ':setLeft', {img: 'img/left.png', name: 'left'})
    send( namespace + ':setRight', {img: 'img/right.png', name: 'right'})
    send( namespace + ':setVS', {img: 'http://vignette2.wikia.nocookie.net/mortalkombat/images/6/64/Vs.png/revision/latest?cb=20150319161124&path-prefix=de'})
    send( namespace + ':setDurations', {up: 1000, down: 1000, stay: 1500})
  }


  return html`
  <div style="position: absolute; top: 0; left: 0; width: 100vw; height: 100vh">
  <button onclick=${start}>Demo</button>
  <pre>${JSON.stringify(state)}</pre>
  ${overlayHtml}
</div>
  `
  
  function start() {
    send( namespace + ':start')
  }
  
}