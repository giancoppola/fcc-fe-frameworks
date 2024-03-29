import Redux, { Dispatch, Store, legacy_createStore } from 'redux';
const store: Store = require('./markdown-state.js').default;
import {updateText} from './markdown-state.js';
import {ConnectedProps, MapStateToProps, Provider, connect} from 'react-redux';
import React, {useState, useEffect, PropsWithoutRef} from 'react';
import ReactDOM from 'react-dom';
const marked = require('marked')


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
            <textarea name="editor" id="editor" className="editor">{props.current}</textarea>
        </div>
    )
}

const Preview = (props: any) => {
    useEffect(() => {
        let preview = document.querySelector('#preview');
        preview.innerHTML = marked.parse(props.current)
    })
    return (
        <div className="preview-wrapper" id="preview-wrapper">
            <div className="preview" id="preview">
            </div>
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