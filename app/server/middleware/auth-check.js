const jwt = require('jsonwebtoken');
var fetch = require('node-fetch');
/**
 *  The Auth Checker middleware function.
 */
module.exports = (req, res, next) => { 
  res.status(200);
    return next();
}
