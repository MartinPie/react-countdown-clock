! function (t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e(require("react")) : "function" == typeof define && define.amd ? define(["react"], e) : "object" == typeof exports ? exports.ReactCountdownClock = e(require("react")) : t.ReactCountdownClock = e(t.React)
}(window, function (t) {
    return function (t) {
        var e = {};

        function n(i) {
            if (e[i]) return e[i].exports;
            var r = e[i] = {
                i: i,
                l: !1,
                exports: {}
            };
            return t[i].call(r.exports, r, r.exports, n), r.l = !0, r.exports
        }
        return n.m = t, n.c = e, n.d = function (t, e, i) {
            n.o(t, e) || Object.defineProperty(t, e, {
                enumerable: !0,
                get: i
            })
        }, n.r = function (t) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(t, "__esModule", {
                value: !0
            })
        }, n.t = function (t, e) {
            if (1 & e && (t = n(t)), 8 & e) return t;
            if (4 & e && "object" == typeof t && t && t.__esModule) return t;
            var i = Object.create(null);
            if (n.r(i), Object.defineProperty(i, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && "string" != typeof t)
                for (var r in t) n.d(i, r, function (e) {
                    return t[e]
                }.bind(null, r));
            return i
        }, n.n = function (t) {
            var e = t && t.__esModule ? function () {
                return t.default
            } : function () {
                return t
            };
            return n.d(e, "a", e), e
        }, n.o = function (t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }, n.p = "/Users/hugh/repos/react-countdown-clock/build", n(n.s = 1)
    }([function (e, n) {
        e.exports = t
    }, function (t, e, n) {
        var i, r, s;
        r = n(0), i = n(2), (s = n(5)({
            _seconds: 0,
            _radius: null,
            _fraction: null,
            _content: null,
            _canvas: null,
            _timeoutIds: [],
            _scale: window.devicePixelRatio || 1,
            displayName: "ReactCountdownClock",
            componentDidUpdate: function (t) {
                if (t.seconds !== this.props.seconds && (this._seconds = this._startSeconds(), this._stopTimer(), this._setupTimer()), t.color !== this.props.color && (this._drawBackground(), this._updateCanvas()), t.paused !== this.props.paused && (this.props.paused || this._startTimer(), this.props.paused)) return this._pauseTimer()
            },
            componentDidMount: function () {
                return this._seconds = this._startSeconds(), this._setupTimer()
            },
            componentWillUnmount: function () {
                this.props.sendTimeLeft(this._seconds)
                return this._cancelTimer()
            },
            _startSeconds: function () {
                return this.props.paused ? this.props.seconds : this.props.seconds - .01
            },
            _setupTimer: function () {
                if (this._setScale(), this._setupCanvases(), this._drawBackground(), this._drawTimer(), !this.props.paused) return this._startTimer()
            },
            _updateCanvas: function () {
                return this._clearTimer(), this._drawTimer()
            },
            _setScale: function () {
                return this._radius = this.props.size / 2, this._fraction = 2 / this._seconds, this._tickPeriod = this._calculateTick(), this._innerRadius = this.props.weight ? this._radius - this.props.weight : this._radius / 1.8
            },
            _calculateTick: function () {
                var t;
                return 1.8, (t = 1.8 * this._seconds) > 1e3 ? 1e3 : t
            },
            _setupCanvases: function () {
                if (!this._background || !this._timer) return this._background = this.refs.background.getContext("2d"), this._background.scale(this._scale, this._scale), this._timer = this.refs.timer.getContext("2d"), this._timer.textAlign = "center", this._timer.textBaseline = "middle", this._timer.scale(this._scale, this._scale), null != this.props.onClick ? this.refs.component.addEventListener("click", this.props.onClick) : void 0
            },
            _startTimer: function () {
                return this._timeoutIds.push(setTimeout(() => this._tick()), 200)
            },
            _pauseTimer: function () {
                return this._stopTimer(), this._updateCanvas()
            },
            _stopTimer: function () {
                var t, e, n, i, r;
                for (i = [], t = 0, e = (n = this._timeoutIds).length; t < e; t++) r = n[t], i.push(clearTimeout(r));
                return i
            },
            _cancelTimer: function () {
                if (this._stopTimer(), null != this.props.onClick) return this.refs.component.removeEventListener("click", this.props.onClick)
            },
            _tick: function () {
                var t;
                return t = Date.now(), this._timeoutIds.push(setTimeout(() => {
                    var e;
                    return e = (Date.now() - t) / 1e3, this._seconds -= e, this._seconds <= 0 ? (this._seconds = 0, this._handleComplete(), this._clearTimer()) : (this._updateCanvas(), this._tick())
                }, this._tickPeriod))
            },
            _handleComplete: function () {
                if (this.props.onComplete) return this.props.onComplete()
            },
            _clearBackground: function () {
                return this._background.clearRect(0, 0, this.refs.timer.width, this.refs.timer.height)
            },
            _clearTimer: function () {
                if (null != this.refs.timer) return this._timer.clearRect(0, 0, this.refs.timer.width, this.refs.timer.height)
            },
            _drawBackground: function () {
                return this._clearBackground(), this._background.beginPath(), this._background.globalAlpha = this.props.alpha / 3, this._background.fillStyle = this.props.color, this._background.arc(this._radius, this._radius, this._radius, 0, 2 * Math.PI, !1), this._background.arc(this._radius, this._radius, this._innerRadius, 2 * Math.PI, 0, !0), this._background.closePath(), this._background.fill()
            },
            _formattedTime: function () {
                var t, e, n, i, r, s, o, a, c;
                return t = null != (s = this._seconds < 10 && this.props.showMilliseconds) ? s : {
                    1: 0
                }, "hms" === this.props.timeFormat ? (n = `${e = parseInt(this._seconds / 3600) % 24}`, r = `${i = parseInt(this._seconds / 60) % 60}`, a = `${o = t ? (Math.floor(10 * this._seconds) / 10).toFixed(t) : Math.floor(this._seconds % 60)}`, e < 10 && (n = `0${e}`), i < 10 && e >= 1 && (r = `0${i}`), o < 10 && (i >= 1 || e >= 1) && (a = `0${o}`), c = [], e > 0 && c.push(n), (i > 0 || e > 0) && c.push(r), c.push(a), c.join(":")) : (Math.floor(10 * this._seconds) / 10).toFixed(t)
            },
            _fontSize: function (t) {
                var e;
                return "auto" === this.props.fontSize ? (e = function () {
                    switch (t.length) {
                        case 8:
                            return 4;
                        case 5:
                            return 3;
                        default:
                            return 2
                    }
                }(), `${this._radius / e}px`) : this.props.fontSize
            },
            _drawTimer: function () {
                var t, e, n;
                return e = this._fraction * this._seconds + 1.5, t = this._formattedTime(), n = this.props.paused && null != this.props.pausedText ? this.props.pausedText : t, this._timer.globalAlpha = this.props.alpha, this._timer.fillStyle = this.props.color, this._timer.font = `bold ${this._fontSize(t)} ${this.props.font}`, this._timer.fillText(n, this._radius, this._radius), this._timer.beginPath(), this._timer.arc(this._radius, this._radius, this._radius, 1.5 * Math.PI, Math.PI * e, !1), this._timer.arc(this._radius, this._radius, this._innerRadius, Math.PI * e, 1.5 * Math.PI, !0), this._timer.closePath(), this._timer.fill()
            },
            render: function () {
                var t;
                return t = {
                    style: {
                        position: "absolute",
                        width: this.props.size,
                        height: this.props.size
                    },
                    height: this.props.size * this._scale,
                    width: this.props.size * this._scale
                }, r.createElement("div", {
                    ref: "component",
                    className: "react-countdown-clock",
                    style: {
                        width: this.props.size,
                        height: this.props.size
                    }
                }, r.createElement("canvas", Object.assign({
                    ref: "background"
                }, t)), r.createElement("canvas", Object.assign({
                    ref: "timer"
                }, t)))
            }
        })).propTypes = {
                seconds: i.number,
                size: i.number,
                weight: i.number,
                color: i.string,
                fontSize: i.string,
                font: i.string,
                alpha: i.number,
                timeFormat: i.string,
                onComplete: i.func,
                onClick: i.func,
                showMilliseconds: i.bool,
                paused: i.bool,
                pausedText: i.string
            }, s.defaultProps = {
                seconds: 60,
                size: 300,
                color: "#000",
                alpha: 1,
                timeFormat: "hms",
                fontSize: "auto",
                font: "Arial",
                showMilliseconds: !0,
                paused: !1
            }, t.exports = s
    }, function (t, e, n) {
        t.exports = n(3)()
    }, function (t, e, n) {
        "use strict";
        var i = n(4);

        function r() { }

        function s() { }
        s.resetWarningCache = r, t.exports = function () {
            function t(t, e, n, r, s, o) {
                if (o !== i) {
                    var a = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
                    throw a.name = "Invariant Violation", a
                }
            }

            function e() {
                return t
            }
            t.isRequired = t;
            var n = {
                array: t,
                bool: t,
                func: t,
                number: t,
                object: t,
                string: t,
                symbol: t,
                any: t,
                arrayOf: e,
                element: t,
                elementType: t,
                instanceOf: e,
                node: t,
                objectOf: e,
                oneOf: e,
                oneOfType: e,
                shape: e,
                exact: e,
                checkPropTypes: s,
                resetWarningCache: r
            };
            return n.PropTypes = n, n
        }
    }, function (t, e, n) {
        "use strict";
        t.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"
    }, function (t, e, n) {
        "use strict";
        var i = n(0),
            r = n(6);
        if (void 0 === i) throw Error("create-react-class could not find the React object. If you are using script tags, make sure that React is being loaded before create-react-class.");
        var s = (new i.Component).updater;
        t.exports = r(i.Component, i.isValidElement, s)
    }, function (t, e, n) {
        "use strict";
        var i = n(7),
            r = n(8),
            s = n(9),
            o = "mixins";
        t.exports = function (t, e, n) {
            var a = [],
                c = {
                    mixins: "DEFINE_MANY",
                    statics: "DEFINE_MANY",
                    propTypes: "DEFINE_MANY",
                    contextTypes: "DEFINE_MANY",
                    childContextTypes: "DEFINE_MANY",
                    getDefaultProps: "DEFINE_MANY_MERGED",
                    getInitialState: "DEFINE_MANY_MERGED",
                    getChildContext: "DEFINE_MANY_MERGED",
                    render: "DEFINE_ONCE",
                    componentWillMount: "DEFINE_MANY",
                    componentDidMount: "DEFINE_MANY",
                    componentWillReceiveProps: "DEFINE_MANY",
                    shouldComponentUpdate: "DEFINE_ONCE",
                    componentWillUpdate: "DEFINE_MANY",
                    componentDidUpdate: "DEFINE_MANY",
                    componentWillUnmount: "DEFINE_MANY",
                    UNSAFE_componentWillMount: "DEFINE_MANY",
                    UNSAFE_componentWillReceiveProps: "DEFINE_MANY",
                    UNSAFE_componentWillUpdate: "DEFINE_MANY",
                    updateComponent: "OVERRIDE_BASE"
                },
                u = {
                    getDerivedStateFromProps: "DEFINE_MANY_MERGED"
                },
                p = {
                    displayName: function (t, e) {
                        t.displayName = e
                    },
                    mixins: function (t, e) {
                        if (e)
                            for (var n = 0; n < e.length; n++) l(t, e[n])
                    },
                    childContextTypes: function (t, e) {
                        t.childContextTypes = i({}, t.childContextTypes, e)
                    },
                    contextTypes: function (t, e) {
                        t.contextTypes = i({}, t.contextTypes, e)
                    },
                    getDefaultProps: function (t, e) {
                        t.getDefaultProps ? t.getDefaultProps = f(t.getDefaultProps, e) : t.getDefaultProps = e
                    },
                    propTypes: function (t, e) {
                        t.propTypes = i({}, t.propTypes, e)
                    },
                    statics: function (t, e) {
                        ! function (t, e) {
                            if (e)
                                for (var n in e) {
                                    var i = e[n];
                                    if (e.hasOwnProperty(n)) {
                                        var r = n in p;
                                        s(!r, 'ReactClass: You are attempting to define a reserved property, `%s`, that shouldn\'t be on the "statics" key. Define it as an instance property instead; it will still be accessible on the constructor.', n);
                                        var o = n in t;
                                        if (o) {
                                            var a = u.hasOwnProperty(n) ? u[n] : null;
                                            return s("DEFINE_MANY_MERGED" === a, "ReactClass: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.", n), void (t[n] = f(t[n], i))
                                        }
                                        t[n] = i
                                    }
                                }
                        }(t, e)
                    },
                    autobind: function () { }
                };

            function h(t, e) {
                var n = c.hasOwnProperty(e) ? c[e] : null;
                E.hasOwnProperty(e) && s("OVERRIDE_BASE" === n, "ReactClassInterface: You are attempting to override `%s` from your class specification. Ensure that your method names do not overlap with React methods.", e), t && s("DEFINE_MANY" === n || "DEFINE_MANY_MERGED" === n, "ReactClassInterface: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.", e)
            }

            function l(t, n) {
                if (n) {
                    s("function" != typeof n, "ReactClass: You're attempting to use a component class or function as a mixin. Instead, just use a regular object."), s(!e(n), "ReactClass: You're attempting to use a component as a mixin. Instead, just use a regular object.");
                    var i = t.prototype,
                        r = i.__reactAutoBindPairs;
                    for (var a in n.hasOwnProperty(o) && p.mixins(t, n.mixins), n)
                        if (n.hasOwnProperty(a) && a !== o) {
                            var u = n[a],
                                l = i.hasOwnProperty(a);
                            if (h(l, a), p.hasOwnProperty(a)) p[a](t, u);
                            else {
                                var d = c.hasOwnProperty(a);
                                if ("function" != typeof u || d || l || !1 === n.autobind)
                                    if (l) {
                                        var m = c[a];
                                        s(d && ("DEFINE_MANY_MERGED" === m || "DEFINE_MANY" === m), "ReactClass: Unexpected spec policy %s for key %s when mixing in component specs.", m, a), "DEFINE_MANY_MERGED" === m ? i[a] = f(i[a], u) : "DEFINE_MANY" === m && (i[a] = _(i[a], u))
                                    } else i[a] = u;
                                else r.push(a, u), i[a] = u
                            }
                        }
                }
            }

            function d(t, e) {
                for (var n in s(t && e && "object" == typeof t && "object" == typeof e, "mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects."), e) e.hasOwnProperty(n) && (s(void 0 === t[n], "mergeIntoWithNoDuplicateKeys(): Tried to merge two objects with the same key: `%s`. This conflict may be due to a mixin; in particular, this may be caused by two getInitialState() or getDefaultProps() methods returning objects with clashing keys.", n), t[n] = e[n]);
                return t
            }

            function f(t, e) {
                return function () {
                    var n = t.apply(this, arguments),
                        i = e.apply(this, arguments);
                    if (null == n) return i;
                    if (null == i) return n;
                    var r = {};
                    return d(r, n), d(r, i), r
                }
            }

            function _(t, e) {
                return function () {
                    t.apply(this, arguments), e.apply(this, arguments)
                }
            }

            function m(t, e) {
                return e.bind(t)
            }
            var y = {
                componentDidMount: function () {
                    this.__isMounted = !0
                }
            },
                g = {
                    componentWillUnmount: function () {
                        this.__isMounted = !1
                    }
                },
                E = {
                    replaceState: function (t, e) {
                        this.updater.enqueueReplaceState(this, t, e)
                    },
                    isMounted: function () {
                        return !!this.__isMounted
                    }
                },
                b = function () { };
            return i(b.prototype, t.prototype, E),
                function (t) {
                    var e = function (t, i, o) {
                        this.__reactAutoBindPairs.length && function (t) {
                            for (var e = t.__reactAutoBindPairs, n = 0; n < e.length; n += 2) {
                                var i = e[n],
                                    r = e[n + 1];
                                t[i] = m(t, r)
                            }
                        }(this), this.props = t, this.context = i, this.refs = r, this.updater = o || n, this.state = null;
                        var a = this.getInitialState ? this.getInitialState() : null;
                        s("object" == typeof a && !Array.isArray(a), "%s.getInitialState(): must return an object or null", e.displayName || "ReactCompositeComponent"), this.state = a
                    };
                    for (var i in e.prototype = new b, e.prototype.constructor = e, e.prototype.__reactAutoBindPairs = [], a.forEach(l.bind(null, e)), l(e, y), l(e, t), l(e, g), e.getDefaultProps && (e.defaultProps = e.getDefaultProps()), s(e.prototype.render, "createClass(...): Class specification must implement a `render` method."), c) e.prototype[i] || (e.prototype[i] = null);
                    return e
                }
        }
    }, function (t, e, n) {
        "use strict";
        /*
        object-assign
        (c) Sindre Sorhus
        @license MIT
        */
        var i = Object.getOwnPropertySymbols,
            r = Object.prototype.hasOwnProperty,
            s = Object.prototype.propertyIsEnumerable;
        t.exports = function () {
            try {
                if (!Object.assign) return !1;
                var t = new String("abc");
                if (t[5] = "de", "5" === Object.getOwnPropertyNames(t)[0]) return !1;
                for (var e = {}, n = 0; n < 10; n++) e["_" + String.fromCharCode(n)] = n;
                if ("0123456789" !== Object.getOwnPropertyNames(e).map(function (t) {
                    return e[t]
                }).join("")) return !1;
                var i = {};
                return "abcdefghijklmnopqrst".split("").forEach(function (t) {
                    i[t] = t
                }), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, i)).join("")
            } catch (t) {
                return !1
            }
        }() ? Object.assign : function (t, e) {
            for (var n, o, a = function (t) {
                if (null == t) throw new TypeError("Object.assign cannot be called with null or undefined");
                return Object(t)
            }(t), c = 1; c < arguments.length; c++) {
                for (var u in n = Object(arguments[c])) r.call(n, u) && (a[u] = n[u]);
                if (i) {
                    o = i(n);
                    for (var p = 0; p < o.length; p++) s.call(n, o[p]) && (a[o[p]] = n[o[p]])
                }
            }
            return a
        }
    }, function (t, e, n) {
        "use strict";
        t.exports = {}
    }, function (t, e, n) {
        "use strict";
        var i = function (t) { };
        t.exports = function (t, e, n, r, s, o, a, c) {
            if (i(e), !t) {
                var u;
                if (void 0 === e) u = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
                else {
                    var p = [n, r, s, o, a, c],
                        h = 0;
                    (u = new Error(e.replace(/%s/g, function () {
                        return p[h++]
                    }))).name = "Invariant Violation"
                }
                throw u.framesToPop = 1, u
            }
        }
    }])
});
//# sourceMappingURL=react-countdown-clock.js.map