const DAY_DURATION = 86400000
// 获取每个月的第一天
export const getFirstDayOfMonth = function (date) {
  const temp = new Date(date.getTime())
  temp.setDate(1)
  return temp.getDay()
}
// 获取每个月的天数
export const getDayCountOfMonth = function (year, month) {
  if (month === 3 || month === 5 || month === 8 || month === 10) {
    return 30
  }

  if (month === 1) {
    if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
      return 29
    } else {
      return 28
    }
  }

  return 31
}

export const getWeekNumber = function (src) {
  const date = new Date(src.getTime())
  date.setHours(0, 0, 0, 0)
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7)
  // January 4 is always in week 1.
  const week1 = new Date(date.getFullYear(), 0, 4)
  // Adjust to Thursday in week 1 and count number of weeks from date to week 1.
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7)
}

export const getStartDateOfMonth = function (year, month) {
  const result = new Date(year, month, 1)
  const day = result.getDay()

  if (day === 0) {
    result.setTime(result.getTime() - DAY_DURATION * 7)
  } else {
    result.setTime(result.getTime() - DAY_DURATION * day)
  }
  return result
}

