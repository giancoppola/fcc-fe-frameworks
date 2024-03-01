import Redux, { Dispatch, Store, legacy_createStore } from 'redux';
import { ThunkMiddleware } from 'redux-thunk';
const store: Store = require('./state.js').default;
import {GetRandomQuote, iState} from './state.js';
import {ConnectedProps, Provider, connect} from 'react-redux';
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';


console.log("Hello World!");

const Button = (props: any) => {

    return (
        <div id="quote-box" className='quote-box'>
            {/* @ts-ignore */}
            <button onClick={store.dispatch(GetRandomQuote)}>Test</button>
            <h3>{props.author}</h3>
            <p>{props.quote}</p>
        </div>
    )
}

const AppWrapper = (props: any) => {
    console.log(props);
    useEffect(() => {
        console.log('mounted')
    // @ts-ignore
        store.dispatch(GetRandomQuote());
        console.log(props)
    });
    return (
        <Provider store={store}>
            {/* @ts-ignore */}
            <Container />
        </Provider>
    )
}

const mapStateToProps = (state: iState) => {
    return {
        author: state.author,
        quote: state.quote,
        quotes: state.quotes
    }
}
const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        // @ts-ignore
        getRandomQuote: () => dispatch(GetRandomQuote())
    }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(Button);
ReactDOM.render(<AppWrapper/>, document.querySelector('#wrapper'));