import { RANGE_HEIGHT } from '../Range'
import { timestampToX, xToTimestamp } from '../../utils'

export const dataToKanvaAttrForRange = ({ start, end, distance, aboveLine, scale, centralTime, axisArrowLineWidth }) => {
  const startX = timestampToX(start, scale, centralTime)
  const endX = timestampToX(end, scale, centralTime)

  const rectX = startX <= endX ? startX : endX
  const rectWidth = Math.abs(endX - startX)
  let rectY, startCordLinePoints, endCordLinePoints, backgroundLinePoints

  if (aboveLine) {
    rectY = window.innerHeight / 2 - distance - RANGE_HEIGHT - axisArrowLineWidth / 2
    startCordLinePoints = [startX, rectY + RANGE_HEIGHT, startX,  (window.innerHeight / 2 - axisArrowLineWidth / 2)]
    endCordLinePoints = [endX, rectY + RANGE_HEIGHT, endX,  (window.innerHeight / 2 - axisArrowLineWidth / 2)]
    backgroundLinePoints = [rectX, rectY + RANGE_HEIGHT / 2, rectX + rectWidth, rectY + RANGE_HEIGHT / 2]
  } else {
    rectY = window.innerHeight / 2 + distance + axisArrowLineWidth / 2
    startCordLinePoints = [startX, (window.innerHeight / 2 + axisArrowLineWidth / 2), startX,  (window.innerHeight / 2 + distance + axisArrowLineWidth / 2)]
    endCordLinePoints = [endX, (window.innerHeight / 2 + axisArrowLineWidth / 2), endX,  (window.innerHeight / 2 + distance + axisArrowLineWidth / 2)]
    backgroundLinePoints = [rectX, rectY + RANGE_HEIGHT / 2, rectX + rectWidth, rectY + RANGE_HEIGHT / 2]
  }
  return {
    rectX,
    rectY,
    rectWidth,
    backgroundLinePoints,
    startCordLinePoints,
    endCordLinePoints
  }
}

export const konvaAttrToDataForRange = (rectX, rectY, rectWidth, scale, centralTime, axisArrowLineWidth) => {
  const height = RANGE_HEIGHT
  if (rectY <= ((window.innerHeight / 2) - height / 2)) {
    return {
      start: xToTimestamp(rectX, scale, centralTime),
      end: xToTimestamp(rectX + rectWidth, scale, centralTime),
      distance : (window.innerHeight / 2) - height - rectY - axisArrowLineWidth / 2,
      aboveLine: true,
    }
  } else {
    return {
      start: xToTimestamp(rectX, scale, centralTime),
      end: xToTimestamp(rectX + rectWidth, scale, centralTime),
      distance : rectY - (window.innerHeight / 2) - axisArrowLineWidth / 2,
      aboveLine: false,
    }
  }
}

export const konvaAttrToDataAvoidAxisArrowForRange = (rectX, rectY, rectWidth, height, scale, centralTime, axisArrowLineWidth) => {
  if (rectY > ((window.innerHeight / 2) - height) && rectY <= ((window.innerHeight / 2) - height / 2)) {
    rectY = (window.innerHeight / 2) - height - axisArrowLineWidth / 2
  } else if (rectY > ((window.innerHeight / 2) - height / 2) && rectY < (window.innerHeight / 2)) {
    rectY = (window.innerHeight / 2) + axisArrowLineWidth / 2
  }

  return konvaAttrToDataForRange(rectX, rectY, rectWidth, scale, centralTime, axisArrowLineWidth)
}
