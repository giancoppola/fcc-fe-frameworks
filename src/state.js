"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
// action types
var NEXT = 'NEXT';
var defaultState = {
    quote: ''
};
// action
var nextQuote = function () {
    return {
        type: NEXT
    };
};
// reducer
var reducer = function (state, action) {
    if (state === void 0) { state = defaultState; }
    return defaultState;
};
exports.default = (0, redux_1.legacy_createStore)(reducer);
