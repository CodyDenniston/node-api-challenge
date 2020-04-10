const express = require('express');

const projectRouter = require('./projects/projectRouter');
const actionRouter = require('./actions/actionRouter');

const server = express();

//calling middleware
server.use(logger);
server.use(express.json());

server.use('/api/project', projectRouter);
server.use('/api/action', actionRouter);

server.get('/', (req, res) => {
	res.status(200).json({ message: 'Success!' });
});

// custom middleware

function logger(req, res, next) {
	console.log(`${req.method} Request to ${req.originalUrl}`);

	next();
}

module.exports = server;
