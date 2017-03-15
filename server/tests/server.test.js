const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');

const todos = [{
  _id: new ObjectID(),
  text: 'first test todo v2'
}, {
  _id: new ObjectID(),
  text: 'second test todo v2',
  completed: true,
  completedAt: 1489595508532
}];
// clear all existing todos and put in new ones from our todos array
beforeEach((done) => {
  Todo.remove({}).then(() =>  {
    Todo.insertMany(todos);
  }).then(() => done());
});

// add describe block
describe('POST/todos', () => {
  it('should create a new todo', (done) => {
    var text = 'test text is 42';

    request(app)
    .post('/todos')
    .send({text})
    .expect(200)
    .expect((res) => {
      expect(res.body.text).toBe(text);
    })
    .end((err, res) => {
      if (err) {
        return done(err);
      }

      // verify db has new todo
      Todo.find({text}).then((todos) => {
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      }).catch((e) => done(e));
    });
  });

  it('should not create todo with invalid body data', (done) => {

    request(app)
    .post('/todos')
    .send({})
    .expect(400)
    .end((err, res) => {
      if (err) {
        return done(err);
      }

      Todo.find().then((todos) => {
        expect(todos.length).toBe(2);
        done();
      }).catch((e) => done(e));
    });
  });
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res) => {
      expect(res.body.todos.length).toBe(2);
    })
    .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should return a todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    var hexId = new ObjectID().toHexString();

    request(app)
      .get(`/todos/${hexId}`)
      .expect(404)
      .end(done);
      // make ssure you get 404 back
  });

  it('should return 404 for non-object ids', (done) => {
    request(app)
    .get('/todos/123')
    .expect(404)
    .end(done);
  });

});

describe('DELETE /todos/:id', () => {
  it('should remove a todo', (done) => {
    // delete the second item
    var hexId = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        // query db using findById
        Todo.findById(hexId).then((todo) => {
          expect(todo).toNotExist();
          done();
        }).catch((e) => done(e));
      });
  });

  it('should return 404 if todo not found', (done) => {
    var hexId = new ObjectID().toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if id is non-valid', (done) => {
    request(app)
    .delete('/todos/123')
    .expect(404)
    .end(done);
  });
});

describe('PATCH /todos/:id', () => {
    it('should update the todo', (done) => {
      var hexId = todos[0]._id.toHexString();
      var text = 'this is my patched text for first todo! *** '

    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        completed: true,
        text: text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.completedAt).toBeA('number');
      })
      .end(done);

  });

  it('should clear completedAt when completed is false', (done) => {
    var hexId = todos[1]._id.toHexString();
    var text = 'this *** is my patched text for second todo';

  request(app)
    .patch(`/todos/${hexId}`)
    .send({
        completed: false,
        text: text
      })
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(text);
      expect(res.body.todo.completed).toBe(false);
      expect(res.body.todo.completedAt).toNotExist();
    })
    .end(done);

  });
});
