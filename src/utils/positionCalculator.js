import { PIXELS_PER_SCALE } from '../constants'
import { RANGE_HEIGHT } from '../containers/Range'

export const timestampToX = (timestamp, scale, centralTime) => {
  return window.innerWidth / 2 + ((timestamp - centralTime) / scale) * PIXELS_PER_SCALE
}

export const xToTimestamp = (x, scale, centralTime) => {
  return (((x - window.innerWidth / 2) / PIXELS_PER_SCALE) * scale) + centralTime
}

export const dataToKanvaAttrForRange = (start, end, distance, aboveLine, scale, centralTime, axisArrowLineWidth) => {
  const startX = timestampToX(start, scale, centralTime)
  const endX = timestampToX(end, scale, centralTime)
  
  const rectX = startX <= endX ? startX : endX
  const rectWidth = Math.abs(endX - startX)
  let rectY, startCordLinePoints, endCordLinePoints
  if (aboveLine) {
    rectY = window.innerHeight / 2 - distance - RANGE_HEIGHT - axisArrowLineWidth / 2
    startCordLinePoints = [startX, rectY + RANGE_HEIGHT, startX,  (window.innerHeight / 2 - axisArrowLineWidth / 2)]
    endCordLinePoints = [endX, rectY + RANGE_HEIGHT, endX,  (window.innerHeight / 2 - axisArrowLineWidth / 2)]
  } else {
    rectY = window.innerHeight / 2 + distance + axisArrowLineWidth / 2
    startCordLinePoints = [startX, window.innerHeight / 2, startX,  (window.innerHeight / 2 + distance)]
    endCordLinePoints = [endX, window.innerHeight / 2, endX,  (window.innerHeight / 2 + distance)]
  }
  return {
    rectX,
    rectY,
    rectWidth,
    startCordLinePoints,
    endCordLinePoints
  }
}

export const konvaAttrToDataForRange = (rectX, rectY, rectWidth, height, scale, centralTime) => {
  if (rectY > ((window.innerHeight / 2) - height) && rectY <= ((window.innerHeight / 2) - height / 2)) {
    rectY = (window.innerHeight / 2) - height
  } else if (rectY > ((window.innerHeight / 2) - height / 2) && rectY < (window.innerHeight / 2)) {
    rectY = (window.innerHeight / 2)
  } //TODO extract method

  if (rectY <= ((window.innerHeight / 2) - height / 2)) {
    return {
      start: xToTimestamp(rectX, scale, centralTime),
      end: xToTimestamp(rectX + rectWidth, scale, centralTime),
      distance : (window.innerHeight / 2) - height - rectY,
      aboveLine: true,
    }
  } else {
    return {
      start: xToTimestamp(rectX, scale, centralTime),
      end: xToTimestamp(rectX + rectWidth, scale, centralTime),
      distance : rectY - (window.innerHeight / 2),
      aboveLine: false,
    }
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
