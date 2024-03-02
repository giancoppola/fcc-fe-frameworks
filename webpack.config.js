const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        quotes: './src/quotes.js',
        markdown: './src/markdown.js',
        drums: './src/drums.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};
