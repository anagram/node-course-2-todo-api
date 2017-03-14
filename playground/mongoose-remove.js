const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({query})
// if you run like this: all are removed
Todo.remove({}).then((result) => {
  console.log(result);
})

// Todo.findOneAndRemove
// Todo.findByIdAndRemove


// Todo.findByIdAndRemove('58c8376177ba947c8feca350').then((todo) => {
//   console.log(todo);
// });
