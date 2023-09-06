const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const jwtToken = req.cookies.token;

  let client;
  
  try {
    client = jwt.verify(jwtToken, 'super-strong-secret');
  } catch (err) {
    next()
  }
  req.user = client;
  next();
}

module.exports = auth;