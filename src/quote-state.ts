import { GetState } from '@reduxjs/toolkit';
import Redux, { Action, Store, legacy_createStore, Dispatch, Middleware, applyMiddleware, UnknownAction } from 'redux';
import {ThunkAction, ThunkDispatch, ThunkMiddleware, thunk} from 'redux-thunk';
import { UseDispatch } from 'react-redux';
const QUOTE_URL = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

// functions
const GetRandomIndex = (max: number) => {
    return Math.floor(Math.random() * max)
}

// action types
export const NEXT = 'NEXT';
export interface QuoteAction extends Action {
    type: string,
    quote: iQuote
}

// states
export const defaultState: iState = {
    author: '',
    quote: '',
    quotes: []
}

// action creators
export const nextQuote = (nextQuote: iQuote) => {
    return {
        type: NEXT,
        quote: nextQuote
    }
}

// API middleware
export interface iQuotes {
    quotes: Array<iQuote>;
}
export interface iQuote {
    author: string,
    quote: string
}
export interface iState {
    author: string,
    quote: string,
    quotes: Array<iQuote>
}
export const GetRandomQuote = () => {
    return async (dispatch: Dispatch, getState: GetState<iState>) => {
        console.log('here');
        let result: Array<iQuote>;
        try{
            console.log('here now')
            await fetch(QUOTE_URL)
            .then((res: Response) => {
                return res.json();
            })
            .then((data: iQuotes) => {
                result = data.quotes;
                console.log(result);
            })
        }
        catch(e){
            console.log(e);
            return
        }
        dispatch(nextQuote(result[GetRandomIndex(result.length)]))
    }
}

// reducer
const reducer = (state = defaultState, action: QuoteAction) => {
    switch(action.type){
        case NEXT:
            let newQuotes = [...state.quotes]
            newQuotes.push(action.quote);
            return {
                author: action.quote.author,
                quote: action.quote.quote,
                quotes: newQuotes
            }
    }
    return defaultState;
}

const thunkMiddleware = applyMiddleware(thunk)
const store = legacy_createStore(reducer, thunkMiddleware)
store.dispatch(GetRandomQuote());
export default store;