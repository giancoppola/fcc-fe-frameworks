import Redux, { Dispatch, Store, legacy_createStore } from 'redux';
const store: Store = require('./drums-state.js').default;
import {updatePlaying, updateSamples, updateVolume, iState, iSample} from './drums-state.js';
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

const mapStateToProps: MapStateToProps<any, any, iState> = (state: iState) => {
    return {
        playing: state.playing,
        volume: state.volume,
        samples: state.samples
    }
}
const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        updatePlaying: (text: string) => dispatch(updatePlaying(text)),
        updateVolume: (volume: number) => dispatch(updateVolume(volume)),
        updateSamples: (samples: Array<iSample>) => dispatch(updateSamples(samples))
    }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(App);
ReactDOM.render(<AppWrapper/>, document.querySelector('#main'));