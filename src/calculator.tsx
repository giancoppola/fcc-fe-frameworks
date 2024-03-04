
import Redux, { Dispatch, Store, legacy_createStore } from 'redux';
const store: Store = require('./calculator-state.js').default;
import {update, iState} from './calculator-state.js';
import {ConnectedProps, MapStateToProps, Provider, connect} from 'react-redux';
import React, {useState, useEffect, PropsWithoutRef} from 'react';
import ReactDOM from 'react-dom';
const marked = require('marked')

const Controls = (props: any) => {
    return (
        <div className="controls" id="controls">
            <button id="clear" value='AC' className="AC btn btn--red">AC</button>
            <button className='btn btn--light' id="divide" value="/">/</button>
            <button className='btn btn--light' id="multiply" value="x">x</button>
            <button className='btn' id="seven" value="7">7</button>
            <button className='btn' id="eight" value="8">8</button>
            <button className='btn' id="nine" value="9">9</button>
            <button className='btn btn--light' id="subtract" value="-">-</button>
            <button className="btn" id="four" value="4">4</button>
            <button className="btn" id="five" value="5">5</button>
            <button className="btn" id="six" value="6">6</button>
            <button className='btn btn--light' id="add" value="+">+</button>
            <button className="btn" id="one" value="1">1</button>
            <button className="btn" id="two" value="2">2</button>
            <button className="btn" id="three" value="3">3</button>
            <button className="zero btn" id="zero" value="0">0</button>
            <button className='btn' id="decimal" value=".">.</button>
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

        </div>
    )
}

const App = (props: any) => {
    console.log(props);
    return (
        <div id="calculator" className="calculator">
            <Formula formula={props.formula} output={props.output} update={props.update}/>
            <Output formula={props.formula} output={props.output} update={props.update}/>
            <Controls update={props.update}/>
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
        update: (formula: string, output: string) => dispatch(update(formula, output)),
    }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(App);
ReactDOM.render(<AppWrapper/>, document.querySelector('#main'));