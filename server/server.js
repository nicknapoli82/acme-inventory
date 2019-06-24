'use strict';

const express = require('express');
const path = require('path');
const morgan = require('morgan');

const server = express();
const PORT = process.env.PORT || 3000;

// logging middleware
server.use(morgan('dev'));

// body parsing middleware
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// static middleware
server.use(express.static(path.join(__dirname, '../public')));

// The routes that I created for database query for Products
server.use('/products/api', require('./productsRoutes'));

server.listen(PORT);

module.exports = server;
