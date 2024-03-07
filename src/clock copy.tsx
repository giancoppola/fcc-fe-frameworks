
import Redux, { Dispatch, Store, legacy_createStore } from 'redux';
const store: Store = require('./clock-state.js').default;
import {iState, breakTime, end, ready, READY, restart, set, END, tick, SESSION, BREAK, sessionTime} from './clock-state.js';
import {ConnectedProps, MapStateToProps, Provider, connect} from 'react-redux';
import React, {useState, useEffect, PropsWithoutRef} from 'react';
import ReactDOM from 'react-dom';
const marked = require('marked')

const inProgress = [SESSION, BREAK];

const Title = () => {
    return (
        <h1 className="main-title" id="main-title">
            25 + 5 Clock
        </h1>
    )
}

const Controls = (props: any) => {
    useEffect(() => {
        let container = document.querySelector('#clock-controls');
        let breakLength: HTMLHeadingElement = document.querySelector('#break-length');
        let breakDecrement: HTMLButtonElement = document.querySelector('#break-decrement');
        let breakIncrement: HTMLButtonElement = document.querySelector('#break-increment');
        let sessionLength: HTMLHeadingElement = document.querySelector('#session-length');
        let sessionDecrement: HTMLButtonElement = document.querySelector('#session-decrement');
        let sessionIncrement: HTMLButtonElement = document.querySelector('#session-increment');
        breakDecrement.addEventListener('click', (e) => {
            if (parseInt(breakLength.getAttribute('data-value')) >= 2){
                props.set(parseInt(breakLength.getAttribute('data-value')) - 1, parseInt(sessionLength.getAttribute('data-value')));
            }
        })
        breakIncrement.addEventListener('click', (e) => {
            if (parseInt(breakLength.getAttribute('data-value')) >= 1 && parseInt(breakLength.getAttribute('data-value')) < 60){
                props.set(parseInt(breakLength.getAttribute('data-value')) + 1, parseInt(sessionLength.getAttribute('data-value')));
            }
        })
        sessionDecrement.addEventListener('click', (e) => {
            console.log(parseInt(sessionLength.getAttribute('data-value')));
            if (parseInt(sessionLength.getAttribute('data-value')) >= 2){
                props.set(parseInt(breakLength.getAttribute('data-value')), parseInt(sessionLength.getAttribute('data-value')) - 1);
            }
        })
        sessionIncrement.addEventListener('click', (e) => {
            console.log(parseInt(sessionLength.getAttribute('data-value')));
            if (parseInt(sessionLength.getAttribute('data-value')) >= 1 && parseInt(sessionLength.getAttribute('data-value')) < 60){
                props.set(parseInt(breakLength.getAttribute('data-value')), parseInt(sessionLength.getAttribute('data-value')) + 1);
            }
        })
    }, [])
    return (
        <div className="clock-controls" id="clock-controls" data-state={props.progress}>
            <h3 id="break-label">Break Length</h3>
            <div className="length-control time-controls" id="break-control">
                <button className="btn btn--break" id="break-decrement" value="-">↓</button>
                <h4 className="break-length" id="break-length" data-value={props.break}>{props.break}</h4>
                <button className="btn btn--break" id="break-increment" value="+">↑</button>
            </div>
            <h3 id="session-label">Session Length</h3>
            <div className="length-control time-controls" id="session-control">
                <button className="btn btn--session" id="session-decrement" value="-">↓</button>
                <h4 className="session-length" id="session-length" data-value={props.session}>{props.session}</h4>
                <button className="btn btn--session" id="session-increment" value="+">↑</button>
            </div>
        </div>
    )
}

const Timer = (props: any) => {
    let current: string = (props.current / 60).toFixed(2).toString();
    useEffect(() => {
        current = Math.round(props.current / 60).toFixed(2).toString();
    })
    return (
        <div className="timer">
            <div className="timer-wrapper">
                <h3 className="timer-label" id="timer-label">Session</h3>
                <h3 className="timer-left" id="time-left">{current}</h3>
            </div>
        </div>
    )
}

const TimerControls = (props: any) => {
    let paused: boolean = false;
    useEffect(() => {
        let startStop: HTMLButtonElement = document.querySelector('#start_stop');
        startStop.addEventListener('click', (e) => {
            console.log(paused)
            if (paused){
                paused = false;
            }
            else {
                console.log(paused)
                switch((e.target as HTMLButtonElement).getAttribute('data-state')){
                    case READY:
                        props.sessionTime(props.break, props.session, props.current);
                        break;
                    case SESSION:
                        paused = true;
                        break;
                    case BREAK:
                        paused = true;
                        break;
                }
            }
        })
        let reset: HTMLButtonElement = document.querySelector('#reset');
        reset.addEventListener('click', (e) => {
            props.restart();
        })
    }, [])
    useEffect(() => {
        if (inProgress.includes(props.progress) && paused == false){
            setTimeout(() => {
                props.tick();
            }, 1000)
        }
    })
    return (
        <div className="timer-control">
            <button data-state={props.progress} id="start_stop">⏯️</button>
            <button id="reset">🔄</button>
            <audio id="beep" preload="auto" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"></audio>
        </div>
    )
}

const App = (props: any) => {
    console.log(props);
    return (
        <div id="app" className="app">
            <Title/>
            <Controls break={props.break} session={props.session} set={props.set} progress={props.progress}/>
            <Timer current={props.current} progress={props.progress}/>
            <TimerControls progress={props.progress} break={props.break} session={props.session}
            sessionTime={props.sessionTime} current={props.current} end={props.end}
            start={props.start} pause={props.pause} ready={props.ready}
            restart={props.restart} tick={props.tick}/>
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
        set: (brk: number, session: number) => dispatch(set(brk, session)),
        sessionTime: (brk: number, session: number) => dispatch(sessionTime(brk, session)),
        breakTime: () => dispatch(breakTime()),
        end: () => dispatch(end()),
        restart: () => dispatch(restart()),
        ready: (brk: number, session: number) => dispatch(ready(brk, session)),
        tick: () => dispatch(tick())
    }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(App);
ReactDOM.render(<AppWrapper/>, document.querySelector('#main'));