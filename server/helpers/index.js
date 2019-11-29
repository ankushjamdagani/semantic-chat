const bcrypt = require('bcryptjs');

const hashPassword = (password, callback) => {
  bcrypt.genSalt(10, (err, salt) => 
    bcrypt.hash(password, salt, callback)
  )
}

const constructResponse = (code, status, data) => {
  if(status === 'SUCCESS') {
    return {
      code,
      status,
      data
    }
  }
  else {
    return {
      code,
      status,
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