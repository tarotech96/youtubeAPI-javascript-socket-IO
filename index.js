const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
app.use(express.static(path.join(__dirname + '/public')))
    .set('view engine', 'ejs')
    .set('views', 'views')
    .get('/', (req, res) => { res.render('index') })

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('event', (data) => {
        io.emit('event', data);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    })
});


// set port to server
http.listen(PORT, () => { console.log(`Server listening on ${PORT}`) });