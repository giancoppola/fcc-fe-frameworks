"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ready = exports.restart = exports.end = exports.pause = exports.start = exports.set = exports.defaultState = exports.END = exports.PAUSE = exports.START = exports.READY = exports.SET = void 0;
var redux_1 = require("redux");
// action types
exports.SET = 'SET';
exports.READY = 'READY';
exports.START = 'START';
exports.PAUSE = 'PAUSE';
exports.END = 'END';
var RESTART = 'RESTART';
exports.defaultState = {
    break: 5,
    session: 25,
    current: "25:00",
    progress: exports.READY
};
// action creators
var set = function (brk, session) {
    return {
        type: exports.SET,
        break: brk,
        session: session,
    };
};
exports.set = set;
var start = function (brk, session, current) {
    return {
        type: exports.START,
        break: brk,
        session: session,
        current: current,
        progress: exports.START
    };
};
exports.start = start;
var pause = function (brk, session, current) {
    return {
        type: exports.PAUSE,
        break: brk,
        session: session,
        current: current,
        progress: exports.PAUSE
    };
};
exports.pause = pause;
var end = function () {
    return {
        type: exports.END,
        progress: exports.END
    };
};
exports.end = end;
var restart = function () {
    return {
        type: RESTART,
        progress: exports.READY
    };
};
exports.restart = restart;
var ready = function (brk, session, current) {
    return {
        type: exports.READY,
        break: brk,
        session: session,
        current: current,
        progress: exports.READY
    };
};
exports.ready = ready;
// reducer
var reducer = function (state, action) {
    if (state === void 0) { state = exports.defaultState; }
    console.log(action);
    switch (action.type) {
        case exports.SET: {
            var current = "".concat(action.session, ":00");
            return {
                break: action.break,
                session: action.session,
                current: current,
                progress: state.progress
            };
        }
        case exports.START:
            return {
                break: action.break,
                session: action.session,
                current: action.current,
                progress: action.progress
            };
        case exports.PAUSE:
            return {
                break: action.break,
                session: action.session,
                current: action.current,
                progress: action.progress
            };
        case exports.END:
            return {
                break: action.break,
                session: action.session,
                current: action.current,
                progress: action.progress
            };
        case exports.READY:
            return exports.defaultState;
    }
    return exports.defaultState;
};
var store = (0, redux_1.legacy_createStore)(reducer);
exports.default = store;
