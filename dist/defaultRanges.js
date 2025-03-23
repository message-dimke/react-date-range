"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStaticRanges = createStaticRanges;
exports.defaultStaticRanges = exports.defaultInputRanges = void 0;
var dateFns = _interopRequireWildcard(require("date-fns"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const defineds = {
  startOfWeek: dateFns.startOfWeek(new Date()),
  endOfWeek: dateFns.endOfWeek(new Date()),
  startOfLastWeek: dateFns.startOfWeek(dateFns.addDays(new Date(), -7)),
  endOfLastWeek: dateFns.endOfWeek(dateFns.addDays(new Date(), -7)),
  startOfToday: dateFns.startOfDay(new Date()),
  endOfToday: dateFns.endOfDay(new Date()),
  startOfYesterday: dateFns.startOfDay(dateFns.addDays(new Date(), -1)),
  endOfYesterday: dateFns.endOfDay(dateFns.addDays(new Date(), -1)),
  startOfMonth: dateFns.startOfMonth(new Date()),
  endOfMonth: dateFns.endOfMonth(new Date()),
  startOfLastMonth: dateFns.startOfMonth(dateFns.addMonths(new Date(), -1)),
  endOfLastMonth: dateFns.endOfMonth(dateFns.addMonths(new Date(), -1))
};
const staticRangeHandler = {
  range: {},
  isSelected(range) {
    const definedRange = this.range();
    return dateFns.isSameDay(range.startDate, definedRange.startDate) && dateFns.isSameDay(range.endDate, definedRange.endDate);
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
      startDate: dateFns.addDays(defineds.startOfToday, (Math.max(Number(value), 1) - 1) * -1),
      endDate: defineds.endOfToday
    };
  },
  getCurrentValue(range) {
    if (!dateFns.isSameDay(range.endDate, defineds.endOfToday)) return '-';
    if (!range.startDate) return '∞';
    return dateFns.differenceInCalendarDays(defineds.endOfToday, range.startDate) + 1;
  }
}, {
  label: 'days starting today',
  range(value) {
    const today = new Date();
    return {
      startDate: today,
      endDate: dateFns.addDays(today, Math.max(Number(value), 1) - 1)
    };
  },
  getCurrentValue(range) {
    if (!dateFns.isSameDay(range.startDate, defineds.startOfToday)) return '-';
    if (!range.endDate) return '∞';
    return dateFns.differenceInCalendarDays(range.endDate, defineds.startOfToday) + 1;
  }
}];