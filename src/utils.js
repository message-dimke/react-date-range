import classnames from 'classnames';
import * as dateFns from 'date-fns';

export function calcFocusDate(currentFocusedDate, props) {
  const { shownDate, date, months, ranges, focusedRange, displayMode } = props;
  // find primary date according the props
  let targetInterval;
  if (displayMode === 'dateRange') {
    const range = ranges[focusedRange[0]] || {};
    targetInterval = {
      start: range.startDate,
      end: range.endDate,
    };
  } else {
    targetInterval = {
      start: date,
      end: date,
    };
  }
  targetInterval.start = dateFns.startOfMonth(targetInterval.start || new Date());
  targetInterval.end = dateFns.endOfMonth(targetInterval.end || targetInterval.start);
  const targetDate = targetInterval.start || targetInterval.end || shownDate || new Date();

  // initial focus
  if (!currentFocusedDate) return shownDate || targetDate;

  // // just return targetDate for native scrolled calendars
  // if (props.scroll.enabled) return targetDate;
  if (dateFns.differenceInCalendarMonths(targetInterval.start, targetInterval.end) > months) {
    // don't change focused if new selection in view area
    return currentFocusedDate;
  }
  return targetDate;
}

export function findNextRangeIndex(ranges, currentRangeIndex = -1) {
  const nextIndex = ranges.findIndex(
    (range, i) => i > currentRangeIndex && range.autoFocus !== false && !range.disabled
  );
  if (nextIndex !== -1) return nextIndex;
  return ranges.findIndex(range => range.autoFocus !== false && !range.disabled);
}

export function getMonthDisplayRange(date, dateOptions, fixedHeight) {
  const startDateOfMonth = dateFns.startOfMonth(date, dateOptions);
  const endDateOfMonth = dateFns.endOfMonth(date, dateOptions);
  const startDateOfCalendar = dateFns.startOfWeek(startDateOfMonth, dateOptions);
  let endDateOfCalendar = dateFns.endOfWeek(endDateOfMonth, dateOptions);
  if (fixedHeight && dateFns.differenceInCalendarDays(endDateOfCalendar, startDateOfCalendar) <= 34) {
    endDateOfCalendar = dateFns.addDays(endDateOfCalendar, 7);
  }
  return {
    start: startDateOfCalendar,
    end: endDateOfCalendar,
    startDateOfMonth,
    endDateOfMonth,
  };
}

export function generateStyles(sources) {
  if (!sources.length) return {};
  const generatedStyles = sources
    .filter(source => Boolean(source))
    .reduce((styles, styleSource) => {
      Object.keys(styleSource).forEach(key => {
        styles[key] = classnames(styles[key], styleSource[key]);
      });
      return styles;
    }, {});
  return generatedStyles;
}
