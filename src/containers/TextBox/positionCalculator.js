import { PIXELS_PER_SCALE } from '../../constants'

import { timestampToX, xToTimestamp } from '../../utils'

export const dataToKanvaAttrForTextBox = ({ when, width, height, distance, aboveLine, scale, centralTime }) => {
  const whenX = timestampToX(when, scale, centralTime)
  const x = whenX - width / 2
  let y, cordLinePoints
  if (aboveLine) {
    y = window.innerHeight / 2 - distance - height
    cordLinePoints = [whenX, (window.innerHeight / 2), whenX, (window.innerHeight / 2 - distance)]
  } else {
    y = window.innerHeight / 2 + distance
    cordLinePoints = [whenX, (window.innerHeight / 2), whenX, (window.innerHeight / 2 + distance)]
  }
  return {
    x,
    y,
    cordLinePoints
  }
}

export const konvaAttrToDataForTextBox = (x, y, width, height, scale, centralTime) => {
  if (y > ((window.innerHeight / 2) - height) && y <= ((window.innerHeight / 2) - height / 2)) {
    y = (window.innerHeight / 2) - height
  } else if (y > ((window.innerHeight / 2) - height / 2) && y < (window.innerHeight / 2)) {
    y = (window.innerHeight / 2)
  }

  const whenX = x + (width / 2)
  const when = xToTimestamp(whenX, scale, centralTime)

  if (y <= ((window.innerHeight / 2) - height / 2)) {
    return {
      distance : (window.innerHeight / 2) - height - y,
      aboveLine: true,
      when
    }
  } else {
    return {
      distance : y - (window.innerHeight / 2),
      aboveLine: false,
      when
    }
  }
}
