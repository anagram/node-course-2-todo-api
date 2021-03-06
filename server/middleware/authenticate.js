var {User} = require('./../models/user');

var authenticate = (req, res, next) => {
  var token = req.header('x-auth');
  //console.log('token from header   ', token);
  User.findByToken(token).then((user) => {
    if (!user) {
      //console.log('user not found');
      return Promise.reject();
    }

    req.user = user;
    req.token = token;
    next();
  }).catch((e) => {
    //console.log('error in authenticate', e);
    res.status(401).send();
  });
};

module.exports = {authenticate};
