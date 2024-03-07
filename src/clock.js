"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var store = require('./clock-state.js').default;
var clock_state_js_1 = require("./clock-state.js");
var react_redux_1 = require("react-redux");
var react_1 = __importStar(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
var marked = require('marked');
var Title = function () {
    return (react_1.default.createElement("h1", { className: "main-title", id: "main-title" }, "25 + 5 Clock"));
};
var Controls = function (props) {
    (0, react_1.useEffect)(function () {
        var container = document.querySelector('#clock-controls');
        var breakLength = document.querySelector('#break-length');
        var breakDecrement = document.querySelector('#break-decrement');
        var breakIncrement = document.querySelector('#break-increment');
        var sessionLength = document.querySelector('#session-length');
        var sessionDecrement = document.querySelector('#session-decrement');
        var sessionIncrement = document.querySelector('#session-increment');
        breakDecrement.addEventListener('click', function (e) {
            if (parseInt(breakLength.getAttribute('data-value')) >= 2) {
                props.set(parseInt(breakLength.getAttribute('data-value')) - 1, parseInt(sessionLength.getAttribute('data-value')));
            }
        });
        breakIncrement.addEventListener('click', function (e) {
            if (parseInt(breakLength.getAttribute('data-value')) >= 1 && parseInt(breakLength.getAttribute('data-value')) < 60) {
                props.set(parseInt(breakLength.getAttribute('data-value')) + 1, parseInt(sessionLength.getAttribute('data-value')));
            }
        });
        sessionDecrement.addEventListener('click', function (e) {
            console.log(parseInt(sessionLength.getAttribute('data-value')));
            if (parseInt(sessionLength.getAttribute('data-value')) >= 2) {
                props.set(parseInt(breakLength.getAttribute('data-value')), parseInt(sessionLength.getAttribute('data-value')) - 1);
            }
        });
        sessionIncrement.addEventListener('click', function (e) {
            console.log(parseInt(sessionLength.getAttribute('data-value')));
            if (parseInt(sessionLength.getAttribute('data-value')) >= 1 && parseInt(sessionLength.getAttribute('data-value')) < 60) {
                props.set(parseInt(breakLength.getAttribute('data-value')), parseInt(sessionLength.getAttribute('data-value')) + 1);
            }
        });
    }, []);
    return (react_1.default.createElement("div", { className: "clock-controls", id: "clock-controls", "data-state": props.progress },
        react_1.default.createElement("h3", { id: "break-label" }, "Break Length"),
        react_1.default.createElement("div", { className: "length-control time-controls", id: "break-control" },
            react_1.default.createElement("button", { className: "btn btn--break", id: "break-decrement", value: "-" }, "\u2193"),
            react_1.default.createElement("h4", { className: "break-length", id: "break-length", "data-value": props.break }, props.break),
            react_1.default.createElement("button", { className: "btn btn--break", id: "break-increment", value: "+" }, "\u2191")),
        react_1.default.createElement("h3", { id: "session-label" }, "Session Length"),
        react_1.default.createElement("div", { className: "length-control time-controls", id: "session-control" },
            react_1.default.createElement("button", { className: "btn btn--session", id: "session-decrement", value: "-" }, "\u2193"),
            react_1.default.createElement("h4", { className: "session-length", id: "session-length", "data-value": props.session }, props.session),
            react_1.default.createElement("button", { className: "btn btn--session", id: "session-increment", value: "+" }, "\u2191"))));
};
var Timer = function (props) {
    return (react_1.default.createElement("div", { className: "timer" },
        react_1.default.createElement("div", { className: "timer-wrapper" },
            react_1.default.createElement("h3", { className: "timer-label", id: "timer-label" }, "Session"),
            react_1.default.createElement("h3", { className: "timer-left", id: "time-left" }, props.current))));
};
var TimerControls = function (props) {
    (0, react_1.useEffect)(function () {
        var startStop = document.querySelector('#start_stop');
        startStop.addEventListener('click', function (e) {
            switch (e.target.getAttribute('data-state')) {
                case clock_state_js_1.READY:
                    props.start(props.break, props.session, props.current);
                    break;
                case clock_state_js_1.START:
                    props.pause(props.break, props.session, props.current);
                    break;
            }
        });
        var reset = document.querySelector('#reset');
        reset.addEventListener('click', function (e) {
            props.restart();
        });
    }, []);
    return (react_1.default.createElement("div", { className: "timer-control" },
        react_1.default.createElement("button", { "data-state": props.progress, id: "start_stop" }, "\u23EF\uFE0F"),
        react_1.default.createElement("button", { id: "reset" }, "\uD83D\uDD04")));
};
var App = function (props) {
    console.log(props);
    return (react_1.default.createElement("div", { id: "app", className: "app" },
        react_1.default.createElement(Title, null),
        react_1.default.createElement(Controls, { break: props.break, session: props.session, set: props.set, progress: props.progress }),
        react_1.default.createElement(Timer, { current: props.current, progress: props.progress }),
        react_1.default.createElement(TimerControls, { progress: props.progress, break: props.break, session: props.session, current: props.current, end: props.end, start: props.start, pause: props.pause, ready: props.ready, restart: props.restart })));
};
var AppWrapper = function (props) {
    return (react_1.default.createElement(react_redux_1.Provider, { store: store },
        react_1.default.createElement(Container, null)));
};
var mapStateToProps = function (state) {
    return {
        break: state.break,
        session: state.session,
        current: state.current,
        progress: state.progress
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        set: function (brk, session) { return dispatch((0, clock_state_js_1.set)(brk, session)); },
        start: function (brk, session, current) { return dispatch((0, clock_state_js_1.start)(brk, session, current)); },
        pause: function (brk, session, current) { return dispatch((0, clock_state_js_1.pause)(brk, session, current)); },
        end: function () { return dispatch((0, clock_state_js_1.end)()); },
        restart: function () { return dispatch((0, clock_state_js_1.restart)()); },
        ready: function (brk, session, current) { return dispatch((0, clock_state_js_1.ready)(brk, session, current)); }
    };
};
var Container = (0, react_redux_1.connect)(mapStateToProps, mapDispatchToProps)(App);
react_dom_1.default.render(react_1.default.createElement(AppWrapper, null), document.querySelector('#main'));
