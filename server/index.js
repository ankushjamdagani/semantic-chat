const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
const socket = require("socket.io");
const passport = require("passport");

const PORT = process.env.PORT || 8000;

const app = express();
const server = http.createServer(app);
const io = socket.listen(server);
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Express session
app.use(express.static("public"));
app.use(
  session({
    secret: "semantic chat",
    saveUninitialized: true,
    resave: true
  })
);
app.use(cookieParser());
// app.use(cors())
app.use(cors({ credentials: true, origin: "http://localhost:8080" }));

// form-body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// passport middleware
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);

app.set("socketIo", io);

require("./database");
require("./controllers")(app);
