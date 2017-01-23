const html = require('choo/html')
const doNothing = () => {}

const viewHtml = (nameSpace) => {
  return (state, prev, send) => {
    return html`
    <div class="actionO_overlay" style="visibility: ${state[nameSpace].hidden ? 'hidden' : 'visible'}">
        
    </div>
    `
  }
}

const model = (nameSpace) => {

  let startTime
  let DURATION_IN = 1 
  let DURATION_OUT = 0.2
  let DURATION_STAY = 2
  let left = {
    img: '',
    name: 'Player 1'
  }
  let right = {
    img: '',
    name: 'Player 2'
  }

  return {
    namespace: nameSpace,

    state: {
      hidden: true
    },

    reducers: {
      _setVisibility: (state, visible) => {state.hidden = !visible}
    },

    effects: {
      start: start,
      dismiss: dismiss,
      setLeft: ( state, { img, name } ) => setSide( state, 'LEFT', img, name),
      setRight: ( state, { img, name } ) => setSide( state, 'RIGHT', img, name),
      setDurations: ( state, {fadeIn, fadeOut, stay}, send, done) => {
        DURATION_IN = fadeIn
        DURATION_OUT = fadeOut
        DURATION_STAY = stay
      }
    }
  }

  function start(state, data, send, done) {
    startTime = new Date()
    send(nameSpace + ':_setVisibility', true, doNothing)
    done()
  }

  function dismiss(state, data, send, done) {
    send(nameSpace + ':_setVisibility', false, doNothing)
    done()
  }

  function update (send) {
    let newHtml

    if (hidden) {
      return emptyHtml
    }

    

    send( nameSpace + ':_setView', newHtml, doNothing)
  }

  function setSide(state, side, img, name) {
    if (side === 'LEFT') {
      left = {
        img: img,
        name: name
      }
    }
    if (side === 'RIGHT') {
      right = {
        img: img,
        name: name
      }
    }
  }

}

module.exports = (nameSpace) => {
  return {
    model: model(nameSpace),
    view:  viewHtml(nameSpace)
  }
}

