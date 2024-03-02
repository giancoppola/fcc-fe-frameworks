const express = require('express');
import {Express, NextFunction, Request, Response} from 'express';
const app: Express = express();

// static files
app.use('/dist', express.static(__dirname + '/dist'));
app.use('/styles', express.static(__dirname + '/styles'));
app.use(express.static(__dirname + '/src'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/markdown.html')
})
app.get('/quotes', (req, res) => {
    res.sendFile(__dirname + '/views/quotes.html')
})

app.listen(3000, () => console.log('listening'));
