import { Graphics } from 'pixi.js'

import {
  addVectors,
  distanceBetweenVectors,
  subVectors,
  vectorMultiplyScalar,
  vectorNormalize
} from '@/utils/VectorUtils'

import { Emoji } from './Emoji'

export class EmojiConnector extends Graphics {
  constructor(private readonly beginEmoji: Emoji) {
    super()
  }

  draw(endEmoji: Emoji) {
    this.clear()

    if (
      distanceBetweenVectors(this.beginEmoji.position, endEmoji.position) >=
      Emoji.RADIUS * 2
    ) {
      this.position.copyFrom(
        addVectors(
          this.beginEmoji.position,
          vectorMultiplyScalar(
            vectorNormalize(
              subVectors(endEmoji.position, this.beginEmoji.position)
            ),
            Emoji.RADIUS
          )
        )
      )

      const lineTargetPosition = subVectors(
        addVectors(
          endEmoji.position,
          vectorMultiplyScalar(
            vectorNormalize(subVectors(this.position, endEmoji.position)),
            Emoji.RADIUS
          )
        ),
        this.position
      )

      this.lineStyle(5, 0xffffff)
      this.moveTo(0, 0)
      this.lineTo(lineTargetPosition.x, lineTargetPosition.y)

      this.endFill()
    }
  }
}
