import { Container, Renderer } from 'pixi.js'

declare global {
  /*eslint-disable no-var*/
  var __PIXI_RENDERER__: Renderer
  var __PIXI_STAGE__: Container
  /*eslint-enable no-var*/
}
