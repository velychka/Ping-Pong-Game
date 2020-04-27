"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
var express = require('express');
const app = express_1.default();
let http = require('http').Server(app);
let io = require('socket.io')(http);

// ------------------------
// ROUTE
// ------------------------
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '..', 'public', 'pong.html'));
});

app.use("/js", express.static('../public/js/'));
app.use("/sound", express.static('../public/sound/'));
// ------------------------
// // -- Catch a connection
// ------------------------


  var nbPlayer = 0;


io.on('connection', (socket) => {
    console.log('a user connected');
    nbPlayer++;
    // -- Build a room
    let room = "room";
    socket.join(room);
    // -- catch disconnect
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    // -- Conversation stuff
    socket.on('message', (message) => {
        // --- Message treatment :
        if (message.step === 0) {
                   
                   io.to(room).emit('return',message.answer);
               }
              
         
        
        else {
            io.to(room).emit('init');
        }
    });
    // -- First message
    io.to(room).emit('welcome', room);

    console.log(nbPlayer);

    socket.emit('message', nbPlayer);

    socket.on('sendPosPlayer1', function(posY) {
        socket.broadcast.emit('newPosPlayer1', posY);
    });

    socket.on('sendPosPlayer2', function(posY) {
        socket.broadcast.emit('newPosPlayer2', posY);
    });

    socket.on('sendPosPlayer3', function(posY) {
        socket.broadcast.emit('newPosPlayer3', posY);
    });

    socket.on('sendPosPlayer4', function(posY) {
        socket.broadcast.emit('newPosPlayer4', posY);
    });


    socket.on('sendPos', function(posX, posY) {
        socket.broadcast.emit('newPos', posX, posY);
    });

    socket.on('sendScore', function(score1, score2) {
        socket.broadcast.emit('newScore', score1, score2);
    });

    


    
});
http.listen(3010, () => {
    console.info('HTTP server started on port 3010');
});



/*var express = require('express');
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(3010);
// WARNING: app.listen(80) will NOT work here!

app.use("/js", express.static('../public/js'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '..', 'public', 'pong.html');
});

var nbPlayer = 0;

io.on('connection', (socket) => {

    nbPlayer++;

    console.log(nbPlayer);

    socket.emit('message', nbPlayer);

    socket.on('sendPos', function(posX, posY) {
        socket.broadcast.emit('newPos', posX, posY);
    });

});*/

