'use strict'
const viewHtml = require('./view')
const doNothing = () => {}

const model = (nameSpace) => {
  const DEF_DURATION_BUILDUP = 1500
  const DEF_DURATION_UPTIME = 1000
  const DEF_DURATION_SLIDEOUT = 1000
  let DURATION_BUILDUP = DEF_DURATION_BUILDUP
  let DURATION_SLIDEOUT = DEF_DURATION_SLIDEOUT
  let DURATION_UPTIME = DEF_DURATION_UPTIME
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
        img: '',
        name: 'Player 1',
        pos: 0
      },
      right: {
        img: '',
        name: 'Player 2',
        pos: 0
      },
      vs: {
        img: '',
        pos: 0,
        scale: 100
      }
    },

    reducers: {
      _setVisibility: (state, visible) => {
        state.hidden = !visible
      },
      setLeft: (state, {img, name}) => setSide(state, 'LEFT', img, name),
      setRight: (state, {img, name}) => setSide(state, 'RIGHT', img, name),
      setVS: (state, {img}) => {
        state.vs.img = img
        return state
      },
      updatePositions: updatePositions,
      updateSizes: updateSizes
    },

    effects: {
      start: start,
      dismiss: dismiss,
      setDurations: (state, {up, down, stay}, send, done) => {
        if (up > 0) DURATION_BUILDUP = up
        if (down > 0) DURATION_SLIDEOUT = down
        if (stay >= 0) DURATION_UPTIME = stay
        done()
      },
      update: update
    }
  }

  function updatePositions (state, data) {
    if (data.hasOwnProperty('left')) state.left.pos = data.left
    if (data.hasOwnProperty('right')) state.right.pos = data.right
    if (data.hasOwnProperty('vs')) state.vs.pos = data.vs
    return state
  }

  function updateSizes (state, data) {
    if (data.hasOwnProperty('vs')) state.vs.scale = data.vs
    return state
  }

  function update ({left, right, vs}, data, send, done) {
    timeElapsed += timePerUpdate
    let pL = left.pos
    let pR = right.pos
    let pM = vs.pos

    if (timeElapsed < DURATION_BUILDUP) {
      return animIn(pL, pR, pM, send)
    }

    if (timeElapsed < DURATION_BUILDUP + DURATION_UPTIME) {
      return
    }

    if (timeElapsed < DURATION_BUILDUP + DURATION_UPTIME + DURATION_SLIDEOUT) {
      smallify(vs.scale, send)
      return slideOut(pL, pR, pM, send)
    }

    send(nameSpace + ':dismiss', null, doNothing)
  }

  function start (state, data, send, done) {
    timeElapsed = 0
    send(nameSpace + ':_setVisibility', true, doNothing)
    updateInterval = setInterval(() => {
      send(nameSpace + ':update', null, doNothing)
    }, timePerUpdate)
    send(nameSpace + ':updatePositions', startPositions, doNothing)
    send(nameSpace + ':updateSizes', {vs: 100}, doNothing)
    done()
  }

  function dismiss (state, data, send, done) {
    send(nameSpace + ':_setVisibility', false, doNothing)
    if (updateInterval) {
      clearInterval(updateInterval)
    }
    done()
  }

  function setSide (state, side, img, name) {
    if (side === 'LEFT') {
      if (img) state.left.img = img
      if (name) state.left.name = name
    }
    if (side === 'RIGHT') {
      if (img) state.right.img = img
      if (name) state.right.name = name
    }
  }

  function animIn (pL, pR, pM, send) {
    const speed = (timePerUpdate / 25) * (DEF_DURATION_BUILDUP / DURATION_BUILDUP)
    pL += speed * 15
    pR += speed * 15
    pM += speed * 20
    if (pL > 0) pL = 0
    if (pR > 0) pR = 0
    if (pM > 0) pM = 0
    send(nameSpace + ':updatePositions', {left: pL, right: pR, vs: pM}, doNothing)
  }

  function slideOut (pL, pR, pM, send) {
    const speed = (timePerUpdate / 25) * (DEF_DURATION_SLIDEOUT / DURATION_SLIDEOUT)
    pL -= speed * 2
    pR -= speed * 2
    send(nameSpace + ':updatePositions', {left: pL, right: pR}, doNothing)
  }

  function smallify (vsScale, send) {
    const speed = (timePerUpdate / 25) * (DEF_DURATION_SLIDEOUT / DURATION_SLIDEOUT)
    vsScale -= speed * 5
    if (vsScale < 0) vsScale = 0
    send(nameSpace + ':updateSizes', {vs: vsScale}, doNothing)
  }
}

module.exports = (nameSpace) => {
  return {
    model: model(nameSpace),
    view: viewHtml(nameSpace)
  }
}

