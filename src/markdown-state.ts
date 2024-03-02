import { GetState } from '@reduxjs/toolkit';
import Redux, { Action, Store, legacy_createStore, Dispatch, Middleware, applyMiddleware, UnknownAction } from 'redux';
import { UseDispatch } from 'react-redux';
const QUOTE_URL = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

// action types
export const UPDATE = 'UPDATE';
export interface MarkdownAction extends Action {
    type: string,
    updatedText: string
}

// states
export const defaultState: string = `# Welcome to my React Markdown Previewer!\
\
## This is a sub-heading...\
### And here's some other cool stuff:\
\
Heres some code, \`<div></div>\`, between 2 backticks.\
\
\`\`\`\
\// this is multi-line code:\
\
function anotherExample(firstLine, lastLine) {\
  if (firstLine == \'\`\`\`\' && lastLine == \'\`\`\`\') {\
    return multiLineCode;\
  }\
}\
\`\`\`\
\
You can also make text **bold**... whoa!\
Or _italic_.\
Or... wait for it... **_both!_**\
And feel free to go crazy ~~crossing stuff out~~.\
\
There's also [links](https://www.freecodecamp.org), and\
> Block Quotes!\
\
And if you want to get really crazy, even tables:\
\
Wild Header | Crazy Header | Another Header?\
------------ | ------------- | -------------\
Your content can | be here, and it | can be here....\
And here. | Okay. | I think we get it.\
\
- And of course there are lists.\
  - Some are bulleted.\
     - With different indentation levels.\
        - That look like this.\
\
\
1. And there are numbered lists too.\
1. Use just 1s if you want!\
1. And last but not least, let's not forget embedded images:\
\
![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)`

// action creators
export const updateText = (editorText: string) => {
    return {
        type: UPDATE,
        updatedText: editorText
    }
}

// reducer
const reducer = (state = defaultState, action: MarkdownAction) => {
    switch(action.type){
        case UPDATE:
            return action.updatedText;
    }
    return defaultState;
}

const store = legacy_createStore(reducer)
export default store;