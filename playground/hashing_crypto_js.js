const {SHA256} = require('crypto-js');

var message = 'I am user number 3';
var hash = SHA256(message).toString();

console.log(`Message: ${message}`);
console.log(`hash: ${hash}`);

var data = {
  id: 4
};
var token = {
  data,
  hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
  // hash: SHA256(JSON.stringify(data)).toString()
}
// add some secret "salt"
// added to data that other person would not have,
// so their hash will be different


token.data.id = 5;
token.hash = SHA256(JSON.stringify(data)).toString()

//var resultHash = SHA256(JSON.stringify(token.data)).toString();
var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
if (resultHash === token.hash) {
    console.log('Data was not changed, OK');
} else {
  console.log('data was changed, do not trust');

}
