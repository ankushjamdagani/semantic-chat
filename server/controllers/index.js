function initExpressController (app) {
  // Import models
  const AuthController = require('./auth');
  const UserController = require('./user');
  const MessageController = require('./message');

  const {
    constructResponse
  } = require('../helpers');

  // Declare express routes
  app.get('/api', (req, res) => res.status(200).send(constructResponse(200, 'SUCCESS', 'API works.')));
  app.use('/api/v1/auth', AuthController);
  app.use('/api/v1/user', UserController);
  app.use('/api/v1/message', MessageController);


  // Declare socket routes
  const io = app.get('socketIo');
  const USERS_MAP = {}

  io
  .of('/socket/v1/chat')
  .on("connection", (socket) => {
    console.log('---- socket is connected');
  
    const ID = socket.id;
    USERS_MAP[ID] = socket;
  
    socket.emit('save_user_id', ID)
  
    socket.on('disconnect', function () {
      delete USERS_MAP[socket.id];
      console.log('---- socket is disconnected', socket.id);
    })
  
    socket.on('message', function (message) {
      console.log('message ------ ' + message.text);
      for (let userId in USERS_MAP) {
        if (userId !== message.userId) {
          USERS_MAP[userId].emit('message', message);
        }
      }
    })
  })
}

module.exports = initExpressController;