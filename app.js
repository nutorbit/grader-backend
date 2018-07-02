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

// Get user's information from db using username as params to display on dashboard.
app.get('/get_user', (req, res) => {
    console.log('get_users');

});

// Add problems to db.
app.post('/add_problem', (req, res) => {
    console.log('add_problem');
    const newProblem = new Problem({
        name: req.body.name,
        difficulty: req.body.difficulty,
        description: req.body.description,
        reqInput: req.body.reqInput,
        reqOutput: req.body.reqOutput,
        testCase: req.body.testCase
    });
    newProblem.save((err, data) => {
        if(err) {
            res.status(401).send('not passed');
        }
        res.status(200).send('passed');
        console.log(data);
    })    
});

// Get problems's details from db using id as params.
app.get('/get_problem', (req, res) => {

})
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