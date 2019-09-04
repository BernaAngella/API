const Joi = require('joi');
const express = require('express');
const app = express();
const mysql = require('mysql');
//const pool = require('/data/config');

app.use(express.json());

/*const courses = [
    {id: 1, name: 'Course 1'},
    {id: 2, name: 'Course 2'},
    {id: 3, name: 'Course 3'},
];*/

const config = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dogapi'
});

config.connect((chec)=>{
	if (!chec) { console.log('Success, No errors found!') }
	else { console.log('Failed to connect to database.\nError: ' + JSON.stringify(err,undefined,2)) }
});

app.get('/api/dog-owner', (req, res) => {
    config.query('SELECT * FROM dog_owner', (error, result) => {
       if(error) throw error;
       res.send(result);
    });
});

app.get('/api/dog-owner/:userID', function (req,res) {
    config.query('SELECT * FROM dog_owner WHERE userID = ?', [req.params.userID], (error, rows, fields) => {
        if (!error) {
            res.send(rows);
        } else {
            console.log(error);
        }
        })
    });

app.post('/api/dog-owner', (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
     }
 
     const result = Joi.validate(req.body, schema);
     console.log(result);
 
     if(!req.body.name){
         res.status(400).send('Name is required');
         return;
     }
     const results = {
         name: req.body.name
     };
     res.send(results);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}...`));