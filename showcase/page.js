const html = require('choo/html')
const namespace = 'overlay'
const overlayView = require('../index')(namespace).view

let initialized = false

module.exports = (state, prev, send) => {
  const overlayHtml = overlayView(state, prev, send)

  if (!initialized) {
    initialized = true
    send( namespace + ':setLeft', {img: 'http://maxpixel.freegreatpicture.com/static/photo/1x/Tarepanda-Panda-Cat-1390340.png', name: 'left'})
    send( namespace + ':setRight', {img: 'http://img14.deviantart.net/50e7/i/2010/148/6/8/taiga_by_svenstaro.png', name: 'right'})
    send( namespace + ':setVS', {img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Lightning_Bolt_on_Circle.svg/2000px-Lightning_Bolt_on_Circle.svg.png'})
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