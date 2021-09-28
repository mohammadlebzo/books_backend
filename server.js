'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const server = express();
server.use(cors());
const PORT = process.env.PORT;

server.use(express.json());

const bookModule = require('./Modules/book');
const addBookRouter = bookModule.addBookRouter;
const getBookRouter = bookModule.getBookRouter;
const deleteBookRouter = bookModule.deleteBookRouter

server.get('/', homeRouter);
server.get('/getbooks', getBookRouter);
server.post('/books', addBookRouter);
server.delete('/deletebook', deleteBookRouter);

function homeRouter(req, res) {
    res.send('Server Active')
}

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})