(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __reExport = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toModule = (module) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // node_modules/topbar/topbar.js
  var require_topbar = __commonJS({
    "node_modules/topbar/topbar.js"(exports, module) {
      (function(window2, document2) {
        "use strict";
        (function() {
          var lastTime = 0;
          var vendors = ["ms", "moz", "webkit", "o"];
          for (var x = 0; x < vendors.length && !window2.requestAnimationFrame; ++x) {
            window2.requestAnimationFrame = window2[vendors[x] + "RequestAnimationFrame"];
            window2.cancelAnimationFrame = window2[vendors[x] + "CancelAnimationFrame"] || window2[vendors[x] + "CancelRequestAnimationFrame"];
          }
          if (!window2.requestAnimationFrame)
            window2.requestAnimationFrame = function(callback, element) {
              var currTime = new Date().getTime();
              var timeToCall = Math.max(0, 16 - (currTime - lastTime));
              var id = window2.setTimeout(function() {
                callback(currTime + timeToCall);
              }, timeToCall);
              lastTime = currTime + timeToCall;
              return id;
            };
          if (!window2.cancelAnimationFrame)
            window2.cancelAnimationFrame = function(id) {
              clearTimeout(id);
            };
        })();
        var canvas, progressTimerId, fadeTimerId, currentProgress, showing, addEvent = function(elem, type, handler3) {
          if (elem.addEventListener)
            elem.addEventListener(type, handler3, false);
          else if (elem.attachEvent)
            elem.attachEvent("on" + type, handler3);
          else
            elem["on" + type] = handler3;
        }, options = {
          autoRun: true,
          barThickness: 3,
          barColors: {
            "0": "rgba(26,  188, 156, .9)",
            ".25": "rgba(52,  152, 219, .9)",
            ".50": "rgba(241, 196, 15,  .9)",
            ".75": "rgba(230, 126, 34,  .9)",
            "1.0": "rgba(211, 84,  0,   .9)"
          },
          shadowBlur: 10,
          shadowColor: "rgba(0,   0,   0,   .6)",
          className: null
        }, repaint = function() {
          canvas.width = window2.innerWidth;
          canvas.height = options.barThickness * 5;
          var ctx = canvas.getContext("2d");
          ctx.shadowBlur = options.shadowBlur;
          ctx.shadowColor = options.shadowColor;
          var lineGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
          for (var stop in options.barColors)
            lineGradient.addColorStop(stop, options.barColors[stop]);
          ctx.lineWidth = options.barThickness;
          ctx.beginPath();
          ctx.moveTo(0, options.barThickness / 2);
          ctx.lineTo(Math.ceil(currentProgress * canvas.width), options.barThickness / 2);
          ctx.strokeStyle = lineGradient;
          ctx.stroke();
        }, createCanvas = function() {
          canvas = document2.createElement("canvas");
          var style = canvas.style;
          style.position = "fixed";
          style.top = style.left = style.right = style.margin = style.padding = 0;
          style.zIndex = 100001;
          style.display = "none";
          if (options.className)
            canvas.classList.add(options.className);
          document2.body.appendChild(canvas);
          addEvent(window2, "resize", repaint);
        }, topbar2 = {
          config: function(opts) {
            for (var key in opts)
              if (options.hasOwnProperty(key))
                options[key] = opts[key];
          },
          show: function() {
            if (showing)
              return;
            showing = true;
            if (fadeTimerId !== null)
              window2.cancelAnimationFrame(fadeTimerId);
            if (!canvas)
              createCanvas();
            canvas.style.opacity = 1;
            canvas.style.display = "block";
            topbar2.progress(0);
            if (options.autoRun) {
              (function loop2() {
                progressTimerId = window2.requestAnimationFrame(loop2);
                topbar2.progress("+" + 0.05 * Math.pow(1 - Math.sqrt(currentProgress), 2));
              })();
            }
          },
          progress: function(to) {
            if (typeof to === "undefined")
              return currentProgress;
            if (typeof to === "string") {
              to = (to.indexOf("+") >= 0 || to.indexOf("-") >= 0 ? currentProgress : 0) + parseFloat(to);
            }
            currentProgress = to > 1 ? 1 : to;
            repaint();
            return currentProgress;
          },
          hide: function() {
            if (!showing)
              return;
            showing = false;
            if (progressTimerId != null) {
              window2.cancelAnimationFrame(progressTimerId);
              progressTimerId = null;
            }
            (function loop2() {
              if (topbar2.progress("+.1") >= 1) {
                canvas.style.opacity -= 0.05;
                if (canvas.style.opacity <= 0.05) {
                  canvas.style.display = "none";
                  fadeTimerId = null;
                  return;
                }
              }
              fadeTimerId = window2.requestAnimationFrame(loop2);
            })();
          }
        };
        if (typeof module === "object" && typeof module.exports === "object") {
          module.exports = topbar2;
        } else if (typeof define === "function" && define.amd) {
          define(function() {
            return topbar2;
          });
        } else {
          this.topbar = topbar2;
        }
      }).call(exports, window, document);
    }
  });

  // node_modules/phoenix_live_view/priv/static/phoenix_live_view.js
  var require_phoenix_live_view = __commonJS({
    "node_modules/phoenix_live_view/priv/static/phoenix_live_view.js"(exports, module) {
      !function(e, t) {
        typeof exports == "object" && typeof module == "object" ? module.exports = t() : typeof define == "function" && define.amd ? define([], t) : typeof exports == "object" ? exports.phoenix_live_view = t() : e.phoenix_live_view = t();
      }(exports, function() {
        return function(e) {
          var t = {};
          function n(i) {
            if (t[i])
              return t[i].exports;
            var r = t[i] = { i, l: false, exports: {} };
            return e[i].call(r.exports, r, r.exports, n), r.l = true, r.exports;
          }
          return n.m = e, n.c = t, n.d = function(e2, t2, i) {
            n.o(e2, t2) || Object.defineProperty(e2, t2, { configurable: false, enumerable: true, get: i });
          }, n.r = function(e2) {
            Object.defineProperty(e2, "__esModule", { value: true });
          }, n.n = function(e2) {
            var t2 = e2 && e2.__esModule ? function() {
              return e2.default;
            } : function() {
              return e2;
            };
            return n.d(t2, "a", t2), t2;
          }, n.o = function(e2, t2) {
            return Object.prototype.hasOwnProperty.call(e2, t2);
          }, n.p = "", n(n.s = 2);
        }([function(e, t, n) {
          "use strict";
          n.r(t);
          var i, r = 11;
          var o = "http://www.w3.org/1999/xhtml", a = typeof document == "undefined" ? void 0 : document, u = !!a && "content" in a.createElement("template"), s = !!a && a.createRange && "createContextualFragment" in a.createRange();
          function c(e2) {
            return e2 = e2.trim(), u ? function(e3) {
              var t2 = a.createElement("template");
              return t2.innerHTML = e3, t2.content.childNodes[0];
            }(e2) : s ? function(e3) {
              return i || (i = a.createRange()).selectNode(a.body), i.createContextualFragment(e3).childNodes[0];
            }(e2) : function(e3) {
              var t2 = a.createElement("body");
              return t2.innerHTML = e3, t2.childNodes[0];
            }(e2);
          }
          function l(e2, t2) {
            var n2, i2, r2 = e2.nodeName, o2 = t2.nodeName;
            return r2 === o2 || (n2 = r2.charCodeAt(0), i2 = o2.charCodeAt(0), n2 <= 90 && i2 >= 97 ? r2 === o2.toUpperCase() : i2 <= 90 && n2 >= 97 && o2 === r2.toUpperCase());
          }
          function d(e2, t2, n2) {
            e2[n2] !== t2[n2] && (e2[n2] = t2[n2], e2[n2] ? e2.setAttribute(n2, "") : e2.removeAttribute(n2));
          }
          var h = { OPTION: function(e2, t2) {
            var n2 = e2.parentNode;
            if (n2) {
              var i2 = n2.nodeName.toUpperCase();
              i2 === "OPTGROUP" && (i2 = (n2 = n2.parentNode) && n2.nodeName.toUpperCase()), i2 !== "SELECT" || n2.hasAttribute("multiple") || (e2.hasAttribute("selected") && !t2.selected && (e2.setAttribute("selected", "selected"), e2.removeAttribute("selected")), n2.selectedIndex = -1);
            }
            d(e2, t2, "selected");
          }, INPUT: function(e2, t2) {
            d(e2, t2, "checked"), d(e2, t2, "disabled"), e2.value !== t2.value && (e2.value = t2.value), t2.hasAttribute("value") || e2.removeAttribute("value");
          }, TEXTAREA: function(e2, t2) {
            var n2 = t2.value;
            e2.value !== n2 && (e2.value = n2);
            var i2 = e2.firstChild;
            if (i2) {
              var r2 = i2.nodeValue;
              if (r2 == n2 || !n2 && r2 == e2.placeholder)
                return;
              i2.nodeValue = n2;
            }
          }, SELECT: function(e2, t2) {
            if (!t2.hasAttribute("multiple")) {
              for (var n2, i2, r2 = -1, o2 = 0, a2 = e2.firstChild; a2; )
                if ((i2 = a2.nodeName && a2.nodeName.toUpperCase()) === "OPTGROUP")
                  a2 = (n2 = a2).firstChild;
                else {
                  if (i2 === "OPTION") {
                    if (a2.hasAttribute("selected")) {
                      r2 = o2;
                      break;
                    }
                    o2++;
                  }
                  !(a2 = a2.nextSibling) && n2 && (a2 = n2.nextSibling, n2 = null);
                }
              e2.selectedIndex = r2;
            }
          } }, f = 1, v = 11, p = 3, g = 8;
          function m() {
          }
          function y(e2) {
            if (e2)
              return e2.getAttribute && e2.getAttribute("id") || e2.id;
          }
          var k = function(e2) {
            return function(t2, n2, i2) {
              if (i2 || (i2 = {}), typeof n2 == "string")
                if (t2.nodeName === "#document" || t2.nodeName === "HTML" || t2.nodeName === "BODY") {
                  var r2 = n2;
                  (n2 = a.createElement("html")).innerHTML = r2;
                } else
                  n2 = c(n2);
              var u2 = i2.getNodeKey || y, s2 = i2.onBeforeNodeAdded || m, d2 = i2.onNodeAdded || m, k2 = i2.onBeforeElUpdated || m, b2 = i2.onElUpdated || m, w2 = i2.onBeforeNodeDiscarded || m, E2 = i2.onNodeDiscarded || m, S2 = i2.onBeforeElChildrenUpdated || m, A2 = i2.childrenOnly === true, x2 = Object.create(null), C2 = [];
              function P2(e3) {
                C2.push(e3);
              }
              function L2(e3, t3, n3) {
                w2(e3) !== false && (t3 && t3.removeChild(e3), E2(e3), function e4(t4, n4) {
                  if (t4.nodeType === f)
                    for (var i3 = t4.firstChild; i3; ) {
                      var r3 = void 0;
                      n4 && (r3 = u2(i3)) ? P2(r3) : (E2(i3), i3.firstChild && e4(i3, n4)), i3 = i3.nextSibling;
                    }
                }(e3, n3));
              }
              function I2(e3) {
                d2(e3);
                for (var t3 = e3.firstChild; t3; ) {
                  var n3 = t3.nextSibling, i3 = u2(t3);
                  if (i3) {
                    var r3 = x2[i3];
                    r3 && l(t3, r3) ? (t3.parentNode.replaceChild(r3, t3), T2(r3, t3)) : I2(t3);
                  } else
                    I2(t3);
                  t3 = n3;
                }
              }
              function T2(t3, n3, i3) {
                var r3 = u2(n3);
                if (r3 && delete x2[r3], !i3) {
                  if (k2(t3, n3) === false)
                    return;
                  if (e2(t3, n3), b2(t3), S2(t3, n3) === false)
                    return;
                }
                t3.nodeName !== "TEXTAREA" ? function(e3, t4) {
                  var n4, i4, r4, o2, c2, d3 = t4.firstChild, v2 = e3.firstChild;
                  e:
                    for (; d3; ) {
                      for (o2 = d3.nextSibling, n4 = u2(d3); v2; ) {
                        if (r4 = v2.nextSibling, d3.isSameNode && d3.isSameNode(v2)) {
                          d3 = o2, v2 = r4;
                          continue e;
                        }
                        i4 = u2(v2);
                        var m2 = v2.nodeType, y2 = void 0;
                        if (m2 === d3.nodeType && (m2 === f ? (n4 ? n4 !== i4 && ((c2 = x2[n4]) ? r4 === c2 ? y2 = false : (e3.insertBefore(c2, v2), i4 ? P2(i4) : L2(v2, e3, true), v2 = c2) : y2 = false) : i4 && (y2 = false), (y2 = y2 !== false && l(v2, d3)) && T2(v2, d3)) : m2 !== p && m2 != g || (y2 = true, v2.nodeValue !== d3.nodeValue && (v2.nodeValue = d3.nodeValue))), y2) {
                          d3 = o2, v2 = r4;
                          continue e;
                        }
                        i4 ? P2(i4) : L2(v2, e3, true), v2 = r4;
                      }
                      if (n4 && (c2 = x2[n4]) && l(c2, d3))
                        e3.appendChild(c2), T2(c2, d3);
                      else {
                        var k3 = s2(d3);
                        k3 !== false && (k3 && (d3 = k3), d3.actualize && (d3 = d3.actualize(e3.ownerDocument || a)), e3.appendChild(d3), I2(d3));
                      }
                      d3 = o2, v2 = r4;
                    }
                  !function(e4, t5, n5) {
                    for (; t5; ) {
                      var i5 = t5.nextSibling;
                      (n5 = u2(t5)) ? P2(n5) : L2(t5, e4, true), t5 = i5;
                    }
                  }(e3, v2, i4);
                  var b3 = h[e3.nodeName];
                  b3 && b3(e3, t4);
                }(t3, n3) : h.TEXTAREA(t3, n3);
              }
              !function e3(t3) {
                if (t3.nodeType === f || t3.nodeType === v)
                  for (var n3 = t3.firstChild; n3; ) {
                    var i3 = u2(n3);
                    i3 && (x2[i3] = n3), e3(n3), n3 = n3.nextSibling;
                  }
              }(t2);
              var D2 = t2, _2 = D2.nodeType, N2 = n2.nodeType;
              if (!A2) {
                if (_2 === f)
                  N2 === f ? l(t2, n2) || (E2(t2), D2 = function(e3, t3) {
                    for (var n3 = e3.firstChild; n3; ) {
                      var i3 = n3.nextSibling;
                      t3.appendChild(n3), n3 = i3;
                    }
                    return t3;
                  }(t2, function(e3, t3) {
                    return t3 && t3 !== o ? a.createElementNS(t3, e3) : a.createElement(e3);
                  }(n2.nodeName, n2.namespaceURI))) : D2 = n2;
                else if (_2 === p || _2 === g) {
                  if (N2 === _2)
                    return D2.nodeValue !== n2.nodeValue && (D2.nodeValue = n2.nodeValue), D2;
                  D2 = n2;
                }
              }
              if (D2 === n2)
                E2(t2);
              else {
                if (n2.isSameNode && n2.isSameNode(D2))
                  return;
                if (T2(D2, n2, A2), C2)
                  for (var R2 = 0, O2 = C2.length; R2 < O2; R2++) {
                    var j2 = x2[C2[R2]];
                    j2 && L2(j2, j2.parentNode, false);
                  }
              }
              return !A2 && D2 !== t2 && t2.parentNode && (D2.actualize && (D2 = D2.actualize(t2.ownerDocument || a)), t2.parentNode.replaceChild(D2, t2)), D2;
            };
          }(function(e2, t2) {
            var n2, i2, o2, a2, u2 = t2.attributes;
            if (t2.nodeType !== r && e2.nodeType !== r) {
              for (var s2 = u2.length - 1; s2 >= 0; s2--)
                i2 = (n2 = u2[s2]).name, o2 = n2.namespaceURI, a2 = n2.value, o2 ? (i2 = n2.localName || i2, e2.getAttributeNS(o2, i2) !== a2 && (n2.prefix === "xmlns" && (i2 = n2.name), e2.setAttributeNS(o2, i2, a2))) : e2.getAttribute(i2) !== a2 && e2.setAttribute(i2, a2);
              for (var c2 = e2.attributes, l2 = c2.length - 1; l2 >= 0; l2--)
                i2 = (n2 = c2[l2]).name, (o2 = n2.namespaceURI) ? (i2 = n2.localName || i2, t2.hasAttributeNS(o2, i2) || e2.removeAttributeNS(o2, i2)) : t2.hasAttribute(i2) || e2.removeAttribute(i2);
            }
          });
          function b(e2) {
            return L(e2) || E(e2) || I(e2) || P();
          }
          function w(e2) {
            return function(e3) {
              if (Array.isArray(e3))
                return T(e3);
            }(e2) || E(e2) || I(e2) || function() {
              throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
            }();
          }
          function E(e2) {
            if (typeof Symbol != "undefined" && Symbol.iterator in Object(e2))
              return Array.from(e2);
          }
          function S(e2, t2) {
            var n2 = Object.keys(e2);
            if (Object.getOwnPropertySymbols) {
              var i2 = Object.getOwnPropertySymbols(e2);
              t2 && (i2 = i2.filter(function(t3) {
                return Object.getOwnPropertyDescriptor(e2, t3).enumerable;
              })), n2.push.apply(n2, i2);
            }
            return n2;
          }
          function A(e2) {
            for (var t2 = 1; t2 < arguments.length; t2++) {
              var n2 = arguments[t2] != null ? arguments[t2] : {};
              t2 % 2 ? S(Object(n2), true).forEach(function(t3) {
                x(e2, t3, n2[t3]);
              }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(n2)) : S(Object(n2)).forEach(function(t3) {
                Object.defineProperty(e2, t3, Object.getOwnPropertyDescriptor(n2, t3));
              });
            }
            return e2;
          }
          function x(e2, t2, n2) {
            return t2 in e2 ? Object.defineProperty(e2, t2, { value: n2, enumerable: true, configurable: true, writable: true }) : e2[t2] = n2, e2;
          }
          function C(e2, t2) {
            return L(e2) || function(e3, t3) {
              if (typeof Symbol == "undefined" || !(Symbol.iterator in Object(e3)))
                return;
              var n2 = [], i2 = true, r2 = false, o2 = void 0;
              try {
                for (var a2, u2 = e3[Symbol.iterator](); !(i2 = (a2 = u2.next()).done) && (n2.push(a2.value), !t3 || n2.length !== t3); i2 = true)
                  ;
              } catch (e4) {
                r2 = true, o2 = e4;
              } finally {
                try {
                  i2 || u2.return == null || u2.return();
                } finally {
                  if (r2)
                    throw o2;
                }
              }
              return n2;
            }(e2, t2) || I(e2, t2) || P();
          }
          function P() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
          }
          function L(e2) {
            if (Array.isArray(e2))
              return e2;
          }
          function I(e2, t2) {
            if (e2) {
              if (typeof e2 == "string")
                return T(e2, t2);
              var n2 = Object.prototype.toString.call(e2).slice(8, -1);
              return n2 === "Object" && e2.constructor && (n2 = e2.constructor.name), n2 === "Map" || n2 === "Set" ? Array.from(e2) : n2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2) ? T(e2, t2) : void 0;
            }
          }
          function T(e2, t2) {
            (t2 == null || t2 > e2.length) && (t2 = e2.length);
            for (var n2 = 0, i2 = new Array(t2); n2 < t2; n2++)
              i2[n2] = e2[n2];
            return i2;
          }
          function D(e2, t2) {
            if (!(e2 instanceof t2))
              throw new TypeError("Cannot call a class as a function");
          }
          function _(e2, t2) {
            for (var n2 = 0; n2 < t2.length; n2++) {
              var i2 = t2[n2];
              i2.enumerable = i2.enumerable || false, i2.configurable = true, "value" in i2 && (i2.writable = true), Object.defineProperty(e2, i2.key, i2);
            }
          }
          function N(e2, t2, n2) {
            return t2 && _(e2.prototype, t2), n2 && _(e2, n2), e2;
          }
          function R(e2) {
            "@babel/helpers - typeof";
            return (R = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e3) {
              return typeof e3;
            } : function(e3) {
              return e3 && typeof Symbol == "function" && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
            })(e2);
          }
          n.d(t, "debug", function() {
            return X;
          }), n.d(t, "Rendered", function() {
            return se;
          }), n.d(t, "LiveSocket", function() {
            return ce;
          }), n.d(t, "Browser", function() {
            return le;
          }), n.d(t, "DOM", function() {
            return de;
          }), n.d(t, "View", function() {
            return ve;
          });
          var O = [1e3, 3e3], j = "data-phx-view", H = ["phx-click-loading", "phx-change-loading", "phx-submit-loading", "phx-keydown-loading", "phx-keyup-loading", "phx-blur-loading", "phx-focus-loading"], M = "data-phx-component", F = "data-phx-ref", U = "data-phx-upload-ref", B = "[".concat(j, "]"), J = ["text", "textarea", "number", "email", "password", "search", "tel", "url", "date", "time"], V = ["checkbox", "radio"], W = 1, q = "phx-", z = { debounce: 300, throttle: 300 }, K = function(e2, t2) {
            return console.error && console.error(e2, t2);
          };
          var X = function(e2, t2, n2, i2) {
            e2.liveSocket.isDebugEnabled() && console.log("".concat(e2.id, " ").concat(t2, ": ").concat(n2, " - "), i2);
          }, $ = function(e2) {
            return typeof e2 == "function" ? e2 : function() {
              return e2;
            };
          }, G = function(e2) {
            return JSON.parse(JSON.stringify(e2));
          }, Y = function(e2, t2, n2) {
            do {
              if (e2.matches("[".concat(t2, "]")))
                return e2;
              e2 = e2.parentElement || e2.parentNode;
            } while (e2 !== null && e2.nodeType === 1 && !(n2 && n2.isSameNode(e2) || e2.matches(B)));
            return null;
          }, Q = function(e2) {
            return e2 !== null && R(e2) === "object" && !(e2 instanceof Array);
          }, Z = function(e2) {
            for (var t2 in e2)
              return false;
            return true;
          }, ee = function(e2, t2) {
            return e2 && t2(e2);
          }, te = function() {
            function e2(t2, n2, i2) {
              D(this, e2), this.ref = re.genFileRef(n2), this.fileEl = t2, this.file = n2, this.view = i2, this.meta = null, this._isCancelled = false, this._isDone = false, this._progress = 0, this._lastProgressSent = -1, this._onDone = function() {
              };
            }
            return N(e2, null, [{ key: "isActive", value: function(e3, t2) {
              var n2 = t2._phxRef === void 0, i2 = e3.getAttribute("data-phx-active-refs").split(",").indexOf(re.genFileRef(t2)) >= 0;
              return t2.size > 0 && (n2 || i2);
            } }, { key: "isPreflighted", value: function(e3, t2) {
              var n2 = e3.getAttribute("data-phx-preflighted-refs").split(",").indexOf(re.genFileRef(t2)) >= 0;
              return n2 && this.isActive(e3, t2);
            } }]), N(e2, [{ key: "metadata", value: function() {
              return this.meta;
            } }, { key: "progress", value: function(e3) {
              var t2 = this;
              this._progress = Math.floor(e3), this._progress > this._lastProgressSent && (this._progress >= 100 ? (this._progress = 100, this._lastProgressSent = 100, this._isDone = true, this.view.pushFileProgress(this.fileEl, this.ref, 100, function() {
                re.untrackFile(t2.fileEl, t2.file), t2._onDone();
              })) : (this._lastProgressSent = this._progress, this.view.pushFileProgress(this.fileEl, this.ref, this._progress)));
            } }, { key: "cancel", value: function() {
              this._isCancelled = true, this._isDone = true, this._onDone();
            } }, { key: "isDone", value: function() {
              return this._isDone;
            } }, { key: "error", value: function() {
              var e3 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "failed";
              re.clearFiles(this.fileEl), this.view.pushFileProgress(this.fileEl, this.ref, { error: e3 });
            } }, { key: "onDone", value: function(e3) {
              this._onDone = e3;
            } }, { key: "toPreflightPayload", value: function() {
              return { last_modified: this.file.lastModified, name: this.file.name, size: this.file.size, type: this.file.type, ref: this.ref };
            } }, { key: "uploader", value: function(e3) {
              if (this.meta.uploader) {
                var t2 = e3[this.meta.uploader] || K("no uploader configured for ".concat(this.meta.uploader));
                return { name: this.meta.uploader, callback: t2 };
              }
              return { name: "channel", callback: oe };
            } }, { key: "zipPostFlight", value: function(e3) {
              this.meta = e3.entries[this.ref], this.meta || K("no preflight upload response returned with ref ".concat(this.ref), { input: this.fileEl, response: e3 });
            } }]), e2;
          }(), ne = { LiveFileUpload: { preflightedRefs: function() {
            return this.el.getAttribute("data-phx-preflighted-refs");
          }, mounted: function() {
            this.preflightedWas = this.preflightedRefs();
          }, updated: function() {
            var e2 = this.preflightedRefs();
            this.preflightedWas !== e2 && (this.preflightedWas = e2, e2 === "" && this.__view.cancelSubmit(this.el.form));
          } } };
          ne.LiveImgPreview = { mounted: function() {
            var e2 = this;
            this.ref = this.el.getAttribute("data-phx-entry-ref"), this.inputEl = document.getElementById(this.el.getAttribute(U)), re.getEntryDataURL(this.inputEl, this.ref, function(t2) {
              return e2.el.src = t2;
            });
          } };
          var ie = 0, re = function() {
            function e2(t2, n2, i2) {
              D(this, e2), this.view = n2, this.onComplete = i2, this._entries = Array.from(e2.filesAwaitingPreflight(t2) || []).map(function(e3) {
                return new te(t2, e3, n2);
              }), this.numEntriesInProgress = this._entries.length;
            }
            return N(e2, null, [{ key: "genFileRef", value: function(e3) {
              var t2 = e3._phxRef;
              return t2 !== void 0 ? t2 : (e3._phxRef = (ie++).toString(), e3._phxRef);
            } }, { key: "getEntryDataURL", value: function(e3, t2, n2) {
              var i2 = this, r2 = this.activeFiles(e3).find(function(e4) {
                return i2.genFileRef(e4) === t2;
              }), o2 = new FileReader();
              o2.onload = function(e4) {
                return n2(e4.target.result);
              }, o2.readAsDataURL(r2);
            } }, { key: "hasUploadsInProgress", value: function(e3) {
              var t2 = 0;
              return de.findUploadInputs(e3).forEach(function(e4) {
                e4.getAttribute("data-phx-preflighted-refs") !== e4.getAttribute("data-phx-done-refs") && t2++;
              }), t2 > 0;
            } }, { key: "serializeUploads", value: function(e3) {
              var t2 = this, n2 = {};
              return this.activeFiles(e3, "serialize").forEach(function(i2) {
                var r2 = { path: e3.name }, o2 = e3.getAttribute(U);
                n2[o2] = n2[o2] || [], r2.ref = t2.genFileRef(i2), r2.name = i2.name, r2.type = i2.type, r2.size = i2.size, n2[o2].push(r2);
              }), n2;
            } }, { key: "clearFiles", value: function(e3) {
              e3.value = null, e3.removeAttribute(U), de.putPrivate(e3, "files", []);
            } }, { key: "untrackFile", value: function(e3, t2) {
              de.putPrivate(e3, "files", de.private(e3, "files").filter(function(e4) {
                return !Object.is(e4, t2);
              }));
            } }, { key: "trackFiles", value: function(e3, t2) {
              var n2 = this;
              if (e3.getAttribute("multiple") !== null) {
                var i2 = t2.filter(function(t3) {
                  return !n2.activeFiles(e3).find(function(e4) {
                    return Object.is(e4, t3);
                  });
                });
                de.putPrivate(e3, "files", this.activeFiles(e3).concat(i2)), e3.value = null;
              } else
                de.putPrivate(e3, "files", t2);
            } }, { key: "activeFileInputs", value: function(e3) {
              var t2 = this, n2 = de.findUploadInputs(e3);
              return Array.from(n2).filter(function(e4) {
                return e4.files && t2.activeFiles(e4).length > 0;
              });
            } }, { key: "activeFiles", value: function(e3) {
              return (de.private(e3, "files") || []).filter(function(t2) {
                return te.isActive(e3, t2);
              });
            } }, { key: "inputsAwaitingPreflight", value: function(e3) {
              var t2 = this, n2 = de.findUploadInputs(e3);
              return Array.from(n2).filter(function(e4) {
                return t2.filesAwaitingPreflight(e4).length > 0;
              });
            } }, { key: "filesAwaitingPreflight", value: function(e3) {
              return this.activeFiles(e3).filter(function(t2) {
                return !te.isPreflighted(e3, t2);
              });
            } }]), N(e2, [{ key: "entries", value: function() {
              return this._entries;
            } }, { key: "initAdapterUpload", value: function(e3, t2, n2) {
              var i2 = this;
              this._entries = this._entries.map(function(t3) {
                return t3.zipPostFlight(e3), t3.onDone(function() {
                  i2.numEntriesInProgress--, i2.numEntriesInProgress === 0 && i2.onComplete();
                }), t3;
              });
              var r2 = this._entries.reduce(function(e4, t3) {
                var i3 = t3.uploader(n2.uploaders), r3 = i3.name, o3 = i3.callback;
                return e4[r3] = e4[r3] || { callback: o3, entries: [] }, e4[r3].entries.push(t3), e4;
              }, {});
              for (var o2 in r2) {
                var a2 = r2[o2];
                (0, a2.callback)(a2.entries, t2, e3, n2);
              }
            } }]), e2;
          }(), oe = function(e2, t2, n2, i2) {
            e2.forEach(function(e3) {
              new ae(e3, n2.config.chunk_size, i2).upload();
            });
          }, ae = function() {
            function e2(t2, n2, i2) {
              D(this, e2), this.liveSocket = i2, this.entry = t2, this.offset = 0, this.chunkSize = n2, this.chunkTimer = null, this.uploadChannel = i2.channel("lvu:".concat(t2.ref), { token: t2.metadata() });
            }
            return N(e2, [{ key: "error", value: function(e3) {
              clearTimeout(this.chunkTimer), this.uploadChannel.leave(), this.entry.error(e3);
            } }, { key: "upload", value: function() {
              var e3 = this;
              this.uploadChannel.onError(function(t2) {
                return e3.error(t2);
              }), this.uploadChannel.join().receive("ok", function(t2) {
                return e3.readNextChunk();
              }).receive("error", function(t2) {
                return e3.error(t2);
              });
            } }, { key: "isDone", value: function() {
              return this.offset >= this.entry.file.size;
            } }, { key: "readNextChunk", value: function() {
              var e3 = this, t2 = new window.FileReader(), n2 = this.entry.file.slice(this.offset, this.chunkSize + this.offset);
              t2.onload = function(t3) {
                if (t3.target.error !== null)
                  return K("Read error: " + t3.target.error);
                e3.offset += t3.target.result.byteLength, e3.pushChunk(t3.target.result);
              }, t2.readAsArrayBuffer(n2);
            } }, { key: "pushChunk", value: function(e3) {
              var t2 = this;
              this.uploadChannel.isJoined() && this.uploadChannel.push("chunk", e3).receive("ok", function() {
                t2.entry.progress(t2.offset / t2.entry.file.size * 100), t2.isDone() || (t2.chunkTimer = setTimeout(function() {
                  return t2.readNextChunk();
                }, t2.liveSocket.getLatencySim() || 0));
              });
            } }]), e2;
          }(), ue = function(e2) {
            var t2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n2 = new FormData(e2), i2 = [];
            n2.forEach(function(e3, t3, n3) {
              e3 instanceof File && i2.push(t3);
            }), i2.forEach(function(e3) {
              return n2.delete(e3);
            });
            var r2, o2 = new URLSearchParams(), a2 = function(e3) {
              if (typeof Symbol == "undefined" || e3[Symbol.iterator] == null) {
                if (Array.isArray(e3) || (e3 = I(e3))) {
                  var t3 = 0, n3 = function() {
                  };
                  return { s: n3, n: function() {
                    return t3 >= e3.length ? { done: true } : { done: false, value: e3[t3++] };
                  }, e: function(e4) {
                    throw e4;
                  }, f: n3 };
                }
                throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
              }
              var i3, r3, o3 = true, a3 = false;
              return { s: function() {
                i3 = e3[Symbol.iterator]();
              }, n: function() {
                var e4 = i3.next();
                return o3 = e4.done, e4;
              }, e: function(e4) {
                a3 = true, r3 = e4;
              }, f: function() {
                try {
                  o3 || i3.return == null || i3.return();
                } finally {
                  if (a3)
                    throw r3;
                }
              } };
            }(n2.entries());
            try {
              for (a2.s(); !(r2 = a2.n()).done; ) {
                var u2 = C(r2.value, 2), s2 = u2[0], c2 = u2[1];
                o2.append(s2, c2);
              }
            } catch (e3) {
              a2.e(e3);
            } finally {
              a2.f();
            }
            for (var l2 in t2)
              o2.append(l2, t2[l2]);
            return o2.toString();
          }, se = function() {
            function e2(t2, n2) {
              D(this, e2), this.viewId = t2, this.rendered = {}, this.mergeDiff(n2);
            }
            return N(e2, null, [{ key: "extract", value: function(e3) {
              var t2 = e3.r, n2 = e3.e, i2 = e3.t;
              return delete e3.r, delete e3.e, delete e3.t, { diff: e3, title: i2, reply: t2 || null, events: n2 || [] };
            } }]), N(e2, [{ key: "parentViewId", value: function() {
              return this.viewId;
            } }, { key: "toString", value: function(e3) {
              return this.recursiveToString(this.rendered, this.rendered.c, e3);
            } }, { key: "recursiveToString", value: function(e3) {
              var t2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e3.c, n2 = arguments.length > 2 ? arguments[2] : void 0, i2 = { buffer: "", components: t2, onlyCids: n2 = n2 ? new Set(n2) : null };
              return this.toOutputBuffer(e3, i2), i2.buffer;
            } }, { key: "componentCIDs", value: function(e3) {
              return Object.keys(e3.c || {}).map(function(e4) {
                return parseInt(e4);
              });
            } }, { key: "isComponentOnlyDiff", value: function(e3) {
              return !!e3.c && Object.keys(e3).length === 1;
            } }, { key: "getComponent", value: function(e3, t2) {
              return e3.c[t2];
            } }, { key: "mergeDiff", value: function(e3) {
              var t2 = e3.c, n2 = {};
              if (delete e3.c, this.rendered = this.mutableMerge(this.rendered, e3), this.rendered.c = this.rendered.c || {}, t2) {
                var i2 = this.rendered.c;
                for (var r2 in t2)
                  t2[r2] = this.cachedFindComponent(r2, t2[r2], i2, t2, n2);
                for (var o2 in t2)
                  i2[o2] = t2[o2];
                e3.c = t2;
              }
            } }, { key: "cachedFindComponent", value: function(e3, t2, n2, i2, r2) {
              if (r2[e3])
                return r2[e3];
              var o2, a2, u2, s2 = t2.s;
              return typeof s2 == "number" ? (a2 = (u2 = s2 > 0 ? this.cachedFindComponent(s2, i2[s2], n2, i2, r2) : n2[-s2]).s, (o2 = this.cloneMerge(u2, t2)).s = a2) : o2 = t2.s !== void 0 ? t2 : this.cloneMerge(n2[e3] || {}, t2), r2[e3] = o2, o2;
            } }, { key: "mutableMerge", value: function(e3, t2) {
              return t2.s !== void 0 ? t2 : (this.doMutableMerge(e3, t2), e3);
            } }, { key: "doMutableMerge", value: function(e3, t2) {
              for (var n2 in t2) {
                var i2 = t2[n2], r2 = e3[n2];
                Q(i2) && i2.s === void 0 && Q(r2) ? this.doMutableMerge(r2, i2) : e3[n2] = i2;
              }
            } }, { key: "cloneMerge", value: function(e3, t2) {
              var n2 = A(A({}, e3), t2);
              for (var i2 in n2) {
                var r2 = t2[i2], o2 = e3[i2];
                Q(r2) && r2.s === void 0 && Q(o2) && (n2[i2] = this.cloneMerge(o2, r2));
              }
              return n2;
            } }, { key: "componentToString", value: function(e3) {
              return this.recursiveCIDToString(this.rendered.c, e3);
            } }, { key: "pruneCIDs", value: function(e3) {
              var t2 = this;
              e3.forEach(function(e4) {
                return delete t2.rendered.c[e4];
              });
            } }, { key: "get", value: function() {
              return this.rendered;
            } }, { key: "isNewFingerprint", value: function() {
              return !!(arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}).s;
            } }, { key: "toOutputBuffer", value: function(e3, t2) {
              if (e3.d)
                return this.comprehensionToBuffer(e3, t2);
              var n2 = e3.s;
              t2.buffer += n2[0];
              for (var i2 = 1; i2 < n2.length; i2++)
                this.dynamicToBuffer(e3[i2 - 1], t2), t2.buffer += n2[i2];
            } }, { key: "comprehensionToBuffer", value: function(e3, t2) {
              for (var n2 = e3.d, i2 = e3.s, r2 = 0; r2 < n2.length; r2++) {
                var o2 = n2[r2];
                t2.buffer += i2[0];
                for (var a2 = 1; a2 < i2.length; a2++)
                  this.dynamicToBuffer(o2[a2 - 1], t2), t2.buffer += i2[a2];
              }
            } }, { key: "dynamicToBuffer", value: function(e3, t2) {
              typeof e3 == "number" ? t2.buffer += this.recursiveCIDToString(t2.components, e3, t2.onlyCids) : Q(e3) ? this.toOutputBuffer(e3, t2) : t2.buffer += e3;
            } }, { key: "recursiveCIDToString", value: function(e3, t2, n2) {
              var i2 = this, r2 = e3[t2] || K("no component for CID ".concat(t2), e3), o2 = document.createElement("template");
              o2.innerHTML = this.recursiveToString(r2, e3, n2);
              var a2 = o2.content, u2 = n2 && !n2.has(t2), s2 = C(Array.from(a2.childNodes).reduce(function(e4, n3, r3) {
                var a3 = C(e4, 2), s3 = a3[0], c3 = a3[1];
                return n3.nodeType === Node.ELEMENT_NODE ? n3.getAttribute(M) ? [s3, true] : (n3.setAttribute(M, t2), n3.id || (n3.id = "".concat(i2.parentViewId(), "-").concat(t2, "-").concat(r3)), u2 && (n3.setAttribute("data-phx-skip", ""), n3.innerHTML = ""), [true, c3]) : n3.nodeValue.trim() !== "" ? (K("only HTML element tags are allowed at the root of components.\n\n" + 'got: "'.concat(n3.nodeValue.trim(), '"\n\n') + "within:\n", o2.innerHTML.trim()), n3.replaceWith(i2.createSpan(n3.nodeValue, t2)), [true, c3]) : (n3.remove(), [s3, c3]);
              }, [false, false]), 2), c2 = s2[0], l2 = s2[1];
              return c2 || l2 ? !c2 && l2 ? (K("expected at least one HTML element tag directly inside a component, but only subcomponents were found. A component must render at least one HTML tag directly inside itself.", o2.innerHTML.trim()), o2.innerHTML) : o2.innerHTML : (K("expected at least one HTML element tag inside a component, but the component is empty:\n", o2.innerHTML.trim()), this.createSpan("", t2).outerHTML);
            } }, { key: "createSpan", value: function(e3, t2) {
              var n2 = document.createElement("span");
              return n2.innerText = e3, n2.setAttribute(M, t2), n2;
            } }]), e2;
          }(), ce = function() {
            function e2(t2, n2) {
              var i2 = this, r2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
              if (D(this, e2), this.unloaded = false, !n2 || n2.constructor.name === "Object")
                throw new Error('\n      a phoenix Socket must be provided as the second argument to the LiveSocket constructor. For example:\n\n          import {Socket} from "phoenix"\n          import {LiveSocket} from "phoenix_live_view"\n          let liveSocket = new LiveSocket("/live", Socket, {...})\n      ');
              this.socket = new n2(t2, r2), this.bindingPrefix = r2.bindingPrefix || q, this.opts = r2, this.params = $(r2.params || {}), this.viewLogger = r2.viewLogger, this.metadataCallbacks = r2.metadata || {}, this.defaults = Object.assign(G(z), r2.defaults || {}), this.activeElement = null, this.prevActive = null, this.silenced = false, this.main = null, this.linkRef = 1, this.roots = {}, this.href = window.location.href, this.pendingLink = null, this.currentLocation = G(window.location), this.hooks = r2.hooks || {}, this.uploaders = r2.uploaders || {}, this.loaderTimeout = r2.loaderTimeout || W, this.localStorage = r2.localStorage || window.localStorage, this.sessionStorage = r2.sessionStorage || window.sessionStorage, this.boundTopLevelEvents = false, this.domCallbacks = Object.assign({ onNodeAdded: $(), onBeforeElUpdated: $() }, r2.dom || {}), window.addEventListener("pagehide", function(e3) {
                i2.unloaded = true;
              }), this.socket.onOpen(function() {
                i2.isUnloaded() && window.location.reload();
              });
            }
            return N(e2, [{ key: "isProfileEnabled", value: function() {
              return this.sessionStorage.getItem("phx:live-socket:profiling") === "true";
            } }, { key: "isDebugEnabled", value: function() {
              return this.sessionStorage.getItem("phx:live-socket:debug") === "true";
            } }, { key: "enableDebug", value: function() {
              this.sessionStorage.setItem("phx:live-socket:debug", "true");
            } }, { key: "enableProfiling", value: function() {
              this.sessionStorage.setItem("phx:live-socket:profiling", "true");
            } }, { key: "disableDebug", value: function() {
              this.sessionStorage.removeItem("phx:live-socket:debug");
            } }, { key: "disableProfiling", value: function() {
              this.sessionStorage.removeItem("phx:live-socket:profiling");
            } }, { key: "enableLatencySim", value: function(e3) {
              this.enableDebug(), console.log("latency simulator enabled for the duration of this browser session. Call disableLatencySim() to disable"), this.sessionStorage.setItem("phx:live-socket:latency-sim", e3);
            } }, { key: "disableLatencySim", value: function() {
              this.sessionStorage.removeItem("phx:live-socket:latency-sim");
            } }, { key: "getLatencySim", value: function() {
              var e3 = this.sessionStorage.getItem("phx:live-socket:latency-sim");
              return e3 ? parseInt(e3) : null;
            } }, { key: "getSocket", value: function() {
              return this.socket;
            } }, { key: "connect", value: function() {
              var e3 = this, t2 = function() {
                e3.joinRootViews() && (e3.bindTopLevelEvents(), e3.socket.connect());
              };
              ["complete", "loaded", "interactive"].indexOf(document.readyState) >= 0 ? t2() : document.addEventListener("DOMContentLoaded", function() {
                return t2();
              });
            } }, { key: "disconnect", value: function(e3) {
              this.socket.disconnect(e3);
            } }, { key: "triggerDOM", value: function(e3, t2) {
              var n2;
              (n2 = this.domCallbacks)[e3].apply(n2, w(t2));
            } }, { key: "time", value: function(e3, t2) {
              if (!this.isProfileEnabled() || !console.time)
                return t2();
              console.time(e3);
              var n2 = t2();
              return console.timeEnd(e3), n2;
            } }, { key: "log", value: function(e3, t2, n2) {
              if (this.viewLogger) {
                var i2 = C(n2(), 2), r2 = i2[0], o2 = i2[1];
                this.viewLogger(e3, t2, r2, o2);
              } else if (this.isDebugEnabled()) {
                var a2 = C(n2(), 2), u2 = a2[0], s2 = a2[1];
                X(e3, t2, u2, s2);
              }
            } }, { key: "onChannel", value: function(e3, t2, n2) {
              var i2 = this;
              e3.on(t2, function(e4) {
                var t3 = i2.getLatencySim();
                t3 ? (console.log("simulating ".concat(t3, "ms of latency from server to client")), setTimeout(function() {
                  return n2(e4);
                }, t3)) : n2(e4);
              });
            } }, { key: "wrapPush", value: function(e3, t2, n2) {
              var i2 = this, r2 = this.getLatencySim(), o2 = e3.joinCount;
              if (!r2)
                return t2.timeout ? n2().receive("timeout", function() {
                  e3.joinCount === o2 && i2.reloadWithJitter(e3, function() {
                    i2.log(e3, "timeout", function() {
                      return ["received timeout while communicating with server. Falling back to hard refresh for recovery"];
                    });
                  });
                }) : n2();
              console.log("simulating ".concat(r2, "ms of latency from client to server"));
              var a2 = { receives: [], receive: function(e4, t3) {
                this.receives.push([e4, t3]);
              } };
              return setTimeout(function() {
                a2.receives.reduce(function(e4, t3) {
                  var n3 = C(t3, 2), i3 = n3[0], r3 = n3[1];
                  return e4.receive(i3, r3);
                }, n2());
              }, r2), a2;
            } }, { key: "reloadWithJitter", value: function(e3, t2) {
              var n2 = this;
              e3.destroy(), this.disconnect();
              var i2 = O[0], r2 = O[1], o2 = Math.floor(Math.random() * (r2 - i2 + 1)) + i2, a2 = le.updateLocal(this.localStorage, e3.name(), "consecutive-reloads", 0, function(e4) {
                return e4 + 1;
              });
              t2 ? t2() : this.log(e3, "join", function() {
                return ["encountered ".concat(a2, " consecutive reloads")];
              }), a2 > 10 && (this.log(e3, "join", function() {
                return ["exceeded ".concat(10, " consecutive reloads. Entering failsafe mode")];
              }), o2 = 3e4), setTimeout(function() {
                n2.hasPendingLink() ? window.location = n2.pendingLink : window.location.reload();
              }, o2);
            } }, { key: "getHookCallbacks", value: function(e3) {
              return e3 && e3.startsWith("Phoenix.") ? ne[e3.split(".")[1]] : this.hooks[e3];
            } }, { key: "isUnloaded", value: function() {
              return this.unloaded;
            } }, { key: "isConnected", value: function() {
              return this.socket.isConnected();
            } }, { key: "getBindingPrefix", value: function() {
              return this.bindingPrefix;
            } }, { key: "binding", value: function(e3) {
              return "".concat(this.getBindingPrefix()).concat(e3);
            } }, { key: "channel", value: function(e3, t2) {
              return this.socket.channel(e3, t2);
            } }, { key: "joinRootViews", value: function() {
              var e3 = this, t2 = false;
              return de.all(document, "".concat(B, ":not([").concat("data-phx-parent-id", "])"), function(n2) {
                if (!e3.getRootById(n2.id)) {
                  var i2 = e3.joinRootView(n2, e3.getHref());
                  e3.root = e3.root || i2, n2.getAttribute("data-phx-main") && (e3.main = i2);
                }
                t2 = true;
              }), t2;
            } }, { key: "redirect", value: function(e3, t2) {
              this.disconnect(), le.redirect(e3, t2);
            } }, { key: "replaceMain", value: function(e3, t2) {
              var n2 = this, i2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null, r2 = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : this.setPendingLink(e3), o2 = this.main.el;
              this.main.showLoader(this.loaderTimeout), this.main.destroy(), le.fetchPage(e3, function(a2, u2) {
                if (a2 !== 200)
                  return n2.redirect(e3);
                var s2 = document.createElement("template");
                s2.innerHTML = u2;
                var c2 = s2.content.childNodes[0];
                if (!c2 || !n2.isPhxView(c2))
                  return n2.redirect(e3);
                n2.joinRootView(c2, e3, t2, function(e4, t3) {
                  t3 === 1 && (n2.commitPendingLink(r2) ? (o2.replaceWith(e4.el), n2.main = e4, i2 && i2()) : e4.destroy());
                });
              });
            } }, { key: "isPhxView", value: function(e3) {
              return e3.getAttribute && e3.getAttribute(j) !== null;
            } }, { key: "joinRootView", value: function(e3, t2, n2, i2) {
              var r2 = new ve(e3, this, null, t2, n2);
              return this.roots[r2.id] = r2, r2.join(i2), r2;
            } }, { key: "owner", value: function(e3, t2) {
              var n2 = this, i2 = ee(e3.closest(B), function(e4) {
                return n2.getViewByEl(e4);
              });
              i2 && t2(i2);
            } }, { key: "withinOwners", value: function(e3, t2) {
              var n2 = this;
              this.owner(e3, function(i2) {
                var r2 = e3.getAttribute(n2.binding("target"));
                r2 === null ? t2(i2, e3) : i2.withinTargets(r2, t2);
              });
            } }, { key: "getViewByEl", value: function(e3) {
              var t2 = e3.getAttribute("data-phx-root-id");
              return ee(this.getRootById(t2), function(t3) {
                return t3.getDescendentByEl(e3);
              });
            } }, { key: "getRootById", value: function(e3) {
              return this.roots[e3];
            } }, { key: "destroyAllViews", value: function() {
              for (var e3 in this.roots)
                this.roots[e3].destroy(), delete this.roots[e3];
            } }, { key: "destroyViewByEl", value: function(e3) {
              var t2 = this.getRootById(e3.getAttribute("data-phx-root-id"));
              t2 && t2.destroyDescendent(e3.id);
            } }, { key: "setActiveElement", value: function(e3) {
              var t2 = this;
              if (this.activeElement !== e3) {
                this.activeElement = e3;
                var n2 = function() {
                  e3 === t2.activeElement && (t2.activeElement = null), e3.removeEventListener("mouseup", t2), e3.removeEventListener("touchend", t2);
                };
                e3.addEventListener("mouseup", n2), e3.addEventListener("touchend", n2);
              }
            } }, { key: "getActiveElement", value: function() {
              return document.activeElement === document.body ? this.activeElement || document.activeElement : document.activeElement || document.body;
            } }, { key: "dropActiveElement", value: function(e3) {
              this.prevActive && e3.ownsElement(this.prevActive) && (this.prevActive = null);
            } }, { key: "restorePreviouslyActiveFocus", value: function() {
              this.prevActive && this.prevActive !== document.body && this.prevActive.focus();
            } }, { key: "blurActiveElement", value: function() {
              this.prevActive = this.getActiveElement(), this.prevActive !== document.body && this.prevActive.blur();
            } }, { key: "bindTopLevelEvents", value: function() {
              var e3 = this;
              this.boundTopLevelEvents || (this.boundTopLevelEvents = true, document.body.addEventListener("click", function() {
              }), window.addEventListener("pageshow", function(t2) {
                t2.persisted && (e3.getSocket().disconnect(), e3.withPageLoading({ to: window.location.href, kind: "redirect" }), window.location.reload());
              }, true), this.bindClicks(), this.bindNav(), this.bindForms(), this.bind({ keyup: "keyup", keydown: "keydown" }, function(t2, n2, i2, r2, o2, a2, u2) {
                var s2 = r2.getAttribute(e3.binding("key")), c2 = t2.key && t2.key.toLowerCase();
                s2 && s2.toLowerCase() !== c2 || i2.pushKey(r2, o2, n2, a2, A({ key: t2.key }, e3.eventMeta(n2, t2, r2)));
              }), this.bind({ blur: "focusout", focus: "focusin" }, function(t2, n2, i2, r2, o2, a2, u2) {
                u2 || i2.pushEvent(n2, r2, o2, a2, e3.eventMeta(n2, t2, r2));
              }), this.bind({ blur: "blur", focus: "focus" }, function(t2, n2, i2, r2, o2, a2, u2) {
                u2 && !u2 !== "window" && i2.pushEvent(n2, r2, o2, a2, e3.eventMeta(n2, t2, r2));
              }), window.addEventListener("dragover", function(e4) {
                return e4.preventDefault();
              }), window.addEventListener("drop", function(t2) {
                t2.preventDefault();
                var n2 = ee(Y(t2.target, e3.binding("drop-target")), function(t3) {
                  return t3.getAttribute(e3.binding("drop-target"));
                }), i2 = n2 && document.getElementById(n2), r2 = Array.from(t2.dataTransfer.files || []);
                i2 && !i2.disabled && r2.length !== 0 && i2.files instanceof FileList && (re.trackFiles(i2, r2), i2.dispatchEvent(new Event("input", { bubbles: true })));
              }));
            } }, { key: "eventMeta", value: function(e3, t2, n2) {
              var i2 = this.metadataCallbacks[e3];
              return i2 ? i2(t2, n2) : {};
            } }, { key: "setPendingLink", value: function(e3) {
              return this.linkRef++, this.pendingLink = e3, this.linkRef;
            } }, { key: "commitPendingLink", value: function(e3) {
              return this.linkRef === e3 && (this.href = this.pendingLink, this.pendingLink = null, true);
            } }, { key: "getHref", value: function() {
              return this.href;
            } }, { key: "hasPendingLink", value: function() {
              return !!this.pendingLink;
            } }, { key: "bind", value: function(e3, t2) {
              var n2 = this, i2 = function(i3) {
                var r3 = e3[i3];
                n2.on(r3, function(e4) {
                  var r4 = n2.binding(i3), o2 = n2.binding("window-".concat(i3)), a2 = e4.target.getAttribute && e4.target.getAttribute(r4);
                  a2 ? n2.debounce(e4.target, e4, function() {
                    n2.withinOwners(e4.target, function(n3, r5) {
                      t2(e4, i3, n3, e4.target, r5, a2, null);
                    });
                  }) : de.all(document, "[".concat(o2, "]"), function(r5) {
                    var a3 = r5.getAttribute(o2);
                    n2.debounce(r5, e4, function() {
                      n2.withinOwners(r5, function(n3, o3) {
                        t2(e4, i3, n3, r5, o3, a3, "window");
                      });
                    });
                  });
                });
              };
              for (var r2 in e3)
                i2(r2);
            } }, { key: "bindClicks", value: function() {
              this.bindClick("click", "click", false), this.bindClick("mousedown", "capture-click", true);
            } }, { key: "bindClick", value: function(e3, t2, n2) {
              var i2 = this, r2 = this.binding(t2);
              window.addEventListener(e3, function(e4) {
                if (i2.isConnected()) {
                  var t3 = null, o2 = (t3 = n2 ? e4.target.matches("[".concat(r2, "]")) ? e4.target : e4.target.querySelector("[".concat(r2, "]")) : Y(e4.target, r2)) && t3.getAttribute(r2);
                  o2 && (t3.getAttribute("href") === "#" && e4.preventDefault(), i2.debounce(t3, e4, function() {
                    i2.withinOwners(t3, function(n3, r3) {
                      n3.pushEvent("click", t3, r3, o2, i2.eventMeta("click", e4, t3));
                    });
                  }));
                }
              }, n2);
            } }, { key: "bindNav", value: function() {
              var e3 = this;
              if (le.canPushState()) {
                history.scrollRestoration && (history.scrollRestoration = "manual");
                var t2 = null;
                window.addEventListener("scroll", function(e4) {
                  clearTimeout(t2), t2 = setTimeout(function() {
                    le.updateCurrentState(function(e5) {
                      return Object.assign(e5, { scroll: window.scrollY });
                    });
                  }, 100);
                }), window.addEventListener("popstate", function(t3) {
                  if (e3.registerNewLocation(window.location)) {
                    var n2 = t3.state || {}, i2 = n2.type, r2 = n2.id, o2 = n2.root, a2 = n2.scroll, u2 = window.location.href;
                    e3.main.isConnected() && i2 === "patch" && r2 === e3.main.id ? e3.main.pushLinkPatch(u2, null) : e3.replaceMain(u2, null, function() {
                      o2 && e3.replaceRootHistory(), typeof a2 == "number" && setTimeout(function() {
                        window.scrollTo(0, a2);
                      }, 0);
                    });
                  }
                }, false), window.addEventListener("click", function(t3) {
                  var n2 = Y(t3.target, "data-phx-link"), i2 = n2 && n2.getAttribute("data-phx-link"), r2 = t3.metaKey || t3.ctrlKey || t3.button === 1;
                  if (i2 && e3.isConnected() && e3.main && !r2) {
                    var o2 = n2.href, a2 = n2.getAttribute("data-phx-link-state");
                    if (t3.preventDefault(), e3.pendingLink !== o2)
                      if (i2 === "patch")
                        e3.pushHistoryPatch(o2, a2, n2);
                      else {
                        if (i2 !== "redirect")
                          throw new Error("expected ".concat("data-phx-link", ' to be "patch" or "redirect", got: ').concat(i2));
                        e3.historyRedirect(o2, a2);
                      }
                  }
                }, false);
              }
            } }, { key: "withPageLoading", value: function(e3, t2) {
              de.dispatchEvent(window, "phx:page-loading-start", e3);
              var n2 = function() {
                return de.dispatchEvent(window, "phx:page-loading-stop", e3);
              };
              return t2 ? t2(n2) : n2;
            } }, { key: "pushHistoryPatch", value: function(e3, t2, n2) {
              var i2 = this;
              this.withPageLoading({ to: e3, kind: "patch" }, function(r2) {
                i2.main.pushLinkPatch(e3, n2, function(n3) {
                  i2.historyPatch(e3, t2, n3), r2();
                });
              });
            } }, { key: "historyPatch", value: function(e3, t2) {
              var n2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : this.setPendingLink(e3);
              this.commitPendingLink(n2) && (le.pushState(t2, { type: "patch", id: this.main.id }, e3), this.registerNewLocation(window.location));
            } }, { key: "historyRedirect", value: function(e3, t2, n2) {
              var i2 = this, r2 = window.scrollY;
              this.withPageLoading({ to: e3, kind: "redirect" }, function(o2) {
                i2.replaceMain(e3, n2, function() {
                  le.pushState(t2, { type: "redirect", id: i2.main.id, scroll: r2 }, e3), i2.registerNewLocation(window.location), o2();
                });
              });
            } }, { key: "replaceRootHistory", value: function() {
              le.pushState("replace", { root: true, type: "patch", id: this.main.id });
            } }, { key: "registerNewLocation", value: function(e3) {
              var t2 = this.currentLocation;
              return t2.pathname + t2.search !== e3.pathname + e3.search && (this.currentLocation = G(e3), true);
            } }, { key: "bindForms", value: function() {
              var e3 = this, t2 = 0;
              this.on("submit", function(t3) {
                var n3 = t3.target.getAttribute(e3.binding("submit"));
                n3 && (t3.preventDefault(), t3.target.disabled = true, e3.withinOwners(t3.target, function(e4, i3) {
                  return e4.submitForm(t3.target, i3, n3);
                }));
              }, false);
              for (var n2 = function() {
                var n3 = r2[i2];
                e3.on(n3, function(i3) {
                  var r3 = i3.target, o2 = r3.form && r3.form.getAttribute(e3.binding("change"));
                  if (o2 && (r3.type !== "number" || !r3.validity || !r3.validity.badInput)) {
                    var a2 = t2;
                    t2++;
                    var u2 = de.private(r3, "prev-iteration") || {}, s2 = u2.at, c2 = u2.type;
                    s2 === a2 - 1 && n3 !== c2 || (de.putPrivate(r3, "prev-iteration", { at: a2, type: n3 }), e3.debounce(r3, i3, function() {
                      e3.withinOwners(r3.form, function(t3, n4) {
                        de.putPrivate(r3, "phx-has-focused", true), de.isTextualInput(r3) || e3.setActiveElement(r3), t3.pushInput(r3, n4, o2, i3.target);
                      });
                    }));
                  }
                }, false);
              }, i2 = 0, r2 = ["change", "input"]; i2 < r2.length; i2++)
                n2();
            } }, { key: "debounce", value: function(e3, t2, n2) {
              var i2 = this.binding("debounce"), r2 = this.binding("throttle"), o2 = this.defaults.debounce.toString(), a2 = this.defaults.throttle.toString();
              de.debounce(e3, t2, i2, o2, r2, a2, n2);
            } }, { key: "silenceEvents", value: function(e3) {
              this.silenced = true, e3(), this.silenced = false;
            } }, { key: "on", value: function(e3, t2) {
              var n2 = this;
              window.addEventListener(e3, function(e4) {
                n2.silenced || t2(e4);
              });
            } }]), e2;
          }(), le = { canPushState: function() {
            return history.pushState !== void 0;
          }, dropLocal: function(e2, t2, n2) {
            return e2.removeItem(this.localKey(t2, n2));
          }, updateLocal: function(e2, t2, n2, i2, r2) {
            var o2 = this.getLocal(e2, t2, n2), a2 = this.localKey(t2, n2), u2 = o2 === null ? i2 : r2(o2);
            return e2.setItem(a2, JSON.stringify(u2)), u2;
          }, getLocal: function(e2, t2, n2) {
            return JSON.parse(e2.getItem(this.localKey(t2, n2)));
          }, fetchPage: function(e2, t2) {
            var n2 = new XMLHttpRequest();
            n2.open("GET", e2, true), n2.timeout = 3e4, n2.setRequestHeader("content-type", "text/html"), n2.setRequestHeader("cache-control", "max-age=0, no-cache, no-store, must-revalidate, post-check=0, pre-check=0"), n2.setRequestHeader("x-requested-with", "live-link"), n2.onerror = function() {
              return t2(400);
            }, n2.ontimeout = function() {
              return t2(504);
            }, n2.onreadystatechange = function() {
              if (n2.readyState === 4) {
                var i2 = new URL(e2), r2 = i2.pathname + i2.search, o2 = ee(n2.getResponseHeader("x-response-url") || n2.responseURL, function(e3) {
                  return new URL(e3);
                }), a2 = o2 ? o2.pathname + o2.search : null;
                return n2.getResponseHeader("x-requested-with") !== "live-link" ? t2(400) : o2 === null || a2 != r2 ? t2(302) : n2.status !== 200 ? t2(n2.status) : void t2(200, n2.responseText);
              }
            }, n2.send();
          }, updateCurrentState: function(e2) {
            this.canPushState() && history.replaceState(e2(history.state || {}), "", window.location.href);
          }, pushState: function(e2, t2, n2) {
            if (this.canPushState()) {
              if (n2 !== window.location.href) {
                if (t2.type == "redirect" && t2.scroll) {
                  var i2 = history.state || {};
                  i2.scroll = t2.scroll, history.replaceState(i2, "", window.location.href);
                }
                delete t2.scroll, history[e2 + "State"](t2, "", n2 || null);
                var r2 = this.getHashTargetEl(window.location.hash);
                r2 ? r2.scrollIntoView() : t2.type === "redirect" && window.scroll(0, 0);
              }
            } else
              this.redirect(n2);
          }, setCookie: function(e2, t2) {
            document.cookie = "".concat(e2, "=").concat(t2);
          }, getCookie: function(e2) {
            return document.cookie.replace(new RegExp("(?:(?:^|.*;s*)".concat(e2, "s*=s*([^;]*).*$)|^.*$")), "$1");
          }, redirect: function(e2, t2) {
            t2 && le.setCookie("__phoenix_flash__", t2 + "; max-age=60000; path=/"), window.location = e2;
          }, localKey: function(e2, t2) {
            return "".concat(e2, "-").concat(t2);
          }, getHashTargetEl: function(e2) {
            var t2 = e2.toString().substring(1);
            if (t2 !== "")
              return document.getElementById(t2) || document.querySelector('a[name="'.concat(t2, '"]'));
          } }, de = { byId: function(e2) {
            return document.getElementById(e2) || K("no id found for ".concat(e2));
          }, removeClass: function(e2, t2) {
            e2.classList.remove(t2), e2.classList.length === 0 && e2.removeAttribute("class");
          }, all: function(e2, t2, n2) {
            var i2 = Array.from(e2.querySelectorAll(t2));
            return n2 ? i2.forEach(n2) : i2;
          }, childNodeLength: function(e2) {
            var t2 = document.createElement("template");
            return t2.innerHTML = e2, t2.content.childElementCount;
          }, isUploadInput: function(e2) {
            return e2.type === "file" && e2.getAttribute(U) !== null;
          }, findUploadInputs: function(e2) {
            return this.all(e2, 'input[type="file"]['.concat(U, "]"));
          }, findComponentNodeList: function(e2, t2) {
            return this.filterWithinSameLiveView(this.all(e2, "[".concat(M, '="').concat(t2, '"]')), e2);
          }, isPhxDestroyed: function(e2) {
            return !(!e2.id || !de.private(e2, "destroyed"));
          }, markPhxChildDestroyed: function(e2) {
            e2.setAttribute("data-phx-session", ""), this.putPrivate(e2, "destroyed", true);
          }, findPhxChildrenInFragment: function(e2, t2) {
            var n2 = document.createElement("template");
            return n2.innerHTML = e2, this.findPhxChildren(n2.content, t2);
          }, isIgnored: function(e2, t2) {
            return (e2.getAttribute(t2) || e2.getAttribute("data-phx-update")) === "ignore";
          }, isPhxUpdate: function(e2, t2, n2) {
            return e2.getAttribute && n2.indexOf(e2.getAttribute(t2)) >= 0;
          }, findPhxChildren: function(e2, t2) {
            return this.all(e2, "".concat(B, "[").concat("data-phx-parent-id", '="').concat(t2, '"]'));
          }, findParentCIDs: function(e2, t2) {
            var n2 = this, i2 = new Set(t2);
            return t2.reduce(function(t3, i3) {
              var r2 = "[".concat(M, '="').concat(i3, '"] [').concat(M, "]");
              return n2.filterWithinSameLiveView(n2.all(e2, r2), e2).map(function(e3) {
                return parseInt(e3.getAttribute(M));
              }).forEach(function(e3) {
                return t3.delete(e3);
              }), t3;
            }, i2);
          }, filterWithinSameLiveView: function(e2, t2) {
            var n2 = this;
            return t2.querySelector(B) ? e2.filter(function(e3) {
              return n2.withinSameLiveView(e3, t2);
            }) : e2;
          }, withinSameLiveView: function(e2, t2) {
            for (; e2 = e2.parentNode; ) {
              if (e2.isSameNode(t2))
                return true;
              if (e2.getAttribute(j))
                return false;
            }
          }, private: function(e2, t2) {
            return e2.phxPrivate && e2.phxPrivate[t2];
          }, deletePrivate: function(e2, t2) {
            e2.phxPrivate && delete e2.phxPrivate[t2];
          }, putPrivate: function(e2, t2, n2) {
            e2.phxPrivate || (e2.phxPrivate = {}), e2.phxPrivate[t2] = n2;
          }, copyPrivates: function(e2, t2) {
            t2.phxPrivate && (e2.phxPrivate = G(t2.phxPrivate));
          }, putTitle: function(e2) {
            var t2 = document.querySelector("title").dataset, n2 = t2.prefix, i2 = t2.suffix;
            document.title = "".concat(n2 || "").concat(e2).concat(i2 || "");
          }, debounce: function(e2, t2, n2, i2, r2, o2, a2) {
            var u2 = this, s2 = e2.getAttribute(n2), c2 = e2.getAttribute(r2);
            s2 === "" && (s2 = i2), c2 === "" && (c2 = o2);
            var l2 = s2 || c2;
            switch (l2) {
              case null:
                return a2();
              case "blur":
                return void (this.once(e2, "debounce-blur") && e2.addEventListener("blur", function() {
                  return a2();
                }));
              default:
                var d2 = parseInt(l2), h2 = this.incCycle(e2, "debounce-trigger", function() {
                  return c2 ? u2.deletePrivate(e2, "throttled") : a2();
                });
                if (isNaN(d2))
                  return K("invalid throttle/debounce value: ".concat(l2));
                if (c2) {
                  var f2 = false;
                  if (t2.type === "keydown") {
                    var v2 = this.private(e2, "debounce-prev-key");
                    this.putPrivate(e2, "debounce-prev-key", t2.key), f2 = v2 !== t2.key;
                  }
                  if (!f2 && this.private(e2, "throttled"))
                    return false;
                  a2(), this.putPrivate(e2, "throttled", true), setTimeout(function() {
                    return u2.triggerCycle(e2, "debounce-trigger");
                  }, d2);
                } else
                  setTimeout(function() {
                    return u2.triggerCycle(e2, "debounce-trigger", h2);
                  }, d2);
                var p2 = e2.form;
                p2 && this.once(p2, "bind-debounce") && p2.addEventListener("submit", function(e3) {
                  Array.from(new FormData(p2).entries(), function(e4) {
                    var t3 = C(e4, 2), n3 = t3[0], i3 = (t3[1], p2.querySelector('[name="'.concat(n3, '"]')));
                    u2.incCycle(i3, "debounce-trigger"), u2.deletePrivate(i3, "throttled");
                  });
                }), this.once(e2, "bind-debounce") && e2.addEventListener("blur", function(t3) {
                  return u2.triggerCycle(e2, "debounce-trigger");
                });
            }
          }, triggerCycle: function(e2, t2, n2) {
            var i2 = C(this.private(e2, t2), 2), r2 = i2[0], o2 = i2[1];
            n2 || (n2 = r2), n2 === r2 && (this.incCycle(e2, t2), o2());
          }, once: function(e2, t2) {
            return this.private(e2, t2) !== true && (this.putPrivate(e2, t2, true), true);
          }, incCycle: function(e2, t2) {
            var n2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : function() {
            }, i2 = C(this.private(e2, t2) || [0, n2], 2), r2 = i2[0];
            i2[1];
            return r2++, this.putPrivate(e2, t2, [r2, n2]), r2;
          }, discardError: function(e2, t2, n2) {
            var i2 = t2.getAttribute && t2.getAttribute(n2), r2 = i2 && e2.querySelector('[id="'.concat(i2, '"], [name="').concat(i2, '"]'));
            r2 && (this.private(r2, "phx-has-focused") || this.private(r2.form, "phx-has-submitted") || t2.classList.add("phx-no-feedback"));
          }, showError: function(e2, t2) {
            var n2 = this;
            (e2.id || e2.name) && this.all(e2.form, "[".concat(t2, '="').concat(e2.id, '"], [').concat(t2, '="').concat(e2.name, '"]'), function(e3) {
              n2.removeClass(e3, "phx-no-feedback");
            });
          }, isPhxChild: function(e2) {
            return e2.getAttribute && e2.getAttribute("data-phx-parent-id");
          }, dispatchEvent: function(e2, t2) {
            var n2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, i2 = new CustomEvent(t2, { bubbles: true, cancelable: true, detail: n2 });
            e2.dispatchEvent(i2);
          }, cloneNode: function(e2, t2) {
            if (t2 === void 0)
              return e2.cloneNode(true);
            var n2 = e2.cloneNode(false);
            return n2.innerHTML = t2, n2;
          }, mergeAttrs: function(e2, t2) {
            for (var n2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, i2 = n2.exclude || [], r2 = n2.isIgnored, o2 = t2.attributes, a2 = o2.length - 1; a2 >= 0; a2--) {
              var u2 = o2[a2].name;
              i2.indexOf(u2) < 0 && e2.setAttribute(u2, t2.getAttribute(u2));
            }
            for (var s2 = e2.attributes, c2 = s2.length - 1; c2 >= 0; c2--) {
              var l2 = s2[c2].name;
              r2 ? l2.startsWith("data-") && !t2.hasAttribute(l2) && e2.removeAttribute(l2) : t2.hasAttribute(l2) || e2.removeAttribute(l2);
            }
          }, mergeFocusedInput: function(e2, t2) {
            e2 instanceof HTMLSelectElement || de.mergeAttrs(e2, t2, { except: ["value"] }), t2.readOnly ? e2.setAttribute("readonly", true) : e2.removeAttribute("readonly");
          }, hasSelectionRange: function(e2) {
            return e2.setSelectionRange && (e2.type === "text" || e2.type === "textarea");
          }, restoreFocus: function(e2, t2, n2) {
            if (de.isTextualInput(e2)) {
              var i2 = e2.matches(":focus");
              e2.readOnly && e2.blur(), i2 || e2.focus(), this.hasSelectionRange(e2) && e2.setSelectionRange(t2, n2);
            }
          }, isFormInput: function(e2) {
            return /^(?:input|select|textarea)$/i.test(e2.tagName) && e2.type !== "button";
          }, syncAttrsToProps: function(e2) {
            e2 instanceof HTMLInputElement && V.indexOf(e2.type.toLocaleLowerCase()) >= 0 && (e2.checked = e2.getAttribute("checked") !== null);
          }, isTextualInput: function(e2) {
            return J.indexOf(e2.type) >= 0;
          }, isNowTriggerFormExternal: function(e2, t2) {
            return e2.getAttribute && e2.getAttribute(t2) !== null;
          }, syncPendingRef: function(e2, t2, n2) {
            var i2 = e2.getAttribute(F);
            return i2 === null || (de.isFormInput(e2) || e2.getAttribute(n2) !== null ? (de.isUploadInput(e2) && de.mergeAttrs(e2, t2, { isIgnored: true }), de.putPrivate(e2, F, t2), false) : (H.forEach(function(n3) {
              e2.classList.contains(n3) && t2.classList.add(n3);
            }), t2.setAttribute(F, i2), true));
          }, cleanChildNodes: function(e2, t2) {
            if (de.isPhxUpdate(e2, t2, ["append", "prepend"])) {
              var n2 = [];
              e2.childNodes.forEach(function(e3) {
                e3.id || (e3.nodeType === Node.TEXT_NODE && e3.nodeValue.trim() === "" || K("only HTML element tags with an id are allowed inside containers with phx-update.\n\n" + 'removing illegal node: "'.concat((e3.outerHTML || e3.nodeValue).trim(), '"\n\n')), n2.push(e3));
              }), n2.forEach(function(e3) {
                return e3.remove();
              });
            }
          } }, he = function() {
            function e2(t2, n2, i2) {
              D(this, e2);
              var r2 = new Set(), o2 = new Set(w(n2.children).map(function(e3) {
                return e3.id;
              })), a2 = [];
              Array.from(t2.children).forEach(function(e3) {
                if (e3.id && (r2.add(e3.id), o2.has(e3.id))) {
                  var t3 = e3.previousElementSibling && e3.previousElementSibling.id;
                  a2.push({ elementId: e3.id, previousElementId: t3 });
                }
              }), this.containerId = n2.id, this.updateType = i2, this.elementsToModify = a2, this.elementIdsToAdd = w(o2).filter(function(e3) {
                return !r2.has(e3);
              });
            }
            return N(e2, [{ key: "perform", value: function() {
              var e3 = de.byId(this.containerId);
              this.elementsToModify.forEach(function(t2) {
                t2.previousElementId ? ee(document.getElementById(t2.previousElementId), function(e4) {
                  ee(document.getElementById(t2.elementId), function(t3) {
                    t3.previousElementSibling && t3.previousElementSibling.id == e4.id || e4.insertAdjacentElement("afterend", t3);
                  });
                }) : ee(document.getElementById(t2.elementId), function(t3) {
                  t3.previousElementSibling == null || e3.insertAdjacentElement("afterbegin", t3);
                });
              }), this.updateType == "prepend" && this.elementIdsToAdd.reverse().forEach(function(t2) {
                ee(document.getElementById(t2), function(t3) {
                  return e3.insertAdjacentElement("afterbegin", t3);
                });
              });
            } }]), e2;
          }(), fe = function() {
            function e2(t2, n2, i2, r2, o2) {
              D(this, e2), this.view = t2, this.liveSocket = t2.liveSocket, this.container = n2, this.id = i2, this.rootID = t2.root.id, this.html = r2, this.targetCID = o2, this.cidPatch = typeof this.targetCID == "number", this.callbacks = { beforeadded: [], beforeupdated: [], beforephxChildAdded: [], afteradded: [], afterupdated: [], afterdiscarded: [], afterphxChildAdded: [] };
            }
            return N(e2, null, [{ key: "patchEl", value: function(e3, t2, n2) {
              k(e3, t2, { childrenOnly: false, onBeforeElUpdated: function(e4, t3) {
                if (n2 && n2.isSameNode(e4) && de.isFormInput(e4))
                  return de.mergeFocusedInput(e4, t3), false;
              } });
            } }]), N(e2, [{ key: "before", value: function(e3, t2) {
              this.callbacks["before".concat(e3)].push(t2);
            } }, { key: "after", value: function(e3, t2) {
              this.callbacks["after".concat(e3)].push(t2);
            } }, { key: "trackBefore", value: function(e3) {
              for (var t2 = arguments.length, n2 = new Array(t2 > 1 ? t2 - 1 : 0), i2 = 1; i2 < t2; i2++)
                n2[i2 - 1] = arguments[i2];
              this.callbacks["before".concat(e3)].forEach(function(e4) {
                return e4.apply(void 0, n2);
              });
            } }, { key: "trackAfter", value: function(e3) {
              for (var t2 = arguments.length, n2 = new Array(t2 > 1 ? t2 - 1 : 0), i2 = 1; i2 < t2; i2++)
                n2[i2 - 1] = arguments[i2];
              this.callbacks["after".concat(e3)].forEach(function(e4) {
                return e4.apply(void 0, n2);
              });
            } }, { key: "markPrunableContentForRemoval", value: function() {
              de.all(this.container, "[phx-update=append] > *, [phx-update=prepend] > *", function(e3) {
                e3.setAttribute("data-phx-remove", "");
              });
            } }, { key: "perform", value: function() {
              var e3 = this, t2 = this.view, n2 = this.liveSocket, i2 = this.container, r2 = this.html, o2 = this.isCIDPatch() ? this.targetCIDContainer(r2) : i2;
              if (!this.isCIDPatch() || o2) {
                var a2 = n2.getActiveElement(), u2 = a2 && de.hasSelectionRange(a2) ? a2 : {}, s2 = u2.selectionStart, c2 = u2.selectionEnd, l2 = n2.binding("update"), d2 = n2.binding("feedback-for"), h2 = n2.binding("disable-with"), f2 = n2.binding("trigger-action"), v2 = [], p2 = [], g2 = [], m2 = null, y2 = n2.time("premorph container prep", function() {
                  return e3.buildDiffHTML(i2, r2, l2, o2);
                });
                return this.trackBefore("added", i2), this.trackBefore("updated", i2, i2), n2.time("morphdom", function() {
                  k(o2, y2, { childrenOnly: o2.getAttribute(M) === null, getNodeKey: function(e4) {
                    return de.isPhxDestroyed(e4) ? null : e4.id;
                  }, onBeforeNodeAdded: function(t3) {
                    return de.discardError(o2, t3, d2), e3.trackBefore("added", t3), t3;
                  }, onNodeAdded: function(n3) {
                    de.isNowTriggerFormExternal(n3, f2) && (m2 = n3), de.isPhxChild(n3) && t2.ownsElement(n3) && e3.trackAfter("phxChildAdded", n3), v2.push(n3);
                  }, onNodeDiscarded: function(t3) {
                    de.isPhxChild(t3) && n2.destroyViewByEl(t3), e3.trackAfter("discarded", t3);
                  }, onBeforeNodeDiscarded: function(t3) {
                    return !(!t3.getAttribute || t3.getAttribute("data-phx-remove") === null) || (t3.parentNode === null || !de.isPhxUpdate(t3.parentNode, l2, ["append", "prepend"]) || !t3.id) && !e3.skipCIDSibling(t3);
                  }, onElUpdated: function(e4) {
                    de.isNowTriggerFormExternal(e4, f2) && (m2 = e4), p2.push(e4);
                  }, onBeforeElUpdated: function(t3, n3) {
                    if (de.cleanChildNodes(n3, l2), e3.skipCIDSibling(n3))
                      return false;
                    if (de.isIgnored(t3, l2))
                      return e3.trackBefore("updated", t3, n3), de.mergeAttrs(t3, n3, { isIgnored: true }), p2.push(t3), false;
                    if (t3.type === "number" && t3.validity && t3.validity.badInput)
                      return false;
                    if (!de.syncPendingRef(t3, n3, h2))
                      return de.isUploadInput(t3) && (e3.trackBefore("updated", t3, n3), p2.push(t3)), false;
                    if (de.isPhxChild(n3)) {
                      var i3 = t3.getAttribute("data-phx-session");
                      return de.mergeAttrs(t3, n3, { exclude: ["data-phx-static"] }), i3 !== "" && t3.setAttribute("data-phx-session", i3), t3.setAttribute("data-phx-root-id", e3.rootID), false;
                    }
                    return de.copyPrivates(n3, t3), de.discardError(o2, n3, d2), a2 && t3.isSameNode(a2) && de.isFormInput(t3) && !e3.forceFocusedSelectUpdate(t3, n3) ? (e3.trackBefore("updated", t3, n3), de.mergeFocusedInput(t3, n3), de.syncAttrsToProps(t3), p2.push(t3), false) : (de.isPhxUpdate(n3, l2, ["append", "prepend"]) && g2.push(new he(t3, n3, n3.getAttribute(l2))), de.syncAttrsToProps(n3), e3.trackBefore("updated", t3, n3), true);
                  } });
                }), n2.isDebugEnabled() && function() {
                  for (var e4 = new Set(), t3 = document.querySelectorAll("*[id]"), n3 = 0, i3 = t3.length; n3 < i3; n3++)
                    e4.has(t3[n3].id) ? console.error("Multiple IDs detected: ".concat(t3[n3].id, ". Ensure unique element ids.")) : e4.add(t3[n3].id);
                }(), g2.length > 0 && n2.time("post-morph append/prepend restoration", function() {
                  g2.forEach(function(e4) {
                    return e4.perform();
                  });
                }), n2.silenceEvents(function() {
                  return de.restoreFocus(a2, s2, c2);
                }), de.dispatchEvent(document, "phx:update"), v2.forEach(function(t3) {
                  return e3.trackAfter("added", t3);
                }), p2.forEach(function(t3) {
                  return e3.trackAfter("updated", t3);
                }), m2 && (n2.disconnect(), m2.submit()), true;
              }
            } }, { key: "forceFocusedSelectUpdate", value: function(e3, t2) {
              var n2 = ["select", "select-one", "select-multiple"].find(function(t3) {
                return t3 === e3.type;
              });
              return e3.multiple === true || n2 && e3.innerHTML != t2.innerHTML;
            } }, { key: "isCIDPatch", value: function() {
              return this.cidPatch;
            } }, { key: "skipCIDSibling", value: function(e3) {
              return e3.nodeType === Node.ELEMENT_NODE && e3.getAttribute("data-phx-skip") !== null;
            } }, { key: "targetCIDContainer", value: function(e3) {
              if (this.isCIDPatch()) {
                var t2 = b(de.findComponentNodeList(this.container, this.targetCID)), n2 = t2[0];
                return t2.slice(1).length === 0 && de.childNodeLength(e3) === 1 ? n2 : n2 && n2.parentNode;
              }
            } }, { key: "buildDiffHTML", value: function(e3, t2, n2, i2) {
              var r2 = this, o2 = this.isCIDPatch(), a2 = o2 && i2.getAttribute(M) === this.targetCID.toString();
              if (!o2 || a2)
                return t2;
              var u2 = null, s2 = document.createElement("template");
              u2 = de.cloneNode(i2);
              var c2 = b(de.findComponentNodeList(u2, this.targetCID)), l2 = c2[0], d2 = c2.slice(1);
              return s2.innerHTML = t2, d2.forEach(function(e4) {
                return e4.remove();
              }), Array.from(u2.childNodes).forEach(function(e4) {
                e4.id && e4.nodeType === Node.ELEMENT_NODE && e4.getAttribute(M) !== r2.targetCID.toString() && (e4.setAttribute("data-phx-skip", ""), e4.innerHTML = "");
              }), Array.from(s2.content.childNodes).forEach(function(e4) {
                return u2.insertBefore(e4, l2);
              }), l2.remove(), u2.outerHTML;
            } }]), e2;
          }(), ve = function() {
            function e2(t2, n2, i2, r2, o2) {
              var a2 = this;
              D(this, e2), this.liveSocket = n2, this.flash = o2, this.parent = i2, this.root = i2 ? i2.root : this, this.el = t2, this.id = this.el.id, this.view = this.el.getAttribute(j), this.ref = 0, this.childJoins = 0, this.loaderTimer = null, this.pendingDiffs = [], this.pruningCIDs = [], this.href = r2, this.joinCount = this.parent ? this.parent.joinCount - 1 : 0, this.joinPending = true, this.destroyed = false, this.joinCallback = function() {
              }, this.stopCallback = function() {
              }, this.pendingJoinOps = this.parent ? null : [], this.viewHooks = {}, this.uploaders = {}, this.formSubmits = [], this.children = this.parent ? null : {}, this.root.children[this.id] = {}, this.channel = this.liveSocket.channel("lv:".concat(this.id), function() {
                return { url: a2.href, params: a2.connectParams(), session: a2.getSession(), static: a2.getStatic(), flash: a2.flash };
              }), this.showLoader(this.liveSocket.loaderTimeout), this.bindChannel();
            }
            return N(e2, [{ key: "isMain", value: function() {
              return this.liveSocket.main === this;
            } }, { key: "connectParams", value: function() {
              var e3 = this.liveSocket.params(this.view), t2 = de.all(document, "[".concat(this.binding("track-static"), "]")).map(function(e4) {
                return e4.src || e4.href;
              }).filter(function(e4) {
                return typeof e4 == "string";
              });
              return t2.length > 0 && (e3._track_static = t2), e3._mounts = this.joinCount, e3;
            } }, { key: "name", value: function() {
              return this.view;
            } }, { key: "isConnected", value: function() {
              return this.channel.canPush();
            } }, { key: "getSession", value: function() {
              return this.el.getAttribute("data-phx-session");
            } }, { key: "getStatic", value: function() {
              var e3 = this.el.getAttribute("data-phx-static");
              return e3 === "" ? null : e3;
            } }, { key: "destroy", value: function() {
              var e3 = this, t2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : function() {
              };
              this.destroyAllChildren(), this.destroyed = true, delete this.root.children[this.id], this.parent && delete this.root.children[this.parent.id][this.id], clearTimeout(this.loaderTimer);
              var n2 = function() {
                for (var n3 in t2(), e3.viewHooks)
                  e3.destroyHook(e3.viewHooks[n3]);
              };
              de.markPhxChildDestroyed(this.el), this.log("destroyed", function() {
                return ["the child has been removed from the parent"];
              }), this.channel.leave().receive("ok", n2).receive("error", n2).receive("timeout", n2);
            } }, { key: "setContainerClasses", value: function() {
              var e3;
              this.el.classList.remove("phx-connected", "phx-disconnected", "phx-error"), (e3 = this.el.classList).add.apply(e3, arguments);
            } }, { key: "isLoading", value: function() {
              return this.el.classList.contains("phx-disconnected");
            } }, { key: "showLoader", value: function(e3) {
              var t2 = this;
              if (clearTimeout(this.loaderTimer), e3)
                this.loaderTimer = setTimeout(function() {
                  return t2.showLoader();
                }, e3);
              else {
                for (var n2 in this.viewHooks)
                  this.viewHooks[n2].__disconnected();
                this.setContainerClasses("phx-disconnected");
              }
            } }, { key: "hideLoader", value: function() {
              clearTimeout(this.loaderTimer), this.setContainerClasses("phx-connected");
            } }, { key: "triggerReconnected", value: function() {
              for (var e3 in this.viewHooks)
                this.viewHooks[e3].__reconnected();
            } }, { key: "log", value: function(e3, t2) {
              this.liveSocket.log(this, e3, t2);
            } }, { key: "withinTargets", value: function(e3, t2) {
              var n2 = this;
              if (e3 instanceof HTMLElement)
                return this.liveSocket.owner(e3, function(n3) {
                  return t2(n3, e3);
                });
              if (/^(0|[1-9]\d*)$/.test(e3)) {
                var i2 = de.findComponentNodeList(this.el, e3);
                i2.length === 0 ? K("no component found matching phx-target of ".concat(e3)) : t2(this, i2[0]);
              } else {
                var r2 = Array.from(document.querySelectorAll(e3));
                r2.length === 0 && K('nothing found matching the phx-target selector "'.concat(e3, '"')), r2.forEach(function(e4) {
                  return n2.liveSocket.owner(e4, function(n3) {
                    return t2(n3, e4);
                  });
                });
              }
            } }, { key: "applyDiff", value: function(e3, t2, n2) {
              this.log(e3, function() {
                return ["", G(t2)];
              });
              var i2 = se.extract(t2), r2 = i2.diff, o2 = i2.reply, a2 = i2.events, u2 = i2.title;
              return u2 && de.putTitle(u2), n2({ diff: r2, reply: o2, events: a2 }), o2;
            } }, { key: "onJoin", value: function(e3) {
              var t2 = this, n2 = e3.rendered;
              this.childJoins = 0, this.joinPending = true, this.flash = null, le.dropLocal(this.liveSocket.localStorage, this.name(), "consecutive-reloads"), this.applyDiff("mount", n2, function(n3) {
                var i2 = n3.diff, r2 = n3.events;
                t2.rendered = new se(t2.id, i2);
                var o2 = t2.renderContainer(null, "join");
                t2.dropPendingRefs();
                var a2 = t2.formsForRecovery(o2);
                t2.joinCount++, a2.length > 0 ? a2.forEach(function(e4, n4) {
                  t2.pushFormRecovery(e4, function(e5) {
                    n4 === a2.length - 1 && t2.onJoinComplete(e5, o2, r2);
                  });
                }) : t2.onJoinComplete(e3, o2, r2);
              });
            } }, { key: "dropPendingRefs", value: function() {
              de.all(this.el, "[".concat(F, "]"), function(e3) {
                return e3.removeAttribute(F);
              });
            } }, { key: "onJoinComplete", value: function(e3, t2, n2) {
              var i2 = this, r2 = e3.live_patch;
              if (this.joinCount > 1 || this.parent && !this.parent.isJoinPending())
                return this.applyJoinPatch(r2, t2, n2);
              de.findPhxChildrenInFragment(t2, this.id).filter(function(e4) {
                var t3 = e4.id && i2.el.querySelector("#".concat(e4.id)), n3 = t3 && t3.getAttribute("data-phx-static");
                return n3 && e4.setAttribute("data-phx-static", n3), i2.joinChild(e4);
              }).length === 0 ? this.parent ? (this.root.pendingJoinOps.push([this, function() {
                return i2.applyJoinPatch(r2, t2, n2);
              }]), this.parent.ackJoin(this)) : (this.onAllChildJoinsComplete(), this.applyJoinPatch(r2, t2, n2)) : this.root.pendingJoinOps.push([this, function() {
                return i2.applyJoinPatch(r2, t2, n2);
              }]);
            } }, { key: "attachTrueDocEl", value: function() {
              this.el = de.byId(this.id), this.el.setAttribute("data-phx-root-id", this.root.id);
            } }, { key: "dispatchEvents", value: function(e3) {
              e3.forEach(function(e4) {
                var t2 = C(e4, 2), n2 = t2[0], i2 = t2[1];
                window.dispatchEvent(new CustomEvent("phx:hook:".concat(n2), { detail: i2 }));
              });
            } }, { key: "applyJoinPatch", value: function(e3, t2, n2) {
              var i2 = this;
              this.attachTrueDocEl();
              var r2 = new fe(this, this.el, this.id, t2, null);
              if (r2.markPrunableContentForRemoval(), this.performPatch(r2, false), this.joinNewChildren(), de.all(this.el, "[".concat(this.binding("hook"), "], [data-phx-").concat("hook", "]"), function(e4) {
                var t3 = i2.addHook(e4);
                t3 && t3.__mounted();
              }), this.joinPending = false, this.dispatchEvents(n2), this.applyPendingUpdates(), e3) {
                var o2 = e3.kind, a2 = e3.to;
                this.liveSocket.historyPatch(a2, o2);
              }
              this.hideLoader(), this.joinCount > 1 && this.triggerReconnected(), this.stopCallback();
            } }, { key: "triggerBeforeUpdateHook", value: function(e3, t2) {
              this.liveSocket.triggerDOM("onBeforeElUpdated", [e3, t2]);
              var n2 = this.getHook(e3), i2 = n2 && de.isIgnored(e3, this.binding("update"));
              if (n2 && !e3.isEqualNode(t2) && (!i2 || !function(e4, t3) {
                return JSON.stringify(e4) === JSON.stringify(t3);
              }(e3.dataset, t2.dataset)))
                return n2.__beforeUpdate(), n2;
            } }, { key: "performPatch", value: function(e3, t2) {
              var n2 = this, i2 = [], r2 = false, o2 = new Set();
              return e3.after("added", function(e4) {
                n2.liveSocket.triggerDOM("onNodeAdded", [e4]);
                var t3 = n2.addHook(e4);
                t3 && t3.__mounted();
              }), e3.after("phxChildAdded", function(e4) {
                return r2 = true;
              }), e3.before("updated", function(e4, t3) {
                n2.triggerBeforeUpdateHook(e4, t3) && o2.add(e4.id);
              }), e3.after("updated", function(e4) {
                o2.has(e4.id) && n2.getHook(e4).__updated();
              }), e3.after("discarded", function(e4) {
                var t3 = n2.componentID(e4);
                typeof t3 == "number" && i2.indexOf(t3) === -1 && i2.push(t3);
                var r3 = n2.getHook(e4);
                r3 && n2.destroyHook(r3);
              }), e3.perform(), t2 && this.maybePushComponentsDestroyed(i2), r2;
            } }, { key: "joinNewChildren", value: function() {
              var e3 = this;
              de.findPhxChildren(this.el, this.id).forEach(function(t2) {
                return e3.joinChild(t2);
              });
            } }, { key: "getChildById", value: function(e3) {
              return this.root.children[this.id][e3];
            } }, { key: "getDescendentByEl", value: function(e3) {
              return e3.id === this.id ? this : this.children[e3.getAttribute("data-phx-parent-id")][e3.id];
            } }, { key: "destroyDescendent", value: function(e3) {
              for (var t2 in this.root.children)
                for (var n2 in this.root.children[t2])
                  if (n2 === e3)
                    return this.root.children[t2][n2].destroy();
            } }, { key: "joinChild", value: function(t2) {
              if (!this.getChildById(t2.id)) {
                var n2 = new e2(t2, this.liveSocket, this);
                return this.root.children[this.id][n2.id] = n2, n2.join(), this.childJoins++, true;
              }
            } }, { key: "isJoinPending", value: function() {
              return this.joinPending;
            } }, { key: "ackJoin", value: function(e3) {
              this.childJoins--, this.childJoins === 0 && (this.parent ? this.parent.ackJoin(this) : this.onAllChildJoinsComplete());
            } }, { key: "onAllChildJoinsComplete", value: function() {
              this.joinCallback(), this.pendingJoinOps.forEach(function(e3) {
                var t2 = C(e3, 2), n2 = t2[0], i2 = t2[1];
                n2.isDestroyed() || i2();
              }), this.pendingJoinOps = [];
            } }, { key: "update", value: function(e3, t2) {
              var n2 = this;
              if (this.isJoinPending() || this.liveSocket.hasPendingLink())
                return this.pendingDiffs.push({ diff: e3, events: t2 });
              this.rendered.mergeDiff(e3);
              var i2 = false;
              this.rendered.isComponentOnlyDiff(e3) ? this.liveSocket.time("component patch complete", function() {
                de.findParentCIDs(n2.el, n2.rendered.componentCIDs(e3)).forEach(function(t3) {
                  n2.componentPatch(n2.rendered.getComponent(e3, t3), t3) && (i2 = true);
                });
              }) : Z(e3) || this.liveSocket.time("full patch complete", function() {
                var t3 = n2.renderContainer(e3, "update"), r2 = new fe(n2, n2.el, n2.id, t3, null);
                i2 = n2.performPatch(r2, true);
              }), this.dispatchEvents(t2), i2 && this.joinNewChildren();
            } }, { key: "renderContainer", value: function(e3, t2) {
              var n2 = this;
              return this.liveSocket.time("toString diff (".concat(t2, ")"), function() {
                var t3 = n2.el.tagName, i2 = e3 ? n2.rendered.componentCIDs(e3).concat(n2.pruningCIDs) : null, r2 = n2.rendered.toString(i2);
                return "<".concat(t3, ">").concat(r2, "</").concat(t3, ">");
              });
            } }, { key: "componentPatch", value: function(e3, t2) {
              if (Z(e3))
                return false;
              var n2 = this.rendered.componentToString(t2), i2 = new fe(this, this.el, this.id, n2, t2);
              return this.performPatch(i2, true);
            } }, { key: "getHook", value: function(e3) {
              return this.viewHooks[ge.elementID(e3)];
            } }, { key: "addHook", value: function(e3) {
              if (!ge.elementID(e3) && e3.getAttribute) {
                var t2 = e3.getAttribute("data-phx-".concat("hook")) || e3.getAttribute(this.binding("hook"));
                if (!t2 || this.ownsElement(e3)) {
                  var n2 = this.liveSocket.getHookCallbacks(t2);
                  if (n2) {
                    e3.id || K('no DOM ID for hook "'.concat(t2, '". Hooks require a unique ID on each element.'), e3);
                    var i2 = new ge(this, e3, n2);
                    return this.viewHooks[ge.elementID(i2.el)] = i2, i2;
                  }
                  t2 !== null && K('unknown hook found for "'.concat(t2, '"'), e3);
                }
              }
            } }, { key: "destroyHook", value: function(e3) {
              e3.__destroyed(), e3.__cleanup__(), delete this.viewHooks[ge.elementID(e3.el)];
            } }, { key: "applyPendingUpdates", value: function() {
              var e3 = this;
              this.pendingDiffs.forEach(function(t2) {
                var n2 = t2.diff, i2 = t2.events;
                return e3.update(n2, i2);
              }), this.pendingDiffs = [];
            } }, { key: "onChannel", value: function(e3, t2) {
              var n2 = this;
              this.liveSocket.onChannel(this.channel, e3, function(e4) {
                n2.isJoinPending() ? n2.root.pendingJoinOps.push([n2, function() {
                  return t2(e4);
                }]) : t2(e4);
              });
            } }, { key: "bindChannel", value: function() {
              var e3 = this;
              this.liveSocket.onChannel(this.channel, "diff", function(t2) {
                e3.applyDiff("update", t2, function(t3) {
                  var n2 = t3.diff, i2 = t3.events;
                  return e3.update(n2, i2);
                });
              }), this.onChannel("redirect", function(t2) {
                var n2 = t2.to, i2 = t2.flash;
                return e3.onRedirect({ to: n2, flash: i2 });
              }), this.onChannel("live_patch", function(t2) {
                return e3.onLivePatch(t2);
              }), this.onChannel("live_redirect", function(t2) {
                return e3.onLiveRedirect(t2);
              }), this.channel.onError(function(t2) {
                return e3.onError(t2);
              }), this.channel.onClose(function(t2) {
                return e3.onClose(t2);
              });
            } }, { key: "destroyAllChildren", value: function() {
              for (var e3 in this.root.children[this.id])
                this.getChildById(e3).destroy();
            } }, { key: "onLiveRedirect", value: function(e3) {
              var t2 = e3.to, n2 = e3.kind, i2 = e3.flash, r2 = this.expandURL(t2);
              this.liveSocket.historyRedirect(r2, n2, i2);
            } }, { key: "onLivePatch", value: function(e3) {
              var t2 = e3.to, n2 = e3.kind;
              this.href = this.expandURL(t2), this.liveSocket.historyPatch(t2, n2);
            } }, { key: "expandURL", value: function(e3) {
              return e3.startsWith("/") ? "".concat(window.location.protocol, "//").concat(window.location.host).concat(e3) : e3;
            } }, { key: "onRedirect", value: function(e3) {
              var t2 = e3.to, n2 = e3.flash;
              this.liveSocket.redirect(t2, n2);
            } }, { key: "isDestroyed", value: function() {
              return this.destroyed;
            } }, { key: "join", value: function(e3) {
              var t2 = this;
              this.parent || (this.stopCallback = this.liveSocket.withPageLoading({ to: this.href, kind: "initial" })), this.joinCallback = function() {
                return e3 && e3(t2, t2.joinCount);
              }, this.liveSocket.wrapPush(this, { timeout: false }, function() {
                return t2.channel.join().receive("ok", function(e4) {
                  return t2.onJoin(e4);
                }).receive("error", function(e4) {
                  return t2.onJoinError(e4);
                }).receive("timeout", function() {
                  return t2.onJoinError({ reason: "timeout" });
                });
              });
            } }, { key: "onJoinError", value: function(e3) {
              return (e3.redirect || e3.live_redirect) && (this.joinPending = false, this.channel.leave()), e3.redirect ? this.onRedirect(e3.redirect) : e3.live_redirect ? this.onLiveRedirect(e3.live_redirect) : (this.log("error", function() {
                return ["unable to join", e3];
              }), this.liveSocket.reloadWithJitter(this));
            } }, { key: "onClose", value: function(e3) {
              if (!this.isDestroyed()) {
                if (this.isJoinPending() && document.visibilityState !== "hidden" || this.liveSocket.hasPendingLink() && e3 !== "leave")
                  return this.liveSocket.reloadWithJitter(this);
                this.destroyAllChildren(), this.liveSocket.dropActiveElement(this), document.activeElement && document.activeElement.blur(), this.liveSocket.isUnloaded() && this.showLoader(200);
              }
            } }, { key: "onError", value: function(e3) {
              this.onClose(e3), this.log("error", function() {
                return ["view crashed", e3];
              }), this.liveSocket.isUnloaded() || this.displayError();
            } }, { key: "displayError", value: function() {
              this.isMain() && de.dispatchEvent(window, "phx:page-loading-start", { to: this.href, kind: "error" }), this.showLoader(), this.setContainerClasses("phx-disconnected", "phx-error");
            } }, { key: "pushWithReply", value: function(e3, t2, n2) {
              var i2 = this, r2 = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : function() {
              };
              if (this.isConnected()) {
                var o2 = C(e3 ? e3() : [null, []], 2), a2 = o2[0], u2 = C(o2[1], 1)[0], s2 = function() {
                };
                return u2 && u2.getAttribute(this.binding("page-loading")) !== null && (s2 = this.liveSocket.withPageLoading({ kind: "element", target: u2 })), typeof n2.cid != "number" && delete n2.cid, this.liveSocket.wrapPush(this, { timeout: true }, function() {
                  return i2.channel.push(t2, n2, 3e4).receive("ok", function(e4) {
                    var t3 = null;
                    a2 !== null && i2.undoRefs(a2), e4.diff && (t3 = i2.applyDiff("update", e4.diff, function(e5) {
                      var t4 = e5.diff, n3 = e5.events;
                      i2.update(t4, n3);
                    })), e4.redirect && i2.onRedirect(e4.redirect), e4.live_patch && i2.onLivePatch(e4.live_patch), e4.live_redirect && i2.onLiveRedirect(e4.live_redirect), s2(), r2(e4, t3);
                  });
                });
              }
            } }, { key: "undoRefs", value: function(e3) {
              var t2 = this;
              de.all(this.el, "[".concat(F, '="').concat(e3, '"]'), function(e4) {
                e4.removeAttribute(F), e4.getAttribute("data-phx-readonly") !== null && (e4.readOnly = false, e4.removeAttribute("data-phx-readonly")), e4.getAttribute("data-phx-disabled") !== null && (e4.disabled = false, e4.removeAttribute("data-phx-disabled")), H.forEach(function(t3) {
                  return de.removeClass(e4, t3);
                });
                var n2 = e4.getAttribute("data-phx-disable-with-restore");
                n2 !== null && (e4.innerText = n2, e4.removeAttribute("data-phx-disable-with-restore"));
                var i2 = de.private(e4, F);
                if (i2) {
                  var r2 = t2.triggerBeforeUpdateHook(e4, i2);
                  fe.patchEl(e4, i2, t2.liveSocket.getActiveElement()), r2 && r2.__updated(), de.deletePrivate(e4, F);
                }
              });
            } }, { key: "putRef", value: function(e3, t2) {
              var n2 = this.ref++, i2 = this.binding("disable-with");
              return e3.forEach(function(e4) {
                e4.classList.add("phx-".concat(t2, "-loading")), e4.setAttribute(F, n2);
                var r2 = e4.getAttribute(i2);
                r2 !== null && (e4.getAttribute("data-phx-disable-with-restore") || e4.setAttribute("data-phx-disable-with-restore", e4.innerText), e4.innerText = r2);
              }), [n2, e3];
            } }, { key: "componentID", value: function(e3) {
              var t2 = e3.getAttribute && e3.getAttribute(M);
              return t2 ? parseInt(t2) : null;
            } }, { key: "targetComponentID", value: function(e3, t2) {
              return e3.getAttribute(this.binding("target")) ? this.closestComponentID(t2) : null;
            } }, { key: "closestComponentID", value: function(e3) {
              var t2 = this;
              return e3 ? ee(e3.closest("[".concat(M, "]")), function(e4) {
                return t2.ownsElement(e4) && t2.componentID(e4);
              }) : null;
            } }, { key: "pushHookEvent", value: function(e3, t2, n2, i2) {
              if (!this.isConnected())
                return this.log("hook", function() {
                  return ["unable to push hook event. LiveView not connected", t2, n2];
                }), false;
              var r2 = C(this.putRef([], "hook"), 2), o2 = r2[0], a2 = r2[1];
              return this.pushWithReply(function() {
                return [o2, a2];
              }, "event", { type: "hook", event: t2, value: n2, cid: this.closestComponentID(e3) }, function(e4, t3) {
                return i2(t3, o2);
              }), o2;
            } }, { key: "extractMeta", value: function(e3, t2) {
              for (var n2 = this.binding("value-"), i2 = 0; i2 < e3.attributes.length; i2++) {
                var r2 = e3.attributes[i2].name;
                r2.startsWith(n2) && (t2[r2.replace(n2, "")] = e3.getAttribute(r2));
              }
              return e3.value !== void 0 && (t2.value = e3.value, e3.tagName === "INPUT" && V.indexOf(e3.type) >= 0 && !e3.checked && delete t2.value), t2;
            } }, { key: "pushEvent", value: function(e3, t2, n2, i2, r2) {
              var o2 = this;
              this.pushWithReply(function() {
                return o2.putRef([t2], e3);
              }, "event", { type: e3, event: i2, value: this.extractMeta(t2, r2), cid: this.targetComponentID(t2, n2) });
            } }, { key: "pushKey", value: function(e3, t2, n2, i2, r2) {
              var o2 = this;
              this.pushWithReply(function() {
                return o2.putRef([e3], n2);
              }, "event", { type: n2, event: i2, value: this.extractMeta(e3, r2), cid: this.targetComponentID(e3, t2) });
            } }, { key: "pushFileProgress", value: function(e3, t2, n2) {
              var i2 = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : function() {
              };
              this.liveSocket.withinOwners(e3.form, function(r2, o2) {
                r2.pushWithReply(null, "progress", { event: e3.getAttribute(r2.binding("progress")), ref: e3.getAttribute(U), entry_ref: t2, progress: n2, cid: r2.targetComponentID(e3.form, o2) }, i2);
              });
            } }, { key: "pushInput", value: function(e3, t2, n2, i2, r2) {
              var o2 = this, a2 = this.targetComponentID(e3.form, t2), u2 = function() {
                return o2.putRef([e3, e3.form], "change");
              }, s2 = ue(e3.form, { _target: i2.name });
              e3.files && e3.files.length > 0 && re.trackFiles(e3, Array.from(e3.files));
              var c2 = { type: "form", event: n2, value: s2, uploads: re.serializeUploads(e3), cid: a2 };
              this.pushWithReply(u2, "event", c2, function(n3) {
                if (de.showError(e3, o2.liveSocket.binding("feedback-for")), de.isUploadInput(e3) && e3.getAttribute("data-phx-auto-upload") !== null) {
                  if (re.filesAwaitingPreflight(e3).length > 0) {
                    var i3 = C(u2(), 2), s3 = i3[0];
                    i3[1];
                    o2.uploadFiles(e3.form, t2, s3, a2, function(t3) {
                      r2 && r2(n3), o2.triggerAwaitingSubmit(e3.form);
                    });
                  }
                } else
                  r2 && r2(n3);
              });
            } }, { key: "triggerAwaitingSubmit", value: function(e3) {
              var t2 = this.getScheduledSubmit(e3);
              if (t2) {
                var n2 = C(t2, 3), i2 = (n2[0], n2[1], n2[2]);
                this.cancelSubmit(e3), i2();
              }
            } }, { key: "getScheduledSubmit", value: function(e3) {
              return this.formSubmits.find(function(t2) {
                var n2 = C(t2, 2), i2 = n2[0];
                n2[1];
                return i2.isSameNode(e3);
              });
            } }, { key: "scheduleSubmit", value: function(e3, t2, n2) {
              if (this.getScheduledSubmit(e3))
                return true;
              this.formSubmits.push([e3, t2, n2]);
            } }, { key: "cancelSubmit", value: function(e3) {
              var t2 = this;
              this.formSubmits = this.formSubmits.filter(function(n2) {
                var i2 = C(n2, 3), r2 = i2[0], o2 = i2[1];
                i2[2];
                return !r2.isSameNode(e3) || (t2.undoRefs(o2), false);
              });
            } }, { key: "pushFormSubmit", value: function(e3, t2, n2, i2) {
              var r2 = this, o2 = function(e4) {
                return !(Y(e4, "".concat(r2.binding("update"), "=ignore"), e4.form) || Y(e4, "data-phx-update=ignore", e4.form));
              }, a2 = function(e4) {
                return e4.hasAttribute(r2.binding("disable-with"));
              }, u2 = function(e4) {
                return e4.tagName == "BUTTON";
              }, s2 = function(e4) {
                return ["INPUT", "TEXTAREA", "SELECT"].includes(e4.tagName);
              }, c2 = function() {
                var t3 = Array.from(e3.elements), n3 = t3.filter(a2), i3 = t3.filter(u2).filter(o2), c3 = t3.filter(s2).filter(o2);
                return i3.forEach(function(e4) {
                  e4.setAttribute("data-phx-disabled", e4.disabled), e4.disabled = true;
                }), c3.forEach(function(e4) {
                  e4.setAttribute("data-phx-readonly", e4.readOnly), e4.readOnly = true, e4.files && (e4.setAttribute("data-phx-disabled", e4.disabled), e4.disabled = true);
                }), e3.setAttribute(r2.binding("page-loading"), ""), r2.putRef([e3].concat(n3).concat(i3).concat(c3), "submit");
              }, l2 = this.targetComponentID(e3, t2);
              if (re.hasUploadsInProgress(e3)) {
                var d2 = C(c2(), 2), h2 = d2[0];
                d2[1];
                return this.scheduleSubmit(e3, h2, function() {
                  return r2.pushFormSubmit(e3, t2, n2, i2);
                });
              }
              if (re.inputsAwaitingPreflight(e3).length > 0) {
                var f2 = C(c2(), 2), v2 = f2[0], p2 = f2[1], g2 = function() {
                  return [v2, p2];
                };
                this.uploadFiles(e3, t2, v2, l2, function(t3) {
                  var o3 = ue(e3, {});
                  r2.pushWithReply(g2, "event", { type: "form", event: n2, value: o3, cid: l2 }, i2);
                });
              } else {
                var m2 = ue(e3);
                this.pushWithReply(c2, "event", { type: "form", event: n2, value: m2, cid: l2 }, i2);
              }
            } }, { key: "uploadFiles", value: function(e3, t2, n2, i2, r2) {
              var o2 = this, a2 = this.joinCount;
              re.activeFileInputs(e3).forEach(function(e4) {
                var i3 = new re(e4, o2, r2);
                o2.uploaders[e4] = i3;
                var u2 = i3.entries().map(function(e5) {
                  return e5.toPreflightPayload();
                }), s2 = { ref: e4.getAttribute(U), entries: u2, cid: o2.targetComponentID(e4.form, t2) };
                o2.log("upload", function() {
                  return ["sending preflight request", s2];
                }), o2.pushWithReply(null, "allow_upload", s2, function(e5) {
                  if (o2.log("upload", function() {
                    return ["got preflight response", e5];
                  }), e5.error) {
                    o2.undoRefs(n2);
                    var t3 = C(e5.error, 2), r3 = t3[0], u3 = t3[1];
                    o2.log("upload", function() {
                      return ["error for entry ".concat(r3), u3];
                    });
                  } else {
                    i3.initAdapterUpload(e5, function(e6) {
                      o2.channel.onError(function() {
                        o2.joinCount === a2 && e6();
                      });
                    }, o2.liveSocket);
                  }
                });
              });
            } }, { key: "pushFormRecovery", value: function(e3, t2) {
              var n2 = this;
              this.liveSocket.withinOwners(e3, function(i2, r2) {
                var o2 = e3.elements[0], a2 = e3.getAttribute(n2.binding("auto-recover")) || e3.getAttribute(n2.binding("change"));
                i2.pushInput(o2, r2, a2, o2, t2);
              });
            } }, { key: "pushLinkPatch", value: function(e3, t2, n2) {
              var i2 = this, r2 = this.liveSocket.setPendingLink(e3), o2 = t2 ? function() {
                return i2.putRef([t2], "click");
              } : null;
              this.pushWithReply(o2, "link", { url: e3 }, function(t3) {
                t3.link_redirect ? i2.liveSocket.replaceMain(e3, null, n2, r2) : (i2.liveSocket.commitPendingLink(r2) && (i2.href = e3), i2.applyPendingUpdates(), n2 && n2(r2));
              }).receive("timeout", function() {
                return i2.liveSocket.redirect(window.location.href);
              });
            } }, { key: "formsForRecovery", value: function(e3) {
              var t2 = this;
              if (this.joinCount === 0)
                return [];
              var n2 = this.binding("change"), i2 = document.createElement("template");
              return i2.innerHTML = e3, de.all(this.el, "form[".concat(n2, "]")).filter(function(e4) {
                return t2.ownsElement(e4);
              }).filter(function(e4) {
                return e4.elements.length > 0;
              }).filter(function(e4) {
                return e4.getAttribute(t2.binding("auto-recover")) !== "ignore";
              }).filter(function(e4) {
                return i2.content.querySelector("form[".concat(n2, '="').concat(e4.getAttribute(n2), '"]'));
              });
            } }, { key: "maybePushComponentsDestroyed", value: function(e3) {
              var t2, n2 = this, i2 = e3.filter(function(e4) {
                return de.findComponentNodeList(n2.el, e4).length === 0;
              });
              i2.length > 0 && ((t2 = this.pruningCIDs).push.apply(t2, w(i2)), this.pushWithReply(null, "cids_will_destroy", { cids: i2 }, function() {
                n2.pruningCIDs = n2.pruningCIDs.filter(function(e5) {
                  return i2.indexOf(e5) !== -1;
                });
                var e4 = i2.filter(function(e5) {
                  return de.findComponentNodeList(n2.el, e5).length === 0;
                });
                e4.length > 0 && n2.pushWithReply(null, "cids_destroyed", { cids: e4 }, function(e5) {
                  n2.rendered.pruneCIDs(e5.cids);
                });
              }));
            } }, { key: "ownsElement", value: function(e3) {
              return e3.getAttribute("data-phx-parent-id") === this.id || ee(e3.closest(B), function(e4) {
                return e4.id;
              }) === this.id;
            } }, { key: "submitForm", value: function(e3, t2, n2) {
              var i2 = this;
              de.putPrivate(e3, "phx-has-submitted", true), this.liveSocket.blurActiveElement(this), this.pushFormSubmit(e3, t2, n2, function() {
                i2.liveSocket.restorePreviouslyActiveFocus();
              });
            } }, { key: "binding", value: function(e3) {
              return this.liveSocket.binding(e3);
            } }]), e2;
          }(), pe = 1, ge = function() {
            function e2(t2, n2, i2) {
              for (var r2 in D(this, e2), this.__view = t2, this.__liveSocket = t2.liveSocket, this.__callbacks = i2, this.__listeners = new Set(), this.__isDisconnected = false, this.el = n2, this.viewName = t2.name(), this.el.phxHookId = this.constructor.makeID(), this.__callbacks)
                this[r2] = this.__callbacks[r2];
            }
            return N(e2, null, [{ key: "makeID", value: function() {
              return pe++;
            } }, { key: "elementID", value: function(e3) {
              return e3.phxHookId;
            } }]), N(e2, [{ key: "__mounted", value: function() {
              this.mounted && this.mounted();
            } }, { key: "__updated", value: function() {
              this.updated && this.updated();
            } }, { key: "__beforeUpdate", value: function() {
              this.beforeUpdate && this.beforeUpdate();
            } }, { key: "__destroyed", value: function() {
              this.destroyed && this.destroyed();
            } }, { key: "__reconnected", value: function() {
              this.__isDisconnected && (this.__isDisconnected = false, this.reconnected && this.reconnected());
            } }, { key: "__disconnected", value: function() {
              this.__isDisconnected = true, this.disconnected && this.disconnected();
            } }, { key: "pushEvent", value: function(e3) {
              var t2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : function() {
              };
              return this.__view.pushHookEvent(null, e3, t2, n2);
            } }, { key: "pushEventTo", value: function(e3, t2) {
              var n2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, i2 = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : function() {
              };
              return this.__view.withinTargets(e3, function(e4, r2) {
                return e4.pushHookEvent(r2, t2, n2, i2);
              });
            } }, { key: "handleEvent", value: function(e3, t2) {
              var n2 = function(n3, i2) {
                return i2 ? e3 : t2(n3.detail);
              };
              return window.addEventListener("phx:hook:".concat(e3), n2), this.__listeners.add(n2), n2;
            } }, { key: "removeHandleEvent", value: function(e3) {
              var t2 = e3(null, true);
              window.removeEventListener("phx:hook:".concat(t2), e3), this.__listeners.delete(e3);
            } }, { key: "__cleanup__", value: function() {
              var e3 = this;
              this.__listeners.forEach(function(t2) {
                return e3.removeHandleEvent(t2);
              });
            } }]), e2;
          }();
          t.default = ce;
        }, function(e, t) {
          var n;
          n = function() {
            return this;
          }();
          try {
            n = n || Function("return this")() || (0, eval)("this");
          } catch (e2) {
            typeof window == "object" && (n = window);
          }
          e.exports = n;
        }, function(e, t, n) {
          (function(t2) {
            t2.Phoenix || (t2.Phoenix = {}), e.exports = t2.Phoenix.LiveView = n(0);
          }).call(this, n(1));
        }]);
      });
    }
  });

  // node_modules/alpinejs/dist/module.esm.js
  var __create2 = Object.create;
  var __defProp2 = Object.defineProperty;
  var __getProtoOf2 = Object.getPrototypeOf;
  var __hasOwnProp2 = Object.prototype.hasOwnProperty;
  var __getOwnPropNames2 = Object.getOwnPropertyNames;
  var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
  var __markAsModule2 = (target) => __defProp2(target, "__esModule", { value: true });
  var __commonJS2 = (callback, module) => () => {
    if (!module) {
      module = { exports: {} };
      callback(module.exports, module);
    }
    return module.exports;
  };
  var __exportStar = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames2(module))
        if (!__hasOwnProp2.call(target, key) && key !== "default")
          __defProp2(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc2(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toModule2 = (module) => {
    return __exportStar(__markAsModule2(__defProp2(module != null ? __create2(__getProtoOf2(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };
  var require_shared_cjs = __commonJS2((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function makeMap(str, expectsLowerCase) {
      const map = Object.create(null);
      const list = str.split(",");
      for (let i = 0; i < list.length; i++) {
        map[list[i]] = true;
      }
      return expectsLowerCase ? (val) => !!map[val.toLowerCase()] : (val) => !!map[val];
    }
    var PatchFlagNames = {
      [1]: `TEXT`,
      [2]: `CLASS`,
      [4]: `STYLE`,
      [8]: `PROPS`,
      [16]: `FULL_PROPS`,
      [32]: `HYDRATE_EVENTS`,
      [64]: `STABLE_FRAGMENT`,
      [128]: `KEYED_FRAGMENT`,
      [256]: `UNKEYED_FRAGMENT`,
      [512]: `NEED_PATCH`,
      [1024]: `DYNAMIC_SLOTS`,
      [2048]: `DEV_ROOT_FRAGMENT`,
      [-1]: `HOISTED`,
      [-2]: `BAIL`
    };
    var slotFlagsText = {
      [1]: "STABLE",
      [2]: "DYNAMIC",
      [3]: "FORWARDED"
    };
    var GLOBALS_WHITE_LISTED = "Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt";
    var isGloballyWhitelisted = /* @__PURE__ */ makeMap(GLOBALS_WHITE_LISTED);
    var range = 2;
    function generateCodeFrame(source, start2 = 0, end = source.length) {
      const lines = source.split(/\r?\n/);
      let count = 0;
      const res = [];
      for (let i = 0; i < lines.length; i++) {
        count += lines[i].length + 1;
        if (count >= start2) {
          for (let j = i - range; j <= i + range || end > count; j++) {
            if (j < 0 || j >= lines.length)
              continue;
            const line = j + 1;
            res.push(`${line}${" ".repeat(Math.max(3 - String(line).length, 0))}|  ${lines[j]}`);
            const lineLength = lines[j].length;
            if (j === i) {
              const pad = start2 - (count - lineLength) + 1;
              const length = Math.max(1, end > count ? lineLength - pad : end - start2);
              res.push(`   |  ` + " ".repeat(pad) + "^".repeat(length));
            } else if (j > i) {
              if (end > count) {
                const length = Math.max(Math.min(end - count, lineLength), 1);
                res.push(`   |  ` + "^".repeat(length));
              }
              count += lineLength + 1;
            }
          }
          break;
        }
      }
      return res.join("\n");
    }
    var specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
    var isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
    var isBooleanAttr2 = /* @__PURE__ */ makeMap(specialBooleanAttrs + `,async,autofocus,autoplay,controls,default,defer,disabled,hidden,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected`);
    var unsafeAttrCharRE = /[>/="'\u0009\u000a\u000c\u0020]/;
    var attrValidationCache = {};
    function isSSRSafeAttrName(name) {
      if (attrValidationCache.hasOwnProperty(name)) {
        return attrValidationCache[name];
      }
      const isUnsafe = unsafeAttrCharRE.test(name);
      if (isUnsafe) {
        console.error(`unsafe attribute name: ${name}`);
      }
      return attrValidationCache[name] = !isUnsafe;
    }
    var propsToAttrMap = {
      acceptCharset: "accept-charset",
      className: "class",
      htmlFor: "for",
      httpEquiv: "http-equiv"
    };
    var isNoUnitNumericStyleProp = /* @__PURE__ */ makeMap(`animation-iteration-count,border-image-outset,border-image-slice,border-image-width,box-flex,box-flex-group,box-ordinal-group,column-count,columns,flex,flex-grow,flex-positive,flex-shrink,flex-negative,flex-order,grid-row,grid-row-end,grid-row-span,grid-row-start,grid-column,grid-column-end,grid-column-span,grid-column-start,font-weight,line-clamp,line-height,opacity,order,orphans,tab-size,widows,z-index,zoom,fill-opacity,flood-opacity,stop-opacity,stroke-dasharray,stroke-dashoffset,stroke-miterlimit,stroke-opacity,stroke-width`);
    var isKnownAttr = /* @__PURE__ */ makeMap(`accept,accept-charset,accesskey,action,align,allow,alt,async,autocapitalize,autocomplete,autofocus,autoplay,background,bgcolor,border,buffered,capture,challenge,charset,checked,cite,class,code,codebase,color,cols,colspan,content,contenteditable,contextmenu,controls,coords,crossorigin,csp,data,datetime,decoding,default,defer,dir,dirname,disabled,download,draggable,dropzone,enctype,enterkeyhint,for,form,formaction,formenctype,formmethod,formnovalidate,formtarget,headers,height,hidden,high,href,hreflang,http-equiv,icon,id,importance,integrity,ismap,itemprop,keytype,kind,label,lang,language,loading,list,loop,low,manifest,max,maxlength,minlength,media,min,multiple,muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster,preload,radiogroup,readonly,referrerpolicy,rel,required,reversed,rows,rowspan,sandbox,scope,scoped,selected,shape,size,sizes,slot,span,spellcheck,src,srcdoc,srclang,srcset,start,step,style,summary,tabindex,target,title,translate,type,usemap,value,width,wrap`);
    function normalizeStyle(value) {
      if (isArray(value)) {
        const res = {};
        for (let i = 0; i < value.length; i++) {
          const item = value[i];
          const normalized = normalizeStyle(isString(item) ? parseStringStyle(item) : item);
          if (normalized) {
            for (const key in normalized) {
              res[key] = normalized[key];
            }
          }
        }
        return res;
      } else if (isObject(value)) {
        return value;
      }
    }
    var listDelimiterRE = /;(?![^(]*\))/g;
    var propertyDelimiterRE = /:(.+)/;
    function parseStringStyle(cssText) {
      const ret = {};
      cssText.split(listDelimiterRE).forEach((item) => {
        if (item) {
          const tmp = item.split(propertyDelimiterRE);
          tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
        }
      });
      return ret;
    }
    function stringifyStyle(styles) {
      let ret = "";
      if (!styles) {
        return ret;
      }
      for (const key in styles) {
        const value = styles[key];
        const normalizedKey = key.startsWith(`--`) ? key : hyphenate(key);
        if (isString(value) || typeof value === "number" && isNoUnitNumericStyleProp(normalizedKey)) {
          ret += `${normalizedKey}:${value};`;
        }
      }
      return ret;
    }
    function normalizeClass(value) {
      let res = "";
      if (isString(value)) {
        res = value;
      } else if (isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          const normalized = normalizeClass(value[i]);
          if (normalized) {
            res += normalized + " ";
          }
        }
      } else if (isObject(value)) {
        for (const name in value) {
          if (value[name]) {
            res += name + " ";
          }
        }
      }
      return res.trim();
    }
    var HTML_TAGS = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot";
    var SVG_TAGS = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistanceLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view";
    var VOID_TAGS = "area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr";
    var isHTMLTag = /* @__PURE__ */ makeMap(HTML_TAGS);
    var isSVGTag = /* @__PURE__ */ makeMap(SVG_TAGS);
    var isVoidTag = /* @__PURE__ */ makeMap(VOID_TAGS);
    var escapeRE = /["'&<>]/;
    function escapeHtml(string) {
      const str = "" + string;
      const match = escapeRE.exec(str);
      if (!match) {
        return str;
      }
      let html = "";
      let escaped;
      let index;
      let lastIndex = 0;
      for (index = match.index; index < str.length; index++) {
        switch (str.charCodeAt(index)) {
          case 34:
            escaped = "&quot;";
            break;
          case 38:
            escaped = "&amp;";
            break;
          case 39:
            escaped = "&#39;";
            break;
          case 60:
            escaped = "&lt;";
            break;
          case 62:
            escaped = "&gt;";
            break;
          default:
            continue;
        }
        if (lastIndex !== index) {
          html += str.substring(lastIndex, index);
        }
        lastIndex = index + 1;
        html += escaped;
      }
      return lastIndex !== index ? html + str.substring(lastIndex, index) : html;
    }
    var commentStripRE = /^-?>|<!--|-->|--!>|<!-$/g;
    function escapeHtmlComment(src) {
      return src.replace(commentStripRE, "");
    }
    function looseCompareArrays(a, b) {
      if (a.length !== b.length)
        return false;
      let equal = true;
      for (let i = 0; equal && i < a.length; i++) {
        equal = looseEqual(a[i], b[i]);
      }
      return equal;
    }
    function looseEqual(a, b) {
      if (a === b)
        return true;
      let aValidType = isDate(a);
      let bValidType = isDate(b);
      if (aValidType || bValidType) {
        return aValidType && bValidType ? a.getTime() === b.getTime() : false;
      }
      aValidType = isArray(a);
      bValidType = isArray(b);
      if (aValidType || bValidType) {
        return aValidType && bValidType ? looseCompareArrays(a, b) : false;
      }
      aValidType = isObject(a);
      bValidType = isObject(b);
      if (aValidType || bValidType) {
        if (!aValidType || !bValidType) {
          return false;
        }
        const aKeysCount = Object.keys(a).length;
        const bKeysCount = Object.keys(b).length;
        if (aKeysCount !== bKeysCount) {
          return false;
        }
        for (const key in a) {
          const aHasKey = a.hasOwnProperty(key);
          const bHasKey = b.hasOwnProperty(key);
          if (aHasKey && !bHasKey || !aHasKey && bHasKey || !looseEqual(a[key], b[key])) {
            return false;
          }
        }
      }
      return String(a) === String(b);
    }
    function looseIndexOf(arr, val) {
      return arr.findIndex((item) => looseEqual(item, val));
    }
    var toDisplayString = (val) => {
      return val == null ? "" : isObject(val) ? JSON.stringify(val, replacer, 2) : String(val);
    };
    var replacer = (_key, val) => {
      if (isMap(val)) {
        return {
          [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val2]) => {
            entries[`${key} =>`] = val2;
            return entries;
          }, {})
        };
      } else if (isSet(val)) {
        return {
          [`Set(${val.size})`]: [...val.values()]
        };
      } else if (isObject(val) && !isArray(val) && !isPlainObject(val)) {
        return String(val);
      }
      return val;
    };
    var babelParserDefaultPlugins = [
      "bigInt",
      "optionalChaining",
      "nullishCoalescingOperator"
    ];
    var EMPTY_OBJ = Object.freeze({});
    var EMPTY_ARR = Object.freeze([]);
    var NOOP = () => {
    };
    var NO = () => false;
    var onRE = /^on[^a-z]/;
    var isOn = (key) => onRE.test(key);
    var isModelListener = (key) => key.startsWith("onUpdate:");
    var extend = Object.assign;
    var remove = (arr, el) => {
      const i = arr.indexOf(el);
      if (i > -1) {
        arr.splice(i, 1);
      }
    };
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var hasOwn = (val, key) => hasOwnProperty.call(val, key);
    var isArray = Array.isArray;
    var isMap = (val) => toTypeString(val) === "[object Map]";
    var isSet = (val) => toTypeString(val) === "[object Set]";
    var isDate = (val) => val instanceof Date;
    var isFunction = (val) => typeof val === "function";
    var isString = (val) => typeof val === "string";
    var isSymbol = (val) => typeof val === "symbol";
    var isObject = (val) => val !== null && typeof val === "object";
    var isPromise = (val) => {
      return isObject(val) && isFunction(val.then) && isFunction(val.catch);
    };
    var objectToString = Object.prototype.toString;
    var toTypeString = (value) => objectToString.call(value);
    var toRawType = (value) => {
      return toTypeString(value).slice(8, -1);
    };
    var isPlainObject = (val) => toTypeString(val) === "[object Object]";
    var isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
    var isReservedProp = /* @__PURE__ */ makeMap(",key,ref,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted");
    var cacheStringFunction = (fn) => {
      const cache = Object.create(null);
      return (str) => {
        const hit = cache[str];
        return hit || (cache[str] = fn(str));
      };
    };
    var camelizeRE = /-(\w)/g;
    var camelize = cacheStringFunction((str) => {
      return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
    });
    var hyphenateRE = /\B([A-Z])/g;
    var hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
    var capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
    var toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : ``);
    var hasChanged = (value, oldValue) => value !== oldValue && (value === value || oldValue === oldValue);
    var invokeArrayFns = (fns, arg) => {
      for (let i = 0; i < fns.length; i++) {
        fns[i](arg);
      }
    };
    var def = (obj, key, value) => {
      Object.defineProperty(obj, key, {
        configurable: true,
        enumerable: false,
        value
      });
    };
    var toNumber = (val) => {
      const n = parseFloat(val);
      return isNaN(n) ? val : n;
    };
    var _globalThis;
    var getGlobalThis = () => {
      return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
    };
    exports.EMPTY_ARR = EMPTY_ARR;
    exports.EMPTY_OBJ = EMPTY_OBJ;
    exports.NO = NO;
    exports.NOOP = NOOP;
    exports.PatchFlagNames = PatchFlagNames;
    exports.babelParserDefaultPlugins = babelParserDefaultPlugins;
    exports.camelize = camelize;
    exports.capitalize = capitalize;
    exports.def = def;
    exports.escapeHtml = escapeHtml;
    exports.escapeHtmlComment = escapeHtmlComment;
    exports.extend = extend;
    exports.generateCodeFrame = generateCodeFrame;
    exports.getGlobalThis = getGlobalThis;
    exports.hasChanged = hasChanged;
    exports.hasOwn = hasOwn;
    exports.hyphenate = hyphenate;
    exports.invokeArrayFns = invokeArrayFns;
    exports.isArray = isArray;
    exports.isBooleanAttr = isBooleanAttr2;
    exports.isDate = isDate;
    exports.isFunction = isFunction;
    exports.isGloballyWhitelisted = isGloballyWhitelisted;
    exports.isHTMLTag = isHTMLTag;
    exports.isIntegerKey = isIntegerKey;
    exports.isKnownAttr = isKnownAttr;
    exports.isMap = isMap;
    exports.isModelListener = isModelListener;
    exports.isNoUnitNumericStyleProp = isNoUnitNumericStyleProp;
    exports.isObject = isObject;
    exports.isOn = isOn;
    exports.isPlainObject = isPlainObject;
    exports.isPromise = isPromise;
    exports.isReservedProp = isReservedProp;
    exports.isSSRSafeAttrName = isSSRSafeAttrName;
    exports.isSVGTag = isSVGTag;
    exports.isSet = isSet;
    exports.isSpecialBooleanAttr = isSpecialBooleanAttr;
    exports.isString = isString;
    exports.isSymbol = isSymbol;
    exports.isVoidTag = isVoidTag;
    exports.looseEqual = looseEqual;
    exports.looseIndexOf = looseIndexOf;
    exports.makeMap = makeMap;
    exports.normalizeClass = normalizeClass;
    exports.normalizeStyle = normalizeStyle;
    exports.objectToString = objectToString;
    exports.parseStringStyle = parseStringStyle;
    exports.propsToAttrMap = propsToAttrMap;
    exports.remove = remove;
    exports.slotFlagsText = slotFlagsText;
    exports.stringifyStyle = stringifyStyle;
    exports.toDisplayString = toDisplayString;
    exports.toHandlerKey = toHandlerKey;
    exports.toNumber = toNumber;
    exports.toRawType = toRawType;
    exports.toTypeString = toTypeString;
  });
  var require_shared = __commonJS2((exports, module) => {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_shared_cjs();
    }
  });
  var require_reactivity_cjs = __commonJS2((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var shared = require_shared();
    var targetMap = new WeakMap();
    var effectStack = [];
    var activeEffect;
    var ITERATE_KEY = Symbol("iterate");
    var MAP_KEY_ITERATE_KEY = Symbol("Map key iterate");
    function isEffect(fn) {
      return fn && fn._isEffect === true;
    }
    function effect3(fn, options = shared.EMPTY_OBJ) {
      if (isEffect(fn)) {
        fn = fn.raw;
      }
      const effect4 = createReactiveEffect(fn, options);
      if (!options.lazy) {
        effect4();
      }
      return effect4;
    }
    function stop2(effect4) {
      if (effect4.active) {
        cleanup(effect4);
        if (effect4.options.onStop) {
          effect4.options.onStop();
        }
        effect4.active = false;
      }
    }
    var uid = 0;
    function createReactiveEffect(fn, options) {
      const effect4 = function reactiveEffect() {
        if (!effect4.active) {
          return fn();
        }
        if (!effectStack.includes(effect4)) {
          cleanup(effect4);
          try {
            enableTracking();
            effectStack.push(effect4);
            activeEffect = effect4;
            return fn();
          } finally {
            effectStack.pop();
            resetTracking();
            activeEffect = effectStack[effectStack.length - 1];
          }
        }
      };
      effect4.id = uid++;
      effect4.allowRecurse = !!options.allowRecurse;
      effect4._isEffect = true;
      effect4.active = true;
      effect4.raw = fn;
      effect4.deps = [];
      effect4.options = options;
      return effect4;
    }
    function cleanup(effect4) {
      const { deps } = effect4;
      if (deps.length) {
        for (let i = 0; i < deps.length; i++) {
          deps[i].delete(effect4);
        }
        deps.length = 0;
      }
    }
    var shouldTrack = true;
    var trackStack = [];
    function pauseTracking() {
      trackStack.push(shouldTrack);
      shouldTrack = false;
    }
    function enableTracking() {
      trackStack.push(shouldTrack);
      shouldTrack = true;
    }
    function resetTracking() {
      const last = trackStack.pop();
      shouldTrack = last === void 0 ? true : last;
    }
    function track(target, type, key) {
      if (!shouldTrack || activeEffect === void 0) {
        return;
      }
      let depsMap = targetMap.get(target);
      if (!depsMap) {
        targetMap.set(target, depsMap = new Map());
      }
      let dep = depsMap.get(key);
      if (!dep) {
        depsMap.set(key, dep = new Set());
      }
      if (!dep.has(activeEffect)) {
        dep.add(activeEffect);
        activeEffect.deps.push(dep);
        if (activeEffect.options.onTrack) {
          activeEffect.options.onTrack({
            effect: activeEffect,
            target,
            type,
            key
          });
        }
      }
    }
    function trigger(target, type, key, newValue, oldValue, oldTarget) {
      const depsMap = targetMap.get(target);
      if (!depsMap) {
        return;
      }
      const effects = new Set();
      const add2 = (effectsToAdd) => {
        if (effectsToAdd) {
          effectsToAdd.forEach((effect4) => {
            if (effect4 !== activeEffect || effect4.allowRecurse) {
              effects.add(effect4);
            }
          });
        }
      };
      if (type === "clear") {
        depsMap.forEach(add2);
      } else if (key === "length" && shared.isArray(target)) {
        depsMap.forEach((dep, key2) => {
          if (key2 === "length" || key2 >= newValue) {
            add2(dep);
          }
        });
      } else {
        if (key !== void 0) {
          add2(depsMap.get(key));
        }
        switch (type) {
          case "add":
            if (!shared.isArray(target)) {
              add2(depsMap.get(ITERATE_KEY));
              if (shared.isMap(target)) {
                add2(depsMap.get(MAP_KEY_ITERATE_KEY));
              }
            } else if (shared.isIntegerKey(key)) {
              add2(depsMap.get("length"));
            }
            break;
          case "delete":
            if (!shared.isArray(target)) {
              add2(depsMap.get(ITERATE_KEY));
              if (shared.isMap(target)) {
                add2(depsMap.get(MAP_KEY_ITERATE_KEY));
              }
            }
            break;
          case "set":
            if (shared.isMap(target)) {
              add2(depsMap.get(ITERATE_KEY));
            }
            break;
        }
      }
      const run = (effect4) => {
        if (effect4.options.onTrigger) {
          effect4.options.onTrigger({
            effect: effect4,
            target,
            key,
            type,
            newValue,
            oldValue,
            oldTarget
          });
        }
        if (effect4.options.scheduler) {
          effect4.options.scheduler(effect4);
        } else {
          effect4();
        }
      };
      effects.forEach(run);
    }
    var isNonTrackableKeys = /* @__PURE__ */ shared.makeMap(`__proto__,__v_isRef,__isVue`);
    var builtInSymbols = new Set(Object.getOwnPropertyNames(Symbol).map((key) => Symbol[key]).filter(shared.isSymbol));
    var get2 = /* @__PURE__ */ createGetter();
    var shallowGet = /* @__PURE__ */ createGetter(false, true);
    var readonlyGet = /* @__PURE__ */ createGetter(true);
    var shallowReadonlyGet = /* @__PURE__ */ createGetter(true, true);
    var arrayInstrumentations = {};
    ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
      const method = Array.prototype[key];
      arrayInstrumentations[key] = function(...args) {
        const arr = toRaw2(this);
        for (let i = 0, l = this.length; i < l; i++) {
          track(arr, "get", i + "");
        }
        const res = method.apply(arr, args);
        if (res === -1 || res === false) {
          return method.apply(arr, args.map(toRaw2));
        } else {
          return res;
        }
      };
    });
    ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
      const method = Array.prototype[key];
      arrayInstrumentations[key] = function(...args) {
        pauseTracking();
        const res = method.apply(this, args);
        resetTracking();
        return res;
      };
    });
    function createGetter(isReadonly2 = false, shallow = false) {
      return function get3(target, key, receiver) {
        if (key === "__v_isReactive") {
          return !isReadonly2;
        } else if (key === "__v_isReadonly") {
          return isReadonly2;
        } else if (key === "__v_raw" && receiver === (isReadonly2 ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
          return target;
        }
        const targetIsArray = shared.isArray(target);
        if (!isReadonly2 && targetIsArray && shared.hasOwn(arrayInstrumentations, key)) {
          return Reflect.get(arrayInstrumentations, key, receiver);
        }
        const res = Reflect.get(target, key, receiver);
        if (shared.isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
          return res;
        }
        if (!isReadonly2) {
          track(target, "get", key);
        }
        if (shallow) {
          return res;
        }
        if (isRef(res)) {
          const shouldUnwrap = !targetIsArray || !shared.isIntegerKey(key);
          return shouldUnwrap ? res.value : res;
        }
        if (shared.isObject(res)) {
          return isReadonly2 ? readonly(res) : reactive3(res);
        }
        return res;
      };
    }
    var set2 = /* @__PURE__ */ createSetter();
    var shallowSet = /* @__PURE__ */ createSetter(true);
    function createSetter(shallow = false) {
      return function set3(target, key, value, receiver) {
        let oldValue = target[key];
        if (!shallow) {
          value = toRaw2(value);
          oldValue = toRaw2(oldValue);
          if (!shared.isArray(target) && isRef(oldValue) && !isRef(value)) {
            oldValue.value = value;
            return true;
          }
        }
        const hadKey = shared.isArray(target) && shared.isIntegerKey(key) ? Number(key) < target.length : shared.hasOwn(target, key);
        const result = Reflect.set(target, key, value, receiver);
        if (target === toRaw2(receiver)) {
          if (!hadKey) {
            trigger(target, "add", key, value);
          } else if (shared.hasChanged(value, oldValue)) {
            trigger(target, "set", key, value, oldValue);
          }
        }
        return result;
      };
    }
    function deleteProperty(target, key) {
      const hadKey = shared.hasOwn(target, key);
      const oldValue = target[key];
      const result = Reflect.deleteProperty(target, key);
      if (result && hadKey) {
        trigger(target, "delete", key, void 0, oldValue);
      }
      return result;
    }
    function has(target, key) {
      const result = Reflect.has(target, key);
      if (!shared.isSymbol(key) || !builtInSymbols.has(key)) {
        track(target, "has", key);
      }
      return result;
    }
    function ownKeys(target) {
      track(target, "iterate", shared.isArray(target) ? "length" : ITERATE_KEY);
      return Reflect.ownKeys(target);
    }
    var mutableHandlers = {
      get: get2,
      set: set2,
      deleteProperty,
      has,
      ownKeys
    };
    var readonlyHandlers = {
      get: readonlyGet,
      set(target, key) {
        {
          console.warn(`Set operation on key "${String(key)}" failed: target is readonly.`, target);
        }
        return true;
      },
      deleteProperty(target, key) {
        {
          console.warn(`Delete operation on key "${String(key)}" failed: target is readonly.`, target);
        }
        return true;
      }
    };
    var shallowReactiveHandlers = shared.extend({}, mutableHandlers, {
      get: shallowGet,
      set: shallowSet
    });
    var shallowReadonlyHandlers = shared.extend({}, readonlyHandlers, {
      get: shallowReadonlyGet
    });
    var toReactive = (value) => shared.isObject(value) ? reactive3(value) : value;
    var toReadonly = (value) => shared.isObject(value) ? readonly(value) : value;
    var toShallow = (value) => value;
    var getProto = (v) => Reflect.getPrototypeOf(v);
    function get$1(target, key, isReadonly2 = false, isShallow = false) {
      target = target["__v_raw"];
      const rawTarget = toRaw2(target);
      const rawKey = toRaw2(key);
      if (key !== rawKey) {
        !isReadonly2 && track(rawTarget, "get", key);
      }
      !isReadonly2 && track(rawTarget, "get", rawKey);
      const { has: has2 } = getProto(rawTarget);
      const wrap = isShallow ? toShallow : isReadonly2 ? toReadonly : toReactive;
      if (has2.call(rawTarget, key)) {
        return wrap(target.get(key));
      } else if (has2.call(rawTarget, rawKey)) {
        return wrap(target.get(rawKey));
      } else if (target !== rawTarget) {
        target.get(key);
      }
    }
    function has$1(key, isReadonly2 = false) {
      const target = this["__v_raw"];
      const rawTarget = toRaw2(target);
      const rawKey = toRaw2(key);
      if (key !== rawKey) {
        !isReadonly2 && track(rawTarget, "has", key);
      }
      !isReadonly2 && track(rawTarget, "has", rawKey);
      return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
    }
    function size(target, isReadonly2 = false) {
      target = target["__v_raw"];
      !isReadonly2 && track(toRaw2(target), "iterate", ITERATE_KEY);
      return Reflect.get(target, "size", target);
    }
    function add(value) {
      value = toRaw2(value);
      const target = toRaw2(this);
      const proto = getProto(target);
      const hadKey = proto.has.call(target, value);
      if (!hadKey) {
        target.add(value);
        trigger(target, "add", value, value);
      }
      return this;
    }
    function set$1(key, value) {
      value = toRaw2(value);
      const target = toRaw2(this);
      const { has: has2, get: get3 } = getProto(target);
      let hadKey = has2.call(target, key);
      if (!hadKey) {
        key = toRaw2(key);
        hadKey = has2.call(target, key);
      } else {
        checkIdentityKeys(target, has2, key);
      }
      const oldValue = get3.call(target, key);
      target.set(key, value);
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (shared.hasChanged(value, oldValue)) {
        trigger(target, "set", key, value, oldValue);
      }
      return this;
    }
    function deleteEntry(key) {
      const target = toRaw2(this);
      const { has: has2, get: get3 } = getProto(target);
      let hadKey = has2.call(target, key);
      if (!hadKey) {
        key = toRaw2(key);
        hadKey = has2.call(target, key);
      } else {
        checkIdentityKeys(target, has2, key);
      }
      const oldValue = get3 ? get3.call(target, key) : void 0;
      const result = target.delete(key);
      if (hadKey) {
        trigger(target, "delete", key, void 0, oldValue);
      }
      return result;
    }
    function clear() {
      const target = toRaw2(this);
      const hadItems = target.size !== 0;
      const oldTarget = shared.isMap(target) ? new Map(target) : new Set(target);
      const result = target.clear();
      if (hadItems) {
        trigger(target, "clear", void 0, void 0, oldTarget);
      }
      return result;
    }
    function createForEach(isReadonly2, isShallow) {
      return function forEach(callback, thisArg) {
        const observed = this;
        const target = observed["__v_raw"];
        const rawTarget = toRaw2(target);
        const wrap = isShallow ? toShallow : isReadonly2 ? toReadonly : toReactive;
        !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
        return target.forEach((value, key) => {
          return callback.call(thisArg, wrap(value), wrap(key), observed);
        });
      };
    }
    function createIterableMethod(method, isReadonly2, isShallow) {
      return function(...args) {
        const target = this["__v_raw"];
        const rawTarget = toRaw2(target);
        const targetIsMap = shared.isMap(rawTarget);
        const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
        const isKeyOnly = method === "keys" && targetIsMap;
        const innerIterator = target[method](...args);
        const wrap = isShallow ? toShallow : isReadonly2 ? toReadonly : toReactive;
        !isReadonly2 && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
        return {
          next() {
            const { value, done } = innerIterator.next();
            return done ? { value, done } : {
              value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
              done
            };
          },
          [Symbol.iterator]() {
            return this;
          }
        };
      };
    }
    function createReadonlyMethod(type) {
      return function(...args) {
        {
          const key = args[0] ? `on key "${args[0]}" ` : ``;
          console.warn(`${shared.capitalize(type)} operation ${key}failed: target is readonly.`, toRaw2(this));
        }
        return type === "delete" ? false : this;
      };
    }
    var mutableInstrumentations = {
      get(key) {
        return get$1(this, key);
      },
      get size() {
        return size(this);
      },
      has: has$1,
      add,
      set: set$1,
      delete: deleteEntry,
      clear,
      forEach: createForEach(false, false)
    };
    var shallowInstrumentations = {
      get(key) {
        return get$1(this, key, false, true);
      },
      get size() {
        return size(this);
      },
      has: has$1,
      add,
      set: set$1,
      delete: deleteEntry,
      clear,
      forEach: createForEach(false, true)
    };
    var readonlyInstrumentations = {
      get(key) {
        return get$1(this, key, true);
      },
      get size() {
        return size(this, true);
      },
      has(key) {
        return has$1.call(this, key, true);
      },
      add: createReadonlyMethod("add"),
      set: createReadonlyMethod("set"),
      delete: createReadonlyMethod("delete"),
      clear: createReadonlyMethod("clear"),
      forEach: createForEach(true, false)
    };
    var shallowReadonlyInstrumentations = {
      get(key) {
        return get$1(this, key, true, true);
      },
      get size() {
        return size(this, true);
      },
      has(key) {
        return has$1.call(this, key, true);
      },
      add: createReadonlyMethod("add"),
      set: createReadonlyMethod("set"),
      delete: createReadonlyMethod("delete"),
      clear: createReadonlyMethod("clear"),
      forEach: createForEach(true, true)
    };
    var iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
    iteratorMethods.forEach((method) => {
      mutableInstrumentations[method] = createIterableMethod(method, false, false);
      readonlyInstrumentations[method] = createIterableMethod(method, true, false);
      shallowInstrumentations[method] = createIterableMethod(method, false, true);
      shallowReadonlyInstrumentations[method] = createIterableMethod(method, true, true);
    });
    function createInstrumentationGetter(isReadonly2, shallow) {
      const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
      return (target, key, receiver) => {
        if (key === "__v_isReactive") {
          return !isReadonly2;
        } else if (key === "__v_isReadonly") {
          return isReadonly2;
        } else if (key === "__v_raw") {
          return target;
        }
        return Reflect.get(shared.hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
      };
    }
    var mutableCollectionHandlers = {
      get: createInstrumentationGetter(false, false)
    };
    var shallowCollectionHandlers = {
      get: createInstrumentationGetter(false, true)
    };
    var readonlyCollectionHandlers = {
      get: createInstrumentationGetter(true, false)
    };
    var shallowReadonlyCollectionHandlers = {
      get: createInstrumentationGetter(true, true)
    };
    function checkIdentityKeys(target, has2, key) {
      const rawKey = toRaw2(key);
      if (rawKey !== key && has2.call(target, rawKey)) {
        const type = shared.toRawType(target);
        console.warn(`Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
      }
    }
    var reactiveMap = new WeakMap();
    var shallowReactiveMap = new WeakMap();
    var readonlyMap = new WeakMap();
    var shallowReadonlyMap = new WeakMap();
    function targetTypeMap(rawType) {
      switch (rawType) {
        case "Object":
        case "Array":
          return 1;
        case "Map":
        case "Set":
        case "WeakMap":
        case "WeakSet":
          return 2;
        default:
          return 0;
      }
    }
    function getTargetType(value) {
      return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(shared.toRawType(value));
    }
    function reactive3(target) {
      if (target && target["__v_isReadonly"]) {
        return target;
      }
      return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
    }
    function shallowReactive(target) {
      return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
    }
    function readonly(target) {
      return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
    }
    function shallowReadonly(target) {
      return createReactiveObject(target, true, shallowReadonlyHandlers, shallowReadonlyCollectionHandlers, shallowReadonlyMap);
    }
    function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
      if (!shared.isObject(target)) {
        {
          console.warn(`value cannot be made reactive: ${String(target)}`);
        }
        return target;
      }
      if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
        return target;
      }
      const existingProxy = proxyMap.get(target);
      if (existingProxy) {
        return existingProxy;
      }
      const targetType = getTargetType(target);
      if (targetType === 0) {
        return target;
      }
      const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
      proxyMap.set(target, proxy);
      return proxy;
    }
    function isReactive2(value) {
      if (isReadonly(value)) {
        return isReactive2(value["__v_raw"]);
      }
      return !!(value && value["__v_isReactive"]);
    }
    function isReadonly(value) {
      return !!(value && value["__v_isReadonly"]);
    }
    function isProxy(value) {
      return isReactive2(value) || isReadonly(value);
    }
    function toRaw2(observed) {
      return observed && toRaw2(observed["__v_raw"]) || observed;
    }
    function markRaw(value) {
      shared.def(value, "__v_skip", true);
      return value;
    }
    var convert = (val) => shared.isObject(val) ? reactive3(val) : val;
    function isRef(r) {
      return Boolean(r && r.__v_isRef === true);
    }
    function ref(value) {
      return createRef(value);
    }
    function shallowRef(value) {
      return createRef(value, true);
    }
    var RefImpl = class {
      constructor(_rawValue, _shallow = false) {
        this._rawValue = _rawValue;
        this._shallow = _shallow;
        this.__v_isRef = true;
        this._value = _shallow ? _rawValue : convert(_rawValue);
      }
      get value() {
        track(toRaw2(this), "get", "value");
        return this._value;
      }
      set value(newVal) {
        if (shared.hasChanged(toRaw2(newVal), this._rawValue)) {
          this._rawValue = newVal;
          this._value = this._shallow ? newVal : convert(newVal);
          trigger(toRaw2(this), "set", "value", newVal);
        }
      }
    };
    function createRef(rawValue, shallow = false) {
      if (isRef(rawValue)) {
        return rawValue;
      }
      return new RefImpl(rawValue, shallow);
    }
    function triggerRef(ref2) {
      trigger(toRaw2(ref2), "set", "value", ref2.value);
    }
    function unref(ref2) {
      return isRef(ref2) ? ref2.value : ref2;
    }
    var shallowUnwrapHandlers = {
      get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
      set: (target, key, value, receiver) => {
        const oldValue = target[key];
        if (isRef(oldValue) && !isRef(value)) {
          oldValue.value = value;
          return true;
        } else {
          return Reflect.set(target, key, value, receiver);
        }
      }
    };
    function proxyRefs(objectWithRefs) {
      return isReactive2(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
    }
    var CustomRefImpl = class {
      constructor(factory) {
        this.__v_isRef = true;
        const { get: get3, set: set3 } = factory(() => track(this, "get", "value"), () => trigger(this, "set", "value"));
        this._get = get3;
        this._set = set3;
      }
      get value() {
        return this._get();
      }
      set value(newVal) {
        this._set(newVal);
      }
    };
    function customRef(factory) {
      return new CustomRefImpl(factory);
    }
    function toRefs(object) {
      if (!isProxy(object)) {
        console.warn(`toRefs() expects a reactive object but received a plain one.`);
      }
      const ret = shared.isArray(object) ? new Array(object.length) : {};
      for (const key in object) {
        ret[key] = toRef(object, key);
      }
      return ret;
    }
    var ObjectRefImpl = class {
      constructor(_object, _key) {
        this._object = _object;
        this._key = _key;
        this.__v_isRef = true;
      }
      get value() {
        return this._object[this._key];
      }
      set value(newVal) {
        this._object[this._key] = newVal;
      }
    };
    function toRef(object, key) {
      return isRef(object[key]) ? object[key] : new ObjectRefImpl(object, key);
    }
    var ComputedRefImpl = class {
      constructor(getter, _setter, isReadonly2) {
        this._setter = _setter;
        this._dirty = true;
        this.__v_isRef = true;
        this.effect = effect3(getter, {
          lazy: true,
          scheduler: () => {
            if (!this._dirty) {
              this._dirty = true;
              trigger(toRaw2(this), "set", "value");
            }
          }
        });
        this["__v_isReadonly"] = isReadonly2;
      }
      get value() {
        const self2 = toRaw2(this);
        if (self2._dirty) {
          self2._value = this.effect();
          self2._dirty = false;
        }
        track(self2, "get", "value");
        return self2._value;
      }
      set value(newValue) {
        this._setter(newValue);
      }
    };
    function computed(getterOrOptions) {
      let getter;
      let setter;
      if (shared.isFunction(getterOrOptions)) {
        getter = getterOrOptions;
        setter = () => {
          console.warn("Write operation failed: computed value is readonly");
        };
      } else {
        getter = getterOrOptions.get;
        setter = getterOrOptions.set;
      }
      return new ComputedRefImpl(getter, setter, shared.isFunction(getterOrOptions) || !getterOrOptions.set);
    }
    exports.ITERATE_KEY = ITERATE_KEY;
    exports.computed = computed;
    exports.customRef = customRef;
    exports.effect = effect3;
    exports.enableTracking = enableTracking;
    exports.isProxy = isProxy;
    exports.isReactive = isReactive2;
    exports.isReadonly = isReadonly;
    exports.isRef = isRef;
    exports.markRaw = markRaw;
    exports.pauseTracking = pauseTracking;
    exports.proxyRefs = proxyRefs;
    exports.reactive = reactive3;
    exports.readonly = readonly;
    exports.ref = ref;
    exports.resetTracking = resetTracking;
    exports.shallowReactive = shallowReactive;
    exports.shallowReadonly = shallowReadonly;
    exports.shallowRef = shallowRef;
    exports.stop = stop2;
    exports.toRaw = toRaw2;
    exports.toRef = toRef;
    exports.toRefs = toRefs;
    exports.track = track;
    exports.trigger = trigger;
    exports.triggerRef = triggerRef;
    exports.unref = unref;
  });
  var require_reactivity = __commonJS2((exports, module) => {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_reactivity_cjs();
    }
  });
  var flushPending = false;
  var flushing = false;
  var queue = [];
  function scheduler(callback) {
    queueJob(callback);
  }
  function queueJob(job) {
    if (!queue.includes(job))
      queue.push(job);
    queueFlush();
  }
  function queueFlush() {
    if (!flushing && !flushPending) {
      flushPending = true;
      queueMicrotask(flushJobs);
    }
  }
  function flushJobs() {
    flushPending = false;
    flushing = true;
    for (let i = 0; i < queue.length; i++) {
      queue[i]();
    }
    queue.length = 0;
    flushing = false;
  }
  var reactive;
  var effect;
  var release;
  var raw;
  var shouldSchedule = true;
  function disableEffectScheduling(callback) {
    shouldSchedule = false;
    callback();
    shouldSchedule = true;
  }
  function setReactivityEngine(engine) {
    reactive = engine.reactive;
    release = engine.release;
    effect = (callback) => engine.effect(callback, { scheduler: (task) => {
      if (shouldSchedule) {
        scheduler(task);
      } else {
        task();
      }
    } });
    raw = engine.raw;
  }
  function overrideEffect(override) {
    effect = override;
  }
  function elementBoundEffect(el) {
    let cleanup = () => {
    };
    let wrappedEffect = (callback) => {
      let effectReference = effect(callback);
      if (!el._x_effects) {
        el._x_effects = new Set();
        el._x_runEffects = () => {
          el._x_effects.forEach((i) => i());
        };
      }
      el._x_effects.add(effectReference);
      cleanup = () => {
        if (effectReference === void 0)
          return;
        el._x_effects.delete(effectReference);
        release(effectReference);
      };
    };
    return [wrappedEffect, () => {
      cleanup();
    }];
  }
  var onAttributeAddeds = [];
  var onElRemoveds = [];
  var onElAddeds = [];
  function onElAdded(callback) {
    onElAddeds.push(callback);
  }
  function onElRemoved(callback) {
    onElRemoveds.push(callback);
  }
  function onAttributesAdded(callback) {
    onAttributeAddeds.push(callback);
  }
  function onAttributeRemoved(el, name, callback) {
    if (!el._x_attributeCleanups)
      el._x_attributeCleanups = {};
    if (!el._x_attributeCleanups[name])
      el._x_attributeCleanups[name] = [];
    el._x_attributeCleanups[name].push(callback);
  }
  function cleanupAttributes(el, names) {
    if (!el._x_attributeCleanups)
      return;
    Object.entries(el._x_attributeCleanups).forEach(([name, value]) => {
      (names === void 0 || names.includes(name)) && value.forEach((i) => i());
      delete el._x_attributeCleanups[name];
    });
  }
  var observer = new MutationObserver(onMutate);
  var currentlyObserving = false;
  function startObservingMutations() {
    observer.observe(document, { subtree: true, childList: true, attributes: true, attributeOldValue: true });
    currentlyObserving = true;
  }
  function stopObservingMutations() {
    observer.disconnect();
    currentlyObserving = false;
  }
  var recordQueue = [];
  var willProcessRecordQueue = false;
  function flushObserver() {
    recordQueue = recordQueue.concat(observer.takeRecords());
    if (recordQueue.length && !willProcessRecordQueue) {
      willProcessRecordQueue = true;
      queueMicrotask(() => {
        processRecordQueue();
        willProcessRecordQueue = false;
      });
    }
  }
  function processRecordQueue() {
    onMutate(recordQueue);
    recordQueue.length = 0;
  }
  function mutateDom(callback) {
    if (!currentlyObserving)
      return callback();
    flushObserver();
    stopObservingMutations();
    let result = callback();
    startObservingMutations();
    return result;
  }
  function onMutate(mutations) {
    let addedNodes = [];
    let removedNodes = [];
    let addedAttributes = new Map();
    let removedAttributes = new Map();
    for (let i = 0; i < mutations.length; i++) {
      if (mutations[i].target._x_ignoreMutationObserver)
        continue;
      if (mutations[i].type === "childList") {
        mutations[i].addedNodes.forEach((node) => node.nodeType === 1 && addedNodes.push(node));
        mutations[i].removedNodes.forEach((node) => node.nodeType === 1 && removedNodes.push(node));
      }
      if (mutations[i].type === "attributes") {
        let el = mutations[i].target;
        let name = mutations[i].attributeName;
        let oldValue = mutations[i].oldValue;
        let add = () => {
          if (!addedAttributes.has(el))
            addedAttributes.set(el, []);
          addedAttributes.get(el).push({ name, value: el.getAttribute(name) });
        };
        let remove = () => {
          if (!removedAttributes.has(el))
            removedAttributes.set(el, []);
          removedAttributes.get(el).push(name);
        };
        if (el.hasAttribute(name) && oldValue === null) {
          add();
        } else if (el.hasAttribute(name)) {
          remove();
          add();
        } else {
          remove();
        }
      }
    }
    removedAttributes.forEach((attrs, el) => {
      cleanupAttributes(el, attrs);
    });
    addedAttributes.forEach((attrs, el) => {
      onAttributeAddeds.forEach((i) => i(el, attrs));
    });
    for (let node of addedNodes) {
      if (removedNodes.includes(node))
        continue;
      onElAddeds.forEach((i) => i(node));
    }
    for (let node of removedNodes) {
      if (addedNodes.includes(node))
        continue;
      onElRemoveds.forEach((i) => i(node));
    }
    addedNodes = null;
    removedNodes = null;
    addedAttributes = null;
    removedAttributes = null;
  }
  function addScopeToNode(node, data2, referenceNode) {
    node._x_dataStack = [data2, ...closestDataStack(referenceNode || node)];
    return () => {
      node._x_dataStack = node._x_dataStack.filter((i) => i !== data2);
    };
  }
  function refreshScope(element, scope) {
    let existingScope = element._x_dataStack[0];
    Object.entries(scope).forEach(([key, value]) => {
      existingScope[key] = value;
    });
  }
  function closestDataStack(node) {
    if (node._x_dataStack)
      return node._x_dataStack;
    if (node instanceof ShadowRoot) {
      return closestDataStack(node.host);
    }
    if (!node.parentNode) {
      return [];
    }
    return closestDataStack(node.parentNode);
  }
  function mergeProxies(objects) {
    return new Proxy({}, {
      ownKeys: () => {
        return Array.from(new Set(objects.flatMap((i) => Object.keys(i))));
      },
      has: (target, name) => {
        return objects.some((obj) => obj.hasOwnProperty(name));
      },
      get: (target, name) => {
        return (objects.find((obj) => obj.hasOwnProperty(name)) || {})[name];
      },
      set: (target, name, value) => {
        let closestObjectWithKey = objects.find((obj) => obj.hasOwnProperty(name));
        if (closestObjectWithKey) {
          closestObjectWithKey[name] = value;
        } else {
          objects[objects.length - 1][name] = value;
        }
        return true;
      }
    });
  }
  function initInterceptors(data2) {
    let isObject = (val) => typeof val === "object" && !Array.isArray(val) && val !== null;
    let recurse = (obj, basePath = "") => {
      Object.entries(obj).forEach(([key, value]) => {
        let path = basePath === "" ? key : `${basePath}.${key}`;
        if (typeof value === "object" && value !== null && value._x_interceptor) {
          obj[key] = value.initialize(data2, path, key);
        } else {
          if (isObject(value) && value !== obj && !(value instanceof Element)) {
            recurse(value, path);
          }
        }
      });
    };
    return recurse(data2);
  }
  function interceptor(callback, mutateObj = () => {
  }) {
    let obj = {
      initialValue: void 0,
      _x_interceptor: true,
      initialize(data2, path, key) {
        return callback(this.initialValue, () => get(data2, path), (value) => set(data2, path, value), path, key);
      }
    };
    mutateObj(obj);
    return (initialValue) => {
      if (typeof initialValue === "object" && initialValue !== null && initialValue._x_interceptor) {
        let initialize = obj.initialize.bind(obj);
        obj.initialize = (data2, path, key) => {
          let innerValue = initialValue.initialize(data2, path, key);
          obj.initialValue = innerValue;
          return initialize(data2, path, key);
        };
      } else {
        obj.initialValue = initialValue;
      }
      return obj;
    };
  }
  function get(obj, path) {
    return path.split(".").reduce((carry, segment) => carry[segment], obj);
  }
  function set(obj, path, value) {
    if (typeof path === "string")
      path = path.split(".");
    if (path.length === 1)
      obj[path[0]] = value;
    else if (path.length === 0)
      throw error;
    else {
      if (obj[path[0]])
        return set(obj[path[0]], path.slice(1), value);
      else {
        obj[path[0]] = {};
        return set(obj[path[0]], path.slice(1), value);
      }
    }
  }
  var magics = {};
  function magic(name, callback) {
    magics[name] = callback;
  }
  function injectMagics(obj, el) {
    Object.entries(magics).forEach(([name, callback]) => {
      Object.defineProperty(obj, `$${name}`, {
        get() {
          return callback(el, { Alpine: alpine_default, interceptor });
        },
        enumerable: false
      });
    });
    return obj;
  }
  function evaluate(el, expression, extras = {}) {
    let result;
    evaluateLater(el, expression)((value) => result = value, extras);
    return result;
  }
  function evaluateLater(...args) {
    return theEvaluatorFunction(...args);
  }
  var theEvaluatorFunction = normalEvaluator;
  function setEvaluator(newEvaluator) {
    theEvaluatorFunction = newEvaluator;
  }
  function normalEvaluator(el, expression) {
    let overriddenMagics = {};
    injectMagics(overriddenMagics, el);
    let dataStack = [overriddenMagics, ...closestDataStack(el)];
    if (typeof expression === "function") {
      return generateEvaluatorFromFunction(dataStack, expression);
    }
    let evaluator = generateEvaluatorFromString(dataStack, expression);
    return tryCatch.bind(null, el, expression, evaluator);
  }
  function generateEvaluatorFromFunction(dataStack, func) {
    return (receiver = () => {
    }, { scope = {}, params = [] } = {}) => {
      let result = func.apply(mergeProxies([scope, ...dataStack]), params);
      runIfTypeOfFunction(receiver, result);
    };
  }
  var evaluatorMemo = {};
  function generateFunctionFromString(expression) {
    if (evaluatorMemo[expression]) {
      return evaluatorMemo[expression];
    }
    let AsyncFunction = Object.getPrototypeOf(function() {
      return __async(this, null, function* () {
      });
    }).constructor;
    let rightSideSafeExpression = /^[\n\s]*if.*\(.*\)/.test(expression) || /^(let|const)/.test(expression) ? `(() => { ${expression} })()` : expression;
    let func = new AsyncFunction(["__self", "scope"], `with (scope) { __self.result = ${rightSideSafeExpression} }; __self.finished = true; return __self.result;`);
    evaluatorMemo[expression] = func;
    return func;
  }
  function generateEvaluatorFromString(dataStack, expression) {
    let func = generateFunctionFromString(expression);
    return (receiver = () => {
    }, { scope = {}, params = [] } = {}) => {
      func.result = void 0;
      func.finished = false;
      let completeScope = mergeProxies([scope, ...dataStack]);
      let promise = func(func, completeScope);
      if (func.finished) {
        runIfTypeOfFunction(receiver, func.result, completeScope, params);
      } else {
        promise.then((result) => {
          runIfTypeOfFunction(receiver, result, completeScope, params);
        });
      }
    };
  }
  function runIfTypeOfFunction(receiver, value, scope, params) {
    if (typeof value === "function") {
      let result = value.apply(scope, params);
      if (result instanceof Promise) {
        result.then((i) => runIfTypeOfFunction(receiver, i, scope, params));
      } else {
        receiver(result);
      }
    } else {
      receiver(value);
    }
  }
  function tryCatch(el, expression, callback, ...args) {
    try {
      return callback(...args);
    } catch (e) {
      console.warn(`Alpine Expression Error: ${e.message}

Expression: "${expression}"

`, el);
      throw e;
    }
  }
  var prefixAsString = "x-";
  function prefix(subject = "") {
    return prefixAsString + subject;
  }
  function setPrefix(newPrefix) {
    prefixAsString = newPrefix;
  }
  var directiveHandlers = {};
  function directive(name, callback) {
    directiveHandlers[name] = callback;
  }
  function directives(el, attributes, originalAttributeOverride) {
    let transformedAttributeMap = {};
    let directives2 = Array.from(attributes).map(toTransformedAttributes((newName, oldName) => transformedAttributeMap[newName] = oldName)).filter(outNonAlpineAttributes).map(toParsedDirectives(transformedAttributeMap, originalAttributeOverride)).sort(byPriority);
    return directives2.map((directive2) => {
      return getDirectiveHandler(el, directive2);
    });
  }
  var isDeferringHandlers = false;
  var directiveHandlerStack = [];
  function deferHandlingDirectives(callback) {
    isDeferringHandlers = true;
    let flushHandlers = () => {
      while (directiveHandlerStack.length)
        directiveHandlerStack.shift()();
    };
    let stopDeferring = () => {
      isDeferringHandlers = false;
      flushHandlers();
    };
    callback(flushHandlers);
    stopDeferring();
  }
  function getDirectiveHandler(el, directive2) {
    let noop = () => {
    };
    let handler3 = directiveHandlers[directive2.type] || noop;
    let cleanups = [];
    let cleanup = (callback) => cleanups.push(callback);
    let [effect3, cleanupEffect] = elementBoundEffect(el);
    cleanups.push(cleanupEffect);
    let utilities = {
      Alpine: alpine_default,
      effect: effect3,
      cleanup,
      evaluateLater: evaluateLater.bind(evaluateLater, el),
      evaluate: evaluate.bind(evaluate, el)
    };
    let doCleanup = () => cleanups.forEach((i) => i());
    onAttributeRemoved(el, directive2.original, doCleanup);
    let fullHandler = () => {
      if (el._x_ignore || el._x_ignoreSelf)
        return;
      handler3.inline && handler3.inline(el, directive2, utilities);
      handler3 = handler3.bind(handler3, el, directive2, utilities);
      isDeferringHandlers ? directiveHandlerStack.push(handler3) : handler3();
    };
    fullHandler.runCleanups = doCleanup;
    return fullHandler;
  }
  var startingWith = (subject, replacement) => ({ name, value }) => {
    if (name.startsWith(subject))
      name = name.replace(subject, replacement);
    return { name, value };
  };
  var into = (i) => i;
  function toTransformedAttributes(callback) {
    return ({ name, value }) => {
      let { name: newName, value: newValue } = attributeTransformers.reduce((carry, transform) => {
        return transform(carry);
      }, { name, value });
      if (newName !== name)
        callback(newName, name);
      return { name: newName, value: newValue };
    };
  }
  var attributeTransformers = [];
  function mapAttributes(callback) {
    attributeTransformers.push(callback);
  }
  function outNonAlpineAttributes({ name }) {
    return alpineAttributeRegex().test(name);
  }
  var alpineAttributeRegex = () => new RegExp(`^${prefixAsString}([^:^.]+)\\b`);
  function toParsedDirectives(transformedAttributeMap, originalAttributeOverride) {
    return ({ name, value }) => {
      let typeMatch = name.match(alpineAttributeRegex());
      let valueMatch = name.match(/:([a-zA-Z0-9\-:]+)/);
      let modifiers = name.match(/\.[^.\]]+(?=[^\]]*$)/g) || [];
      let original = originalAttributeOverride || transformedAttributeMap[name] || name;
      return {
        type: typeMatch ? typeMatch[1] : null,
        value: valueMatch ? valueMatch[1] : null,
        modifiers: modifiers.map((i) => i.replace(".", "")),
        expression: value,
        original
      };
    };
  }
  var DEFAULT = "DEFAULT";
  var directiveOrder = [
    "ignore",
    "ref",
    "data",
    "bind",
    "init",
    "for",
    "model",
    "transition",
    "show",
    "if",
    DEFAULT,
    "element"
  ];
  function byPriority(a, b) {
    let typeA = directiveOrder.indexOf(a.type) === -1 ? DEFAULT : a.type;
    let typeB = directiveOrder.indexOf(b.type) === -1 ? DEFAULT : b.type;
    return directiveOrder.indexOf(typeA) - directiveOrder.indexOf(typeB);
  }
  function dispatch(el, name, detail = {}) {
    el.dispatchEvent(new CustomEvent(name, {
      detail,
      bubbles: true,
      composed: true,
      cancelable: true
    }));
  }
  var tickStack = [];
  var isHolding = false;
  function nextTick(callback) {
    tickStack.push(callback);
    queueMicrotask(() => {
      isHolding || setTimeout(() => {
        releaseNextTicks();
      });
    });
  }
  function releaseNextTicks() {
    isHolding = false;
    while (tickStack.length)
      tickStack.shift()();
  }
  function holdNextTicks() {
    isHolding = true;
  }
  function walk(el, callback) {
    if (el instanceof ShadowRoot) {
      Array.from(el.children).forEach((el2) => walk(el2, callback));
      return;
    }
    let skip = false;
    callback(el, () => skip = true);
    if (skip)
      return;
    let node = el.firstElementChild;
    while (node) {
      walk(node, callback, false);
      node = node.nextElementSibling;
    }
  }
  function warn(message, ...args) {
    console.warn(`Alpine Warning: ${message}`, ...args);
  }
  function start() {
    if (!document.body)
      warn("Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?");
    dispatch(document, "alpine:init");
    dispatch(document, "alpine:initializing");
    startObservingMutations();
    onElAdded((el) => initTree(el, walk));
    onElRemoved((el) => nextTick(() => destroyTree(el)));
    onAttributesAdded((el, attrs) => {
      directives(el, attrs).forEach((handle) => handle());
    });
    let outNestedComponents = (el) => !closestRoot(el.parentNode || closestRoot(el));
    Array.from(document.querySelectorAll(allSelectors())).filter(outNestedComponents).forEach((el) => {
      initTree(el);
    });
    dispatch(document, "alpine:initialized");
  }
  var rootSelectorCallbacks = [];
  var initSelectorCallbacks = [];
  function rootSelectors() {
    return rootSelectorCallbacks.map((fn) => fn());
  }
  function allSelectors() {
    return rootSelectorCallbacks.concat(initSelectorCallbacks).map((fn) => fn());
  }
  function addRootSelector(selectorCallback) {
    rootSelectorCallbacks.push(selectorCallback);
  }
  function addInitSelector(selectorCallback) {
    initSelectorCallbacks.push(selectorCallback);
  }
  function closestRoot(el) {
    if (rootSelectors().some((selector) => el.matches(selector)))
      return el;
    if (!el.parentElement)
      return;
    return closestRoot(el.parentElement);
  }
  function isRoot(el) {
    return rootSelectors().some((selector) => el.matches(selector));
  }
  function initTree(el, walker = walk) {
    deferHandlingDirectives(() => {
      walker(el, (el2, skip) => {
        directives(el2, el2.attributes).forEach((handle) => handle());
        el2._x_ignore && skip();
      });
    });
  }
  function destroyTree(root) {
    walk(root, (el) => cleanupAttributes(el));
  }
  function plugin(callback) {
    callback(alpine_default);
  }
  var stores = {};
  var isReactive = false;
  function store(name, value) {
    if (!isReactive) {
      stores = reactive(stores);
      isReactive = true;
    }
    if (value === void 0) {
      return stores[name];
    }
    stores[name] = value;
    if (typeof value === "object" && value !== null && value.hasOwnProperty("init") && typeof value.init === "function") {
      stores[name].init();
    }
  }
  function getStores() {
    return stores;
  }
  var isCloning = false;
  function skipDuringClone(callback) {
    return (...args) => isCloning || callback(...args);
  }
  function clone(oldEl, newEl) {
    newEl._x_dataStack = oldEl._x_dataStack;
    isCloning = true;
    dontRegisterReactiveSideEffects(() => {
      cloneTree(newEl);
    });
    isCloning = false;
  }
  function cloneTree(el) {
    let hasRunThroughFirstEl = false;
    let shallowWalker = (el2, callback) => {
      walk(el2, (el3, skip) => {
        if (hasRunThroughFirstEl && isRoot(el3))
          return skip();
        hasRunThroughFirstEl = true;
        callback(el3, skip);
      });
    };
    initTree(el, shallowWalker);
  }
  function dontRegisterReactiveSideEffects(callback) {
    let cache = effect;
    overrideEffect((callback2, el) => {
      let storedEffect = cache(callback2);
      release(storedEffect);
      return () => {
      };
    });
    callback();
    overrideEffect(cache);
  }
  var datas = {};
  function data(name, callback) {
    datas[name] = callback;
  }
  function injectDataProviders(obj, context) {
    Object.entries(datas).forEach(([name, callback]) => {
      Object.defineProperty(obj, name, {
        get() {
          return (...args) => {
            return callback.bind(context)(...args);
          };
        },
        enumerable: false
      });
    });
    return obj;
  }
  var Alpine = {
    get reactive() {
      return reactive;
    },
    get release() {
      return release;
    },
    get effect() {
      return effect;
    },
    get raw() {
      return raw;
    },
    version: "3.2.2",
    disableEffectScheduling,
    setReactivityEngine,
    addRootSelector,
    mapAttributes,
    evaluateLater,
    setEvaluator,
    closestRoot,
    interceptor,
    mutateDom,
    directive,
    evaluate,
    initTree,
    nextTick,
    prefix: setPrefix,
    plugin,
    magic,
    store,
    start,
    clone,
    data
  };
  var alpine_default = Alpine;
  var import_reactivity9 = __toModule2(require_reactivity());
  magic("nextTick", () => nextTick);
  magic("dispatch", (el) => dispatch.bind(dispatch, el));
  magic("watch", (el) => (key, callback) => {
    let evaluate2 = evaluateLater(el, key);
    let firstTime = true;
    let oldValue;
    effect(() => evaluate2((value) => {
      let div = document.createElement("div");
      div.dataset.throwAway = value;
      if (!firstTime) {
        queueMicrotask(() => {
          callback(value, oldValue);
          oldValue = value;
        });
      } else {
        oldValue = value;
      }
      firstTime = false;
    }));
  });
  magic("store", getStores);
  magic("refs", (el) => closestRoot(el)._x_refs || {});
  magic("el", (el) => el);
  function setClasses(el, value) {
    if (Array.isArray(value)) {
      return setClassesFromString(el, value.join(" "));
    } else if (typeof value === "object" && value !== null) {
      return setClassesFromObject(el, value);
    } else if (typeof value === "function") {
      return setClasses(el, value());
    }
    return setClassesFromString(el, value);
  }
  function setClassesFromString(el, classString) {
    let split = (classString2) => classString2.split(" ").filter(Boolean);
    let missingClasses = (classString2) => classString2.split(" ").filter((i) => !el.classList.contains(i)).filter(Boolean);
    let addClassesAndReturnUndo = (classes) => {
      el.classList.add(...classes);
      return () => {
        el.classList.remove(...classes);
      };
    };
    classString = classString === true ? classString = "" : classString || "";
    return addClassesAndReturnUndo(missingClasses(classString));
  }
  function setClassesFromObject(el, classObject) {
    let split = (classString) => classString.split(" ").filter(Boolean);
    let forAdd = Object.entries(classObject).flatMap(([classString, bool]) => bool ? split(classString) : false).filter(Boolean);
    let forRemove = Object.entries(classObject).flatMap(([classString, bool]) => !bool ? split(classString) : false).filter(Boolean);
    let added = [];
    let removed = [];
    forRemove.forEach((i) => {
      if (el.classList.contains(i)) {
        el.classList.remove(i);
        removed.push(i);
      }
    });
    forAdd.forEach((i) => {
      if (!el.classList.contains(i)) {
        el.classList.add(i);
        added.push(i);
      }
    });
    return () => {
      removed.forEach((i) => el.classList.add(i));
      added.forEach((i) => el.classList.remove(i));
    };
  }
  function setStyles(el, value) {
    if (typeof value === "object" && value !== null) {
      return setStylesFromObject(el, value);
    }
    return setStylesFromString(el, value);
  }
  function setStylesFromObject(el, value) {
    let previousStyles = {};
    Object.entries(value).forEach(([key, value2]) => {
      previousStyles[key] = el.style[key];
      el.style[key] = value2;
    });
    setTimeout(() => {
      if (el.style.length === 0) {
        el.removeAttribute("style");
      }
    });
    return () => {
      setStyles(el, previousStyles);
    };
  }
  function setStylesFromString(el, value) {
    let cache = el.getAttribute("style", value);
    el.setAttribute("style", value);
    return () => {
      el.setAttribute("style", cache);
    };
  }
  function once(callback, fallback = () => {
  }) {
    let called = false;
    return function() {
      if (!called) {
        called = true;
        callback.apply(this, arguments);
      } else {
        fallback.apply(this, arguments);
      }
    };
  }
  directive("transition", (el, { value, modifiers, expression }, { evaluate: evaluate2 }) => {
    if (typeof expression === "function")
      expression = evaluate2(expression);
    if (!expression) {
      registerTransitionsFromHelper(el, modifiers, value);
    } else {
      registerTransitionsFromClassString(el, expression, value);
    }
  });
  function registerTransitionsFromClassString(el, classString, stage) {
    registerTransitionObject(el, setClasses, "");
    let directiveStorageMap = {
      enter: (classes) => {
        el._x_transition.enter.during = classes;
      },
      "enter-start": (classes) => {
        el._x_transition.enter.start = classes;
      },
      "enter-end": (classes) => {
        el._x_transition.enter.end = classes;
      },
      leave: (classes) => {
        el._x_transition.leave.during = classes;
      },
      "leave-start": (classes) => {
        el._x_transition.leave.start = classes;
      },
      "leave-end": (classes) => {
        el._x_transition.leave.end = classes;
      }
    };
    directiveStorageMap[stage](classString);
  }
  function registerTransitionsFromHelper(el, modifiers, stage) {
    registerTransitionObject(el, setStyles);
    let doesntSpecify = !modifiers.includes("in") && !modifiers.includes("out") && !stage;
    let transitioningIn = doesntSpecify || modifiers.includes("in") || ["enter"].includes(stage);
    let transitioningOut = doesntSpecify || modifiers.includes("out") || ["leave"].includes(stage);
    if (modifiers.includes("in") && !doesntSpecify) {
      modifiers = modifiers.filter((i, index) => index < modifiers.indexOf("out"));
    }
    if (modifiers.includes("out") && !doesntSpecify) {
      modifiers = modifiers.filter((i, index) => index > modifiers.indexOf("out"));
    }
    let wantsAll = !modifiers.includes("opacity") && !modifiers.includes("scale");
    let wantsOpacity = wantsAll || modifiers.includes("opacity");
    let wantsScale = wantsAll || modifiers.includes("scale");
    let opacityValue = wantsOpacity ? 0 : 1;
    let scaleValue = wantsScale ? modifierValue(modifiers, "scale", 95) / 100 : 1;
    let delay = modifierValue(modifiers, "delay", 0);
    let origin = modifierValue(modifiers, "origin", "center");
    let property = "opacity, transform";
    let durationIn = modifierValue(modifiers, "duration", 150) / 1e3;
    let durationOut = modifierValue(modifiers, "duration", 75) / 1e3;
    let easing = `cubic-bezier(0.4, 0.0, 0.2, 1)`;
    if (transitioningIn) {
      el._x_transition.enter.during = {
        transformOrigin: origin,
        transitionDelay: delay,
        transitionProperty: property,
        transitionDuration: `${durationIn}s`,
        transitionTimingFunction: easing
      };
      el._x_transition.enter.start = {
        opacity: opacityValue,
        transform: `scale(${scaleValue})`
      };
      el._x_transition.enter.end = {
        opacity: 1,
        transform: `scale(1)`
      };
    }
    if (transitioningOut) {
      el._x_transition.leave.during = {
        transformOrigin: origin,
        transitionDelay: delay,
        transitionProperty: property,
        transitionDuration: `${durationOut}s`,
        transitionTimingFunction: easing
      };
      el._x_transition.leave.start = {
        opacity: 1,
        transform: `scale(1)`
      };
      el._x_transition.leave.end = {
        opacity: opacityValue,
        transform: `scale(${scaleValue})`
      };
    }
  }
  function registerTransitionObject(el, setFunction, defaultValue = {}) {
    if (!el._x_transition)
      el._x_transition = {
        enter: { during: defaultValue, start: defaultValue, end: defaultValue },
        leave: { during: defaultValue, start: defaultValue, end: defaultValue },
        in(before = () => {
        }, after = () => {
        }) {
          transition(el, setFunction, {
            during: this.enter.during,
            start: this.enter.start,
            end: this.enter.end,
            entering: true
          }, before, after);
        },
        out(before = () => {
        }, after = () => {
        }) {
          transition(el, setFunction, {
            during: this.leave.during,
            start: this.leave.start,
            end: this.leave.end,
            entering: false
          }, before, after);
        }
      };
  }
  window.Element.prototype._x_toggleAndCascadeWithTransitions = function(el, value, show, hide) {
    let clickAwayCompatibleShow = () => requestAnimationFrame(show);
    if (value) {
      el._x_transition ? el._x_transition.in(show) : clickAwayCompatibleShow();
      return;
    }
    el._x_hidePromise = el._x_transition ? new Promise((resolve, reject) => {
      el._x_transition.out(() => {
      }, () => resolve(hide));
      el._x_transitioning.beforeCancel(() => reject({ isFromCancelledTransition: true }));
    }) : Promise.resolve(hide);
    queueMicrotask(() => {
      let closest = closestHide(el);
      if (closest) {
        if (!closest._x_hideChildren)
          closest._x_hideChildren = [];
        closest._x_hideChildren.push(el);
      } else {
        queueMicrotask(() => {
          let hideAfterChildren = (el2) => {
            let carry = Promise.all([
              el2._x_hidePromise,
              ...(el2._x_hideChildren || []).map(hideAfterChildren)
            ]).then(([i]) => i());
            delete el2._x_hidePromise;
            delete el2._x_hideChildren;
            return carry;
          };
          hideAfterChildren(el).catch((e) => {
            if (!e.isFromCancelledTransition)
              throw e;
          });
        });
      }
    });
  };
  function closestHide(el) {
    let parent = el.parentNode;
    if (!parent)
      return;
    return parent._x_hidePromise ? parent : closestHide(parent);
  }
  function transition(el, setFunction, { during, start: start2, end, entering } = {}, before = () => {
  }, after = () => {
  }) {
    if (el._x_transitioning)
      el._x_transitioning.cancel();
    if (Object.keys(during).length === 0 && Object.keys(start2).length === 0 && Object.keys(end).length === 0) {
      before();
      after();
      return;
    }
    let undoStart, undoDuring, undoEnd;
    performTransition(el, {
      start() {
        undoStart = setFunction(el, start2);
      },
      during() {
        undoDuring = setFunction(el, during);
      },
      before,
      end() {
        undoStart();
        undoEnd = setFunction(el, end);
      },
      after,
      cleanup() {
        undoDuring();
        undoEnd();
      }
    }, entering);
  }
  function performTransition(el, stages, entering) {
    let interrupted, reachedBefore, reachedEnd;
    let finish = once(() => {
      mutateDom(() => {
        interrupted = true;
        if (!reachedBefore)
          stages.before();
        if (!reachedEnd) {
          stages.end();
          releaseNextTicks();
        }
        stages.after();
        if (el.isConnected)
          stages.cleanup();
        delete el._x_transitioning;
      });
    });
    el._x_transitioning = {
      beforeCancels: [],
      beforeCancel(callback) {
        this.beforeCancels.push(callback);
      },
      cancel: once(function() {
        while (this.beforeCancels.length) {
          this.beforeCancels.shift()();
        }
        ;
        finish();
      }),
      finish,
      entering
    };
    mutateDom(() => {
      stages.start();
      stages.during();
    });
    holdNextTicks();
    requestAnimationFrame(() => {
      if (interrupted)
        return;
      let duration = Number(getComputedStyle(el).transitionDuration.replace(/,.*/, "").replace("s", "")) * 1e3;
      let delay = Number(getComputedStyle(el).transitionDelay.replace(/,.*/, "").replace("s", "")) * 1e3;
      if (duration === 0)
        duration = Number(getComputedStyle(el).animationDuration.replace("s", "")) * 1e3;
      mutateDom(() => {
        stages.before();
      });
      reachedBefore = true;
      requestAnimationFrame(() => {
        if (interrupted)
          return;
        mutateDom(() => {
          stages.end();
        });
        releaseNextTicks();
        setTimeout(el._x_transitioning.finish, duration + delay);
        reachedEnd = true;
      });
    });
  }
  function modifierValue(modifiers, key, fallback) {
    if (modifiers.indexOf(key) === -1)
      return fallback;
    const rawValue = modifiers[modifiers.indexOf(key) + 1];
    if (!rawValue)
      return fallback;
    if (key === "scale") {
      if (isNaN(rawValue))
        return fallback;
    }
    if (key === "duration") {
      let match = rawValue.match(/([0-9]+)ms/);
      if (match)
        return match[1];
    }
    if (key === "origin") {
      if (["top", "right", "left", "center", "bottom"].includes(modifiers[modifiers.indexOf(key) + 2])) {
        return [rawValue, modifiers[modifiers.indexOf(key) + 2]].join(" ");
      }
    }
    return rawValue;
  }
  var handler = () => {
  };
  handler.inline = (el, { modifiers }, { cleanup }) => {
    modifiers.includes("self") ? el._x_ignoreSelf = true : el._x_ignore = true;
    cleanup(() => {
      modifiers.includes("self") ? delete el._x_ignoreSelf : delete el._x_ignore;
    });
  };
  directive("ignore", handler);
  directive("effect", (el, { expression }, { effect: effect3 }) => effect3(evaluateLater(el, expression)));
  function bind(el, name, value, modifiers = []) {
    if (!el._x_bindings)
      el._x_bindings = reactive({});
    el._x_bindings[name] = value;
    name = modifiers.includes("camel") ? camelCase(name) : name;
    switch (name) {
      case "value":
        bindInputValue(el, value);
        break;
      case "style":
        bindStyles(el, value);
        break;
      case "class":
        bindClasses(el, value);
        break;
      default:
        bindAttribute(el, name, value);
        break;
    }
  }
  function bindInputValue(el, value) {
    if (el.type === "radio") {
      if (el.attributes.value === void 0) {
        el.value = value;
      }
      if (window.fromModel) {
        el.checked = checkedAttrLooseCompare(el.value, value);
      }
    } else if (el.type === "checkbox") {
      if (Number.isInteger(value)) {
        el.value = value;
      } else if (!Number.isInteger(value) && !Array.isArray(value) && typeof value !== "boolean" && ![null, void 0].includes(value)) {
        el.value = String(value);
      } else {
        if (Array.isArray(value)) {
          el.checked = value.some((val) => checkedAttrLooseCompare(val, el.value));
        } else {
          el.checked = !!value;
        }
      }
    } else if (el.tagName === "SELECT") {
      updateSelect(el, value);
    } else {
      if (el.value === value)
        return;
      el.value = value;
    }
  }
  function bindClasses(el, value) {
    if (el._x_undoAddedClasses)
      el._x_undoAddedClasses();
    el._x_undoAddedClasses = setClasses(el, value);
  }
  function bindStyles(el, value) {
    if (el._x_undoAddedStyles)
      el._x_undoAddedStyles();
    el._x_undoAddedStyles = setStyles(el, value);
  }
  function bindAttribute(el, name, value) {
    if ([null, void 0, false].includes(value) && attributeShouldntBePreservedIfFalsy(name)) {
      el.removeAttribute(name);
    } else {
      if (isBooleanAttr(name))
        value = name;
      setIfChanged(el, name, value);
    }
  }
  function setIfChanged(el, attrName, value) {
    if (el.getAttribute(attrName) != value) {
      el.setAttribute(attrName, value);
    }
  }
  function updateSelect(el, value) {
    const arrayWrappedValue = [].concat(value).map((value2) => {
      return value2 + "";
    });
    Array.from(el.options).forEach((option) => {
      option.selected = arrayWrappedValue.includes(option.value);
    });
  }
  function camelCase(subject) {
    return subject.toLowerCase().replace(/-(\w)/g, (match, char) => char.toUpperCase());
  }
  function checkedAttrLooseCompare(valueA, valueB) {
    return valueA == valueB;
  }
  function isBooleanAttr(attrName) {
    const booleanAttributes = [
      "disabled",
      "checked",
      "required",
      "readonly",
      "hidden",
      "open",
      "selected",
      "autofocus",
      "itemscope",
      "multiple",
      "novalidate",
      "allowfullscreen",
      "allowpaymentrequest",
      "formnovalidate",
      "autoplay",
      "controls",
      "loop",
      "muted",
      "playsinline",
      "default",
      "ismap",
      "reversed",
      "async",
      "defer",
      "nomodule"
    ];
    return booleanAttributes.includes(attrName);
  }
  function attributeShouldntBePreservedIfFalsy(name) {
    return !["aria-pressed", "aria-checked"].includes(name);
  }
  function on(el, event, modifiers, callback) {
    let listenerTarget = el;
    let handler3 = (e) => callback(e);
    let options = {};
    let wrapHandler = (callback2, wrapper) => (e) => wrapper(callback2, e);
    if (modifiers.includes("camel"))
      event = camelCase2(event);
    if (modifiers.includes("passive"))
      options.passive = true;
    if (modifiers.includes("window"))
      listenerTarget = window;
    if (modifiers.includes("document"))
      listenerTarget = document;
    if (modifiers.includes("prevent"))
      handler3 = wrapHandler(handler3, (next, e) => {
        e.preventDefault();
        next(e);
      });
    if (modifiers.includes("stop"))
      handler3 = wrapHandler(handler3, (next, e) => {
        e.stopPropagation();
        next(e);
      });
    if (modifiers.includes("self"))
      handler3 = wrapHandler(handler3, (next, e) => {
        e.target === el && next(e);
      });
    if (modifiers.includes("away") || modifiers.includes("outside")) {
      listenerTarget = document;
      handler3 = wrapHandler(handler3, (next, e) => {
        if (el.contains(e.target))
          return;
        if (el.offsetWidth < 1 && el.offsetHeight < 1)
          return;
        next(e);
      });
    }
    handler3 = wrapHandler(handler3, (next, e) => {
      if (isKeyEvent(event)) {
        if (isListeningForASpecificKeyThatHasntBeenPressed(e, modifiers)) {
          return;
        }
      }
      next(e);
    });
    if (modifiers.includes("debounce")) {
      let nextModifier = modifiers[modifiers.indexOf("debounce") + 1] || "invalid-wait";
      let wait = isNumeric(nextModifier.split("ms")[0]) ? Number(nextModifier.split("ms")[0]) : 250;
      handler3 = debounce(handler3, wait, this);
    }
    if (modifiers.includes("throttle")) {
      let nextModifier = modifiers[modifiers.indexOf("throttle") + 1] || "invalid-wait";
      let wait = isNumeric(nextModifier.split("ms")[0]) ? Number(nextModifier.split("ms")[0]) : 250;
      handler3 = throttle(handler3, wait, this);
    }
    if (modifiers.includes("once")) {
      handler3 = wrapHandler(handler3, (next, e) => {
        next(e);
        listenerTarget.removeEventListener(event, handler3, options);
      });
    }
    listenerTarget.addEventListener(event, handler3, options);
    return () => {
      listenerTarget.removeEventListener(event, handler3, options);
    };
  }
  function camelCase2(subject) {
    return subject.toLowerCase().replace(/-(\w)/g, (match, char) => char.toUpperCase());
  }
  function debounce(func, wait) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        func.apply(context, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  function throttle(func, limit) {
    let inThrottle;
    return function() {
      let context = this, args = arguments;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
  function isNumeric(subject) {
    return !Array.isArray(subject) && !isNaN(subject);
  }
  function kebabCase(subject) {
    return subject.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[_\s]/, "-").toLowerCase();
  }
  function isKeyEvent(event) {
    return ["keydown", "keyup"].includes(event);
  }
  function isListeningForASpecificKeyThatHasntBeenPressed(e, modifiers) {
    let keyModifiers = modifiers.filter((i) => {
      return !["window", "document", "prevent", "stop", "once"].includes(i);
    });
    if (keyModifiers.includes("debounce")) {
      let debounceIndex = keyModifiers.indexOf("debounce");
      keyModifiers.splice(debounceIndex, isNumeric((keyModifiers[debounceIndex + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
    }
    if (keyModifiers.length === 0)
      return false;
    if (keyModifiers.length === 1 && keyModifiers[0] === keyToModifier(e.key))
      return false;
    const systemKeyModifiers = ["ctrl", "shift", "alt", "meta", "cmd", "super"];
    const selectedSystemKeyModifiers = systemKeyModifiers.filter((modifier) => keyModifiers.includes(modifier));
    keyModifiers = keyModifiers.filter((i) => !selectedSystemKeyModifiers.includes(i));
    if (selectedSystemKeyModifiers.length > 0) {
      const activelyPressedKeyModifiers = selectedSystemKeyModifiers.filter((modifier) => {
        if (modifier === "cmd" || modifier === "super")
          modifier = "meta";
        return e[`${modifier}Key`];
      });
      if (activelyPressedKeyModifiers.length === selectedSystemKeyModifiers.length) {
        if (keyModifiers[0] === keyToModifier(e.key))
          return false;
      }
    }
    return true;
  }
  function keyToModifier(key) {
    switch (key) {
      case "/":
        return "slash";
      case " ":
      case "Spacebar":
        return "space";
      default:
        return key && kebabCase(key);
    }
  }
  directive("model", (el, { modifiers, expression }, { effect: effect3, cleanup }) => {
    let evaluate2 = evaluateLater(el, expression);
    let assignmentExpression = `${expression} = rightSideOfExpression($event, ${expression})`;
    let evaluateAssignment = evaluateLater(el, assignmentExpression);
    var event = el.tagName.toLowerCase() === "select" || ["checkbox", "radio"].includes(el.type) || modifiers.includes("lazy") ? "change" : "input";
    let assigmentFunction = generateAssignmentFunction(el, modifiers, expression);
    let removeListener = on(el, event, modifiers, (e) => {
      evaluateAssignment(() => {
      }, { scope: {
        $event: e,
        rightSideOfExpression: assigmentFunction
      } });
    });
    cleanup(() => removeListener());
    el._x_forceModelUpdate = () => {
      evaluate2((value) => {
        if (value === void 0 && expression.match(/\./))
          value = "";
        window.fromModel = true;
        mutateDom(() => bind(el, "value", value));
        delete window.fromModel;
      });
    };
    effect3(() => {
      if (modifiers.includes("unintrusive") && document.activeElement.isSameNode(el))
        return;
      el._x_forceModelUpdate();
    });
  });
  function generateAssignmentFunction(el, modifiers, expression) {
    if (el.type === "radio") {
      mutateDom(() => {
        if (!el.hasAttribute("name"))
          el.setAttribute("name", expression);
      });
    }
    return (event, currentValue) => {
      return mutateDom(() => {
        if (event instanceof CustomEvent && event.detail !== void 0) {
          return event.detail;
        } else if (el.type === "checkbox") {
          if (Array.isArray(currentValue)) {
            let newValue = modifiers.includes("number") ? safeParseNumber(event.target.value) : event.target.value;
            return event.target.checked ? currentValue.concat([newValue]) : currentValue.filter((el2) => !checkedAttrLooseCompare2(el2, newValue));
          } else {
            return event.target.checked;
          }
        } else if (el.tagName.toLowerCase() === "select" && el.multiple) {
          return modifiers.includes("number") ? Array.from(event.target.selectedOptions).map((option) => {
            let rawValue = option.value || option.text;
            return safeParseNumber(rawValue);
          }) : Array.from(event.target.selectedOptions).map((option) => {
            return option.value || option.text;
          });
        } else {
          let rawValue = event.target.value;
          return modifiers.includes("number") ? safeParseNumber(rawValue) : modifiers.includes("trim") ? rawValue.trim() : rawValue;
        }
      });
    };
  }
  function safeParseNumber(rawValue) {
    let number = rawValue ? parseFloat(rawValue) : null;
    return isNumeric2(number) ? number : rawValue;
  }
  function checkedAttrLooseCompare2(valueA, valueB) {
    return valueA == valueB;
  }
  function isNumeric2(subject) {
    return !Array.isArray(subject) && !isNaN(subject);
  }
  directive("cloak", (el) => queueMicrotask(() => mutateDom(() => el.removeAttribute(prefix("cloak")))));
  addInitSelector(() => `[${prefix("init")}]`);
  directive("init", skipDuringClone((el, { expression }) => evaluate(el, expression, {}, false)));
  directive("text", (el, { expression }, { effect: effect3, evaluateLater: evaluateLater2 }) => {
    let evaluate2 = evaluateLater2(expression);
    effect3(() => {
      evaluate2((value) => {
        mutateDom(() => {
          el.textContent = value;
        });
      });
    });
  });
  directive("html", (el, { expression }, { effect: effect3, evaluateLater: evaluateLater2 }) => {
    let evaluate2 = evaluateLater2(expression);
    effect3(() => {
      evaluate2((value) => {
        el.innerHTML = value;
      });
    });
  });
  mapAttributes(startingWith(":", into(prefix("bind:"))));
  directive("bind", (el, { value, modifiers, expression, original }, { effect: effect3 }) => {
    if (!value)
      return applyBindingsObject(el, expression, original, effect3);
    if (value === "key")
      return storeKeyForXFor(el, expression);
    let evaluate2 = evaluateLater(el, expression);
    effect3(() => evaluate2((result) => {
      if (result === void 0 && expression.match(/\./))
        result = "";
      mutateDom(() => bind(el, value, result, modifiers));
    }));
  });
  function applyBindingsObject(el, expression, original, effect3) {
    let getBindings = evaluateLater(el, expression);
    let cleanupRunners = [];
    effect3(() => {
      while (cleanupRunners.length)
        cleanupRunners.pop()();
      getBindings((bindings) => {
        let attributes = Object.entries(bindings).map(([name, value]) => ({ name, value }));
        directives(el, attributes, original).map((handle) => {
          cleanupRunners.push(handle.runCleanups);
          handle();
        });
      });
    });
  }
  function storeKeyForXFor(el, expression) {
    el._x_keyExpression = expression;
  }
  addRootSelector(() => `[${prefix("data")}]`);
  directive("data", skipDuringClone((el, { expression }, { cleanup }) => {
    expression = expression === "" ? "{}" : expression;
    let magicContext = {};
    injectMagics(magicContext, el);
    let dataProviderContext = {};
    injectDataProviders(dataProviderContext, magicContext);
    let data2 = evaluate(el, expression, { scope: dataProviderContext });
    injectMagics(data2, el);
    let reactiveData = reactive(data2);
    initInterceptors(reactiveData);
    let undo = addScopeToNode(el, reactiveData);
    if (reactiveData["init"])
      reactiveData["init"]();
    cleanup(() => {
      undo();
      reactiveData["destroy"] && reactiveData["destroy"]();
    });
  }));
  directive("show", (el, { modifiers, expression }, { effect: effect3 }) => {
    let evaluate2 = evaluateLater(el, expression);
    let hide = () => mutateDom(() => {
      el.style.display = "none";
      el._x_isShown = false;
    });
    let show = () => mutateDom(() => {
      if (el.style.length === 1 && el.style.display === "none") {
        el.removeAttribute("style");
      } else {
        el.style.removeProperty("display");
      }
      el._x_isShown = true;
    });
    let clickAwayCompatibleShow = () => setTimeout(show);
    let toggle = once((value) => value ? show() : hide(), (value) => {
      if (typeof el._x_toggleAndCascadeWithTransitions === "function") {
        el._x_toggleAndCascadeWithTransitions(el, value, show, hide);
      } else {
        value ? clickAwayCompatibleShow() : hide();
      }
    });
    let oldValue;
    let firstTime = true;
    effect3(() => evaluate2((value) => {
      if (!firstTime && value === oldValue)
        return;
      if (modifiers.includes("immediate"))
        value ? clickAwayCompatibleShow() : hide();
      toggle(value);
      oldValue = value;
      firstTime = false;
    }));
  });
  directive("for", (el, { expression }, { effect: effect3, cleanup }) => {
    let iteratorNames = parseForExpression(expression);
    let evaluateItems = evaluateLater(el, iteratorNames.items);
    let evaluateKey = evaluateLater(el, el._x_keyExpression || "index");
    el._x_prevKeys = [];
    el._x_lookup = {};
    effect3(() => loop(el, iteratorNames, evaluateItems, evaluateKey));
    cleanup(() => {
      Object.values(el._x_lookup).forEach((el2) => el2.remove());
      delete el._x_prevKeys;
      delete el._x_lookup;
    });
  });
  function loop(el, iteratorNames, evaluateItems, evaluateKey) {
    let isObject = (i) => typeof i === "object" && !Array.isArray(i);
    let templateEl = el;
    evaluateItems((items) => {
      if (isNumeric3(items) && items >= 0) {
        items = Array.from(Array(items).keys(), (i) => i + 1);
      }
      let lookup = el._x_lookup;
      let prevKeys = el._x_prevKeys;
      let scopes = [];
      let keys = [];
      if (isObject(items)) {
        items = Object.entries(items).map(([key, value]) => {
          let scope = getIterationScopeVariables(iteratorNames, value, key, items);
          evaluateKey((value2) => keys.push(value2), { scope: __spreadValues({ index: key }, scope) });
          scopes.push(scope);
        });
      } else {
        for (let i = 0; i < items.length; i++) {
          let scope = getIterationScopeVariables(iteratorNames, items[i], i, items);
          evaluateKey((value) => keys.push(value), { scope: __spreadValues({ index: i }, scope) });
          scopes.push(scope);
        }
      }
      let adds = [];
      let moves = [];
      let removes = [];
      let sames = [];
      for (let i = 0; i < prevKeys.length; i++) {
        let key = prevKeys[i];
        if (keys.indexOf(key) === -1)
          removes.push(key);
      }
      prevKeys = prevKeys.filter((key) => !removes.includes(key));
      let lastKey = "template";
      for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let prevIndex = prevKeys.indexOf(key);
        if (prevIndex === -1) {
          prevKeys.splice(i, 0, key);
          adds.push([lastKey, i]);
        } else if (prevIndex !== i) {
          let keyInSpot = prevKeys.splice(i, 1)[0];
          let keyForSpot = prevKeys.splice(prevIndex - 1, 1)[0];
          prevKeys.splice(i, 0, keyForSpot);
          prevKeys.splice(prevIndex, 0, keyInSpot);
          moves.push([keyInSpot, keyForSpot]);
        } else {
          sames.push(key);
        }
        lastKey = key;
      }
      for (let i = 0; i < removes.length; i++) {
        let key = removes[i];
        lookup[key].remove();
        lookup[key] = null;
        delete lookup[key];
      }
      for (let i = 0; i < moves.length; i++) {
        let [keyInSpot, keyForSpot] = moves[i];
        let elInSpot = lookup[keyInSpot];
        let elForSpot = lookup[keyForSpot];
        let marker = document.createElement("div");
        mutateDom(() => {
          elForSpot.after(marker);
          elInSpot.after(elForSpot);
          marker.before(elInSpot);
          marker.remove();
        });
        refreshScope(elForSpot, scopes[keys.indexOf(keyForSpot)]);
      }
      for (let i = 0; i < adds.length; i++) {
        let [lastKey2, index] = adds[i];
        let lastEl = lastKey2 === "template" ? templateEl : lookup[lastKey2];
        let scope = scopes[index];
        let key = keys[index];
        let clone2 = document.importNode(templateEl.content, true).firstElementChild;
        addScopeToNode(clone2, reactive(scope), templateEl);
        mutateDom(() => {
          lastEl.after(clone2);
          initTree(clone2);
        });
        if (typeof key === "object") {
          warn("x-for key cannot be an object, it must be a string or an integer", templateEl);
        }
        lookup[key] = clone2;
      }
      for (let i = 0; i < sames.length; i++) {
        refreshScope(lookup[sames[i]], scopes[keys.indexOf(sames[i])]);
      }
      templateEl._x_prevKeys = keys;
    });
  }
  function parseForExpression(expression) {
    let forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
    let stripParensRE = /^\s*\(|\)\s*$/g;
    let forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
    let inMatch = expression.match(forAliasRE);
    if (!inMatch)
      return;
    let res = {};
    res.items = inMatch[2].trim();
    let item = inMatch[1].replace(stripParensRE, "").trim();
    let iteratorMatch = item.match(forIteratorRE);
    if (iteratorMatch) {
      res.item = item.replace(forIteratorRE, "").trim();
      res.index = iteratorMatch[1].trim();
      if (iteratorMatch[2]) {
        res.collection = iteratorMatch[2].trim();
      }
    } else {
      res.item = item;
    }
    return res;
  }
  function getIterationScopeVariables(iteratorNames, item, index, items) {
    let scopeVariables = {};
    if (/^\[.*\]$/.test(iteratorNames.item) && Array.isArray(item)) {
      let names = iteratorNames.item.replace("[", "").replace("]", "").split(",").map((i) => i.trim());
      names.forEach((name, i) => {
        scopeVariables[name] = item[i];
      });
    } else {
      scopeVariables[iteratorNames.item] = item;
    }
    if (iteratorNames.index)
      scopeVariables[iteratorNames.index] = index;
    if (iteratorNames.collection)
      scopeVariables[iteratorNames.collection] = items;
    return scopeVariables;
  }
  function isNumeric3(subject) {
    return !Array.isArray(subject) && !isNaN(subject);
  }
  function handler2() {
  }
  handler2.inline = (el, { expression }, { cleanup }) => {
    let root = closestRoot(el);
    if (!root._x_refs)
      root._x_refs = {};
    root._x_refs[expression] = el;
    cleanup(() => delete root._x_refs[expression]);
  };
  directive("ref", handler2);
  directive("if", (el, { expression }, { effect: effect3, cleanup }) => {
    let evaluate2 = evaluateLater(el, expression);
    let show = () => {
      if (el._x_currentIfEl)
        return el._x_currentIfEl;
      let clone2 = el.content.cloneNode(true).firstElementChild;
      addScopeToNode(clone2, {}, el);
      mutateDom(() => {
        el.after(clone2);
        initTree(clone2);
      });
      el._x_currentIfEl = clone2;
      el._x_undoIf = () => {
        clone2.remove();
        delete el._x_currentIfEl;
      };
      return clone2;
    };
    let hide = () => {
      if (!el._x_undoIf)
        return;
      el._x_undoIf();
      delete el._x_undoIf;
    };
    effect3(() => evaluate2((value) => {
      value ? show() : hide();
    }));
    cleanup(() => el._x_undoIf && el._x_undoIf());
  });
  mapAttributes(startingWith("@", into(prefix("on:"))));
  directive("on", skipDuringClone((el, { value, modifiers, expression }, { cleanup }) => {
    let evaluate2 = expression ? evaluateLater(el, expression) : () => {
    };
    let removeListener = on(el, value, modifiers, (e) => {
      evaluate2(() => {
      }, { scope: { $event: e }, params: [e] });
    });
    cleanup(() => removeListener());
  }));
  alpine_default.setEvaluator(normalEvaluator);
  alpine_default.setReactivityEngine({ reactive: import_reactivity9.reactive, effect: import_reactivity9.effect, release: import_reactivity9.stop, raw: import_reactivity9.toRaw });

  // node_modules/phoenix_html/priv/static/phoenix_html.js
  "use strict";
  (function() {
    var PolyfillEvent = eventConstructor();
    function eventConstructor() {
      if (typeof window.CustomEvent === "function")
        return window.CustomEvent;
      function CustomEvent2(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: void 0 };
        var evt = document.createEvent("CustomEvent");
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
      }
      CustomEvent2.prototype = window.Event.prototype;
      return CustomEvent2;
    }
    function buildHiddenInput(name, value) {
      var input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value;
      return input;
    }
    function handleClick(element) {
      var to = element.getAttribute("data-to"), method = buildHiddenInput("_method", element.getAttribute("data-method")), csrf = buildHiddenInput("_csrf_token", element.getAttribute("data-csrf")), form = document.createElement("form"), target = element.getAttribute("target");
      form.method = element.getAttribute("data-method") === "get" ? "get" : "post";
      form.action = to;
      form.style.display = "hidden";
      if (target)
        form.target = target;
      form.appendChild(csrf);
      form.appendChild(method);
      document.body.appendChild(form);
      form.submit();
    }
    window.addEventListener("click", function(e) {
      var element = e.target;
      while (element && element.getAttribute) {
        var phoenixLinkEvent = new PolyfillEvent("phoenix.link.click", {
          "bubbles": true,
          "cancelable": true
        });
        if (!element.dispatchEvent(phoenixLinkEvent)) {
          e.preventDefault();
          e.stopImmediatePropagation();
          return false;
        }
        if (element.getAttribute("data-method")) {
          handleClick(element);
          e.preventDefault();
          return false;
        } else {
          element = element.parentNode;
        }
      }
    }, false);
    window.addEventListener("phoenix.link.click", function(e) {
      var message = e.target.getAttribute("data-confirm");
      if (message && !window.confirm(message)) {
        e.preventDefault();
      }
    }, false);
  })();

  // node_modules/phoenix/assets/js/phoenix/utils.js
  var closure = (value) => {
    if (typeof value === "function") {
      return value;
    } else {
      let closure2 = function() {
        return value;
      };
      return closure2;
    }
  };

  // node_modules/phoenix/assets/js/phoenix/constants.js
  var globalSelf = typeof self !== "undefined" ? self : null;
  var phxWindow = typeof window !== "undefined" ? window : null;
  var global2 = globalSelf || phxWindow || void 0;
  var DEFAULT_VSN = "2.0.0";
  var SOCKET_STATES = { connecting: 0, open: 1, closing: 2, closed: 3 };
  var DEFAULT_TIMEOUT = 1e4;
  var WS_CLOSE_NORMAL = 1e3;
  var CHANNEL_STATES = {
    closed: "closed",
    errored: "errored",
    joined: "joined",
    joining: "joining",
    leaving: "leaving"
  };
  var CHANNEL_EVENTS = {
    close: "phx_close",
    error: "phx_error",
    join: "phx_join",
    reply: "phx_reply",
    leave: "phx_leave"
  };
  var CHANNEL_LIFECYCLE_EVENTS = [
    CHANNEL_EVENTS.close,
    CHANNEL_EVENTS.error,
    CHANNEL_EVENTS.join,
    CHANNEL_EVENTS.reply,
    CHANNEL_EVENTS.leave
  ];
  var TRANSPORTS = {
    longpoll: "longpoll",
    websocket: "websocket"
  };

  // node_modules/phoenix/assets/js/phoenix/push.js
  var Push = class {
    constructor(channel, event, payload, timeout) {
      this.channel = channel;
      this.event = event;
      this.payload = payload || function() {
        return {};
      };
      this.receivedResp = null;
      this.timeout = timeout;
      this.timeoutTimer = null;
      this.recHooks = [];
      this.sent = false;
    }
    resend(timeout) {
      this.timeout = timeout;
      this.reset();
      this.send();
    }
    send() {
      if (this.hasReceived("timeout")) {
        return;
      }
      this.startTimeout();
      this.sent = true;
      this.channel.socket.push({
        topic: this.channel.topic,
        event: this.event,
        payload: this.payload(),
        ref: this.ref,
        join_ref: this.channel.joinRef()
      });
    }
    receive(status, callback) {
      if (this.hasReceived(status)) {
        callback(this.receivedResp.response);
      }
      this.recHooks.push({ status, callback });
      return this;
    }
    reset() {
      this.cancelRefEvent();
      this.ref = null;
      this.refEvent = null;
      this.receivedResp = null;
      this.sent = false;
    }
    matchReceive({ status, response, _ref }) {
      this.recHooks.filter((h) => h.status === status).forEach((h) => h.callback(response));
    }
    cancelRefEvent() {
      if (!this.refEvent) {
        return;
      }
      this.channel.off(this.refEvent);
    }
    cancelTimeout() {
      clearTimeout(this.timeoutTimer);
      this.timeoutTimer = null;
    }
    startTimeout() {
      if (this.timeoutTimer) {
        this.cancelTimeout();
      }
      this.ref = this.channel.socket.makeRef();
      this.refEvent = this.channel.replyEventName(this.ref);
      this.channel.on(this.refEvent, (payload) => {
        this.cancelRefEvent();
        this.cancelTimeout();
        this.receivedResp = payload;
        this.matchReceive(payload);
      });
      this.timeoutTimer = setTimeout(() => {
        this.trigger("timeout", {});
      }, this.timeout);
    }
    hasReceived(status) {
      return this.receivedResp && this.receivedResp.status === status;
    }
    trigger(status, response) {
      this.channel.trigger(this.refEvent, { status, response });
    }
  };

  // node_modules/phoenix/assets/js/phoenix/timer.js
  var Timer = class {
    constructor(callback, timerCalc) {
      this.callback = callback;
      this.timerCalc = timerCalc;
      this.timer = null;
      this.tries = 0;
    }
    reset() {
      this.tries = 0;
      clearTimeout(this.timer);
    }
    scheduleTimeout() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.tries = this.tries + 1;
        this.callback();
      }, this.timerCalc(this.tries + 1));
    }
  };

  // node_modules/phoenix/assets/js/phoenix/channel.js
  var Channel = class {
    constructor(topic, params, socket) {
      this.state = CHANNEL_STATES.closed;
      this.topic = topic;
      this.params = closure(params || {});
      this.socket = socket;
      this.bindings = [];
      this.bindingRef = 0;
      this.timeout = this.socket.timeout;
      this.joinedOnce = false;
      this.joinPush = new Push(this, CHANNEL_EVENTS.join, this.params, this.timeout);
      this.pushBuffer = [];
      this.stateChangeRefs = [];
      this.rejoinTimer = new Timer(() => {
        if (this.socket.isConnected()) {
          this.rejoin();
        }
      }, this.socket.rejoinAfterMs);
      this.stateChangeRefs.push(this.socket.onError(() => this.rejoinTimer.reset()));
      this.stateChangeRefs.push(this.socket.onOpen(() => {
        this.rejoinTimer.reset();
        if (this.isErrored()) {
          this.rejoin();
        }
      }));
      this.joinPush.receive("ok", () => {
        this.state = CHANNEL_STATES.joined;
        this.rejoinTimer.reset();
        this.pushBuffer.forEach((pushEvent) => pushEvent.send());
        this.pushBuffer = [];
      });
      this.joinPush.receive("error", () => {
        this.state = CHANNEL_STATES.errored;
        if (this.socket.isConnected()) {
          this.rejoinTimer.scheduleTimeout();
        }
      });
      this.onClose(() => {
        this.rejoinTimer.reset();
        if (this.socket.hasLogger())
          this.socket.log("channel", `close ${this.topic} ${this.joinRef()}`);
        this.state = CHANNEL_STATES.closed;
        this.socket.remove(this);
      });
      this.onError((reason) => {
        if (this.socket.hasLogger())
          this.socket.log("channel", `error ${this.topic}`, reason);
        if (this.isJoining()) {
          this.joinPush.reset();
        }
        this.state = CHANNEL_STATES.errored;
        if (this.socket.isConnected()) {
          this.rejoinTimer.scheduleTimeout();
        }
      });
      this.joinPush.receive("timeout", () => {
        if (this.socket.hasLogger())
          this.socket.log("channel", `timeout ${this.topic} (${this.joinRef()})`, this.joinPush.timeout);
        let leavePush = new Push(this, CHANNEL_EVENTS.leave, closure({}), this.timeout);
        leavePush.send();
        this.state = CHANNEL_STATES.errored;
        this.joinPush.reset();
        if (this.socket.isConnected()) {
          this.rejoinTimer.scheduleTimeout();
        }
      });
      this.on(CHANNEL_EVENTS.reply, (payload, ref) => {
        this.trigger(this.replyEventName(ref), payload);
      });
    }
    join(timeout = this.timeout) {
      if (this.joinedOnce) {
        throw new Error("tried to join multiple times. 'join' can only be called a single time per channel instance");
      } else {
        this.timeout = timeout;
        this.joinedOnce = true;
        this.rejoin();
        return this.joinPush;
      }
    }
    onClose(callback) {
      this.on(CHANNEL_EVENTS.close, callback);
    }
    onError(callback) {
      return this.on(CHANNEL_EVENTS.error, (reason) => callback(reason));
    }
    on(event, callback) {
      let ref = this.bindingRef++;
      this.bindings.push({ event, ref, callback });
      return ref;
    }
    off(event, ref) {
      this.bindings = this.bindings.filter((bind2) => {
        return !(bind2.event === event && (typeof ref === "undefined" || ref === bind2.ref));
      });
    }
    canPush() {
      return this.socket.isConnected() && this.isJoined();
    }
    push(event, payload, timeout = this.timeout) {
      payload = payload || {};
      if (!this.joinedOnce) {
        throw new Error(`tried to push '${event}' to '${this.topic}' before joining. Use channel.join() before pushing events`);
      }
      let pushEvent = new Push(this, event, function() {
        return payload;
      }, timeout);
      if (this.canPush()) {
        pushEvent.send();
      } else {
        pushEvent.startTimeout();
        this.pushBuffer.push(pushEvent);
      }
      return pushEvent;
    }
    leave(timeout = this.timeout) {
      this.rejoinTimer.reset();
      this.joinPush.cancelTimeout();
      this.state = CHANNEL_STATES.leaving;
      let onClose = () => {
        if (this.socket.hasLogger())
          this.socket.log("channel", `leave ${this.topic}`);
        this.trigger(CHANNEL_EVENTS.close, "leave");
      };
      let leavePush = new Push(this, CHANNEL_EVENTS.leave, closure({}), timeout);
      leavePush.receive("ok", () => onClose()).receive("timeout", () => onClose());
      leavePush.send();
      if (!this.canPush()) {
        leavePush.trigger("ok", {});
      }
      return leavePush;
    }
    onMessage(_event, payload, _ref) {
      return payload;
    }
    isLifecycleEvent(event) {
      return CHANNEL_LIFECYCLE_EVENTS.indexOf(event) >= 0;
    }
    isMember(topic, event, payload, joinRef) {
      if (this.topic !== topic) {
        return false;
      }
      if (joinRef && joinRef !== this.joinRef() && this.isLifecycleEvent(event)) {
        if (this.socket.hasLogger())
          this.socket.log("channel", "dropping outdated message", { topic, event, payload, joinRef });
        return false;
      } else {
        return true;
      }
    }
    joinRef() {
      return this.joinPush.ref;
    }
    rejoin(timeout = this.timeout) {
      if (this.isLeaving()) {
        return;
      }
      this.socket.leaveOpenTopic(this.topic);
      this.state = CHANNEL_STATES.joining;
      this.joinPush.resend(timeout);
    }
    trigger(event, payload, ref, joinRef) {
      let handledPayload = this.onMessage(event, payload, ref, joinRef);
      if (payload && !handledPayload) {
        throw new Error("channel onMessage callbacks must return the payload, modified or unmodified");
      }
      let eventBindings = this.bindings.filter((bind2) => bind2.event === event);
      for (let i = 0; i < eventBindings.length; i++) {
        let bind2 = eventBindings[i];
        bind2.callback(handledPayload, ref, joinRef || this.joinRef());
      }
    }
    replyEventName(ref) {
      return `chan_reply_${ref}`;
    }
    isClosed() {
      return this.state === CHANNEL_STATES.closed;
    }
    isErrored() {
      return this.state === CHANNEL_STATES.errored;
    }
    isJoined() {
      return this.state === CHANNEL_STATES.joined;
    }
    isJoining() {
      return this.state === CHANNEL_STATES.joining;
    }
    isLeaving() {
      return this.state === CHANNEL_STATES.leaving;
    }
  };

  // node_modules/phoenix/assets/js/phoenix/ajax.js
  var Ajax = class {
    constructor() {
      this.states = { complete: 4 };
    }
    static request(method, endPoint, accept, body, timeout, ontimeout, callback) {
      if (global2.XDomainRequest) {
        let req = new global2.XDomainRequest();
        this.xdomainRequest(req, method, endPoint, body, timeout, ontimeout, callback);
      } else {
        let req = new global2.XMLHttpRequest();
        this.xhrRequest(req, method, endPoint, accept, body, timeout, ontimeout, callback);
      }
    }
    static xdomainRequest(req, method, endPoint, body, timeout, ontimeout, callback) {
      req.timeout = timeout;
      req.open(method, endPoint);
      req.onload = () => {
        let response = this.parseJSON(req.responseText);
        callback && callback(response);
      };
      if (ontimeout) {
        req.ontimeout = ontimeout;
      }
      req.onprogress = () => {
      };
      req.send(body);
    }
    static xhrRequest(req, method, endPoint, accept, body, timeout, ontimeout, callback) {
      req.open(method, endPoint, true);
      req.timeout = timeout;
      req.setRequestHeader("Content-Type", accept);
      req.onerror = () => {
        callback && callback(null);
      };
      req.onreadystatechange = () => {
        if (req.readyState === this.states.complete && callback) {
          let response = this.parseJSON(req.responseText);
          callback(response);
        }
      };
      if (ontimeout) {
        req.ontimeout = ontimeout;
      }
      req.send(body);
    }
    static parseJSON(resp) {
      if (!resp || resp === "") {
        return null;
      }
      try {
        return JSON.parse(resp);
      } catch (e) {
        console && console.log("failed to parse JSON response", resp);
        return null;
      }
    }
    static serialize(obj, parentKey) {
      let queryStr = [];
      for (var key in obj) {
        if (!Object.prototype.hasOwnProperty.call(obj, key)) {
          continue;
        }
        let paramKey = parentKey ? `${parentKey}[${key}]` : key;
        let paramVal = obj[key];
        if (typeof paramVal === "object") {
          queryStr.push(this.serialize(paramVal, paramKey));
        } else {
          queryStr.push(encodeURIComponent(paramKey) + "=" + encodeURIComponent(paramVal));
        }
      }
      return queryStr.join("&");
    }
    static appendParams(url, params) {
      if (Object.keys(params).length === 0) {
        return url;
      }
      let prefix2 = url.match(/\?/) ? "&" : "?";
      return `${url}${prefix2}${this.serialize(params)}`;
    }
  };

  // node_modules/phoenix/assets/js/phoenix/longpoll.js
  var LongPoll = class {
    constructor(endPoint) {
      this.endPoint = null;
      this.token = null;
      this.skipHeartbeat = true;
      this.onopen = function() {
      };
      this.onerror = function() {
      };
      this.onmessage = function() {
      };
      this.onclose = function() {
      };
      this.pollEndpoint = this.normalizeEndpoint(endPoint);
      this.readyState = SOCKET_STATES.connecting;
      this.poll();
    }
    normalizeEndpoint(endPoint) {
      return endPoint.replace("ws://", "http://").replace("wss://", "https://").replace(new RegExp("(.*)/" + TRANSPORTS.websocket), "$1/" + TRANSPORTS.longpoll);
    }
    endpointURL() {
      return Ajax.appendParams(this.pollEndpoint, { token: this.token });
    }
    closeAndRetry() {
      this.close();
      this.readyState = SOCKET_STATES.connecting;
    }
    ontimeout() {
      this.onerror("timeout");
      this.closeAndRetry();
    }
    poll() {
      if (!(this.readyState === SOCKET_STATES.open || this.readyState === SOCKET_STATES.connecting)) {
        return;
      }
      Ajax.request("GET", this.endpointURL(), "application/json", null, this.timeout, this.ontimeout.bind(this), (resp) => {
        if (resp) {
          var { status, token, messages } = resp;
          this.token = token;
        } else {
          status = 0;
        }
        switch (status) {
          case 200:
            messages.forEach((msg) => {
              setTimeout(() => {
                this.onmessage({ data: msg });
              }, 0);
            });
            this.poll();
            break;
          case 204:
            this.poll();
            break;
          case 410:
            this.readyState = SOCKET_STATES.open;
            this.onopen();
            this.poll();
            break;
          case 403:
            this.onerror();
            this.close();
            break;
          case 0:
          case 500:
            this.onerror();
            this.closeAndRetry();
            break;
          default:
            throw new Error(`unhandled poll status ${status}`);
        }
      });
    }
    send(body) {
      Ajax.request("POST", this.endpointURL(), "application/json", body, this.timeout, this.onerror.bind(this, "timeout"), (resp) => {
        if (!resp || resp.status !== 200) {
          this.onerror(resp && resp.status);
          this.closeAndRetry();
        }
      });
    }
    close(_code, _reason) {
      this.readyState = SOCKET_STATES.closed;
      this.onclose();
    }
  };

  // node_modules/phoenix/assets/js/phoenix/serializer.js
  var serializer_default = {
    HEADER_LENGTH: 1,
    META_LENGTH: 4,
    KINDS: { push: 0, reply: 1, broadcast: 2 },
    encode(msg, callback) {
      if (msg.payload.constructor === ArrayBuffer) {
        return callback(this.binaryEncode(msg));
      } else {
        let payload = [msg.join_ref, msg.ref, msg.topic, msg.event, msg.payload];
        return callback(JSON.stringify(payload));
      }
    },
    decode(rawPayload, callback) {
      if (rawPayload.constructor === ArrayBuffer) {
        return callback(this.binaryDecode(rawPayload));
      } else {
        let [join_ref, ref, topic, event, payload] = JSON.parse(rawPayload);
        return callback({ join_ref, ref, topic, event, payload });
      }
    },
    binaryEncode(message) {
      let { join_ref, ref, event, topic, payload } = message;
      let metaLength = this.META_LENGTH + join_ref.length + ref.length + topic.length + event.length;
      let header = new ArrayBuffer(this.HEADER_LENGTH + metaLength);
      let view = new DataView(header);
      let offset = 0;
      view.setUint8(offset++, this.KINDS.push);
      view.setUint8(offset++, join_ref.length);
      view.setUint8(offset++, ref.length);
      view.setUint8(offset++, topic.length);
      view.setUint8(offset++, event.length);
      Array.from(join_ref, (char) => view.setUint8(offset++, char.charCodeAt(0)));
      Array.from(ref, (char) => view.setUint8(offset++, char.charCodeAt(0)));
      Array.from(topic, (char) => view.setUint8(offset++, char.charCodeAt(0)));
      Array.from(event, (char) => view.setUint8(offset++, char.charCodeAt(0)));
      var combined = new Uint8Array(header.byteLength + payload.byteLength);
      combined.set(new Uint8Array(header), 0);
      combined.set(new Uint8Array(payload), header.byteLength);
      return combined.buffer;
    },
    binaryDecode(buffer) {
      let view = new DataView(buffer);
      let kind = view.getUint8(0);
      let decoder = new TextDecoder();
      switch (kind) {
        case this.KINDS.push:
          return this.decodePush(buffer, view, decoder);
        case this.KINDS.reply:
          return this.decodeReply(buffer, view, decoder);
        case this.KINDS.broadcast:
          return this.decodeBroadcast(buffer, view, decoder);
      }
    },
    decodePush(buffer, view, decoder) {
      let joinRefSize = view.getUint8(1);
      let topicSize = view.getUint8(2);
      let eventSize = view.getUint8(3);
      let offset = this.HEADER_LENGTH + this.META_LENGTH - 1;
      let joinRef = decoder.decode(buffer.slice(offset, offset + joinRefSize));
      offset = offset + joinRefSize;
      let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
      offset = offset + topicSize;
      let event = decoder.decode(buffer.slice(offset, offset + eventSize));
      offset = offset + eventSize;
      let data2 = buffer.slice(offset, buffer.byteLength);
      return { join_ref: joinRef, ref: null, topic, event, payload: data2 };
    },
    decodeReply(buffer, view, decoder) {
      let joinRefSize = view.getUint8(1);
      let refSize = view.getUint8(2);
      let topicSize = view.getUint8(3);
      let eventSize = view.getUint8(4);
      let offset = this.HEADER_LENGTH + this.META_LENGTH;
      let joinRef = decoder.decode(buffer.slice(offset, offset + joinRefSize));
      offset = offset + joinRefSize;
      let ref = decoder.decode(buffer.slice(offset, offset + refSize));
      offset = offset + refSize;
      let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
      offset = offset + topicSize;
      let event = decoder.decode(buffer.slice(offset, offset + eventSize));
      offset = offset + eventSize;
      let data2 = buffer.slice(offset, buffer.byteLength);
      let payload = { status: event, response: data2 };
      return { join_ref: joinRef, ref, topic, event: CHANNEL_EVENTS.reply, payload };
    },
    decodeBroadcast(buffer, view, decoder) {
      let topicSize = view.getUint8(1);
      let eventSize = view.getUint8(2);
      let offset = this.HEADER_LENGTH + 2;
      let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
      offset = offset + topicSize;
      let event = decoder.decode(buffer.slice(offset, offset + eventSize));
      offset = offset + eventSize;
      let data2 = buffer.slice(offset, buffer.byteLength);
      return { join_ref: null, ref: null, topic, event, payload: data2 };
    }
  };

  // node_modules/phoenix/assets/js/phoenix/socket.js
  var Socket = class {
    constructor(endPoint, opts = {}) {
      this.stateChangeCallbacks = { open: [], close: [], error: [], message: [] };
      this.channels = [];
      this.sendBuffer = [];
      this.ref = 0;
      this.timeout = opts.timeout || DEFAULT_TIMEOUT;
      this.transport = opts.transport || global2.WebSocket || LongPoll;
      this.establishedConnections = 0;
      this.defaultEncoder = serializer_default.encode.bind(serializer_default);
      this.defaultDecoder = serializer_default.decode.bind(serializer_default);
      this.closeWasClean = false;
      this.binaryType = opts.binaryType || "arraybuffer";
      this.connectClock = 1;
      if (this.transport !== LongPoll) {
        this.encode = opts.encode || this.defaultEncoder;
        this.decode = opts.decode || this.defaultDecoder;
      } else {
        this.encode = this.defaultEncoder;
        this.decode = this.defaultDecoder;
      }
      let awaitingConnectionOnPageShow = null;
      if (phxWindow && phxWindow.addEventListener) {
        phxWindow.addEventListener("pagehide", (_e) => {
          if (this.conn) {
            this.disconnect();
            awaitingConnectionOnPageShow = this.connectClock;
          }
        });
        phxWindow.addEventListener("pageshow", (_e) => {
          if (awaitingConnectionOnPageShow === this.connectClock) {
            awaitingConnectionOnPageShow = null;
            this.connect();
          }
        });
      }
      this.heartbeatIntervalMs = opts.heartbeatIntervalMs || 3e4;
      this.rejoinAfterMs = (tries) => {
        if (opts.rejoinAfterMs) {
          return opts.rejoinAfterMs(tries);
        } else {
          return [1e3, 2e3, 5e3][tries - 1] || 1e4;
        }
      };
      this.reconnectAfterMs = (tries) => {
        if (opts.reconnectAfterMs) {
          return opts.reconnectAfterMs(tries);
        } else {
          return [10, 50, 100, 150, 200, 250, 500, 1e3, 2e3][tries - 1] || 5e3;
        }
      };
      this.logger = opts.logger || null;
      this.longpollerTimeout = opts.longpollerTimeout || 2e4;
      this.params = closure(opts.params || {});
      this.endPoint = `${endPoint}/${TRANSPORTS.websocket}`;
      this.vsn = opts.vsn || DEFAULT_VSN;
      this.heartbeatTimer = null;
      this.pendingHeartbeatRef = null;
      this.reconnectTimer = new Timer(() => {
        this.teardown(() => this.connect());
      }, this.reconnectAfterMs);
    }
    replaceTransport(newTransport) {
      this.disconnect();
      this.transport = newTransport;
    }
    protocol() {
      return location.protocol.match(/^https/) ? "wss" : "ws";
    }
    endPointURL() {
      let uri = Ajax.appendParams(Ajax.appendParams(this.endPoint, this.params()), { vsn: this.vsn });
      if (uri.charAt(0) !== "/") {
        return uri;
      }
      if (uri.charAt(1) === "/") {
        return `${this.protocol()}:${uri}`;
      }
      return `${this.protocol()}://${location.host}${uri}`;
    }
    disconnect(callback, code, reason) {
      this.connectClock++;
      this.closeWasClean = true;
      this.reconnectTimer.reset();
      this.teardown(callback, code, reason);
    }
    connect(params) {
      this.connectClock++;
      if (params) {
        console && console.log("passing params to connect is deprecated. Instead pass :params to the Socket constructor");
        this.params = closure(params);
      }
      if (this.conn) {
        return;
      }
      this.closeWasClean = false;
      this.conn = new this.transport(this.endPointURL());
      this.conn.binaryType = this.binaryType;
      this.conn.timeout = this.longpollerTimeout;
      this.conn.onopen = () => this.onConnOpen();
      this.conn.onerror = (error2) => this.onConnError(error2);
      this.conn.onmessage = (event) => this.onConnMessage(event);
      this.conn.onclose = (event) => this.onConnClose(event);
    }
    log(kind, msg, data2) {
      this.logger(kind, msg, data2);
    }
    hasLogger() {
      return this.logger !== null;
    }
    onOpen(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.open.push([ref, callback]);
      return ref;
    }
    onClose(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.close.push([ref, callback]);
      return ref;
    }
    onError(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.error.push([ref, callback]);
      return ref;
    }
    onMessage(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.message.push([ref, callback]);
      return ref;
    }
    onConnOpen() {
      if (this.hasLogger())
        this.log("transport", `connected to ${this.endPointURL()}`);
      this.closeWasClean = false;
      this.establishedConnections++;
      this.flushSendBuffer();
      this.reconnectTimer.reset();
      this.resetHeartbeat();
      this.stateChangeCallbacks.open.forEach(([, callback]) => callback());
    }
    heartbeatTimeout() {
      if (this.pendingHeartbeatRef) {
        this.pendingHeartbeatRef = null;
        if (this.hasLogger()) {
          this.log("transport", "heartbeat timeout. Attempting to re-establish connection");
        }
        this.abnormalClose("heartbeat timeout");
      }
    }
    resetHeartbeat() {
      if (this.conn && this.conn.skipHeartbeat) {
        return;
      }
      this.pendingHeartbeatRef = null;
      clearTimeout(this.heartbeatTimer);
      setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs);
    }
    teardown(callback, code, reason) {
      if (!this.conn) {
        return callback && callback();
      }
      this.waitForBufferDone(() => {
        if (this.conn) {
          if (code) {
            this.conn.close(code, reason || "");
          } else {
            this.conn.close();
          }
        }
        this.waitForSocketClosed(() => {
          if (this.conn) {
            this.conn.onclose = function() {
            };
            this.conn = null;
          }
          callback && callback();
        });
      });
    }
    waitForBufferDone(callback, tries = 1) {
      if (tries === 5 || !this.conn || !this.conn.bufferedAmount) {
        callback();
        return;
      }
      setTimeout(() => {
        this.waitForBufferDone(callback, tries + 1);
      }, 150 * tries);
    }
    waitForSocketClosed(callback, tries = 1) {
      if (tries === 5 || !this.conn || this.conn.readyState === SOCKET_STATES.closed) {
        callback();
        return;
      }
      setTimeout(() => {
        this.waitForSocketClosed(callback, tries + 1);
      }, 150 * tries);
    }
    onConnClose(event) {
      if (this.hasLogger())
        this.log("transport", "close", event);
      this.triggerChanError();
      clearTimeout(this.heartbeatTimer);
      if (!this.closeWasClean) {
        this.reconnectTimer.scheduleTimeout();
      }
      this.stateChangeCallbacks.close.forEach(([, callback]) => callback(event));
    }
    onConnError(error2) {
      if (this.hasLogger())
        this.log("transport", error2);
      let transportBefore = this.transport;
      let establishedBefore = this.establishedConnections;
      this.stateChangeCallbacks.error.forEach(([, callback]) => {
        callback(error2, transportBefore, establishedBefore);
      });
      if (transportBefore === this.transport || establishedBefore > 0) {
        this.triggerChanError();
      }
    }
    triggerChanError() {
      this.channels.forEach((channel) => {
        if (!(channel.isErrored() || channel.isLeaving() || channel.isClosed())) {
          channel.trigger(CHANNEL_EVENTS.error);
        }
      });
    }
    connectionState() {
      switch (this.conn && this.conn.readyState) {
        case SOCKET_STATES.connecting:
          return "connecting";
        case SOCKET_STATES.open:
          return "open";
        case SOCKET_STATES.closing:
          return "closing";
        default:
          return "closed";
      }
    }
    isConnected() {
      return this.connectionState() === "open";
    }
    remove(channel) {
      this.off(channel.stateChangeRefs);
      this.channels = this.channels.filter((c) => c.joinRef() !== channel.joinRef());
    }
    off(refs) {
      for (let key in this.stateChangeCallbacks) {
        this.stateChangeCallbacks[key] = this.stateChangeCallbacks[key].filter(([ref]) => {
          return refs.indexOf(ref) === -1;
        });
      }
    }
    channel(topic, chanParams = {}) {
      let chan = new Channel(topic, chanParams, this);
      this.channels.push(chan);
      return chan;
    }
    push(data2) {
      if (this.hasLogger()) {
        let { topic, event, payload, ref, join_ref } = data2;
        this.log("push", `${topic} ${event} (${join_ref}, ${ref})`, payload);
      }
      if (this.isConnected()) {
        this.encode(data2, (result) => this.conn.send(result));
      } else {
        this.sendBuffer.push(() => this.encode(data2, (result) => this.conn.send(result)));
      }
    }
    makeRef() {
      let newRef = this.ref + 1;
      if (newRef === this.ref) {
        this.ref = 0;
      } else {
        this.ref = newRef;
      }
      return this.ref.toString();
    }
    sendHeartbeat() {
      if (this.pendingHeartbeatRef && !this.isConnected()) {
        return;
      }
      this.pendingHeartbeatRef = this.makeRef();
      this.push({ topic: "phoenix", event: "heartbeat", payload: {}, ref: this.pendingHeartbeatRef });
      this.heartbeatTimer = setTimeout(() => this.heartbeatTimeout(), this.heartbeatIntervalMs);
    }
    abnormalClose(reason) {
      this.closeWasClean = false;
      if (this.isConnected()) {
        this.conn.close(WS_CLOSE_NORMAL, reason);
      }
    }
    flushSendBuffer() {
      if (this.isConnected() && this.sendBuffer.length > 0) {
        this.sendBuffer.forEach((callback) => callback());
        this.sendBuffer = [];
      }
    }
    onConnMessage(rawMessage) {
      this.decode(rawMessage.data, (msg) => {
        let { topic, event, payload, ref, join_ref } = msg;
        if (ref && ref === this.pendingHeartbeatRef) {
          clearTimeout(this.heartbeatTimer);
          this.pendingHeartbeatRef = null;
          setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs);
        }
        if (this.hasLogger())
          this.log("receive", `${payload.status || ""} ${topic} ${event} ${ref && "(" + ref + ")" || ""}`, payload);
        for (let i = 0; i < this.channels.length; i++) {
          const channel = this.channels[i];
          if (!channel.isMember(topic, event, payload, join_ref)) {
            continue;
          }
          channel.trigger(event, payload, ref, join_ref);
        }
        for (let i = 0; i < this.stateChangeCallbacks.message.length; i++) {
          let [, callback] = this.stateChangeCallbacks.message[i];
          callback(msg);
        }
      });
    }
    leaveOpenTopic(topic) {
      let dupChannel = this.channels.find((c) => c.topic === topic && (c.isJoined() || c.isJoining()));
      if (dupChannel) {
        if (this.hasLogger())
          this.log("transport", `leaving duplicate topic "${topic}"`);
        dupChannel.leave();
      }
    }
  };

  // js/app.js
  var import_topbar = __toModule(require_topbar());
  var import_phoenix_live_view = __toModule(require_phoenix_live_view());
  var csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content");
  var Hooks = {};
  var liveSocket = new import_phoenix_live_view.LiveSocket("/live", Socket, {
    params: { _csrf_token: csrfToken },
    hooks: Hooks
  });
  import_topbar.default.config({ barColors: { 0: "#29d" }, shadowColor: "rgba(0, 0, 0, .3)" });
  window.addEventListener("phx:page-loading-start", (info) => import_topbar.default.show());
  window.addEventListener("phx:page-loading-stop", (info) => import_topbar.default.hide());
  liveSocket.connect();
  window.liveSocket = liveSocket;
})();
/*! topbar 0.1.4, 2020-04-27
 *  http://buunguyen.github.io/topbar
 *  Copyright (c) 2019 Buu Nguyen
 *  Licensed under the MIT License */
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy90b3BiYXIvdG9wYmFyLmpzIiwgIi4uLy4uL2Fzc2V0cy9ub2RlX21vZHVsZXMvcGhvZW5peF9saXZlX3ZpZXcvcHJpdi9zdGF0aWMvcGhvZW5peF9saXZlX3ZpZXcuanMiLCAiLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9hbHBpbmVqcy9kaXN0L21vZHVsZS5lc20uanMiLCAiLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9waG9lbml4X2h0bWwvcHJpdi9zdGF0aWMvcGhvZW5peF9odG1sLmpzIiwgIi4uLy4uL2Fzc2V0cy9ub2RlX21vZHVsZXMvcGhvZW5peC9hc3NldHMvanMvcGhvZW5peC91dGlscy5qcyIsICIuLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL3Bob2VuaXgvYXNzZXRzL2pzL3Bob2VuaXgvY29uc3RhbnRzLmpzIiwgIi4uLy4uL2Fzc2V0cy9ub2RlX21vZHVsZXMvcGhvZW5peC9hc3NldHMvanMvcGhvZW5peC9wdXNoLmpzIiwgIi4uLy4uL2Fzc2V0cy9ub2RlX21vZHVsZXMvcGhvZW5peC9hc3NldHMvanMvcGhvZW5peC90aW1lci5qcyIsICIuLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL3Bob2VuaXgvYXNzZXRzL2pzL3Bob2VuaXgvY2hhbm5lbC5qcyIsICIuLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL3Bob2VuaXgvYXNzZXRzL2pzL3Bob2VuaXgvYWpheC5qcyIsICIuLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL3Bob2VuaXgvYXNzZXRzL2pzL3Bob2VuaXgvbG9uZ3BvbGwuanMiLCAiLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9waG9lbml4L2Fzc2V0cy9qcy9waG9lbml4L3NlcmlhbGl6ZXIuanMiLCAiLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9waG9lbml4L2Fzc2V0cy9qcy9waG9lbml4L3NvY2tldC5qcyIsICIuLi8uLi9hc3NldHMvanMvYXBwLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvKiEgdG9wYmFyIDAuMS40LCAyMDIwLTA0LTI3XG4gKiAgaHR0cDovL2J1dW5ndXllbi5naXRodWIuaW8vdG9wYmFyXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE5IEJ1dSBOZ3V5ZW5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKi9cbjsoZnVuY3Rpb24od2luZG93LCBkb2N1bWVudCkge1xuICAgICd1c2Ugc3RyaWN0J1xuXG4gICAgLy8gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vcGF1bGlyaXNoLzE1Nzk2NzFcbiAgICA7KGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbGFzdFRpbWUgPSAwO1xuICAgICAgICB2YXIgdmVuZG9ycyA9IFsnbXMnLCAnbW96JywgJ3dlYmtpdCcsICdvJ107XG4gICAgICAgIGZvcih2YXIgeCA9IDA7IHggPCB2ZW5kb3JzLmxlbmd0aCAmJiAhd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZTsgKyt4KSB7XG4gICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gd2luZG93W3ZlbmRvcnNbeF0rJ1JlcXVlc3RBbmltYXRpb25GcmFtZSddO1xuICAgICAgICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lID0gd2luZG93W3ZlbmRvcnNbeF0rJ0NhbmNlbEFuaW1hdGlvbkZyYW1lJ11cbiAgICAgICAgICAgICAgICB8fCB3aW5kb3dbdmVuZG9yc1t4XSsnQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lJ107XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKVxuICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IGZ1bmN0aW9uKGNhbGxiYWNrLCBlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgdmFyIGN1cnJUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgICAgICAgICAgdmFyIHRpbWVUb0NhbGwgPSBNYXRoLm1heCgwLCAxNiAtIChjdXJyVGltZSAtIGxhc3RUaW1lKSk7XG4gICAgICAgICAgICAgICAgdmFyIGlkID0gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IGNhbGxiYWNrKGN1cnJUaW1lICsgdGltZVRvQ2FsbCk7IH0sXG4gICAgICAgICAgICAgICAgICAgIHRpbWVUb0NhbGwpO1xuICAgICAgICAgICAgICAgIGxhc3RUaW1lID0gY3VyclRpbWUgKyB0aW1lVG9DYWxsO1xuICAgICAgICAgICAgICAgIHJldHVybiBpZDtcbiAgICAgICAgICAgIH07XG4gICAgICAgIGlmICghd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKVxuICAgICAgICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoaWQpO1xuICAgICAgICAgICAgfTtcbiAgICB9KCkpO1xuXG4gICAgdmFyIGNhbnZhcywgcHJvZ3Jlc3NUaW1lcklkLCBmYWRlVGltZXJJZCwgY3VycmVudFByb2dyZXNzLCBzaG93aW5nLFxuICAgICAgICBhZGRFdmVudCA9IGZ1bmN0aW9uKGVsZW0sIHR5cGUsIGhhbmRsZXIpIHtcbiAgICAgICAgICAgIGlmIChlbGVtLmFkZEV2ZW50TGlzdGVuZXIpIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyLCBmYWxzZSlcbiAgICAgICAgICAgIGVsc2UgaWYgKGVsZW0uYXR0YWNoRXZlbnQpIGVsZW0uYXR0YWNoRXZlbnQoJ29uJyArIHR5cGUsIGhhbmRsZXIpXG4gICAgICAgICAgICBlbHNlICAgICAgICAgICAgICAgICAgICAgICBlbGVtWydvbicgKyB0eXBlXSA9IGhhbmRsZXJcbiAgICAgICAgfSxcbiAgICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGF1dG9SdW4gICAgICA6IHRydWUsXG4gICAgICAgICAgICBiYXJUaGlja25lc3MgOiAzLFxuICAgICAgICAgICAgYmFyQ29sb3JzICAgIDoge1xuICAgICAgICAgICAgICAgICcwJyAgICAgIDogJ3JnYmEoMjYsICAxODgsIDE1NiwgLjkpJyxcbiAgICAgICAgICAgICAgICAnLjI1JyAgICA6ICdyZ2JhKDUyLCAgMTUyLCAyMTksIC45KScsXG4gICAgICAgICAgICAgICAgJy41MCcgICAgOiAncmdiYSgyNDEsIDE5NiwgMTUsICAuOSknLFxuICAgICAgICAgICAgICAgICcuNzUnICAgIDogJ3JnYmEoMjMwLCAxMjYsIDM0LCAgLjkpJyxcbiAgICAgICAgICAgICAgICAnMS4wJyAgICA6ICdyZ2JhKDIxMSwgODQsICAwLCAgIC45KSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzaGFkb3dCbHVyICAgOiAxMCxcbiAgICAgICAgICAgIHNoYWRvd0NvbG9yICA6ICdyZ2JhKDAsICAgMCwgICAwLCAgIC42KScsXG4gICAgICAgICAgICBjbGFzc05hbWUgICAgOiBudWxsLFxuICAgICAgICB9LFxuICAgICAgICByZXBhaW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aFxuICAgICAgICAgICAgY2FudmFzLmhlaWdodCA9IG9wdGlvbnMuYmFyVGhpY2tuZXNzICogNSAvLyBuZWVkIHNwYWNlIGZvciBzaGFkb3dcblxuICAgICAgICAgICAgdmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpXG4gICAgICAgICAgICBjdHguc2hhZG93Qmx1ciA9IG9wdGlvbnMuc2hhZG93Qmx1clxuICAgICAgICAgICAgY3R4LnNoYWRvd0NvbG9yID0gb3B0aW9ucy5zaGFkb3dDb2xvclxuXG4gICAgICAgICAgICB2YXIgbGluZUdyYWRpZW50ID0gY3R4LmNyZWF0ZUxpbmVhckdyYWRpZW50KDAsIDAsIGNhbnZhcy53aWR0aCwgMClcbiAgICAgICAgICAgIGZvciAodmFyIHN0b3AgaW4gb3B0aW9ucy5iYXJDb2xvcnMpXG4gICAgICAgICAgICAgICAgbGluZUdyYWRpZW50LmFkZENvbG9yU3RvcChzdG9wLCBvcHRpb25zLmJhckNvbG9yc1tzdG9wXSlcbiAgICAgICAgICAgIGN0eC5saW5lV2lkdGggPSBvcHRpb25zLmJhclRoaWNrbmVzc1xuICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpXG4gICAgICAgICAgICBjdHgubW92ZVRvKDAsIG9wdGlvbnMuYmFyVGhpY2tuZXNzLzIpXG4gICAgICAgICAgICBjdHgubGluZVRvKE1hdGguY2VpbChjdXJyZW50UHJvZ3Jlc3MgKiBjYW52YXMud2lkdGgpLCBvcHRpb25zLmJhclRoaWNrbmVzcy8yKVxuICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gbGluZUdyYWRpZW50XG4gICAgICAgICAgICBjdHguc3Ryb2tlKClcbiAgICAgICAgfSxcbiAgICAgICAgY3JlYXRlQ2FudmFzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxuICAgICAgICAgICAgdmFyIHN0eWxlID0gY2FudmFzLnN0eWxlXG4gICAgICAgICAgICBzdHlsZS5wb3NpdGlvbiA9ICdmaXhlZCdcbiAgICAgICAgICAgIHN0eWxlLnRvcCA9IHN0eWxlLmxlZnQgPSBzdHlsZS5yaWdodCA9IHN0eWxlLm1hcmdpbiA9IHN0eWxlLnBhZGRpbmcgPSAwXG4gICAgICAgICAgICBzdHlsZS56SW5kZXggPSAxMDAwMDFcbiAgICAgICAgICAgIHN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmNsYXNzTmFtZSlcbiAgICAgICAgICAgICAgICBjYW52YXMuY2xhc3NMaXN0LmFkZChvcHRpb25zLmNsYXNzTmFtZSlcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY2FudmFzKVxuICAgICAgICAgICAgYWRkRXZlbnQod2luZG93LCAncmVzaXplJywgcmVwYWludClcbiAgICAgICAgfSxcbiAgICAgICAgdG9wYmFyID0ge1xuICAgICAgICAgICAgY29uZmlnOiBmdW5jdGlvbihvcHRzKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIG9wdHMpXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLmhhc093blByb3BlcnR5KGtleSkpXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zW2tleV0gPSBvcHRzW2tleV1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzaG93OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2hvd2luZykgcmV0dXJuXG4gICAgICAgICAgICAgICAgc2hvd2luZyA9IHRydWVcbiAgICAgICAgICAgICAgICBpZiAoZmFkZVRpbWVySWQgIT09IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShmYWRlVGltZXJJZClcbiAgICAgICAgICAgICAgICBpZiAoIWNhbnZhcykgY3JlYXRlQ2FudmFzKClcbiAgICAgICAgICAgICAgICBjYW52YXMuc3R5bGUub3BhY2l0eSA9IDFcbiAgICAgICAgICAgICAgICBjYW52YXMuc3R5bGUuZGlzcGxheSA9ICdibG9jaydcbiAgICAgICAgICAgICAgICB0b3BiYXIucHJvZ3Jlc3MoMClcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5hdXRvUnVuKSB7XG4gICAgICAgICAgICAgICAgICAgIChmdW5jdGlvbiBsb29wKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3NUaW1lcklkID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKVxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wYmFyLnByb2dyZXNzKCcrJyArICguMDUgKiBNYXRoLnBvdygxLU1hdGguc3FydChjdXJyZW50UHJvZ3Jlc3MpLCAyKSkpXG4gICAgICAgICAgICAgICAgICAgIH0pKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcHJvZ3Jlc3M6IGZ1bmN0aW9uKHRvKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0byA9PT0gXCJ1bmRlZmluZWRcIilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm9ncmVzc1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdG8gPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgdG8gPSAodG8uaW5kZXhPZignKycpID49IDAgfHwgdG8uaW5kZXhPZignLScpID49IDAgPyBjdXJyZW50UHJvZ3Jlc3MgOiAwKSArIHBhcnNlRmxvYXQodG8pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGN1cnJlbnRQcm9ncmVzcyA9IHRvID4gMSA/IDEgOiB0b1xuICAgICAgICAgICAgICAgIHJlcGFpbnQoKVxuICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50UHJvZ3Jlc3NcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBoaWRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXNob3dpbmcpIHJldHVyblxuICAgICAgICAgICAgICAgIHNob3dpbmcgPSBmYWxzZVxuICAgICAgICAgICAgICAgIGlmIChwcm9ncmVzc1RpbWVySWQgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUocHJvZ3Jlc3NUaW1lcklkKVxuICAgICAgICAgICAgICAgICAgICBwcm9ncmVzc1RpbWVySWQgPSBudWxsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIChmdW5jdGlvbiBsb29wKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodG9wYmFyLnByb2dyZXNzKCcrLjEnKSA+PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYW52YXMuc3R5bGUub3BhY2l0eSAtPSAuMDVcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYW52YXMuc3R5bGUub3BhY2l0eSA8PSAuMDUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYW52YXMuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhZGVUaW1lcklkID0gbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGZhZGVUaW1lcklkID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKVxuICAgICAgICAgICAgICAgIH0pKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSB0b3BiYXJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoZnVuY3Rpb24oKSB7IHJldHVybiB0b3BiYXIgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnRvcGJhciA9IHRvcGJhclxuICAgIH1cbn0pLmNhbGwodGhpcywgd2luZG93LCBkb2N1bWVudClcbiIsICIhZnVuY3Rpb24oZSx0KXtcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZT9tb2R1bGUuZXhwb3J0cz10KCk6XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShbXSx0KTpcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cz9leHBvcnRzLnBob2VuaXhfbGl2ZV92aWV3PXQoKTplLnBob2VuaXhfbGl2ZV92aWV3PXQoKX0odGhpcyxmdW5jdGlvbigpe3JldHVybiBmdW5jdGlvbihlKXt2YXIgdD17fTtmdW5jdGlvbiBuKGkpe2lmKHRbaV0pcmV0dXJuIHRbaV0uZXhwb3J0czt2YXIgcj10W2ldPXtpOmksbDohMSxleHBvcnRzOnt9fTtyZXR1cm4gZVtpXS5jYWxsKHIuZXhwb3J0cyxyLHIuZXhwb3J0cyxuKSxyLmw9ITAsci5leHBvcnRzfXJldHVybiBuLm09ZSxuLmM9dCxuLmQ9ZnVuY3Rpb24oZSx0LGkpe24ubyhlLHQpfHxPYmplY3QuZGVmaW5lUHJvcGVydHkoZSx0LHtjb25maWd1cmFibGU6ITEsZW51bWVyYWJsZTohMCxnZXQ6aX0pfSxuLnI9ZnVuY3Rpb24oZSl7T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSl9LG4ubj1mdW5jdGlvbihlKXt2YXIgdD1lJiZlLl9fZXNNb2R1bGU/ZnVuY3Rpb24oKXtyZXR1cm4gZS5kZWZhdWx0fTpmdW5jdGlvbigpe3JldHVybiBlfTtyZXR1cm4gbi5kKHQsXCJhXCIsdCksdH0sbi5vPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChlLHQpfSxuLnA9XCJcIixuKG4ucz0yKX0oW2Z1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtuLnIodCk7dmFyIGkscj0xMTt2YXIgbz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWxcIixhPVwidW5kZWZpbmVkXCI9PXR5cGVvZiBkb2N1bWVudD92b2lkIDA6ZG9jdW1lbnQsdT0hIWEmJlwiY29udGVudFwiaW4gYS5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIikscz0hIWEmJmEuY3JlYXRlUmFuZ2UmJlwiY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50XCJpbiBhLmNyZWF0ZVJhbmdlKCk7ZnVuY3Rpb24gYyhlKXtyZXR1cm4gZT1lLnRyaW0oKSx1P2Z1bmN0aW9uKGUpe3ZhciB0PWEuY3JlYXRlRWxlbWVudChcInRlbXBsYXRlXCIpO3JldHVybiB0LmlubmVySFRNTD1lLHQuY29udGVudC5jaGlsZE5vZGVzWzBdfShlKTpzP2Z1bmN0aW9uKGUpe3JldHVybiBpfHwoaT1hLmNyZWF0ZVJhbmdlKCkpLnNlbGVjdE5vZGUoYS5ib2R5KSxpLmNyZWF0ZUNvbnRleHR1YWxGcmFnbWVudChlKS5jaGlsZE5vZGVzWzBdfShlKTpmdW5jdGlvbihlKXt2YXIgdD1hLmNyZWF0ZUVsZW1lbnQoXCJib2R5XCIpO3JldHVybiB0LmlubmVySFRNTD1lLHQuY2hpbGROb2Rlc1swXX0oZSl9ZnVuY3Rpb24gbChlLHQpe3ZhciBuLGkscj1lLm5vZGVOYW1lLG89dC5ub2RlTmFtZTtyZXR1cm4gcj09PW98fChuPXIuY2hhckNvZGVBdCgwKSxpPW8uY2hhckNvZGVBdCgwKSxuPD05MCYmaT49OTc/cj09PW8udG9VcHBlckNhc2UoKTppPD05MCYmbj49OTcmJm89PT1yLnRvVXBwZXJDYXNlKCkpfWZ1bmN0aW9uIGQoZSx0LG4pe2Vbbl0hPT10W25dJiYoZVtuXT10W25dLGVbbl0/ZS5zZXRBdHRyaWJ1dGUobixcIlwiKTplLnJlbW92ZUF0dHJpYnV0ZShuKSl9dmFyIGg9e09QVElPTjpmdW5jdGlvbihlLHQpe3ZhciBuPWUucGFyZW50Tm9kZTtpZihuKXt2YXIgaT1uLm5vZGVOYW1lLnRvVXBwZXJDYXNlKCk7XCJPUFRHUk9VUFwiPT09aSYmKGk9KG49bi5wYXJlbnROb2RlKSYmbi5ub2RlTmFtZS50b1VwcGVyQ2FzZSgpKSxcIlNFTEVDVFwiIT09aXx8bi5oYXNBdHRyaWJ1dGUoXCJtdWx0aXBsZVwiKXx8KGUuaGFzQXR0cmlidXRlKFwic2VsZWN0ZWRcIikmJiF0LnNlbGVjdGVkJiYoZS5zZXRBdHRyaWJ1dGUoXCJzZWxlY3RlZFwiLFwic2VsZWN0ZWRcIiksZS5yZW1vdmVBdHRyaWJ1dGUoXCJzZWxlY3RlZFwiKSksbi5zZWxlY3RlZEluZGV4PS0xKX1kKGUsdCxcInNlbGVjdGVkXCIpfSxJTlBVVDpmdW5jdGlvbihlLHQpe2QoZSx0LFwiY2hlY2tlZFwiKSxkKGUsdCxcImRpc2FibGVkXCIpLGUudmFsdWUhPT10LnZhbHVlJiYoZS52YWx1ZT10LnZhbHVlKSx0Lmhhc0F0dHJpYnV0ZShcInZhbHVlXCIpfHxlLnJlbW92ZUF0dHJpYnV0ZShcInZhbHVlXCIpfSxURVhUQVJFQTpmdW5jdGlvbihlLHQpe3ZhciBuPXQudmFsdWU7ZS52YWx1ZSE9PW4mJihlLnZhbHVlPW4pO3ZhciBpPWUuZmlyc3RDaGlsZDtpZihpKXt2YXIgcj1pLm5vZGVWYWx1ZTtpZihyPT1ufHwhbiYmcj09ZS5wbGFjZWhvbGRlcilyZXR1cm47aS5ub2RlVmFsdWU9bn19LFNFTEVDVDpmdW5jdGlvbihlLHQpe2lmKCF0Lmhhc0F0dHJpYnV0ZShcIm11bHRpcGxlXCIpKXtmb3IodmFyIG4saSxyPS0xLG89MCxhPWUuZmlyc3RDaGlsZDthOylpZihcIk9QVEdST1VQXCI9PT0oaT1hLm5vZGVOYW1lJiZhLm5vZGVOYW1lLnRvVXBwZXJDYXNlKCkpKWE9KG49YSkuZmlyc3RDaGlsZDtlbHNle2lmKFwiT1BUSU9OXCI9PT1pKXtpZihhLmhhc0F0dHJpYnV0ZShcInNlbGVjdGVkXCIpKXtyPW87YnJlYWt9bysrfSEoYT1hLm5leHRTaWJsaW5nKSYmbiYmKGE9bi5uZXh0U2libGluZyxuPW51bGwpfWUuc2VsZWN0ZWRJbmRleD1yfX19LGY9MSx2PTExLHA9MyxnPTg7ZnVuY3Rpb24gbSgpe31mdW5jdGlvbiB5KGUpe2lmKGUpcmV0dXJuIGUuZ2V0QXR0cmlidXRlJiZlLmdldEF0dHJpYnV0ZShcImlkXCIpfHxlLmlkfXZhciBrPWZ1bmN0aW9uKGUpe3JldHVybiBmdW5jdGlvbih0LG4saSl7aWYoaXx8KGk9e30pLFwic3RyaW5nXCI9PXR5cGVvZiBuKWlmKFwiI2RvY3VtZW50XCI9PT10Lm5vZGVOYW1lfHxcIkhUTUxcIj09PXQubm9kZU5hbWV8fFwiQk9EWVwiPT09dC5ub2RlTmFtZSl7dmFyIHI9bjsobj1hLmNyZWF0ZUVsZW1lbnQoXCJodG1sXCIpKS5pbm5lckhUTUw9cn1lbHNlIG49YyhuKTt2YXIgdT1pLmdldE5vZGVLZXl8fHkscz1pLm9uQmVmb3JlTm9kZUFkZGVkfHxtLGQ9aS5vbk5vZGVBZGRlZHx8bSxrPWkub25CZWZvcmVFbFVwZGF0ZWR8fG0sYj1pLm9uRWxVcGRhdGVkfHxtLHc9aS5vbkJlZm9yZU5vZGVEaXNjYXJkZWR8fG0sRT1pLm9uTm9kZURpc2NhcmRlZHx8bSxTPWkub25CZWZvcmVFbENoaWxkcmVuVXBkYXRlZHx8bSxBPSEwPT09aS5jaGlsZHJlbk9ubHkseD1PYmplY3QuY3JlYXRlKG51bGwpLEM9W107ZnVuY3Rpb24gUChlKXtDLnB1c2goZSl9ZnVuY3Rpb24gTChlLHQsbil7ITEhPT13KGUpJiYodCYmdC5yZW1vdmVDaGlsZChlKSxFKGUpLGZ1bmN0aW9uIGUodCxuKXtpZih0Lm5vZGVUeXBlPT09Zilmb3IodmFyIGk9dC5maXJzdENoaWxkO2k7KXt2YXIgcj12b2lkIDA7biYmKHI9dShpKSk/UChyKTooRShpKSxpLmZpcnN0Q2hpbGQmJmUoaSxuKSksaT1pLm5leHRTaWJsaW5nfX0oZSxuKSl9ZnVuY3Rpb24gSShlKXtkKGUpO2Zvcih2YXIgdD1lLmZpcnN0Q2hpbGQ7dDspe3ZhciBuPXQubmV4dFNpYmxpbmcsaT11KHQpO2lmKGkpe3ZhciByPXhbaV07ciYmbCh0LHIpPyh0LnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKHIsdCksVChyLHQpKTpJKHQpfWVsc2UgSSh0KTt0PW59fWZ1bmN0aW9uIFQodCxuLGkpe3ZhciByPXUobik7aWYociYmZGVsZXRlIHhbcl0sIWkpe2lmKCExPT09ayh0LG4pKXJldHVybjtpZihlKHQsbiksYih0KSwhMT09PVModCxuKSlyZXR1cm59XCJURVhUQVJFQVwiIT09dC5ub2RlTmFtZT9mdW5jdGlvbihlLHQpe3ZhciBuLGkscixvLGMsZD10LmZpcnN0Q2hpbGQsdj1lLmZpcnN0Q2hpbGQ7ZTpmb3IoO2Q7KXtmb3Iobz1kLm5leHRTaWJsaW5nLG49dShkKTt2Oyl7aWYocj12Lm5leHRTaWJsaW5nLGQuaXNTYW1lTm9kZSYmZC5pc1NhbWVOb2RlKHYpKXtkPW8sdj1yO2NvbnRpbnVlIGV9aT11KHYpO3ZhciBtPXYubm9kZVR5cGUseT12b2lkIDA7aWYobT09PWQubm9kZVR5cGUmJihtPT09Zj8obj9uIT09aSYmKChjPXhbbl0pP3I9PT1jP3k9ITE6KGUuaW5zZXJ0QmVmb3JlKGMsdiksaT9QKGkpOkwodixlLCEwKSx2PWMpOnk9ITEpOmkmJih5PSExKSwoeT0hMSE9PXkmJmwodixkKSkmJlQodixkKSk6bSE9PXAmJm0hPWd8fCh5PSEwLHYubm9kZVZhbHVlIT09ZC5ub2RlVmFsdWUmJih2Lm5vZGVWYWx1ZT1kLm5vZGVWYWx1ZSkpKSx5KXtkPW8sdj1yO2NvbnRpbnVlIGV9aT9QKGkpOkwodixlLCEwKSx2PXJ9aWYobiYmKGM9eFtuXSkmJmwoYyxkKSllLmFwcGVuZENoaWxkKGMpLFQoYyxkKTtlbHNle3ZhciBrPXMoZCk7ITEhPT1rJiYoayYmKGQ9ayksZC5hY3R1YWxpemUmJihkPWQuYWN0dWFsaXplKGUub3duZXJEb2N1bWVudHx8YSkpLGUuYXBwZW5kQ2hpbGQoZCksSShkKSl9ZD1vLHY9cn0hZnVuY3Rpb24oZSx0LG4pe2Zvcig7dDspe3ZhciBpPXQubmV4dFNpYmxpbmc7KG49dSh0KSk/UChuKTpMKHQsZSwhMCksdD1pfX0oZSx2LGkpO3ZhciBiPWhbZS5ub2RlTmFtZV07YiYmYihlLHQpfSh0LG4pOmguVEVYVEFSRUEodCxuKX0hZnVuY3Rpb24gZSh0KXtpZih0Lm5vZGVUeXBlPT09Znx8dC5ub2RlVHlwZT09PXYpZm9yKHZhciBuPXQuZmlyc3RDaGlsZDtuOyl7dmFyIGk9dShuKTtpJiYoeFtpXT1uKSxlKG4pLG49bi5uZXh0U2libGluZ319KHQpO3ZhciBEPXQsXz1ELm5vZGVUeXBlLE49bi5ub2RlVHlwZTtpZighQSlpZihfPT09ZilOPT09Zj9sKHQsbil8fChFKHQpLEQ9ZnVuY3Rpb24oZSx0KXtmb3IodmFyIG49ZS5maXJzdENoaWxkO247KXt2YXIgaT1uLm5leHRTaWJsaW5nO3QuYXBwZW5kQ2hpbGQobiksbj1pfXJldHVybiB0fSh0LGZ1bmN0aW9uKGUsdCl7cmV0dXJuIHQmJnQhPT1vP2EuY3JlYXRlRWxlbWVudE5TKHQsZSk6YS5jcmVhdGVFbGVtZW50KGUpfShuLm5vZGVOYW1lLG4ubmFtZXNwYWNlVVJJKSkpOkQ9bjtlbHNlIGlmKF89PT1wfHxfPT09Zyl7aWYoTj09PV8pcmV0dXJuIEQubm9kZVZhbHVlIT09bi5ub2RlVmFsdWUmJihELm5vZGVWYWx1ZT1uLm5vZGVWYWx1ZSksRDtEPW59aWYoRD09PW4pRSh0KTtlbHNle2lmKG4uaXNTYW1lTm9kZSYmbi5pc1NhbWVOb2RlKEQpKXJldHVybjtpZihUKEQsbixBKSxDKWZvcih2YXIgUj0wLE89Qy5sZW5ndGg7UjxPO1IrKyl7dmFyIGo9eFtDW1JdXTtqJiZMKGosai5wYXJlbnROb2RlLCExKX19cmV0dXJuIUEmJkQhPT10JiZ0LnBhcmVudE5vZGUmJihELmFjdHVhbGl6ZSYmKEQ9RC5hY3R1YWxpemUodC5vd25lckRvY3VtZW50fHxhKSksdC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChELHQpKSxEfX0oZnVuY3Rpb24oZSx0KXt2YXIgbixpLG8sYSx1PXQuYXR0cmlidXRlcztpZih0Lm5vZGVUeXBlIT09ciYmZS5ub2RlVHlwZSE9PXIpe2Zvcih2YXIgcz11Lmxlbmd0aC0xO3M+PTA7cy0tKWk9KG49dVtzXSkubmFtZSxvPW4ubmFtZXNwYWNlVVJJLGE9bi52YWx1ZSxvPyhpPW4ubG9jYWxOYW1lfHxpLGUuZ2V0QXR0cmlidXRlTlMobyxpKSE9PWEmJihcInhtbG5zXCI9PT1uLnByZWZpeCYmKGk9bi5uYW1lKSxlLnNldEF0dHJpYnV0ZU5TKG8saSxhKSkpOmUuZ2V0QXR0cmlidXRlKGkpIT09YSYmZS5zZXRBdHRyaWJ1dGUoaSxhKTtmb3IodmFyIGM9ZS5hdHRyaWJ1dGVzLGw9Yy5sZW5ndGgtMTtsPj0wO2wtLSlpPShuPWNbbF0pLm5hbWUsKG89bi5uYW1lc3BhY2VVUkkpPyhpPW4ubG9jYWxOYW1lfHxpLHQuaGFzQXR0cmlidXRlTlMobyxpKXx8ZS5yZW1vdmVBdHRyaWJ1dGVOUyhvLGkpKTp0Lmhhc0F0dHJpYnV0ZShpKXx8ZS5yZW1vdmVBdHRyaWJ1dGUoaSl9fSk7ZnVuY3Rpb24gYihlKXtyZXR1cm4gTChlKXx8RShlKXx8SShlKXx8UCgpfWZ1bmN0aW9uIHcoZSl7cmV0dXJuIGZ1bmN0aW9uKGUpe2lmKEFycmF5LmlzQXJyYXkoZSkpcmV0dXJuIFQoZSl9KGUpfHxFKGUpfHxJKGUpfHxmdW5jdGlvbigpe3Rocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gc3ByZWFkIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpfSgpfWZ1bmN0aW9uIEUoZSl7aWYoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIFN5bWJvbCYmU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChlKSlyZXR1cm4gQXJyYXkuZnJvbShlKX1mdW5jdGlvbiBTKGUsdCl7dmFyIG49T2JqZWN0LmtleXMoZSk7aWYoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyl7dmFyIGk9T2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhlKTt0JiYoaT1pLmZpbHRlcihmdW5jdGlvbih0KXtyZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihlLHQpLmVudW1lcmFibGV9KSksbi5wdXNoLmFwcGx5KG4saSl9cmV0dXJuIG59ZnVuY3Rpb24gQShlKXtmb3IodmFyIHQ9MTt0PGFyZ3VtZW50cy5sZW5ndGg7dCsrKXt2YXIgbj1udWxsIT1hcmd1bWVudHNbdF0/YXJndW1lbnRzW3RdOnt9O3QlMj9TKE9iamVjdChuKSwhMCkuZm9yRWFjaChmdW5jdGlvbih0KXt4KGUsdCxuW3RdKX0pOk9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzP09iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGUsT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMobikpOlMoT2JqZWN0KG4pKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe09iamVjdC5kZWZpbmVQcm9wZXJ0eShlLHQsT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihuLHQpKX0pfXJldHVybiBlfWZ1bmN0aW9uIHgoZSx0LG4pe3JldHVybiB0IGluIGU/T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsdCx7dmFsdWU6bixlbnVtZXJhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMCx3cml0YWJsZTohMH0pOmVbdF09bixlfWZ1bmN0aW9uIEMoZSx0KXtyZXR1cm4gTChlKXx8ZnVuY3Rpb24oZSx0KXtpZihcInVuZGVmaW5lZFwiPT10eXBlb2YgU3ltYm9sfHwhKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoZSkpKXJldHVybjt2YXIgbj1bXSxpPSEwLHI9ITEsbz12b2lkIDA7dHJ5e2Zvcih2YXIgYSx1PWVbU3ltYm9sLml0ZXJhdG9yXSgpOyEoaT0oYT11Lm5leHQoKSkuZG9uZSkmJihuLnB1c2goYS52YWx1ZSksIXR8fG4ubGVuZ3RoIT09dCk7aT0hMCk7fWNhdGNoKGUpe3I9ITAsbz1lfWZpbmFsbHl7dHJ5e2l8fG51bGw9PXUucmV0dXJufHx1LnJldHVybigpfWZpbmFsbHl7aWYocil0aHJvdyBvfX1yZXR1cm4gbn0oZSx0KXx8SShlLHQpfHxQKCl9ZnVuY3Rpb24gUCgpe3Rocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIil9ZnVuY3Rpb24gTChlKXtpZihBcnJheS5pc0FycmF5KGUpKXJldHVybiBlfWZ1bmN0aW9uIEkoZSx0KXtpZihlKXtpZihcInN0cmluZ1wiPT10eXBlb2YgZSlyZXR1cm4gVChlLHQpO3ZhciBuPU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChlKS5zbGljZSg4LC0xKTtyZXR1cm5cIk9iamVjdFwiPT09biYmZS5jb25zdHJ1Y3RvciYmKG49ZS5jb25zdHJ1Y3Rvci5uYW1lKSxcIk1hcFwiPT09bnx8XCJTZXRcIj09PW4/QXJyYXkuZnJvbShlKTpcIkFyZ3VtZW50c1wiPT09bnx8L14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3Qobik/VChlLHQpOnZvaWQgMH19ZnVuY3Rpb24gVChlLHQpeyhudWxsPT10fHx0PmUubGVuZ3RoKSYmKHQ9ZS5sZW5ndGgpO2Zvcih2YXIgbj0wLGk9bmV3IEFycmF5KHQpO248dDtuKyspaVtuXT1lW25dO3JldHVybiBpfWZ1bmN0aW9uIEQoZSx0KXtpZighKGUgaW5zdGFuY2VvZiB0KSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpfWZ1bmN0aW9uIF8oZSx0KXtmb3IodmFyIG49MDtuPHQubGVuZ3RoO24rKyl7dmFyIGk9dFtuXTtpLmVudW1lcmFibGU9aS5lbnVtZXJhYmxlfHwhMSxpLmNvbmZpZ3VyYWJsZT0hMCxcInZhbHVlXCJpbiBpJiYoaS53cml0YWJsZT0hMCksT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsaS5rZXksaSl9fWZ1bmN0aW9uIE4oZSx0LG4pe3JldHVybiB0JiZfKGUucHJvdG90eXBlLHQpLG4mJl8oZSxuKSxlfWZ1bmN0aW9uIFIoZSl7XCJAYmFiZWwvaGVscGVycyAtIHR5cGVvZlwiO3JldHVybihSPVwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmXCJzeW1ib2xcIj09dHlwZW9mIFN5bWJvbC5pdGVyYXRvcj9mdW5jdGlvbihlKXtyZXR1cm4gdHlwZW9mIGV9OmZ1bmN0aW9uKGUpe3JldHVybiBlJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJmUuY29uc3RydWN0b3I9PT1TeW1ib2wmJmUhPT1TeW1ib2wucHJvdG90eXBlP1wic3ltYm9sXCI6dHlwZW9mIGV9KShlKX1uLmQodCxcImRlYnVnXCIsZnVuY3Rpb24oKXtyZXR1cm4gWH0pLG4uZCh0LFwiUmVuZGVyZWRcIixmdW5jdGlvbigpe3JldHVybiBzZX0pLG4uZCh0LFwiTGl2ZVNvY2tldFwiLGZ1bmN0aW9uKCl7cmV0dXJuIGNlfSksbi5kKHQsXCJCcm93c2VyXCIsZnVuY3Rpb24oKXtyZXR1cm4gbGV9KSxuLmQodCxcIkRPTVwiLGZ1bmN0aW9uKCl7cmV0dXJuIGRlfSksbi5kKHQsXCJWaWV3XCIsZnVuY3Rpb24oKXtyZXR1cm4gdmV9KTt2YXIgTz1bMWUzLDNlM10saj1cImRhdGEtcGh4LXZpZXdcIixIPVtcInBoeC1jbGljay1sb2FkaW5nXCIsXCJwaHgtY2hhbmdlLWxvYWRpbmdcIixcInBoeC1zdWJtaXQtbG9hZGluZ1wiLFwicGh4LWtleWRvd24tbG9hZGluZ1wiLFwicGh4LWtleXVwLWxvYWRpbmdcIixcInBoeC1ibHVyLWxvYWRpbmdcIixcInBoeC1mb2N1cy1sb2FkaW5nXCJdLE09XCJkYXRhLXBoeC1jb21wb25lbnRcIixGPVwiZGF0YS1waHgtcmVmXCIsVT1cImRhdGEtcGh4LXVwbG9hZC1yZWZcIixCPVwiW1wiLmNvbmNhdChqLFwiXVwiKSxKPVtcInRleHRcIixcInRleHRhcmVhXCIsXCJudW1iZXJcIixcImVtYWlsXCIsXCJwYXNzd29yZFwiLFwic2VhcmNoXCIsXCJ0ZWxcIixcInVybFwiLFwiZGF0ZVwiLFwidGltZVwiXSxWPVtcImNoZWNrYm94XCIsXCJyYWRpb1wiXSxXPTEscT1cInBoeC1cIix6PXtkZWJvdW5jZTozMDAsdGhyb3R0bGU6MzAwfSxLPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIGNvbnNvbGUuZXJyb3ImJmNvbnNvbGUuZXJyb3IoZSx0KX07dmFyIFg9ZnVuY3Rpb24oZSx0LG4saSl7ZS5saXZlU29ja2V0LmlzRGVidWdFbmFibGVkKCkmJmNvbnNvbGUubG9nKFwiXCIuY29uY2F0KGUuaWQsXCIgXCIpLmNvbmNhdCh0LFwiOiBcIikuY29uY2F0KG4sXCIgLSBcIiksaSl9LCQ9ZnVuY3Rpb24oZSl7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2YgZT9lOmZ1bmN0aW9uKCl7cmV0dXJuIGV9fSxHPWZ1bmN0aW9uKGUpe3JldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGUpKX0sWT1mdW5jdGlvbihlLHQsbil7ZG97aWYoZS5tYXRjaGVzKFwiW1wiLmNvbmNhdCh0LFwiXVwiKSkpcmV0dXJuIGU7ZT1lLnBhcmVudEVsZW1lbnR8fGUucGFyZW50Tm9kZX13aGlsZShudWxsIT09ZSYmMT09PWUubm9kZVR5cGUmJiEobiYmbi5pc1NhbWVOb2RlKGUpfHxlLm1hdGNoZXMoQikpKTtyZXR1cm4gbnVsbH0sUT1mdW5jdGlvbihlKXtyZXR1cm4gbnVsbCE9PWUmJlwib2JqZWN0XCI9PT1SKGUpJiYhKGUgaW5zdGFuY2VvZiBBcnJheSl9LFo9ZnVuY3Rpb24oZSl7Zm9yKHZhciB0IGluIGUpcmV0dXJuITE7cmV0dXJuITB9LGVlPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIGUmJnQoZSl9LHRlPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gZSh0LG4saSl7RCh0aGlzLGUpLHRoaXMucmVmPXJlLmdlbkZpbGVSZWYobiksdGhpcy5maWxlRWw9dCx0aGlzLmZpbGU9bix0aGlzLnZpZXc9aSx0aGlzLm1ldGE9bnVsbCx0aGlzLl9pc0NhbmNlbGxlZD0hMSx0aGlzLl9pc0RvbmU9ITEsdGhpcy5fcHJvZ3Jlc3M9MCx0aGlzLl9sYXN0UHJvZ3Jlc3NTZW50PS0xLHRoaXMuX29uRG9uZT1mdW5jdGlvbigpe319cmV0dXJuIE4oZSxudWxsLFt7a2V5OlwiaXNBY3RpdmVcIix2YWx1ZTpmdW5jdGlvbihlLHQpe3ZhciBuPXZvaWQgMD09PXQuX3BoeFJlZixpPWUuZ2V0QXR0cmlidXRlKFwiZGF0YS1waHgtYWN0aXZlLXJlZnNcIikuc3BsaXQoXCIsXCIpLmluZGV4T2YocmUuZ2VuRmlsZVJlZih0KSk+PTA7cmV0dXJuIHQuc2l6ZT4wJiYobnx8aSl9fSx7a2V5OlwiaXNQcmVmbGlnaHRlZFwiLHZhbHVlOmZ1bmN0aW9uKGUsdCl7dmFyIG49ZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBoeC1wcmVmbGlnaHRlZC1yZWZzXCIpLnNwbGl0KFwiLFwiKS5pbmRleE9mKHJlLmdlbkZpbGVSZWYodCkpPj0wO3JldHVybiBuJiZ0aGlzLmlzQWN0aXZlKGUsdCl9fV0pLE4oZSxbe2tleTpcIm1ldGFkYXRhXCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5tZXRhfX0se2tleTpcInByb2dyZXNzXCIsdmFsdWU6ZnVuY3Rpb24oZSl7dmFyIHQ9dGhpczt0aGlzLl9wcm9ncmVzcz1NYXRoLmZsb29yKGUpLHRoaXMuX3Byb2dyZXNzPnRoaXMuX2xhc3RQcm9ncmVzc1NlbnQmJih0aGlzLl9wcm9ncmVzcz49MTAwPyh0aGlzLl9wcm9ncmVzcz0xMDAsdGhpcy5fbGFzdFByb2dyZXNzU2VudD0xMDAsdGhpcy5faXNEb25lPSEwLHRoaXMudmlldy5wdXNoRmlsZVByb2dyZXNzKHRoaXMuZmlsZUVsLHRoaXMucmVmLDEwMCxmdW5jdGlvbigpe3JlLnVudHJhY2tGaWxlKHQuZmlsZUVsLHQuZmlsZSksdC5fb25Eb25lKCl9KSk6KHRoaXMuX2xhc3RQcm9ncmVzc1NlbnQ9dGhpcy5fcHJvZ3Jlc3MsdGhpcy52aWV3LnB1c2hGaWxlUHJvZ3Jlc3ModGhpcy5maWxlRWwsdGhpcy5yZWYsdGhpcy5fcHJvZ3Jlc3MpKSl9fSx7a2V5OlwiY2FuY2VsXCIsdmFsdWU6ZnVuY3Rpb24oKXt0aGlzLl9pc0NhbmNlbGxlZD0hMCx0aGlzLl9pc0RvbmU9ITAsdGhpcy5fb25Eb25lKCl9fSx7a2V5OlwiaXNEb25lXCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5faXNEb25lfX0se2tleTpcImVycm9yXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgZT1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXT9hcmd1bWVudHNbMF06XCJmYWlsZWRcIjtyZS5jbGVhckZpbGVzKHRoaXMuZmlsZUVsKSx0aGlzLnZpZXcucHVzaEZpbGVQcm9ncmVzcyh0aGlzLmZpbGVFbCx0aGlzLnJlZix7ZXJyb3I6ZX0pfX0se2tleTpcIm9uRG9uZVwiLHZhbHVlOmZ1bmN0aW9uKGUpe3RoaXMuX29uRG9uZT1lfX0se2tleTpcInRvUHJlZmxpZ2h0UGF5bG9hZFwiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJue2xhc3RfbW9kaWZpZWQ6dGhpcy5maWxlLmxhc3RNb2RpZmllZCxuYW1lOnRoaXMuZmlsZS5uYW1lLHNpemU6dGhpcy5maWxlLnNpemUsdHlwZTp0aGlzLmZpbGUudHlwZSxyZWY6dGhpcy5yZWZ9fX0se2tleTpcInVwbG9hZGVyXCIsdmFsdWU6ZnVuY3Rpb24oZSl7aWYodGhpcy5tZXRhLnVwbG9hZGVyKXt2YXIgdD1lW3RoaXMubWV0YS51cGxvYWRlcl18fEsoXCJubyB1cGxvYWRlciBjb25maWd1cmVkIGZvciBcIi5jb25jYXQodGhpcy5tZXRhLnVwbG9hZGVyKSk7cmV0dXJue25hbWU6dGhpcy5tZXRhLnVwbG9hZGVyLGNhbGxiYWNrOnR9fXJldHVybntuYW1lOlwiY2hhbm5lbFwiLGNhbGxiYWNrOm9lfX19LHtrZXk6XCJ6aXBQb3N0RmxpZ2h0XCIsdmFsdWU6ZnVuY3Rpb24oZSl7dGhpcy5tZXRhPWUuZW50cmllc1t0aGlzLnJlZl0sdGhpcy5tZXRhfHxLKFwibm8gcHJlZmxpZ2h0IHVwbG9hZCByZXNwb25zZSByZXR1cm5lZCB3aXRoIHJlZiBcIi5jb25jYXQodGhpcy5yZWYpLHtpbnB1dDp0aGlzLmZpbGVFbCxyZXNwb25zZTplfSl9fV0pLGV9KCksbmU9e0xpdmVGaWxlVXBsb2FkOntwcmVmbGlnaHRlZFJlZnM6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5lbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBoeC1wcmVmbGlnaHRlZC1yZWZzXCIpfSxtb3VudGVkOmZ1bmN0aW9uKCl7dGhpcy5wcmVmbGlnaHRlZFdhcz10aGlzLnByZWZsaWdodGVkUmVmcygpfSx1cGRhdGVkOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcy5wcmVmbGlnaHRlZFJlZnMoKTt0aGlzLnByZWZsaWdodGVkV2FzIT09ZSYmKHRoaXMucHJlZmxpZ2h0ZWRXYXM9ZSxcIlwiPT09ZSYmdGhpcy5fX3ZpZXcuY2FuY2VsU3VibWl0KHRoaXMuZWwuZm9ybSkpfX19O25lLkxpdmVJbWdQcmV2aWV3PXttb3VudGVkOmZ1bmN0aW9uKCl7dmFyIGU9dGhpczt0aGlzLnJlZj10aGlzLmVsLmdldEF0dHJpYnV0ZShcImRhdGEtcGh4LWVudHJ5LXJlZlwiKSx0aGlzLmlucHV0RWw9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5lbC5nZXRBdHRyaWJ1dGUoVSkpLHJlLmdldEVudHJ5RGF0YVVSTCh0aGlzLmlucHV0RWwsdGhpcy5yZWYsZnVuY3Rpb24odCl7cmV0dXJuIGUuZWwuc3JjPXR9KX19O3ZhciBpZT0wLHJlPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gZSh0LG4saSl7RCh0aGlzLGUpLHRoaXMudmlldz1uLHRoaXMub25Db21wbGV0ZT1pLHRoaXMuX2VudHJpZXM9QXJyYXkuZnJvbShlLmZpbGVzQXdhaXRpbmdQcmVmbGlnaHQodCl8fFtdKS5tYXAoZnVuY3Rpb24oZSl7cmV0dXJuIG5ldyB0ZSh0LGUsbil9KSx0aGlzLm51bUVudHJpZXNJblByb2dyZXNzPXRoaXMuX2VudHJpZXMubGVuZ3RofXJldHVybiBOKGUsbnVsbCxbe2tleTpcImdlbkZpbGVSZWZcIix2YWx1ZTpmdW5jdGlvbihlKXt2YXIgdD1lLl9waHhSZWY7cmV0dXJuIHZvaWQgMCE9PXQ/dDooZS5fcGh4UmVmPShpZSsrKS50b1N0cmluZygpLGUuX3BoeFJlZil9fSx7a2V5OlwiZ2V0RW50cnlEYXRhVVJMXCIsdmFsdWU6ZnVuY3Rpb24oZSx0LG4pe3ZhciBpPXRoaXMscj10aGlzLmFjdGl2ZUZpbGVzKGUpLmZpbmQoZnVuY3Rpb24oZSl7cmV0dXJuIGkuZ2VuRmlsZVJlZihlKT09PXR9KSxvPW5ldyBGaWxlUmVhZGVyO28ub25sb2FkPWZ1bmN0aW9uKGUpe3JldHVybiBuKGUudGFyZ2V0LnJlc3VsdCl9LG8ucmVhZEFzRGF0YVVSTChyKX19LHtrZXk6XCJoYXNVcGxvYWRzSW5Qcm9ncmVzc1wiLHZhbHVlOmZ1bmN0aW9uKGUpe3ZhciB0PTA7cmV0dXJuIGRlLmZpbmRVcGxvYWRJbnB1dHMoZSkuZm9yRWFjaChmdW5jdGlvbihlKXtlLmdldEF0dHJpYnV0ZShcImRhdGEtcGh4LXByZWZsaWdodGVkLXJlZnNcIikhPT1lLmdldEF0dHJpYnV0ZShcImRhdGEtcGh4LWRvbmUtcmVmc1wiKSYmdCsrfSksdD4wfX0se2tleTpcInNlcmlhbGl6ZVVwbG9hZHNcIix2YWx1ZTpmdW5jdGlvbihlKXt2YXIgdD10aGlzLG49e307cmV0dXJuIHRoaXMuYWN0aXZlRmlsZXMoZSxcInNlcmlhbGl6ZVwiKS5mb3JFYWNoKGZ1bmN0aW9uKGkpe3ZhciByPXtwYXRoOmUubmFtZX0sbz1lLmdldEF0dHJpYnV0ZShVKTtuW29dPW5bb118fFtdLHIucmVmPXQuZ2VuRmlsZVJlZihpKSxyLm5hbWU9aS5uYW1lLHIudHlwZT1pLnR5cGUsci5zaXplPWkuc2l6ZSxuW29dLnB1c2gocil9KSxufX0se2tleTpcImNsZWFyRmlsZXNcIix2YWx1ZTpmdW5jdGlvbihlKXtlLnZhbHVlPW51bGwsZS5yZW1vdmVBdHRyaWJ1dGUoVSksZGUucHV0UHJpdmF0ZShlLFwiZmlsZXNcIixbXSl9fSx7a2V5OlwidW50cmFja0ZpbGVcIix2YWx1ZTpmdW5jdGlvbihlLHQpe2RlLnB1dFByaXZhdGUoZSxcImZpbGVzXCIsZGUucHJpdmF0ZShlLFwiZmlsZXNcIikuZmlsdGVyKGZ1bmN0aW9uKGUpe3JldHVybiFPYmplY3QuaXMoZSx0KX0pKX19LHtrZXk6XCJ0cmFja0ZpbGVzXCIsdmFsdWU6ZnVuY3Rpb24oZSx0KXt2YXIgbj10aGlzO2lmKG51bGwhPT1lLmdldEF0dHJpYnV0ZShcIm11bHRpcGxlXCIpKXt2YXIgaT10LmZpbHRlcihmdW5jdGlvbih0KXtyZXR1cm4hbi5hY3RpdmVGaWxlcyhlKS5maW5kKGZ1bmN0aW9uKGUpe3JldHVybiBPYmplY3QuaXMoZSx0KX0pfSk7ZGUucHV0UHJpdmF0ZShlLFwiZmlsZXNcIix0aGlzLmFjdGl2ZUZpbGVzKGUpLmNvbmNhdChpKSksZS52YWx1ZT1udWxsfWVsc2UgZGUucHV0UHJpdmF0ZShlLFwiZmlsZXNcIix0KX19LHtrZXk6XCJhY3RpdmVGaWxlSW5wdXRzXCIsdmFsdWU6ZnVuY3Rpb24oZSl7dmFyIHQ9dGhpcyxuPWRlLmZpbmRVcGxvYWRJbnB1dHMoZSk7cmV0dXJuIEFycmF5LmZyb20obikuZmlsdGVyKGZ1bmN0aW9uKGUpe3JldHVybiBlLmZpbGVzJiZ0LmFjdGl2ZUZpbGVzKGUpLmxlbmd0aD4wfSl9fSx7a2V5OlwiYWN0aXZlRmlsZXNcIix2YWx1ZTpmdW5jdGlvbihlKXtyZXR1cm4oZGUucHJpdmF0ZShlLFwiZmlsZXNcIil8fFtdKS5maWx0ZXIoZnVuY3Rpb24odCl7cmV0dXJuIHRlLmlzQWN0aXZlKGUsdCl9KX19LHtrZXk6XCJpbnB1dHNBd2FpdGluZ1ByZWZsaWdodFwiLHZhbHVlOmZ1bmN0aW9uKGUpe3ZhciB0PXRoaXMsbj1kZS5maW5kVXBsb2FkSW5wdXRzKGUpO3JldHVybiBBcnJheS5mcm9tKG4pLmZpbHRlcihmdW5jdGlvbihlKXtyZXR1cm4gdC5maWxlc0F3YWl0aW5nUHJlZmxpZ2h0KGUpLmxlbmd0aD4wfSl9fSx7a2V5OlwiZmlsZXNBd2FpdGluZ1ByZWZsaWdodFwiLHZhbHVlOmZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLmFjdGl2ZUZpbGVzKGUpLmZpbHRlcihmdW5jdGlvbih0KXtyZXR1cm4hdGUuaXNQcmVmbGlnaHRlZChlLHQpfSl9fV0pLE4oZSxbe2tleTpcImVudHJpZXNcIix2YWx1ZTpmdW5jdGlvbigpe3JldHVybiB0aGlzLl9lbnRyaWVzfX0se2tleTpcImluaXRBZGFwdGVyVXBsb2FkXCIsdmFsdWU6ZnVuY3Rpb24oZSx0LG4pe3ZhciBpPXRoaXM7dGhpcy5fZW50cmllcz10aGlzLl9lbnRyaWVzLm1hcChmdW5jdGlvbih0KXtyZXR1cm4gdC56aXBQb3N0RmxpZ2h0KGUpLHQub25Eb25lKGZ1bmN0aW9uKCl7aS5udW1FbnRyaWVzSW5Qcm9ncmVzcy0tLDA9PT1pLm51bUVudHJpZXNJblByb2dyZXNzJiZpLm9uQ29tcGxldGUoKX0pLHR9KTt2YXIgcj10aGlzLl9lbnRyaWVzLnJlZHVjZShmdW5jdGlvbihlLHQpe3ZhciBpPXQudXBsb2FkZXIobi51cGxvYWRlcnMpLHI9aS5uYW1lLG89aS5jYWxsYmFjaztyZXR1cm4gZVtyXT1lW3JdfHx7Y2FsbGJhY2s6byxlbnRyaWVzOltdfSxlW3JdLmVudHJpZXMucHVzaCh0KSxlfSx7fSk7Zm9yKHZhciBvIGluIHIpe3ZhciBhPXJbb107KDAsYS5jYWxsYmFjaykoYS5lbnRyaWVzLHQsZSxuKX19fV0pLGV9KCksb2U9ZnVuY3Rpb24oZSx0LG4saSl7ZS5mb3JFYWNoKGZ1bmN0aW9uKGUpe25ldyBhZShlLG4uY29uZmlnLmNodW5rX3NpemUsaSkudXBsb2FkKCl9KX0sYWU9ZnVuY3Rpb24oKXtmdW5jdGlvbiBlKHQsbixpKXtEKHRoaXMsZSksdGhpcy5saXZlU29ja2V0PWksdGhpcy5lbnRyeT10LHRoaXMub2Zmc2V0PTAsdGhpcy5jaHVua1NpemU9bix0aGlzLmNodW5rVGltZXI9bnVsbCx0aGlzLnVwbG9hZENoYW5uZWw9aS5jaGFubmVsKFwibHZ1OlwiLmNvbmNhdCh0LnJlZikse3Rva2VuOnQubWV0YWRhdGEoKX0pfXJldHVybiBOKGUsW3trZXk6XCJlcnJvclwiLHZhbHVlOmZ1bmN0aW9uKGUpe2NsZWFyVGltZW91dCh0aGlzLmNodW5rVGltZXIpLHRoaXMudXBsb2FkQ2hhbm5lbC5sZWF2ZSgpLHRoaXMuZW50cnkuZXJyb3IoZSl9fSx7a2V5OlwidXBsb2FkXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgZT10aGlzO3RoaXMudXBsb2FkQ2hhbm5lbC5vbkVycm9yKGZ1bmN0aW9uKHQpe3JldHVybiBlLmVycm9yKHQpfSksdGhpcy51cGxvYWRDaGFubmVsLmpvaW4oKS5yZWNlaXZlKFwib2tcIixmdW5jdGlvbih0KXtyZXR1cm4gZS5yZWFkTmV4dENodW5rKCl9KS5yZWNlaXZlKFwiZXJyb3JcIixmdW5jdGlvbih0KXtyZXR1cm4gZS5lcnJvcih0KX0pfX0se2tleTpcImlzRG9uZVwiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMub2Zmc2V0Pj10aGlzLmVudHJ5LmZpbGUuc2l6ZX19LHtrZXk6XCJyZWFkTmV4dENodW5rXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgZT10aGlzLHQ9bmV3IHdpbmRvdy5GaWxlUmVhZGVyLG49dGhpcy5lbnRyeS5maWxlLnNsaWNlKHRoaXMub2Zmc2V0LHRoaXMuY2h1bmtTaXplK3RoaXMub2Zmc2V0KTt0Lm9ubG9hZD1mdW5jdGlvbih0KXtpZihudWxsIT09dC50YXJnZXQuZXJyb3IpcmV0dXJuIEsoXCJSZWFkIGVycm9yOiBcIit0LnRhcmdldC5lcnJvcik7ZS5vZmZzZXQrPXQudGFyZ2V0LnJlc3VsdC5ieXRlTGVuZ3RoLGUucHVzaENodW5rKHQudGFyZ2V0LnJlc3VsdCl9LHQucmVhZEFzQXJyYXlCdWZmZXIobil9fSx7a2V5OlwicHVzaENodW5rXCIsdmFsdWU6ZnVuY3Rpb24oZSl7dmFyIHQ9dGhpczt0aGlzLnVwbG9hZENoYW5uZWwuaXNKb2luZWQoKSYmdGhpcy51cGxvYWRDaGFubmVsLnB1c2goXCJjaHVua1wiLGUpLnJlY2VpdmUoXCJva1wiLGZ1bmN0aW9uKCl7dC5lbnRyeS5wcm9ncmVzcyh0Lm9mZnNldC90LmVudHJ5LmZpbGUuc2l6ZSoxMDApLHQuaXNEb25lKCl8fCh0LmNodW5rVGltZXI9c2V0VGltZW91dChmdW5jdGlvbigpe3JldHVybiB0LnJlYWROZXh0Q2h1bmsoKX0sdC5saXZlU29ja2V0LmdldExhdGVuY3lTaW0oKXx8MCkpfSl9fV0pLGV9KCksdWU9ZnVuY3Rpb24oZSl7dmFyIHQ9YXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0/YXJndW1lbnRzWzFdOnt9LG49bmV3IEZvcm1EYXRhKGUpLGk9W107bi5mb3JFYWNoKGZ1bmN0aW9uKGUsdCxuKXtlIGluc3RhbmNlb2YgRmlsZSYmaS5wdXNoKHQpfSksaS5mb3JFYWNoKGZ1bmN0aW9uKGUpe3JldHVybiBuLmRlbGV0ZShlKX0pO3ZhciByLG89bmV3IFVSTFNlYXJjaFBhcmFtcyxhPWZ1bmN0aW9uKGUpe2lmKFwidW5kZWZpbmVkXCI9PXR5cGVvZiBTeW1ib2x8fG51bGw9PWVbU3ltYm9sLml0ZXJhdG9yXSl7aWYoQXJyYXkuaXNBcnJheShlKXx8KGU9SShlKSkpe3ZhciB0PTAsbj1mdW5jdGlvbigpe307cmV0dXJue3M6bixuOmZ1bmN0aW9uKCl7cmV0dXJuIHQ+PWUubGVuZ3RoP3tkb25lOiEwfTp7ZG9uZTohMSx2YWx1ZTplW3QrK119fSxlOmZ1bmN0aW9uKGUpe3Rocm93IGV9LGY6bn19dGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBpdGVyYXRlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpfXZhciBpLHIsbz0hMCxhPSExO3JldHVybntzOmZ1bmN0aW9uKCl7aT1lW1N5bWJvbC5pdGVyYXRvcl0oKX0sbjpmdW5jdGlvbigpe3ZhciBlPWkubmV4dCgpO3JldHVybiBvPWUuZG9uZSxlfSxlOmZ1bmN0aW9uKGUpe2E9ITAscj1lfSxmOmZ1bmN0aW9uKCl7dHJ5e298fG51bGw9PWkucmV0dXJufHxpLnJldHVybigpfWZpbmFsbHl7aWYoYSl0aHJvdyByfX19fShuLmVudHJpZXMoKSk7dHJ5e2ZvcihhLnMoKTshKHI9YS5uKCkpLmRvbmU7KXt2YXIgdT1DKHIudmFsdWUsMikscz11WzBdLGM9dVsxXTtvLmFwcGVuZChzLGMpfX1jYXRjaChlKXthLmUoZSl9ZmluYWxseXthLmYoKX1mb3IodmFyIGwgaW4gdClvLmFwcGVuZChsLHRbbF0pO3JldHVybiBvLnRvU3RyaW5nKCl9LHNlPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gZSh0LG4pe0QodGhpcyxlKSx0aGlzLnZpZXdJZD10LHRoaXMucmVuZGVyZWQ9e30sdGhpcy5tZXJnZURpZmYobil9cmV0dXJuIE4oZSxudWxsLFt7a2V5OlwiZXh0cmFjdFwiLHZhbHVlOmZ1bmN0aW9uKGUpe3ZhciB0PWUucixuPWUuZSxpPWUudDtyZXR1cm4gZGVsZXRlIGUucixkZWxldGUgZS5lLGRlbGV0ZSBlLnQse2RpZmY6ZSx0aXRsZTppLHJlcGx5OnR8fG51bGwsZXZlbnRzOm58fFtdfX19XSksTihlLFt7a2V5OlwicGFyZW50Vmlld0lkXCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy52aWV3SWR9fSx7a2V5OlwidG9TdHJpbmdcIix2YWx1ZTpmdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZWN1cnNpdmVUb1N0cmluZyh0aGlzLnJlbmRlcmVkLHRoaXMucmVuZGVyZWQuYyxlKX19LHtrZXk6XCJyZWN1cnNpdmVUb1N0cmluZ1wiLHZhbHVlOmZ1bmN0aW9uKGUpe3ZhciB0PWFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdP2FyZ3VtZW50c1sxXTplLmMsbj1hcmd1bWVudHMubGVuZ3RoPjI/YXJndW1lbnRzWzJdOnZvaWQgMCxpPXtidWZmZXI6XCJcIixjb21wb25lbnRzOnQsb25seUNpZHM6bj1uP25ldyBTZXQobik6bnVsbH07cmV0dXJuIHRoaXMudG9PdXRwdXRCdWZmZXIoZSxpKSxpLmJ1ZmZlcn19LHtrZXk6XCJjb21wb25lbnRDSURzXCIsdmFsdWU6ZnVuY3Rpb24oZSl7cmV0dXJuIE9iamVjdC5rZXlzKGUuY3x8e30pLm1hcChmdW5jdGlvbihlKXtyZXR1cm4gcGFyc2VJbnQoZSl9KX19LHtrZXk6XCJpc0NvbXBvbmVudE9ubHlEaWZmXCIsdmFsdWU6ZnVuY3Rpb24oZSl7cmV0dXJuISFlLmMmJjE9PT1PYmplY3Qua2V5cyhlKS5sZW5ndGh9fSx7a2V5OlwiZ2V0Q29tcG9uZW50XCIsdmFsdWU6ZnVuY3Rpb24oZSx0KXtyZXR1cm4gZS5jW3RdfX0se2tleTpcIm1lcmdlRGlmZlwiLHZhbHVlOmZ1bmN0aW9uKGUpe3ZhciB0PWUuYyxuPXt9O2lmKGRlbGV0ZSBlLmMsdGhpcy5yZW5kZXJlZD10aGlzLm11dGFibGVNZXJnZSh0aGlzLnJlbmRlcmVkLGUpLHRoaXMucmVuZGVyZWQuYz10aGlzLnJlbmRlcmVkLmN8fHt9LHQpe3ZhciBpPXRoaXMucmVuZGVyZWQuYztmb3IodmFyIHIgaW4gdCl0W3JdPXRoaXMuY2FjaGVkRmluZENvbXBvbmVudChyLHRbcl0saSx0LG4pO2Zvcih2YXIgbyBpbiB0KWlbb109dFtvXTtlLmM9dH19fSx7a2V5OlwiY2FjaGVkRmluZENvbXBvbmVudFwiLHZhbHVlOmZ1bmN0aW9uKGUsdCxuLGkscil7aWYocltlXSlyZXR1cm4gcltlXTt2YXIgbyxhLHUscz10LnM7cmV0dXJuXCJudW1iZXJcIj09dHlwZW9mIHM/KGE9KHU9cz4wP3RoaXMuY2FjaGVkRmluZENvbXBvbmVudChzLGlbc10sbixpLHIpOm5bLXNdKS5zLChvPXRoaXMuY2xvbmVNZXJnZSh1LHQpKS5zPWEpOm89dm9pZCAwIT09dC5zP3Q6dGhpcy5jbG9uZU1lcmdlKG5bZV18fHt9LHQpLHJbZV09byxvfX0se2tleTpcIm11dGFibGVNZXJnZVwiLHZhbHVlOmZ1bmN0aW9uKGUsdCl7cmV0dXJuIHZvaWQgMCE9PXQucz90Oih0aGlzLmRvTXV0YWJsZU1lcmdlKGUsdCksZSl9fSx7a2V5OlwiZG9NdXRhYmxlTWVyZ2VcIix2YWx1ZTpmdW5jdGlvbihlLHQpe2Zvcih2YXIgbiBpbiB0KXt2YXIgaT10W25dLHI9ZVtuXTtRKGkpJiZ2b2lkIDA9PT1pLnMmJlEocik/dGhpcy5kb011dGFibGVNZXJnZShyLGkpOmVbbl09aX19fSx7a2V5OlwiY2xvbmVNZXJnZVwiLHZhbHVlOmZ1bmN0aW9uKGUsdCl7dmFyIG49QShBKHt9LGUpLHQpO2Zvcih2YXIgaSBpbiBuKXt2YXIgcj10W2ldLG89ZVtpXTtRKHIpJiZ2b2lkIDA9PT1yLnMmJlEobykmJihuW2ldPXRoaXMuY2xvbmVNZXJnZShvLHIpKX1yZXR1cm4gbn19LHtrZXk6XCJjb21wb25lbnRUb1N0cmluZ1wiLHZhbHVlOmZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlY3Vyc2l2ZUNJRFRvU3RyaW5nKHRoaXMucmVuZGVyZWQuYyxlKX19LHtrZXk6XCJwcnVuZUNJRHNcIix2YWx1ZTpmdW5jdGlvbihlKXt2YXIgdD10aGlzO2UuZm9yRWFjaChmdW5jdGlvbihlKXtyZXR1cm4gZGVsZXRlIHQucmVuZGVyZWQuY1tlXX0pfX0se2tleTpcImdldFwiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMucmVuZGVyZWR9fSx7a2V5OlwiaXNOZXdGaW5nZXJwcmludFwiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuISEoYXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0/YXJndW1lbnRzWzBdOnt9KS5zfX0se2tleTpcInRvT3V0cHV0QnVmZmVyXCIsdmFsdWU6ZnVuY3Rpb24oZSx0KXtpZihlLmQpcmV0dXJuIHRoaXMuY29tcHJlaGVuc2lvblRvQnVmZmVyKGUsdCk7dmFyIG49ZS5zO3QuYnVmZmVyKz1uWzBdO2Zvcih2YXIgaT0xO2k8bi5sZW5ndGg7aSsrKXRoaXMuZHluYW1pY1RvQnVmZmVyKGVbaS0xXSx0KSx0LmJ1ZmZlcis9bltpXX19LHtrZXk6XCJjb21wcmVoZW5zaW9uVG9CdWZmZXJcIix2YWx1ZTpmdW5jdGlvbihlLHQpe2Zvcih2YXIgbj1lLmQsaT1lLnMscj0wO3I8bi5sZW5ndGg7cisrKXt2YXIgbz1uW3JdO3QuYnVmZmVyKz1pWzBdO2Zvcih2YXIgYT0xO2E8aS5sZW5ndGg7YSsrKXRoaXMuZHluYW1pY1RvQnVmZmVyKG9bYS0xXSx0KSx0LmJ1ZmZlcis9aVthXX19fSx7a2V5OlwiZHluYW1pY1RvQnVmZmVyXCIsdmFsdWU6ZnVuY3Rpb24oZSx0KXtcIm51bWJlclwiPT10eXBlb2YgZT90LmJ1ZmZlcis9dGhpcy5yZWN1cnNpdmVDSURUb1N0cmluZyh0LmNvbXBvbmVudHMsZSx0Lm9ubHlDaWRzKTpRKGUpP3RoaXMudG9PdXRwdXRCdWZmZXIoZSx0KTp0LmJ1ZmZlcis9ZX19LHtrZXk6XCJyZWN1cnNpdmVDSURUb1N0cmluZ1wiLHZhbHVlOmZ1bmN0aW9uKGUsdCxuKXt2YXIgaT10aGlzLHI9ZVt0XXx8SyhcIm5vIGNvbXBvbmVudCBmb3IgQ0lEIFwiLmNvbmNhdCh0KSxlKSxvPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZW1wbGF0ZVwiKTtvLmlubmVySFRNTD10aGlzLnJlY3Vyc2l2ZVRvU3RyaW5nKHIsZSxuKTt2YXIgYT1vLmNvbnRlbnQsdT1uJiYhbi5oYXModCkscz1DKEFycmF5LmZyb20oYS5jaGlsZE5vZGVzKS5yZWR1Y2UoZnVuY3Rpb24oZSxuLHIpe3ZhciBhPUMoZSwyKSxzPWFbMF0sYz1hWzFdO3JldHVybiBuLm5vZGVUeXBlPT09Tm9kZS5FTEVNRU5UX05PREU/bi5nZXRBdHRyaWJ1dGUoTSk/W3MsITBdOihuLnNldEF0dHJpYnV0ZShNLHQpLG4uaWR8fChuLmlkPVwiXCIuY29uY2F0KGkucGFyZW50Vmlld0lkKCksXCItXCIpLmNvbmNhdCh0LFwiLVwiKS5jb25jYXQocikpLHUmJihuLnNldEF0dHJpYnV0ZShcImRhdGEtcGh4LXNraXBcIixcIlwiKSxuLmlubmVySFRNTD1cIlwiKSxbITAsY10pOlwiXCIhPT1uLm5vZGVWYWx1ZS50cmltKCk/KEsoXCJvbmx5IEhUTUwgZWxlbWVudCB0YWdzIGFyZSBhbGxvd2VkIGF0IHRoZSByb290IG9mIGNvbXBvbmVudHMuXFxuXFxuXCIrJ2dvdDogXCInLmNvbmNhdChuLm5vZGVWYWx1ZS50cmltKCksJ1wiXFxuXFxuJykrXCJ3aXRoaW46XFxuXCIsby5pbm5lckhUTUwudHJpbSgpKSxuLnJlcGxhY2VXaXRoKGkuY3JlYXRlU3BhbihuLm5vZGVWYWx1ZSx0KSksWyEwLGNdKToobi5yZW1vdmUoKSxbcyxjXSl9LFshMSwhMV0pLDIpLGM9c1swXSxsPXNbMV07cmV0dXJuIGN8fGw/IWMmJmw/KEsoXCJleHBlY3RlZCBhdCBsZWFzdCBvbmUgSFRNTCBlbGVtZW50IHRhZyBkaXJlY3RseSBpbnNpZGUgYSBjb21wb25lbnQsIGJ1dCBvbmx5IHN1YmNvbXBvbmVudHMgd2VyZSBmb3VuZC4gQSBjb21wb25lbnQgbXVzdCByZW5kZXIgYXQgbGVhc3Qgb25lIEhUTUwgdGFnIGRpcmVjdGx5IGluc2lkZSBpdHNlbGYuXCIsby5pbm5lckhUTUwudHJpbSgpKSxvLmlubmVySFRNTCk6by5pbm5lckhUTUw6KEsoXCJleHBlY3RlZCBhdCBsZWFzdCBvbmUgSFRNTCBlbGVtZW50IHRhZyBpbnNpZGUgYSBjb21wb25lbnQsIGJ1dCB0aGUgY29tcG9uZW50IGlzIGVtcHR5OlxcblwiLG8uaW5uZXJIVE1MLnRyaW0oKSksdGhpcy5jcmVhdGVTcGFuKFwiXCIsdCkub3V0ZXJIVE1MKX19LHtrZXk6XCJjcmVhdGVTcGFuXCIsdmFsdWU6ZnVuY3Rpb24oZSx0KXt2YXIgbj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtyZXR1cm4gbi5pbm5lclRleHQ9ZSxuLnNldEF0dHJpYnV0ZShNLHQpLG59fV0pLGV9KCksY2U9ZnVuY3Rpb24oKXtmdW5jdGlvbiBlKHQsbil7dmFyIGk9dGhpcyxyPWFyZ3VtZW50cy5sZW5ndGg+MiYmdm9pZCAwIT09YXJndW1lbnRzWzJdP2FyZ3VtZW50c1syXTp7fTtpZihEKHRoaXMsZSksdGhpcy51bmxvYWRlZD0hMSwhbnx8XCJPYmplY3RcIj09PW4uY29uc3RydWN0b3IubmFtZSl0aHJvdyBuZXcgRXJyb3IoJ1xcbiAgICAgIGEgcGhvZW5peCBTb2NrZXQgbXVzdCBiZSBwcm92aWRlZCBhcyB0aGUgc2Vjb25kIGFyZ3VtZW50IHRvIHRoZSBMaXZlU29ja2V0IGNvbnN0cnVjdG9yLiBGb3IgZXhhbXBsZTpcXG5cXG4gICAgICAgICAgaW1wb3J0IHtTb2NrZXR9IGZyb20gXCJwaG9lbml4XCJcXG4gICAgICAgICAgaW1wb3J0IHtMaXZlU29ja2V0fSBmcm9tIFwicGhvZW5peF9saXZlX3ZpZXdcIlxcbiAgICAgICAgICBsZXQgbGl2ZVNvY2tldCA9IG5ldyBMaXZlU29ja2V0KFwiL2xpdmVcIiwgU29ja2V0LCB7Li4ufSlcXG4gICAgICAnKTt0aGlzLnNvY2tldD1uZXcgbih0LHIpLHRoaXMuYmluZGluZ1ByZWZpeD1yLmJpbmRpbmdQcmVmaXh8fHEsdGhpcy5vcHRzPXIsdGhpcy5wYXJhbXM9JChyLnBhcmFtc3x8e30pLHRoaXMudmlld0xvZ2dlcj1yLnZpZXdMb2dnZXIsdGhpcy5tZXRhZGF0YUNhbGxiYWNrcz1yLm1ldGFkYXRhfHx7fSx0aGlzLmRlZmF1bHRzPU9iamVjdC5hc3NpZ24oRyh6KSxyLmRlZmF1bHRzfHx7fSksdGhpcy5hY3RpdmVFbGVtZW50PW51bGwsdGhpcy5wcmV2QWN0aXZlPW51bGwsdGhpcy5zaWxlbmNlZD0hMSx0aGlzLm1haW49bnVsbCx0aGlzLmxpbmtSZWY9MSx0aGlzLnJvb3RzPXt9LHRoaXMuaHJlZj13aW5kb3cubG9jYXRpb24uaHJlZix0aGlzLnBlbmRpbmdMaW5rPW51bGwsdGhpcy5jdXJyZW50TG9jYXRpb249Ryh3aW5kb3cubG9jYXRpb24pLHRoaXMuaG9va3M9ci5ob29rc3x8e30sdGhpcy51cGxvYWRlcnM9ci51cGxvYWRlcnN8fHt9LHRoaXMubG9hZGVyVGltZW91dD1yLmxvYWRlclRpbWVvdXR8fFcsdGhpcy5sb2NhbFN0b3JhZ2U9ci5sb2NhbFN0b3JhZ2V8fHdpbmRvdy5sb2NhbFN0b3JhZ2UsdGhpcy5zZXNzaW9uU3RvcmFnZT1yLnNlc3Npb25TdG9yYWdlfHx3aW5kb3cuc2Vzc2lvblN0b3JhZ2UsdGhpcy5ib3VuZFRvcExldmVsRXZlbnRzPSExLHRoaXMuZG9tQ2FsbGJhY2tzPU9iamVjdC5hc3NpZ24oe29uTm9kZUFkZGVkOiQoKSxvbkJlZm9yZUVsVXBkYXRlZDokKCl9LHIuZG9tfHx7fSksd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwYWdlaGlkZVwiLGZ1bmN0aW9uKGUpe2kudW5sb2FkZWQ9ITB9KSx0aGlzLnNvY2tldC5vbk9wZW4oZnVuY3Rpb24oKXtpLmlzVW5sb2FkZWQoKSYmd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpfSl9cmV0dXJuIE4oZSxbe2tleTpcImlzUHJvZmlsZUVuYWJsZWRcIix2YWx1ZTpmdW5jdGlvbigpe3JldHVyblwidHJ1ZVwiPT09dGhpcy5zZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwicGh4OmxpdmUtc29ja2V0OnByb2ZpbGluZ1wiKX19LHtrZXk6XCJpc0RlYnVnRW5hYmxlZFwiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuXCJ0cnVlXCI9PT10aGlzLnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJwaHg6bGl2ZS1zb2NrZXQ6ZGVidWdcIil9fSx7a2V5OlwiZW5hYmxlRGVidWdcIix2YWx1ZTpmdW5jdGlvbigpe3RoaXMuc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcInBoeDpsaXZlLXNvY2tldDpkZWJ1Z1wiLFwidHJ1ZVwiKX19LHtrZXk6XCJlbmFibGVQcm9maWxpbmdcIix2YWx1ZTpmdW5jdGlvbigpe3RoaXMuc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcInBoeDpsaXZlLXNvY2tldDpwcm9maWxpbmdcIixcInRydWVcIil9fSx7a2V5OlwiZGlzYWJsZURlYnVnXCIsdmFsdWU6ZnVuY3Rpb24oKXt0aGlzLnNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oXCJwaHg6bGl2ZS1zb2NrZXQ6ZGVidWdcIil9fSx7a2V5OlwiZGlzYWJsZVByb2ZpbGluZ1wiLHZhbHVlOmZ1bmN0aW9uKCl7dGhpcy5zZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKFwicGh4OmxpdmUtc29ja2V0OnByb2ZpbGluZ1wiKX19LHtrZXk6XCJlbmFibGVMYXRlbmN5U2ltXCIsdmFsdWU6ZnVuY3Rpb24oZSl7dGhpcy5lbmFibGVEZWJ1ZygpLGNvbnNvbGUubG9nKFwibGF0ZW5jeSBzaW11bGF0b3IgZW5hYmxlZCBmb3IgdGhlIGR1cmF0aW9uIG9mIHRoaXMgYnJvd3NlciBzZXNzaW9uLiBDYWxsIGRpc2FibGVMYXRlbmN5U2ltKCkgdG8gZGlzYWJsZVwiKSx0aGlzLnNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJwaHg6bGl2ZS1zb2NrZXQ6bGF0ZW5jeS1zaW1cIixlKX19LHtrZXk6XCJkaXNhYmxlTGF0ZW5jeVNpbVwiLHZhbHVlOmZ1bmN0aW9uKCl7dGhpcy5zZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKFwicGh4OmxpdmUtc29ja2V0OmxhdGVuY3ktc2ltXCIpfX0se2tleTpcImdldExhdGVuY3lTaW1cIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPXRoaXMuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcInBoeDpsaXZlLXNvY2tldDpsYXRlbmN5LXNpbVwiKTtyZXR1cm4gZT9wYXJzZUludChlKTpudWxsfX0se2tleTpcImdldFNvY2tldFwiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuc29ja2V0fX0se2tleTpcImNvbm5lY3RcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPXRoaXMsdD1mdW5jdGlvbigpe2Uuam9pblJvb3RWaWV3cygpJiYoZS5iaW5kVG9wTGV2ZWxFdmVudHMoKSxlLnNvY2tldC5jb25uZWN0KCkpfTtbXCJjb21wbGV0ZVwiLFwibG9hZGVkXCIsXCJpbnRlcmFjdGl2ZVwiXS5pbmRleE9mKGRvY3VtZW50LnJlYWR5U3RhdGUpPj0wP3QoKTpkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLGZ1bmN0aW9uKCl7cmV0dXJuIHQoKX0pfX0se2tleTpcImRpc2Nvbm5lY3RcIix2YWx1ZTpmdW5jdGlvbihlKXt0aGlzLnNvY2tldC5kaXNjb25uZWN0KGUpfX0se2tleTpcInRyaWdnZXJET01cIix2YWx1ZTpmdW5jdGlvbihlLHQpe3ZhciBuOyhuPXRoaXMuZG9tQ2FsbGJhY2tzKVtlXS5hcHBseShuLHcodCkpfX0se2tleTpcInRpbWVcIix2YWx1ZTpmdW5jdGlvbihlLHQpe2lmKCF0aGlzLmlzUHJvZmlsZUVuYWJsZWQoKXx8IWNvbnNvbGUudGltZSlyZXR1cm4gdCgpO2NvbnNvbGUudGltZShlKTt2YXIgbj10KCk7cmV0dXJuIGNvbnNvbGUudGltZUVuZChlKSxufX0se2tleTpcImxvZ1wiLHZhbHVlOmZ1bmN0aW9uKGUsdCxuKXtpZih0aGlzLnZpZXdMb2dnZXIpe3ZhciBpPUMobigpLDIpLHI9aVswXSxvPWlbMV07dGhpcy52aWV3TG9nZ2VyKGUsdCxyLG8pfWVsc2UgaWYodGhpcy5pc0RlYnVnRW5hYmxlZCgpKXt2YXIgYT1DKG4oKSwyKSx1PWFbMF0scz1hWzFdO1goZSx0LHUscyl9fX0se2tleTpcIm9uQ2hhbm5lbFwiLHZhbHVlOmZ1bmN0aW9uKGUsdCxuKXt2YXIgaT10aGlzO2Uub24odCxmdW5jdGlvbihlKXt2YXIgdD1pLmdldExhdGVuY3lTaW0oKTt0Pyhjb25zb2xlLmxvZyhcInNpbXVsYXRpbmcgXCIuY29uY2F0KHQsXCJtcyBvZiBsYXRlbmN5IGZyb20gc2VydmVyIHRvIGNsaWVudFwiKSksc2V0VGltZW91dChmdW5jdGlvbigpe3JldHVybiBuKGUpfSx0KSk6bihlKX0pfX0se2tleTpcIndyYXBQdXNoXCIsdmFsdWU6ZnVuY3Rpb24oZSx0LG4pe3ZhciBpPXRoaXMscj10aGlzLmdldExhdGVuY3lTaW0oKSxvPWUuam9pbkNvdW50O2lmKCFyKXJldHVybiB0LnRpbWVvdXQ/bigpLnJlY2VpdmUoXCJ0aW1lb3V0XCIsZnVuY3Rpb24oKXtlLmpvaW5Db3VudD09PW8mJmkucmVsb2FkV2l0aEppdHRlcihlLGZ1bmN0aW9uKCl7aS5sb2coZSxcInRpbWVvdXRcIixmdW5jdGlvbigpe3JldHVybltcInJlY2VpdmVkIHRpbWVvdXQgd2hpbGUgY29tbXVuaWNhdGluZyB3aXRoIHNlcnZlci4gRmFsbGluZyBiYWNrIHRvIGhhcmQgcmVmcmVzaCBmb3IgcmVjb3ZlcnlcIl19KX0pfSk6bigpO2NvbnNvbGUubG9nKFwic2ltdWxhdGluZyBcIi5jb25jYXQocixcIm1zIG9mIGxhdGVuY3kgZnJvbSBjbGllbnQgdG8gc2VydmVyXCIpKTt2YXIgYT17cmVjZWl2ZXM6W10scmVjZWl2ZTpmdW5jdGlvbihlLHQpe3RoaXMucmVjZWl2ZXMucHVzaChbZSx0XSl9fTtyZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbigpe2EucmVjZWl2ZXMucmVkdWNlKGZ1bmN0aW9uKGUsdCl7dmFyIG49Qyh0LDIpLGk9blswXSxyPW5bMV07cmV0dXJuIGUucmVjZWl2ZShpLHIpfSxuKCkpfSxyKSxhfX0se2tleTpcInJlbG9hZFdpdGhKaXR0ZXJcIix2YWx1ZTpmdW5jdGlvbihlLHQpe3ZhciBuPXRoaXM7ZS5kZXN0cm95KCksdGhpcy5kaXNjb25uZWN0KCk7dmFyIGk9T1swXSxyPU9bMV0sbz1NYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqKHItaSsxKSkraSxhPWxlLnVwZGF0ZUxvY2FsKHRoaXMubG9jYWxTdG9yYWdlLGUubmFtZSgpLFwiY29uc2VjdXRpdmUtcmVsb2Fkc1wiLDAsZnVuY3Rpb24oZSl7cmV0dXJuIGUrMX0pO3Q/dCgpOnRoaXMubG9nKGUsXCJqb2luXCIsZnVuY3Rpb24oKXtyZXR1cm5bXCJlbmNvdW50ZXJlZCBcIi5jb25jYXQoYSxcIiBjb25zZWN1dGl2ZSByZWxvYWRzXCIpXX0pLGE+MTAmJih0aGlzLmxvZyhlLFwiam9pblwiLGZ1bmN0aW9uKCl7cmV0dXJuW1wiZXhjZWVkZWQgXCIuY29uY2F0KDEwLFwiIGNvbnNlY3V0aXZlIHJlbG9hZHMuIEVudGVyaW5nIGZhaWxzYWZlIG1vZGVcIildfSksbz0zZTQpLHNldFRpbWVvdXQoZnVuY3Rpb24oKXtuLmhhc1BlbmRpbmdMaW5rKCk/d2luZG93LmxvY2F0aW9uPW4ucGVuZGluZ0xpbms6d2luZG93LmxvY2F0aW9uLnJlbG9hZCgpfSxvKX19LHtrZXk6XCJnZXRIb29rQ2FsbGJhY2tzXCIsdmFsdWU6ZnVuY3Rpb24oZSl7cmV0dXJuIGUmJmUuc3RhcnRzV2l0aChcIlBob2VuaXguXCIpP25lW2Uuc3BsaXQoXCIuXCIpWzFdXTp0aGlzLmhvb2tzW2VdfX0se2tleTpcImlzVW5sb2FkZWRcIix2YWx1ZTpmdW5jdGlvbigpe3JldHVybiB0aGlzLnVubG9hZGVkfX0se2tleTpcImlzQ29ubmVjdGVkXCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5zb2NrZXQuaXNDb25uZWN0ZWQoKX19LHtrZXk6XCJnZXRCaW5kaW5nUHJlZml4XCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5iaW5kaW5nUHJlZml4fX0se2tleTpcImJpbmRpbmdcIix2YWx1ZTpmdW5jdGlvbihlKXtyZXR1cm5cIlwiLmNvbmNhdCh0aGlzLmdldEJpbmRpbmdQcmVmaXgoKSkuY29uY2F0KGUpfX0se2tleTpcImNoYW5uZWxcIix2YWx1ZTpmdW5jdGlvbihlLHQpe3JldHVybiB0aGlzLnNvY2tldC5jaGFubmVsKGUsdCl9fSx7a2V5Olwiam9pblJvb3RWaWV3c1wiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcyx0PSExO3JldHVybiBkZS5hbGwoZG9jdW1lbnQsXCJcIi5jb25jYXQoQixcIjpub3QoW1wiKS5jb25jYXQoXCJkYXRhLXBoeC1wYXJlbnQtaWRcIixcIl0pXCIpLGZ1bmN0aW9uKG4pe2lmKCFlLmdldFJvb3RCeUlkKG4uaWQpKXt2YXIgaT1lLmpvaW5Sb290VmlldyhuLGUuZ2V0SHJlZigpKTtlLnJvb3Q9ZS5yb290fHxpLG4uZ2V0QXR0cmlidXRlKFwiZGF0YS1waHgtbWFpblwiKSYmKGUubWFpbj1pKX10PSEwfSksdH19LHtrZXk6XCJyZWRpcmVjdFwiLHZhbHVlOmZ1bmN0aW9uKGUsdCl7dGhpcy5kaXNjb25uZWN0KCksbGUucmVkaXJlY3QoZSx0KX19LHtrZXk6XCJyZXBsYWNlTWFpblwiLHZhbHVlOmZ1bmN0aW9uKGUsdCl7dmFyIG49dGhpcyxpPWFyZ3VtZW50cy5sZW5ndGg+MiYmdm9pZCAwIT09YXJndW1lbnRzWzJdP2FyZ3VtZW50c1syXTpudWxsLHI9YXJndW1lbnRzLmxlbmd0aD4zJiZ2b2lkIDAhPT1hcmd1bWVudHNbM10/YXJndW1lbnRzWzNdOnRoaXMuc2V0UGVuZGluZ0xpbmsoZSksbz10aGlzLm1haW4uZWw7dGhpcy5tYWluLnNob3dMb2FkZXIodGhpcy5sb2FkZXJUaW1lb3V0KSx0aGlzLm1haW4uZGVzdHJveSgpLGxlLmZldGNoUGFnZShlLGZ1bmN0aW9uKGEsdSl7aWYoMjAwIT09YSlyZXR1cm4gbi5yZWRpcmVjdChlKTt2YXIgcz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIik7cy5pbm5lckhUTUw9dTt2YXIgYz1zLmNvbnRlbnQuY2hpbGROb2Rlc1swXTtpZighY3x8IW4uaXNQaHhWaWV3KGMpKXJldHVybiBuLnJlZGlyZWN0KGUpO24uam9pblJvb3RWaWV3KGMsZSx0LGZ1bmN0aW9uKGUsdCl7MT09PXQmJihuLmNvbW1pdFBlbmRpbmdMaW5rKHIpPyhvLnJlcGxhY2VXaXRoKGUuZWwpLG4ubWFpbj1lLGkmJmkoKSk6ZS5kZXN0cm95KCkpfSl9KX19LHtrZXk6XCJpc1BoeFZpZXdcIix2YWx1ZTpmdW5jdGlvbihlKXtyZXR1cm4gZS5nZXRBdHRyaWJ1dGUmJm51bGwhPT1lLmdldEF0dHJpYnV0ZShqKX19LHtrZXk6XCJqb2luUm9vdFZpZXdcIix2YWx1ZTpmdW5jdGlvbihlLHQsbixpKXt2YXIgcj1uZXcgdmUoZSx0aGlzLG51bGwsdCxuKTtyZXR1cm4gdGhpcy5yb290c1tyLmlkXT1yLHIuam9pbihpKSxyfX0se2tleTpcIm93bmVyXCIsdmFsdWU6ZnVuY3Rpb24oZSx0KXt2YXIgbj10aGlzLGk9ZWUoZS5jbG9zZXN0KEIpLGZ1bmN0aW9uKGUpe3JldHVybiBuLmdldFZpZXdCeUVsKGUpfSk7aSYmdChpKX19LHtrZXk6XCJ3aXRoaW5Pd25lcnNcIix2YWx1ZTpmdW5jdGlvbihlLHQpe3ZhciBuPXRoaXM7dGhpcy5vd25lcihlLGZ1bmN0aW9uKGkpe3ZhciByPWUuZ2V0QXR0cmlidXRlKG4uYmluZGluZyhcInRhcmdldFwiKSk7bnVsbD09PXI/dChpLGUpOmkud2l0aGluVGFyZ2V0cyhyLHQpfSl9fSx7a2V5OlwiZ2V0Vmlld0J5RWxcIix2YWx1ZTpmdW5jdGlvbihlKXt2YXIgdD1lLmdldEF0dHJpYnV0ZShcImRhdGEtcGh4LXJvb3QtaWRcIik7cmV0dXJuIGVlKHRoaXMuZ2V0Um9vdEJ5SWQodCksZnVuY3Rpb24odCl7cmV0dXJuIHQuZ2V0RGVzY2VuZGVudEJ5RWwoZSl9KX19LHtrZXk6XCJnZXRSb290QnlJZFwiLHZhbHVlOmZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJvb3RzW2VdfX0se2tleTpcImRlc3Ryb3lBbGxWaWV3c1wiLHZhbHVlOmZ1bmN0aW9uKCl7Zm9yKHZhciBlIGluIHRoaXMucm9vdHMpdGhpcy5yb290c1tlXS5kZXN0cm95KCksZGVsZXRlIHRoaXMucm9vdHNbZV19fSx7a2V5OlwiZGVzdHJveVZpZXdCeUVsXCIsdmFsdWU6ZnVuY3Rpb24oZSl7dmFyIHQ9dGhpcy5nZXRSb290QnlJZChlLmdldEF0dHJpYnV0ZShcImRhdGEtcGh4LXJvb3QtaWRcIikpO3QmJnQuZGVzdHJveURlc2NlbmRlbnQoZS5pZCl9fSx7a2V5Olwic2V0QWN0aXZlRWxlbWVudFwiLHZhbHVlOmZ1bmN0aW9uKGUpe3ZhciB0PXRoaXM7aWYodGhpcy5hY3RpdmVFbGVtZW50IT09ZSl7dGhpcy5hY3RpdmVFbGVtZW50PWU7dmFyIG49ZnVuY3Rpb24oKXtlPT09dC5hY3RpdmVFbGVtZW50JiYodC5hY3RpdmVFbGVtZW50PW51bGwpLGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIix0KSxlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLHQpfTtlLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsbiksZS5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIixuKX19fSx7a2V5OlwiZ2V0QWN0aXZlRWxlbWVudFwiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ9PT1kb2N1bWVudC5ib2R5P3RoaXMuYWN0aXZlRWxlbWVudHx8ZG9jdW1lbnQuYWN0aXZlRWxlbWVudDpkb2N1bWVudC5hY3RpdmVFbGVtZW50fHxkb2N1bWVudC5ib2R5fX0se2tleTpcImRyb3BBY3RpdmVFbGVtZW50XCIsdmFsdWU6ZnVuY3Rpb24oZSl7dGhpcy5wcmV2QWN0aXZlJiZlLm93bnNFbGVtZW50KHRoaXMucHJldkFjdGl2ZSkmJih0aGlzLnByZXZBY3RpdmU9bnVsbCl9fSx7a2V5OlwicmVzdG9yZVByZXZpb3VzbHlBY3RpdmVGb2N1c1wiLHZhbHVlOmZ1bmN0aW9uKCl7dGhpcy5wcmV2QWN0aXZlJiZ0aGlzLnByZXZBY3RpdmUhPT1kb2N1bWVudC5ib2R5JiZ0aGlzLnByZXZBY3RpdmUuZm9jdXMoKX19LHtrZXk6XCJibHVyQWN0aXZlRWxlbWVudFwiLHZhbHVlOmZ1bmN0aW9uKCl7dGhpcy5wcmV2QWN0aXZlPXRoaXMuZ2V0QWN0aXZlRWxlbWVudCgpLHRoaXMucHJldkFjdGl2ZSE9PWRvY3VtZW50LmJvZHkmJnRoaXMucHJldkFjdGl2ZS5ibHVyKCl9fSx7a2V5OlwiYmluZFRvcExldmVsRXZlbnRzXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgZT10aGlzO3RoaXMuYm91bmRUb3BMZXZlbEV2ZW50c3x8KHRoaXMuYm91bmRUb3BMZXZlbEV2ZW50cz0hMCxkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLGZ1bmN0aW9uKCl7fSksd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwYWdlc2hvd1wiLGZ1bmN0aW9uKHQpe3QucGVyc2lzdGVkJiYoZS5nZXRTb2NrZXQoKS5kaXNjb25uZWN0KCksZS53aXRoUGFnZUxvYWRpbmcoe3RvOndpbmRvdy5sb2NhdGlvbi5ocmVmLGtpbmQ6XCJyZWRpcmVjdFwifSksd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpKX0sITApLHRoaXMuYmluZENsaWNrcygpLHRoaXMuYmluZE5hdigpLHRoaXMuYmluZEZvcm1zKCksdGhpcy5iaW5kKHtrZXl1cDpcImtleXVwXCIsa2V5ZG93bjpcImtleWRvd25cIn0sZnVuY3Rpb24odCxuLGkscixvLGEsdSl7dmFyIHM9ci5nZXRBdHRyaWJ1dGUoZS5iaW5kaW5nKFwia2V5XCIpKSxjPXQua2V5JiZ0LmtleS50b0xvd2VyQ2FzZSgpO3MmJnMudG9Mb3dlckNhc2UoKSE9PWN8fGkucHVzaEtleShyLG8sbixhLEEoe2tleTp0LmtleX0sZS5ldmVudE1ldGEobix0LHIpKSl9KSx0aGlzLmJpbmQoe2JsdXI6XCJmb2N1c291dFwiLGZvY3VzOlwiZm9jdXNpblwifSxmdW5jdGlvbih0LG4saSxyLG8sYSx1KXt1fHxpLnB1c2hFdmVudChuLHIsbyxhLGUuZXZlbnRNZXRhKG4sdCxyKSl9KSx0aGlzLmJpbmQoe2JsdXI6XCJibHVyXCIsZm9jdXM6XCJmb2N1c1wifSxmdW5jdGlvbih0LG4saSxyLG8sYSx1KXt1JiZcIndpbmRvd1wiIT09IXUmJmkucHVzaEV2ZW50KG4scixvLGEsZS5ldmVudE1ldGEobix0LHIpKX0pLHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ292ZXJcIixmdW5jdGlvbihlKXtyZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpfSksd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJkcm9wXCIsZnVuY3Rpb24odCl7dC5wcmV2ZW50RGVmYXVsdCgpO3ZhciBuPWVlKFkodC50YXJnZXQsZS5iaW5kaW5nKFwiZHJvcC10YXJnZXRcIikpLGZ1bmN0aW9uKHQpe3JldHVybiB0LmdldEF0dHJpYnV0ZShlLmJpbmRpbmcoXCJkcm9wLXRhcmdldFwiKSl9KSxpPW4mJmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG4pLHI9QXJyYXkuZnJvbSh0LmRhdGFUcmFuc2Zlci5maWxlc3x8W10pO2kmJiFpLmRpc2FibGVkJiYwIT09ci5sZW5ndGgmJmkuZmlsZXMgaW5zdGFuY2VvZiBGaWxlTGlzdCYmKHJlLnRyYWNrRmlsZXMoaSxyKSxpLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwiaW5wdXRcIix7YnViYmxlczohMH0pKSl9KSl9fSx7a2V5OlwiZXZlbnRNZXRhXCIsdmFsdWU6ZnVuY3Rpb24oZSx0LG4pe3ZhciBpPXRoaXMubWV0YWRhdGFDYWxsYmFja3NbZV07cmV0dXJuIGk/aSh0LG4pOnt9fX0se2tleTpcInNldFBlbmRpbmdMaW5rXCIsdmFsdWU6ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMubGlua1JlZisrLHRoaXMucGVuZGluZ0xpbms9ZSx0aGlzLmxpbmtSZWZ9fSx7a2V5OlwiY29tbWl0UGVuZGluZ0xpbmtcIix2YWx1ZTpmdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5saW5rUmVmPT09ZSYmKHRoaXMuaHJlZj10aGlzLnBlbmRpbmdMaW5rLHRoaXMucGVuZGluZ0xpbms9bnVsbCwhMCl9fSx7a2V5OlwiZ2V0SHJlZlwiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuaHJlZn19LHtrZXk6XCJoYXNQZW5kaW5nTGlua1wiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuISF0aGlzLnBlbmRpbmdMaW5rfX0se2tleTpcImJpbmRcIix2YWx1ZTpmdW5jdGlvbihlLHQpe3ZhciBuPXRoaXMsaT1mdW5jdGlvbihpKXt2YXIgcj1lW2ldO24ub24ocixmdW5jdGlvbihlKXt2YXIgcj1uLmJpbmRpbmcoaSksbz1uLmJpbmRpbmcoXCJ3aW5kb3ctXCIuY29uY2F0KGkpKSxhPWUudGFyZ2V0LmdldEF0dHJpYnV0ZSYmZS50YXJnZXQuZ2V0QXR0cmlidXRlKHIpO2E/bi5kZWJvdW5jZShlLnRhcmdldCxlLGZ1bmN0aW9uKCl7bi53aXRoaW5Pd25lcnMoZS50YXJnZXQsZnVuY3Rpb24obixyKXt0KGUsaSxuLGUudGFyZ2V0LHIsYSxudWxsKX0pfSk6ZGUuYWxsKGRvY3VtZW50LFwiW1wiLmNvbmNhdChvLFwiXVwiKSxmdW5jdGlvbihyKXt2YXIgYT1yLmdldEF0dHJpYnV0ZShvKTtuLmRlYm91bmNlKHIsZSxmdW5jdGlvbigpe24ud2l0aGluT3duZXJzKHIsZnVuY3Rpb24obixvKXt0KGUsaSxuLHIsbyxhLFwid2luZG93XCIpfSl9KX0pfSl9O2Zvcih2YXIgciBpbiBlKWkocil9fSx7a2V5OlwiYmluZENsaWNrc1wiLHZhbHVlOmZ1bmN0aW9uKCl7dGhpcy5iaW5kQ2xpY2soXCJjbGlja1wiLFwiY2xpY2tcIiwhMSksdGhpcy5iaW5kQ2xpY2soXCJtb3VzZWRvd25cIixcImNhcHR1cmUtY2xpY2tcIiwhMCl9fSx7a2V5OlwiYmluZENsaWNrXCIsdmFsdWU6ZnVuY3Rpb24oZSx0LG4pe3ZhciBpPXRoaXMscj10aGlzLmJpbmRpbmcodCk7d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoZSxmdW5jdGlvbihlKXtpZihpLmlzQ29ubmVjdGVkKCkpe3ZhciB0PW51bGwsbz0odD1uP2UudGFyZ2V0Lm1hdGNoZXMoXCJbXCIuY29uY2F0KHIsXCJdXCIpKT9lLnRhcmdldDplLnRhcmdldC5xdWVyeVNlbGVjdG9yKFwiW1wiLmNvbmNhdChyLFwiXVwiKSk6WShlLnRhcmdldCxyKSkmJnQuZ2V0QXR0cmlidXRlKHIpO28mJihcIiNcIj09PXQuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKSYmZS5wcmV2ZW50RGVmYXVsdCgpLGkuZGVib3VuY2UodCxlLGZ1bmN0aW9uKCl7aS53aXRoaW5Pd25lcnModCxmdW5jdGlvbihuLHIpe24ucHVzaEV2ZW50KFwiY2xpY2tcIix0LHIsbyxpLmV2ZW50TWV0YShcImNsaWNrXCIsZSx0KSl9KX0pKX19LG4pfX0se2tleTpcImJpbmROYXZcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPXRoaXM7aWYobGUuY2FuUHVzaFN0YXRlKCkpe2hpc3Rvcnkuc2Nyb2xsUmVzdG9yYXRpb24mJihoaXN0b3J5LnNjcm9sbFJlc3RvcmF0aW9uPVwibWFudWFsXCIpO3ZhciB0PW51bGw7d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIixmdW5jdGlvbihlKXtjbGVhclRpbWVvdXQodCksdD1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7bGUudXBkYXRlQ3VycmVudFN0YXRlKGZ1bmN0aW9uKGUpe3JldHVybiBPYmplY3QuYXNzaWduKGUse3Njcm9sbDp3aW5kb3cuc2Nyb2xsWX0pfSl9LDEwMCl9KSx3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsZnVuY3Rpb24odCl7aWYoZS5yZWdpc3Rlck5ld0xvY2F0aW9uKHdpbmRvdy5sb2NhdGlvbikpe3ZhciBuPXQuc3RhdGV8fHt9LGk9bi50eXBlLHI9bi5pZCxvPW4ucm9vdCxhPW4uc2Nyb2xsLHU9d2luZG93LmxvY2F0aW9uLmhyZWY7ZS5tYWluLmlzQ29ubmVjdGVkKCkmJlwicGF0Y2hcIj09PWkmJnI9PT1lLm1haW4uaWQ/ZS5tYWluLnB1c2hMaW5rUGF0Y2godSxudWxsKTplLnJlcGxhY2VNYWluKHUsbnVsbCxmdW5jdGlvbigpe28mJmUucmVwbGFjZVJvb3RIaXN0b3J5KCksXCJudW1iZXJcIj09dHlwZW9mIGEmJnNldFRpbWVvdXQoZnVuY3Rpb24oKXt3aW5kb3cuc2Nyb2xsVG8oMCxhKX0sMCl9KX19LCExKSx3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsZnVuY3Rpb24odCl7dmFyIG49WSh0LnRhcmdldCxcImRhdGEtcGh4LWxpbmtcIiksaT1uJiZuLmdldEF0dHJpYnV0ZShcImRhdGEtcGh4LWxpbmtcIikscj10Lm1ldGFLZXl8fHQuY3RybEtleXx8MT09PXQuYnV0dG9uO2lmKGkmJmUuaXNDb25uZWN0ZWQoKSYmZS5tYWluJiYhcil7dmFyIG89bi5ocmVmLGE9bi5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBoeC1saW5rLXN0YXRlXCIpO2lmKHQucHJldmVudERlZmF1bHQoKSxlLnBlbmRpbmdMaW5rIT09bylpZihcInBhdGNoXCI9PT1pKWUucHVzaEhpc3RvcnlQYXRjaChvLGEsbik7ZWxzZXtpZihcInJlZGlyZWN0XCIhPT1pKXRocm93IG5ldyBFcnJvcihcImV4cGVjdGVkIFwiLmNvbmNhdChcImRhdGEtcGh4LWxpbmtcIiwnIHRvIGJlIFwicGF0Y2hcIiBvciBcInJlZGlyZWN0XCIsIGdvdDogJykuY29uY2F0KGkpKTtlLmhpc3RvcnlSZWRpcmVjdChvLGEpfX19LCExKX19fSx7a2V5Olwid2l0aFBhZ2VMb2FkaW5nXCIsdmFsdWU6ZnVuY3Rpb24oZSx0KXtkZS5kaXNwYXRjaEV2ZW50KHdpbmRvdyxcInBoeDpwYWdlLWxvYWRpbmctc3RhcnRcIixlKTt2YXIgbj1mdW5jdGlvbigpe3JldHVybiBkZS5kaXNwYXRjaEV2ZW50KHdpbmRvdyxcInBoeDpwYWdlLWxvYWRpbmctc3RvcFwiLGUpfTtyZXR1cm4gdD90KG4pOm59fSx7a2V5OlwicHVzaEhpc3RvcnlQYXRjaFwiLHZhbHVlOmZ1bmN0aW9uKGUsdCxuKXt2YXIgaT10aGlzO3RoaXMud2l0aFBhZ2VMb2FkaW5nKHt0bzplLGtpbmQ6XCJwYXRjaFwifSxmdW5jdGlvbihyKXtpLm1haW4ucHVzaExpbmtQYXRjaChlLG4sZnVuY3Rpb24obil7aS5oaXN0b3J5UGF0Y2goZSx0LG4pLHIoKX0pfSl9fSx7a2V5OlwiaGlzdG9yeVBhdGNoXCIsdmFsdWU6ZnVuY3Rpb24oZSx0KXt2YXIgbj1hcmd1bWVudHMubGVuZ3RoPjImJnZvaWQgMCE9PWFyZ3VtZW50c1syXT9hcmd1bWVudHNbMl06dGhpcy5zZXRQZW5kaW5nTGluayhlKTt0aGlzLmNvbW1pdFBlbmRpbmdMaW5rKG4pJiYobGUucHVzaFN0YXRlKHQse3R5cGU6XCJwYXRjaFwiLGlkOnRoaXMubWFpbi5pZH0sZSksdGhpcy5yZWdpc3Rlck5ld0xvY2F0aW9uKHdpbmRvdy5sb2NhdGlvbikpfX0se2tleTpcImhpc3RvcnlSZWRpcmVjdFwiLHZhbHVlOmZ1bmN0aW9uKGUsdCxuKXt2YXIgaT10aGlzLHI9d2luZG93LnNjcm9sbFk7dGhpcy53aXRoUGFnZUxvYWRpbmcoe3RvOmUsa2luZDpcInJlZGlyZWN0XCJ9LGZ1bmN0aW9uKG8pe2kucmVwbGFjZU1haW4oZSxuLGZ1bmN0aW9uKCl7bGUucHVzaFN0YXRlKHQse3R5cGU6XCJyZWRpcmVjdFwiLGlkOmkubWFpbi5pZCxzY3JvbGw6cn0sZSksaS5yZWdpc3Rlck5ld0xvY2F0aW9uKHdpbmRvdy5sb2NhdGlvbiksbygpfSl9KX19LHtrZXk6XCJyZXBsYWNlUm9vdEhpc3RvcnlcIix2YWx1ZTpmdW5jdGlvbigpe2xlLnB1c2hTdGF0ZShcInJlcGxhY2VcIix7cm9vdDohMCx0eXBlOlwicGF0Y2hcIixpZDp0aGlzLm1haW4uaWR9KX19LHtrZXk6XCJyZWdpc3Rlck5ld0xvY2F0aW9uXCIsdmFsdWU6ZnVuY3Rpb24oZSl7dmFyIHQ9dGhpcy5jdXJyZW50TG9jYXRpb247cmV0dXJuIHQucGF0aG5hbWUrdC5zZWFyY2ghPT1lLnBhdGhuYW1lK2Uuc2VhcmNoJiYodGhpcy5jdXJyZW50TG9jYXRpb249RyhlKSwhMCl9fSx7a2V5OlwiYmluZEZvcm1zXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgZT10aGlzLHQ9MDt0aGlzLm9uKFwic3VibWl0XCIsZnVuY3Rpb24odCl7dmFyIG49dC50YXJnZXQuZ2V0QXR0cmlidXRlKGUuYmluZGluZyhcInN1Ym1pdFwiKSk7biYmKHQucHJldmVudERlZmF1bHQoKSx0LnRhcmdldC5kaXNhYmxlZD0hMCxlLndpdGhpbk93bmVycyh0LnRhcmdldCxmdW5jdGlvbihlLGkpe3JldHVybiBlLnN1Ym1pdEZvcm0odC50YXJnZXQsaSxuKX0pKX0sITEpO2Zvcih2YXIgbj1mdW5jdGlvbigpe3ZhciBuPXJbaV07ZS5vbihuLGZ1bmN0aW9uKGkpe3ZhciByPWkudGFyZ2V0LG89ci5mb3JtJiZyLmZvcm0uZ2V0QXR0cmlidXRlKGUuYmluZGluZyhcImNoYW5nZVwiKSk7aWYobyYmKFwibnVtYmVyXCIhPT1yLnR5cGV8fCFyLnZhbGlkaXR5fHwhci52YWxpZGl0eS5iYWRJbnB1dCkpe3ZhciBhPXQ7dCsrO3ZhciB1PWRlLnByaXZhdGUocixcInByZXYtaXRlcmF0aW9uXCIpfHx7fSxzPXUuYXQsYz11LnR5cGU7cz09PWEtMSYmbiE9PWN8fChkZS5wdXRQcml2YXRlKHIsXCJwcmV2LWl0ZXJhdGlvblwiLHthdDphLHR5cGU6bn0pLGUuZGVib3VuY2UocixpLGZ1bmN0aW9uKCl7ZS53aXRoaW5Pd25lcnMoci5mb3JtLGZ1bmN0aW9uKHQsbil7ZGUucHV0UHJpdmF0ZShyLFwicGh4LWhhcy1mb2N1c2VkXCIsITApLGRlLmlzVGV4dHVhbElucHV0KHIpfHxlLnNldEFjdGl2ZUVsZW1lbnQociksdC5wdXNoSW5wdXQocixuLG8saS50YXJnZXQpfSl9KSl9fSwhMSl9LGk9MCxyPVtcImNoYW5nZVwiLFwiaW5wdXRcIl07aTxyLmxlbmd0aDtpKyspbigpfX0se2tleTpcImRlYm91bmNlXCIsdmFsdWU6ZnVuY3Rpb24oZSx0LG4pe3ZhciBpPXRoaXMuYmluZGluZyhcImRlYm91bmNlXCIpLHI9dGhpcy5iaW5kaW5nKFwidGhyb3R0bGVcIiksbz10aGlzLmRlZmF1bHRzLmRlYm91bmNlLnRvU3RyaW5nKCksYT10aGlzLmRlZmF1bHRzLnRocm90dGxlLnRvU3RyaW5nKCk7ZGUuZGVib3VuY2UoZSx0LGksbyxyLGEsbil9fSx7a2V5Olwic2lsZW5jZUV2ZW50c1wiLHZhbHVlOmZ1bmN0aW9uKGUpe3RoaXMuc2lsZW5jZWQ9ITAsZSgpLHRoaXMuc2lsZW5jZWQ9ITF9fSx7a2V5Olwib25cIix2YWx1ZTpmdW5jdGlvbihlLHQpe3ZhciBuPXRoaXM7d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoZSxmdW5jdGlvbihlKXtuLnNpbGVuY2VkfHx0KGUpfSl9fV0pLGV9KCksbGU9e2NhblB1c2hTdGF0ZTpmdW5jdGlvbigpe3JldHVybiB2b2lkIDAhPT1oaXN0b3J5LnB1c2hTdGF0ZX0sZHJvcExvY2FsOmZ1bmN0aW9uKGUsdCxuKXtyZXR1cm4gZS5yZW1vdmVJdGVtKHRoaXMubG9jYWxLZXkodCxuKSl9LHVwZGF0ZUxvY2FsOmZ1bmN0aW9uKGUsdCxuLGkscil7dmFyIG89dGhpcy5nZXRMb2NhbChlLHQsbiksYT10aGlzLmxvY2FsS2V5KHQsbiksdT1udWxsPT09bz9pOnIobyk7cmV0dXJuIGUuc2V0SXRlbShhLEpTT04uc3RyaW5naWZ5KHUpKSx1fSxnZXRMb2NhbDpmdW5jdGlvbihlLHQsbil7cmV0dXJuIEpTT04ucGFyc2UoZS5nZXRJdGVtKHRoaXMubG9jYWxLZXkodCxuKSkpfSxmZXRjaFBhZ2U6ZnVuY3Rpb24oZSx0KXt2YXIgbj1uZXcgWE1MSHR0cFJlcXVlc3Q7bi5vcGVuKFwiR0VUXCIsZSwhMCksbi50aW1lb3V0PTNlNCxuLnNldFJlcXVlc3RIZWFkZXIoXCJjb250ZW50LXR5cGVcIixcInRleHQvaHRtbFwiKSxuLnNldFJlcXVlc3RIZWFkZXIoXCJjYWNoZS1jb250cm9sXCIsXCJtYXgtYWdlPTAsIG5vLWNhY2hlLCBuby1zdG9yZSwgbXVzdC1yZXZhbGlkYXRlLCBwb3N0LWNoZWNrPTAsIHByZS1jaGVjaz0wXCIpLG4uc2V0UmVxdWVzdEhlYWRlcihcIngtcmVxdWVzdGVkLXdpdGhcIixcImxpdmUtbGlua1wiKSxuLm9uZXJyb3I9ZnVuY3Rpb24oKXtyZXR1cm4gdCg0MDApfSxuLm9udGltZW91dD1mdW5jdGlvbigpe3JldHVybiB0KDUwNCl9LG4ub25yZWFkeXN0YXRlY2hhbmdlPWZ1bmN0aW9uKCl7aWYoND09PW4ucmVhZHlTdGF0ZSl7dmFyIGk9bmV3IFVSTChlKSxyPWkucGF0aG5hbWUraS5zZWFyY2gsbz1lZShuLmdldFJlc3BvbnNlSGVhZGVyKFwieC1yZXNwb25zZS11cmxcIil8fG4ucmVzcG9uc2VVUkwsZnVuY3Rpb24oZSl7cmV0dXJuIG5ldyBVUkwoZSl9KSxhPW8/by5wYXRobmFtZStvLnNlYXJjaDpudWxsO3JldHVyblwibGl2ZS1saW5rXCIhPT1uLmdldFJlc3BvbnNlSGVhZGVyKFwieC1yZXF1ZXN0ZWQtd2l0aFwiKT90KDQwMCk6bnVsbD09PW98fGEhPXI/dCgzMDIpOjIwMCE9PW4uc3RhdHVzP3Qobi5zdGF0dXMpOnZvaWQgdCgyMDAsbi5yZXNwb25zZVRleHQpfX0sbi5zZW5kKCl9LHVwZGF0ZUN1cnJlbnRTdGF0ZTpmdW5jdGlvbihlKXt0aGlzLmNhblB1c2hTdGF0ZSgpJiZoaXN0b3J5LnJlcGxhY2VTdGF0ZShlKGhpc3Rvcnkuc3RhdGV8fHt9KSxcIlwiLHdpbmRvdy5sb2NhdGlvbi5ocmVmKX0scHVzaFN0YXRlOmZ1bmN0aW9uKGUsdCxuKXtpZih0aGlzLmNhblB1c2hTdGF0ZSgpKXtpZihuIT09d2luZG93LmxvY2F0aW9uLmhyZWYpe2lmKFwicmVkaXJlY3RcIj09dC50eXBlJiZ0LnNjcm9sbCl7dmFyIGk9aGlzdG9yeS5zdGF0ZXx8e307aS5zY3JvbGw9dC5zY3JvbGwsaGlzdG9yeS5yZXBsYWNlU3RhdGUoaSxcIlwiLHdpbmRvdy5sb2NhdGlvbi5ocmVmKX1kZWxldGUgdC5zY3JvbGwsaGlzdG9yeVtlK1wiU3RhdGVcIl0odCxcIlwiLG58fG51bGwpO3ZhciByPXRoaXMuZ2V0SGFzaFRhcmdldEVsKHdpbmRvdy5sb2NhdGlvbi5oYXNoKTtyP3Iuc2Nyb2xsSW50b1ZpZXcoKTpcInJlZGlyZWN0XCI9PT10LnR5cGUmJndpbmRvdy5zY3JvbGwoMCwwKX19ZWxzZSB0aGlzLnJlZGlyZWN0KG4pfSxzZXRDb29raWU6ZnVuY3Rpb24oZSx0KXtkb2N1bWVudC5jb29raWU9XCJcIi5jb25jYXQoZSxcIj1cIikuY29uY2F0KHQpfSxnZXRDb29raWU6ZnVuY3Rpb24oZSl7cmV0dXJuIGRvY3VtZW50LmNvb2tpZS5yZXBsYWNlKG5ldyBSZWdFeHAoXCIoPzooPzpefC4qO3MqKVwiLmNvbmNhdChlLFwicyo9cyooW147XSopLiokKXxeLiokXCIpKSxcIiQxXCIpfSxyZWRpcmVjdDpmdW5jdGlvbihlLHQpe3QmJmxlLnNldENvb2tpZShcIl9fcGhvZW5peF9mbGFzaF9fXCIsdCtcIjsgbWF4LWFnZT02MDAwMDsgcGF0aD0vXCIpLHdpbmRvdy5sb2NhdGlvbj1lfSxsb2NhbEtleTpmdW5jdGlvbihlLHQpe3JldHVyblwiXCIuY29uY2F0KGUsXCItXCIpLmNvbmNhdCh0KX0sZ2V0SGFzaFRhcmdldEVsOmZ1bmN0aW9uKGUpe3ZhciB0PWUudG9TdHJpbmcoKS5zdWJzdHJpbmcoMSk7aWYoXCJcIiE9PXQpcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHQpfHxkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdhW25hbWU9XCInLmNvbmNhdCh0LCdcIl0nKSl9fSxkZT17YnlJZDpmdW5jdGlvbihlKXtyZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZSl8fEsoXCJubyBpZCBmb3VuZCBmb3IgXCIuY29uY2F0KGUpKX0scmVtb3ZlQ2xhc3M6ZnVuY3Rpb24oZSx0KXtlLmNsYXNzTGlzdC5yZW1vdmUodCksMD09PWUuY2xhc3NMaXN0Lmxlbmd0aCYmZS5yZW1vdmVBdHRyaWJ1dGUoXCJjbGFzc1wiKX0sYWxsOmZ1bmN0aW9uKGUsdCxuKXt2YXIgaT1BcnJheS5mcm9tKGUucXVlcnlTZWxlY3RvckFsbCh0KSk7cmV0dXJuIG4/aS5mb3JFYWNoKG4pOml9LGNoaWxkTm9kZUxlbmd0aDpmdW5jdGlvbihlKXt2YXIgdD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIik7cmV0dXJuIHQuaW5uZXJIVE1MPWUsdC5jb250ZW50LmNoaWxkRWxlbWVudENvdW50fSxpc1VwbG9hZElucHV0OmZ1bmN0aW9uKGUpe3JldHVyblwiZmlsZVwiPT09ZS50eXBlJiZudWxsIT09ZS5nZXRBdHRyaWJ1dGUoVSl9LGZpbmRVcGxvYWRJbnB1dHM6ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMuYWxsKGUsJ2lucHV0W3R5cGU9XCJmaWxlXCJdWycuY29uY2F0KFUsXCJdXCIpKX0sZmluZENvbXBvbmVudE5vZGVMaXN0OmZ1bmN0aW9uKGUsdCl7cmV0dXJuIHRoaXMuZmlsdGVyV2l0aGluU2FtZUxpdmVWaWV3KHRoaXMuYWxsKGUsXCJbXCIuY29uY2F0KE0sJz1cIicpLmNvbmNhdCh0LCdcIl0nKSksZSl9LGlzUGh4RGVzdHJveWVkOmZ1bmN0aW9uKGUpe3JldHVybiEoIWUuaWR8fCFkZS5wcml2YXRlKGUsXCJkZXN0cm95ZWRcIikpfSxtYXJrUGh4Q2hpbGREZXN0cm95ZWQ6ZnVuY3Rpb24oZSl7ZS5zZXRBdHRyaWJ1dGUoXCJkYXRhLXBoeC1zZXNzaW9uXCIsXCJcIiksdGhpcy5wdXRQcml2YXRlKGUsXCJkZXN0cm95ZWRcIiwhMCl9LGZpbmRQaHhDaGlsZHJlbkluRnJhZ21lbnQ6ZnVuY3Rpb24oZSx0KXt2YXIgbj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIik7cmV0dXJuIG4uaW5uZXJIVE1MPWUsdGhpcy5maW5kUGh4Q2hpbGRyZW4obi5jb250ZW50LHQpfSxpc0lnbm9yZWQ6ZnVuY3Rpb24oZSx0KXtyZXR1cm5cImlnbm9yZVwiPT09KGUuZ2V0QXR0cmlidXRlKHQpfHxlLmdldEF0dHJpYnV0ZShcImRhdGEtcGh4LXVwZGF0ZVwiKSl9LGlzUGh4VXBkYXRlOmZ1bmN0aW9uKGUsdCxuKXtyZXR1cm4gZS5nZXRBdHRyaWJ1dGUmJm4uaW5kZXhPZihlLmdldEF0dHJpYnV0ZSh0KSk+PTB9LGZpbmRQaHhDaGlsZHJlbjpmdW5jdGlvbihlLHQpe3JldHVybiB0aGlzLmFsbChlLFwiXCIuY29uY2F0KEIsXCJbXCIpLmNvbmNhdChcImRhdGEtcGh4LXBhcmVudC1pZFwiLCc9XCInKS5jb25jYXQodCwnXCJdJykpfSxmaW5kUGFyZW50Q0lEczpmdW5jdGlvbihlLHQpe3ZhciBuPXRoaXMsaT1uZXcgU2V0KHQpO3JldHVybiB0LnJlZHVjZShmdW5jdGlvbih0LGkpe3ZhciByPVwiW1wiLmNvbmNhdChNLCc9XCInKS5jb25jYXQoaSwnXCJdIFsnKS5jb25jYXQoTSxcIl1cIik7cmV0dXJuIG4uZmlsdGVyV2l0aGluU2FtZUxpdmVWaWV3KG4uYWxsKGUsciksZSkubWFwKGZ1bmN0aW9uKGUpe3JldHVybiBwYXJzZUludChlLmdldEF0dHJpYnV0ZShNKSl9KS5mb3JFYWNoKGZ1bmN0aW9uKGUpe3JldHVybiB0LmRlbGV0ZShlKX0pLHR9LGkpfSxmaWx0ZXJXaXRoaW5TYW1lTGl2ZVZpZXc6ZnVuY3Rpb24oZSx0KXt2YXIgbj10aGlzO3JldHVybiB0LnF1ZXJ5U2VsZWN0b3IoQik/ZS5maWx0ZXIoZnVuY3Rpb24oZSl7cmV0dXJuIG4ud2l0aGluU2FtZUxpdmVWaWV3KGUsdCl9KTplfSx3aXRoaW5TYW1lTGl2ZVZpZXc6ZnVuY3Rpb24oZSx0KXtmb3IoO2U9ZS5wYXJlbnROb2RlOyl7aWYoZS5pc1NhbWVOb2RlKHQpKXJldHVybiEwO2lmKGUuZ2V0QXR0cmlidXRlKGopKXJldHVybiExfX0scHJpdmF0ZTpmdW5jdGlvbihlLHQpe3JldHVybiBlLnBoeFByaXZhdGUmJmUucGh4UHJpdmF0ZVt0XX0sZGVsZXRlUHJpdmF0ZTpmdW5jdGlvbihlLHQpe2UucGh4UHJpdmF0ZSYmZGVsZXRlIGUucGh4UHJpdmF0ZVt0XX0scHV0UHJpdmF0ZTpmdW5jdGlvbihlLHQsbil7ZS5waHhQcml2YXRlfHwoZS5waHhQcml2YXRlPXt9KSxlLnBoeFByaXZhdGVbdF09bn0sY29weVByaXZhdGVzOmZ1bmN0aW9uKGUsdCl7dC5waHhQcml2YXRlJiYoZS5waHhQcml2YXRlPUcodC5waHhQcml2YXRlKSl9LHB1dFRpdGxlOmZ1bmN0aW9uKGUpe3ZhciB0PWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJ0aXRsZVwiKS5kYXRhc2V0LG49dC5wcmVmaXgsaT10LnN1ZmZpeDtkb2N1bWVudC50aXRsZT1cIlwiLmNvbmNhdChufHxcIlwiKS5jb25jYXQoZSkuY29uY2F0KGl8fFwiXCIpfSxkZWJvdW5jZTpmdW5jdGlvbihlLHQsbixpLHIsbyxhKXt2YXIgdT10aGlzLHM9ZS5nZXRBdHRyaWJ1dGUobiksYz1lLmdldEF0dHJpYnV0ZShyKTtcIlwiPT09cyYmKHM9aSksXCJcIj09PWMmJihjPW8pO3ZhciBsPXN8fGM7c3dpdGNoKGwpe2Nhc2UgbnVsbDpyZXR1cm4gYSgpO2Nhc2VcImJsdXJcIjpyZXR1cm4gdm9pZCh0aGlzLm9uY2UoZSxcImRlYm91bmNlLWJsdXJcIikmJmUuYWRkRXZlbnRMaXN0ZW5lcihcImJsdXJcIixmdW5jdGlvbigpe3JldHVybiBhKCl9KSk7ZGVmYXVsdDp2YXIgZD1wYXJzZUludChsKSxoPXRoaXMuaW5jQ3ljbGUoZSxcImRlYm91bmNlLXRyaWdnZXJcIixmdW5jdGlvbigpe3JldHVybiBjP3UuZGVsZXRlUHJpdmF0ZShlLFwidGhyb3R0bGVkXCIpOmEoKX0pO2lmKGlzTmFOKGQpKXJldHVybiBLKFwiaW52YWxpZCB0aHJvdHRsZS9kZWJvdW5jZSB2YWx1ZTogXCIuY29uY2F0KGwpKTtpZihjKXt2YXIgZj0hMTtpZihcImtleWRvd25cIj09PXQudHlwZSl7dmFyIHY9dGhpcy5wcml2YXRlKGUsXCJkZWJvdW5jZS1wcmV2LWtleVwiKTt0aGlzLnB1dFByaXZhdGUoZSxcImRlYm91bmNlLXByZXYta2V5XCIsdC5rZXkpLGY9diE9PXQua2V5fWlmKCFmJiZ0aGlzLnByaXZhdGUoZSxcInRocm90dGxlZFwiKSlyZXR1cm4hMTthKCksdGhpcy5wdXRQcml2YXRlKGUsXCJ0aHJvdHRsZWRcIiwhMCksc2V0VGltZW91dChmdW5jdGlvbigpe3JldHVybiB1LnRyaWdnZXJDeWNsZShlLFwiZGVib3VuY2UtdHJpZ2dlclwiKX0sZCl9ZWxzZSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7cmV0dXJuIHUudHJpZ2dlckN5Y2xlKGUsXCJkZWJvdW5jZS10cmlnZ2VyXCIsaCl9LGQpO3ZhciBwPWUuZm9ybTtwJiZ0aGlzLm9uY2UocCxcImJpbmQtZGVib3VuY2VcIikmJnAuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLGZ1bmN0aW9uKGUpe0FycmF5LmZyb20obmV3IEZvcm1EYXRhKHApLmVudHJpZXMoKSxmdW5jdGlvbihlKXt2YXIgdD1DKGUsMiksbj10WzBdLGk9KHRbMV0scC5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cIicuY29uY2F0KG4sJ1wiXScpKSk7dS5pbmNDeWNsZShpLFwiZGVib3VuY2UtdHJpZ2dlclwiKSx1LmRlbGV0ZVByaXZhdGUoaSxcInRocm90dGxlZFwiKX0pfSksdGhpcy5vbmNlKGUsXCJiaW5kLWRlYm91bmNlXCIpJiZlLmFkZEV2ZW50TGlzdGVuZXIoXCJibHVyXCIsZnVuY3Rpb24odCl7cmV0dXJuIHUudHJpZ2dlckN5Y2xlKGUsXCJkZWJvdW5jZS10cmlnZ2VyXCIpfSl9fSx0cmlnZ2VyQ3ljbGU6ZnVuY3Rpb24oZSx0LG4pe3ZhciBpPUModGhpcy5wcml2YXRlKGUsdCksMikscj1pWzBdLG89aVsxXTtufHwobj1yKSxuPT09ciYmKHRoaXMuaW5jQ3ljbGUoZSx0KSxvKCkpfSxvbmNlOmZ1bmN0aW9uKGUsdCl7cmV0dXJuITAhPT10aGlzLnByaXZhdGUoZSx0KSYmKHRoaXMucHV0UHJpdmF0ZShlLHQsITApLCEwKX0saW5jQ3ljbGU6ZnVuY3Rpb24oZSx0KXt2YXIgbj1hcmd1bWVudHMubGVuZ3RoPjImJnZvaWQgMCE9PWFyZ3VtZW50c1syXT9hcmd1bWVudHNbMl06ZnVuY3Rpb24oKXt9LGk9Qyh0aGlzLnByaXZhdGUoZSx0KXx8WzAsbl0sMikscj1pWzBdO2lbMV07cmV0dXJuIHIrKyx0aGlzLnB1dFByaXZhdGUoZSx0LFtyLG5dKSxyfSxkaXNjYXJkRXJyb3I6ZnVuY3Rpb24oZSx0LG4pe3ZhciBpPXQuZ2V0QXR0cmlidXRlJiZ0LmdldEF0dHJpYnV0ZShuKSxyPWkmJmUucXVlcnlTZWxlY3RvcignW2lkPVwiJy5jb25jYXQoaSwnXCJdLCBbbmFtZT1cIicpLmNvbmNhdChpLCdcIl0nKSk7ciYmKHRoaXMucHJpdmF0ZShyLFwicGh4LWhhcy1mb2N1c2VkXCIpfHx0aGlzLnByaXZhdGUoci5mb3JtLFwicGh4LWhhcy1zdWJtaXR0ZWRcIil8fHQuY2xhc3NMaXN0LmFkZChcInBoeC1uby1mZWVkYmFja1wiKSl9LHNob3dFcnJvcjpmdW5jdGlvbihlLHQpe3ZhciBuPXRoaXM7KGUuaWR8fGUubmFtZSkmJnRoaXMuYWxsKGUuZm9ybSxcIltcIi5jb25jYXQodCwnPVwiJykuY29uY2F0KGUuaWQsJ1wiXSwgWycpLmNvbmNhdCh0LCc9XCInKS5jb25jYXQoZS5uYW1lLCdcIl0nKSxmdW5jdGlvbihlKXtuLnJlbW92ZUNsYXNzKGUsXCJwaHgtbm8tZmVlZGJhY2tcIil9KX0saXNQaHhDaGlsZDpmdW5jdGlvbihlKXtyZXR1cm4gZS5nZXRBdHRyaWJ1dGUmJmUuZ2V0QXR0cmlidXRlKFwiZGF0YS1waHgtcGFyZW50LWlkXCIpfSxkaXNwYXRjaEV2ZW50OmZ1bmN0aW9uKGUsdCl7dmFyIG49YXJndW1lbnRzLmxlbmd0aD4yJiZ2b2lkIDAhPT1hcmd1bWVudHNbMl0/YXJndW1lbnRzWzJdOnt9LGk9bmV3IEN1c3RvbUV2ZW50KHQse2J1YmJsZXM6ITAsY2FuY2VsYWJsZTohMCxkZXRhaWw6bn0pO2UuZGlzcGF0Y2hFdmVudChpKX0sY2xvbmVOb2RlOmZ1bmN0aW9uKGUsdCl7aWYodm9pZCAwPT09dClyZXR1cm4gZS5jbG9uZU5vZGUoITApO3ZhciBuPWUuY2xvbmVOb2RlKCExKTtyZXR1cm4gbi5pbm5lckhUTUw9dCxufSxtZXJnZUF0dHJzOmZ1bmN0aW9uKGUsdCl7Zm9yKHZhciBuPWFyZ3VtZW50cy5sZW5ndGg+MiYmdm9pZCAwIT09YXJndW1lbnRzWzJdP2FyZ3VtZW50c1syXTp7fSxpPW4uZXhjbHVkZXx8W10scj1uLmlzSWdub3JlZCxvPXQuYXR0cmlidXRlcyxhPW8ubGVuZ3RoLTE7YT49MDthLS0pe3ZhciB1PW9bYV0ubmFtZTtpLmluZGV4T2YodSk8MCYmZS5zZXRBdHRyaWJ1dGUodSx0LmdldEF0dHJpYnV0ZSh1KSl9Zm9yKHZhciBzPWUuYXR0cmlidXRlcyxjPXMubGVuZ3RoLTE7Yz49MDtjLS0pe3ZhciBsPXNbY10ubmFtZTtyP2wuc3RhcnRzV2l0aChcImRhdGEtXCIpJiYhdC5oYXNBdHRyaWJ1dGUobCkmJmUucmVtb3ZlQXR0cmlidXRlKGwpOnQuaGFzQXR0cmlidXRlKGwpfHxlLnJlbW92ZUF0dHJpYnV0ZShsKX19LG1lcmdlRm9jdXNlZElucHV0OmZ1bmN0aW9uKGUsdCl7ZSBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50fHxkZS5tZXJnZUF0dHJzKGUsdCx7ZXhjZXB0OltcInZhbHVlXCJdfSksdC5yZWFkT25seT9lLnNldEF0dHJpYnV0ZShcInJlYWRvbmx5XCIsITApOmUucmVtb3ZlQXR0cmlidXRlKFwicmVhZG9ubHlcIil9LGhhc1NlbGVjdGlvblJhbmdlOmZ1bmN0aW9uKGUpe3JldHVybiBlLnNldFNlbGVjdGlvblJhbmdlJiYoXCJ0ZXh0XCI9PT1lLnR5cGV8fFwidGV4dGFyZWFcIj09PWUudHlwZSl9LHJlc3RvcmVGb2N1czpmdW5jdGlvbihlLHQsbil7aWYoZGUuaXNUZXh0dWFsSW5wdXQoZSkpe3ZhciBpPWUubWF0Y2hlcyhcIjpmb2N1c1wiKTtlLnJlYWRPbmx5JiZlLmJsdXIoKSxpfHxlLmZvY3VzKCksdGhpcy5oYXNTZWxlY3Rpb25SYW5nZShlKSYmZS5zZXRTZWxlY3Rpb25SYW5nZSh0LG4pfX0saXNGb3JtSW5wdXQ6ZnVuY3Rpb24oZSl7cmV0dXJuL14oPzppbnB1dHxzZWxlY3R8dGV4dGFyZWEpJC9pLnRlc3QoZS50YWdOYW1lKSYmXCJidXR0b25cIiE9PWUudHlwZX0sc3luY0F0dHJzVG9Qcm9wczpmdW5jdGlvbihlKXtlIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCYmVi5pbmRleE9mKGUudHlwZS50b0xvY2FsZUxvd2VyQ2FzZSgpKT49MCYmKGUuY2hlY2tlZD1udWxsIT09ZS5nZXRBdHRyaWJ1dGUoXCJjaGVja2VkXCIpKX0saXNUZXh0dWFsSW5wdXQ6ZnVuY3Rpb24oZSl7cmV0dXJuIEouaW5kZXhPZihlLnR5cGUpPj0wfSxpc05vd1RyaWdnZXJGb3JtRXh0ZXJuYWw6ZnVuY3Rpb24oZSx0KXtyZXR1cm4gZS5nZXRBdHRyaWJ1dGUmJm51bGwhPT1lLmdldEF0dHJpYnV0ZSh0KX0sc3luY1BlbmRpbmdSZWY6ZnVuY3Rpb24oZSx0LG4pe3ZhciBpPWUuZ2V0QXR0cmlidXRlKEYpO3JldHVybiBudWxsPT09aXx8KGRlLmlzRm9ybUlucHV0KGUpfHxudWxsIT09ZS5nZXRBdHRyaWJ1dGUobik/KGRlLmlzVXBsb2FkSW5wdXQoZSkmJmRlLm1lcmdlQXR0cnMoZSx0LHtpc0lnbm9yZWQ6ITB9KSxkZS5wdXRQcml2YXRlKGUsRix0KSwhMSk6KEguZm9yRWFjaChmdW5jdGlvbihuKXtlLmNsYXNzTGlzdC5jb250YWlucyhuKSYmdC5jbGFzc0xpc3QuYWRkKG4pfSksdC5zZXRBdHRyaWJ1dGUoRixpKSwhMCkpfSxjbGVhbkNoaWxkTm9kZXM6ZnVuY3Rpb24oZSx0KXtpZihkZS5pc1BoeFVwZGF0ZShlLHQsW1wiYXBwZW5kXCIsXCJwcmVwZW5kXCJdKSl7dmFyIG49W107ZS5jaGlsZE5vZGVzLmZvckVhY2goZnVuY3Rpb24oZSl7ZS5pZHx8KGUubm9kZVR5cGU9PT1Ob2RlLlRFWFRfTk9ERSYmXCJcIj09PWUubm9kZVZhbHVlLnRyaW0oKXx8SyhcIm9ubHkgSFRNTCBlbGVtZW50IHRhZ3Mgd2l0aCBhbiBpZCBhcmUgYWxsb3dlZCBpbnNpZGUgY29udGFpbmVycyB3aXRoIHBoeC11cGRhdGUuXFxuXFxuXCIrJ3JlbW92aW5nIGlsbGVnYWwgbm9kZTogXCInLmNvbmNhdCgoZS5vdXRlckhUTUx8fGUubm9kZVZhbHVlKS50cmltKCksJ1wiXFxuXFxuJykpLG4ucHVzaChlKSl9KSxuLmZvckVhY2goZnVuY3Rpb24oZSl7cmV0dXJuIGUucmVtb3ZlKCl9KX19fSxoZT1mdW5jdGlvbigpe2Z1bmN0aW9uIGUodCxuLGkpe0QodGhpcyxlKTt2YXIgcj1uZXcgU2V0LG89bmV3IFNldCh3KG4uY2hpbGRyZW4pLm1hcChmdW5jdGlvbihlKXtyZXR1cm4gZS5pZH0pKSxhPVtdO0FycmF5LmZyb20odC5jaGlsZHJlbikuZm9yRWFjaChmdW5jdGlvbihlKXtpZihlLmlkJiYoci5hZGQoZS5pZCksby5oYXMoZS5pZCkpKXt2YXIgdD1lLnByZXZpb3VzRWxlbWVudFNpYmxpbmcmJmUucHJldmlvdXNFbGVtZW50U2libGluZy5pZDthLnB1c2goe2VsZW1lbnRJZDplLmlkLHByZXZpb3VzRWxlbWVudElkOnR9KX19KSx0aGlzLmNvbnRhaW5lcklkPW4uaWQsdGhpcy51cGRhdGVUeXBlPWksdGhpcy5lbGVtZW50c1RvTW9kaWZ5PWEsdGhpcy5lbGVtZW50SWRzVG9BZGQ9dyhvKS5maWx0ZXIoZnVuY3Rpb24oZSl7cmV0dXJuIXIuaGFzKGUpfSl9cmV0dXJuIE4oZSxbe2tleTpcInBlcmZvcm1cIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPWRlLmJ5SWQodGhpcy5jb250YWluZXJJZCk7dGhpcy5lbGVtZW50c1RvTW9kaWZ5LmZvckVhY2goZnVuY3Rpb24odCl7dC5wcmV2aW91c0VsZW1lbnRJZD9lZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0LnByZXZpb3VzRWxlbWVudElkKSxmdW5jdGlvbihlKXtlZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0LmVsZW1lbnRJZCksZnVuY3Rpb24odCl7dC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nJiZ0LnByZXZpb3VzRWxlbWVudFNpYmxpbmcuaWQ9PWUuaWR8fGUuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYWZ0ZXJlbmRcIix0KX0pfSk6ZWUoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodC5lbGVtZW50SWQpLGZ1bmN0aW9uKHQpe251bGw9PXQucHJldmlvdXNFbGVtZW50U2libGluZ3x8ZS5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJhZnRlcmJlZ2luXCIsdCl9KX0pLFwicHJlcGVuZFwiPT10aGlzLnVwZGF0ZVR5cGUmJnRoaXMuZWxlbWVudElkc1RvQWRkLnJldmVyc2UoKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe2VlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHQpLGZ1bmN0aW9uKHQpe3JldHVybiBlLmluc2VydEFkamFjZW50RWxlbWVudChcImFmdGVyYmVnaW5cIix0KX0pfSl9fV0pLGV9KCksZmU9ZnVuY3Rpb24oKXtmdW5jdGlvbiBlKHQsbixpLHIsbyl7RCh0aGlzLGUpLHRoaXMudmlldz10LHRoaXMubGl2ZVNvY2tldD10LmxpdmVTb2NrZXQsdGhpcy5jb250YWluZXI9bix0aGlzLmlkPWksdGhpcy5yb290SUQ9dC5yb290LmlkLHRoaXMuaHRtbD1yLHRoaXMudGFyZ2V0Q0lEPW8sdGhpcy5jaWRQYXRjaD1cIm51bWJlclwiPT10eXBlb2YgdGhpcy50YXJnZXRDSUQsdGhpcy5jYWxsYmFja3M9e2JlZm9yZWFkZGVkOltdLGJlZm9yZXVwZGF0ZWQ6W10sYmVmb3JlcGh4Q2hpbGRBZGRlZDpbXSxhZnRlcmFkZGVkOltdLGFmdGVydXBkYXRlZDpbXSxhZnRlcmRpc2NhcmRlZDpbXSxhZnRlcnBoeENoaWxkQWRkZWQ6W119fXJldHVybiBOKGUsbnVsbCxbe2tleTpcInBhdGNoRWxcIix2YWx1ZTpmdW5jdGlvbihlLHQsbil7ayhlLHQse2NoaWxkcmVuT25seTohMSxvbkJlZm9yZUVsVXBkYXRlZDpmdW5jdGlvbihlLHQpe2lmKG4mJm4uaXNTYW1lTm9kZShlKSYmZGUuaXNGb3JtSW5wdXQoZSkpcmV0dXJuIGRlLm1lcmdlRm9jdXNlZElucHV0KGUsdCksITF9fSl9fV0pLE4oZSxbe2tleTpcImJlZm9yZVwiLHZhbHVlOmZ1bmN0aW9uKGUsdCl7dGhpcy5jYWxsYmFja3NbXCJiZWZvcmVcIi5jb25jYXQoZSldLnB1c2godCl9fSx7a2V5OlwiYWZ0ZXJcIix2YWx1ZTpmdW5jdGlvbihlLHQpe3RoaXMuY2FsbGJhY2tzW1wiYWZ0ZXJcIi5jb25jYXQoZSldLnB1c2godCl9fSx7a2V5OlwidHJhY2tCZWZvcmVcIix2YWx1ZTpmdW5jdGlvbihlKXtmb3IodmFyIHQ9YXJndW1lbnRzLmxlbmd0aCxuPW5ldyBBcnJheSh0PjE/dC0xOjApLGk9MTtpPHQ7aSsrKW5baS0xXT1hcmd1bWVudHNbaV07dGhpcy5jYWxsYmFja3NbXCJiZWZvcmVcIi5jb25jYXQoZSldLmZvckVhY2goZnVuY3Rpb24oZSl7cmV0dXJuIGUuYXBwbHkodm9pZCAwLG4pfSl9fSx7a2V5OlwidHJhY2tBZnRlclwiLHZhbHVlOmZ1bmN0aW9uKGUpe2Zvcih2YXIgdD1hcmd1bWVudHMubGVuZ3RoLG49bmV3IEFycmF5KHQ+MT90LTE6MCksaT0xO2k8dDtpKyspbltpLTFdPWFyZ3VtZW50c1tpXTt0aGlzLmNhbGxiYWNrc1tcImFmdGVyXCIuY29uY2F0KGUpXS5mb3JFYWNoKGZ1bmN0aW9uKGUpe3JldHVybiBlLmFwcGx5KHZvaWQgMCxuKX0pfX0se2tleTpcIm1hcmtQcnVuYWJsZUNvbnRlbnRGb3JSZW1vdmFsXCIsdmFsdWU6ZnVuY3Rpb24oKXtkZS5hbGwodGhpcy5jb250YWluZXIsXCJbcGh4LXVwZGF0ZT1hcHBlbmRdID4gKiwgW3BoeC11cGRhdGU9cHJlcGVuZF0gPiAqXCIsZnVuY3Rpb24oZSl7ZS5zZXRBdHRyaWJ1dGUoXCJkYXRhLXBoeC1yZW1vdmVcIixcIlwiKX0pfX0se2tleTpcInBlcmZvcm1cIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPXRoaXMsdD10aGlzLnZpZXcsbj10aGlzLmxpdmVTb2NrZXQsaT10aGlzLmNvbnRhaW5lcixyPXRoaXMuaHRtbCxvPXRoaXMuaXNDSURQYXRjaCgpP3RoaXMudGFyZ2V0Q0lEQ29udGFpbmVyKHIpOmk7aWYoIXRoaXMuaXNDSURQYXRjaCgpfHxvKXt2YXIgYT1uLmdldEFjdGl2ZUVsZW1lbnQoKSx1PWEmJmRlLmhhc1NlbGVjdGlvblJhbmdlKGEpP2E6e30scz11LnNlbGVjdGlvblN0YXJ0LGM9dS5zZWxlY3Rpb25FbmQsbD1uLmJpbmRpbmcoXCJ1cGRhdGVcIiksZD1uLmJpbmRpbmcoXCJmZWVkYmFjay1mb3JcIiksaD1uLmJpbmRpbmcoXCJkaXNhYmxlLXdpdGhcIiksZj1uLmJpbmRpbmcoXCJ0cmlnZ2VyLWFjdGlvblwiKSx2PVtdLHA9W10sZz1bXSxtPW51bGwseT1uLnRpbWUoXCJwcmVtb3JwaCBjb250YWluZXIgcHJlcFwiLGZ1bmN0aW9uKCl7cmV0dXJuIGUuYnVpbGREaWZmSFRNTChpLHIsbCxvKX0pO3JldHVybiB0aGlzLnRyYWNrQmVmb3JlKFwiYWRkZWRcIixpKSx0aGlzLnRyYWNrQmVmb3JlKFwidXBkYXRlZFwiLGksaSksbi50aW1lKFwibW9ycGhkb21cIixmdW5jdGlvbigpe2sobyx5LHtjaGlsZHJlbk9ubHk6bnVsbD09PW8uZ2V0QXR0cmlidXRlKE0pLGdldE5vZGVLZXk6ZnVuY3Rpb24oZSl7cmV0dXJuIGRlLmlzUGh4RGVzdHJveWVkKGUpP251bGw6ZS5pZH0sb25CZWZvcmVOb2RlQWRkZWQ6ZnVuY3Rpb24odCl7cmV0dXJuIGRlLmRpc2NhcmRFcnJvcihvLHQsZCksZS50cmFja0JlZm9yZShcImFkZGVkXCIsdCksdH0sb25Ob2RlQWRkZWQ6ZnVuY3Rpb24obil7ZGUuaXNOb3dUcmlnZ2VyRm9ybUV4dGVybmFsKG4sZikmJihtPW4pLGRlLmlzUGh4Q2hpbGQobikmJnQub3duc0VsZW1lbnQobikmJmUudHJhY2tBZnRlcihcInBoeENoaWxkQWRkZWRcIixuKSx2LnB1c2gobil9LG9uTm9kZURpc2NhcmRlZDpmdW5jdGlvbih0KXtkZS5pc1BoeENoaWxkKHQpJiZuLmRlc3Ryb3lWaWV3QnlFbCh0KSxlLnRyYWNrQWZ0ZXIoXCJkaXNjYXJkZWRcIix0KX0sb25CZWZvcmVOb2RlRGlzY2FyZGVkOmZ1bmN0aW9uKHQpe3JldHVybiEoIXQuZ2V0QXR0cmlidXRlfHxudWxsPT09dC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBoeC1yZW1vdmVcIikpfHwobnVsbD09PXQucGFyZW50Tm9kZXx8IWRlLmlzUGh4VXBkYXRlKHQucGFyZW50Tm9kZSxsLFtcImFwcGVuZFwiLFwicHJlcGVuZFwiXSl8fCF0LmlkKSYmIWUuc2tpcENJRFNpYmxpbmcodCl9LG9uRWxVcGRhdGVkOmZ1bmN0aW9uKGUpe2RlLmlzTm93VHJpZ2dlckZvcm1FeHRlcm5hbChlLGYpJiYobT1lKSxwLnB1c2goZSl9LG9uQmVmb3JlRWxVcGRhdGVkOmZ1bmN0aW9uKHQsbil7aWYoZGUuY2xlYW5DaGlsZE5vZGVzKG4sbCksZS5za2lwQ0lEU2libGluZyhuKSlyZXR1cm4hMTtpZihkZS5pc0lnbm9yZWQodCxsKSlyZXR1cm4gZS50cmFja0JlZm9yZShcInVwZGF0ZWRcIix0LG4pLGRlLm1lcmdlQXR0cnModCxuLHtpc0lnbm9yZWQ6ITB9KSxwLnB1c2godCksITE7aWYoXCJudW1iZXJcIj09PXQudHlwZSYmdC52YWxpZGl0eSYmdC52YWxpZGl0eS5iYWRJbnB1dClyZXR1cm4hMTtpZighZGUuc3luY1BlbmRpbmdSZWYodCxuLGgpKXJldHVybiBkZS5pc1VwbG9hZElucHV0KHQpJiYoZS50cmFja0JlZm9yZShcInVwZGF0ZWRcIix0LG4pLHAucHVzaCh0KSksITE7aWYoZGUuaXNQaHhDaGlsZChuKSl7dmFyIGk9dC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBoeC1zZXNzaW9uXCIpO3JldHVybiBkZS5tZXJnZUF0dHJzKHQsbix7ZXhjbHVkZTpbXCJkYXRhLXBoeC1zdGF0aWNcIl19KSxcIlwiIT09aSYmdC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXBoeC1zZXNzaW9uXCIsaSksdC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXBoeC1yb290LWlkXCIsZS5yb290SUQpLCExfXJldHVybiBkZS5jb3B5UHJpdmF0ZXMobix0KSxkZS5kaXNjYXJkRXJyb3IobyxuLGQpLGEmJnQuaXNTYW1lTm9kZShhKSYmZGUuaXNGb3JtSW5wdXQodCkmJiFlLmZvcmNlRm9jdXNlZFNlbGVjdFVwZGF0ZSh0LG4pPyhlLnRyYWNrQmVmb3JlKFwidXBkYXRlZFwiLHQsbiksZGUubWVyZ2VGb2N1c2VkSW5wdXQodCxuKSxkZS5zeW5jQXR0cnNUb1Byb3BzKHQpLHAucHVzaCh0KSwhMSk6KGRlLmlzUGh4VXBkYXRlKG4sbCxbXCJhcHBlbmRcIixcInByZXBlbmRcIl0pJiZnLnB1c2gobmV3IGhlKHQsbixuLmdldEF0dHJpYnV0ZShsKSkpLGRlLnN5bmNBdHRyc1RvUHJvcHMobiksZS50cmFja0JlZm9yZShcInVwZGF0ZWRcIix0LG4pLCEwKX19KX0pLG4uaXNEZWJ1Z0VuYWJsZWQoKSYmZnVuY3Rpb24oKXtmb3IodmFyIGU9bmV3IFNldCx0PWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIqW2lkXVwiKSxuPTAsaT10Lmxlbmd0aDtuPGk7bisrKWUuaGFzKHRbbl0uaWQpP2NvbnNvbGUuZXJyb3IoXCJNdWx0aXBsZSBJRHMgZGV0ZWN0ZWQ6IFwiLmNvbmNhdCh0W25dLmlkLFwiLiBFbnN1cmUgdW5pcXVlIGVsZW1lbnQgaWRzLlwiKSk6ZS5hZGQodFtuXS5pZCl9KCksZy5sZW5ndGg+MCYmbi50aW1lKFwicG9zdC1tb3JwaCBhcHBlbmQvcHJlcGVuZCByZXN0b3JhdGlvblwiLGZ1bmN0aW9uKCl7Zy5mb3JFYWNoKGZ1bmN0aW9uKGUpe3JldHVybiBlLnBlcmZvcm0oKX0pfSksbi5zaWxlbmNlRXZlbnRzKGZ1bmN0aW9uKCl7cmV0dXJuIGRlLnJlc3RvcmVGb2N1cyhhLHMsYyl9KSxkZS5kaXNwYXRjaEV2ZW50KGRvY3VtZW50LFwicGh4OnVwZGF0ZVwiKSx2LmZvckVhY2goZnVuY3Rpb24odCl7cmV0dXJuIGUudHJhY2tBZnRlcihcImFkZGVkXCIsdCl9KSxwLmZvckVhY2goZnVuY3Rpb24odCl7cmV0dXJuIGUudHJhY2tBZnRlcihcInVwZGF0ZWRcIix0KX0pLG0mJihuLmRpc2Nvbm5lY3QoKSxtLnN1Ym1pdCgpKSwhMH19fSx7a2V5OlwiZm9yY2VGb2N1c2VkU2VsZWN0VXBkYXRlXCIsdmFsdWU6ZnVuY3Rpb24oZSx0KXt2YXIgbj1bXCJzZWxlY3RcIixcInNlbGVjdC1vbmVcIixcInNlbGVjdC1tdWx0aXBsZVwiXS5maW5kKGZ1bmN0aW9uKHQpe3JldHVybiB0PT09ZS50eXBlfSk7cmV0dXJuITA9PT1lLm11bHRpcGxlfHxuJiZlLmlubmVySFRNTCE9dC5pbm5lckhUTUx9fSx7a2V5OlwiaXNDSURQYXRjaFwiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuY2lkUGF0Y2h9fSx7a2V5Olwic2tpcENJRFNpYmxpbmdcIix2YWx1ZTpmdW5jdGlvbihlKXtyZXR1cm4gZS5ub2RlVHlwZT09PU5vZGUuRUxFTUVOVF9OT0RFJiZudWxsIT09ZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBoeC1za2lwXCIpfX0se2tleTpcInRhcmdldENJRENvbnRhaW5lclwiLHZhbHVlOmZ1bmN0aW9uKGUpe2lmKHRoaXMuaXNDSURQYXRjaCgpKXt2YXIgdD1iKGRlLmZpbmRDb21wb25lbnROb2RlTGlzdCh0aGlzLmNvbnRhaW5lcix0aGlzLnRhcmdldENJRCkpLG49dFswXTtyZXR1cm4gMD09PXQuc2xpY2UoMSkubGVuZ3RoJiYxPT09ZGUuY2hpbGROb2RlTGVuZ3RoKGUpP246biYmbi5wYXJlbnROb2RlfX19LHtrZXk6XCJidWlsZERpZmZIVE1MXCIsdmFsdWU6ZnVuY3Rpb24oZSx0LG4saSl7dmFyIHI9dGhpcyxvPXRoaXMuaXNDSURQYXRjaCgpLGE9byYmaS5nZXRBdHRyaWJ1dGUoTSk9PT10aGlzLnRhcmdldENJRC50b1N0cmluZygpO2lmKCFvfHxhKXJldHVybiB0O3ZhciB1PW51bGwscz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIik7dT1kZS5jbG9uZU5vZGUoaSk7dmFyIGM9YihkZS5maW5kQ29tcG9uZW50Tm9kZUxpc3QodSx0aGlzLnRhcmdldENJRCkpLGw9Y1swXSxkPWMuc2xpY2UoMSk7cmV0dXJuIHMuaW5uZXJIVE1MPXQsZC5mb3JFYWNoKGZ1bmN0aW9uKGUpe3JldHVybiBlLnJlbW92ZSgpfSksQXJyYXkuZnJvbSh1LmNoaWxkTm9kZXMpLmZvckVhY2goZnVuY3Rpb24oZSl7ZS5pZCYmZS5ub2RlVHlwZT09PU5vZGUuRUxFTUVOVF9OT0RFJiZlLmdldEF0dHJpYnV0ZShNKSE9PXIudGFyZ2V0Q0lELnRvU3RyaW5nKCkmJihlLnNldEF0dHJpYnV0ZShcImRhdGEtcGh4LXNraXBcIixcIlwiKSxlLmlubmVySFRNTD1cIlwiKX0pLEFycmF5LmZyb20ocy5jb250ZW50LmNoaWxkTm9kZXMpLmZvckVhY2goZnVuY3Rpb24oZSl7cmV0dXJuIHUuaW5zZXJ0QmVmb3JlKGUsbCl9KSxsLnJlbW92ZSgpLHUub3V0ZXJIVE1MfX1dKSxlfSgpLHZlPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gZSh0LG4saSxyLG8pe3ZhciBhPXRoaXM7RCh0aGlzLGUpLHRoaXMubGl2ZVNvY2tldD1uLHRoaXMuZmxhc2g9byx0aGlzLnBhcmVudD1pLHRoaXMucm9vdD1pP2kucm9vdDp0aGlzLHRoaXMuZWw9dCx0aGlzLmlkPXRoaXMuZWwuaWQsdGhpcy52aWV3PXRoaXMuZWwuZ2V0QXR0cmlidXRlKGopLHRoaXMucmVmPTAsdGhpcy5jaGlsZEpvaW5zPTAsdGhpcy5sb2FkZXJUaW1lcj1udWxsLHRoaXMucGVuZGluZ0RpZmZzPVtdLHRoaXMucHJ1bmluZ0NJRHM9W10sdGhpcy5ocmVmPXIsdGhpcy5qb2luQ291bnQ9dGhpcy5wYXJlbnQ/dGhpcy5wYXJlbnQuam9pbkNvdW50LTE6MCx0aGlzLmpvaW5QZW5kaW5nPSEwLHRoaXMuZGVzdHJveWVkPSExLHRoaXMuam9pbkNhbGxiYWNrPWZ1bmN0aW9uKCl7fSx0aGlzLnN0b3BDYWxsYmFjaz1mdW5jdGlvbigpe30sdGhpcy5wZW5kaW5nSm9pbk9wcz10aGlzLnBhcmVudD9udWxsOltdLHRoaXMudmlld0hvb2tzPXt9LHRoaXMudXBsb2FkZXJzPXt9LHRoaXMuZm9ybVN1Ym1pdHM9W10sdGhpcy5jaGlsZHJlbj10aGlzLnBhcmVudD9udWxsOnt9LHRoaXMucm9vdC5jaGlsZHJlblt0aGlzLmlkXT17fSx0aGlzLmNoYW5uZWw9dGhpcy5saXZlU29ja2V0LmNoYW5uZWwoXCJsdjpcIi5jb25jYXQodGhpcy5pZCksZnVuY3Rpb24oKXtyZXR1cm57dXJsOmEuaHJlZixwYXJhbXM6YS5jb25uZWN0UGFyYW1zKCksc2Vzc2lvbjphLmdldFNlc3Npb24oKSxzdGF0aWM6YS5nZXRTdGF0aWMoKSxmbGFzaDphLmZsYXNofX0pLHRoaXMuc2hvd0xvYWRlcih0aGlzLmxpdmVTb2NrZXQubG9hZGVyVGltZW91dCksdGhpcy5iaW5kQ2hhbm5lbCgpfXJldHVybiBOKGUsW3trZXk6XCJpc01haW5cIix2YWx1ZTpmdW5jdGlvbigpe3JldHVybiB0aGlzLmxpdmVTb2NrZXQubWFpbj09PXRoaXN9fSx7a2V5OlwiY29ubmVjdFBhcmFtc1wiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcy5saXZlU29ja2V0LnBhcmFtcyh0aGlzLnZpZXcpLHQ9ZGUuYWxsKGRvY3VtZW50LFwiW1wiLmNvbmNhdCh0aGlzLmJpbmRpbmcoXCJ0cmFjay1zdGF0aWNcIiksXCJdXCIpKS5tYXAoZnVuY3Rpb24oZSl7cmV0dXJuIGUuc3JjfHxlLmhyZWZ9KS5maWx0ZXIoZnVuY3Rpb24oZSl7cmV0dXJuXCJzdHJpbmdcIj09dHlwZW9mIGV9KTtyZXR1cm4gdC5sZW5ndGg+MCYmKGUuX3RyYWNrX3N0YXRpYz10KSxlLl9tb3VudHM9dGhpcy5qb2luQ291bnQsZX19LHtrZXk6XCJuYW1lXCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy52aWV3fX0se2tleTpcImlzQ29ubmVjdGVkXCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5jaGFubmVsLmNhblB1c2goKX19LHtrZXk6XCJnZXRTZXNzaW9uXCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5lbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBoeC1zZXNzaW9uXCIpfX0se2tleTpcImdldFN0YXRpY1wiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcy5lbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBoeC1zdGF0aWNcIik7cmV0dXJuXCJcIj09PWU/bnVsbDplfX0se2tleTpcImRlc3Ryb3lcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPXRoaXMsdD1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXT9hcmd1bWVudHNbMF06ZnVuY3Rpb24oKXt9O3RoaXMuZGVzdHJveUFsbENoaWxkcmVuKCksdGhpcy5kZXN0cm95ZWQ9ITAsZGVsZXRlIHRoaXMucm9vdC5jaGlsZHJlblt0aGlzLmlkXSx0aGlzLnBhcmVudCYmZGVsZXRlIHRoaXMucm9vdC5jaGlsZHJlblt0aGlzLnBhcmVudC5pZF1bdGhpcy5pZF0sY2xlYXJUaW1lb3V0KHRoaXMubG9hZGVyVGltZXIpO3ZhciBuPWZ1bmN0aW9uKCl7Zm9yKHZhciBuIGluIHQoKSxlLnZpZXdIb29rcyllLmRlc3Ryb3lIb29rKGUudmlld0hvb2tzW25dKX07ZGUubWFya1BoeENoaWxkRGVzdHJveWVkKHRoaXMuZWwpLHRoaXMubG9nKFwiZGVzdHJveWVkXCIsZnVuY3Rpb24oKXtyZXR1cm5bXCJ0aGUgY2hpbGQgaGFzIGJlZW4gcmVtb3ZlZCBmcm9tIHRoZSBwYXJlbnRcIl19KSx0aGlzLmNoYW5uZWwubGVhdmUoKS5yZWNlaXZlKFwib2tcIixuKS5yZWNlaXZlKFwiZXJyb3JcIixuKS5yZWNlaXZlKFwidGltZW91dFwiLG4pfX0se2tleTpcInNldENvbnRhaW5lckNsYXNzZXNcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlO3RoaXMuZWwuY2xhc3NMaXN0LnJlbW92ZShcInBoeC1jb25uZWN0ZWRcIixcInBoeC1kaXNjb25uZWN0ZWRcIixcInBoeC1lcnJvclwiKSwoZT10aGlzLmVsLmNsYXNzTGlzdCkuYWRkLmFwcGx5KGUsYXJndW1lbnRzKX19LHtrZXk6XCJpc0xvYWRpbmdcIix2YWx1ZTpmdW5jdGlvbigpe3JldHVybiB0aGlzLmVsLmNsYXNzTGlzdC5jb250YWlucyhcInBoeC1kaXNjb25uZWN0ZWRcIil9fSx7a2V5Olwic2hvd0xvYWRlclwiLHZhbHVlOmZ1bmN0aW9uKGUpe3ZhciB0PXRoaXM7aWYoY2xlYXJUaW1lb3V0KHRoaXMubG9hZGVyVGltZXIpLGUpdGhpcy5sb2FkZXJUaW1lcj1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7cmV0dXJuIHQuc2hvd0xvYWRlcigpfSxlKTtlbHNle2Zvcih2YXIgbiBpbiB0aGlzLnZpZXdIb29rcyl0aGlzLnZpZXdIb29rc1tuXS5fX2Rpc2Nvbm5lY3RlZCgpO3RoaXMuc2V0Q29udGFpbmVyQ2xhc3NlcyhcInBoeC1kaXNjb25uZWN0ZWRcIil9fX0se2tleTpcImhpZGVMb2FkZXJcIix2YWx1ZTpmdW5jdGlvbigpe2NsZWFyVGltZW91dCh0aGlzLmxvYWRlclRpbWVyKSx0aGlzLnNldENvbnRhaW5lckNsYXNzZXMoXCJwaHgtY29ubmVjdGVkXCIpfX0se2tleTpcInRyaWdnZXJSZWNvbm5lY3RlZFwiLHZhbHVlOmZ1bmN0aW9uKCl7Zm9yKHZhciBlIGluIHRoaXMudmlld0hvb2tzKXRoaXMudmlld0hvb2tzW2VdLl9fcmVjb25uZWN0ZWQoKX19LHtrZXk6XCJsb2dcIix2YWx1ZTpmdW5jdGlvbihlLHQpe3RoaXMubGl2ZVNvY2tldC5sb2codGhpcyxlLHQpfX0se2tleTpcIndpdGhpblRhcmdldHNcIix2YWx1ZTpmdW5jdGlvbihlLHQpe3ZhciBuPXRoaXM7aWYoZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KXJldHVybiB0aGlzLmxpdmVTb2NrZXQub3duZXIoZSxmdW5jdGlvbihuKXtyZXR1cm4gdChuLGUpfSk7aWYoL14oMHxbMS05XVxcZCopJC8udGVzdChlKSl7dmFyIGk9ZGUuZmluZENvbXBvbmVudE5vZGVMaXN0KHRoaXMuZWwsZSk7MD09PWkubGVuZ3RoP0soXCJubyBjb21wb25lbnQgZm91bmQgbWF0Y2hpbmcgcGh4LXRhcmdldCBvZiBcIi5jb25jYXQoZSkpOnQodGhpcyxpWzBdKX1lbHNle3ZhciByPUFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChlKSk7MD09PXIubGVuZ3RoJiZLKCdub3RoaW5nIGZvdW5kIG1hdGNoaW5nIHRoZSBwaHgtdGFyZ2V0IHNlbGVjdG9yIFwiJy5jb25jYXQoZSwnXCInKSksci5mb3JFYWNoKGZ1bmN0aW9uKGUpe3JldHVybiBuLmxpdmVTb2NrZXQub3duZXIoZSxmdW5jdGlvbihuKXtyZXR1cm4gdChuLGUpfSl9KX19fSx7a2V5OlwiYXBwbHlEaWZmXCIsdmFsdWU6ZnVuY3Rpb24oZSx0LG4pe3RoaXMubG9nKGUsZnVuY3Rpb24oKXtyZXR1cm5bXCJcIixHKHQpXX0pO3ZhciBpPXNlLmV4dHJhY3QodCkscj1pLmRpZmYsbz1pLnJlcGx5LGE9aS5ldmVudHMsdT1pLnRpdGxlO3JldHVybiB1JiZkZS5wdXRUaXRsZSh1KSxuKHtkaWZmOnIscmVwbHk6byxldmVudHM6YX0pLG99fSx7a2V5Olwib25Kb2luXCIsdmFsdWU6ZnVuY3Rpb24oZSl7dmFyIHQ9dGhpcyxuPWUucmVuZGVyZWQ7dGhpcy5jaGlsZEpvaW5zPTAsdGhpcy5qb2luUGVuZGluZz0hMCx0aGlzLmZsYXNoPW51bGwsbGUuZHJvcExvY2FsKHRoaXMubGl2ZVNvY2tldC5sb2NhbFN0b3JhZ2UsdGhpcy5uYW1lKCksXCJjb25zZWN1dGl2ZS1yZWxvYWRzXCIpLHRoaXMuYXBwbHlEaWZmKFwibW91bnRcIixuLGZ1bmN0aW9uKG4pe3ZhciBpPW4uZGlmZixyPW4uZXZlbnRzO3QucmVuZGVyZWQ9bmV3IHNlKHQuaWQsaSk7dmFyIG89dC5yZW5kZXJDb250YWluZXIobnVsbCxcImpvaW5cIik7dC5kcm9wUGVuZGluZ1JlZnMoKTt2YXIgYT10LmZvcm1zRm9yUmVjb3Zlcnkobyk7dC5qb2luQ291bnQrKyxhLmxlbmd0aD4wP2EuZm9yRWFjaChmdW5jdGlvbihlLG4pe3QucHVzaEZvcm1SZWNvdmVyeShlLGZ1bmN0aW9uKGUpe249PT1hLmxlbmd0aC0xJiZ0Lm9uSm9pbkNvbXBsZXRlKGUsbyxyKX0pfSk6dC5vbkpvaW5Db21wbGV0ZShlLG8scil9KX19LHtrZXk6XCJkcm9wUGVuZGluZ1JlZnNcIix2YWx1ZTpmdW5jdGlvbigpe2RlLmFsbCh0aGlzLmVsLFwiW1wiLmNvbmNhdChGLFwiXVwiKSxmdW5jdGlvbihlKXtyZXR1cm4gZS5yZW1vdmVBdHRyaWJ1dGUoRil9KX19LHtrZXk6XCJvbkpvaW5Db21wbGV0ZVwiLHZhbHVlOmZ1bmN0aW9uKGUsdCxuKXt2YXIgaT10aGlzLHI9ZS5saXZlX3BhdGNoO2lmKHRoaXMuam9pbkNvdW50PjF8fHRoaXMucGFyZW50JiYhdGhpcy5wYXJlbnQuaXNKb2luUGVuZGluZygpKXJldHVybiB0aGlzLmFwcGx5Sm9pblBhdGNoKHIsdCxuKTswPT09ZGUuZmluZFBoeENoaWxkcmVuSW5GcmFnbWVudCh0LHRoaXMuaWQpLmZpbHRlcihmdW5jdGlvbihlKXt2YXIgdD1lLmlkJiZpLmVsLnF1ZXJ5U2VsZWN0b3IoXCIjXCIuY29uY2F0KGUuaWQpKSxuPXQmJnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1waHgtc3RhdGljXCIpO3JldHVybiBuJiZlLnNldEF0dHJpYnV0ZShcImRhdGEtcGh4LXN0YXRpY1wiLG4pLGkuam9pbkNoaWxkKGUpfSkubGVuZ3RoP3RoaXMucGFyZW50Pyh0aGlzLnJvb3QucGVuZGluZ0pvaW5PcHMucHVzaChbdGhpcyxmdW5jdGlvbigpe3JldHVybiBpLmFwcGx5Sm9pblBhdGNoKHIsdCxuKX1dKSx0aGlzLnBhcmVudC5hY2tKb2luKHRoaXMpKToodGhpcy5vbkFsbENoaWxkSm9pbnNDb21wbGV0ZSgpLHRoaXMuYXBwbHlKb2luUGF0Y2gocix0LG4pKTp0aGlzLnJvb3QucGVuZGluZ0pvaW5PcHMucHVzaChbdGhpcyxmdW5jdGlvbigpe3JldHVybiBpLmFwcGx5Sm9pblBhdGNoKHIsdCxuKX1dKX19LHtrZXk6XCJhdHRhY2hUcnVlRG9jRWxcIix2YWx1ZTpmdW5jdGlvbigpe3RoaXMuZWw9ZGUuYnlJZCh0aGlzLmlkKSx0aGlzLmVsLnNldEF0dHJpYnV0ZShcImRhdGEtcGh4LXJvb3QtaWRcIix0aGlzLnJvb3QuaWQpfX0se2tleTpcImRpc3BhdGNoRXZlbnRzXCIsdmFsdWU6ZnVuY3Rpb24oZSl7ZS5mb3JFYWNoKGZ1bmN0aW9uKGUpe3ZhciB0PUMoZSwyKSxuPXRbMF0saT10WzFdO3dpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChcInBoeDpob29rOlwiLmNvbmNhdChuKSx7ZGV0YWlsOml9KSl9KX19LHtrZXk6XCJhcHBseUpvaW5QYXRjaFwiLHZhbHVlOmZ1bmN0aW9uKGUsdCxuKXt2YXIgaT10aGlzO3RoaXMuYXR0YWNoVHJ1ZURvY0VsKCk7dmFyIHI9bmV3IGZlKHRoaXMsdGhpcy5lbCx0aGlzLmlkLHQsbnVsbCk7aWYoci5tYXJrUHJ1bmFibGVDb250ZW50Rm9yUmVtb3ZhbCgpLHRoaXMucGVyZm9ybVBhdGNoKHIsITEpLHRoaXMuam9pbk5ld0NoaWxkcmVuKCksZGUuYWxsKHRoaXMuZWwsXCJbXCIuY29uY2F0KHRoaXMuYmluZGluZyhcImhvb2tcIiksXCJdLCBbZGF0YS1waHgtXCIpLmNvbmNhdChcImhvb2tcIixcIl1cIiksZnVuY3Rpb24oZSl7dmFyIHQ9aS5hZGRIb29rKGUpO3QmJnQuX19tb3VudGVkKCl9KSx0aGlzLmpvaW5QZW5kaW5nPSExLHRoaXMuZGlzcGF0Y2hFdmVudHMobiksdGhpcy5hcHBseVBlbmRpbmdVcGRhdGVzKCksZSl7dmFyIG89ZS5raW5kLGE9ZS50bzt0aGlzLmxpdmVTb2NrZXQuaGlzdG9yeVBhdGNoKGEsbyl9dGhpcy5oaWRlTG9hZGVyKCksdGhpcy5qb2luQ291bnQ+MSYmdGhpcy50cmlnZ2VyUmVjb25uZWN0ZWQoKSx0aGlzLnN0b3BDYWxsYmFjaygpfX0se2tleTpcInRyaWdnZXJCZWZvcmVVcGRhdGVIb29rXCIsdmFsdWU6ZnVuY3Rpb24oZSx0KXt0aGlzLmxpdmVTb2NrZXQudHJpZ2dlckRPTShcIm9uQmVmb3JlRWxVcGRhdGVkXCIsW2UsdF0pO3ZhciBuPXRoaXMuZ2V0SG9vayhlKSxpPW4mJmRlLmlzSWdub3JlZChlLHRoaXMuYmluZGluZyhcInVwZGF0ZVwiKSk7aWYobiYmIWUuaXNFcXVhbE5vZGUodCkmJighaXx8IWZ1bmN0aW9uKGUsdCl7cmV0dXJuIEpTT04uc3RyaW5naWZ5KGUpPT09SlNPTi5zdHJpbmdpZnkodCl9KGUuZGF0YXNldCx0LmRhdGFzZXQpKSlyZXR1cm4gbi5fX2JlZm9yZVVwZGF0ZSgpLG59fSx7a2V5OlwicGVyZm9ybVBhdGNoXCIsdmFsdWU6ZnVuY3Rpb24oZSx0KXt2YXIgbj10aGlzLGk9W10scj0hMSxvPW5ldyBTZXQ7cmV0dXJuIGUuYWZ0ZXIoXCJhZGRlZFwiLGZ1bmN0aW9uKGUpe24ubGl2ZVNvY2tldC50cmlnZ2VyRE9NKFwib25Ob2RlQWRkZWRcIixbZV0pO3ZhciB0PW4uYWRkSG9vayhlKTt0JiZ0Ll9fbW91bnRlZCgpfSksZS5hZnRlcihcInBoeENoaWxkQWRkZWRcIixmdW5jdGlvbihlKXtyZXR1cm4gcj0hMH0pLGUuYmVmb3JlKFwidXBkYXRlZFwiLGZ1bmN0aW9uKGUsdCl7bi50cmlnZ2VyQmVmb3JlVXBkYXRlSG9vayhlLHQpJiZvLmFkZChlLmlkKX0pLGUuYWZ0ZXIoXCJ1cGRhdGVkXCIsZnVuY3Rpb24oZSl7by5oYXMoZS5pZCkmJm4uZ2V0SG9vayhlKS5fX3VwZGF0ZWQoKX0pLGUuYWZ0ZXIoXCJkaXNjYXJkZWRcIixmdW5jdGlvbihlKXt2YXIgdD1uLmNvbXBvbmVudElEKGUpO1wibnVtYmVyXCI9PXR5cGVvZiB0JiYtMT09PWkuaW5kZXhPZih0KSYmaS5wdXNoKHQpO3ZhciByPW4uZ2V0SG9vayhlKTtyJiZuLmRlc3Ryb3lIb29rKHIpfSksZS5wZXJmb3JtKCksdCYmdGhpcy5tYXliZVB1c2hDb21wb25lbnRzRGVzdHJveWVkKGkpLHJ9fSx7a2V5Olwiam9pbk5ld0NoaWxkcmVuXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgZT10aGlzO2RlLmZpbmRQaHhDaGlsZHJlbih0aGlzLmVsLHRoaXMuaWQpLmZvckVhY2goZnVuY3Rpb24odCl7cmV0dXJuIGUuam9pbkNoaWxkKHQpfSl9fSx7a2V5OlwiZ2V0Q2hpbGRCeUlkXCIsdmFsdWU6ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucm9vdC5jaGlsZHJlblt0aGlzLmlkXVtlXX19LHtrZXk6XCJnZXREZXNjZW5kZW50QnlFbFwiLHZhbHVlOmZ1bmN0aW9uKGUpe3JldHVybiBlLmlkPT09dGhpcy5pZD90aGlzOnRoaXMuY2hpbGRyZW5bZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBoeC1wYXJlbnQtaWRcIildW2UuaWRdfX0se2tleTpcImRlc3Ryb3lEZXNjZW5kZW50XCIsdmFsdWU6ZnVuY3Rpb24oZSl7Zm9yKHZhciB0IGluIHRoaXMucm9vdC5jaGlsZHJlbilmb3IodmFyIG4gaW4gdGhpcy5yb290LmNoaWxkcmVuW3RdKWlmKG49PT1lKXJldHVybiB0aGlzLnJvb3QuY2hpbGRyZW5bdF1bbl0uZGVzdHJveSgpfX0se2tleTpcImpvaW5DaGlsZFwiLHZhbHVlOmZ1bmN0aW9uKHQpe2lmKCF0aGlzLmdldENoaWxkQnlJZCh0LmlkKSl7dmFyIG49bmV3IGUodCx0aGlzLmxpdmVTb2NrZXQsdGhpcyk7cmV0dXJuIHRoaXMucm9vdC5jaGlsZHJlblt0aGlzLmlkXVtuLmlkXT1uLG4uam9pbigpLHRoaXMuY2hpbGRKb2lucysrLCEwfX19LHtrZXk6XCJpc0pvaW5QZW5kaW5nXCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5qb2luUGVuZGluZ319LHtrZXk6XCJhY2tKb2luXCIsdmFsdWU6ZnVuY3Rpb24oZSl7dGhpcy5jaGlsZEpvaW5zLS0sMD09PXRoaXMuY2hpbGRKb2lucyYmKHRoaXMucGFyZW50P3RoaXMucGFyZW50LmFja0pvaW4odGhpcyk6dGhpcy5vbkFsbENoaWxkSm9pbnNDb21wbGV0ZSgpKX19LHtrZXk6XCJvbkFsbENoaWxkSm9pbnNDb21wbGV0ZVwiLHZhbHVlOmZ1bmN0aW9uKCl7dGhpcy5qb2luQ2FsbGJhY2soKSx0aGlzLnBlbmRpbmdKb2luT3BzLmZvckVhY2goZnVuY3Rpb24oZSl7dmFyIHQ9QyhlLDIpLG49dFswXSxpPXRbMV07bi5pc0Rlc3Ryb3llZCgpfHxpKCl9KSx0aGlzLnBlbmRpbmdKb2luT3BzPVtdfX0se2tleTpcInVwZGF0ZVwiLHZhbHVlOmZ1bmN0aW9uKGUsdCl7dmFyIG49dGhpcztpZih0aGlzLmlzSm9pblBlbmRpbmcoKXx8dGhpcy5saXZlU29ja2V0Lmhhc1BlbmRpbmdMaW5rKCkpcmV0dXJuIHRoaXMucGVuZGluZ0RpZmZzLnB1c2goe2RpZmY6ZSxldmVudHM6dH0pO3RoaXMucmVuZGVyZWQubWVyZ2VEaWZmKGUpO3ZhciBpPSExO3RoaXMucmVuZGVyZWQuaXNDb21wb25lbnRPbmx5RGlmZihlKT90aGlzLmxpdmVTb2NrZXQudGltZShcImNvbXBvbmVudCBwYXRjaCBjb21wbGV0ZVwiLGZ1bmN0aW9uKCl7ZGUuZmluZFBhcmVudENJRHMobi5lbCxuLnJlbmRlcmVkLmNvbXBvbmVudENJRHMoZSkpLmZvckVhY2goZnVuY3Rpb24odCl7bi5jb21wb25lbnRQYXRjaChuLnJlbmRlcmVkLmdldENvbXBvbmVudChlLHQpLHQpJiYoaT0hMCl9KX0pOlooZSl8fHRoaXMubGl2ZVNvY2tldC50aW1lKFwiZnVsbCBwYXRjaCBjb21wbGV0ZVwiLGZ1bmN0aW9uKCl7dmFyIHQ9bi5yZW5kZXJDb250YWluZXIoZSxcInVwZGF0ZVwiKSxyPW5ldyBmZShuLG4uZWwsbi5pZCx0LG51bGwpO2k9bi5wZXJmb3JtUGF0Y2gociwhMCl9KSx0aGlzLmRpc3BhdGNoRXZlbnRzKHQpLGkmJnRoaXMuam9pbk5ld0NoaWxkcmVuKCl9fSx7a2V5OlwicmVuZGVyQ29udGFpbmVyXCIsdmFsdWU6ZnVuY3Rpb24oZSx0KXt2YXIgbj10aGlzO3JldHVybiB0aGlzLmxpdmVTb2NrZXQudGltZShcInRvU3RyaW5nIGRpZmYgKFwiLmNvbmNhdCh0LFwiKVwiKSxmdW5jdGlvbigpe3ZhciB0PW4uZWwudGFnTmFtZSxpPWU/bi5yZW5kZXJlZC5jb21wb25lbnRDSURzKGUpLmNvbmNhdChuLnBydW5pbmdDSURzKTpudWxsLHI9bi5yZW5kZXJlZC50b1N0cmluZyhpKTtyZXR1cm5cIjxcIi5jb25jYXQodCxcIj5cIikuY29uY2F0KHIsXCI8L1wiKS5jb25jYXQodCxcIj5cIil9KX19LHtrZXk6XCJjb21wb25lbnRQYXRjaFwiLHZhbHVlOmZ1bmN0aW9uKGUsdCl7aWYoWihlKSlyZXR1cm4hMTt2YXIgbj10aGlzLnJlbmRlcmVkLmNvbXBvbmVudFRvU3RyaW5nKHQpLGk9bmV3IGZlKHRoaXMsdGhpcy5lbCx0aGlzLmlkLG4sdCk7cmV0dXJuIHRoaXMucGVyZm9ybVBhdGNoKGksITApfX0se2tleTpcImdldEhvb2tcIix2YWx1ZTpmdW5jdGlvbihlKXtyZXR1cm4gdGhpcy52aWV3SG9va3NbZ2UuZWxlbWVudElEKGUpXX19LHtrZXk6XCJhZGRIb29rXCIsdmFsdWU6ZnVuY3Rpb24oZSl7aWYoIWdlLmVsZW1lbnRJRChlKSYmZS5nZXRBdHRyaWJ1dGUpe3ZhciB0PWUuZ2V0QXR0cmlidXRlKFwiZGF0YS1waHgtXCIuY29uY2F0KFwiaG9va1wiKSl8fGUuZ2V0QXR0cmlidXRlKHRoaXMuYmluZGluZyhcImhvb2tcIikpO2lmKCF0fHx0aGlzLm93bnNFbGVtZW50KGUpKXt2YXIgbj10aGlzLmxpdmVTb2NrZXQuZ2V0SG9va0NhbGxiYWNrcyh0KTtpZihuKXtlLmlkfHxLKCdubyBET00gSUQgZm9yIGhvb2sgXCInLmNvbmNhdCh0LCdcIi4gSG9va3MgcmVxdWlyZSBhIHVuaXF1ZSBJRCBvbiBlYWNoIGVsZW1lbnQuJyksZSk7dmFyIGk9bmV3IGdlKHRoaXMsZSxuKTtyZXR1cm4gdGhpcy52aWV3SG9va3NbZ2UuZWxlbWVudElEKGkuZWwpXT1pLGl9bnVsbCE9PXQmJksoJ3Vua25vd24gaG9vayBmb3VuZCBmb3IgXCInLmNvbmNhdCh0LCdcIicpLGUpfX19fSx7a2V5OlwiZGVzdHJveUhvb2tcIix2YWx1ZTpmdW5jdGlvbihlKXtlLl9fZGVzdHJveWVkKCksZS5fX2NsZWFudXBfXygpLGRlbGV0ZSB0aGlzLnZpZXdIb29rc1tnZS5lbGVtZW50SUQoZS5lbCldfX0se2tleTpcImFwcGx5UGVuZGluZ1VwZGF0ZXNcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPXRoaXM7dGhpcy5wZW5kaW5nRGlmZnMuZm9yRWFjaChmdW5jdGlvbih0KXt2YXIgbj10LmRpZmYsaT10LmV2ZW50cztyZXR1cm4gZS51cGRhdGUobixpKX0pLHRoaXMucGVuZGluZ0RpZmZzPVtdfX0se2tleTpcIm9uQ2hhbm5lbFwiLHZhbHVlOmZ1bmN0aW9uKGUsdCl7dmFyIG49dGhpczt0aGlzLmxpdmVTb2NrZXQub25DaGFubmVsKHRoaXMuY2hhbm5lbCxlLGZ1bmN0aW9uKGUpe24uaXNKb2luUGVuZGluZygpP24ucm9vdC5wZW5kaW5nSm9pbk9wcy5wdXNoKFtuLGZ1bmN0aW9uKCl7cmV0dXJuIHQoZSl9XSk6dChlKX0pfX0se2tleTpcImJpbmRDaGFubmVsXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgZT10aGlzO3RoaXMubGl2ZVNvY2tldC5vbkNoYW5uZWwodGhpcy5jaGFubmVsLFwiZGlmZlwiLGZ1bmN0aW9uKHQpe2UuYXBwbHlEaWZmKFwidXBkYXRlXCIsdCxmdW5jdGlvbih0KXt2YXIgbj10LmRpZmYsaT10LmV2ZW50cztyZXR1cm4gZS51cGRhdGUobixpKX0pfSksdGhpcy5vbkNoYW5uZWwoXCJyZWRpcmVjdFwiLGZ1bmN0aW9uKHQpe3ZhciBuPXQudG8saT10LmZsYXNoO3JldHVybiBlLm9uUmVkaXJlY3Qoe3RvOm4sZmxhc2g6aX0pfSksdGhpcy5vbkNoYW5uZWwoXCJsaXZlX3BhdGNoXCIsZnVuY3Rpb24odCl7cmV0dXJuIGUub25MaXZlUGF0Y2godCl9KSx0aGlzLm9uQ2hhbm5lbChcImxpdmVfcmVkaXJlY3RcIixmdW5jdGlvbih0KXtyZXR1cm4gZS5vbkxpdmVSZWRpcmVjdCh0KX0pLHRoaXMuY2hhbm5lbC5vbkVycm9yKGZ1bmN0aW9uKHQpe3JldHVybiBlLm9uRXJyb3IodCl9KSx0aGlzLmNoYW5uZWwub25DbG9zZShmdW5jdGlvbih0KXtyZXR1cm4gZS5vbkNsb3NlKHQpfSl9fSx7a2V5OlwiZGVzdHJveUFsbENoaWxkcmVuXCIsdmFsdWU6ZnVuY3Rpb24oKXtmb3IodmFyIGUgaW4gdGhpcy5yb290LmNoaWxkcmVuW3RoaXMuaWRdKXRoaXMuZ2V0Q2hpbGRCeUlkKGUpLmRlc3Ryb3koKX19LHtrZXk6XCJvbkxpdmVSZWRpcmVjdFwiLHZhbHVlOmZ1bmN0aW9uKGUpe3ZhciB0PWUudG8sbj1lLmtpbmQsaT1lLmZsYXNoLHI9dGhpcy5leHBhbmRVUkwodCk7dGhpcy5saXZlU29ja2V0Lmhpc3RvcnlSZWRpcmVjdChyLG4saSl9fSx7a2V5Olwib25MaXZlUGF0Y2hcIix2YWx1ZTpmdW5jdGlvbihlKXt2YXIgdD1lLnRvLG49ZS5raW5kO3RoaXMuaHJlZj10aGlzLmV4cGFuZFVSTCh0KSx0aGlzLmxpdmVTb2NrZXQuaGlzdG9yeVBhdGNoKHQsbil9fSx7a2V5OlwiZXhwYW5kVVJMXCIsdmFsdWU6ZnVuY3Rpb24oZSl7cmV0dXJuIGUuc3RhcnRzV2l0aChcIi9cIik/XCJcIi5jb25jYXQod2luZG93LmxvY2F0aW9uLnByb3RvY29sLFwiLy9cIikuY29uY2F0KHdpbmRvdy5sb2NhdGlvbi5ob3N0KS5jb25jYXQoZSk6ZX19LHtrZXk6XCJvblJlZGlyZWN0XCIsdmFsdWU6ZnVuY3Rpb24oZSl7dmFyIHQ9ZS50byxuPWUuZmxhc2g7dGhpcy5saXZlU29ja2V0LnJlZGlyZWN0KHQsbil9fSx7a2V5OlwiaXNEZXN0cm95ZWRcIix2YWx1ZTpmdW5jdGlvbigpe3JldHVybiB0aGlzLmRlc3Ryb3llZH19LHtrZXk6XCJqb2luXCIsdmFsdWU6ZnVuY3Rpb24oZSl7dmFyIHQ9dGhpczt0aGlzLnBhcmVudHx8KHRoaXMuc3RvcENhbGxiYWNrPXRoaXMubGl2ZVNvY2tldC53aXRoUGFnZUxvYWRpbmcoe3RvOnRoaXMuaHJlZixraW5kOlwiaW5pdGlhbFwifSkpLHRoaXMuam9pbkNhbGxiYWNrPWZ1bmN0aW9uKCl7cmV0dXJuIGUmJmUodCx0LmpvaW5Db3VudCl9LHRoaXMubGl2ZVNvY2tldC53cmFwUHVzaCh0aGlzLHt0aW1lb3V0OiExfSxmdW5jdGlvbigpe3JldHVybiB0LmNoYW5uZWwuam9pbigpLnJlY2VpdmUoXCJva1wiLGZ1bmN0aW9uKGUpe3JldHVybiB0Lm9uSm9pbihlKX0pLnJlY2VpdmUoXCJlcnJvclwiLGZ1bmN0aW9uKGUpe3JldHVybiB0Lm9uSm9pbkVycm9yKGUpfSkucmVjZWl2ZShcInRpbWVvdXRcIixmdW5jdGlvbigpe3JldHVybiB0Lm9uSm9pbkVycm9yKHtyZWFzb246XCJ0aW1lb3V0XCJ9KX0pfSl9fSx7a2V5Olwib25Kb2luRXJyb3JcIix2YWx1ZTpmdW5jdGlvbihlKXtyZXR1cm4oZS5yZWRpcmVjdHx8ZS5saXZlX3JlZGlyZWN0KSYmKHRoaXMuam9pblBlbmRpbmc9ITEsdGhpcy5jaGFubmVsLmxlYXZlKCkpLGUucmVkaXJlY3Q/dGhpcy5vblJlZGlyZWN0KGUucmVkaXJlY3QpOmUubGl2ZV9yZWRpcmVjdD90aGlzLm9uTGl2ZVJlZGlyZWN0KGUubGl2ZV9yZWRpcmVjdCk6KHRoaXMubG9nKFwiZXJyb3JcIixmdW5jdGlvbigpe3JldHVybltcInVuYWJsZSB0byBqb2luXCIsZV19KSx0aGlzLmxpdmVTb2NrZXQucmVsb2FkV2l0aEppdHRlcih0aGlzKSl9fSx7a2V5Olwib25DbG9zZVwiLHZhbHVlOmZ1bmN0aW9uKGUpe2lmKCF0aGlzLmlzRGVzdHJveWVkKCkpe2lmKHRoaXMuaXNKb2luUGVuZGluZygpJiZcImhpZGRlblwiIT09ZG9jdW1lbnQudmlzaWJpbGl0eVN0YXRlfHx0aGlzLmxpdmVTb2NrZXQuaGFzUGVuZGluZ0xpbmsoKSYmXCJsZWF2ZVwiIT09ZSlyZXR1cm4gdGhpcy5saXZlU29ja2V0LnJlbG9hZFdpdGhKaXR0ZXIodGhpcyk7dGhpcy5kZXN0cm95QWxsQ2hpbGRyZW4oKSx0aGlzLmxpdmVTb2NrZXQuZHJvcEFjdGl2ZUVsZW1lbnQodGhpcyksZG9jdW1lbnQuYWN0aXZlRWxlbWVudCYmZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5ibHVyKCksdGhpcy5saXZlU29ja2V0LmlzVW5sb2FkZWQoKSYmdGhpcy5zaG93TG9hZGVyKDIwMCl9fX0se2tleTpcIm9uRXJyb3JcIix2YWx1ZTpmdW5jdGlvbihlKXt0aGlzLm9uQ2xvc2UoZSksdGhpcy5sb2coXCJlcnJvclwiLGZ1bmN0aW9uKCl7cmV0dXJuW1widmlldyBjcmFzaGVkXCIsZV19KSx0aGlzLmxpdmVTb2NrZXQuaXNVbmxvYWRlZCgpfHx0aGlzLmRpc3BsYXlFcnJvcigpfX0se2tleTpcImRpc3BsYXlFcnJvclwiLHZhbHVlOmZ1bmN0aW9uKCl7dGhpcy5pc01haW4oKSYmZGUuZGlzcGF0Y2hFdmVudCh3aW5kb3csXCJwaHg6cGFnZS1sb2FkaW5nLXN0YXJ0XCIse3RvOnRoaXMuaHJlZixraW5kOlwiZXJyb3JcIn0pLHRoaXMuc2hvd0xvYWRlcigpLHRoaXMuc2V0Q29udGFpbmVyQ2xhc3NlcyhcInBoeC1kaXNjb25uZWN0ZWRcIixcInBoeC1lcnJvclwiKX19LHtrZXk6XCJwdXNoV2l0aFJlcGx5XCIsdmFsdWU6ZnVuY3Rpb24oZSx0LG4pe3ZhciBpPXRoaXMscj1hcmd1bWVudHMubGVuZ3RoPjMmJnZvaWQgMCE9PWFyZ3VtZW50c1szXT9hcmd1bWVudHNbM106ZnVuY3Rpb24oKXt9O2lmKHRoaXMuaXNDb25uZWN0ZWQoKSl7dmFyIG89QyhlP2UoKTpbbnVsbCxbXV0sMiksYT1vWzBdLHU9QyhvWzFdLDEpWzBdLHM9ZnVuY3Rpb24oKXt9O3JldHVybiB1JiZudWxsIT09dS5nZXRBdHRyaWJ1dGUodGhpcy5iaW5kaW5nKFwicGFnZS1sb2FkaW5nXCIpKSYmKHM9dGhpcy5saXZlU29ja2V0LndpdGhQYWdlTG9hZGluZyh7a2luZDpcImVsZW1lbnRcIix0YXJnZXQ6dX0pKSxcIm51bWJlclwiIT10eXBlb2Ygbi5jaWQmJmRlbGV0ZSBuLmNpZCx0aGlzLmxpdmVTb2NrZXQud3JhcFB1c2godGhpcyx7dGltZW91dDohMH0sZnVuY3Rpb24oKXtyZXR1cm4gaS5jaGFubmVsLnB1c2godCxuLDNlNCkucmVjZWl2ZShcIm9rXCIsZnVuY3Rpb24oZSl7dmFyIHQ9bnVsbDtudWxsIT09YSYmaS51bmRvUmVmcyhhKSxlLmRpZmYmJih0PWkuYXBwbHlEaWZmKFwidXBkYXRlXCIsZS5kaWZmLGZ1bmN0aW9uKGUpe3ZhciB0PWUuZGlmZixuPWUuZXZlbnRzO2kudXBkYXRlKHQsbil9KSksZS5yZWRpcmVjdCYmaS5vblJlZGlyZWN0KGUucmVkaXJlY3QpLGUubGl2ZV9wYXRjaCYmaS5vbkxpdmVQYXRjaChlLmxpdmVfcGF0Y2gpLGUubGl2ZV9yZWRpcmVjdCYmaS5vbkxpdmVSZWRpcmVjdChlLmxpdmVfcmVkaXJlY3QpLHMoKSxyKGUsdCl9KX0pfX19LHtrZXk6XCJ1bmRvUmVmc1wiLHZhbHVlOmZ1bmN0aW9uKGUpe3ZhciB0PXRoaXM7ZGUuYWxsKHRoaXMuZWwsXCJbXCIuY29uY2F0KEYsJz1cIicpLmNvbmNhdChlLCdcIl0nKSxmdW5jdGlvbihlKXtlLnJlbW92ZUF0dHJpYnV0ZShGKSxudWxsIT09ZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBoeC1yZWFkb25seVwiKSYmKGUucmVhZE9ubHk9ITEsZS5yZW1vdmVBdHRyaWJ1dGUoXCJkYXRhLXBoeC1yZWFkb25seVwiKSksbnVsbCE9PWUuZ2V0QXR0cmlidXRlKFwiZGF0YS1waHgtZGlzYWJsZWRcIikmJihlLmRpc2FibGVkPSExLGUucmVtb3ZlQXR0cmlidXRlKFwiZGF0YS1waHgtZGlzYWJsZWRcIikpLEguZm9yRWFjaChmdW5jdGlvbih0KXtyZXR1cm4gZGUucmVtb3ZlQ2xhc3MoZSx0KX0pO3ZhciBuPWUuZ2V0QXR0cmlidXRlKFwiZGF0YS1waHgtZGlzYWJsZS13aXRoLXJlc3RvcmVcIik7bnVsbCE9PW4mJihlLmlubmVyVGV4dD1uLGUucmVtb3ZlQXR0cmlidXRlKFwiZGF0YS1waHgtZGlzYWJsZS13aXRoLXJlc3RvcmVcIikpO3ZhciBpPWRlLnByaXZhdGUoZSxGKTtpZihpKXt2YXIgcj10LnRyaWdnZXJCZWZvcmVVcGRhdGVIb29rKGUsaSk7ZmUucGF0Y2hFbChlLGksdC5saXZlU29ja2V0LmdldEFjdGl2ZUVsZW1lbnQoKSksciYmci5fX3VwZGF0ZWQoKSxkZS5kZWxldGVQcml2YXRlKGUsRil9fSl9fSx7a2V5OlwicHV0UmVmXCIsdmFsdWU6ZnVuY3Rpb24oZSx0KXt2YXIgbj10aGlzLnJlZisrLGk9dGhpcy5iaW5kaW5nKFwiZGlzYWJsZS13aXRoXCIpO3JldHVybiBlLmZvckVhY2goZnVuY3Rpb24oZSl7ZS5jbGFzc0xpc3QuYWRkKFwicGh4LVwiLmNvbmNhdCh0LFwiLWxvYWRpbmdcIikpLGUuc2V0QXR0cmlidXRlKEYsbik7dmFyIHI9ZS5nZXRBdHRyaWJ1dGUoaSk7bnVsbCE9PXImJihlLmdldEF0dHJpYnV0ZShcImRhdGEtcGh4LWRpc2FibGUtd2l0aC1yZXN0b3JlXCIpfHxlLnNldEF0dHJpYnV0ZShcImRhdGEtcGh4LWRpc2FibGUtd2l0aC1yZXN0b3JlXCIsZS5pbm5lclRleHQpLGUuaW5uZXJUZXh0PXIpfSksW24sZV19fSx7a2V5OlwiY29tcG9uZW50SURcIix2YWx1ZTpmdW5jdGlvbihlKXt2YXIgdD1lLmdldEF0dHJpYnV0ZSYmZS5nZXRBdHRyaWJ1dGUoTSk7cmV0dXJuIHQ/cGFyc2VJbnQodCk6bnVsbH19LHtrZXk6XCJ0YXJnZXRDb21wb25lbnRJRFwiLHZhbHVlOmZ1bmN0aW9uKGUsdCl7cmV0dXJuIGUuZ2V0QXR0cmlidXRlKHRoaXMuYmluZGluZyhcInRhcmdldFwiKSk/dGhpcy5jbG9zZXN0Q29tcG9uZW50SUQodCk6bnVsbH19LHtrZXk6XCJjbG9zZXN0Q29tcG9uZW50SURcIix2YWx1ZTpmdW5jdGlvbihlKXt2YXIgdD10aGlzO3JldHVybiBlP2VlKGUuY2xvc2VzdChcIltcIi5jb25jYXQoTSxcIl1cIikpLGZ1bmN0aW9uKGUpe3JldHVybiB0Lm93bnNFbGVtZW50KGUpJiZ0LmNvbXBvbmVudElEKGUpfSk6bnVsbH19LHtrZXk6XCJwdXNoSG9va0V2ZW50XCIsdmFsdWU6ZnVuY3Rpb24oZSx0LG4saSl7aWYoIXRoaXMuaXNDb25uZWN0ZWQoKSlyZXR1cm4gdGhpcy5sb2coXCJob29rXCIsZnVuY3Rpb24oKXtyZXR1cm5bXCJ1bmFibGUgdG8gcHVzaCBob29rIGV2ZW50LiBMaXZlVmlldyBub3QgY29ubmVjdGVkXCIsdCxuXX0pLCExO3ZhciByPUModGhpcy5wdXRSZWYoW10sXCJob29rXCIpLDIpLG89clswXSxhPXJbMV07cmV0dXJuIHRoaXMucHVzaFdpdGhSZXBseShmdW5jdGlvbigpe3JldHVybltvLGFdfSxcImV2ZW50XCIse3R5cGU6XCJob29rXCIsZXZlbnQ6dCx2YWx1ZTpuLGNpZDp0aGlzLmNsb3Nlc3RDb21wb25lbnRJRChlKX0sZnVuY3Rpb24oZSx0KXtyZXR1cm4gaSh0LG8pfSksb319LHtrZXk6XCJleHRyYWN0TWV0YVwiLHZhbHVlOmZ1bmN0aW9uKGUsdCl7Zm9yKHZhciBuPXRoaXMuYmluZGluZyhcInZhbHVlLVwiKSxpPTA7aTxlLmF0dHJpYnV0ZXMubGVuZ3RoO2krKyl7dmFyIHI9ZS5hdHRyaWJ1dGVzW2ldLm5hbWU7ci5zdGFydHNXaXRoKG4pJiYodFtyLnJlcGxhY2UobixcIlwiKV09ZS5nZXRBdHRyaWJ1dGUocikpfXJldHVybiB2b2lkIDAhPT1lLnZhbHVlJiYodC52YWx1ZT1lLnZhbHVlLFwiSU5QVVRcIj09PWUudGFnTmFtZSYmVi5pbmRleE9mKGUudHlwZSk+PTAmJiFlLmNoZWNrZWQmJmRlbGV0ZSB0LnZhbHVlKSx0fX0se2tleTpcInB1c2hFdmVudFwiLHZhbHVlOmZ1bmN0aW9uKGUsdCxuLGkscil7dmFyIG89dGhpczt0aGlzLnB1c2hXaXRoUmVwbHkoZnVuY3Rpb24oKXtyZXR1cm4gby5wdXRSZWYoW3RdLGUpfSxcImV2ZW50XCIse3R5cGU6ZSxldmVudDppLHZhbHVlOnRoaXMuZXh0cmFjdE1ldGEodCxyKSxjaWQ6dGhpcy50YXJnZXRDb21wb25lbnRJRCh0LG4pfSl9fSx7a2V5OlwicHVzaEtleVwiLHZhbHVlOmZ1bmN0aW9uKGUsdCxuLGkscil7dmFyIG89dGhpczt0aGlzLnB1c2hXaXRoUmVwbHkoZnVuY3Rpb24oKXtyZXR1cm4gby5wdXRSZWYoW2VdLG4pfSxcImV2ZW50XCIse3R5cGU6bixldmVudDppLHZhbHVlOnRoaXMuZXh0cmFjdE1ldGEoZSxyKSxjaWQ6dGhpcy50YXJnZXRDb21wb25lbnRJRChlLHQpfSl9fSx7a2V5OlwicHVzaEZpbGVQcm9ncmVzc1wiLHZhbHVlOmZ1bmN0aW9uKGUsdCxuKXt2YXIgaT1hcmd1bWVudHMubGVuZ3RoPjMmJnZvaWQgMCE9PWFyZ3VtZW50c1szXT9hcmd1bWVudHNbM106ZnVuY3Rpb24oKXt9O3RoaXMubGl2ZVNvY2tldC53aXRoaW5Pd25lcnMoZS5mb3JtLGZ1bmN0aW9uKHIsbyl7ci5wdXNoV2l0aFJlcGx5KG51bGwsXCJwcm9ncmVzc1wiLHtldmVudDplLmdldEF0dHJpYnV0ZShyLmJpbmRpbmcoXCJwcm9ncmVzc1wiKSkscmVmOmUuZ2V0QXR0cmlidXRlKFUpLGVudHJ5X3JlZjp0LHByb2dyZXNzOm4sY2lkOnIudGFyZ2V0Q29tcG9uZW50SUQoZS5mb3JtLG8pfSxpKX0pfX0se2tleTpcInB1c2hJbnB1dFwiLHZhbHVlOmZ1bmN0aW9uKGUsdCxuLGkscil7dmFyIG89dGhpcyxhPXRoaXMudGFyZ2V0Q29tcG9uZW50SUQoZS5mb3JtLHQpLHU9ZnVuY3Rpb24oKXtyZXR1cm4gby5wdXRSZWYoW2UsZS5mb3JtXSxcImNoYW5nZVwiKX0scz11ZShlLmZvcm0se190YXJnZXQ6aS5uYW1lfSk7ZS5maWxlcyYmZS5maWxlcy5sZW5ndGg+MCYmcmUudHJhY2tGaWxlcyhlLEFycmF5LmZyb20oZS5maWxlcykpO3ZhciBjPXt0eXBlOlwiZm9ybVwiLGV2ZW50Om4sdmFsdWU6cyx1cGxvYWRzOnJlLnNlcmlhbGl6ZVVwbG9hZHMoZSksY2lkOmF9O3RoaXMucHVzaFdpdGhSZXBseSh1LFwiZXZlbnRcIixjLGZ1bmN0aW9uKG4pe2lmKGRlLnNob3dFcnJvcihlLG8ubGl2ZVNvY2tldC5iaW5kaW5nKFwiZmVlZGJhY2stZm9yXCIpKSxkZS5pc1VwbG9hZElucHV0KGUpJiZudWxsIT09ZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBoeC1hdXRvLXVwbG9hZFwiKSl7aWYocmUuZmlsZXNBd2FpdGluZ1ByZWZsaWdodChlKS5sZW5ndGg+MCl7dmFyIGk9Qyh1KCksMikscz1pWzBdO2lbMV07by51cGxvYWRGaWxlcyhlLmZvcm0sdCxzLGEsZnVuY3Rpb24odCl7ciYmcihuKSxvLnRyaWdnZXJBd2FpdGluZ1N1Ym1pdChlLmZvcm0pfSl9fWVsc2UgciYmcihuKX0pfX0se2tleTpcInRyaWdnZXJBd2FpdGluZ1N1Ym1pdFwiLHZhbHVlOmZ1bmN0aW9uKGUpe3ZhciB0PXRoaXMuZ2V0U2NoZWR1bGVkU3VibWl0KGUpO2lmKHQpe3ZhciBuPUModCwzKSxpPShuWzBdLG5bMV0sblsyXSk7dGhpcy5jYW5jZWxTdWJtaXQoZSksaSgpfX19LHtrZXk6XCJnZXRTY2hlZHVsZWRTdWJtaXRcIix2YWx1ZTpmdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5mb3JtU3VibWl0cy5maW5kKGZ1bmN0aW9uKHQpe3ZhciBuPUModCwyKSxpPW5bMF07blsxXTtyZXR1cm4gaS5pc1NhbWVOb2RlKGUpfSl9fSx7a2V5Olwic2NoZWR1bGVTdWJtaXRcIix2YWx1ZTpmdW5jdGlvbihlLHQsbil7aWYodGhpcy5nZXRTY2hlZHVsZWRTdWJtaXQoZSkpcmV0dXJuITA7dGhpcy5mb3JtU3VibWl0cy5wdXNoKFtlLHQsbl0pfX0se2tleTpcImNhbmNlbFN1Ym1pdFwiLHZhbHVlOmZ1bmN0aW9uKGUpe3ZhciB0PXRoaXM7dGhpcy5mb3JtU3VibWl0cz10aGlzLmZvcm1TdWJtaXRzLmZpbHRlcihmdW5jdGlvbihuKXt2YXIgaT1DKG4sMykscj1pWzBdLG89aVsxXTtpWzJdO3JldHVybiFyLmlzU2FtZU5vZGUoZSl8fCh0LnVuZG9SZWZzKG8pLCExKX0pfX0se2tleTpcInB1c2hGb3JtU3VibWl0XCIsdmFsdWU6ZnVuY3Rpb24oZSx0LG4saSl7dmFyIHI9dGhpcyxvPWZ1bmN0aW9uKGUpe3JldHVybiEoWShlLFwiXCIuY29uY2F0KHIuYmluZGluZyhcInVwZGF0ZVwiKSxcIj1pZ25vcmVcIiksZS5mb3JtKXx8WShlLFwiZGF0YS1waHgtdXBkYXRlPWlnbm9yZVwiLGUuZm9ybSkpfSxhPWZ1bmN0aW9uKGUpe3JldHVybiBlLmhhc0F0dHJpYnV0ZShyLmJpbmRpbmcoXCJkaXNhYmxlLXdpdGhcIikpfSx1PWZ1bmN0aW9uKGUpe3JldHVyblwiQlVUVE9OXCI9PWUudGFnTmFtZX0scz1mdW5jdGlvbihlKXtyZXR1cm5bXCJJTlBVVFwiLFwiVEVYVEFSRUFcIixcIlNFTEVDVFwiXS5pbmNsdWRlcyhlLnRhZ05hbWUpfSxjPWZ1bmN0aW9uKCl7dmFyIHQ9QXJyYXkuZnJvbShlLmVsZW1lbnRzKSxuPXQuZmlsdGVyKGEpLGk9dC5maWx0ZXIodSkuZmlsdGVyKG8pLGM9dC5maWx0ZXIocykuZmlsdGVyKG8pO3JldHVybiBpLmZvckVhY2goZnVuY3Rpb24oZSl7ZS5zZXRBdHRyaWJ1dGUoXCJkYXRhLXBoeC1kaXNhYmxlZFwiLGUuZGlzYWJsZWQpLGUuZGlzYWJsZWQ9ITB9KSxjLmZvckVhY2goZnVuY3Rpb24oZSl7ZS5zZXRBdHRyaWJ1dGUoXCJkYXRhLXBoeC1yZWFkb25seVwiLGUucmVhZE9ubHkpLGUucmVhZE9ubHk9ITAsZS5maWxlcyYmKGUuc2V0QXR0cmlidXRlKFwiZGF0YS1waHgtZGlzYWJsZWRcIixlLmRpc2FibGVkKSxlLmRpc2FibGVkPSEwKX0pLGUuc2V0QXR0cmlidXRlKHIuYmluZGluZyhcInBhZ2UtbG9hZGluZ1wiKSxcIlwiKSxyLnB1dFJlZihbZV0uY29uY2F0KG4pLmNvbmNhdChpKS5jb25jYXQoYyksXCJzdWJtaXRcIil9LGw9dGhpcy50YXJnZXRDb21wb25lbnRJRChlLHQpO2lmKHJlLmhhc1VwbG9hZHNJblByb2dyZXNzKGUpKXt2YXIgZD1DKGMoKSwyKSxoPWRbMF07ZFsxXTtyZXR1cm4gdGhpcy5zY2hlZHVsZVN1Ym1pdChlLGgsZnVuY3Rpb24oKXtyZXR1cm4gci5wdXNoRm9ybVN1Ym1pdChlLHQsbixpKX0pfWlmKHJlLmlucHV0c0F3YWl0aW5nUHJlZmxpZ2h0KGUpLmxlbmd0aD4wKXt2YXIgZj1DKGMoKSwyKSx2PWZbMF0scD1mWzFdLGc9ZnVuY3Rpb24oKXtyZXR1cm5bdixwXX07dGhpcy51cGxvYWRGaWxlcyhlLHQsdixsLGZ1bmN0aW9uKHQpe3ZhciBvPXVlKGUse30pO3IucHVzaFdpdGhSZXBseShnLFwiZXZlbnRcIix7dHlwZTpcImZvcm1cIixldmVudDpuLHZhbHVlOm8sY2lkOmx9LGkpfSl9ZWxzZXt2YXIgbT11ZShlKTt0aGlzLnB1c2hXaXRoUmVwbHkoYyxcImV2ZW50XCIse3R5cGU6XCJmb3JtXCIsZXZlbnQ6bix2YWx1ZTptLGNpZDpsfSxpKX19fSx7a2V5OlwidXBsb2FkRmlsZXNcIix2YWx1ZTpmdW5jdGlvbihlLHQsbixpLHIpe3ZhciBvPXRoaXMsYT10aGlzLmpvaW5Db3VudDtyZS5hY3RpdmVGaWxlSW5wdXRzKGUpLmZvckVhY2goZnVuY3Rpb24oZSl7dmFyIGk9bmV3IHJlKGUsbyxyKTtvLnVwbG9hZGVyc1tlXT1pO3ZhciB1PWkuZW50cmllcygpLm1hcChmdW5jdGlvbihlKXtyZXR1cm4gZS50b1ByZWZsaWdodFBheWxvYWQoKX0pLHM9e3JlZjplLmdldEF0dHJpYnV0ZShVKSxlbnRyaWVzOnUsY2lkOm8udGFyZ2V0Q29tcG9uZW50SUQoZS5mb3JtLHQpfTtvLmxvZyhcInVwbG9hZFwiLGZ1bmN0aW9uKCl7cmV0dXJuW1wic2VuZGluZyBwcmVmbGlnaHQgcmVxdWVzdFwiLHNdfSksby5wdXNoV2l0aFJlcGx5KG51bGwsXCJhbGxvd191cGxvYWRcIixzLGZ1bmN0aW9uKGUpe2lmKG8ubG9nKFwidXBsb2FkXCIsZnVuY3Rpb24oKXtyZXR1cm5bXCJnb3QgcHJlZmxpZ2h0IHJlc3BvbnNlXCIsZV19KSxlLmVycm9yKXtvLnVuZG9SZWZzKG4pO3ZhciB0PUMoZS5lcnJvciwyKSxyPXRbMF0sdT10WzFdO28ubG9nKFwidXBsb2FkXCIsZnVuY3Rpb24oKXtyZXR1cm5bXCJlcnJvciBmb3IgZW50cnkgXCIuY29uY2F0KHIpLHVdfSl9ZWxzZXtpLmluaXRBZGFwdGVyVXBsb2FkKGUsZnVuY3Rpb24oZSl7by5jaGFubmVsLm9uRXJyb3IoZnVuY3Rpb24oKXtvLmpvaW5Db3VudD09PWEmJmUoKX0pfSxvLmxpdmVTb2NrZXQpfX0pfSl9fSx7a2V5OlwicHVzaEZvcm1SZWNvdmVyeVwiLHZhbHVlOmZ1bmN0aW9uKGUsdCl7dmFyIG49dGhpczt0aGlzLmxpdmVTb2NrZXQud2l0aGluT3duZXJzKGUsZnVuY3Rpb24oaSxyKXt2YXIgbz1lLmVsZW1lbnRzWzBdLGE9ZS5nZXRBdHRyaWJ1dGUobi5iaW5kaW5nKFwiYXV0by1yZWNvdmVyXCIpKXx8ZS5nZXRBdHRyaWJ1dGUobi5iaW5kaW5nKFwiY2hhbmdlXCIpKTtpLnB1c2hJbnB1dChvLHIsYSxvLHQpfSl9fSx7a2V5OlwicHVzaExpbmtQYXRjaFwiLHZhbHVlOmZ1bmN0aW9uKGUsdCxuKXt2YXIgaT10aGlzLHI9dGhpcy5saXZlU29ja2V0LnNldFBlbmRpbmdMaW5rKGUpLG89dD9mdW5jdGlvbigpe3JldHVybiBpLnB1dFJlZihbdF0sXCJjbGlja1wiKX06bnVsbDt0aGlzLnB1c2hXaXRoUmVwbHkobyxcImxpbmtcIix7dXJsOmV9LGZ1bmN0aW9uKHQpe3QubGlua19yZWRpcmVjdD9pLmxpdmVTb2NrZXQucmVwbGFjZU1haW4oZSxudWxsLG4scik6KGkubGl2ZVNvY2tldC5jb21taXRQZW5kaW5nTGluayhyKSYmKGkuaHJlZj1lKSxpLmFwcGx5UGVuZGluZ1VwZGF0ZXMoKSxuJiZuKHIpKX0pLnJlY2VpdmUoXCJ0aW1lb3V0XCIsZnVuY3Rpb24oKXtyZXR1cm4gaS5saXZlU29ja2V0LnJlZGlyZWN0KHdpbmRvdy5sb2NhdGlvbi5ocmVmKX0pfX0se2tleTpcImZvcm1zRm9yUmVjb3ZlcnlcIix2YWx1ZTpmdW5jdGlvbihlKXt2YXIgdD10aGlzO2lmKDA9PT10aGlzLmpvaW5Db3VudClyZXR1cm5bXTt2YXIgbj10aGlzLmJpbmRpbmcoXCJjaGFuZ2VcIiksaT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIik7cmV0dXJuIGkuaW5uZXJIVE1MPWUsZGUuYWxsKHRoaXMuZWwsXCJmb3JtW1wiLmNvbmNhdChuLFwiXVwiKSkuZmlsdGVyKGZ1bmN0aW9uKGUpe3JldHVybiB0Lm93bnNFbGVtZW50KGUpfSkuZmlsdGVyKGZ1bmN0aW9uKGUpe3JldHVybiBlLmVsZW1lbnRzLmxlbmd0aD4wfSkuZmlsdGVyKGZ1bmN0aW9uKGUpe3JldHVyblwiaWdub3JlXCIhPT1lLmdldEF0dHJpYnV0ZSh0LmJpbmRpbmcoXCJhdXRvLXJlY292ZXJcIikpfSkuZmlsdGVyKGZ1bmN0aW9uKGUpe3JldHVybiBpLmNvbnRlbnQucXVlcnlTZWxlY3RvcihcImZvcm1bXCIuY29uY2F0KG4sJz1cIicpLmNvbmNhdChlLmdldEF0dHJpYnV0ZShuKSwnXCJdJykpfSl9fSx7a2V5OlwibWF5YmVQdXNoQ29tcG9uZW50c0Rlc3Ryb3llZFwiLHZhbHVlOmZ1bmN0aW9uKGUpe3ZhciB0LG49dGhpcyxpPWUuZmlsdGVyKGZ1bmN0aW9uKGUpe3JldHVybiAwPT09ZGUuZmluZENvbXBvbmVudE5vZGVMaXN0KG4uZWwsZSkubGVuZ3RofSk7aS5sZW5ndGg+MCYmKCh0PXRoaXMucHJ1bmluZ0NJRHMpLnB1c2guYXBwbHkodCx3KGkpKSx0aGlzLnB1c2hXaXRoUmVwbHkobnVsbCxcImNpZHNfd2lsbF9kZXN0cm95XCIse2NpZHM6aX0sZnVuY3Rpb24oKXtuLnBydW5pbmdDSURzPW4ucHJ1bmluZ0NJRHMuZmlsdGVyKGZ1bmN0aW9uKGUpe3JldHVybi0xIT09aS5pbmRleE9mKGUpfSk7dmFyIGU9aS5maWx0ZXIoZnVuY3Rpb24oZSl7cmV0dXJuIDA9PT1kZS5maW5kQ29tcG9uZW50Tm9kZUxpc3Qobi5lbCxlKS5sZW5ndGh9KTtlLmxlbmd0aD4wJiZuLnB1c2hXaXRoUmVwbHkobnVsbCxcImNpZHNfZGVzdHJveWVkXCIse2NpZHM6ZX0sZnVuY3Rpb24oZSl7bi5yZW5kZXJlZC5wcnVuZUNJRHMoZS5jaWRzKX0pfSkpfX0se2tleTpcIm93bnNFbGVtZW50XCIsdmFsdWU6ZnVuY3Rpb24oZSl7cmV0dXJuIGUuZ2V0QXR0cmlidXRlKFwiZGF0YS1waHgtcGFyZW50LWlkXCIpPT09dGhpcy5pZHx8ZWUoZS5jbG9zZXN0KEIpLGZ1bmN0aW9uKGUpe3JldHVybiBlLmlkfSk9PT10aGlzLmlkfX0se2tleTpcInN1Ym1pdEZvcm1cIix2YWx1ZTpmdW5jdGlvbihlLHQsbil7dmFyIGk9dGhpcztkZS5wdXRQcml2YXRlKGUsXCJwaHgtaGFzLXN1Ym1pdHRlZFwiLCEwKSx0aGlzLmxpdmVTb2NrZXQuYmx1ckFjdGl2ZUVsZW1lbnQodGhpcyksdGhpcy5wdXNoRm9ybVN1Ym1pdChlLHQsbixmdW5jdGlvbigpe2kubGl2ZVNvY2tldC5yZXN0b3JlUHJldmlvdXNseUFjdGl2ZUZvY3VzKCl9KX19LHtrZXk6XCJiaW5kaW5nXCIsdmFsdWU6ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMubGl2ZVNvY2tldC5iaW5kaW5nKGUpfX1dKSxlfSgpLHBlPTEsZ2U9ZnVuY3Rpb24oKXtmdW5jdGlvbiBlKHQsbixpKXtmb3IodmFyIHIgaW4gRCh0aGlzLGUpLHRoaXMuX192aWV3PXQsdGhpcy5fX2xpdmVTb2NrZXQ9dC5saXZlU29ja2V0LHRoaXMuX19jYWxsYmFja3M9aSx0aGlzLl9fbGlzdGVuZXJzPW5ldyBTZXQsdGhpcy5fX2lzRGlzY29ubmVjdGVkPSExLHRoaXMuZWw9bix0aGlzLnZpZXdOYW1lPXQubmFtZSgpLHRoaXMuZWwucGh4SG9va0lkPXRoaXMuY29uc3RydWN0b3IubWFrZUlEKCksdGhpcy5fX2NhbGxiYWNrcyl0aGlzW3JdPXRoaXMuX19jYWxsYmFja3Nbcl19cmV0dXJuIE4oZSxudWxsLFt7a2V5OlwibWFrZUlEXCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gcGUrK319LHtrZXk6XCJlbGVtZW50SURcIix2YWx1ZTpmdW5jdGlvbihlKXtyZXR1cm4gZS5waHhIb29rSWR9fV0pLE4oZSxbe2tleTpcIl9fbW91bnRlZFwiLHZhbHVlOmZ1bmN0aW9uKCl7dGhpcy5tb3VudGVkJiZ0aGlzLm1vdW50ZWQoKX19LHtrZXk6XCJfX3VwZGF0ZWRcIix2YWx1ZTpmdW5jdGlvbigpe3RoaXMudXBkYXRlZCYmdGhpcy51cGRhdGVkKCl9fSx7a2V5OlwiX19iZWZvcmVVcGRhdGVcIix2YWx1ZTpmdW5jdGlvbigpe3RoaXMuYmVmb3JlVXBkYXRlJiZ0aGlzLmJlZm9yZVVwZGF0ZSgpfX0se2tleTpcIl9fZGVzdHJveWVkXCIsdmFsdWU6ZnVuY3Rpb24oKXt0aGlzLmRlc3Ryb3llZCYmdGhpcy5kZXN0cm95ZWQoKX19LHtrZXk6XCJfX3JlY29ubmVjdGVkXCIsdmFsdWU6ZnVuY3Rpb24oKXt0aGlzLl9faXNEaXNjb25uZWN0ZWQmJih0aGlzLl9faXNEaXNjb25uZWN0ZWQ9ITEsdGhpcy5yZWNvbm5lY3RlZCYmdGhpcy5yZWNvbm5lY3RlZCgpKX19LHtrZXk6XCJfX2Rpc2Nvbm5lY3RlZFwiLHZhbHVlOmZ1bmN0aW9uKCl7dGhpcy5fX2lzRGlzY29ubmVjdGVkPSEwLHRoaXMuZGlzY29ubmVjdGVkJiZ0aGlzLmRpc2Nvbm5lY3RlZCgpfX0se2tleTpcInB1c2hFdmVudFwiLHZhbHVlOmZ1bmN0aW9uKGUpe3ZhciB0PWFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdP2FyZ3VtZW50c1sxXTp7fSxuPWFyZ3VtZW50cy5sZW5ndGg+MiYmdm9pZCAwIT09YXJndW1lbnRzWzJdP2FyZ3VtZW50c1syXTpmdW5jdGlvbigpe307cmV0dXJuIHRoaXMuX192aWV3LnB1c2hIb29rRXZlbnQobnVsbCxlLHQsbil9fSx7a2V5OlwicHVzaEV2ZW50VG9cIix2YWx1ZTpmdW5jdGlvbihlLHQpe3ZhciBuPWFyZ3VtZW50cy5sZW5ndGg+MiYmdm9pZCAwIT09YXJndW1lbnRzWzJdP2FyZ3VtZW50c1syXTp7fSxpPWFyZ3VtZW50cy5sZW5ndGg+MyYmdm9pZCAwIT09YXJndW1lbnRzWzNdP2FyZ3VtZW50c1szXTpmdW5jdGlvbigpe307cmV0dXJuIHRoaXMuX192aWV3LndpdGhpblRhcmdldHMoZSxmdW5jdGlvbihlLHIpe3JldHVybiBlLnB1c2hIb29rRXZlbnQocix0LG4saSl9KX19LHtrZXk6XCJoYW5kbGVFdmVudFwiLHZhbHVlOmZ1bmN0aW9uKGUsdCl7dmFyIG49ZnVuY3Rpb24obixpKXtyZXR1cm4gaT9lOnQobi5kZXRhaWwpfTtyZXR1cm4gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwaHg6aG9vazpcIi5jb25jYXQoZSksbiksdGhpcy5fX2xpc3RlbmVycy5hZGQobiksbn19LHtrZXk6XCJyZW1vdmVIYW5kbGVFdmVudFwiLHZhbHVlOmZ1bmN0aW9uKGUpe3ZhciB0PWUobnVsbCwhMCk7d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwaHg6aG9vazpcIi5jb25jYXQodCksZSksdGhpcy5fX2xpc3RlbmVycy5kZWxldGUoZSl9fSx7a2V5OlwiX19jbGVhbnVwX19cIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPXRoaXM7dGhpcy5fX2xpc3RlbmVycy5mb3JFYWNoKGZ1bmN0aW9uKHQpe3JldHVybiBlLnJlbW92ZUhhbmRsZUV2ZW50KHQpfSl9fV0pLGV9KCk7dC5kZWZhdWx0PWNlfSxmdW5jdGlvbihlLHQpe3ZhciBuO249ZnVuY3Rpb24oKXtyZXR1cm4gdGhpc30oKTt0cnl7bj1ufHxGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCl8fCgwLGV2YWwpKFwidGhpc1wiKX1jYXRjaChlKXtcIm9iamVjdFwiPT10eXBlb2Ygd2luZG93JiYobj13aW5kb3cpfWUuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQsbil7KGZ1bmN0aW9uKHQpe3QuUGhvZW5peHx8KHQuUGhvZW5peD17fSksZS5leHBvcnRzPXQuUGhvZW5peC5MaXZlVmlldz1uKDApfSkuY2FsbCh0aGlzLG4oMSkpfV0pfSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1waG9lbml4X2xpdmVfdmlldy5qcy5tYXAiLCAidmFyIF9fY3JlYXRlID0gT2JqZWN0LmNyZWF0ZTtcbnZhciBfX2RlZlByb3AgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG52YXIgX19nZXRQcm90b09mID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xudmFyIF9faGFzT3duUHJvcCA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgX19nZXRPd25Qcm9wTmFtZXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcztcbnZhciBfX2dldE93blByb3BEZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbnZhciBfX21hcmtBc01vZHVsZSA9ICh0YXJnZXQpID0+IF9fZGVmUHJvcCh0YXJnZXQsIFwiX19lc01vZHVsZVwiLCB7dmFsdWU6IHRydWV9KTtcbnZhciBfX2NvbW1vbkpTID0gKGNhbGxiYWNrLCBtb2R1bGUpID0+ICgpID0+IHtcbiAgaWYgKCFtb2R1bGUpIHtcbiAgICBtb2R1bGUgPSB7ZXhwb3J0czoge319O1xuICAgIGNhbGxiYWNrKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUpO1xuICB9XG4gIHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn07XG52YXIgX19leHBvcnRTdGFyID0gKHRhcmdldCwgbW9kdWxlLCBkZXNjKSA9PiB7XG4gIGlmIChtb2R1bGUgJiYgdHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgbW9kdWxlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBmb3IgKGxldCBrZXkgb2YgX19nZXRPd25Qcm9wTmFtZXMobW9kdWxlKSlcbiAgICAgIGlmICghX19oYXNPd25Qcm9wLmNhbGwodGFyZ2V0LCBrZXkpICYmIGtleSAhPT0gXCJkZWZhdWx0XCIpXG4gICAgICAgIF9fZGVmUHJvcCh0YXJnZXQsIGtleSwge2dldDogKCkgPT4gbW9kdWxlW2tleV0sIGVudW1lcmFibGU6ICEoZGVzYyA9IF9fZ2V0T3duUHJvcERlc2MobW9kdWxlLCBrZXkpKSB8fCBkZXNjLmVudW1lcmFibGV9KTtcbiAgfVxuICByZXR1cm4gdGFyZ2V0O1xufTtcbnZhciBfX3RvTW9kdWxlID0gKG1vZHVsZSkgPT4ge1xuICByZXR1cm4gX19leHBvcnRTdGFyKF9fbWFya0FzTW9kdWxlKF9fZGVmUHJvcChtb2R1bGUgIT0gbnVsbCA/IF9fY3JlYXRlKF9fZ2V0UHJvdG9PZihtb2R1bGUpKSA6IHt9LCBcImRlZmF1bHRcIiwgbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlICYmIFwiZGVmYXVsdFwiIGluIG1vZHVsZSA/IHtnZXQ6ICgpID0+IG1vZHVsZS5kZWZhdWx0LCBlbnVtZXJhYmxlOiB0cnVlfSA6IHt2YWx1ZTogbW9kdWxlLCBlbnVtZXJhYmxlOiB0cnVlfSkpLCBtb2R1bGUpO1xufTtcblxuLy8gbm9kZV9tb2R1bGVzL0B2dWUvc2hhcmVkL2Rpc3Qvc2hhcmVkLmNqcy5qc1xudmFyIHJlcXVpcmVfc2hhcmVkX2NqcyA9IF9fY29tbW9uSlMoKGV4cG9ydHMpID0+IHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge3ZhbHVlOiB0cnVlfSk7XG4gIGZ1bmN0aW9uIG1ha2VNYXAoc3RyLCBleHBlY3RzTG93ZXJDYXNlKSB7XG4gICAgY29uc3QgbWFwID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICBjb25zdCBsaXN0ID0gc3RyLnNwbGl0KFwiLFwiKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgIG1hcFtsaXN0W2ldXSA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBleHBlY3RzTG93ZXJDYXNlID8gKHZhbCkgPT4gISFtYXBbdmFsLnRvTG93ZXJDYXNlKCldIDogKHZhbCkgPT4gISFtYXBbdmFsXTtcbiAgfVxuICB2YXIgUGF0Y2hGbGFnTmFtZXMgPSB7XG4gICAgWzFdOiBgVEVYVGAsXG4gICAgWzJdOiBgQ0xBU1NgLFxuICAgIFs0XTogYFNUWUxFYCxcbiAgICBbOF06IGBQUk9QU2AsXG4gICAgWzE2XTogYEZVTExfUFJPUFNgLFxuICAgIFszMl06IGBIWURSQVRFX0VWRU5UU2AsXG4gICAgWzY0XTogYFNUQUJMRV9GUkFHTUVOVGAsXG4gICAgWzEyOF06IGBLRVlFRF9GUkFHTUVOVGAsXG4gICAgWzI1Nl06IGBVTktFWUVEX0ZSQUdNRU5UYCxcbiAgICBbNTEyXTogYE5FRURfUEFUQ0hgLFxuICAgIFsxMDI0XTogYERZTkFNSUNfU0xPVFNgLFxuICAgIFsyMDQ4XTogYERFVl9ST09UX0ZSQUdNRU5UYCxcbiAgICBbLTFdOiBgSE9JU1RFRGAsXG4gICAgWy0yXTogYEJBSUxgXG4gIH07XG4gIHZhciBzbG90RmxhZ3NUZXh0ID0ge1xuICAgIFsxXTogXCJTVEFCTEVcIixcbiAgICBbMl06IFwiRFlOQU1JQ1wiLFxuICAgIFszXTogXCJGT1JXQVJERURcIlxuICB9O1xuICB2YXIgR0xPQkFMU19XSElURV9MSVNURUQgPSBcIkluZmluaXR5LHVuZGVmaW5lZCxOYU4saXNGaW5pdGUsaXNOYU4scGFyc2VGbG9hdCxwYXJzZUludCxkZWNvZGVVUkksZGVjb2RlVVJJQ29tcG9uZW50LGVuY29kZVVSSSxlbmNvZGVVUklDb21wb25lbnQsTWF0aCxOdW1iZXIsRGF0ZSxBcnJheSxPYmplY3QsQm9vbGVhbixTdHJpbmcsUmVnRXhwLE1hcCxTZXQsSlNPTixJbnRsLEJpZ0ludFwiO1xuICB2YXIgaXNHbG9iYWxseVdoaXRlbGlzdGVkID0gLyogQF9fUFVSRV9fICovIG1ha2VNYXAoR0xPQkFMU19XSElURV9MSVNURUQpO1xuICB2YXIgcmFuZ2UgPSAyO1xuICBmdW5jdGlvbiBnZW5lcmF0ZUNvZGVGcmFtZShzb3VyY2UsIHN0YXJ0MiA9IDAsIGVuZCA9IHNvdXJjZS5sZW5ndGgpIHtcbiAgICBjb25zdCBsaW5lcyA9IHNvdXJjZS5zcGxpdCgvXFxyP1xcbi8pO1xuICAgIGxldCBjb3VudCA9IDA7XG4gICAgY29uc3QgcmVzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7IGkrKykge1xuICAgICAgY291bnQgKz0gbGluZXNbaV0ubGVuZ3RoICsgMTtcbiAgICAgIGlmIChjb3VudCA+PSBzdGFydDIpIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IGkgLSByYW5nZTsgaiA8PSBpICsgcmFuZ2UgfHwgZW5kID4gY291bnQ7IGorKykge1xuICAgICAgICAgIGlmIChqIDwgMCB8fCBqID49IGxpbmVzLmxlbmd0aClcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIGNvbnN0IGxpbmUgPSBqICsgMTtcbiAgICAgICAgICByZXMucHVzaChgJHtsaW5lfSR7XCIgXCIucmVwZWF0KE1hdGgubWF4KDMgLSBTdHJpbmcobGluZSkubGVuZ3RoLCAwKSl9fCAgJHtsaW5lc1tqXX1gKTtcbiAgICAgICAgICBjb25zdCBsaW5lTGVuZ3RoID0gbGluZXNbal0ubGVuZ3RoO1xuICAgICAgICAgIGlmIChqID09PSBpKSB7XG4gICAgICAgICAgICBjb25zdCBwYWQgPSBzdGFydDIgLSAoY291bnQgLSBsaW5lTGVuZ3RoKSArIDE7XG4gICAgICAgICAgICBjb25zdCBsZW5ndGggPSBNYXRoLm1heCgxLCBlbmQgPiBjb3VudCA/IGxpbmVMZW5ndGggLSBwYWQgOiBlbmQgLSBzdGFydDIpO1xuICAgICAgICAgICAgcmVzLnB1c2goYCAgIHwgIGAgKyBcIiBcIi5yZXBlYXQocGFkKSArIFwiXlwiLnJlcGVhdChsZW5ndGgpKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGogPiBpKSB7XG4gICAgICAgICAgICBpZiAoZW5kID4gY291bnQpIHtcbiAgICAgICAgICAgICAgY29uc3QgbGVuZ3RoID0gTWF0aC5tYXgoTWF0aC5taW4oZW5kIC0gY291bnQsIGxpbmVMZW5ndGgpLCAxKTtcbiAgICAgICAgICAgICAgcmVzLnB1c2goYCAgIHwgIGAgKyBcIl5cIi5yZXBlYXQobGVuZ3RoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb3VudCArPSBsaW5lTGVuZ3RoICsgMTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXMuam9pbihcIlxcblwiKTtcbiAgfVxuICB2YXIgc3BlY2lhbEJvb2xlYW5BdHRycyA9IGBpdGVtc2NvcGUsYWxsb3dmdWxsc2NyZWVuLGZvcm1ub3ZhbGlkYXRlLGlzbWFwLG5vbW9kdWxlLG5vdmFsaWRhdGUscmVhZG9ubHlgO1xuICB2YXIgaXNTcGVjaWFsQm9vbGVhbkF0dHIgPSAvKiBAX19QVVJFX18gKi8gbWFrZU1hcChzcGVjaWFsQm9vbGVhbkF0dHJzKTtcbiAgdmFyIGlzQm9vbGVhbkF0dHIyID0gLyogQF9fUFVSRV9fICovIG1ha2VNYXAoc3BlY2lhbEJvb2xlYW5BdHRycyArIGAsYXN5bmMsYXV0b2ZvY3VzLGF1dG9wbGF5LGNvbnRyb2xzLGRlZmF1bHQsZGVmZXIsZGlzYWJsZWQsaGlkZGVuLGxvb3Asb3BlbixyZXF1aXJlZCxyZXZlcnNlZCxzY29wZWQsc2VhbWxlc3MsY2hlY2tlZCxtdXRlZCxtdWx0aXBsZSxzZWxlY3RlZGApO1xuICB2YXIgdW5zYWZlQXR0ckNoYXJSRSA9IC9bPi89XCInXFx1MDAwOVxcdTAwMGFcXHUwMDBjXFx1MDAyMF0vO1xuICB2YXIgYXR0clZhbGlkYXRpb25DYWNoZSA9IHt9O1xuICBmdW5jdGlvbiBpc1NTUlNhZmVBdHRyTmFtZShuYW1lKSB7XG4gICAgaWYgKGF0dHJWYWxpZGF0aW9uQ2FjaGUuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgIHJldHVybiBhdHRyVmFsaWRhdGlvbkNhY2hlW25hbWVdO1xuICAgIH1cbiAgICBjb25zdCBpc1Vuc2FmZSA9IHVuc2FmZUF0dHJDaGFyUkUudGVzdChuYW1lKTtcbiAgICBpZiAoaXNVbnNhZmUpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYHVuc2FmZSBhdHRyaWJ1dGUgbmFtZTogJHtuYW1lfWApO1xuICAgIH1cbiAgICByZXR1cm4gYXR0clZhbGlkYXRpb25DYWNoZVtuYW1lXSA9ICFpc1Vuc2FmZTtcbiAgfVxuICB2YXIgcHJvcHNUb0F0dHJNYXAgPSB7XG4gICAgYWNjZXB0Q2hhcnNldDogXCJhY2NlcHQtY2hhcnNldFwiLFxuICAgIGNsYXNzTmFtZTogXCJjbGFzc1wiLFxuICAgIGh0bWxGb3I6IFwiZm9yXCIsXG4gICAgaHR0cEVxdWl2OiBcImh0dHAtZXF1aXZcIlxuICB9O1xuICB2YXIgaXNOb1VuaXROdW1lcmljU3R5bGVQcm9wID0gLyogQF9fUFVSRV9fICovIG1ha2VNYXAoYGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQsYm9yZGVyLWltYWdlLW91dHNldCxib3JkZXItaW1hZ2Utc2xpY2UsYm9yZGVyLWltYWdlLXdpZHRoLGJveC1mbGV4LGJveC1mbGV4LWdyb3VwLGJveC1vcmRpbmFsLWdyb3VwLGNvbHVtbi1jb3VudCxjb2x1bW5zLGZsZXgsZmxleC1ncm93LGZsZXgtcG9zaXRpdmUsZmxleC1zaHJpbmssZmxleC1uZWdhdGl2ZSxmbGV4LW9yZGVyLGdyaWQtcm93LGdyaWQtcm93LWVuZCxncmlkLXJvdy1zcGFuLGdyaWQtcm93LXN0YXJ0LGdyaWQtY29sdW1uLGdyaWQtY29sdW1uLWVuZCxncmlkLWNvbHVtbi1zcGFuLGdyaWQtY29sdW1uLXN0YXJ0LGZvbnQtd2VpZ2h0LGxpbmUtY2xhbXAsbGluZS1oZWlnaHQsb3BhY2l0eSxvcmRlcixvcnBoYW5zLHRhYi1zaXplLHdpZG93cyx6LWluZGV4LHpvb20sZmlsbC1vcGFjaXR5LGZsb29kLW9wYWNpdHksc3RvcC1vcGFjaXR5LHN0cm9rZS1kYXNoYXJyYXksc3Ryb2tlLWRhc2hvZmZzZXQsc3Ryb2tlLW1pdGVybGltaXQsc3Ryb2tlLW9wYWNpdHksc3Ryb2tlLXdpZHRoYCk7XG4gIHZhciBpc0tub3duQXR0ciA9IC8qIEBfX1BVUkVfXyAqLyBtYWtlTWFwKGBhY2NlcHQsYWNjZXB0LWNoYXJzZXQsYWNjZXNza2V5LGFjdGlvbixhbGlnbixhbGxvdyxhbHQsYXN5bmMsYXV0b2NhcGl0YWxpemUsYXV0b2NvbXBsZXRlLGF1dG9mb2N1cyxhdXRvcGxheSxiYWNrZ3JvdW5kLGJnY29sb3IsYm9yZGVyLGJ1ZmZlcmVkLGNhcHR1cmUsY2hhbGxlbmdlLGNoYXJzZXQsY2hlY2tlZCxjaXRlLGNsYXNzLGNvZGUsY29kZWJhc2UsY29sb3IsY29scyxjb2xzcGFuLGNvbnRlbnQsY29udGVudGVkaXRhYmxlLGNvbnRleHRtZW51LGNvbnRyb2xzLGNvb3Jkcyxjcm9zc29yaWdpbixjc3AsZGF0YSxkYXRldGltZSxkZWNvZGluZyxkZWZhdWx0LGRlZmVyLGRpcixkaXJuYW1lLGRpc2FibGVkLGRvd25sb2FkLGRyYWdnYWJsZSxkcm9wem9uZSxlbmN0eXBlLGVudGVya2V5aGludCxmb3IsZm9ybSxmb3JtYWN0aW9uLGZvcm1lbmN0eXBlLGZvcm1tZXRob2QsZm9ybW5vdmFsaWRhdGUsZm9ybXRhcmdldCxoZWFkZXJzLGhlaWdodCxoaWRkZW4saGlnaCxocmVmLGhyZWZsYW5nLGh0dHAtZXF1aXYsaWNvbixpZCxpbXBvcnRhbmNlLGludGVncml0eSxpc21hcCxpdGVtcHJvcCxrZXl0eXBlLGtpbmQsbGFiZWwsbGFuZyxsYW5ndWFnZSxsb2FkaW5nLGxpc3QsbG9vcCxsb3csbWFuaWZlc3QsbWF4LG1heGxlbmd0aCxtaW5sZW5ndGgsbWVkaWEsbWluLG11bHRpcGxlLG11dGVkLG5hbWUsbm92YWxpZGF0ZSxvcGVuLG9wdGltdW0scGF0dGVybixwaW5nLHBsYWNlaG9sZGVyLHBvc3RlcixwcmVsb2FkLHJhZGlvZ3JvdXAscmVhZG9ubHkscmVmZXJyZXJwb2xpY3kscmVsLHJlcXVpcmVkLHJldmVyc2VkLHJvd3Mscm93c3BhbixzYW5kYm94LHNjb3BlLHNjb3BlZCxzZWxlY3RlZCxzaGFwZSxzaXplLHNpemVzLHNsb3Qsc3BhbixzcGVsbGNoZWNrLHNyYyxzcmNkb2Msc3JjbGFuZyxzcmNzZXQsc3RhcnQsc3RlcCxzdHlsZSxzdW1tYXJ5LHRhYmluZGV4LHRhcmdldCx0aXRsZSx0cmFuc2xhdGUsdHlwZSx1c2VtYXAsdmFsdWUsd2lkdGgsd3JhcGApO1xuICBmdW5jdGlvbiBub3JtYWxpemVTdHlsZSh2YWx1ZSkge1xuICAgIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgICAgY29uc3QgcmVzID0ge307XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSB2YWx1ZVtpXTtcbiAgICAgICAgY29uc3Qgbm9ybWFsaXplZCA9IG5vcm1hbGl6ZVN0eWxlKGlzU3RyaW5nKGl0ZW0pID8gcGFyc2VTdHJpbmdTdHlsZShpdGVtKSA6IGl0ZW0pO1xuICAgICAgICBpZiAobm9ybWFsaXplZCkge1xuICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIG5vcm1hbGl6ZWQpIHtcbiAgICAgICAgICAgIHJlc1trZXldID0gbm9ybWFsaXplZFtrZXldO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlcztcbiAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgfVxuICB2YXIgbGlzdERlbGltaXRlclJFID0gLzsoPyFbXihdKlxcKSkvZztcbiAgdmFyIHByb3BlcnR5RGVsaW1pdGVyUkUgPSAvOiguKykvO1xuICBmdW5jdGlvbiBwYXJzZVN0cmluZ1N0eWxlKGNzc1RleHQpIHtcbiAgICBjb25zdCByZXQgPSB7fTtcbiAgICBjc3NUZXh0LnNwbGl0KGxpc3REZWxpbWl0ZXJSRSkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaWYgKGl0ZW0pIHtcbiAgICAgICAgY29uc3QgdG1wID0gaXRlbS5zcGxpdChwcm9wZXJ0eURlbGltaXRlclJFKTtcbiAgICAgICAgdG1wLmxlbmd0aCA+IDEgJiYgKHJldFt0bXBbMF0udHJpbSgpXSA9IHRtcFsxXS50cmltKCkpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiByZXQ7XG4gIH1cbiAgZnVuY3Rpb24gc3RyaW5naWZ5U3R5bGUoc3R5bGVzKSB7XG4gICAgbGV0IHJldCA9IFwiXCI7XG4gICAgaWYgKCFzdHlsZXMpIHtcbiAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuICAgIGZvciAoY29uc3Qga2V5IGluIHN0eWxlcykge1xuICAgICAgY29uc3QgdmFsdWUgPSBzdHlsZXNba2V5XTtcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRLZXkgPSBrZXkuc3RhcnRzV2l0aChgLS1gKSA/IGtleSA6IGh5cGhlbmF0ZShrZXkpO1xuICAgICAgaWYgKGlzU3RyaW5nKHZhbHVlKSB8fCB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIgJiYgaXNOb1VuaXROdW1lcmljU3R5bGVQcm9wKG5vcm1hbGl6ZWRLZXkpKSB7XG4gICAgICAgIHJldCArPSBgJHtub3JtYWxpemVkS2V5fToke3ZhbHVlfTtgO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmV0O1xuICB9XG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZUNsYXNzKHZhbHVlKSB7XG4gICAgbGV0IHJlcyA9IFwiXCI7XG4gICAgaWYgKGlzU3RyaW5nKHZhbHVlKSkge1xuICAgICAgcmVzID0gdmFsdWU7XG4gICAgfSBlbHNlIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBub3JtYWxpemVkID0gbm9ybWFsaXplQ2xhc3ModmFsdWVbaV0pO1xuICAgICAgICBpZiAobm9ybWFsaXplZCkge1xuICAgICAgICAgIHJlcyArPSBub3JtYWxpemVkICsgXCIgXCI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KHZhbHVlKSkge1xuICAgICAgZm9yIChjb25zdCBuYW1lIGluIHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZVtuYW1lXSkge1xuICAgICAgICAgIHJlcyArPSBuYW1lICsgXCIgXCI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlcy50cmltKCk7XG4gIH1cbiAgdmFyIEhUTUxfVEFHUyA9IFwiaHRtbCxib2R5LGJhc2UsaGVhZCxsaW5rLG1ldGEsc3R5bGUsdGl0bGUsYWRkcmVzcyxhcnRpY2xlLGFzaWRlLGZvb3RlcixoZWFkZXIsaDEsaDIsaDMsaDQsaDUsaDYsaGdyb3VwLG5hdixzZWN0aW9uLGRpdixkZCxkbCxkdCxmaWdjYXB0aW9uLGZpZ3VyZSxwaWN0dXJlLGhyLGltZyxsaSxtYWluLG9sLHAscHJlLHVsLGEsYixhYmJyLGJkaSxiZG8sYnIsY2l0ZSxjb2RlLGRhdGEsZGZuLGVtLGksa2JkLG1hcmsscSxycCxydCxydGMscnVieSxzLHNhbXAsc21hbGwsc3BhbixzdHJvbmcsc3ViLHN1cCx0aW1lLHUsdmFyLHdicixhcmVhLGF1ZGlvLG1hcCx0cmFjayx2aWRlbyxlbWJlZCxvYmplY3QscGFyYW0sc291cmNlLGNhbnZhcyxzY3JpcHQsbm9zY3JpcHQsZGVsLGlucyxjYXB0aW9uLGNvbCxjb2xncm91cCx0YWJsZSx0aGVhZCx0Ym9keSx0ZCx0aCx0cixidXR0b24sZGF0YWxpc3QsZmllbGRzZXQsZm9ybSxpbnB1dCxsYWJlbCxsZWdlbmQsbWV0ZXIsb3B0Z3JvdXAsb3B0aW9uLG91dHB1dCxwcm9ncmVzcyxzZWxlY3QsdGV4dGFyZWEsZGV0YWlscyxkaWFsb2csbWVudSxzdW1tYXJ5LHRlbXBsYXRlLGJsb2NrcXVvdGUsaWZyYW1lLHRmb290XCI7XG4gIHZhciBTVkdfVEFHUyA9IFwic3ZnLGFuaW1hdGUsYW5pbWF0ZU1vdGlvbixhbmltYXRlVHJhbnNmb3JtLGNpcmNsZSxjbGlwUGF0aCxjb2xvci1wcm9maWxlLGRlZnMsZGVzYyxkaXNjYXJkLGVsbGlwc2UsZmVCbGVuZCxmZUNvbG9yTWF0cml4LGZlQ29tcG9uZW50VHJhbnNmZXIsZmVDb21wb3NpdGUsZmVDb252b2x2ZU1hdHJpeCxmZURpZmZ1c2VMaWdodGluZyxmZURpc3BsYWNlbWVudE1hcCxmZURpc3RhbmNlTGlnaHQsZmVEcm9wU2hhZG93LGZlRmxvb2QsZmVGdW5jQSxmZUZ1bmNCLGZlRnVuY0csZmVGdW5jUixmZUdhdXNzaWFuQmx1cixmZUltYWdlLGZlTWVyZ2UsZmVNZXJnZU5vZGUsZmVNb3JwaG9sb2d5LGZlT2Zmc2V0LGZlUG9pbnRMaWdodCxmZVNwZWN1bGFyTGlnaHRpbmcsZmVTcG90TGlnaHQsZmVUaWxlLGZlVHVyYnVsZW5jZSxmaWx0ZXIsZm9yZWlnbk9iamVjdCxnLGhhdGNoLGhhdGNocGF0aCxpbWFnZSxsaW5lLGxpbmVhckdyYWRpZW50LG1hcmtlcixtYXNrLG1lc2gsbWVzaGdyYWRpZW50LG1lc2hwYXRjaCxtZXNocm93LG1ldGFkYXRhLG1wYXRoLHBhdGgscGF0dGVybixwb2x5Z29uLHBvbHlsaW5lLHJhZGlhbEdyYWRpZW50LHJlY3Qsc2V0LHNvbGlkY29sb3Isc3RvcCxzd2l0Y2gsc3ltYm9sLHRleHQsdGV4dFBhdGgsdGl0bGUsdHNwYW4sdW5rbm93bix1c2Usdmlld1wiO1xuICB2YXIgVk9JRF9UQUdTID0gXCJhcmVhLGJhc2UsYnIsY29sLGVtYmVkLGhyLGltZyxpbnB1dCxsaW5rLG1ldGEscGFyYW0sc291cmNlLHRyYWNrLHdiclwiO1xuICB2YXIgaXNIVE1MVGFnID0gLyogQF9fUFVSRV9fICovIG1ha2VNYXAoSFRNTF9UQUdTKTtcbiAgdmFyIGlzU1ZHVGFnID0gLyogQF9fUFVSRV9fICovIG1ha2VNYXAoU1ZHX1RBR1MpO1xuICB2YXIgaXNWb2lkVGFnID0gLyogQF9fUFVSRV9fICovIG1ha2VNYXAoVk9JRF9UQUdTKTtcbiAgdmFyIGVzY2FwZVJFID0gL1tcIicmPD5dLztcbiAgZnVuY3Rpb24gZXNjYXBlSHRtbChzdHJpbmcpIHtcbiAgICBjb25zdCBzdHIgPSBcIlwiICsgc3RyaW5nO1xuICAgIGNvbnN0IG1hdGNoID0gZXNjYXBlUkUuZXhlYyhzdHIpO1xuICAgIGlmICghbWF0Y2gpIHtcbiAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuICAgIGxldCBodG1sID0gXCJcIjtcbiAgICBsZXQgZXNjYXBlZDtcbiAgICBsZXQgaW5kZXg7XG4gICAgbGV0IGxhc3RJbmRleCA9IDA7XG4gICAgZm9yIChpbmRleCA9IG1hdGNoLmluZGV4OyBpbmRleCA8IHN0ci5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIHN3aXRjaCAoc3RyLmNoYXJDb2RlQXQoaW5kZXgpKSB7XG4gICAgICAgIGNhc2UgMzQ6XG4gICAgICAgICAgZXNjYXBlZCA9IFwiJnF1b3Q7XCI7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMzg6XG4gICAgICAgICAgZXNjYXBlZCA9IFwiJmFtcDtcIjtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAzOTpcbiAgICAgICAgICBlc2NhcGVkID0gXCImIzM5O1wiO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDYwOlxuICAgICAgICAgIGVzY2FwZWQgPSBcIiZsdDtcIjtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA2MjpcbiAgICAgICAgICBlc2NhcGVkID0gXCImZ3Q7XCI7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAobGFzdEluZGV4ICE9PSBpbmRleCkge1xuICAgICAgICBodG1sICs9IHN0ci5zdWJzdHJpbmcobGFzdEluZGV4LCBpbmRleCk7XG4gICAgICB9XG4gICAgICBsYXN0SW5kZXggPSBpbmRleCArIDE7XG4gICAgICBodG1sICs9IGVzY2FwZWQ7XG4gICAgfVxuICAgIHJldHVybiBsYXN0SW5kZXggIT09IGluZGV4ID8gaHRtbCArIHN0ci5zdWJzdHJpbmcobGFzdEluZGV4LCBpbmRleCkgOiBodG1sO1xuICB9XG4gIHZhciBjb21tZW50U3RyaXBSRSA9IC9eLT8+fDwhLS18LS0+fC0tIT58PCEtJC9nO1xuICBmdW5jdGlvbiBlc2NhcGVIdG1sQ29tbWVudChzcmMpIHtcbiAgICByZXR1cm4gc3JjLnJlcGxhY2UoY29tbWVudFN0cmlwUkUsIFwiXCIpO1xuICB9XG4gIGZ1bmN0aW9uIGxvb3NlQ29tcGFyZUFycmF5cyhhLCBiKSB7XG4gICAgaWYgKGEubGVuZ3RoICE9PSBiLmxlbmd0aClcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBsZXQgZXF1YWwgPSB0cnVlO1xuICAgIGZvciAobGV0IGkgPSAwOyBlcXVhbCAmJiBpIDwgYS5sZW5ndGg7IGkrKykge1xuICAgICAgZXF1YWwgPSBsb29zZUVxdWFsKGFbaV0sIGJbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gZXF1YWw7XG4gIH1cbiAgZnVuY3Rpb24gbG9vc2VFcXVhbChhLCBiKSB7XG4gICAgaWYgKGEgPT09IGIpXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICBsZXQgYVZhbGlkVHlwZSA9IGlzRGF0ZShhKTtcbiAgICBsZXQgYlZhbGlkVHlwZSA9IGlzRGF0ZShiKTtcbiAgICBpZiAoYVZhbGlkVHlwZSB8fCBiVmFsaWRUeXBlKSB7XG4gICAgICByZXR1cm4gYVZhbGlkVHlwZSAmJiBiVmFsaWRUeXBlID8gYS5nZXRUaW1lKCkgPT09IGIuZ2V0VGltZSgpIDogZmFsc2U7XG4gICAgfVxuICAgIGFWYWxpZFR5cGUgPSBpc0FycmF5KGEpO1xuICAgIGJWYWxpZFR5cGUgPSBpc0FycmF5KGIpO1xuICAgIGlmIChhVmFsaWRUeXBlIHx8IGJWYWxpZFR5cGUpIHtcbiAgICAgIHJldHVybiBhVmFsaWRUeXBlICYmIGJWYWxpZFR5cGUgPyBsb29zZUNvbXBhcmVBcnJheXMoYSwgYikgOiBmYWxzZTtcbiAgICB9XG4gICAgYVZhbGlkVHlwZSA9IGlzT2JqZWN0KGEpO1xuICAgIGJWYWxpZFR5cGUgPSBpc09iamVjdChiKTtcbiAgICBpZiAoYVZhbGlkVHlwZSB8fCBiVmFsaWRUeXBlKSB7XG4gICAgICBpZiAoIWFWYWxpZFR5cGUgfHwgIWJWYWxpZFR5cGUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgY29uc3QgYUtleXNDb3VudCA9IE9iamVjdC5rZXlzKGEpLmxlbmd0aDtcbiAgICAgIGNvbnN0IGJLZXlzQ291bnQgPSBPYmplY3Qua2V5cyhiKS5sZW5ndGg7XG4gICAgICBpZiAoYUtleXNDb3VudCAhPT0gYktleXNDb3VudCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBhKSB7XG4gICAgICAgIGNvbnN0IGFIYXNLZXkgPSBhLmhhc093blByb3BlcnR5KGtleSk7XG4gICAgICAgIGNvbnN0IGJIYXNLZXkgPSBiLmhhc093blByb3BlcnR5KGtleSk7XG4gICAgICAgIGlmIChhSGFzS2V5ICYmICFiSGFzS2V5IHx8ICFhSGFzS2V5ICYmIGJIYXNLZXkgfHwgIWxvb3NlRXF1YWwoYVtrZXldLCBiW2tleV0pKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBTdHJpbmcoYSkgPT09IFN0cmluZyhiKTtcbiAgfVxuICBmdW5jdGlvbiBsb29zZUluZGV4T2YoYXJyLCB2YWwpIHtcbiAgICByZXR1cm4gYXJyLmZpbmRJbmRleCgoaXRlbSkgPT4gbG9vc2VFcXVhbChpdGVtLCB2YWwpKTtcbiAgfVxuICB2YXIgdG9EaXNwbGF5U3RyaW5nID0gKHZhbCkgPT4ge1xuICAgIHJldHVybiB2YWwgPT0gbnVsbCA/IFwiXCIgOiBpc09iamVjdCh2YWwpID8gSlNPTi5zdHJpbmdpZnkodmFsLCByZXBsYWNlciwgMikgOiBTdHJpbmcodmFsKTtcbiAgfTtcbiAgdmFyIHJlcGxhY2VyID0gKF9rZXksIHZhbCkgPT4ge1xuICAgIGlmIChpc01hcCh2YWwpKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBbYE1hcCgke3ZhbC5zaXplfSlgXTogWy4uLnZhbC5lbnRyaWVzKCldLnJlZHVjZSgoZW50cmllcywgW2tleSwgdmFsMl0pID0+IHtcbiAgICAgICAgICBlbnRyaWVzW2Ake2tleX0gPT5gXSA9IHZhbDI7XG4gICAgICAgICAgcmV0dXJuIGVudHJpZXM7XG4gICAgICAgIH0sIHt9KVxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKGlzU2V0KHZhbCkpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIFtgU2V0KCR7dmFsLnNpemV9KWBdOiBbLi4udmFsLnZhbHVlcygpXVxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KHZhbCkgJiYgIWlzQXJyYXkodmFsKSAmJiAhaXNQbGFpbk9iamVjdCh2YWwpKSB7XG4gICAgICByZXR1cm4gU3RyaW5nKHZhbCk7XG4gICAgfVxuICAgIHJldHVybiB2YWw7XG4gIH07XG4gIHZhciBiYWJlbFBhcnNlckRlZmF1bHRQbHVnaW5zID0gW1xuICAgIFwiYmlnSW50XCIsXG4gICAgXCJvcHRpb25hbENoYWluaW5nXCIsXG4gICAgXCJudWxsaXNoQ29hbGVzY2luZ09wZXJhdG9yXCJcbiAgXTtcbiAgdmFyIEVNUFRZX09CSiA9IE9iamVjdC5mcmVlemUoe30pO1xuICB2YXIgRU1QVFlfQVJSID0gT2JqZWN0LmZyZWV6ZShbXSk7XG4gIHZhciBOT09QID0gKCkgPT4ge1xuICB9O1xuICB2YXIgTk8gPSAoKSA9PiBmYWxzZTtcbiAgdmFyIG9uUkUgPSAvXm9uW15hLXpdLztcbiAgdmFyIGlzT24gPSAoa2V5KSA9PiBvblJFLnRlc3Qoa2V5KTtcbiAgdmFyIGlzTW9kZWxMaXN0ZW5lciA9IChrZXkpID0+IGtleS5zdGFydHNXaXRoKFwib25VcGRhdGU6XCIpO1xuICB2YXIgZXh0ZW5kID0gT2JqZWN0LmFzc2lnbjtcbiAgdmFyIHJlbW92ZSA9IChhcnIsIGVsKSA9PiB7XG4gICAgY29uc3QgaSA9IGFyci5pbmRleE9mKGVsKTtcbiAgICBpZiAoaSA+IC0xKSB7XG4gICAgICBhcnIuc3BsaWNlKGksIDEpO1xuICAgIH1cbiAgfTtcbiAgdmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbiAgdmFyIGhhc093biA9ICh2YWwsIGtleSkgPT4gaGFzT3duUHJvcGVydHkuY2FsbCh2YWwsIGtleSk7XG4gIHZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcbiAgdmFyIGlzTWFwID0gKHZhbCkgPT4gdG9UeXBlU3RyaW5nKHZhbCkgPT09IFwiW29iamVjdCBNYXBdXCI7XG4gIHZhciBpc1NldCA9ICh2YWwpID0+IHRvVHlwZVN0cmluZyh2YWwpID09PSBcIltvYmplY3QgU2V0XVwiO1xuICB2YXIgaXNEYXRlID0gKHZhbCkgPT4gdmFsIGluc3RhbmNlb2YgRGF0ZTtcbiAgdmFyIGlzRnVuY3Rpb24gPSAodmFsKSA9PiB0eXBlb2YgdmFsID09PSBcImZ1bmN0aW9uXCI7XG4gIHZhciBpc1N0cmluZyA9ICh2YWwpID0+IHR5cGVvZiB2YWwgPT09IFwic3RyaW5nXCI7XG4gIHZhciBpc1N5bWJvbCA9ICh2YWwpID0+IHR5cGVvZiB2YWwgPT09IFwic3ltYm9sXCI7XG4gIHZhciBpc09iamVjdCA9ICh2YWwpID0+IHZhbCAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsID09PSBcIm9iamVjdFwiO1xuICB2YXIgaXNQcm9taXNlID0gKHZhbCkgPT4ge1xuICAgIHJldHVybiBpc09iamVjdCh2YWwpICYmIGlzRnVuY3Rpb24odmFsLnRoZW4pICYmIGlzRnVuY3Rpb24odmFsLmNhdGNoKTtcbiAgfTtcbiAgdmFyIG9iamVjdFRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbiAgdmFyIHRvVHlwZVN0cmluZyA9ICh2YWx1ZSkgPT4gb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG4gIHZhciB0b1Jhd1R5cGUgPSAodmFsdWUpID0+IHtcbiAgICByZXR1cm4gdG9UeXBlU3RyaW5nKHZhbHVlKS5zbGljZSg4LCAtMSk7XG4gIH07XG4gIHZhciBpc1BsYWluT2JqZWN0ID0gKHZhbCkgPT4gdG9UeXBlU3RyaW5nKHZhbCkgPT09IFwiW29iamVjdCBPYmplY3RdXCI7XG4gIHZhciBpc0ludGVnZXJLZXkgPSAoa2V5KSA9PiBpc1N0cmluZyhrZXkpICYmIGtleSAhPT0gXCJOYU5cIiAmJiBrZXlbMF0gIT09IFwiLVwiICYmIFwiXCIgKyBwYXJzZUludChrZXksIDEwKSA9PT0ga2V5O1xuICB2YXIgaXNSZXNlcnZlZFByb3AgPSAvKiBAX19QVVJFX18gKi8gbWFrZU1hcChcIixrZXkscmVmLG9uVm5vZGVCZWZvcmVNb3VudCxvblZub2RlTW91bnRlZCxvblZub2RlQmVmb3JlVXBkYXRlLG9uVm5vZGVVcGRhdGVkLG9uVm5vZGVCZWZvcmVVbm1vdW50LG9uVm5vZGVVbm1vdW50ZWRcIik7XG4gIHZhciBjYWNoZVN0cmluZ0Z1bmN0aW9uID0gKGZuKSA9PiB7XG4gICAgY29uc3QgY2FjaGUgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHJldHVybiAoc3RyKSA9PiB7XG4gICAgICBjb25zdCBoaXQgPSBjYWNoZVtzdHJdO1xuICAgICAgcmV0dXJuIGhpdCB8fCAoY2FjaGVbc3RyXSA9IGZuKHN0cikpO1xuICAgIH07XG4gIH07XG4gIHZhciBjYW1lbGl6ZVJFID0gLy0oXFx3KS9nO1xuICB2YXIgY2FtZWxpemUgPSBjYWNoZVN0cmluZ0Z1bmN0aW9uKChzdHIpID0+IHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoY2FtZWxpemVSRSwgKF8sIGMpID0+IGMgPyBjLnRvVXBwZXJDYXNlKCkgOiBcIlwiKTtcbiAgfSk7XG4gIHZhciBoeXBoZW5hdGVSRSA9IC9cXEIoW0EtWl0pL2c7XG4gIHZhciBoeXBoZW5hdGUgPSBjYWNoZVN0cmluZ0Z1bmN0aW9uKChzdHIpID0+IHN0ci5yZXBsYWNlKGh5cGhlbmF0ZVJFLCBcIi0kMVwiKS50b0xvd2VyQ2FzZSgpKTtcbiAgdmFyIGNhcGl0YWxpemUgPSBjYWNoZVN0cmluZ0Z1bmN0aW9uKChzdHIpID0+IHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKSk7XG4gIHZhciB0b0hhbmRsZXJLZXkgPSBjYWNoZVN0cmluZ0Z1bmN0aW9uKChzdHIpID0+IHN0ciA/IGBvbiR7Y2FwaXRhbGl6ZShzdHIpfWAgOiBgYCk7XG4gIHZhciBoYXNDaGFuZ2VkID0gKHZhbHVlLCBvbGRWYWx1ZSkgPT4gdmFsdWUgIT09IG9sZFZhbHVlICYmICh2YWx1ZSA9PT0gdmFsdWUgfHwgb2xkVmFsdWUgPT09IG9sZFZhbHVlKTtcbiAgdmFyIGludm9rZUFycmF5Rm5zID0gKGZucywgYXJnKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGZuc1tpXShhcmcpO1xuICAgIH1cbiAgfTtcbiAgdmFyIGRlZiA9IChvYmosIGtleSwgdmFsdWUpID0+IHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgdmFsdWVcbiAgICB9KTtcbiAgfTtcbiAgdmFyIHRvTnVtYmVyID0gKHZhbCkgPT4ge1xuICAgIGNvbnN0IG4gPSBwYXJzZUZsb2F0KHZhbCk7XG4gICAgcmV0dXJuIGlzTmFOKG4pID8gdmFsIDogbjtcbiAgfTtcbiAgdmFyIF9nbG9iYWxUaGlzO1xuICB2YXIgZ2V0R2xvYmFsVGhpcyA9ICgpID0+IHtcbiAgICByZXR1cm4gX2dsb2JhbFRoaXMgfHwgKF9nbG9iYWxUaGlzID0gdHlwZW9mIGdsb2JhbFRoaXMgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxUaGlzIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB7fSk7XG4gIH07XG4gIGV4cG9ydHMuRU1QVFlfQVJSID0gRU1QVFlfQVJSO1xuICBleHBvcnRzLkVNUFRZX09CSiA9IEVNUFRZX09CSjtcbiAgZXhwb3J0cy5OTyA9IE5PO1xuICBleHBvcnRzLk5PT1AgPSBOT09QO1xuICBleHBvcnRzLlBhdGNoRmxhZ05hbWVzID0gUGF0Y2hGbGFnTmFtZXM7XG4gIGV4cG9ydHMuYmFiZWxQYXJzZXJEZWZhdWx0UGx1Z2lucyA9IGJhYmVsUGFyc2VyRGVmYXVsdFBsdWdpbnM7XG4gIGV4cG9ydHMuY2FtZWxpemUgPSBjYW1lbGl6ZTtcbiAgZXhwb3J0cy5jYXBpdGFsaXplID0gY2FwaXRhbGl6ZTtcbiAgZXhwb3J0cy5kZWYgPSBkZWY7XG4gIGV4cG9ydHMuZXNjYXBlSHRtbCA9IGVzY2FwZUh0bWw7XG4gIGV4cG9ydHMuZXNjYXBlSHRtbENvbW1lbnQgPSBlc2NhcGVIdG1sQ29tbWVudDtcbiAgZXhwb3J0cy5leHRlbmQgPSBleHRlbmQ7XG4gIGV4cG9ydHMuZ2VuZXJhdGVDb2RlRnJhbWUgPSBnZW5lcmF0ZUNvZGVGcmFtZTtcbiAgZXhwb3J0cy5nZXRHbG9iYWxUaGlzID0gZ2V0R2xvYmFsVGhpcztcbiAgZXhwb3J0cy5oYXNDaGFuZ2VkID0gaGFzQ2hhbmdlZDtcbiAgZXhwb3J0cy5oYXNPd24gPSBoYXNPd247XG4gIGV4cG9ydHMuaHlwaGVuYXRlID0gaHlwaGVuYXRlO1xuICBleHBvcnRzLmludm9rZUFycmF5Rm5zID0gaW52b2tlQXJyYXlGbnM7XG4gIGV4cG9ydHMuaXNBcnJheSA9IGlzQXJyYXk7XG4gIGV4cG9ydHMuaXNCb29sZWFuQXR0ciA9IGlzQm9vbGVhbkF0dHIyO1xuICBleHBvcnRzLmlzRGF0ZSA9IGlzRGF0ZTtcbiAgZXhwb3J0cy5pc0Z1bmN0aW9uID0gaXNGdW5jdGlvbjtcbiAgZXhwb3J0cy5pc0dsb2JhbGx5V2hpdGVsaXN0ZWQgPSBpc0dsb2JhbGx5V2hpdGVsaXN0ZWQ7XG4gIGV4cG9ydHMuaXNIVE1MVGFnID0gaXNIVE1MVGFnO1xuICBleHBvcnRzLmlzSW50ZWdlcktleSA9IGlzSW50ZWdlcktleTtcbiAgZXhwb3J0cy5pc0tub3duQXR0ciA9IGlzS25vd25BdHRyO1xuICBleHBvcnRzLmlzTWFwID0gaXNNYXA7XG4gIGV4cG9ydHMuaXNNb2RlbExpc3RlbmVyID0gaXNNb2RlbExpc3RlbmVyO1xuICBleHBvcnRzLmlzTm9Vbml0TnVtZXJpY1N0eWxlUHJvcCA9IGlzTm9Vbml0TnVtZXJpY1N0eWxlUHJvcDtcbiAgZXhwb3J0cy5pc09iamVjdCA9IGlzT2JqZWN0O1xuICBleHBvcnRzLmlzT24gPSBpc09uO1xuICBleHBvcnRzLmlzUGxhaW5PYmplY3QgPSBpc1BsYWluT2JqZWN0O1xuICBleHBvcnRzLmlzUHJvbWlzZSA9IGlzUHJvbWlzZTtcbiAgZXhwb3J0cy5pc1Jlc2VydmVkUHJvcCA9IGlzUmVzZXJ2ZWRQcm9wO1xuICBleHBvcnRzLmlzU1NSU2FmZUF0dHJOYW1lID0gaXNTU1JTYWZlQXR0ck5hbWU7XG4gIGV4cG9ydHMuaXNTVkdUYWcgPSBpc1NWR1RhZztcbiAgZXhwb3J0cy5pc1NldCA9IGlzU2V0O1xuICBleHBvcnRzLmlzU3BlY2lhbEJvb2xlYW5BdHRyID0gaXNTcGVjaWFsQm9vbGVhbkF0dHI7XG4gIGV4cG9ydHMuaXNTdHJpbmcgPSBpc1N0cmluZztcbiAgZXhwb3J0cy5pc1N5bWJvbCA9IGlzU3ltYm9sO1xuICBleHBvcnRzLmlzVm9pZFRhZyA9IGlzVm9pZFRhZztcbiAgZXhwb3J0cy5sb29zZUVxdWFsID0gbG9vc2VFcXVhbDtcbiAgZXhwb3J0cy5sb29zZUluZGV4T2YgPSBsb29zZUluZGV4T2Y7XG4gIGV4cG9ydHMubWFrZU1hcCA9IG1ha2VNYXA7XG4gIGV4cG9ydHMubm9ybWFsaXplQ2xhc3MgPSBub3JtYWxpemVDbGFzcztcbiAgZXhwb3J0cy5ub3JtYWxpemVTdHlsZSA9IG5vcm1hbGl6ZVN0eWxlO1xuICBleHBvcnRzLm9iamVjdFRvU3RyaW5nID0gb2JqZWN0VG9TdHJpbmc7XG4gIGV4cG9ydHMucGFyc2VTdHJpbmdTdHlsZSA9IHBhcnNlU3RyaW5nU3R5bGU7XG4gIGV4cG9ydHMucHJvcHNUb0F0dHJNYXAgPSBwcm9wc1RvQXR0ck1hcDtcbiAgZXhwb3J0cy5yZW1vdmUgPSByZW1vdmU7XG4gIGV4cG9ydHMuc2xvdEZsYWdzVGV4dCA9IHNsb3RGbGFnc1RleHQ7XG4gIGV4cG9ydHMuc3RyaW5naWZ5U3R5bGUgPSBzdHJpbmdpZnlTdHlsZTtcbiAgZXhwb3J0cy50b0Rpc3BsYXlTdHJpbmcgPSB0b0Rpc3BsYXlTdHJpbmc7XG4gIGV4cG9ydHMudG9IYW5kbGVyS2V5ID0gdG9IYW5kbGVyS2V5O1xuICBleHBvcnRzLnRvTnVtYmVyID0gdG9OdW1iZXI7XG4gIGV4cG9ydHMudG9SYXdUeXBlID0gdG9SYXdUeXBlO1xuICBleHBvcnRzLnRvVHlwZVN0cmluZyA9IHRvVHlwZVN0cmluZztcbn0pO1xuXG4vLyBub2RlX21vZHVsZXMvQHZ1ZS9zaGFyZWQvaW5kZXguanNcbnZhciByZXF1aXJlX3NoYXJlZCA9IF9fY29tbW9uSlMoKGV4cG9ydHMsIG1vZHVsZSkgPT4ge1xuICBcInVzZSBzdHJpY3RcIjtcbiAgaWYgKGZhbHNlKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBudWxsO1xuICB9IGVsc2Uge1xuICAgIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZV9zaGFyZWRfY2pzKCk7XG4gIH1cbn0pO1xuXG4vLyBub2RlX21vZHVsZXMvQHZ1ZS9yZWFjdGl2aXR5L2Rpc3QvcmVhY3Rpdml0eS5janMuanNcbnZhciByZXF1aXJlX3JlYWN0aXZpdHlfY2pzID0gX19jb21tb25KUygoZXhwb3J0cykgPT4ge1xuICBcInVzZSBzdHJpY3RcIjtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7dmFsdWU6IHRydWV9KTtcbiAgdmFyIHNoYXJlZCA9IHJlcXVpcmVfc2hhcmVkKCk7XG4gIHZhciB0YXJnZXRNYXAgPSBuZXcgV2Vha01hcCgpO1xuICB2YXIgZWZmZWN0U3RhY2sgPSBbXTtcbiAgdmFyIGFjdGl2ZUVmZmVjdDtcbiAgdmFyIElURVJBVEVfS0VZID0gU3ltYm9sKFwiaXRlcmF0ZVwiKTtcbiAgdmFyIE1BUF9LRVlfSVRFUkFURV9LRVkgPSBTeW1ib2woXCJNYXAga2V5IGl0ZXJhdGVcIik7XG4gIGZ1bmN0aW9uIGlzRWZmZWN0KGZuKSB7XG4gICAgcmV0dXJuIGZuICYmIGZuLl9pc0VmZmVjdCA9PT0gdHJ1ZTtcbiAgfVxuICBmdW5jdGlvbiBlZmZlY3QzKGZuLCBvcHRpb25zID0gc2hhcmVkLkVNUFRZX09CSikge1xuICAgIGlmIChpc0VmZmVjdChmbikpIHtcbiAgICAgIGZuID0gZm4ucmF3O1xuICAgIH1cbiAgICBjb25zdCBlZmZlY3Q0ID0gY3JlYXRlUmVhY3RpdmVFZmZlY3QoZm4sIG9wdGlvbnMpO1xuICAgIGlmICghb3B0aW9ucy5sYXp5KSB7XG4gICAgICBlZmZlY3Q0KCk7XG4gICAgfVxuICAgIHJldHVybiBlZmZlY3Q0O1xuICB9XG4gIGZ1bmN0aW9uIHN0b3AyKGVmZmVjdDQpIHtcbiAgICBpZiAoZWZmZWN0NC5hY3RpdmUpIHtcbiAgICAgIGNsZWFudXAoZWZmZWN0NCk7XG4gICAgICBpZiAoZWZmZWN0NC5vcHRpb25zLm9uU3RvcCkge1xuICAgICAgICBlZmZlY3Q0Lm9wdGlvbnMub25TdG9wKCk7XG4gICAgICB9XG4gICAgICBlZmZlY3Q0LmFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cbiAgfVxuICB2YXIgdWlkID0gMDtcbiAgZnVuY3Rpb24gY3JlYXRlUmVhY3RpdmVFZmZlY3QoZm4sIG9wdGlvbnMpIHtcbiAgICBjb25zdCBlZmZlY3Q0ID0gZnVuY3Rpb24gcmVhY3RpdmVFZmZlY3QoKSB7XG4gICAgICBpZiAoIWVmZmVjdDQuYWN0aXZlKSB7XG4gICAgICAgIHJldHVybiBmbigpO1xuICAgICAgfVxuICAgICAgaWYgKCFlZmZlY3RTdGFjay5pbmNsdWRlcyhlZmZlY3Q0KSkge1xuICAgICAgICBjbGVhbnVwKGVmZmVjdDQpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGVuYWJsZVRyYWNraW5nKCk7XG4gICAgICAgICAgZWZmZWN0U3RhY2sucHVzaChlZmZlY3Q0KTtcbiAgICAgICAgICBhY3RpdmVFZmZlY3QgPSBlZmZlY3Q0O1xuICAgICAgICAgIHJldHVybiBmbigpO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIGVmZmVjdFN0YWNrLnBvcCgpO1xuICAgICAgICAgIHJlc2V0VHJhY2tpbmcoKTtcbiAgICAgICAgICBhY3RpdmVFZmZlY3QgPSBlZmZlY3RTdGFja1tlZmZlY3RTdGFjay5sZW5ndGggLSAxXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgZWZmZWN0NC5pZCA9IHVpZCsrO1xuICAgIGVmZmVjdDQuYWxsb3dSZWN1cnNlID0gISFvcHRpb25zLmFsbG93UmVjdXJzZTtcbiAgICBlZmZlY3Q0Ll9pc0VmZmVjdCA9IHRydWU7XG4gICAgZWZmZWN0NC5hY3RpdmUgPSB0cnVlO1xuICAgIGVmZmVjdDQucmF3ID0gZm47XG4gICAgZWZmZWN0NC5kZXBzID0gW107XG4gICAgZWZmZWN0NC5vcHRpb25zID0gb3B0aW9ucztcbiAgICByZXR1cm4gZWZmZWN0NDtcbiAgfVxuICBmdW5jdGlvbiBjbGVhbnVwKGVmZmVjdDQpIHtcbiAgICBjb25zdCB7ZGVwc30gPSBlZmZlY3Q0O1xuICAgIGlmIChkZXBzLmxlbmd0aCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGRlcHNbaV0uZGVsZXRlKGVmZmVjdDQpO1xuICAgICAgfVxuICAgICAgZGVwcy5sZW5ndGggPSAwO1xuICAgIH1cbiAgfVxuICB2YXIgc2hvdWxkVHJhY2sgPSB0cnVlO1xuICB2YXIgdHJhY2tTdGFjayA9IFtdO1xuICBmdW5jdGlvbiBwYXVzZVRyYWNraW5nKCkge1xuICAgIHRyYWNrU3RhY2sucHVzaChzaG91bGRUcmFjayk7XG4gICAgc2hvdWxkVHJhY2sgPSBmYWxzZTtcbiAgfVxuICBmdW5jdGlvbiBlbmFibGVUcmFja2luZygpIHtcbiAgICB0cmFja1N0YWNrLnB1c2goc2hvdWxkVHJhY2spO1xuICAgIHNob3VsZFRyYWNrID0gdHJ1ZTtcbiAgfVxuICBmdW5jdGlvbiByZXNldFRyYWNraW5nKCkge1xuICAgIGNvbnN0IGxhc3QgPSB0cmFja1N0YWNrLnBvcCgpO1xuICAgIHNob3VsZFRyYWNrID0gbGFzdCA9PT0gdm9pZCAwID8gdHJ1ZSA6IGxhc3Q7XG4gIH1cbiAgZnVuY3Rpb24gdHJhY2sodGFyZ2V0LCB0eXBlLCBrZXkpIHtcbiAgICBpZiAoIXNob3VsZFRyYWNrIHx8IGFjdGl2ZUVmZmVjdCA9PT0gdm9pZCAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBkZXBzTWFwID0gdGFyZ2V0TWFwLmdldCh0YXJnZXQpO1xuICAgIGlmICghZGVwc01hcCkge1xuICAgICAgdGFyZ2V0TWFwLnNldCh0YXJnZXQsIGRlcHNNYXAgPSBuZXcgTWFwKCkpO1xuICAgIH1cbiAgICBsZXQgZGVwID0gZGVwc01hcC5nZXQoa2V5KTtcbiAgICBpZiAoIWRlcCkge1xuICAgICAgZGVwc01hcC5zZXQoa2V5LCBkZXAgPSBuZXcgU2V0KCkpO1xuICAgIH1cbiAgICBpZiAoIWRlcC5oYXMoYWN0aXZlRWZmZWN0KSkge1xuICAgICAgZGVwLmFkZChhY3RpdmVFZmZlY3QpO1xuICAgICAgYWN0aXZlRWZmZWN0LmRlcHMucHVzaChkZXApO1xuICAgICAgaWYgKGFjdGl2ZUVmZmVjdC5vcHRpb25zLm9uVHJhY2spIHtcbiAgICAgICAgYWN0aXZlRWZmZWN0Lm9wdGlvbnMub25UcmFjayh7XG4gICAgICAgICAgZWZmZWN0OiBhY3RpdmVFZmZlY3QsXG4gICAgICAgICAgdGFyZ2V0LFxuICAgICAgICAgIHR5cGUsXG4gICAgICAgICAga2V5XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBmdW5jdGlvbiB0cmlnZ2VyKHRhcmdldCwgdHlwZSwga2V5LCBuZXdWYWx1ZSwgb2xkVmFsdWUsIG9sZFRhcmdldCkge1xuICAgIGNvbnN0IGRlcHNNYXAgPSB0YXJnZXRNYXAuZ2V0KHRhcmdldCk7XG4gICAgaWYgKCFkZXBzTWFwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGVmZmVjdHMgPSBuZXcgU2V0KCk7XG4gICAgY29uc3QgYWRkMiA9IChlZmZlY3RzVG9BZGQpID0+IHtcbiAgICAgIGlmIChlZmZlY3RzVG9BZGQpIHtcbiAgICAgICAgZWZmZWN0c1RvQWRkLmZvckVhY2goKGVmZmVjdDQpID0+IHtcbiAgICAgICAgICBpZiAoZWZmZWN0NCAhPT0gYWN0aXZlRWZmZWN0IHx8IGVmZmVjdDQuYWxsb3dSZWN1cnNlKSB7XG4gICAgICAgICAgICBlZmZlY3RzLmFkZChlZmZlY3Q0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gICAgaWYgKHR5cGUgPT09IFwiY2xlYXJcIikge1xuICAgICAgZGVwc01hcC5mb3JFYWNoKGFkZDIpO1xuICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcImxlbmd0aFwiICYmIHNoYXJlZC5pc0FycmF5KHRhcmdldCkpIHtcbiAgICAgIGRlcHNNYXAuZm9yRWFjaCgoZGVwLCBrZXkyKSA9PiB7XG4gICAgICAgIGlmIChrZXkyID09PSBcImxlbmd0aFwiIHx8IGtleTIgPj0gbmV3VmFsdWUpIHtcbiAgICAgICAgICBhZGQyKGRlcCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoa2V5ICE9PSB2b2lkIDApIHtcbiAgICAgICAgYWRkMihkZXBzTWFwLmdldChrZXkpKTtcbiAgICAgIH1cbiAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIFwiYWRkXCI6XG4gICAgICAgICAgaWYgKCFzaGFyZWQuaXNBcnJheSh0YXJnZXQpKSB7XG4gICAgICAgICAgICBhZGQyKGRlcHNNYXAuZ2V0KElURVJBVEVfS0VZKSk7XG4gICAgICAgICAgICBpZiAoc2hhcmVkLmlzTWFwKHRhcmdldCkpIHtcbiAgICAgICAgICAgICAgYWRkMihkZXBzTWFwLmdldChNQVBfS0VZX0lURVJBVEVfS0VZKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChzaGFyZWQuaXNJbnRlZ2VyS2V5KGtleSkpIHtcbiAgICAgICAgICAgIGFkZDIoZGVwc01hcC5nZXQoXCJsZW5ndGhcIikpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImRlbGV0ZVwiOlxuICAgICAgICAgIGlmICghc2hhcmVkLmlzQXJyYXkodGFyZ2V0KSkge1xuICAgICAgICAgICAgYWRkMihkZXBzTWFwLmdldChJVEVSQVRFX0tFWSkpO1xuICAgICAgICAgICAgaWYgKHNoYXJlZC5pc01hcCh0YXJnZXQpKSB7XG4gICAgICAgICAgICAgIGFkZDIoZGVwc01hcC5nZXQoTUFQX0tFWV9JVEVSQVRFX0tFWSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInNldFwiOlxuICAgICAgICAgIGlmIChzaGFyZWQuaXNNYXAodGFyZ2V0KSkge1xuICAgICAgICAgICAgYWRkMihkZXBzTWFwLmdldChJVEVSQVRFX0tFWSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgcnVuID0gKGVmZmVjdDQpID0+IHtcbiAgICAgIGlmIChlZmZlY3Q0Lm9wdGlvbnMub25UcmlnZ2VyKSB7XG4gICAgICAgIGVmZmVjdDQub3B0aW9ucy5vblRyaWdnZXIoe1xuICAgICAgICAgIGVmZmVjdDogZWZmZWN0NCxcbiAgICAgICAgICB0YXJnZXQsXG4gICAgICAgICAga2V5LFxuICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgbmV3VmFsdWUsXG4gICAgICAgICAgb2xkVmFsdWUsXG4gICAgICAgICAgb2xkVGFyZ2V0XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKGVmZmVjdDQub3B0aW9ucy5zY2hlZHVsZXIpIHtcbiAgICAgICAgZWZmZWN0NC5vcHRpb25zLnNjaGVkdWxlcihlZmZlY3Q0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVmZmVjdDQoKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGVmZmVjdHMuZm9yRWFjaChydW4pO1xuICB9XG4gIHZhciBpc05vblRyYWNrYWJsZUtleXMgPSAvKiBAX19QVVJFX18gKi8gc2hhcmVkLm1ha2VNYXAoYF9fcHJvdG9fXyxfX3ZfaXNSZWYsX19pc1Z1ZWApO1xuICB2YXIgYnVpbHRJblN5bWJvbHMgPSBuZXcgU2V0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKFN5bWJvbCkubWFwKChrZXkpID0+IFN5bWJvbFtrZXldKS5maWx0ZXIoc2hhcmVkLmlzU3ltYm9sKSk7XG4gIHZhciBnZXQyID0gLyogQF9fUFVSRV9fICovIGNyZWF0ZUdldHRlcigpO1xuICB2YXIgc2hhbGxvd0dldCA9IC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVHZXR0ZXIoZmFsc2UsIHRydWUpO1xuICB2YXIgcmVhZG9ubHlHZXQgPSAvKiBAX19QVVJFX18gKi8gY3JlYXRlR2V0dGVyKHRydWUpO1xuICB2YXIgc2hhbGxvd1JlYWRvbmx5R2V0ID0gLyogQF9fUFVSRV9fICovIGNyZWF0ZUdldHRlcih0cnVlLCB0cnVlKTtcbiAgdmFyIGFycmF5SW5zdHJ1bWVudGF0aW9ucyA9IHt9O1xuICBbXCJpbmNsdWRlc1wiLCBcImluZGV4T2ZcIiwgXCJsYXN0SW5kZXhPZlwiXS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICBjb25zdCBtZXRob2QgPSBBcnJheS5wcm90b3R5cGVba2V5XTtcbiAgICBhcnJheUluc3RydW1lbnRhdGlvbnNba2V5XSA9IGZ1bmN0aW9uKC4uLmFyZ3MpIHtcbiAgICAgIGNvbnN0IGFyciA9IHRvUmF3Mih0aGlzKTtcbiAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gdGhpcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgdHJhY2soYXJyLCBcImdldFwiLCBpICsgXCJcIik7XG4gICAgICB9XG4gICAgICBjb25zdCByZXMgPSBtZXRob2QuYXBwbHkoYXJyLCBhcmdzKTtcbiAgICAgIGlmIChyZXMgPT09IC0xIHx8IHJlcyA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIG1ldGhvZC5hcHBseShhcnIsIGFyZ3MubWFwKHRvUmF3MikpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbiAgW1wicHVzaFwiLCBcInBvcFwiLCBcInNoaWZ0XCIsIFwidW5zaGlmdFwiLCBcInNwbGljZVwiXS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICBjb25zdCBtZXRob2QgPSBBcnJheS5wcm90b3R5cGVba2V5XTtcbiAgICBhcnJheUluc3RydW1lbnRhdGlvbnNba2V5XSA9IGZ1bmN0aW9uKC4uLmFyZ3MpIHtcbiAgICAgIHBhdXNlVHJhY2tpbmcoKTtcbiAgICAgIGNvbnN0IHJlcyA9IG1ldGhvZC5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgIHJlc2V0VHJhY2tpbmcoKTtcbiAgICAgIHJldHVybiByZXM7XG4gICAgfTtcbiAgfSk7XG4gIGZ1bmN0aW9uIGNyZWF0ZUdldHRlcihpc1JlYWRvbmx5MiA9IGZhbHNlLCBzaGFsbG93ID0gZmFsc2UpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gZ2V0Myh0YXJnZXQsIGtleSwgcmVjZWl2ZXIpIHtcbiAgICAgIGlmIChrZXkgPT09IFwiX192X2lzUmVhY3RpdmVcIikge1xuICAgICAgICByZXR1cm4gIWlzUmVhZG9ubHkyO1xuICAgICAgfSBlbHNlIGlmIChrZXkgPT09IFwiX192X2lzUmVhZG9ubHlcIikge1xuICAgICAgICByZXR1cm4gaXNSZWFkb25seTI7XG4gICAgICB9IGVsc2UgaWYgKGtleSA9PT0gXCJfX3ZfcmF3XCIgJiYgcmVjZWl2ZXIgPT09IChpc1JlYWRvbmx5MiA/IHNoYWxsb3cgPyBzaGFsbG93UmVhZG9ubHlNYXAgOiByZWFkb25seU1hcCA6IHNoYWxsb3cgPyBzaGFsbG93UmVhY3RpdmVNYXAgOiByZWFjdGl2ZU1hcCkuZ2V0KHRhcmdldCkpIHtcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHRhcmdldElzQXJyYXkgPSBzaGFyZWQuaXNBcnJheSh0YXJnZXQpO1xuICAgICAgaWYgKCFpc1JlYWRvbmx5MiAmJiB0YXJnZXRJc0FycmF5ICYmIHNoYXJlZC5oYXNPd24oYXJyYXlJbnN0cnVtZW50YXRpb25zLCBrZXkpKSB7XG4gICAgICAgIHJldHVybiBSZWZsZWN0LmdldChhcnJheUluc3RydW1lbnRhdGlvbnMsIGtleSwgcmVjZWl2ZXIpO1xuICAgICAgfVxuICAgICAgY29uc3QgcmVzID0gUmVmbGVjdC5nZXQodGFyZ2V0LCBrZXksIHJlY2VpdmVyKTtcbiAgICAgIGlmIChzaGFyZWQuaXNTeW1ib2woa2V5KSA/IGJ1aWx0SW5TeW1ib2xzLmhhcyhrZXkpIDogaXNOb25UcmFja2FibGVLZXlzKGtleSkpIHtcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgIH1cbiAgICAgIGlmICghaXNSZWFkb25seTIpIHtcbiAgICAgICAgdHJhY2sodGFyZ2V0LCBcImdldFwiLCBrZXkpO1xuICAgICAgfVxuICAgICAgaWYgKHNoYWxsb3cpIHtcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgIH1cbiAgICAgIGlmIChpc1JlZihyZXMpKSB7XG4gICAgICAgIGNvbnN0IHNob3VsZFVud3JhcCA9ICF0YXJnZXRJc0FycmF5IHx8ICFzaGFyZWQuaXNJbnRlZ2VyS2V5KGtleSk7XG4gICAgICAgIHJldHVybiBzaG91bGRVbndyYXAgPyByZXMudmFsdWUgOiByZXM7XG4gICAgICB9XG4gICAgICBpZiAoc2hhcmVkLmlzT2JqZWN0KHJlcykpIHtcbiAgICAgICAgcmV0dXJuIGlzUmVhZG9ubHkyID8gcmVhZG9ubHkocmVzKSA6IHJlYWN0aXZlMyhyZXMpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlcztcbiAgICB9O1xuICB9XG4gIHZhciBzZXQyID0gLyogQF9fUFVSRV9fICovIGNyZWF0ZVNldHRlcigpO1xuICB2YXIgc2hhbGxvd1NldCA9IC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVTZXR0ZXIodHJ1ZSk7XG4gIGZ1bmN0aW9uIGNyZWF0ZVNldHRlcihzaGFsbG93ID0gZmFsc2UpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gc2V0Myh0YXJnZXQsIGtleSwgdmFsdWUsIHJlY2VpdmVyKSB7XG4gICAgICBsZXQgb2xkVmFsdWUgPSB0YXJnZXRba2V5XTtcbiAgICAgIGlmICghc2hhbGxvdykge1xuICAgICAgICB2YWx1ZSA9IHRvUmF3Mih2YWx1ZSk7XG4gICAgICAgIG9sZFZhbHVlID0gdG9SYXcyKG9sZFZhbHVlKTtcbiAgICAgICAgaWYgKCFzaGFyZWQuaXNBcnJheSh0YXJnZXQpICYmIGlzUmVmKG9sZFZhbHVlKSAmJiAhaXNSZWYodmFsdWUpKSB7XG4gICAgICAgICAgb2xkVmFsdWUudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc3QgaGFkS2V5ID0gc2hhcmVkLmlzQXJyYXkodGFyZ2V0KSAmJiBzaGFyZWQuaXNJbnRlZ2VyS2V5KGtleSkgPyBOdW1iZXIoa2V5KSA8IHRhcmdldC5sZW5ndGggOiBzaGFyZWQuaGFzT3duKHRhcmdldCwga2V5KTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IFJlZmxlY3Quc2V0KHRhcmdldCwga2V5LCB2YWx1ZSwgcmVjZWl2ZXIpO1xuICAgICAgaWYgKHRhcmdldCA9PT0gdG9SYXcyKHJlY2VpdmVyKSkge1xuICAgICAgICBpZiAoIWhhZEtleSkge1xuICAgICAgICAgIHRyaWdnZXIodGFyZ2V0LCBcImFkZFwiLCBrZXksIHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIGlmIChzaGFyZWQuaGFzQ2hhbmdlZCh2YWx1ZSwgb2xkVmFsdWUpKSB7XG4gICAgICAgICAgdHJpZ2dlcih0YXJnZXQsIFwic2V0XCIsIGtleSwgdmFsdWUsIG9sZFZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIGRlbGV0ZVByb3BlcnR5KHRhcmdldCwga2V5KSB7XG4gICAgY29uc3QgaGFkS2V5ID0gc2hhcmVkLmhhc093bih0YXJnZXQsIGtleSk7XG4gICAgY29uc3Qgb2xkVmFsdWUgPSB0YXJnZXRba2V5XTtcbiAgICBjb25zdCByZXN1bHQgPSBSZWZsZWN0LmRlbGV0ZVByb3BlcnR5KHRhcmdldCwga2V5KTtcbiAgICBpZiAocmVzdWx0ICYmIGhhZEtleSkge1xuICAgICAgdHJpZ2dlcih0YXJnZXQsIFwiZGVsZXRlXCIsIGtleSwgdm9pZCAwLCBvbGRWYWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgZnVuY3Rpb24gaGFzKHRhcmdldCwga2V5KSB7XG4gICAgY29uc3QgcmVzdWx0ID0gUmVmbGVjdC5oYXModGFyZ2V0LCBrZXkpO1xuICAgIGlmICghc2hhcmVkLmlzU3ltYm9sKGtleSkgfHwgIWJ1aWx0SW5TeW1ib2xzLmhhcyhrZXkpKSB7XG4gICAgICB0cmFjayh0YXJnZXQsIFwiaGFzXCIsIGtleSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgZnVuY3Rpb24gb3duS2V5cyh0YXJnZXQpIHtcbiAgICB0cmFjayh0YXJnZXQsIFwiaXRlcmF0ZVwiLCBzaGFyZWQuaXNBcnJheSh0YXJnZXQpID8gXCJsZW5ndGhcIiA6IElURVJBVEVfS0VZKTtcbiAgICByZXR1cm4gUmVmbGVjdC5vd25LZXlzKHRhcmdldCk7XG4gIH1cbiAgdmFyIG11dGFibGVIYW5kbGVycyA9IHtcbiAgICBnZXQ6IGdldDIsXG4gICAgc2V0OiBzZXQyLFxuICAgIGRlbGV0ZVByb3BlcnR5LFxuICAgIGhhcyxcbiAgICBvd25LZXlzXG4gIH07XG4gIHZhciByZWFkb25seUhhbmRsZXJzID0ge1xuICAgIGdldDogcmVhZG9ubHlHZXQsXG4gICAgc2V0KHRhcmdldCwga2V5KSB7XG4gICAgICB7XG4gICAgICAgIGNvbnNvbGUud2FybihgU2V0IG9wZXJhdGlvbiBvbiBrZXkgXCIke1N0cmluZyhrZXkpfVwiIGZhaWxlZDogdGFyZ2V0IGlzIHJlYWRvbmx5LmAsIHRhcmdldCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuICAgIGRlbGV0ZVByb3BlcnR5KHRhcmdldCwga2V5KSB7XG4gICAgICB7XG4gICAgICAgIGNvbnNvbGUud2FybihgRGVsZXRlIG9wZXJhdGlvbiBvbiBrZXkgXCIke1N0cmluZyhrZXkpfVwiIGZhaWxlZDogdGFyZ2V0IGlzIHJlYWRvbmx5LmAsIHRhcmdldCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH07XG4gIHZhciBzaGFsbG93UmVhY3RpdmVIYW5kbGVycyA9IHNoYXJlZC5leHRlbmQoe30sIG11dGFibGVIYW5kbGVycywge1xuICAgIGdldDogc2hhbGxvd0dldCxcbiAgICBzZXQ6IHNoYWxsb3dTZXRcbiAgfSk7XG4gIHZhciBzaGFsbG93UmVhZG9ubHlIYW5kbGVycyA9IHNoYXJlZC5leHRlbmQoe30sIHJlYWRvbmx5SGFuZGxlcnMsIHtcbiAgICBnZXQ6IHNoYWxsb3dSZWFkb25seUdldFxuICB9KTtcbiAgdmFyIHRvUmVhY3RpdmUgPSAodmFsdWUpID0+IHNoYXJlZC5pc09iamVjdCh2YWx1ZSkgPyByZWFjdGl2ZTModmFsdWUpIDogdmFsdWU7XG4gIHZhciB0b1JlYWRvbmx5ID0gKHZhbHVlKSA9PiBzaGFyZWQuaXNPYmplY3QodmFsdWUpID8gcmVhZG9ubHkodmFsdWUpIDogdmFsdWU7XG4gIHZhciB0b1NoYWxsb3cgPSAodmFsdWUpID0+IHZhbHVlO1xuICB2YXIgZ2V0UHJvdG8gPSAodikgPT4gUmVmbGVjdC5nZXRQcm90b3R5cGVPZih2KTtcbiAgZnVuY3Rpb24gZ2V0JDEodGFyZ2V0LCBrZXksIGlzUmVhZG9ubHkyID0gZmFsc2UsIGlzU2hhbGxvdyA9IGZhbHNlKSB7XG4gICAgdGFyZ2V0ID0gdGFyZ2V0W1wiX192X3Jhd1wiXTtcbiAgICBjb25zdCByYXdUYXJnZXQgPSB0b1JhdzIodGFyZ2V0KTtcbiAgICBjb25zdCByYXdLZXkgPSB0b1JhdzIoa2V5KTtcbiAgICBpZiAoa2V5ICE9PSByYXdLZXkpIHtcbiAgICAgICFpc1JlYWRvbmx5MiAmJiB0cmFjayhyYXdUYXJnZXQsIFwiZ2V0XCIsIGtleSk7XG4gICAgfVxuICAgICFpc1JlYWRvbmx5MiAmJiB0cmFjayhyYXdUYXJnZXQsIFwiZ2V0XCIsIHJhd0tleSk7XG4gICAgY29uc3Qge2hhczogaGFzMn0gPSBnZXRQcm90byhyYXdUYXJnZXQpO1xuICAgIGNvbnN0IHdyYXAgPSBpc1NoYWxsb3cgPyB0b1NoYWxsb3cgOiBpc1JlYWRvbmx5MiA/IHRvUmVhZG9ubHkgOiB0b1JlYWN0aXZlO1xuICAgIGlmIChoYXMyLmNhbGwocmF3VGFyZ2V0LCBrZXkpKSB7XG4gICAgICByZXR1cm4gd3JhcCh0YXJnZXQuZ2V0KGtleSkpO1xuICAgIH0gZWxzZSBpZiAoaGFzMi5jYWxsKHJhd1RhcmdldCwgcmF3S2V5KSkge1xuICAgICAgcmV0dXJuIHdyYXAodGFyZ2V0LmdldChyYXdLZXkpKTtcbiAgICB9IGVsc2UgaWYgKHRhcmdldCAhPT0gcmF3VGFyZ2V0KSB7XG4gICAgICB0YXJnZXQuZ2V0KGtleSk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIGhhcyQxKGtleSwgaXNSZWFkb25seTIgPSBmYWxzZSkge1xuICAgIGNvbnN0IHRhcmdldCA9IHRoaXNbXCJfX3ZfcmF3XCJdO1xuICAgIGNvbnN0IHJhd1RhcmdldCA9IHRvUmF3Mih0YXJnZXQpO1xuICAgIGNvbnN0IHJhd0tleSA9IHRvUmF3MihrZXkpO1xuICAgIGlmIChrZXkgIT09IHJhd0tleSkge1xuICAgICAgIWlzUmVhZG9ubHkyICYmIHRyYWNrKHJhd1RhcmdldCwgXCJoYXNcIiwga2V5KTtcbiAgICB9XG4gICAgIWlzUmVhZG9ubHkyICYmIHRyYWNrKHJhd1RhcmdldCwgXCJoYXNcIiwgcmF3S2V5KTtcbiAgICByZXR1cm4ga2V5ID09PSByYXdLZXkgPyB0YXJnZXQuaGFzKGtleSkgOiB0YXJnZXQuaGFzKGtleSkgfHwgdGFyZ2V0LmhhcyhyYXdLZXkpO1xuICB9XG4gIGZ1bmN0aW9uIHNpemUodGFyZ2V0LCBpc1JlYWRvbmx5MiA9IGZhbHNlKSB7XG4gICAgdGFyZ2V0ID0gdGFyZ2V0W1wiX192X3Jhd1wiXTtcbiAgICAhaXNSZWFkb25seTIgJiYgdHJhY2sodG9SYXcyKHRhcmdldCksIFwiaXRlcmF0ZVwiLCBJVEVSQVRFX0tFWSk7XG4gICAgcmV0dXJuIFJlZmxlY3QuZ2V0KHRhcmdldCwgXCJzaXplXCIsIHRhcmdldCk7XG4gIH1cbiAgZnVuY3Rpb24gYWRkKHZhbHVlKSB7XG4gICAgdmFsdWUgPSB0b1JhdzIodmFsdWUpO1xuICAgIGNvbnN0IHRhcmdldCA9IHRvUmF3Mih0aGlzKTtcbiAgICBjb25zdCBwcm90byA9IGdldFByb3RvKHRhcmdldCk7XG4gICAgY29uc3QgaGFkS2V5ID0gcHJvdG8uaGFzLmNhbGwodGFyZ2V0LCB2YWx1ZSk7XG4gICAgaWYgKCFoYWRLZXkpIHtcbiAgICAgIHRhcmdldC5hZGQodmFsdWUpO1xuICAgICAgdHJpZ2dlcih0YXJnZXQsIFwiYWRkXCIsIHZhbHVlLCB2YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGZ1bmN0aW9uIHNldCQxKGtleSwgdmFsdWUpIHtcbiAgICB2YWx1ZSA9IHRvUmF3Mih2YWx1ZSk7XG4gICAgY29uc3QgdGFyZ2V0ID0gdG9SYXcyKHRoaXMpO1xuICAgIGNvbnN0IHtoYXM6IGhhczIsIGdldDogZ2V0M30gPSBnZXRQcm90byh0YXJnZXQpO1xuICAgIGxldCBoYWRLZXkgPSBoYXMyLmNhbGwodGFyZ2V0LCBrZXkpO1xuICAgIGlmICghaGFkS2V5KSB7XG4gICAgICBrZXkgPSB0b1JhdzIoa2V5KTtcbiAgICAgIGhhZEtleSA9IGhhczIuY2FsbCh0YXJnZXQsIGtleSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNoZWNrSWRlbnRpdHlLZXlzKHRhcmdldCwgaGFzMiwga2V5KTtcbiAgICB9XG4gICAgY29uc3Qgb2xkVmFsdWUgPSBnZXQzLmNhbGwodGFyZ2V0LCBrZXkpO1xuICAgIHRhcmdldC5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgaWYgKCFoYWRLZXkpIHtcbiAgICAgIHRyaWdnZXIodGFyZ2V0LCBcImFkZFwiLCBrZXksIHZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKHNoYXJlZC5oYXNDaGFuZ2VkKHZhbHVlLCBvbGRWYWx1ZSkpIHtcbiAgICAgIHRyaWdnZXIodGFyZ2V0LCBcInNldFwiLCBrZXksIHZhbHVlLCBvbGRWYWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGZ1bmN0aW9uIGRlbGV0ZUVudHJ5KGtleSkge1xuICAgIGNvbnN0IHRhcmdldCA9IHRvUmF3Mih0aGlzKTtcbiAgICBjb25zdCB7aGFzOiBoYXMyLCBnZXQ6IGdldDN9ID0gZ2V0UHJvdG8odGFyZ2V0KTtcbiAgICBsZXQgaGFkS2V5ID0gaGFzMi5jYWxsKHRhcmdldCwga2V5KTtcbiAgICBpZiAoIWhhZEtleSkge1xuICAgICAga2V5ID0gdG9SYXcyKGtleSk7XG4gICAgICBoYWRLZXkgPSBoYXMyLmNhbGwodGFyZ2V0LCBrZXkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjaGVja0lkZW50aXR5S2V5cyh0YXJnZXQsIGhhczIsIGtleSk7XG4gICAgfVxuICAgIGNvbnN0IG9sZFZhbHVlID0gZ2V0MyA/IGdldDMuY2FsbCh0YXJnZXQsIGtleSkgOiB2b2lkIDA7XG4gICAgY29uc3QgcmVzdWx0ID0gdGFyZ2V0LmRlbGV0ZShrZXkpO1xuICAgIGlmIChoYWRLZXkpIHtcbiAgICAgIHRyaWdnZXIodGFyZ2V0LCBcImRlbGV0ZVwiLCBrZXksIHZvaWQgMCwgb2xkVmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgIGNvbnN0IHRhcmdldCA9IHRvUmF3Mih0aGlzKTtcbiAgICBjb25zdCBoYWRJdGVtcyA9IHRhcmdldC5zaXplICE9PSAwO1xuICAgIGNvbnN0IG9sZFRhcmdldCA9IHNoYXJlZC5pc01hcCh0YXJnZXQpID8gbmV3IE1hcCh0YXJnZXQpIDogbmV3IFNldCh0YXJnZXQpO1xuICAgIGNvbnN0IHJlc3VsdCA9IHRhcmdldC5jbGVhcigpO1xuICAgIGlmIChoYWRJdGVtcykge1xuICAgICAgdHJpZ2dlcih0YXJnZXQsIFwiY2xlYXJcIiwgdm9pZCAwLCB2b2lkIDAsIG9sZFRhcmdldCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgZnVuY3Rpb24gY3JlYXRlRm9yRWFjaChpc1JlYWRvbmx5MiwgaXNTaGFsbG93KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGZvckVhY2goY2FsbGJhY2ssIHRoaXNBcmcpIHtcbiAgICAgIGNvbnN0IG9ic2VydmVkID0gdGhpcztcbiAgICAgIGNvbnN0IHRhcmdldCA9IG9ic2VydmVkW1wiX192X3Jhd1wiXTtcbiAgICAgIGNvbnN0IHJhd1RhcmdldCA9IHRvUmF3Mih0YXJnZXQpO1xuICAgICAgY29uc3Qgd3JhcCA9IGlzU2hhbGxvdyA/IHRvU2hhbGxvdyA6IGlzUmVhZG9ubHkyID8gdG9SZWFkb25seSA6IHRvUmVhY3RpdmU7XG4gICAgICAhaXNSZWFkb25seTIgJiYgdHJhY2socmF3VGFyZ2V0LCBcIml0ZXJhdGVcIiwgSVRFUkFURV9LRVkpO1xuICAgICAgcmV0dXJuIHRhcmdldC5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjay5jYWxsKHRoaXNBcmcsIHdyYXAodmFsdWUpLCB3cmFwKGtleSksIG9ic2VydmVkKTtcbiAgICAgIH0pO1xuICAgIH07XG4gIH1cbiAgZnVuY3Rpb24gY3JlYXRlSXRlcmFibGVNZXRob2QobWV0aG9kLCBpc1JlYWRvbmx5MiwgaXNTaGFsbG93KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKC4uLmFyZ3MpIHtcbiAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXNbXCJfX3ZfcmF3XCJdO1xuICAgICAgY29uc3QgcmF3VGFyZ2V0ID0gdG9SYXcyKHRhcmdldCk7XG4gICAgICBjb25zdCB0YXJnZXRJc01hcCA9IHNoYXJlZC5pc01hcChyYXdUYXJnZXQpO1xuICAgICAgY29uc3QgaXNQYWlyID0gbWV0aG9kID09PSBcImVudHJpZXNcIiB8fCBtZXRob2QgPT09IFN5bWJvbC5pdGVyYXRvciAmJiB0YXJnZXRJc01hcDtcbiAgICAgIGNvbnN0IGlzS2V5T25seSA9IG1ldGhvZCA9PT0gXCJrZXlzXCIgJiYgdGFyZ2V0SXNNYXA7XG4gICAgICBjb25zdCBpbm5lckl0ZXJhdG9yID0gdGFyZ2V0W21ldGhvZF0oLi4uYXJncyk7XG4gICAgICBjb25zdCB3cmFwID0gaXNTaGFsbG93ID8gdG9TaGFsbG93IDogaXNSZWFkb25seTIgPyB0b1JlYWRvbmx5IDogdG9SZWFjdGl2ZTtcbiAgICAgICFpc1JlYWRvbmx5MiAmJiB0cmFjayhyYXdUYXJnZXQsIFwiaXRlcmF0ZVwiLCBpc0tleU9ubHkgPyBNQVBfS0VZX0lURVJBVEVfS0VZIDogSVRFUkFURV9LRVkpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbmV4dCgpIHtcbiAgICAgICAgICBjb25zdCB7dmFsdWUsIGRvbmV9ID0gaW5uZXJJdGVyYXRvci5uZXh0KCk7XG4gICAgICAgICAgcmV0dXJuIGRvbmUgPyB7dmFsdWUsIGRvbmV9IDoge1xuICAgICAgICAgICAgdmFsdWU6IGlzUGFpciA/IFt3cmFwKHZhbHVlWzBdKSwgd3JhcCh2YWx1ZVsxXSldIDogd3JhcCh2YWx1ZSksXG4gICAgICAgICAgICBkb25lXG4gICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgW1N5bWJvbC5pdGVyYXRvcl0oKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiBjcmVhdGVSZWFkb25seU1ldGhvZCh0eXBlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKC4uLmFyZ3MpIHtcbiAgICAgIHtcbiAgICAgICAgY29uc3Qga2V5ID0gYXJnc1swXSA/IGBvbiBrZXkgXCIke2FyZ3NbMF19XCIgYCA6IGBgO1xuICAgICAgICBjb25zb2xlLndhcm4oYCR7c2hhcmVkLmNhcGl0YWxpemUodHlwZSl9IG9wZXJhdGlvbiAke2tleX1mYWlsZWQ6IHRhcmdldCBpcyByZWFkb25seS5gLCB0b1JhdzIodGhpcykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHR5cGUgPT09IFwiZGVsZXRlXCIgPyBmYWxzZSA6IHRoaXM7XG4gICAgfTtcbiAgfVxuICB2YXIgbXV0YWJsZUluc3RydW1lbnRhdGlvbnMgPSB7XG4gICAgZ2V0KGtleSkge1xuICAgICAgcmV0dXJuIGdldCQxKHRoaXMsIGtleSk7XG4gICAgfSxcbiAgICBnZXQgc2l6ZSgpIHtcbiAgICAgIHJldHVybiBzaXplKHRoaXMpO1xuICAgIH0sXG4gICAgaGFzOiBoYXMkMSxcbiAgICBhZGQsXG4gICAgc2V0OiBzZXQkMSxcbiAgICBkZWxldGU6IGRlbGV0ZUVudHJ5LFxuICAgIGNsZWFyLFxuICAgIGZvckVhY2g6IGNyZWF0ZUZvckVhY2goZmFsc2UsIGZhbHNlKVxuICB9O1xuICB2YXIgc2hhbGxvd0luc3RydW1lbnRhdGlvbnMgPSB7XG4gICAgZ2V0KGtleSkge1xuICAgICAgcmV0dXJuIGdldCQxKHRoaXMsIGtleSwgZmFsc2UsIHRydWUpO1xuICAgIH0sXG4gICAgZ2V0IHNpemUoKSB7XG4gICAgICByZXR1cm4gc2l6ZSh0aGlzKTtcbiAgICB9LFxuICAgIGhhczogaGFzJDEsXG4gICAgYWRkLFxuICAgIHNldDogc2V0JDEsXG4gICAgZGVsZXRlOiBkZWxldGVFbnRyeSxcbiAgICBjbGVhcixcbiAgICBmb3JFYWNoOiBjcmVhdGVGb3JFYWNoKGZhbHNlLCB0cnVlKVxuICB9O1xuICB2YXIgcmVhZG9ubHlJbnN0cnVtZW50YXRpb25zID0ge1xuICAgIGdldChrZXkpIHtcbiAgICAgIHJldHVybiBnZXQkMSh0aGlzLCBrZXksIHRydWUpO1xuICAgIH0sXG4gICAgZ2V0IHNpemUoKSB7XG4gICAgICByZXR1cm4gc2l6ZSh0aGlzLCB0cnVlKTtcbiAgICB9LFxuICAgIGhhcyhrZXkpIHtcbiAgICAgIHJldHVybiBoYXMkMS5jYWxsKHRoaXMsIGtleSwgdHJ1ZSk7XG4gICAgfSxcbiAgICBhZGQ6IGNyZWF0ZVJlYWRvbmx5TWV0aG9kKFwiYWRkXCIpLFxuICAgIHNldDogY3JlYXRlUmVhZG9ubHlNZXRob2QoXCJzZXRcIiksXG4gICAgZGVsZXRlOiBjcmVhdGVSZWFkb25seU1ldGhvZChcImRlbGV0ZVwiKSxcbiAgICBjbGVhcjogY3JlYXRlUmVhZG9ubHlNZXRob2QoXCJjbGVhclwiKSxcbiAgICBmb3JFYWNoOiBjcmVhdGVGb3JFYWNoKHRydWUsIGZhbHNlKVxuICB9O1xuICB2YXIgc2hhbGxvd1JlYWRvbmx5SW5zdHJ1bWVudGF0aW9ucyA9IHtcbiAgICBnZXQoa2V5KSB7XG4gICAgICByZXR1cm4gZ2V0JDEodGhpcywga2V5LCB0cnVlLCB0cnVlKTtcbiAgICB9LFxuICAgIGdldCBzaXplKCkge1xuICAgICAgcmV0dXJuIHNpemUodGhpcywgdHJ1ZSk7XG4gICAgfSxcbiAgICBoYXMoa2V5KSB7XG4gICAgICByZXR1cm4gaGFzJDEuY2FsbCh0aGlzLCBrZXksIHRydWUpO1xuICAgIH0sXG4gICAgYWRkOiBjcmVhdGVSZWFkb25seU1ldGhvZChcImFkZFwiKSxcbiAgICBzZXQ6IGNyZWF0ZVJlYWRvbmx5TWV0aG9kKFwic2V0XCIpLFxuICAgIGRlbGV0ZTogY3JlYXRlUmVhZG9ubHlNZXRob2QoXCJkZWxldGVcIiksXG4gICAgY2xlYXI6IGNyZWF0ZVJlYWRvbmx5TWV0aG9kKFwiY2xlYXJcIiksXG4gICAgZm9yRWFjaDogY3JlYXRlRm9yRWFjaCh0cnVlLCB0cnVlKVxuICB9O1xuICB2YXIgaXRlcmF0b3JNZXRob2RzID0gW1wia2V5c1wiLCBcInZhbHVlc1wiLCBcImVudHJpZXNcIiwgU3ltYm9sLml0ZXJhdG9yXTtcbiAgaXRlcmF0b3JNZXRob2RzLmZvckVhY2goKG1ldGhvZCkgPT4ge1xuICAgIG11dGFibGVJbnN0cnVtZW50YXRpb25zW21ldGhvZF0gPSBjcmVhdGVJdGVyYWJsZU1ldGhvZChtZXRob2QsIGZhbHNlLCBmYWxzZSk7XG4gICAgcmVhZG9ubHlJbnN0cnVtZW50YXRpb25zW21ldGhvZF0gPSBjcmVhdGVJdGVyYWJsZU1ldGhvZChtZXRob2QsIHRydWUsIGZhbHNlKTtcbiAgICBzaGFsbG93SW5zdHJ1bWVudGF0aW9uc1ttZXRob2RdID0gY3JlYXRlSXRlcmFibGVNZXRob2QobWV0aG9kLCBmYWxzZSwgdHJ1ZSk7XG4gICAgc2hhbGxvd1JlYWRvbmx5SW5zdHJ1bWVudGF0aW9uc1ttZXRob2RdID0gY3JlYXRlSXRlcmFibGVNZXRob2QobWV0aG9kLCB0cnVlLCB0cnVlKTtcbiAgfSk7XG4gIGZ1bmN0aW9uIGNyZWF0ZUluc3RydW1lbnRhdGlvbkdldHRlcihpc1JlYWRvbmx5Miwgc2hhbGxvdykge1xuICAgIGNvbnN0IGluc3RydW1lbnRhdGlvbnMgPSBzaGFsbG93ID8gaXNSZWFkb25seTIgPyBzaGFsbG93UmVhZG9ubHlJbnN0cnVtZW50YXRpb25zIDogc2hhbGxvd0luc3RydW1lbnRhdGlvbnMgOiBpc1JlYWRvbmx5MiA/IHJlYWRvbmx5SW5zdHJ1bWVudGF0aW9ucyA6IG11dGFibGVJbnN0cnVtZW50YXRpb25zO1xuICAgIHJldHVybiAodGFyZ2V0LCBrZXksIHJlY2VpdmVyKSA9PiB7XG4gICAgICBpZiAoa2V5ID09PSBcIl9fdl9pc1JlYWN0aXZlXCIpIHtcbiAgICAgICAgcmV0dXJuICFpc1JlYWRvbmx5MjtcbiAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcIl9fdl9pc1JlYWRvbmx5XCIpIHtcbiAgICAgICAgcmV0dXJuIGlzUmVhZG9ubHkyO1xuICAgICAgfSBlbHNlIGlmIChrZXkgPT09IFwiX192X3Jhd1wiKSB7XG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gUmVmbGVjdC5nZXQoc2hhcmVkLmhhc093bihpbnN0cnVtZW50YXRpb25zLCBrZXkpICYmIGtleSBpbiB0YXJnZXQgPyBpbnN0cnVtZW50YXRpb25zIDogdGFyZ2V0LCBrZXksIHJlY2VpdmVyKTtcbiAgICB9O1xuICB9XG4gIHZhciBtdXRhYmxlQ29sbGVjdGlvbkhhbmRsZXJzID0ge1xuICAgIGdldDogY3JlYXRlSW5zdHJ1bWVudGF0aW9uR2V0dGVyKGZhbHNlLCBmYWxzZSlcbiAgfTtcbiAgdmFyIHNoYWxsb3dDb2xsZWN0aW9uSGFuZGxlcnMgPSB7XG4gICAgZ2V0OiBjcmVhdGVJbnN0cnVtZW50YXRpb25HZXR0ZXIoZmFsc2UsIHRydWUpXG4gIH07XG4gIHZhciByZWFkb25seUNvbGxlY3Rpb25IYW5kbGVycyA9IHtcbiAgICBnZXQ6IGNyZWF0ZUluc3RydW1lbnRhdGlvbkdldHRlcih0cnVlLCBmYWxzZSlcbiAgfTtcbiAgdmFyIHNoYWxsb3dSZWFkb25seUNvbGxlY3Rpb25IYW5kbGVycyA9IHtcbiAgICBnZXQ6IGNyZWF0ZUluc3RydW1lbnRhdGlvbkdldHRlcih0cnVlLCB0cnVlKVxuICB9O1xuICBmdW5jdGlvbiBjaGVja0lkZW50aXR5S2V5cyh0YXJnZXQsIGhhczIsIGtleSkge1xuICAgIGNvbnN0IHJhd0tleSA9IHRvUmF3MihrZXkpO1xuICAgIGlmIChyYXdLZXkgIT09IGtleSAmJiBoYXMyLmNhbGwodGFyZ2V0LCByYXdLZXkpKSB7XG4gICAgICBjb25zdCB0eXBlID0gc2hhcmVkLnRvUmF3VHlwZSh0YXJnZXQpO1xuICAgICAgY29uc29sZS53YXJuKGBSZWFjdGl2ZSAke3R5cGV9IGNvbnRhaW5zIGJvdGggdGhlIHJhdyBhbmQgcmVhY3RpdmUgdmVyc2lvbnMgb2YgdGhlIHNhbWUgb2JqZWN0JHt0eXBlID09PSBgTWFwYCA/IGAgYXMga2V5c2AgOiBgYH0sIHdoaWNoIGNhbiBsZWFkIHRvIGluY29uc2lzdGVuY2llcy4gQXZvaWQgZGlmZmVyZW50aWF0aW5nIGJldHdlZW4gdGhlIHJhdyBhbmQgcmVhY3RpdmUgdmVyc2lvbnMgb2YgYW4gb2JqZWN0IGFuZCBvbmx5IHVzZSB0aGUgcmVhY3RpdmUgdmVyc2lvbiBpZiBwb3NzaWJsZS5gKTtcbiAgICB9XG4gIH1cbiAgdmFyIHJlYWN0aXZlTWFwID0gbmV3IFdlYWtNYXAoKTtcbiAgdmFyIHNoYWxsb3dSZWFjdGl2ZU1hcCA9IG5ldyBXZWFrTWFwKCk7XG4gIHZhciByZWFkb25seU1hcCA9IG5ldyBXZWFrTWFwKCk7XG4gIHZhciBzaGFsbG93UmVhZG9ubHlNYXAgPSBuZXcgV2Vha01hcCgpO1xuICBmdW5jdGlvbiB0YXJnZXRUeXBlTWFwKHJhd1R5cGUpIHtcbiAgICBzd2l0Y2ggKHJhd1R5cGUpIHtcbiAgICAgIGNhc2UgXCJPYmplY3RcIjpcbiAgICAgIGNhc2UgXCJBcnJheVwiOlxuICAgICAgICByZXR1cm4gMTtcbiAgICAgIGNhc2UgXCJNYXBcIjpcbiAgICAgIGNhc2UgXCJTZXRcIjpcbiAgICAgIGNhc2UgXCJXZWFrTWFwXCI6XG4gICAgICBjYXNlIFwiV2Vha1NldFwiOlxuICAgICAgICByZXR1cm4gMjtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBnZXRUYXJnZXRUeXBlKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlW1wiX192X3NraXBcIl0gfHwgIU9iamVjdC5pc0V4dGVuc2libGUodmFsdWUpID8gMCA6IHRhcmdldFR5cGVNYXAoc2hhcmVkLnRvUmF3VHlwZSh2YWx1ZSkpO1xuICB9XG4gIGZ1bmN0aW9uIHJlYWN0aXZlMyh0YXJnZXQpIHtcbiAgICBpZiAodGFyZ2V0ICYmIHRhcmdldFtcIl9fdl9pc1JlYWRvbmx5XCJdKSB7XG4gICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlUmVhY3RpdmVPYmplY3QodGFyZ2V0LCBmYWxzZSwgbXV0YWJsZUhhbmRsZXJzLCBtdXRhYmxlQ29sbGVjdGlvbkhhbmRsZXJzLCByZWFjdGl2ZU1hcCk7XG4gIH1cbiAgZnVuY3Rpb24gc2hhbGxvd1JlYWN0aXZlKHRhcmdldCkge1xuICAgIHJldHVybiBjcmVhdGVSZWFjdGl2ZU9iamVjdCh0YXJnZXQsIGZhbHNlLCBzaGFsbG93UmVhY3RpdmVIYW5kbGVycywgc2hhbGxvd0NvbGxlY3Rpb25IYW5kbGVycywgc2hhbGxvd1JlYWN0aXZlTWFwKTtcbiAgfVxuICBmdW5jdGlvbiByZWFkb25seSh0YXJnZXQpIHtcbiAgICByZXR1cm4gY3JlYXRlUmVhY3RpdmVPYmplY3QodGFyZ2V0LCB0cnVlLCByZWFkb25seUhhbmRsZXJzLCByZWFkb25seUNvbGxlY3Rpb25IYW5kbGVycywgcmVhZG9ubHlNYXApO1xuICB9XG4gIGZ1bmN0aW9uIHNoYWxsb3dSZWFkb25seSh0YXJnZXQpIHtcbiAgICByZXR1cm4gY3JlYXRlUmVhY3RpdmVPYmplY3QodGFyZ2V0LCB0cnVlLCBzaGFsbG93UmVhZG9ubHlIYW5kbGVycywgc2hhbGxvd1JlYWRvbmx5Q29sbGVjdGlvbkhhbmRsZXJzLCBzaGFsbG93UmVhZG9ubHlNYXApO1xuICB9XG4gIGZ1bmN0aW9uIGNyZWF0ZVJlYWN0aXZlT2JqZWN0KHRhcmdldCwgaXNSZWFkb25seTIsIGJhc2VIYW5kbGVycywgY29sbGVjdGlvbkhhbmRsZXJzLCBwcm94eU1hcCkge1xuICAgIGlmICghc2hhcmVkLmlzT2JqZWN0KHRhcmdldCkpIHtcbiAgICAgIHtcbiAgICAgICAgY29uc29sZS53YXJuKGB2YWx1ZSBjYW5ub3QgYmUgbWFkZSByZWFjdGl2ZTogJHtTdHJpbmcodGFyZ2V0KX1gKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfVxuICAgIGlmICh0YXJnZXRbXCJfX3ZfcmF3XCJdICYmICEoaXNSZWFkb25seTIgJiYgdGFyZ2V0W1wiX192X2lzUmVhY3RpdmVcIl0pKSB7XG4gICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cbiAgICBjb25zdCBleGlzdGluZ1Byb3h5ID0gcHJveHlNYXAuZ2V0KHRhcmdldCk7XG4gICAgaWYgKGV4aXN0aW5nUHJveHkpIHtcbiAgICAgIHJldHVybiBleGlzdGluZ1Byb3h5O1xuICAgIH1cbiAgICBjb25zdCB0YXJnZXRUeXBlID0gZ2V0VGFyZ2V0VHlwZSh0YXJnZXQpO1xuICAgIGlmICh0YXJnZXRUeXBlID09PSAwKSB7XG4gICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cbiAgICBjb25zdCBwcm94eSA9IG5ldyBQcm94eSh0YXJnZXQsIHRhcmdldFR5cGUgPT09IDIgPyBjb2xsZWN0aW9uSGFuZGxlcnMgOiBiYXNlSGFuZGxlcnMpO1xuICAgIHByb3h5TWFwLnNldCh0YXJnZXQsIHByb3h5KTtcbiAgICByZXR1cm4gcHJveHk7XG4gIH1cbiAgZnVuY3Rpb24gaXNSZWFjdGl2ZTIodmFsdWUpIHtcbiAgICBpZiAoaXNSZWFkb25seSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBpc1JlYWN0aXZlMih2YWx1ZVtcIl9fdl9yYXdcIl0pO1xuICAgIH1cbiAgICByZXR1cm4gISEodmFsdWUgJiYgdmFsdWVbXCJfX3ZfaXNSZWFjdGl2ZVwiXSk7XG4gIH1cbiAgZnVuY3Rpb24gaXNSZWFkb25seSh2YWx1ZSkge1xuICAgIHJldHVybiAhISh2YWx1ZSAmJiB2YWx1ZVtcIl9fdl9pc1JlYWRvbmx5XCJdKTtcbiAgfVxuICBmdW5jdGlvbiBpc1Byb3h5KHZhbHVlKSB7XG4gICAgcmV0dXJuIGlzUmVhY3RpdmUyKHZhbHVlKSB8fCBpc1JlYWRvbmx5KHZhbHVlKTtcbiAgfVxuICBmdW5jdGlvbiB0b1JhdzIob2JzZXJ2ZWQpIHtcbiAgICByZXR1cm4gb2JzZXJ2ZWQgJiYgdG9SYXcyKG9ic2VydmVkW1wiX192X3Jhd1wiXSkgfHwgb2JzZXJ2ZWQ7XG4gIH1cbiAgZnVuY3Rpb24gbWFya1Jhdyh2YWx1ZSkge1xuICAgIHNoYXJlZC5kZWYodmFsdWUsIFwiX192X3NraXBcIiwgdHJ1ZSk7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHZhciBjb252ZXJ0ID0gKHZhbCkgPT4gc2hhcmVkLmlzT2JqZWN0KHZhbCkgPyByZWFjdGl2ZTModmFsKSA6IHZhbDtcbiAgZnVuY3Rpb24gaXNSZWYocikge1xuICAgIHJldHVybiBCb29sZWFuKHIgJiYgci5fX3ZfaXNSZWYgPT09IHRydWUpO1xuICB9XG4gIGZ1bmN0aW9uIHJlZih2YWx1ZSkge1xuICAgIHJldHVybiBjcmVhdGVSZWYodmFsdWUpO1xuICB9XG4gIGZ1bmN0aW9uIHNoYWxsb3dSZWYodmFsdWUpIHtcbiAgICByZXR1cm4gY3JlYXRlUmVmKHZhbHVlLCB0cnVlKTtcbiAgfVxuICB2YXIgUmVmSW1wbCA9IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3RvcihfcmF3VmFsdWUsIF9zaGFsbG93ID0gZmFsc2UpIHtcbiAgICAgIHRoaXMuX3Jhd1ZhbHVlID0gX3Jhd1ZhbHVlO1xuICAgICAgdGhpcy5fc2hhbGxvdyA9IF9zaGFsbG93O1xuICAgICAgdGhpcy5fX3ZfaXNSZWYgPSB0cnVlO1xuICAgICAgdGhpcy5fdmFsdWUgPSBfc2hhbGxvdyA/IF9yYXdWYWx1ZSA6IGNvbnZlcnQoX3Jhd1ZhbHVlKTtcbiAgICB9XG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgdHJhY2sodG9SYXcyKHRoaXMpLCBcImdldFwiLCBcInZhbHVlXCIpO1xuICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICAgIH1cbiAgICBzZXQgdmFsdWUobmV3VmFsKSB7XG4gICAgICBpZiAoc2hhcmVkLmhhc0NoYW5nZWQodG9SYXcyKG5ld1ZhbCksIHRoaXMuX3Jhd1ZhbHVlKSkge1xuICAgICAgICB0aGlzLl9yYXdWYWx1ZSA9IG5ld1ZhbDtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB0aGlzLl9zaGFsbG93ID8gbmV3VmFsIDogY29udmVydChuZXdWYWwpO1xuICAgICAgICB0cmlnZ2VyKHRvUmF3Mih0aGlzKSwgXCJzZXRcIiwgXCJ2YWx1ZVwiLCBuZXdWYWwpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgZnVuY3Rpb24gY3JlYXRlUmVmKHJhd1ZhbHVlLCBzaGFsbG93ID0gZmFsc2UpIHtcbiAgICBpZiAoaXNSZWYocmF3VmFsdWUpKSB7XG4gICAgICByZXR1cm4gcmF3VmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBuZXcgUmVmSW1wbChyYXdWYWx1ZSwgc2hhbGxvdyk7XG4gIH1cbiAgZnVuY3Rpb24gdHJpZ2dlclJlZihyZWYyKSB7XG4gICAgdHJpZ2dlcih0b1JhdzIocmVmMiksIFwic2V0XCIsIFwidmFsdWVcIiwgcmVmMi52YWx1ZSk7XG4gIH1cbiAgZnVuY3Rpb24gdW5yZWYocmVmMikge1xuICAgIHJldHVybiBpc1JlZihyZWYyKSA/IHJlZjIudmFsdWUgOiByZWYyO1xuICB9XG4gIHZhciBzaGFsbG93VW53cmFwSGFuZGxlcnMgPSB7XG4gICAgZ2V0OiAodGFyZ2V0LCBrZXksIHJlY2VpdmVyKSA9PiB1bnJlZihSZWZsZWN0LmdldCh0YXJnZXQsIGtleSwgcmVjZWl2ZXIpKSxcbiAgICBzZXQ6ICh0YXJnZXQsIGtleSwgdmFsdWUsIHJlY2VpdmVyKSA9PiB7XG4gICAgICBjb25zdCBvbGRWYWx1ZSA9IHRhcmdldFtrZXldO1xuICAgICAgaWYgKGlzUmVmKG9sZFZhbHVlKSAmJiAhaXNSZWYodmFsdWUpKSB7XG4gICAgICAgIG9sZFZhbHVlLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFJlZmxlY3Quc2V0KHRhcmdldCwga2V5LCB2YWx1ZSwgcmVjZWl2ZXIpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgZnVuY3Rpb24gcHJveHlSZWZzKG9iamVjdFdpdGhSZWZzKSB7XG4gICAgcmV0dXJuIGlzUmVhY3RpdmUyKG9iamVjdFdpdGhSZWZzKSA/IG9iamVjdFdpdGhSZWZzIDogbmV3IFByb3h5KG9iamVjdFdpdGhSZWZzLCBzaGFsbG93VW53cmFwSGFuZGxlcnMpO1xuICB9XG4gIHZhciBDdXN0b21SZWZJbXBsID0gY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKGZhY3RvcnkpIHtcbiAgICAgIHRoaXMuX192X2lzUmVmID0gdHJ1ZTtcbiAgICAgIGNvbnN0IHtnZXQ6IGdldDMsIHNldDogc2V0M30gPSBmYWN0b3J5KCgpID0+IHRyYWNrKHRoaXMsIFwiZ2V0XCIsIFwidmFsdWVcIiksICgpID0+IHRyaWdnZXIodGhpcywgXCJzZXRcIiwgXCJ2YWx1ZVwiKSk7XG4gICAgICB0aGlzLl9nZXQgPSBnZXQzO1xuICAgICAgdGhpcy5fc2V0ID0gc2V0MztcbiAgICB9XG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2dldCgpO1xuICAgIH1cbiAgICBzZXQgdmFsdWUobmV3VmFsKSB7XG4gICAgICB0aGlzLl9zZXQobmV3VmFsKTtcbiAgICB9XG4gIH07XG4gIGZ1bmN0aW9uIGN1c3RvbVJlZihmYWN0b3J5KSB7XG4gICAgcmV0dXJuIG5ldyBDdXN0b21SZWZJbXBsKGZhY3RvcnkpO1xuICB9XG4gIGZ1bmN0aW9uIHRvUmVmcyhvYmplY3QpIHtcbiAgICBpZiAoIWlzUHJveHkob2JqZWN0KSkge1xuICAgICAgY29uc29sZS53YXJuKGB0b1JlZnMoKSBleHBlY3RzIGEgcmVhY3RpdmUgb2JqZWN0IGJ1dCByZWNlaXZlZCBhIHBsYWluIG9uZS5gKTtcbiAgICB9XG4gICAgY29uc3QgcmV0ID0gc2hhcmVkLmlzQXJyYXkob2JqZWN0KSA/IG5ldyBBcnJheShvYmplY3QubGVuZ3RoKSA6IHt9O1xuICAgIGZvciAoY29uc3Qga2V5IGluIG9iamVjdCkge1xuICAgICAgcmV0W2tleV0gPSB0b1JlZihvYmplY3QsIGtleSk7XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG4gIH1cbiAgdmFyIE9iamVjdFJlZkltcGwgPSBjbGFzcyB7XG4gICAgY29uc3RydWN0b3IoX29iamVjdCwgX2tleSkge1xuICAgICAgdGhpcy5fb2JqZWN0ID0gX29iamVjdDtcbiAgICAgIHRoaXMuX2tleSA9IF9rZXk7XG4gICAgICB0aGlzLl9fdl9pc1JlZiA9IHRydWU7XG4gICAgfVxuICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9vYmplY3RbdGhpcy5fa2V5XTtcbiAgICB9XG4gICAgc2V0IHZhbHVlKG5ld1ZhbCkge1xuICAgICAgdGhpcy5fb2JqZWN0W3RoaXMuX2tleV0gPSBuZXdWYWw7XG4gICAgfVxuICB9O1xuICBmdW5jdGlvbiB0b1JlZihvYmplY3QsIGtleSkge1xuICAgIHJldHVybiBpc1JlZihvYmplY3Rba2V5XSkgPyBvYmplY3Rba2V5XSA6IG5ldyBPYmplY3RSZWZJbXBsKG9iamVjdCwga2V5KTtcbiAgfVxuICB2YXIgQ29tcHV0ZWRSZWZJbXBsID0gY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKGdldHRlciwgX3NldHRlciwgaXNSZWFkb25seTIpIHtcbiAgICAgIHRoaXMuX3NldHRlciA9IF9zZXR0ZXI7XG4gICAgICB0aGlzLl9kaXJ0eSA9IHRydWU7XG4gICAgICB0aGlzLl9fdl9pc1JlZiA9IHRydWU7XG4gICAgICB0aGlzLmVmZmVjdCA9IGVmZmVjdDMoZ2V0dGVyLCB7XG4gICAgICAgIGxhenk6IHRydWUsXG4gICAgICAgIHNjaGVkdWxlcjogKCkgPT4ge1xuICAgICAgICAgIGlmICghdGhpcy5fZGlydHkpIHtcbiAgICAgICAgICAgIHRoaXMuX2RpcnR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRyaWdnZXIodG9SYXcyKHRoaXMpLCBcInNldFwiLCBcInZhbHVlXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB0aGlzW1wiX192X2lzUmVhZG9ubHlcIl0gPSBpc1JlYWRvbmx5MjtcbiAgICB9XG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgY29uc3Qgc2VsZjIgPSB0b1JhdzIodGhpcyk7XG4gICAgICBpZiAoc2VsZjIuX2RpcnR5KSB7XG4gICAgICAgIHNlbGYyLl92YWx1ZSA9IHRoaXMuZWZmZWN0KCk7XG4gICAgICAgIHNlbGYyLl9kaXJ0eSA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgdHJhY2soc2VsZjIsIFwiZ2V0XCIsIFwidmFsdWVcIik7XG4gICAgICByZXR1cm4gc2VsZjIuX3ZhbHVlO1xuICAgIH1cbiAgICBzZXQgdmFsdWUobmV3VmFsdWUpIHtcbiAgICAgIHRoaXMuX3NldHRlcihuZXdWYWx1ZSk7XG4gICAgfVxuICB9O1xuICBmdW5jdGlvbiBjb21wdXRlZChnZXR0ZXJPck9wdGlvbnMpIHtcbiAgICBsZXQgZ2V0dGVyO1xuICAgIGxldCBzZXR0ZXI7XG4gICAgaWYgKHNoYXJlZC5pc0Z1bmN0aW9uKGdldHRlck9yT3B0aW9ucykpIHtcbiAgICAgIGdldHRlciA9IGdldHRlck9yT3B0aW9ucztcbiAgICAgIHNldHRlciA9ICgpID0+IHtcbiAgICAgICAgY29uc29sZS53YXJuKFwiV3JpdGUgb3BlcmF0aW9uIGZhaWxlZDogY29tcHV0ZWQgdmFsdWUgaXMgcmVhZG9ubHlcIik7XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBnZXR0ZXIgPSBnZXR0ZXJPck9wdGlvbnMuZ2V0O1xuICAgICAgc2V0dGVyID0gZ2V0dGVyT3JPcHRpb25zLnNldDtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBDb21wdXRlZFJlZkltcGwoZ2V0dGVyLCBzZXR0ZXIsIHNoYXJlZC5pc0Z1bmN0aW9uKGdldHRlck9yT3B0aW9ucykgfHwgIWdldHRlck9yT3B0aW9ucy5zZXQpO1xuICB9XG4gIGV4cG9ydHMuSVRFUkFURV9LRVkgPSBJVEVSQVRFX0tFWTtcbiAgZXhwb3J0cy5jb21wdXRlZCA9IGNvbXB1dGVkO1xuICBleHBvcnRzLmN1c3RvbVJlZiA9IGN1c3RvbVJlZjtcbiAgZXhwb3J0cy5lZmZlY3QgPSBlZmZlY3QzO1xuICBleHBvcnRzLmVuYWJsZVRyYWNraW5nID0gZW5hYmxlVHJhY2tpbmc7XG4gIGV4cG9ydHMuaXNQcm94eSA9IGlzUHJveHk7XG4gIGV4cG9ydHMuaXNSZWFjdGl2ZSA9IGlzUmVhY3RpdmUyO1xuICBleHBvcnRzLmlzUmVhZG9ubHkgPSBpc1JlYWRvbmx5O1xuICBleHBvcnRzLmlzUmVmID0gaXNSZWY7XG4gIGV4cG9ydHMubWFya1JhdyA9IG1hcmtSYXc7XG4gIGV4cG9ydHMucGF1c2VUcmFja2luZyA9IHBhdXNlVHJhY2tpbmc7XG4gIGV4cG9ydHMucHJveHlSZWZzID0gcHJveHlSZWZzO1xuICBleHBvcnRzLnJlYWN0aXZlID0gcmVhY3RpdmUzO1xuICBleHBvcnRzLnJlYWRvbmx5ID0gcmVhZG9ubHk7XG4gIGV4cG9ydHMucmVmID0gcmVmO1xuICBleHBvcnRzLnJlc2V0VHJhY2tpbmcgPSByZXNldFRyYWNraW5nO1xuICBleHBvcnRzLnNoYWxsb3dSZWFjdGl2ZSA9IHNoYWxsb3dSZWFjdGl2ZTtcbiAgZXhwb3J0cy5zaGFsbG93UmVhZG9ubHkgPSBzaGFsbG93UmVhZG9ubHk7XG4gIGV4cG9ydHMuc2hhbGxvd1JlZiA9IHNoYWxsb3dSZWY7XG4gIGV4cG9ydHMuc3RvcCA9IHN0b3AyO1xuICBleHBvcnRzLnRvUmF3ID0gdG9SYXcyO1xuICBleHBvcnRzLnRvUmVmID0gdG9SZWY7XG4gIGV4cG9ydHMudG9SZWZzID0gdG9SZWZzO1xuICBleHBvcnRzLnRyYWNrID0gdHJhY2s7XG4gIGV4cG9ydHMudHJpZ2dlciA9IHRyaWdnZXI7XG4gIGV4cG9ydHMudHJpZ2dlclJlZiA9IHRyaWdnZXJSZWY7XG4gIGV4cG9ydHMudW5yZWYgPSB1bnJlZjtcbn0pO1xuXG4vLyBub2RlX21vZHVsZXMvQHZ1ZS9yZWFjdGl2aXR5L2luZGV4LmpzXG52YXIgcmVxdWlyZV9yZWFjdGl2aXR5ID0gX19jb21tb25KUygoZXhwb3J0cywgbW9kdWxlKSA9PiB7XG4gIFwidXNlIHN0cmljdFwiO1xuICBpZiAoZmFsc2UpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IG51bGw7XG4gIH0gZWxzZSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlX3JlYWN0aXZpdHlfY2pzKCk7XG4gIH1cbn0pO1xuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvc2NoZWR1bGVyLmpzXG52YXIgZmx1c2hQZW5kaW5nID0gZmFsc2U7XG52YXIgZmx1c2hpbmcgPSBmYWxzZTtcbnZhciBxdWV1ZSA9IFtdO1xuZnVuY3Rpb24gc2NoZWR1bGVyKGNhbGxiYWNrKSB7XG4gIHF1ZXVlSm9iKGNhbGxiYWNrKTtcbn1cbmZ1bmN0aW9uIHF1ZXVlSm9iKGpvYikge1xuICBpZiAoIXF1ZXVlLmluY2x1ZGVzKGpvYikpXG4gICAgcXVldWUucHVzaChqb2IpO1xuICBxdWV1ZUZsdXNoKCk7XG59XG5mdW5jdGlvbiBxdWV1ZUZsdXNoKCkge1xuICBpZiAoIWZsdXNoaW5nICYmICFmbHVzaFBlbmRpbmcpIHtcbiAgICBmbHVzaFBlbmRpbmcgPSB0cnVlO1xuICAgIHF1ZXVlTWljcm90YXNrKGZsdXNoSm9icyk7XG4gIH1cbn1cbmZ1bmN0aW9uIGZsdXNoSm9icygpIHtcbiAgZmx1c2hQZW5kaW5nID0gZmFsc2U7XG4gIGZsdXNoaW5nID0gdHJ1ZTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBxdWV1ZS5sZW5ndGg7IGkrKykge1xuICAgIHF1ZXVlW2ldKCk7XG4gIH1cbiAgcXVldWUubGVuZ3RoID0gMDtcbiAgZmx1c2hpbmcgPSBmYWxzZTtcbn1cblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL3JlYWN0aXZpdHkuanNcbnZhciByZWFjdGl2ZTtcbnZhciBlZmZlY3Q7XG52YXIgcmVsZWFzZTtcbnZhciByYXc7XG52YXIgc2hvdWxkU2NoZWR1bGUgPSB0cnVlO1xuZnVuY3Rpb24gZGlzYWJsZUVmZmVjdFNjaGVkdWxpbmcoY2FsbGJhY2spIHtcbiAgc2hvdWxkU2NoZWR1bGUgPSBmYWxzZTtcbiAgY2FsbGJhY2soKTtcbiAgc2hvdWxkU2NoZWR1bGUgPSB0cnVlO1xufVxuZnVuY3Rpb24gc2V0UmVhY3Rpdml0eUVuZ2luZShlbmdpbmUpIHtcbiAgcmVhY3RpdmUgPSBlbmdpbmUucmVhY3RpdmU7XG4gIHJlbGVhc2UgPSBlbmdpbmUucmVsZWFzZTtcbiAgZWZmZWN0ID0gKGNhbGxiYWNrKSA9PiBlbmdpbmUuZWZmZWN0KGNhbGxiYWNrLCB7c2NoZWR1bGVyOiAodGFzaykgPT4ge1xuICAgIGlmIChzaG91bGRTY2hlZHVsZSkge1xuICAgICAgc2NoZWR1bGVyKHRhc2spO1xuICAgIH0gZWxzZSB7XG4gICAgICB0YXNrKCk7XG4gICAgfVxuICB9fSk7XG4gIHJhdyA9IGVuZ2luZS5yYXc7XG59XG5mdW5jdGlvbiBvdmVycmlkZUVmZmVjdChvdmVycmlkZSkge1xuICBlZmZlY3QgPSBvdmVycmlkZTtcbn1cbmZ1bmN0aW9uIGVsZW1lbnRCb3VuZEVmZmVjdChlbCkge1xuICBsZXQgY2xlYW51cCA9ICgpID0+IHtcbiAgfTtcbiAgbGV0IHdyYXBwZWRFZmZlY3QgPSAoY2FsbGJhY2spID0+IHtcbiAgICBsZXQgZWZmZWN0UmVmZXJlbmNlID0gZWZmZWN0KGNhbGxiYWNrKTtcbiAgICBpZiAoIWVsLl94X2VmZmVjdHMpIHtcbiAgICAgIGVsLl94X2VmZmVjdHMgPSBuZXcgU2V0KCk7XG4gICAgICBlbC5feF9ydW5FZmZlY3RzID0gKCkgPT4ge1xuICAgICAgICBlbC5feF9lZmZlY3RzLmZvckVhY2goKGkpID0+IGkoKSk7XG4gICAgICB9O1xuICAgIH1cbiAgICBlbC5feF9lZmZlY3RzLmFkZChlZmZlY3RSZWZlcmVuY2UpO1xuICAgIGNsZWFudXAgPSAoKSA9PiB7XG4gICAgICBpZiAoZWZmZWN0UmVmZXJlbmNlID09PSB2b2lkIDApXG4gICAgICAgIHJldHVybjtcbiAgICAgIGVsLl94X2VmZmVjdHMuZGVsZXRlKGVmZmVjdFJlZmVyZW5jZSk7XG4gICAgICByZWxlYXNlKGVmZmVjdFJlZmVyZW5jZSk7XG4gICAgfTtcbiAgfTtcbiAgcmV0dXJuIFt3cmFwcGVkRWZmZWN0LCAoKSA9PiB7XG4gICAgY2xlYW51cCgpO1xuICB9XTtcbn1cblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL211dGF0aW9uLmpzXG52YXIgb25BdHRyaWJ1dGVBZGRlZHMgPSBbXTtcbnZhciBvbkVsUmVtb3ZlZHMgPSBbXTtcbnZhciBvbkVsQWRkZWRzID0gW107XG5mdW5jdGlvbiBvbkVsQWRkZWQoY2FsbGJhY2spIHtcbiAgb25FbEFkZGVkcy5wdXNoKGNhbGxiYWNrKTtcbn1cbmZ1bmN0aW9uIG9uRWxSZW1vdmVkKGNhbGxiYWNrKSB7XG4gIG9uRWxSZW1vdmVkcy5wdXNoKGNhbGxiYWNrKTtcbn1cbmZ1bmN0aW9uIG9uQXR0cmlidXRlc0FkZGVkKGNhbGxiYWNrKSB7XG4gIG9uQXR0cmlidXRlQWRkZWRzLnB1c2goY2FsbGJhY2spO1xufVxuZnVuY3Rpb24gb25BdHRyaWJ1dGVSZW1vdmVkKGVsLCBuYW1lLCBjYWxsYmFjaykge1xuICBpZiAoIWVsLl94X2F0dHJpYnV0ZUNsZWFudXBzKVxuICAgIGVsLl94X2F0dHJpYnV0ZUNsZWFudXBzID0ge307XG4gIGlmICghZWwuX3hfYXR0cmlidXRlQ2xlYW51cHNbbmFtZV0pXG4gICAgZWwuX3hfYXR0cmlidXRlQ2xlYW51cHNbbmFtZV0gPSBbXTtcbiAgZWwuX3hfYXR0cmlidXRlQ2xlYW51cHNbbmFtZV0ucHVzaChjYWxsYmFjayk7XG59XG5mdW5jdGlvbiBjbGVhbnVwQXR0cmlidXRlcyhlbCwgbmFtZXMpIHtcbiAgaWYgKCFlbC5feF9hdHRyaWJ1dGVDbGVhbnVwcylcbiAgICByZXR1cm47XG4gIE9iamVjdC5lbnRyaWVzKGVsLl94X2F0dHJpYnV0ZUNsZWFudXBzKS5mb3JFYWNoKChbbmFtZSwgdmFsdWVdKSA9PiB7XG4gICAgKG5hbWVzID09PSB2b2lkIDAgfHwgbmFtZXMuaW5jbHVkZXMobmFtZSkpICYmIHZhbHVlLmZvckVhY2goKGkpID0+IGkoKSk7XG4gICAgZGVsZXRlIGVsLl94X2F0dHJpYnV0ZUNsZWFudXBzW25hbWVdO1xuICB9KTtcbn1cbnZhciBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKG9uTXV0YXRlKTtcbnZhciBjdXJyZW50bHlPYnNlcnZpbmcgPSBmYWxzZTtcbmZ1bmN0aW9uIHN0YXJ0T2JzZXJ2aW5nTXV0YXRpb25zKCkge1xuICBvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LCB7c3VidHJlZTogdHJ1ZSwgY2hpbGRMaXN0OiB0cnVlLCBhdHRyaWJ1dGVzOiB0cnVlLCBhdHRyaWJ1dGVPbGRWYWx1ZTogdHJ1ZX0pO1xuICBjdXJyZW50bHlPYnNlcnZpbmcgPSB0cnVlO1xufVxuZnVuY3Rpb24gc3RvcE9ic2VydmluZ011dGF0aW9ucygpIHtcbiAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICBjdXJyZW50bHlPYnNlcnZpbmcgPSBmYWxzZTtcbn1cbnZhciByZWNvcmRRdWV1ZSA9IFtdO1xudmFyIHdpbGxQcm9jZXNzUmVjb3JkUXVldWUgPSBmYWxzZTtcbmZ1bmN0aW9uIGZsdXNoT2JzZXJ2ZXIoKSB7XG4gIHJlY29yZFF1ZXVlID0gcmVjb3JkUXVldWUuY29uY2F0KG9ic2VydmVyLnRha2VSZWNvcmRzKCkpO1xuICBpZiAocmVjb3JkUXVldWUubGVuZ3RoICYmICF3aWxsUHJvY2Vzc1JlY29yZFF1ZXVlKSB7XG4gICAgd2lsbFByb2Nlc3NSZWNvcmRRdWV1ZSA9IHRydWU7XG4gICAgcXVldWVNaWNyb3Rhc2soKCkgPT4ge1xuICAgICAgcHJvY2Vzc1JlY29yZFF1ZXVlKCk7XG4gICAgICB3aWxsUHJvY2Vzc1JlY29yZFF1ZXVlID0gZmFsc2U7XG4gICAgfSk7XG4gIH1cbn1cbmZ1bmN0aW9uIHByb2Nlc3NSZWNvcmRRdWV1ZSgpIHtcbiAgb25NdXRhdGUocmVjb3JkUXVldWUpO1xuICByZWNvcmRRdWV1ZS5sZW5ndGggPSAwO1xufVxuZnVuY3Rpb24gbXV0YXRlRG9tKGNhbGxiYWNrKSB7XG4gIGlmICghY3VycmVudGx5T2JzZXJ2aW5nKVxuICAgIHJldHVybiBjYWxsYmFjaygpO1xuICBmbHVzaE9ic2VydmVyKCk7XG4gIHN0b3BPYnNlcnZpbmdNdXRhdGlvbnMoKTtcbiAgbGV0IHJlc3VsdCA9IGNhbGxiYWNrKCk7XG4gIHN0YXJ0T2JzZXJ2aW5nTXV0YXRpb25zKCk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBvbk11dGF0ZShtdXRhdGlvbnMpIHtcbiAgbGV0IGFkZGVkTm9kZXMgPSBbXTtcbiAgbGV0IHJlbW92ZWROb2RlcyA9IFtdO1xuICBsZXQgYWRkZWRBdHRyaWJ1dGVzID0gbmV3IE1hcCgpO1xuICBsZXQgcmVtb3ZlZEF0dHJpYnV0ZXMgPSBuZXcgTWFwKCk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbXV0YXRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKG11dGF0aW9uc1tpXS50YXJnZXQuX3hfaWdub3JlTXV0YXRpb25PYnNlcnZlcilcbiAgICAgIGNvbnRpbnVlO1xuICAgIGlmIChtdXRhdGlvbnNbaV0udHlwZSA9PT0gXCJjaGlsZExpc3RcIikge1xuICAgICAgbXV0YXRpb25zW2ldLmFkZGVkTm9kZXMuZm9yRWFjaCgobm9kZSkgPT4gbm9kZS5ub2RlVHlwZSA9PT0gMSAmJiBhZGRlZE5vZGVzLnB1c2gobm9kZSkpO1xuICAgICAgbXV0YXRpb25zW2ldLnJlbW92ZWROb2Rlcy5mb3JFYWNoKChub2RlKSA9PiBub2RlLm5vZGVUeXBlID09PSAxICYmIHJlbW92ZWROb2Rlcy5wdXNoKG5vZGUpKTtcbiAgICB9XG4gICAgaWYgKG11dGF0aW9uc1tpXS50eXBlID09PSBcImF0dHJpYnV0ZXNcIikge1xuICAgICAgbGV0IGVsID0gbXV0YXRpb25zW2ldLnRhcmdldDtcbiAgICAgIGxldCBuYW1lID0gbXV0YXRpb25zW2ldLmF0dHJpYnV0ZU5hbWU7XG4gICAgICBsZXQgb2xkVmFsdWUgPSBtdXRhdGlvbnNbaV0ub2xkVmFsdWU7XG4gICAgICBsZXQgYWRkID0gKCkgPT4ge1xuICAgICAgICBpZiAoIWFkZGVkQXR0cmlidXRlcy5oYXMoZWwpKVxuICAgICAgICAgIGFkZGVkQXR0cmlidXRlcy5zZXQoZWwsIFtdKTtcbiAgICAgICAgYWRkZWRBdHRyaWJ1dGVzLmdldChlbCkucHVzaCh7bmFtZSwgdmFsdWU6IGVsLmdldEF0dHJpYnV0ZShuYW1lKX0pO1xuICAgICAgfTtcbiAgICAgIGxldCByZW1vdmUgPSAoKSA9PiB7XG4gICAgICAgIGlmICghcmVtb3ZlZEF0dHJpYnV0ZXMuaGFzKGVsKSlcbiAgICAgICAgICByZW1vdmVkQXR0cmlidXRlcy5zZXQoZWwsIFtdKTtcbiAgICAgICAgcmVtb3ZlZEF0dHJpYnV0ZXMuZ2V0KGVsKS5wdXNoKG5hbWUpO1xuICAgICAgfTtcbiAgICAgIGlmIChlbC5oYXNBdHRyaWJ1dGUobmFtZSkgJiYgb2xkVmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgYWRkKCk7XG4gICAgICB9IGVsc2UgaWYgKGVsLmhhc0F0dHJpYnV0ZShuYW1lKSkge1xuICAgICAgICByZW1vdmUoKTtcbiAgICAgICAgYWRkKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZW1vdmUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmVtb3ZlZEF0dHJpYnV0ZXMuZm9yRWFjaCgoYXR0cnMsIGVsKSA9PiB7XG4gICAgY2xlYW51cEF0dHJpYnV0ZXMoZWwsIGF0dHJzKTtcbiAgfSk7XG4gIGFkZGVkQXR0cmlidXRlcy5mb3JFYWNoKChhdHRycywgZWwpID0+IHtcbiAgICBvbkF0dHJpYnV0ZUFkZGVkcy5mb3JFYWNoKChpKSA9PiBpKGVsLCBhdHRycykpO1xuICB9KTtcbiAgZm9yIChsZXQgbm9kZSBvZiBhZGRlZE5vZGVzKSB7XG4gICAgaWYgKHJlbW92ZWROb2Rlcy5pbmNsdWRlcyhub2RlKSlcbiAgICAgIGNvbnRpbnVlO1xuICAgIG9uRWxBZGRlZHMuZm9yRWFjaCgoaSkgPT4gaShub2RlKSk7XG4gIH1cbiAgZm9yIChsZXQgbm9kZSBvZiByZW1vdmVkTm9kZXMpIHtcbiAgICBpZiAoYWRkZWROb2Rlcy5pbmNsdWRlcyhub2RlKSlcbiAgICAgIGNvbnRpbnVlO1xuICAgIG9uRWxSZW1vdmVkcy5mb3JFYWNoKChpKSA9PiBpKG5vZGUpKTtcbiAgfVxuICBhZGRlZE5vZGVzID0gbnVsbDtcbiAgcmVtb3ZlZE5vZGVzID0gbnVsbDtcbiAgYWRkZWRBdHRyaWJ1dGVzID0gbnVsbDtcbiAgcmVtb3ZlZEF0dHJpYnV0ZXMgPSBudWxsO1xufVxuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvc2NvcGUuanNcbmZ1bmN0aW9uIGFkZFNjb3BlVG9Ob2RlKG5vZGUsIGRhdGEyLCByZWZlcmVuY2VOb2RlKSB7XG4gIG5vZGUuX3hfZGF0YVN0YWNrID0gW2RhdGEyLCAuLi5jbG9zZXN0RGF0YVN0YWNrKHJlZmVyZW5jZU5vZGUgfHwgbm9kZSldO1xuICByZXR1cm4gKCkgPT4ge1xuICAgIG5vZGUuX3hfZGF0YVN0YWNrID0gbm9kZS5feF9kYXRhU3RhY2suZmlsdGVyKChpKSA9PiBpICE9PSBkYXRhMik7XG4gIH07XG59XG5mdW5jdGlvbiByZWZyZXNoU2NvcGUoZWxlbWVudCwgc2NvcGUpIHtcbiAgbGV0IGV4aXN0aW5nU2NvcGUgPSBlbGVtZW50Ll94X2RhdGFTdGFja1swXTtcbiAgT2JqZWN0LmVudHJpZXMoc2NvcGUpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgIGV4aXN0aW5nU2NvcGVba2V5XSA9IHZhbHVlO1xuICB9KTtcbn1cbmZ1bmN0aW9uIGNsb3Nlc3REYXRhU3RhY2sobm9kZSkge1xuICBpZiAobm9kZS5feF9kYXRhU3RhY2spXG4gICAgcmV0dXJuIG5vZGUuX3hfZGF0YVN0YWNrO1xuICBpZiAobm9kZSBpbnN0YW5jZW9mIFNoYWRvd1Jvb3QpIHtcbiAgICByZXR1cm4gY2xvc2VzdERhdGFTdGFjayhub2RlLmhvc3QpO1xuICB9XG4gIGlmICghbm9kZS5wYXJlbnROb2RlKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIHJldHVybiBjbG9zZXN0RGF0YVN0YWNrKG5vZGUucGFyZW50Tm9kZSk7XG59XG5mdW5jdGlvbiBtZXJnZVByb3hpZXMob2JqZWN0cykge1xuICByZXR1cm4gbmV3IFByb3h5KHt9LCB7XG4gICAgb3duS2V5czogKCkgPT4ge1xuICAgICAgcmV0dXJuIEFycmF5LmZyb20obmV3IFNldChvYmplY3RzLmZsYXRNYXAoKGkpID0+IE9iamVjdC5rZXlzKGkpKSkpO1xuICAgIH0sXG4gICAgaGFzOiAodGFyZ2V0LCBuYW1lKSA9PiB7XG4gICAgICByZXR1cm4gb2JqZWN0cy5zb21lKChvYmopID0+IG9iai5oYXNPd25Qcm9wZXJ0eShuYW1lKSk7XG4gICAgfSxcbiAgICBnZXQ6ICh0YXJnZXQsIG5hbWUpID0+IHtcbiAgICAgIHJldHVybiAob2JqZWN0cy5maW5kKChvYmopID0+IG9iai5oYXNPd25Qcm9wZXJ0eShuYW1lKSkgfHwge30pW25hbWVdO1xuICAgIH0sXG4gICAgc2V0OiAodGFyZ2V0LCBuYW1lLCB2YWx1ZSkgPT4ge1xuICAgICAgbGV0IGNsb3Nlc3RPYmplY3RXaXRoS2V5ID0gb2JqZWN0cy5maW5kKChvYmopID0+IG9iai5oYXNPd25Qcm9wZXJ0eShuYW1lKSk7XG4gICAgICBpZiAoY2xvc2VzdE9iamVjdFdpdGhLZXkpIHtcbiAgICAgICAgY2xvc2VzdE9iamVjdFdpdGhLZXlbbmFtZV0gPSB2YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9iamVjdHNbb2JqZWN0cy5sZW5ndGggLSAxXVtuYW1lXSA9IHZhbHVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9KTtcbn1cblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL2ludGVyY2VwdG9yLmpzXG5mdW5jdGlvbiBpbml0SW50ZXJjZXB0b3JzKGRhdGEyKSB7XG4gIGxldCBpc09iamVjdCA9ICh2YWwpID0+IHR5cGVvZiB2YWwgPT09IFwib2JqZWN0XCIgJiYgIUFycmF5LmlzQXJyYXkodmFsKSAmJiB2YWwgIT09IG51bGw7XG4gIGxldCByZWN1cnNlID0gKG9iaiwgYmFzZVBhdGggPSBcIlwiKSA9PiB7XG4gICAgT2JqZWN0LmVudHJpZXMob2JqKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgIGxldCBwYXRoID0gYmFzZVBhdGggPT09IFwiXCIgPyBrZXkgOiBgJHtiYXNlUGF0aH0uJHtrZXl9YDtcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgdmFsdWUgIT09IG51bGwgJiYgdmFsdWUuX3hfaW50ZXJjZXB0b3IpIHtcbiAgICAgICAgb2JqW2tleV0gPSB2YWx1ZS5pbml0aWFsaXplKGRhdGEyLCBwYXRoLCBrZXkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGlzT2JqZWN0KHZhbHVlKSAmJiB2YWx1ZSAhPT0gb2JqICYmICEodmFsdWUgaW5zdGFuY2VvZiBFbGVtZW50KSkge1xuICAgICAgICAgIHJlY3Vyc2UodmFsdWUsIHBhdGgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG4gIHJldHVybiByZWN1cnNlKGRhdGEyKTtcbn1cbmZ1bmN0aW9uIGludGVyY2VwdG9yKGNhbGxiYWNrLCBtdXRhdGVPYmogPSAoKSA9PiB7XG59KSB7XG4gIGxldCBvYmogPSB7XG4gICAgaW5pdGlhbFZhbHVlOiB2b2lkIDAsXG4gICAgX3hfaW50ZXJjZXB0b3I6IHRydWUsXG4gICAgaW5pdGlhbGl6ZShkYXRhMiwgcGF0aCwga2V5KSB7XG4gICAgICByZXR1cm4gY2FsbGJhY2sodGhpcy5pbml0aWFsVmFsdWUsICgpID0+IGdldChkYXRhMiwgcGF0aCksICh2YWx1ZSkgPT4gc2V0KGRhdGEyLCBwYXRoLCB2YWx1ZSksIHBhdGgsIGtleSk7XG4gICAgfVxuICB9O1xuICBtdXRhdGVPYmoob2JqKTtcbiAgcmV0dXJuIChpbml0aWFsVmFsdWUpID0+IHtcbiAgICBpZiAodHlwZW9mIGluaXRpYWxWYWx1ZSA9PT0gXCJvYmplY3RcIiAmJiBpbml0aWFsVmFsdWUgIT09IG51bGwgJiYgaW5pdGlhbFZhbHVlLl94X2ludGVyY2VwdG9yKSB7XG4gICAgICBsZXQgaW5pdGlhbGl6ZSA9IG9iai5pbml0aWFsaXplLmJpbmQob2JqKTtcbiAgICAgIG9iai5pbml0aWFsaXplID0gKGRhdGEyLCBwYXRoLCBrZXkpID0+IHtcbiAgICAgICAgbGV0IGlubmVyVmFsdWUgPSBpbml0aWFsVmFsdWUuaW5pdGlhbGl6ZShkYXRhMiwgcGF0aCwga2V5KTtcbiAgICAgICAgb2JqLmluaXRpYWxWYWx1ZSA9IGlubmVyVmFsdWU7XG4gICAgICAgIHJldHVybiBpbml0aWFsaXplKGRhdGEyLCBwYXRoLCBrZXkpO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgb2JqLmluaXRpYWxWYWx1ZSA9IGluaXRpYWxWYWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbiAgfTtcbn1cbmZ1bmN0aW9uIGdldChvYmosIHBhdGgpIHtcbiAgcmV0dXJuIHBhdGguc3BsaXQoXCIuXCIpLnJlZHVjZSgoY2FycnksIHNlZ21lbnQpID0+IGNhcnJ5W3NlZ21lbnRdLCBvYmopO1xufVxuZnVuY3Rpb24gc2V0KG9iaiwgcGF0aCwgdmFsdWUpIHtcbiAgaWYgKHR5cGVvZiBwYXRoID09PSBcInN0cmluZ1wiKVxuICAgIHBhdGggPSBwYXRoLnNwbGl0KFwiLlwiKTtcbiAgaWYgKHBhdGgubGVuZ3RoID09PSAxKVxuICAgIG9ialtwYXRoWzBdXSA9IHZhbHVlO1xuICBlbHNlIGlmIChwYXRoLmxlbmd0aCA9PT0gMClcbiAgICB0aHJvdyBlcnJvcjtcbiAgZWxzZSB7XG4gICAgaWYgKG9ialtwYXRoWzBdXSlcbiAgICAgIHJldHVybiBzZXQob2JqW3BhdGhbMF1dLCBwYXRoLnNsaWNlKDEpLCB2YWx1ZSk7XG4gICAgZWxzZSB7XG4gICAgICBvYmpbcGF0aFswXV0gPSB7fTtcbiAgICAgIHJldHVybiBzZXQob2JqW3BhdGhbMF1dLCBwYXRoLnNsaWNlKDEpLCB2YWx1ZSk7XG4gICAgfVxuICB9XG59XG5cbi8vIHBhY2thZ2VzL2FscGluZWpzL3NyYy9tYWdpY3MuanNcbnZhciBtYWdpY3MgPSB7fTtcbmZ1bmN0aW9uIG1hZ2ljKG5hbWUsIGNhbGxiYWNrKSB7XG4gIG1hZ2ljc1tuYW1lXSA9IGNhbGxiYWNrO1xufVxuZnVuY3Rpb24gaW5qZWN0TWFnaWNzKG9iaiwgZWwpIHtcbiAgT2JqZWN0LmVudHJpZXMobWFnaWNzKS5mb3JFYWNoKChbbmFtZSwgY2FsbGJhY2tdKSA9PiB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgYCQke25hbWV9YCwge1xuICAgICAgZ2V0KCkge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2soZWwsIHtBbHBpbmU6IGFscGluZV9kZWZhdWx0LCBpbnRlcmNlcHRvcn0pO1xuICAgICAgfSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlXG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gb2JqO1xufVxuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvZXZhbHVhdG9yLmpzXG5mdW5jdGlvbiBldmFsdWF0ZShlbCwgZXhwcmVzc2lvbiwgZXh0cmFzID0ge30pIHtcbiAgbGV0IHJlc3VsdDtcbiAgZXZhbHVhdGVMYXRlcihlbCwgZXhwcmVzc2lvbikoKHZhbHVlKSA9PiByZXN1bHQgPSB2YWx1ZSwgZXh0cmFzKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIGV2YWx1YXRlTGF0ZXIoLi4uYXJncykge1xuICByZXR1cm4gdGhlRXZhbHVhdG9yRnVuY3Rpb24oLi4uYXJncyk7XG59XG52YXIgdGhlRXZhbHVhdG9yRnVuY3Rpb24gPSBub3JtYWxFdmFsdWF0b3I7XG5mdW5jdGlvbiBzZXRFdmFsdWF0b3IobmV3RXZhbHVhdG9yKSB7XG4gIHRoZUV2YWx1YXRvckZ1bmN0aW9uID0gbmV3RXZhbHVhdG9yO1xufVxuZnVuY3Rpb24gbm9ybWFsRXZhbHVhdG9yKGVsLCBleHByZXNzaW9uKSB7XG4gIGxldCBvdmVycmlkZGVuTWFnaWNzID0ge307XG4gIGluamVjdE1hZ2ljcyhvdmVycmlkZGVuTWFnaWNzLCBlbCk7XG4gIGxldCBkYXRhU3RhY2sgPSBbb3ZlcnJpZGRlbk1hZ2ljcywgLi4uY2xvc2VzdERhdGFTdGFjayhlbCldO1xuICBpZiAodHlwZW9mIGV4cHJlc3Npb24gPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHJldHVybiBnZW5lcmF0ZUV2YWx1YXRvckZyb21GdW5jdGlvbihkYXRhU3RhY2ssIGV4cHJlc3Npb24pO1xuICB9XG4gIGxldCBldmFsdWF0b3IgPSBnZW5lcmF0ZUV2YWx1YXRvckZyb21TdHJpbmcoZGF0YVN0YWNrLCBleHByZXNzaW9uKTtcbiAgcmV0dXJuIHRyeUNhdGNoLmJpbmQobnVsbCwgZWwsIGV4cHJlc3Npb24sIGV2YWx1YXRvcik7XG59XG5mdW5jdGlvbiBnZW5lcmF0ZUV2YWx1YXRvckZyb21GdW5jdGlvbihkYXRhU3RhY2ssIGZ1bmMpIHtcbiAgcmV0dXJuIChyZWNlaXZlciA9ICgpID0+IHtcbiAgfSwge3Njb3BlID0ge30sIHBhcmFtcyA9IFtdfSA9IHt9KSA9PiB7XG4gICAgbGV0IHJlc3VsdCA9IGZ1bmMuYXBwbHkobWVyZ2VQcm94aWVzKFtzY29wZSwgLi4uZGF0YVN0YWNrXSksIHBhcmFtcyk7XG4gICAgcnVuSWZUeXBlT2ZGdW5jdGlvbihyZWNlaXZlciwgcmVzdWx0KTtcbiAgfTtcbn1cbnZhciBldmFsdWF0b3JNZW1vID0ge307XG5mdW5jdGlvbiBnZW5lcmF0ZUZ1bmN0aW9uRnJvbVN0cmluZyhleHByZXNzaW9uKSB7XG4gIGlmIChldmFsdWF0b3JNZW1vW2V4cHJlc3Npb25dKSB7XG4gICAgcmV0dXJuIGV2YWx1YXRvck1lbW9bZXhwcmVzc2lvbl07XG4gIH1cbiAgbGV0IEFzeW5jRnVuY3Rpb24gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoYXN5bmMgZnVuY3Rpb24oKSB7XG4gIH0pLmNvbnN0cnVjdG9yO1xuICBsZXQgcmlnaHRTaWRlU2FmZUV4cHJlc3Npb24gPSAvXltcXG5cXHNdKmlmLipcXCguKlxcKS8udGVzdChleHByZXNzaW9uKSB8fCAvXihsZXR8Y29uc3QpLy50ZXN0KGV4cHJlc3Npb24pID8gYCgoKSA9PiB7ICR7ZXhwcmVzc2lvbn0gfSkoKWAgOiBleHByZXNzaW9uO1xuICBsZXQgZnVuYyA9IG5ldyBBc3luY0Z1bmN0aW9uKFtcIl9fc2VsZlwiLCBcInNjb3BlXCJdLCBgd2l0aCAoc2NvcGUpIHsgX19zZWxmLnJlc3VsdCA9ICR7cmlnaHRTaWRlU2FmZUV4cHJlc3Npb259IH07IF9fc2VsZi5maW5pc2hlZCA9IHRydWU7IHJldHVybiBfX3NlbGYucmVzdWx0O2ApO1xuICBldmFsdWF0b3JNZW1vW2V4cHJlc3Npb25dID0gZnVuYztcbiAgcmV0dXJuIGZ1bmM7XG59XG5mdW5jdGlvbiBnZW5lcmF0ZUV2YWx1YXRvckZyb21TdHJpbmcoZGF0YVN0YWNrLCBleHByZXNzaW9uKSB7XG4gIGxldCBmdW5jID0gZ2VuZXJhdGVGdW5jdGlvbkZyb21TdHJpbmcoZXhwcmVzc2lvbik7XG4gIHJldHVybiAocmVjZWl2ZXIgPSAoKSA9PiB7XG4gIH0sIHtzY29wZSA9IHt9LCBwYXJhbXMgPSBbXX0gPSB7fSkgPT4ge1xuICAgIGZ1bmMucmVzdWx0ID0gdm9pZCAwO1xuICAgIGZ1bmMuZmluaXNoZWQgPSBmYWxzZTtcbiAgICBsZXQgY29tcGxldGVTY29wZSA9IG1lcmdlUHJveGllcyhbc2NvcGUsIC4uLmRhdGFTdGFja10pO1xuICAgIGxldCBwcm9taXNlID0gZnVuYyhmdW5jLCBjb21wbGV0ZVNjb3BlKTtcbiAgICBpZiAoZnVuYy5maW5pc2hlZCkge1xuICAgICAgcnVuSWZUeXBlT2ZGdW5jdGlvbihyZWNlaXZlciwgZnVuYy5yZXN1bHQsIGNvbXBsZXRlU2NvcGUsIHBhcmFtcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByb21pc2UudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgIHJ1bklmVHlwZU9mRnVuY3Rpb24ocmVjZWl2ZXIsIHJlc3VsdCwgY29tcGxldGVTY29wZSwgcGFyYW1zKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn1cbmZ1bmN0aW9uIHJ1bklmVHlwZU9mRnVuY3Rpb24ocmVjZWl2ZXIsIHZhbHVlLCBzY29wZSwgcGFyYW1zKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIGxldCByZXN1bHQgPSB2YWx1ZS5hcHBseShzY29wZSwgcGFyYW1zKTtcbiAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgcmVzdWx0LnRoZW4oKGkpID0+IHJ1bklmVHlwZU9mRnVuY3Rpb24ocmVjZWl2ZXIsIGksIHNjb3BlLCBwYXJhbXMpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVjZWl2ZXIocmVzdWx0KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmVjZWl2ZXIodmFsdWUpO1xuICB9XG59XG5mdW5jdGlvbiB0cnlDYXRjaChlbCwgZXhwcmVzc2lvbiwgY2FsbGJhY2ssIC4uLmFyZ3MpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gY2FsbGJhY2soLi4uYXJncyk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLndhcm4oYEFscGluZSBFeHByZXNzaW9uIEVycm9yOiAke2UubWVzc2FnZX1cblxuRXhwcmVzc2lvbjogXCIke2V4cHJlc3Npb259XCJcblxuYCwgZWwpO1xuICAgIHRocm93IGU7XG4gIH1cbn1cblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL2RpcmVjdGl2ZXMuanNcbnZhciBwcmVmaXhBc1N0cmluZyA9IFwieC1cIjtcbmZ1bmN0aW9uIHByZWZpeChzdWJqZWN0ID0gXCJcIikge1xuICByZXR1cm4gcHJlZml4QXNTdHJpbmcgKyBzdWJqZWN0O1xufVxuZnVuY3Rpb24gc2V0UHJlZml4KG5ld1ByZWZpeCkge1xuICBwcmVmaXhBc1N0cmluZyA9IG5ld1ByZWZpeDtcbn1cbnZhciBkaXJlY3RpdmVIYW5kbGVycyA9IHt9O1xuZnVuY3Rpb24gZGlyZWN0aXZlKG5hbWUsIGNhbGxiYWNrKSB7XG4gIGRpcmVjdGl2ZUhhbmRsZXJzW25hbWVdID0gY2FsbGJhY2s7XG59XG5mdW5jdGlvbiBkaXJlY3RpdmVzKGVsLCBhdHRyaWJ1dGVzLCBvcmlnaW5hbEF0dHJpYnV0ZU92ZXJyaWRlKSB7XG4gIGxldCB0cmFuc2Zvcm1lZEF0dHJpYnV0ZU1hcCA9IHt9O1xuICBsZXQgZGlyZWN0aXZlczIgPSBBcnJheS5mcm9tKGF0dHJpYnV0ZXMpLm1hcCh0b1RyYW5zZm9ybWVkQXR0cmlidXRlcygobmV3TmFtZSwgb2xkTmFtZSkgPT4gdHJhbnNmb3JtZWRBdHRyaWJ1dGVNYXBbbmV3TmFtZV0gPSBvbGROYW1lKSkuZmlsdGVyKG91dE5vbkFscGluZUF0dHJpYnV0ZXMpLm1hcCh0b1BhcnNlZERpcmVjdGl2ZXModHJhbnNmb3JtZWRBdHRyaWJ1dGVNYXAsIG9yaWdpbmFsQXR0cmlidXRlT3ZlcnJpZGUpKS5zb3J0KGJ5UHJpb3JpdHkpO1xuICByZXR1cm4gZGlyZWN0aXZlczIubWFwKChkaXJlY3RpdmUyKSA9PiB7XG4gICAgcmV0dXJuIGdldERpcmVjdGl2ZUhhbmRsZXIoZWwsIGRpcmVjdGl2ZTIpO1xuICB9KTtcbn1cbnZhciBpc0RlZmVycmluZ0hhbmRsZXJzID0gZmFsc2U7XG52YXIgZGlyZWN0aXZlSGFuZGxlclN0YWNrID0gW107XG5mdW5jdGlvbiBkZWZlckhhbmRsaW5nRGlyZWN0aXZlcyhjYWxsYmFjaykge1xuICBpc0RlZmVycmluZ0hhbmRsZXJzID0gdHJ1ZTtcbiAgbGV0IGZsdXNoSGFuZGxlcnMgPSAoKSA9PiB7XG4gICAgd2hpbGUgKGRpcmVjdGl2ZUhhbmRsZXJTdGFjay5sZW5ndGgpXG4gICAgICBkaXJlY3RpdmVIYW5kbGVyU3RhY2suc2hpZnQoKSgpO1xuICB9O1xuICBsZXQgc3RvcERlZmVycmluZyA9ICgpID0+IHtcbiAgICBpc0RlZmVycmluZ0hhbmRsZXJzID0gZmFsc2U7XG4gICAgZmx1c2hIYW5kbGVycygpO1xuICB9O1xuICBjYWxsYmFjayhmbHVzaEhhbmRsZXJzKTtcbiAgc3RvcERlZmVycmluZygpO1xufVxuZnVuY3Rpb24gZ2V0RGlyZWN0aXZlSGFuZGxlcihlbCwgZGlyZWN0aXZlMikge1xuICBsZXQgbm9vcCA9ICgpID0+IHtcbiAgfTtcbiAgbGV0IGhhbmRsZXIzID0gZGlyZWN0aXZlSGFuZGxlcnNbZGlyZWN0aXZlMi50eXBlXSB8fCBub29wO1xuICBsZXQgY2xlYW51cHMgPSBbXTtcbiAgbGV0IGNsZWFudXAgPSAoY2FsbGJhY2spID0+IGNsZWFudXBzLnB1c2goY2FsbGJhY2spO1xuICBsZXQgW2VmZmVjdDMsIGNsZWFudXBFZmZlY3RdID0gZWxlbWVudEJvdW5kRWZmZWN0KGVsKTtcbiAgY2xlYW51cHMucHVzaChjbGVhbnVwRWZmZWN0KTtcbiAgbGV0IHV0aWxpdGllcyA9IHtcbiAgICBBbHBpbmU6IGFscGluZV9kZWZhdWx0LFxuICAgIGVmZmVjdDogZWZmZWN0MyxcbiAgICBjbGVhbnVwLFxuICAgIGV2YWx1YXRlTGF0ZXI6IGV2YWx1YXRlTGF0ZXIuYmluZChldmFsdWF0ZUxhdGVyLCBlbCksXG4gICAgZXZhbHVhdGU6IGV2YWx1YXRlLmJpbmQoZXZhbHVhdGUsIGVsKVxuICB9O1xuICBsZXQgZG9DbGVhbnVwID0gKCkgPT4gY2xlYW51cHMuZm9yRWFjaCgoaSkgPT4gaSgpKTtcbiAgb25BdHRyaWJ1dGVSZW1vdmVkKGVsLCBkaXJlY3RpdmUyLm9yaWdpbmFsLCBkb0NsZWFudXApO1xuICBsZXQgZnVsbEhhbmRsZXIgPSAoKSA9PiB7XG4gICAgaWYgKGVsLl94X2lnbm9yZSB8fCBlbC5feF9pZ25vcmVTZWxmKVxuICAgICAgcmV0dXJuO1xuICAgIGhhbmRsZXIzLmlubGluZSAmJiBoYW5kbGVyMy5pbmxpbmUoZWwsIGRpcmVjdGl2ZTIsIHV0aWxpdGllcyk7XG4gICAgaGFuZGxlcjMgPSBoYW5kbGVyMy5iaW5kKGhhbmRsZXIzLCBlbCwgZGlyZWN0aXZlMiwgdXRpbGl0aWVzKTtcbiAgICBpc0RlZmVycmluZ0hhbmRsZXJzID8gZGlyZWN0aXZlSGFuZGxlclN0YWNrLnB1c2goaGFuZGxlcjMpIDogaGFuZGxlcjMoKTtcbiAgfTtcbiAgZnVsbEhhbmRsZXIucnVuQ2xlYW51cHMgPSBkb0NsZWFudXA7XG4gIHJldHVybiBmdWxsSGFuZGxlcjtcbn1cbnZhciBzdGFydGluZ1dpdGggPSAoc3ViamVjdCwgcmVwbGFjZW1lbnQpID0+ICh7bmFtZSwgdmFsdWV9KSA9PiB7XG4gIGlmIChuYW1lLnN0YXJ0c1dpdGgoc3ViamVjdCkpXG4gICAgbmFtZSA9IG5hbWUucmVwbGFjZShzdWJqZWN0LCByZXBsYWNlbWVudCk7XG4gIHJldHVybiB7bmFtZSwgdmFsdWV9O1xufTtcbnZhciBpbnRvID0gKGkpID0+IGk7XG5mdW5jdGlvbiB0b1RyYW5zZm9ybWVkQXR0cmlidXRlcyhjYWxsYmFjaykge1xuICByZXR1cm4gKHtuYW1lLCB2YWx1ZX0pID0+IHtcbiAgICBsZXQge25hbWU6IG5ld05hbWUsIHZhbHVlOiBuZXdWYWx1ZX0gPSBhdHRyaWJ1dGVUcmFuc2Zvcm1lcnMucmVkdWNlKChjYXJyeSwgdHJhbnNmb3JtKSA9PiB7XG4gICAgICByZXR1cm4gdHJhbnNmb3JtKGNhcnJ5KTtcbiAgICB9LCB7bmFtZSwgdmFsdWV9KTtcbiAgICBpZiAobmV3TmFtZSAhPT0gbmFtZSlcbiAgICAgIGNhbGxiYWNrKG5ld05hbWUsIG5hbWUpO1xuICAgIHJldHVybiB7bmFtZTogbmV3TmFtZSwgdmFsdWU6IG5ld1ZhbHVlfTtcbiAgfTtcbn1cbnZhciBhdHRyaWJ1dGVUcmFuc2Zvcm1lcnMgPSBbXTtcbmZ1bmN0aW9uIG1hcEF0dHJpYnV0ZXMoY2FsbGJhY2spIHtcbiAgYXR0cmlidXRlVHJhbnNmb3JtZXJzLnB1c2goY2FsbGJhY2spO1xufVxuZnVuY3Rpb24gb3V0Tm9uQWxwaW5lQXR0cmlidXRlcyh7bmFtZX0pIHtcbiAgcmV0dXJuIGFscGluZUF0dHJpYnV0ZVJlZ2V4KCkudGVzdChuYW1lKTtcbn1cbnZhciBhbHBpbmVBdHRyaWJ1dGVSZWdleCA9ICgpID0+IG5ldyBSZWdFeHAoYF4ke3ByZWZpeEFzU3RyaW5nfShbXjpeLl0rKVxcXFxiYCk7XG5mdW5jdGlvbiB0b1BhcnNlZERpcmVjdGl2ZXModHJhbnNmb3JtZWRBdHRyaWJ1dGVNYXAsIG9yaWdpbmFsQXR0cmlidXRlT3ZlcnJpZGUpIHtcbiAgcmV0dXJuICh7bmFtZSwgdmFsdWV9KSA9PiB7XG4gICAgbGV0IHR5cGVNYXRjaCA9IG5hbWUubWF0Y2goYWxwaW5lQXR0cmlidXRlUmVnZXgoKSk7XG4gICAgbGV0IHZhbHVlTWF0Y2ggPSBuYW1lLm1hdGNoKC86KFthLXpBLVowLTlcXC06XSspLyk7XG4gICAgbGV0IG1vZGlmaWVycyA9IG5hbWUubWF0Y2goL1xcLlteLlxcXV0rKD89W15cXF1dKiQpL2cpIHx8IFtdO1xuICAgIGxldCBvcmlnaW5hbCA9IG9yaWdpbmFsQXR0cmlidXRlT3ZlcnJpZGUgfHwgdHJhbnNmb3JtZWRBdHRyaWJ1dGVNYXBbbmFtZV0gfHwgbmFtZTtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogdHlwZU1hdGNoID8gdHlwZU1hdGNoWzFdIDogbnVsbCxcbiAgICAgIHZhbHVlOiB2YWx1ZU1hdGNoID8gdmFsdWVNYXRjaFsxXSA6IG51bGwsXG4gICAgICBtb2RpZmllcnM6IG1vZGlmaWVycy5tYXAoKGkpID0+IGkucmVwbGFjZShcIi5cIiwgXCJcIikpLFxuICAgICAgZXhwcmVzc2lvbjogdmFsdWUsXG4gICAgICBvcmlnaW5hbFxuICAgIH07XG4gIH07XG59XG52YXIgREVGQVVMVCA9IFwiREVGQVVMVFwiO1xudmFyIGRpcmVjdGl2ZU9yZGVyID0gW1xuICBcImlnbm9yZVwiLFxuICBcInJlZlwiLFxuICBcImRhdGFcIixcbiAgXCJiaW5kXCIsXG4gIFwiaW5pdFwiLFxuICBcImZvclwiLFxuICBcIm1vZGVsXCIsXG4gIFwidHJhbnNpdGlvblwiLFxuICBcInNob3dcIixcbiAgXCJpZlwiLFxuICBERUZBVUxULFxuICBcImVsZW1lbnRcIlxuXTtcbmZ1bmN0aW9uIGJ5UHJpb3JpdHkoYSwgYikge1xuICBsZXQgdHlwZUEgPSBkaXJlY3RpdmVPcmRlci5pbmRleE9mKGEudHlwZSkgPT09IC0xID8gREVGQVVMVCA6IGEudHlwZTtcbiAgbGV0IHR5cGVCID0gZGlyZWN0aXZlT3JkZXIuaW5kZXhPZihiLnR5cGUpID09PSAtMSA/IERFRkFVTFQgOiBiLnR5cGU7XG4gIHJldHVybiBkaXJlY3RpdmVPcmRlci5pbmRleE9mKHR5cGVBKSAtIGRpcmVjdGl2ZU9yZGVyLmluZGV4T2YodHlwZUIpO1xufVxuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvdXRpbHMvZGlzcGF0Y2guanNcbmZ1bmN0aW9uIGRpc3BhdGNoKGVsLCBuYW1lLCBkZXRhaWwgPSB7fSkge1xuICBlbC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChuYW1lLCB7XG4gICAgZGV0YWlsLFxuICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgY29tcG9zZWQ6IHRydWUsXG4gICAgY2FuY2VsYWJsZTogdHJ1ZVxuICB9KSk7XG59XG5cbi8vIHBhY2thZ2VzL2FscGluZWpzL3NyYy9uZXh0VGljay5qc1xudmFyIHRpY2tTdGFjayA9IFtdO1xudmFyIGlzSG9sZGluZyA9IGZhbHNlO1xuZnVuY3Rpb24gbmV4dFRpY2soY2FsbGJhY2spIHtcbiAgdGlja1N0YWNrLnB1c2goY2FsbGJhY2spO1xuICBxdWV1ZU1pY3JvdGFzaygoKSA9PiB7XG4gICAgaXNIb2xkaW5nIHx8IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgcmVsZWFzZU5leHRUaWNrcygpO1xuICAgIH0pO1xuICB9KTtcbn1cbmZ1bmN0aW9uIHJlbGVhc2VOZXh0VGlja3MoKSB7XG4gIGlzSG9sZGluZyA9IGZhbHNlO1xuICB3aGlsZSAodGlja1N0YWNrLmxlbmd0aClcbiAgICB0aWNrU3RhY2suc2hpZnQoKSgpO1xufVxuZnVuY3Rpb24gaG9sZE5leHRUaWNrcygpIHtcbiAgaXNIb2xkaW5nID0gdHJ1ZTtcbn1cblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL3V0aWxzL3dhbGsuanNcbmZ1bmN0aW9uIHdhbGsoZWwsIGNhbGxiYWNrKSB7XG4gIGlmIChlbCBpbnN0YW5jZW9mIFNoYWRvd1Jvb3QpIHtcbiAgICBBcnJheS5mcm9tKGVsLmNoaWxkcmVuKS5mb3JFYWNoKChlbDIpID0+IHdhbGsoZWwyLCBjYWxsYmFjaykpO1xuICAgIHJldHVybjtcbiAgfVxuICBsZXQgc2tpcCA9IGZhbHNlO1xuICBjYWxsYmFjayhlbCwgKCkgPT4gc2tpcCA9IHRydWUpO1xuICBpZiAoc2tpcClcbiAgICByZXR1cm47XG4gIGxldCBub2RlID0gZWwuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gIHdoaWxlIChub2RlKSB7XG4gICAgd2Fsayhub2RlLCBjYWxsYmFjaywgZmFsc2UpO1xuICAgIG5vZGUgPSBub2RlLm5leHRFbGVtZW50U2libGluZztcbiAgfVxufVxuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvdXRpbHMvd2Fybi5qc1xuZnVuY3Rpb24gd2FybihtZXNzYWdlLCAuLi5hcmdzKSB7XG4gIGNvbnNvbGUud2FybihgQWxwaW5lIFdhcm5pbmc6ICR7bWVzc2FnZX1gLCAuLi5hcmdzKTtcbn1cblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL2xpZmVjeWNsZS5qc1xuZnVuY3Rpb24gc3RhcnQoKSB7XG4gIGlmICghZG9jdW1lbnQuYm9keSlcbiAgICB3YXJuKFwiVW5hYmxlIHRvIGluaXRpYWxpemUuIFRyeWluZyB0byBsb2FkIEFscGluZSBiZWZvcmUgYDxib2R5PmAgaXMgYXZhaWxhYmxlLiBEaWQgeW91IGZvcmdldCB0byBhZGQgYGRlZmVyYCBpbiBBbHBpbmUncyBgPHNjcmlwdD5gIHRhZz9cIik7XG4gIGRpc3BhdGNoKGRvY3VtZW50LCBcImFscGluZTppbml0XCIpO1xuICBkaXNwYXRjaChkb2N1bWVudCwgXCJhbHBpbmU6aW5pdGlhbGl6aW5nXCIpO1xuICBzdGFydE9ic2VydmluZ011dGF0aW9ucygpO1xuICBvbkVsQWRkZWQoKGVsKSA9PiBpbml0VHJlZShlbCwgd2FsaykpO1xuICBvbkVsUmVtb3ZlZCgoZWwpID0+IG5leHRUaWNrKCgpID0+IGRlc3Ryb3lUcmVlKGVsKSkpO1xuICBvbkF0dHJpYnV0ZXNBZGRlZCgoZWwsIGF0dHJzKSA9PiB7XG4gICAgZGlyZWN0aXZlcyhlbCwgYXR0cnMpLmZvckVhY2goKGhhbmRsZSkgPT4gaGFuZGxlKCkpO1xuICB9KTtcbiAgbGV0IG91dE5lc3RlZENvbXBvbmVudHMgPSAoZWwpID0+ICFjbG9zZXN0Um9vdChlbC5wYXJlbnROb2RlIHx8IGNsb3Nlc3RSb290KGVsKSk7XG4gIEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChhbGxTZWxlY3RvcnMoKSkpLmZpbHRlcihvdXROZXN0ZWRDb21wb25lbnRzKS5mb3JFYWNoKChlbCkgPT4ge1xuICAgIGluaXRUcmVlKGVsKTtcbiAgfSk7XG4gIGRpc3BhdGNoKGRvY3VtZW50LCBcImFscGluZTppbml0aWFsaXplZFwiKTtcbn1cbnZhciByb290U2VsZWN0b3JDYWxsYmFja3MgPSBbXTtcbnZhciBpbml0U2VsZWN0b3JDYWxsYmFja3MgPSBbXTtcbmZ1bmN0aW9uIHJvb3RTZWxlY3RvcnMoKSB7XG4gIHJldHVybiByb290U2VsZWN0b3JDYWxsYmFja3MubWFwKChmbikgPT4gZm4oKSk7XG59XG5mdW5jdGlvbiBhbGxTZWxlY3RvcnMoKSB7XG4gIHJldHVybiByb290U2VsZWN0b3JDYWxsYmFja3MuY29uY2F0KGluaXRTZWxlY3RvckNhbGxiYWNrcykubWFwKChmbikgPT4gZm4oKSk7XG59XG5mdW5jdGlvbiBhZGRSb290U2VsZWN0b3Ioc2VsZWN0b3JDYWxsYmFjaykge1xuICByb290U2VsZWN0b3JDYWxsYmFja3MucHVzaChzZWxlY3RvckNhbGxiYWNrKTtcbn1cbmZ1bmN0aW9uIGFkZEluaXRTZWxlY3RvcihzZWxlY3RvckNhbGxiYWNrKSB7XG4gIGluaXRTZWxlY3RvckNhbGxiYWNrcy5wdXNoKHNlbGVjdG9yQ2FsbGJhY2spO1xufVxuZnVuY3Rpb24gY2xvc2VzdFJvb3QoZWwpIHtcbiAgaWYgKHJvb3RTZWxlY3RvcnMoKS5zb21lKChzZWxlY3RvcikgPT4gZWwubWF0Y2hlcyhzZWxlY3RvcikpKVxuICAgIHJldHVybiBlbDtcbiAgaWYgKCFlbC5wYXJlbnRFbGVtZW50KVxuICAgIHJldHVybjtcbiAgcmV0dXJuIGNsb3Nlc3RSb290KGVsLnBhcmVudEVsZW1lbnQpO1xufVxuZnVuY3Rpb24gaXNSb290KGVsKSB7XG4gIHJldHVybiByb290U2VsZWN0b3JzKCkuc29tZSgoc2VsZWN0b3IpID0+IGVsLm1hdGNoZXMoc2VsZWN0b3IpKTtcbn1cbmZ1bmN0aW9uIGluaXRUcmVlKGVsLCB3YWxrZXIgPSB3YWxrKSB7XG4gIGRlZmVySGFuZGxpbmdEaXJlY3RpdmVzKCgpID0+IHtcbiAgICB3YWxrZXIoZWwsIChlbDIsIHNraXApID0+IHtcbiAgICAgIGRpcmVjdGl2ZXMoZWwyLCBlbDIuYXR0cmlidXRlcykuZm9yRWFjaCgoaGFuZGxlKSA9PiBoYW5kbGUoKSk7XG4gICAgICBlbDIuX3hfaWdub3JlICYmIHNraXAoKTtcbiAgICB9KTtcbiAgfSk7XG59XG5mdW5jdGlvbiBkZXN0cm95VHJlZShyb290KSB7XG4gIHdhbGsocm9vdCwgKGVsKSA9PiBjbGVhbnVwQXR0cmlidXRlcyhlbCkpO1xufVxuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvcGx1Z2luLmpzXG5mdW5jdGlvbiBwbHVnaW4oY2FsbGJhY2spIHtcbiAgY2FsbGJhY2soYWxwaW5lX2RlZmF1bHQpO1xufVxuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvc3RvcmUuanNcbnZhciBzdG9yZXMgPSB7fTtcbnZhciBpc1JlYWN0aXZlID0gZmFsc2U7XG5mdW5jdGlvbiBzdG9yZShuYW1lLCB2YWx1ZSkge1xuICBpZiAoIWlzUmVhY3RpdmUpIHtcbiAgICBzdG9yZXMgPSByZWFjdGl2ZShzdG9yZXMpO1xuICAgIGlzUmVhY3RpdmUgPSB0cnVlO1xuICB9XG4gIGlmICh2YWx1ZSA9PT0gdm9pZCAwKSB7XG4gICAgcmV0dXJuIHN0b3Jlc1tuYW1lXTtcbiAgfVxuICBzdG9yZXNbbmFtZV0gPSB2YWx1ZTtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZS5oYXNPd25Qcm9wZXJ0eShcImluaXRcIikgJiYgdHlwZW9mIHZhbHVlLmluaXQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHN0b3Jlc1tuYW1lXS5pbml0KCk7XG4gIH1cbn1cbmZ1bmN0aW9uIGdldFN0b3JlcygpIHtcbiAgcmV0dXJuIHN0b3Jlcztcbn1cblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL2Nsb25lLmpzXG52YXIgaXNDbG9uaW5nID0gZmFsc2U7XG5mdW5jdGlvbiBza2lwRHVyaW5nQ2xvbmUoY2FsbGJhY2spIHtcbiAgcmV0dXJuICguLi5hcmdzKSA9PiBpc0Nsb25pbmcgfHwgY2FsbGJhY2soLi4uYXJncyk7XG59XG5mdW5jdGlvbiBjbG9uZShvbGRFbCwgbmV3RWwpIHtcbiAgbmV3RWwuX3hfZGF0YVN0YWNrID0gb2xkRWwuX3hfZGF0YVN0YWNrO1xuICBpc0Nsb25pbmcgPSB0cnVlO1xuICBkb250UmVnaXN0ZXJSZWFjdGl2ZVNpZGVFZmZlY3RzKCgpID0+IHtcbiAgICBjbG9uZVRyZWUobmV3RWwpO1xuICB9KTtcbiAgaXNDbG9uaW5nID0gZmFsc2U7XG59XG5mdW5jdGlvbiBjbG9uZVRyZWUoZWwpIHtcbiAgbGV0IGhhc1J1blRocm91Z2hGaXJzdEVsID0gZmFsc2U7XG4gIGxldCBzaGFsbG93V2Fsa2VyID0gKGVsMiwgY2FsbGJhY2spID0+IHtcbiAgICB3YWxrKGVsMiwgKGVsMywgc2tpcCkgPT4ge1xuICAgICAgaWYgKGhhc1J1blRocm91Z2hGaXJzdEVsICYmIGlzUm9vdChlbDMpKVxuICAgICAgICByZXR1cm4gc2tpcCgpO1xuICAgICAgaGFzUnVuVGhyb3VnaEZpcnN0RWwgPSB0cnVlO1xuICAgICAgY2FsbGJhY2soZWwzLCBza2lwKTtcbiAgICB9KTtcbiAgfTtcbiAgaW5pdFRyZWUoZWwsIHNoYWxsb3dXYWxrZXIpO1xufVxuZnVuY3Rpb24gZG9udFJlZ2lzdGVyUmVhY3RpdmVTaWRlRWZmZWN0cyhjYWxsYmFjaykge1xuICBsZXQgY2FjaGUgPSBlZmZlY3Q7XG4gIG92ZXJyaWRlRWZmZWN0KChjYWxsYmFjazIsIGVsKSA9PiB7XG4gICAgbGV0IHN0b3JlZEVmZmVjdCA9IGNhY2hlKGNhbGxiYWNrMik7XG4gICAgcmVsZWFzZShzdG9yZWRFZmZlY3QpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgfTtcbiAgfSk7XG4gIGNhbGxiYWNrKCk7XG4gIG92ZXJyaWRlRWZmZWN0KGNhY2hlKTtcbn1cblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL2RhdGFzLmpzXG52YXIgZGF0YXMgPSB7fTtcbmZ1bmN0aW9uIGRhdGEobmFtZSwgY2FsbGJhY2spIHtcbiAgZGF0YXNbbmFtZV0gPSBjYWxsYmFjaztcbn1cbmZ1bmN0aW9uIGluamVjdERhdGFQcm92aWRlcnMob2JqLCBjb250ZXh0KSB7XG4gIE9iamVjdC5lbnRyaWVzKGRhdGFzKS5mb3JFYWNoKChbbmFtZSwgY2FsbGJhY2tdKSA9PiB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgbmFtZSwge1xuICAgICAgZ2V0KCkge1xuICAgICAgICByZXR1cm4gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgICByZXR1cm4gY2FsbGJhY2suYmluZChjb250ZXh0KSguLi5hcmdzKTtcbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZVxuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIG9iajtcbn1cblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL2FscGluZS5qc1xudmFyIEFscGluZSA9IHtcbiAgZ2V0IHJlYWN0aXZlKCkge1xuICAgIHJldHVybiByZWFjdGl2ZTtcbiAgfSxcbiAgZ2V0IHJlbGVhc2UoKSB7XG4gICAgcmV0dXJuIHJlbGVhc2U7XG4gIH0sXG4gIGdldCBlZmZlY3QoKSB7XG4gICAgcmV0dXJuIGVmZmVjdDtcbiAgfSxcbiAgZ2V0IHJhdygpIHtcbiAgICByZXR1cm4gcmF3O1xuICB9LFxuICB2ZXJzaW9uOiBcIjMuMi4yXCIsXG4gIGRpc2FibGVFZmZlY3RTY2hlZHVsaW5nLFxuICBzZXRSZWFjdGl2aXR5RW5naW5lLFxuICBhZGRSb290U2VsZWN0b3IsXG4gIG1hcEF0dHJpYnV0ZXMsXG4gIGV2YWx1YXRlTGF0ZXIsXG4gIHNldEV2YWx1YXRvcixcbiAgY2xvc2VzdFJvb3QsXG4gIGludGVyY2VwdG9yLFxuICBtdXRhdGVEb20sXG4gIGRpcmVjdGl2ZSxcbiAgZXZhbHVhdGUsXG4gIGluaXRUcmVlLFxuICBuZXh0VGljayxcbiAgcHJlZml4OiBzZXRQcmVmaXgsXG4gIHBsdWdpbixcbiAgbWFnaWMsXG4gIHN0b3JlLFxuICBzdGFydCxcbiAgY2xvbmUsXG4gIGRhdGFcbn07XG52YXIgYWxwaW5lX2RlZmF1bHQgPSBBbHBpbmU7XG5cbi8vIHBhY2thZ2VzL2FscGluZWpzL3NyYy9pbmRleC5qc1xudmFyIGltcG9ydF9yZWFjdGl2aXR5OSA9IF9fdG9Nb2R1bGUocmVxdWlyZV9yZWFjdGl2aXR5KCkpO1xuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvbWFnaWNzLyRuZXh0VGljay5qc1xubWFnaWMoXCJuZXh0VGlja1wiLCAoKSA9PiBuZXh0VGljayk7XG5cbi8vIHBhY2thZ2VzL2FscGluZWpzL3NyYy9tYWdpY3MvJGRpc3BhdGNoLmpzXG5tYWdpYyhcImRpc3BhdGNoXCIsIChlbCkgPT4gZGlzcGF0Y2guYmluZChkaXNwYXRjaCwgZWwpKTtcblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL21hZ2ljcy8kd2F0Y2guanNcbm1hZ2ljKFwid2F0Y2hcIiwgKGVsKSA9PiAoa2V5LCBjYWxsYmFjaykgPT4ge1xuICBsZXQgZXZhbHVhdGUyID0gZXZhbHVhdGVMYXRlcihlbCwga2V5KTtcbiAgbGV0IGZpcnN0VGltZSA9IHRydWU7XG4gIGxldCBvbGRWYWx1ZTtcbiAgZWZmZWN0KCgpID0+IGV2YWx1YXRlMigodmFsdWUpID0+IHtcbiAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBkaXYuZGF0YXNldC50aHJvd0F3YXkgPSB2YWx1ZTtcbiAgICBpZiAoIWZpcnN0VGltZSkge1xuICAgICAgcXVldWVNaWNyb3Rhc2soKCkgPT4ge1xuICAgICAgICBjYWxsYmFjayh2YWx1ZSwgb2xkVmFsdWUpO1xuICAgICAgICBvbGRWYWx1ZSA9IHZhbHVlO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9sZFZhbHVlID0gdmFsdWU7XG4gICAgfVxuICAgIGZpcnN0VGltZSA9IGZhbHNlO1xuICB9KSk7XG59KTtcblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL21hZ2ljcy8kc3RvcmUuanNcbm1hZ2ljKFwic3RvcmVcIiwgZ2V0U3RvcmVzKTtcblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL21hZ2ljcy8kcmVmcy5qc1xubWFnaWMoXCJyZWZzXCIsIChlbCkgPT4gY2xvc2VzdFJvb3QoZWwpLl94X3JlZnMgfHwge30pO1xuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvbWFnaWNzLyRlbC5qc1xubWFnaWMoXCJlbFwiLCAoZWwpID0+IGVsKTtcblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL3V0aWxzL2NsYXNzZXMuanNcbmZ1bmN0aW9uIHNldENsYXNzZXMoZWwsIHZhbHVlKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgIHJldHVybiBzZXRDbGFzc2VzRnJvbVN0cmluZyhlbCwgdmFsdWUuam9pbihcIiBcIikpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiB2YWx1ZSAhPT0gbnVsbCkge1xuICAgIHJldHVybiBzZXRDbGFzc2VzRnJvbU9iamVjdChlbCwgdmFsdWUpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgcmV0dXJuIHNldENsYXNzZXMoZWwsIHZhbHVlKCkpO1xuICB9XG4gIHJldHVybiBzZXRDbGFzc2VzRnJvbVN0cmluZyhlbCwgdmFsdWUpO1xufVxuZnVuY3Rpb24gc2V0Q2xhc3Nlc0Zyb21TdHJpbmcoZWwsIGNsYXNzU3RyaW5nKSB7XG4gIGxldCBzcGxpdCA9IChjbGFzc1N0cmluZzIpID0+IGNsYXNzU3RyaW5nMi5zcGxpdChcIiBcIikuZmlsdGVyKEJvb2xlYW4pO1xuICBsZXQgbWlzc2luZ0NsYXNzZXMgPSAoY2xhc3NTdHJpbmcyKSA9PiBjbGFzc1N0cmluZzIuc3BsaXQoXCIgXCIpLmZpbHRlcigoaSkgPT4gIWVsLmNsYXNzTGlzdC5jb250YWlucyhpKSkuZmlsdGVyKEJvb2xlYW4pO1xuICBsZXQgYWRkQ2xhc3Nlc0FuZFJldHVyblVuZG8gPSAoY2xhc3NlcykgPT4ge1xuICAgIGVsLmNsYXNzTGlzdC5hZGQoLi4uY2xhc3Nlcyk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoLi4uY2xhc3Nlcyk7XG4gICAgfTtcbiAgfTtcbiAgY2xhc3NTdHJpbmcgPSBjbGFzc1N0cmluZyA9PT0gdHJ1ZSA/IGNsYXNzU3RyaW5nID0gXCJcIiA6IGNsYXNzU3RyaW5nIHx8IFwiXCI7XG4gIHJldHVybiBhZGRDbGFzc2VzQW5kUmV0dXJuVW5kbyhtaXNzaW5nQ2xhc3NlcyhjbGFzc1N0cmluZykpO1xufVxuZnVuY3Rpb24gc2V0Q2xhc3Nlc0Zyb21PYmplY3QoZWwsIGNsYXNzT2JqZWN0KSB7XG4gIGxldCBzcGxpdCA9IChjbGFzc1N0cmluZykgPT4gY2xhc3NTdHJpbmcuc3BsaXQoXCIgXCIpLmZpbHRlcihCb29sZWFuKTtcbiAgbGV0IGZvckFkZCA9IE9iamVjdC5lbnRyaWVzKGNsYXNzT2JqZWN0KS5mbGF0TWFwKChbY2xhc3NTdHJpbmcsIGJvb2xdKSA9PiBib29sID8gc3BsaXQoY2xhc3NTdHJpbmcpIDogZmFsc2UpLmZpbHRlcihCb29sZWFuKTtcbiAgbGV0IGZvclJlbW92ZSA9IE9iamVjdC5lbnRyaWVzKGNsYXNzT2JqZWN0KS5mbGF0TWFwKChbY2xhc3NTdHJpbmcsIGJvb2xdKSA9PiAhYm9vbCA/IHNwbGl0KGNsYXNzU3RyaW5nKSA6IGZhbHNlKS5maWx0ZXIoQm9vbGVhbik7XG4gIGxldCBhZGRlZCA9IFtdO1xuICBsZXQgcmVtb3ZlZCA9IFtdO1xuICBmb3JSZW1vdmUuZm9yRWFjaCgoaSkgPT4ge1xuICAgIGlmIChlbC5jbGFzc0xpc3QuY29udGFpbnMoaSkpIHtcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoaSk7XG4gICAgICByZW1vdmVkLnB1c2goaSk7XG4gICAgfVxuICB9KTtcbiAgZm9yQWRkLmZvckVhY2goKGkpID0+IHtcbiAgICBpZiAoIWVsLmNsYXNzTGlzdC5jb250YWlucyhpKSkge1xuICAgICAgZWwuY2xhc3NMaXN0LmFkZChpKTtcbiAgICAgIGFkZGVkLnB1c2goaSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuICgpID0+IHtcbiAgICByZW1vdmVkLmZvckVhY2goKGkpID0+IGVsLmNsYXNzTGlzdC5hZGQoaSkpO1xuICAgIGFkZGVkLmZvckVhY2goKGkpID0+IGVsLmNsYXNzTGlzdC5yZW1vdmUoaSkpO1xuICB9O1xufVxuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvdXRpbHMvc3R5bGVzLmpzXG5mdW5jdGlvbiBzZXRTdHlsZXMoZWwsIHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgdmFsdWUgIT09IG51bGwpIHtcbiAgICByZXR1cm4gc2V0U3R5bGVzRnJvbU9iamVjdChlbCwgdmFsdWUpO1xuICB9XG4gIHJldHVybiBzZXRTdHlsZXNGcm9tU3RyaW5nKGVsLCB2YWx1ZSk7XG59XG5mdW5jdGlvbiBzZXRTdHlsZXNGcm9tT2JqZWN0KGVsLCB2YWx1ZSkge1xuICBsZXQgcHJldmlvdXNTdHlsZXMgPSB7fTtcbiAgT2JqZWN0LmVudHJpZXModmFsdWUpLmZvckVhY2goKFtrZXksIHZhbHVlMl0pID0+IHtcbiAgICBwcmV2aW91c1N0eWxlc1trZXldID0gZWwuc3R5bGVba2V5XTtcbiAgICBlbC5zdHlsZVtrZXldID0gdmFsdWUyO1xuICB9KTtcbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgaWYgKGVsLnN0eWxlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKFwic3R5bGVcIik7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuICgpID0+IHtcbiAgICBzZXRTdHlsZXMoZWwsIHByZXZpb3VzU3R5bGVzKTtcbiAgfTtcbn1cbmZ1bmN0aW9uIHNldFN0eWxlc0Zyb21TdHJpbmcoZWwsIHZhbHVlKSB7XG4gIGxldCBjYWNoZSA9IGVsLmdldEF0dHJpYnV0ZShcInN0eWxlXCIsIHZhbHVlKTtcbiAgZWwuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgdmFsdWUpO1xuICByZXR1cm4gKCkgPT4ge1xuICAgIGVsLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIGNhY2hlKTtcbiAgfTtcbn1cblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL3V0aWxzL29uY2UuanNcbmZ1bmN0aW9uIG9uY2UoY2FsbGJhY2ssIGZhbGxiYWNrID0gKCkgPT4ge1xufSkge1xuICBsZXQgY2FsbGVkID0gZmFsc2U7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICBpZiAoIWNhbGxlZCkge1xuICAgICAgY2FsbGVkID0gdHJ1ZTtcbiAgICAgIGNhbGxiYWNrLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZhbGxiYWNrLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9O1xufVxuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvZGlyZWN0aXZlcy94LXRyYW5zaXRpb24uanNcbmRpcmVjdGl2ZShcInRyYW5zaXRpb25cIiwgKGVsLCB7dmFsdWUsIG1vZGlmaWVycywgZXhwcmVzc2lvbn0sIHtldmFsdWF0ZTogZXZhbHVhdGUyfSkgPT4ge1xuICBpZiAodHlwZW9mIGV4cHJlc3Npb24gPT09IFwiZnVuY3Rpb25cIilcbiAgICBleHByZXNzaW9uID0gZXZhbHVhdGUyKGV4cHJlc3Npb24pO1xuICBpZiAoIWV4cHJlc3Npb24pIHtcbiAgICByZWdpc3RlclRyYW5zaXRpb25zRnJvbUhlbHBlcihlbCwgbW9kaWZpZXJzLCB2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgcmVnaXN0ZXJUcmFuc2l0aW9uc0Zyb21DbGFzc1N0cmluZyhlbCwgZXhwcmVzc2lvbiwgdmFsdWUpO1xuICB9XG59KTtcbmZ1bmN0aW9uIHJlZ2lzdGVyVHJhbnNpdGlvbnNGcm9tQ2xhc3NTdHJpbmcoZWwsIGNsYXNzU3RyaW5nLCBzdGFnZSkge1xuICByZWdpc3RlclRyYW5zaXRpb25PYmplY3QoZWwsIHNldENsYXNzZXMsIFwiXCIpO1xuICBsZXQgZGlyZWN0aXZlU3RvcmFnZU1hcCA9IHtcbiAgICBlbnRlcjogKGNsYXNzZXMpID0+IHtcbiAgICAgIGVsLl94X3RyYW5zaXRpb24uZW50ZXIuZHVyaW5nID0gY2xhc3NlcztcbiAgICB9LFxuICAgIFwiZW50ZXItc3RhcnRcIjogKGNsYXNzZXMpID0+IHtcbiAgICAgIGVsLl94X3RyYW5zaXRpb24uZW50ZXIuc3RhcnQgPSBjbGFzc2VzO1xuICAgIH0sXG4gICAgXCJlbnRlci1lbmRcIjogKGNsYXNzZXMpID0+IHtcbiAgICAgIGVsLl94X3RyYW5zaXRpb24uZW50ZXIuZW5kID0gY2xhc3NlcztcbiAgICB9LFxuICAgIGxlYXZlOiAoY2xhc3NlcykgPT4ge1xuICAgICAgZWwuX3hfdHJhbnNpdGlvbi5sZWF2ZS5kdXJpbmcgPSBjbGFzc2VzO1xuICAgIH0sXG4gICAgXCJsZWF2ZS1zdGFydFwiOiAoY2xhc3NlcykgPT4ge1xuICAgICAgZWwuX3hfdHJhbnNpdGlvbi5sZWF2ZS5zdGFydCA9IGNsYXNzZXM7XG4gICAgfSxcbiAgICBcImxlYXZlLWVuZFwiOiAoY2xhc3NlcykgPT4ge1xuICAgICAgZWwuX3hfdHJhbnNpdGlvbi5sZWF2ZS5lbmQgPSBjbGFzc2VzO1xuICAgIH1cbiAgfTtcbiAgZGlyZWN0aXZlU3RvcmFnZU1hcFtzdGFnZV0oY2xhc3NTdHJpbmcpO1xufVxuZnVuY3Rpb24gcmVnaXN0ZXJUcmFuc2l0aW9uc0Zyb21IZWxwZXIoZWwsIG1vZGlmaWVycywgc3RhZ2UpIHtcbiAgcmVnaXN0ZXJUcmFuc2l0aW9uT2JqZWN0KGVsLCBzZXRTdHlsZXMpO1xuICBsZXQgZG9lc250U3BlY2lmeSA9ICFtb2RpZmllcnMuaW5jbHVkZXMoXCJpblwiKSAmJiAhbW9kaWZpZXJzLmluY2x1ZGVzKFwib3V0XCIpICYmICFzdGFnZTtcbiAgbGV0IHRyYW5zaXRpb25pbmdJbiA9IGRvZXNudFNwZWNpZnkgfHwgbW9kaWZpZXJzLmluY2x1ZGVzKFwiaW5cIikgfHwgW1wiZW50ZXJcIl0uaW5jbHVkZXMoc3RhZ2UpO1xuICBsZXQgdHJhbnNpdGlvbmluZ091dCA9IGRvZXNudFNwZWNpZnkgfHwgbW9kaWZpZXJzLmluY2x1ZGVzKFwib3V0XCIpIHx8IFtcImxlYXZlXCJdLmluY2x1ZGVzKHN0YWdlKTtcbiAgaWYgKG1vZGlmaWVycy5pbmNsdWRlcyhcImluXCIpICYmICFkb2VzbnRTcGVjaWZ5KSB7XG4gICAgbW9kaWZpZXJzID0gbW9kaWZpZXJzLmZpbHRlcigoaSwgaW5kZXgpID0+IGluZGV4IDwgbW9kaWZpZXJzLmluZGV4T2YoXCJvdXRcIikpO1xuICB9XG4gIGlmIChtb2RpZmllcnMuaW5jbHVkZXMoXCJvdXRcIikgJiYgIWRvZXNudFNwZWNpZnkpIHtcbiAgICBtb2RpZmllcnMgPSBtb2RpZmllcnMuZmlsdGVyKChpLCBpbmRleCkgPT4gaW5kZXggPiBtb2RpZmllcnMuaW5kZXhPZihcIm91dFwiKSk7XG4gIH1cbiAgbGV0IHdhbnRzQWxsID0gIW1vZGlmaWVycy5pbmNsdWRlcyhcIm9wYWNpdHlcIikgJiYgIW1vZGlmaWVycy5pbmNsdWRlcyhcInNjYWxlXCIpO1xuICBsZXQgd2FudHNPcGFjaXR5ID0gd2FudHNBbGwgfHwgbW9kaWZpZXJzLmluY2x1ZGVzKFwib3BhY2l0eVwiKTtcbiAgbGV0IHdhbnRzU2NhbGUgPSB3YW50c0FsbCB8fCBtb2RpZmllcnMuaW5jbHVkZXMoXCJzY2FsZVwiKTtcbiAgbGV0IG9wYWNpdHlWYWx1ZSA9IHdhbnRzT3BhY2l0eSA/IDAgOiAxO1xuICBsZXQgc2NhbGVWYWx1ZSA9IHdhbnRzU2NhbGUgPyBtb2RpZmllclZhbHVlKG1vZGlmaWVycywgXCJzY2FsZVwiLCA5NSkgLyAxMDAgOiAxO1xuICBsZXQgZGVsYXkgPSBtb2RpZmllclZhbHVlKG1vZGlmaWVycywgXCJkZWxheVwiLCAwKTtcbiAgbGV0IG9yaWdpbiA9IG1vZGlmaWVyVmFsdWUobW9kaWZpZXJzLCBcIm9yaWdpblwiLCBcImNlbnRlclwiKTtcbiAgbGV0IHByb3BlcnR5ID0gXCJvcGFjaXR5LCB0cmFuc2Zvcm1cIjtcbiAgbGV0IGR1cmF0aW9uSW4gPSBtb2RpZmllclZhbHVlKG1vZGlmaWVycywgXCJkdXJhdGlvblwiLCAxNTApIC8gMWUzO1xuICBsZXQgZHVyYXRpb25PdXQgPSBtb2RpZmllclZhbHVlKG1vZGlmaWVycywgXCJkdXJhdGlvblwiLCA3NSkgLyAxZTM7XG4gIGxldCBlYXNpbmcgPSBgY3ViaWMtYmV6aWVyKDAuNCwgMC4wLCAwLjIsIDEpYDtcbiAgaWYgKHRyYW5zaXRpb25pbmdJbikge1xuICAgIGVsLl94X3RyYW5zaXRpb24uZW50ZXIuZHVyaW5nID0ge1xuICAgICAgdHJhbnNmb3JtT3JpZ2luOiBvcmlnaW4sXG4gICAgICB0cmFuc2l0aW9uRGVsYXk6IGRlbGF5LFxuICAgICAgdHJhbnNpdGlvblByb3BlcnR5OiBwcm9wZXJ0eSxcbiAgICAgIHRyYW5zaXRpb25EdXJhdGlvbjogYCR7ZHVyYXRpb25Jbn1zYCxcbiAgICAgIHRyYW5zaXRpb25UaW1pbmdGdW5jdGlvbjogZWFzaW5nXG4gICAgfTtcbiAgICBlbC5feF90cmFuc2l0aW9uLmVudGVyLnN0YXJ0ID0ge1xuICAgICAgb3BhY2l0eTogb3BhY2l0eVZhbHVlLFxuICAgICAgdHJhbnNmb3JtOiBgc2NhbGUoJHtzY2FsZVZhbHVlfSlgXG4gICAgfTtcbiAgICBlbC5feF90cmFuc2l0aW9uLmVudGVyLmVuZCA9IHtcbiAgICAgIG9wYWNpdHk6IDEsXG4gICAgICB0cmFuc2Zvcm06IGBzY2FsZSgxKWBcbiAgICB9O1xuICB9XG4gIGlmICh0cmFuc2l0aW9uaW5nT3V0KSB7XG4gICAgZWwuX3hfdHJhbnNpdGlvbi5sZWF2ZS5kdXJpbmcgPSB7XG4gICAgICB0cmFuc2Zvcm1PcmlnaW46IG9yaWdpbixcbiAgICAgIHRyYW5zaXRpb25EZWxheTogZGVsYXksXG4gICAgICB0cmFuc2l0aW9uUHJvcGVydHk6IHByb3BlcnR5LFxuICAgICAgdHJhbnNpdGlvbkR1cmF0aW9uOiBgJHtkdXJhdGlvbk91dH1zYCxcbiAgICAgIHRyYW5zaXRpb25UaW1pbmdGdW5jdGlvbjogZWFzaW5nXG4gICAgfTtcbiAgICBlbC5feF90cmFuc2l0aW9uLmxlYXZlLnN0YXJ0ID0ge1xuICAgICAgb3BhY2l0eTogMSxcbiAgICAgIHRyYW5zZm9ybTogYHNjYWxlKDEpYFxuICAgIH07XG4gICAgZWwuX3hfdHJhbnNpdGlvbi5sZWF2ZS5lbmQgPSB7XG4gICAgICBvcGFjaXR5OiBvcGFjaXR5VmFsdWUsXG4gICAgICB0cmFuc2Zvcm06IGBzY2FsZSgke3NjYWxlVmFsdWV9KWBcbiAgICB9O1xuICB9XG59XG5mdW5jdGlvbiByZWdpc3RlclRyYW5zaXRpb25PYmplY3QoZWwsIHNldEZ1bmN0aW9uLCBkZWZhdWx0VmFsdWUgPSB7fSkge1xuICBpZiAoIWVsLl94X3RyYW5zaXRpb24pXG4gICAgZWwuX3hfdHJhbnNpdGlvbiA9IHtcbiAgICAgIGVudGVyOiB7ZHVyaW5nOiBkZWZhdWx0VmFsdWUsIHN0YXJ0OiBkZWZhdWx0VmFsdWUsIGVuZDogZGVmYXVsdFZhbHVlfSxcbiAgICAgIGxlYXZlOiB7ZHVyaW5nOiBkZWZhdWx0VmFsdWUsIHN0YXJ0OiBkZWZhdWx0VmFsdWUsIGVuZDogZGVmYXVsdFZhbHVlfSxcbiAgICAgIGluKGJlZm9yZSA9ICgpID0+IHtcbiAgICAgIH0sIGFmdGVyID0gKCkgPT4ge1xuICAgICAgfSkge1xuICAgICAgICB0cmFuc2l0aW9uKGVsLCBzZXRGdW5jdGlvbiwge1xuICAgICAgICAgIGR1cmluZzogdGhpcy5lbnRlci5kdXJpbmcsXG4gICAgICAgICAgc3RhcnQ6IHRoaXMuZW50ZXIuc3RhcnQsXG4gICAgICAgICAgZW5kOiB0aGlzLmVudGVyLmVuZCxcbiAgICAgICAgICBlbnRlcmluZzogdHJ1ZVxuICAgICAgICB9LCBiZWZvcmUsIGFmdGVyKTtcbiAgICAgIH0sXG4gICAgICBvdXQoYmVmb3JlID0gKCkgPT4ge1xuICAgICAgfSwgYWZ0ZXIgPSAoKSA9PiB7XG4gICAgICB9KSB7XG4gICAgICAgIHRyYW5zaXRpb24oZWwsIHNldEZ1bmN0aW9uLCB7XG4gICAgICAgICAgZHVyaW5nOiB0aGlzLmxlYXZlLmR1cmluZyxcbiAgICAgICAgICBzdGFydDogdGhpcy5sZWF2ZS5zdGFydCxcbiAgICAgICAgICBlbmQ6IHRoaXMubGVhdmUuZW5kLFxuICAgICAgICAgIGVudGVyaW5nOiBmYWxzZVxuICAgICAgICB9LCBiZWZvcmUsIGFmdGVyKTtcbiAgICAgIH1cbiAgICB9O1xufVxud2luZG93LkVsZW1lbnQucHJvdG90eXBlLl94X3RvZ2dsZUFuZENhc2NhZGVXaXRoVHJhbnNpdGlvbnMgPSBmdW5jdGlvbihlbCwgdmFsdWUsIHNob3csIGhpZGUpIHtcbiAgbGV0IGNsaWNrQXdheUNvbXBhdGlibGVTaG93ID0gKCkgPT4gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHNob3cpO1xuICBpZiAodmFsdWUpIHtcbiAgICBlbC5feF90cmFuc2l0aW9uID8gZWwuX3hfdHJhbnNpdGlvbi5pbihzaG93KSA6IGNsaWNrQXdheUNvbXBhdGlibGVTaG93KCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGVsLl94X2hpZGVQcm9taXNlID0gZWwuX3hfdHJhbnNpdGlvbiA/IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBlbC5feF90cmFuc2l0aW9uLm91dCgoKSA9PiB7XG4gICAgfSwgKCkgPT4gcmVzb2x2ZShoaWRlKSk7XG4gICAgZWwuX3hfdHJhbnNpdGlvbmluZy5iZWZvcmVDYW5jZWwoKCkgPT4gcmVqZWN0KHtpc0Zyb21DYW5jZWxsZWRUcmFuc2l0aW9uOiB0cnVlfSkpO1xuICB9KSA6IFByb21pc2UucmVzb2x2ZShoaWRlKTtcbiAgcXVldWVNaWNyb3Rhc2soKCkgPT4ge1xuICAgIGxldCBjbG9zZXN0ID0gY2xvc2VzdEhpZGUoZWwpO1xuICAgIGlmIChjbG9zZXN0KSB7XG4gICAgICBpZiAoIWNsb3Nlc3QuX3hfaGlkZUNoaWxkcmVuKVxuICAgICAgICBjbG9zZXN0Ll94X2hpZGVDaGlsZHJlbiA9IFtdO1xuICAgICAgY2xvc2VzdC5feF9oaWRlQ2hpbGRyZW4ucHVzaChlbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHF1ZXVlTWljcm90YXNrKCgpID0+IHtcbiAgICAgICAgbGV0IGhpZGVBZnRlckNoaWxkcmVuID0gKGVsMikgPT4ge1xuICAgICAgICAgIGxldCBjYXJyeSA9IFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgIGVsMi5feF9oaWRlUHJvbWlzZSxcbiAgICAgICAgICAgIC4uLihlbDIuX3hfaGlkZUNoaWxkcmVuIHx8IFtdKS5tYXAoaGlkZUFmdGVyQ2hpbGRyZW4pXG4gICAgICAgICAgXSkudGhlbigoW2ldKSA9PiBpKCkpO1xuICAgICAgICAgIGRlbGV0ZSBlbDIuX3hfaGlkZVByb21pc2U7XG4gICAgICAgICAgZGVsZXRlIGVsMi5feF9oaWRlQ2hpbGRyZW47XG4gICAgICAgICAgcmV0dXJuIGNhcnJ5O1xuICAgICAgICB9O1xuICAgICAgICBoaWRlQWZ0ZXJDaGlsZHJlbihlbCkuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgICBpZiAoIWUuaXNGcm9tQ2FuY2VsbGVkVHJhbnNpdGlvbilcbiAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9KTtcbn07XG5mdW5jdGlvbiBjbG9zZXN0SGlkZShlbCkge1xuICBsZXQgcGFyZW50ID0gZWwucGFyZW50Tm9kZTtcbiAgaWYgKCFwYXJlbnQpXG4gICAgcmV0dXJuO1xuICByZXR1cm4gcGFyZW50Ll94X2hpZGVQcm9taXNlID8gcGFyZW50IDogY2xvc2VzdEhpZGUocGFyZW50KTtcbn1cbmZ1bmN0aW9uIHRyYW5zaXRpb24oZWwsIHNldEZ1bmN0aW9uLCB7ZHVyaW5nLCBzdGFydDogc3RhcnQyLCBlbmQsIGVudGVyaW5nfSA9IHt9LCBiZWZvcmUgPSAoKSA9PiB7XG59LCBhZnRlciA9ICgpID0+IHtcbn0pIHtcbiAgaWYgKGVsLl94X3RyYW5zaXRpb25pbmcpXG4gICAgZWwuX3hfdHJhbnNpdGlvbmluZy5jYW5jZWwoKTtcbiAgaWYgKE9iamVjdC5rZXlzKGR1cmluZykubGVuZ3RoID09PSAwICYmIE9iamVjdC5rZXlzKHN0YXJ0MikubGVuZ3RoID09PSAwICYmIE9iamVjdC5rZXlzKGVuZCkubGVuZ3RoID09PSAwKSB7XG4gICAgYmVmb3JlKCk7XG4gICAgYWZ0ZXIoKTtcbiAgICByZXR1cm47XG4gIH1cbiAgbGV0IHVuZG9TdGFydCwgdW5kb0R1cmluZywgdW5kb0VuZDtcbiAgcGVyZm9ybVRyYW5zaXRpb24oZWwsIHtcbiAgICBzdGFydCgpIHtcbiAgICAgIHVuZG9TdGFydCA9IHNldEZ1bmN0aW9uKGVsLCBzdGFydDIpO1xuICAgIH0sXG4gICAgZHVyaW5nKCkge1xuICAgICAgdW5kb0R1cmluZyA9IHNldEZ1bmN0aW9uKGVsLCBkdXJpbmcpO1xuICAgIH0sXG4gICAgYmVmb3JlLFxuICAgIGVuZCgpIHtcbiAgICAgIHVuZG9TdGFydCgpO1xuICAgICAgdW5kb0VuZCA9IHNldEZ1bmN0aW9uKGVsLCBlbmQpO1xuICAgIH0sXG4gICAgYWZ0ZXIsXG4gICAgY2xlYW51cCgpIHtcbiAgICAgIHVuZG9EdXJpbmcoKTtcbiAgICAgIHVuZG9FbmQoKTtcbiAgICB9XG4gIH0sIGVudGVyaW5nKTtcbn1cbmZ1bmN0aW9uIHBlcmZvcm1UcmFuc2l0aW9uKGVsLCBzdGFnZXMsIGVudGVyaW5nKSB7XG4gIGxldCBpbnRlcnJ1cHRlZCwgcmVhY2hlZEJlZm9yZSwgcmVhY2hlZEVuZDtcbiAgbGV0IGZpbmlzaCA9IG9uY2UoKCkgPT4ge1xuICAgIG11dGF0ZURvbSgoKSA9PiB7XG4gICAgICBpbnRlcnJ1cHRlZCA9IHRydWU7XG4gICAgICBpZiAoIXJlYWNoZWRCZWZvcmUpXG4gICAgICAgIHN0YWdlcy5iZWZvcmUoKTtcbiAgICAgIGlmICghcmVhY2hlZEVuZCkge1xuICAgICAgICBzdGFnZXMuZW5kKCk7XG4gICAgICAgIHJlbGVhc2VOZXh0VGlja3MoKTtcbiAgICAgIH1cbiAgICAgIHN0YWdlcy5hZnRlcigpO1xuICAgICAgaWYgKGVsLmlzQ29ubmVjdGVkKVxuICAgICAgICBzdGFnZXMuY2xlYW51cCgpO1xuICAgICAgZGVsZXRlIGVsLl94X3RyYW5zaXRpb25pbmc7XG4gICAgfSk7XG4gIH0pO1xuICBlbC5feF90cmFuc2l0aW9uaW5nID0ge1xuICAgIGJlZm9yZUNhbmNlbHM6IFtdLFxuICAgIGJlZm9yZUNhbmNlbChjYWxsYmFjaykge1xuICAgICAgdGhpcy5iZWZvcmVDYW5jZWxzLnB1c2goY2FsbGJhY2spO1xuICAgIH0sXG4gICAgY2FuY2VsOiBvbmNlKGZ1bmN0aW9uKCkge1xuICAgICAgd2hpbGUgKHRoaXMuYmVmb3JlQ2FuY2Vscy5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5iZWZvcmVDYW5jZWxzLnNoaWZ0KCkoKTtcbiAgICAgIH1cbiAgICAgIDtcbiAgICAgIGZpbmlzaCgpO1xuICAgIH0pLFxuICAgIGZpbmlzaCxcbiAgICBlbnRlcmluZ1xuICB9O1xuICBtdXRhdGVEb20oKCkgPT4ge1xuICAgIHN0YWdlcy5zdGFydCgpO1xuICAgIHN0YWdlcy5kdXJpbmcoKTtcbiAgfSk7XG4gIGhvbGROZXh0VGlja3MoKTtcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICBpZiAoaW50ZXJydXB0ZWQpXG4gICAgICByZXR1cm47XG4gICAgbGV0IGR1cmF0aW9uID0gTnVtYmVyKGdldENvbXB1dGVkU3R5bGUoZWwpLnRyYW5zaXRpb25EdXJhdGlvbi5yZXBsYWNlKC8sLiovLCBcIlwiKS5yZXBsYWNlKFwic1wiLCBcIlwiKSkgKiAxZTM7XG4gICAgbGV0IGRlbGF5ID0gTnVtYmVyKGdldENvbXB1dGVkU3R5bGUoZWwpLnRyYW5zaXRpb25EZWxheS5yZXBsYWNlKC8sLiovLCBcIlwiKS5yZXBsYWNlKFwic1wiLCBcIlwiKSkgKiAxZTM7XG4gICAgaWYgKGR1cmF0aW9uID09PSAwKVxuICAgICAgZHVyYXRpb24gPSBOdW1iZXIoZ2V0Q29tcHV0ZWRTdHlsZShlbCkuYW5pbWF0aW9uRHVyYXRpb24ucmVwbGFjZShcInNcIiwgXCJcIikpICogMWUzO1xuICAgIG11dGF0ZURvbSgoKSA9PiB7XG4gICAgICBzdGFnZXMuYmVmb3JlKCk7XG4gICAgfSk7XG4gICAgcmVhY2hlZEJlZm9yZSA9IHRydWU7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIGlmIChpbnRlcnJ1cHRlZClcbiAgICAgICAgcmV0dXJuO1xuICAgICAgbXV0YXRlRG9tKCgpID0+IHtcbiAgICAgICAgc3RhZ2VzLmVuZCgpO1xuICAgICAgfSk7XG4gICAgICByZWxlYXNlTmV4dFRpY2tzKCk7XG4gICAgICBzZXRUaW1lb3V0KGVsLl94X3RyYW5zaXRpb25pbmcuZmluaXNoLCBkdXJhdGlvbiArIGRlbGF5KTtcbiAgICAgIHJlYWNoZWRFbmQgPSB0cnVlO1xuICAgIH0pO1xuICB9KTtcbn1cbmZ1bmN0aW9uIG1vZGlmaWVyVmFsdWUobW9kaWZpZXJzLCBrZXksIGZhbGxiYWNrKSB7XG4gIGlmIChtb2RpZmllcnMuaW5kZXhPZihrZXkpID09PSAtMSlcbiAgICByZXR1cm4gZmFsbGJhY2s7XG4gIGNvbnN0IHJhd1ZhbHVlID0gbW9kaWZpZXJzW21vZGlmaWVycy5pbmRleE9mKGtleSkgKyAxXTtcbiAgaWYgKCFyYXdWYWx1ZSlcbiAgICByZXR1cm4gZmFsbGJhY2s7XG4gIGlmIChrZXkgPT09IFwic2NhbGVcIikge1xuICAgIGlmIChpc05hTihyYXdWYWx1ZSkpXG4gICAgICByZXR1cm4gZmFsbGJhY2s7XG4gIH1cbiAgaWYgKGtleSA9PT0gXCJkdXJhdGlvblwiKSB7XG4gICAgbGV0IG1hdGNoID0gcmF3VmFsdWUubWF0Y2goLyhbMC05XSspbXMvKTtcbiAgICBpZiAobWF0Y2gpXG4gICAgICByZXR1cm4gbWF0Y2hbMV07XG4gIH1cbiAgaWYgKGtleSA9PT0gXCJvcmlnaW5cIikge1xuICAgIGlmIChbXCJ0b3BcIiwgXCJyaWdodFwiLCBcImxlZnRcIiwgXCJjZW50ZXJcIiwgXCJib3R0b21cIl0uaW5jbHVkZXMobW9kaWZpZXJzW21vZGlmaWVycy5pbmRleE9mKGtleSkgKyAyXSkpIHtcbiAgICAgIHJldHVybiBbcmF3VmFsdWUsIG1vZGlmaWVyc1ttb2RpZmllcnMuaW5kZXhPZihrZXkpICsgMl1dLmpvaW4oXCIgXCIpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmF3VmFsdWU7XG59XG5cbi8vIHBhY2thZ2VzL2FscGluZWpzL3NyYy9kaXJlY3RpdmVzL3gtaWdub3JlLmpzXG52YXIgaGFuZGxlciA9ICgpID0+IHtcbn07XG5oYW5kbGVyLmlubGluZSA9IChlbCwge21vZGlmaWVyc30sIHtjbGVhbnVwfSkgPT4ge1xuICBtb2RpZmllcnMuaW5jbHVkZXMoXCJzZWxmXCIpID8gZWwuX3hfaWdub3JlU2VsZiA9IHRydWUgOiBlbC5feF9pZ25vcmUgPSB0cnVlO1xuICBjbGVhbnVwKCgpID0+IHtcbiAgICBtb2RpZmllcnMuaW5jbHVkZXMoXCJzZWxmXCIpID8gZGVsZXRlIGVsLl94X2lnbm9yZVNlbGYgOiBkZWxldGUgZWwuX3hfaWdub3JlO1xuICB9KTtcbn07XG5kaXJlY3RpdmUoXCJpZ25vcmVcIiwgaGFuZGxlcik7XG5cbi8vIHBhY2thZ2VzL2FscGluZWpzL3NyYy9kaXJlY3RpdmVzL3gtZWZmZWN0LmpzXG5kaXJlY3RpdmUoXCJlZmZlY3RcIiwgKGVsLCB7ZXhwcmVzc2lvbn0sIHtlZmZlY3Q6IGVmZmVjdDN9KSA9PiBlZmZlY3QzKGV2YWx1YXRlTGF0ZXIoZWwsIGV4cHJlc3Npb24pKSk7XG5cbi8vIHBhY2thZ2VzL2FscGluZWpzL3NyYy91dGlscy9iaW5kLmpzXG5mdW5jdGlvbiBiaW5kKGVsLCBuYW1lLCB2YWx1ZSwgbW9kaWZpZXJzID0gW10pIHtcbiAgaWYgKCFlbC5feF9iaW5kaW5ncylcbiAgICBlbC5feF9iaW5kaW5ncyA9IHJlYWN0aXZlKHt9KTtcbiAgZWwuX3hfYmluZGluZ3NbbmFtZV0gPSB2YWx1ZTtcbiAgbmFtZSA9IG1vZGlmaWVycy5pbmNsdWRlcyhcImNhbWVsXCIpID8gY2FtZWxDYXNlKG5hbWUpIDogbmFtZTtcbiAgc3dpdGNoIChuYW1lKSB7XG4gICAgY2FzZSBcInZhbHVlXCI6XG4gICAgICBiaW5kSW5wdXRWYWx1ZShlbCwgdmFsdWUpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcInN0eWxlXCI6XG4gICAgICBiaW5kU3R5bGVzKGVsLCB2YWx1ZSk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiY2xhc3NcIjpcbiAgICAgIGJpbmRDbGFzc2VzKGVsLCB2YWx1ZSk7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgYmluZEF0dHJpYnV0ZShlbCwgbmFtZSwgdmFsdWUpO1xuICAgICAgYnJlYWs7XG4gIH1cbn1cbmZ1bmN0aW9uIGJpbmRJbnB1dFZhbHVlKGVsLCB2YWx1ZSkge1xuICBpZiAoZWwudHlwZSA9PT0gXCJyYWRpb1wiKSB7XG4gICAgaWYgKGVsLmF0dHJpYnV0ZXMudmFsdWUgPT09IHZvaWQgMCkge1xuICAgICAgZWwudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gICAgaWYgKHdpbmRvdy5mcm9tTW9kZWwpIHtcbiAgICAgIGVsLmNoZWNrZWQgPSBjaGVja2VkQXR0ckxvb3NlQ29tcGFyZShlbC52YWx1ZSwgdmFsdWUpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChlbC50eXBlID09PSBcImNoZWNrYm94XCIpIHtcbiAgICBpZiAoTnVtYmVyLmlzSW50ZWdlcih2YWx1ZSkpIHtcbiAgICAgIGVsLnZhbHVlID0gdmFsdWU7XG4gICAgfSBlbHNlIGlmICghTnVtYmVyLmlzSW50ZWdlcih2YWx1ZSkgJiYgIUFycmF5LmlzQXJyYXkodmFsdWUpICYmIHR5cGVvZiB2YWx1ZSAhPT0gXCJib29sZWFuXCIgJiYgIVtudWxsLCB2b2lkIDBdLmluY2x1ZGVzKHZhbHVlKSkge1xuICAgICAgZWwudmFsdWUgPSBTdHJpbmcodmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgZWwuY2hlY2tlZCA9IHZhbHVlLnNvbWUoKHZhbCkgPT4gY2hlY2tlZEF0dHJMb29zZUNvbXBhcmUodmFsLCBlbC52YWx1ZSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWwuY2hlY2tlZCA9ICEhdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2UgaWYgKGVsLnRhZ05hbWUgPT09IFwiU0VMRUNUXCIpIHtcbiAgICB1cGRhdGVTZWxlY3QoZWwsIHZhbHVlKTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoZWwudmFsdWUgPT09IHZhbHVlKVxuICAgICAgcmV0dXJuO1xuICAgIGVsLnZhbHVlID0gdmFsdWU7XG4gIH1cbn1cbmZ1bmN0aW9uIGJpbmRDbGFzc2VzKGVsLCB2YWx1ZSkge1xuICBpZiAoZWwuX3hfdW5kb0FkZGVkQ2xhc3NlcylcbiAgICBlbC5feF91bmRvQWRkZWRDbGFzc2VzKCk7XG4gIGVsLl94X3VuZG9BZGRlZENsYXNzZXMgPSBzZXRDbGFzc2VzKGVsLCB2YWx1ZSk7XG59XG5mdW5jdGlvbiBiaW5kU3R5bGVzKGVsLCB2YWx1ZSkge1xuICBpZiAoZWwuX3hfdW5kb0FkZGVkU3R5bGVzKVxuICAgIGVsLl94X3VuZG9BZGRlZFN0eWxlcygpO1xuICBlbC5feF91bmRvQWRkZWRTdHlsZXMgPSBzZXRTdHlsZXMoZWwsIHZhbHVlKTtcbn1cbmZ1bmN0aW9uIGJpbmRBdHRyaWJ1dGUoZWwsIG5hbWUsIHZhbHVlKSB7XG4gIGlmIChbbnVsbCwgdm9pZCAwLCBmYWxzZV0uaW5jbHVkZXModmFsdWUpICYmIGF0dHJpYnV0ZVNob3VsZG50QmVQcmVzZXJ2ZWRJZkZhbHN5KG5hbWUpKSB7XG4gICAgZWwucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuICB9IGVsc2Uge1xuICAgIGlmIChpc0Jvb2xlYW5BdHRyKG5hbWUpKVxuICAgICAgdmFsdWUgPSBuYW1lO1xuICAgIHNldElmQ2hhbmdlZChlbCwgbmFtZSwgdmFsdWUpO1xuICB9XG59XG5mdW5jdGlvbiBzZXRJZkNoYW5nZWQoZWwsIGF0dHJOYW1lLCB2YWx1ZSkge1xuICBpZiAoZWwuZ2V0QXR0cmlidXRlKGF0dHJOYW1lKSAhPSB2YWx1ZSkge1xuICAgIGVsLnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgdmFsdWUpO1xuICB9XG59XG5mdW5jdGlvbiB1cGRhdGVTZWxlY3QoZWwsIHZhbHVlKSB7XG4gIGNvbnN0IGFycmF5V3JhcHBlZFZhbHVlID0gW10uY29uY2F0KHZhbHVlKS5tYXAoKHZhbHVlMikgPT4ge1xuICAgIHJldHVybiB2YWx1ZTIgKyBcIlwiO1xuICB9KTtcbiAgQXJyYXkuZnJvbShlbC5vcHRpb25zKS5mb3JFYWNoKChvcHRpb24pID0+IHtcbiAgICBvcHRpb24uc2VsZWN0ZWQgPSBhcnJheVdyYXBwZWRWYWx1ZS5pbmNsdWRlcyhvcHRpb24udmFsdWUpO1xuICB9KTtcbn1cbmZ1bmN0aW9uIGNhbWVsQ2FzZShzdWJqZWN0KSB7XG4gIHJldHVybiBzdWJqZWN0LnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvLShcXHcpL2csIChtYXRjaCwgY2hhcikgPT4gY2hhci50b1VwcGVyQ2FzZSgpKTtcbn1cbmZ1bmN0aW9uIGNoZWNrZWRBdHRyTG9vc2VDb21wYXJlKHZhbHVlQSwgdmFsdWVCKSB7XG4gIHJldHVybiB2YWx1ZUEgPT0gdmFsdWVCO1xufVxuZnVuY3Rpb24gaXNCb29sZWFuQXR0cihhdHRyTmFtZSkge1xuICBjb25zdCBib29sZWFuQXR0cmlidXRlcyA9IFtcbiAgICBcImRpc2FibGVkXCIsXG4gICAgXCJjaGVja2VkXCIsXG4gICAgXCJyZXF1aXJlZFwiLFxuICAgIFwicmVhZG9ubHlcIixcbiAgICBcImhpZGRlblwiLFxuICAgIFwib3BlblwiLFxuICAgIFwic2VsZWN0ZWRcIixcbiAgICBcImF1dG9mb2N1c1wiLFxuICAgIFwiaXRlbXNjb3BlXCIsXG4gICAgXCJtdWx0aXBsZVwiLFxuICAgIFwibm92YWxpZGF0ZVwiLFxuICAgIFwiYWxsb3dmdWxsc2NyZWVuXCIsXG4gICAgXCJhbGxvd3BheW1lbnRyZXF1ZXN0XCIsXG4gICAgXCJmb3Jtbm92YWxpZGF0ZVwiLFxuICAgIFwiYXV0b3BsYXlcIixcbiAgICBcImNvbnRyb2xzXCIsXG4gICAgXCJsb29wXCIsXG4gICAgXCJtdXRlZFwiLFxuICAgIFwicGxheXNpbmxpbmVcIixcbiAgICBcImRlZmF1bHRcIixcbiAgICBcImlzbWFwXCIsXG4gICAgXCJyZXZlcnNlZFwiLFxuICAgIFwiYXN5bmNcIixcbiAgICBcImRlZmVyXCIsXG4gICAgXCJub21vZHVsZVwiXG4gIF07XG4gIHJldHVybiBib29sZWFuQXR0cmlidXRlcy5pbmNsdWRlcyhhdHRyTmFtZSk7XG59XG5mdW5jdGlvbiBhdHRyaWJ1dGVTaG91bGRudEJlUHJlc2VydmVkSWZGYWxzeShuYW1lKSB7XG4gIHJldHVybiAhW1wiYXJpYS1wcmVzc2VkXCIsIFwiYXJpYS1jaGVja2VkXCJdLmluY2x1ZGVzKG5hbWUpO1xufVxuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvdXRpbHMvb24uanNcbmZ1bmN0aW9uIG9uKGVsLCBldmVudCwgbW9kaWZpZXJzLCBjYWxsYmFjaykge1xuICBsZXQgbGlzdGVuZXJUYXJnZXQgPSBlbDtcbiAgbGV0IGhhbmRsZXIzID0gKGUpID0+IGNhbGxiYWNrKGUpO1xuICBsZXQgb3B0aW9ucyA9IHt9O1xuICBsZXQgd3JhcEhhbmRsZXIgPSAoY2FsbGJhY2syLCB3cmFwcGVyKSA9PiAoZSkgPT4gd3JhcHBlcihjYWxsYmFjazIsIGUpO1xuICBpZiAobW9kaWZpZXJzLmluY2x1ZGVzKFwiY2FtZWxcIikpXG4gICAgZXZlbnQgPSBjYW1lbENhc2UyKGV2ZW50KTtcbiAgaWYgKG1vZGlmaWVycy5pbmNsdWRlcyhcInBhc3NpdmVcIikpXG4gICAgb3B0aW9ucy5wYXNzaXZlID0gdHJ1ZTtcbiAgaWYgKG1vZGlmaWVycy5pbmNsdWRlcyhcIndpbmRvd1wiKSlcbiAgICBsaXN0ZW5lclRhcmdldCA9IHdpbmRvdztcbiAgaWYgKG1vZGlmaWVycy5pbmNsdWRlcyhcImRvY3VtZW50XCIpKVxuICAgIGxpc3RlbmVyVGFyZ2V0ID0gZG9jdW1lbnQ7XG4gIGlmIChtb2RpZmllcnMuaW5jbHVkZXMoXCJwcmV2ZW50XCIpKVxuICAgIGhhbmRsZXIzID0gd3JhcEhhbmRsZXIoaGFuZGxlcjMsIChuZXh0LCBlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBuZXh0KGUpO1xuICAgIH0pO1xuICBpZiAobW9kaWZpZXJzLmluY2x1ZGVzKFwic3RvcFwiKSlcbiAgICBoYW5kbGVyMyA9IHdyYXBIYW5kbGVyKGhhbmRsZXIzLCAobmV4dCwgZSkgPT4ge1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIG5leHQoZSk7XG4gICAgfSk7XG4gIGlmIChtb2RpZmllcnMuaW5jbHVkZXMoXCJzZWxmXCIpKVxuICAgIGhhbmRsZXIzID0gd3JhcEhhbmRsZXIoaGFuZGxlcjMsIChuZXh0LCBlKSA9PiB7XG4gICAgICBlLnRhcmdldCA9PT0gZWwgJiYgbmV4dChlKTtcbiAgICB9KTtcbiAgaWYgKG1vZGlmaWVycy5pbmNsdWRlcyhcImF3YXlcIikgfHwgbW9kaWZpZXJzLmluY2x1ZGVzKFwib3V0c2lkZVwiKSkge1xuICAgIGxpc3RlbmVyVGFyZ2V0ID0gZG9jdW1lbnQ7XG4gICAgaGFuZGxlcjMgPSB3cmFwSGFuZGxlcihoYW5kbGVyMywgKG5leHQsIGUpID0+IHtcbiAgICAgIGlmIChlbC5jb250YWlucyhlLnRhcmdldCkpXG4gICAgICAgIHJldHVybjtcbiAgICAgIGlmIChlbC5vZmZzZXRXaWR0aCA8IDEgJiYgZWwub2Zmc2V0SGVpZ2h0IDwgMSlcbiAgICAgICAgcmV0dXJuO1xuICAgICAgbmV4dChlKTtcbiAgICB9KTtcbiAgfVxuICBoYW5kbGVyMyA9IHdyYXBIYW5kbGVyKGhhbmRsZXIzLCAobmV4dCwgZSkgPT4ge1xuICAgIGlmIChpc0tleUV2ZW50KGV2ZW50KSkge1xuICAgICAgaWYgKGlzTGlzdGVuaW5nRm9yQVNwZWNpZmljS2V5VGhhdEhhc250QmVlblByZXNzZWQoZSwgbW9kaWZpZXJzKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICAgIG5leHQoZSk7XG4gIH0pO1xuICBpZiAobW9kaWZpZXJzLmluY2x1ZGVzKFwiZGVib3VuY2VcIikpIHtcbiAgICBsZXQgbmV4dE1vZGlmaWVyID0gbW9kaWZpZXJzW21vZGlmaWVycy5pbmRleE9mKFwiZGVib3VuY2VcIikgKyAxXSB8fCBcImludmFsaWQtd2FpdFwiO1xuICAgIGxldCB3YWl0ID0gaXNOdW1lcmljKG5leHRNb2RpZmllci5zcGxpdChcIm1zXCIpWzBdKSA/IE51bWJlcihuZXh0TW9kaWZpZXIuc3BsaXQoXCJtc1wiKVswXSkgOiAyNTA7XG4gICAgaGFuZGxlcjMgPSBkZWJvdW5jZShoYW5kbGVyMywgd2FpdCwgdGhpcyk7XG4gIH1cbiAgaWYgKG1vZGlmaWVycy5pbmNsdWRlcyhcInRocm90dGxlXCIpKSB7XG4gICAgbGV0IG5leHRNb2RpZmllciA9IG1vZGlmaWVyc1ttb2RpZmllcnMuaW5kZXhPZihcInRocm90dGxlXCIpICsgMV0gfHwgXCJpbnZhbGlkLXdhaXRcIjtcbiAgICBsZXQgd2FpdCA9IGlzTnVtZXJpYyhuZXh0TW9kaWZpZXIuc3BsaXQoXCJtc1wiKVswXSkgPyBOdW1iZXIobmV4dE1vZGlmaWVyLnNwbGl0KFwibXNcIilbMF0pIDogMjUwO1xuICAgIGhhbmRsZXIzID0gdGhyb3R0bGUoaGFuZGxlcjMsIHdhaXQsIHRoaXMpO1xuICB9XG4gIGlmIChtb2RpZmllcnMuaW5jbHVkZXMoXCJvbmNlXCIpKSB7XG4gICAgaGFuZGxlcjMgPSB3cmFwSGFuZGxlcihoYW5kbGVyMywgKG5leHQsIGUpID0+IHtcbiAgICAgIG5leHQoZSk7XG4gICAgICBsaXN0ZW5lclRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyMywgb3B0aW9ucyk7XG4gICAgfSk7XG4gIH1cbiAgbGlzdGVuZXJUYXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlcjMsIG9wdGlvbnMpO1xuICByZXR1cm4gKCkgPT4ge1xuICAgIGxpc3RlbmVyVGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIzLCBvcHRpb25zKTtcbiAgfTtcbn1cbmZ1bmN0aW9uIGNhbWVsQ2FzZTIoc3ViamVjdCkge1xuICByZXR1cm4gc3ViamVjdC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoLy0oXFx3KS9nLCAobWF0Y2gsIGNoYXIpID0+IGNoYXIudG9VcHBlckNhc2UoKSk7XG59XG5mdW5jdGlvbiBkZWJvdW5jZShmdW5jLCB3YWl0KSB7XG4gIHZhciB0aW1lb3V0O1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNvbnRleHQgPSB0aGlzLCBhcmdzID0gYXJndW1lbnRzO1xuICAgIHZhciBsYXRlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgIH07XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcbiAgfTtcbn1cbmZ1bmN0aW9uIHRocm90dGxlKGZ1bmMsIGxpbWl0KSB7XG4gIGxldCBpblRocm90dGxlO1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgbGV0IGNvbnRleHQgPSB0aGlzLCBhcmdzID0gYXJndW1lbnRzO1xuICAgIGlmICghaW5UaHJvdHRsZSkge1xuICAgICAgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgIGluVGhyb3R0bGUgPSB0cnVlO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiBpblRocm90dGxlID0gZmFsc2UsIGxpbWl0KTtcbiAgICB9XG4gIH07XG59XG5mdW5jdGlvbiBpc051bWVyaWMoc3ViamVjdCkge1xuICByZXR1cm4gIUFycmF5LmlzQXJyYXkoc3ViamVjdCkgJiYgIWlzTmFOKHN1YmplY3QpO1xufVxuZnVuY3Rpb24ga2ViYWJDYXNlKHN1YmplY3QpIHtcbiAgcmV0dXJuIHN1YmplY3QucmVwbGFjZSgvKFthLXpdKShbQS1aXSkvZywgXCIkMS0kMlwiKS5yZXBsYWNlKC9bX1xcc10vLCBcIi1cIikudG9Mb3dlckNhc2UoKTtcbn1cbmZ1bmN0aW9uIGlzS2V5RXZlbnQoZXZlbnQpIHtcbiAgcmV0dXJuIFtcImtleWRvd25cIiwgXCJrZXl1cFwiXS5pbmNsdWRlcyhldmVudCk7XG59XG5mdW5jdGlvbiBpc0xpc3RlbmluZ0ZvckFTcGVjaWZpY0tleVRoYXRIYXNudEJlZW5QcmVzc2VkKGUsIG1vZGlmaWVycykge1xuICBsZXQga2V5TW9kaWZpZXJzID0gbW9kaWZpZXJzLmZpbHRlcigoaSkgPT4ge1xuICAgIHJldHVybiAhW1wid2luZG93XCIsIFwiZG9jdW1lbnRcIiwgXCJwcmV2ZW50XCIsIFwic3RvcFwiLCBcIm9uY2VcIl0uaW5jbHVkZXMoaSk7XG4gIH0pO1xuICBpZiAoa2V5TW9kaWZpZXJzLmluY2x1ZGVzKFwiZGVib3VuY2VcIikpIHtcbiAgICBsZXQgZGVib3VuY2VJbmRleCA9IGtleU1vZGlmaWVycy5pbmRleE9mKFwiZGVib3VuY2VcIik7XG4gICAga2V5TW9kaWZpZXJzLnNwbGljZShkZWJvdW5jZUluZGV4LCBpc051bWVyaWMoKGtleU1vZGlmaWVyc1tkZWJvdW5jZUluZGV4ICsgMV0gfHwgXCJpbnZhbGlkLXdhaXRcIikuc3BsaXQoXCJtc1wiKVswXSkgPyAyIDogMSk7XG4gIH1cbiAgaWYgKGtleU1vZGlmaWVycy5sZW5ndGggPT09IDApXG4gICAgcmV0dXJuIGZhbHNlO1xuICBpZiAoa2V5TW9kaWZpZXJzLmxlbmd0aCA9PT0gMSAmJiBrZXlNb2RpZmllcnNbMF0gPT09IGtleVRvTW9kaWZpZXIoZS5rZXkpKVxuICAgIHJldHVybiBmYWxzZTtcbiAgY29uc3Qgc3lzdGVtS2V5TW9kaWZpZXJzID0gW1wiY3RybFwiLCBcInNoaWZ0XCIsIFwiYWx0XCIsIFwibWV0YVwiLCBcImNtZFwiLCBcInN1cGVyXCJdO1xuICBjb25zdCBzZWxlY3RlZFN5c3RlbUtleU1vZGlmaWVycyA9IHN5c3RlbUtleU1vZGlmaWVycy5maWx0ZXIoKG1vZGlmaWVyKSA9PiBrZXlNb2RpZmllcnMuaW5jbHVkZXMobW9kaWZpZXIpKTtcbiAga2V5TW9kaWZpZXJzID0ga2V5TW9kaWZpZXJzLmZpbHRlcigoaSkgPT4gIXNlbGVjdGVkU3lzdGVtS2V5TW9kaWZpZXJzLmluY2x1ZGVzKGkpKTtcbiAgaWYgKHNlbGVjdGVkU3lzdGVtS2V5TW9kaWZpZXJzLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCBhY3RpdmVseVByZXNzZWRLZXlNb2RpZmllcnMgPSBzZWxlY3RlZFN5c3RlbUtleU1vZGlmaWVycy5maWx0ZXIoKG1vZGlmaWVyKSA9PiB7XG4gICAgICBpZiAobW9kaWZpZXIgPT09IFwiY21kXCIgfHwgbW9kaWZpZXIgPT09IFwic3VwZXJcIilcbiAgICAgICAgbW9kaWZpZXIgPSBcIm1ldGFcIjtcbiAgICAgIHJldHVybiBlW2Ake21vZGlmaWVyfUtleWBdO1xuICAgIH0pO1xuICAgIGlmIChhY3RpdmVseVByZXNzZWRLZXlNb2RpZmllcnMubGVuZ3RoID09PSBzZWxlY3RlZFN5c3RlbUtleU1vZGlmaWVycy5sZW5ndGgpIHtcbiAgICAgIGlmIChrZXlNb2RpZmllcnNbMF0gPT09IGtleVRvTW9kaWZpZXIoZS5rZXkpKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufVxuZnVuY3Rpb24ga2V5VG9Nb2RpZmllcihrZXkpIHtcbiAgc3dpdGNoIChrZXkpIHtcbiAgICBjYXNlIFwiL1wiOlxuICAgICAgcmV0dXJuIFwic2xhc2hcIjtcbiAgICBjYXNlIFwiIFwiOlxuICAgIGNhc2UgXCJTcGFjZWJhclwiOlxuICAgICAgcmV0dXJuIFwic3BhY2VcIjtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGtleSAmJiBrZWJhYkNhc2Uoa2V5KTtcbiAgfVxufVxuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvZGlyZWN0aXZlcy94LW1vZGVsLmpzXG5kaXJlY3RpdmUoXCJtb2RlbFwiLCAoZWwsIHttb2RpZmllcnMsIGV4cHJlc3Npb259LCB7ZWZmZWN0OiBlZmZlY3QzLCBjbGVhbnVwfSkgPT4ge1xuICBsZXQgZXZhbHVhdGUyID0gZXZhbHVhdGVMYXRlcihlbCwgZXhwcmVzc2lvbik7XG4gIGxldCBhc3NpZ25tZW50RXhwcmVzc2lvbiA9IGAke2V4cHJlc3Npb259ID0gcmlnaHRTaWRlT2ZFeHByZXNzaW9uKCRldmVudCwgJHtleHByZXNzaW9ufSlgO1xuICBsZXQgZXZhbHVhdGVBc3NpZ25tZW50ID0gZXZhbHVhdGVMYXRlcihlbCwgYXNzaWdubWVudEV4cHJlc3Npb24pO1xuICB2YXIgZXZlbnQgPSBlbC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09IFwic2VsZWN0XCIgfHwgW1wiY2hlY2tib3hcIiwgXCJyYWRpb1wiXS5pbmNsdWRlcyhlbC50eXBlKSB8fCBtb2RpZmllcnMuaW5jbHVkZXMoXCJsYXp5XCIpID8gXCJjaGFuZ2VcIiA6IFwiaW5wdXRcIjtcbiAgbGV0IGFzc2lnbWVudEZ1bmN0aW9uID0gZ2VuZXJhdGVBc3NpZ25tZW50RnVuY3Rpb24oZWwsIG1vZGlmaWVycywgZXhwcmVzc2lvbik7XG4gIGxldCByZW1vdmVMaXN0ZW5lciA9IG9uKGVsLCBldmVudCwgbW9kaWZpZXJzLCAoZSkgPT4ge1xuICAgIGV2YWx1YXRlQXNzaWdubWVudCgoKSA9PiB7XG4gICAgfSwge3Njb3BlOiB7XG4gICAgICAkZXZlbnQ6IGUsXG4gICAgICByaWdodFNpZGVPZkV4cHJlc3Npb246IGFzc2lnbWVudEZ1bmN0aW9uXG4gICAgfX0pO1xuICB9KTtcbiAgY2xlYW51cCgoKSA9PiByZW1vdmVMaXN0ZW5lcigpKTtcbiAgZWwuX3hfZm9yY2VNb2RlbFVwZGF0ZSA9ICgpID0+IHtcbiAgICBldmFsdWF0ZTIoKHZhbHVlKSA9PiB7XG4gICAgICBpZiAodmFsdWUgPT09IHZvaWQgMCAmJiBleHByZXNzaW9uLm1hdGNoKC9cXC4vKSlcbiAgICAgICAgdmFsdWUgPSBcIlwiO1xuICAgICAgd2luZG93LmZyb21Nb2RlbCA9IHRydWU7XG4gICAgICBtdXRhdGVEb20oKCkgPT4gYmluZChlbCwgXCJ2YWx1ZVwiLCB2YWx1ZSkpO1xuICAgICAgZGVsZXRlIHdpbmRvdy5mcm9tTW9kZWw7XG4gICAgfSk7XG4gIH07XG4gIGVmZmVjdDMoKCkgPT4ge1xuICAgIGlmIChtb2RpZmllcnMuaW5jbHVkZXMoXCJ1bmludHJ1c2l2ZVwiKSAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50LmlzU2FtZU5vZGUoZWwpKVxuICAgICAgcmV0dXJuO1xuICAgIGVsLl94X2ZvcmNlTW9kZWxVcGRhdGUoKTtcbiAgfSk7XG59KTtcbmZ1bmN0aW9uIGdlbmVyYXRlQXNzaWdubWVudEZ1bmN0aW9uKGVsLCBtb2RpZmllcnMsIGV4cHJlc3Npb24pIHtcbiAgaWYgKGVsLnR5cGUgPT09IFwicmFkaW9cIikge1xuICAgIG11dGF0ZURvbSgoKSA9PiB7XG4gICAgICBpZiAoIWVsLmhhc0F0dHJpYnV0ZShcIm5hbWVcIikpXG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZShcIm5hbWVcIiwgZXhwcmVzc2lvbik7XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIChldmVudCwgY3VycmVudFZhbHVlKSA9PiB7XG4gICAgcmV0dXJuIG11dGF0ZURvbSgoKSA9PiB7XG4gICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBDdXN0b21FdmVudCAmJiBldmVudC5kZXRhaWwgIT09IHZvaWQgMCkge1xuICAgICAgICByZXR1cm4gZXZlbnQuZGV0YWlsO1xuICAgICAgfSBlbHNlIGlmIChlbC50eXBlID09PSBcImNoZWNrYm94XCIpIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY3VycmVudFZhbHVlKSkge1xuICAgICAgICAgIGxldCBuZXdWYWx1ZSA9IG1vZGlmaWVycy5pbmNsdWRlcyhcIm51bWJlclwiKSA/IHNhZmVQYXJzZU51bWJlcihldmVudC50YXJnZXQudmFsdWUpIDogZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgICAgICAgIHJldHVybiBldmVudC50YXJnZXQuY2hlY2tlZCA/IGN1cnJlbnRWYWx1ZS5jb25jYXQoW25ld1ZhbHVlXSkgOiBjdXJyZW50VmFsdWUuZmlsdGVyKChlbDIpID0+ICFjaGVja2VkQXR0ckxvb3NlQ29tcGFyZTIoZWwyLCBuZXdWYWx1ZSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBldmVudC50YXJnZXQuY2hlY2tlZDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChlbC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09IFwic2VsZWN0XCIgJiYgZWwubXVsdGlwbGUpIHtcbiAgICAgICAgcmV0dXJuIG1vZGlmaWVycy5pbmNsdWRlcyhcIm51bWJlclwiKSA/IEFycmF5LmZyb20oZXZlbnQudGFyZ2V0LnNlbGVjdGVkT3B0aW9ucykubWFwKChvcHRpb24pID0+IHtcbiAgICAgICAgICBsZXQgcmF3VmFsdWUgPSBvcHRpb24udmFsdWUgfHwgb3B0aW9uLnRleHQ7XG4gICAgICAgICAgcmV0dXJuIHNhZmVQYXJzZU51bWJlcihyYXdWYWx1ZSk7XG4gICAgICAgIH0pIDogQXJyYXkuZnJvbShldmVudC50YXJnZXQuc2VsZWN0ZWRPcHRpb25zKS5tYXAoKG9wdGlvbikgPT4ge1xuICAgICAgICAgIHJldHVybiBvcHRpb24udmFsdWUgfHwgb3B0aW9uLnRleHQ7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHJhd1ZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgICAgICByZXR1cm4gbW9kaWZpZXJzLmluY2x1ZGVzKFwibnVtYmVyXCIpID8gc2FmZVBhcnNlTnVtYmVyKHJhd1ZhbHVlKSA6IG1vZGlmaWVycy5pbmNsdWRlcyhcInRyaW1cIikgPyByYXdWYWx1ZS50cmltKCkgOiByYXdWYWx1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcbn1cbmZ1bmN0aW9uIHNhZmVQYXJzZU51bWJlcihyYXdWYWx1ZSkge1xuICBsZXQgbnVtYmVyID0gcmF3VmFsdWUgPyBwYXJzZUZsb2F0KHJhd1ZhbHVlKSA6IG51bGw7XG4gIHJldHVybiBpc051bWVyaWMyKG51bWJlcikgPyBudW1iZXIgOiByYXdWYWx1ZTtcbn1cbmZ1bmN0aW9uIGNoZWNrZWRBdHRyTG9vc2VDb21wYXJlMih2YWx1ZUEsIHZhbHVlQikge1xuICByZXR1cm4gdmFsdWVBID09IHZhbHVlQjtcbn1cbmZ1bmN0aW9uIGlzTnVtZXJpYzIoc3ViamVjdCkge1xuICByZXR1cm4gIUFycmF5LmlzQXJyYXkoc3ViamVjdCkgJiYgIWlzTmFOKHN1YmplY3QpO1xufVxuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvZGlyZWN0aXZlcy94LWNsb2FrLmpzXG5kaXJlY3RpdmUoXCJjbG9ha1wiLCAoZWwpID0+IHF1ZXVlTWljcm90YXNrKCgpID0+IG11dGF0ZURvbSgoKSA9PiBlbC5yZW1vdmVBdHRyaWJ1dGUocHJlZml4KFwiY2xvYWtcIikpKSkpO1xuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvZGlyZWN0aXZlcy94LWluaXQuanNcbmFkZEluaXRTZWxlY3RvcigoKSA9PiBgWyR7cHJlZml4KFwiaW5pdFwiKX1dYCk7XG5kaXJlY3RpdmUoXCJpbml0XCIsIHNraXBEdXJpbmdDbG9uZSgoZWwsIHtleHByZXNzaW9ufSkgPT4gZXZhbHVhdGUoZWwsIGV4cHJlc3Npb24sIHt9LCBmYWxzZSkpKTtcblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL2RpcmVjdGl2ZXMveC10ZXh0LmpzXG5kaXJlY3RpdmUoXCJ0ZXh0XCIsIChlbCwge2V4cHJlc3Npb259LCB7ZWZmZWN0OiBlZmZlY3QzLCBldmFsdWF0ZUxhdGVyOiBldmFsdWF0ZUxhdGVyMn0pID0+IHtcbiAgbGV0IGV2YWx1YXRlMiA9IGV2YWx1YXRlTGF0ZXIyKGV4cHJlc3Npb24pO1xuICBlZmZlY3QzKCgpID0+IHtcbiAgICBldmFsdWF0ZTIoKHZhbHVlKSA9PiB7XG4gICAgICBtdXRhdGVEb20oKCkgPT4ge1xuICAgICAgICBlbC50ZXh0Q29udGVudCA9IHZhbHVlO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG5cbi8vIHBhY2thZ2VzL2FscGluZWpzL3NyYy9kaXJlY3RpdmVzL3gtaHRtbC5qc1xuZGlyZWN0aXZlKFwiaHRtbFwiLCAoZWwsIHtleHByZXNzaW9ufSwge2VmZmVjdDogZWZmZWN0MywgZXZhbHVhdGVMYXRlcjogZXZhbHVhdGVMYXRlcjJ9KSA9PiB7XG4gIGxldCBldmFsdWF0ZTIgPSBldmFsdWF0ZUxhdGVyMihleHByZXNzaW9uKTtcbiAgZWZmZWN0MygoKSA9PiB7XG4gICAgZXZhbHVhdGUyKCh2YWx1ZSkgPT4ge1xuICAgICAgZWwuaW5uZXJIVE1MID0gdmFsdWU7XG4gICAgfSk7XG4gIH0pO1xufSk7XG5cbi8vIHBhY2thZ2VzL2FscGluZWpzL3NyYy9kaXJlY3RpdmVzL3gtYmluZC5qc1xubWFwQXR0cmlidXRlcyhzdGFydGluZ1dpdGgoXCI6XCIsIGludG8ocHJlZml4KFwiYmluZDpcIikpKSk7XG5kaXJlY3RpdmUoXCJiaW5kXCIsIChlbCwge3ZhbHVlLCBtb2RpZmllcnMsIGV4cHJlc3Npb24sIG9yaWdpbmFsfSwge2VmZmVjdDogZWZmZWN0M30pID0+IHtcbiAgaWYgKCF2YWx1ZSlcbiAgICByZXR1cm4gYXBwbHlCaW5kaW5nc09iamVjdChlbCwgZXhwcmVzc2lvbiwgb3JpZ2luYWwsIGVmZmVjdDMpO1xuICBpZiAodmFsdWUgPT09IFwia2V5XCIpXG4gICAgcmV0dXJuIHN0b3JlS2V5Rm9yWEZvcihlbCwgZXhwcmVzc2lvbik7XG4gIGxldCBldmFsdWF0ZTIgPSBldmFsdWF0ZUxhdGVyKGVsLCBleHByZXNzaW9uKTtcbiAgZWZmZWN0MygoKSA9PiBldmFsdWF0ZTIoKHJlc3VsdCkgPT4ge1xuICAgIGlmIChyZXN1bHQgPT09IHZvaWQgMCAmJiBleHByZXNzaW9uLm1hdGNoKC9cXC4vKSlcbiAgICAgIHJlc3VsdCA9IFwiXCI7XG4gICAgbXV0YXRlRG9tKCgpID0+IGJpbmQoZWwsIHZhbHVlLCByZXN1bHQsIG1vZGlmaWVycykpO1xuICB9KSk7XG59KTtcbmZ1bmN0aW9uIGFwcGx5QmluZGluZ3NPYmplY3QoZWwsIGV4cHJlc3Npb24sIG9yaWdpbmFsLCBlZmZlY3QzKSB7XG4gIGxldCBnZXRCaW5kaW5ncyA9IGV2YWx1YXRlTGF0ZXIoZWwsIGV4cHJlc3Npb24pO1xuICBsZXQgY2xlYW51cFJ1bm5lcnMgPSBbXTtcbiAgZWZmZWN0MygoKSA9PiB7XG4gICAgd2hpbGUgKGNsZWFudXBSdW5uZXJzLmxlbmd0aClcbiAgICAgIGNsZWFudXBSdW5uZXJzLnBvcCgpKCk7XG4gICAgZ2V0QmluZGluZ3MoKGJpbmRpbmdzKSA9PiB7XG4gICAgICBsZXQgYXR0cmlidXRlcyA9IE9iamVjdC5lbnRyaWVzKGJpbmRpbmdzKS5tYXAoKFtuYW1lLCB2YWx1ZV0pID0+ICh7bmFtZSwgdmFsdWV9KSk7XG4gICAgICBkaXJlY3RpdmVzKGVsLCBhdHRyaWJ1dGVzLCBvcmlnaW5hbCkubWFwKChoYW5kbGUpID0+IHtcbiAgICAgICAgY2xlYW51cFJ1bm5lcnMucHVzaChoYW5kbGUucnVuQ2xlYW51cHMpO1xuICAgICAgICBoYW5kbGUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cbmZ1bmN0aW9uIHN0b3JlS2V5Rm9yWEZvcihlbCwgZXhwcmVzc2lvbikge1xuICBlbC5feF9rZXlFeHByZXNzaW9uID0gZXhwcmVzc2lvbjtcbn1cblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL2RpcmVjdGl2ZXMveC1kYXRhLmpzXG5hZGRSb290U2VsZWN0b3IoKCkgPT4gYFske3ByZWZpeChcImRhdGFcIil9XWApO1xuZGlyZWN0aXZlKFwiZGF0YVwiLCBza2lwRHVyaW5nQ2xvbmUoKGVsLCB7ZXhwcmVzc2lvbn0sIHtjbGVhbnVwfSkgPT4ge1xuICBleHByZXNzaW9uID0gZXhwcmVzc2lvbiA9PT0gXCJcIiA/IFwie31cIiA6IGV4cHJlc3Npb247XG4gIGxldCBtYWdpY0NvbnRleHQgPSB7fTtcbiAgaW5qZWN0TWFnaWNzKG1hZ2ljQ29udGV4dCwgZWwpO1xuICBsZXQgZGF0YVByb3ZpZGVyQ29udGV4dCA9IHt9O1xuICBpbmplY3REYXRhUHJvdmlkZXJzKGRhdGFQcm92aWRlckNvbnRleHQsIG1hZ2ljQ29udGV4dCk7XG4gIGxldCBkYXRhMiA9IGV2YWx1YXRlKGVsLCBleHByZXNzaW9uLCB7c2NvcGU6IGRhdGFQcm92aWRlckNvbnRleHR9KTtcbiAgaW5qZWN0TWFnaWNzKGRhdGEyLCBlbCk7XG4gIGxldCByZWFjdGl2ZURhdGEgPSByZWFjdGl2ZShkYXRhMik7XG4gIGluaXRJbnRlcmNlcHRvcnMocmVhY3RpdmVEYXRhKTtcbiAgbGV0IHVuZG8gPSBhZGRTY29wZVRvTm9kZShlbCwgcmVhY3RpdmVEYXRhKTtcbiAgaWYgKHJlYWN0aXZlRGF0YVtcImluaXRcIl0pXG4gICAgcmVhY3RpdmVEYXRhW1wiaW5pdFwiXSgpO1xuICBjbGVhbnVwKCgpID0+IHtcbiAgICB1bmRvKCk7XG4gICAgcmVhY3RpdmVEYXRhW1wiZGVzdHJveVwiXSAmJiByZWFjdGl2ZURhdGFbXCJkZXN0cm95XCJdKCk7XG4gIH0pO1xufSkpO1xuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvZGlyZWN0aXZlcy94LXNob3cuanNcbmRpcmVjdGl2ZShcInNob3dcIiwgKGVsLCB7bW9kaWZpZXJzLCBleHByZXNzaW9ufSwge2VmZmVjdDogZWZmZWN0M30pID0+IHtcbiAgbGV0IGV2YWx1YXRlMiA9IGV2YWx1YXRlTGF0ZXIoZWwsIGV4cHJlc3Npb24pO1xuICBsZXQgaGlkZSA9ICgpID0+IG11dGF0ZURvbSgoKSA9PiB7XG4gICAgZWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIGVsLl94X2lzU2hvd24gPSBmYWxzZTtcbiAgfSk7XG4gIGxldCBzaG93ID0gKCkgPT4gbXV0YXRlRG9tKCgpID0+IHtcbiAgICBpZiAoZWwuc3R5bGUubGVuZ3RoID09PSAxICYmIGVsLnN0eWxlLmRpc3BsYXkgPT09IFwibm9uZVwiKSB7XG4gICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoXCJzdHlsZVwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWwuc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJkaXNwbGF5XCIpO1xuICAgIH1cbiAgICBlbC5feF9pc1Nob3duID0gdHJ1ZTtcbiAgfSk7XG4gIGxldCBjbGlja0F3YXlDb21wYXRpYmxlU2hvdyA9ICgpID0+IHNldFRpbWVvdXQoc2hvdyk7XG4gIGxldCB0b2dnbGUgPSBvbmNlKCh2YWx1ZSkgPT4gdmFsdWUgPyBzaG93KCkgOiBoaWRlKCksICh2YWx1ZSkgPT4ge1xuICAgIGlmICh0eXBlb2YgZWwuX3hfdG9nZ2xlQW5kQ2FzY2FkZVdpdGhUcmFuc2l0aW9ucyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBlbC5feF90b2dnbGVBbmRDYXNjYWRlV2l0aFRyYW5zaXRpb25zKGVsLCB2YWx1ZSwgc2hvdywgaGlkZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbHVlID8gY2xpY2tBd2F5Q29tcGF0aWJsZVNob3coKSA6IGhpZGUoKTtcbiAgICB9XG4gIH0pO1xuICBsZXQgb2xkVmFsdWU7XG4gIGxldCBmaXJzdFRpbWUgPSB0cnVlO1xuICBlZmZlY3QzKCgpID0+IGV2YWx1YXRlMigodmFsdWUpID0+IHtcbiAgICBpZiAoIWZpcnN0VGltZSAmJiB2YWx1ZSA9PT0gb2xkVmFsdWUpXG4gICAgICByZXR1cm47XG4gICAgaWYgKG1vZGlmaWVycy5pbmNsdWRlcyhcImltbWVkaWF0ZVwiKSlcbiAgICAgIHZhbHVlID8gY2xpY2tBd2F5Q29tcGF0aWJsZVNob3coKSA6IGhpZGUoKTtcbiAgICB0b2dnbGUodmFsdWUpO1xuICAgIG9sZFZhbHVlID0gdmFsdWU7XG4gICAgZmlyc3RUaW1lID0gZmFsc2U7XG4gIH0pKTtcbn0pO1xuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvZGlyZWN0aXZlcy94LWZvci5qc1xuZGlyZWN0aXZlKFwiZm9yXCIsIChlbCwge2V4cHJlc3Npb259LCB7ZWZmZWN0OiBlZmZlY3QzLCBjbGVhbnVwfSkgPT4ge1xuICBsZXQgaXRlcmF0b3JOYW1lcyA9IHBhcnNlRm9yRXhwcmVzc2lvbihleHByZXNzaW9uKTtcbiAgbGV0IGV2YWx1YXRlSXRlbXMgPSBldmFsdWF0ZUxhdGVyKGVsLCBpdGVyYXRvck5hbWVzLml0ZW1zKTtcbiAgbGV0IGV2YWx1YXRlS2V5ID0gZXZhbHVhdGVMYXRlcihlbCwgZWwuX3hfa2V5RXhwcmVzc2lvbiB8fCBcImluZGV4XCIpO1xuICBlbC5feF9wcmV2S2V5cyA9IFtdO1xuICBlbC5feF9sb29rdXAgPSB7fTtcbiAgZWZmZWN0MygoKSA9PiBsb29wKGVsLCBpdGVyYXRvck5hbWVzLCBldmFsdWF0ZUl0ZW1zLCBldmFsdWF0ZUtleSkpO1xuICBjbGVhbnVwKCgpID0+IHtcbiAgICBPYmplY3QudmFsdWVzKGVsLl94X2xvb2t1cCkuZm9yRWFjaCgoZWwyKSA9PiBlbDIucmVtb3ZlKCkpO1xuICAgIGRlbGV0ZSBlbC5feF9wcmV2S2V5cztcbiAgICBkZWxldGUgZWwuX3hfbG9va3VwO1xuICB9KTtcbn0pO1xuZnVuY3Rpb24gbG9vcChlbCwgaXRlcmF0b3JOYW1lcywgZXZhbHVhdGVJdGVtcywgZXZhbHVhdGVLZXkpIHtcbiAgbGV0IGlzT2JqZWN0ID0gKGkpID0+IHR5cGVvZiBpID09PSBcIm9iamVjdFwiICYmICFBcnJheS5pc0FycmF5KGkpO1xuICBsZXQgdGVtcGxhdGVFbCA9IGVsO1xuICBldmFsdWF0ZUl0ZW1zKChpdGVtcykgPT4ge1xuICAgIGlmIChpc051bWVyaWMzKGl0ZW1zKSAmJiBpdGVtcyA+PSAwKSB7XG4gICAgICBpdGVtcyA9IEFycmF5LmZyb20oQXJyYXkoaXRlbXMpLmtleXMoKSwgKGkpID0+IGkgKyAxKTtcbiAgICB9XG4gICAgbGV0IGxvb2t1cCA9IGVsLl94X2xvb2t1cDtcbiAgICBsZXQgcHJldktleXMgPSBlbC5feF9wcmV2S2V5cztcbiAgICBsZXQgc2NvcGVzID0gW107XG4gICAgbGV0IGtleXMgPSBbXTtcbiAgICBpZiAoaXNPYmplY3QoaXRlbXMpKSB7XG4gICAgICBpdGVtcyA9IE9iamVjdC5lbnRyaWVzKGl0ZW1zKS5tYXAoKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgICBsZXQgc2NvcGUgPSBnZXRJdGVyYXRpb25TY29wZVZhcmlhYmxlcyhpdGVyYXRvck5hbWVzLCB2YWx1ZSwga2V5LCBpdGVtcyk7XG4gICAgICAgIGV2YWx1YXRlS2V5KCh2YWx1ZTIpID0+IGtleXMucHVzaCh2YWx1ZTIpLCB7c2NvcGU6IHtpbmRleDoga2V5LCAuLi5zY29wZX19KTtcbiAgICAgICAgc2NvcGVzLnB1c2goc2NvcGUpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IHNjb3BlID0gZ2V0SXRlcmF0aW9uU2NvcGVWYXJpYWJsZXMoaXRlcmF0b3JOYW1lcywgaXRlbXNbaV0sIGksIGl0ZW1zKTtcbiAgICAgICAgZXZhbHVhdGVLZXkoKHZhbHVlKSA9PiBrZXlzLnB1c2godmFsdWUpLCB7c2NvcGU6IHtpbmRleDogaSwgLi4uc2NvcGV9fSk7XG4gICAgICAgIHNjb3Blcy5wdXNoKHNjb3BlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGV0IGFkZHMgPSBbXTtcbiAgICBsZXQgbW92ZXMgPSBbXTtcbiAgICBsZXQgcmVtb3ZlcyA9IFtdO1xuICAgIGxldCBzYW1lcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJldktleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBrZXkgPSBwcmV2S2V5c1tpXTtcbiAgICAgIGlmIChrZXlzLmluZGV4T2Yoa2V5KSA9PT0gLTEpXG4gICAgICAgIHJlbW92ZXMucHVzaChrZXkpO1xuICAgIH1cbiAgICBwcmV2S2V5cyA9IHByZXZLZXlzLmZpbHRlcigoa2V5KSA9PiAhcmVtb3Zlcy5pbmNsdWRlcyhrZXkpKTtcbiAgICBsZXQgbGFzdEtleSA9IFwidGVtcGxhdGVcIjtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBrZXkgPSBrZXlzW2ldO1xuICAgICAgbGV0IHByZXZJbmRleCA9IHByZXZLZXlzLmluZGV4T2Yoa2V5KTtcbiAgICAgIGlmIChwcmV2SW5kZXggPT09IC0xKSB7XG4gICAgICAgIHByZXZLZXlzLnNwbGljZShpLCAwLCBrZXkpO1xuICAgICAgICBhZGRzLnB1c2goW2xhc3RLZXksIGldKTtcbiAgICAgIH0gZWxzZSBpZiAocHJldkluZGV4ICE9PSBpKSB7XG4gICAgICAgIGxldCBrZXlJblNwb3QgPSBwcmV2S2V5cy5zcGxpY2UoaSwgMSlbMF07XG4gICAgICAgIGxldCBrZXlGb3JTcG90ID0gcHJldktleXMuc3BsaWNlKHByZXZJbmRleCAtIDEsIDEpWzBdO1xuICAgICAgICBwcmV2S2V5cy5zcGxpY2UoaSwgMCwga2V5Rm9yU3BvdCk7XG4gICAgICAgIHByZXZLZXlzLnNwbGljZShwcmV2SW5kZXgsIDAsIGtleUluU3BvdCk7XG4gICAgICAgIG1vdmVzLnB1c2goW2tleUluU3BvdCwga2V5Rm9yU3BvdF0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2FtZXMucHVzaChrZXkpO1xuICAgICAgfVxuICAgICAgbGFzdEtleSA9IGtleTtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZW1vdmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQga2V5ID0gcmVtb3Zlc1tpXTtcbiAgICAgIGxvb2t1cFtrZXldLnJlbW92ZSgpO1xuICAgICAgbG9va3VwW2tleV0gPSBudWxsO1xuICAgICAgZGVsZXRlIGxvb2t1cFtrZXldO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1vdmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgW2tleUluU3BvdCwga2V5Rm9yU3BvdF0gPSBtb3Zlc1tpXTtcbiAgICAgIGxldCBlbEluU3BvdCA9IGxvb2t1cFtrZXlJblNwb3RdO1xuICAgICAgbGV0IGVsRm9yU3BvdCA9IGxvb2t1cFtrZXlGb3JTcG90XTtcbiAgICAgIGxldCBtYXJrZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgbXV0YXRlRG9tKCgpID0+IHtcbiAgICAgICAgZWxGb3JTcG90LmFmdGVyKG1hcmtlcik7XG4gICAgICAgIGVsSW5TcG90LmFmdGVyKGVsRm9yU3BvdCk7XG4gICAgICAgIG1hcmtlci5iZWZvcmUoZWxJblNwb3QpO1xuICAgICAgICBtYXJrZXIucmVtb3ZlKCk7XG4gICAgICB9KTtcbiAgICAgIHJlZnJlc2hTY29wZShlbEZvclNwb3QsIHNjb3Blc1trZXlzLmluZGV4T2Yoa2V5Rm9yU3BvdCldKTtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhZGRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgW2xhc3RLZXkyLCBpbmRleF0gPSBhZGRzW2ldO1xuICAgICAgbGV0IGxhc3RFbCA9IGxhc3RLZXkyID09PSBcInRlbXBsYXRlXCIgPyB0ZW1wbGF0ZUVsIDogbG9va3VwW2xhc3RLZXkyXTtcbiAgICAgIGxldCBzY29wZSA9IHNjb3Blc1tpbmRleF07XG4gICAgICBsZXQga2V5ID0ga2V5c1tpbmRleF07XG4gICAgICBsZXQgY2xvbmUyID0gZG9jdW1lbnQuaW1wb3J0Tm9kZSh0ZW1wbGF0ZUVsLmNvbnRlbnQsIHRydWUpLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgYWRkU2NvcGVUb05vZGUoY2xvbmUyLCByZWFjdGl2ZShzY29wZSksIHRlbXBsYXRlRWwpO1xuICAgICAgbXV0YXRlRG9tKCgpID0+IHtcbiAgICAgICAgbGFzdEVsLmFmdGVyKGNsb25lMik7XG4gICAgICAgIGluaXRUcmVlKGNsb25lMik7XG4gICAgICB9KTtcbiAgICAgIGlmICh0eXBlb2Yga2V5ID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIHdhcm4oXCJ4LWZvciBrZXkgY2Fubm90IGJlIGFuIG9iamVjdCwgaXQgbXVzdCBiZSBhIHN0cmluZyBvciBhbiBpbnRlZ2VyXCIsIHRlbXBsYXRlRWwpO1xuICAgICAgfVxuICAgICAgbG9va3VwW2tleV0gPSBjbG9uZTI7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2FtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHJlZnJlc2hTY29wZShsb29rdXBbc2FtZXNbaV1dLCBzY29wZXNba2V5cy5pbmRleE9mKHNhbWVzW2ldKV0pO1xuICAgIH1cbiAgICB0ZW1wbGF0ZUVsLl94X3ByZXZLZXlzID0ga2V5cztcbiAgfSk7XG59XG5mdW5jdGlvbiBwYXJzZUZvckV4cHJlc3Npb24oZXhwcmVzc2lvbikge1xuICBsZXQgZm9ySXRlcmF0b3JSRSA9IC8sKFteLFxcfVxcXV0qKSg/OiwoW14sXFx9XFxdXSopKT8kLztcbiAgbGV0IHN0cmlwUGFyZW5zUkUgPSAvXlxccypcXCh8XFwpXFxzKiQvZztcbiAgbGV0IGZvckFsaWFzUkUgPSAvKFtcXHNcXFNdKj8pXFxzKyg/OmlufG9mKVxccysoW1xcc1xcU10qKS87XG4gIGxldCBpbk1hdGNoID0gZXhwcmVzc2lvbi5tYXRjaChmb3JBbGlhc1JFKTtcbiAgaWYgKCFpbk1hdGNoKVxuICAgIHJldHVybjtcbiAgbGV0IHJlcyA9IHt9O1xuICByZXMuaXRlbXMgPSBpbk1hdGNoWzJdLnRyaW0oKTtcbiAgbGV0IGl0ZW0gPSBpbk1hdGNoWzFdLnJlcGxhY2Uoc3RyaXBQYXJlbnNSRSwgXCJcIikudHJpbSgpO1xuICBsZXQgaXRlcmF0b3JNYXRjaCA9IGl0ZW0ubWF0Y2goZm9ySXRlcmF0b3JSRSk7XG4gIGlmIChpdGVyYXRvck1hdGNoKSB7XG4gICAgcmVzLml0ZW0gPSBpdGVtLnJlcGxhY2UoZm9ySXRlcmF0b3JSRSwgXCJcIikudHJpbSgpO1xuICAgIHJlcy5pbmRleCA9IGl0ZXJhdG9yTWF0Y2hbMV0udHJpbSgpO1xuICAgIGlmIChpdGVyYXRvck1hdGNoWzJdKSB7XG4gICAgICByZXMuY29sbGVjdGlvbiA9IGl0ZXJhdG9yTWF0Y2hbMl0udHJpbSgpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXMuaXRlbSA9IGl0ZW07XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cbmZ1bmN0aW9uIGdldEl0ZXJhdGlvblNjb3BlVmFyaWFibGVzKGl0ZXJhdG9yTmFtZXMsIGl0ZW0sIGluZGV4LCBpdGVtcykge1xuICBsZXQgc2NvcGVWYXJpYWJsZXMgPSB7fTtcbiAgaWYgKC9eXFxbLipcXF0kLy50ZXN0KGl0ZXJhdG9yTmFtZXMuaXRlbSkgJiYgQXJyYXkuaXNBcnJheShpdGVtKSkge1xuICAgIGxldCBuYW1lcyA9IGl0ZXJhdG9yTmFtZXMuaXRlbS5yZXBsYWNlKFwiW1wiLCBcIlwiKS5yZXBsYWNlKFwiXVwiLCBcIlwiKS5zcGxpdChcIixcIikubWFwKChpKSA9PiBpLnRyaW0oKSk7XG4gICAgbmFtZXMuZm9yRWFjaCgobmFtZSwgaSkgPT4ge1xuICAgICAgc2NvcGVWYXJpYWJsZXNbbmFtZV0gPSBpdGVtW2ldO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHNjb3BlVmFyaWFibGVzW2l0ZXJhdG9yTmFtZXMuaXRlbV0gPSBpdGVtO1xuICB9XG4gIGlmIChpdGVyYXRvck5hbWVzLmluZGV4KVxuICAgIHNjb3BlVmFyaWFibGVzW2l0ZXJhdG9yTmFtZXMuaW5kZXhdID0gaW5kZXg7XG4gIGlmIChpdGVyYXRvck5hbWVzLmNvbGxlY3Rpb24pXG4gICAgc2NvcGVWYXJpYWJsZXNbaXRlcmF0b3JOYW1lcy5jb2xsZWN0aW9uXSA9IGl0ZW1zO1xuICByZXR1cm4gc2NvcGVWYXJpYWJsZXM7XG59XG5mdW5jdGlvbiBpc051bWVyaWMzKHN1YmplY3QpIHtcbiAgcmV0dXJuICFBcnJheS5pc0FycmF5KHN1YmplY3QpICYmICFpc05hTihzdWJqZWN0KTtcbn1cblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL2RpcmVjdGl2ZXMveC1yZWYuanNcbmZ1bmN0aW9uIGhhbmRsZXIyKCkge1xufVxuaGFuZGxlcjIuaW5saW5lID0gKGVsLCB7ZXhwcmVzc2lvbn0sIHtjbGVhbnVwfSkgPT4ge1xuICBsZXQgcm9vdCA9IGNsb3Nlc3RSb290KGVsKTtcbiAgaWYgKCFyb290Ll94X3JlZnMpXG4gICAgcm9vdC5feF9yZWZzID0ge307XG4gIHJvb3QuX3hfcmVmc1tleHByZXNzaW9uXSA9IGVsO1xuICBjbGVhbnVwKCgpID0+IGRlbGV0ZSByb290Ll94X3JlZnNbZXhwcmVzc2lvbl0pO1xufTtcbmRpcmVjdGl2ZShcInJlZlwiLCBoYW5kbGVyMik7XG5cbi8vIHBhY2thZ2VzL2FscGluZWpzL3NyYy9kaXJlY3RpdmVzL3gtaWYuanNcbmRpcmVjdGl2ZShcImlmXCIsIChlbCwge2V4cHJlc3Npb259LCB7ZWZmZWN0OiBlZmZlY3QzLCBjbGVhbnVwfSkgPT4ge1xuICBsZXQgZXZhbHVhdGUyID0gZXZhbHVhdGVMYXRlcihlbCwgZXhwcmVzc2lvbik7XG4gIGxldCBzaG93ID0gKCkgPT4ge1xuICAgIGlmIChlbC5feF9jdXJyZW50SWZFbClcbiAgICAgIHJldHVybiBlbC5feF9jdXJyZW50SWZFbDtcbiAgICBsZXQgY2xvbmUyID0gZWwuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgYWRkU2NvcGVUb05vZGUoY2xvbmUyLCB7fSwgZWwpO1xuICAgIG11dGF0ZURvbSgoKSA9PiB7XG4gICAgICBlbC5hZnRlcihjbG9uZTIpO1xuICAgICAgaW5pdFRyZWUoY2xvbmUyKTtcbiAgICB9KTtcbiAgICBlbC5feF9jdXJyZW50SWZFbCA9IGNsb25lMjtcbiAgICBlbC5feF91bmRvSWYgPSAoKSA9PiB7XG4gICAgICBjbG9uZTIucmVtb3ZlKCk7XG4gICAgICBkZWxldGUgZWwuX3hfY3VycmVudElmRWw7XG4gICAgfTtcbiAgICByZXR1cm4gY2xvbmUyO1xuICB9O1xuICBsZXQgaGlkZSA9ICgpID0+IHtcbiAgICBpZiAoIWVsLl94X3VuZG9JZilcbiAgICAgIHJldHVybjtcbiAgICBlbC5feF91bmRvSWYoKTtcbiAgICBkZWxldGUgZWwuX3hfdW5kb0lmO1xuICB9O1xuICBlZmZlY3QzKCgpID0+IGV2YWx1YXRlMigodmFsdWUpID0+IHtcbiAgICB2YWx1ZSA/IHNob3coKSA6IGhpZGUoKTtcbiAgfSkpO1xuICBjbGVhbnVwKCgpID0+IGVsLl94X3VuZG9JZiAmJiBlbC5feF91bmRvSWYoKSk7XG59KTtcblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL2RpcmVjdGl2ZXMveC1vbi5qc1xubWFwQXR0cmlidXRlcyhzdGFydGluZ1dpdGgoXCJAXCIsIGludG8ocHJlZml4KFwib246XCIpKSkpO1xuZGlyZWN0aXZlKFwib25cIiwgc2tpcER1cmluZ0Nsb25lKChlbCwge3ZhbHVlLCBtb2RpZmllcnMsIGV4cHJlc3Npb259LCB7Y2xlYW51cH0pID0+IHtcbiAgbGV0IGV2YWx1YXRlMiA9IGV4cHJlc3Npb24gPyBldmFsdWF0ZUxhdGVyKGVsLCBleHByZXNzaW9uKSA6ICgpID0+IHtcbiAgfTtcbiAgbGV0IHJlbW92ZUxpc3RlbmVyID0gb24oZWwsIHZhbHVlLCBtb2RpZmllcnMsIChlKSA9PiB7XG4gICAgZXZhbHVhdGUyKCgpID0+IHtcbiAgICB9LCB7c2NvcGU6IHskZXZlbnQ6IGV9LCBwYXJhbXM6IFtlXX0pO1xuICB9KTtcbiAgY2xlYW51cCgoKSA9PiByZW1vdmVMaXN0ZW5lcigpKTtcbn0pKTtcblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL2luZGV4LmpzXG5hbHBpbmVfZGVmYXVsdC5zZXRFdmFsdWF0b3Iobm9ybWFsRXZhbHVhdG9yKTtcbmFscGluZV9kZWZhdWx0LnNldFJlYWN0aXZpdHlFbmdpbmUoe3JlYWN0aXZlOiBpbXBvcnRfcmVhY3Rpdml0eTkucmVhY3RpdmUsIGVmZmVjdDogaW1wb3J0X3JlYWN0aXZpdHk5LmVmZmVjdCwgcmVsZWFzZTogaW1wb3J0X3JlYWN0aXZpdHk5LnN0b3AsIHJhdzogaW1wb3J0X3JlYWN0aXZpdHk5LnRvUmF3fSk7XG52YXIgc3JjX2RlZmF1bHQgPSBhbHBpbmVfZGVmYXVsdDtcblxuLy8gcGFja2FnZXMvYWxwaW5lanMvYnVpbGRzL21vZHVsZS5qc1xudmFyIG1vZHVsZV9kZWZhdWx0ID0gc3JjX2RlZmF1bHQ7XG5leHBvcnQge1xuICBtb2R1bGVfZGVmYXVsdCBhcyBkZWZhdWx0XG59O1xuIiwgIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24oKSB7XG4gIHZhciBQb2x5ZmlsbEV2ZW50ID0gZXZlbnRDb25zdHJ1Y3RvcigpO1xuXG4gIGZ1bmN0aW9uIGV2ZW50Q29uc3RydWN0b3IoKSB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cuQ3VzdG9tRXZlbnQgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIHdpbmRvdy5DdXN0b21FdmVudDtcbiAgICAvLyBJRTw9OSBTdXBwb3J0XG4gICAgZnVuY3Rpb24gQ3VzdG9tRXZlbnQoZXZlbnQsIHBhcmFtcykge1xuICAgICAgcGFyYW1zID0gcGFyYW1zIHx8IHtidWJibGVzOiBmYWxzZSwgY2FuY2VsYWJsZTogZmFsc2UsIGRldGFpbDogdW5kZWZpbmVkfTtcbiAgICAgIHZhciBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcbiAgICAgIGV2dC5pbml0Q3VzdG9tRXZlbnQoZXZlbnQsIHBhcmFtcy5idWJibGVzLCBwYXJhbXMuY2FuY2VsYWJsZSwgcGFyYW1zLmRldGFpbCk7XG4gICAgICByZXR1cm4gZXZ0O1xuICAgIH1cbiAgICBDdXN0b21FdmVudC5wcm90b3R5cGUgPSB3aW5kb3cuRXZlbnQucHJvdG90eXBlO1xuICAgIHJldHVybiBDdXN0b21FdmVudDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGJ1aWxkSGlkZGVuSW5wdXQobmFtZSwgdmFsdWUpIHtcbiAgICB2YXIgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgaW5wdXQudHlwZSA9IFwiaGlkZGVuXCI7XG4gICAgaW5wdXQubmFtZSA9IG5hbWU7XG4gICAgaW5wdXQudmFsdWUgPSB2YWx1ZTtcbiAgICByZXR1cm4gaW5wdXQ7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVDbGljayhlbGVtZW50KSB7XG4gICAgdmFyIHRvID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRvXCIpLFxuICAgICAgICBtZXRob2QgPSBidWlsZEhpZGRlbklucHV0KFwiX21ldGhvZFwiLCBlbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtbWV0aG9kXCIpKSxcbiAgICAgICAgY3NyZiA9IGJ1aWxkSGlkZGVuSW5wdXQoXCJfY3NyZl90b2tlblwiLCBlbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtY3NyZlwiKSksXG4gICAgICAgIGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKSxcbiAgICAgICAgdGFyZ2V0ID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJ0YXJnZXRcIik7XG5cbiAgICBmb3JtLm1ldGhvZCA9IChlbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtbWV0aG9kXCIpID09PSBcImdldFwiKSA/IFwiZ2V0XCIgOiBcInBvc3RcIjtcbiAgICBmb3JtLmFjdGlvbiA9IHRvO1xuICAgIGZvcm0uc3R5bGUuZGlzcGxheSA9IFwiaGlkZGVuXCI7XG5cbiAgICBpZiAodGFyZ2V0KSBmb3JtLnRhcmdldCA9IHRhcmdldDtcblxuICAgIGZvcm0uYXBwZW5kQ2hpbGQoY3NyZik7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChtZXRob2QpO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZm9ybSk7XG4gICAgZm9ybS5zdWJtaXQoKTtcbiAgfVxuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuICAgIHZhciBlbGVtZW50ID0gZS50YXJnZXQ7XG5cbiAgICB3aGlsZSAoZWxlbWVudCAmJiBlbGVtZW50LmdldEF0dHJpYnV0ZSkge1xuICAgICAgdmFyIHBob2VuaXhMaW5rRXZlbnQgPSBuZXcgUG9seWZpbGxFdmVudCgncGhvZW5peC5saW5rLmNsaWNrJywge1xuICAgICAgICBcImJ1YmJsZXNcIjogdHJ1ZSwgXCJjYW5jZWxhYmxlXCI6IHRydWVcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIWVsZW1lbnQuZGlzcGF0Y2hFdmVudChwaG9lbml4TGlua0V2ZW50KSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1tZXRob2RcIikpIHtcbiAgICAgICAgaGFuZGxlQ2xpY2soZWxlbWVudCk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQucGFyZW50Tm9kZTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIGZhbHNlKTtcblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncGhvZW5peC5saW5rLmNsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgbWVzc2FnZSA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtY29uZmlybVwiKTtcbiAgICBpZihtZXNzYWdlICYmICF3aW5kb3cuY29uZmlybShtZXNzYWdlKSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfSwgZmFsc2UpO1xufSkoKTtcbiIsICIvLyB3cmFwcyB2YWx1ZSBpbiBjbG9zdXJlIG9yIHJldHVybnMgY2xvc3VyZVxuZXhwb3J0IGxldCBjbG9zdXJlID0gKHZhbHVlKSA9PiB7XG4gIGlmKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiKXtcbiAgICByZXR1cm4gdmFsdWVcbiAgfSBlbHNlIHtcbiAgICBsZXQgY2xvc3VyZSA9IGZ1bmN0aW9uICgpeyByZXR1cm4gdmFsdWUgfVxuICAgIHJldHVybiBjbG9zdXJlXG4gIH1cbn1cbiIsICJleHBvcnQgY29uc3QgZ2xvYmFsU2VsZiA9IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IG51bGxcbmV4cG9ydCBjb25zdCBwaHhXaW5kb3cgPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogbnVsbFxuZXhwb3J0IGNvbnN0IGdsb2JhbCA9IGdsb2JhbFNlbGYgfHwgcGh4V2luZG93IHx8IHRoaXNcbmV4cG9ydCBjb25zdCBERUZBVUxUX1ZTTiA9IFwiMi4wLjBcIlxuZXhwb3J0IGNvbnN0IFNPQ0tFVF9TVEFURVMgPSB7Y29ubmVjdGluZzogMCwgb3BlbjogMSwgY2xvc2luZzogMiwgY2xvc2VkOiAzfVxuZXhwb3J0IGNvbnN0IERFRkFVTFRfVElNRU9VVCA9IDEwMDAwXG5leHBvcnQgY29uc3QgV1NfQ0xPU0VfTk9STUFMID0gMTAwMFxuZXhwb3J0IGNvbnN0IENIQU5ORUxfU1RBVEVTID0ge1xuICBjbG9zZWQ6IFwiY2xvc2VkXCIsXG4gIGVycm9yZWQ6IFwiZXJyb3JlZFwiLFxuICBqb2luZWQ6IFwiam9pbmVkXCIsXG4gIGpvaW5pbmc6IFwiam9pbmluZ1wiLFxuICBsZWF2aW5nOiBcImxlYXZpbmdcIixcbn1cbmV4cG9ydCBjb25zdCBDSEFOTkVMX0VWRU5UUyA9IHtcbiAgY2xvc2U6IFwicGh4X2Nsb3NlXCIsXG4gIGVycm9yOiBcInBoeF9lcnJvclwiLFxuICBqb2luOiBcInBoeF9qb2luXCIsXG4gIHJlcGx5OiBcInBoeF9yZXBseVwiLFxuICBsZWF2ZTogXCJwaHhfbGVhdmVcIlxufVxuZXhwb3J0IGNvbnN0IENIQU5ORUxfTElGRUNZQ0xFX0VWRU5UUyA9IFtcbiAgQ0hBTk5FTF9FVkVOVFMuY2xvc2UsXG4gIENIQU5ORUxfRVZFTlRTLmVycm9yLFxuICBDSEFOTkVMX0VWRU5UUy5qb2luLFxuICBDSEFOTkVMX0VWRU5UUy5yZXBseSxcbiAgQ0hBTk5FTF9FVkVOVFMubGVhdmVcbl1cbmV4cG9ydCBjb25zdCBUUkFOU1BPUlRTID0ge1xuICBsb25ncG9sbDogXCJsb25ncG9sbFwiLFxuICB3ZWJzb2NrZXQ6IFwid2Vic29ja2V0XCJcbn1cbiIsICIvKipcbiAqIEluaXRpYWxpemVzIHRoZSBQdXNoXG4gKiBAcGFyYW0ge0NoYW5uZWx9IGNoYW5uZWwgLSBUaGUgQ2hhbm5lbFxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50IC0gVGhlIGV2ZW50LCBmb3IgZXhhbXBsZSBgXCJwaHhfam9pblwiYFxuICogQHBhcmFtIHtPYmplY3R9IHBheWxvYWQgLSBUaGUgcGF5bG9hZCwgZm9yIGV4YW1wbGUgYHt1c2VyX2lkOiAxMjN9YFxuICogQHBhcmFtIHtudW1iZXJ9IHRpbWVvdXQgLSBUaGUgcHVzaCB0aW1lb3V0IGluIG1pbGxpc2Vjb25kc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQdXNoIHtcbiAgY29uc3RydWN0b3IoY2hhbm5lbCwgZXZlbnQsIHBheWxvYWQsIHRpbWVvdXQpe1xuICAgIHRoaXMuY2hhbm5lbCA9IGNoYW5uZWxcbiAgICB0aGlzLmV2ZW50ID0gZXZlbnRcbiAgICB0aGlzLnBheWxvYWQgPSBwYXlsb2FkIHx8IGZ1bmN0aW9uICgpeyByZXR1cm4ge30gfVxuICAgIHRoaXMucmVjZWl2ZWRSZXNwID0gbnVsbFxuICAgIHRoaXMudGltZW91dCA9IHRpbWVvdXRcbiAgICB0aGlzLnRpbWVvdXRUaW1lciA9IG51bGxcbiAgICB0aGlzLnJlY0hvb2tzID0gW11cbiAgICB0aGlzLnNlbnQgPSBmYWxzZVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lb3V0XG4gICAqL1xuICByZXNlbmQodGltZW91dCl7XG4gICAgdGhpcy50aW1lb3V0ID0gdGltZW91dFxuICAgIHRoaXMucmVzZXQoKVxuICAgIHRoaXMuc2VuZCgpXG4gIH1cblxuICAvKipcbiAgICpcbiAgICovXG4gIHNlbmQoKXtcbiAgICBpZih0aGlzLmhhc1JlY2VpdmVkKFwidGltZW91dFwiKSl7IHJldHVybiB9XG4gICAgdGhpcy5zdGFydFRpbWVvdXQoKVxuICAgIHRoaXMuc2VudCA9IHRydWVcbiAgICB0aGlzLmNoYW5uZWwuc29ja2V0LnB1c2goe1xuICAgICAgdG9waWM6IHRoaXMuY2hhbm5lbC50b3BpYyxcbiAgICAgIGV2ZW50OiB0aGlzLmV2ZW50LFxuICAgICAgcGF5bG9hZDogdGhpcy5wYXlsb2FkKCksXG4gICAgICByZWY6IHRoaXMucmVmLFxuICAgICAgam9pbl9yZWY6IHRoaXMuY2hhbm5lbC5qb2luUmVmKClcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7Kn0gc3RhdHVzXG4gICAqIEBwYXJhbSB7Kn0gY2FsbGJhY2tcbiAgICovXG4gIHJlY2VpdmUoc3RhdHVzLCBjYWxsYmFjayl7XG4gICAgaWYodGhpcy5oYXNSZWNlaXZlZChzdGF0dXMpKXtcbiAgICAgIGNhbGxiYWNrKHRoaXMucmVjZWl2ZWRSZXNwLnJlc3BvbnNlKVxuICAgIH1cblxuICAgIHRoaXMucmVjSG9va3MucHVzaCh7c3RhdHVzLCBjYWxsYmFja30pXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcmVzZXQoKXtcbiAgICB0aGlzLmNhbmNlbFJlZkV2ZW50KClcbiAgICB0aGlzLnJlZiA9IG51bGxcbiAgICB0aGlzLnJlZkV2ZW50ID0gbnVsbFxuICAgIHRoaXMucmVjZWl2ZWRSZXNwID0gbnVsbFxuICAgIHRoaXMuc2VudCA9IGZhbHNlXG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIG1hdGNoUmVjZWl2ZSh7c3RhdHVzLCByZXNwb25zZSwgX3JlZn0pe1xuICAgIHRoaXMucmVjSG9va3MuZmlsdGVyKGggPT4gaC5zdGF0dXMgPT09IHN0YXR1cylcbiAgICAgIC5mb3JFYWNoKGggPT4gaC5jYWxsYmFjayhyZXNwb25zZSkpXG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGNhbmNlbFJlZkV2ZW50KCl7XG4gICAgaWYoIXRoaXMucmVmRXZlbnQpeyByZXR1cm4gfVxuICAgIHRoaXMuY2hhbm5lbC5vZmYodGhpcy5yZWZFdmVudClcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgY2FuY2VsVGltZW91dCgpe1xuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXRUaW1lcilcbiAgICB0aGlzLnRpbWVvdXRUaW1lciA9IG51bGxcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgc3RhcnRUaW1lb3V0KCl7XG4gICAgaWYodGhpcy50aW1lb3V0VGltZXIpeyB0aGlzLmNhbmNlbFRpbWVvdXQoKSB9XG4gICAgdGhpcy5yZWYgPSB0aGlzLmNoYW5uZWwuc29ja2V0Lm1ha2VSZWYoKVxuICAgIHRoaXMucmVmRXZlbnQgPSB0aGlzLmNoYW5uZWwucmVwbHlFdmVudE5hbWUodGhpcy5yZWYpXG5cbiAgICB0aGlzLmNoYW5uZWwub24odGhpcy5yZWZFdmVudCwgcGF5bG9hZCA9PiB7XG4gICAgICB0aGlzLmNhbmNlbFJlZkV2ZW50KClcbiAgICAgIHRoaXMuY2FuY2VsVGltZW91dCgpXG4gICAgICB0aGlzLnJlY2VpdmVkUmVzcCA9IHBheWxvYWRcbiAgICAgIHRoaXMubWF0Y2hSZWNlaXZlKHBheWxvYWQpXG4gICAgfSlcblxuICAgIHRoaXMudGltZW91dFRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnRyaWdnZXIoXCJ0aW1lb3V0XCIsIHt9KVxuICAgIH0sIHRoaXMudGltZW91dClcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaGFzUmVjZWl2ZWQoc3RhdHVzKXtcbiAgICByZXR1cm4gdGhpcy5yZWNlaXZlZFJlc3AgJiYgdGhpcy5yZWNlaXZlZFJlc3Auc3RhdHVzID09PSBzdGF0dXNcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdHJpZ2dlcihzdGF0dXMsIHJlc3BvbnNlKXtcbiAgICB0aGlzLmNoYW5uZWwudHJpZ2dlcih0aGlzLnJlZkV2ZW50LCB7c3RhdHVzLCByZXNwb25zZX0pXG4gIH1cbn1cbiIsICIvKipcbiAqXG4gKiBDcmVhdGVzIGEgdGltZXIgdGhhdCBhY2NlcHRzIGEgYHRpbWVyQ2FsY2AgZnVuY3Rpb24gdG8gcGVyZm9ybVxuICogY2FsY3VsYXRlZCB0aW1lb3V0IHJldHJpZXMsIHN1Y2ggYXMgZXhwb25lbnRpYWwgYmFja29mZi5cbiAqXG4gKiBAZXhhbXBsZVxuICogbGV0IHJlY29ubmVjdFRpbWVyID0gbmV3IFRpbWVyKCgpID0+IHRoaXMuY29ubmVjdCgpLCBmdW5jdGlvbih0cmllcyl7XG4gKiAgIHJldHVybiBbMTAwMCwgNTAwMCwgMTAwMDBdW3RyaWVzIC0gMV0gfHwgMTAwMDBcbiAqIH0pXG4gKiByZWNvbm5lY3RUaW1lci5zY2hlZHVsZVRpbWVvdXQoKSAvLyBmaXJlcyBhZnRlciAxMDAwXG4gKiByZWNvbm5lY3RUaW1lci5zY2hlZHVsZVRpbWVvdXQoKSAvLyBmaXJlcyBhZnRlciA1MDAwXG4gKiByZWNvbm5lY3RUaW1lci5yZXNldCgpXG4gKiByZWNvbm5lY3RUaW1lci5zY2hlZHVsZVRpbWVvdXQoKSAvLyBmaXJlcyBhZnRlciAxMDAwXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHRpbWVyQ2FsY1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaW1lciB7XG4gIGNvbnN0cnVjdG9yKGNhbGxiYWNrLCB0aW1lckNhbGMpe1xuICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFja1xuICAgIHRoaXMudGltZXJDYWxjID0gdGltZXJDYWxjXG4gICAgdGhpcy50aW1lciA9IG51bGxcbiAgICB0aGlzLnRyaWVzID0gMFxuICB9XG5cbiAgcmVzZXQoKXtcbiAgICB0aGlzLnRyaWVzID0gMFxuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKVxuICB9XG5cbiAgLyoqXG4gICAqIENhbmNlbHMgYW55IHByZXZpb3VzIHNjaGVkdWxlVGltZW91dCBhbmQgc2NoZWR1bGVzIGNhbGxiYWNrXG4gICAqL1xuICBzY2hlZHVsZVRpbWVvdXQoKXtcbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lcilcblxuICAgIHRoaXMudGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMudHJpZXMgPSB0aGlzLnRyaWVzICsgMVxuICAgICAgdGhpcy5jYWxsYmFjaygpXG4gICAgfSwgdGhpcy50aW1lckNhbGModGhpcy50cmllcyArIDEpKVxuICB9XG59XG4iLCAiaW1wb3J0IHtjbG9zdXJlfSBmcm9tIFwiLi91dGlsc1wiXG5pbXBvcnQge1xuICBDSEFOTkVMX0VWRU5UUyxcbiAgQ0hBTk5FTF9MSUZFQ1lDTEVfRVZFTlRTLFxuICBDSEFOTkVMX1NUQVRFUyxcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCJcblxuaW1wb3J0IFB1c2ggZnJvbSBcIi4vcHVzaFwiXG5pbXBvcnQgVGltZXIgZnJvbSBcIi4vdGltZXJcIlxuXG4vKipcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdG9waWNcbiAqIEBwYXJhbSB7KE9iamVjdHxmdW5jdGlvbil9IHBhcmFtc1xuICogQHBhcmFtIHtTb2NrZXR9IHNvY2tldFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaGFubmVsIHtcbiAgY29uc3RydWN0b3IodG9waWMsIHBhcmFtcywgc29ja2V0KXtcbiAgICB0aGlzLnN0YXRlID0gQ0hBTk5FTF9TVEFURVMuY2xvc2VkXG4gICAgdGhpcy50b3BpYyA9IHRvcGljXG4gICAgdGhpcy5wYXJhbXMgPSBjbG9zdXJlKHBhcmFtcyB8fCB7fSlcbiAgICB0aGlzLnNvY2tldCA9IHNvY2tldFxuICAgIHRoaXMuYmluZGluZ3MgPSBbXVxuICAgIHRoaXMuYmluZGluZ1JlZiA9IDBcbiAgICB0aGlzLnRpbWVvdXQgPSB0aGlzLnNvY2tldC50aW1lb3V0XG4gICAgdGhpcy5qb2luZWRPbmNlID0gZmFsc2VcbiAgICB0aGlzLmpvaW5QdXNoID0gbmV3IFB1c2godGhpcywgQ0hBTk5FTF9FVkVOVFMuam9pbiwgdGhpcy5wYXJhbXMsIHRoaXMudGltZW91dClcbiAgICB0aGlzLnB1c2hCdWZmZXIgPSBbXVxuICAgIHRoaXMuc3RhdGVDaGFuZ2VSZWZzID0gW11cblxuICAgIHRoaXMucmVqb2luVGltZXIgPSBuZXcgVGltZXIoKCkgPT4ge1xuICAgICAgaWYodGhpcy5zb2NrZXQuaXNDb25uZWN0ZWQoKSl7IHRoaXMucmVqb2luKCkgfVxuICAgIH0sIHRoaXMuc29ja2V0LnJlam9pbkFmdGVyTXMpXG4gICAgdGhpcy5zdGF0ZUNoYW5nZVJlZnMucHVzaCh0aGlzLnNvY2tldC5vbkVycm9yKCgpID0+IHRoaXMucmVqb2luVGltZXIucmVzZXQoKSkpXG4gICAgdGhpcy5zdGF0ZUNoYW5nZVJlZnMucHVzaCh0aGlzLnNvY2tldC5vbk9wZW4oKCkgPT4ge1xuICAgICAgdGhpcy5yZWpvaW5UaW1lci5yZXNldCgpXG4gICAgICBpZih0aGlzLmlzRXJyb3JlZCgpKXsgdGhpcy5yZWpvaW4oKSB9XG4gICAgfSlcbiAgICApXG4gICAgdGhpcy5qb2luUHVzaC5yZWNlaXZlKFwib2tcIiwgKCkgPT4ge1xuICAgICAgdGhpcy5zdGF0ZSA9IENIQU5ORUxfU1RBVEVTLmpvaW5lZFxuICAgICAgdGhpcy5yZWpvaW5UaW1lci5yZXNldCgpXG4gICAgICB0aGlzLnB1c2hCdWZmZXIuZm9yRWFjaChwdXNoRXZlbnQgPT4gcHVzaEV2ZW50LnNlbmQoKSlcbiAgICAgIHRoaXMucHVzaEJ1ZmZlciA9IFtdXG4gICAgfSlcbiAgICB0aGlzLmpvaW5QdXNoLnJlY2VpdmUoXCJlcnJvclwiLCAoKSA9PiB7XG4gICAgICB0aGlzLnN0YXRlID0gQ0hBTk5FTF9TVEFURVMuZXJyb3JlZFxuICAgICAgaWYodGhpcy5zb2NrZXQuaXNDb25uZWN0ZWQoKSl7IHRoaXMucmVqb2luVGltZXIuc2NoZWR1bGVUaW1lb3V0KCkgfVxuICAgIH0pXG4gICAgdGhpcy5vbkNsb3NlKCgpID0+IHtcbiAgICAgIHRoaXMucmVqb2luVGltZXIucmVzZXQoKVxuICAgICAgaWYodGhpcy5zb2NrZXQuaGFzTG9nZ2VyKCkpIHRoaXMuc29ja2V0LmxvZyhcImNoYW5uZWxcIiwgYGNsb3NlICR7dGhpcy50b3BpY30gJHt0aGlzLmpvaW5SZWYoKX1gKVxuICAgICAgdGhpcy5zdGF0ZSA9IENIQU5ORUxfU1RBVEVTLmNsb3NlZFxuICAgICAgdGhpcy5zb2NrZXQucmVtb3ZlKHRoaXMpXG4gICAgfSlcbiAgICB0aGlzLm9uRXJyb3IocmVhc29uID0+IHtcbiAgICAgIGlmKHRoaXMuc29ja2V0Lmhhc0xvZ2dlcigpKSB0aGlzLnNvY2tldC5sb2coXCJjaGFubmVsXCIsIGBlcnJvciAke3RoaXMudG9waWN9YCwgcmVhc29uKVxuICAgICAgaWYodGhpcy5pc0pvaW5pbmcoKSl7IHRoaXMuam9pblB1c2gucmVzZXQoKSB9XG4gICAgICB0aGlzLnN0YXRlID0gQ0hBTk5FTF9TVEFURVMuZXJyb3JlZFxuICAgICAgaWYodGhpcy5zb2NrZXQuaXNDb25uZWN0ZWQoKSl7IHRoaXMucmVqb2luVGltZXIuc2NoZWR1bGVUaW1lb3V0KCkgfVxuICAgIH0pXG4gICAgdGhpcy5qb2luUHVzaC5yZWNlaXZlKFwidGltZW91dFwiLCAoKSA9PiB7XG4gICAgICBpZih0aGlzLnNvY2tldC5oYXNMb2dnZXIoKSkgdGhpcy5zb2NrZXQubG9nKFwiY2hhbm5lbFwiLCBgdGltZW91dCAke3RoaXMudG9waWN9ICgke3RoaXMuam9pblJlZigpfSlgLCB0aGlzLmpvaW5QdXNoLnRpbWVvdXQpXG4gICAgICBsZXQgbGVhdmVQdXNoID0gbmV3IFB1c2godGhpcywgQ0hBTk5FTF9FVkVOVFMubGVhdmUsIGNsb3N1cmUoe30pLCB0aGlzLnRpbWVvdXQpXG4gICAgICBsZWF2ZVB1c2guc2VuZCgpXG4gICAgICB0aGlzLnN0YXRlID0gQ0hBTk5FTF9TVEFURVMuZXJyb3JlZFxuICAgICAgdGhpcy5qb2luUHVzaC5yZXNldCgpXG4gICAgICBpZih0aGlzLnNvY2tldC5pc0Nvbm5lY3RlZCgpKXsgdGhpcy5yZWpvaW5UaW1lci5zY2hlZHVsZVRpbWVvdXQoKSB9XG4gICAgfSlcbiAgICB0aGlzLm9uKENIQU5ORUxfRVZFTlRTLnJlcGx5LCAocGF5bG9hZCwgcmVmKSA9PiB7XG4gICAgICB0aGlzLnRyaWdnZXIodGhpcy5yZXBseUV2ZW50TmFtZShyZWYpLCBwYXlsb2FkKVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogSm9pbiB0aGUgY2hhbm5lbFxuICAgKiBAcGFyYW0ge2ludGVnZXJ9IHRpbWVvdXRcbiAgICogQHJldHVybnMge1B1c2h9XG4gICAqL1xuICBqb2luKHRpbWVvdXQgPSB0aGlzLnRpbWVvdXQpe1xuICAgIGlmKHRoaXMuam9pbmVkT25jZSl7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0cmllZCB0byBqb2luIG11bHRpcGxlIHRpbWVzLiAnam9pbicgY2FuIG9ubHkgYmUgY2FsbGVkIGEgc2luZ2xlIHRpbWUgcGVyIGNoYW5uZWwgaW5zdGFuY2VcIilcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50aW1lb3V0ID0gdGltZW91dFxuICAgICAgdGhpcy5qb2luZWRPbmNlID0gdHJ1ZVxuICAgICAgdGhpcy5yZWpvaW4oKVxuICAgICAgcmV0dXJuIHRoaXMuam9pblB1c2hcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSG9vayBpbnRvIGNoYW5uZWwgY2xvc2VcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICovXG4gIG9uQ2xvc2UoY2FsbGJhY2spe1xuICAgIHRoaXMub24oQ0hBTk5FTF9FVkVOVFMuY2xvc2UsIGNhbGxiYWNrKVxuICB9XG5cbiAgLyoqXG4gICAqIEhvb2sgaW50byBjaGFubmVsIGVycm9yc1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgKi9cbiAgb25FcnJvcihjYWxsYmFjayl7XG4gICAgcmV0dXJuIHRoaXMub24oQ0hBTk5FTF9FVkVOVFMuZXJyb3IsIHJlYXNvbiA9PiBjYWxsYmFjayhyZWFzb24pKVxuICB9XG5cbiAgLyoqXG4gICAqIFN1YnNjcmliZXMgb24gY2hhbm5lbCBldmVudHNcbiAgICpcbiAgICogU3Vic2NyaXB0aW9uIHJldHVybnMgYSByZWYgY291bnRlciwgd2hpY2ggY2FuIGJlIHVzZWQgbGF0ZXIgdG9cbiAgICogdW5zdWJzY3JpYmUgdGhlIGV4YWN0IGV2ZW50IGxpc3RlbmVyXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGNvbnN0IHJlZjEgPSBjaGFubmVsLm9uKFwiZXZlbnRcIiwgZG9fc3R1ZmYpXG4gICAqIGNvbnN0IHJlZjIgPSBjaGFubmVsLm9uKFwiZXZlbnRcIiwgZG9fb3RoZXJfc3R1ZmYpXG4gICAqIGNoYW5uZWwub2ZmKFwiZXZlbnRcIiwgcmVmMSlcbiAgICogLy8gU2luY2UgdW5zdWJzY3JpcHRpb24sIGRvX3N0dWZmIHdvbid0IGZpcmUsXG4gICAqIC8vIHdoaWxlIGRvX290aGVyX3N0dWZmIHdpbGwga2VlcCBmaXJpbmcgb24gdGhlIFwiZXZlbnRcIlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICogQHJldHVybnMge2ludGVnZXJ9IHJlZlxuICAgKi9cbiAgb24oZXZlbnQsIGNhbGxiYWNrKXtcbiAgICBsZXQgcmVmID0gdGhpcy5iaW5kaW5nUmVmKytcbiAgICB0aGlzLmJpbmRpbmdzLnB1c2goe2V2ZW50LCByZWYsIGNhbGxiYWNrfSlcbiAgICByZXR1cm4gcmVmXG4gIH1cblxuICAvKipcbiAgICogVW5zdWJzY3JpYmVzIG9mZiBvZiBjaGFubmVsIGV2ZW50c1xuICAgKlxuICAgKiBVc2UgdGhlIHJlZiByZXR1cm5lZCBmcm9tIGEgY2hhbm5lbC5vbigpIHRvIHVuc3Vic2NyaWJlIG9uZVxuICAgKiBoYW5kbGVyLCBvciBwYXNzIG5vdGhpbmcgZm9yIHRoZSByZWYgdG8gdW5zdWJzY3JpYmUgYWxsXG4gICAqIGhhbmRsZXJzIGZvciB0aGUgZ2l2ZW4gZXZlbnQuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIC8vIFVuc3Vic2NyaWJlIHRoZSBkb19zdHVmZiBoYW5kbGVyXG4gICAqIGNvbnN0IHJlZjEgPSBjaGFubmVsLm9uKFwiZXZlbnRcIiwgZG9fc3R1ZmYpXG4gICAqIGNoYW5uZWwub2ZmKFwiZXZlbnRcIiwgcmVmMSlcbiAgICpcbiAgICogLy8gVW5zdWJzY3JpYmUgYWxsIGhhbmRsZXJzIGZyb20gZXZlbnRcbiAgICogY2hhbm5lbC5vZmYoXCJldmVudFwiKVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRcbiAgICogQHBhcmFtIHtpbnRlZ2VyfSByZWZcbiAgICovXG4gIG9mZihldmVudCwgcmVmKXtcbiAgICB0aGlzLmJpbmRpbmdzID0gdGhpcy5iaW5kaW5ncy5maWx0ZXIoKGJpbmQpID0+IHtcbiAgICAgIHJldHVybiAhKGJpbmQuZXZlbnQgPT09IGV2ZW50ICYmICh0eXBlb2YgcmVmID09PSBcInVuZGVmaW5lZFwiIHx8IHJlZiA9PT0gYmluZC5yZWYpKVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGNhblB1c2goKXsgcmV0dXJuIHRoaXMuc29ja2V0LmlzQ29ubmVjdGVkKCkgJiYgdGhpcy5pc0pvaW5lZCgpIH1cblxuICAvKipcbiAgICogU2VuZHMgYSBtZXNzYWdlIGBldmVudGAgdG8gcGhvZW5peCB3aXRoIHRoZSBwYXlsb2FkIGBwYXlsb2FkYC5cbiAgICogUGhvZW5peCByZWNlaXZlcyB0aGlzIGluIHRoZSBgaGFuZGxlX2luKGV2ZW50LCBwYXlsb2FkLCBzb2NrZXQpYFxuICAgKiBmdW5jdGlvbi4gaWYgcGhvZW5peCByZXBsaWVzIG9yIGl0IHRpbWVzIG91dCAoZGVmYXVsdCAxMDAwMG1zKSxcbiAgICogdGhlbiBvcHRpb25hbGx5IHRoZSByZXBseSBjYW4gYmUgcmVjZWl2ZWQuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGNoYW5uZWwucHVzaChcImV2ZW50XCIpXG4gICAqICAgLnJlY2VpdmUoXCJva1wiLCBwYXlsb2FkID0+IGNvbnNvbGUubG9nKFwicGhvZW5peCByZXBsaWVkOlwiLCBwYXlsb2FkKSlcbiAgICogICAucmVjZWl2ZShcImVycm9yXCIsIGVyciA9PiBjb25zb2xlLmxvZyhcInBob2VuaXggZXJyb3JlZFwiLCBlcnIpKVxuICAgKiAgIC5yZWNlaXZlKFwidGltZW91dFwiLCAoKSA9PiBjb25zb2xlLmxvZyhcInRpbWVkIG91dCBwdXNoaW5nXCIpKVxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRcbiAgICogQHBhcmFtIHtPYmplY3R9IHBheWxvYWRcbiAgICogQHBhcmFtIHtudW1iZXJ9IFt0aW1lb3V0XVxuICAgKiBAcmV0dXJucyB7UHVzaH1cbiAgICovXG4gIHB1c2goZXZlbnQsIHBheWxvYWQsIHRpbWVvdXQgPSB0aGlzLnRpbWVvdXQpe1xuICAgIHBheWxvYWQgPSBwYXlsb2FkIHx8IHt9XG4gICAgaWYoIXRoaXMuam9pbmVkT25jZSl7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHRyaWVkIHRvIHB1c2ggJyR7ZXZlbnR9JyB0byAnJHt0aGlzLnRvcGljfScgYmVmb3JlIGpvaW5pbmcuIFVzZSBjaGFubmVsLmpvaW4oKSBiZWZvcmUgcHVzaGluZyBldmVudHNgKVxuICAgIH1cbiAgICBsZXQgcHVzaEV2ZW50ID0gbmV3IFB1c2godGhpcywgZXZlbnQsIGZ1bmN0aW9uICgpeyByZXR1cm4gcGF5bG9hZCB9LCB0aW1lb3V0KVxuICAgIGlmKHRoaXMuY2FuUHVzaCgpKXtcbiAgICAgIHB1c2hFdmVudC5zZW5kKClcbiAgICB9IGVsc2Uge1xuICAgICAgcHVzaEV2ZW50LnN0YXJ0VGltZW91dCgpXG4gICAgICB0aGlzLnB1c2hCdWZmZXIucHVzaChwdXNoRXZlbnQpXG4gICAgfVxuXG4gICAgcmV0dXJuIHB1c2hFdmVudFxuICB9XG5cbiAgLyoqIExlYXZlcyB0aGUgY2hhbm5lbFxuICAgKlxuICAgKiBVbnN1YnNjcmliZXMgZnJvbSBzZXJ2ZXIgZXZlbnRzLCBhbmRcbiAgICogaW5zdHJ1Y3RzIGNoYW5uZWwgdG8gdGVybWluYXRlIG9uIHNlcnZlclxuICAgKlxuICAgKiBUcmlnZ2VycyBvbkNsb3NlKCkgaG9va3NcbiAgICpcbiAgICogVG8gcmVjZWl2ZSBsZWF2ZSBhY2tub3dsZWRnZW1lbnRzLCB1c2UgdGhlIGByZWNlaXZlYFxuICAgKiBob29rIHRvIGJpbmQgdG8gdGhlIHNlcnZlciBhY2ssIGllOlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBjaGFubmVsLmxlYXZlKCkucmVjZWl2ZShcIm9rXCIsICgpID0+IGFsZXJ0KFwibGVmdCFcIikgKVxuICAgKlxuICAgKiBAcGFyYW0ge2ludGVnZXJ9IHRpbWVvdXRcbiAgICogQHJldHVybnMge1B1c2h9XG4gICAqL1xuICBsZWF2ZSh0aW1lb3V0ID0gdGhpcy50aW1lb3V0KXtcbiAgICB0aGlzLnJlam9pblRpbWVyLnJlc2V0KClcbiAgICB0aGlzLmpvaW5QdXNoLmNhbmNlbFRpbWVvdXQoKVxuXG4gICAgdGhpcy5zdGF0ZSA9IENIQU5ORUxfU1RBVEVTLmxlYXZpbmdcbiAgICBsZXQgb25DbG9zZSA9ICgpID0+IHtcbiAgICAgIGlmKHRoaXMuc29ja2V0Lmhhc0xvZ2dlcigpKSB0aGlzLnNvY2tldC5sb2coXCJjaGFubmVsXCIsIGBsZWF2ZSAke3RoaXMudG9waWN9YClcbiAgICAgIHRoaXMudHJpZ2dlcihDSEFOTkVMX0VWRU5UUy5jbG9zZSwgXCJsZWF2ZVwiKVxuICAgIH1cbiAgICBsZXQgbGVhdmVQdXNoID0gbmV3IFB1c2godGhpcywgQ0hBTk5FTF9FVkVOVFMubGVhdmUsIGNsb3N1cmUoe30pLCB0aW1lb3V0KVxuICAgIGxlYXZlUHVzaC5yZWNlaXZlKFwib2tcIiwgKCkgPT4gb25DbG9zZSgpKVxuICAgICAgLnJlY2VpdmUoXCJ0aW1lb3V0XCIsICgpID0+IG9uQ2xvc2UoKSlcbiAgICBsZWF2ZVB1c2guc2VuZCgpXG4gICAgaWYoIXRoaXMuY2FuUHVzaCgpKXsgbGVhdmVQdXNoLnRyaWdnZXIoXCJva1wiLCB7fSkgfVxuXG4gICAgcmV0dXJuIGxlYXZlUHVzaFxuICB9XG5cbiAgLyoqXG4gICAqIE92ZXJyaWRhYmxlIG1lc3NhZ2UgaG9va1xuICAgKlxuICAgKiBSZWNlaXZlcyBhbGwgZXZlbnRzIGZvciBzcGVjaWFsaXplZCBtZXNzYWdlIGhhbmRsaW5nXG4gICAqIGJlZm9yZSBkaXNwYXRjaGluZyB0byB0aGUgY2hhbm5lbCBjYWxsYmFja3MuXG4gICAqXG4gICAqIE11c3QgcmV0dXJuIHRoZSBwYXlsb2FkLCBtb2RpZmllZCBvciB1bm1vZGlmaWVkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFxuICAgKiBAcGFyYW0ge09iamVjdH0gcGF5bG9hZFxuICAgKiBAcGFyYW0ge2ludGVnZXJ9IHJlZlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgKi9cbiAgb25NZXNzYWdlKF9ldmVudCwgcGF5bG9hZCwgX3JlZil7IHJldHVybiBwYXlsb2FkIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGlzTGlmZWN5Y2xlRXZlbnQoZXZlbnQpeyByZXR1cm4gQ0hBTk5FTF9MSUZFQ1lDTEVfRVZFTlRTLmluZGV4T2YoZXZlbnQpID49IDAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaXNNZW1iZXIodG9waWMsIGV2ZW50LCBwYXlsb2FkLCBqb2luUmVmKXtcbiAgICBpZih0aGlzLnRvcGljICE9PSB0b3BpYyl7IHJldHVybiBmYWxzZSB9XG5cbiAgICBpZihqb2luUmVmICYmIGpvaW5SZWYgIT09IHRoaXMuam9pblJlZigpICYmIHRoaXMuaXNMaWZlY3ljbGVFdmVudChldmVudCkpe1xuICAgICAgaWYodGhpcy5zb2NrZXQuaGFzTG9nZ2VyKCkpIHRoaXMuc29ja2V0LmxvZyhcImNoYW5uZWxcIiwgXCJkcm9wcGluZyBvdXRkYXRlZCBtZXNzYWdlXCIsIHt0b3BpYywgZXZlbnQsIHBheWxvYWQsIGpvaW5SZWZ9KVxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBqb2luUmVmKCl7IHJldHVybiB0aGlzLmpvaW5QdXNoLnJlZiB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICByZWpvaW4odGltZW91dCA9IHRoaXMudGltZW91dCl7XG4gICAgaWYodGhpcy5pc0xlYXZpbmcoKSl7IHJldHVybiB9XG4gICAgdGhpcy5zb2NrZXQubGVhdmVPcGVuVG9waWModGhpcy50b3BpYylcbiAgICB0aGlzLnN0YXRlID0gQ0hBTk5FTF9TVEFURVMuam9pbmluZ1xuICAgIHRoaXMuam9pblB1c2gucmVzZW5kKHRpbWVvdXQpXG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRyaWdnZXIoZXZlbnQsIHBheWxvYWQsIHJlZiwgam9pblJlZil7XG4gICAgbGV0IGhhbmRsZWRQYXlsb2FkID0gdGhpcy5vbk1lc3NhZ2UoZXZlbnQsIHBheWxvYWQsIHJlZiwgam9pblJlZilcbiAgICBpZihwYXlsb2FkICYmICFoYW5kbGVkUGF5bG9hZCl7IHRocm93IG5ldyBFcnJvcihcImNoYW5uZWwgb25NZXNzYWdlIGNhbGxiYWNrcyBtdXN0IHJldHVybiB0aGUgcGF5bG9hZCwgbW9kaWZpZWQgb3IgdW5tb2RpZmllZFwiKSB9XG5cbiAgICBsZXQgZXZlbnRCaW5kaW5ncyA9IHRoaXMuYmluZGluZ3MuZmlsdGVyKGJpbmQgPT4gYmluZC5ldmVudCA9PT0gZXZlbnQpXG5cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgZXZlbnRCaW5kaW5ncy5sZW5ndGg7IGkrKyl7XG4gICAgICBsZXQgYmluZCA9IGV2ZW50QmluZGluZ3NbaV1cbiAgICAgIGJpbmQuY2FsbGJhY2soaGFuZGxlZFBheWxvYWQsIHJlZiwgam9pblJlZiB8fCB0aGlzLmpvaW5SZWYoKSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHJlcGx5RXZlbnROYW1lKHJlZil7IHJldHVybiBgY2hhbl9yZXBseV8ke3JlZn1gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGlzQ2xvc2VkKCl7IHJldHVybiB0aGlzLnN0YXRlID09PSBDSEFOTkVMX1NUQVRFUy5jbG9zZWQgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaXNFcnJvcmVkKCl7IHJldHVybiB0aGlzLnN0YXRlID09PSBDSEFOTkVMX1NUQVRFUy5lcnJvcmVkIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGlzSm9pbmVkKCl7IHJldHVybiB0aGlzLnN0YXRlID09PSBDSEFOTkVMX1NUQVRFUy5qb2luZWQgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaXNKb2luaW5nKCl7IHJldHVybiB0aGlzLnN0YXRlID09PSBDSEFOTkVMX1NUQVRFUy5qb2luaW5nIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGlzTGVhdmluZygpeyByZXR1cm4gdGhpcy5zdGF0ZSA9PT0gQ0hBTk5FTF9TVEFURVMubGVhdmluZyB9XG59XG4iLCAiaW1wb3J0IHtcbiAgZ2xvYmFsXG59IGZyb20gXCIuL2NvbnN0YW50c1wiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFqYXgge1xuICBjb25zdHJ1Y3Rvcigpe1xuICAgIHRoaXMuc3RhdGVzID0ge2NvbXBsZXRlOiA0fVxuICB9XG5cbiAgc3RhdGljIHJlcXVlc3QobWV0aG9kLCBlbmRQb2ludCwgYWNjZXB0LCBib2R5LCB0aW1lb3V0LCBvbnRpbWVvdXQsIGNhbGxiYWNrKXtcbiAgICBpZihnbG9iYWwuWERvbWFpblJlcXVlc3Qpe1xuICAgICAgbGV0IHJlcSA9IG5ldyBnbG9iYWwuWERvbWFpblJlcXVlc3QoKSAvLyBJRTgsIElFOVxuICAgICAgdGhpcy54ZG9tYWluUmVxdWVzdChyZXEsIG1ldGhvZCwgZW5kUG9pbnQsIGJvZHksIHRpbWVvdXQsIG9udGltZW91dCwgY2FsbGJhY2spXG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCByZXEgPSBuZXcgZ2xvYmFsLlhNTEh0dHBSZXF1ZXN0KCkgLy8gSUU3KywgRmlyZWZveCwgQ2hyb21lLCBPcGVyYSwgU2FmYXJpXG4gICAgICB0aGlzLnhoclJlcXVlc3QocmVxLCBtZXRob2QsIGVuZFBvaW50LCBhY2NlcHQsIGJvZHksIHRpbWVvdXQsIG9udGltZW91dCwgY2FsbGJhY2spXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHhkb21haW5SZXF1ZXN0KHJlcSwgbWV0aG9kLCBlbmRQb2ludCwgYm9keSwgdGltZW91dCwgb250aW1lb3V0LCBjYWxsYmFjayl7XG4gICAgcmVxLnRpbWVvdXQgPSB0aW1lb3V0XG4gICAgcmVxLm9wZW4obWV0aG9kLCBlbmRQb2ludClcbiAgICByZXEub25sb2FkID0gKCkgPT4ge1xuICAgICAgbGV0IHJlc3BvbnNlID0gdGhpcy5wYXJzZUpTT04ocmVxLnJlc3BvbnNlVGV4dClcbiAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKHJlc3BvbnNlKVxuICAgIH1cbiAgICBpZihvbnRpbWVvdXQpeyByZXEub250aW1lb3V0ID0gb250aW1lb3V0IH1cblxuICAgIC8vIFdvcmsgYXJvdW5kIGJ1ZyBpbiBJRTkgdGhhdCByZXF1aXJlcyBhbiBhdHRhY2hlZCBvbnByb2dyZXNzIGhhbmRsZXJcbiAgICByZXEub25wcm9ncmVzcyA9ICgpID0+IHsgfVxuXG4gICAgcmVxLnNlbmQoYm9keSlcbiAgfVxuXG4gIHN0YXRpYyB4aHJSZXF1ZXN0KHJlcSwgbWV0aG9kLCBlbmRQb2ludCwgYWNjZXB0LCBib2R5LCB0aW1lb3V0LCBvbnRpbWVvdXQsIGNhbGxiYWNrKXtcbiAgICByZXEub3BlbihtZXRob2QsIGVuZFBvaW50LCB0cnVlKVxuICAgIHJlcS50aW1lb3V0ID0gdGltZW91dFxuICAgIHJlcS5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIGFjY2VwdClcbiAgICByZXEub25lcnJvciA9ICgpID0+IHsgY2FsbGJhY2sgJiYgY2FsbGJhY2sobnVsbCkgfVxuICAgIHJlcS5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKSA9PiB7XG4gICAgICBpZihyZXEucmVhZHlTdGF0ZSA9PT0gdGhpcy5zdGF0ZXMuY29tcGxldGUgJiYgY2FsbGJhY2spe1xuICAgICAgICBsZXQgcmVzcG9uc2UgPSB0aGlzLnBhcnNlSlNPTihyZXEucmVzcG9uc2VUZXh0KVxuICAgICAgICBjYWxsYmFjayhyZXNwb25zZSlcbiAgICAgIH1cbiAgICB9XG4gICAgaWYob250aW1lb3V0KXsgcmVxLm9udGltZW91dCA9IG9udGltZW91dCB9XG5cbiAgICByZXEuc2VuZChib2R5KVxuICB9XG5cbiAgc3RhdGljIHBhcnNlSlNPTihyZXNwKXtcbiAgICBpZighcmVzcCB8fCByZXNwID09PSBcIlwiKXsgcmV0dXJuIG51bGwgfVxuXG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBKU09OLnBhcnNlKHJlc3ApXG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICBjb25zb2xlICYmIGNvbnNvbGUubG9nKFwiZmFpbGVkIHRvIHBhcnNlIEpTT04gcmVzcG9uc2VcIiwgcmVzcClcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHNlcmlhbGl6ZShvYmosIHBhcmVudEtleSl7XG4gICAgbGV0IHF1ZXJ5U3RyID0gW11cbiAgICBmb3IodmFyIGtleSBpbiBvYmope1xuICAgICAgaWYoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpeyBjb250aW51ZSB9XG4gICAgICBsZXQgcGFyYW1LZXkgPSBwYXJlbnRLZXkgPyBgJHtwYXJlbnRLZXl9WyR7a2V5fV1gIDoga2V5XG4gICAgICBsZXQgcGFyYW1WYWwgPSBvYmpba2V5XVxuICAgICAgaWYodHlwZW9mIHBhcmFtVmFsID09PSBcIm9iamVjdFwiKXtcbiAgICAgICAgcXVlcnlTdHIucHVzaCh0aGlzLnNlcmlhbGl6ZShwYXJhbVZhbCwgcGFyYW1LZXkpKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcXVlcnlTdHIucHVzaChlbmNvZGVVUklDb21wb25lbnQocGFyYW1LZXkpICsgXCI9XCIgKyBlbmNvZGVVUklDb21wb25lbnQocGFyYW1WYWwpKVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcXVlcnlTdHIuam9pbihcIiZcIilcbiAgfVxuXG4gIHN0YXRpYyBhcHBlbmRQYXJhbXModXJsLCBwYXJhbXMpe1xuICAgIGlmKE9iamVjdC5rZXlzKHBhcmFtcykubGVuZ3RoID09PSAwKXsgcmV0dXJuIHVybCB9XG5cbiAgICBsZXQgcHJlZml4ID0gdXJsLm1hdGNoKC9cXD8vKSA/IFwiJlwiIDogXCI/XCJcbiAgICByZXR1cm4gYCR7dXJsfSR7cHJlZml4fSR7dGhpcy5zZXJpYWxpemUocGFyYW1zKX1gXG4gIH1cbn1cbiIsICJpbXBvcnQge1xuICBTT0NLRVRfU1RBVEVTLFxuICBUUkFOU1BPUlRTXG59IGZyb20gXCIuL2NvbnN0YW50c1wiXG5cbmltcG9ydCBBamF4IGZyb20gXCIuL2FqYXhcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb25nUG9sbCB7XG5cbiAgY29uc3RydWN0b3IoZW5kUG9pbnQpe1xuICAgIHRoaXMuZW5kUG9pbnQgPSBudWxsXG4gICAgdGhpcy50b2tlbiA9IG51bGxcbiAgICB0aGlzLnNraXBIZWFydGJlYXQgPSB0cnVlXG4gICAgdGhpcy5vbm9wZW4gPSBmdW5jdGlvbiAoKXsgfSAvLyBub29wXG4gICAgdGhpcy5vbmVycm9yID0gZnVuY3Rpb24gKCl7IH0gLy8gbm9vcFxuICAgIHRoaXMub25tZXNzYWdlID0gZnVuY3Rpb24gKCl7IH0gLy8gbm9vcFxuICAgIHRoaXMub25jbG9zZSA9IGZ1bmN0aW9uICgpeyB9IC8vIG5vb3BcbiAgICB0aGlzLnBvbGxFbmRwb2ludCA9IHRoaXMubm9ybWFsaXplRW5kcG9pbnQoZW5kUG9pbnQpXG4gICAgdGhpcy5yZWFkeVN0YXRlID0gU09DS0VUX1NUQVRFUy5jb25uZWN0aW5nXG5cbiAgICB0aGlzLnBvbGwoKVxuICB9XG5cbiAgbm9ybWFsaXplRW5kcG9pbnQoZW5kUG9pbnQpe1xuICAgIHJldHVybiAoZW5kUG9pbnRcbiAgICAgIC5yZXBsYWNlKFwid3M6Ly9cIiwgXCJodHRwOi8vXCIpXG4gICAgICAucmVwbGFjZShcIndzczovL1wiLCBcImh0dHBzOi8vXCIpXG4gICAgICAucmVwbGFjZShuZXcgUmVnRXhwKFwiKC4qKVxcL1wiICsgVFJBTlNQT1JUUy53ZWJzb2NrZXQpLCBcIiQxL1wiICsgVFJBTlNQT1JUUy5sb25ncG9sbCkpXG4gIH1cblxuICBlbmRwb2ludFVSTCgpe1xuICAgIHJldHVybiBBamF4LmFwcGVuZFBhcmFtcyh0aGlzLnBvbGxFbmRwb2ludCwge3Rva2VuOiB0aGlzLnRva2VufSlcbiAgfVxuXG4gIGNsb3NlQW5kUmV0cnkoKXtcbiAgICB0aGlzLmNsb3NlKClcbiAgICB0aGlzLnJlYWR5U3RhdGUgPSBTT0NLRVRfU1RBVEVTLmNvbm5lY3RpbmdcbiAgfVxuXG4gIG9udGltZW91dCgpe1xuICAgIHRoaXMub25lcnJvcihcInRpbWVvdXRcIilcbiAgICB0aGlzLmNsb3NlQW5kUmV0cnkoKVxuICB9XG5cbiAgcG9sbCgpe1xuICAgIGlmKCEodGhpcy5yZWFkeVN0YXRlID09PSBTT0NLRVRfU1RBVEVTLm9wZW4gfHwgdGhpcy5yZWFkeVN0YXRlID09PSBTT0NLRVRfU1RBVEVTLmNvbm5lY3RpbmcpKXsgcmV0dXJuIH1cblxuICAgIEFqYXgucmVxdWVzdChcIkdFVFwiLCB0aGlzLmVuZHBvaW50VVJMKCksIFwiYXBwbGljYXRpb24vanNvblwiLCBudWxsLCB0aGlzLnRpbWVvdXQsIHRoaXMub250aW1lb3V0LmJpbmQodGhpcyksIChyZXNwKSA9PiB7XG4gICAgICBpZihyZXNwKXtcbiAgICAgICAgdmFyIHtzdGF0dXMsIHRva2VuLCBtZXNzYWdlc30gPSByZXNwXG4gICAgICAgIHRoaXMudG9rZW4gPSB0b2tlblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RhdHVzID0gMFxuICAgICAgfVxuXG4gICAgICBzd2l0Y2goc3RhdHVzKXtcbiAgICAgICAgY2FzZSAyMDA6XG4gICAgICAgICAgbWVzc2FnZXMuZm9yRWFjaChtc2cgPT4ge1xuICAgICAgICAgICAgLy8gVGFza3MgYXJlIHdoYXQgdGhpbmdzIGxpa2UgZXZlbnQgaGFuZGxlcnMsIHNldFRpbWVvdXQgY2FsbGJhY2tzLFxuICAgICAgICAgICAgLy8gcHJvbWlzZSByZXNvbHZlcyBhbmQgbW9yZSBhcmUgcnVuIHdpdGhpbi5cbiAgICAgICAgICAgIC8vIEluIG1vZGVybiBicm93c2VycywgdGhlcmUgYXJlIHR3byBkaWZmZXJlbnQga2luZHMgb2YgdGFza3MsXG4gICAgICAgICAgICAvLyBtaWNyb3Rhc2tzIGFuZCBtYWNyb3Rhc2tzLlxuICAgICAgICAgICAgLy8gTWljcm90YXNrcyBhcmUgbWFpbmx5IHVzZWQgZm9yIFByb21pc2VzLCB3aGlsZSBtYWNyb3Rhc2tzIGFyZVxuICAgICAgICAgICAgLy8gdXNlZCBmb3IgZXZlcnl0aGluZyBlbHNlLlxuICAgICAgICAgICAgLy8gTWljcm90YXNrcyBhbHdheXMgaGF2ZSBwcmlvcml0eSBvdmVyIG1hY3JvdGFza3MuIElmIHRoZSBKUyBlbmdpbmVcbiAgICAgICAgICAgIC8vIGlzIGxvb2tpbmcgZm9yIGEgdGFzayB0byBydW4sIGl0IHdpbGwgYWx3YXlzIHRyeSB0byBlbXB0eSB0aGVcbiAgICAgICAgICAgIC8vIG1pY3JvdGFzayBxdWV1ZSBiZWZvcmUgYXR0ZW1wdGluZyB0byBydW4gYW55dGhpbmcgZnJvbSB0aGVcbiAgICAgICAgICAgIC8vIG1hY3JvdGFzayBxdWV1ZS5cbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyBGb3IgdGhlIFdlYlNvY2tldCB0cmFuc3BvcnQsIG1lc3NhZ2VzIGFsd2F5cyBhcnJpdmUgaW4gdGhlaXIgb3duXG4gICAgICAgICAgICAvLyBldmVudC4gVGhpcyBtZWFucyB0aGF0IGlmIGFueSBwcm9taXNlcyBhcmUgcmVzb2x2ZWQgZnJvbSB3aXRoaW4sXG4gICAgICAgICAgICAvLyB0aGVpciBjYWxsYmFja3Mgd2lsbCBhbHdheXMgZmluaXNoIGV4ZWN1dGlvbiBieSB0aGUgdGltZSB0aGVcbiAgICAgICAgICAgIC8vIG5leHQgbWVzc2FnZSBldmVudCBoYW5kbGVyIGlzIHJ1bi5cbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyBJbiBvcmRlciB0byBlbXVsYXRlIHRoaXMgYmVoYXZpb3VyLCB3ZSBuZWVkIHRvIG1ha2Ugc3VyZSBlYWNoXG4gICAgICAgICAgICAvLyBvbm1lc3NhZ2UgaGFuZGxlciBpcyBydW4gd2l0aGluIGl0J3Mgb3duIG1hY3JvdGFzay5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLm9ubWVzc2FnZSh7ZGF0YTogbXNnfSlcbiAgICAgICAgICAgIH0sIDApXG4gICAgICAgICAgfSlcbiAgICAgICAgICB0aGlzLnBvbGwoKVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMjA0OlxuICAgICAgICAgIHRoaXMucG9sbCgpXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSA0MTA6XG4gICAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gU09DS0VUX1NUQVRFUy5vcGVuXG4gICAgICAgICAgdGhpcy5vbm9wZW4oKVxuICAgICAgICAgIHRoaXMucG9sbCgpXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSA0MDM6XG4gICAgICAgICAgdGhpcy5vbmVycm9yKClcbiAgICAgICAgICB0aGlzLmNsb3NlKClcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgIGNhc2UgNTAwOlxuICAgICAgICAgIHRoaXMub25lcnJvcigpXG4gICAgICAgICAgdGhpcy5jbG9zZUFuZFJldHJ5KClcbiAgICAgICAgICBicmVha1xuICAgICAgICBkZWZhdWx0OiB0aHJvdyBuZXcgRXJyb3IoYHVuaGFuZGxlZCBwb2xsIHN0YXR1cyAke3N0YXR1c31gKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBzZW5kKGJvZHkpe1xuICAgIEFqYXgucmVxdWVzdChcIlBPU1RcIiwgdGhpcy5lbmRwb2ludFVSTCgpLCBcImFwcGxpY2F0aW9uL2pzb25cIiwgYm9keSwgdGhpcy50aW1lb3V0LCB0aGlzLm9uZXJyb3IuYmluZCh0aGlzLCBcInRpbWVvdXRcIiksIChyZXNwKSA9PiB7XG4gICAgICBpZighcmVzcCB8fCByZXNwLnN0YXR1cyAhPT0gMjAwKXtcbiAgICAgICAgdGhpcy5vbmVycm9yKHJlc3AgJiYgcmVzcC5zdGF0dXMpXG4gICAgICAgIHRoaXMuY2xvc2VBbmRSZXRyeSgpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGNsb3NlKF9jb2RlLCBfcmVhc29uKXtcbiAgICB0aGlzLnJlYWR5U3RhdGUgPSBTT0NLRVRfU1RBVEVTLmNsb3NlZFxuICAgIHRoaXMub25jbG9zZSgpXG4gIH1cbn1cbiIsICIvKiBUaGUgZGVmYXVsdCBzZXJpYWxpemVyIGZvciBlbmNvZGluZyBhbmQgZGVjb2RpbmcgbWVzc2FnZXMgKi9cbmltcG9ydCB7XG4gIENIQU5ORUxfRVZFTlRTXG59IGZyb20gXCIuL2NvbnN0YW50c1wiXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgSEVBREVSX0xFTkdUSDogMSxcbiAgTUVUQV9MRU5HVEg6IDQsXG4gIEtJTkRTOiB7cHVzaDogMCwgcmVwbHk6IDEsIGJyb2FkY2FzdDogMn0sXG5cbiAgZW5jb2RlKG1zZywgY2FsbGJhY2spe1xuICAgIGlmKG1zZy5wYXlsb2FkLmNvbnN0cnVjdG9yID09PSBBcnJheUJ1ZmZlcil7XG4gICAgICByZXR1cm4gY2FsbGJhY2sodGhpcy5iaW5hcnlFbmNvZGUobXNnKSlcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHBheWxvYWQgPSBbbXNnLmpvaW5fcmVmLCBtc2cucmVmLCBtc2cudG9waWMsIG1zZy5ldmVudCwgbXNnLnBheWxvYWRdXG4gICAgICByZXR1cm4gY2FsbGJhY2soSlNPTi5zdHJpbmdpZnkocGF5bG9hZCkpXG4gICAgfVxuICB9LFxuXG4gIGRlY29kZShyYXdQYXlsb2FkLCBjYWxsYmFjayl7XG4gICAgaWYocmF3UGF5bG9hZC5jb25zdHJ1Y3RvciA9PT0gQXJyYXlCdWZmZXIpe1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKHRoaXMuYmluYXJ5RGVjb2RlKHJhd1BheWxvYWQpKVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgW2pvaW5fcmVmLCByZWYsIHRvcGljLCBldmVudCwgcGF5bG9hZF0gPSBKU09OLnBhcnNlKHJhd1BheWxvYWQpXG4gICAgICByZXR1cm4gY2FsbGJhY2soe2pvaW5fcmVmLCByZWYsIHRvcGljLCBldmVudCwgcGF5bG9hZH0pXG4gICAgfVxuICB9LFxuXG4gIC8vIHByaXZhdGVcblxuICBiaW5hcnlFbmNvZGUobWVzc2FnZSl7XG4gICAgbGV0IHtqb2luX3JlZiwgcmVmLCBldmVudCwgdG9waWMsIHBheWxvYWR9ID0gbWVzc2FnZVxuICAgIGxldCBtZXRhTGVuZ3RoID0gdGhpcy5NRVRBX0xFTkdUSCArIGpvaW5fcmVmLmxlbmd0aCArIHJlZi5sZW5ndGggKyB0b3BpYy5sZW5ndGggKyBldmVudC5sZW5ndGhcbiAgICBsZXQgaGVhZGVyID0gbmV3IEFycmF5QnVmZmVyKHRoaXMuSEVBREVSX0xFTkdUSCArIG1ldGFMZW5ndGgpXG4gICAgbGV0IHZpZXcgPSBuZXcgRGF0YVZpZXcoaGVhZGVyKVxuICAgIGxldCBvZmZzZXQgPSAwXG5cbiAgICB2aWV3LnNldFVpbnQ4KG9mZnNldCsrLCB0aGlzLktJTkRTLnB1c2gpIC8vIGtpbmRcbiAgICB2aWV3LnNldFVpbnQ4KG9mZnNldCsrLCBqb2luX3JlZi5sZW5ndGgpXG4gICAgdmlldy5zZXRVaW50OChvZmZzZXQrKywgcmVmLmxlbmd0aClcbiAgICB2aWV3LnNldFVpbnQ4KG9mZnNldCsrLCB0b3BpYy5sZW5ndGgpXG4gICAgdmlldy5zZXRVaW50OChvZmZzZXQrKywgZXZlbnQubGVuZ3RoKVxuICAgIEFycmF5LmZyb20oam9pbl9yZWYsIGNoYXIgPT4gdmlldy5zZXRVaW50OChvZmZzZXQrKywgY2hhci5jaGFyQ29kZUF0KDApKSlcbiAgICBBcnJheS5mcm9tKHJlZiwgY2hhciA9PiB2aWV3LnNldFVpbnQ4KG9mZnNldCsrLCBjaGFyLmNoYXJDb2RlQXQoMCkpKVxuICAgIEFycmF5LmZyb20odG9waWMsIGNoYXIgPT4gdmlldy5zZXRVaW50OChvZmZzZXQrKywgY2hhci5jaGFyQ29kZUF0KDApKSlcbiAgICBBcnJheS5mcm9tKGV2ZW50LCBjaGFyID0+IHZpZXcuc2V0VWludDgob2Zmc2V0KyssIGNoYXIuY2hhckNvZGVBdCgwKSkpXG5cbiAgICB2YXIgY29tYmluZWQgPSBuZXcgVWludDhBcnJheShoZWFkZXIuYnl0ZUxlbmd0aCArIHBheWxvYWQuYnl0ZUxlbmd0aClcbiAgICBjb21iaW5lZC5zZXQobmV3IFVpbnQ4QXJyYXkoaGVhZGVyKSwgMClcbiAgICBjb21iaW5lZC5zZXQobmV3IFVpbnQ4QXJyYXkocGF5bG9hZCksIGhlYWRlci5ieXRlTGVuZ3RoKVxuXG4gICAgcmV0dXJuIGNvbWJpbmVkLmJ1ZmZlclxuICB9LFxuXG4gIGJpbmFyeURlY29kZShidWZmZXIpe1xuICAgIGxldCB2aWV3ID0gbmV3IERhdGFWaWV3KGJ1ZmZlcilcbiAgICBsZXQga2luZCA9IHZpZXcuZ2V0VWludDgoMClcbiAgICBsZXQgZGVjb2RlciA9IG5ldyBUZXh0RGVjb2RlcigpXG4gICAgc3dpdGNoKGtpbmQpe1xuICAgICAgY2FzZSB0aGlzLktJTkRTLnB1c2g6IHJldHVybiB0aGlzLmRlY29kZVB1c2goYnVmZmVyLCB2aWV3LCBkZWNvZGVyKVxuICAgICAgY2FzZSB0aGlzLktJTkRTLnJlcGx5OiByZXR1cm4gdGhpcy5kZWNvZGVSZXBseShidWZmZXIsIHZpZXcsIGRlY29kZXIpXG4gICAgICBjYXNlIHRoaXMuS0lORFMuYnJvYWRjYXN0OiByZXR1cm4gdGhpcy5kZWNvZGVCcm9hZGNhc3QoYnVmZmVyLCB2aWV3LCBkZWNvZGVyKVxuICAgIH1cbiAgfSxcblxuICBkZWNvZGVQdXNoKGJ1ZmZlciwgdmlldywgZGVjb2Rlcil7XG4gICAgbGV0IGpvaW5SZWZTaXplID0gdmlldy5nZXRVaW50OCgxKVxuICAgIGxldCB0b3BpY1NpemUgPSB2aWV3LmdldFVpbnQ4KDIpXG4gICAgbGV0IGV2ZW50U2l6ZSA9IHZpZXcuZ2V0VWludDgoMylcbiAgICBsZXQgb2Zmc2V0ID0gdGhpcy5IRUFERVJfTEVOR1RIICsgdGhpcy5NRVRBX0xFTkdUSCAtIDEgLy8gcHVzaGVzIGhhdmUgbm8gcmVmXG4gICAgbGV0IGpvaW5SZWYgPSBkZWNvZGVyLmRlY29kZShidWZmZXIuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyBqb2luUmVmU2l6ZSkpXG4gICAgb2Zmc2V0ID0gb2Zmc2V0ICsgam9pblJlZlNpemVcbiAgICBsZXQgdG9waWMgPSBkZWNvZGVyLmRlY29kZShidWZmZXIuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyB0b3BpY1NpemUpKVxuICAgIG9mZnNldCA9IG9mZnNldCArIHRvcGljU2l6ZVxuICAgIGxldCBldmVudCA9IGRlY29kZXIuZGVjb2RlKGJ1ZmZlci5zbGljZShvZmZzZXQsIG9mZnNldCArIGV2ZW50U2l6ZSkpXG4gICAgb2Zmc2V0ID0gb2Zmc2V0ICsgZXZlbnRTaXplXG4gICAgbGV0IGRhdGEgPSBidWZmZXIuc2xpY2Uob2Zmc2V0LCBidWZmZXIuYnl0ZUxlbmd0aClcbiAgICByZXR1cm4ge2pvaW5fcmVmOiBqb2luUmVmLCByZWY6IG51bGwsIHRvcGljOiB0b3BpYywgZXZlbnQ6IGV2ZW50LCBwYXlsb2FkOiBkYXRhfVxuICB9LFxuXG4gIGRlY29kZVJlcGx5KGJ1ZmZlciwgdmlldywgZGVjb2Rlcil7XG4gICAgbGV0IGpvaW5SZWZTaXplID0gdmlldy5nZXRVaW50OCgxKVxuICAgIGxldCByZWZTaXplID0gdmlldy5nZXRVaW50OCgyKVxuICAgIGxldCB0b3BpY1NpemUgPSB2aWV3LmdldFVpbnQ4KDMpXG4gICAgbGV0IGV2ZW50U2l6ZSA9IHZpZXcuZ2V0VWludDgoNClcbiAgICBsZXQgb2Zmc2V0ID0gdGhpcy5IRUFERVJfTEVOR1RIICsgdGhpcy5NRVRBX0xFTkdUSFxuICAgIGxldCBqb2luUmVmID0gZGVjb2Rlci5kZWNvZGUoYnVmZmVyLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgam9pblJlZlNpemUpKVxuICAgIG9mZnNldCA9IG9mZnNldCArIGpvaW5SZWZTaXplXG4gICAgbGV0IHJlZiA9IGRlY29kZXIuZGVjb2RlKGJ1ZmZlci5zbGljZShvZmZzZXQsIG9mZnNldCArIHJlZlNpemUpKVxuICAgIG9mZnNldCA9IG9mZnNldCArIHJlZlNpemVcbiAgICBsZXQgdG9waWMgPSBkZWNvZGVyLmRlY29kZShidWZmZXIuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyB0b3BpY1NpemUpKVxuICAgIG9mZnNldCA9IG9mZnNldCArIHRvcGljU2l6ZVxuICAgIGxldCBldmVudCA9IGRlY29kZXIuZGVjb2RlKGJ1ZmZlci5zbGljZShvZmZzZXQsIG9mZnNldCArIGV2ZW50U2l6ZSkpXG4gICAgb2Zmc2V0ID0gb2Zmc2V0ICsgZXZlbnRTaXplXG4gICAgbGV0IGRhdGEgPSBidWZmZXIuc2xpY2Uob2Zmc2V0LCBidWZmZXIuYnl0ZUxlbmd0aClcbiAgICBsZXQgcGF5bG9hZCA9IHtzdGF0dXM6IGV2ZW50LCByZXNwb25zZTogZGF0YX1cbiAgICByZXR1cm4ge2pvaW5fcmVmOiBqb2luUmVmLCByZWY6IHJlZiwgdG9waWM6IHRvcGljLCBldmVudDogQ0hBTk5FTF9FVkVOVFMucmVwbHksIHBheWxvYWQ6IHBheWxvYWR9XG4gIH0sXG5cbiAgZGVjb2RlQnJvYWRjYXN0KGJ1ZmZlciwgdmlldywgZGVjb2Rlcil7XG4gICAgbGV0IHRvcGljU2l6ZSA9IHZpZXcuZ2V0VWludDgoMSlcbiAgICBsZXQgZXZlbnRTaXplID0gdmlldy5nZXRVaW50OCgyKVxuICAgIGxldCBvZmZzZXQgPSB0aGlzLkhFQURFUl9MRU5HVEggKyAyXG4gICAgbGV0IHRvcGljID0gZGVjb2Rlci5kZWNvZGUoYnVmZmVyLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgdG9waWNTaXplKSlcbiAgICBvZmZzZXQgPSBvZmZzZXQgKyB0b3BpY1NpemVcbiAgICBsZXQgZXZlbnQgPSBkZWNvZGVyLmRlY29kZShidWZmZXIuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyBldmVudFNpemUpKVxuICAgIG9mZnNldCA9IG9mZnNldCArIGV2ZW50U2l6ZVxuICAgIGxldCBkYXRhID0gYnVmZmVyLnNsaWNlKG9mZnNldCwgYnVmZmVyLmJ5dGVMZW5ndGgpXG5cbiAgICByZXR1cm4ge2pvaW5fcmVmOiBudWxsLCByZWY6IG51bGwsIHRvcGljOiB0b3BpYywgZXZlbnQ6IGV2ZW50LCBwYXlsb2FkOiBkYXRhfVxuICB9XG59XG4iLCAiLyoqIEluaXRpYWxpemVzIHRoZSBTb2NrZXQgKlxuICpcbiAqIEZvciBJRTggc3VwcG9ydCB1c2UgYW4gRVM1LXNoaW0gKGh0dHBzOi8vZ2l0aHViLmNvbS9lcy1zaGltcy9lczUtc2hpbSlcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZW5kUG9pbnQgLSBUaGUgc3RyaW5nIFdlYlNvY2tldCBlbmRwb2ludCwgaWUsIGBcIndzOi8vZXhhbXBsZS5jb20vc29ja2V0XCJgLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBcIndzczovL2V4YW1wbGUuY29tXCJgXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYFwiL3NvY2tldFwiYCAoaW5oZXJpdGVkIGhvc3QgJiBwcm90b2NvbClcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0c10gLSBPcHRpb25hbCBjb25maWd1cmF0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0cy50cmFuc3BvcnRdIC0gVGhlIFdlYnNvY2tldCBUcmFuc3BvcnQsIGZvciBleGFtcGxlIFdlYlNvY2tldCBvciBQaG9lbml4LkxvbmdQb2xsLlxuICpcbiAqIERlZmF1bHRzIHRvIFdlYlNvY2tldCB3aXRoIGF1dG9tYXRpYyBMb25nUG9sbCBmYWxsYmFjay5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRzLmVuY29kZV0gLSBUaGUgZnVuY3Rpb24gdG8gZW5jb2RlIG91dGdvaW5nIG1lc3NhZ2VzLlxuICpcbiAqIERlZmF1bHRzIHRvIEpTT04gZW5jb2Rlci5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0cy5kZWNvZGVdIC0gVGhlIGZ1bmN0aW9uIHRvIGRlY29kZSBpbmNvbWluZyBtZXNzYWdlcy5cbiAqXG4gKiBEZWZhdWx0cyB0byBKU09OOlxuICpcbiAqIGBgYGphdmFzY3JpcHRcbiAqIChwYXlsb2FkLCBjYWxsYmFjaykgPT4gY2FsbGJhY2soSlNPTi5wYXJzZShwYXlsb2FkKSlcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0cy50aW1lb3V0XSAtIFRoZSBkZWZhdWx0IHRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzIHRvIHRyaWdnZXIgcHVzaCB0aW1lb3V0cy5cbiAqXG4gKiBEZWZhdWx0cyBgREVGQVVMVF9USU1FT1VUYFxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRzLmhlYXJ0YmVhdEludGVydmFsTXNdIC0gVGhlIG1pbGxpc2VjIGludGVydmFsIHRvIHNlbmQgYSBoZWFydGJlYXQgbWVzc2FnZVxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRzLnJlY29ubmVjdEFmdGVyTXNdIC0gVGhlIG9wdGlvbmFsIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgbWlsbHNlY1xuICogc29ja2V0IHJlY29ubmVjdCBpbnRlcnZhbC5cbiAqXG4gKiBEZWZhdWx0cyB0byBzdGVwcGVkIGJhY2tvZmYgb2Y6XG4gKlxuICogYGBgamF2YXNjcmlwdFxuICogZnVuY3Rpb24odHJpZXMpe1xuICogICByZXR1cm4gWzEwLCA1MCwgMTAwLCAxNTAsIDIwMCwgMjUwLCA1MDAsIDEwMDAsIDIwMDBdW3RyaWVzIC0gMV0gfHwgNTAwMFxuICogfVxuICogYGBgYFxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0cy5yZWpvaW5BZnRlck1zXSAtIFRoZSBvcHRpb25hbCBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIG1pbGxzZWNcbiAqIHJlam9pbiBpbnRlcnZhbCBmb3IgaW5kaXZpZHVhbCBjaGFubmVscy5cbiAqXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiBmdW5jdGlvbih0cmllcyl7XG4gKiAgIHJldHVybiBbMTAwMCwgMjAwMCwgNTAwMF1bdHJpZXMgLSAxXSB8fCAxMDAwMFxuICogfVxuICogYGBgYFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRzLmxvZ2dlcl0gLSBUaGUgb3B0aW9uYWwgZnVuY3Rpb24gZm9yIHNwZWNpYWxpemVkIGxvZ2dpbmcsIGllOlxuICpcbiAqIGBgYGphdmFzY3JpcHRcbiAqIGZ1bmN0aW9uKGtpbmQsIG1zZywgZGF0YSkge1xuICogICBjb25zb2xlLmxvZyhgJHtraW5kfTogJHttc2d9YCwgZGF0YSlcbiAqIH1cbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0cy5sb25ncG9sbGVyVGltZW91dF0gLSBUaGUgbWF4aW11bSB0aW1lb3V0IG9mIGEgbG9uZyBwb2xsIEFKQVggcmVxdWVzdC5cbiAqXG4gKiBEZWZhdWx0cyB0byAyMHMgKGRvdWJsZSB0aGUgc2VydmVyIGxvbmcgcG9sbCB0aW1lcikuXG4gKlxuICogQHBhcmFtIHt7T2JqZWN0fGZ1bmN0aW9uKX0gW29wdHMucGFyYW1zXSAtIFRoZSBvcHRpb25hbCBwYXJhbXMgdG8gcGFzcyB3aGVuIGNvbm5lY3RpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0cy5iaW5hcnlUeXBlXSAtIFRoZSBiaW5hcnkgdHlwZSB0byB1c2UgZm9yIGJpbmFyeSBXZWJTb2NrZXQgZnJhbWVzLlxuICpcbiAqIERlZmF1bHRzIHRvIFwiYXJyYXlidWZmZXJcIlxuICpcbiAqIEBwYXJhbSB7dnNufSBbb3B0cy52c25dIC0gVGhlIHNlcmlhbGl6ZXIncyBwcm90b2NvbCB2ZXJzaW9uIHRvIHNlbmQgb24gY29ubmVjdC5cbiAqXG4gKiBEZWZhdWx0cyB0byBERUZBVUxUX1ZTTi5cbiovXG5cbmltcG9ydCB7XG4gIGdsb2JhbCxcbiAgcGh4V2luZG93LFxuICBDSEFOTkVMX0VWRU5UUyxcbiAgREVGQVVMVF9USU1FT1VULFxuICBERUZBVUxUX1ZTTixcbiAgU09DS0VUX1NUQVRFUyxcbiAgVFJBTlNQT1JUUyxcbiAgV1NfQ0xPU0VfTk9STUFMXG59IGZyb20gXCIuL2NvbnN0YW50c1wiXG5cbmltcG9ydCB7XG4gIGNsb3N1cmVcbn0gZnJvbSBcIi4vdXRpbHNcIlxuXG5pbXBvcnQgQWpheCBmcm9tIFwiLi9hamF4XCJcbmltcG9ydCBDaGFubmVsIGZyb20gXCIuL2NoYW5uZWxcIlxuaW1wb3J0IExvbmdQb2xsIGZyb20gXCIuL2xvbmdwb2xsXCJcbmltcG9ydCBTZXJpYWxpemVyIGZyb20gXCIuL3NlcmlhbGl6ZXJcIlxuaW1wb3J0IFRpbWVyIGZyb20gXCIuL3RpbWVyXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU29ja2V0IHtcbiAgY29uc3RydWN0b3IoZW5kUG9pbnQsIG9wdHMgPSB7fSl7XG4gICAgdGhpcy5zdGF0ZUNoYW5nZUNhbGxiYWNrcyA9IHtvcGVuOiBbXSwgY2xvc2U6IFtdLCBlcnJvcjogW10sIG1lc3NhZ2U6IFtdfVxuICAgIHRoaXMuY2hhbm5lbHMgPSBbXVxuICAgIHRoaXMuc2VuZEJ1ZmZlciA9IFtdXG4gICAgdGhpcy5yZWYgPSAwXG4gICAgdGhpcy50aW1lb3V0ID0gb3B0cy50aW1lb3V0IHx8IERFRkFVTFRfVElNRU9VVFxuICAgIHRoaXMudHJhbnNwb3J0ID0gb3B0cy50cmFuc3BvcnQgfHwgZ2xvYmFsLldlYlNvY2tldCB8fCBMb25nUG9sbFxuICAgIHRoaXMuZXN0YWJsaXNoZWRDb25uZWN0aW9ucyA9IDBcbiAgICB0aGlzLmRlZmF1bHRFbmNvZGVyID0gU2VyaWFsaXplci5lbmNvZGUuYmluZChTZXJpYWxpemVyKVxuICAgIHRoaXMuZGVmYXVsdERlY29kZXIgPSBTZXJpYWxpemVyLmRlY29kZS5iaW5kKFNlcmlhbGl6ZXIpXG4gICAgdGhpcy5jbG9zZVdhc0NsZWFuID0gZmFsc2VcbiAgICB0aGlzLmJpbmFyeVR5cGUgPSBvcHRzLmJpbmFyeVR5cGUgfHwgXCJhcnJheWJ1ZmZlclwiXG4gICAgdGhpcy5jb25uZWN0Q2xvY2sgPSAxXG4gICAgaWYodGhpcy50cmFuc3BvcnQgIT09IExvbmdQb2xsKXtcbiAgICAgIHRoaXMuZW5jb2RlID0gb3B0cy5lbmNvZGUgfHwgdGhpcy5kZWZhdWx0RW5jb2RlclxuICAgICAgdGhpcy5kZWNvZGUgPSBvcHRzLmRlY29kZSB8fCB0aGlzLmRlZmF1bHREZWNvZGVyXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZW5jb2RlID0gdGhpcy5kZWZhdWx0RW5jb2RlclxuICAgICAgdGhpcy5kZWNvZGUgPSB0aGlzLmRlZmF1bHREZWNvZGVyXG4gICAgfVxuICAgIGxldCBhd2FpdGluZ0Nvbm5lY3Rpb25PblBhZ2VTaG93ID0gbnVsbFxuICAgIGlmKHBoeFdpbmRvdyAmJiBwaHhXaW5kb3cuYWRkRXZlbnRMaXN0ZW5lcil7XG4gICAgICBwaHhXaW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBhZ2VoaWRlXCIsIF9lID0+IHtcbiAgICAgICAgaWYodGhpcy5jb25uKXtcbiAgICAgICAgICB0aGlzLmRpc2Nvbm5lY3QoKVxuICAgICAgICAgIGF3YWl0aW5nQ29ubmVjdGlvbk9uUGFnZVNob3cgPSB0aGlzLmNvbm5lY3RDbG9ja1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgcGh4V2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwYWdlc2hvd1wiLCBfZSA9PiB7XG4gICAgICAgIGlmKGF3YWl0aW5nQ29ubmVjdGlvbk9uUGFnZVNob3cgPT09IHRoaXMuY29ubmVjdENsb2NrKXtcbiAgICAgICAgICBhd2FpdGluZ0Nvbm5lY3Rpb25PblBhZ2VTaG93ID0gbnVsbFxuICAgICAgICAgIHRoaXMuY29ubmVjdCgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIHRoaXMuaGVhcnRiZWF0SW50ZXJ2YWxNcyA9IG9wdHMuaGVhcnRiZWF0SW50ZXJ2YWxNcyB8fCAzMDAwMFxuICAgIHRoaXMucmVqb2luQWZ0ZXJNcyA9ICh0cmllcykgPT4ge1xuICAgICAgaWYob3B0cy5yZWpvaW5BZnRlck1zKXtcbiAgICAgICAgcmV0dXJuIG9wdHMucmVqb2luQWZ0ZXJNcyh0cmllcylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBbMTAwMCwgMjAwMCwgNTAwMF1bdHJpZXMgLSAxXSB8fCAxMDAwMFxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnJlY29ubmVjdEFmdGVyTXMgPSAodHJpZXMpID0+IHtcbiAgICAgIGlmKG9wdHMucmVjb25uZWN0QWZ0ZXJNcyl7XG4gICAgICAgIHJldHVybiBvcHRzLnJlY29ubmVjdEFmdGVyTXModHJpZXMpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gWzEwLCA1MCwgMTAwLCAxNTAsIDIwMCwgMjUwLCA1MDAsIDEwMDAsIDIwMDBdW3RyaWVzIC0gMV0gfHwgNTAwMFxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmxvZ2dlciA9IG9wdHMubG9nZ2VyIHx8IG51bGxcbiAgICB0aGlzLmxvbmdwb2xsZXJUaW1lb3V0ID0gb3B0cy5sb25ncG9sbGVyVGltZW91dCB8fCAyMDAwMFxuICAgIHRoaXMucGFyYW1zID0gY2xvc3VyZShvcHRzLnBhcmFtcyB8fCB7fSlcbiAgICB0aGlzLmVuZFBvaW50ID0gYCR7ZW5kUG9pbnR9LyR7VFJBTlNQT1JUUy53ZWJzb2NrZXR9YFxuICAgIHRoaXMudnNuID0gb3B0cy52c24gfHwgREVGQVVMVF9WU05cbiAgICB0aGlzLmhlYXJ0YmVhdFRpbWVyID0gbnVsbFxuICAgIHRoaXMucGVuZGluZ0hlYXJ0YmVhdFJlZiA9IG51bGxcbiAgICB0aGlzLnJlY29ubmVjdFRpbWVyID0gbmV3IFRpbWVyKCgpID0+IHtcbiAgICAgIHRoaXMudGVhcmRvd24oKCkgPT4gdGhpcy5jb25uZWN0KCkpXG4gICAgfSwgdGhpcy5yZWNvbm5lY3RBZnRlck1zKVxuICB9XG5cbiAgLyoqXG4gICAqIERpc2Nvbm5lY3RzIGFuZCByZXBsYWNlcyB0aGUgYWN0aXZlIHRyYW5zcG9ydFxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBuZXdUcmFuc3BvcnQgLSBUaGUgbmV3IHRyYW5zcG9ydCBjbGFzcyB0byBpbnN0YW50aWF0ZVxuICAgKlxuICAgKi9cbiAgcmVwbGFjZVRyYW5zcG9ydChuZXdUcmFuc3BvcnQpe1xuICAgIHRoaXMuZGlzY29ubmVjdCgpXG4gICAgdGhpcy50cmFuc3BvcnQgPSBuZXdUcmFuc3BvcnRcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBzb2NrZXQgcHJvdG9jb2xcbiAgICpcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIHByb3RvY29sKCl7IHJldHVybiBsb2NhdGlvbi5wcm90b2NvbC5tYXRjaCgvXmh0dHBzLykgPyBcIndzc1wiIDogXCJ3c1wiIH1cblxuICAvKipcbiAgICogVGhlIGZ1bGx5IHF1YWxpZmVkIHNvY2tldCB1cmxcbiAgICpcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIGVuZFBvaW50VVJMKCl7XG4gICAgbGV0IHVyaSA9IEFqYXguYXBwZW5kUGFyYW1zKFxuICAgICAgQWpheC5hcHBlbmRQYXJhbXModGhpcy5lbmRQb2ludCwgdGhpcy5wYXJhbXMoKSksIHt2c246IHRoaXMudnNufSlcbiAgICBpZih1cmkuY2hhckF0KDApICE9PSBcIi9cIil7IHJldHVybiB1cmkgfVxuICAgIGlmKHVyaS5jaGFyQXQoMSkgPT09IFwiL1wiKXsgcmV0dXJuIGAke3RoaXMucHJvdG9jb2woKX06JHt1cml9YCB9XG5cbiAgICByZXR1cm4gYCR7dGhpcy5wcm90b2NvbCgpfTovLyR7bG9jYXRpb24uaG9zdH0ke3VyaX1gXG4gIH1cblxuICAvKipcbiAgICogRGlzY29ubmVjdHMgdGhlIHNvY2tldFxuICAgKlxuICAgKiBTZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0Nsb3NlRXZlbnQjU3RhdHVzX2NvZGVzIGZvciB2YWxpZCBzdGF0dXMgY29kZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gT3B0aW9uYWwgY2FsbGJhY2sgd2hpY2ggaXMgY2FsbGVkIGFmdGVyIHNvY2tldCBpcyBkaXNjb25uZWN0ZWQuXG4gICAqIEBwYXJhbSB7aW50ZWdlcn0gY29kZSAtIEEgc3RhdHVzIGNvZGUgZm9yIGRpc2Nvbm5lY3Rpb24gKE9wdGlvbmFsKS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlYXNvbiAtIEEgdGV4dHVhbCBkZXNjcmlwdGlvbiBvZiB0aGUgcmVhc29uIHRvIGRpc2Nvbm5lY3QuIChPcHRpb25hbClcbiAgICovXG4gIGRpc2Nvbm5lY3QoY2FsbGJhY2ssIGNvZGUsIHJlYXNvbil7XG4gICAgdGhpcy5jb25uZWN0Q2xvY2srK1xuICAgIHRoaXMuY2xvc2VXYXNDbGVhbiA9IHRydWVcbiAgICB0aGlzLnJlY29ubmVjdFRpbWVyLnJlc2V0KClcbiAgICB0aGlzLnRlYXJkb3duKGNhbGxiYWNrLCBjb2RlLCByZWFzb24pXG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyAtIFRoZSBwYXJhbXMgdG8gc2VuZCB3aGVuIGNvbm5lY3RpbmcsIGZvciBleGFtcGxlIGB7dXNlcl9pZDogdXNlclRva2VufWBcbiAgICpcbiAgICogUGFzc2luZyBwYXJhbXMgdG8gY29ubmVjdCBpcyBkZXByZWNhdGVkOyBwYXNzIHRoZW0gaW4gdGhlIFNvY2tldCBjb25zdHJ1Y3RvciBpbnN0ZWFkOlxuICAgKiBgbmV3IFNvY2tldChcIi9zb2NrZXRcIiwge3BhcmFtczoge3VzZXJfaWQ6IHVzZXJUb2tlbn19KWAuXG4gICAqL1xuICBjb25uZWN0KHBhcmFtcyl7XG4gICAgdGhpcy5jb25uZWN0Q2xvY2srK1xuICAgIGlmKHBhcmFtcyl7XG4gICAgICBjb25zb2xlICYmIGNvbnNvbGUubG9nKFwicGFzc2luZyBwYXJhbXMgdG8gY29ubmVjdCBpcyBkZXByZWNhdGVkLiBJbnN0ZWFkIHBhc3MgOnBhcmFtcyB0byB0aGUgU29ja2V0IGNvbnN0cnVjdG9yXCIpXG4gICAgICB0aGlzLnBhcmFtcyA9IGNsb3N1cmUocGFyYW1zKVxuICAgIH1cbiAgICBpZih0aGlzLmNvbm4peyByZXR1cm4gfVxuICAgIHRoaXMuY2xvc2VXYXNDbGVhbiA9IGZhbHNlXG4gICAgdGhpcy5jb25uID0gbmV3IHRoaXMudHJhbnNwb3J0KHRoaXMuZW5kUG9pbnRVUkwoKSlcbiAgICB0aGlzLmNvbm4uYmluYXJ5VHlwZSA9IHRoaXMuYmluYXJ5VHlwZVxuICAgIHRoaXMuY29ubi50aW1lb3V0ID0gdGhpcy5sb25ncG9sbGVyVGltZW91dFxuICAgIHRoaXMuY29ubi5vbm9wZW4gPSAoKSA9PiB0aGlzLm9uQ29ubk9wZW4oKVxuICAgIHRoaXMuY29ubi5vbmVycm9yID0gZXJyb3IgPT4gdGhpcy5vbkNvbm5FcnJvcihlcnJvcilcbiAgICB0aGlzLmNvbm4ub25tZXNzYWdlID0gZXZlbnQgPT4gdGhpcy5vbkNvbm5NZXNzYWdlKGV2ZW50KVxuICAgIHRoaXMuY29ubi5vbmNsb3NlID0gZXZlbnQgPT4gdGhpcy5vbkNvbm5DbG9zZShldmVudClcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2dzIHRoZSBtZXNzYWdlLiBPdmVycmlkZSBgdGhpcy5sb2dnZXJgIGZvciBzcGVjaWFsaXplZCBsb2dnaW5nLiBub29wcyBieSBkZWZhdWx0XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBraW5kXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtc2dcbiAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICovXG4gIGxvZyhraW5kLCBtc2csIGRhdGEpeyB0aGlzLmxvZ2dlcihraW5kLCBtc2csIGRhdGEpIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIGEgbG9nZ2VyIGhhcyBiZWVuIHNldCBvbiB0aGlzIHNvY2tldC5cbiAgICovXG4gIGhhc0xvZ2dlcigpeyByZXR1cm4gdGhpcy5sb2dnZXIgIT09IG51bGwgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgY2FsbGJhY2tzIGZvciBjb25uZWN0aW9uIG9wZW4gZXZlbnRzXG4gICAqXG4gICAqIEBleGFtcGxlIHNvY2tldC5vbk9wZW4oZnVuY3Rpb24oKXsgY29uc29sZS5pbmZvKFwidGhlIHNvY2tldCB3YXMgb3BlbmVkXCIpIH0pXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAqL1xuICBvbk9wZW4oY2FsbGJhY2spe1xuICAgIGxldCByZWYgPSB0aGlzLm1ha2VSZWYoKVxuICAgIHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3Mub3Blbi5wdXNoKFtyZWYsIGNhbGxiYWNrXSlcbiAgICByZXR1cm4gcmVmXG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGNhbGxiYWNrcyBmb3IgY29ubmVjdGlvbiBjbG9zZSBldmVudHNcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICovXG4gIG9uQ2xvc2UoY2FsbGJhY2spe1xuICAgIGxldCByZWYgPSB0aGlzLm1ha2VSZWYoKVxuICAgIHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3MuY2xvc2UucHVzaChbcmVmLCBjYWxsYmFja10pXG4gICAgcmV0dXJuIHJlZlxuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBjYWxsYmFja3MgZm9yIGNvbm5lY3Rpb24gZXJyb3IgZXZlbnRzXG4gICAqXG4gICAqIEBleGFtcGxlIHNvY2tldC5vbkVycm9yKGZ1bmN0aW9uKGVycm9yKXsgYWxlcnQoXCJBbiBlcnJvciBvY2N1cnJlZFwiKSB9KVxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgKi9cbiAgb25FcnJvcihjYWxsYmFjayl7XG4gICAgbGV0IHJlZiA9IHRoaXMubWFrZVJlZigpXG4gICAgdGhpcy5zdGF0ZUNoYW5nZUNhbGxiYWNrcy5lcnJvci5wdXNoKFtyZWYsIGNhbGxiYWNrXSlcbiAgICByZXR1cm4gcmVmXG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGNhbGxiYWNrcyBmb3IgY29ubmVjdGlvbiBtZXNzYWdlIGV2ZW50c1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgKi9cbiAgb25NZXNzYWdlKGNhbGxiYWNrKXtcbiAgICBsZXQgcmVmID0gdGhpcy5tYWtlUmVmKClcbiAgICB0aGlzLnN0YXRlQ2hhbmdlQ2FsbGJhY2tzLm1lc3NhZ2UucHVzaChbcmVmLCBjYWxsYmFja10pXG4gICAgcmV0dXJuIHJlZlxuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBvbkNvbm5PcGVuKCl7XG4gICAgaWYodGhpcy5oYXNMb2dnZXIoKSkgdGhpcy5sb2coXCJ0cmFuc3BvcnRcIiwgYGNvbm5lY3RlZCB0byAke3RoaXMuZW5kUG9pbnRVUkwoKX1gKVxuICAgIHRoaXMuY2xvc2VXYXNDbGVhbiA9IGZhbHNlXG4gICAgdGhpcy5lc3RhYmxpc2hlZENvbm5lY3Rpb25zKytcbiAgICB0aGlzLmZsdXNoU2VuZEJ1ZmZlcigpXG4gICAgdGhpcy5yZWNvbm5lY3RUaW1lci5yZXNldCgpXG4gICAgdGhpcy5yZXNldEhlYXJ0YmVhdCgpXG4gICAgdGhpcy5zdGF0ZUNoYW5nZUNhbGxiYWNrcy5vcGVuLmZvckVhY2goKFssIGNhbGxiYWNrXSkgPT4gY2FsbGJhY2soKSlcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cblxuICBoZWFydGJlYXRUaW1lb3V0KCl7XG4gICAgaWYodGhpcy5wZW5kaW5nSGVhcnRiZWF0UmVmKXtcbiAgICAgIHRoaXMucGVuZGluZ0hlYXJ0YmVhdFJlZiA9IG51bGxcbiAgICAgIGlmKHRoaXMuaGFzTG9nZ2VyKCkpeyB0aGlzLmxvZyhcInRyYW5zcG9ydFwiLCBcImhlYXJ0YmVhdCB0aW1lb3V0LiBBdHRlbXB0aW5nIHRvIHJlLWVzdGFibGlzaCBjb25uZWN0aW9uXCIpIH1cbiAgICAgIHRoaXMuYWJub3JtYWxDbG9zZShcImhlYXJ0YmVhdCB0aW1lb3V0XCIpXG4gICAgfVxuICB9XG5cbiAgcmVzZXRIZWFydGJlYXQoKXtcbiAgICBpZih0aGlzLmNvbm4gJiYgdGhpcy5jb25uLnNraXBIZWFydGJlYXQpeyByZXR1cm4gfVxuICAgIHRoaXMucGVuZGluZ0hlYXJ0YmVhdFJlZiA9IG51bGxcbiAgICBjbGVhclRpbWVvdXQodGhpcy5oZWFydGJlYXRUaW1lcilcbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuc2VuZEhlYXJ0YmVhdCgpLCB0aGlzLmhlYXJ0YmVhdEludGVydmFsTXMpXG4gIH1cblxuICB0ZWFyZG93bihjYWxsYmFjaywgY29kZSwgcmVhc29uKXtcbiAgICBpZighdGhpcy5jb25uKXtcbiAgICAgIHJldHVybiBjYWxsYmFjayAmJiBjYWxsYmFjaygpXG4gICAgfVxuXG4gICAgdGhpcy53YWl0Rm9yQnVmZmVyRG9uZSgoKSA9PiB7XG4gICAgICBpZih0aGlzLmNvbm4pe1xuICAgICAgICBpZihjb2RlKXsgdGhpcy5jb25uLmNsb3NlKGNvZGUsIHJlYXNvbiB8fCBcIlwiKSB9IGVsc2UgeyB0aGlzLmNvbm4uY2xvc2UoKSB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMud2FpdEZvclNvY2tldENsb3NlZCgoKSA9PiB7XG4gICAgICAgIGlmKHRoaXMuY29ubil7XG4gICAgICAgICAgdGhpcy5jb25uLm9uY2xvc2UgPSBmdW5jdGlvbiAoKXsgfSAvLyBub29wXG4gICAgICAgICAgdGhpcy5jb25uID0gbnVsbFxuICAgICAgICB9XG5cbiAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgd2FpdEZvckJ1ZmZlckRvbmUoY2FsbGJhY2ssIHRyaWVzID0gMSl7XG4gICAgaWYodHJpZXMgPT09IDUgfHwgIXRoaXMuY29ubiB8fCAhdGhpcy5jb25uLmJ1ZmZlcmVkQW1vdW50KXtcbiAgICAgIGNhbGxiYWNrKClcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy53YWl0Rm9yQnVmZmVyRG9uZShjYWxsYmFjaywgdHJpZXMgKyAxKVxuICAgIH0sIDE1MCAqIHRyaWVzKVxuICB9XG5cbiAgd2FpdEZvclNvY2tldENsb3NlZChjYWxsYmFjaywgdHJpZXMgPSAxKXtcbiAgICBpZih0cmllcyA9PT0gNSB8fCAhdGhpcy5jb25uIHx8IHRoaXMuY29ubi5yZWFkeVN0YXRlID09PSBTT0NLRVRfU1RBVEVTLmNsb3NlZCl7XG4gICAgICBjYWxsYmFjaygpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMud2FpdEZvclNvY2tldENsb3NlZChjYWxsYmFjaywgdHJpZXMgKyAxKVxuICAgIH0sIDE1MCAqIHRyaWVzKVxuICB9XG5cbiAgb25Db25uQ2xvc2UoZXZlbnQpe1xuICAgIGlmKHRoaXMuaGFzTG9nZ2VyKCkpIHRoaXMubG9nKFwidHJhbnNwb3J0XCIsIFwiY2xvc2VcIiwgZXZlbnQpXG4gICAgdGhpcy50cmlnZ2VyQ2hhbkVycm9yKClcbiAgICBjbGVhclRpbWVvdXQodGhpcy5oZWFydGJlYXRUaW1lcilcbiAgICBpZighdGhpcy5jbG9zZVdhc0NsZWFuKXtcbiAgICAgIHRoaXMucmVjb25uZWN0VGltZXIuc2NoZWR1bGVUaW1lb3V0KClcbiAgICB9XG4gICAgdGhpcy5zdGF0ZUNoYW5nZUNhbGxiYWNrcy5jbG9zZS5mb3JFYWNoKChbLCBjYWxsYmFja10pID0+IGNhbGxiYWNrKGV2ZW50KSlcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgb25Db25uRXJyb3IoZXJyb3Ipe1xuICAgIGlmKHRoaXMuaGFzTG9nZ2VyKCkpIHRoaXMubG9nKFwidHJhbnNwb3J0XCIsIGVycm9yKVxuICAgIGxldCB0cmFuc3BvcnRCZWZvcmUgPSB0aGlzLnRyYW5zcG9ydFxuICAgIGxldCBlc3RhYmxpc2hlZEJlZm9yZSA9IHRoaXMuZXN0YWJsaXNoZWRDb25uZWN0aW9uc1xuICAgIHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3MuZXJyb3IuZm9yRWFjaCgoWywgY2FsbGJhY2tdKSA9PiB7XG4gICAgICBjYWxsYmFjayhlcnJvciwgdHJhbnNwb3J0QmVmb3JlLCBlc3RhYmxpc2hlZEJlZm9yZSlcbiAgICB9KVxuICAgIGlmKHRyYW5zcG9ydEJlZm9yZSA9PT0gdGhpcy50cmFuc3BvcnQgfHwgZXN0YWJsaXNoZWRCZWZvcmUgPiAwKXtcbiAgICAgIHRoaXMudHJpZ2dlckNoYW5FcnJvcigpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0cmlnZ2VyQ2hhbkVycm9yKCl7XG4gICAgdGhpcy5jaGFubmVscy5mb3JFYWNoKGNoYW5uZWwgPT4ge1xuICAgICAgaWYoIShjaGFubmVsLmlzRXJyb3JlZCgpIHx8IGNoYW5uZWwuaXNMZWF2aW5nKCkgfHwgY2hhbm5lbC5pc0Nsb3NlZCgpKSl7XG4gICAgICAgIGNoYW5uZWwudHJpZ2dlcihDSEFOTkVMX0VWRU5UUy5lcnJvcilcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBjb25uZWN0aW9uU3RhdGUoKXtcbiAgICBzd2l0Y2godGhpcy5jb25uICYmIHRoaXMuY29ubi5yZWFkeVN0YXRlKXtcbiAgICAgIGNhc2UgU09DS0VUX1NUQVRFUy5jb25uZWN0aW5nOiByZXR1cm4gXCJjb25uZWN0aW5nXCJcbiAgICAgIGNhc2UgU09DS0VUX1NUQVRFUy5vcGVuOiByZXR1cm4gXCJvcGVuXCJcbiAgICAgIGNhc2UgU09DS0VUX1NUQVRFUy5jbG9zaW5nOiByZXR1cm4gXCJjbG9zaW5nXCJcbiAgICAgIGRlZmF1bHQ6IHJldHVybiBcImNsb3NlZFwiXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgaXNDb25uZWN0ZWQoKXsgcmV0dXJuIHRoaXMuY29ubmVjdGlvblN0YXRlKCkgPT09IFwib3BlblwiIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICpcbiAgICogQHBhcmFtIHtDaGFubmVsfVxuICAgKi9cbiAgcmVtb3ZlKGNoYW5uZWwpe1xuICAgIHRoaXMub2ZmKGNoYW5uZWwuc3RhdGVDaGFuZ2VSZWZzKVxuICAgIHRoaXMuY2hhbm5lbHMgPSB0aGlzLmNoYW5uZWxzLmZpbHRlcihjID0+IGMuam9pblJlZigpICE9PSBjaGFubmVsLmpvaW5SZWYoKSlcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGBvbk9wZW5gLCBgb25DbG9zZWAsIGBvbkVycm9yLGAgYW5kIGBvbk1lc3NhZ2VgIHJlZ2lzdHJhdGlvbnMuXG4gICAqXG4gICAqIEBwYXJhbSB7cmVmc30gLSBsaXN0IG9mIHJlZnMgcmV0dXJuZWQgYnkgY2FsbHMgdG9cbiAgICogICAgICAgICAgICAgICAgIGBvbk9wZW5gLCBgb25DbG9zZWAsIGBvbkVycm9yLGAgYW5kIGBvbk1lc3NhZ2VgXG4gICAqL1xuICBvZmYocmVmcyl7XG4gICAgZm9yKGxldCBrZXkgaW4gdGhpcy5zdGF0ZUNoYW5nZUNhbGxiYWNrcyl7XG4gICAgICB0aGlzLnN0YXRlQ2hhbmdlQ2FsbGJhY2tzW2tleV0gPSB0aGlzLnN0YXRlQ2hhbmdlQ2FsbGJhY2tzW2tleV0uZmlsdGVyKChbcmVmXSkgPT4ge1xuICAgICAgICByZXR1cm4gcmVmcy5pbmRleE9mKHJlZikgPT09IC0xXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWF0ZXMgYSBuZXcgY2hhbm5lbCBmb3IgdGhlIGdpdmVuIHRvcGljXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0b3BpY1xuICAgKiBAcGFyYW0ge09iamVjdH0gY2hhblBhcmFtcyAtIFBhcmFtZXRlcnMgZm9yIHRoZSBjaGFubmVsXG4gICAqIEByZXR1cm5zIHtDaGFubmVsfVxuICAgKi9cbiAgY2hhbm5lbCh0b3BpYywgY2hhblBhcmFtcyA9IHt9KXtcbiAgICBsZXQgY2hhbiA9IG5ldyBDaGFubmVsKHRvcGljLCBjaGFuUGFyYW1zLCB0aGlzKVxuICAgIHRoaXMuY2hhbm5lbHMucHVzaChjaGFuKVxuICAgIHJldHVybiBjaGFuXG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICovXG4gIHB1c2goZGF0YSl7XG4gICAgaWYodGhpcy5oYXNMb2dnZXIoKSl7XG4gICAgICBsZXQge3RvcGljLCBldmVudCwgcGF5bG9hZCwgcmVmLCBqb2luX3JlZn0gPSBkYXRhXG4gICAgICB0aGlzLmxvZyhcInB1c2hcIiwgYCR7dG9waWN9ICR7ZXZlbnR9ICgke2pvaW5fcmVmfSwgJHtyZWZ9KWAsIHBheWxvYWQpXG4gICAgfVxuXG4gICAgaWYodGhpcy5pc0Nvbm5lY3RlZCgpKXtcbiAgICAgIHRoaXMuZW5jb2RlKGRhdGEsIHJlc3VsdCA9PiB0aGlzLmNvbm4uc2VuZChyZXN1bHQpKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlbmRCdWZmZXIucHVzaCgoKSA9PiB0aGlzLmVuY29kZShkYXRhLCByZXN1bHQgPT4gdGhpcy5jb25uLnNlbmQocmVzdWx0KSkpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgbmV4dCBtZXNzYWdlIHJlZiwgYWNjb3VudGluZyBmb3Igb3ZlcmZsb3dzXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBtYWtlUmVmKCl7XG4gICAgbGV0IG5ld1JlZiA9IHRoaXMucmVmICsgMVxuICAgIGlmKG5ld1JlZiA9PT0gdGhpcy5yZWYpeyB0aGlzLnJlZiA9IDAgfSBlbHNlIHsgdGhpcy5yZWYgPSBuZXdSZWYgfVxuXG4gICAgcmV0dXJuIHRoaXMucmVmLnRvU3RyaW5nKClcbiAgfVxuXG4gIHNlbmRIZWFydGJlYXQoKXtcbiAgICBpZih0aGlzLnBlbmRpbmdIZWFydGJlYXRSZWYgJiYgIXRoaXMuaXNDb25uZWN0ZWQoKSl7IHJldHVybiB9XG4gICAgdGhpcy5wZW5kaW5nSGVhcnRiZWF0UmVmID0gdGhpcy5tYWtlUmVmKClcbiAgICB0aGlzLnB1c2goe3RvcGljOiBcInBob2VuaXhcIiwgZXZlbnQ6IFwiaGVhcnRiZWF0XCIsIHBheWxvYWQ6IHt9LCByZWY6IHRoaXMucGVuZGluZ0hlYXJ0YmVhdFJlZn0pXG4gICAgdGhpcy5oZWFydGJlYXRUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5oZWFydGJlYXRUaW1lb3V0KCksIHRoaXMuaGVhcnRiZWF0SW50ZXJ2YWxNcylcbiAgfVxuXG4gIGFibm9ybWFsQ2xvc2UocmVhc29uKXtcbiAgICB0aGlzLmNsb3NlV2FzQ2xlYW4gPSBmYWxzZVxuICAgIGlmKHRoaXMuaXNDb25uZWN0ZWQoKSl7IHRoaXMuY29ubi5jbG9zZShXU19DTE9TRV9OT1JNQUwsIHJlYXNvbikgfVxuICB9XG5cbiAgZmx1c2hTZW5kQnVmZmVyKCl7XG4gICAgaWYodGhpcy5pc0Nvbm5lY3RlZCgpICYmIHRoaXMuc2VuZEJ1ZmZlci5sZW5ndGggPiAwKXtcbiAgICAgIHRoaXMuc2VuZEJ1ZmZlci5mb3JFYWNoKGNhbGxiYWNrID0+IGNhbGxiYWNrKCkpXG4gICAgICB0aGlzLnNlbmRCdWZmZXIgPSBbXVxuICAgIH1cbiAgfVxuXG4gIG9uQ29ubk1lc3NhZ2UocmF3TWVzc2FnZSl7XG4gICAgdGhpcy5kZWNvZGUocmF3TWVzc2FnZS5kYXRhLCBtc2cgPT4ge1xuICAgICAgbGV0IHt0b3BpYywgZXZlbnQsIHBheWxvYWQsIHJlZiwgam9pbl9yZWZ9ID0gbXNnXG4gICAgICBpZihyZWYgJiYgcmVmID09PSB0aGlzLnBlbmRpbmdIZWFydGJlYXRSZWYpe1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5oZWFydGJlYXRUaW1lcilcbiAgICAgICAgdGhpcy5wZW5kaW5nSGVhcnRiZWF0UmVmID0gbnVsbFxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuc2VuZEhlYXJ0YmVhdCgpLCB0aGlzLmhlYXJ0YmVhdEludGVydmFsTXMpXG4gICAgICB9XG5cbiAgICAgIGlmKHRoaXMuaGFzTG9nZ2VyKCkpIHRoaXMubG9nKFwicmVjZWl2ZVwiLCBgJHtwYXlsb2FkLnN0YXR1cyB8fCBcIlwifSAke3RvcGljfSAke2V2ZW50fSAke3JlZiAmJiBcIihcIiArIHJlZiArIFwiKVwiIHx8IFwiXCJ9YCwgcGF5bG9hZClcblxuICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hhbm5lbHMubGVuZ3RoOyBpKyspe1xuICAgICAgICBjb25zdCBjaGFubmVsID0gdGhpcy5jaGFubmVsc1tpXVxuICAgICAgICBpZighY2hhbm5lbC5pc01lbWJlcih0b3BpYywgZXZlbnQsIHBheWxvYWQsIGpvaW5fcmVmKSl7IGNvbnRpbnVlIH1cbiAgICAgICAgY2hhbm5lbC50cmlnZ2VyKGV2ZW50LCBwYXlsb2FkLCByZWYsIGpvaW5fcmVmKVxuICAgICAgfVxuXG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5zdGF0ZUNoYW5nZUNhbGxiYWNrcy5tZXNzYWdlLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgbGV0IFssIGNhbGxiYWNrXSA9IHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3MubWVzc2FnZVtpXVxuICAgICAgICBjYWxsYmFjayhtc2cpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGxlYXZlT3BlblRvcGljKHRvcGljKXtcbiAgICBsZXQgZHVwQ2hhbm5lbCA9IHRoaXMuY2hhbm5lbHMuZmluZChjID0+IGMudG9waWMgPT09IHRvcGljICYmIChjLmlzSm9pbmVkKCkgfHwgYy5pc0pvaW5pbmcoKSkpXG4gICAgaWYoZHVwQ2hhbm5lbCl7XG4gICAgICBpZih0aGlzLmhhc0xvZ2dlcigpKSB0aGlzLmxvZyhcInRyYW5zcG9ydFwiLCBgbGVhdmluZyBkdXBsaWNhdGUgdG9waWMgXCIke3RvcGljfVwiYClcbiAgICAgIGR1cENoYW5uZWwubGVhdmUoKVxuICAgIH1cbiAgfVxufVxuIiwgImltcG9ydCBcImFscGluZWpzXCI7XG5cbi8vIEJyaW5nIHBob2VuaXhfaHRtbCB0byBkZWFsIHdpdGggbWV0aG9kPVBVVC9ERUxFVEUgaW4gZm9ybXMgYW5kIGJ1dHRvbnNcbmltcG9ydCBcInBob2VuaXhfaHRtbFwiO1xuXG4vLyBVbmNvbW1lbnQgYmVsb3cgdG8gYnJpbmcgUGhvZW5peCcgY2xpZW50IHNpZGUgc29ja2V0XG4vLyBpbXBvcnQgc29ja2V0IGZyb20gXCIuL3NvY2tldFwiXG5cbi8vIFlvdSBjYW4gYnJpbmcgZGVwZW5kZW5jaWVzIGluIHR3byB3YXlzLlxuLy9cbi8vIFRoZSBzaW1wbGVzdCBvcHRpb24gaXMgdG8gcHV0IHRoZW0gaW4gYXNzZXRzL3ZlbmRvciBhbmRcbi8vIGltcG9ydCB0aGVtIHVzaW5nIHJlbGF0aXZlIHBhdGhzOlxuLy9cbi8vICAgICBpbXBvcnQgXCIuL3ZlbmRvci9zb21lLXBhY2thZ2UubWluLmpzXCJcbi8vXG4vLyBBbHRlcm5hdGl2ZWx5LCB5b3UgY2FuIGBucG0gaW5zdGFsbCBzb21lLXBhY2thZ2VgIGFuZCBpbXBvcnRcbi8vIHRoZW0gdXNpbmcgYSBwYXRoIHN0YXJ0aW5nIHdpdGggdGhlIHBhY2thZ2UgbmFtZTpcbi8vXG4vLyAgICAgaW1wb3J0IFwic29tZS1wYWNrYWdlXCJcbi8vXG5cbmltcG9ydCB7IFNvY2tldCB9IGZyb20gXCJwaG9lbml4XCI7XG5pbXBvcnQgdG9wYmFyIGZyb20gXCJ0b3BiYXJcIjtcbmltcG9ydCB7IExpdmVTb2NrZXQgfSBmcm9tIFwicGhvZW5peF9saXZlX3ZpZXdcIjtcblxubGV0IGNzcmZUb2tlbiA9IGRvY3VtZW50XG4gIC5xdWVyeVNlbGVjdG9yKFwibWV0YVtuYW1lPSdjc3JmLXRva2VuJ11cIilcbiAgLmdldEF0dHJpYnV0ZShcImNvbnRlbnRcIik7XG5cbmxldCBIb29rcyA9IHt9O1xuXG5sZXQgbGl2ZVNvY2tldCA9IG5ldyBMaXZlU29ja2V0KFwiL2xpdmVcIiwgU29ja2V0LCB7XG4gIHBhcmFtczogeyBfY3NyZl90b2tlbjogY3NyZlRva2VuIH0sXG4gIGhvb2tzOiBIb29rcyxcbn0pO1xuXG4vLyBTaG93IHByb2dyZXNzIGJhciBvbiBsaXZlIG5hdmlnYXRpb24gYW5kIGZvcm0gc3VibWl0c1xudG9wYmFyLmNvbmZpZyh7IGJhckNvbG9yczogeyAwOiBcIiMyOWRcIiB9LCBzaGFkb3dDb2xvcjogXCJyZ2JhKDAsIDAsIDAsIC4zKVwiIH0pO1xud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwaHg6cGFnZS1sb2FkaW5nLXN0YXJ0XCIsIChpbmZvKSA9PiB0b3BiYXIuc2hvdygpKTtcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicGh4OnBhZ2UtbG9hZGluZy1zdG9wXCIsIChpbmZvKSA9PiB0b3BiYXIuaGlkZSgpKTtcblxuLy8gY29ubmVjdCBpZiB0aGVyZSBhcmUgYW55IExpdmVWaWV3cyBvbiB0aGUgcGFnZVxubGl2ZVNvY2tldC5jb25uZWN0KCk7XG5cbi8vIGV4cG9zZSBsaXZlU29ja2V0IG9uIHdpbmRvdyBmb3Igd2ViIGNvbnNvbGUgZGVidWcgbG9ncyBhbmQgbGF0ZW5jeSBzaW11bGF0aW9uOlxuLy8gPj4gbGl2ZVNvY2tldC5lbmFibGVEZWJ1ZygpXG4vLyA+PiBsaXZlU29ja2V0LmVuYWJsZUxhdGVuY3lTaW0oMTAwMCkgIC8vIGVuYWJsZWQgZm9yIGR1cmF0aW9uIG9mIGJyb3dzZXIgc2Vzc2lvblxuLy8gPj4gbGl2ZVNvY2tldC5kaXNhYmxlTGF0ZW5jeVNpbSgpXG53aW5kb3cubGl2ZVNvY2tldCA9IGxpdmVTb2NrZXQ7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUlDLE1BQUMsVUFBUyxTQUFRLFdBQVU7QUFDekI7QUFHQyxRQUFDLFlBQVc7QUFDVCxjQUFJLFdBQVc7QUFDZixjQUFJLFVBQVUsQ0FBQyxNQUFNLE9BQU8sVUFBVTtBQUN0QyxtQkFBUSxJQUFJLEdBQUcsSUFBSSxRQUFRLFVBQVUsQ0FBQyxRQUFPLHVCQUF1QixFQUFFLEdBQUc7QUFDckUsb0JBQU8sd0JBQXdCLFFBQU8sUUFBUSxLQUFHO0FBQ2pELG9CQUFPLHVCQUF1QixRQUFPLFFBQVEsS0FBRywyQkFDekMsUUFBTyxRQUFRLEtBQUc7QUFBQTtBQUU3QixjQUFJLENBQUMsUUFBTztBQUNSLG9CQUFPLHdCQUF3QixTQUFTLFVBQVUsU0FBUztBQUN2RCxrQkFBSSxXQUFXLElBQUksT0FBTztBQUMxQixrQkFBSSxhQUFhLEtBQUssSUFBSSxHQUFHLEtBQU0sWUFBVztBQUM5QyxrQkFBSSxLQUFLLFFBQU8sV0FBVyxXQUFXO0FBQUUseUJBQVMsV0FBVztBQUFBLGlCQUN4RDtBQUNKLHlCQUFXLFdBQVc7QUFDdEIscUJBQU87QUFBQTtBQUVmLGNBQUksQ0FBQyxRQUFPO0FBQ1Isb0JBQU8sdUJBQXVCLFNBQVMsSUFBSTtBQUN2QywyQkFBYTtBQUFBO0FBQUE7QUFJekIsWUFBSSxRQUFRLGlCQUFpQixhQUFhLGlCQUFpQixTQUN2RCxXQUFXLFNBQVMsTUFBTSxNQUFNLFVBQVM7QUFDckMsY0FBSSxLQUFLO0FBQWtCLGlCQUFLLGlCQUFpQixNQUFN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
