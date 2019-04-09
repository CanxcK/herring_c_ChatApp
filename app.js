// initialize an express app and set it up
const express = require('express');
const app = express();
const io = require('socket.io')();

//some config stuff
const port = process.env.PORT || 3000;

// tell our pp to sue the public folder
app.use(express.static('public'));

// insta the only route we need
app.get('/', (req, res, next) => {
    res.sendFile(__dirname + '/views/index.html');
});

// create server var for socket to use
const server = app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});

//socket io chat app stuff to follow
io.attach(server);

io.on('connection', function(socket) {
    console.log('a user has connected');
    socket.emit('connected', {sID: `${socket.id}`, message: 'new connection'} );

    // listen for incoming messages, and then send em
    socket.on('chat message', function(msg) {
        //check the message contents
        console.log('message', msg, 'socket', socket.id);

        //send message to every connected client
        io.emit('chat message', { id: `${socket.id}`, message: msg});
    })

    io.emit('user joined', socket.id)


    socket.on('disconnect', function() {
        console.log('a user has disconnected');
        socket.emit('hello', 'can you hear me?', 1, 2, 'abc');
    });
});