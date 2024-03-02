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
var drums_state_js_1 = require("./drums-state.js");
var react_redux_1 = require("react-redux");
var react_1 = __importStar(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
var marked = require('marked');
var Drums = function (props) {
    console.log(props);
    (0, react_1.useEffect)(function () {
        var drums = document.querySelectorAll('.drum-pad');
        drums.forEach(function (drum) {
            drum.addEventListener('click', function (e) {
                var audio = e.target.querySelector('audio');
                audio.play();
                props.updatePlaying(audio.getAttribute('data-name'));
            });
        });
    }, []);
    (0, react_1.useEffect)(function () {
        var audios = document.querySelectorAll('audio');
        audios.forEach(function (audio) {
            audio.volume = (props.volume / 100);
        });
    }, [props.volume]);
    return (react_1.default.createElement("div", { className: "drums", id: "drums" }, props.samples.map(function (sample) {
        window.addEventListener('keydown', function (e) {
            var code = "Key" + sample.key;
            if (e.code == code) {
                var audio = document.querySelector("audio#".concat(sample.key));
                audio.volume = (props.volume / 100);
                audio.play();
                props.updatePlaying(audio.getAttribute('data-name'));
            }
        });
        return (react_1.default.createElement("button", { id: sample.name, className: "drum-pad", "data-key": sample.key },
            sample.key,
            react_1.default.createElement("audio", { src: sample.audio, className: "clip", id: sample.key, "data-name": sample.name })));
    })));
};
var Controls = function (props) {
    (0, react_1.useEffect)(function () {
        var vol = document.querySelector('#volume');
        vol.addEventListener('input', function (e) {
            props.updateVolume(e.target.value);
            var audios = document.querySelectorAll('audio');
            audios.forEach(function (audio) {
                audio.volume = props.volume / 100;
            });
        });
    }, []);
    return (react_1.default.createElement("div", { className: "controls", id: "controls" },
        react_1.default.createElement("h4", { className: "display", id: "display" }, props.playing),
        react_1.default.createElement("input", { type: "range", min: "1", max: "100", value: props.volume, className: "volume", id: "volume" })));
};
var App = function (props) {
    console.log(props);
    return (react_1.default.createElement("div", { id: 'drum-machine', className: 'drum-machine' },
        react_1.default.createElement(Drums, { samples: props.samples, updatePlaying: props.updatePlaying, volume: props.volume }),
        react_1.default.createElement(Controls, { playing: props.playing, volume: props.volume, updateVolume: props.updateVolume, updateSamples: props.updateSamples })));
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
