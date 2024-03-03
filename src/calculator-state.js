"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.defaultState = exports.UPDATE = void 0;
var redux_1 = require("redux");
var QUOTE_URL = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';
// action types
exports.UPDATE = 'UPDATE';
exports.defaultState = {
    formula: '',
    formulaHistory: [],
    output: '0',
    outputHistory: []
};
// action creators
var update = function (formula, output) {
    return {
        type: exports.UPDATE,
        formula: formula,
        output: output
    };
};
exports.update = update;
// reducer
var reducer = function (state, action) {
    if (state === void 0) { state = exports.defaultState; }
    switch (action.type) {
        case exports.UPDATE:
            var newFormula = __spreadArray([], state.formulaHistory, true);
            newFormula.push(action.formula);
            var newOutput = __spreadArray([], state.outputHistory, true);
            newOutput.push(action.output);
            return {
                formula: action.formula,
                formulaHistory: newFormula,
                output: action.output,
                outputHistory: newOutput
            };
    }
    return exports.defaultState;
};
var store = (0, redux_1.legacy_createStore)(reducer);
exports.default = store;
