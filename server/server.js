const mongoose = require('mongoose');

// prefers Promises. designate which lib
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

// create a model - a todo model -
var Todo = mongoose.model('Todo', {
  text: {
    type: String
  },
  completed: {
    type: Boolean
  },
  completedAt: {
    type: Number
  }
});

// how to create an instance:
// var newTodo = new Todo({
//   text: 'Cook dinner'
// });
var now = Date.now();
var newTodo = new Todo({

  text: 'number as completedAt a bit later',
  completed: true,
  completedAt: now
});

newTodo.save().then((doc) => {
  console.log('Saved todo ', JSON.stringify(doc, undefined, 2));
}, (e) => {
  console.log('Unable to save Todo', e);
});
