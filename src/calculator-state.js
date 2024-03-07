"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
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
exports.equals = exports.clear = exports.action = exports.number = exports.defaultState = exports.EQUALS = exports.CLEAR = exports.ACTION = exports.NUMBER = void 0;
var math = require('mathjs');
var redux_1 = require("redux");
var QUOTE_URL = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';
// action types
exports.NUMBER = 'NUMBER';
exports.ACTION = 'ACTION';
exports.CLEAR = 'CLEAR';
exports.EQUALS = 'EQUALS';
exports.defaultState = {
    formula: '',
    formulaHistory: [],
    output: '0',
    outputHistory: []
};
// action creators
var number = function (current) {
    return {
        type: exports.NUMBER,
        current: current
    };
};
exports.number = number;
var action = function (current) {
    return {
        type: exports.ACTION,
        current: current
    };
};
exports.action = action;
var clear = function () {
    console.log('clear action creator');
    return {
        type: exports.CLEAR,
    };
};
exports.clear = clear;
var equals = function () {
    console.log('clear?');
    return {
        type: exports.EQUALS,
    };
};
exports.equals = equals;
// reducer
var reducer = function (state, action) {
    if (state === void 0) { state = exports.defaultState; }
    console.log(action);
    switch (action.type) {
        case exports.NUMBER: {
            // if current output is once of the below, it should be overwritten
            var diff = ['0', '+', '-', '*', '/'];
            // don't allow more than one decimal
            action.current == "." && state.output.includes('.') ? action.current = '' : action.current;
            var newFormula = state.formula == '0' ? action.current : state.formula + action.current;
            newFormula.includes("=") ? newFormula = newFormula.split("= ")[1] : newFormula;
            var newFormulaHistory = __spreadArray([], __read(state.formulaHistory), false);
            newFormulaHistory.push(newFormula);
            var newOutput = diff.includes(state.output) ? action.current : state.output + action.current;
            var newOutputHistory = __spreadArray([], __read(state.outputHistory), false);
            newOutputHistory.push(newOutput);
            return {
                formula: newFormula,
                formulaHistory: newFormulaHistory,
                output: newOutput,
                outputHistory: newOutputHistory
            };
        }
        case exports.ACTION: {
            var diff = ['+', '*', '/'];
            diff.includes(state.formula.slice(-1)) && action.current != '-' ? state.formula = state.formula.slice(0, state.formula.length - 1) : state.formula;
            var newForm = state.formula + action.current;
            newForm.includes('=') ? newForm = newForm.split('= ')[1] : newForm;
            var newFormHistory = __spreadArray([], __read(state.formulaHistory), false);
            newFormHistory.push(newForm);
            var newOut = action.current;
            var newOutHistory = __spreadArray([], __read(state.outputHistory), false);
            newOutHistory.push(newOut);
            return {
                formula: newForm,
                formulaHistory: newFormHistory,
                output: newOut,
                outputHistory: newOutHistory
            };
        }
        case exports.EQUALS: {
            var res = math.evaluate(state.formula);
            console.log(res);
            var newForm = state.formula + action.current;
            var newFormHistory = __spreadArray([], __read(state.formulaHistory), false);
            newFormHistory.push(newForm);
            var newOut = action.current;
            var newOutHistory = __spreadArray([], __read(state.outputHistory), false);
            newOutHistory.push(newOut);
            return {
                formula: state.formula + "= " + res,
                formulaHistory: newFormHistory,
                output: res,
                outputHistory: newOutHistory
            };
        }
        case exports.CLEAR: {
            return exports.defaultState;
        }
    }
    return exports.defaultState;
};
var store = (0, redux_1.legacy_createStore)(reducer);
exports.default = store;
