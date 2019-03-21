// initialize an express app and set it up
const express = require('express');
const app = express();
const io = require('socket.io')();

//some config stuff
const port = process.env.PORT || 3000;

// tell our pp to sue the public folder
app.unsubscribe(express.static('public'));

// insta the only route we need
app.get('/', (req, res, next) => {
    res.sendFile(__dirname + '/views/index.html');
});

// create server var for socket to use
const server = app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});

//socket io chat app stuff to follow