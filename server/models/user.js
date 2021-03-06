const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');


var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not valid email}'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth'
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();
  user.tokens.push({access, token});

  return user.save().then(() => {
    return token;
  });
};

UserSchema.statics.findByToken = function (token) {
  //console.log('findByToken func  token: ', token);
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, 'abc123');
    // if (decoded) {
    //   console.log('decoded seemed to have a value ', decoded);
    // } else {
    //   console.log('decoded seemed to have NO value ');
    // }
  } catch (e) {
    // console.log('error caught ', e);
    return Promise.reject('auth failed error ');
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

UserSchema.pre('save', function (next) {
  var user = this;
  console.log('new user!');
  // only encrypt password if it was just modified
  if (user.isModified('password')) {
    // create salt and hash. ref user.password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      })
    })
    // then
    //user.password = hash;
  } else {
    next();
  }
})

var User = mongoose.model('User', UserSchema);

module.exports = {User};
