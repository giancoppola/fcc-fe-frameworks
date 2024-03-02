"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSamples = exports.updatePlaying = exports.updateVolume = exports.defaultState = exports.SAMPLES = exports.PLAYING = exports.VOLUME = void 0;
var redux_1 = require("redux");
var QUOTE_URL = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';
// action types
exports.VOLUME = 'VOLUME';
exports.PLAYING = 'PLAYING';
exports.SAMPLES = 'SAMPLES';
var defaultSamples = [
    { key: 'Q', audio: '../sounds/Heater-1.mp3', name: 'Heater 1' },
    { key: 'W', audio: '../sounds/Heater-2.mp3', name: 'Heater 2' },
    { key: 'E', audio: '../sounds/Heater-3.mp3', name: 'Heater 3' },
    { key: 'A', audio: '../sounds/Heater-4.mp3', name: 'Heater 4' },
    { key: 'S', audio: '../sounds/Heater-6.mp3', name: 'Clap' },
    { key: 'D', audio: '../sounds/Dsc_Oh.mp3', name: 'Open HH' },
    { key: 'Z', audio: '../sounds/Kick_n_Hat.mp3', name: 'Kick and Hat' },
    { key: 'X', audio: '../sounds/RP4_KICK_1.mp3', name: 'Kick' },
    { key: 'C', audio: '../sounds/Cev_H2.mp3', name: 'Closed HH' },
];
exports.defaultState = {
    playing: '',
    volume: 50,
    samples: defaultSamples
};
// action creators
var updateVolume = function (volume) {
    return {
        type: exports.VOLUME,
        volume: volume
    };
};
exports.updateVolume = updateVolume;
var updatePlaying = function (playing) {
    return {
        type: exports.PLAYING,
        playing: playing
    };
};
exports.updatePlaying = updatePlaying;
var updateSamples = function (samples) {
    return {
        type: exports.SAMPLES,
        samples: samples
    };
};
exports.updateSamples = updateSamples;
// reducer
var reducer = function (state, action) {
    if (state === void 0) { state = exports.defaultState; }
    switch (action.type) {
        case exports.VOLUME:
            return {
                playing: state.playing,
                volume: action.volume,
                samples: state.samples
            };
        case exports.PLAYING:
            return {
                playing: action.playing,
                volume: state.volume,
                samples: state.samples
            };
        case exports.SAMPLES: {
            return {
                playing: state.playing,
                volume: state.volume,
                samples: action.samples
            };
        }
    }
    return exports.defaultState;
};
var store = (0, redux_1.legacy_createStore)(reducer);
exports.default = store;
