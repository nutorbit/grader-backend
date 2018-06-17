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
var axios = require('axios');
var cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'Public')));

// Default page
app.get('/', (req, res) => {
    res.render('./Public/index.html');
});

// Create localhost
app.listen(3333, () => {
    console.log('Run on port 3333!');
});

// Add users
app.post('/add_users', (req, res) => {
    console.log('add_users');
    var ref = db.ref().child('users');
    // console.log(req.body);
    ref.push(req.body).then( (ms) => {
        console.log(ms);
        res.sendStatus(200);
    } ).catch( (ms) => {
        console.log(ms);
        // res.sendStatus(404);
    });
    res.sendStatus(200);
    
    // console.log('Success for adding user');
    
});

app.post('/check_users', (req, res) => {
    console.log('check_users');
    
    var A = [];
    var ref = db.ref().child('users');
    ref.on('value', (snapshot) => {
        // console.log(snapshot.val());
        var data = snapshot.val();
        
        for(var key in data){
            var usr = data[key].username;
            var ps = data[key].password;
            if(req.body.username == usr && req.body.password == ps){
                res.status(200).send('found');
                return ;
            }
        }
        res.status(200).send('not found');
        return ;
    });
    
    
    
});

app.post('/add_problem', (req, res) => {
    // db.ref().child('problems').push(req.body);
    // console.log('Success for adding problem');
    res.sendStatus(200);
});


app.get('/judge', (req, res) => {
    source = req.body.source;
    axios.post('https://ngrader.herokuapp.com/api/submit/custom', {
        lang: "15",
        input: "5",
        sourcecode: source
    }).then( (res) => {
        console.log(res.data);
    }).catch( (err) => {
        console.log(err);
    });
});