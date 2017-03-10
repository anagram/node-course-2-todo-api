const mongoose = require('mongoose');

// prefers Promises. designate which lib
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

// create a model - a todo model - add some validation
var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

// new model User
// email required and trimmed and min length of 1
var User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
});

var dude = new User({
  email: '   myemail@mydomain.com '
});

dude.save().then((doc) => {
  console.log('Saved user ', JSON.stringify(doc, undefined, 2));
}, (e) => {
  console.log('Unable to save user', e);
})

// how to create an instance:

// var now = Date.now();
// var newTodo = new Todo({
//  text: 'save a dude in users collection'
//
// });
//
// newTodo.save().then((doc) => {
//   console.log('Saved todo ', JSON.stringify(doc, undefined, 2));
// }, (e) => {
//   console.log('Unable to save Todo', e);
// });
