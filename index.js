/**
 * Created by Aanchal on 10/05/17.
 */
var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log("user connected");
    socket.on('disconnect', function () {
        console.log("user disconnected");
    });
    // fetching the chat msg
    socket.on('chat message', function (msg) {
        console.log('message is -> ' + msg);
        // broadcasting the msg to all users
        io.emit('chat message', msg);
    });
});

http.listen(3000, function () {
    console.log("Listening to port 3000....");
});