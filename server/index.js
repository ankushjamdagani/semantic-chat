const express = require('express');
const http = require('http');
const socket = require('socket.io');

const PORT = process.env.PORT || 8000;

const app = express();
const server = http.createServer(app);
const io = socket.listen(server);
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('socketIo', io);

require('./database');
require('./controllers')(app);