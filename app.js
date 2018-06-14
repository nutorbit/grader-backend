// Setup firebase
var firebase = require('firebase-admin');
var serviceAccount = require('./certificate.json');
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://grader-ce.firebaseio.com"
});

db = firebase.app().database();

// Setup backend
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require("path");
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'Public')));

// Default page
app.get('/', (req, res) => {
    res.render('./Public/index.html');
});

// Create localhost
app.listen(3000, () => {
    console.log('Run on port 3000!');
});

// Add users
app.post('/add_users', (req, res) => {
    db.ref().child('users').push(req.body);
    console.log('Success for adding users');
    res.send(200);
    // res.send(JSON.stringify({test: 1}));
});