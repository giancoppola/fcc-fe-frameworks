import Redux, { Action, Store, legacy_createStore } from 'redux';

// action types
const NEXT = 'NEXT';

// states
interface iState {
    quote: string;
}
const defaultState: iState = {
    quote: ''
}

// action
const nextQuote = () => {
    return {
        type: NEXT
    }
}

// reducer
const reducer = (state = defaultState, action: Action) => {
    return defaultState;
}

export default legacy_createStore(reducer)