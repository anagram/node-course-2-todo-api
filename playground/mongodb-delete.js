// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // deleteMany
  // db.collection('Todos').deleteMany({test: 'something to do'}).then((result) => {
  //   console.log(result);
  // });

  // deleteOne

  // findOneAndDelete
  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // });

  // 58c1e5628283674eccd1a1fc
  db.collection('Users').findOneAndDelete({_id: new ObjectID('58c1e5628283674eccd1a1fc')}).then((result) => {
    console.log(result);
  });

  // db.close();
})
