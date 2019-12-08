const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
const socket = require("socket.io");

const PORT = process.env.PORT || 8000;

const app = express();
const server = http.createServer(app);
const io = socket.listen(server);
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// app.use(cors())
app.use(cors({ credentials: true, origin: "http://localhost:8080" }));

// form-body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Express session
app.use(express.static("public"));
app.use(
  session({
    secret: "semantic chat",
    saveUninitialized: true,
    resave: false,
    name: 'app_token',
    rolling: true,
    cookie: {
      httpOnly: false,
      maxAge: 1000 * 60 * 60 * 24
    }
  })
);
app.use(cookieParser());

// passport middleware
require("./config/passport")(app);

app.set("socketIo", io);

require("./database");
require("./controllers")(app);
