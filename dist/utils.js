"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calcFocusDate = calcFocusDate;
exports.findNextRangeIndex = findNextRangeIndex;
exports.generateStyles = generateStyles;
exports.getMonthDisplayRange = getMonthDisplayRange;
var _classnames = _interopRequireDefault(require("classnames"));
var _dateFns = _interopRequireDefault(require("date-fns"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function calcFocusDate(currentFocusedDate, props) {
  const {
    shownDate,
    date,
    months,
    ranges,
    focusedRange,
    displayMode
  } = props;
  // find primary date according the props
  let targetInterval;
  if (displayMode === 'dateRange') {
    const range = ranges[focusedRange[0]] || {};
    targetInterval = {
      start: range.startDate,
      end: range.endDate
    };
  } else {
    targetInterval = {
      start: date,
      end: date
    };
  }
  targetInterval.start = _dateFns.default.startOfMonth(targetInterval.start || new Date());
  targetInterval.end = _dateFns.default.endOfMonth(targetInterval.end || targetInterval.start);
  const targetDate = targetInterval.start || targetInterval.end || shownDate || new Date();

  // initial focus
  if (!currentFocusedDate) return shownDate || targetDate;

  // // just return targetDate for native scrolled calendars
  // if (props.scroll.enabled) return targetDate;
  if (_dateFns.default.differenceInCalendarMonths(targetInterval.start, targetInterval.end) > months) {
    // don't change focused if new selection in view area
    return currentFocusedDate;
  }
  return targetDate;
}
function findNextRangeIndex(ranges) {
  let currentRangeIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
  const nextIndex = ranges.findIndex((range, i) => i > currentRangeIndex && range.autoFocus !== false && !range.disabled);
  if (nextIndex !== -1) return nextIndex;
  return ranges.findIndex(range => range.autoFocus !== false && !range.disabled);
}
function getMonthDisplayRange(date, dateOptions, fixedHeight) {
  const startDateOfMonth = _dateFns.default.startOfMonth(date, dateOptions);
  const endDateOfMonth = _dateFns.default.endOfMonth(date, dateOptions);
  const startDateOfCalendar = _dateFns.default.startOfWeek(startDateOfMonth, dateOptions);
  let endDateOfCalendar = _dateFns.default.endOfWeek(endDateOfMonth, dateOptions);
  if (fixedHeight && _dateFns.default.differenceInCalendarDays(endDateOfCalendar, startDateOfCalendar) <= 34) {
    endDateOfCalendar = _dateFns.default.addDays(endDateOfCalendar, 7);
  }
  return {
    start: startDateOfCalendar,
    end: endDateOfCalendar,
    startDateOfMonth,
    endDateOfMonth
  };
}
function generateStyles(sources) {
  if (!sources.length) return {};
  const generatedStyles = sources.filter(source => Boolean(source)).reduce((styles, styleSource) => {
    Object.keys(styleSource).forEach(key => {
      styles[key] = (0, _classnames.default)(styles[key], styleSource[key]);
    });
    return styles;
  }, {});
  return generatedStyles;
}