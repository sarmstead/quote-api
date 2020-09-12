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

apiRouter.get('/quotes', (req, res, next) => {
    // searchTerms checks the length of the keys inside of req.query. Zero length means there are no query params.
    const searchTerms = () => {
        const query = req.query;
        return Object.keys(query).length;
    };
    
    const personID = req.query.person;
    
    // personIndex loops through every index in the quotes array. If req.query.person matches quotes[i]['person'], that's put into a temporary array.
    // If req.query.person does not match quotes[i]['person'] the temporary array length will be zero. Zero length means the search query does not exist in our records.
    const  personIndex = () => {
        let arr = []
        for (let i = 0; i < quotes.length; i++) {
            if (quotes[i]['person'] === personID) {
                arr.push(i);
            }
        }
        if (arr.length === 0) {
            return false;
        } else if (arr.length > 0) {
            return true;
        }
    };
    const arrayQuotes = () => {
        const obj = {
            quotes: quotes
        };
        return obj; 
    }
    const returnAllPerson = () => {
        let arr = []
        for (let i = 0; i < quotes.length; i++) {
            if (quotes[i]['person'] == personID) {
                arr.push({
                    quote: quotes[i]['quote'],
                    person: quotes[i]['person']
                }) 
            }
        }
        return arr;
    }

    if (searchTerms() === 0) {
        res.send(arrayQuotes());
    } else if (personIndex()) {
        res.send(returnAllPerson());
    } else if (!personIndex()) {
        res.send([]);
    }
});

apiRouter.post('/quotes', (req, res, next) => {
    const newQuote = req.query.quote;
    const newPerson = req.query.person;
    const fullQuote = {
        quote: newQuote,
        person: newPerson
    }
    if (Object.keys(newQuote).length !== 0 && Object.keys(newPerson).length !== 0) {
        quotes.push(fullQuote);
        res.status(201).send({
            quote: fullQuote
        })
    } else {
        res.status(400).send('Please enter a valid quote and author.');
    }
})

module.exports = apiRouter;