"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var app = express();
// static files
app.use('/dist', express.static(__dirname + '/dist'));
app.use('/styles', express.static(__dirname + '/styles'));
app.use('/sounds', express.static(__dirname + '/sounds'));
app.use(express.static(__dirname + '/src'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/calculator.html');
});
app.get('/drums', function (req, res) {
    res.sendFile(__dirname + '/views/drums.html');
});
app.get('/markdown', function (req, res) {
    res.sendFile(__dirname + '/views/markdown.html');
});
app.get('/quotes', function (req, res) {
    res.sendFile(__dirname + '/views/quotes.html');
});
app.listen(3000, function () { return console.log('listening'); });
