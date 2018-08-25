var express = require('express');
var app = express();
var connection = require('./connection')
var bodyParser = require('body-parser');

//Start body-parser configuration
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
//end body-parser configuration

//rest api to get all results
app.get('/employees', function (req, res) {
  connection
    .then(function (pool) {
      return pool.request().query('select * from tbl_error')
    })
    .then(function(data){
      res.send(JSON.stringify(data));
    })
    .catch(function (err) {
      console.log("ERR", err)
    })
});

app.get('/employees/id',function(req,res) {
  connection.then(function(pool){
    console.log(req.params.id)
return pool.query('select * from tbl_error where id=?' ,[req.params.id])
  })
  
.then(function(data){
res.send(json.stringify(data));
})
.catch(function(err){
  console.log("Error",err) 
  })
});


// app.get('/employees/:id', function (req, res) {
//   console.log(req);
//   connection.query('select * from tbl_error where id=?', [req.params.id], function (error, results, fields) {
//     if (error) throw error;
//     res.end(JSON.stringify(results));
//  });
// });

//rest api to create a new record into sql database
app.post('/employees', function (req, res) {
  var postData = req.body;
  connection.query('INSERT INTO tbl_error SET ?', postData, function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

//rest api to update record into sql database
app.put('/employees', function (req, res) {
  connection.query('UPDATE `tbl_error` SET `employee_name`=?,`employee_salary`=?,`employee_age`=? where `id`=?', [req.body.employee_name, req.body.employee_salary, req.body.employee_age, req.body.id], function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

//rest api to delete record from sql database
app.delete('/employees', function (req, res) {
  console.log(req.body);
  connection.query('DELETE FROM `tbl_error` WHERE `id`=?', [req.body.id], function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
    //res.end('Record has been deleted!');
  });
});

var PORT = 3000;
//create app server
app.listen(PORT, function () {
  console.log(`Server is running on : http://localhost:${PORT}`)
});