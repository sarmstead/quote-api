const express = require('express');
const apiRouter = express.Router();
const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

apiRouter.get('/quotes/random', (req, res, next) => {
    const randomQuote = {
        quote: {
            quote: getRandomElement(quotes)['quote'],
            person: getRandomElement(quotes)['person']
        }
    }
    res.send(randomQuote);
});


module.exports = apiRouter;