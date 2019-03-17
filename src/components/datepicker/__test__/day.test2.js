import ko from 'knockout'
import datepicker from '..'
import $ from 'jquery'
import kest from '../../../../test/utils/kest'
describe('y-datepicker-day组件', () => {
  const PREFIX = 'y-'
  kest.init(datepicker)
  kest.tpl('<y-datepicker params="\
    minDate: minDate,\
    maxDate:maxDate,\
    hour:hour,\
    minutes:minutes,\
    seconds:seconds,\
    isTimer:isTimer, \
    data: data,\
    year: year, \
    month: month,\
    day: day"></y-datepicker>')
  kest.bind({
    minDate: ko.observable('2012-01-01'),
    maxDate: ko.observable('2019-01-01'),
    hour: ko.observable(0),
    minutes: ko.observable(0),
    seconds: ko.observable(0),
    isTimer: false,
    data: ko.observable('2017-01-01'),
    year: ko.observable(2017),
    month: ko.observable(0),
    day: ko.observable(1)
  })
  it("组件注册测试", () => {
    expect(datepicker).not.toBeNull();
    expect(ko.components.isRegistered('y-datepicker-day')).toBe(true);
  })
  var el = $('body').find('.y-day-ctn')
  it('内部样式测试', () => {
    expect(el.find('.y-day-header').length > 0).toEqual(true)
    expect(el.find('.y-day-body').length > 0).toEqual(true)
    var subel = el.find('.y-day-header')
    expect(subel.find('.lastyear').length > 0).toEqual(true)
    expect(subel.find('.lastmonth').length > 0).toEqual(true)
    expect(subel.find('.yearandmonth').length > 0).toEqual(true)
    expect(subel.find('.nextmonth').length > 0).toEqual(true)
    expect(subel.find('.nextyear').length > 0).toEqual(true)
  })
  // it('属性title测试', () => {
  //   var text = el.find('.y-box-content-title')
  //   expect(text.text()).toEqual('test')
  // })
  it('快照', () => {
    expect($('body').get(0)).toMatchSnapshot()
  })
})
