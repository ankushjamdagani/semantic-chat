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

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const USERS_MAP = {}

io.on("connection", (socket) => {
    console.log('---- socket is connected');
    
    const ID = socket.id;
    USERS_MAP[ID] = socket;
    
    socket.emit('save_user_id', ID)

    socket.on('disconnect', function() {
      delete USERS_MAP[socket.id];
      console.log('---- socket is disconnected', USERS_MAP);
    })

    socket.on('message', function(message) {
        console.log('message ------ ' + message.text);
        for(let userId in USERS_MAP) {
          if(userId !== message.userId) {
            USERS_MAP[userId].emit('message', message);
          }
        }
    })
})