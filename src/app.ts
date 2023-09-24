import 'reset-css'
import './index.css'

import { Container, Renderer } from 'pixi.js'

import { Emoji } from '@/components/Emoji'
import { InteractiveZone } from '@/components/InteractiveZone'
import { ENodeEnv, env } from '@/data/env'

//NOTE: I didn't learn how to write shaders, so this is my best right now
class App {
  readonly renderer = new Renderer({ resolution: window.devicePixelRatio || 1 })
  readonly stage = new Container()

  constructor() {
    this.show()

    this.startApp()
  }

  private show() {
    document.body.appendChild(this.renderer.view as HTMLCanvasElement)
  }

  private startApp() {
    this.stage.addChild(new InteractiveZone())

    this.stage.eventMode = 'static'
    this.stage.on('pointerup', this.onPointerUp.bind(this))

    window.addEventListener('resize', this.onResize.bind(this))
    this.onResize()
  }

  private onPointerUp() {
    const movingEmoji = this.stage.children.find(
      children => children instanceof Emoji && children.isMoving
    ) as Emoji

    if (movingEmoji !== undefined) movingEmoji.isMoving = false
  }

  private onResize() {
    this.renderer.resize(window.innerWidth, window.innerHeight)

    this.render()
  }

  render() {
    this.renderer.render(this.stage)
  }
}

export const app = new App()

// NOTE: devtools
if (env.NODE_ENV === ENodeEnv.DEVELOPMENT) {
  globalThis.__PIXI_RENDERER__ = app.renderer
  globalThis.__PIXI_STAGE__ = app.stage
}
