import { PIXELS_PER_SCALE } from '../constants'
import { RANGE_HEIGHT } from '../containers/Range'

export const timestampToX = (timestamp, axisArrow) => {
  return window.innerWidth / 2 + ((timestamp - axisArrow.centralTime) / axisArrow.scale) * PIXELS_PER_SCALE
}

export const calcRangePosition = (startX, endX, distance, aboveLine, axisArrowLineWidth) => {
  const rectX = startX <= endX ? startX : endX
  const rectWidth = Math.abs(endX - startX)
  let rectY
  if (aboveLine) {
    rectY = window.innerHeight / 2 - distance - RANGE_HEIGHT - axisArrowLineWidth / 2
  } else {
    rectY = window.innerHeight / 2 + distance + axisArrowLineWidth / 2
  }
  return {
    rectX,
    rectY,
    rectWidth
  }
}

export const calcPosition = ({ midPoint, width, height, distance, aboveLine }) => {
  let x = midPoint - width / 2
  let y, linePoints
  if (aboveLine) {
    y = window.innerHeight / 2 - distance - height
    linePoints = [midPoint, (window.innerHeight / 2), midPoint, (window.innerHeight / 2 - distance)]
  } else {
    y = window.innerHeight / 2 + distance
    linePoints = [midPoint, (window.innerHeight / 2), midPoint, (window.innerHeight / 2 + distance)]
  }
  return {
    x,
    y,
    linePoints
  }
}

export const calcFromPosition = (x, y, width, height, scale, centralTime) => {
  if (y > ((window.innerHeight / 2) - height) && y <= ((window.innerHeight / 2) - height / 2)) {
    y = (window.innerHeight / 2) - height
  } else if (y > ((window.innerHeight / 2) - height / 2) && y < (window.innerHeight / 2)) {
    y = (window.innerHeight / 2)
  }

  const midPoint = x + (width / 2)
  const when = (((midPoint - (window.innerWidth / 2)) / PIXELS_PER_SCALE) * scale) + centralTime

  if (y <= ((window.innerHeight / 2) - height / 2)) {
    return {
      distance : (window.innerHeight / 2) - height - y,
      midPoint,
      aboveLine: true,
      when
    }
  } else {
    return {
      distance : y - (window.innerHeight / 2),
      midPoint,
      aboveLine: false,
      when
    }
  }
}
