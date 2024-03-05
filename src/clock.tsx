
import Redux, { Dispatch, Store, legacy_createStore } from 'redux';
const store: Store = require('./clock-state.js').default;
import {iState, start, pause, end, ready, READY, restart, START} from './clock-state.js';
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
                <h3 className="timer-left" id="time-left">{props.current}</h3>
            </div>
        </div>
    )
}

const TimerControls = (props: any) => {
    useEffect(() => {
        let startStop: HTMLButtonElement = document.querySelector('#start-stop');
        startStop.addEventListener('click', (e) => {
            switch((e.target as HTMLButtonElement).getAttribute('data-state')){
                case READY:
                    props.start(props.break, props.session, props.current);
                    break;
                case START:
                    props.pause(props.break, props.session, props.current);
                    break;
            }
        })
        let reset: HTMLButtonElement = document.querySelector('#reset');
        reset.addEventListener('click', (e) => {
            props.restart();
        })
    }, [])
    return (
        <div className="timer-control">
            <button data-state={props.progress} id="start_stop">⏯️</button>
            <button id="reset">🔄</button>
        </div>
    )
}

const App = (props: any) => {
    console.log(props);
    return (
        <div id="app" className="app">
            <Title/>
            <Controls break={props.break} session={props.session}/>
            <Timer current={props.current} progress={props.progress}/>
            <TimerControls progress={props.progress} break={props.break}
            session={props.session} current={props.current} end={props.end}
            start={props.start} pause={props.pause} ready={props.ready}/>
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
        break: state.break,
        session: state.session,
        current: state.current,
        progress: state.progress
    }
}
const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        start: (brk: number, session: number, current: string) => dispatch(start(brk, session, current)),
        pause: (brk: number, session: number, current: string) => dispatch(pause(brk, session, current)),
        end: () => dispatch(end()),
        restart: () => dispatch(restart()),
        ready: (brk: number, session: number, current: string) => dispatch(ready(brk, session, current))
    }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(App);
ReactDOM.render(<AppWrapper/>, document.querySelector('#main'));