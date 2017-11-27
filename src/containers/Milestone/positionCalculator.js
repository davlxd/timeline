import { MILESTONE_RECT_HEIGHT, MILESTONE_RECT_WIDTH, MILESTONE_POINTER_HEIGHT } from '../Milestone'

import { timestampToX, xToTimestamp } from '../../utils'

export const dataToKanvaAttrForMilestone = ({ when, distance, aboveLine, scale, centralTime, axisArrowLineWidth }) => {
  const TOTAL_HEIGHT = (MILESTONE_POINTER_HEIGHT + MILESTONE_RECT_HEIGHT)
  const whenX = timestampToX(when, scale, centralTime)
  const x = whenX - MILESTONE_RECT_WIDTH / 2
  let y, cordLinePoints, pointerDirection
  if (aboveLine) {
    y = window.innerHeight / 2 - distance - TOTAL_HEIGHT - axisArrowLineWidth / 2
    cordLinePoints = [whenX, (window.innerHeight / 2 - distance), whenX, (window.innerHeight / 2 - axisArrowLineWidth / 2)]
    pointerDirection = 'down'
  } else {
    y = window.innerHeight / 2 + distance + MILESTONE_POINTER_HEIGHT + axisArrowLineWidth / 2
    cordLinePoints = [whenX, (window.innerHeight / 2 + axisArrowLineWidth / 2), whenX, (window.innerHeight / 2 + distance + axisArrowLineWidth / 2)]
    pointerDirection = 'up'
  }
  return {
    x,
    y,
    pointerDirection,
    cordLinePoints
  }
}

export const konvaAttrToDataForMilestone = (x, y, scale, centralTime, axisArrowLineWidth) => {
  const TOTAL_HEIGHT = (MILESTONE_POINTER_HEIGHT + MILESTONE_RECT_HEIGHT)
  const whenX = x + MILESTONE_RECT_WIDTH / 2
  const when = xToTimestamp(whenX, scale, centralTime)

  if (y <= ((window.innerHeight / 2) - TOTAL_HEIGHT / 2)) {
    return {
      when,
      distance : (window.innerHeight / 2) - y - TOTAL_HEIGHT - axisArrowLineWidth / 2,
      aboveLine: true,
    }
  } else {
    return {
      when,
      distance : y - (window.innerHeight / 2) - axisArrowLineWidth / 2 - MILESTONE_POINTER_HEIGHT,
      aboveLine: false,
    }
  }
}

export const konvaAttrToDataAvoidAxisArrowForMilestone = (x, y, scale, centralTime, axisArrowLineWidth) => {
  const TOTAL_HEIGHT = (MILESTONE_POINTER_HEIGHT + MILESTONE_RECT_HEIGHT)

  if (y > (window.innerHeight / 2 - TOTAL_HEIGHT - axisArrowLineWidth / 2) && y <= ((window.innerHeight / 2) - TOTAL_HEIGHT / 2)) {
    y = (window.innerHeight / 2) - TOTAL_HEIGHT - axisArrowLineWidth / 2
  } else if (y > ((window.innerHeight / 2) - TOTAL_HEIGHT / 2) && y < (window.innerHeight / 2 + MILESTONE_POINTER_HEIGHT + axisArrowLineWidth / 2)) {
    y = (window.innerHeight / 2) + axisArrowLineWidth / 2 + MILESTONE_POINTER_HEIGHT
  }

  return konvaAttrToDataForMilestone(x, y, scale, centralTime, axisArrowLineWidth)
}
