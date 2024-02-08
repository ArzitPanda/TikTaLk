```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chat App</title>
</head>
<body>
    <h1>Chatting  With Prabir kumar sahoo</h1>

   
    <input type="text" name="" id="message" placeholder="Enter Message">
    <button id="send">send</button>
    <script src="/socket.io/socket.io.js"></script>
    <script>
        const socket = new io() ;
        const sendBtn = document.getElementById("send") ;
        const message = document.getElementById("message") ;
  
        sendBtn.addEventListener("click", () => {
            const messageValue = message.value ;
            socket.emit('client-message', messageValue) ;
        }) ;

        socket.on('server-message', (data) => {
            console.log(data) ;
        }) ;
    </script>
</body>
</html>

#this is javascript
- function
```javascript
```javascript

const http = require('http');
const express = require('express');
const path = require('path');
const { Server } = require('socket.io');


const app = express();
const server = http.createServer(app);
const io = new Server(server); //passing the http server 

//socket.io
io.on('connection', (socket) => {
    socket.on('client-message', (message) => {
    io.emit('server-message', message);
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
