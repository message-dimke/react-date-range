"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStaticRanges = createStaticRanges;
exports.defaultStaticRanges = exports.defaultInputRanges = void 0;
var _dateFns = _interopRequireDefault(require("date-fns"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const defineds = {
  startOfWeek: _dateFns.default.startOfWeek(new Date()),
  endOfWeek: _dateFns.default.endOfWeek(new Date()),
  startOfLastWeek: _dateFns.default.startOfWeek(_dateFns.default.addDays(new Date(), -7)),
  endOfLastWeek: _dateFns.default.endOfWeek(_dateFns.default.addDays(new Date(), -7)),
  startOfToday: _dateFns.default.startOfDay(new Date()),
  endOfToday: _dateFns.default.endOfDay(new Date()),
  startOfYesterday: _dateFns.default.startOfDay(_dateFns.default.addDays(new Date(), -1)),
  endOfYesterday: _dateFns.default.endOfDay(_dateFns.default.addDays(new Date(), -1)),
  startOfMonth: _dateFns.default.startOfMonth(new Date()),
  endOfMonth: _dateFns.default.endOfMonth(new Date()),
  startOfLastMonth: _dateFns.default.startOfMonth(_dateFns.default.addMonths(new Date(), -1)),
  endOfLastMonth: _dateFns.default.endOfMonth(_dateFns.default.addMonths(new Date(), -1))
};
const staticRangeHandler = {
  range: {},
  isSelected(range) {
    const definedRange = this.range();
    return _dateFns.default.isSameDay(range.startDate, definedRange.startDate) && _dateFns.default.isSameDay(range.endDate, definedRange.endDate);
  }
};
function createStaticRanges(ranges) {
  return ranges.map(range => ({
    ...staticRangeHandler,
    ...range
  }));
}
const defaultStaticRanges = exports.defaultStaticRanges = createStaticRanges([{
  label: 'Today',
  range: () => ({
    startDate: defineds.startOfToday,
    endDate: defineds.endOfToday
  })
}, {
  label: 'Yesterday',
  range: () => ({
    startDate: defineds.startOfYesterday,
    endDate: defineds.endOfYesterday
  })
}, {
  label: 'This Week',
  range: () => ({
    startDate: defineds.startOfWeek,
    endDate: defineds.endOfWeek
  })
}, {
  label: 'Last Week',
  range: () => ({
    startDate: defineds.startOfLastWeek,
    endDate: defineds.endOfLastWeek
  })
}, {
  label: 'This Month',
  range: () => ({
    startDate: defineds.startOfMonth,
    endDate: defineds.endOfMonth
  })
}, {
  label: 'Last Month',
  range: () => ({
    startDate: defineds.startOfLastMonth,
    endDate: defineds.endOfLastMonth
  })
}]);
const defaultInputRanges = exports.defaultInputRanges = [{
  label: 'days up to today',
  range(value) {
    return {
      startDate: _dateFns.default.addDays(defineds.startOfToday, (Math.max(Number(value), 1) - 1) * -1),
      endDate: defineds.endOfToday
    };
  },
  getCurrentValue(range) {
    if (!_dateFns.default.isSameDay(range.endDate, defineds.endOfToday)) return '-';
    if (!range.startDate) return '∞';
    return _dateFns.default.differenceInCalendarDays(defineds.endOfToday, range.startDate) + 1;
  }
}, {
  label: 'days starting today',
  range(value) {
    const today = new Date();
    return {
      startDate: today,
      endDate: _dateFns.default.addDays(today, Math.max(Number(value), 1) - 1)
    };
  },
  getCurrentValue(range) {
    if (!_dateFns.default.isSameDay(range.startDate, defineds.startOfToday)) return '-';
    if (!range.endDate) return '∞';
    return _dateFns.default.differenceInCalendarDays(range.endDate, defineds.startOfToday) + 1;
  }
}];