require('./config/config');

const _ = require('lodash');
const bodyParser = require('body-parser');
const express = require('express');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;

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
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    //console.log(`request for todos ERROR `);
    res.status(400).send(e);
  });
});

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => res.status(400).send());
});

app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    // succeeds even when tod has been deleted already WOW
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
 });

app.delete('/todos'), (req, res) => {
  Todo.remove({}).then((res) => {
    console.log('removed all the things!');
  })
}

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  // only pull proerties we allow user to modify
  var body = _.pick(req.body, ['text', 'completed']);
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
});

// POST /users
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() => {
    //console.log('returning promise from generateAuthToken');
    return user.generateAuthToken();
  }).then((token) => {
    //console.log('here is my token ', token);
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    //console.log('error  ', e);
    res.status(400).send(e);
  })
});

app.get('/users/me', authenticate, (req, res) => {
  //console.log('/users/me');
  res.send(req.user);
});

app.listen(port, () => {
  console.log(`started on port ${port}`);
})

module.exports = {app};
