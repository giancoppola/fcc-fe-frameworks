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
interface iSample {
    key: string,
    audio: string,
}
export interface iState {
    playing: string,
    volume: number,
    samples: Array<iSample>
}
const defaultSamples: Array<iSample> = [
    {key: 'Q', audio: 'Heater-1.mp3'},
    {key: 'W', audio: 'Heater-2.mp3'},
    {key: 'E', audio: 'Heater-3.mp3'},
    {key: 'A', audio: 'Heater-4.mp3'},
    {key: 'S', audio: 'Heater-6.mp3'},
    {key: 'D', audio: 'Dsc_Oh.mp3'},
    {key: 'Z', audio: 'Kick_n_Hat.mp3'},
    {key: 'X', audio: 'RP4_KICK_1.mp3'},
    {key: 'C', audio: 'Cev_H2.mp3'},
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
export const updatePlaying = (playing: number) => {
    return {
        type: VOLUME,
        volume: playing
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
                volume: action.volume
            };
        case PLAYING:
            return {
                playing: action.playing
            };
        case SAMPLES: {
            return {
                samples: action.samples
            }
        }
    }
    return defaultState;
}

const store = legacy_createStore(reducer)
export default store;