const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
  id: 4
};

var token = jwt.sign(data, 'somesecret');

// var message = 'I am user number 3';
// var hash = SHA256(message).toString();

//console.log(`Message: ${message}`);
console.log(`jwt token: ${token}`);

var decoded = jwt.verify(token, 'somesecret');
// var decodedJson = JSON.stringify(decoded);
console.log('jwt decoded: ', decoded);

// the JSON Web Token JWT
// the concept of salt - the secret lives only on server.
// var data = {
//   id: 4
// };
//
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
//   // hash: SHA256(JSON.stringify(data)).toString()
// }
// // add some secret "salt"
// // added to data that other person would not have,
// // so their hash will be different
//
// console.log(`crypto-js hash: ${token.hash}`);
//
// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(data)).toString()
//
// //var resultHash = SHA256(JSON.stringify(token.data)).toString();
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
// if (resultHash === token.hash) {
//     console.log('Data was not changed, OK');
// } else {
//   console.log('data was changed, do not trust');
//
// }
