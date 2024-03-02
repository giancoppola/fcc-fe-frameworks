import Redux, { Dispatch, Store, legacy_createStore } from 'redux';
const store: Store = require('./markdown-state.js').default;
import {updateText} from './markdown-state.js';
import {ConnectedProps, MapStateToProps, Provider, connect} from 'react-redux';
import React, {useState, useEffect, PropsWithoutRef} from 'react';
import ReactDOM from 'react-dom';

const ButtonWrapper = (props: any) => {
    return (
        <div className="button-wrapper">
            <a className='button-wrapper_tweet' href="twitter.com/intent/tweet" target='_blank' id="tweet-quote">Tweety</a>
            <button className='button-wrapper_new' id="new-quote" onClick={props.parentProps.getRandomQuote}>Test</button>
        </div>
    )
}

const App = (props: any) => {
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
    return (
        <Provider store={store}>
            <Container />
        </Provider>
    )
}

const mapStateToProps: MapStateToProps<any, any, string> = (state: string) => {
    return {
        current: state,
    }
}
const mapDispatchToProps = (dispatch: Dispatch, ownProps: any) => {
    return {
        // @ts-ignore
        getRandomQuote: () => dispatch(updateText(ownProps.text))
    }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(App);
ReactDOM.render(<AppWrapper/>, document.querySelector('#wrapper'));