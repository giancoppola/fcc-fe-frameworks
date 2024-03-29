const math = require('mathjs')
import { GetState } from '@reduxjs/toolkit';
import Redux, { Action, Store, legacy_createStore, Dispatch, Middleware, applyMiddleware, UnknownAction } from 'redux';
import { UseDispatch } from 'react-redux';
const QUOTE_URL = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

// action types
export const NUMBER = 'NUMBER';
export const ACTION = 'ACTION';
export const CLEAR = 'CLEAR';
export const EQUALS = 'EQUALS';
export interface CalcAction extends Action {
    type: string,
    current: string,
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
export const number = (current: string) => {
    return {
        type: NUMBER,
        current: current
    }
}
export const action = (current: string) => {
    return {
        type: ACTION,
        current: current
    }
}
export const clear = () => {
    console.log('clear action creator')
    return {
        type: CLEAR,
    }
}
export const equals = () => {
    console.log('clear?')
    return {
        type: EQUALS,
    }
}

// reducer
const reducer = (state: iState = defaultState, action: CalcAction) => {
    console.log(action);
    switch(action.type){
        case NUMBER: {
            // if current output is once of the below, it should be overwritten
            let diff = ['0', '+', '-', '*', '/'];
            // don't allow more than one decimal
            action.current == "." && state.output.includes('.') ? action.current = '' : action.current;
            let newFormula = state.formula == '0' ? action.current : state.formula + action.current;
            newFormula.includes("=") ? newFormula = newFormula.split("= ")[1] : newFormula;
            let newFormulaHistory = [...state.formulaHistory];
            newFormulaHistory.push(newFormula);
            let newOutput = diff.includes(state.output) ? action.current : state.output + action.current;
            let newOutputHistory = [...state.outputHistory];
            newOutputHistory.push(newOutput);
            return {
                formula: newFormula,
                formulaHistory: newFormulaHistory,
                output: newOutput,
                outputHistory: newOutputHistory
            };
        }
        case ACTION: {
            let diff = ['+', '*', '/']
            diff.includes(state.formula.slice(-1)) && action.current != '-' ? state.formula = state.formula.slice(0, state.formula.length -1) : state.formula;
            let newForm = state.formula + action.current
            newForm.includes('=') ? newForm = newForm.split('= ')[1] : newForm;
            let newFormHistory = [...state.formulaHistory];
            newFormHistory.push(newForm);
            let newOut = action.current;
            let newOutHistory = [...state.outputHistory];
            newOutHistory.push(newOut);
            return {
                formula: newForm,
                formulaHistory: newFormHistory,
                output: newOut,
                outputHistory: newOutHistory
            };
        }
        case EQUALS: {
            let res = math.evaluate(state.formula);
            console.log(res);
            let newForm = state.formula + action.current
            let newFormHistory = [...state.formulaHistory];
            newFormHistory.push(newForm);
            let newOut = action.current;
            let newOutHistory = [...state.outputHistory];
            newOutHistory.push(newOut);
            return {
                formula: state.formula + "= " + res,
                formulaHistory: newFormHistory,
                output: res,
                outputHistory: newOutHistory
            }
        }
        case CLEAR: {
            return defaultState;
        }
    }
    return defaultState;
}

const store = legacy_createStore(reducer)
export default store;