import Redux, { Dispatch, Store, legacy_createStore } from 'redux';
const store: Store = require('./markdown-state.js').default;
import {updateText} from './markdown-state.js';
import {ConnectedProps, MapStateToProps, Provider, connect} from 'react-redux';
import React, {useState, useEffect, PropsWithoutRef} from 'react';
import ReactDOM from 'react-dom';


const Editor = (props: any) => {
    console.log(props);
    useEffect( () => {
        console.log('fired')
        let textArea: HTMLTextAreaElement = document.querySelector('#editor');
        textArea.addEventListener("keyup", (e) => {
            props.updateText((e.target as HTMLTextAreaElement).value);
        })
    }, []);
    return (
        <div className="editor-wrapper" id="editor-wrapper">
            <textarea name="editor" id="editor" cols={30} rows={10} className="editor">{props.current}</textarea>
        </div>
    )
}

const Preview = (props: any) => {
    return (
        <div className="preview-wrapper" id="preview-wrapper">
            <div className="preview" id="preview">
                {props.current}
            </div>
        </div>
    )
}


const ButtonWrapper = (props: any) => {
    return (
        <div className="button-wrapper">
            <a className='button-wrapper_tweet' href="twitter.com/intent/tweet" target='_blank' id="tweet-quote">Tweety</a>
            <button className='button-wrapper_new' id="new-quote" onClick={props.parentProps.getRandomQuote}>Test</button>
        </div>
    )
}

const App = (props: any) => {
    console.log(props);
    return (
        <>
            <Editor current={props.current} updateText={props.updateText}/>
            <Preview current={props.current}/>
        </>
    )
}

const AppWrapper = (props: any) => {
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
const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        updateText: (text: string) => dispatch(updateText(text))
    }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(App);
ReactDOM.render(<AppWrapper/>, document.querySelector('#main'));