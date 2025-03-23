"use strict";

var _react = _interopRequireDefault(require("react"));
var _enzyme = require("enzyme");
var _DefinedRange = _interopRequireDefault(require("../DefinedRange"));
var dateFns = _interopRequireWildcard(require("date-fns"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
describe('DefinedRange tests', () => {
  test('Should call "renderStaticRangeLabel" callback correct amount of times according to the "hasCustomRendering" option', () => {
    const renderStaticRangeLabel = jest.fn();
    (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_DefinedRange.default, {
      staticRanges: [{
        label: 'Dynamic Label',
        range: {},
        isSelected(range) {
          const definedRange = this.range();
          return dateFns.isSameDay(range.startDate, definedRange.startDate) && dateFns.isSameDay(range.endDate, definedRange.endDate);
        },
        hasCustomRendering: true
      }, {
        label: 'Static Label',
        range: {},
        isSelected(range) {
          const definedRange = this.range();
          return dateFns.isSameDay(range.startDate, definedRange.startDate) && dateFns.isSameDay(range.endDate, definedRange.endDate);
        }
      }, {
        label: 'Hede',
        range: {},
        isSelected(range) {
          const definedRange = this.range();
          return dateFns.isSameDay(range.startDate, definedRange.startDate) && dateFns.isSameDay(range.endDate, definedRange.endDate);
        },
        hasCustomRendering: true
      }],
      renderStaticRangeLabel: renderStaticRangeLabel
    }));
    expect(renderStaticRangeLabel).toHaveBeenCalledTimes(2);
  });
  test('Should render dynamic static label contents correctly', () => {
    const renderItalicLabelContent = () => /*#__PURE__*/_react.default.createElement("i", {
      className: 'italic-label-content'
    }, 'Italic Content');
    const renderBoldLabelContent = () => /*#__PURE__*/_react.default.createElement("b", {
      className: 'bold-label-content'
    }, 'Bold Content');
    const renderSomethingElse = () => /*#__PURE__*/_react.default.createElement("img", {
      className: 'random-image'
    });
    const renderStaticRangeLabel = function (staticRange) {
      let result;
      if (staticRange.id === 'italic') {
        result = renderItalicLabelContent();
      } else if (staticRange.id === 'bold') {
        result = renderBoldLabelContent();
      } else {
        result = renderSomethingElse();
      }
      return result;
    };
    const wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_DefinedRange.default, {
      staticRanges: [{
        id: 'italic',
        range: {},
        isSelected(range) {
          const definedRange = this.range();
          return dateFns.isSameDay(range.startDate, definedRange.startDate) && dateFns.isSameDay(range.endDate, definedRange.endDate);
        },
        hasCustomRendering: true
      }, {
        label: 'Static Label',
        range: {},
        isSelected(range) {
          const definedRange = this.range();
          return dateFns.isSameDay(range.startDate, definedRange.startDate) && dateFns.isSameDay(range.endDate, definedRange.endDate);
        }
      }, {
        id: 'whatever',
        range: {},
        isSelected(range) {
          const definedRange = this.range();
          return dateFns.isSameDay(range.startDate, definedRange.startDate) && dateFns.isSameDay(range.endDate, definedRange.endDate);
        },
        hasCustomRendering: true
      }, {
        id: 'bold',
        range: {},
        isSelected(range) {
          const definedRange = this.range();
          return dateFns.isSameDay(range.startDate, definedRange.startDate) && dateFns.isSameDay(range.endDate, definedRange.endDate);
        },
        hasCustomRendering: true
      }],
      renderStaticRangeLabel: renderStaticRangeLabel
    }));
    expect(wrapper).toMatchSnapshot();
  });
});