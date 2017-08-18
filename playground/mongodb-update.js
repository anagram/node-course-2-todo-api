// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');


  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('59961ae78512339d8e93b351')
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result);
  // });

  // db.collection('Users').findOneAndUpdate({
  //   _id: new ObjectID('599623bdbf195a9ed58f3d3e')
  // }, {
  //   $set: {
  //     name: 'Skippy'
  //   },
  //   $inc: {
  //     age: 1000000
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result);
  // });

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('599623bdbf195a9ed58f3d3e')
  }, {
    $set: {
      location: 'Kristang dropship'
    }

  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });
  // db.close();
})
