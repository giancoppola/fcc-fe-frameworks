"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var store = require('./calculator-state.js').default;
var calculator_state_js_1 = require("./calculator-state.js");
var react_redux_1 = require("react-redux");
var react_1 = __importDefault(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
var marked = require('marked');
var Controls = function (props) {
    return (react_1.default.createElement("div", { className: "controls", id: "controls" },
        react_1.default.createElement("button", { id: "clear", value: 'AC', className: "AC btn btn--red" }, "AC"),
        react_1.default.createElement("button", { className: 'btn btn--light', id: "divide", value: "/" }, "/"),
        react_1.default.createElement("button", { className: 'btn btn--light', id: "multiply", value: "x" }, "x"),
        react_1.default.createElement("button", { className: 'btn', id: "seven", value: "7" }, "7"),
        react_1.default.createElement("button", { className: 'btn', id: "eight", value: "8" }, "8"),
        react_1.default.createElement("button", { className: 'btn', id: "nine", value: "9" }, "9"),
        react_1.default.createElement("button", { className: 'btn btn--light', id: "subtract", value: "-" }, "-"),
        react_1.default.createElement("button", { className: "btn", id: "four", value: "4" }, "4"),
        react_1.default.createElement("button", { className: "btn", id: "five", value: "5" }, "5"),
        react_1.default.createElement("button", { className: "btn", id: "six", value: "6" }, "6"),
        react_1.default.createElement("button", { className: 'btn btn--light', id: "add", value: "+" }, "+"),
        react_1.default.createElement("button", { className: "btn", id: "one", value: "1" }, "1"),
        react_1.default.createElement("button", { className: "btn", id: "two", value: "2" }, "2"),
        react_1.default.createElement("button", { className: "btn", id: "three", value: "3" }, "3"),
        react_1.default.createElement("button", { className: "zero btn", id: "zero", value: "0" }, "0"),
        react_1.default.createElement("button", { className: 'btn', id: "decimal", value: "." }, "."),
        react_1.default.createElement("button", { className: "equals btn btn--blue", id: "equals", value: "=" }, "=")));
};
var Output = function (props) {
    return (react_1.default.createElement("div", { className: "output-display", id: "display" }, props.output));
};
var Formula = function (props) {
    return (react_1.default.createElement("div", { className: "formula-display", id: "formula-display" }));
};
var App = function (props) {
    console.log(props);
    return (react_1.default.createElement("div", { id: "calculator", className: "calculator" },
        react_1.default.createElement(Formula, { formula: props.formula, output: props.output, update: props.update }),
        react_1.default.createElement(Output, { formula: props.formula, output: props.output, update: props.update }),
        react_1.default.createElement(Controls, { update: props.update })));
};
var AppWrapper = function (props) {
    return (react_1.default.createElement(react_redux_1.Provider, { store: store },
        react_1.default.createElement(Container, null)));
};
var mapStateToProps = function (state) {
    return {
        formula: state.formula,
        formulaHistory: state.formulaHistory,
        output: state.output,
        outputHistory: state.outputHistory
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        update: function (formula, output) { return dispatch((0, calculator_state_js_1.update)(formula, output)); },
    };
};
var Container = (0, react_redux_1.connect)(mapStateToProps, mapDispatchToProps)(App);
react_dom_1.default.render(react_1.default.createElement(AppWrapper, null), document.querySelector('#main'));
