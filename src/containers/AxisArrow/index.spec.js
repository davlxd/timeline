const approximateMetricUnit = (scale) => { //TODO
  if (scale <= 60 * 1000 ) return 'min'
  if (scale <= 60 * 60 * 1000 ) return 'h'
  if (scale <= 24 * 60 * 60 * 1000 ) return 'd'
  if (scale <= 30 * 24 * 60 * 60 * 1000 ) return 'M'
}

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

function* metricsGeneratror(centralTime, metricUnit) {
  const d = new Date(centralTime)
  const pendulum = pendulumGenerator()
  let direction = 1
  let count = 0

  while (true) {
    if (metricUnit === 'min') {
      yield new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes() + pendulum.next().value).getTime()
    }
    if (metricUnit === 'h') {
      yield new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours() + pendulum.next().value).getTime()
    }
    if (metricUnit === 'd') {
      yield new Date(d.getFullYear(), d.getMonth(), d.getDate() + pendulum.next().value).getTime()
    }
    if (metricUnit === 'M') {
      yield new Date(d.getFullYear(), d.getMonth() + pendulum.next().value).getTime()
    }
  }
}


describe('Test metrics generation machanisom', () => {
  it('Test pendulumGenerator xxxx', () => {
    const pendulum = pendulumGenerator()
    expect(pendulum.next().value).toEqual(0)
    expect(pendulum.next().value).toEqual(1)
    expect(pendulum.next().value).toEqual(-1)
    expect(pendulum.next().value).toEqual(2)
    expect(pendulum.next().value).toEqual(-2)
    expect(pendulum.next().value).toEqual(3)
    expect(pendulum.next().value).toEqual(-3)
    expect(pendulum.next().value).toEqual(4)
    expect(pendulum.next().value).toEqual(-4)

  })

  it('Test metricsGeneratror for min', () => {
    const scale = 30 * 1000
    const generator = metricsGeneratror(new Date().getTime(), approximateMetricUnit(scale))
    console.log(new Date().toString())
    console.log(new Date(generator.next().value).toString())
    console.log(new Date(generator.next().value).toString())
    console.log(new Date(generator.next().value).toString())
    console.log(new Date(generator.next().value).toString())
    console.log(new Date(generator.next().value).toString())
    console.log(new Date(generator.next().value).toString())
    console.log(new Date(generator.next().value).toString())
    console.log(new Date(generator.next().value).toString())
    console.log(new Date(generator.next().value).toString())
  })

  it('Test metricsGeneratror for h', () => {
    const scale = 45 * 60 * 1000
    const generator = metricsGeneratror(new Date().getTime(), approximateMetricUnit(scale))
    console.log(new Date().toString())
    console.log(new Date(generator.next().value).toString())
    console.log(new Date(generator.next().value).toString())
    console.log(new Date(generator.next().value).toString())
    console.log(new Date(generator.next().value).toString())
    console.log(new Date(generator.next().value).toString())
    console.log(new Date(generator.next().value).toString())
    console.log(new Date(generator.next().value).toString())
    console.log(new Date(generator.next().value).toString())
    console.log(new Date(generator.next().value).toString())
  })

  it('Test metricsGeneratror for d', () => {
    const scale = 1.4 * 24 * 60 * 60 * 1000
    const generator = metricsGeneratror(new Date().getTime(), approximateMetricUnit(scale))
    console.log(new Date().toString())
    console.log(new Date(generator.next().value).toString())
    console.log(new Date(generator.next().value).toString())
    console.log(new Date(generator.next().value).toString())
    console.log(new Date(generator.next().value).toString())
    console.log(new Date(generator.next().value).toString())
    console.log(new Date(generator.next().value).toString())
    console.log(new Date(generator.next().value).toString())
    console.log(new Date(generator.next().value).toString())
    console.log(new Date(generator.next().value).toString())
  })
})
