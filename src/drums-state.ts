import { GetState } from '@reduxjs/toolkit';
import Redux, { Action, Store, legacy_createStore, Dispatch, Middleware, applyMiddleware, UnknownAction } from 'redux';
import { UseDispatch } from 'react-redux';
const QUOTE_URL = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

// action types
export const VOLUME = 'VOLUME';
export const PLAYING = 'PLAYING';
export const SAMPLES = 'SAMPLES';
export interface DrumAction extends Action {
    type: string,
    playing: string,
    volume: number,
    samples: Array<iSample>
}

// states
export interface iSample {
    key: string,
    audio: string,
    name: string
}
export interface iState {
    playing: string,
    volume: number,
    samples: Array<iSample>
}
const defaultSamples: Array<iSample> = [
    {key: 'Q', audio: '../sounds/Heater-1.mp3', name: 'Heater 1'},
    {key: 'W', audio: '../sounds/Heater-2.mp3', name: 'Heater 2'},
    {key: 'E', audio: '../sounds/Heater-3.mp3', name: 'Heater 3'},
    {key: 'A', audio: '../sounds/Heater-4.mp3', name: 'Heater 4'},
    {key: 'S', audio: '../sounds/Heater-6.mp3', name: 'Clap'},
    {key: 'D', audio: '../sounds/Dsc_Oh.mp3', name: 'Open HH'},
    {key: 'Z', audio: '../sounds/Kick_n_Hat.mp3', name: 'Kick and Hat'},
    {key: 'X', audio: '../sounds/RP4_KICK_1.mp3', name: 'Kick'},
    {key: 'C', audio: '../sounds/Cev_H2.mp3', name: 'Closed HH'},
]
export const defaultState: iState = {
    playing: '',
    volume: 50,
    samples: defaultSamples
}

// action creators
export const updateVolume = (volume: number) => {
    return {
        type: VOLUME,
        volume: volume
    }
}
export const updatePlaying = (playing: string) => {
    return {
        type: PLAYING,
        playing: playing
    }
}
export const updateSamples = (samples: Array<iSample>) => {
    return {
        type: SAMPLES,
        samples: samples
    }
}

// reducer
const reducer = (state: iState = defaultState, action: DrumAction) => {
    switch(action.type){
        case VOLUME:
            return {
                playing: state.playing,
                volume: action.volume,
                samples: state.samples
            };
        case PLAYING:
            return {
                playing: action.playing,
                volume: state.volume,
                samples: state.samples
            };
        case SAMPLES: {
            return {
                playing: state.playing,
                volume: state.volume,
                samples: action.samples
            }
        }
    }
    return defaultState;
}

const store = legacy_createStore(reducer)
export default store;