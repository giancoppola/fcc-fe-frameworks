import { GetState } from '@reduxjs/toolkit';
import Redux, { Action, Store, legacy_createStore, Dispatch, Middleware, applyMiddleware, UnknownAction } from 'redux';
import { UseDispatch } from 'react-redux';

// action types
export const SET = 'SET';
export const READY = 'READY';
export const SESSION = 'SESSION';
export const PAUSE = 'PAUSE';
export const BREAK = 'BREAK';
export const END = 'END';
const TICK = 'TICK';
const RESTART = 'RESTART';
export interface ClockAction extends Action {
    type: string,
    break: number,
    session: number,
    current: number,
    progress: string
}

// states
export interface iState {
    break: number,
    session: number,
    current: number,
    progress: string
}
export const defaultState: iState = {
    break: 5,
    session: 25,
    current: 1500,
    progress: READY
}

// action creators
export const set = (brk: number, session: number) => {
    return {
        type: SET,
        break: brk,
        session: session,
    }
}
export const sessionTime = (brk: number, session: number) => {
    return {
        type: SESSION,
        break: brk,
        session: session,
        progress: SESSION
    }
}
export const breakTime = () => {
    return {
        type: BREAK,
        progress: BREAK
    }
}
export const pause = (brk: number, session: number) => {
    return {
        type: PAUSE,
        break: brk,
        session: session,
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
export const ready = (brk: number, session: number) => {
    return {
        type: READY,
        break: brk,
        session: session,
        progress: READY
    }
}
export const tick = () => {
    return {
        type: TICK,
    }
}

// reducer
const reducer = (state: iState = defaultState, action: ClockAction) => {
    console.log(action);
    switch(action.type){
        case SET: {
            let current = action.session * 60;
            return {
                break: action.break,
                session: action.session,
                current: current,
                progress: state.progress
            }
        }
        case TICK: {
            let current = state.current - 1;
            return {
                break: state.break,
                session: state.session,
                current: current,
                progress: state.progress
            }
        }
        case SESSION: {
            let current = action.session * 60;
            return {
                break: action.break,
                session: action.session,
                current: current,
                progress: action.progress
            }
        }
        case BREAK: {
            let current = state.break * 60;
            return {
                break: state.break,
                session: state.session,
                current: current,
                progress: action.progress
            }
        }
        case PAUSE: {
            return {
                break: state.break,
                session: state.session,
                current: state.current,
                progress: action.progress
            }
        }
        case END: {
            let current  = state.break * 60;
            return {
                break: state.break,
                session: state.session,
                current: current,
                progress: action.progress
            }
        }
        case READY:
            return defaultState
    }
    return defaultState;
}

const store = legacy_createStore(reducer)
export default store;