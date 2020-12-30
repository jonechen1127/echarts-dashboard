import moment from 'moment'

/**
 * 获取时间段
 * @param {*, Number, String} numOrType 负整数 多少天前 或 正整数 多少天后  week 本周  month 本月 year 本年
 * @param {*, Date, String, moment} date 从那天开始 默认今天
 * @param {*, String} format 格式化 请参考 http://momentjs.cn/docs/#/displaying/format/
 * 时分秒  00:00:00 - 23:59:59
 */
export function getPeriod (numOrType = 0, date = moment(), format = 'YYYY-MM-DD HH:mm:ss') {
  let end = moment.isMoment(date) ? date : moment(date)
  if (!end.isValid()) {
    throw new TypeError(`date is error：${date}`)
  }
  let start = moment(end)
  if (typeof numOrType === 'string') {
    switch (numOrType) {
      case 'week':
        numOrType = 'isoWeek' // 星期一开始算
        break
      case 'month':
        break
      case 'year':
        break
      default:
        throw new RangeError(`numOrType need in ['week', 'month', 'year'],but numOrType is '${numOrType}'`)
    }
    start.startOf(numOrType)
  } else if (typeof numOrType === 'number') {
    if (numOrType > 0) {
      end.add({ days: numOrType })
    } else if (numOrType < 0) {
      start.add({ days: numOrType })
    }
  }
  return {
    start: start.hours(0).minutes(0).seconds(0).milliseconds(0).format(format),
    end: end.hours(23).minutes(59).seconds(59).milliseconds(999).format(format)
  }
}
/**
 * 将时间转为分钟
 * @param {*} time  传入的时间
 */
export function ChangeStrToMinutes (time) {
  if (!time) return ''
  let num = time.split(':')
  return Number(num[0]) * 60 + Number(num[1])
}
/**
 * 将分钟为时间
 * @param {*} time  传入的时间
 */
export function ChangeStrToHourMinutes (str) {
  if (!str) return ''
  return ((Math.floor(str / 60)).toString().length < 2 ? '0' + (Math.floor(str / 60)).toString()
    : (Math.floor(str / 60)).toString()) + ':' + ((str % 60).toString().length < 2 ? '0' + (str % 60).toString() : (str % 60).toString())
}
