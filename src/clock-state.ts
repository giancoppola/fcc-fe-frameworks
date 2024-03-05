import { GetState } from '@reduxjs/toolkit';
import Redux, { Action, Store, legacy_createStore, Dispatch, Middleware, applyMiddleware, UnknownAction } from 'redux';
import { UseDispatch } from 'react-redux';

// action types
export const READY = 'READY';
export const START = 'START';
export const PAUSE = 'PAUSE';
export const END = 'END';
const RESTART = 'RESTART';
export interface ClockAction extends Action {
    type: string,
    break: number,
    session: number,
    current: string,
    progress: string
}

// states
export interface iState {
    break: number,
    session: number,
    current: string,
    progress: string
}
export const defaultState: iState = {
    break: 5,
    session: 25,
    current: "25:00",
    progress: READY
}

// action creators
export const start = (brk: number, session: number, current: string) => {
    return {
        type: START,
        break: brk,
        session: session,
        current: current,
        progress: START
    }
}
export const pause = (brk: number, session: number, current: string) => {
    return {
        type: PAUSE,
        break: brk,
        session: session,
        current: current,
        progress: PAUSE
    }
}
export const end = () => {
    return {
        type: END,
        progress: END
    }
}
export const restart = () => {
    return {
        type: RESTART,
        progress: READY
    }
}
export const ready = (brk: number, session: number, current: string) => {
    return {
        type: READY,
        break: brk,
        session: session,
        current: current,
        progress: READY
    }
}

// reducer
const reducer = (state: iState = defaultState, action: ClockAction) => {
    console.log(action);
    switch(action.type){
        case START:
            return {
                break: action.break,
                session: action.session,
                current: action.current,
                progress: action.progress
            }
        case PAUSE:
            return {
                break: action.break,
                session: action.session,
                current: action.current,
                progress: action.progress
            }
        case END:
            return {
                break: action.break,
                session: action.session,
                current: action.current,
                progress: action.progress
            }
        case READY:
            return defaultState
    }
    return defaultState;
}

const store = legacy_createStore(reducer)
export default store;