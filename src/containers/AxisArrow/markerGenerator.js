import { PIXELS_PER_SCALE } from '../../constants'

function* pendulumGenerator() {
  let count = 1
  let flag = 1

  yield 0
  while (true) {
    yield flag * count
    flag = -flag
    if (flag > 0) count++
  }
}

function* timestampGenerator(centralTime, metricUnit) {
  const d = new Date(centralTime)
  const pendulumGen = pendulumGenerator()

  while (true) {
    if (metricUnit === 'min') {
      yield new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes() + pendulumGen.next().value).getTime()
    }
    if (metricUnit === 'h') {
      yield new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours() + pendulumGen.next().value).getTime()
    }
    if (metricUnit === 'd') {
      yield new Date(d.getFullYear(), d.getMonth(), d.getDate() + pendulumGen.next().value).getTime()
    }
    if (metricUnit === 'M') {
      yield new Date(d.getFullYear(), d.getMonth() + pendulumGen.next().value).getTime()
    }
  }
}

export function* markerGenerator(scale, centralTime, metricUnit) {
  const timestampGen = timestampGenerator(centralTime, metricUnit)
  while (true) {
    let timestamp = timestampGen.next().value
    let x = ((timestamp - centralTime) / scale) * PIXELS_PER_SCALE + window.innerWidth / 2
    if (x < window.innerWidth * -0.5 || x > window.innerWidth * 1.5) return
    yield { timestamp, x }
  }
}
