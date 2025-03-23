"use strict";

var _react = _interopRequireDefault(require("react"));
var dateFns = _interopRequireWildcard(require("date-fns"));
var _DateRange = _interopRequireDefault(require("../DateRange"));
var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
let testRenderer = null;
let instance = null;
const endDate = new Date();
const startDate = dateFns.subDays(endDate, 7);
const commonProps = {
  ranges: [{
    startDate,
    endDate,
    key: 'selection'
  }],
  onChange: () => {},
  moveRangeOnFirstSelection: false
};
const compareRanges = (newRange, assertionRange) => {
  ['startDate', 'endDate'].forEach(key => {
    if (!newRange[key] || !assertionRange[key]) {
      return expect(newRange[key]).toEqual(assertionRange[key]);
    }
    return expect(dateFns.isSameDay(newRange[key], assertionRange[key])).toEqual(true);
  });
};
beforeEach(() => {
  testRenderer = _reactTestRenderer.default.create( /*#__PURE__*/_react.default.createElement(_DateRange.default, commonProps));
  instance = testRenderer.getInstance();
});
describe('DateRange', () => {
  test('Should resolve', () => {
    expect(_DateRange.default).toEqual(expect.anything());
  });
  test('calculate new selection by resetting end date', () => {
    const methodResult = instance.calcNewSelection(dateFns.subDays(endDate, 10), true);
    compareRanges(methodResult.range, {
      startDate: dateFns.subDays(endDate, 10),
      endDate: dateFns.subDays(endDate, 10)
    });
  });
  test('calculate new selection by resetting end date if start date is not before', () => {
    const methodResult = instance.calcNewSelection(dateFns.addDays(endDate, 2), true);
    compareRanges(methodResult.range, {
      startDate: dateFns.addDays(endDate, 2),
      endDate: dateFns.addDays(endDate, 2)
    });
  });
  test('calculate new selection based on moveRangeOnFirstSelection prop', () => {
    testRenderer.update( /*#__PURE__*/_react.default.createElement(_DateRange.default, _extends({}, commonProps, {
      moveRangeOnFirstSelection: true
    })));
    const methodResult = instance.calcNewSelection(dateFns.subDays(endDate, 10), true);
    compareRanges(methodResult.range, {
      startDate: dateFns.subDays(endDate, 10),
      endDate: dateFns.subDays(endDate, 3)
    });
  });
  test('calculate new selection by retaining end date, based on retainEndDateOnFirstSelection prop', () => {
    testRenderer.update( /*#__PURE__*/_react.default.createElement(_DateRange.default, _extends({}, commonProps, {
      retainEndDateOnFirstSelection: true
    })));
    const methodResult = instance.calcNewSelection(dateFns.subDays(endDate, 10), true);
    compareRanges(methodResult.range, {
      startDate: dateFns.subDays(endDate, 10),
      endDate
    });
  });
  test('calculate new selection by retaining the unset end date, based on retainEndDateOnFirstSelection prop', () => {
    testRenderer.update( /*#__PURE__*/_react.default.createElement(_DateRange.default, _extends({}, commonProps, {
      ranges: [{
        ...commonProps.ranges[0],
        endDate: null
      }],
      retainEndDateOnFirstSelection: true
    })));
    const methodResult = instance.calcNewSelection(dateFns.subDays(endDate, 10), true);
    compareRanges(methodResult.range, {
      startDate: dateFns.subDays(endDate, 10),
      endDate: null
    });
  });
});