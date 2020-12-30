export function getTips (text = '暂无数据') {
  return {
    title: {
      text,
      left: 'center',
      top: 'center',
      textStyle: {
        color: '#1e88e5',
        fontSize: 14
      }
    }
  }
}
