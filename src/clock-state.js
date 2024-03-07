"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tick = exports.ready = exports.restart = exports.end = exports.breakTime = exports.sessionTime = exports.set = exports.defaultState = exports.END = exports.BREAK = exports.SESSION = exports.READY = exports.SET = void 0;
var redux_1 = require("redux");
// action types
exports.SET = 'SET';
exports.READY = 'READY';
exports.SESSION = 'SESSION';
exports.BREAK = 'BREAK';
exports.END = 'END';
var TICK = 'TICK';
var RESTART = 'RESTART';
exports.defaultState = {
    break: 5,
    session: 25,
    current: 1500,
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
var sessionTime = function (brk, session) {
    return {
        type: exports.SESSION,
        break: brk,
        session: session,
        progress: exports.SESSION
    };
};
exports.sessionTime = sessionTime;
var breakTime = function () {
    return {
        type: exports.BREAK,
        progress: exports.BREAK
    };
};
exports.breakTime = breakTime;
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
var ready = function (brk, session) {
    return {
        type: exports.READY,
        break: brk,
        session: session,
        progress: exports.READY
    };
};
exports.ready = ready;
var tick = function () {
    return {
        type: TICK,
    };
};
exports.tick = tick;
// reducer
var reducer = function (state, action) {
    if (state === void 0) { state = exports.defaultState; }
    console.log(action);
    switch (action.type) {
        case exports.SET: {
            var current = action.session * 60;
            return {
                break: action.break,
                session: action.session,
                current: current,
                progress: state.progress
            };
        }
        case TICK: {
            var current = state.current - 1;
            return {
                break: state.break,
                session: state.session,
                current: current,
                progress: state.progress
            };
        }
        case exports.SESSION: {
            var current = action.session * 60;
            return {
                break: action.break,
                session: action.session,
                current: current,
                progress: action.progress
            };
        }
        case exports.BREAK: {
            var current = state.break * 60;
            return {
                break: state.break,
                session: state.session,
                current: current,
                progress: action.progress
            };
        }
        case exports.END: {
            var current = state.break * 60;
            return {
                break: state.break,
                session: state.session,
                current: current,
                progress: action.progress
            };
        }
        case exports.READY:
            return exports.defaultState;
    }
    return exports.defaultState;
};
var store = (0, redux_1.legacy_createStore)(reducer);
exports.default = store;
