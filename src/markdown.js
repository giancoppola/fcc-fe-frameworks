"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var store = require('./markdown-state.js').default;
var markdown_state_js_1 = require("./markdown-state.js");
var react_redux_1 = require("react-redux");
var react_1 = __importDefault(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
var ButtonWrapper = function (props) {
    return (react_1.default.createElement("div", { className: "button-wrapper" },
        react_1.default.createElement("a", { className: 'button-wrapper_tweet', href: "twitter.com/intent/tweet", target: '_blank', id: "tweet-quote" }, "Tweety"),
        react_1.default.createElement("button", { className: 'button-wrapper_new', id: "new-quote", onClick: props.parentProps.getRandomQuote }, "Test")));
};
var App = function (props) {
    return (react_1.default.createElement("div", { id: "quote-box", className: 'quote-box' },
        react_1.default.createElement("div", null,
            react_1.default.createElement("h3", { id: 'author', className: 'quote-box__author' }, props.author),
            react_1.default.createElement("p", { id: 'text', className: 'quote-box__quote' }, props.quote)),
        react_1.default.createElement(ButtonWrapper, { parentProps: props })));
};
var AppWrapper = function (props) {
    console.log(props);
    return (react_1.default.createElement(react_redux_1.Provider, { store: store },
        react_1.default.createElement(Container, null)));
};
var mapStateToProps = function (state) {
    return {
        current: state,
    };
};
var mapDispatchToProps = function (dispatch, ownProps) {
    return {
        // @ts-ignore
        getRandomQuote: function () { return dispatch((0, markdown_state_js_1.updateText)(ownProps.text)); }
    };
};
var Container = (0, react_redux_1.connect)(mapStateToProps, mapDispatchToProps)(App);
react_dom_1.default.render(react_1.default.createElement(AppWrapper, null), document.querySelector('#wrapper'));
