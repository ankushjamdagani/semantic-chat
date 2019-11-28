const bcrypt = require('bcryptjs');

const hashPassword = (password, callback) => {
  bcrypt.genSalt(10, (err, salt) => 
    bcrypt.hash(password, salt, callback)
  )
}

const constructResponse = (code, message, data) => {
  const codeRange = code / 100;
  if(codeRange >= 2 && codeRange < 3) {
    return {
      code,
      message,
      data
    }
  }
  else {
    return {
      code,
      message,
      error: data
    }
  }
}

const isAuthenticated = (req, res, next) => {
  if(req.isAuthenticated()) {
    next();
  }
  res.redirect('/login')
}

module.exports = {
  hashPassword,
  constructResponse,
  isAuthenticated
}