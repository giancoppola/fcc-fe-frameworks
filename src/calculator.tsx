
import Redux, { Dispatch, Store, legacy_createStore } from 'redux';
const store: Store = require('./calculator-state.js').default;
import {iState, equals, clear, number, action} from './calculator-state.js';
import {ConnectedProps, MapStateToProps, Provider, connect} from 'react-redux';
import React, {useState, useEffect, PropsWithoutRef} from 'react';
import ReactDOM from 'react-dom';
const marked = require('marked')

const Controls = (props: any) => {
    useEffect(() => {
        let actions: NodeList = document.querySelectorAll('.action');
        //@ts-ignore
        for(let action of actions){
            (action as HTMLButtonElement).addEventListener('click', (e) => {
                props.action((e.target as HTMLButtonElement).getAttribute('value'));
            })
        }
        let numbers: NodeList = document.querySelectorAll('.number');
        //@ts-ignore
        for(let number of numbers){
            (number as HTMLButtonElement).addEventListener('click', (e) => {
                props.number((e.target as HTMLButtonElement).getAttribute('value'));
            })
        }
        let clear: HTMLButtonElement = document.querySelector('#clear');
        clear.addEventListener('click', (e) => {
            props.clear();
        })
        let equals: HTMLButtonElement = document.querySelector('#equals');
        equals.addEventListener('click', (e) => {
            props.equals();
        })
    }, [])
    return (
        <div className="controls" id="controls">
            <button id="clear" value='AC' className="AC btn btn--red">AC</button>
            <button className='action btn btn--light' id="divide" value="/">/</button>
            <button className='action btn btn--light' id="multiply" value="x">x</button>
            <button className='number btn' id="seven" value="7">7</button>
            <button className='number btn' id="eight" value="8">8</button>
            <button className='number btn' id="nine" value="9">9</button>
            <button className='action btn btn--light' id="subtract" value="-">-</button>
            <button className="number btn" id="four" value="4">4</button>
            <button className="number btn" id="five" value="5">5</button>
            <button className="number btn" id="six" value="6">6</button>
            <button className='action btn btn--light' id="add" value="+">+</button>
            <button className="number btn" id="one" value="1">1</button>
            <button className="number btn" id="two" value="2">2</button>
            <button className="number btn" id="three" value="3">3</button>
            <button className="number zero btn" id="zero" value="0">0</button>
            <button className='number btn' id="decimal" value=".">.</button>
            <button className="equals btn btn--blue" id="equals" value="=">=</button>
        </div>
    )
}
const Output = (props: any) => {
    return (
        <div className="output-display" id="display">
            {props.output}
        </div>
    )
}
const Formula = (props: any) => {
    return (
        <div className="formula-display" id="formula-display">
            {props.formula}
        </div>
    )
}

const App = (props: any) => {
    console.log(props);
    return (
        <div id="calculator" className="calculator">
            <Formula formula={props.formula} output={props.output} update={props.update}/>
            <Output formula={props.formula} output={props.output} update={props.update}/>
            <Controls action={props.action} number={props.number} equals={props.equals} clear={props.equals}/>
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