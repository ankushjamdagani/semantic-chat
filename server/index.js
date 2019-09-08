const express = require('express');
const app     = express();
const server  = require('http').createServer(app);
const io      = require('socket.io').listen(server);

app.get('/api/customers', (req, res) => {
  const customers = [
    {id: 1, firstName: 'John', lastName: 'Doe'},
    {id: 2, firstName: 'Brad', lastName: 'Traversy'},
    {id: 3, firstName: 'Mary', lastName: 'Swanson'},
  ];
  res.json(customers);
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

io.sockets.on("connection", (socket) => {
    console.log('<-------------- socket is connected')

    socket.on('disconnect', function() {
        console.log('<--------------<-------------- socket is closed')
    })
    socket.on('message_recieved', function() {
        console.log('<--------------<-------------- Message is recieved')
    })
})