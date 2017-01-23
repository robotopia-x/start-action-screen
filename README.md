# Action Overlay for Choo

[![built with choo v4](https://img.shields.io/badge/built%20with%20choo-v4-ffc3e4.svg?style=flat-square)](https://github.com/yoshuawuyts/choo)


# Useage

Use as model in your choo app:
```js
const choo = require('choo')
const app = choo()
//Chose any namespace for the module
const someModuleName = 'overlay'
const overlay = require('action-overlay')(someModuleName)

app.model(overlay.model)
```

And add the html to your page:
```js
//Chose same namespace for the module as above
const someModuleName = 'overlay'
const overlayView = require('../index')(someModuleName).view

//We use this var to call some setting functions once.
let initialized = false

someHtmlView = (state, prev, send) => {
  const overlayHtml = overlayView(state, prev, send)

  if (!initialized) {
    initialized = true
    //Customize by setting some names and images
    send( someModuleName + ':setLeft', {img: 'img/left.png', name: 'left'})
    send( someModuleName + ':setRight', {img: 'img/right.png', name: 'right'})
    send( someModuleName + ':setVS', {img: 'http://vignette2.wikia.nocookie.net/mortalkombat/images/6/64/Vs.png/revision/latest?cb=20150319161124&path-prefix=de'})
    //up will be the time taken to build up
    //down will be the time for all the elements to disappear
    //stay will be the state after everything is in place before starting to animate out
    send( someModuleName + ':setDurations', {up: 1000, down: 1000, stay: 1500})
  }


  return html`
  <div style="position: absolute; top: 0; left: 0; width: 100vw; height: 100vh">
  <button onclick=${start}>Demo</button>
  <pre>${JSON.stringify(state)}</pre>
  ${overlayHtml}
</div>
  `
}
```

# Demo
```bash
npm start
```