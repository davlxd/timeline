import { PIXELS_PER_SCALE, MONTH30_MS } from '../constants'

export const _localTimeInYMD = (timestamp) => {
  const [ w, m, d, y, t] = new Date(timestamp).toString().split(' ')
  w.slice()
  let M
  switch (m) {
    case 'Jan':
      M = '01'
      break
    case 'Feb':
      M = '02'
      break
    case 'Mar':
      M = '03'
      break
    case 'Apr':
      M = '04'
      break
    case 'May':
      M = '05'
      break
    case 'Jun':
      M = '06'
      break
    case 'Jul':
      M = '07'
      break
    case 'Aug':
      M = '08'
      break
    case 'Sep':
      M = '09'
      break
    case 'Oct':
      M = '10'
      break
    case 'Nov':
      M = '11'
      break
    case 'Dec':
      M = '12'
      break
    default:
      M = '00'
  }
  // return y + '-' + M + '-' + d + ' ' + t
  return y + '-' + M + '-' + d
}

export const localTimeInYMD = (timestamp, scale) => {
  const [ w, m, d, y, t] = new Date(timestamp).toString().split(' ')
  w.slice()
  let M
  switch (m) {
    case 'Jan':
      M = '01'
      break
    case 'Feb':
      M = '02'
      break
    case 'Mar':
      M = '03'
      break
    case 'Apr':
      M = '04'
      break
    case 'May':
      M = '05'
      break
    case 'Jun':
      M = '06'
      break
    case 'Jul':
      M = '07'
      break
    case 'Aug':
      M = '08'
      break
    case 'Sep':
      M = '09'
      break
    case 'Oct':
      M = '10'
      break
    case 'Nov':
      M = '11'
      break
    case 'Dec':
      M = '12'
      break
    default:
      M = '00'
  }
  if (scale >= MONTH30_MS) {
    return y + '-' + M + '-' + d
  }
  return y + '-' + M + '-' + d + ' ' + t
}


export const timestampToX = (timestamp, scale, centralTime) => {
  return window.innerWidth / 2 + ((timestamp - centralTime) / scale) * PIXELS_PER_SCALE
}

export const xToTimestamp = (x, scale, centralTime) => {
  return (((x - window.innerWidth / 2) / PIXELS_PER_SCALE) * scale) + centralTime
}
