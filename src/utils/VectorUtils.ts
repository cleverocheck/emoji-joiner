import { Point } from 'pixi.js'

export function addVectors(a: Point, b: Point) {
  return new Point(a.x + b.x, a.y + b.y)
}

export function subVectors(a: Point, b: Point) {
  return new Point(a.x - b.x, a.y - b.y)
}

export function vectorLength(vector: Point) {
  return Math.sqrt(vector.x ** 2 + vector.y ** 2)
}

export function vectorMultiplyScalar(vector: Point, scalar: number) {
  vector.x *= scalar
  vector.y *= scalar

  return vector
}

export function vectorDivideScalar(vector: Point, scalar: number) {
  vectorMultiplyScalar(vector, 1 / scalar)

  return vector
}

export function vectorNormalize(vector: Point) {
  vectorDivideScalar(vector, vectorLength(vector) || 1)

  return vector
}

export function distanceBetweenVectors(a: Point, b: Point) {
  const dx = b.x - a.x,
    dy = b.y - a.y

  return Math.sqrt(dx ** 2 + dy ** 2)
}
