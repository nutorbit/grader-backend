// Setup database
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/db');

var User = require('./model/user.js');
var Problem = require('./model/problem.js');

// Setup backend
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require("path");
var axios = require('axios');
var cors = require('cors');
app.use(cors());
app.use(bodyParser.json());

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
    const userData = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        permission: 1
    };
    User.find({
        username: req.body.username
    }, (err, data) => {
        if(data.length == 0){
            User.create(userData, (err, data) => {
                if(err){
                    console.log(err);
                    res.status(401).send('not passed');
                }else{
                    console.log('P');
                    res.status(200).send('passed');
                }
            })
        }else{
            res.status(401).send('not passed');
        }
    })
});

// Get user's data query by username. [HAVEN'T SENT AS JSON TO BODY YET.]
app.get('/get_user/:username', (req, res) => {
    console.log('Find user : ', req.params.username);
    User.find({
        username: req.params.username
    }, (err, data) => {
        if(err) {
            console.log(err);
        } else if(data.length != 0) {
            console.log(JSON.stringify(data, undefined, 2));
            res.sendStatus(200);
        } else {
            res.send('Cant find it, duh');
        }
    });
});

app.post('/check_users', (req, res) => {
    console.log('check_users');
    User.find({
        username: req.body.username,
        password: req.body.password
    }, (err, data) => {
        if(err){
            res.status(401).send(err);
        }
        if(data.length != 0){
            res.status(200).send('found');
        }else{
            res.status(401).send('not found');
        }
    })
    
});

app.post('/add_problem', (req, res) => {
    console.log('add_problem')
    console.log(JSON.stringify(req.body, undefined, 2));
   // ตอน add ข้อมูลซ้ำแล้วแม่งบึ้มเฉย wtf
    const problemData = {
        id: req.body.id,
        name: req.body.name,
        difficulty: req.body.difficulty,
        description: req.body.description,
        reqInput: req.body.reqInput,
        reqOutput: req.body.reqOutput,
        testCase: req.body.testCase
    };
    Problem.find({
        name: req.body.name
    }, (err, data) => {
        if(data.length == 0) {data
            Problem.create(problemData, (err, problemData) => {
                if(err) {
                    console.log(err);
                } else {
                    console.log('Success!');
                    res.status(200).send('Problem is successfully added');
                }
            })
        } else {
            res.sendStatus(401).send('Failed');
        }
    })
});

// Get user's data query by username. [HAVEN'T SENT AS JSON TO BODY YET.]
app.get('/get_problem/:id', (req, res) => {
    console.log('Find problem id :', req.params.id);
    Problem.find({
        id: req.params.id
    }, (err, data) => {
        if(err) {
            console.log(err);
        } else if(data.length != 0) {
            console.log(JSON.stringify(data, undefined, 2));
            res.sendStatus(200);
        } else {
            res.send('Cant find it, duh');
        }

    })
});

app.get('/judge', (req, res) => {
    console.log('Judging');
    source = req.body.source;
    console.log(source);
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