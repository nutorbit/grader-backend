// Setup database and models.
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/db');

var User = require('./model/user.js');
var Problem = require('./model/problem.js');
var SubmitLog = require('./model/submitLog.js');

// Setup backend.
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

// Config for select infromation to send.
var submitInfoSelect = {
    submitId: true,
    submitTime: true,
    sender: true,
    submitProblem: true,
    result: true,
    processTime: true,
    processMemory: true
};

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
                    res.status(201).send('New user is added.');
                }
            })
        }else{
            res.status(401).send('not passed');
        }
    })
});

// Get user's data query by username.
app.get('/get_user/:username', (req, res) => {
    console.log('Find user : ', req.params.username);
    User.find({
        username: req.params.username
    }, (err, data) => {
        if(err) {
            console.log(err);
        } else if(data.length != 0) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(data));
        } else {
            res.sendStatus(401).send('Unauthenticated visitor.');
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
    add_submitlog
});

app.post('/add_problem', (req, res) => {
    console.log('add_problem')
    console.log(JSON.stringify(req.body, undefined, 2));
   // ตอน add ข้อมูลซ้ำแล้วแม่งบึ้มเฉย wtf
    const problemData = {
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
        if(data.length == 0) {
            Problem.create(problemData, (err, problemData) => {
                if(err) {
                    console.log(err);
                } else {
                    console.log('Success!');
                    res.status(201).send('Problem is successfully added');
                }
            });
        } else {
            res.sendStatus(401).send('Failed');
        }
    })
});

// Get user's data query by username. 
app.get('/get_problem/:id', (req, res) => {
    console.log('Find problem id :', req.params.id);
    Problem.find({
        problemId: req.params.id
    }, (err, data) => {
        if(err) {
            console.log(err);
        } else if(data.length != 0) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(data));
        } else {
            res.send('Cant find it, duh');
        }

    })
});

// List all problems to problem list page.
app.get('/list_problem', (req, res) => {
    console.log('Sending problem list');
    Problem.find({},{ 
            problemId: true, 
            name: true, 
            difficulty: true, 
            passedCount: true 
        }, (err, problems) => {
            if(err) {
                console.log(err);
                res.sendStatus(400).send('Listing problem error.');
            } else {
                res.setHeader('Content-Type','application/json');
                res.send(JSON.stringify({problems: problems}));
            }
    });
});

// Add submit log.
app.post('/add_submitlog', (req, res) => {
    console.log('add_submitlog');
    const logData = {
        sender: req.body.sender,
        submitProblem: req.body.submitProblem,
        result: req.body.result,
        processTime: req.body.processTime,
        processMemory: req.body.processMemory
    };
    SubmitLog.create(logData, (err, logData) => {
        if(err){add_submitlog
                console.log(err);
                res.status(401).send('not passed');
            }else{
                console.log('P');
                res.status(201).send('New log is added.');
            }
    });
})

// Simple listing log. (did not screen sender.)
app.get('/list_submitlog', (req, res) => {
    console.log('Sending submitlog list');
    SubmitLog.find({}, submitInfoSelect, (err, logData) => {
        if(err) {
            console.log(err);
            res.sendStatus(400).send('Listing log error.');
        } else {
            res.setHeader('Content-Type','application/json');
            res.send(JSON.stringify({logData: logData}));
        }
    })
})

app.get('/list_user_submit/:username', (req, res) => {
    console.log('Get user\'s log : ', req.params.username);
    SubmitLog.find({
        sender: req.params.username
    }, submitInfoSelect , (err, logData) => {
        if(err) {
            console.log(err);
            res.sendStatus(400).send('Listing log error.');
        } else {
            res.setHeader('Content-Type','application/json');
            res.send(JSON.stringify({logData: logData}));
        }
    });
});

app.get('/list_problem_submit/:id', (req, res) => {
    console.log('Get problem\'s log id : ', req.params.id);
    SubmitLog.find({
        submitProblem: req.params.id
    }, submitInfoSelect , (err, logData) => {
        if(err) {
            console.log(err);
            res.sendStatus(400).send('Listing log error.');
        } else {
            res.setHeader('Content-Type','application/json');
            res.send(JSON.stringify({logData: logData}));
        }
    });
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