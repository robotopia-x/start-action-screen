const html = require('choo/html')
const namespace = 'overlay'
const overlayView = require('../index')(namespace).view

let show = false

module.exports = (state, prev, send) => {
  const overlayHtml = overlayView(state, prev, send)


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