import './timer.less'
var ko = window.ko
function init ({hour, minutes, seconds, showtimer}) {
  this.showtimer = showtimer
  this.hour = ko.computed(() => {
    return hour() > 9 ? hour() : ('0' + hour())
  })
  this.minutes = ko.computed(() => {
    return minutes() > 9 ? minutes() : ('0' + minutes())
  })
  this.seconds = ko.computed(() => {
    return seconds() > 9 ? seconds() : ('0' + seconds())
  })
  this.onInput = (e) => {
    let val = parseFloat(e.target.value)
    if (!/^[0-9]*[1-9][0-9]*$/.test(val)) {
      e.target.value = '00'
    }
  }
  this.nexthour = () => {
    let _hour = hour() + 1
    if (_hour === 24) {
      hour(0)
    } else {
      hour(_hour)
    }
  }
  this.lasthour = () => {
    let _hour = hour() - 1
    if (_hour <= 0) {
      hour(23)
    } else {
      hour(_hour)
    }
  }
  // 小时手动输入
  this.blurHour = (e) => {
    let _hour = e.target.value
    if (_hour >= 24 || _hour <= 0) {
      hour(0)
      e.target.value = '00'
    } else {
      hour(_hour)
    }
  }
  var timerTimeout
  var innerInterval
  // 小时选择长按
  this.nexthourholddown = () => {
    timerTimeout = setTimeout(() => {
      innerInterval = setInterval(() => {
        this.nexthour()
      }, 100)
    }, 200)
  }
  this.lasthourholddown = () => {
    timerTimeout = setTimeout(() => {
      innerInterval = setInterval(() => {
        this.lasthour()
      }, 100)
    }, 200)
  }
  // 分钟选择长按
  this.nextminholddown = () => {
    timerTimeout = setTimeout(() => {
      innerInterval = setInterval(() => {
        this.nextminutes()
      }, 50)
    }, 200)
  }
  // 分钟选择长按
  this.lastminholddown = () => {
    timerTimeout = setTimeout(() => {
      innerInterval = setInterval(() => {
        this.lastminutes()
      }, 50)
    }, 200)
  }
  // 秒选择长按
  this.nextsecholddown = () => {
    timerTimeout = setTimeout(() => {
      innerInterval = setInterval(() => {
        this.nextseconds()
      }, 50)
    }, 200)
  }
  // 秒选择长按
  this.lastsecholddown = () => {
    timerTimeout = setTimeout(() => {
      innerInterval = setInterval(() => {
        this.lastseconds()
      }, 50)
    }, 200)
  }
  this.holdup = () => {
    clearInterval(innerInterval)
    clearTimeout(timerTimeout)
  }
  this.blur = () => {
    clearInterval(innerInterval)
    clearTimeout(timerTimeout)
  }

  this.nextminutes = () => {
    let _minutes = minutes() + 1
    if (_minutes >= 60) {
      minutes(0)
    } else {
      minutes(_minutes)
    }
  }
  this.lastminutes = () => {
    let _minutes = minutes() - 1
    if (_minutes <= 0) {
      minutes(59)
    } else {
      minutes(_minutes)
    }
  }
  // 分钟手动输入
  this.blurMinutes = (e) => {
    let _minutes = e.target.value
    if (_minutes >= 60 || _minutes <= 0) {
      minutes(0)
      e.target.value = '00'
    } else {
      minutes(_minutes)
    }
  }
  this.nextseconds = () => {
    let _seconds = seconds() + 1
    if (_seconds >= 60) {
      seconds(0)
    } else {
      seconds(_seconds)
    }
  }
  this.lastseconds = () => {
    let _seconds = seconds() - 1
    if (_seconds <= 0) {
      seconds(59)
    } else {
      seconds(_seconds)
    }
  }
  // 秒手动输入
  this.blurSeconds = (e) => {
    let _seconds = e.target.value
    if (_seconds >= 60 || _seconds <= 0) {
      seconds(0)
      e.target.value = '00'
    } else {
      seconds(_seconds)
    }
  }
}
export default init
