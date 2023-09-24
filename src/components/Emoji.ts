import { Container, FederatedPointerEvent, Graphics, Text } from 'pixi.js'

import { app } from '@/app'
import { EmojiConnector } from '@/components/EmojiConnector'
import emojiList from '@/data/emojiList.json'
import { getRandomArrayElement } from '@/utils/getRandomArrayElement'

export class Emoji extends Container {
  static readonly RADIUS = 35
  private _isMoving = false
  private _nextEmoji: Emoji | null = null
  previousEmoji: Emoji | null = null
  emojiConnector: EmojiConnector | null = null

  get isMoving() {
    return this._isMoving
  }

  set isMoving(isMoving: boolean) {
    this._isMoving = isMoving

    app.stage.children.forEach(children => {
      if (children instanceof Emoji) {
        children.cursor = isMoving ? 'grabbing' : 'grab'
      }
    })
  }

  get nextEmoji() {
    return this._nextEmoji
  }

  set nextEmoji(nextEmoji: Emoji | null) {
    this._nextEmoji = nextEmoji

    if (nextEmoji !== null) {
      if (this.emojiConnector === null) {
        this.emojiConnector = new EmojiConnector(this)

        app.stage.addChild(this.emojiConnector)
      }

      this.emojiConnector.draw(nextEmoji)
    }
  }

  constructor() {
    super()

    this.initBackground()

    this.initImage()

    this.eventMode = 'static'
    this.cursor = 'grab'
    this.on('pointerdown', this.onPointerDown.bind(this))
    this.on('globalpointermove', this.onGlobalPointerMove.bind(this))
  }

  private initBackground() {
    const background = new Graphics()
    background.lineStyle(Emoji.RADIUS * 0.2, 0xffffff)
    background.beginFill(0xff0000)
    background.drawCircle(0, 0, Emoji.RADIUS)
    background.endFill()

    this.addChild(background)
  }

  private initImage() {
    const image = new Text(getRandomArrayElement(emojiList), {
      fontSize: Emoji.RADIUS
    })
    image.anchor.set(0.5, 0.5)

    this.addChild(image)
  }

  private onPointerDown() {
    this.isMoving = true
  }

  private onGlobalPointerMove(event: FederatedPointerEvent) {
    if (this.isMoving) {
      this.position.copyFrom(event.client)

      if (
        this.previousEmoji !== null &&
        this.previousEmoji.emojiConnector !== null
      )
        this.previousEmoji.emojiConnector.draw(this)

      if (this.emojiConnector !== null && this.nextEmoji !== null)
        this.emojiConnector.draw(this.nextEmoji)
    }
  }
}
