"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var store = require('./state.js').default;
var react_redux_1 = require("react-redux");
var react_1 = __importDefault(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
console.log("Hello World!");
var Button = function () {
    return (react_1.default.createElement("div", { id: "quote-box", className: 'quote-box' },
        react_1.default.createElement("button", null, "Test"),
        react_1.default.createElement("p", null, "HI!")));
};
var AppWrapper = function () {
    return (react_1.default.createElement(react_redux_1.Provider, { store: store },
        react_1.default.createElement(Button, null)));
};
react_dom_1.default.render(react_1.default.createElement(AppWrapper, null), document.querySelector('#wrapper'));
