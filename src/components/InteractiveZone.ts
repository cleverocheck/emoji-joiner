import { FederatedPointerEvent, Sprite, Texture } from 'pixi.js'

import { app } from '@/app'

import { Emoji } from './Emoji'

export class InteractiveZone extends Sprite {
  constructor() {
    super(Texture.EMPTY)

    this.eventMode = 'static'
    this.cursor = 'pointer'
    this.on('pointertap', this.onPointerTap.bind(this))

    window.addEventListener('resize', this.onResize.bind(this))
    this.onResize()
  }

  private onPointerTap(event: FederatedPointerEvent) {
    const emoji = new Emoji()
    emoji.position.copyFrom(event.client)

    app.stage.addChild(emoji)

    const emojis = app.stage.children.filter(
      children => children instanceof Emoji
    ) as Emoji[]
    const lastEmoji = emojis[emojis.length - 2]

    if (lastEmoji !== undefined) {
      lastEmoji.nextEmoji = emoji
      emoji.previousEmoji = lastEmoji

      if (emojis.length > 2) {
        const nextEmoji = emojis[0]

        emoji.nextEmoji = nextEmoji
        nextEmoji.previousEmoji = emoji
      }
    }

    app.render()
  }

  private onResize() {
    this.width = window.innerWidth
    this.height = window.innerHeight
  }
}
