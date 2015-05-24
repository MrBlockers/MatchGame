var express = require('express');

// instatiate express
var server = express();

// expose files for the server
server.use(express.static('site'));

// listen
server.listen(8080);
