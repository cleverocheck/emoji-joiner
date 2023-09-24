import 'reset-css'
import './index.css'

import { Application } from 'pixi.js'

import { Emoji } from '@/components/Emoji'
import { InteractiveZone } from '@/components/InteractiveZone'
import { ENodeEnv, env } from '@/data/env'

class App extends Application {
  constructor() {
    super({
      resolution: window.devicePixelRatio || 1,
      resizeTo: window
    })

    this.show()

    this.startApp()
  }

  private show() {
    document.body.appendChild(this.view as HTMLCanvasElement)
  }

  private startApp() {
    this.stage.sortableChildren = true

    this.stage.addChild(new InteractiveZone())

    this.stage.eventMode = 'static'
    this.stage.on('pointerup', this.onPointerUp.bind(this))
  }

  private onPointerUp() {
    const movingEmoji = this.stage.children.find(
      children => children instanceof Emoji && children.isMoving
    ) as Emoji

    if (movingEmoji !== undefined) movingEmoji.isMoving = false
  }
}

export const app = new App()

// NOTE: devtools
if (env.NODE_ENV === ENodeEnv.DEVELOPMENT) {
  globalThis.__PIXI_APP__ = app
}
