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
var store = require('./drums-state.js').default;
var react_redux_1 = require("react-redux");
var react_1 = __importStar(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
var marked = require('marked');
var Editor = function (props) {
    console.log(props);
    (0, react_1.useEffect)(function () {
        console.log('fired');
        var textArea = document.querySelector('#editor');
        textArea.addEventListener("keyup", function (e) {
            props.updateText(e.target.value);
        });
    }, []);
    return (react_1.default.createElement("div", { className: "editor-wrapper", id: "editor-wrapper" },
        react_1.default.createElement("textarea", { name: "editor", id: "editor", className: "editor" }, props.current)));
};
var Preview = function (props) {
    (0, react_1.useEffect)(function () {
        var preview = document.querySelector('#preview');
        preview.innerHTML = marked.parse(props.current);
    });
    return (react_1.default.createElement("div", { className: "preview-wrapper", id: "preview-wrapper" },
        react_1.default.createElement("div", { className: "preview", id: "preview" })));
};
var App = function (props) {
    console.log(props);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Editor, { current: props.current, updateText: props.updateText }),
        react_1.default.createElement(Preview, { current: props.current })));
};
var AppWrapper = function (props) {
    return (react_1.default.createElement(react_redux_1.Provider, { store: store },
        react_1.default.createElement(Container, null)));
};
var mapStateToProps = function (state) {
    return {
        current: state,
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
    // updateText: (text: string) => dispatch(updateText(text))
    };
};
var Container = (0, react_redux_1.connect)(mapStateToProps, mapDispatchToProps)(App);
react_dom_1.default.render(react_1.default.createElement(AppWrapper, null), document.querySelector('#main'));
