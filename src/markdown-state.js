"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateText = exports.defaultState = exports.UPDATE = void 0;
var redux_1 = require("redux");
var QUOTE_URL = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';
// action types
exports.UPDATE = 'UPDATE';
// states
exports.defaultState = "# Welcome to my React Markdown Previewer!\n \n ## This is a sub-heading...\n ### And here's some other cool stuff:\n \n Heres some code, `<div></div>`, between 2 backticks.\n \n ```\n // this is multi-line code:\n \n function anotherExample(firstLine, lastLine) {\n   if (firstLine == '```' && lastLine == '```') {\n     return multiLineCode;\n   }\n }\n ```\n \n You can also make text **bold**... whoa!\n Or _italic_.\n Or... wait for it... **_both!_**\n And feel free to go crazy ~~crossing stuff out~~.\n \n There's also [links](https://www.freecodecamp.org), and\n > Block Quotes!\n \n And if you want to get really crazy, even tables:\n \n Wild Header | Crazy Header | Another Header?\n ------------ | ------------- | -------------\n Your content can | be here, and it | can be here....\n And here. | Okay. | I think we get it.\n \n - And of course there are lists.\n   - Some are bulleted.\n      - With different indentation levels.\n         - That look like this.\n \n \n 1. And there are numbered lists too.\n 1. Use just 1s if you want!\n 1. And last but not least, let's not forget embedded images:\n \n ![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)";
// action creators
var updateText = function (editorText) {
    return {
        type: exports.UPDATE,
        updatedText: editorText
    };
};
exports.updateText = updateText;
// reducer
var reducer = function (state, action) {
    if (state === void 0) { state = exports.defaultState; }
    switch (action.type) {
        case exports.UPDATE:
            return action.updatedText;
    }
    return exports.defaultState;
};
var store = (0, redux_1.legacy_createStore)(reducer);
exports.default = store;
