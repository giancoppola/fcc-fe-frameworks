import Redux, { Dispatch, Store, legacy_createStore } from 'redux';
import { ThunkMiddleware } from 'redux-thunk';
const store: Store = require('./state.js').default;
import {GetRandomQuote, iState} from './state.js';
import {ConnectedProps, Provider, connect} from 'react-redux';
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';

const ButtonWrapper = (props: any) => {
    return (
        <div className="button-wrapper">
            <a className='button-wrapper_tweet' href="twitter.com/intent/tweet" target='_blank' id="tweet-quote">Tweety</a>
            <button className='button-wrapper_new' id="new-quote" onClick={props.parentProps.getRandomQuote}>Test</button>
        </div>
    )
}

const QuoteBox = (props: any) => {
    return (
        <div id="quote-box" className='quote-box'>
            <div>
                <h3 id='author' className='quote-box__author'>{props.author}</h3>
                <p id='text' className='quote-box__quote'>{props.quote}</p>
            </div>
            <ButtonWrapper parentProps={props}/>
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

const Container = connect(mapStateToProps, mapDispatchToProps)(QuoteBox);
ReactDOM.render(<AppWrapper/>, document.querySelector('#wrapper'));