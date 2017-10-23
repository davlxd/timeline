const ordinalSuffixOf = (i) => {
  const j = i % 10, k = i % 100
  if (j == 1 && k != 11) return i + 'st'
  if (j == 2 && k != 12) return i + 'nd'
  if (j == 3 && k != 13) return i + 'rd'
  return i + 'th'
}


export const markerFormater = (timestamp) => {
  const [ _, m, d, y, t] = new Date(timestamp).toString().split(' ')
  if (t !== '00:00:00') return { marker: t.slice(0, 5), fontSize: 10 }
  if (d !== '01') return { marker: ordinalSuffixOf(d), fontSize: 13 }
  if (m !== 'Jan') return { marker: m, fontSize: 16 }
  return { marker: y, fontSize: 18 }
  // return new Date(timestamp).toString()
}
