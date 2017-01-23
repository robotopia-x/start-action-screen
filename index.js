const html = require('choo/html')
const doNothing = () => {}

const viewHtml = (nameSpace) => {
  return (state, prev, send) => {
    return html`
    <div class="actionO_overlay" style="visibility: ${state[nameSpace].hidden ? 'hidden' : 'visible'}">
        <div id="actionO_left" style="background-image: url(${state[nameSpace].left.img})"></div>
        <div class="actionO_VS">
            <div>
                <div>
                    <img src=${state[nameSpace].vs} width="100%" alt="VS"/>
                </div>
            </div>
        </div>
        <div class="actionO_Line">
            <div></div>
        </div>
        
        <div id="actionO_right" style="background-image: url(${state[nameSpace].right.img})"></div>
    </div>
    `
  }
}

const model = (nameSpace) => {

  let startTime
  let DURATION_IN = 1 
  let DURATION_OUT = 0.2
  let DURATION_STAY = 2

  return {
    namespace: nameSpace,

    state: {
      hidden: false,
      left: {
        img: 'img/left.png',
        name: 'Player 1'
      },
      right: {
        img: 'img/right.png',
        name: 'Player 2'
      },
      vs: 'img/lightning.png'
    },

    reducers: {
      _setVisibility: (state, visible) => {state.hidden = !visible},
      setLeft: ( state, { img, name } ) => setSide( state, 'LEFT', img, name),
      setRight: ( state, { img, name } ) => setSide( state, 'RIGHT', img, name)
    },

    effects: {
      start: start,
      dismiss: dismiss,
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

  function setSide(state, side, img, name) {
    if (side === 'LEFT') {
      state.left = {
        img: img,
        name: name
      }
    }
    if (side === 'RIGHT') {
      state.right = {
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

