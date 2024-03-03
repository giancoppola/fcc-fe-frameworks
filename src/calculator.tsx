
import Redux, { Dispatch, Store, legacy_createStore } from 'redux';
const store: Store = require('./drums-state.js').default;
import {updatePlaying, updateSamples, updateVolume, iState, iSample} from './drums-state.js';
import {ConnectedProps, MapStateToProps, Provider, connect} from 'react-redux';
import React, {useState, useEffect, PropsWithoutRef} from 'react';
import ReactDOM from 'react-dom';
const marked = require('marked')

const Controls = (props: any) => {
    return (
        <div className="controls" id="controls">

        </div>
    )
}
const Output = (props: any) => {
    return (
        <div className="output-display" id="output-display">

        </div>
    )
}
const Formula = (props: any) => {
    return (
        <div className="formula-display" id="formula-display">

        </div>
    )
}

const Calculator = (props: any) => {
    return (
        <div id="calculator" className="calculator">
            <Formula/>
            <Output/>
            <Controls/>
        </div>
    )
}

const App = (props: any) => {
    console.log(props);
    return (
        <div id='drum-machine' className='drum-machine'>
            <Calculator />
        </div>
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