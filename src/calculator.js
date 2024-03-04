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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var store = require('./calculator-state.js').default;
var calculator_state_js_1 = require("./calculator-state.js");
var react_redux_1 = require("react-redux");
var react_1 = __importStar(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
var marked = require('marked');
var Controls = function (props) {
    (0, react_1.useEffect)(function () {
        var e_1, _a, e_2, _b;
        var actions = document.querySelectorAll('.action');
        try {
            //@ts-ignore
            for (var actions_1 = __values(actions), actions_1_1 = actions_1.next(); !actions_1_1.done; actions_1_1 = actions_1.next()) {
                var action_1 = actions_1_1.value;
                action_1.addEventListener('click', function (e) {
                    props.action(e.target.getAttribute('value'));
                });
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (actions_1_1 && !actions_1_1.done && (_a = actions_1.return)) _a.call(actions_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var numbers = document.querySelectorAll('.number');
        try {
            //@ts-ignore
            for (var numbers_1 = __values(numbers), numbers_1_1 = numbers_1.next(); !numbers_1_1.done; numbers_1_1 = numbers_1.next()) {
                var number_1 = numbers_1_1.value;
                number_1.addEventListener('click', function (e) {
                    props.number(e.target.getAttribute('value'));
                });
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (numbers_1_1 && !numbers_1_1.done && (_b = numbers_1.return)) _b.call(numbers_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        var clear = document.querySelector('#clear');
        clear.addEventListener('click', function (e) {
            props.clear();
        });
        var equals = document.querySelector('#equals');
        equals.addEventListener('click', function (e) {
            props.equals();
        });
    }, []);
    return (react_1.default.createElement("div", { className: "controls", id: "controls" },
        react_1.default.createElement("button", { id: "clear", value: 'AC', className: "AC btn btn--red" }, "AC"),
        react_1.default.createElement("button", { className: 'action btn btn--light', id: "divide", value: "/" }, "/"),
        react_1.default.createElement("button", { className: 'action btn btn--light', id: "multiply", value: "x" }, "x"),
        react_1.default.createElement("button", { className: 'number btn', id: "seven", value: "7" }, "7"),
        react_1.default.createElement("button", { className: 'number btn', id: "eight", value: "8" }, "8"),
        react_1.default.createElement("button", { className: 'number btn', id: "nine", value: "9" }, "9"),
        react_1.default.createElement("button", { className: 'action btn btn--light', id: "subtract", value: "-" }, "-"),
        react_1.default.createElement("button", { className: "number btn", id: "four", value: "4" }, "4"),
        react_1.default.createElement("button", { className: "number btn", id: "five", value: "5" }, "5"),
        react_1.default.createElement("button", { className: "number btn", id: "six", value: "6" }, "6"),
        react_1.default.createElement("button", { className: 'action btn btn--light', id: "add", value: "+" }, "+"),
        react_1.default.createElement("button", { className: "number btn", id: "one", value: "1" }, "1"),
        react_1.default.createElement("button", { className: "number btn", id: "two", value: "2" }, "2"),
        react_1.default.createElement("button", { className: "number btn", id: "three", value: "3" }, "3"),
        react_1.default.createElement("button", { className: "number zero btn", id: "zero", value: "0" }, "0"),
        react_1.default.createElement("button", { className: 'number btn', id: "decimal", value: "." }, "."),
        react_1.default.createElement("button", { className: "equals btn btn--blue", id: "equals", value: "=" }, "=")));
};
var Output = function (props) {
    return (react_1.default.createElement("div", { className: "output-display", id: "display" }, props.output));
};
var Formula = function (props) {
    return (react_1.default.createElement("div", { className: "formula-display", id: "formula-display" }, props.formula));
};
var App = function (props) {
    console.log(props);
    return (react_1.default.createElement("div", { id: "calculator", className: "calculator" },
        react_1.default.createElement(Formula, { formula: props.formula, output: props.output, update: props.update }),
        react_1.default.createElement(Output, { formula: props.formula, output: props.output, update: props.update }),
        react_1.default.createElement(Controls, { action: props.action, number: props.number, equals: props.equals, clear: props.equals })));
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
        number: function (current) { return dispatch((0, calculator_state_js_1.number)(current)); },
        action: function (current) { return dispatch((0, calculator_state_js_1.action)(current)); },
        clear: function () { return dispatch((0, calculator_state_js_1.clear)()); },
        equals: function () { return dispatch((0, calculator_state_js_1.equals)()); }
    };
};
var Container = (0, react_redux_1.connect)(mapStateToProps, mapDispatchToProps)(App);
react_dom_1.default.render(react_1.default.createElement(AppWrapper, null), document.querySelector('#main'));
