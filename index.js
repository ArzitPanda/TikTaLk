const http = require('http');
const express = require('express');
const path = require('path');
const { Server } = require('socket.io');


const app = express();
const server = http.createServer(app);
const io = new Server(server); //passing the http server 

//socket.io
io.on('connection', (socket) => {
    socket.on('client-message', (messageValue) => {
    io.emit('server-message', {message: messageValue, sender: socket.id });
   });
})


// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 9000;
server.listen(PORT, () => {
    console.log(`Server has started on PORT ${PORT}`);
});
