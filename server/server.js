var bodyParser = require('body-parser');
var express = require('express');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

// middleware
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  console.log(`recieved request for todos `);
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    console.log(`request for todos ERROR `);
    res.status(400).send(e);
  });
});

// GET /todos/123
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  console.log(`recieved request for todo ID ${id} `);
  // validate id using isValid

  if (!ObjectID.isValid(id)) {
    console.log(`ID ${id} not valid id`);
    // fail, send 404 'todo not found' send empty body
    return res.status(404).send();
  };
  // find by id
  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo});
    console.log('Todo By Id(id): ', todo);
  }).catch((e) => res.status(400).send());

    // sucess
      // if todo, send it back
      // if no todo - send bak 404 with empty body
    // error
      // 400 - do not print any private info - empty body back

  //res.send(req.params);
});

app.listen(3000, () => {
  console.log('started on port 3000');
})

module.exports = {app};
