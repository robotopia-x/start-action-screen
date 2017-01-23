const html = require('choo/html')
const doNothing = () => {}

const viewHtml = (nameSpace) => {
  return (state, prev, send) => {
    return html`
    <div class="actionO_overlay" style="visibility: ${state[nameSpace].hidden ? 'hidden' : 'visible'}">
        <div id="actionO_left" style="left: ${state[nameSpace].left.pos + '%'}">
        <div class="actionO_Image" style="background-image: url(${state[nameSpace].left.img});"></div>
        <div class="actionO_Line"></div>
</div>
        <div class="actionO_VS" style="top: ${state[nameSpace].vs.pos + '%'}">
            <div>
                <div>
                    <img src=${state[nameSpace].vs.img} width="100%" alt="VS"/>
                </div>
            </div>
        </div>
        
        <div id="actionO_right" style="right: ${state[nameSpace].right.pos + '%'}"">
            <div class="actionO_Image" style="background-image: url(${state[nameSpace].right.img});"></div>
            <div class="actionO_Line"></div>
        </div>
    </div>
    `
  }
}

const model = (nameSpace) => {

  let DURATION_UP = 250000
  let DURATION_FADEOUT = 200
  let updateInterval
  let timeElapsed = 0
  const timePerUpdate = 25
  const startPositions = {
    left: -100,
    right: -300,
    vs: -800
  }

  return {
    namespace: nameSpace,

    state: {
      hidden: true,
      left: {
        img: 'img/left.png',
        name: 'Player 1',
        pos: 0
      },
      right: {
        img: 'img/right.png',
        name: 'Player 2',
        pos: 0
      },
      vs: {
        img: 'img/lightning.png',
        pos: 0
      }
    },

    reducers: {
      _setVisibility: (state, visible) => {state.hidden = !visible},
      setLeft: ( state, { img, name } ) => setSide( state, 'LEFT', img, name),
      setRight: ( state, { img, name } ) => setSide( state, 'RIGHT', img, name),
      updatePositions: updatePositions
    },

    effects: {
      start: start,
      dismiss: dismiss,
      setDurations: ( state, {up, fadeOut}, send, done) => {
        if (up > 0) DURATION_UP = up
        if (fadeOut > 0) DURATION_FADEOUT = fadeOut
        done()
      },
      update: update
    }
  }

  function updatePositions(state, {left, right, vs}) {
    state.left.pos = left
    state.right.pos = right
    state.vs.pos = vs
    return state
  }

  function update( {left, right, vs}, data, send, done) {
    timeElapsed += timePerUpdate
    let pL = left.pos
    let pR = right.pos
    let pM = vs.pos

    if (timeElapsed < DURATION_UP) {
      return animIn( pL, pR, pM, send)
    }

    if (timeElapsed < DURATION_UP + DURATION_FADEOUT) {
      return animOut( pL, pR, pM, send)
    }
    send(nameSpace + ':dismiss', null, doNothing)
  }

  function start(state, data, send, done) {
    timeElapsed = 0
    send(nameSpace + ':_setVisibility', true, doNothing)
    updateInterval = setInterval(() => {
      send(nameSpace + ':update', null, doNothing)
    }, timePerUpdate)
    send(nameSpace + ':updatePositions', startPositions, doNothing)
    done()
  }

  function dismiss(state, data, send, done) {
    send(nameSpace + ':_setVisibility', false, doNothing)
    if (updateInterval) {
      clearInterval(updateInterval)
    }
    done()
  }

  function setSide(state, side, img, name) {
    if (side === 'LEFT') {
      state.left.img = img;
      state.left.name = name;
    }
    if (side === 'RIGHT') {
      state.right.img = img;
      state.right.name = name;
    }
  }

  function animIn(pL, pR, pM, send) {
    const speed = (timePerUpdate / 25)
    pL += speed * 15
    pR += speed * 15
    pM += speed * 20
    if (pL > 0) pL = 0
    if (pR > 0) pR = 0
    if (pM > 0) pM = 0
    send(nameSpace + ':updatePositions', {left: pL, right: pR, vs: pM}, doNothing)
  }

  function animOut(pL, pR, pM, send) {

  }

}

module.exports = (nameSpace) => {
  return {
    model: model(nameSpace),
    view:  viewHtml(nameSpace)
  }
}

