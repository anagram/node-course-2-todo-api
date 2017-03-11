const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '58c33d8709289e10ed6910d511';
var userId = '58c3193e5bd657087228a4a0'

if (!ObjectID.isValid(id)) {
  console.log('ID not valid');
};

// Todo.find().then((todos) => {
//   console.log('Find all Todos: ', todos);
// });

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos by id property : ', todos);
// });

// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo findOne by id property: ', todo);
// });

// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('id not found');
//   }
//   console.log('Todo By Id(id): ', todo);
// }).catch((e) => console.log(e));

User.findById(userId).then((user) => {
  if (!user) {
    return console.log('user id not found');
  }

  console.log('user By Id(id): ', user);
}).catch((e) => console.log(e));
