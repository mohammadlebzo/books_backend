'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const server = express();
server.use(cors());
const PORT = process.env.PORT;

const getBookRouter = require('./Modules/book');

server.get('/', homeRouter);
server.get('/books',getBookRouter)

function homeRouter(req, res) {
    res.send('Server Active')
}

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})