'use strict';

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".styles-module_container__1Lxpd {\n  display: flex;\n}\n";
var styles = {"container":"styles-module_container__1Lxpd"};
styleInject(css_248z);

/**
 * Main Component
 */
function Greeting(props) {
    var _a;
    React.useEffect(function () {
        console.log('Incoming message: ', props.message);
    }, [props.message]);
    return (React__default['default'].createElement("div", { className: styles.container }, (_a = props.message) !== null && _a !== void 0 ? _a : 'No Message'));
}

module.exports = Greeting;
//# sourceMappingURL=index.js.map
