import Redux, { Store, legacy_createStore } from 'redux';
const store: Store = require('./state.js').default;
import {Provider} from 'react-redux';
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';


console.log("Hello World!");

const Button = () => {

    return (
        <div id="quote-box" className='quote-box'>
            <button>Test</button>
            <p>HI!</p>
        </div>
    )
}

const AppWrapper = () => {
    return (
        <Provider store={store}>
            <Button/>
        </Provider>
    )
}

ReactDOM.render(<AppWrapper/>, document.querySelector('#wrapper'));