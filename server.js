const express = require('express');
const app = express();
const apiRouter = require('./api-router.js');


const { quotes } = require('./data');
const { getRandomElement } = require('./utils');



const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.use('/api', apiRouter);

app.listen(PORT);

