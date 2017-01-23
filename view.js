'use strict'
const html = require('choo/html')
//const sheet = require('sheetify')

module.exports = (nameSpace) => {
  return (state, prev, send) => {
    return html`
    <div class="actionO_overlay" style="visibility: ${state[nameSpace].hidden ? 'hidden' : 'visible'}">
      <div id="actionO_left" style="left: ${state[nameSpace].left.pos + '%'}">
        <div class="actionO_Image" style="background-image: url(${state[nameSpace].left.img});"></div>
        <div class="actionO_Line"></div>
        <div class="actionO_Name">${state[nameSpace].left.name}</div>
      </div>
      
      <div class="actionO_VS" style="top: ${state[nameSpace].vs.pos + '%'}">
        <div>
          <div>
            <img src=${state[nameSpace].vs.img} width="${state[nameSpace].vs.scale}%" alt="VS"/>
          </div>
        </div>
      </div>
      
      <div id="actionO_right" style="right: ${state[nameSpace].right.pos + '%'}"">
        <div class="actionO_Image" style="background-image: url(${state[nameSpace].right.img});"></div>
        <div class="actionO_Line"></div>
        <div class="actionO_Name">${state[nameSpace].right.name}</div>
      </div>
    </div>
    `
  }
}