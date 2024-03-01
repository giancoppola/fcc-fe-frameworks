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
var store = require('./state.js').default;
var state_js_1 = require("./state.js");
var react_redux_1 = require("react-redux");
var react_1 = __importStar(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
var ButtonWrapper = function (props) {
    return (react_1.default.createElement("div", { className: "button-wrapper" },
        react_1.default.createElement("a", { className: 'button-wrapper_tweet', href: "twitter.com/intent/tweet", target: '_blank', id: "tweet-quote" }, "Tweety"),
        react_1.default.createElement("button", { className: 'button-wrapper_new', id: "new-quote", onClick: props.parentProps.getRandomQuote }, "Test")));
};
var QuoteBox = function (props) {
    return (react_1.default.createElement("div", { id: "quote-box", className: 'quote-box' },
        react_1.default.createElement("div", null,
            react_1.default.createElement("h3", { id: 'author', className: 'quote-box__author' }, props.author),
            react_1.default.createElement("p", { id: 'text', className: 'quote-box__quote' }, props.quote)),
        react_1.default.createElement(ButtonWrapper, { parentProps: props })));
};
var AppWrapper = function (props) {
    console.log(props);
    (0, react_1.useEffect)(function () {
        console.log('mounted');
        // @ts-ignore
        store.dispatch((0, state_js_1.GetRandomQuote)());
        console.log(props);
    });
    return (react_1.default.createElement(react_redux_1.Provider, { store: store },
        react_1.default.createElement(Container, null)));
};
var mapStateToProps = function (state) {
    return {
        author: state.author,
        quote: state.quote,
        quotes: state.quotes
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        // @ts-ignore
        getRandomQuote: function () { return dispatch((0, state_js_1.GetRandomQuote)()); }
    };
};
var Container = (0, react_redux_1.connect)(mapStateToProps, mapDispatchToProps)(QuoteBox);
react_dom_1.default.render(react_1.default.createElement(AppWrapper, null), document.querySelector('#wrapper'));
