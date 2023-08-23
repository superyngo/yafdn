"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mdsvex = require("mdsvex");

var _remarkUnwrapImages = _interopRequireDefault(require("remark-unwrap-images"));

var _remarkToc = _interopRequireDefault(require("remark-toc"));

var _rehypeSlug = _interopRequireDefault(require("rehype-slug"));

var _shiki = require("shiki");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var config = (0, _mdsvex.defineMDSveXConfig)({
  extensions: [".md", ".svx"],
  layout: {
    _: "src/lib/components/mdsvexCustom/mdsvex.layout.svelte"
  },
  highlight: {
    highlighter: function highlighter(code) {
      var lang,
          highlighter,
          html,
          _args = arguments;
      return regeneratorRuntime.async(function highlighter$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              lang = _args.length > 1 && _args[1] !== undefined ? _args[1] : "text";
              _context.next = 3;
              return regeneratorRuntime.awrap((0, _shiki.getHighlighter)({
                theme: "poimandres"
              }));

            case 3:
              highlighter = _context.sent;
              html = (0, _mdsvex.escapeSvelte)(highlighter.codeToHtml(code, {
                lang: lang
              }));
              return _context.abrupt("return", "{@html `".concat(html, "` }"));

            case 6:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  },
  remarkPlugins: [_remarkUnwrapImages["default"], [_remarkToc["default"], {
    tight: true
  }]],
  rehypePlugins: [_rehypeSlug["default"]],
  smartypants: {
    dashes: "oldschool"
  }
});
var _default = config;
exports["default"] = _default;