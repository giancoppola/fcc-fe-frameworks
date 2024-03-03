"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var store = require('./drums-state.js').default;
var drums_state_js_1 = require("./drums-state.js");
var react_redux_1 = require("react-redux");
var react_1 = __importDefault(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
var marked = require('marked');
var Controls = function (props) {
    return (react_1.default.createElement("div", { className: "controls", id: "controls" }));
};
var Output = function (props) {
    return (react_1.default.createElement("div", { className: "output-display", id: "output-display" }));
};
var Formula = function (props) {
    return (react_1.default.createElement("div", { className: "formula-display", id: "formula-display" }));
};
var Calculator = function (props) {
    return (react_1.default.createElement("div", { id: "calculator", className: "calculator" },
        react_1.default.createElement(Formula, null),
        react_1.default.createElement(Output, null),
        react_1.default.createElement(Controls, null)));
};
var App = function (props) {
    console.log(props);
    return (react_1.default.createElement("div", { id: 'drum-machine', className: 'drum-machine' },
        react_1.default.createElement(Calculator, null)));
};
var AppWrapper = function (props) {
    return (react_1.default.createElement(react_redux_1.Provider, { store: store },
        react_1.default.createElement(Container, null)));
};
var mapStateToProps = function (state) {
    return {
        playing: state.playing,
        volume: state.volume,
        samples: state.samples
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        updatePlaying: function (text) { return dispatch((0, drums_state_js_1.updatePlaying)(text)); },
        updateVolume: function (volume) { return dispatch((0, drums_state_js_1.updateVolume)(volume)); },
        updateSamples: function (samples) { return dispatch((0, drums_state_js_1.updateSamples)(samples)); }
    };
};
var Container = (0, react_redux_1.connect)(mapStateToProps, mapDispatchToProps)(App);
react_dom_1.default.render(react_1.default.createElement(AppWrapper, null), document.querySelector('#main'));
