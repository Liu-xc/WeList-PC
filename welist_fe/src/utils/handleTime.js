import { doubleDigits } from './handleNum.js'
// time参数为设置是否返回解析出的时间，默认不返回，只返回日期
function transTimeStamp (timestamp, time = false) {
  const date = new Date(timestamp)
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDate()
  let Str = `${y}/${m}/${d}`
  if (time) {
    const h = doubleDigits(date.getHours())
    const mm = doubleDigits(date.getMinutes())
    const s = doubleDigits(date.getSeconds())
    Str += ` ${h}:${mm}:${s}`
  }

  return Str
}

function overtime (start, end, minuets) {
  return end - start > minuets * 60 * 1000
}

export { transTimeStamp, overtime }
