// 千分位分隔符
const thousandBitSeparator = (num = '') => {
  return (num.toString().indexOf('.') !== -1) ? num.toLocaleString() : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
}

export {
  thousandBitSeparator
}
