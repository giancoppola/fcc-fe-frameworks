
import Redux, { Dispatch, Store, legacy_createStore } from 'redux';
const store: Store = require('./clock-state.js').default;
import {iState, equals, clear, number, action} from './clock-state.js';
import {ConnectedProps, MapStateToProps, Provider, connect} from 'react-redux';
import React, {useState, useEffect, PropsWithoutRef} from 'react';
import ReactDOM from 'react-dom';
const marked = require('marked')

const Title = () => {
    return (
        <h1 className="main-title" id="main-title">
            25 + 5 Clock
        </h1>
    )
}

const Controls = (props: any) => {
    return (
        <div className="controls" id="controls">
            <div className="length-control" id="break-control">
                <h3 id="break-label">Break Length</h3>
                <button className="btn btn--break" id="break-decrement" value="-">↓</button>
                <h4 className="break-length" id="break-length">5</h4>
                <button className="btn btn--break" id="break-increment" value="+">↑</button>
            </div>
            <div className="length-control" id="session-control">
                <h3 id="session-label">Break Length</h3>
                <button className="btn btn--session" id="session-decrement" value="-">↓</button>
                <h4 className="session-length" id="session-length">25</h4>
                <button className="btn btn--session" id="session-increment" value="+">↑</button>
            </div>
        </div>
    )
}

const Timer = (props: any) => {
    return (
        <div className="timer">
            <div className="timer-wrapper">
                <h3 className="timer-label" id="timer-label">Session</h3>
                <h3 className="timer-left" id="time-left">25:00</h3>
            </div>
        </div>
    )
}

const TimerControls = (props: any) => {
    return (
        <div className="timer-control">
            <button id="start_stop">⏯️</button>
            <button id="reset">🔄</button>
        </div>
    )
}

const App = (props: any) => {
    console.log(props);
    return (
        <div id="app" className="app">
            <Title/>
            <Controls/>
            <Timer/>
            <TimerControls/>
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
        formula: state.formula,
        formulaHistory: state.formulaHistory,
        output: state.output,
        outputHistory: state.outputHistory
    }
}
const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        number: (current: string) => dispatch(number(current)),
        action: (current: string) => dispatch(action(current)),
        clear: () => dispatch(clear()),
        equals: () => dispatch(equals())
    }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(App);
ReactDOM.render(<AppWrapper/>, document.querySelector('#main'));