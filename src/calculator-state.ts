import { GetState } from '@reduxjs/toolkit';
import Redux, { Action, Store, legacy_createStore, Dispatch, Middleware, applyMiddleware, UnknownAction } from 'redux';
import { UseDispatch } from 'react-redux';
const QUOTE_URL = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

// action types
export const UPDATE = 'UPDATE';
export interface CalcAction extends Action {
    type: string,
    formula: string,
    output: string,
}

// states
export interface iState {
    formula: string,
    formulaHistory: Array<string>,
    output: string,
    outputHistory: Array<string>
}
export const defaultState: iState = {
    formula: '',
    formulaHistory: [],
    output: '0',
    outputHistory: []
}

// action creators
export const update = (formula: string, output: string) => {
    return {
        type: UPDATE,
        formula: formula,
        output: output
    }
}

// reducer
const reducer = (state: iState = defaultState, action: CalcAction) => {
    switch(action.type){
        case UPDATE:
            let newFormula = [...state.formulaHistory];
            newFormula.push(action.formula);
            let newOutput = [...state.outputHistory];
            newOutput.push(action.output);
            return {
                formula: action.formula,
                formulaHistory: newFormula,
                output: action.output,
                outputHistory: newOutput
            };
    }
    return defaultState;
}

const store = legacy_createStore(reducer)
export default store;