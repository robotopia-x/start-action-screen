const choo = require('choo')
const overlay = require('../index')('overlay')

const app = choo()

app.model(overlay.model)

app.router([
  ['/', require('./page')]
])

document.body.appendChild(app.start())
