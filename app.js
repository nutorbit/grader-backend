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
    console.log(req.body);
    /*

    !!!--- Format like this ---!!!
    {
        "id": "1",
        "name": "add",
        "difficulty": "hard",
        "description": "test",
        "testCase": [
            {
                "input": "1, 2",
                "output": "3"
            },
            {
                "input": "3, 2",
                "output": "5"
            }
        ]
    }
    
    # ลองเอาทั้งก้อนนี้ไปใส่ post man มาที่ http://127.0.0.1:3333/add_problem

    */
    const data = req.body;
    Problem.create(data, (err, data) => {
        console.log('Passed');
        
    })
    console.log('Success for adding problem');
    res.sendStatus(200);
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